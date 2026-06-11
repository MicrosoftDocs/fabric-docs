---
title: Create your first Fabric apps project
description: Learn how to create and run your first Microsoft Fabric apps project locally using the Rayfin CLI and templates.
ms.reviewer: mksuni
ms.topic: quickstart
ms.date: 06/02/2026
ai-usage: ai-assisted
ms.search.form: Getting started with Fabric app
---

# Create your first Fabric app

Fabric apps helps you build and ship backend services faster by providing ready-to-use infrastructure for authentication, data persistence, and static hosting. This quickstart shows you how to create your first app in Fabric.

## Prerequisites

- A Microsoft account with access to Microsoft Fabric.
- A Fabric workspace where you have contributor or admin permissions.
- Fabric app enabled by a tenant admin in settings. See [Enable Fabric app in tenant admin settings](#enable-fabric-app-in-tenant-admin-settings).

## Enable Fabric app in tenant admin settings

A Fabric tenant administrator must enable the Fabric app workload before users can create Rayfin items.
If you are not a tenant admin, contact your organization's Fabric administrator to complete this step.

1. Sign in to the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal).
1. Navigate to **Tenant settings**.
1. Under **Fabric apps (preview)**, toggle the setting to **Enabled**.
1. Choose whether to enable it for the entire organization or specific security groups.
1. Select **Apply**.

Changes may take a few minutes to propagate.
After the setting is enabled, users in the allowed scope can create Fabric apps in their workspaces.

## Step 1: Sign in to the Fabric portal

Open [Microsoft Fabric](https://app.fabric.microsoft.com) in your browser and sign in with your Microsoft account.

## Step 2: Select a workspace

After signing in, select a workspace from the left navigation panel.
If you do not have an existing workspace, create one:

1. Select **Workspaces** in the left navigation.
1. Select **New workspace**.
1. Enter a name for the workspace and select Fabric capacity.

## Step 3: Create a new Fabric app

1. In the workspace view, select **New item**.
1. Search for **App** in the item type list or scroll to find it.
1. Select **App** item to open the creation dialog.
1. Enter a name for your Fabric app (for example, `my-rayfin-app`).
1. Select **Create**.

## Step 4: Open, edit, and deploy your app

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
- [Deploy to Microsoft Fabric](deploy-app.md)
