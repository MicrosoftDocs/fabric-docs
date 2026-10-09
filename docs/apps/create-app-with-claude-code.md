---
title: Create a CSV data explorer with Claude Code
description: Learn how to use Claude Code to build, test, and deploy a Fabric app that explores data from a CSV file.
ms.reviewer: mksuni
ms.topic: tutorial
ms.date: 08/25/2026
ai-usage: ai-generated
---

# Create a Fabric app with Claude Code

Use this recipe to create a Fabric app that turns a CSV file into an interactive data explorer. Claude Code inspects the file, scaffolds the project, implements filters and visualizations that fit the available columns, and validates the app from your terminal.

The completed app includes the CSV file in its static content and loads the data in the browser. This approach works well for sample, public, or nonsensitive data that doesn't require a live connection.

In this tutorial, you:

- Install and start Claude Code.
- Ask Claude Code to scaffold and inspect a Fabric app.
- Build an interactive explorer around your CSV file.
- Review and validate the generated changes.
- Deploy the app to Fabric.
- Verify the deployment and open the app.

## Prerequisites

- [Node.js 20 or later](https://nodejs.org/).
- A terminal supported by Claude Code.
- A Claude Pro, Max, Team, Enterprise, or Console account with Claude Code access.
- A Microsoft account with access to Fabric.
- A Fabric workspace where you have Contributor, Member, or Admin permissions.
- The Fabric Apps workload enabled for your tenant.
- A UTF-8 CSV file with a header row. Know the full path to the file before you start Claude Code.

> [!IMPORTANT]
> A CSV file deployed as static app content is available to people who can access the app. Don't use this recipe for secrets, personal data, or other sensitive information.

For Claude Code system requirements and account options, see the [Claude Code setup documentation](https://code.claude.com/docs/en/setup).

## Install Claude Code

Install Claude Code by using the method for your operating system.

### Windows

Install Claude Code with WinGet:

```powershell
winget install Anthropic.ClaudeCode
```

### macOS, Linux, or Windows Subsystem for Linux

Use the native installer:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Verify the installation:

```bash
claude --version
claude doctor
```

For other installation methods, see [Install Claude Code](https://code.claude.com/docs/en/setup#install-claude-code).

## Start Claude Code

1. Open a terminal in the parent folder where you want to create the project.
1. Start Claude Code:

   ```bash
   claude
   ```

1. Complete the browser authentication flow if prompted.
1. Review the folder access and command permissions that Claude Code requests.

Don't start Claude Code in a folder that contains unrelated files you don't want it to inspect or modify.

## Scaffold and run the app

Paste the following prompt into Claude Code:

```text
Set up a new Rayfin app for me, end to end.

Create the project in a folder named csv-data-explorer. Before changing code, read any
CLAUDE.md, copilot-instructions.md, and agent guidance included in the scaffolded project.

Do the work yourself instead of only printing instructions:
1. Run `npm create @microsoft/rayfin@latest csv-data-explorer`.
2. Inspect the scaffolded project. Explain the purpose of rayfin/rayfin.yml,
   rayfin/data/, and src/.
3. Install dependencies if the scaffold command didn't install them.
4. Run `npx rayfin login` and pause while I complete sign-in.
5. Deploy the backend with `npx rayfin up`.
6. Confirm the deployment with `npx rayfin up status`.
7. Start the frontend with `npm run dev`.
8. Tell me the local URL to open and summarize what you created.

Ask before making a destructive change or using a force option.
```

Approve commands only after you review them. Complete the Rayfin browser sign-in when prompted. After the frontend starts, open the local URL that Claude Code reports.

## Ask Claude Code to build the data explorer

Give Claude Code the full path to your CSV file and describe how people should explore the data. The agent can inspect the headers and sample values to tailor controls and visualizations to the dataset.

Use the following prompt as a starting recipe. Replace `<full-path-to-csv-file>` with the path to your file.

```text
Turn this Fabric app into a data explorer for the CSV file at
<full-path-to-csv-file>.

Requirements:
- Inspect the headers and a representative sample of rows first. Summarize the
   inferred date, numeric, Boolean, and categorical columns before editing.
- Don't modify the source file. Copy it into an appropriate static asset folder with
   a clear name so the deployed app can load it.
- Parse quoted fields, escaped commas, missing values, and line breaks correctly.
   Use an existing CSV dependency if the project includes one. Otherwise, add a
   well-maintained parser and explain why it's needed.
- Build KPI callouts and two useful charts based on the columns actually present.
   Don't invent fields or values.
- Add a global search, column filters appropriate to each inferred data type, sortable
   columns, pagination, and a control to clear all filters.
- Show the filtered row count, and calculate KPIs and charts from the filtered rows.
- Add a detailed data grid and preserve the original column names.
- Include loading, empty, and error states.
- Report malformed rows without crashing the app.
- Make the layout usable with a keyboard and responsive at desktop and mobile sizes.
- Follow the scaffolded project's existing component and styling patterns.
- Don't add dependencies unless they're necessary.

Before editing, inspect the relevant files and give me a short implementation plan.
Then make the changes, run the existing build, start the app, and validate the main
flows in a browser at desktop and mobile sizes. Explain any errors you fix.
```

Review the plan before Claude Code edits the project. If the plan doesn't match your requirements, correct it before approving implementation.

## Review the generated changes

After Claude Code finishes, ask it to review its work:

```text
Review the changes you made against every requirement in my previous prompt.

Check for:
- Incorrect parsing of quoted fields, escaped commas, missing values, or line breaks.
- Type inference that changes valid identifiers or loses numeric precision.
- KPIs or charts that don't update from the filtered rows.
- Search, filtering, sorting, pagination, or clear-filter controls that don't work.
- Invented fields, values, or fallback data that aren't in the CSV file.
- The original CSV file being modified.
- Missing loading, empty, or error states.
- TypeScript, build, browser console, or responsive layout errors.

Fix confirmed issues, rerun the existing build and browser checks, and summarize the
final behavior.
```

Review the source control diff yourself. Pay particular attention to:

- The copied CSV asset and whether it's appropriate to publish.
- CSV parsing and type inference.
- Service configuration in `rayfin/rayfin.yml`.
- New dependencies in `package.json`.
- Secrets or credentials that you must not commit.

## Validate the app

Ask Claude Code to run the project's existing validation:

```text
Validate the app without adding new tools.

1. Run the existing build and type-check commands from package.json.
2. Start the frontend if it isn't already running and report the local URL.
3. In a browser, verify the initial row count against the CSV file.
4. Test search, each filter type, sorting, pagination, clear filters, and malformed-row
   handling. Confirm that KPIs and charts update with the filtered rows.
5. Check desktop and mobile layouts and report browser console errors.
6. Fix confirmed issues and rerun the failed check.
```

In the browser, compare a few rows, totals, and filtered results with the source CSV file. Test empty results, malformed data, keyboard navigation, and narrow screens.

## Deploy the finished app

After you review the changes and test the app, ask Claude Code to deploy it:

```text
Deploy the reviewed app to Fabric.

1. Show me the current git diff and summarize what will be deployed.
2. Run `npx rayfin up`.
3. Run `npx rayfin up status`.
4. Confirm that the deployment is healthy.
5. Give me the hosted app URL and Fabric portal link from the command output.

Stop and explain the issue if deployment or verification fails.
```

The same `npx rayfin up` command updates an existing deployment when you continue developing the app.

## Continue iterating with Claude Code

Use focused prompts for later changes. Include the desired behavior, affected users, constraints, and validation steps.

```text
Add saved views to the CSV data explorer.

Let users name and save the current search, filters, sort order, and visible columns
in browser storage. Don't store or duplicate CSV rows in browser storage. Add controls
to apply, rename, and delete a saved view. Run the existing build and browser checks,
then list the user flows I should retest.
```

Keep each request small enough to review. Commit a working state before you ask Claude Code to make a large or potentially destructive change.

## Troubleshoot the Claude Code workflow

### Claude Code only prints commands

Tell Claude Code to run the commands and report their results. Review and approve the requested command permissions.

### A command waits for sign-in

Complete the browser sign-in flow. Then tell Claude Code that sign-in is complete so it can continue.

### Claude Code works in the wrong folder

Exit the session, open a terminal in the scaffolded project folder, and run `claude` again.

### Claude Code can't find a command

Run `claude doctor` to check the Claude Code installation. For Rayfin commands, confirm that Node.js 20 or later and the project dependencies are installed.

### The app opens but the CSV data doesn't load

Ask Claude Code to inspect the browser network and console errors, verify the deployed asset path, and confirm that the CSV file is included in the static build output.

### Claude Code proposes `--force`

Require Claude Code to show the potentially destructive schema operations first. Accept `--force` only when you understand and approve the possible data loss.

For other app issues, see [Troubleshoot Fabric Apps](troubleshooting.md).

## Related content

- [Create a semantic model app with GitHub Copilot](create-app-with-github-copilot.md)
- [Create a Fabric app with the Rayfin CLI](create-app-with-cli.md)
- [Understand the Fabric Apps project structure](project-structure.md)
- [Deploy a Fabric app to Fabric](deploy-app.md)
