---
title: Create and deploy your first Fabric app with the Rayfin CLI
description: Learn how to scaffold a Microsoft Fabric app, run it locally, sign in, and deploy it to Microsoft Fabric by using the Rayfin CLI.
ms.reviewer: mksuni
ms.topic: tutorial
ms.date: 08/19/2026
ai-usage: ai-assisted
ms.search.form: Create and deploy a Fabric app with Rayfin CLI
---

# Create a Fabric app with the Rayfin CLI

This tutorial shows you how to use the Rayfin CLI to create a project, run it locally, and deploy it to Fabric. You use the same CLI workflow for new apps and for later updates to your schema or frontend.

In this tutorial, you:

- Create a Fabric Apps project from a template.
- Start the app locally.
- Sign in to Fabric from the CLI.
- Deploy the app to a Fabric workspace.
- Verify the deployment status.

## Prerequisites

- Access to Fabric.
- A Fabric workspace where you have Contributor, Member, or Admin permissions.
- The Fabric Apps workload enabled in your tenant.
- Node.js and npm installed.


## Create an app with an AI prompt

Use the following prompt with GitHub Copilot or another coding agent to create, explore, run, customize, and deploy a Fabric app:

```text
Set up a new Fabric App project called "rayfin-app-ws".

1. Run: npx -y @microsoft/create-rayfin@latest --project-name rayfin-app-ws --template blankapp
2. Open the scaffolded project directory.
3. Explore the project structure and understand the Rayfin app framework.
4. Run: npm run dev
5. Make changes to the app based on my instructions.
6. When ready, deploy with: npx rayfin up
```

The scaffold command supplies the project name and template for noninteractive execution. The agent can ask for any remaining workspace or deployment settings. Review generated files and command output before deployment.

## Create a new app from CLI

To scaffold a new app from a template, use `npm create`:

```bash
npm create @microsoft/rayfin@latest -- my-app --workspace <workspacename>
```

The default `blankapp` template resolves to **Universal App**. It creates a new npm workspace with backend configuration under `rayfin/`, frontend code in `packages/frontend/`, runtime data definitions in `packages/data/`, and shared contracts in `packages/shared/`. Data is disabled until you opt in.

Go to the project directory:

```bash
cd my-app
```

> [!TIP]
> If you already have an empty project folder or existing source code, use `npx rayfin init` instead of `npm create`.
>
> ```bash
> npx rayfin init .
> ```

### Review the generated project

After scaffolding, the project includes the files you need to start developing:

- `rayfin/rayfin.yml` stores app services and deployment settings.
- `rayfin/.env` stores environment values used by the CLI.
- `packages/frontend/` contains the UI and frontend build.
- `packages/data/` contains runtime entity classes and schema registration.
- `packages/shared/` contains client-facing record and schema contracts.

Enable persisted app data when needed:

```bash
npm run pack:add -- data-modeling
```

This capability enables Data and adds starter data and shared definitions. Check `services.data.path` and `services.staticHosting.path` in `rayfin/rayfin.yml` before adding files. Other templates can use a flat root `src/` and `rayfin/data/` layout; those layouts are alternatives, not the default Universal App layout.

The CLI keeps active deployment values in `rayfin/.env` and records deployments in `rayfin/.deployments.json`. Public `RAYFIN_PUBLIC_*` values are mapped into the frontend's generated `.env.local`; use `npx rayfin env --framework vite` to regenerate it without deploying.

For a detailed file-by-file breakdown, see [Understand the project structure](project-structure.md).

### Run the app locally

Start the local development environment:

```bash
npx rayfin dev
```

This command starts the frontend development server for the scaffolded app and deploys the backend to Fabric. To confirm the app starts correctly, open the local URL shown in the terminal.

### Deploy the app to Fabric

Build more features into your application. After you test your changes, deploy to Fabric again.

```bash
npx rayfin up
```

To preview the deployment without making changes, run:

```bash
npx rayfin up --dry-run
```

### Verify the deployment

Check the current deployment state:

```bash
npx rayfin up status
```

For a machine-readable response, use JSON output:

```bash
npx rayfin up status --json
```

After a successful deploy, the CLI prints the hosted app URL and the Fabric portal link for the deployed item.

### Deploy database or static content only

If you only changed data models, apply the database changes without a full redeploy:

```bash
npx rayfin up db apply
```

If you only changed frontend code, redeploy the static assets:

```bash
npx rayfin up staticapp deploy
```

### Add functions

Functions are TypeScript functions that run on the server inside your Fabric app. Use functions for logic that must not run in the browser, such as working with secrets, accessing privileged data, and calling external services with the app identity.

```bash
npx rayfin functions init
```

The initializer uses `services.functions.path` when configured, detects a workspace location such as `packages/functions`, or preserves an existing flat `rayfin/functions` package. Use `--path <relative-path>` to choose a location explicitly.

Enabled Functions require `services.functions.auth.type: application`. External calls through `ctx.Tokens.*` use the app identity and its permissions, not the invoking user's external-resource permissions. In current Fabric apps, that identity is the app item owner. Grant it access to each resource. By contrast, `ctx.getDataClient()` uses the invocation's Rayfin token and preserves the caller's data policies.

GitHub Copilot can generate and update the required files and components. You can also ask the agent to run the app, debug functions locally, and deploy the app. For example, you can use the following prompt to build an AI pull request review assistant by using functions:

```text
Build an app that lets me view all pull requests for the repository
<repoURL>, chat with my Azure AI Foundry agent <agentName> to review
pull requests, and post review comments. Use Functions with application
authentication to connect to Azure AI Foundry and Azure DevOps. Grant the
app identity the required resource permissions, and preserve the caller's
Rayfin data policies when using ctx.getDataClient().
```

See [Use Functions](functions.md) and [Connect Functions to external resources](functions-connect-external-resources.md) for identity and deployment details.

## Troubleshoot common issues

### Sign-in fails or deployment returns 401 or 403

Run `npx rayfin login` again, then retry `npx rayfin up`.

### You need to inspect what the CLI will do

Before deploying changes, run `npx rayfin up --dry-run`.

### The app deploys, but you change the schema only

To push schema changes independently, use `npx rayfin up db apply`. If you perform destructive changes like altering the type of a column or removing a column, this command fails. To force your changes, you can use the `--force` flag. This action can be a breaking change.

## Next steps

- See [Rayfin CLI reference](cli-reference.md) for the full command list.
- Learn more about deployment options in [Deploy a Fabric app to Fabric](deploy-app.md).
- Review [Understand the project structure](project-structure.md) before customizing the app.
- Define your backend schema in [Define data models](data-models.md).
