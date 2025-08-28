---
title: API capabilities for Fabric Data Factory's Apache Airflow Job
description: This article describes the available APIs for Apache Airflow Job in Microsoft Fabric Data Factory.
author: conxu-ms
ms.author: conxu
ms.topic: conceptual
ms.custom: airflows
ms.date: 08/28/2025
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

## Get started with REST APIs for Apache Airflow Jobs

The following examples show how to to create, update, and manage Apache Airflow Jobs using the Fabric Data Factory APIs.

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

## Create an Apache Airflow Job

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
  "type": "ApacheAirflowJobs"
}
```

**Sample response**:

```rest
{
    "id": "<artifactId>",
    "type": "ApacheAirflowJobs",
    "displayName": "My Apache Airflow Job",
    "description": "My Apache Airflow Job description",
    "workspaceId": "<workspaceId>"
}
```

## Create an Apache Airflow Job with definition

Create an Apache Airflow Job with a public definition in a specified workspace.

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

  "type": "ApacheAirflowJobs",
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
    "type": "ApacheAirflowJobs",
    "displayName": "My Apache Airflow Job",
    "description": "My Apache Airflow Job description",
    "workspaceId": "<Your workspaceId>"
}
```

## Get Apache Airflow Job

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
    "type": "ApacheAirflowJobs",
    "displayName": "My Apache Airflow Job",
    "description": "My Apache Airflow Job description",
    "workspaceId": "<Your workspaceId>"
}
```

## Get Apache Airflow Job with definition

Returns the Apache Airflow Job item definition.

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

## Update Apache Airflow Job

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
  "type": "ApacheAirflowJobs"
}
```

**Sample response**:

```rest
{
    "id": "<Your artifactId>",
    "type": "ApacheAirflowJobs",
    "displayName": "My Apache Airflow Job updated",
    "description": "My Apache Airflow Job description updated",
    "workspaceId": "<Your workspaceId>"
}
```

## Update Apache Airflow Job with definition

Updates the Apache Airflow Job item definition.

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
  "type": "ApacheAirflowJobs",
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

## Delete Apache Airflow Job

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

## Service Principal Name (SPN) Support

Service Principal Name (SPN) is a security identity feature used by applications or services to access specific resources. In Fabric Data Factory, SPN support is crucial for enabling secure and automated access to data sources. Here are some key points about SPN support:

- **Authentication**: SPNs are used to authenticate applications or services when accessing data sources. This ensures that only authorized entities can access the data.
- **Configuration**: To use SPNs, you need to create a service principal in Azure and grant it the necessary permissions to access the data source. For example, if you're using a data lake, the service principal needs storage blob data reader access.
- **Connection**: When setting up a data connection in Fabric Data Factory, you can choose to authenticate using a service principal. This involves providing the tenant ID, client ID, and client secret of the service principal.
- **Security**: Using SPNs enhances security by avoiding the use of hardcoded credentials in your dataflows. It also allows for better management of access permissions and auditing of access activities.

For more detailed information on how to set up and use SPNs in Fabric Data Factory, refer to [SPN support in Data Factory](service-principals.md).

## Related content

Refer to the following content for more information on APIs in Apache Airflow Jobs in Fabric Data Factory:


- [Microsoft Fabric REST API](/rest/api/fabric/articles/)
- [CRUD Items APIs in Fabric](/rest/api/fabric/core/items)
