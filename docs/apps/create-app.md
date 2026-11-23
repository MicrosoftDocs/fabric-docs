---
title: Create your first Fabric apps project
description: Learn how to create and run your first Microsoft Fabric apps project locally using the Rayfin CLI and templates.
ms.reviewer: mksuni
ms.topic: quickstart
ms.date: 08/24/2026
ai-usage: ai-assisted
ms.search.form: Getting started with Fabric app
---

# Create your first Fabric app

Fabric apps helps you build and ship backend services faster by providing ready-to-use infrastructure for authentication, data persistence, and static hosting. This quickstart shows you how to create your first app in Fabric.

## Prerequisites

- A Microsoft account with access to Fabric or Power BI Pro license.
- A workspace where you have contributor or admin permissions.
- Latest [Node.js version](https://nodejs.org/en/download)

## From nothing to a running app

Create and run a Fabric app with four commands. Rayfin deploys your backend to Microsoft Fabric, and you run your frontend locally against it. You don't run the backend locally.

```bash
npm create @microsoft/rayfin@latest my-app
cd my-app
npx rayfin up
npm run dev
```

Run `npx rayfin up status` to confirm the backend deployment.

### Let an agent create the app

Copy the following prompt into GitHub Copilot or another coding agent that has access to a terminal:

```text
Set up a new Rayfin app for me, end to end.

Rayfin is a backend platform for TypeScript developers on Microsoft Fabric. Before writing
any code, read https://rayfin.ai/docs/reference/agent-rules.md. Every page on that site is
available as raw Markdown by appending .md to its URL.

Then do the work yourself rather than printing steps for me:
1. Scaffold a project with `npm create @microsoft/rayfin@latest my-app` and install dependencies.
2. Sign in with `npx rayfin login`.
3. Deploy with `npx rayfin up` and confirm it with `npx rayfin up status`.
4. Start the frontend with `npm run dev` and tell me the URL to open.
```

Review the generated files and command output before you deploy the app.

## Create an app from portal

Open the portal for your licensing option and sign in:

- For the Power BI Pro experience, open the [Power BI portal](https://app.powerbi.com) with an account that has Power BI Pro.
- For a capacity-backed app, open the [Fabric portal](https://app.fabric.microsoft.com).

### Select a workspace

Select a workspace where you have contributor or admin permissions. Use a Pro workspace for the Power BI Pro experience, or a workspace assigned to Fabric capacity or an active Fabric trial for a capacity-backed app.

If you don't have an existing workspace, create one:

1. Select **Workspaces** in the left navigation.
1. Select **New workspace**.
1. Enter a name for the workspace.
1. Select the workspace license mode for your deployment: **Pro** for the Power BI Pro experience, or the appropriate capacity option for a capacity-backed app.

The Pro option doesn't require assigning Fabric capacity. Review the [Power BI Pro limits](licensing.md#power-bi-pro-limits) before creating the app. For either option, continue with the following app creation steps.

### Create a new Fabric app

1. In the workspace view, select **New item**.
1. Search for **App** in the item type list or scroll to find it.
1. Select **App** item to open the creation dialog.
1. Enter a name for your Fabric app (for example, `my-rayfin-app`).
1. Select **Create**.

### Open, edit, and deploy your app

You can develop locally using [Rayfin CLI](https://www.npmjs.com/package/@microsoft/rayfin-cli).

1. Open a terminal of your choice.
1. Use the CLI command script shown in the portal and run in your terminal to download the app locally.

   **Example**

   ```bash
   npm create @microsoft/rayfin@latest -- "<appitemname>" --template todoapp --workspace <workspacename>
   ```

1. Go to the project directory.

   ```bash
   cd <your project directory>
   ```

1. Customize your app by editing the code directly or with the help of GitHub Copilot.

1. Test local changes with your Fabric backend with the command.

   ```bash
   npm run dev
   ```

1. Publish your changes with:

   ```bash
   npx rayfin up 
   ```

   To deploy to another workspace, you can provide the `--workspace` parameter.

   ```bash
   npx rayfin up --workspace <workspacename>
   ```

   To switch between these two workspaces , run `npx rayfin switch --workspace <workspace>`.

## Next steps

- Explore [Data models & decorators](data-models.md) to define your backend schema.
- Learn how to connect frontends with the [GraphQL guide](read-write-data-graphql.md).
- Configure authentication with [Authentication](authentication.md).

## Related content

- [Understand the project structure](project-structure.md)
- [Define data models](data-models.md)
- [Deploy to Fabric](deploy-app.md)
