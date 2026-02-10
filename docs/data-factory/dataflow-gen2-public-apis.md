---
title: "Public APIs Capabilities for Dataflow Gen2 in Fabric Data Factory"
description: "Use the dataflow public APIs to manage your data integration through operations including dataflow CRUD (Create, Read, Update, and Delete), scheduling, and monitoring."
ms.reviewer: conxu
ms.topic: concept-article
ms.date: 05/01/2025
ms.custom: dataflows
---

# Public APIs capabilities for Dataflow Gen2 in Fabric Data Factory

Fabric Data Factory provides a robust set of APIs that enable users to automate and manage their dataflows efficiently. These APIs allow for seamless integration with various data sources and services, enabling users to create, update, and monitor their data workflows programmatically. The APIs support a wide range of operations including dataflows CRUD (Create, Read, Update, and Delete), scheduling, and monitoring, making it easier for users to manage their data integration processes.

## APIs use cases for dataflows

The APIs for dataflows in Fabric Data Factory can be used in various scenarios:

- **Automated Deployment**: Automate the deployment of dataflows across different environments (development, testing, production) using CI/CD practices.
- **Monitoring and Alerts**: Set up automated monitoring and alerting systems to track the status of dataflows and receive notifications in case of failures or performance issues.
- **Data Integration**: Integrate data from multiple sources, such as databases, data lakes, and cloud services, into a unified dataflow for processing and analysis.
- **Error Handling**: Implement custom error handling and retry mechanisms to ensure dataflows run smoothly and recover from failures.

## Understanding APIs

To effectively use the APIs for dataflows in Fabric Data Factory, it is essential to understand the key concepts and components:

- **Endpoints**: The API endpoints provide access to various dataflow operations, such as creating, updating, and deleting dataflows.
- **Authentication**: Secure access to the APIs using authentication mechanisms like OAuth or API keys.
- **Requests and Responses**: Understand the structure of API requests and responses, including the required parameters and expected output.
- **Rate Limits**: Be aware of the rate limits imposed on API usage to avoid exceeding the allowed number of requests.

### CRUD Support

CRUD stands for Create, Read, Update, and Delete, which are the four basic operations that can be performed on data. In Fabric Data Factory, the CRUD operations are supported through the Fabric API for Data Factory. These APIs allow users to manage their dataflows programmatically. Here are some key points about CRUD support:

- **Create**: Create new dataflows using the API. This involves defining the dataflow structure, specifying data sources, transformations, and destinations.
- **Read**: Retrieve information about existing dataflows. This includes details about their configuration, status, and execution history.
- **Update**: Update existing dataflows. This might involve modifying the dataflow structure, changing data sources, or updating transformation logic.
- **Delete**: Delete dataflows that are no longer needed. This helps in managing and cleaning up resources.

The primary online reference documentation for Microsoft Fabric REST APIs can be found in the [Microsoft Fabric REST API documentation](/rest/api/fabric/articles/).

### Dataflow Lifecycle

When working with dataflows, it's important to understand the lifecycle of a dataflow to ensure smooth and efficient data integration processes. The key stages in the dataflow lifecycle include

- **Definition:** This is the initial stage where you create or modify the definition of a dataflow. This involves specifying the data sources, transformations, and definitions.
- **Publish:** After modifying a dataflow's definition, you need to invoke the **Publish** operation. This is a crucial step as it saves the changes made to the dataflow's definition and makes it available for execution.
- **Refresh:** Once the dataflow is published, you can invoke the **Refresh** operation. This triggers the dataflow to run, pulling data from the specified sources, applying the defined transformations, and loading the data into the destination.

## Get started with Public APIs for dataflows

In this section, we cover all the following topics:

- [Obtain an authorization token](#obtain-an-authorization-token)
- [Create a Dataflow](#create-a-dataflow)
- [Create a Dataflow with definition](#create-a-dataflow-with-definition)
- [Get Dataflow](#get-dataflow)
- [Get Dataflow with definition](#get-dataflow-with-definition)
- [Update Dataflow](#update-dataflow)
- [Update Dataflow with definition](#update-dataflow-with-definition)
- [Delete Dataflow](#delete-dataflow)
- [Run on-demand Dataflow job (refresh)](#run-on-demand-dataflow-job-refresh)
- [Run on-demand Dataflow publish job](#run-on-demand-dataflow-publish-job)
- [Get Dataflow job instance](#get-dataflow-job-instance)
- [Cancel Dataflow job instance](#cancel-dataflow-job-instance)

### Obtain an authorization token

You'll need to have the bearer token for all REST API calls, and you can get it using one of these options:

- [MSAL.Net](#msalnet)
- [Fabric Portal](#fabric-portal)

#### MSAL.Net

[Fabric API quickstart - Microsoft Fabric REST APIs](/rest/api/fabric/articles/get-started/fabric-api-quickstart)

Use MSAL.Net to acquire a Microsoft Entra ID token for Fabric service with the following scopes: Workspace.ReadWrite.All, Item.ReadWrite.All. For more information about token acquisition with MSAL.Net to, see [Token Acquisition - Microsoft Authentication Library for .NET](/entra/msal/dotnet/acquiring-tokens/overview).

Paste the Application (client) ID you copied earlier and paste it for ClientId variable.

#### Fabric Portal

Sign in into the Fabric Portal for the Tenant you want to test on, and press F12 to enter the browser's developer mode. In the console there, run:

```http
powerBIAccessToken
```

Copy the token and paste it for the ClientId variable.

### Create a Dataflow

Create a dataflow in a specified workspace.

**Sample Request**

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

**Sample Response**

```http
{
    "id": "\<itemId>",
    "type": "Dataflow",
    "displayName": "My dataflow",
    "description": "My dataflow description",
    "workspaceId": "\<workspaceId>"
}
```

### Create a Dataflow with definition

Create a dataflow with a base64 definition in a specified workspace.

**Sample Mashup Document**

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

**Sample Request**

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

**Sample Response**

```http
{
    "id": "\<itemId>",
    "type": "Dataflow",
    "displayName": "My dataflow",
    "description": "My dataflow description",
    "workspaceId": "\<workspaceId>"
}
```

### Get Dataflow

Returns properties of specified dataflow.

**Sample Request**

```http
URI: GET [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d)

Headers:

{
    "Authorization": "\<bearer-token>"
}
```

**Sample Response**

```http
{
    "id": "\<itemId>",
    "type": "Dataflow",
    "displayName": "My dataflow",
    "description": "My dataflow description",
    "workspaceId": "\<workspaceId>"
}
```

### Get Dataflow with definition

Returns the dataflow item definition.

**Sample Request**

```http
URI: POST [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/getDefinition](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d/getDefinition)

Headers:

{
    "Authorization": "\<bearer-token>"
}
``` 

**Sample Response**

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

**RESPONSE FROM API**

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

### Update Dataflow

Updates the properties of the dataflow.

**Sample Request**

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

**Sample Response**

```http
{ 
    "id": "\<itemId>", 
    "type": "Dataflow", 
    "displayName": "My dataflow updated", 
    "description": "My dataflow description updated", 
    "workspaceId": "\<workspaceId>" 
} 
```

### Update Dataflow with definition

Updates the dataflow item definition.

**Sample Request**

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

**Sample Response**


```http
200 OK 
```

### Delete Dataflow  

Deletes the specified dataflow.

**Sample Request**

```http
URI: DELETE [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d)  

Headers: 

{ 
  "Authorization": "\<bearer-token>" 
} 
```

**Sample Response**

```http
200 OK 
```

### Run on-demand Dataflow job (refresh)

Runs on-demand dataflow job for refresh instance.

**Sample Request**

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

**Sample Response**

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

### Run on-demand Dataflow publish job

Runs on-demand dataflow job for publish instance.

**Sample Request**

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

**Sample Response**

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

### Get Dataflow job instance

Gets singular dataflow's job instance.

**Sample Request**

```http
URI: GET [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances/{jobInstanceId}](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d/jobs/instances/%7bjobInstanceId%7d)  

Headers: 

{ 
  "Authorization": "\<bearer-token>" 
} 
```

**Sample Response**

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

### Cancel Dataflow job instance

Cancel a dataflow's job instance

**Sample Request**

```http
URI: POST [https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/instances/{jobInstanceId}/cancel](https://api.fabric.microsoft.com/v1/workspaces/%7bworkspaceId%7d/items/%7bitemId%7d/jobs/instances/%7bjobInstanceId%7d/cancel)  

Headers: 

{ 
  "Authorization": "\<bearer-token>"
} 
```

**Sample Response**

```http
Location: https://api.fabric.microsoft.com/v1/workspaces/\<worksapceId>/items/\<itemId>/jobs/instances/\<jobInstanceId> 

Retry-After: 60 
```

## Current limitations

- **Service Principal authentication** is not currently supported.
- **"Get Item"** and **"List Item Access Details"** does not return the correct information if you filter on dataflow item type. 
- When you do not specify the type it will return the **Dataflow Gen2 (CI/CD, preview)** - the new Dataflow Gen2 with CI/CD and GIT support.
- **Run APIs** are invokable, but the actual run never succeeds.

## Related content

### Documentation

- [Fabric pipeline public REST API](pipeline-rest-api-capabilities.md)

- [Microsoft Fabric REST API](/rest/api/fabric/articles/)

### Tutorials

- [CRUD Items APIs in Fabric](/rest/api/fabric/core/items)
- [Job Scheduler APIs in Fabric](/rest/api/fabric/core/job-scheduler)
