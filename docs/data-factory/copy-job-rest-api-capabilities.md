---
title: REST API Capabilities for Copy job in Fabric Data Factory
description: This article describes the REST API Capabilities for Copy job in Fabric Data Factory.
ms.reviewer: krirukm
ms.topic: how-to
ms.date: 06/23/2025
ms.search.form: copy-job
ms.custom: copy-job
---

# REST API Capabilities for Copy job in Fabric Data Factory

Fabric Data Factory provides a robust set of APIs that enable users to automate and manage their Copy job efficiently. These APIs allow for seamless integration with various data sources and services, enabling users to create, get, list and update their Copy job programmatically. The APIs support a wide range of operations including Copy job CRUD (Create, Read, Update, and Delete) making it easier for users to manage their data integration processes.

## API use cases for Copy job

The APIs for Copy job in Fabric Data Factory can be used in various scenarios:

- **Automated deployment**: Automate the deployment of Copy job across different environments (development, testing, production) using CI/CD practices.
- **Data integration**: Integrate data from multiple sources, such as databases, data lakes, and cloud services, into a unified Copy job for processing and analysis.
- **Error handling**: Implement custom error handling and retry mechanisms to ensure Copy Job run smoothly and recover from failures.

## Understanding APIs

To effectively use the APIs for Copy job in Fabric Data Factory, it is essential to understand the key concepts and components:

- **Endpoints**: The API endpoints provide access to various Copy job operations, such as creating, updating, and deleting dataflows.
- **Authentication**: Secure access to the APIs using authentication mechanisms like OAuth or API keys.
- **Requests and Response**s: Understand the structure of API requests and responses, including the required parameters and expected output.
- **Rate Limits**: Be aware of the rate limits imposed on API usage to avoid exceeding the allowed number of requests.

## CRUD Support

CRUD stands for Create, Read, Update, and Delete, which are the four basic operations that can be performed on data. In Fabric Data Factory, the CRUD operations are supported through the Fabric API for Data Factory, which is currently in preview. These APIs allow users to manage their Copy job programmatically. Here are some key points about CRUD support:

- **Create**: Create new Copy job using the API. This involves defining the Copy job structure, specifying data sources, transformations, and destinations.
- **Read**: Retrieve information about existing Copy job. This includes details about list of Copy jobs in a specified workspace, their configuration, definition, and execution status.
- **Update**: Update existing Copy jobs. This might involve modifying the Copy job structure, changing data sources and destinations.
- **Delete**: Delete Copy jobs that are no longer needed. This helps in managing and cleaning up resources.

The primary online reference documentation for Microsoft Fabric REST APIs can be found in the [Microsoft Fabric REST API documentation](/rest/api/fabric/articles/).

## Get started with REST APIs for Copy Job

The following examples show how to create, update, and manage Copy job using the Fabric Data Factory APIs.

## Obtain an authorization token

Before you use the other REST APIs, you need to have the bearer token.

> [!IMPORTANT]
> In the following examples, ensure the word 'Bearer ' (with a space) precedes the access token itself. When using an API client and selecting 'Bearer Token' as the authentication type, 'Bearer ' is automatically inserted for you, and only requires the access token to be provided.

### Option 1: Using MSAL.Net

Refer to the [Get Token section of the Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart#get-token) as an example of how to obtain the MSAL authorization token.

Use MSAL.Net to acquire a Microsoft Entra ID token for Fabric service with the following scopes: *Workspace.ReadWrite.All*, *Item.ReadWrite.All*. For more information about token acquisition with MSAL.Net to, see [Token Acquisition - Microsoft Authentication Library for .NET](/entra/msal/dotnet/acquiring-tokens/overview).

Copy the token from the *AccessToken* property and replace the _&lt;access-token&gt;_ placeholder in the following examples with the token.

### Option 2: Using the Fabric portal

Sign in to the Fabric portal for the Tenant you want to test on, and press F12 to enter the browser's developer mode. In the console there, run:

```azurecli
powerBIAccessToken
```

Copy the token and replace the _&lt;access-token&gt;_ placeholder in the following examples with the token.

---

## Create a Copy job

Create a Copy job in a specified workspace.

**Sample request:**

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/copyJobs```

**Headers**:

```
{
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```
{
  "displayName": "My CopyJob",
  "description": "My Copy job description."
}
```

**Sample response**:

```
{
  "displayName": "My CopyJob",
  "description": "My Copy job description.",
  "type": "CopyJob", 
  "workspaceId": "<workspaceId>", 
  "id": "<itemId>" 
}
```

## Create a Copy job with definition 

Create a Copy job with a base64 definition in a specified workspace.

**Sample request:**

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/copyJobs```

**Headers**:

```
{
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```
{
  "displayName": "CopyJob 1",
  "description": "A Copy job description.",
  "definition": { 
    "parts": [ 
      { 
        "path": "copyjob-content.json", 
        "payload":"ewogICJwcm9wZXJ0aWVzIjogewogICAgImpvYk1vZGUiOiAiQmF0Y2giCiAgfSwKICAiYWN0aXZpdGllcyI6IFtdCn0=", 
        "payloadType": "InlineBase64" 
      }, 
      { 
        "path": ".platform", 
        "payload": "ZG90UGxhdGZvcm1CYXNlNjRTdHJpbmc=", 
        "payloadType": "InlineBase64" 
      } 
    ] 
  } 
}  
```

**Sample response**:

```
{
  "displayName": "CopyJob 1",
  "description": "A Copy job description.",
  "type": "CopyJob", 
  "workspaceId": "<workspaceId>", 
  "id": "<itemId>" 
}
```

## Get Copy job 

Returns properties of specified Copy job.

**Sample request:**

**URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/copyJobs/{itemId}```

**Headers**:

```
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:

```
{
    "id": "<Your itemId>",
    "displayName": "CopyJob 1",
    "description": "A Copy job description.",
    "type": "CopyJob",
    "workspaceId": "<Your workspaceId>"
}
```

## Get Copy job with definition

Returns the Copy job item definition.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/copyJobs/{copyJobId}/getDefinition```

**Headers**:

```
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:

```
{
  "definition": {
    "parts": [
      {
        "path": "copyjob-content.json",
        "payload": "ewogICJwcm9wZXJ0aWVzIjogewogICAgImpvYk1vZGUiOiAiQmF0Y2giCiAgfSwKICAiYWN0aXZpdGllcyI6IFtdCn0=", 
        "payloadType": "InlineBase64"
      },
      {
        "path": ".platform",
        "payload": "ZG90UGxhdGZvcm1CYXNlNjRTdHJpbmc=",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

### List Copy jobs 

List all Copy job from the specified workspace.

**Sample request**:

**URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/copyJobs```

**Headers**:

```
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:

```
{
  "value": [
    {
      "id": "<Your itemId>",
      "displayName": "CopyJob Name 1",
      "description": "A Copy job description.",
      "type": "CopyJob",
      "workspaceId": "<Your workspaceId>"
    },
    {
      "id": "<Your itemId>",
      "displayName": "CopyJob Name 2",
      "description": "A Copy job description.",
      "type": "CopyJob",
      "workspaceId": "<Your workspaceId>"
    }
  ]
}
```

## Update Copy job

Updates the properties of the Copy job.

**Sample request**:

**URI**: ```PATCH https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/copyJobs/{copyJobId}```

**Headers**:

```
{
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```
{
  "displayName": "CopyJob's New name",
  "description": "CopyJob's New description"
}
```

**Sample response**:

```
{
  "displayName": "CopyJob's New name",
  "description": "CopyJob's New description",
  "type": "CopyJob",
  "workspaceId": "<Your workspaceId>",
  "id": "<Your itemId>"
}
```

## Update Copy job with definition

Updates the Copy job item definition.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/copyJobs/{copyJobId}/updateDefinition```

**Headers**:

```
{
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```
{
  "definition": {
    "parts": [
      {
        "path": "copyjob-content.json",
        "payload": "ewogICJwcm9wZXJ0aWVzIjogewogICAgImpvYk1vZGUiOiAiQ0RDIgogIH0sCiAgImFjdGl2aXRpZXMiOiBbXQp9",
        "payloadType": "InlineBase64"
      },
      {
        "path": ".platform",
        "payload": "ZG90UGxhdGZvcm1CYXNlNjRTdHJpbmc=",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

**Sample response**:

```
200 OK
```

## Delete Copy job

Deletes the specified Copy job.

**Sample request**:

**URI**: ```DELETE https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/copyJobs/{copyJobId}```

**Headers**:

```
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:

```
200 OK
```

## Run on demand Copy job

Runs on-demand Copy job instance.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances?jobType=Execute```

**Headers**:

```
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:

```
202 Accepted
```

## Get Copy job instance

Gets singular Copy job instance.

**Sample request**:

**URI**: ```GET  https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/copyJobs/{itemId}/jobs/instances/{jobInstanceId}```

**Headers**:

```
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:

```
{
  "id": "<id>",
  "itemId": "<itemId>",
  "jobType": "CopyJob",
  "invokeType": "Manual",
  "status": "Completed",
  "rootActivityId": "<rootActivityId>",
  "startTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
  "endTimeUtc": "YYYY-MM-DDTHH:mm:ss.xxxxxxx",
  "failureReason": null
}
```

## Cancel Copy job instance

Cancel a Copy job instance.

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/copyJobs/{itemId}/jobs/instances/{jobInstanceId}/cancel```

**Headers**:

```
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:

***Location**: ```https://api.fabric.microsoft.com/v1/workspaces/<worksapceId>/items/<itemId>/jobs/instances/<jobInstanceId> ```
**Retry-after**: ```60```

## Service Principal Name (SPN) Support

Service Principal Name (SPN) is a security identity feature used by applications or services to access specific resources. In Fabric Data Factory, SPN support is crucial for enabling secure and automated access to data sources. Here are some key points about SPN support:

- **Authentication**: SPNs are used to authenticate applications or services when accessing data sources. This ensures that only authorized entities can access the data.

- **Configuration**: To use SPNs, you need to create a service principal in Azure and grant it the necessary permissions to access the data source. For example, if you're using a data lake, the service principal needs storage blob data reader access.

- **Connection**: When setting up a data connection in Fabric Data Factory, you can choose to authenticate using a service principal. This involves providing the tenant ID, client ID, and client secret of the service principal.
- **Security**: Using SPNs enhances security by avoiding the use of hardcoded credentials in your dataflows. It also allows for better management of access permissions and auditing of access activities.

For more detailed information on how to set up and use SPNs in Fabric Data Factory, refer to [SPN support in Data Factory](service-principals.md).

## Current limitations

- To perform CRUD operations on a CopyJob the workspace must be on a supported Fabric capacity. For more information, see [Microsoft Fabric license types](../enterprise/licenses.md).

- Non-Power BI Fabric Items: The workspace must be on a support Fabric capacity.

## Related content

Refer to the following content for more information on REST APIs for Copy jobs in Fabric Data Factory:

### Documentation

- [Fabric Copy job public REST API](/rest/api/fabric/copyjob/items)
- [Microsoft Fabric REST API](/rest/api/fabric/articles/)
- [CRUD Items APIs in Fabric](/rest/api/fabric/core/items)
