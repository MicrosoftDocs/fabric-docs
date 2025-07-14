---
title: Eventhouse and KQL database - Git integration
description: Learn about the Git integration for Eventhouse and KQL Database. 
ms.reviewer: bwatts
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 05/29/2025
ms.search.form: Eventhouse, KQL database, Overview
# customer intent: I want to understand the integration of Eventhouse and KQL database with Microsoft Fabric's deployment pipelines and git, and how to configure and manage them in the ALM system.
---

# Eventhouse and KQL database - Git integration
The following article details the file structure for Eventhouse and KQL Database once they're synced to a GitHub or Azure Devops Repository.

## Folder structure
Once a workspace is synced to a repo, you see a top level folder for the workspace and a subfolder for each item that was synced. Each subfolder is formatted with **Item Name**.**Item Type**

Within the folder for both Eventhouse and KQL Database, you see the following files:
- Platform: Defines fabric platform values such as Display Name and Description.
- Properties: Defines item specific values.

Additionally for the KQL Database, you see a schema file that is used to deploy the items inside a KQL Database.

Here's an example of what the folder structure looks like:

**Repo**
* Workspace A
  * Item_A.Eventhouse
    * .platform
    * EventhouseProperties.json
  * Item_B.KQLDatabase
    * .platform
    * DatabaseProperties.json
    * DatabaseSchema.kql
* Workspace B
  * Item_C.Eventhouse
    * .platform
    * EventhouseProperties.json
  * Item_D.KQLDatabase 
    * .platform
    * DatabaseProperties.json
    * DatabaseSchema.kql


### Eventhouse files

The following files are contained in an eventhouse folder:

- **.platform**

    The file uses the following schema to define an eventhouse:

    ```json
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

- **EventhouseProperties.json**

    The file allows you to configure platform-level settings for the eventhouse item.

### KQL database files

The following files are contained in a KQL database folder:

- **.platform**

    The file uses the following schema to define a KQL database:

    ```json
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

- **DatabaseProperties.json**

    The file uses the following schema to configure platform-level settings for the Kusto Query Language (KQL) database item:

    ```json
    {
      "databaseType": "ReadWrite",
      "parentEventhouseItemId": "",
      "oneLakeCachingPeriod": "P36500D",
      "oneLakeStandardStoragePeriod": "P36500D"
    }
    ```

    The following table describes the properties in the `DatabaseProperties.json` file:

    | Property | Description |
    | ------------- | ------------- |
    | *databaseType* | Valid values: ReadWrite |
    | *parentEventhouseItemId* | The logical ID of the parent eventhouse. This value shouldn't be modified. |
    | *oneLakeCachingPeriod* | Database level setting for the [caching policy](data-policies.md#caching-policy). |
    | *oneLakeStandardStoragePeriod* | Database level setting for the [retention policy](data-policies.md#data-retention-policy). |

- **DatabaseSchema.kql**

    The file is a [KQL script](/azure/data-explorer/database-script) that configures the data-level settings for the KQL database. It's automatically generated when the KQL database is synchronized to git. The file is executed when syncing to your Fabric Workspace.

    You can make changes to this script by adding or modifying the following supported commands:

    | Database object | Supported commands |
    |--|--|
    | Table | [Create or merge](/kusto/management/create-merge-table-command?view=microsoft-fabric&preserve-view=true) |
    | Function | [Create or alter](/kusto/management/create-alter-function?view=microsoft-fabric&preserve-view=true) |
    | Table policy update | [Alter](/kusto/management/alter-table-update-policy-command?view=microsoft-fabric&preserve-view=true) |
    | Column encoding policy | [Alter](/kusto/management/alter-encoding-policy?view=microsoft-fabric&preserve-view=true) |
    | Materialized view | [Create or alter](/kusto/management/materialized-views/materialized-view-create-or-alter?view=microsoft-fabric&preserve-view=true) |
    | Table ingestion mapping | [Create or alter](/kusto/management/create-or-alter-ingestion-mapping-command?view=microsoft-fabric&preserve-view=true) |

    The following example is a KQL script to create a table and its ingestion mapping.

    ```kusto
    // KQL script
    // Use management commands in this script to configure your database items, such as tables, functions, materialized views, and more.

    .create-merge table SampleTable (UsageDate:datetime, PublisherType:string, ChargeType:string, ServiceName:string, ServiceTier:string, Meter:string, PartNumber:string, CostUSD:real, Cost:real, Currency:string)
    .create-or-alter table SampleTable ingestion csv mapping 'SampleTable_mapping' "[{'Properties':{'Ordinal':'0'},'column':'UsageDate','datatype':''},{'Properties':{'Ordinal':'1'},'column':'PublisherType','datatype':''}]"
    ```
## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)