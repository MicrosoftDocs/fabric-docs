---
title: REST API Capabilities for Copy job in Fabric Data Factory
description: This article describes the REST API Capabilities for copy job in Fabric Data Factory.
ai-usage: ai-assisted
ms.reviewer: krirukm
ms.topic: how-to
ms.date: 02/13/2026
ms.search.form: copy-job
ms.custom: copy-job
---

# REST API Capabilities for copy job in Fabric Data Factory

Fabric Data Factory provides a robust set of APIs that enable you to automate and manage copy jobs efficiently. These APIs allow for seamless integration with various data sources and services, enabling you to create, get, list, and update copy jobs programmatically. The APIs support a wide range of operations including copy job CRUD (Create, Read, Update, and Delete) making it easier to manage data integration processes end to end.

## End-to-end workflow for creating a Copy job

To create and automate a fully configured copy job using the REST APIs, follow these steps:

1. **Obtain an authorization token** – Acquire a bearer token for authenticating all subsequent API calls.
1. **Create a connection** – Set up the source and destination connections that the copy job uses to access your data stores.
1. **Create a copy job with a definition** – Create the copy job item with a full definition payload that references the connections and specifies the tables or files to copy.
1. **Enable a schedule** – Configure a recurring schedule so the copy job runs automatically.

Each step is described with sample requests and responses in the following sections.

## API use cases for copy job

The APIs for copy job in Fabric Data Factory can be used in various scenarios:

- **Automated deployment**: Automate the deployment of copy jobs across different environments (development, testing, production) using CI/CD practices.
- **Data integration**: Integrate data from multiple sources, such as databases, data lakes, and cloud services, into a unified copy job for processing and analysis.
- **Error handling**: Implement custom error handling and retry mechanisms to ensure copy jobs run smoothly and recover from failures.

## Understanding APIs

To effectively use the APIs for copy job in Fabric Data Factory, it's essential to understand the key concepts and components:

- **Endpoints**: The API endpoints provide access to various copy job operations, such as creating, updating, and deleting copy jobs.
- **Authentication**: Secure access to the APIs using Microsoft Entra token. For more information, see [Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart).
- **Requests and responses**: Understand the structure of API requests and responses, including the required parameters and expected output.
- **Copy job definition**: The copy job definition is a Base64-encoded JSON payload (`copyjob-content.json`) that describes the source, destination, connection references, and table mappings. For the full schema, see [Copy job definition](/rest/api/fabric/articles/item-management/definitions/copyjob-definition).
- **Rate limits**: Be aware of the rate limits imposed on API usage to avoid exceeding the allowed number of requests.

## CRUD support

CRUD stands for Create, Read, Update, and Delete, which are the four basic operations that can be performed on data. In Fabric Data Factory, the CRUD operations are supported through the Fabric API for Data Factory. These APIs allow you to manage copy jobs programmatically. Here are some key points about CRUD support:

- **Create**: Create new copy jobs using the API. This involves defining the copy job structure, specifying data sources, transformations, and destinations.
- **Read**: Retrieve information about existing copy jobs. This includes details about the list of copy jobs in a specified workspace, their configuration, definition, and execution status.
- **Update**: Update existing copy jobs. This might involve modifying the copy job structure, changing data sources and destinations.
- **Delete**: Delete copy jobs that are no longer needed. This helps in managing and cleaning up resources.

The primary online reference documentation for Fabric REST APIs can be found in the [Fabric REST API documentation](/rest/api/fabric/articles/).

## Get started with REST APIs for copy job

The following examples show how to create, update, and manage copy jobs using the Fabric Data Factory APIs.

## Obtain an authorization token

Before you use the other REST APIs, you need to have the bearer token.

> [!IMPORTANT]
> In the following examples, ensure the word 'Bearer ' (with a space) precedes the access token itself. When using an API client and selecting 'Bearer Token' as the authentication type, 'Bearer ' is automatically inserted for you, and only requires the access token to be provided.

### Option 1: Using MSAL.Net

Refer to the [Get Token section of the Fabric API quickstart](/rest/api/fabric/articles/get-started/fabric-api-quickstart#get-token) as an example of how to obtain the MSAL authorization token.

Use MSAL.Net to acquire a Microsoft Entra ID token for Fabric service with the following scopes: *Workspace.ReadWrite.All*, *Item.ReadWrite.All*. For more information about token acquisition with MSAL.Net, see [Token Acquisition - Microsoft Authentication Library for .NET](/entra/msal/dotnet/acquiring-tokens/overview).

Copy the token from the *AccessToken* property and replace the _&lt;access-token&gt;_ placeholder in the following examples with the token.

### Option 2: Using the Fabric portal

Sign in to the Fabric portal for the Tenant you want to test on, and press F12 to enter the browser's developer mode. In the console there, run:

```azurecli
powerBIAccessToken
```

Copy the token and replace the _&lt;access-token&gt;_ placeholder in the following examples with the token.

---

## Create a connection

Before you create a copy job, set up the connections for your source and destination data stores. The copy job definition references these connections by their connection ID.

For the full list of supported parameters, see [Connections - Create Connection](/rest/api/fabric/core/connections/create-connection).

**Sample request:**

**URI**: ```POST https://api.fabric.microsoft.com/v1/connections```

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
  "connectivityType": "ShareableCloud",
  "displayName": "MyCloudSQLConnection",
  "connectionDetails": {
    "type": "SQL",
    "creationMethod": "SQL",
    "parameters": [
      { "dataType": "Text", "name": "server", "value": "contoso.database.windows.net" },
      { "dataType": "Text", "name": "database", "value": "salesdb" }
    ]
  },
  "privacyLevel": "Organizational",
  "credentialDetails": {
    "singleSignOnType": "None",
    "connectionEncryption": "NotEncrypted",
    "skipTestConnection": false,
    "credentials": {
      "credentialType": "Basic",
      "username": "<username>",
      "password": "<password>"
    }
  }
}
```

**Sample response**:

```
{
  "id": "<connectionId>",
  "displayName": "MyCloudSQLConnection",
  "connectivityType": "ShareableCloud",
  "connectionDetails": {
    "type": "SQL",
    "path": "contoso.database.windows.net;salesdb"
  },
  "credentialDetails": {
    "credentialType": "Basic",
    "singleSignOnType": "None",
    "connectionEncryption": "NotEncrypted",
    "skipTestConnection": false
  },
  "privacyLevel": "Organizational"
}
```

Save the **id** value from the response. You use this connection ID when you define the copy job source or destination.

## Create a Copy job

Create a copy job in a specified workspace. This creates an empty copy job without a definition. To create a copy job with source, destination, and table mappings, see [Create a copy job with definition](#create-a-copy-job-with-definition).

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

## Create a copy job with definition

Create a copy job with a Base64-encoded definition in a specified workspace. The definition payload contains a `copyjob-content.json` part that describes the source, destination, connection references, and table mappings.

For the full definition schema, see [Copy job definition](/rest/api/fabric/articles/item-management/definitions/copyjob-definition).

### Understanding the Copy job definition

The `copyjob-content.json` payload (before Base64 encoding) has two main sections:

- **properties**: Configures the job mode, source connection, destination connection, and policy settings.
- **activities**: An array of activity objects, each specifying the source and destination table mappings.

Here's a decoded example of the `copyjob-content.json` content:

```json
{
  "properties": {
    "jobMode": "Batch",
    "source": {
      "type": "AzureSqlDatabase",
      "connectionSettings": {
        "type": "AzureSqlDatabase",
        "typeProperties": {
          "database": "salesdb"
        },
        "externalReferences": {
          "connection": "<source-connectionId>"
        }
      }
    },
    "destination": {
      "type": "Lakehouse",
      "connectionSettings": {
        "type": "Lakehouse",
        "typeProperties": {
          "workspaceId": "<workspace-guid>",
          "artifactId": "<lakehouse-guid>"
        },
        "externalReferences": {
          "connection": "<destination-connectionId>"
        }
      }
    },
    "policy": {
      "timeout": "01:00:00"
    }
  },
  "activities": [
    {
      "properties": {
        "source": {
          "datasetSettings": {
            "schema": "dbo",
            "table": "Customers"
          }
        },
        "destination": {
          "datasetSettings": {
            "schema": "dbo",
            "table": "Customers"
          }
        }
      }
    }
  ]
}
```

The following examples show definitions with more properties configured.

#### Batch copy with column mappings

This example copies data from an Azure SQL Database table to a lakehouse with explicit column-level mappings, write behavior, and type conversion settings:

```json
{
  "properties": {
    "jobMode": "Batch",
    "source": {
      "type": "AzureSqlDatabase",
      "connectionSettings": {
        "type": "AzureSqlDatabase",
        "typeProperties": {
          "database": "salesdb"
        },
        "externalReferences": {
          "connection": "<source-connectionId>"
        }
      }
    },
    "destination": {
      "type": "LakehouseTable",
      "connectionSettings": {
        "type": "Lakehouse",
        "typeProperties": {
          "workspaceId": "<workspace-guid>",
          "artifactId": "<lakehouse-guid>",
          "rootFolder": "Tables"
        }
      }
    },
    "policy": {
      "timeout": "0.12:00:00"
    }
  },
  "activities": [
    {
      "id": "<activity-guid>",
      "properties": {
        "source": {
          "datasetSettings": {
            "schema": "dbo",
            "table": "Customers"
          }
        },
        "destination": {
          "writeBehavior": "Overwrite",
          "datasetSettings": {
            "table": "Customers"
          }
        },
        "translator": {
          "type": "TabularTranslator",
          "mappings": [
            {
              "source": {
                "name": "CustomerID",
                "type": "Int32",
                "physicalType": "int"
              },
              "destination": {
                "name": "CustomerID",
                "type": "Int32",
                "physicalType": "int"
              }
            },
            {
              "source": {
                "name": "CustomerName",
                "type": "String",
                "physicalType": "nvarchar"
              },
              "destination": {
                "name": "CustomerName",
                "type": "String",
                "physicalType": "string"
              }
            },
            {
              "source": {
                "name": "Email",
                "type": "String",
                "physicalType": "nvarchar"
              },
              "destination": {
                "name": "Email",
                "type": "String",
                "physicalType": "string"
              }
            }
          ]
        },
        "typeConversionSettings": {
          "typeConversion": {
            "allowDataTruncation": true,
            "treatBooleanAsNumber": false
          }
        }
      }
    }
  ]
}
```

#### CDC (incremental) copy with column mappings

This example configures CDC (Change Data Capture) in a copy job that incrementally replicates changes from an Azure SQL Database table to a lakehouse, with column-level mappings and type conversion settings:

```json
{
  "properties": {
    "jobMode": "CDC",
    "source": {
      "type": "AzureSqlDatabase",
      "connectionSettings": {
        "type": "AzureSqlDatabase",
        "typeProperties": {
          "database": "inventorydb"
        },
        "externalReferences": {
          "connection": "<source-connectionId>"
        }
      }
    },
    "destination": {
      "type": "LakehouseTable",
      "connectionSettings": {
        "type": "Lakehouse",
        "typeProperties": {
          "workspaceId": "<workspace-guid>",
          "artifactId": "<lakehouse-guid>",
          "rootFolder": "Tables"
        }
      }
    },
    "policy": {
      "timeout": "1.00:00:00"
    }
  },
  "activities": [
    {
      "id": "<activity-guid>",
      "properties": {
        "source": {
          "datasetSettings": {
            "schema": "dbo",
            "table": "Products"
          }
        },
        "destination": {
          "writeBehavior": "Merge",
          "datasetSettings": {
            "table": "Products"
          }
        },
        "translator": {
          "type": "TabularTranslator",
          "mappings": [
            {
              "source": {
                "name": "ProductID",
                "type": "Int32",
                "physicalType": "int"
              },
              "destination": {
                "name": "ProductID",
                "type": "Int32",
                "physicalType": "int"
              }
            },
            {
              "source": {
                "name": "ProductName",
                "type": "String",
                "physicalType": "nvarchar"
              },
              "destination": {
                "name": "ProductName",
                "type": "String",
                "physicalType": "string"
              }
            },
            {
              "source": {
                "name": "Quantity",
                "type": "Int32",
                "physicalType": "int"
              },
              "destination": {
                "name": "Quantity",
                "type": "Int32",
                "physicalType": "int"
              }
            },
            {
              "source": {
                "name": "LastModified",
                "type": "DateTime",
                "physicalType": "datetime2"
              },
              "destination": {
                "name": "LastModified",
                "type": "DateTime",
                "physicalType": "timestamp"
              }
            }
          ]
        },
        "typeConversionSettings": {
          "typeConversion": {
            "allowDataTruncation": true,
            "treatBooleanAsNumber": false
          }
        }
      }
    }
  ]
}
```

> [!NOTE]
> - Replace `<source-connectionId>` and `<destination-connectionId>` with the connection IDs you obtained from the [Create a connection](#create-a-connection) step. Replace `<workspace-guid>`, `<lakehouse-guid>`, and `<activity-guid>` with the appropriate GUIDs for your environment.
> - You can also access the `copyjob-content.json` from the copy job UI by selecting the **View** button in the top panel and then selecting **View JSON code**.


To use any of these definitions in the API, Base64-encode the JSON and place it as the `payload` value for the `copyjob-content.json` part.

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
        "payload": "<base64-encoded-copyjob-content>", 
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

## Get copy job

Returns properties of specified copy job.

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

## Get copy job with definition

Returns the copy job item definition.

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

## List copy jobs

List all copy jobs from the specified workspace.

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

## Update copy job

Updates the properties of the copy job.

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

## Update copy job with definition

Updates the copy job item definition.

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

## Delete copy job

Deletes the specified copy job.

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

## Run on demand copy job

Runs on-demand copy job instance.

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

## Get copy job instance

Gets singular copy job instance.

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

## Cancel copy job instance

Cancel a copy job instance.

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

## Enable a schedule for copy job

After you create a copy job, you can enable a recurring schedule so it runs automatically. Use the Job Scheduler API to create and enable a schedule for the copy job item. The `{itemId}` in the request URI is the ID of the copy job you created earlier. This links the schedule directly to your copy job.

Set `"enabled": true` in the request payload to activate the schedule immediately. For the full list of schedule configuration options, see [Job Scheduler - Create Item Schedule](/rest/api/fabric/core/job-scheduler/create-item-schedule).

**Sample request:**

**URI**: ```POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{itemId}/jobs/{jobType}/schedules```

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
  "enabled": true,
  "configuration": {
    "startDateTime": "2025-07-01T08:00:00",
    "endDateTime": "2025-12-31T23:59:00",
    "localTimeZoneId": "Central Standard Time",
    "type": "Cron",
    "interval": 60
  }
}
```

In this example, the schedule is created and enabled for the copy job identified by `{itemId}`. It runs every 60 minutes between the specified start and end date. Adjust the `interval`, `startDateTime`, `endDateTime`, and `localTimeZoneId` values for your scenario.

> [!NOTE]
> To manage an existing schedule after creation, such as updating or disabling it, use the [Job Scheduler API](/rest/api/fabric/core/job-scheduler). For example, use the [Update Item Schedule](/rest/api/fabric/core/job-scheduler/update-item-schedule) API to change `"enabled"` to `false` to disable the schedule.

**Sample response**:

```
{
  "id": "<scheduleId>",
  "enabled": true,
  "createdDateTime": "2025-07-01T00:00:00Z",
  "configuration": {
    "startDateTime": "2025-07-01T08:00:00",
    "endDateTime": "2025-12-31T23:59:00",
    "localTimeZoneId": "Central Standard Time",
    "type": "Cron",
    "interval": 60
  },
  "owner": {
    "id": "<ownerId>",
    "type": "User"
  }
}
```

## Service Principal Name (SPN) Support

Service Principal Name (SPN) is a security identity feature used by applications or services to access specific resources. In Fabric Data Factory, SPN support is crucial for enabling secure and automated access to data sources. Here are some key points about SPN support:

- **Authentication**: SPNs are used to authenticate applications or services when accessing data sources. This ensures that only authorized entities can access the data.

- **Configuration**: To use SPNs, you need to create a service principal in Azure and grant it the necessary permissions to access the data source. For example, if you're using a data lake, the service principal needs storage blob data reader access.

- **Connection**: When setting up a data connection in Fabric Data Factory, you can choose to authenticate using a service principal. This involves providing the tenant ID, client ID, and client secret of the service principal.
- **Security**: Using SPNs enhances security by avoiding the use of hardcoded credentials in your copy jobs. It also allows for better management of access permissions and auditing of access activities.

For more detailed information on how to set up and use SPNs in Fabric Data Factory, refer to [SPN support in Data Factory](service-principals.md).

## Current limitations

- To perform CRUD operations on a copy job, the workspace must be on a supported Fabric capacity. For more information, see [Fabric license types](../enterprise/licenses.md).

- Non-Power BI Fabric items: The workspace must be on a supported Fabric capacity.

## Related content

- [Fabric Copy job public REST API](/rest/api/fabric/copyjob/items)
- [Copy job definition](/rest/api/fabric/articles/item-management/definitions/copyjob-definition)
- [Create Copy Job API](/rest/api/fabric/copyjob/items/create-copy-job)
- [Connections - Create Connection](/rest/api/fabric/core/connections/create-connection)
- [Job Scheduler - Create Item Schedule](/rest/api/fabric/core/job-scheduler/create-item-schedule)
- [Fabric REST API](/rest/api/fabric/articles/)
- [CRUD Items APIs in Fabric](/rest/api/fabric/core/items)
