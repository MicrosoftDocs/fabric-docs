---
title: Run dbt Projects from GitHub in Microsoft Fabric
description: Run dbt projects in Microsoft Fabric by connecting to GitHub. Learn how to execute and monitor dbt jobs without moving your code.
ms.reviewer: akurnala
ms.date: 04/20/2026
ai-usage: ai-assisted
ms.subservice: data-factory
ms.topic: how-to
---

# Run dbt projects from GitHub in Microsoft Fabric

If your team already maintains a dbt project in GitHub, you can connect it to Microsoft Fabric and run it there. Your dbt project stays in GitHub and Fabric pulls the code and handles execution. You don't need to copy or rewrite anything.

- **GitHub** stores your dbt project code.
- **Fabric** runs dbt commands and displays the results.

## When to use this feature

This feature is a good fit if:

- You have an existing dbt project in a GitHub repository.
- You don't want to duplicate dbt code into Fabric.
- You want Fabric to handle execution and monitoring of dbt runs.

> [!NOTE]
> Currently, you can't write or edit dbt models in the Fabric UI. Fabric only supports running dbt commands from a connected GitHub repository.

## Prerequisites

Before you start, make sure you have:

- An existing dbt project stored in a GitHub repository
- Access to a Microsoft Fabric workspace with permission to create items
- A **classic GitHub Personal Access Token (PAT)** with access to the repository

Fabric uses the PAT to securely read your dbt project from GitHub.

## Connect and run a GitHub dbt project

To run a dbt project from GitHub in Fabric, follow these steps:

1. [Create a dbt job](#create-a-dbt-job)
1. [Connect to GitHub](#connect-to-github)
1. [Configure connection settings](#configure-connection-settings)
1. [Run the dbt job](#run-the-dbt-job)

### Create a dbt job

1. Open your Fabric workspace.
1. Select **New**.
1. Select **dbt job**.

   :::image type="content" source="media/dbt-run-github/create-dbt-job.png" alt-text="Screenshot of the new item menu in Microsoft Fabric with the dbt job option.":::

   :::image type="content" source="media/dbt-run-github/name-dbt-job.png" alt-text="Screenshot of the dbt job naming dialog in Microsoft Fabric.":::

The dbt job doesn't contain dbt code. It acts as a container that points to your GitHub project and runs commands against it.

### Connect to GitHub

1. Select **Connect to a GitHub project**.

   :::image type="content" source="media/dbt-run-github/connect-github-project.png" alt-text="Screenshot of the Connect to a GitHub project option in Microsoft Fabric.":::

1. From the list of available sources, select **GitHub - Source Control** under the **New Sources** category.

   :::image type="content" source="media/dbt-run-github/github-source-control.png" alt-text="Screenshot of the GitHub source control option in Microsoft Fabric.":::

### Configure connection settings

Provide the following details to create a connection between Fabric and GitHub:

- **Repository name or URL** - the GitHub repository that contains your dbt project.
- **Connection name** - a friendly name to identify this connection.
- **Classic PAT token** - used by Fabric to securely access the repository.

   :::image type="content" source="media/dbt-run-github/connect-github-project.png" alt-text="Screenshot of the GitHub connection settings form in Microsoft Fabric.":::

After you enter the connection details:

1. Select the **branch** to use (for example, `main`). Fabric pulls dbt code from this branch each time the job runs.

   :::image type="content" source="media/dbt-run-github/select-branch.png" alt-text="Screenshot of the branch selection dropdown for a dbt project in Microsoft Fabric.":::

1. Select the **adapter**. The adapter determines which data platform dbt runs against.

   :::image type="content" source="media/dbt-run-github/select-adapter.png" alt-text="Screenshot of the adapter selection dropdown for a dbt project in Microsoft Fabric.":::

### Run the dbt job

1. Save the dbt job.
1. Select **Run**.

   :::image type="content" source="media/dbt-run-github/run-project.png" alt-text="Screenshot of the Run button for a dbt job in Microsoft Fabric.":::

When the job runs, Fabric:

- Pulls the dbt project from the selected GitHub branch.
- Runs the configured dbt commands.
- Captures logs and execution status in the Fabric UI.

Use the logs to verify the run and troubleshoot any failures.

## Known limitations

- Currently, dbt projects connected through GitHub can't be authored or modified in the Fabric UI. Fabric only supports running dbt commands.

## Related content

- [dbt job OneLake logger](dbt-job-onelake-logger.md)
- [dbt jobs in Fabric](dbt-job-overview.md)
