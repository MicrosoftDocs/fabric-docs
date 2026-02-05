---
title: Configure Salesforce in a copy activity
description: This article explains how to copy data using Salesforce.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 11/20/2025
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure Salesforce in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from and to Salesforce.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for Salesforce under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-salesforce-objects/salesforce-source.png" alt-text="Screenshot showing source tab.":::

The following properties are **required**:

- **Connection**:  Select a Salesforce connection from the connection list. If no connection exists, then create a new Salesforce connection by selecting **New**.
- **Use query**: Select from **Object API**, **Report**, or **SOQL Query**.
    - If you select **Object API**:
      - **Object API**: Specify the Salesforce object name to retrieve data from. Select the name from the drop-down list.

    - If you select **Report**:
      - **Report ID**: Specify the ID of the Salesforce report to retrieve data from. It isn't supported in destination. There are [limitations](https://developer.salesforce.com/docs/atlas.en-us.api_analytics.meta/api_analytics/sforce_analytics_rest_api_limits_limitations.htm) when you use reports.

        :::image type="content" source="./media/connector-salesforce-objects/use-query-report.png" alt-text="Screenshot showing Use query - Report." :::

    - If you select **SOQL Query**:
      - **SOQL Query**: Use the custom query to read data. You can only use [Salesforce Object Query Language (SOQL)](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm) query with limitations [Understanding Bulk API 2.0 Query](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/queries.htm#SOQL%20Considerations). If you don't specify **SOQL query**, all the data of the Salesforce object specified in **Object API** or **Report ID** will be retrieved.

        :::image type="content" source="./media/connector-salesforce-objects/use-query-soql-query.png" alt-text="Screenshot showing Use query - SOQL Query." :::

Under **Advanced**, you can specify the following fields:

- **Include deleted objects**: Specify whether to query the existing records (unselected), or query all records including the deleted ones (selected).
- **Partition option**: Provide capability to automatically detect and apply the optimal partitioning algorithm to optimize for read throughput when applicable. You're recommended to select Auto detect for long-running copy that can benefit from multi-threaded reads. The default value is Auto detect.
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Destination

The following properties are supported for Salesforce under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-salesforce-objects/salesforce-destination.png" alt-text="Screenshot showing destination tab and the list of properties.":::

The following properties are **required**:

- **Connection**: Select a Salesforce connection from the connection list. If no connection exists, then create a new Salesforce connection by selecting **New**.
- **Object API**: Specify the Salesforce object name to write data to. Select the name from the drop-down list.

Under **Advanced**, you can specify the following fields:

- **Write behavior**: Specify the write behavior for the operation. Allowed values are **Insert** and **Upsert**. You can choose a behavior from the drop-down list.

  If you select **Upsert**:
  - **External ID field**: The name of the external ID field for the upsert operation. The specified field must be defined as **External ID Field** in the Salesforce object. It can't have NULL values in the corresponding input data.

    :::image type="content" source="./media/connector-salesforce-objects/write-behavior-upsert.png" alt-text="Screenshot showing Write behavior - Upsert.":::

- **Ignore null values**: Specify whether to ignore NULL values from input data during a write operation.

  - When it's selected: Leave the data in the destination object unchanged when you do an upsert or update operation. Insert a defined default value when you do an insert operation.
  - When it's unselected: Update the data in the destination object to NULL when you do an upsert or update operation. Insert a NULL value when you do an insert operation.

- **Write batch size**: Specify the row count of data written to Salesforce in each batch. Suggest set this value from 10,000 to 200,000. Too few rows in each batch reduces copy performance. Too many rows in each batch could cause API timeout.

- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). 

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Salesforce.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\<your Salesforce  connection> |Yes|connection|
|**Connection type** | Your connection type. Select **Salesforce objects**.|**SalesforceObject**|Yes |/|
|**Use query** |The way to read data from Salesforce. |• **Object API** <br>• **Report**<br>• **SOQL Query** |Yes |/|
| *For **Object API*** |  |  |  |  |
| **Object API** | Specify the Salesforce object name to retrieve data from. |< your object name >  | Yes | objectApiName |
| *For **Report*** |  |  |  |  |
| **Report ID** | The ID of the Salesforce report to retrieve data from. It isn't supported in destination. There are [limitations](https://developer.salesforce.com/docs/atlas.en-us.api_analytics.meta/api_analytics/sforce_analytics_rest_api_limits_limitations.htm) when you use reports. | \<your report ID> | Yes | reportId |
| *For **SOQL Query*** |  |  |  |  |
| **SOQL Query** | Use the custom query to read data. You can only use [Salesforce Object Query Language (SOQL)](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm) query with limitations [Understanding Bulk API 2.0 Query](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/queries.htm#SOQL%20Considerations). If you don't specify **SOQL query**, all the data of the Salesforce object specified in **Object API** or **Report ID** will be retrieved. |< your SOQL query >  | Yes | query |
|  |  |  |  |  |
| **Include deleted objects** | Indicates whether to query the existing records, or query all records including the deleted ones. | selected or unselected (default) | No |
| **Partition option** |Provide capability to automatically detect and apply the optimal partitioning algorithm to optimize for read throughput when applicable. You're recommended to select Auto detect for long-running copy that can benefit from multi-threaded reads.   | None or AutoDetect (default) | No | partitionOption |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

### Destination information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **Connection** |Your connection to the destination data store.|\<your Salesforce connection> |Yes|connection|
| **Object API** | Specify the Salesforce object name to write data to. | < your object name > | Yes | objectApiName |
| **Write behavior** | The write behavior for the operation. Allowed values are **Insert** and **Upsert**. You can choose a behavior from the drop-down list. | • Insert<br>• Upsert| No (default is Insert) | writeBehavior: <br>insert<br>upsert |
| **External ID field** | The name of the external ID field for the upsert operation. The specified field must be defined as **External ID Field** in the Salesforce object. It can't have NULL values in the corresponding input data. | < your external ID field >  | Yes for "Upsert" | externalIdFieldName |
| **Ignore null values** | Indicates whether to ignore NULL values from input data during a write operation. | selected or unselected (default) | No | ignoreNullValues: <br>true or false (default) |
| **Write batch size** | The row count of data written to Salesforce in each batch. Suggest set this value from 10,000 to 200,000. Too few rows in each batch reduces copy performance. Too many rows in each batch could cause API timeout. | \<number of rows> <br>(integer) | No (default is 100,000) | writeBatchSize |
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\>|No |maxConcurrentConnections|

## Salesforce Bulk API 2.0 Limits

We use Salesforce Bulk API 2.0 to query and ingest data. In Bulk API 2.0, batches are created for you automatically. You can submit up to **15,000** batches per rolling 24-hour period. If batches exceed the limit, you encounter failures.

In Bulk API 2.0, only ingest jobs consume batches. Query jobs don't. For details, see [How Requests Are Processed in the Bulk API 2.0 Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/how_requests_are_processed.htm).

For more information, see the **General Limits** section in [Salesforce developer limits](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_bulkapi.htm).

## Related content

- [Salesforce objects overview](connector-salesforce-objects-overview.md)
