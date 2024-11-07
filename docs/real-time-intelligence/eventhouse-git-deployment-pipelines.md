---
title: Eventhouse and KQL database deployment pipelines and git integration
description: Learn about the Microsoft Fabric Eventhouse and KQL database deployment pipelines and git integration, including what is tracked in a git-connected workspace.
ms.reviewer: bwatts
ms.author: shsagir
author: shsagir
ms.topic: concept-article
ms.custom:
  - build-2024
ms.date: 11/19/2024
ms.subservice: rti-kusto
ms.search.form: Eventhouse,KQL database, Overview (//TODO Ask Yael about this)
# customer intent: I want to understand the integration of Eventhouse and KQL database with Microsoft Fabric's deployment pipelines and git, and how to configure and manage them in the ALM system.
---

# Eventhouse and KQL database deployment pipelines and git integration (Preview)

Eventhouses and KQL databases integrate with the [lifecycle management capabilities](../cicd/cicd-overview.md) in Microsoft Fabric, providing a standardized collaboration between all development team members throughout the product's life.  This functionality is delivered via [git integration](../cicd/git-integration/intro-to-git-integration.md) and [deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md).

In this article, you learn about the configuration options available through Microsoft Fabric's lifecycle management for eventhouses and KQL databases.

## Eventhouse and KQL database git integration

The eventhouse and KQL database are items that contain both metadata and data that are referenced in multiple objects in the workspace. Eventhouse and KQL database contain tables, functions, and materialized views. From a development workflow perspective, the following dependent objects might reference an eventhouse or KQL database:

- [Spark Job Definitions](../data-engineering/create-spark-job-definition.md)
- [Notebooks](../data-engineering/how-to-use-notebook.md)
- Semantic models and Power BI

The git integration applies at the platform and data level for eventhouses and KQL databases.

### Platform-level integration

The following eventhouse and KQL database information is serialized and tracked in a git-connected workspace:

- **Eventhouse**
    - Name
    - Description
    - Logical guid

- **KQL database**
    - Name
    - Description
    - Caching Policy
    - Retention Policy
    - Logical guid

### Data-level integration

Data-level integration is achieved through the use of a KQL script to create or modify database objects schemas, properties, and policies. However, it's important to note that not all commands supported in a KQL script are compatible with Microsoft Fabric ALM.

- **KQL database**

    The following database objects are supported in the KQL script:

    - Table
    - Function
    - Table policy update
    - Column encoding policy
    - Materialized view
    - Table ingestion mapping

    For information about supported commands, see the **DatabaseSchema.kql** file description under [KQL database files](#kql-database-files).

## Git integration representation

Each eventhouse and KQL Database items synced with git appear in its own folder named using the following format: *`<ItemName>`*.*`<ItemType>`* where *`<ItemName>`* is the name of the item and *`<ItemType>`* is the type of the item. For example, for an eventhouse named **Example** that has a single KQL database named **ExampleDB**, the following folders appear in the git repository:

- *Example*.*Eventhouse*
- *ExampleDB*.*KQLDatabase*

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

The following files are contained in an KQL database folder:

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

    The file uses the following schema to configure platform-level settings for the KQL database item:

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
    | *parentEventhouseItemId* | The logical ID of the parent eventhouse. This shouldn't be modified. |
    | *oneLakeCachingPeriod* | Database level setting for the [caching policy](data-policies.md#caching-policy). |
    | *oneLakeStandardStoragePeriod* | Database level setting for the [retention policy](data-policies.md#data-retention-policy). |

- **DatabaseSchema.kql**

    The file is a [KQL script](/azure/data-explorer/database-script) that configures the data-level settings for the KQL database. It's automatically generated when the KQL database is synced to git. The file is executed when syncing to your Fabric Workspace.

    You can make changes to this script by adding or modifying the following supported commands:

    | Database object | Supported commands |
    |--|--|
    | Table | [Create or merge](/kusto/management/create-merge-table-command?view=microsoft-fabric&preserve-view=true) |
    | Function | [Create or alter](/kusto/management/create-alter-function?view=microsoft-fabric&preserve-view=true) |
    | Table policy update | [Alter](/kusto/management/alter-table-update-policy-command?view=microsoft-fabric&preserve-view=true) |
    | Column encoding policy | [Alter](/kusto/management/alter-encoding-policy?view=microsoft-fabric&preserve-view=true) |
    | Materialized view | [Create or alter](/kusto/management/materialized-views/materialized-view-create-or-alter?view=microsoft-fabric&preserve-view=true) |
    | Table ingestion mapping | [Create or alter](/kusto/management/create-or-alter-ingestion-mapping-command?view=microsoft-fabric&preserve-view=true) |

    The following is an example of a kql script to create a table and its ingestion mapping.

    ```kusto
    // KQL script
    // Use management commands in this script to configure your database items, such as tables, functions, materialized views, and more.

    .create-merge table SampleTable (UsageDate:datetime, PublisherType:string, ChargeType:string, ServiceName:string, ServiceTier:string, Meter:string, PartNumber:string, CostUSD:real, Cost:real, Currency:string)
    .create-or-alter table SampleTable ingestion csv mapping 'SampleTable_mapping' "[{'Properties':{'Ordinal':'0'},'column':'UsageDate','datatype':''},{'Properties':{'Ordinal':'1'},'column':'PublisherType','datatype':''}]"
    ```

## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
