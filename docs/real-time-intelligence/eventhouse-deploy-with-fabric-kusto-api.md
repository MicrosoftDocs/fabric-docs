---
title: Deploy an eventhouse using APIs
description: Learn how to use APIs for Eventhouse and KQL Database to automate deployments, manage data efficiently, and enhance your development workflow
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


header = {'Content-Type':'application/json','Authorization': f'Bearer {token_string}'}
response = requests.get(url='https://api.fabric.microsoft.com/v1/workspaces', headers=header)
```

Notice that we import the "request" module because this is a KQL API and not a direct Fabric API. This adds a few steps in order to authenticate the response but is still easily accomplished.

### Summary
For this example we utlized the Microsoft Fabric APIs to create an Eventhouse and a KQL DB in an existing Workspace. Then used the KQL APIs to configure the KQL DB.

Next we'll do the same thing exept using just Microsoft Fabric APIs.

## Useful Links
**Fabric API Support for Eventhouse**

|Action  | Document Link |
|  ------------- | ------------- |
Create Eventhouse  Items | [Create Eventhouse – REST API](https://learn.microsoft.com/rest/api/fabric/eventhouse/items/create-eventhouse)
Delete Eventhouse  Items | [Delete Eventhouse – REST API](https://learn.microsoft.com/rest/api/fabric/eventhouse/items/delete-eventhouse) 
Get Eventhouse  Items | [Get Eventhouse – REST API](https://learn.microsoft.com/rest/api/fabric/eventhouse/items/get-eventhouse)
Get Eventhouse Item Definition | [Get Evenhouse Definition - Rest API](https://learn.microsoft.com/en-us/rest/api/fabric/eventhouse/items/get-eventhouse-definition?tabs=HTTP)
Update Eventhouse  Items | [Update Eventhouse – REST API](https://learn.microsoft.com/rest/api/fabric/eventhouse/items/update-eventhouse)
Update Eventhouse Item Definition | [Update Eventhouse Definition - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/eventhouse/items/update-eventhouse-definition?tabs=HTTP)
List Items  Items | [List Eventhouses – REST API](https://learn.microsoft.com/rest/api/fabric/eventhouse/items/list-eventhouses)

**Fabric API Support for KQL DB**

|Action  | Document Link |
|  ------------- | ------------- |
Create KQL Database  Items | [Create KQL Database – REST API](https://learn.microsoft.com/rest/api/fabric/kqldatabase/items/create-kql-database) 
Delete KQL Database  Items | [Delete KQL Database – REST API](https://learn.microsoft.com/rest/api/fabric/kqldatabase/items/delete-kql-database?tabs=HTTP) 
Get KQL Database  Items | [Get KQL Database – REST API](https://learn.microsoft.com/rest/api/fabric/kqldatabase/items/get-kql-database?tabs=HTTP) 
Get KQL Database Item Definition | [Get KQL Database Definition - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqldatabase/items/get-kql-database-definition?tabs=HTTP)
Update KQL Database  Items | [Update KQL Database – REST API](https://learn.microsoft.com/rest/api/fabric/kqldatabase/items/update-kql-database?tabs=HTTP) 
Update KQL Database Item Definition | [Update KQL Database Item Definition](https://learn.microsoft.com/en-us/rest/api/fabric/kqldatabase/items/update-kql-database-definition?tabs=HTTP)
List KQL Databases  Items | [List KQL Databases – REST API](https://learn.microsoft.com/rest/api/fabric/kqldatabase/items/list-kql-databases?tabs=HTTP) 

**Fabric API Support for KQL Queryset**

|Action  | Document Link |
|  ------------- | ------------- |
Create KQL Queryset Items | [Create KQL Queryset - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqlqueryset/items/create-kql-queryset?tabs=HTTP)
Delete KQL Queryset  Items | [Delete KQL Querysets – REST API](https://learn.microsoft.com/rest/api/fabric/kqlqueryset/items/delete-kql-queryset) 
Get KQL Queryset  Items | [Get KQL Queryset – REST API](https://learn.microsoft.com/rest/api/fabric/kqlqueryset/items/get-kql-queryset?tabs=HTTP) 
Get KQL Queryset Item Definition | [Get KQL Queryset Definition - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqlqueryset/items/get-kql-queryset-definition?tabs=HTTP)
List KQL Queryset  Items | [List KQL Querysets – REST API](https://learn.microsoft.com/rest/api/fabric/kqlqueryset/items/list-kql-querysets?tabs=HTTP) 
Update KQL Queryset  Items | [Update KQL Queryset – REST API](https://learn.microsoft.com/rest/api/fabric/kqlqueryset/items/update-kql-queryset?tabs=HTTP) 
Update KQL Queryset Items Definition | [Update KQL Queryset Definition - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqlqueryset/items/update-kql-queryset-definition?tabs=HTTP)

**Fabric API Support for Dashboards**

|Action  | Document Link |
|  ------------- | ------------- |
Create Dashboard Items | [Create Dashboard - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqldashboard/items/create-kql-dashboard?tabs=HTTP)
List Dashboard  Items | [List Dashboards – REST API](https://learn.microsoft.com/en-us/rest/api/fabric/dashboard/items/list-dashboards?tabs=HTTP) 
Delete Dashboard Items | [Delete Dashboard - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqldashboard/items/delete-kql-dashboard?tabs=HTTP)
Get Dashboard Items | [Get Dashboard - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqldashboard/items/get-kql-dashboard?tabs=HTTP)
Update Dashboard Items | [Update Dashboard - REST API](https://learn.microsoft.com/en-us/rest/api/fabric/kqldashboard/items/update-kql-dashboard?tabs=HTTP)
Update Dashboard Items Definition | [Update Dashboard Item Definition](https://learn.microsoft.com/en-us/rest/api/fabric/kqldashboard/items/update-kql-dashboard-definition?tabs=HTTP)

**KQL API Support for Fabric Eventhouse and Database**

|Action  | Document Link |
|  ------------- | ------------- |
Query/Management |  [Query/management HTTP request – Azure Data Explorer & Real-Time Analytics](https://learn.microsoft.com/azure/data-explorer/kusto/api/rest/request)

**Definition Schema**
|Action  | Document Link |
|  ------------- | ------------- |
Eventhouse Definition | [Eventhouse Definition](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/definitions/eventhouse-definition)
KQL DB Definition | [KQL DB Definition](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/definitions/kql-database-definition)
KQL Queryset Definition | [KQL Queryset Definition](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/definitions/kql-queryset-definition) 
KQL Dashboard Definition | [KQL Dashboard Definition](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/definitions/kql-dashboard-definition)



