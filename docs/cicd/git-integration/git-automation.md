---
title: Automate Git integration by using APIs and Azure DevOps
description: Learn how to automate Git integration in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs and Azure DevOps.
author: mberdugo
ms.author: monaberdugo
ms.topic: conceptual
ms.custom:
ms.date: 01/18/2024
---

# Automate Git integration by using APIs and Azure DevOps

The Microsoft Fabric [Git integration](intro-to-git-integration.md) tool enables teams to work together using source control to build an efficient and reusable release process for their Fabric content.

The [Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis) let you automate Fabric procedures and processes so your organization can complete tasks more quickly and with fewer errors. This efficiency leads to cost savings and improved productivity.

<!--- 
To achieve continuous integration and continuous delivery (CI/CD) of content, many organizations use automation tools, including [Azure DevOps](/azure/devops/user-guide/what-is-azure-devops). Organizations that use Azure DevOps, can use the [Power BI automation tools](#use-the-power-bi-automation-tools-extension) extension, which supports many of the Git integration API operations.
--->

## Git integration API functions

The [Git integration REST APIs](/rest/api/fabric/core/git) can help you achieve the continuous integration and continuous delivery (CI/CD) of your content. Here are a few examples of what can be done by using the APIs:

* [**Get connection**](/rest/api/fabric/core/git/get-connection) details for the specified workspace.

* [**Connect**](/rest/api/fabric/core/git/connect) and [**disconnect**](/rest/api/fabric/core/git/disconnect) a specific workspace from the git repository and branch it's connected to.

* [**Initialize a connection**](/rest/api/fabric/core/git/initialize-connection) for a workspace that has been connected to git.

* See which items have incoming changes and which items have changes that weren't yet committed to git with the [**Git status**](/rest/api/fabric/core/git/get-status) API.

* [**Commit**](/rest/api/fabric/core/git/commit-to-git) the changes made in the workspace to the connected remote branch.

* [**Update the workspace**](/rest/api/fabric/core/git/update-from-git) with commits pushed to the connected branch.

## Before you begin

Before you use the Git integration APIs:

* Install [PowerShell](/powershell/scripting/install/installing-powershell)
* Install [Azure PowerShell Az module](/powershell/azure/install-azure-powershell)

## Integrate your workspace with Azure DevOps

Automate the integration process from within your [release pipeline in Azure DevOps](/azure/devops/pipelines), using **PowerShell**.

You can also use other [Fabric REST API](/rest/api/fabric/articles) calls, to complete related operations such as creating a workspace.

### Examples

You can use the following PowerShell scripts to understand how to perform several automation processes. To view or copy the text in a PowerShell sample, use the links in this section.

You can also download the entire [`Fabric-Samples`](https://github.com/microsoft/fabric-samples) GitHub repo.

#### Commit all

This section gives an examples of how to programmatically commit all changes from the workspace to Git.

[Commit all changes to Git](https://github.com/PierreCardo/fabric-samples/blob/AddGitIntegrationPowerShellSamples/e2e-samples/GitIntegration-CommitSelective.ps1)

1. **Sign in and get access token** - Sign in to Fabric as a *user* (not a service principal). Use the [Connect-AzAccount](/powershell/module/az.accounts/connect-azaccount) command to sign in.
To get an access token, use the [Get-AzAccessToken](/powershell/module/az.accounts/get-azaccesstoken) command.

    Your code should look something like this:

    ```powershell
    $global:resourceUrl = "https://api.fabric.microsoft.com"

    $global:fabricHeaders = @{}

    function SetFabricHeaders() {

        #Login to Azure
        Connect-AzAccount | Out-Null

        # Get authentication
        $fabricToken = (Get-AzAccessToken -ResourceUrl $global:resourceUrl).Token

    $global:fabricHeaders = @{
            'Content-Type' = "application/json"
            'Authorization' = "Bearer {0}" -f $fabricToken
        }
    }
    ```

1. **Describe the request body** - In this part of the script you specify which items (such as reports and dashboards) you're deploying.

    ```powershell
    $commitToGitBody = @{ 		
        mode = "All"
        comment = $commitMessage
    } | ConvertTo-Json
    ```

1. Call the `CommitAll` REST API:

    ```powershell
    $commitToGitUrl = "{0}/workspaces/{1}/git/commitToGit" -f $global:baseUrl, $workspace.Id

    $commitToGitResponse = Invoke-WebRequest -Headers $global:fabricHeaders -Uri $commitToGitUrl -Method POST -Body $commitToGitBody
    ```

1. Get the Long Running OperationId for polling the status of the operation.

    ```powershell
    $operationId = $commitToGitResponse.Headers['x-ms-operation-id']
    $retryAfter = $commitToGitResponse.Headers['Retry-After']   
    ```

#### Connect and Sync

* [Connect and sync with Git](https://github.com/PierreCardo/fabric-samples/blob/AddGitIntegrationPowerShellSamples/e2e-samples/GitIntegration-ConnectAndUpdateFromGit.ps1)

1. Call the [Connect](/rest/api/fabric/core/git/connect) API to connect the workspace to a Git repository and branch.
1. Call the [Initialize Connection](/rest/api/fabric/core/git/initialize-connection) API to initialize the connection between the workspace and the Git repository/branch.
1. Based on the response from the Initialize Connection API, call either the [Commit To Git](/rest/api/fabric/core/git/commit-to-git) or [Update From Git](/rest/api/fabric/core/git/update-from-git) API to complete the sync, or do nothing if no action required.

#### Selective Commit

[Commit select changes to Git](https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/PowerShell%20Scripts/DeploymentPipelines-SelectiveDeploy.ps1)

1. Select the specific items that were changed and need to be committed.
1. Call the [Commit To Git](/rest/api/fabric/core/git/commit-to-git) API to commit the selected changes from the workspace to the connected remote branch.

#### Update from Git

[Update workspace from Git](https://github.com/PierreCardo/fabric-samples/blob/AddGitIntegrationPowerShellSamples/e2e-samples/GitIntegration-UpdateFromGit.ps1)

1. Call the [Get Status](/rest/api/fabric/core/git/get-status) API to build the update from git request body.
1. Call the [Update From Git](/rest/api/fabric/core/git/update-from-git) API to update the workspace with commits pushed to the connected branch.

#### Monitor the progress of long running operations

[Poll a long running operation](https://github.com/PierreCardo/fabric-samples/blob/AddGitIntegrationPowerShellSamples/e2e-samples/LongRunningOperation-Polling.ps1)

1. Retrieve the operationId from [Update From Git](/rest/api/fabric/core/git/update-from-git) or [Commit To Git](/rest/api/fabric/core/git/commit-to-git) scripts
1. Call the [Get LRO Status](/rest/api/fabric/core/git/get-status) API every x seconds and print the status.

#### Resolve conflicts

1. Get from user's preferences to resolve the conflicts (**PreferRemote\PreferWorkspace**)
1. Call the [Get Status](/rest/api/fabric/core/git/get-status) API to build the update from git request body.
1. Call the [Update From Git](/rest/api/fabric/core/git/update-from-git) API to update the workspace with commits pushed to the connected branch.

## Considerations and limitations

* Git integration with using APIs is subject to the same [limitations](./git-integration-process.md#considerations-and-limitations) as the Git integration user interface.
* Service principal is not supported.

## Related content

* [Get started with Git integration](git-get-started.md)
* [Fabric APIs](/rest/api/fabric/articles/using-fabric-apis)
* [Git best practices](../best-practices-cicd.md)
