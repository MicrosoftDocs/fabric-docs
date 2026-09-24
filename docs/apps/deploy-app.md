---
title: Deploy a Fabric App to Fabric
description: Learn how to deploy your Fabric App to Microsoft Fabric using the CLI
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 06/02/2026
ai-usage: ai-assisted
ms.search.form: Deploy to Fabric
---

# Deploy a Fabric app to Fabric

Deploy a Fabric app to Fabric by signing in, running the CLI deployment flow, and reviewing what `npx rayfin up` configures for your app. This article walks through the concept of what happens during deployment.

## Prerequisites

- A Fabric Apps project with a `rayfin/rayfin.yml` configuration file. If you don't have a project yet, see [Create your first Fabric Apps project](create-app.md).
- A Microsoft Entra ID account with access to a Fabric workspace.

## Deploy your application

Run the following command from your project root:

```bash
npx rayfin up
```

If you aren't signed in, the CLI launches an interactive sign-in flow automatically.

### What the deployment does

The `rayfin up` command performs these steps in order:

1. Creates a Fabric Apps item in your Fabric workspace (or reuses the existing one on subsequent deploys).
1. Retrieves the publishable key from the remote service.
1. Syncs runtime settings from your `rayfin.yml` to the remote service, including auth configuration and service flags.
1. Applies the database schema generated from your TypeScript data model decorators.
1. Builds and deploys static content if `staticHosting` is enabled in `rayfin.yml`—runs your build command, packages the output folder into a ZIP, and uploads it.
1. Persists deployment details to `rayfin.yml` and `.env.fabric-*` files for subsequent deploys.

After deployment, the CLI prints:

- The hosting URL where your app is live
- A Fabric portal link to manage the deployment
- The deployment ID for reference

### Configure authentication

Only **Fabric brokered authentication (Entra SSO)** is supported on deployed applications. Email and password authentication is available during local development but doesn't work after deploying to Fabric.

Ensure your `rayfin.yml` has Fabric auth enabled before running `rayfin up`:

```yaml
services:
  auth:
    enabled: true
    fabric:
      enabled: true
```

### Preview deployment without changes

Use `--dry-run` to see what the CLI would do without creating or modifying any resources:

```bash
npx rayfin up --dry-run
```

## Apply database changes

After updating your data models, push schema changes to the remote database without redeploying the full stack:

```bash
npx rayfin up db apply
```

If the schema change involves potentially destructive operations (dropping columns, renaming tables), the CLI warns you and refuses to proceed. Use `--force` to override the safety check:

```bash
npx rayfin up db apply --force
```

> [!CAUTION]
> Using `--force` can cause data loss. Review the listed operations carefully and confirm you accept the consequences before proceeding.

## Redeploy static content

When you only changed frontend code, redeploy static content independently for a faster iteration cycle:

```bash
npx rayfin up staticapp deploy
```

This command runs your configured `buildCommand`, packages the output, and uploads it to the remote service.

To skip the build step and deploy existing output:

```bash
npx rayfin up staticapp deploy --skip-build
```

## Check deployment status

View the current state of your Fabric deployment:

```bash
npx rayfin up status
```

Add `--json` for machine-readable output:

```bash
npx rayfin up status --json
```

## Update existing deployments

After the first deploy, `rayfin.yml` stores the deployment details (`rayfinItemId`, `fabricWorkspaceId`, and the item endpoint). Running `npx rayfin up` again updates the same deployment rather than creating a new one.

For targeted updates, use the subcommands:

| Command | What it updates |
| --- | --- |
| `npx rayfin up` | Everything: settings, database, and static content. |
| `npx rayfin up db apply` | Database schema only. |
| `npx rayfin up staticapp deploy` | Static content only. |

## Troubleshoot deployment issues

### Deployment fails with 401 or 403 error

Your session might have expired. Run `npx rayfin login` to reauthenticate, then retry `npx rayfin up`.

### Database apply reports destructive changes

The Rayfin CLI blocks schema changes that could cause data loss. Review the listed operations and use `npx rayfin up db apply --force` only after confirming you accept the data loss.

### Static deploy exceeds size limit

The compressed archive must not exceed 100 MB. Optimize your build output by excluding source maps and large development assets, or move binary files to Fabric Apps storage.

## Manage your app in the Fabric portal

After deployment, you can manage your Fabric app directly in the [Fabric portal](https://app.fabric.microsoft.com/).

### View item properties

Open the Fabric app in the Fabric portal to see:

- **App URL** — The public URL where your static content is hosted.
- **App backend URL** — The base URL for all backend services.

### Manage child services

Select the Fabric app to see its child services:

- **SQL Database** — Opens the Fabric SQL query editor. You can run read queries against your data. Schema changes made directly in the Fabric portal are overwritten on the next `rayfin up` deploy.
- **Authentication** — View and manage authenticated users in the **Users** table in the child SQL Database.

## App permissions

For any contributors of the Fabric app, in order to deploy a Fabric app, they need at minimum **Edit** permission on the item.

## Related content

- [Create your first Fabric Apps project](create-app.md)
- [Define data models with TypeScript decorators](data-models.md)
- [Understand Fabric Apps project structure](project-structure.md)
