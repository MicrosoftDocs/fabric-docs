---
title: Automate Git integration by using APIs and Azure DevOps
description: Learn how to automate Git integration in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs and Azure DevOps.
author: mberdugo
ms.author: monaberdugo
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 01/18/2024
---

# Automate Git integration by using APIs and Azure DevOps

The Microsoft Fabric [Git integration](intro-to-git-integration.md) tool enables teams to work together using source control to build an efficient and reusable release process for their Fabric content.

To achieve continuous integration and continuous delivery (CI/CD) of content, many organizations use automation tools, including [Azure DevOps](/azure/devops/user-guide/what-is-azure-devops). Organizations that use Azure DevOps, can use the [Power BI automation tools](#use-the-power-bi-automation-tools-extension) extension, which supports many of the Git integration API operations.

## Git integration API functions

You can use the [Git integration REST APIs](/rest/api/fabric/core/git) to integrate Fabric into your organization's automation process. Here are a few examples of what can be done by using the APIs:

* [**Commit**](/rest/api/fabric/core/git/commit-to-git) the changes made in the workspace to the connected remote branch.

* [**Connect**](/rest/api/fabric/core/git/connect) and [**disconnect**](/rest/api/fabric/core/git/disconnect) a specific workspace from the git repository and branch it's connected to.

* [**Get connection**](/rest/api/fabric/core/git/get-connection) details for the specified workspace.

* Get the [**Git status**](/rest/api/fabric/core/git/get-status) of items in the workspace, that can be committed to git.

* [**Initialize a connection**](/rest/api/fabric/core/git/initialize-connection) for a workspace that has been connected to git.

* [**Update the workspace**](/rest/api/fabric/core/git/update-from-git) with commits pushed to the connected branch.

## Before you begin

Before you use the Git integration APIs, make sure you have the following:

* The [*service principal*](/power-bi/developer/embedded/embed-service-principal), or the *user* that calls the APIs needs [pipeline and workspace permissions](understand-the-deployment-process.md#permissions) and access to an [Microsoft Entra application](/entra/identity-platform/how-applications-are-added).

* If you're going to use PowerShell scripts, install the Power BI PowerShell cmdlets [Install-Module MicrosoftPowerBIMgmt](/powershell/power-bi/overview).

## Integrate your pipeline with Azure DevOps

To automate the deployment processes from within your [release pipeline in Azure DevOps](/azure/devops/pipelines), use one of these methods:

* **PowerShell** - The script signs into Fabric using a *service principal* or a *user*.

* **Power BI automation tools** - This extension works with a [*service principal*](/power-bi/developer/embedded/embed-service-principal) or a *user*.

You can also use other [Power BI REST API](/rest/api/power-bi/) calls, to complete related operations such as importing a *.pbix* into the pipeline, updating data sources and parameters.

### Use the Power BI automation tools extension

The Power BI automation tools extension is an [open source](https://github.com/microsoft/powerbi-azure-pipelines-extensions) Azure DevOps extension that provides a range of deployment pipelines operations that can be performed in Azure DevOps. The extension eliminates the need for APIs or scripts to manage pipelines. Each operation can be used individually to perform a task, such as creating a pipeline. Operations can be used together in an Azure DevOps pipeline to create a more complex scenario, such as creating a pipeline, assigning a workspace to the pipeline, adding users, and deploying.

After you add the [Power BI automation tools](https://marketplace.visualstudio.com/items?itemName=ms-pbi-api.pbi-automation-tools) extension to DevOps, you need to create a service connection. The following connections are available:

* **Service principal** (recommended) - This connection authenticates by using a [service principal](/power-bi/developer/embedded/embed-service-principal) and requires the Microsoft Entra app’s secret and application ID. When you use this option, verify that the [service admin settings](/power-bi/developer/embedded/embed-service-principal#step-3---enable-the-power-bi-service-admin-settings) for the service principal are enabled.

* **Username and password** – Configured as a generic service connection with a username and a password. This connection method doesn’t support multi-factor authentication. We recommend that you use the service principal connection method because it doesn’t require storing user credentials on Azure DevOps.

>[!NOTE]
>The Power BI automation tools extension uses an Azure DevOps service connection to store credentials. For more information, see [How we store your credentials for Azure DevOps Services](/azure/devops/organizations/security/credential-storage).

After you enable a service connection for your Azure DevOps Power BI automation tools, you can [create Git tasks](/azure/devops/extend/develop/add-build-task). The extension includes the following deployment pipelines tasks:

* Create a new pipeline

* Assign a workspace to a pipeline stage

* Add a user to a deployment pipeline

* Add a user to a workspace

* Deploy content to a deployment pipeline

* Remove a workspace from a deployment pipeline

* Delete a pipeline

### Access the PowerShell samples

You can use the following PowerShell scripts to understand how to perform several automation processes. To view or copy the text in a PowerShell sample, use the links in this section.

You can also download the entire [`PowerBI-Developer-Samples`](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/DeploymentPipelines-WaitForDeployment.ps1) GitHub folder.

* [Create workspace](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/Create-Workspace.ps1)

* [Selective deployment](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/DeploymentPipelines-SelectiveDeploy.ps1)

* [Wait for deployment](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/DeploymentPipelines-WaitForDeployment.ps1)

* [End to end example of pipeline creation and backward deployment](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/DeploymentPipelines-E2ESampleFromPipelineCreationToDeployment.ps1)

* [Assign an admin user to a pipeline](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/DeploymentPipelines-AddUserToPipeline.ps1)

### Examples

This section describes an examples of how to accomplish some basic Git integration tasks using  PowerShell script that deploys a semantic model, report, and dashboard, from the development stage to the test stage. The script then checks whether the deployment was successful.

To run a PowerShell script, you need the following components.

***Do these steps apply here?***

1. **Sign in** - Before you can deploy your content, you need to sign in to Fabric using a *service principal* or a *user*. Use the [Connect-PowerBIServiceAccount](/powershell/module/microsoftpowerbimgmt.profile/connect-powerbiserviceaccount) command to sign in.

2. **Build your request body** - In this part of the script you specify which items (such as reports and dashboards) you're deploying.

    ```powershell
    $body = @{ 
        sourceStageOrder = 0 # The order of the source stage. Development (0), Test (1).   
        datasets = @(
            @{sourceId = "Insert your dataset ID here" }
        )      
        reports = @(
            @{sourceId = "Insert your report ID here" }
        )            
        dashboards = @(
            @{sourceId = "Insert your dashboard ID here" }
        )

        options = @{
            # Allows creating new item if needed on the Test stage workspace
            allowCreateArtifact = $TRUE

            # Allows overwriting existing item if needed on the Test stage workspace
            allowOverwriteArtifact = $TRUE
        }
    } | ConvertTo-Json
    ```

3. 

#### Connect and Sync

1. Call the [Connect](/rest/api/fabric/core/git/connect) API to connect the workspace to a Git repository and branch.
1. Call the [Initialize Connection](/rest/api/fabric/core/git/initialize-connection) API to initialize the connection between the workspace and the Git repository/branch.
1. Based on the response from the Initialize Connection API, call either the [Commit To Git](/rest/api/fabric/core/git/commit-to-git) or [Update From Git](/rest/api/fabric/core/git/update-from-git) API to complete the sync, or do nothing if no action required.

#### Commit All

Call the [Commit To Git](/rest/api/fabric/core/git/commit-to-git) API to commit all uncommitted changes from the workspace to the connected remote branch.

#### Selective Commit

1. Select the specific items that were changed and need to be committed.
1. Call the [Commit To Git](/rest/api/fabric/core/git/commit-to-git) API to commit the selected changes from the workspace to the connected remote branch.

#### Update from Git

1. Call the [Get Status](/rest/api/fabric/core/git/get-status) API to build the update from git request body.
1. Call the [Update From Git](/rest/api/fabric/core/git/update-from-git) API to update the workspace with commits pushed to the connected branch.

#### Monitor the progress of long running operations

1. Retrieve the operationId from [Update From Git](/rest/api/fabric/core/git/update-from-git) or [Commit To Git](/rest/api/fabric/core/git/commit-to-git) scripts
1. Call the [Get LRO Status](/rest/api/fabric/core/git/get-status) API every x seconds and print the status.

#### Resolve conflicts

1. Get from user's preferences to resolve the conflicts (**PreferRemote\PreferWorkspace**)
1. Call the [Get Status](/rest/api/fabric/core/git/get-status) API to build the update from git request body.
1. Call the [Update From Git](/rest/api/fabric/core/git/update-from-git) API to update the workspace with commits pushed to the connected branch.

## Considerations and limitations

* Git integration with using APIs is subject to the same [limitations](./git-integration-process.md#considerations-and-limitations) as the Git integration user interface.

## Related content

* [Get started with Git integration](git-get-started.md)
* [Deployment pipelines best practices](../best-practices-cicd.md)
* [Troubleshooting deployment pipelines](../troubleshoot-cicd.md)
