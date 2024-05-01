---
title: Automate deployment pipelines with APIs and Azure DevOps
description: Learn how to automate your deployment pipeline, the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs and Azure DevOps.
author: data-goblin
ms.author: v-kurtbuhler
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/02/2023
ms.search.form: Deployment pipelines APIs, Automate deployment pipelines, Power BI automation tools, Azure DevOps integration
---

# Automate your deployment pipeline by using APIs and Azure DevOps

The Microsoft Fabric [deployment pipelines](intro-to-deployment-pipelines.md) tool enables business intelligence teams to build an efficient and reusable release process for their Fabric content.

To achieve continuous integration and continuous delivery (CI/CD) of content, many organizations use automation tools, including [Azure DevOps](/azure/devops/user-guide/what-is-azure-devops). Organizations that use Azure DevOps, can use the [Power BI automation tools](#use-the-power-bi-automation-tools-extension) extension, which supports many of the deployment pipelines API operations.

You can use the [deployment pipelines Power BI REST APIs](/rest/api/power-bi/pipelines) to integrate Fabric into your organization's automation process. Here are a few examples of what can be done by using the APIs:

* Manage pipelines from start to finish, including creating a pipeline, assigning a workspace to any stage, and deploying and deleting the pipeline.

* Assign and unassign users to and from a pipeline.

* Integrate Fabric into familiar DevOps tools such as [Azure DevOps](/azure/devops/user-guide/what-is-azure-devops) or [GitHub Actions](https://docs.github.com/en/actions).

* Schedule pipeline deployments to happen automatically at a specific time.

* Deploy multiple pipelines at the same time.

* Cascade depending on pipeline deployments. If you have content that's connected across pipelines, you can make sure some pipelines are deployed before others.

## Deployment pipelines API functions

> [!NOTE]
> The deployment pipelines APIs currently only work for Power BI items.

The [deployment pipelines Power BI REST APIs](/rest/api/power-bi/pipelines) allow you to perform the following functions:

* **Get pipeline information** - Retrieve information about your pipelines and their content. Getting the pipeline information enables you to dynamically build the deployment API calls. You can also check the [status of a deployment](/rest/api/power-bi/pipelines/getpipelineoperation) or the [deployment history](/rest/api/power-bi/pipelines/getpipelineoperations).

* **Deploy** - The REST calls enable developers to use any type of deployment available in the Fabric service.

* **Create** and **delete** pipelines - Use [Create pipeline](/rest/api/power-bi/pipelines/create-pipeline) and [Delete pipeline](/rest/api/power-bi/pipelines/delete-pipeline) to perform these operations.

* **Manage workspaces** - With [Assign workspace](/rest/api/power-bi/pipelines/assign-workspace) and [Unassign workspace](/rest/api/power-bi/pipelines/unassign-workspace), you can assign and unassign workspaces to specific pipeline stages.

* **Manage pipeline users** - [Delete pipeline user](/rest/api/power-bi/pipelines/delete-pipeline-user) lets you remove a user from a pipeline.  [Update pipeline user](/rest/api/power-bi/pipelines/update-pipeline-user) allows you to add a user to your pipeline.

### Which deployments are supported by the APIs?

The APIs support the following deployment types:

* **Deploy all** - A single API call that deploys all the content in the workspace to the next stage in the pipeline. For this operation, use the [Deploy all](/rest/api/power-bi/pipelines/deployall) API.

* **Selective deploy** - Deploys only specific items, such as reports or dashboards, in the pipeline. For this operation, use the [Selective deploy](/rest/api/power-bi/pipelines/selectivedeploy) API.

* **Backward deploy** - Deploys new  items to the previous stage. Backward deployment only works if the items that are deployed don't already exist in the target stage. For this operation, use either the [Deploy all](/rest/api/power-bi/pipelines/deployall) or the [Selective deploy](/rest/api/power-bi/pipelines/selectivedeploy) APIs, with `isBackwardDeployment` set to `True`.

* **Update App** - As part of the deployment API call, you can update the content of the app that's related to that stage. Updated items are automatically available to your end users, after a deployment has completed. For this operation, use either the [Deploy all](/rest/api/power-bi/pipelines/deployall) or the [Selective deploy](/rest/api/power-bi/pipelines/selectivedeploy) APIs, with [PipelineUpdateAppSettings](/rest/api/power-bi/pipelines/selectivedeploy#pipelineupdateappsettings).

## Before you begin

Before you use the deployment pipelines APIs, make sure you have the following:

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

After you enable a service connection for your Azure DevOps Power BI automation tools, you can [create pipeline tasks](/azure/devops/extend/develop/add-build-task). The extension includes the following deployment pipelines tasks:

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

* [Deploy all](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/DeploymentPipelines-DeployAll.ps1)

* [Selective deployment](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/DeploymentPipelines-SelectiveDeploy.ps1)

* [Wait for deployment](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/DeploymentPipelines-WaitForDeployment.ps1)

* [End to end example of pipeline creation and backward deployment](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/DeploymentPipelines-E2ESampleFromPipelineCreationToDeployment.ps1)

* [Assign an admin user to a pipeline](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/DeploymentPipelines-AddUserToPipeline.ps1)

### PowerShell example

This section describes an example PowerShell script that deploys a semantic model, report, and dashboard, from the development stage to the test stage. The script then checks whether the deployment was successful.

To run a PowerShell script that performs a deployment, you need the following components. You can add any of these parts into [tasks](/azure/devops/pipelines/tasks/utility/powershell) in your Azure pipeline stages.

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

3. **Deploy** - Here you perform the deployment.

    ```powershell
    $url = "pipelines/{0}/Deploy" -f "Insert you pipeline ID here"
    $deployResult = Invoke-PowerBIRestMethod -Url $url  -Method Post -Body $body | ConvertFrom-Json
    ```

4. (Optional) **Deployment completion notification** - Because the deployment API is asynchronous, you can program the script to notify you when the deployment is complete.

    ```powershell
    $url =  "pipelines/{0}/Operations/{1}" -f "Insert you pipeline ID here",$deployResult.id
    $operation = Invoke-PowerBIRestMethod -Url $url -Method Get | ConvertFrom-Json    
    while($operation.Status -eq "NotStarted" -or $operation.Status -eq "Executing")
    {
        # Sleep for 5 seconds
        Start-Sleep -s 5
        $operation = Invoke-PowerBIRestMethod -Url $url -Method Get | ConvertFrom-Json
    }
    ```

## Considerations and limitations

* Deployment by using APIs is subject to the same [limitations](understand-the-deployment-process.md#considerations-and-limitations) as the deployment pipelines user interface.

* A *service principal* can't configure *OAuth* credentials. After you deploy new items, the signed in *service principal* becomes the owner of any deployed paginated reports and semantic models. In such cases, a refresh can't be completed.

* Deploying dataflows by using a *service principal* isn't supported.

* The maximum number of items that can be deployed in a single deployment is 300.

* The deployment pipelines APIs currently only support Power BI items.

* Creating a customized pipeline of 2-10 stages is currently supported only through the UI.

## Related content

* [Get started with deployment pipelines](get-started-with-deployment-pipelines.md)
* [Deployment pipelines best practices](../best-practices-cicd.md)
* [Troubleshooting deployment pipelines](../troubleshoot-cicd.md)
