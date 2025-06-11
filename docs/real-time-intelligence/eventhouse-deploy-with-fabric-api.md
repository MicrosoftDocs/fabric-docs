---
title: Deploy an eventhouse using Fabric APIs
description: Learn how to use Fabric APIs for Eventhouse and KQL Database to automate deployments, manage data efficiently, and enhance your development workflow.
author: spelluru
ms.author: spelluru
ms.reviewer: bwatts
ms.topic: how-to
ms.date: 03/09/2025
ms.custom:
#customer intent: As a developer, I want to use the Eventhouse and KQL APIs so that I can automate deployments and manage data efficiently.
---
# Deploy an eventhouse using Fabric APIs

You can fully automate the deployment of your Eventhouses with KQL Databases using APIs. Fabric APIs allow you to create, update, and delete items within your workspace. You can manage your Eventhouses and Databases by performing actions such as creating tables and changing policies using one of the following methods:

* **Fabric API with definition**: You can specify a database schema script as part of the [KQL Database definition](/rest/api/fabric/articles/item-management/definitions/kql-database-definition) to configure your database.
* **Kusto API**: You can use the Kusto API to execute [management commands](/kusto/management/?view=microsoft-fabric&preserve-view=true) to configure your database.

In this article, you learn to:

> [!div class="checklist"]
>
> * Set up your environment
> * Create an eventhouse
> * Create a KQL database and schema
> * Monitor the operation for completion

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* Your workspace ID. For more information, see [Identify your workspace ID](../admin/portal-workspace.md#identify-your-workspace-id).

## Choose the right method

When choosing the right method to manage your Eventhouse and KQL Database, consider these points:

* **Fabric API with definition**: Use this method if you want to define the schema of your database as part of the database definition. This method is useful when you want to define the schema of your database using a single consistent API for the entire deployment.
* **Kusto API**: Use this method if you want to execute management commands to configure your database. This method is useful when you want to execute management commands to configure your database.

## Set up your environment

For this article, you use Fabric notebooks to run python [code snippets](../data-engineering/author-execute-notebook.md#code-snippets). Use the *sempy.fabric* package in *semantic-link* Python package to make API calls using your credentials. The API calls and payload are identical, regardless of the tool you use.

Setting up your environment:

1. Navigate to an existing notebook or create a new one.

1. In a code cell, enter code to import the packages:

    ### [Fabric API with definition](#tab/fabric-definition)

    ```python
    !pip install semantic-link --q

    import sempy.fabric as fabric
    import time
    import uuid
    import base64
    import json
    ```

    ### [Kusto API](#tab/kusto-api)

    ```python
    !pip install semantic-link --q

    import sempy.fabric as fabric
    import time
    import uuid
    ```

    ---

1. Set up your client to make the API calls and set a variable for your workspace ID and a UUID to ensure the names are unique:

    ```python
    client = fabric.FabricRestClient()
    workspace_id = 'aaaabbbb-0000-cccc-1111-dddd2222eeee'
    uuid = uuid.uuid4()
    ```

## Create an eventhouse

1. Add a variable for the eventhouse name.

    ```python
    eventhouse_name = f"{'SampleEventhouse'}_{uuid}"
    ```

1. Use the [Fabric Create Eventhouse API](/rest/api/fabric/eventhouse/items/create-eventhouse) to create a new Eventhouse. Set the Eventhouse ID in a variable:

    ```python
    url = f"v1/workspaces/{workspace_id}/eventhouses"
    payload = {
      "displayName": f"{eventhouse_name}"
    }

    response = client.post(url, json=payload)
    eventhouse_id = response.json()['id']
    ```

## Create a KQL database and schema

### [Fabric API with definition](#tab/fabric-definition)

The [Fabric Create KQL Database API](/rest/api/fabric/kqldatabase/items/create-kql-database) uses [item definitions](/rest/api/fabric/articles/item-management/definitions/kql-database-definition) for database properties and schemas that require base64 strings. The properties set the database level retention policies and database schema script contains the commands to run to create database entities.

### Create the database properties definition

Create the base64 string for the database properties. The database properties set the database level retention policies. You use the definition as part of the database creation API call to create a new KQL database.

1. Add variables for configuring the KQL database.

    ```python
    database_name = f"{'SampleDatabase'}_{uuid}"
    database_cache = "3d"
    database_storage = "30d"
    ```

1. Create a base64 string for the database properties:

    ```python
    database_properties = {
      "databaseType": "ReadWrite",
      "parentEventhouseItemId": f"{eventhouse_id}",
      "oneLakeCachingPeriod": f"{database_cache}",
      "oneLakeStandardStoragePeriod": f"{database_storage}"
    }
    database_properties = json.dumps(database_properties)

    database_properties_string = database_properties.encode('utf-8')
    database_properties_bytes = base64.b64encode(database_properties_string)
    database_properties_string = database_properties_bytes.decode('utf-8')
    ```

### Create the database schema definition

Create the base64 string for the database schema. The database schema script contains the commands to run to create database entities. You use the definition as part of the database creation API call to create a new KQL database.

Create a base64 string for the database schema:

```python
database_schema=""".create-merge table T(a:string, b:string)
.alter table T policy retention @'{"SoftDeletePeriod":"10.00:00:00","Recoverability":"Enabled"}'
.alter table T policy caching hot = 3d
"""

database_schema_string = database_schema.encode('utf-8')
database_schema_bytes = base64.b64encode(database_schema_string)
database_schema_string = database_schema_bytes.decode('utf-8')
```

### Run the database creation API

Use the [Fabric Create KQL Database API](/rest/api/fabric/kqldatabase/items/create-kql-database) to create a new KQL database with the retention policies and schema you defined.

```python
url = f"v1/workspaces/{workspace_id}/kqlDatabases"

payload = {
  "displayName": f"{database_name}",
  "definition": {
    "parts": [
      {
        "path": "DatabaseProperties.json",
        "payload": f"{database_properties_string}",
        "payloadType": "InlineBase64"
      },
      {
        "path": "DatabaseSchema.kql",
        "payload": f"{database_schema_string}",
        "payloadType": "InlineBase64"
      }
    ]
  }
}

response = client.post(url, json=payload)
```

## Monitor the operation for completion

Creating an item with a definition is a long-running operation that runs asynchronously. You can monitor the operation using *status_code* and *location* information in the response object from the Create KQL Database API call, as follows:

```python
print(f"Create request status code: {response.status_code}")
print(response.headers['Location'])
async_result_polling_url = response.headers['Location']

while True:
  async_response = client.get(async_result_polling_url)
  async_status = async_response.json().get('status').lower()
  print(f"Long running operation status: {async_status}")
  if async_status != 'running':
    break

  time.sleep(3)

print(f"Long running operation reached terminal state: '{async_status}'")

if async_status == 'succeeded':
  print("The operation completed successfully.")
  final_result_url= async_response.headers['Location']
  final_result = client.get(final_result_url)
  print(f"Final result: {final_result.json()}")
elif async_status == 'failed':
  print("The operation failed.")
else:
  print(f"The operation is in an unexpected state: {status}")
```

### [Kusto API](#tab/kusto-api)

Create a KQL database and schema in the eventhouse you created earlier.

### Create a KQL database

1. Add variables for your configuring you KQL database and database level retention policies.

    ```python
    database_name = f"{'SampleDatabase'}_{uuid}"
    database_cache = "3d"
    database_storage = "30d"
    ```

1. Use the Fabric [Create KQL Database API](/rest/api/fabric/kqldatabase/items/create-kql-database) to add a new database to this eventhouse.

    ```python
    url = f"v1/workspaces/{workspace_id}/kqlDatabases"

    payload = {
      "displayName": f"{database_name}",
      "creationPayload": {
        "databaseType": "ReadWrite",
        "parentEventhouseItemId": f"{eventhouseId}"
      }
    }

    response = client.post(url, json=payload)
    ```

### Create a table

1. Use the [Fabric Get Eventhouse API](/rest/api/fabric/eventhouse/items/get-eventhouse) to get the Query URI for your eventhouse:

    ```python
    url = f"v1/workspaces/{workspace_id}/eventhouses/{eventhouseId}"

    response = client.get(url)

    query_uri = response.json()['properties']['queryServiceUri']
    ```

1. Import the *requests* module to make Kusto API calls as the Fabric API doesn't support Kusto operations directly. Then, use the *mssparkutils* package to get the token string for authentication:

    ```python
    import requests
    token_string = mssparkutils.credentials.getToken(f"{query_uri}")
    ```

1. Use the [Kusto management API](/kusto/api/rest/request?view=microsoft-fabric&preserve-view=true) to create a table, set the cache policy, and set the retention policy:

    ```python
    url = f"{query_uri}/v1/rest/mgmt"

    payload = {
      "csl": '.execute database script with (ContinueOnErrors=true) <| .create-merge table T(a:string, b:string); .alter-merge table T policy retention softdelete = 10d; .alter table T policy caching hot = 3d',
      "db": f"{database_name}"
    }

    header = {'Content-Type':'application/json','Authorization': f'Bearer {token_string}'}

    response = requests.post(url, json=payload, headers=header)
    ```

---

## Related content

* [Eventhouse item operations](/rest/api/fabric/eventhouse/items)
* [KQL Database item operations](/rest/api/fabric/kqldatabase/items)
* [KQL Database definition](/rest/api/fabric/articles/item-management/definitions/kql-database-definition)
* [Kusto API overview](/kusto/api?view=microsoft-fabric&preserve-view=true)
