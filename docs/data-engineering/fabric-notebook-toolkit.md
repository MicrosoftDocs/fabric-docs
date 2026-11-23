---
title: Develop Fabric notebooks with Fabric notebook toolkit
description: Learn how to install Fabric notebook toolkit, connect a coding agent, and develop and debug Fabric notebooks through live sessions from your terminal.
ms.reviewer: qixwang
ms.topic: how-to
ms.date: 10/12/2026
ms.search.form: Fabric Notebook Toolkit FNTK
ai-usage: ai-generated
---

# Develop and debug notebooks with the Fabric notebook toolkit

The Fabric notebook toolkit (FNTK) connects coding agents to Microsoft Fabric notebooks through a command-line interface (CLI). You can use GitHub Copilot CLI, Claude Code, or Codex to inspect notebook cells, execute code, review results, and refine a change in a running Fabric session.

> [!NOTE]
> The Fabric notebook toolkit is currently in preview. The [package on PyPI](https://pypi.org/project/fabric-notebook-toolkit/) is available as a public alpha release.

The notebook and Spark compute remain in Fabric. Fabric notebook toolkit runs locally and provides the commands that your agent uses to work with the remote notebook session. This is a terminal workflow, separate from the [Copilot chat pane in the Fabric portal](copilot-notebooks-chat-pane.md).

This article explains how to install the toolkit, configure your coding agent, and start an interactive notebook development workflow. You can also run the commands yourself without an agent.

## When to use the Fabric notebook toolkit

Use the Fabric notebook toolkit when you want to develop or troubleshoot a Fabric notebook without manually copying code, outputs, and errors between the notebook and a coding agent.

For example, you can:

- Find the workspace, notebook, and lakehouse for a task.
- Read notebook cells and make targeted edits.
- Run code, inspect its output, and rerun it in the same session.
- Investigate a failing transformation with Spark diagnostics and execution logs.

The notebook toolkit provides access to notebook operations and execution evidence. The coding agent uses that information to reason about your task; the notebook toolkit doesn't replace the agent or its model provider.

## Prerequisites

- Install Python 3.10, 3.11, 3.12, or 3.13 with `pip`. Use a Python environment where you can install packages and run their command-line tools.
- Install the [Azure CLI](/cli/azure/install-azure-cli) and make sure the `az` command is available in your terminal.
- Have a Fabric workspace with an existing development notebook and capacity available to run it.
- Have permission to access the notebook, run code, and use any required data or
lakehouses. Editing notebooks or resources also requires the corresponding permissions.
- For agent-assisted development, install and sign in to GitHub Copilot CLI, Claude
Code, or Codex. Make sure your selected agent CLI is available in your terminal.

> [!IMPORTANT]
> Start with a development notebook. Commands that edit cells or resources can
> modify Fabric items, and executed code can change data. Use your agent's approval
> controls and review proposed edits and execution commands before allowing them.
> Follow your organization's policies before sharing notebook content, results, or
> logs with an agent provider.

## Install the notebook toolkit and sign in

Run the following commands in your local terminal.

1. Install the toolkit:

    ```bash
    python -m pip install fabric-notebook-toolkit
    ```

    Install the Fabric CLI (`fab`) separately before signing in:

    ```bash
    python -m pip install ms-fabric-cli
    ```

1. Sign in with both the Azure CLI and the Fabric CLI. The toolkit currently requires both sign-ins. Run the following commands in order:

    ```bash
    az login
    fab auth login
    ```

   Use the same account and tenant in both CLIs, with access to the target Fabric
   workspace. Complete each sign-in before continuing. For authentication options,
   see [Sign in with Azure CLI](/cli/azure/authenticate-azure-cli) and the
   [Fabric CLI documentation](https://microsoft.github.io/fabric-cli/).

1. Confirm the identity available to the toolkit:

    ```bash
    fntk discover whoami --json
    ```

    After switching accounts or tenants, sign in again with both CLIs, then run the preceding command again to verify the identity before continuing.

1. View the command overview:

    ```bash
    fntk help
    ```

## Set up your coding agent

The `fntk init` command installs the bundled `fabric-notebook-workflow` skill and
configures the external Fabric Skills plugin for your selected agent hosts. Skills
provide guidance that helps the agent use the toolkit for notebook tasks.

1. In your terminal, change to the local project directory where you want to use
   your agent.

1. Run the initialization command for GitHub Copilot CLI, the default agent target:

    ```bash
    fntk init
    ```

    To configure multiple installed agent hosts, specify them explicitly:

    ```bash
    fntk init --agent copilot codex claude
    ```

1. Follow the prompts to choose the installation scope and plugin options. The bundled workflow skill uses the current project by default. To make that skill available across projects, use `fntk init --global`. External plugin scope options depend on the selected agent host.

1. Review the initialization results and address any warnings, such as a selected agent CLI that isn't installed.

> [!NOTE]
> Initialization currently configures skills and plugins only. It doesn't scan your
> Git repository, discover or bind a Fabric workspace, or generate workspace-specific agent instructions. Identify the target workspace and notebook separately.

To inspect the bundled guidance or discover the commands available to agents, use:

```bash
fntk skill list
fntk help --json
```

## Develop a notebook with your agent

Use a focused task first, then expand the scope after you verify the results.

### Identify the workspace and notebook

Start your selected coding agent in the project where you configured the toolkit. Tell it which Fabric workspace and notebook to use. If you don't know their identifiers, ask the agent to discover them, or run these commands yourself:

```bash
fntk discover list-workspaces --json
fntk discover list-notebooks --workspace-id <workspace-id> --json
```

Replace `<workspace-id>` with the workspace identifier returned by discovery.
Notebook commands use `--artifact-id` for the notebook's identifier. Use the
identifier from notebook discovery rather than its display name.

For example, start with a read-only prompt:

> Use Fabric notebook toolkit to find the notebook SalesAnalysis in my development workspace. Confirm
> the workspace and notebook identifiers, then inspect the notebook cells and
> attached lakehouse. Don't edit cells or run code yet.

### Run, inspect, and refine code

After you confirm the target, give the agent a specific task and set boundaries for
edits and execution.

1. Ask the agent to inspect the relevant cells and propose the code to run.
1. Review the proposal and approve starting a Fabric session and running code.
1. Have the agent retrieve the results and explain any errors before proposing
   another change.
1. Review and approve targeted edits, then rerun the relevant code in the same
   active session.
1. Check the result and review notebook changes in Fabric before sharing them with
   your team.

For example:

> Investigate why the date conversion in this notebook fails. Use Fabric notebook toolkit to inspect
> the relevant cell and propose a schema check. Ask before running code or editing
> the notebook. After I approve, run the check, explain the result, and propose a
> targeted fix. Reuse the same session while it remains active.

By using Fabric notebook toolkit, the agent can iterate on the code being investigated without resubmitting the entire notebook for every adjustment. Execution order still matters: run any setup code needed to define variables, imports, and dataframes before using them.

### Try the execution commands directly

Use the CLI to follow the same session and execution workflow. Replace
`<workspace-id>` and `<notebook-id>` with the identifiers you confirmed earlier.

1. Start a notebook session:

    ```bash
    fntk notebook start-session --workspace-id <workspace-id> --artifact-id <notebook-id> --json
    ```

1. Inspect the response. If the session is still starting, follow the returned
   status and next-action guidance until it's ready before submitting code.

1. Run a small check:

    ```bash
    fntk code run --workspace-id <workspace-id> --artifact-id <notebook-id> --code "print('hello from Fabric')" --json
    ```

1. Inspect the result. For an operation that isn't complete, use the response's
   next-action guidance to retrieve the result rather than submitting the code again.

Most operational commands accept `--json` and return structured fields such as
`status`, `stage`, `data`, `error`, and `next_actions`. These fields help an agent distinguish completed work from an operation it needs to poll. Help and skill-inspection commands use their own output formats.

## Investigate failures with diagnostics and logs

When code fails, inspect execution evidence before changing the notebook. Fabric notebook toolkit provides Spark application diagnostics, progress, stage information, and driver, executor, Livy, and cell logs.

For example, ask your agent:

> Use Fabric notebook toolkit to inspect the failed run in the confirmed notebook. Retrieve the relevant
> cell output, Spark diagnostics, and logs. Explain whether the evidence points to
> a code error, a session issue, or a resource problem. Don't modify the notebook
> or rerun it until I approve the next step.

Use `fntk monitor` commands for Spark state and diagnostics, and `fntk logs` commands
for logs. See `fntk help --json` for the identifiers and parameters required by
each command. Monitoring and log operations can require Livy session or Spark
application identifiers in addition to the workspace and notebook identifiers.

## Manage sessions and the optional local server

The toolkit provides an optional local server, or daemon, for long-running WebSocket connections and asynchronous execution.

```bash
fntk server start --json
fntk server status --json
```

The server listens on the local machine. When you no longer need it, stop it:

```bash
fntk server stop --json
```

> [!IMPORTANT]
> Stopping the local server or disconnecting locally doesn't cancel remote Spark
> jobs. Cancel executions and end remote sessions separately when you're finished,
> by using the `code` and `notebook` commands described by `fntk help`.

## Command groups at a glance

Use this table to find the command group for your task. For the full command
reference, see the [Fabric notebook toolkit package documentation](https://pypi.org/project/fabric-notebook-toolkit/).

| Command | Purpose |
| --- | --- |
| `fntk discover` | Find workspaces, notebooks, lakehouses, and identity information. |
| `fntk notebook` | Manage notebooks, sessions, and default lakehouses. |
| `fntk cell` | Read, add, update, and organize notebook cells. |
| `fntk code` | Run code, retrieve results, and cancel executions. |
| `fntk monitor` | Inspect Spark progress, diagnostics, and resource usage. |
| `fntk logs` | Download driver, executor, Livy, and cell logs. |
| `fntk resource` | Manage notebook resource files and folders. |
| `fntk init` | Install or update workflow skills and agent plugins. |
| `fntk skill` | Inspect built-in skill content. |
| `fntk server` | Start, inspect, or stop the optional local server. |

## Update Fabric notebook toolkit and its skills

Upgrade the package, and then refresh the installed skills and plugins:

```bash
python -m pip install --upgrade fabric-notebook-toolkit
fntk init --update-skills -y
```

The `-y` option skips interactive prompts and uses defaults. Omit it if you want to
review the available options.

## Troubleshoot common issues

Use the reported error and the following checks before retrying an operation.

| Issue | Action |
| --- | --- |
| The terminal can't find `fntk` or `fab`. | Activate the Python environment where you installed FNTK and check that its scripts directory is in `PATH`. |
| The terminal can't find `az`. | Install the [Azure CLI](/cli/azure/install-azure-cli) and check that it's available in `PATH`. |
| Authentication fails or the wrong account is used. | Run both `az login` and `fab auth login` with the same account and tenant, then run `fntk discover whoami --json` to verify the identity before continuing. |
| The expected workspace or notebook isn't listed. | Check your account, tenant, and permissions. Use the identifiers returned by discovery. |
| Initialization reports a missing agent CLI. | Install the selected agent CLI or select an installed host, then run `fntk init` again. |
| A session or execution is still in progress. | Follow the returned status and next actions. Don't repeatedly submit the same code to check its progress. |
| Execution fails. | Inspect cell output and use the monitoring and log commands to identify the cause before rerunning. |
| The CLI reports `DAEMON_AUTH_UPGRADE_REQUIRED`. | Stop and restart the local server with `fntk server stop --json` and `fntk server start --json`. |
| How does the toolkit differ from Project Osmos? | The [Fabric data engineering agent (Project Osmos)](data-engineering-agent-get-started.md?tabs=github-copilot-cli) runs autonomous, end-to-end data engineering tasks in Fabric, including planning, execution, and validation. Use the Fabric notebook toolkit with your coding agent for interactive notebook development: edit cells, run code, inspect results, and debug. |

## Related content

- [Fabric Notebook Toolkit on PyPI](https://pypi.org/project/fabric-notebook-toolkit/)
- [Sign in with Azure CLI](/cli/azure/authenticate-azure-cli)
- [Fabric CLI documentation](https://microsoft.github.io/fabric-cli/)
- [Develop, execute, and manage Fabric notebooks](author-execute-notebook.md)
- [Monitor Spark applications in notebooks](spark-monitor-debug.md)
- [Use the Copilot chat pane in Fabric notebooks](copilot-notebooks-chat-pane.md)
