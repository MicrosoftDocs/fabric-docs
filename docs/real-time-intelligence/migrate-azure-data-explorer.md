---
title: Migrate Azure Data Explorer Workloads to Fabric
description: Migrate Azure Data Explorer workloads to Fabric and unlock advanced analytics features. Learn key steps and best practices for a smooth transition.
#customer intent: As a data engineer, I want to migrate my Azure Data Explorer workloads to Fabric so that I can use advanced analytics features.
author: spelluru
ms.author: spelluru
ms.reviewer: sharmaanshul
ms.topic: how-to
ms.date: 08/17/2025
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:08/17/2025
  - ai-gen-description
---

# Migrate from Azure Data Explorer to Fabric overview

Migrating your Azure Data Explorer workloads to Microsoft Fabric enables you to leverage advanced analytics, real-time data processing, and seamless integration with Fabric’s powerful features. This guide walks you through the key steps and best practices for a smooth transition. 

> [!NOTE]
> For information on comparison between Fabric Real-Time intelligence and comparable Azure solutions, see [What is the difference between Real-Time Intelligence and comparable Azure solutions?](real-time-intelligence-compare.md). 

## Create a database shortcut

While Azure Data Explorer provides data in databases that reside in clusters, Fabric offers data in [KQL databases](create-database.md). KQL databases run on the same technology as, and are compliant with, Azure Data Explorer. As such, all current applications, SDK libraries, integrations, and tools that work with Azure Data Explorer continue to work with Fabric KQL databases. There's also a broad set of capabilities to support mixed environments and migrations, as follows:

You can create a [database shortcut](database-shortcut.md) to an Azure Data Explorer database, and query without migrating data to Fabric. A database shortcut in Real-Time intelligence is an embedded reference within a KQL database to a source database in Azure Data Explorer. The behavior exhibited by the database shortcut is similar to that of a [follower database](/azure/data-explorer/follower?tabs=csharp).

Follow steps from the article: [Create a database shortcut](database-shortcut.md) to create a shortcut to an Azure Data Explorer database. 

## Add an ADX source to a KQL Queryset


## Create a KQL database 
Create a new KQL DB with the same schema using the SyncKusto tool or the database script options. For more information, see [Sync Kusto](/azure/data-explorer/sync-kusto).

## Union old and new data until Azure Data Explorer data expires
Create a [view](/kusto/query/schema-entities/views?view=microsoft-fabric&preserve-view=true) using the Union operator that joins the old and potentially new data. 

- Table from ADX and table from eventhouse
- View on eventhouse Union of ADX cluster
- Until the ADX data expires
- After that, you just use the new table in KQL database. 

A materialized view in Fabric is a persisted result of a query over a source table (including those accessed via database shortcuts). It supports aggregation and summarization, and is especially useful for performance optimization and real-time analytics.
🔧 How to Create a Materialized View on ADX Data via Shortcut


### Ensure prerequisites:

- A Fabric workspace with Real-Time Intelligence enabled.
- A database shortcut to the ADX database.

### Create view
1. Go to your KQL database in Fabric.
1. Select + New > Materialized View.
1. In the query editor, use KQL to define your view:

    ```kusto    
    .create materialized-view MyView on table MyADXTable {
        MyADXTable
        | summarize count() by Category
    }
    ```
1. Select Run to create the view.

Yes, you can create a materialized view in Microsoft Fabric that unions data from an Azure Data Explorer (ADX) table (via a database shortcut) and a native KQL table in your Fabric workspace.


```kusto
.create materialized-view UnionView on table CombinedTable {
    let adxData = ADXShortcutTable
        | project Timestamp, Value, Source = "ADX";
    let kqlData = LocalKQLTable
        | project Timestamp, Value, Source = "KQL";
    union adxData, kqlData
}
```

- ADXShortcutTable: This one is the table from the linked ADX cluster via a database shortcut.
- LocalKQLTable: This is a native KQL table in your Fabric workspace.
- project: Ensures both datasets have the same schema for union.
- Source: Adds a column to identify the origin of each row.
- union: Combines both datasets into one.

Notes:
- You must have read access to the ADX shortcut.
- Both tables must have compatible schemas (same column names and types).
- You can use `.create async materialized-view` if you want to backfill historical data.

## Switch ingestion to the new database 


## Related content

* [What is Real-Time intelligence in Fabric?](overview.md)
* [Create a KQL database](create-database.md)
