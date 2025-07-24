---
title: Automate Git integration by using APIs
description: Learn how to automate Git integration in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs and Azure DevOps or GitHub.
author: billmath
ms.author: billmath
ms.reviewer: Pierre, NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.date: 02/21/2025
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

* If you're using a service principal, it needs the same permissions as a user principal.

You can use the REST APIs without [PowerShell](/powershell/scripting/overview), but the scripts in this article use PowerShell. To run the scripts, take the following steps:

* Install [PowerShell](/powershell/scripting/install/installing-powershell).
* Install the [Azure PowerShell Az module](/powershell/azure/install-azure-powershell).

## Git integration API functions

The [Git integration REST APIs](/rest/api/fabric/core/git) can help you achieve the continuous integration and continuous delivery (CI/CD) of your content. Here are a few examples of what can be done by using the APIs:

* [**Connect**](/rest/api/fabric/core/git/connect) and [**disconnect**](/rest/api/fabric/core/git/disconnect) a specific workspace from the Git repository and branch connected to it. (**Connect** requires the [connectionId of the Git provider credentials](#get-or-create-git-provider-credentials-connection).)

* [**Get connection**](/rest/api/fabric/core/git/get-connection) details for the specified workspace.

* [**Get or create Git provider credentials connection**](#get-or-create-git-provider-credentials-connection).

* [**Update my Git credentials**](/rest/api/fabric/core/git/update-my-git-credentials) to update your Git credentials configuration details. Requires the [connectionId of the Git provider credentials](#get-or-create-git-provider-credentials-connection).

* [**Get my Git credentials**](/rest/api/fabric/core/git/get-my-git-credentials) to get your Git credentials configuration details.

* [**Initialize a connection**](/rest/api/fabric/core/git/initialize-connection) for a workspace that is connected to Git.

* See which items have incoming changes and which items have changes that weren't yet committed to Git with the [**Git status**](/rest/api/fabric/core/git/get-status) API.

* [**Commit**](/rest/api/fabric/core/git/commit-to-git) the changes made in the workspace to the connected remote branch.

* [**Update the workspace**](/rest/api/fabric/core/git/update-from-git) with commits pushed to the connected branch.

## Examples

Use the following PowerShell scripts to understand how to perform several common automation processes. To view or copy the text in a PowerShell sample, use the links in this section. You can also see all the examples in the [Fabric Git integration samples](https://github.com/microsoft/fabric-samples/tree/main/features-samples/git-integration) GitHub repo.

### Connect and update

This section describes the steps involved in connecting and updating a workspace with Git.

For the complete script, see [Connect and update from Git](https://github.com/microsoft/fabric-samples/blob/main/features-samples/git-integration/GitIntegration-ConnectAndUpdateFromGit.ps1).

1. **Connect to Azure account and get access token** - Sign in to Fabric as a user or a service principal. Use the [Connect-AzAccount](/powershell/module/az.accounts/connect-azaccount) command to connect.
To get an access token, use the [Get-AzAccessToken](/powershell/module/az.accounts/get-azaccesstoken) command, and [convert the secure string token to plain text](/powershell/azure/faq#how-can-i-convert-a-securestring-to-plain-text-in-powershell-)

   Your code should look something like this:

   #### [User principal](#tab/user)

     ```powershell
      $global:resourceUrl = "https://api.fabric.microsoft.com"
 
      $global:fabricHeaders = @{}

      function SetFabricHeaders() {
  
         #Login to Azure
         Connect-AzAccount | Out-Null
 
         # Get authentication
         $secureFabricToken = (Get-AzAccessToken -AsSecureString -ResourceUrl $global:resourceUrl).Token

         # Convert secure string to plain test
         $ssPtr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureFabricToken)
         try {
             $fabricToken = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ssPtr)
         } finally {
             [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ssPtr)
        }

       $global:fabricHeaders = @{
          'Content-Type' = "application/json"
          'Authorization' = "Bearer {0}" -f $fabricToken
      }
     }
     ```

   #### [Service principal](#tab/service-principal)

     ```powershell
     $global:resourceUrl = "https://api.fabric.microsoft.com"
     $global:fabricHeaders = @{}
 
     function SetFabricHeaders() {
 
        $clientId = "<CLIENT ID>"
        $tenantId = "<TENANT ID>"
        $secret = "<SECRET VALUE>"
 
        $secureSecret  = ConvertTo-SecureString -String $secret -AsPlainText -Force
        $credential = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $clientId, $secureSecret
 
        #Login to Azure using service principal
        Connect-AzAccount -ServicePrincipal -TenantId $tenantId -Credential $credential | Out-Null
 
        # Get authentication
        $secureFabricToken = (Get-AzAccessToken -AsSecureString -ResourceUrl $global:resourceUrl).Token
   
        # Convert secure string to plain text
        $ssPtr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureFabricToken)
        try {
            $fabricToken = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ssPtr)
        } finally {
           [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ssPtr)
        }

       $global:fabricHeaders = @{
          'Content-Type' = "application/json"
          'Authorization' = "Bearer {0}" -f $fabricToken
       }
     }
     ```

    ---

1. Call the [Connect](/rest/api/fabric/core/git/connect) API to connect the workspace to a Git repository and branch.

     For information on how to obtain the Connection details (ID, Name), refer to [Get or create Git provider credentials connection](#get-or-create-git-provider-credentials-connection).

   ### [Azure DevOps](#tab/ADO)

    ```powershell
    $global:baseUrl = "https://api.fabric.microsoft.com/v1"
    $workspaceName = "<WORKSPACE NAME>"
    $getWorkspacesUrl = "{0}/workspaces" -f $global:baseUrl
    $workspaces = (Invoke-RestMethod -Headers $global:fabricHeaders -Uri $getWorkspacesUrl -Method GET).value

    # Find the workspace by display name
    $workspace = $workspaces | Where-Object {$_.DisplayName -eq $workspaceName}

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

    $connectToGitBody = @{}
    #Leave only one of the following two (delete the other one):
    #-----------------------------------------------------------------------------------------------
    # 1. Automatic (SSO)
    $connectToGitBody = @{
        gitProviderDetails = $gitProviderDetails
    } | ConvertTo-Json
    #-----------------------------------------------------------------------------------------------
    # 2. ConfiguredConnection (User or service principal)
    # Get workspaces
    $connectionName = "<CONNECTION Name>"
    $getConnectionsUrl = "{0}/connections" -f $global:baseUrl
    $connections = (Invoke-RestMethod -Headers $global:fabricHeaders -Uri $getConnectionsUrl -Method GET).value

    # Find the connection by display name
    $connection = $connections | Where-Object {$_.DisplayName -eq $connectionName}
    $connectToGitBody = @{
        gitProviderDetails = $azureDevOpsDetails
        myGitCredentials = @{
            source = "ConfiguredConnection"
            connectionId = $connection.id
            }
        } | ConvertTo-Json
    #-----------------------------------------------------------------------------------------------

    Invoke-RestMethod -Headers $global:fabricHeaders -Uri $connectUrl -Method POST -Body $connectToGitBody
    ```

   ### [GitHub](#tab/github)

    ```powershell
    $global:baseUrl = "https://api.fabric.microsoft.com/v1"
    $workspaceName = "<WORKSPACE NAME>"
    $getWorkspacesUrl = "{0}/workspaces" -f $global:baseUrl 
    $workspaces = (Invoke-RestMethod -Headers $global:fabricHeaders -Uri $getWorkspacesUrl -Method GET).value

    # Find the workspace by display name
    $workspace = $workspaces | Where-Object {$_.DisplayName -eq $workspaceName}

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

    $connectionName = "<CONNECTION Name>"

    # Get connections 
    $getConnectionsUrl = "$global:baseUrl/connections"
    $connections = (Invoke-RestMethod -Headers $global:fabricHeaders -Uri $getConnectionsUrl -Method GET).value

    # Find the connection by name
    $connection = $connections | Where-Object {$_.DisplayName -eq $connectionName}

    $connectToGitBody = @{
        gitProviderDetails = $gitHubDetails
        myGitCredentials = @{
            source = "ConfiguredConnection"
            connectionId = $connection.id
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

## Get or create Git provider credentials connection

In order to [connect](/rest/api/fabric/core/git/connect) to a Git repository or [update your Git credentials](/rest/api/fabric/core/git/update-my-git-credentials) you need to provide a *connectionId*. The *connectionId* can come from either a new connection that you create, or an existing connection.

* [Create a new connection](#create-a-new-connection-that-stores-your-git-credentials) with your Git provider credentials
* [Use an existing connection](#get-a-list-of-existing-connections) that you have permissions for.

### Create a new connection that stores your Git credentials

#### [Azure DevOps (preview)](#tab/ADO)

The following code snippet shows a sample request body to create a connection that stores your Azure DevOps credentials. The full example can be found in the [Fabric samples repo](https://github.com/microsoft/fabric-samples/blob/main/features-samples/git-integration/GitIntegration-StoreGitProviderCredentials.ps1).

```powershell
# Connection with ServicePrincipal details for AzureDevOpsSourceControl
$adoSPConnection = @{
    connectivityType = "ShareableCloud"
    displayName = "<CONNECTION NAME>"
    connectionDetails = @{
        type = "AzureDevOpsSourceControl"
        creationMethod = "AzureDevOpsSourceControl.Contents"
        parameters = @(
            @{
                dataType = "Text"
                name = "url"
                value = "<Repo url in Azure DevOps>"
            }
        )
    }
    credentialDetails = @{
        credentials = @{
            credentialType = "ServicePrincipal"
            tenantId = "<SP tenant (directory) id (Guid)>"
            servicePrincipalClientId = "<SP APP (client) id (Guid)>"
            servicePrincipalSecret = "<SP Secret>"
        }
    }
}

#Note: AzureDevOps for UserPrincipal is not supported (since it requires interactive OAuth2)
```

**Sample request**

```http
POST https://api.fabric.microsoft.com/v1/connections

{
  "displayName": "<CONNECTION NAME>",
  "connectivityType": "ShareableCloud",
  "connectionDetails": {
    "creationMethod": "AzureDevOpsSourceControl.Contents",
    "type": "AzureDevOpsSourceControl",
    "parameters": [
     {
      "dataType": "Text",
      "name": "url",
      "value": "<Repo url in Azure DevOps>”
     }
    ]
  },
  "credentialDetails": {
    "credentials": {
      "credentialType": "ServicePrincipal",
      "tenantId": “<SP tenant (directory) id (Guid)>”,
      "servicePrincipalClientId": “<SP APP (client) id (Guid)>”,
      "servicePrincipalSecret": “<SP Secret>”
    }
  }
}
 
```

**Sample response:**

```json
{
  "allowConnectionUsageInGateway": false,
  "id": "********-****-****-****-c13b543982ac",
  "displayName": "<CONNECTION NAME>",
  "connectivityType": "ShareableCloud",
  "connectionDetails": {
    "path": "<Repo url in Azure DevOps>",
    "type": "AzureDevOpsSourceControl"
  },
  "privacyLevel": "Organizational",
  "credentialDetails": {
    "credentialType": "ServicePrincipal",
    "singleSignOnType": "None",
    "connectionEncryption": "NotEncrypted",
    "skipTestConnection": false
  }
}
```

#### [GitHub](#tab/github)

Use your [Personal Access Token (PAT)](./git-get-started.md?tabs=github%2CAzure%2Ccommit-to-git#git-prerequisites) to create a GitHub connection.

If you provide the name of a specific repo, your connection is scoped to that repo. If you don't provide the name of any repo, you get access to all repos you have permission for.

To create a connection that stores your GitHub credentials, call the [Create connection API](/rest/api/fabric/core/connections/create-connection) with the following request body. The *parameters* section is optional and only needed if you want your connection scoped to a specific repo.

**Sample request**

```http
POST https://api.fabric.microsoft.com/v1/connections

{
 "connectivityType": "ShareableCloud",
 "displayName": "MyGitHubPAT",
 "connectionDetails": {
  "type": "GitHubSourceControl",
  "creationMethod": "GitHubSourceControl.Contents",
  "parameters": [
   {
    "dataType": "Text",
    "name": "url",
    "value": "https://github.com/OrganizationName/RepositoryName"
   }
  ]
 },
 "credentialDetails": {
  "credentials": {
   "credentialType": "Key",
   "key": "*********"  //Enter your GitHub Personal Access Token
  }
 }
}
```

**Sample response:**

```json
{
  "id": "3aba8f7f-d1ba-42b1-bb41-980029d5a1c1",
   "connectionDetails": {
       "path": "https://github.com/OrganizationName/RepositoryName",
       "type": "GitHubSourceControl"
   },
   "connectivityType": "ShareableCloud",
   "credentialDetails": {
       "connectionEncryption": "NotEncrypted",
       "credentialType": "Key",
       "singleSignOnType": "None",
       "skipTestConnection": false
   },
   "displayName": "MyGitHubPAT",
   "gatewayId": null,
   "privacyLevel": "Organizational"
}
```

Copy the ID and use it in the [Git - Connect](/rest/api/fabric/core/git/connect) or [Git - Update My Git Credentials](/rest/api/fabric/core/git/update-my-git-credentials) API.

---

### Get a list of existing connections

Use the [List connections API](/rest/api/fabric/core/connections/list-connections) to get a list of existing connections that you have permissions for, and their properties.

#### Sample request

```http
GET https://api.fabric.microsoft.com/v1/connections
```

#### Sample response

```json
{
 "value": [
  {
   "id": "e3607d15-6b41-4d11-b8f4-57cdcb19ffc8",
   "displayName": "MyGitHubPAT1",
   "gatewayId": null,
   "connectivityType": "ShareableCloud",
   "connectionDetails": {
    "path": "https://github.com",
    "type": "GitHubSourceControl"
   },
   "privacyLevel": "Organizational",
   "credentialDetails": {
    "credentialType": "Key",
    "singleSignOnType": "None",
    "connectionEncryption": "NotEncrypted",
    "skipTestConnection": false
   }
  },
  {
   "id": "3aba8f7f-d1ba-42b1-bb41-980029d5a1c1",
   "displayName": "MyGitHubPAT2",
   "gatewayId": null,
   "connectivityType": "ShareableCloud",
   "connectionDetails": {
    "path": "https://github.com/OrganizationName/RepositoryName",
    "type": "GitHubSourceControl"
   },
   "privacyLevel": "Organizational",
   "credentialDetails": {
    "credentialType": "Key",
    "singleSignOnType": "None",
    "connectionEncryption": "NotEncrypted",
    "skipTestConnection": false
   }
  }
 ]
}
```

Copy the ID of the connection you want and use it in the [Git - Connect](/rest/api/fabric/core/git/connect) or [Git - Update My Git Credentials](/rest/api/fabric/core/git/update-my-git-credentials) API.

## Considerations and limitations

* Git integration using APIs is subject to the same [limitations](./git-integration-process.md#considerations-and-limitations) as the Git integration user interface.
* Refreshing a semantic model using the [Enhanced refresh API](/power-bi/connect-data/asynchronous-refresh) causes a Git *diff* after each refresh.

## Related content

* [Git integration - get started](git-get-started.md)
* [Fabric APIs](/rest/api/fabric/articles/using-fabric-apis)
* [Git best practices](../best-practices-cicd.md)