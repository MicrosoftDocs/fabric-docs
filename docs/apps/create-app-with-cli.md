---
title: Create and deploy your first Fabric app with the Rayfin CLI
description: Learn how to scaffold a Microsoft Fabric app, run it locally, sign in, and deploy it to Microsoft Fabric by using the Rayfin CLI.
ms.reviewer: mksuni
ms.topic: tutorial
ms.date: 06/02/2026
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

If the Fabric Apps workload isn't enabled yet, ask a Fabric administrator to turn on **Fabric Apps (preview)** in the Fabric admin portal.

## Step 1: Create a new project

To scaffold a new app from a template, use `npm create`:

```bash
npm create @microsoft/rayfin@latest -- my-app --workspace <workspacename>
```

This command creates a new project folder with the app template, the `rayfin` configuration, and the frontend source code.

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

## Step 2: Review the generated project

After scaffolding, the project includes the files you need to start developing:

- `rayfin/rayfin.yml` stores app services and deployment settings.
- `rayfin/.env` stores environment values used by the CLI.
- `rayfin/data/` contains your data model files.
- Your frontend app lives in the root project structure created by the selected template.

For a detailed file-by-file breakdown, see [Understand the project structure](project-structure.md).

## Step 3: Run the app locally

Start the local development environment:

```bash
npm run dev
```

This command starts the frontend development server for the scaffolded app and deploys the backend to Fabric. To confirm the app starts correctly, open the local URL shown in the terminal.

## Step 4: Deploy the app to Fabric

Build more features into your application. After you test your changes, deploy to Fabric again.

```bash
npx rayfin up
```

To preview the deployment without making changes, run:

```bash
npx rayfin up --dry-run
```

## Step 5: Verify the deployment

Check the current deployment state:

```bash
npx rayfin up status
```

For a machine-readable response, use JSON output:

```bash
npx rayfin up status --json
```

After a successful deploy, the CLI prints the hosted app URL and the Fabric portal link for the deployed item.

## Step 6: Deloy database or static content only

If you only changed data models, apply the database changes without a full redeploy:

```bash
npx rayfin up db apply
```

If you only changed frontend code, redeploy the static assets:

```bash
npx rayfin up staticapp deploy
```

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
