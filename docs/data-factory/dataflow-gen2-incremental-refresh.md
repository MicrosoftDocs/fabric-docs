---
title: Incremental refresh in Dataflow Gen2
description: Learn about the incremental refresh feature in Dataflow Gen2 in Data Factory for Microsoft Fabric.
author: luitwieler
ms.topic: concept-article
ms.date: 05/09/2025
ms.author: jeluitwi
ms.custom: dataflows
---

# Incremental refresh in Dataflow Gen2

In this article, we introduce incremental data refresh in Dataflow Gen2 for Microsoft Fabric’s Data Factory. When you use dataflows for data ingestion and transformation, there are scenarios where you specifically need to refresh only new or updated data&mdash;especially as your data continues to grow. The incremental refresh feature addresses this need by allowing you to reduce refresh times, enhance reliability by avoiding long-running operations, and minimize resource usage.

## Prerequisites

To use incremental refresh in Dataflow Gen2, you need to meet the following prerequisites:

- You must have a Fabric capacity.
- Your data source supports [folding](/power-query/query-folding-basics) (recommended) and needs to contain a Date/DateTime column that can be used to filter the data.
- You should have a data destination that supports incremental refresh. For more information, go to [Destination support](#destination-support).
- Before getting started, ensure that you reviewed the limitations of incremental refresh. For more information, go to [Limitations](#limitations).

## Destination support

The following data destinations are supported for incremental refresh:

- Fabric Lakehouse (preview)
- Fabric Warehouse
- Azure SQL Database
- Azure Synapse Analytics

Other destinations can be used in combination with incremental refresh by using a second query that references the staged data to update the data destination. This way you can still use incremental refresh to reduce the amount of data that needs to be processed and retrieved from the source system. But you need to do a full refresh from the staged data to the data destination.

## How to use incremental refresh

1. Create a new Dataflow Gen2 or open an existing Dataflow Gen2.
1. In the dataflow editor, create a new query that retrieves the data you want to refresh incrementally.
1. Check the data preview to ensure that the query returns data that contains a DateTime, Date, or DateTimeZone column that you can use to filter the data.
1. Ensure that the query fully folds, which means that the query is fully pushed down to the source system. If the query doesn't fully fold, you need to modify the query so that it fully folds. You can ensure the query fully folds by checking the query steps in the query editor.

    :::image type="content" source="./media/dataflows-gen2-incremental-refresh/incremental-refresh-folding-indicator.png" alt-text="Screenshot of the query editor in Dataflow Gen2.":::

1. Right-click the query and select **Incremental refresh**.

    :::image type="content" source="./media/dataflows-gen2-incremental-refresh/dropdown-incremental-refresh-settings.png" alt-text="Screenshot of the dropdown menu in Dataflow Gen2.":::

1. Provide the required settings for incremental refresh.

    :::image type="content" source="./media/dataflows-gen2-incremental-refresh/incremental-refresh-settings-advanced.png" alt-text="Screenshot of the incremental refresh settings.":::

    1. Choose a DateTime column to filter by.
    1. Extract data from the past.
    1. Bucket size.
    1. Only extract new data when the maximum value in this column changes.
1. Configure the advanced settings if needed.
    1. Require incremental refresh query to fully fold.
1. Select **OK** to save the settings.
1. If you want, you can now set up a data destination for the query. Ensure that you do this setup before the first incremental refresh, as otherwise your data destination only contains the incrementally changed data since the last refresh.
1. Publish the Dataflow Gen2.

After you configure incremental refresh, the dataflow automatically refreshes the data incrementally based on the settings you provided. The dataflow only retrieves the data that changed since the last refresh. So, the dataflow runs faster and consumes less resources.

## How incremental refresh works behind the scenes

Incremental refresh works by dividing the data into buckets based on the DateTime column. Each bucket contains the data that changed since the last refresh. The dataflow knows what changed by checking the maximum value in the column that you specified. If the maximum value changed for that bucket, the dataflow retrieves the whole bucket and replaces the data in the destination. If the maximum value didn't change, the dataflow doesn't retrieve any data. The following sections contain a high-level overview of how incremental refresh works step by step.

### First step: Evaluate the changes

When the dataflow runs, it first evaluates the changes in the data source. It does this evaluation by comparing the maximum value in the DateTime column to the maximum value in the previous refresh. If the maximum value changed or if it's the first refresh, the dataflow marks the bucket as changed and lists it for processing. If the maximum value didn't change, the dataflow skips the bucket and doesn't process it.

### Second step: Retrieve the data

Now the dataflow is ready to retrieve the data. It retrieves the data for each bucket that changed. The dataflow does this retrieval in parallel to improve performance. The dataflow retrieves the data from the source system and loads it into the staging area. The dataflow only retrieves the data that's within the bucket range. In other words, the dataflow only retrieves the data that changed since the last refresh.

### Last step: Replace the data in the data destination

The dataflow replaces the data in the destination with the new data. The dataflow uses the `replace` method to replace the data in the destination. That is, the dataflow first deletes the data in the destination for that bucket and then inserts the new data. The dataflow doesn't affect the data that's outside the bucket range. Therefore, if you have data in the destination that's older than the first bucket, the incremental refresh doesn't affect this data in any way.

## Incremental refresh settings explained

To configure incremental refresh, you need to specify the following settings.

:::image type="content" source="./media/dataflows-gen2-incremental-refresh/incremental-refresh-settings-advanced.png" alt-text="Screenshot of the incremental refresh settings.":::

### General settings

The general settings are required and specify the basic configuration for incremental refresh.

#### Choose a DateTime column to filter by

This setting is required and specifies the column that dataflows use to filter the data. This column should be either a DateTime, Date, or DateTimeZone column. The dataflow uses this column to filter the data and only retrieves the data that changed since the last refresh.

#### Extract data from the past

This setting is required and specifies how far back in time the dataflow should extract data. This setting is used to retrieve the initial data load. The dataflow retrieves all the data from the source system that's within the specified time range. Possible values are:

- x days
- x weeks
- x months
- x quarters
- x years

For example, if you specify **1 month**, the dataflow retrieves all the new data from the source system that is within the last month.

#### Bucket size

This setting is required and specifies the size of the buckets that the dataflow uses to filter the data. The dataflow divides the data into buckets based on the DateTime column. Each bucket contains the data that changed since the last refresh. The bucket size determines how much data is processed in each iteration. A smaller bucket size means that the dataflow processes less data in each iteration, but it also means that more iterations are required to process all the data. A larger bucket size means that the dataflow processes more data in each iteration, but it also means that fewer iterations are required to process all the data.

#### Only extract new data when the maximum value in this column changes

This setting is required and specifies the column that the dataflow uses to determine if the data changed. The dataflow compares the maximum value in this column to the maximum value in the previous refresh. If the maximum value is changed, the dataflow retrieves the data that changed since the last refresh. If the maximum value isn't changed, the dataflow doesn't retrieve any data.

#### Only extract data for concluded periods

This setting is optional and specifies whether the dataflow should only extract data for concluded periods. If this setting is enabled, the dataflow only extracts data for periods that concluded. So, the dataflow only extracts data for periods that are complete and don't contain any future data. If this setting is disabled, the dataflow extracts data for all periods, including periods that aren't complete and contain future data.

For example, if you have a DateTime column that contains the date of the transaction and you only want to refresh complete months, you can enable this setting in combinations with the bucket size of `month`. Therefore, the dataflow only extracts data for complete months and doesn't extract data for incomplete months.

### Advanced settings

Some settings are considered advanced and aren't required for most scenarios.

#### Require incremental refresh query to fully fold

This setting is optional and specifies whether the query used for incremental refresh must fully fold. If this setting is enabled, the query used for incremental refresh must fully fold. In other words, the query must be fully pushed down to the source system. If this setting is disabled, the query used for incremental refresh doesn't need to fully fold. In this case, the query can be partially pushed down to the source system. We **strongly** recommend enabling this setting to improve performance to avoid retrieving unnecessary and unfiltered data.

## Limitations

### Lakehouse is supported comes with additional caveats

When working with lakehouse as a data destination, you need to be aware of the following limitations:

- Maximum number of concurrent evaluations is 10. This means that the dataflow can only evaluate 10 buckets in parallel. If you have more than 10 buckets, you need to limit the number of buckets or limit the number of concurrent evaluations.
:::image type="content" source="./media/dataflows-gen2-incremental-refresh/dataflow-concurrency-control.png" alt-text="Screenshot of the dataflow concurrency control settings.":::
- When you write to a lakehouse, the dataflow maintains it owns bookkeeping of the files that are written to the lakehouse. This is in line with the standard lakehouse pattern. However, this means that if other writers like Spark or other processes write to the same table, it may cause issues with the incremental refresh. We recommend that you don't use other writers to write to the same table while using incremental refresh. If you do, you need to ensure that the other writers don't interfere with the incremental refresh process. Processes like table maintenance and vacuuming are not supported either while using incremental refresh.

### The data destination must be set to a fixed schema

The data destination must be set to a fixed schema, which means that the schema of the table in the data destination must be fixed and can't change. If the schema of the table in the data destination is set to dynamic schema, you need to change it to fixed schema before you configure incremental refresh.

### The only supported update method in the data destination is `replace`

The only supported update method in the data destination is `replace`, which means that the dataflow replaces the data for each bucket in the data destination with the new data. However, data that is outside the bucket range isn't affected. So, if you have data in the data destination that's older than the first bucket, the incremental refresh doesn't affect this data in any way.

### Maximum number of buckets is 50 for a single query and 150 for the whole dataflow

The maximum number of buckets per query that the dataflow supports is 50. If you have more than 50 buckets, you need to increase the bucket size or reduce the bucket range to lower the number of buckets. For the whole dataflow, the maximum number of buckets is 150. If you have more than 150 buckets in the dataflow, you need to reduce the number of incremental refresh queries or increase the bucket size to reduce the number of buckets.

## Differences between incremental refresh in Dataflow Gen1 and Dataflow Gen2

Between Dataflow Gen1 and Dataflow Gen2, there are some differences in how incremental refresh works. The following list explains the main differences between incremental refresh in Dataflow Gen1 and Dataflow Gen2.

- Incremental refresh is now a first-class feature in Dataflow Gen2. In Dataflow Gen1, you had to configure incremental refresh after you published the dataflow. In Dataflow Gen2, incremental refresh is now a first-class feature that you can configure directly in the dataflow editor. This feature makes it easier to configure incremental refresh and reduces the risk of errors.
- In Dataflow Gen1, you had to specify the historical data range when you configured incremental refresh. In Dataflow Gen2, you don't have to specify the historical data range. The dataflow doesn't remove any data from the destination that's outside the bucket range. Therefore, if you have data in the destination that is older than the first bucket, the incremental refresh doesn't affect this data in any way.
- In Dataflow Gen1, you had to specify the parameters for the incremental refresh when you configured incremental refresh. In Dataflow Gen2, you don't have to specify the parameters for the incremental refresh. The dataflow automatically adds the filters and parameters as the last step in the query. So, you don't have to specify the parameters for the incremental refresh manually.

## FAQ

### I received a warning that I used the same column for detecting changes and filtering. What does this mean?

If you get a warning that you used the same column for detecting changes and filtering, that means the column you specified for detecting changes is also used for filtering the data. We don't recommend this usage as it can lead to unexpected results. Instead, we recommend that you use a different column for detecting changes and filtering the data. If the data shifts between buckets, the dataflow might not be able to detect the changes correctly and might create duplicated data in your destination. You can resolve this warning by using a different column for detecting changes and filtering the data. Or you can ignore the warning if you're sure that data doesn't change between refreshes for the column you specified.

### I want to use incremental refresh with a data destination that isn't supported. What can I do?

If you would like to use incremental refresh with a data destination that isn't supported, you can enable incremental refresh on your query and use a second query that references the staged data to update the data destination. This way, you can still use incremental refresh to reduce the amount of data that needs to be processed and retrieved from the source system, but you need to do a full refresh from the staged data to the data destination. Ensure that you set up the window and bucket size correctly as we don't guarantee that the data in staging is retained outside the bucket range. Another option is to use the pattern to incrementally amass data. We have a guide on how to do this here: [Incremental amass data with Dataflow Gen2](./tutorial-setup-incremental-refresh-with-dataflows-gen2.md)

### How do I know if my query has incremental refresh enabled?

You can see if your query has incremental refresh enabled by checking the icon next to the query in the dataflow editor. If the icon contains a blue triangle, incremental refresh is enabled. If the icon doesn't contain a blue triangle, incremental refresh isn't enabled.

### My source gets too many requests when I use incremental refresh. What can I do?

We added a setting that allows you to set the maximum number of parallel query evaluations. This setting can be found in the global settings of the dataflow. By setting this value to a lower number, you can reduce the number of requests sent to the source system. This setting can help to reduce the number of concurrent requests and improve the performance of the source system. To set the maximum number of parallel query executions, go to the global settings of the dataflow, navigate to the **Scale** tab, and set the maximum number of parallel query evaluations. We recommend that you don't enable this limit unless you experience issues with the source system.

:::image type="content" source="./media/dataflows-gen2-incremental-refresh/dataflow-concurrency-control.png" alt-text="Screenshot of the dataflow concurrency control settings.":::

### I want to use incremental refresh but I see that after enablement, the dataflow takes longer to refresh. What can I do?

Incremental refresh, as described in this article, is designed to reduce the amount of data that needs to be processed and retrieved from the source system. However, if the dataflow takes longer to refresh after you enable incremental refresh, it might be because the additional overhead of checking if data changed and processing the buckets is higher than the time saved by processing less data. In this case, we recommend that you review the settings for incremental refresh and adjust them to better fit your scenario. For example, you can increase the bucket size to reduce the number of buckets and the overhead of processing them. Or you can reduce the number of buckets by increasing the bucket size. If you still experience low performance after adjusting the settings, you can disable incremental refresh and use a full refresh instead as that might be more efficient in your scenario.

## Next steps

- [Dataflow Gen2 Overview](dataflows-gen2-overview.md)
- [Monitor Dataflow Gen2](dataflows-gen2-monitor.md)
