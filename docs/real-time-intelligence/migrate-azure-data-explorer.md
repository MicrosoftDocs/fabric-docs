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

# Migrate from Azure Data Explorer (ADX) to Fabric Real-Time intelligence (Eventhouse)
Migrate your Azure Data Explorer workloads to Microsoft Fabric to use advanced analytics, real-time data processing, and seamless integration with Fabric’s powerful features. This article shows you how to gradually transition your analytics workloads from Azure Data Explorer to Fabric Real-Time intelligence without downtime. 

Start by using **Fabric as the query layer** while ADX continues ingesting data, and explore Fabric’s features. When you're ready, **migrate fully** by moving schema and ingestion to Fabric.


## Consume ADX data in Fabric

Keep ADX for ingestion only, and move querying to Fabric by using one of these two methods to use ADX data from Fabric without duplicating data.

- **Fabric database shortcut (follower)**

    Create a [database shortcut](database-shortcut.md) to an Azure Data Explorer database, and query without migrating data to Fabric. A database shortcut in Real-Time intelligence is an embedded reference in a Kusto Query Language (KQL) database to a source database in Azure Data Explorer. The behavior of the database shortcut is similar to a [follower database](/azure/data-explorer/follower). It's read-only, syncs new data with a slight lag (seconds to minutes), and lets all Fabric items view and query ADX data without reingesting it.
- **Attach the ADX cluster as a queryable source**

    In Fabric, make sure you have a connection to the ADX cluster. Add an Azure Data Explorer source in KQL queryset, which lets certain Fabric items like queryset and real-time dashboards query ADX data. For more information, see [Query data in a KQL queryset - Microsoft Fabric](kusto-query-set.md).

    Try Fabric's capabilities like Copilot-assisted query generation, Power BI reports, Notebooks, Activator on your ADX data. Run all your dashboards and queries in Fabric while the ingestion continues to happen in ADX. When you're ready to fully migrate, follow the next steps.

## High-level migration steps

Follow these steps to migrate from ADX to Fabric:

1. [Create a new KQL database in Fabric with the ADX schema](#create-kql-database-in-fabric-with-adx-schema)
1. [Create a view with union operator that accesses both KQL table and ADX table](#create-union-views-for-seamless-data-access)
1. [Redirect query workloads to Fabric](#redirect-query-workloads-to-fabric)
1. [Switch data ingestion to Fabric](#switch-data-ingestion-to-fabric)
1. [Retire the ADX cluster](#retire-the-adx-cluster)

The following sections give details about each step.

## Create KQL database in Fabric with ADX schema

Create an empty KQL database in a Fabric eventhouse that eventually replaces the ADX database. It must have the same tables and functions schema as your ADX database. For instructions, see [Create an eventhouse and a KQL database](create-eventhouse.md). After you create the KQL database, follow these steps: 

1. **Replicate the schema**

    Use the [Sync Kusto](/azure/data-explorer/sync-kusto) or export the schema from ADX database to recreate it in Fabric KQL database. SyncKusto is a dedicated tool that synchronizes Kusto database schemas (tables, functions, etc.) between environments.

    Alternatively, you can run the KQL command: `.show database schema` in ADX, which generates a script of all table definitions, functions, and policies, and then run the generated script on KQL database in Fabric.
1. **Verify schema**
    
    Confirm all tables, columns, data types, and relevant policies (retention, caching, etc.) in KQL database match those in the ADX database. At this point, the Fabric KQL database is empty but ready to receive data, and you can also still query ADX using methods from the [Explore ADX data in Fabric](#consume-adx-data-in-fabric) section.

## Create union views for seamless data access
To avoid any interruption during data migration, create KQL views in Fabric that combine data from both the old ADX database and the new Fabric KQL database. This approach lets queries return a complete dataset during the transition:

1. **Define union views**
    
    For each table, create a stored function in Fabric (with `.create function with (view=true)`) that unions the Fabric table with the corresponding ADX table. Name the function exactly the same as the table to transparently override it. For example, for a table `MyTable`:

    ```kusto
    .create function with (view=true) MyTable() {
        MyTable 
        | union cluster("YourADXCluster").database("YourDatabase").MyTable
    }
    ```
    This view returns the union of the local `MyTable` in the Fabric KQL database, which is currently empty or receiving new data, and the remote table `MyTable` in the ADX database.

    Because the name of the view is **MyTable**, any query or report using that table name automatically queries both sources.

    Fabric and ADX might be in different clusters or tenants. If the creation command complains about the external reference, use the `skipvalidation=true` option in the function creation, which is sometimes needed for cross-cluster functions.
1. **Test the view**

    Run a count or sample query on the view (for example, `MyTable | count`) to make sure it returns data from ADX. The Fabric KQL database is still empty now, but as you migrate ingestion in the next step, the view starts returning both old and new records.

## Redirect query workloads to Fabric
Now update your tools and applications to query the new Fabric KQL database instead of ADX database:

1. **Update connection strings**

    Change analytics applications, KQL queries, or Power BI reports, to use the KQL database's endpoint ([query URI](access-database-copy-uri.md#copy-uri)), rather than the ADX cluster. The queries remain the same since table names and KQL didn’t change, but they now run in Fabric. Because of the union view created in the previous step, users querying the Fabric KQL database still get all historical data from ADX via the view plus any new data that's ingested into Fabric.
1. **Test reports and apps**

    Ensure that dashboards and scripts are getting results as expected from the Fabric KQL database. Performance might differ slightly. Fabric might cache some ADX data if you used a shortcut. This step effectively moves the query endpoints to Fabric. From here on, all read/query operations occur on Fabric.

## Switch data ingestion to Fabric
With queries now served by Fabric, direct the incoming data streams to Fabric:

1. **Repoint ingestion pipelines**

    Change all data producers like IoT devices, extract-transform-load (ETL) jobs, Event Hubs connections, and others that previously ingest into the ADX database, so they ingest into the Fabric KQL database. This step can include changing cluster URLs, authentication, or updating connection strings in Azure Data Factory, Stream Analytics, or custom apps to use the KQL database [ingestion endpoint or URI](access-database-copy-uri.md#copy-uri).
1. **Verify new data flow**

    Check that new records land in tables in the KQL database. The KQL database in Fabric starts accumulating data. Because you're using the union views, queries in Fabric still show a unified dataset. Over time, data in ADX becomes stale because no new data is ingested into ADX after this switch.

## Retire the ADX cluster
When you're confident that all required data is available in Fabric, decommission the old ADX resources:

1. **Remove union references**

    Change or drop the union views so queries don't pull from the ADX cluster. For example, update the function definition to `MyTable { MyTable }` to use only local data, or drop the function if the physical table in Fabric has all data. Check that your queries and dashboards work as expected with Fabric-only data.
1. **Archive or transfer historical data (if needed)**

    If there's still historical data in ADX that wasn't moved (for example, if you didn't wait for it to age out), consider exporting that data to Fabric before shutdown. Otherwise, continue if the data in ADX is beyond retention requirements.
1. **Decommission ADX**

    When Fabric serves both queries and ingestion, shut down or delete the ADX cluster to save cost. All users should connect to Fabric now.


## Summary
By following the steps in this article, you migrate from ADX to Fabric with minimal disruption. You start by moving consumption layer to Fabric, which unlocks features like Copilot, Power BI, Notebooks, and Activator, and then gradually shift the backend to Fabric. Now, Fabric's real-time intelligence (Eventhouse) handles both ingestion and querying of your data, and ADX isn't in use.

