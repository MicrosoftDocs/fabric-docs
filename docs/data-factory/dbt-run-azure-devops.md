---
title: Run dbt projects from Azure DevOps with a dbt job
description: Connect a dbt Job in Microsoft Fabric to a dbt project in Azure DevOps Repos, then run, schedule, and monitor it with Microsoft Entra sign-in.
ms.reviewer: meghasony
ms.date: 11/16/2026
ai-usage: ai-assisted
ms.subservice: data-factory
ms.topic: how-to
ms.custom:
  - dbt
---

# Run dbt projects from an Azure DevOps repository in Microsoft Fabric

If your team keeps its dbt project in Azure DevOps, you can run it in Microsoft Fabric without moving any code. Connect a dbt Job to your Azure DevOps repository, and Fabric pulls the project from your branch on every run.

- **Azure DevOps** stores your dbt project and keeps your pull requests, reviews, and branch policies.
- **Fabric** runs dbt commands, schedules runs, and shows the results.

## Benefits

- **No copy or sync.** Every run uses the latest code on your branch.
- **Sign in with Microsoft Entra ID.** Connect with your organizational account or a service principal. A service principal isn't tied to a person, so repository access doesn't depend on that person's account. Scheduled runs still require valid credentials and permissions for the target connection.
- **Run projects from any folder.** Point the dbt Job to the folder that holds `dbt_project.yml`. One repository can hold several dbt projects.

## Prerequisites

- A Fabric workspace where you have the [Contributor role](/fabric/fundamentals/roles-workspaces) or higher.
- A dbt project in an Azure DevOps Git repository.
- Read access to the repository through your organizational account or a service principal.
- An existing target for the dbt job, such as a warehouse, with the [required permissions and access](dbt-job-overview.md#required-permissions-and-access).

### Create a dbt job

1. In your workspace, select **+ New item** > **dbt job**.

   :::image type="content" source="media/dbt-run-azure-devops/create-dbt-job.png" alt-text="Screenshot of the New item pane in Microsoft Fabric with the dbt job item highlighted.":::

1. Enter a name, and then select **Create**.
1. Select **Connect to a Git project**.

   :::image type="content" source="media/dbt-run-azure-devops/connect-to-git-project.png" alt-text="Screenshot of the dbt Job start page with the Connect to a Git project option highlighted." lightbox="media/dbt-run-azure-devops/connect-to-git-project.png":::

1. Under **New sources**, select **Azure DevOps - Source control**.

   To reuse a connection, select it under **OneLake catalog** instead, and go to [Select the branch, folder, and target](#select-the-branch-folder-and-target).

### Connect to Azure DevOps

1. In **Azure DevOps URL**, enter the repository URL, such as `https://dev.azure.com/contoso/analytics/_git/dbt-models`.
1. Enter a **Connection name**.
1. Under **Authentication kind**, select one of these options:
   - **Organizational account**: Select **Sign in**.
   - **Service principal**: Enter these values:
     - **Tenant ID**: The Microsoft Entra tenant that your Azure DevOps organization connects to.
     - **Service principal client ID**: The application (client) ID.
     - **Service principal Key**: The client secret.

   :::image type="content" source="media/dbt-run-azure-devops/azure-devops-connection-settings.png" alt-text="Screenshot of the Connect to a Git project dialog with the Azure DevOps URL and Authentication kind fields highlighted." lightbox="media/dbt-run-azure-devops/azure-devops-connection-settings.png":::

   :::image type="content" source="media/dbt-run-azure-devops/service-principal-authentication.png" alt-text="Screenshot of the service principal fields: Tenant ID, Service principal client ID, and Service principal Key." lightbox="media/dbt-run-azure-devops/service-principal-authentication.png":::

1. Select **Next**.

### Select the branch, folder, and target

1. In **Branch**, enter the branch to run, such as `main`. Fabric pulls the project from this branch on every run.
1. In **Folder path**, enter the folder that contains `dbt_project.yml`, such as `projects/jaffle_warehouse`. Leave it empty if the project is at the repository root.

   :::image type="content" source="media/dbt-run-azure-devops/branch-folder-path.png" alt-text="Screenshot of the Connection setup step with the Branch and Folder path fields highlighted." lightbox="media/dbt-run-azure-devops/branch-folder-path.png":::

1. Select **Next**, and then select where dbt runs, such as an existing warehouse on the **OneLake catalog** tab.
1. Enter a **Schema**. 
1. Keep **Seed data?** selected to load your seed files right away. Clear it to skip this step.
1. Select **Connect**.

   :::image type="content" source="media/dbt-run-azure-devops/profile-connection-setup.png" alt-text="Screenshot of the Profile connection setup step with the Schema field and the Seed data option highlighted." lightbox="media/dbt-run-azure-devops/profile-connection-setup.png":::

### Run the dbt Job

The dbt Job shows the connected repository, branch, and folder path.

:::image type="content" source="media/dbt-run-azure-devops/connected-azure-devops-repository.png" alt-text="Screenshot of a dbt Job connected to an Azure DevOps repository, showing the repository, branch, and folder path." lightbox="media/dbt-run-azure-devops/connected-azure-devops-repository.png":::

1. Select a command, such as **build**.
1. Select **Run**.
1. Review the results on the **Output** tab.

To run the dbt Job on a schedule, see [Schedule dbt Jobs](dbt-job-how-to.md#schedule-dbt-jobs).

## Update the project or the connection

- **Change models or tests**: Push the change to the branch in Azure DevOps. The next run uses it.
- **Change the branch or folder**: Select **Advanced settings**. On the **General** tab, update **Branch** or **Folder path**, and then select **Apply**.

  :::image type="content" source="media/dbt-run-azure-devops/change-branch-folder-path.png" alt-text="Screenshot of the Advanced settings General tab with the Branch and Folder path fields highlighted." lightbox="media/dbt-run-azure-devops/change-branch-folder-path.png":::

- **Update credentials or rotate a client secret**: Select **Settings** > **Manage connections and gateways**, and then edit the connection.
- **Stop using the repository**: Select **Disconnect Azure DevOps**.

## Known limitations

You can't edit project files in Fabric. Make changes in Azure DevOps.

## Related content

- [dbt Job in Microsoft Fabric](dbt-job-overview.md)
- [Configure a dbt Job](dbt-job-configure.md)
- [Run dbt projects from a GitHub repository](dbt-run-github.md)
- [Use service principals and managed identities in Azure DevOps](/azure/devops/integrate/get-started/authentication/service-principal-managed-identity)
