---
title: Automate Git integration by using APIs
description: Learn how to automate Git integration in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs and Azure DevOps or GitHub.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: Pierre, NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 09/30/2024
ms.search.form: Git integration automation, Git integration APIs, Azure DevOps integration, GitHub integration
#customer intent: As developer, I want to learn how to automate Git integration in the Microsoft Fabric Application lifecycle management (ALM) tool, so that I can simplify continuous integration and continuous delivery (CI/CD) of my content.
---

# Automate Git integration by using APIs

The Microsoft Fabric [Git integration](intro-to-git-integration.md) tool enables teams to work together using source control to build an efficient and reusable release process for their Fabric content.

With [Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis), you can automate Fabric procedures and processes to complete tasks faster and with fewer errors. This efficiency leads to cost savings and improved productivity.

This article describes how to use the [Git integration REST APIs](/rest/api/fabric/core/git) to automate Git integration in Microsoft Fabric.

<!--- 
To achieve continuous integration and continuous delivery (CI/CD) of content, many organizations use automation tools, including [Azure DevOps](/azure/devops/user-guide/what-is-azure-devops). Organizations that use Azure DevOps, can use the [Power BI automation tools](#use-the-power-bi-automation-tools-extension) extension, which supports many of the Git integration API operations.
--->

## Prerequisites

To work with Fabric Git APIs, you need:

* The same [prerequisites you need to use Git integration in the UI](./git-get-started.md#prerequisites).

* A Microsoft Entra token for Fabric service. Use that token in the authorization header of the API call. For information about how to get a token, see [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart).

You can use the REST APIs without PowerShell, but the scripts in this article use [PowerShell](/powershell/scripting/overview). To run the scripts, you need to take the following steps:

* Install [PowerShell](/powershell/scripting/install/installing-powershell).
* Install the [Azure PowerShell Az module](/powershell/azure/install-azure-powershell).

## Git integration API functions

The [Git integration REST APIs](/rest/api/fabric/core/git) can help you achieve the continuous integration and continuous delivery (CI/CD) of your content. Here are a few examples of what can be done by using the APIs:

* See which items have incoming changes and which items have changes that weren't yet committed to Git with the [**Git status**](/rest/api/fabric/core/git/get-status) API.

* [**Get connection**](/rest/api/fabric/core/git/get-connection) details for the specified workspace.

* [**Connect**](/rest/api/fabric/core/git/connect) and [**disconnect**](/rest/api/fabric/core/git/disconnect) a specific workspace from the Git repository and branch connected to it.

* [**Update my Git credentials**](/rest/api/fabric/core/git/update-my-git-credentials) to update your Git credentials configuration details.

* [**Get my Git credentials**](/rest/api/fabric/core/git/get-my-git-credentials) to get your Git credentials configuration details.

* [**Initialize a connection**](/rest/api/fabric/core/git/initialize-connection) for a workspace that is connected to Git.

* [**Commit**](/rest/api/fabric/core/git/commit-to-git) the changes made in the workspace to the connected remote branch.

* [**Update the workspace**](/rest/api/fabric/core/git/update-from-git) with commits pushed to the connected branch.

## Examples

Use the following PowerShell scripts to understand how to perform several common automation processes. To view or copy the text in a PowerShell sample, use the links in this section. You can also see all the examples in the [Fabric Git integration samples](https://github.com/microsoft/fabric-samples/tree/main/features-samples/git-integration) GitHub repo.

### Connect and update

This section describes the steps involved in connecting and updating a workspace with Git.

For the complete script, see [Connect and update from Git](https://github.com/microsoft/fabric-samples/blob/main/features-samples/git-integration/GitIntegration-ConnectAndUpdateFromGit.ps1).

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

1. Call the [Connect](/rest/api/fabric/core/git/connect) API to connect the workspace to a Git repository and branch.

    ### [Azure DevOps](#tab/ADO)

    ```powershell

    # Connect to Git

    Write-Host "Connecting the workspace '$workspaceName' to Git."

    $connectUrl = "{0}/workspaces/{1}/git/connect" -f $global:baseUrl, $workspace.Id

    # AzureDevOps details

    $azureDevOpsDetails = @{
        gitProviderType = "AzureDevOps"
        organizationName = "<ORGANIZATION NAME>"
        projectName = "<PROJECT NAME>"
        repositoryName = "<REPOSITORY NAME>"
        branchName = "<BRANCH NAME>"
        directoryName = "<DIRECTORY NAME>"
    }

    $connectToGitBody = @{
        gitProviderDetails =$azureDevOpsDetails
    } | ConvertTo-Json

    Invoke-RestMethod -Headers $global:fabricHeaders -Uri $connectUrl -Method POST -Body $connectToGitBody
    ```

    ### [GitHub](#tab/github)

    ```powershell

    # Connect to Git

    Write-Host "Connecting the workspace '$workspaceName' to Git."

    $connectUrl = "{0}/workspaces/{1}/git/connect" -f $global:baseUrl, $workspace.Id

    # GitHub details

    $gitHubDetails = @{
        gitProviderType = "GitHub"
        ownerName = "<OWNER NAME>"
        repositoryName = "<REPOSITORY NAME>"
        branchName = "<BRANCH NAME>"
        directoryName = "<DIRECTORY NAME>"
    }

    $connectToGitBody = @{
        gitProviderDetails = $gitHubDetails
        myGitCredentials = @{
            source = "ConfiguredConnection"
            connectionId = "<CONNECTION ID>"
        }
    } | ConvertTo-Json

    Invoke-RestMethod -Headers $global:fabricHeaders -Uri $connectUrl -Method POST -Body $connectToGitBody
    ```

    ---

1. Call the [Initialize Connection](/rest/api/fabric/core/git/initialize-connection) API to initialize the connection between the workspace and the Git repository/branch.

    ```powershell
     # Initialize Connection

    Write-Host "Initializing Git connection for workspace '$workspaceName'."

    $initializeConnectionUrl = "{0}/workspaces/{1}/git/initializeConnection" -f $global:baseUrl, $workspace.Id
    $initializeConnectionResponse = Invoke-RestMethod -Headers $global:fabricHeaders -Uri $initializeConnectionUrl -Method POST -Body "{}"
    ```

1. Based on the response from the Initialize Connection API, call either the [Update From Git](/rest/api/fabric/core/git/update-from-git) API to complete the update, or do nothing if no action required.

   The following script updates and [monitors the progress](#monitor-the-progress-of-long-running-operations):

    ```powershell
    if ($initializeConnectionResponse.RequiredAction -eq "UpdateFromGit") {

        # Update from Git
        Write-Host "Updating the workspace '$workspaceName' from Git."

        $updateFromGitUrl = "{0}/workspaces/{1}/git/updateFromGit" -f $global:baseUrl, $workspace.Id

        $updateFromGitBody = @{ 
            remoteCommitHash = $initializeConnectionResponse.RemoteCommitHash
      workspaceHead = $initializeConnectionResponse.WorkspaceHead
        } | ConvertTo-Json

        $updateFromGitResponse = Invoke-WebRequest -Headers $global:fabricHeaders -Uri $updateFromGitUrl -Method POST -Body $updateFromGitBody

        $operationId = $updateFromGitResponse.Headers['x-ms-operation-id']
        $retryAfter = $updateFromGitResponse.Headers['Retry-After']
        Write-Host "Long Running Operation ID: '$operationId' has been scheduled for updating the workspace '$workspaceName' from Git with a retry-after time of '$retryAfter' seconds." -ForegroundColor Green
        
        # Poll Long Running Operation
        $getOperationState = "{0}/operations/{1}" -f $global:baseUrl, $operationId
        do
        {
            $operationState = Invoke-RestMethod -Headers $global:fabricHeaders -Uri $getOperationState -Method GET

            Write-Host "Update from Git operation status: $($operationState.Status)"

            if ($operationState.Status -in @("NotStarted", "Running")) {
                Start-Sleep -Seconds $retryAfter
            }
        } while($operationState.Status -in @("NotStarted", "Running"))
    }
    ```

### Update from Git

In this section, we describe the steps involved in updating a workspace with the changes from Git. In this script, we update the workspace items with changes from Git, but we leave the Git repository unchanged.

For the complete script, see [Update workspace from Git](https://github.com/microsoft/fabric-samples/blob/main/features-samples/git-integration/GitIntegration-UpdateFromGit.ps1).

1. Log into Git and get authentication.
1. Call the [Get Status](/rest/api/fabric/core/git/get-status) API to build the update from Git request body.
1. Call the [Update From Git](/rest/api/fabric/core/git/update-from-git) API to update the workspace with commits pushed to the connected branch.

### Commit all

This section gives a step by step description of how to programmatically commit all changes from the workspace to Git.

For the complete script, see [Commit all changes to Git](https://github.com/microsoft/fabric-samples/blob/main/features-samples/git-integration/GitIntegration-CommitAll.ps1).

1. Log into Git and get authentication.
1. Connect to workspace.
1. Call the [Commit to Git](/rest/api/fabric/core/git/commit-to-git) REST API.
1. Get the Long Running OperationId for polling the status of the operation.

### Selective Commit

This section describes the steps involved in committing only specific changes from the workspace to Git.

For the complete script, see [Commit select changes to Git](https://github.com/microsoft/fabric-samples/blob/main/features-samples/git-integration/GitIntegration-CommitSelective.ps1).

1. Log into Git and get authentication.
1. Connect to workspace.
1. Call the [Get status](/rest/api/fabric/core/git/get-status) API to see which items workspace were changed.
1. Select the specific items to commit.
1. Call the [Commit to Git](/rest/api/fabric/core/git/commit-to-git) API to commit the selected changes from the workspace to the connected remote branch.

### Monitor the progress of long running operations

For the complete script, see [Poll a long running operation](https://github.com/microsoft/fabric-samples/blob/main/features-samples/fabric-apis/LongRunningOperation-Polling.ps1).

1. Retrieve the operationId from the [Update From Git](/rest/api/fabric/core/git/update-from-git) or the [Commit to Git](/rest/api/fabric/core/git/commit-to-git) script.
1. Call the [Get LRO Status](/rest/api/fabric/core/git/get-status) API at specified intervals (in seconds) and print the status.

## Considerations and limitations

* Git integration using APIs is subject to the same [limitations](./git-integration-process.md#considerations-and-limitations) as the Git integration user interface.
* Service principal isn't supported.
* Refreshing a semantic model using the [Enhanced refresh API](/power-bi/connect-data/asynchronous-refresh) causes a Git *diff* after each refresh.

## Related content

* [Git integration - get started](git-get-started.md)
* [Fabric APIs](/rest/api/fabric/articles/using-fabric-apis)
* [Git best practices](../best-practices-cicd.md)
