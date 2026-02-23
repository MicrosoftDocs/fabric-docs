---
name: language-quality
description: Review and improve documentation language quality in this repository, including typos, grammar, and coherence. Use this skill when users ask to scan docs, polish wording, or verify language quality changes with minimal, high-confidence edits.
ai-usage: ai-assisted
---

# Language quality

Use this skill when handling typo, grammar, or coherence-fix requests in this repo.

## Scope

- Prioritize prose in `docs/` markdown and YAML files.
- Make surgical language edits (typos, grammar, coherence) in changed content.
- Preserve Microsoft Fabric terminology and existing technical meaning.

## Workflow

1. For large markdown scopes, split files into independent batches and run checks in parallel with multi-agent mode (for example, `/fleet` in Copilot CLI).
1. Check for existing spellcheck tooling before scanning (`cspell`, `vale`, workflow tasks).
1. Use `codespell` for candidate detection when no repo-native checker is configured:

   ```bash
   codespell docs --skip='*.svg,*.png,*.jpg,*.jpeg,*.gif,*.json,*.ipynb,*.csv,*.tsv' --builtin clear -q 3
   ```

1. Treat scan output as candidate typos, not guaranteed mistakes.
1. Validate each candidate in context before editing.
1. Do **not** change likely false positives such as acronyms, metrics, product terms, code identifiers, or query/function names.
1. Apply minimal text corrections only where intent is unambiguous.
1. Review changed sentences for grammar and coherence (for example, agreement, tense consistency, pronoun clarity, and list flow).
1. Inspect the diff to keep grammar and coherence edits scoped to changed text and its immediate context:

   ```bash
   git --no-pager diff --unified=0 -- docs
   ```

1. Re-run the scan, then report what was fixed and what remains as likely false positives.

## Guardrails

- Avoid broad find-and-replace for ambiguous terms.
- Keep links, code blocks, and commands functionally unchanged unless the typo is clearly in prose.
- Do not rewrite whole sections for style; keep grammar and coherence corrections localized unless the user asks for broader edits.

## Reporting template

- Total files updated.
- Representative typo fixes (for example, corrected misspelled words).
- Representative grammar or coherence fixes (for example, agreement or wording fixes in changed sentences).
- Remaining scanner hits that are likely acceptable (for example, acronym-only hits).
