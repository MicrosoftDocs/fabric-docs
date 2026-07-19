---
title: Public APIs Capabilities for Dataflow Gen2 in Fabric Data Factory
description: Use the dataflow public APIs to manage your data integration through operations including dataflow CRUD (Create, Read, Update, and Delete), scheduling, and monitoring.
ms.reviewer: conxu
ms.date: 06/19/2026
ms.topic: concept-article
ms.custom:
  - dataflows
---

# Public APIs capabilities for Dataflow Gen2 in Fabric Data Factory

Fabric Data Factory provides a set of APIs that you can use to automate and manage your dataflows efficiently. These APIs integrate with various data sources and services, so you can create, update, and monitor your data workflows programmatically. The APIs support a wide range of operations, including dataflows CRUD (Create, Read, Update, and Delete), scheduling, and monitoring.

## API use cases for dataflows

Use the APIs for dataflows in Fabric Data Factory in various scenarios:

- **Automated deployment**: Automate the deployment of dataflows across different environments (development, testing, production) by using CI/CD practices.
- **Monitoring and alerts**: Set up automated monitoring and alerting systems to track the status of dataflows and receive notifications in case of failures or performance issues.
- **Data integration**: Integrate data from multiple sources, such as databases, data lakes, and cloud services, into a unified dataflow for processing and analysis.
- **Error handling**: Implement custom error handling and retry mechanisms to ensure dataflows run smoothly and recover from failures.

<a id="understanding-apis"></a>

## Understand APIs

To use the APIs for dataflows in Fabric Data Factory effectively, understand the key concepts and components:

- **Endpoints**: The API endpoints provide access to various dataflow operations, such as creating, updating, and deleting dataflows.
- **Authentication**: Secure access to the APIs using authentication mechanisms like OAuth or API keys.
- **Requests and Responses**: Understand the structure of API requests and responses, including the required parameters and expected output.
- **Rate Limits**: Be aware of the rate limits imposed on API usage to avoid exceeding the allowed number of requests.

### CRUD support

CRUD stands for Create, Read, Update, and Delete - the four basic operations you can perform on data. The Fabric API for Data Factory supports CRUD operations, so you can manage your dataflows programmatically. Key points about CRUD support:

- **Create**: Create new dataflows using the API. This involves defining the dataflow structure, specifying data sources, transformations, and destinations.
- **Read**: Retrieve information about existing dataflows. This includes details about their configuration, status, and execution history.
- **Update**: Update existing dataflows. This might involve modifying the dataflow structure, changing data sources, or updating transformation logic.
- **Delete**: Delete dataflows that are no longer needed. This helps in managing and cleaning up resources.

For the primary online reference documentation for Microsoft Fabric REST APIs, see the [Microsoft Fabric REST API documentation](/rest/api/fabric/articles/).

### Dataflow lifecycle

When working with dataflows, it's important to understand the lifecycle of a dataflow to ensure smooth and efficient data integration processes. The key stages in the dataflow lifecycle include:

- **Definition:** This stage is where you create or modify the definition of a dataflow. This process involves specifying the data sources, transformations, and destinations.
- **Publish:** After modifying a dataflow's definition, you need to invoke the **Publish** operation. This is a crucial step as it saves the changes made to the dataflow's definition and makes it available for execution.
- **Refresh:** After the dataflow is published, you can invoke the **Refresh** operation. This operation triggers the dataflow to run, pulling data from the specified sources, applying the defined transformations, and loading the data into the destination.

## Prerequisites

To use the Dataflow Gen2 public APIs, you need:

- A [Microsoft Fabric workspace](../fundamentals/create-workspaces.md) with at least a Contributor role.
- A Microsoft Entra ID token with the scopes `Workspace.ReadWrite.All` and `Item.ReadWrite.All`. See [Obtain an authorization token](#obtain-an-authorization-token) for details.
- The workspace ID where you want to create or manage dataflows.

## Get started with public APIs for dataflows

The following table summarizes all available Dataflow Gen2 API operations:

| Operation | HTTP method | Endpoint |
|-----------|-------------|----------|
| Create a dataflow | POST | `/v1/workspaces/{workspaceId}/items` |
| Create a dataflow with definition | POST | `/v1/workspaces/{workspaceId}/items` (with `definition` in payload) |
| Get dataflow | GET | `/v1/workspaces/{workspaceId}/items/{itemId}` |
| Get dataflow with definition | POST | `/v1/workspaces/{workspaceId}/items/{itemId}/getDefinition` |
| Update dataflow | PATCH | `/v1/workspaces/{workspaceId}/items/{itemId}` |
| Update dataflow with definition | POST | `/v1/workspaces/{workspaceId}/items/{itemId}/updateDefinition` |
| Delete dataflow | DELETE | `/v1/workspaces/{workspaceId}/items/{itemId}` |
| Run on-demand refresh | POST | `/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances?jobType=Refresh` |
| Run on-demand publish | POST | `/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances?jobType=Publish` |
| Get job instance | GET | `/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances/{jobInstanceId}` |
| Cancel job instance | POST | `/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances/{jobInstanceId}/cancel` |

This section covers the following topics:

- [Obtain an authorization token](#obtain-an-authorization-token)
- [Create a dataflow](#create-a-dataflow)
- [Create a dataflow with definition](#create-a-dataflow-with-definition)
- [Get dataflow](#get-dataflow)
- [Get dataflow with definition](#get-dataflow-with-definition)
- [Update dataflow](#update-dataflow)
- [Update dataflow with definition](#update-dataflow-with-definition)
- [Delete dataflow](#delete-dataflow)
- [Run on-demand dataflow job (refresh)](#run-on-demand-dataflow-job-refresh)
- [Run on-demand dataflow publish job](#run-on-demand-dataflow-publish-job)
- [Get dataflow job instance](#get-dataflow-job-instance)
- [Cancel dataflow job instance](#cancel-dataflow-job-instance)

### Obtain an authorization token

You need a bearer token for all REST API calls. Get it by using one of these options:

- [MSAL.NET](#msalnet)
- [Fabric portal](#fabric-portal)

#### MSAL.NET

[Fabric API quickstart - Microsoft Fabric REST APIs](/rest/api/fabric/articles/get-started/fabric-api-quickstart)

Use MSAL.NET to acquire a Microsoft Entra ID token for the Fabric service with the following scopes: `Workspace.ReadWrite.All`, `Item.ReadWrite.All`. For more information about token acquisition with MSAL.NET, see [Token Acquisition - Microsoft Authentication Library for .NET](/entra/msal/dotnet/acquiring-tokens/overview).

Paste the Application (client) ID you copied earlier into the **ClientId** variable.

#### Fabric portal

Sign in to the Fabric portal for the tenant you want to test, and select F12 to open the browser's developer tools. In the console, run:

```http
powerBIAccessToken
```

Copy the token and paste it into the **ClientId** variable.

### Create a dataflow

Create a dataflow in a specified workspace. Send a POST request to the items endpoint with a `displayName`, `description`, and `type` set to `Dataflow`. The response includes the created item with its `id`.

**Sample request**

```http
URI: POST [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items)

Headers:

{
    "Authorization": "\<bearer-token>",
    "Content-Type": "application/json"
}

Payload:

{
    "displayName": "My dataflow",
    "description": "My dataflow description",
    "type": "Dataflow"
}
```

**Sample response**

```http
{
    "id": "\<itemId>",
    "type": "Dataflow",
    "displayName": "My dataflow",
    "description": "My dataflow description",
    "workspaceId": "\<workspaceId>"
}
```

### Create a dataflow with definition

Create a dataflow with a Base64 definition in a specified workspace. Send a POST request to the items endpoint with an inline Base64-encoded mashup document in the `definition.parts` array.

**Sample mashup document**

```http
{
    "editingSessionMashup": {
            "mashupName": "",
            "mashupDocument": "section Section1;\r\nshared Query = let\n Source = Table.FromRows(\n {\n {1, \"Bob\", \"123-4567\"},\n {2, \"Jim\", \"987-6543\"}\n },\n {\"CustomerID\", \"Name\", \"Phone\"})\nin\n Source;\r\n",
            "queryGroups": [],
            "documentLocale": "en-US",
            "gatewayObjectId": null,
            "queriesMetadata": null,
            "connectionOverrides": [],
            "trustedConnections": null,
            "useHostConnectionProvider": false,
            "fastCombine": false,
            "allowNativeQueries": true,
            "allowedModules": null,
            "skipAutomaticTypeAndHeaderDetection": false,
            "disableAutoAnonymousConnectionUpsert": null,
            "hostProperties": {
                    "DataflowRefreshOutputFileFormat": "Parquet",
                    "EnableDateTimeFieldsForStaging": "true",
                    "EnablePublishWithoutLoadedQueries": "true"
            },
            "defaultOutputDestinationConfiguration": null,
            "stagingDefinition": null
    }
}
```

Use [Base64 Encode and Decode](https://www.base64encode.org/) to encode your JSON.

Ensure that the **Perform URL safe encoding** box isn't checked.

Paste the response of your encoded Base64 request payload into the payload definition

**Sample request**

```http
URI: POST [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items)

Headers:

{
    "Authorization": "\<bearer-token>",
    "Content-Type": "application/json"
}

Payload:

{
    "displayName": " My dataflow",
    "description": "My dataflow description",

    "type": "Dataflow",
    "definition": {
        "parts": [
            {
                "path": "dataflow-content.json",
                "payload": "ewogICAgImVkaXRpbmdTZXNzaW9uTWFzaHVwIjogewogICAgICAgICJtYXNodXBOYW1lIjogIiIsCiAgICAgICAgIm1hc2h1cERvY3VtZW50IjogInNlY3Rpb24gU2VjdGlvbjE7XHJcbnNoYXJlZCBRdWVyeSA9IGxldFxuIFNvdXJjZSA9IFRhYmxlLkZyb21Sb3dzKFxuIHtcbiB7MSwgXCJCb2JcIiwgXCIxMjMtNDU2N1wifSxcbiB7MiwgXCJKaW1cIiwgXCI5ODctNjU0M1wifVxuIH0sXG4ge1wiQ3VzdG9tZXJJRFwiLCBcIk5hbWVcIiwgXCJQaG9uZVwifSlcbmluXG4gU291cmNlO1xyXG4iLAogICAgICAgICJxdWVyeUdyb3VwcyI6IFtdLAogICAgICAgICJkb2N1bWVudExvY2FsZSI6ICJlbi1VUyIsCiAgICAgICAgImdhdGV3YXlPYmplY3RJZCI6IG51bGwsCiAgICAgICAgInF1ZXJpZXNNZXRhZGF0YSI6IG51bGwsCiAgICAgICAgImNvbm5lY3Rpb25PdmVycmlkZXMiOiBbXSwKICAgICAgICAidHJ1c3RlZENvbm5lY3Rpb25zIjogbnVsbCwKICAgICAgICAidXNlSG9zdENvbm5lY3Rpb25Qcm92aWRlciI6IGZhbHNlLAogICAgICAgICJmYXN0Q29tYmluZSI6IGZhbHNlLAogICAgICAgICJhbGxvd05hdGl2ZVF1ZXJpZXMiOiB0cnVlLAogICAgICAgICJhbGxvd2VkTW9kdWxlcyI6IG51bGwsCiAgICAgICAgInNraXBBdXRvbWF0aWNUeXBlQW5kSGVhZGVyRGV0ZWN0aW9uIjogZmFsc2UsCiAgICAgICAgImRpc2FibGVBdXRvQW5vbnltb3VzQ29ubmVjdGlvblVwc2VydCI6IG51bGwsCiAgICAgICAgImhvc3RQcm9wZXJ0aWVzIjogewogICAgICAgICAgICAiRGF0YWZsb3dSZWZyZXNoT3V0cHV0RmlsZUZvcm1hdCI6ICJQYXJxdWV0IiwKICAgICAgICAgICAgIkVuYWJsZURhdGVUaW1lRmllbGRzRm9yU3RhZ2luZyI6ICJ0cnVlIiwKICAgICAgICAgICAgIkVuYWJsZVB1Ymxpc2hXaXRob3V0TG9hZGVkUXVlcmllcyI6ICJ0cnVlIgogICAgICAgIH0sCiAgICAgICAgImRlZmF1bHRPdXRwdXREZXN0aW5hdGlvbkNvbmZpZ3VyYXRpb24iOiBudWxsLAogICAgICAgICJzdGFnaW5nRGVmaW5pdGlvbiI6IG51bGwKICAgIH0KfQ==",
                "payloadType": "InlineBase64"
            }
        ]
    }
}
```

**Sample response**

```http
{
    "id": "\<itemId>",
    "type": "Dataflow",
    "displayName": "My dataflow",
    "description": "My dataflow description",
    "workspaceId": "\<workspaceId>"
}
```

### Get dataflow

Returns the properties of a specified dataflow. Send a GET request with the `workspaceId` and `itemId` path parameters.

**Sample request**

```http
URI: GET [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d)

Headers:

{
    "Authorization": "\<bearer-token>"
}
```

**Sample response**

```http
{
    "id": "\<itemId>",
    "type": "Dataflow",
    "displayName": "My dataflow",
    "description": "My dataflow description",
    "workspaceId": "\<workspaceId>"
}
```

### Get dataflow with definition

Returns the dataflow item definition. Send a POST request to the `getDefinition` endpoint. The response contains Base64-encoded parts including the mashup document and platform metadata.

**Sample request**

```http
URI: POST [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/getDefinition](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d/getDefinition)

Headers:

{
    "Authorization": "\<bearer-token>"
}
```

**Sample response**

```http
{

    "definition": {

        "parts": [

            {

                "path": "dataflow-content.json",

                "payload": " ewogICAgImVkaXRpbmdTZXNzaW9uTWFzaHVwIjogewogICAgICAgICJtYXNodXBOYW1lIjogIiIsCiAgICAgICAgIm1hc2h1cERvY3VtZW50IjogInNlY3Rpb24gU2VjdGlvbjE7XHJcbnNoYXJlZCBRdWVyeSA9IGxldFxuIFNvdXJjZSA9IFRhYmxlLkZyb21Sb3dzKFxuIHtcbiB7MSwgXCJCb2JcIiwgXCIxMjMtNDU2N1wifSxcbiB7MiwgXCJKaW1cIiwgXCI5ODctNjU0M1wifVxuIH0sXG4ge1wiQ3VzdG9tZXJJRFwiLCBcIk5hbWVcIiwgXCJQaG9uZVwifSlcbmluXG4gU291cmNlO1xyXG4iLAogICAgICAgICJxdWVyeUdyb3VwcyI6IFtdLAogICAgICAgICJkb2N1bWVudExvY2FsZSI6ICJlbi1VUyIsCiAgICAgICAgImdhdGV3YXlPYmplY3RJZCI6IG51bGwsCiAgICAgICAgInF1ZXJpZXNNZXRhZGF0YSI6IG51bGwsCiAgICAgICAgImNvbm5lY3Rpb25PdmVycmlkZXMiOiBbXSwKICAgICAgICAidHJ1c3RlZENvbm5lY3Rpb25zIjogbnVsbCwKICAgICAgICAidXNlSG9zdENvbm5lY3Rpb25Qcm92aWRlciI6IGZhbHNlLAogICAgICAgICJmYXN0Q29tYmluZSI6IGZhbHNlLAogICAgICAgICJhbGxvd05hdGl2ZVF1ZXJpZXMiOiB0cnVlLAogICAgICAgICJhbGxvd2VkTW9kdWxlcyI6IG51bGwsCiAgICAgICAgInNraXBBdXRvbWF0aWNUeXBlQW5kSGVhZGVyRGV0ZWN0aW9uIjogZmFsc2UsCiAgICAgICAgImRpc2FibGVBdXRvQW5vbnltb3VzQ29ubmVjdGlvblVwc2VydCI6IG51bGwsCiAgICAgICAgImhvc3RQcm9wZXJ0aWVzIjogewogICAgICAgICAgICAiRGF0YWZsb3dSZWZyZXNoT3V0cHV0RmlsZUZvcm1hdCI6ICJQYXJxdWV0IiwKICAgICAgICAgICAgIkVuYWJsZURhdGVUaW1lRmllbGRzRm9yU3RhZ2luZyI6ICJ0cnVlIiwKICAgICAgICAgICAgIkVuYWJsZVB1Ymxpc2hXaXRob3V0TG9hZGVkUXVlcmllcyI6ICJ0cnVlIgogICAgICAgIH0sCiAgICAgICAgImRlZmF1bHRPdXRwdXREZXN0aW5hdGlvbkNvbmZpZ3VyYXRpb24iOiBudWxsLAogICAgICAgICJzdGFnaW5nRGVmaW5pdGlvbiI6IG51bGwKICAgIH0KfQ=="

                "payloadType": "InlineBase64"

            },

            {

                "path": ".platform",

                "payload": "ewogICIkc2NoZW1hIjogImh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vanNvbi1zY2hlbWFzL2ZhYnJpYy9naXRJbnRlZ3JhdGlvbi9wbGF0Zm9ybVByb3BlcnRpZXMvMi4wLjAvc2NoZW1hLmpzb24iLAogICJtZXRhZGF0YSI6IHsKICAgICJ0eXBlIjogIkRhdGFmbG93IiwKICAgICJkaXNwbGF5TmFtZSI6ICJEYXRhZmxvdyAzIgogIH0sCiAgImNvbmZpZyI6IHsKICAgICJ2ZXJzaW9uIjogIjIuMCIsCiAgICAibG9naWNhbElkIjogIjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIKICB9Cn0=",

                "payloadType": "InlineBase64"

            }

        ]

    }

}
```

**Sample response (simplified format)**

```http
{
    'definition':
    {
        'parts': [
            {
                'path': 'queryMetadata.json', 'payload': '<super long entry>', 'payloadType': 'InlineBase64'
            },
            {
                'path': 'mashup.pq', 'payload': '<super long entry>', 'payloadType': 'InlineBase64'
            },
            {
                'path': '.platform', 'payload': '<super long entry>', 'payloadType': 'InlineBase64'
            }
        ]
    }
}
```

### Update dataflow

Updates the properties of a specified dataflow. Send a PATCH request with the `workspaceId` and `itemId` path parameters. Include the updated `displayName` or `description` in the request body.

**Sample request**

```http
URI: PATCH [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d)

Headers:

{
  "Authorization": "\<bearer-token>",
  "Content-Type": "application/json"
}

Payload:
{
  "displayName": "My dataflow updated",
  "description": "My dataflow description updated",
  "type": "Dataflow"
}
```

**Sample response**

```http
{
    "id": "\<itemId>",
    "type": "Dataflow",
    "displayName": "My dataflow updated",
    "description": "My dataflow description updated",
    "workspaceId": "\<workspaceId>"
}
```

### Update dataflow with definition

Updates the dataflow item definition. Send a POST request to the `updateDefinition` endpoint with Base64-encoded definition parts in the request body.

**Sample request**

```http
URI: POST [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/updateDefinition](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d/updateDefinition)

Headers:

{
  "Authorization": "\<bearer-token>",
  "Content-Type": "application/json"
}

Payload:

{
  "displayName": " My dataflow",
  "type": "Dataflow",
  "definition": {
    "parts": [
      {
        "path": "dataflow-content.json",
        "payload": " ewogICAgImVkaXRpbmdTZXNzaW9uTWFzaHVwIjogewogICAgICAgICJtYXNodXBOYW1lIjogIiIsCiAgICAgICAgIm1hc2h1cERvY3VtZW50IjogInNlY3Rpb24gU2VjdGlvbjE7XHJcbnNoYXJlZCBRdWVyeSA9IGxldFxuIFNvdXJjZSA9IFRhYmxlLkZyb21Sb3dzKFxuIHtcbiB7MSwgXCJCb2JcIiwgXCIxMjMtNDU2N1wifSxcbiB7MiwgXCJKaW1cIiwgXCI5ODctNjU0M1wifVxuIH0sXG4ge1wiQ3VzdG9tZXJJRFwiLCBcIk5hbWVcIiwgXCJQaG9uZVwifSlcbmluXG4gU291cmNlO1xyXG4iLAogICAgICAgICJxdWVyeUdyb3VwcyI6IFtdLAogICAgICAgICJkb2N1bWVudExvY2FsZSI6ICJlbi1VUyIsCiAgICAgICAgImdhdGV3YXlPYmplY3RJZCI6IG51bGwsCiAgICAgICAgInF1ZXJpZXNNZXRhZGF0YSI6IG51bGwsCiAgICAgICAgImNvbm5lY3Rpb25PdmVycmlkZXMiOiBbXSwKICAgICAgICAidHJ1c3RlZENvbm5lY3Rpb25zIjogbnVsbCwKICAgICAgICAidXNlSG9zdENvbm5lY3Rpb25Qcm92aWRlciI6IGZhbHNlLAogICAgICAgICJmYXN0Q29tYmluZSI6IGZhbHNlLAogICAgICAgICJhbGxvd05hdGl2ZVF1ZXJpZXMiOiB0cnVlLAogICAgICAgICJhbGxvd2VkTW9kdWxlcyI6IG51bGwsCiAgICAgICAgInNraXBBdXRvbWF0aWNUeXBlQW5kSGVhZGVyRGV0ZWN0aW9uIjogZmFsc2UsCiAgICAgICAgImRpc2FibGVBdXRvQW5vbnltb3VzQ29ubmVjdGlvblVwc2VydCI6IG51bGwsCiAgICAgICAgImhvc3RQcm9wZXJ0aWVzIjogewogICAgICAgICAgICAiRGF0YWZsb3dSZWZyZXNoT3V0cHV0RmlsZUZvcm1hdCI6ICJQYXJxdWV0IiwKICAgICAgICAgICAgIkVuYWJsZURhdGVUaW1lRmllbGRzRm9yU3RhZ2luZyI6ICJ0cnVlIiwKICAgICAgICAgICAgIkVuYWJsZVB1Ymxpc2hXaXRob3V0TG9hZGVkUXVlcmllcyI6ICJ0cnVlIgogICAgICAgIH0sCiAgICAgICAgImRlZmF1bHRPdXRwdXREZXN0aW5hdGlvbkNvbmZpZ3VyYXRpb24iOiBudWxsLAogICAgICAgICJzdGFnaW5nRGVmaW5pdGlvbiI6IG51bGwKICAgIH0KfQ==",
        "payloadType": "InlineBase64"
      }
    ]
  }
}
```

**Sample response**

```http
200 OK
```

### Delete dataflow

Deletes the specified dataflow. Send a DELETE request with the `workspaceId` and `itemId` path parameters. Returns `200 OK` on success.

**Sample request**

```http
URI: DELETE [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d)

Headers:

{
  "Authorization": "\<bearer-token>"
}
```

**Sample response**

```http
200 OK
```

### Run on-demand dataflow job (refresh)

Triggers an on-demand refresh for the specified dataflow. Send a POST request with `jobType=Refresh` as a query parameter. Include the `DataflowName`, `OwnerUserPrincipalName`, and `OwnerUserObjectId` in the `executionData` payload. Returns `202 Accepted` with a `jobInstanceId` for tracking.

**Sample request**

```http
URI: POST [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances?jobType=Refresh](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d/jobs/instances?jobType=Refresh)

Headers:

{
  "Authorization": "\<bearer-token>"
}

Payload:

{
    "executionData": {
        "DataflowName": "Dataflow",
        "OwnerUserPrincipalName": "\<name@email.com>",
        "OwnerUserObjectId": "\<ObjectId>"
    }
}
```

**Sample response**

```http
202 Accepted
[
  {
    "id": "\<jobId>",
    "itemId": "\<dataflowItemId>",
    "jobType": "Refresh",
    "invokeType": "OnDemand",
    "status": "Accepted",
    "jobInstanceId": "\<uniqueJobInstanceId>",
    "rootActivityId": "\<rootActivityId>",
    "startTimeUtc": "2025-01-30T11:10:50Z",
    "endTimeUtc": null,
    "failureReason": null
  }
]
```

### Run on-demand dataflow publish job

Triggers an on-demand publish for the specified dataflow. Send a POST request with `jobType=Publish` as a query parameter. Returns `202 Accepted` with a `jobInstanceId` for tracking.

**Sample request**

```http
URI: POST [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances?jobType=Publish](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d/jobs/instances?jobType=Publish)

Headers:

{
  "Authorization": "\<bearer-token>"
}

Payload:

{
    "executionData": {
        "DataflowName": "Dataflow",
        "OwnerUserPrincipalName": "\<name@email.com>",
        "OwnerUserObjectId": "\<ObjectId>"
    }
}
```

**Sample response**

```http
202 Accepted

[
  {
    "id": "\<jobId>",
    "itemId": "\<dataflowItemId>",
    "jobType": "Publish",
    "invokeType": "OnDemand",
    "status": "Accepted",
    "jobInstanceId": "\<uniqueJobInstanceId>",
    "rootActivityId": "\<rootActivityId>",
    "startTimeUtc": "2025-01-30T11:10:50Z",
    "endTimeUtc": null,
    "failureReason": null
  }
]
```

### Get dataflow job instance

Retrieves the status of a specific job instance. Send a GET request with the `workspaceId`, `itemId`, and `jobInstanceId` path parameters. Returns the job status, start time, and failure reason (if applicable).

**Sample request**

```http
URI: GET [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances/{jobInstanceId}](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d/jobs/instances/%7bjobInstanceId%7d)

Headers:

{
  "Authorization": "\<bearer-token>"
}
```

**Sample response**

```http
{
  "id": "\<id>",
  "itemId": "<itemId?",
  "jobType": "Refresh",
  "invokeType": "Manual",
  "status": "Completed",
  "rootActivityId": "\<rootActivityId>",
  "startTimeUtc": "2023-08-22T06:35:00.7812154",
  "endTimeUtc": "2023-08-22T06:35:00.8033333",
  "failureReason": null
}
```

### Cancel dataflow job instance

Cancels a running job instance. Send a POST request to the `cancel` endpoint with the `workspaceId`, `itemId`, and `jobInstanceId` path parameters. Returns `202 Accepted` when the cancellation is initiated.

**Sample request**

```http
URI: POST [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances/{jobInstanceId}/cancel](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d/jobs/instances/%7bjobInstanceId%7d/cancel)

Headers:

{
  "Authorization": "\<bearer-token>"
}
```

**Sample response**

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/\<worksapceId>/items/\<itemId>/jobs/instances/\<jobInstanceId>

Retry-After: 60
```

## Current limitations

- **Service principal authentication** isn't supported.
- **"Get Item"** and **"List Item Access Details"** don't return the correct information if you filter on dataflow item type.
- When you don't specify the type, the API returns the **Dataflow Gen2 (CI/CD, preview)**—the new Dataflow Gen2 with CI/CD and Git support.
- You can invoke **Run APIs**, but the actual run never succeeds.

## Related content

- [Fabric pipeline public REST API](pipeline-rest-api-capabilities.md)
- [Microsoft Fabric REST API](/rest/api/fabric/articles/)
- [CRUD Items APIs in Fabric](/rest/api/fabric/core/items)
- [Job Scheduler APIs in Fabric](/rest/api/fabric/core/job-scheduler)
