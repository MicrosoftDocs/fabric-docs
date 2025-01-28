---
title: Deploy an eventhouse using Fabric and Kusto APIs
description: Learn how to use Fabric and Kusto APIs for Eventhouse and KQL Database to automate deployments, manage data efficiently, and enhance your development workflow
author: shsagir
ms.author: shsagir
ms.reviewer: bwatts
ms.topic: concept-article
ms.date: 12/05/2024
ms.custom:
#customer intent: As a developer, I want to use the Eventhouse and KQL APIs so that I can automate deployments and manage data efficiently.
---
# Tutorial: Deploy an eventhouse using Fabric and Kusto APIs

You can fully automate the deployment of your eventhouses with KQL databases by combining Fabric APIs and Kusto APIs. Fabric APIs allow you to create, update, and delete items within Fabric. Meanwhile, KQL APIs enable you to manage your eventhouses and databases by performing actions such as creating tables, changing policies, and running queries on your data.

## Example

Let's first walk through an example to see how the APIs can be used for automation. If
you're new to KQL in Fabric it will be good to brush up on:

- Overview
- Eventhouse Overview
- KQL Database Overview
- Creating a table
- Caching Policy
- Retention Policy

## Environment
For this walkthrough we will utilize a Microsoft Fabric Notebook, using python to make all of the API calls. Being we are already in Micrsoft Fabric and logged in we do not have to authenticate but the API calls and payload will be identical no matter what tool you use.ore your data. 

We will do two different options. One option using a combination of Fabric APIs along with KQL APIs and another option using just eh Fabric APIs with definitions.

## Option: Microsoft Fabric APIs + KQL APIs

Below we'll utilize the Fabric APIs to create Eventhouse and KQL Database while using the KQL APIs to create a table and apply a few policies.

1. Create an Eventhouse
2. Add a KQL Database to the Eventhouse
3. Get the connection string for the Eventhouse
4. Create a table on the Database and configure it's Caching and Retention Policy

### Step 1: Configure the Notebook
For calling the APIs we will utilize sempy.fabric package in semantic-link. You can use this code to install and import.
```
!pip install semantic-link --q
import sempy.fabric as fabric
import time
import uuid
```

Next we'll setup our client to make the API calls and set the variables for an existing Workspace Id along with what you want the Eventhouse and KQL DB to be name.
```
client = fabric.FabricRestClient()
workspaceId = '<workspaceId>'
EventhouseName = f"{'SampleEventhouse'}_{uuid.uuid4()}"
DBName=f"{'SampleDB'}_{uuid.uuid4()}"
```

### Step 2: Create the Eventhouse
You can utilize the Fabric Create Eventhouse API to create a new Eventhouse. We need the Eventhouse ID for the next step so we'll set it in a variable.

```
url = f"v1/workspaces/{workspaceId}/eventhouses"

payload = {
    "displayName": f"{EventhouseName}"
}

response=client.post(url,json=payload)

EventhouseId=response.json()['id']
```
**Output**
```
{
  "id": "<Item_Id>",
  "type": "Eventhouse",
  "displayName": "SampleEventhouse",
  "description": "",
  "workspaceId": "<Workspace_ID>"
}
```
### Step 2: Create a KQL Database on this Eventhouse
You can utilize the Fabric Create KQL Database API to add a new database to this Eventhouse. You'll need to have the Item ID from the output of the previous commad.

```
url = f"v1/workspaces/{workspaceId}/kqlDatabases"

payload = {
    "displayName": f"{DBName}",
    "creationPayload": {
        "databaseType": "ReadWrite",
        "parentEventhouseItemId": f"{EventhouseId}"
    }
}

response=client.post(url,json=payload)
```
### Step 3: Get the Connection String for Eventhouse
In order to utilize the KQL APIs we need to get the Query URI for our Eventhouse. We can get this using the Fabric Get Eventhouse API.

```
url = f"v1/workspaces/{workspaceId}/eventhouses/{EventhouseId}"

response=client.get(url)

queryURI=response.json()['properties']['queryServiceUri']
```

### Step 4: Creating and Table and Configuring Policies
For this step you will utilize the KQL APIs. We would like to do three things

- Create a table
- Set the cache policy
- Set the retention policy
- We will utilize a KQL Database Script executed by a KQL Command.

```
import requests
token_string = mssparkutils.credentials.getToken(f"{queryURI}")
url = f"{queryURI}/v1/rest/mgmt"

payload = {
    "csl": '.execute database script with (ContinueOnErrors=true) <| .create-merge table T(a:string, b:string); .alter-merge table T policy retention softdelete = 10d; .alter table T policy caching hot = 3d',
    "db": f"{DBName}"
}

header = {'Content-Type':'application/json','Authorization': f'Bearer {token_string}'}

response=requests.post(url,json=payload,header=header)
```

Notice that we import the "request" module because this is a KQL API and not a direct Fabric API. This adds a few steps in order to authenticate the response but is still easily accomplished.

## Clean up resources

Once you finish the tutorial, you might want to delete all resources you created. You can delete the eventhouse and database, or you can delete the entire workspace.

1. Browse to the workspace in which you created the tutorial.
1. From the menu ribbon, select **Workspace settings**.
1. In the **General** settings pane, scroll down to the **Delete workspace** section.
1. Select **Remove this workspace**.
1. On the warning dialog that open, select **Delete**. Once a workspace is deleted, it can't be recovered.

## Related content

* [Deploy an eventhouse using APIs overview](eventhouse-deploy-with-api-overview.md)
* [Tutorial: Deploy an eventhouse using Fabric APIs with schema script](eventhouse-deploy-with-fabric-api.md)
* [Eventhouse item operations](/rest/api/fabric/eventhouse/items)
* [KQL Database item operations](/rest/api/fabric/kqldatabase/items)
* [KQL Database definition](/rest/api/fabric/articles/item-management/definitions/kql-database-definition)
