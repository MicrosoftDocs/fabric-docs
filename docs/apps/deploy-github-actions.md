---
title: Deploy a Fabric app with GitHub Actions
description: Learn how to set up a GitHub Actions workflow to deploy a Fabric app from a GitHub repository to a Fabric workspace, including patterns for feature branches.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 05/16/2026
ai-usage: ai-assisted
ms.search.form: Deploy with GitHub Actions
---

# Deploy a Fabric app with GitHub Actions

Automate deployments of a Fabric app from a GitHub repository to a Fabric workspace by using a GitHub Actions workflow. The workflow signs in to Fabric with a service principal, installs the Rayfin CLI, and runs `rayfin up` to apply your code, database schema, and static content to the target workspace.
This article shows you how to:

> [!div class="checklist"]
>
> - Prepare a service principal and a Fabric workspace for automated deployments.
> - Configure the GitHub repository secrets the workflow needs.
> - Add the deployment workflow file to your repository.
> - Trigger deployments automatically on `main` and manually with optional destructive-change support.
> - Reuse the same workflow for feature branches and environment-specific deployments.

## Prerequisites

- A Fabric app project in a GitHub repository. If you don't have one yet, see [Create your first Fabric Apps project](create-app.md) and push your application code to repository.
- A Microsoft Fabric workspace that the service principal can deploy to. For environment separation, see [Manage dev and prod environments](dev-prod-workflow.md).
- A Microsoft Entra ID service principal (app registration) with a client secret.
- Permission to add **secrets** to the GitHub repository.

## Step 1: Create a service principal for deployments

The workflow signs in non-interactively, so it uses a service principal instead of an interactive user account.

1. In the [Azure portal](https://portal.azure.com), register a new application under **Microsoft Entra ID** > **App registrations**.
1. Record the **Application (client) ID** and the **Directory (tenant) ID**.
1. Under **Certificates & secrets**, create a new **client secret** and copy the value. Store it securely: you can't view it again later.
1. Grant the service principal **Contributor** or higher permission on the target Fabric workspace so it can create and update the Fabric app item.

> [!IMPORTANT]
> Service principal deployments require Fabric tenant settings that allow service principals to use Fabric APIs. Confirm with your Fabric administrator that this is enabled.

## Step 2: Add repository secrets

In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions** and add the following repository secrets:

| Secret name | Value |
| --- | --- |
| `CLIENT_ID` | The Application (client) ID of the service principal. |
| `TENANT_ID` | The Directory (tenant) ID. |
| `CLIENT_SECRET` | The client secret value. |
| `FABRIC_WORKSPACE_NAME` | The name of the target Fabric workspace (for example, `my-app-prod`). |

## Step 3: Add the workflow file

In your repository, create the file `.github/workflows/deploy-to-fabric.yml` with the following content:

```yaml
name: Deploy to Fabric

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      force:
        description: 'Allow destructive schema changes that may result in data loss'
        required: false
        default: false
        type: boolean

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: read

jobs:
  deploy:
    name: Deploy to Fabric
    runs-on: ubuntu-latest
    env:
      CLIENT_ID: ${{ secrets.CLIENT_ID }}
      TENANT_ID: ${{ secrets.TENANT_ID }}
      CLIENT_SECRET: ${{ secrets.CLIENT_SECRET }}
      FABRIC_WORKSPACE_NAME: ${{ secrets.FABRIC_WORKSPACE_NAME }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Rayfin CLI
        run: npm install -g @microsoft/rayfin-cli

      - name: Login to Rayfin with service principal
        run: |
          rayfin login \
            --service-principal \
            -t $TENANT_ID
            -u $CLIENT_ID
            -p CLIENT_SECRET

      - name: Deploy to Fabric
        run: |
          EXTRA_ARGS=""

          if [[ "${{ inputs.force }}" == "true" ]]; then
            EXTRA_ARGS="$EXTRA_ARGS --force"
          fi

          rayfin up \
            --workspace "$FABRIC_WORKSPACE_NAME" \
            --yes \
            $EXTRA_ARGS
```

### What each section does

- **`on.push`**: Runs the workflow automatically on every push to `main`.
- **`on.workflow_dispatch`**: Adds a **Run workflow** button in the GitHub Actions UI with a **force** checkbox. Enabling **force** passes `--force` to `rayfin up` so destructive schema changes (such as dropping columns or tables) are permitted. Leave it unchecked for safe, non-destructive deploys.
- **`concurrency`**: Ensures only one deployment per branch runs at a time. If a new push lands while a previous deploy is still running, the older run is canceled in favor of the newer commit. This setting prevents two `rayfin up` jobs from racing on the same workspace.
- **`env`**: Passes the service principal credentials and target workspace name into the job.
- **`Install Rayfin CLI`**: Installs the CLI globally so `rayfin` is on the PATH.
- **`Login to Fabric with service principal`**: Authenticates using the `*` environment variables.
- **`Deploy to Fabric`**: Runs `rayfin up` against the configured tenant and workspace. `--yes` accepts non-destructive prompts; `--force` is added only when the manual run requested it.

## Step 4: Trigger a deployment

You can trigger the workflow in two ways:

- **Automatically**: Push or merge a commit to the `main` branch.
- **Manually**: In GitHub, go to **Actions** > **Deploy to Fabric** > **Run workflow**. Select the branch to deploy and optionally check **Allow destructive schema changes that may result in data loss** before starting the run.

After the workflow finishes, the **Deploy to Fabric** step in the run log prints the Fabric app URL and the deployment ID.

## Considerations and limitations

- **Concurrency is per branch.** The `concurrency.group` includes `github.ref`, so deploys to different branches don't cancel each other. This behavior is intentional when you map branches to different workspaces.
- **Destructive changes are blocked by default.** `rayfin up` refuses schema operations that can lose data unless `--force` is passed. Only enable **force** for a manual run when you've reviewed the planned operations.
- **Workspaces must exist.** The workflow doesn't create Fabric workspaces. Create them in the Fabric portal and grant the service principal access first.

## Related content

- [Deploy a Fabric app to Fabric](deploy-app.md)
- [Manage dev and prod environments](dev-prod-workflow.md)
- [Rayfin CLI reference](cli-reference.md)
