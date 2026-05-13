---
title: Automate git integration with a service principal in Azure DevOps
description: Learn how to automate git integrate with a service principal to Azure DevOps in Microsoft Fabric for streamlined CI/CD workflows.
ms.reviewer: NimrodShalit
ms.topic: how-to
ms.date: 12/15/2025
---

# Automate git integration with a service principal in Azure DevOps
Fabric Git Integration is the foundation for organizations implementing fully automated CI/CD pipelines, enabling seamless movement of assets across Development, Test, and Production environments. 

Currently, Fabric Git Integration supports two major Git providers: 
 - Azure DevOps
 - GitHub
  
This article focuses on the Service Principal capability for Azure DevOps. This integration allows the Fabric user to perform git operation using a service principal.

## Azure DevOps: Authentication - automatic and configured
By default, each Fabric workspace isn't connected to any Git repository. A Fabric workspace has two different ways that it can authenticate to a git repository. These processes are called: 

 - Automatic git credential
 - Configured credential

### Automatic git credential 
When an admin user wants to connect a workspace to an Azure DevOps (ADO) repository, the user must first log in from the workspace settings, the system then identifies which ADO organizations the user can access within the current Fabric tenant, allowing the user to proceed with the configuration. 

Once the initial connection is established, any additional user with at least contributor permissions on the same workspace doesn't need to repeat the connection process. Instead, the system attempts to authenticate the second user with the configured ADO repository. If the user lacks the necessary permissions, the Fabric Git Integration source control pane displays a red indicator. 

This streamlined authentication process is known as "Automatic Git Credential".

### Configured credential 
With configured credential you can programmatically create an Azure DevOps cloud connection using a service principal. 

The Azure DevOps connection supports two authentication methods: 

 - OAuth 2.0 
 - Service Principal 

Both methods include support for [multitenant (cross-tenant) scenarios](git-integration-with-service-principal.md#multitenant-considerations-for-service-principal-creation), giving organizations flexibility across environments. 

Any other user with at least Contributor permissions on the same workspace doesn't need to repeat the connection process. Before service principal support, the system attempted to authenticate secondary users only through **Automatic authentication**. 

If **Automatic authentication** fails, the system also attempts to connect using any **Configured Credential** which the user has access to, ensuring a smoother experience and reduces redundant setup steps. 

## How It Works 
To connect a Fabric workspace to an external Git provider using a Service Principal, Git integration must use a Fabric cloud connection of type **Azure DevOps – Source Control**. 

This cloud connection can be created in two ways through the portal: 
 - **Manually** via [Manage Connection Settings](../../data-factory/data-source-management.md#add-a-data-source) 
 - Through **workspace settings** using the [Add Account](git-integration-with-service-principal.md#step-3-create-azure-devops-source-control-connection) option 

In both cases, the connection is created under the logged-in user’s identity. 

If a Service Principal needs to use this connection, the user needs to either
 - share the connection with the service principal
 - create a new connection using the [Connections REST API](/rest/api/fabric/core/connections/create-connection?tabs=HTTP), passing the Service Principal credentials. 

The steps below outline how to use the API to create the cloud connection using a service principal.

## Prerequisites
To complete the steps outlined, you need the following permissions:

- [Register](/power-bi/developer/embedded/register-app#register-your-app) an Entra ID application and note: 
   - Tenant ID 
   - Client ID 
   - Client Secret

- Grant the Service Principal: 
   - Access to the relevant [Azure DevOps organization and project](git-integration-with-service-principal.md#step-2-assign-service-principal-to-a-devops-organization). 
   - Admin permissions on the Fabric workspace. 


## Connect a new workspace to Azure DevOps using Service Principal
To connect a Fabric workspace to Azure DevOps using Service Principal programmatically, the following steps need to be followed:
1. **Generate Service Principal access token:** Authenticates with Microsoft Fabric using a service principal.
2. **Create Azure DevOps cloud connection:** Creates a new connection resource in Microsoft Fabric that stores the Azure DevOps repository credentials and configuration.
3. **Connect workspace to git:** Links a specific Fabric workspace to the Azure DevOps repository using the connection created in step 2.
4. **Initialize Connection:** Initializes the Git connection.

### 1. Generate Service Principal access token
The following examples show how to generate the service principal access token. 
```bash
curl --request GET \ 
--url https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token \ 
--header 'content-type: multipart/form-data' \ 
--form grant_type=client_credentials \ 
--form client_id=<client-id> \ 
--form 'client_secret=<client-secret>' \ 
--form scope=https://api.fabric.microsoft.com/.default 
```
>[!NOTE]
>Copy the access_token from the response for later steps. 

### 2. Create Azure DevOps cloud connection
Creates a new connection resource in Microsoft Fabric that stores the Azure DevOps repository credentials and configuration.


```bash
curl --request POST \ 
--url https://api.fabric.microsoft.com/v1/connections \ 
--header 'authorization: Bearer <step1: access-token>' \ 
--header 'content-type: application/json' \ 
--data '{ 

"displayName": "<name of the connection>", 
"connectivityType": "ShareableCloud", 
"connectionDetails": { 
"creationMethod": "AzureDevOpsSourceControl.Contents", 
"type": "AzureDevOpsSourceControl", 
"parameters": [ 

{ 
"dataType": "Text", 
"name": "url", 
"value": "https://dev.azure.com/<ado org name>/<project name>/_git/<repo name>/"}]}, 
"credentialDetails": { 
"credentials": { 
"credentialType": "ServicePrincipal", 
"tenantId": "<tenant-id>", 
"servicePrincipalClientId": "<client-id>", 
"servicePrincipalSecret": "<client-secret>"}}}' 
```

>[!NOTE]
>Save the ID from the response. It is used in the next steps. 

### 3. Connect workspace to git
Links a specific Fabric workspace to the Azure DevOps repository using the connection created in step 2. 

```bash
curl --request POST \ 
--url https://api.fabric.microsoft.com/v1/workspaces/<workspace-id>/git/connect \ 
--header 'authorization: Bearer <step1: access-token>' \ 
--header 'content-type: application/json' \ 
--data '{ 
"gitProviderDetails": { 
"organizationName": "<ado org name>", 
"projectName": "<project name>", 
"gitProviderType": "AzureDevOps", 
"repositoryName": "<repo name>", 
"branchName": "<branch name>", 
"directoryName": "<folder name – must exist before OR empty>" 
}, 
"myGitCredentials": { 
"source": "ConfiguredConnection", 
"connectionId": "<step 2 – the new connection id>"}}' 
```
### 4. Initialize Connection
Initialize Connection, read more [here.](/rest/api/fabric/core/git/initialize-connection?tabs=HTTP) 

>[!NOTE]
> Replace &lt; &gt; with your values, pay attention for initializationStrategy parameter, In case the connected workspace has items already, you might consider using "preferWorkspace".

```bash
curl --request POST \ 
--url https://api.fabric.microsoft.com/v1/workspaces/<workspace-id>/git/initializeConnection \ 
--header 'authorization: Bearer <step1: access-token>' \ 
--header 'content-type: application/json' \ 
--data '{"initializationStrategy": "PreferRemote"}' 
```
If the repository /workspace is not empty, the response return requiredAction param (which is based on your initializationStrategy), use [update-from-git](/rest/api/fabric/core/git/update-from-git?tabs=HTTP) OR [commit-to-git](/rest/api/fabric/core/git/commit-to-git?tabs=HTTP) accordingly with workspaceHead and remoteCommitHash from the response to finalize the process


## Connect an Existing Workspace to Use Service Principal 
If your workspace is already connected to Azure DevOps using a user identity, but you want to perform [Fabric Git REST API](/rest/api/fabric/core/git) operations with a Service Principal, follow these steps: 

1. Add Service Principal as Workspace Admin. 
2. Grant Service Principal access to the Azure DevOps Cloud Connection. You have two options: 
  - **Share an existing connection:** Log in with a user who has access to the relevant ADO cloud connection and share it with the Service Principal via Manage Users. 
  - **Create a new connection:** Repeat Steps 1 & 2 from the previous section to create a new cloud connection using Service Principal credentials. 
3. Verify access - Call the GET Connections API to confirm the Service Principal can access the required cloud connection [here](/rest/api/fabric/core/connections/get-connection?tabs=HTTP): 

 ```bash
 curl --request GET \ 
 --url https://api.fabric.microsoft.com/v1/connections \ 
 --header 'authorization: Bearer <step 2: access-token>' 
 ```
Grab the **id** value of the relevant connection from the response. 

4. Update Git Credential: Generate an **access token** (step 1 from previous section) and call the **Update My Git Credential API**, read more [here](/rest/api/fabric/core/git/update-my-git-credentials?tabs=HTTP) (Replace &lt; &gt; with your values): 

 ```bash
curl --request PATCH \ 
--url https://api.fabric.microsoft.com/v1/workspaces/<workspace-id>/git/myGitCredentials \ 
--header 'authorization: Bearer <step 2: access-token>' \ 
--header 'content-type: application/json' \ 
--data '{ 
"source": "ConfiguredConnection", 
"connectionId": "<step 3: connection id>"}' 
 ```
After these steps, the Service Principal is fully configured and ready to execute Fabric Git REST API operations.


## Related content

- [Automate Git integration by using APIs](git-automation.md)
- [Manual git integration with a service principal in Azure DevOps](git-integration-with-service-principal.md)
- [Understand the Git integration process](./git-integration-process.md)
- [Manage Git branches](./manage-branches.md)
- [Git integration best practices](../best-practices-cicd.md)
