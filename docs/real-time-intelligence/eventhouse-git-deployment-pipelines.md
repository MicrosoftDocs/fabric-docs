---
title: Eventhouse and KQL database pipelines and git integration
description: Learn about the Microsoft Fabric Eventhouse and KQL database deployment pipelines and git integration, including what is tracked in a git-connected workspace.
ms.reviewer: bwatts
ms.author: shsagir
author: shsagir
ms.topic: concept-article
ms.custom:
  - build-2024
ms.date: 10/06/2024
ms.search.form: Eventhouse,KQL database, Overview (//TODO Ask Yael about this)
# customer intent: I want to understand the integration of Eventhouse and KQL database with Microsoft Fabric's deployment pipelines and git, and how to configure and manage them in the ALM system.
---

# Eventhouse and KQL database pipelines and git integration (Preview)

RTI Eventhouse and KQL database integrates with the [lifecycle management capabilities](../cicd/cicd-overview.md) in Microsoft Fabric, providing a standardized collaboration between all development team members throughout the product's life.  This functionality is delivered via [git integration](../cicd/git-integration/intro-to-git-integration.md) and [deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md). 

Below we will outline what is configurable via Microsoft Fabric ALM for both Eventhouse and KQL database.

## Platform Integration

This is configuration that is set on the Microsoft Fabric platform level or control plan level.
### Eventhouse
- Name
- Description
### KQL database
- Name
- Description
- Caching Policy
- Retention Policy

## Data Plane Integration

Data plane integration is set via KQL scripts. Not all commands supported in a KQL script are supported in Microsoft Fabric ALM. Below outlines specifically what is supported

### Eventhouse

- [MS] Currently None
{In the future will include cluster level data plane command such as workload}

### KQL database

| Operation | Comamnd |
| ------------- | ------------- |
| Table Creation and Alter | [.create-merge table command](https://learn.microsoft.com/en-us/kusto/management/create-merge-table-command?view=microsoft-fabric) |
| Function creation and Alter | [.create-or-alter function command](https://learn.microsoft.com/en-us/kusto/management/create-alter-function?view=microsoft-fabric) |
| Table Policy Update | [.alter table policy update command](https://learn.microsoft.com/en-us/kusto/management/alter-table-update-policy-command?view=azure-data-explorer&preserve-view=true) |
| Column Encoding Policy | [.alter column encoding command](https://learn.microsoft.com/en-us/kusto/management/alter-encoding-policy?view=microsoft-fabric) |
| Metalized View Create and Alter | [.create-or-alter materialized view.create-or-alter materialized view](https://learn.microsoft.com/en-us/kusto/management/materialized-views/materialized-view-create-or-alter?view=azure-data-explorer&preserve-view=true) |
| Table Ingestion Mapping Create and Update | [.create-or-alter ingestion mapping command](https://learn.microsoft.com/en-us/kusto/management/create-or-alter-ingestion-mapping-command?view=microsoft-fabric) |

## Github File Format

After syncing your Eventhouse and KQL Databases with Github you will see a folder per item in the following format:

- Item Name.Item Type

For example if I have an Eventhouse named Example with a single KQL Database called ExampleDB then you will see two folder after you sync this to Github:

- Example.Eventhouse
- ExampleDB.KQLDatabase

### Eventhouse Files
Within the Eventhouse folder there are two file

#### .platform File
This defines the Fabric item itself with the following schema

```
{
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/gitIntegration/platformProperties/2.0.0/schema.json",
  "metadata": {
    "type": "Eventhouse",
    "displayName": "",
    "description": ""
  },
  "config": {
    "version": "2.0",
    "logicalId": ""
  }
}
```

| Property | Description |
| ------------- | ------------- |
| Type | Item type being defined. This should always be Eventhouse |
| DisplayName | The display of the Eventhouse |
| Description | Short description of the Eventhouse |
| LogicalId | Identifier of the Eventhouse and should not be modified |

#### EventhouseProperties.json
This will allow you to configue controle plane settings on the Eventhouse artificat. This is currently a placeholder and should be empty.

### KQL Database Files
Within the KQL Database folder there are three file

#### .platform File
This defines the Fabric item itself with the following schema

```
{
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/gitIntegration/platformProperties/2.0.0/schema.json",
  "metadata": {
    "type": "KQLDatabase",
    "displayName": "",
    "description": ""
  },
  "config": {
    "version": "2.0",
    "logicalId": ""
  }
}
```

| Property | Description |
| ------------- | ------------- |
| Type | Item type being defined. This should always be KQLDatabase |
| DisplayName | The display of the KQL Database |
| Description | Short description of the KQL Database |
| LogicalId | Identifier of the KQL Database and should not be modified |

#### DatabaseProperties.json
This will allow you to configue control plane settings on the KQL Database artificat. It contains the following schema

```
{
  "databaseType": "ReadWrite",
  "parentEventhouseItemId": "",
  "oneLakeCachingPeriod": "P36500D",
  "oneLakeStandardStoragePeriod": "P36500D"
}
```

| Property | Description |
| ------------- | ------------- |
| Database Type | Currently only supports ReadWrite |
| Parent Eventhouse ID | The logical id of the parent Eventhouse. This should not be modified. |
| OneLake Caching Period | Database level setting for your [caching policy](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/data-policies#caching-policy). |
| OneLake Standard Storage Period | Database level setting for your [retention policy](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/data-policies#data-retention-policy). |

#### DatabaseSchema.kql
This will allow you to configure the data plane the the KQL Database. This file is a [KQL Script](https://learn.microsoft.com/en-us/azure/data-explorer/database-script) that is executed when syncing to your Fabric Workspace.  

This file is automatically generated based on your database. You can make changes to this script as long as you add or modify [supported commands](#kql-database).

Below is an example of a kql script to create a table and the ingestion mapping.

```
// KQL script
// Use management commands in this script to configure your database items, such as tables, functions, materialized views, and more.


.create-merge table SampleTable (UsageDate:datetime, PublisherType:string, ChargeType:string, ServiceName:string, ServiceTier:string, Meter:string, PartNumber:string, CostUSD:real, Cost:real, Currency:string) 
.create-or-alter table SampleTable ingestion csv mapping 'SampleTable_mapping' "[{'Properties':{'Ordinal':'0'},'column':'UsageDate','datatype':''},{'Properties':{'Ordinal':'1'},'column':'PublisherType','datatype':''}]"

```
