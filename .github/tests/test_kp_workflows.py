import itertools
import json
from pathlib import Path
import subprocess
import unittest

import yaml


ROOT = Path(__file__).resolve().parents[2]
WORKFLOWS = ROOT / ".github" / "workflows"
SCAN = "stale-comment-knowledgepartnership.yml"
ENROLL = "stale-enroll-knowledgepartnership.yml"
CONFIG = "reusable-kp-configuration.yml"
PRIVATE_REPO = "MicrosoftDocs/fabric-docs-pr"


class UniqueKeyLoader(yaml.BaseLoader):
    def construct_mapping(self, node, deep=False):
        result = {}
        for key_node, value_node in node.value:
            key = self.construct_object(key_node, deep=deep)
            if key in result:
                raise ValueError(f"Duplicate YAML key: {key}")
            result[key] = self.construct_object(value_node, deep=deep)
        return result


def load(filename):
    return yaml.load((WORKFLOWS / filename).read_text(encoding="utf-8"), Loader=UniqueKeyLoader)


class KnowledgePartnershipWorkflows(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.workflows = {path.name: load(path.name) for path in WORKFLOWS.glob("*.yml")}
        cls.scan = cls.workflows[SCAN]
        cls.enroll = cls.workflows[ENROLL]
        cls.config = cls.workflows[CONFIG]

    def test_entry_points_have_distinct_names_and_triggers(self):
        self.assertEqual(self.scan["name"], Path(SCAN).stem)
        self.assertEqual(self.enroll["name"], Path(ENROLL).stem)
        self.assertEqual(set(self.scan["on"]), {"schedule", "workflow_dispatch"})
        self.assertEqual(self.scan["on"]["schedule"], [{"cron": "0 * * * *"}])
        self.assertEqual(set(self.enroll["on"]), {"pull_request_target"})
        self.assertEqual(
            self.enroll["on"]["pull_request_target"]["types"],
            ["opened", "reopened", "ready_for_review", "edited", "synchronize"],
        )
        self.assertEqual(
            self.scan["on"]["workflow_dispatch"]["inputs"]["labels-only"]["default"], "false"
        )
        self.assertIn("no reminders", self.enroll["run-name"])
        self.assertIn("no reminders", self.scan["run-name"])

    def test_settings_have_one_source_and_are_exposed_to_both_callers(self):
        self.assertNotIn("env", self.scan)
        self.assertNotIn("env", self.enroll)
        self.assertEqual(set(self.config["on"]), {"workflow_call"})
        self.assertEqual(self.config["permissions"], {})
        self.assertEqual(self.config["env"]["INACTIVITY_DAYS"], "3")
        self.assertEqual(self.config["env"]["OPERATIONS_PER_RUN"], "350")
        outputs = self.config["on"]["workflow_call"]["outputs"]
        job_outputs = self.config["jobs"]["configuration"]["outputs"]
        self.assertEqual(set(outputs), set(job_outputs))
        for key, output in outputs.items():
            self.assertEqual(output["value"], "${{ jobs.configuration.outputs." + key + " }}")
            setting = job_outputs[key].removeprefix("${{ env.").removesuffix(" }}")
            self.assertIn(setting, self.config["env"])
        for caller in [self.scan, self.enroll]:
            self.assertEqual(caller["jobs"]["configuration"]["uses"], f"./.github/workflows/{CONFIG}")
            self.assertEqual(caller["jobs"]["configuration"]["permissions"], {})

    def test_stale_bots_share_single_keep_open_exemption(self):
        self.assertEqual(self.config["env"]["EXEMPT_LABEL"], "keep-open")
        general_steps = self.workflows["stale.yml"]["jobs"]["stale"]["steps"]
        general = next(step["with"] for step in general_steps if "uses" in step)
        self.assertIn("keep-open", general["exempt-pr-labels"].split(","))
        for caller in [self.scan, self.enroll]:
            for job in caller["jobs"].values():
                if "exempt-label" in job.get("with", {}):
                    self.assertEqual(
                        job["with"]["exempt-label"],
                        "${{ needs.configuration.outputs.exempt-label }}",
                    )
        reminder = self.workflows["reusable-kp-reminder.yml"]["jobs"]["send-reminders"]
        self.assertEqual(reminder["env"]["EXEMPT_LABEL"], "${{ inputs.exempt-label }}")
        action = next(step["with"] for step in reminder["steps"] if "uses" in step)
        self.assertEqual(action["exempt-pr-labels"], "${{ env.EXEMPT_LABEL }}")
        self.assertEqual(action["exempt-draft-pr"], "true")
        validation = self.workflows["reusable-kp-validate-labels.yml"]["jobs"]["validate-labels"]
        self.assertEqual(validation["env"]["EXEMPT_LABEL"], "${{ inputs.exempt-label }}")

    def test_scan_preserves_backfill_cleanup_and_reminder_order(self):
        jobs = self.scan["jobs"]
        self.assertEqual(jobs["label-event-prs"]["needs"], ["configuration", "validate-labels"])
        self.assertIn("no reminders", jobs["label-event-prs"]["name"])
        self.assertEqual(
            jobs["manage-pr-reminders"]["needs"], ["configuration", "validate-labels", "label-event-prs"]
        )
        self.assertEqual(jobs["send-author-reminder"]["needs"], [
            "configuration", "validate-labels", "label-event-prs", "manage-pr-reminders"
        ])
        self.assertEqual(
            jobs["send-author-reminder"]["uses"], "./.github/workflows/reusable-kp-reminder.yml"
        )
        self.assertEqual(
            jobs["manage-pr-reminders"]["env"]["EVENT_LABEL"],
            "${{ needs.configuration.outputs.event-label }}",
        )
        self.assertEqual(
            jobs["manage-pr-reminders"]["env"]["AUTHOR_REMINDER_LABEL"],
            "${{ needs.configuration.outputs.author-reminder-label }}",
        )
        self.assertEqual(
            jobs["manage-pr-reminders"]["env"]["EXEMPT_LABEL"],
            "${{ needs.configuration.outputs.exempt-label }}",
        )
        self.assertEqual(set(self.enroll["jobs"]), {"configuration", "validate-labels", "label-event-prs"})

    def test_private_guards_permissions_and_safe_concurrency(self):
        for filename, workflow in self.workflows.items():
            if filename not in {SCAN, ENROLL} and not filename.startswith("reusable-kp-"):
                continue
            for job in workflow["jobs"].values():
                self.assertIn(f"github.repository == '{PRIVATE_REPO}'", job["if"])
                for step in job.get("steps", []):
                    self.assertNotIn("actions/checkout", step.get("uses", ""))
        self.assertNotIn("actions", self.enroll["permissions"])
        self.assertEqual(self.enroll["permissions"], {"issues": "read", "pull-requests": "write"})
        self.assertEqual(self.scan["permissions"]["actions"], "write")
        self.assertEqual(self.scan["concurrency"]["group"], "knowledge-partnership-reminders")
        self.assertEqual(
            self.enroll["concurrency"]["group"],
            "knowledge-partnership-label-pr-${{ github.event.pull_request.number }}",
        )
        for workflow in [self.scan, self.enroll]:
            self.assertEqual(workflow["concurrency"]["cancel-in-progress"], "false")

    def test_reusable_input_contracts_and_dependency_graphs_resolve(self):
        for workflow in self.workflows.values():
            remaining = set(workflow["jobs"])
            complete = set()
            while remaining:
                ready = []
                for name in remaining:
                    job = workflow["jobs"][name]
                    needs = job.get("needs", [])
                    if isinstance(needs, str):
                        needs = [needs]
                    self.assertTrue(set(needs) <= set(workflow["jobs"]))
                    if set(needs) <= complete:
                        ready.append(name)
                    if job.get("uses", "").startswith("./.github/workflows/"):
                        target = self.workflows[Path(job["uses"]).name]["on"]["workflow_call"]
                        inputs = target.get("inputs", {})
                        supplied = job.get("with", {})
                        self.assertTrue(set(supplied) <= set(inputs))
                        required = {key for key, value in inputs.items() if value.get("required") == "true"}
                        self.assertTrue(required <= set(supplied))
                self.assertTrue(ready, "Cyclic job dependencies")
                remaining.difference_update(ready)
                complete.update(ready)

    def test_trigger_and_job_routing_matrix(self):
        cases = [
            {"repo": repo, "event": event, "action": action, "branch": branch, "labelsOnly": labels}
            for repo, (event, action), branch, labels in itertools.product(
                [PRIVATE_REPO, "MicrosoftDocs/fabric-docs", "diberry/fabric-docs-pr"],
                [("schedule", ""), ("workflow_dispatch", "")]
                + [("pull_request_target", action) for action in
                   ["opened", "reopened", "ready_for_review", "edited", "synchronize", "closed"]],
                ["main", "release-ignite26-test", "release-ignite26-", "release-other-test"],
                [False, True],
            )
        ]
        runner = r"""
const {workflows, cases} = JSON.parse(require('node:fs').readFileSync(0, 'utf8'));
for (const c of cases) {
  const github = {repository:c.repo, event_name:c.event,
    event:{pull_request:{number:42, base:{ref:c.branch}}}};
  const inputs = {'labels-only':c.labelsOnly};
  const needs = {configuration:{outputs:{'rollout-branch-prefix':'release-ignite26-'}}};
  const evaluate = expression => new Function('github','inputs','needs','startsWith',
    `return (${expression.replace(/inputs\.labels-only/g, "inputs['labels-only']")
      .replace(/outputs\.rollout-branch-prefix/g, "outputs['rollout-branch-prefix']")});`
  )(github,inputs,needs,(text,prefix)=>text.toLowerCase().startsWith(prefix.toLowerCase()));
  for (const [name, workflow] of Object.entries(workflows)) {
    const trigger = workflow.on[c.event];
    const triggered = trigger !== undefined &&
      (c.event !== 'pull_request_target' || trigger.types.includes(c.action));
    const selected = new Set();
    if (triggered) {
      for (const [id, job] of Object.entries(workflow.jobs)) {
        const deps = typeof job.needs === 'string' ? [job.needs] : (job.needs ?? []);
        if (deps.every(dep=>selected.has(dep)) && evaluate(job.if)) selected.add(id);
      }
    }
    const privateRepo = c.repo === 'MicrosoftDocs/fabric-docs-pr';
    const enrollment = name === 'enroll';
    const shouldTrigger = enrollment
      ? c.event === 'pull_request_target' && c.action !== 'closed'
      : ['schedule','workflow_dispatch'].includes(c.event);
    const shouldLabel = privateRepo && shouldTrigger &&
      (!enrollment || c.branch.startsWith('release-ignite26-'));
    const shouldRemind = !enrollment && privateRepo && shouldTrigger && !c.labelsOnly;
    if (selected.has('configuration') !== (privateRepo && shouldTrigger) ||
        selected.has('label-event-prs') !== shouldLabel ||
        selected.has('send-author-reminder') !== shouldRemind ||
        (enrollment && selected.has('manage-pr-reminders'))) {
      throw new Error(JSON.stringify({name,c,selected:[...selected]}));
    }
    if (triggered) {
      const runName = workflow['run-name'].replace(/\$\{\{([\s\S]*?)\}\}/g, (_,expression)=>evaluate(expression));
      if (enrollment && !runName.includes('no reminders')) throw new Error(runName);
      if (!enrollment && c.labelsOnly && c.event === 'workflow_dispatch' &&
          !runName.includes('no reminders')) throw new Error(runName);
    }
  }
}
console.log(`Verified ${cases.length * 2} entry-point routing cases.`);
"""
        result = subprocess.run(
            ["node", "-e", runner],
            input=json.dumps({"workflows": {"scan": self.scan, "enroll": self.enroll}, "cases": cases}),
            text=True, capture_output=True,
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("Verified 384 entry-point routing cases.", result.stdout)


if __name__ == "__main__":
    unittest.main()
