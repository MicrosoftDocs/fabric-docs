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

# Migrate from Azure Data Explorer (ADX) to Fabric Real-Time Intelligence (Eventhouse)

This article helps you with gradually transitioning your analytics workloads from ADX to Fabric without downtime. First, use Fabric as the query layer while ADX continues ingesting data, to explore Fabric’s features. Then, once confident, migrate fully by moving schema and ingestion to Fabric.

Migrating your Azure Data Explorer workloads to Microsoft Fabric enables you to leverage advanced analytics, real-time data processing, and seamless integration with Fabric’s powerful features. This guide walks you through the key steps and best practices for a smooth transition. 

## Explore Fabric with ADX Data (consumption-only migration)

Keep ADX as ingestion-only, and move querying to Fabric by using one of these two methods to access ADX data from Fabric without duplicating data:

- **Fabric database shortcut (follower)**

    Create a [database shortcut](database-shortcut.md) to an Azure Data Explorer database, and query without migrating data to Fabric. A database shortcut in Real-Time intelligence is an embedded reference within a Kusto Query Language (KQL) database to a source database in Azure Data Explorer. The behavior exhibited by the database shortcut is similar to that of a [follower database](/azure/data-explorer/follower?tabs=csharp). It’s read-only and syncs new data with a slight lag (seconds to minutes). It allows all Fabric items to view and query ADX data without reingesting it.
- **Attach the ADX cluster as a queryable source**

    In Fabric, ensure you have a connection to the ADX cluster. You can do it by adding an Azure Data Explorer source in KQL queryset, which allows certain Fabric items like queryset, real-Time dashboards to query ADX data. For more information, see [Query data in a KQL queryset - Microsoft Fabric](kusto-query-set.md). This approach allows cross-cluster queries from Fabric to ADX. You can try Fabric’s capabilities like Copilot-assisted query generation and integrated BI reports on your live ADX data. All your dashboards and queries can be executed in Fabric, reducing load on the ADX cluster, which now just ingests data. No data is moved yet and this step is a safe exploration step. When you’re ready to fully migrate, proceed to the next steps.


## Create a new KQL database in Fabric with the ADX schema

Set up an empty KQL database in Fabric (an Eventhouse) that eventually replaces ADX. It must have the same tables and functions schema as your ADX database.

1. **Replicate the schema**

    Use the [Sync Kusto](/azure/data-explorer/sync-kusto) or export the schema from ADX to recreate it in Fabric. SyncKusto is a dedicated tool that synchronizes Kusto database schemas (tables, functions, etc.) between environments

    Alternatively, you can run `.show database schema` as csl in ADX and run the generated `create-table` statements in Fabric. Use Azure Data Explorer tools to extract the schema. For example, run the `.show database schema` as csl script command in ADX, which generates a script of all table definitions, functions, and policies.
1. **Import into Fabric**

    In Fabric’s KQL editor, run the generated schema script to create tables and functions in the new KQL database. Ensure the database and table names match the old ones. Alternatively, use the SyncKusto tool, which can synchronize schemas between a source ADX and a target Fabric database.
1. **Verify schema**
    
    Confirm all tables, columns, data types, and relevant policies (retention, caching, etc.) in Fabric match the ADX setup. At this point, the Fabric database is empty but ready to receive data, and Fabric can also still query ADX via the method from the previous section.


## Create union views for seamless data Access
To avoid any interruption during data migration, create KQL views in Fabric that combine data from both the old ADX database and the new Fabric database. It allows queries to return a complete dataset during the transition:

1. **Define union views**
    
    For each table, create a stored function in Fabric (with `.create` function with `(view=true)`) that unions the Fabric table with the corresponding ADX table. Name the function exactly the same as the table to transparently override it. For example, for a table `MyTable`:

    ```kusto
    .create function with (view=true) MyTable() {
        MyTable 
        | union cluster("YourADXCluster").database("YourDatabase").MyTable
    }
    ```
    This view returns the union of local MyTable in Fabric KQL database, which is currently empty or receiving new data, and the remote table `MyTable` in ADX.

    As the name of the view is **MyTable**, any query or report using that table name automatically queries both sources. 

    **Skip validation if needed**: Fabric and ADX might be in different clusters/tenants. If the creation command complains about the external reference, use the `skipvalidation=true` option in the function creation, which is sometimes needed for cross-cluster functions.
1. **Test the View**

    Run a count or sample query on the view (for example, `MyTable | count`) to ensure it returns data from ADX. The Fabric database is still empty now, but as we migrate ingestion in the next step, the view will start returning both old and new records.


## Redirect query workloads to Fabric
Now update your tools and applications to query the new Fabric database instead of ADX:

- **Update connection strings**

    Change analytics applications, KQL queries, or Power BI reports, to use the Fabric Real-Time intelligence endpoint, that is the new Eventhouse and the KQL database, rather than the ADX cluster. The queries remain the same since table names and KQL didn’t change, but they now run in Fabric. Because of the union views created in the previous steps, users querying the Fabric KQL database still get all historical data from ADX via the view plus any new data that's ingested into Fabric.
- **Test reports and apps**

    Ensure that dashboards and scripts are getting results as expected from the Fabric database. Performance might differ slightly. Fabric might cache some ADX data if you used a shortcut. This step effectively moves the query endpoints to Fabric. From here on, all read/query operations occur on Fabric.


## Switch data ingestion to Fabric
With queries now served by Fabric, direct the incoming data streams to Fabric as well:

1. **Repoint ingestion pipelines**

    Modify all producers of data, for example, IoT devices, extract-transform-load (ETL) jobs, Event Hubs connections, etc.) that were previously ingesting into ADX, so that they ingest into the Fabric KQL database tables. This step could involve changing cluster URLs, authentication, or updating connection strings in Azure Data Factory, Stream Analytics, or custom apps to use the Fabric Eventhouse endpoints.
1. **Verify new data flow**

    Confirm that new records are landing in Fabric’s tables. Now the Fabric database starts accumulating data. As you're using the union views, queries in Fabric still show a unified dataset. Over time, data in ADX will become stale as no new data is ingested into ADX after this switch.


## Retire the ADX cluster
After a suitable period when you're confident all required data is available in Fabric, decommission the old ADX resources:

1. **Remove union references**

    Modify or drop the union views created so that queries no longer attempt to pull from the ADX cluster. For instance, you can update the function definition to just `MyTable { MyTable }`, that is, use only the local data or drop the function if the physical table in Fabric now holds all data. Ensure your queries/dashboards still work as expected against Fabric-only data.
1. **Archive or transfer historical data (if needed)**

    If there's still some historical data left in ADX that wasn't brought over (for example, if you chose not to wait for it to age out), consider one-time export of that data to Fabric before shutdown. Otherwise, proceed if the data in ADX is beyond retention requirements.
1. **Decommission ADX**

    Once Fabric is fully serving both queries and ingestion, you can shut down or delete the ADX cluster to save cost. All users should be connecting to Fabric now


## Summary
By following these steps, you migrated from ADX to Fabric with minimal disruption. You initially used Fabric as a consumer of ADX (unlocking features like Copilot and integrated BI), then gradually shifted the backend to Fabric. Now Fabric’s Real-Time Intelligence (Eventhouse) handles both ingestion and querying of your data, and ADX is no longer in use.


## Related content

* [What is Real-Time intelligence in Fabric?](overview.md)
* [Create a KQL database](create-database.md)
