---
title: Deploy an eventhouse using APIs
description: Learn how to use APIs for Eventhouse and KQL Database to automate deployments, manage data efficiently, and enhance your development workflow
author: shsagir
ms.author: shsagir
ms.reviewer: bwatts
ms.topic: tutorial
ms.date: 01/28/2025
ms.custom:
#customer intent: As a developer, I want to use the Eventhouse and KQL APIs so that I can automate deployments and manage data efficiently.
---
# Tutorial: Deploy an eventhouse using Fabric APIs

This article teaches you how to fully automate the deployment of an eventhouses with KQL databases by using Fabric APIs with a database schema script. Fabric APIs allow you to create, update, and delete items within Fabric. Meanwhile, KQL APIs enable you to manage your eventhouses and databases by performing actions such as creating tables, changing policies, and running queries on your data.

In this tutorial, you:

> [!div class="checklist"]
>
> * Set up your environment
> * Create an eventhouse
> * Create base64 strings for definitions
> * Create and configure the KQL database
> * Monitor the operation for completion

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* Your workspace ID. For more information, see [Identify your workspace ID](../admin/portal-workspace.md#identify-your-workspace-id).

## Set up your environment

For this tutorial, you use Fabric notbooks to run python [code snippets](../data-engineering/author-execute-notebook.md#code-snippets). You use the *sempy.fabric* package in *semantic-link* python package to make the API calls using your credentials. The API calls and payload are identical, regardless of the tool you use.

Start by setting up your environment:

1. Navigate to an existing notebook or create a new one.
1. In a code cell, enter code to import the packages:

    ```python
    !pip install semantic-link --q

    import sempy.fabric as fabric
    import base64
    import time
    import uuid
    import json
    ```

1. Set up your client to make the API calls and set a variable for your workspace ID and a UUID to ensure the names are unique:

    ```python
    client = fabric.FabricRestClient()
    workspace_id = 'aaaabbbb-0000-cccc-1111-dddd2222eeee'
    uuid = uuid.uuid4()
    ```

### Create an eventhouse

1. Add a variable for your eventhouse name.

    ```python
    eventhouse_name = f"{'SampleEventhouse'}_{uuid}"
    ```

1. Use the [Fabric Create Eventhouse API](/rest/api/fabric/eventhouse/items/create-eventhouse) to create a new eventhouse. Set the eventhouse ID in a variable:

    ```python
    url = f"v1/workspaces/{workspace_id}/eventhouses"
    payload = {
      "displayName": f"{eventhouse_name}"
    }

    response = client.post(url, json=payload)
    eventhouse_id = response.json()['id']
    ```

<!-- **Output**

```
{
  "id": "<Item_Id>",
  "type": "Eventhouse",
  "displayName": "SampleEventhouse",
  "description": "",
  "workspace_id": "<Workspace_ID>"
}
``` -->

### Create Base64 strings for definitions

The [Fabric Create KQL Database API](/rest/api/fabric/kqldatabase/items/create-kql-database) uses [item definitions](/rest/api/fabric/articles/item-management/definitions/kql-database-definition) for database properties and schemas that require base64 strings. The properties set the database level retention policies and database schema script contains the commands to run to create database entities.

1. Add variables for your configuring you KQL database.

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

1. Create a base64 string for the database schema:

    ```python
    database_schema=""".create-merge table T(a:string, b:string)
    .alter table T policy retention @'{"SoftDeletePeriod":"10.00:00:00","Recoverability":"Enabled"}'
    .alter table T policy caching hot = 3d
    """

    database_schema_string = database_schema.encode('utf-8')
    database_schema_bytes = base64.b64encode(database_schema_string)
    database_schema_string = database_schema_bytes.decode('utf-8')
    ```

### Create and configure the KQL database

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

### Monitor the operation for completion

Creating an item with a definition is a long-running operation that runs asynchronously. You can monitor the operation using status_code and location information in the response object from the create database API call, as follows:

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

## Clean up resources

Once you finish the tutorial, you might want to delete all resources you created. You can delete the eventhouse and database, or you can delete the entire workspace.

1. Browse to the workspace in which you created the tutorial.
1. From the menu ribbon, select **Workspace settings**.
1. In the **General** settings pane, scroll down to the **Delete workspace** section.
1. Select **Remove this workspace**.
1. On the warning dialog that open, select **Delete**. Once a workspace is deleted, it can't be recovered.

## Related content

* [Deploy an eventhouse using APIs overview](eventhouse-deploy-with-api-overview.md)
* [Tutorial: Deploy an eventhouse using Fabric and Kusto APIs](eventhouse-deploy-with-fabric-kusto-api.md)
* [Eventhouse item operations](/rest/api/fabric/eventhouse/items)
* [KQL Database item operations](/rest/api/fabric/kqldatabase/items)
* [KQL Database definition](/rest/api/fabric/articles/item-management/definitions/kql-database-definition)
