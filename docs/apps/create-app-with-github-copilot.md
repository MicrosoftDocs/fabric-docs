---
title: Create a semantic model app with GitHub Copilot
description: Learn how to use GitHub Copilot, the data app template, and a Fabric semantic model connector to build and deploy an analytical Fabric app.
ms.reviewer: mksuni
ms.topic: tutorial
ms.date: 09/15/2026
ai-usage: ai-generated
---

# Create a semantic model app with GitHub Copilot

Use this recipe to create an analytical app connected to a semantic model with GitHub Copilot agent mode. Copilot scaffolds the data app template, adds a Fabric semantic model connector, creates DAX queries and visualizations, and validates the app.

The data app template provides Fabric authentication, DAX generation guidance, visual components, and browser validation. The connector provides delegated semantic model access through the Fabric Apps client. For more information, see [Create an app connected to a semantic model](data-apps-template.md).

In this tutorial, you:

- Prepare GitHub Copilot for agent-driven development.
- Ask Copilot to scaffold the data app template.
- Connect the app to a semantic model.
- Build an interactive sales performance explorer.
- Review and validate the generated changes.
- Deploy the app to Fabric.
- Verify the deployment and open the app.

## Prerequisites

- [Node.js 20 or later](https://nodejs.org/).
- [Visual Studio Code](https://code.visualstudio.com/).
- [GitHub Copilot in Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) with agent mode available.
- A GitHub account with access to GitHub Copilot.
- A Microsoft account with access to Fabric.
- A Fabric workspace where you have Contributor, Member, or Admin permissions.
- The Fabric Apps workload enabled for your tenant.
- The Semantic Model Execute Queries REST API tenant setting enabled.
- Build and Read permissions on a semantic model hosted on Fabric or Power BI capacity.
- The workspace ID and item ID for the semantic model.

> [!NOTE]
> Copilot asks for approval before it runs terminal commands. You must also complete interactive browser sign-in when the Rayfin CLI requests it.

## Open GitHub Copilot agent mode

1. Open Visual Studio Code.
1. Open the parent folder where you want Copilot to create the project.
1. Open **Chat**.
1. Select **Agent** mode.
1. Confirm that the agent has access to the terminal and workspace.

Don't open a folder that contains unrelated files you don't want Copilot to inspect or modify.

## Scaffold the data app

Copy the following prompt into Copilot Chat:

```text
Set up a new Fabric data app for me, end to end.

Create the project in a folder named sales-insights. Before changing code, read any
copilot-instructions.md files and agent guidance included in the scaffolded project.

Do the work yourself instead of only printing instructions:
1. Run `npm create @microsoft/rayfin@latest -- "sales-insights" --template dataapp --workspace <workspace-name>`.
2. In the scaffolded project, run `npx rayfin connector add --type fabric-semanticmodel --workspace-id <workspace-id> --item-id <semantic-model-item-id> --name salesModel --operations executeQuery`.
3. Run the version-matched npm install command printed by the connector command.
4. Open and inspect the scaffolded project. Explain the data app template's DAX query,
   visualization, data grid, theme, and browser-validation patterns.
5. Configure the template to use ConnectorsRayfinClient, the generated salesModel
   schema, and the fabricSemanticModel() runtime. Don't retain or add a direct
   Execute Queries REST API client.
6. If authentication is required, run `npx rayfin login` and pause while I complete
   sign-in.
7. Run the existing build and report any errors.
8. Summarize the scaffolded app and wait for my semantic model requirements.

Ask before making a destructive change or using a force option.
```

Replace `<workspace-name>`, `<workspace-id>`, and `<semantic-model-item-id>` with values for your Fabric workspace and semantic model. Approve the commands as Copilot runs them, and complete the Rayfin sign-in flow when prompted.

## Ask Copilot to build your app

Describe the app's audience, questions, interactions, and visualizations. The `salesModel` connector already identifies the semantic model.

Use the following prompt as a starting recipe for a sales performance explorer. Adapt the business requirements to fields available in your model.

```text
Use the existing salesModel connector to build a sales performance explorer for
sales managers.

Requirements:
- Inspect the generated connector schema and semantic model metadata before editing.
  Use actual table, measure, and column names instead of guessing them.
- Show KPI callouts for the model's revenue, order volume, and margin measures when
  those measures are available.
- Add a time-series chart for sales performance, a bar chart that compares a useful
  business category, and a detailed data grid.
- Add date and category filters, and use the template's cross-highlighting behavior.
- Use the template's DAX generation patterns and visual primitives. Minimize the
  number of DAX queries and don't duplicate queries for the same data.
- Submit DAX with client.connectors.salesModel.executeQuery(), check the returned
  status, and handle success and error results.
- Apply the semantic model's format strings consistently to cards, charts, tooltips,
  and the data grid.
- Include loading, empty, and error states.
- Don't add mock data, embed credentials, or implement a separate authentication flow.
- Preserve the template's Fabric authentication and the semantic model connector.
- Don't add dependencies unless they're necessary.

Before editing, inspect the relevant files and give me a short implementation plan.
Ask me to clarify any model fields that are ambiguous. Then make the changes, run
the existing build, and use the template's browser validation workflow to check the
layout at desktop and mobile sizes. Explain any errors you fix.
```

Review Copilot's plan before it edits the project. If the plan doesn't match your requirements, correct it in Chat before approving implementation.

## Review the generated changes

After Copilot finishes, ask it to review its work:

```text
Review the changes you made against every requirement in my previous prompt.

Check for:
- DAX queries that reference fields that aren't in the semantic model.
- Duplicate or unnecessary DAX queries.
- Hard-coded sample data, credentials, access tokens, or a second sign-in flow.
- Formatting that ignores the semantic model's format strings.
- Charts, filters, cross-highlighting, or data grid interactions that don't work.
- Missing loading, empty, or error states.
- TypeScript or build errors.

Fix confirmed issues, run the existing build and browser validation, and summarize
the final behavior.
```

Inspect the source control diff in Visual Studio Code. Pay particular attention to:

- The `salesModel` connector configuration, generated schema, and DAX queries.
- Service configuration in `rayfin/rayfin.yml`.
- New dependencies in `package.json`.
- Authentication changes or direct REST calls that bypass the connector.
- Secrets or credentials that you must not commit.

## Deploy and verify the semantic model connection

Ask Copilot to deploy the app and verify its connection:

```text
Deploy the app with `npx rayfin up`, then run `npx rayfin up status` and confirm
that the deployment is healthy. Give me the Fabric portal link from the command
output.

Don't add mock data if a semantic model query fails. Check the workspace and model
IDs in the connector configuration, the Semantic Model Execute Queries REST API
tenant setting, my Build and Read permissions, the DAX query, the connector error
result, and the browser console. Report the exact failure and the corrective action.
```

Open the app from the Fabric portal to test live semantic model queries.

## Validate the app

Ask Copilot to run the project's existing validation:

```text
Validate the app without adding new tools.

1. Run the existing build and type-check commands from package.json.
2. Run the template's browser validation at desktop and mobile sizes.
3. Check for clipped charts, unreadable labels, empty visuals, and console errors.
4. Tell me which semantic model queries and user interactions I must verify in the
    Fabric portal.
5. Fix confirmed build, type, or layout errors, and rerun the failed check.
```

In the Fabric portal, verify the acceptance criteria you gave Copilot. Test authentication, filters, cross-highlighting, data formatting, empty states, error handling, and each visual's results.

## Deploy the finished app

After you review the changes and test the app, ask Copilot to deploy it:

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

## Continue iterating with Copilot

Use focused prompts for later changes. Include the desired behavior, affected users, constraints, and validation steps.

```text
Add a product detail view to the sales performance explorer.

Open the view when a user selects a product in the data grid. Use fields and measures
that exist in the semantic model, reuse existing query results where practical, and
preserve filters and formatting. Run the existing build and browser validation, then
list the interactions and DAX results I should verify in the Fabric portal.
```

Keep each request small enough to review. Commit a working state before you ask Copilot to make a large or potentially destructive change.

## Troubleshoot the Copilot workflow

### Copilot only prints commands

Tell Copilot to run the commands itself and report the results. Confirm that Chat is in **Agent** mode and terminal access is enabled.

### A command waits for sign-in

Complete the browser sign-in flow. Then tell Copilot that sign-in is complete so it can continue.

### Copilot edits the wrong folder

Stop the agent, open the scaffolded project folder in Visual Studio Code, and start a new Chat from that workspace.

### Deployment succeeds but semantic model queries fail

Ask Copilot to check the connector's workspace and model IDs, the Semantic Model Execute Queries REST API tenant setting, your Build and Read permissions, the generated DAX, the connector error result, and the browser console. Don't replace failed queries with mock data.

### Copilot proposes `--force`

Require Copilot to show the potentially destructive schema operations first. Accept `--force` only when you understand and approve the possible data loss.

For other issues, see [Troubleshoot Fabric Apps](troubleshooting.md).

## Related content

- [Create a CSV data explorer with Claude Code](create-app-with-claude-code.md)
- [Create an app connected to a semantic model](data-apps-template.md)
- [Connect Fabric Apps to Fabric data](connectors.md)
- [Create a Fabric app with the Rayfin CLI](create-app-with-cli.md)
- [Understand the Fabric Apps project structure](project-structure.md)
- [Deploy a Fabric app to Fabric](deploy-app.md)
