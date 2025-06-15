---
title: Git integration and deployment pipelines
description: Learn about the Microsoft Fabric Real-Time Intelligence git integration and deployment pipelines, including what is tracked in a git-connected workspace.
ms.reviewer: bwatts
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 02/23/2025
ms.search.form: Eventhouse, KQL database, Overview
# customer intent: I want to understand the integration of Eventhouse and KQL database with Microsoft Fabric's deployment pipelines and git, and how to configure and manage them in the ALM system.
---

# Git integration and deployment pipelines

Real-Time Intelligence integrates with the [lifecycle management capabilities](../cicd/cicd-overview.md) in Microsoft Fabric, providing standardized collaboration between all development team members throughout the product's life. This functionality is delivered via [git integration](../cicd/git-integration/intro-to-git-integration.md) and [deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md).

In this article, you learn about the configuration options available through Microsoft Fabric's lifecycle management for Real-Time Intelligence.

## Git integration

Real-Time Intelligence supports git integration for eventhouses, KQL databases, KQL querysets, and Real-Time dashboards. The git integration allows you to track changes to these items in a git-connected workspace. The integration provides a way to manage the lifecycle of these items, including versioning, branching, and merging.

All items include metadata, and eventhouses and KQL databases also contain data referenced by multiple objects in the workspace.

The following metadata elements are included within Real-Time Intelligence items:

- **Eventhouse and KQL database items**: tables, functions, and materialized views
- **KQL querysets**: tabs and data sources
- **Real-Time dashboards**: data sources, parameters, base queries, and tiles

From a development workflow perspective, the following dependent objects might reference an eventhouse or KQL database:

- [Spark Job Definitions](../data-engineering/create-spark-job-definition.md)
- [Notebooks](../data-engineering/how-to-use-notebook.md)
- Semantic models and Power BI

The git integration applies at the platform for all items and at the data level for eventhouses and KQL databases.

### Platform-level integration

The following information is serialized and tracked in a git-connected workspace:

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

- **KQL queryset**
    - Name
    - Version
    - Tabs
    - Data sources

- **Real Time Dashboard**
    - ID
    - eTag
    - Schema_version
    - Title
    - Tiles []
    - Base queries []
    - Parameters[]
    - Data sources[]

### Data-level integration

Data-level integration is achieved by using a KQL script to create or modify database objects schemas, properties, and policies. However, it's important to note that not all commands supported in a KQL script are compatible with Microsoft Fabric ALM.

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

### KQL queryset files

The file uses the following schema to define a KQL queryset:

```json
{
  "queryset": {
    "version": "1.0.0",
    "tabs": [
      {
        "id": "",
        "title": "",
        "content": "",
        "dataSourceId": "Guid1"
      }
    ],
    "dataSources": [
      {
        "id": "",
        "clusterUri": "",
        "type": "AzureDataExplorer",
        "databaseName": ""
      },
      {
        "id": "Guid1",
        "clusterUri": "",
        "type": "Fabric",
        "databaseItemId": "",
        "databaseItemName": ""
      }
    ]
  }
}
```

### Real-Time Dashboard files

The file uses the following schema to define a Real-Time Dashboard:

```json
{
  "$schema": "",
  "id": "",
  "eTag": "\"\"",
  "schema_version": "",
  "title": "",
  "tiles": [
    {
      "id": "",
      "title": "",
      "visualType": "",
      "pageId": "",
      "layout": {
        "x": ,
        "y": ,
        "width": ,
        "height":
      },
      "queryRef": {
        "kind": "",
        "queryId": ""
      },
      "visualOptions": {
        "multipleYAxes": {
          "base": {
            "id": "",
            "label": "",
            "columns": [],
            "yAxisMaximumValue": ,
            "yAxisMinimumValue": ,
            "yAxisScale": "",
            "horizontalLines": []
          },
          "additional": [],
          "showMultiplePanels":
        },
        "hideLegend": ,
        "legendLocation": "",
        "xColumnTitle": "",
        "xColumn": ,
        "yColumns": ,
        "seriesColumns": ,
        "xAxisScale": "",
        "verticalLine": "",
        "crossFilterDisabled": ,
        "drillthroughDisabled": ,
        "crossFilter": [
          {
            "interaction": "",
            "property": "",
            "parameterId": "",
            "disabled":
          }
        ],
        "drillthrough": [],
        "selectedDataOnLoad": {
          "all": ,
          "limit":
        },
        "dataPointsTooltip": {
          "all": ,
          "limit":
        }
      }
    }
  ],
  "baseQueries": [],
  "parameters": [
    {
      "kind": "",
      "id": "",
      "displayName": "",
      "description": "",
      "variableName": "",
      "selectionType": "",
      "includeAllOption": ,
      "defaultValue": {
        "kind": ""
      },
      "dataSource": {
        "kind": "",
        "columns": {
          "value": ""
        },
        "queryRef": {
          "kind": "",
          "queryId": ""
        }
      },
      "showOnPages": {
        "kind": ""
      },
      "allIsNull":
    },
  ],
  "dataSources": [
    {
      "id": "",
      "name": "",
      "clusterUri": "",
      "database": "",
      "kind": "",
      "scopeId": ""
    }
  ],
  "pages": [
    {
      "name": "",
      "id": ""
    }
  ],
  "queries": [
    {
      "dataSource": {
        "kind": "",
        "dataSourceId": ""
      },
      "text": "",
      "id": "",
      "usedVariables": [
        "",
        ""
      ]
    }
  ]
}
```

## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
