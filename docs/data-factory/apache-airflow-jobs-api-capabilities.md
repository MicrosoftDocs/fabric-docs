---
title: API capabilities for Fabric Data Factory's Apache Airflow Job
description: This article describes the available APIs for Apache Airflow Job in Microsoft Fabric Data Factory.
author: conxu-ms
ms.author: conxu
ms.topic: concept-article
ms.custom: airflows
ms.date: 01/22/2026
---

# REST API capabilities for Apache Airflow Jobs in Fabric Data Factory

> [!NOTE]
> Apache Airflow job is powered by [Apache Airflow](https://airflow.apache.org/).

Fabric Data Factory offers a powerful set of APIs that make it easy to automate and manage your Apache Airflow Jobs. You can connect to different data sources and services, and build, update, or monitor your workflows with just a few lines of code. The APIs cover everything from creating and editing Apache Airflow Jobs to tracking them — so you can keep your data flowing smoothly without the hassle.

## API use cases for Apache Airflow Jobs

The APIs for Apache Airflow Jobs in Fabric Data Factory can be used in various scenarios:

- **Automated deployment**: Automate the deployment of Apache Airflow Jobs across different environments (development, testing, production) using CI/CD practices.
- **Monitoring and alerts**: Set up automated monitoring and alerting systems to track the status of Apache Airflow Jobs and receive notifications if failures or performance issues occur.
- **Error handling**: Implement custom error handling and retry mechanisms to ensure Apache Airflow Jobs run smoothly and recover from failures.

## Understanding APIs

To effectively use the APIs for Apache Airflow Jobs in Fabric Data Factory, it's essential to understand the key concepts and components:

- **Endpoints**: The API endpoints provide access to various Apache Airflow Job operations, such as creating, updating, and deleting Apache Airflow Jobs.
- **Authentication**: Secure access to the APIs using authentication mechanisms like OAuth or API keys.
- **Requests and responses**: Understand the structure of API requests and responses, including the required parameters and expected output.
- **Rate limits**: Be aware of the rate limits imposed on API usage to avoid exceeding the allowed number of requests.

### CRUD support

CRUD stands for Create, Read, Update, and Delete, which are the four basic operations that can be performed on data. In Fabric Data Factory, the CRUD operations are supported through the Fabric API for Data Factory. These APIs allow users to manage their Apache Airflow Jobs programmatically. Here are some key points about CRUD support:

- **Create**: Create new Apache Airflow Jobs using the API.
- **Read**: Retrieve information about existing Apache Airflow Jobs.
- **Update**: Update existing Apache Airflow Jobs.
- **Delete**: Delete Apache Airflow Jobs that are no longer needed.

The primary online reference documentation for Microsoft Fabric REST APIs can be found in the [Microsoft Fabric REST API documentation](/rest/api/fabric/articles/).

### Additional APIs offered in Apache Airflow Jobs

In addition to CRUD APIs, there are a series of additional operational APIs offered for Apache Airflow Jobs:

- [File Management APIs](#file-management-apis)
- [Item Management APIs](#item-management-apis)
- [Pool Management APIs](#pool-management-apis)
- [Workspace Settings APIs](#workspace-settings-apis)

## Get started with REST APIs for Apache Airflow Jobs

The following documentation outlines how to create, update, and manage Apache Airflow Jobs and operational use cases using the Fabric Data Factory APIs.

## Obtain an authorization token

Before you use the other REST APIs, you need to have the bearer token.

>[!IMPORTANT]
>In the following examples, ensure the word 'Bearer ' (with a space) precedes the access token itself. When using an API client and selecting 'Bearer Token' as the authentication type, 'Bearer ' is automatically inserted for you, and only requires the access token to be provided.

### Option 1: Using MSAL.Net

Refer to the [Get Token section of the Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart#get-token) as an example of how to obtain the MSAL authorization token.

Use MSAL.Net to acquire a Microsoft Entra ID token for Fabric service with the following scopes: _Workspace.ReadWrite.All_, _Item.ReadWrite.All_. For more information about token acquisition with MSAL.Net to, see [Token Acquisition - Microsoft Authentication Library for .NET](/entra/msal/dotnet/acquiring-tokens/overview).

Copy the token from the _AccessToken_ property and replace the _&lt;access-token&gt;_ placeholder in the following examples with the token.

### Option 2: Using the Fabric portal

Sign in to the Fabric portal for the Tenant you want to test on, and press F12 to enter the browser's developer mode. In the console there, run:

```azurecli
powerBIAccessToken
```

Copy the token and replace the _&lt;access-token&gt;_ placeholder in the following examples with the token.

## Item management APIs

### Create an Apache Airflow Job

Create an Apache Airflow Job in a specified workspace.

**Sample request:**

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items```

**Headers**:

```rest
{
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```rest
{
  "displayName": "My Apache Airflow Job",
  "description": "My Apache Airflow Job description",
  "type": "ApacheAirflowJob"
}
```

**Sample response**:

```rest
{
  "id": "<artifactId>",
  "type": "ApacheAirflowJob",
  "displayName": "My Apache Airflow Job",
  "description": "My Apache Airflow Job description",
  "workspaceId": "<workspaceId>"
}
```

### Create an Apache Airflow Job with definition

Create an Apache Airflow Job with a public definition in a specified workspace.
For additional details on creating an Apache Airflow Job with definition, please review - [Microsoft Fabric REST API](/rest/api/fabric/apacheairflowjob/items/create-apache-airflow-job).

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items```

**Headers**:

```rest
{
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```rest
{
  "displayName": " My Apache Airflow Job",
  "description": "My Apache Airflow Job description",

  "type": "ApacheAirflowJob",
  "definition": { 
    "parts": [ 
      {
        "path": "ApacheAirflowJob.json",
        "payload": "{apacheAirflowJobPayload}",
        "payloadType": "InlineBase64"
      },
      {
        "path": ".platform",
        "payload": "{apacheAirflowJobPayload}",
        "payloadType": "InlineBase64"
      }
    ] 
  }
}
```

**Sample response**:

```rest
{
  "id": "<Your artifactId>",
  "type": "ApacheAirflowJob",
  "displayName": "My Apache Airflow Job",
  "description": "My Apache Airflow Job description",
  "workspaceId": "<Your workspaceId>"
}
```

### Get Apache Airflow Job

Returns properties of specified Apache Airflow Job.

**Sample request**:

**URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}```

**Headers**:

```rest
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:

```rest
{
  "id": "<Your artifactId>",
  "type": "ApacheAirflowJob",
  "displayName": "My Apache Airflow Job",
  "description": "My Apache Airflow Job description",
  "workspaceId": "<Your workspaceId>"
}
```

### Get Apache Airflow Job with definition

Returns the Apache Airflow Job item definition.
For additional details on getting an Apache Airflow Job with definition, please review - [Microsoft Fabric REST API](/rest/api/fabric/apacheairflowjob/items/get-apache-airflow-job-definition).

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/getDefinition```

**Headers**:

```rest
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:

```rest
{
  "definition": {
    "parts": [
      {
        "path": "ApacheAirflowJob.json",
        "payload": "{apacheAirflowJobPayload}",
        "payloadType": "InlineBase64"
      },
      {
        "path": ".platform",
        "payload": "{apacheAirflowJobPayload}",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

### Update Apache Airflow Job

Updates the properties of the Apache Airflow Job.

**Sample request**:

**URI**: ```PATCH https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}```

**Headers**:

```rest
{
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```rest
{
  "displayName": "My Apache Airflow Job updated",
  "description": "My Apache Airflow Job description updated",
  "type": "ApacheAirflowJob"
}
```

**Sample response**:

```rest
{
  "id": "<Your artifactId>",
  "type": "ApacheAirflowJob",
  "displayName": "My Apache Airflow Job updated",
  "description": "My Apache Airflow Job description updated",
  "workspaceId": "<Your workspaceId>"
}
```

### Update Apache Airflow Job with definition

Updates the Apache Airflow Job item definition.
For additional details on updating an Apache Airflow Job with definition, please review - [Microsoft Fabric REST API](/rest/api/fabric/apacheairflowjob/items/update-apache-airflow-job-definition).

**Sample request**:

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/updateDefinition```

**Headers**:

```rest
{
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}
```

**Payload**:

```rest
{
  "displayName": "My Apache Airflow Job",
  "type": "ApacheAirflowJob",
  "definition": {
    "parts": [ 
      {
        "path": "ApacheAirflowJob.json",
        "payload": "{apacheAirflowJobPayload}",
        "payloadType": "InlineBase64"
      },
      {
        "path": ".platform",
        "payload": "{apacheAirflowJobPayload}",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

**Sample response**:

```rest
200 OK
```

### Delete Apache Airflow Job

Deletes the specified Apache Airflow Job.

**Sample request**:

**URI**: ```DELETE https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}```

**Headers**:

```rest
{
  "Authorization": "Bearer <access-token>"
}
```

**Sample response**:

```rest
200 OK
```

## File Management APIs

> [!NOTE]
> Include `?preview=true` as a query parameter in requests to all file management endpoints. Omit only if/when otherwise documented.

> [!IMPORTANT]
> File management APIs require the same bearer token and scopes as other job APIs (`Workspace.ReadWrite.All`, `Item.ReadWrite.All`). Only users or applications with edit permissions on the Apache Airflow Job can create, update, or delete files.

### Get Apache Airflow Job File

Returns job file from Apache Airflow by path.

**Request URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheairflowjobs/{apacheAirflowJobId}/files/{filePath}?preview=true```

**Example: Retrieve and save file to disk using curl**

```bash
curl -X GET \
  -H "Authorization: Bearer <access-token>" \
  "https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/apacheairflowjobs/<apacheAirflowJobId>/files/<filePath>?preview=true" \
  -o <local-filename>
```

**Sample Results**:

```rest
200 OK
```

**Behavior notes:**
- If the file is a Python DAG, the response body contains the UTF-8 encoded text of the file.
- If the specified `filePath` does not exist, a `404 Not Found` is returned.

### Create/Update Apache Airflow Job File

Creates or updates an Apache Airflow Job file.

**Request URI**: ```PUT https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheairflowjobs/{apacheAirflowJobId}/files/{filePath}?preview=true```

**Behavior notes:**
- Intermediate folders in the specified path are created automatically if they do not exist (if supported by the service); otherwise, a `400 Bad Request` is returned for invalid paths.
- Existing files at the specified path are overwritten by default.

**Request Payload**:

```rest
PYTHON files (DAGs), should be UTF-8 encoded
```

**Sample Results**:

```rest
200 OK
```

### Delete Apache Airflow Job File

Deletes the specified Apache Airflow Job file.

**Request URI**: ```DELETE https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheairflowjobs/{apacheAirflowJobId}/files/{filePath}?preview=true```

**Behavior notes:**
- Returns `200 OK` on successful deletion.
- Returns `404 Not Found` if the specified `filePath` does not exist.
- Returns `409 Conflict` if the path refers to a non-empty folder (if folders are supported).

**Sample Results**:

```rest
200 OK
```

### List Apache Airflow Job Files

Lists the files for the specified Apache Airflow Job.

**Request URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheairflowjobs/{apacheAirflowJobId}/files?rootPath="my_folder"&continuationToken={token}?preview=true```

Both `rootPath` and `continuationToken` are optional. Use `continuationToken` to paginate subsequent results.

**Response schema:**

```json
{
  "files": [
    {
      "filePath": "string", // relative path to the file (URL-encoded in subsequent requests)
      "sizeInBytes": integer
    }
  ],
  "continuationToken": "string", // token for fetching the next page, if any
  "continuationUri": "string" // full URI for the next page, if any
}
```

**Sample response:**

```json
{
  "files": [
    {
      "filePath": "dags/my_dag.py",
      "sizeInBytes": 1234
    }
  ],
 "continuationToken": "LDEsMTAwMDAwLDA%3D "
"continuationUri": "https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheairflowjobs/{apacheAirflowJobId}/files?continuationToken='LDEsMTAwMDAwLDA%3D'"
}  
```
## Pool Management APIs

### Create Airflow Pool Template

Creates an Apache Airflow pool template.

**Request URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheAirflowJobs/poolTemplates?beta={beta}```

**Sample Results**:

```rest
{
  "id": "12345678-1234-1234-1234-123456789012",
  "name": "MyAirflowPool",
  "nodeSize": "Small",
  "shutdownPolicy": "OneHourInactivity",
  "computeScalability": {
    "minNodeCount": 5,
    "maxNodeCount": 8
  },
  "apacheAirflowJobVersion": "1.0.0"
}
```

### Delete Airflow Pool Template
Deletes an Apache Airflow pool template.

Note that deleting the default pool template will reset the workspace back to the starter pool.

**Request URI**: ```DELETE https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheAirflowJobs/poolTemplates/{poolTemplateId}?beta={beta}```

**Sample Results**:

```rest
200 OK 
```

### Get Airflow Pool Template
Get an Apache Airflow pool template.

**Request URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheAirflowJobs/poolTemplates/{poolTemplateId}?beta={beta}```

**Sample Results**:

```rest
{
  "id": "12345678-1234-1234-1234-123456789012",
  "name": "MyAirflowPool",
  "nodeSize": "Small",
  "shutdownPolicy": "OneHourInactivity",
  "computeScalability": {
    "minNodeCount": 5,
    "maxNodeCount": 8
  },
  "apacheAirflowJobVersion": "1.0.0"
}
```

### List Airflow Pool Template
Lists Apache Airflow pool templates. This API supports pagination.

**Request URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheAirflowJobs/poolTemplates?beta={beta}```

**Sample Results**:

```rest
{
  "value": [
    {
      "id": "12345678-1234-1234-1234-123456789012",
      "name": "MyAirflowPool",
      "nodeSize": "Small",
      "shutdownPolicy": "OneHourInactivity",
      "computeScalability": {
        "minNodeCount": 5,
        "maxNodeCount": 8
      },
      "apacheAirflowJobVersion": "1.0.0"
    },
    {
      "id": "87654321-4321-4321-4321-210987654321",
      "name": "LargeAirflowPool",
      "nodeSize": "Large",
      "shutdownPolicy": "AlwaysOn",
      "computeScalability": {
        "minNodeCount": 5,
        "maxNodeCount": 10
      },
      "apacheAirflowJobVersion": "1.0.0"
    }
  ]
}
```

## Workspace Settings APIs

### Get Airflow Workspace Settings

Get Apache Airflow workspace settings.

**Request URI**: ```GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheAirflowJobs/settings?beta={beta}```

**Sample Results**:

```rest
{
  "defaultPoolTemplateId": "12345678-1234-1234-1234-123456789012"
}
```
### Update Airflow Workspace Settings

Updates Apache Airflow workspace settings.

**Request URI**: ```PATCH https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/apacheAirflowJobs/settings?beta={beta}```

**Sample Results**:

```rest
{
  "defaultPoolTemplateId": "12345678-1234-1234-1234-123456789012"
}
```

> [!NOTE]
> `filePath` values must be URL-encoded when used in subsequent requests.

## Service Principal Name (SPN) Support

Service Principal Name (SPN) is supported for Apache Airflow Jobs in Fabric Data Factory.

- **Authentication**: Airflow uses a service principal to authenticate outbound API calls (for example, to Azure services or other secured endpoints). This allows DAGs to run unattended while ensuring only approved identities can access downstream resources.
- **Configuration**: To use an SPN with Airflow, create a service principal in Azure Active Directory and grant it the required permissions for the target service. For example, if your Airflow DAG reads from or writes to Azure Data Lake Storage, the service principal must be assigned the appropriate storage roles (such as Storage Blob Data Reader or Contributor).
- **Connection**: When configuring Airflow connections in Fabric Data Factory, you can reference a service principal by providing its tenant ID, client ID, and client secret. These credentials are then used by Airflow operators and hooks when making authenticated API calls.
- **Security**: Using SPNs avoids embedding user credentials directly in DAG code or configuration files. It also simplifies credential rotation, access auditing, and access revocation without requiring changes to Airflow DAG logic.

For more detailed information on how to set up and use SPNs in Fabric Data Factory, refer to [SPN support in Data Factory](service-principals.md).

## Related content

Refer to the following content for more information on APIs in Apache Airflow Jobs in Fabric Data Factory:

- [Microsoft Fabric REST API](/rest/api/fabric/articles/)
- [CRUD Items APIs in Fabric](/rest/api/fabric/core/items)
