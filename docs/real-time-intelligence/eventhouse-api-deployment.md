---
title: "Tutorial: Eventhouse Public APIs"
description: Walkthrough of how to utilize the public APIs for Eventhouse and KQL Database
author: Brad Watts
ms.author: bwatts
ms.reviewer: 
ms.topic: concept-article
ms.date: 12/05/2024
ms.custom:
---

Combining the Fabric APIs with the existing KQL APIs allows you to fully automate your deployment of Eventhouse with KQL Databases. With the Fabric APIs I’m able create/update/delete items in Fabric and with the KQL APIs I can access the data plane of a resource and do things like create tables, change policies, etc..

## Example
Let’s first walk through an example to see how the APIs can be used for automation. If
you’re new to KQL in Fabric it will be good to brush up on:

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

Below we’ll utilize the Fabric APIs to create Eventhouse and KQL Database while using the KQL APIs to create a table and apply a few policies.

1. Create an Eventhouse
2. Add a KQL Database to the Eventhouse
3. Get the connection string for the Eventhouse
4. Create a table on the Database and configure it’s Caching and Retention Policy

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
You can utilize the Fabric Create KQL Database API to add a new database to this Eventhouse. You’ll need to have the Item ID from the output of the previous commad.

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


header = {'Content-Type':'application/json','Authorization': f'Bearer {token_string}'}
response = requests.get(url='https://api.fabric.microsoft.com/v1/workspaces', headers=header)
```

Notice that we import the "request" module because this is a KQL API and not a direct Fabric API. This adds a few steps in order to authenticate the response but is still easily accomplished.

### Summary
For this example we utlized the Microsoft Fabric APIs to create an Eventhouse and a KQL DB in an existing Workspace. Then used the KQL APIs to configure the KQL DB.

Next we'll do the same thing exept using just Microsoft Fabric APIs.

## Option: Microsoft Fabric APIs with Definitions

Below we’ll utilize the Fabric APIs with Definitions to accomplish the same steps as above.

1. Create an Eventhouse
2. Add a KQL Database to the Eventhouse
4. Create a table on the Database and configure it’s Caching and Retention Policy

### Step 1: Configure the Notebook
For calling the APIs we will utilize sempy.fabric package in semantic-link. You can use this code to install and import.
```
!pip install semantic-link --q

import sempy.fabric as fabric
import base64
import time
import uuid
import json
```

Next we'll setup our client to make the API calls and set the variables for an existing Workspace Id along with what you want the Eventhouse and KQL DB to be name.
```
client = fabric.FabricRestClient()
workspaceId = 'dee24b18-6c23-4ea3-891d-b974bc89a63d'
EventhouseName = f"{'SampleEventhouse'}_{uuid.uuid4()}"
DBName=f"{'SampleDB'}_{uuid.uuid4()}"
DBCache="P30D"
DBStorage="P365D"
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

### Step 3: Create Base64 Strings for Definitions
The API with definitions require base64 strings. For more information on what the definition should look like click [here](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/definitions/kql-database-definition).

Below we define both the database properties and the database schema. Then encode them as base64 so we can urtilize that in our API calls.

```
dbproperties={
  "databaseType": "ReadWrite",
  "parentEventhouseItemId": f"{EventhouseId}", 
  "oneLakeCachingPeriod": f"{DBCache}", 
  "oneLakeStandardStoragePeriod": f"{DBStorage}" 
}

dbproperties = json.dumps(dbproperties)


dbschema=""".create-merge table T(a:string, b:string)
.alter table T policy retention @'{"SoftDeletePeriod":"10.00:00:00","Recoverability":"Enabled"}'
.alter table T policy caching hot = 3d
"""


dbproperties_string = dbproperties.encode('utf-8')
dbproperties_bytes = base64.b64encode(dbproperties_string)
dbproperties_string = dbproperties_bytes.decode('utf-8')

dbschema_string = dbschema.encode('utf-8')
dbschema_bytes = base64.b64encode(dbschema_string)
dbschema_string = dbschema_bytes.decode('utf-8')
```

### Step 4: Create and Configure the Database
Now that we have the base64 strings we can call the create database api and include the definition to configure the database.

```
url = f"v1/workspaces/{workspaceId}/kqlDatabases"

payload = {
    "displayName": f"{DBName}",
    "definition": {
      "parts": [
        {
          "path": "DatabaseProperties.json",
          "payload": f"{dbproperties_string}",
          "payloadType": "InlineBase64"
        },
        {
          "path": "DatabaseSchema.kql",
          "payload": f"{dbschema_string}",
          "payloadType": "InlineBase64"
        }
      ]
  }
}

print(payload)

response=client.post(url,json=payload)
```

### Step 5: Monitor Operation for Completion
Creating an item with a definition is a long running job. So you need to monitor the operation for completion as it runs async. The below code will check the status and provide the results when the operation is complete.

```
print(f"Create request status code {response.status_code}")
print(response.headers['Location'])
async_result_polling_url = response.headers['Location']

while True:
    async_response = client.get(async_result_polling_url)
    async_status = async_response.json().get('status').lower()
    print("Long running operation status " + async_status)
    if async_status != 'running':
        break
   
    time.sleep(3)

print("Long running operation reached terminal state '" + async_status +"'")

if async_status == 'succeeded':
    print("The operation completed successfully.")
    final_result_url= async_response.headers['Location']
    final_result = client.get(final_result_url)
    print(f"Final result: {final_result.json()}")
elif async_status == 'failed':
    print("The operation failed.")
else:
    print("The operation is in an unexpected state:", status)
```

That's it! This will create the new database, set the database level retention policies, and then run the KQL commands defined in the database schema script.

## Summary
Using the Fabric APIs along with the KQL APIs allow us to interact with both the control plane of Fabric along with the data plane of KQL. With the addition of the APIs with definitions we have multiple options to interact with the data plane and automate your deployments.
- With the KQL API you are able to execute any command that is available on a Fabric KQL Database or Eventhouse.
- With the API with Definition you are able to execute a KQL script to configure your database

## Useful Links
**Fabric API Support for Eventhouse**

|Action	| Document Link |
|  ------------- | ------------- |
Create Eventhouse	Items | [Create Eventhouse – REST API](https://learn.microsoft.com/rest/api/fabric/eventhouse/items/create-eventhouse)
Delete Eventhouse	Items | [Delete Eventhouse – REST API](https://learn.microsoft.com/rest/api/fabric/eventhouse/items/delete-eventhouse) 
Get Eventhouse	Items | [Get Eventhouse – REST API](https://learn.microsoft.com/rest/api/fabric/eventhouse/items/get-eventhouse)
Get Eventhouse Item Definition | [Get Evenhouse Definition - Rest API](https://learn.microsoft.com/en-us/rest/api/fabric/eventhouse/items/get-eventhouse-definition?tabs=HTTP)
Update Eventhouse	Items | [Update Eventhouse – REST API](https://learn.microsoft.com/rest/api/fabric/eventhouse/items/update-eventhouse)
Update Eventhouse Item Definition | [Update Eventhouse Definition - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/eventhouse/items/update-eventhouse-definition?tabs=HTTP)
List Items	Items | [List Eventhouses – REST API](https://learn.microsoft.com/rest/api/fabric/eventhouse/items/list-eventhouses)

**Fabric API Support for KQL DB**

|Action	| Document Link |
|  ------------- | ------------- |
Create KQL Database	Items | [Create KQL Database – REST API](https://learn.microsoft.com/rest/api/fabric/kqldatabase/items/create-kql-database) 
Delete KQL Database	Items | [Delete KQL Database – REST API](https://learn.microsoft.com/rest/api/fabric/kqldatabase/items/delete-kql-database?tabs=HTTP) 
Get KQL Database	Items | [Get KQL Database – REST API](https://learn.microsoft.com/rest/api/fabric/kqldatabase/items/get-kql-database?tabs=HTTP) 
Get KQL Database Item Definition | [Get KQL Database Definition - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqldatabase/items/get-kql-database-definition?tabs=HTTP)
Update KQL Database	Items | [Update KQL Database – REST API](https://learn.microsoft.com/rest/api/fabric/kqldatabase/items/update-kql-database?tabs=HTTP) 
Update KQL Database Item Definition | [Update KQL Database Item Definition](https://learn.microsoft.com/en-us/rest/api/fabric/kqldatabase/items/update-kql-database-definition?tabs=HTTP)
List KQL Databases	Items | [List KQL Databases – REST API](https://learn.microsoft.com/rest/api/fabric/kqldatabase/items/list-kql-databases?tabs=HTTP) 

**Fabric API Support for KQL Queryset**

|Action	| Document Link |
|  ------------- | ------------- |
Create KQL Queryset Items | [Create KQL Queryset - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqlqueryset/items/create-kql-queryset?tabs=HTTP)
Delete KQL Queryset	Items | [Delete KQL Querysets – REST API](https://learn.microsoft.com/rest/api/fabric/kqlqueryset/items/delete-kql-queryset) 
Get KQL Queryset	Items | [Get KQL Queryset – REST API](https://learn.microsoft.com/rest/api/fabric/kqlqueryset/items/get-kql-queryset?tabs=HTTP) 
Get KQL Queryset Item Definition | [Get KQL Queryset Definition - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqlqueryset/items/get-kql-queryset-definition?tabs=HTTP)
List KQL Queryset	Items | [List KQL Querysets – REST API](https://learn.microsoft.com/rest/api/fabric/kqlqueryset/items/list-kql-querysets?tabs=HTTP) 
Update KQL Queryset	Items | [Update KQL Queryset – REST API](https://learn.microsoft.com/rest/api/fabric/kqlqueryset/items/update-kql-queryset?tabs=HTTP) 
Update KQL Queryset Items Definition | [Update KQL Queryset Definition - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqlqueryset/items/update-kql-queryset-definition?tabs=HTTP)

**Fabric API Support for Dashboards**

|Action	| Document Link |
|  ------------- | ------------- |
Create Dashboard Items | [Create Dashboard - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqldashboard/items/create-kql-dashboard?tabs=HTTP)
List Dashboard	Items | [List Dashboards – REST API](https://learn.microsoft.com/en-us/rest/api/fabric/dashboard/items/list-dashboards?tabs=HTTP) 
Delete Dashboard Items | [Delete Dashboard - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqldashboard/items/delete-kql-dashboard?tabs=HTTP)
Get Dashboard Items | [Get Dashboard - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqldashboard/items/get-kql-dashboard?tabs=HTTP)
Update Dashboard Items | [Update Dashboard - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqldashboard/items/update-kql-dashboard?tabs=HTTP)
Update Dashboard Items Definition | [Update Dashboard Item Definition](https://learn.microsoft.com/en-us/rest/api/fabric/kqldashboard/items/update-kql-dashboard-definition?tabs=HTTP)

**KQL API Support for Fabric Eventhouse and Database**

|Action	| Document Link |
|  ------------- | ------------- |
Query/Management |	[Query/management HTTP request – Azure Data Explorer & Real-Time Analytics](https://learn.microsoft.com/azure/data-explorer/kusto/api/rest/request)

**Definition Schema**
|Action	| Document Link |
|  ------------- | ------------- |
Eventhouse Definition | [Eventhouse Definition](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/definitions/eventhouse-definition)
KQL DB Definition | [KQL DB Definition](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/definitions/kql-database-definition)
KQL Queryset Definition | [KQL Queryset Definition](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/definitions/kql-queryset-definition) 
KQL Dashboard Definition | [KQL Dashboard Definition](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/definitions/kql-dashboard-definition)



