---
title: Dataflow Gen2 data destinations and managed settings
description: Describes how to use Dataflow Gen2 to save your data in specific destinations, along with instructions on how to use managed settings.
ms.reviewer: DougKlopfenstein
ms.author: jeluitwi
author: Luitwieler
ms.topic: how-to
ms.date: 04/03/2024
---

# Dataflow Gen2 data destinations and managed settings

After you've cleaned and prepared your data with Dataflow Gen2, you want to land your data in a destination. You can do this using the data destination capabilities in Dataflow Gen2. With this capability, you can pick from different destinations, like Azure SQL, Fabric Lakehouse, and many more. Dataflow Gen2 then writes your data to the destination, and from there you can use your data for further analysis and reporting.

The following list contains the supported data destinations.

* Azure SQL databases
* Azure Data Explorer (Kusto)
* Fabric Lakehouse
* Fabric Warehouse
* Fabric KQL database

## Entry points

Every data query in your Dataflow Gen2 can have a data destination. Functions and lists aren't supported; you can only apply it to tabular queries. You can specify the data destination for every query individually, and you can use multiple different destinations within the dataflow.

There are three main entry-points to specify the data destination:

* Through the top ribbon.

  :::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/top-ribbon-destination.png" alt-text="Screenshot of the Power Query Home tab ribbon with Add data destination emphasized.":::

* Through query settings.

  :::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/query-settings-destination.png" alt-text="Screenshot of the Query settings pane with the Data destination button emphasized and the list of destinations displayed.":::

* Through the diagram view.

  :::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/diagram-view-destination.png" alt-text="Screenshot of a query in diagram view with the add destinations icon emphasized and the list of destinations displayed.":::

## Connect to the data destination

Connecting to the data destination is similar to connecting to a data source. Connections can be used for both reading and writing your data, given that you have the right permissions on the data source. You need to create a new connection or pick an existing connection, and then select **Next**.

:::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/connect-to-data-destination.png" alt-text="Screenshot of the Connect to data destination window for a Lakehouse destination.":::

## Create a new table or pick an existing table

When loading into your data destination, you can either create a new table or pick an existing table.

### Create a new table

When you choose to create a new table, during the Dataflow Gen2 refresh a new table is created in your data destination. If the table gets deleted in the future by manually going into the destination, the dataflow recreates the table during the next dataflow refresh.

By default, your table name has the same name as your query name. If you have any invalid characters in your table name that the destination doesn't support, the table name is automatically adjusted. For example, many destinations don't support spaces or special characters.

:::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/new-table.png" alt-text="Screenshot of the Choose destination target window with the New table button selected.":::

Next, you must select the destination container. If you chose any of the Fabric data destinations, you could use the navigator to select the Fabric artifact you want to load your data into. For Azure destinations, you can either specify the database during connection creation, or select the database from the navigator experience.

### Use an existing table

To choose an existing table, use the toggle at the top of the navigator. When choosing an existing table, you need to pick both the Fabric artifact/database and table using the navigator.

When you use an existing table, the table can't be recreated in any scenario. If you delete the table manually from the data destination, Dataflow Gen2 doesn't recreate the table on the next refresh.

:::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/existing-table.png" alt-text="Screenshot of the Choose destination target window with the Existing table button selected.":::

## Managed settings for new tables

When you're loading into a new table, the automatic settings are on by default. If you use the automatic settings, Dataflow Gen2 manages the mapping for you. The automatic settings provide the following behavior:

* **Update method replace**: Data is replaced at every dataflow refresh. Any data in the destination is removed. The data in the destination is replaced with the output data of the dataflow.

* **Managed mapping**: Mapping is managed for you. When you need to make changes to your data/query to add another column or change a data type, mapping is automatically adjusted for this change when you republish your dataflow. You don't have to go into the data destination experience every time you make changes to your dataflow, allowing for easy schema changes when you republish the dataflow.

* **Drop and recreate table**: To allow for these schema changes, on every dataflow refresh the table is dropped and recreated. Your dataflow refresh fails if you have any relationships or measures added to your table.

> [!NOTE]
> Currently, automatic setting are only supported for Lakehouse and Azure SQL database as data destination.  

:::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/use-automatic-settings.png" alt-text="Screenshot of the Choose destination settings window with the Use automatic settings option selected.":::

## Manual settings

By untoggling **Use automatic settings**, you get full control over how to load your data into the data destination. You can make any changes to the column mapping by changing the source type or excluding any column that you don't need in your data destination.

:::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/use-manual-settings.png" alt-text="Screenshot of the Choose destination settings window with the Use automatic settings options unselected and the various manual settings displayed.":::

### Update methods

Most destinations support both append and replace as update methods. However, Fabric KQL databases and Azure Data Explorer don't support replace as an update method.

* **Replace**: On every dataflow refresh, your data is dropped from the destination and replaced by the output data of the dataflow.

* **Append**: On every dataflow refresh, the output data from the dataflow is appended to the existing data in the data destination table.

### Schema options on publish

Schema options on publish only apply when the update method is replace. When you append data, changes to the schema aren't possible.

* **Dynamic schema**: When choosing dynamic schema, you allow for schema changes in the data destination when you republish the dataflow. Because you aren't using managed mapping, you still need to update the column mapping in the dataflow destination flow when you make any changes to your query. When the dataflow is refreshed, your table is dropped and recreated. Your dataflow refresh fails if you have any relationships or measures added to your table.

* **Fixed schema**: When you choose fixed schema, schema changes aren't possible. When the dataflow gets refreshed, only the rows in the table are dropped and replaced with the output data from the dataflow. Any relationships or measures on the table stay intact. If you make any changes to your query in the dataflow, the dataflow publish fails if it detects that the query schema doesn't match the data destination schema. Use this setting when you don't plan to change the schema and have relationships or measure added to your destination table.

> [!NOTE]
> When loading data into the warehouse, only fixed schema is supported.

:::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/fixed-schema.png" alt-text="Screenshot of the Schema options on publish option, with Fixed schema selected.":::

## Supported data source types per destination

| Supported data types per storage location | DataflowStagingLakehouse | Azure DB (SQL) Output | Azure Data Explorer Output | Fabric Lakehouse (LH) Output | Fabric Warehouse (WH) Output |
| --- | --- | --- | --- | --- | --- |
| Action                           | No  | No  | No  | No  | No  |
| Any                              | No  | No  | No  | No  | No  |
| Binary                           | No  | No  | No  | No  | No  |
| Currency                         | Yes | Yes | Yes | Yes | No  |
| DateTimeZone                     | Yes | Yes | Yes | No  | No  |
| Duration                         | No  | No  | Yes | No  | No  |
| Function                         | No  | No  | No  | No  | No  |
| None                             | No  | No  | No  | No  | No  |
| Null                             | No  | No  | No  | No  | No  |
| Time                             | Yes | Yes | No  | Yes | Yes |
| Type                             | No  | No  | No  | No  | No  |
| Structured (List, Record, Table) | No  | No  | No  | No  | No  |

## Advanced topics

### Using staging before loading to a destination

To enhance performance of query processing, staging can be used within Dataflows Gen2 to use Fabric compute to execute your queries.

When staging is enabled on your queries (the default behavior), your data is loaded into the staging location, which is an internal Lakehouse only accessible by dataflows itself.

Using staging locations can enhance performance in some cases in which folding the query to the SQL endpoint is faster than in memory processing.

When you're loading data into the Lakehouse or other non-warehouse destinations, we by default disable the staging feature to improve performance. When you load data into the data destination, the data is directly written to the data destination without using staging. If you want to use staging for your query, you can enable it again.

To enable staging, right-click on the query and enable staging by selecting the **Enable staging** button. Your query then turns blue.

:::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/disable-staging.png" alt-text="Screenshot of the query drop-down menu with Enable staging emphasized.":::

#### Loading data into the Warehouse

When you load data into the Warehouse, staging is required before the write operation to the data destination. This requirement improves performance. Currently, only loading into the same workspace as the dataflow is supported. Ensure staging is enabled for all queries that load into the warehouse.  

When staging is disabled, and you choose Warehouse as the output destination, you get a warning to enable staging first before you can configure the data destination.

:::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/add-data-destination.png" alt-text="Screenshot of the Add data destination warning.":::

If you already have a warehouse as a destination and try to disable staging, a warning is displayed. You can either remove the warehouse as the destination or dismiss the staging action.

:::image type="content" source="media/dataflow-gen2-data-destinations-and-managed-settings/enable-staging.png" alt-text="Screenshot of the Enable staging warning.":::

### Nullable

In some cases when you have a nullable column, it gets detected by Power Query as non-nullable and when writing to the data destination, the column type is non-nullable. During refresh, the following error occurs:

`E104100 Couldn’t refresh entity because of an issue with the mashup document MashupException.Error: DataFormat.Error: Error in replacing table’s content with new data in a version: #{0}., InnerException: We can’t insert null data into a non-nullable column., Underlying error: We can’t insert null data into a non-nullable column. Details: Reason = DataFormat.Error;Message = We can’t insert null data into a non-nullable column.; Message.Format = we can’t insert null data into a non-nullable column.`

To force nullable columns, you can try the following steps:

1. Delete the table from the data destination.

2. Remove the data destination from the dataflow.

3. Go into the dataflow and update the data types by using the following Power Query code:

   ```powerquery-m
   Table.TransformColumnTypes(
      #"PREVIOUS STEP", {
         {"COLLUMNNAME1", type nullable text}, 
         {"COLLUMNNAME2", type nullable Int64.Type}
      }
   ) 
   ```

4. Add the data destination.
