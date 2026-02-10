---
title: How to copy data using copy activity
description: Learn how to use copy activities in a pipeline to move data between cloud data stores. Includes steps for using the copy assistant and adding activities directly.
ms.reviewer: jianleishen
ms.topic: how-to
ms.custom: pipelines, sfi-image-nochange
ms.date: 12/16/2025
ai-usage: ai-assisted
---

# How to copy data using copy activity

In a pipeline, you can use the Copy activity to copy data between data stores in the cloud. After you copy the data, you can use other activities in your pipeline to transform and analyze it.

The Copy activity connects to your data sources and destinations, then moves data efficiently between them. Here's how the service handles the copy process:

1. **Connects to your source**: Creates a secure connection to read data from your source data store.
1. **Processes the data**: Handles serialization/deserialization, compression/decompression, column mapping, and data type conversions based on your configuration.
1. **Writes to destination**: Transfers the processed data to your destination data store.
1. **Provides monitoring**: Tracks the copy operation and provides detailed logs and metrics for troubleshooting and optimization.

> [!TIP]
> If you only need to copy your data and don't need transformations, a **Copy job** might be a better option for you. Copy jobs provide a simplified experience for data movement scenarios that don't require creating a full pipeline. See: [the Copy jobs overview](what-is-copy-job.md) or [use our decision table to compare Copy activity and Copy job](../fundamentals/decision-guide-pipeline-dataflow-spark.md#copy-activity-copy-job-dataflow-eventstream-and-spark-properties).

## Prerequisites

To get started, you need to complete these prerequisites:

- A Microsoft Fabric tenant account with an active subscription. Create an account for free.
- A Microsoft Fabric enabled Workspace.

## Add a copy activity using copy assistant

Follow these steps to set up your copy activity using copy assistant.

### Start with copy assistant

1. Open an existing pipeline or create a new pipeline.
1. Select **Copy data** on the canvas to open the **Copy Assistant** tool to get started. Or select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

   :::image type="content" source="media/copy-data-activity/use-copy-assistant.png" alt-text="Screenshot showing options for opening the copy assistant." lightbox="media/copy-data-activity/use-copy-assistant.png":::

### Configure your source

1. Select a data source type from the category. You'll use Azure Blob Storage as an example. Select **Azure Blob Storage**.

   :::image type="content" source="media/copy-data-activity/choose-data-source.png" alt-text="Screenshot of Choose data source screen." lightbox="media/copy-data-activity/choose-data-source.png":::


1. Create a connection to your data source by selecting **Create new connection**.

   :::image type="content" source="media/copy-data-activity/create-new-azure-blob-storage-connection.png" alt-text="Screenshot showing where to select New connection." lightbox="media/copy-data-activity/create-new-azure-blob-storage-connection.png":::

    After you select **Create new connection**, fill in the required connection information and then select **Next**. For the details of connection creation for each type of data source, you can refer to each [connector article](connector-overview.md#supported-connectors-in-fabric).

   If you already have connections, you can select **Existing connection** and select your connection from the drop-down list.

   :::image type="content" source="media/copy-data-activity/existing-connection.png" alt-text="Screenshot showing the existing connection." lightbox="media/copy-data-activity/existing-connection.png":::

1. Choose the file or folder to be copied in this source configuration step, and then select **Next**.

   :::image type="content" source="media/copy-data-activity/choose-copy-file-or-folder.png" alt-text="Screenshot showing where to select the data to be copied." lightbox="media/copy-data-activity/choose-copy-file-or-folder.png":::

### Configure your destination

1. Select a data source type from the category. You'll use Azure Blob Storage as an example. You can either create a new connection that links to a new Azure Blob Storage account by following the steps in the previous section or use an existing connection from the connection drop-down list. The **Test connection** and **Edit** capabilities are available for each selected connection.

   :::image type="content" source="media/copy-data-activity/choose-destination.png" alt-text="Screenshot showing how to select Azure Blob Storage." lightbox="media/copy-data-activity/choose-destination.png":::

1. Configure and map your source data to your destination. Then select **Next** to finish your destination configurations.

   :::image type="content" source="media/copy-data-activity/map-to-destination.png" alt-text="Screenshot of Map to destination screen." lightbox="media/copy-data-activity/map-to-destination.png":::

   :::image type="content" source="media/copy-data-activity/connect-to-data-destination.png" alt-text="Screenshot of Connect to data destination." lightbox="media/copy-data-activity/connect-to-data-destination.png":::

   > [!NOTE]
   > You can only use a single on-premises data gateway within the same Copy activity. If both source and sink are on-premises data sources, they need to use the same gateway. To move data between on-premises data sources with different gateways, you need to copy using the first gateway to an intermediate cloud source in one Copy activity. Then you can use another Copy activity to copy it from the intermediate cloud source using the second gateway.

### Review and create your copy activity

1. Review your copy activity settings in the previous steps and select **OK** to finish. Or you can go back to the previous steps to edit your settings if needed in the tool.

   :::image type="content" source="media/copy-data-activity/review-and-create-copy-activity.png" alt-text="Screenshot showing the Review and create screen." lightbox="media/copy-data-activity/review-and-create-copy-activity.png":::

Once finished, the copy activity will then be added to your pipeline canvas. All settings, including advanced settings to this copy activity, are available under the tabs when it’s selected.

:::image type="content" source="media/copy-data-activity/pipeline-with-copy-activity.png" alt-text="Screenshot showing a copy activity on the pipeline canvas." lightbox="media/copy-data-activity/pipeline-with-copy-activity.png":::

Now you can either save your pipeline with this single copy activity or continue to design your pipeline.

## Add a copy activity directly

Follow these steps to add a copy activity directly.

### Add a copy activity

1. Open an existing pipeline or create a new pipeline.
1. Add a copy activity either by selecting **Add pipeline activity** > **Copy activity** or by selecting **Copy data** > **Add to canvas** under the **Activities** tab.

   :::image type="content" source="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png" alt-text="Screenshot showing two ways to add a copy activity." lightbox="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png":::

### Configure your general settings under general tab

To learn how to configure your general settings, see [General](activity-overview.md#general-settings).

### Configure your source under the source tab

1. In **Connection**, select an existing connection, or select **More** to create a new connection.

   :::image type="content" source="media/copy-data-activity/configure-source-connection-in-pipeline-new.png" alt-text="Screenshot showing where to select New." lightbox="media/copy-data-activity/configure-source-connection-in-pipeline-new.png":::

   1. Choose the data source type from the pop-up window. You'll use Azure SQL Database as an example. Select **Azure SQL Database**, and then select **Continue**.

      :::image type="content" source="media/copy-data-activity/choose-azure-sql-database-connection-in-pipeline.png" alt-text="Screenshot showing how to select the data source." lightbox="media/copy-data-activity/choose-azure-sql-database-connection-in-pipeline.png":::

   1. It navigates to the connection creation page. Fill in the required connection information on the panel, and then select **Create**. For the details of connection creation for each type of data source, you can refer to each [connector article](connector-overview.md#supported-connectors-in-fabric).

      :::image type="content" source="media/copy-data-activity/configure-connection-details-new.png" alt-text="Screenshot showing New connection page." lightbox="media/copy-data-activity/configure-connection-details-new.png":::

   1. Once your connection is created, it takes you back to the pipeline page. Then select **Refresh** to get the connection that you created from the drop-down list. You can also choose an existing Azure SQL Database connection from the drop-down directly if you already created it before. The **Test connection** and **Edit** capabilities are available for each selected connection. Then select **Azure SQL Database** in **Connection** type.

1. Specify a table to be copied. Select **Preview data** to preview your source table. You can also use **Query** and **Stored procedure** to read data from your source.

1. Expand **Advanced** for more advanced settings like query timeout, or partitioning. (Advanced settings vary by connector.)

### Configure your destination under the destination tab

1. In **Connection** select an existing connection, or select **More** to create a new connection. It can be either your internal first class data store from your workspace, such as Lakehouse, or your external data stores. In this example, we use Lakehouse.

1. Once your connection is created, it takes you back to the pipeline page. Then select **Refresh** to get the connection that you created from the drop-down list. You can also choose an existing Lakehouse connection from the drop-down directly if you already created it before.

1. Specify a table or set up the file path to define the file or folder as the destination. Here select **Tables** and specify a table to write data.

1. Expand **Advanced** for more advanced settings, like max rows per file, or table action. (Advanced settings vary by connector.)

Now you can either save your pipeline with this copy activity or continue to design your pipeline.

### Configure your mappings under mapping tab

If the connector that you use supports mapping, you can go to **Mapping** tab to configure your mapping.

1. Select **Import schemas** to import your data schema.

   :::image type="content" source="media/copy-data-activity/configure-mapping-in-pipeline.png" alt-text="Screenshot of mapping settings 1." lightbox="media/copy-data-activity/configure-mapping-in-pipeline.png":::

1. You can see the auto mapping shows up. Specify your **Source** column and **Destination** column. If you create a new table in the destination, you can customize your **Destination** column name here. If you want to write data into the existing destination table, you can't modify the existing **Destination** column name. You can also view the **Type** of source and destination columns.

   :::image type="content" source="media/copy-data-activity/configure-mapping-in-pipeline-2.png" alt-text="Screenshot of mapping settings 2." lightbox="media/copy-data-activity/configure-mapping-in-pipeline-2.png":::

You can also select **+ New mapping** to add new mapping, select **Clear** to clear all mapping settings, and select **Reset** to reset all mapping **Source** column.

For more information about data type mapping, see [Data type mapping in a copy activity](data-type-mapping.md).

### Configure your other settings under settings tab

The **Settings** tab contains the settings of performance, staging, and so on.

   :::image type="content" source="media/copy-data-activity/pipeline-settings.png" alt-text="Screenshot of Settings tab." lightbox="media/copy-data-activity/pipeline-settings.png":::

See the following table for the description of each setting.

|Setting  |Description  |JSON script property |
|---------|---------|---------|
|**Intelligent throughput optimization** |Specify to optimize the throughput. You can choose from: <br>• **Auto**<br>• **Standard**<br>• **Balanced**<br>• **Maximum**<br><br> When you choose **Auto**, the optimal setting is dynamically applied based on your source-destination pair and data pattern. You can also customize your throughput, and custom value can be 2-256 while higher value implies more gains.  | dataIntegrationUnits |
|**Degree of copy parallelism** | Specify the degree of parallelism that data loading would use. | parallelCopies |
|**Adaptive performance tuning (Preivew)** | Specify whether the service can apply performance optimizations and tuning according to the custom configuration. | adaptivePerformanceTuning |
|**Data consistency verification** | If you set `true` for this property, when copying binary files, copy activity will check file size, lastModifiedDate, and checksum for each binary file copied from source to destination store to ensure the data consistency between source and destination store. When copying tabular data, copy activity will check the total row count after job completes, ensuring the total number of rows read from the source is same as the number of rows copied to the destination plus the number of incompatible rows that were skipped. Be aware the copy performance is affected by enabling this option. | validateDataConsistency |
|**Fault tolerance** |When you select this option, you can ignore some errors that happen in the middle of copy process. For example, incompatible rows between source and destination store, file being deleted during data movement, etc.  |• enableSkipIncompatibleRow <br> • skipErrorFile: <br>  &nbsp;&nbsp; fileMissing <br>&nbsp;&nbsp; fileForbidden <br> &nbsp;&nbsp; invalidFileName |
|**Enable logging** |When you select this option, you can log copied files, skipped files and rows.| / |
|**Enable staging** | Specify whether to copy data via an interim staging store. Enable staging only for helpful scenarios.| enableStaging |
| *For **Workspace*** |  |  |
|**Workspace**| Specify to use built-in staging storage. Ensure the last modified user for the pipeline has at least Contributor role assigned in the workspace. | / |
| *For **External*** |  |  |
| **Staging account connection** |Specify the connection of an [Azure Blob Storage](connector-azure-blob-storage.md) or [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2.md), which refers to the instance of Storage that you use as an interim staging store. Create a staging connection if you don't have it. | connection (under *`externalReferences`*) |
| **Storage path** | Specify the path that you want to contain the staged data. If you don't provide a path, the service creates a container to store temporary data. Specify a path only if you use Storage with a shared access signature, or you require temporary data to be in a specific location. | path |
| **Enable compression** | Specifies whether data should be compressed before it's copied to the destination. This setting reduces the volume of data being transferred. | enableCompression |
|  |  |  |
| **Preserve** | Specify whether to preserve metadata/ACLs during data copy. | preserve |

>[!NOTE]
> If you use staged copy with compression enabled, the service principal authentication for staging blob connection isn't supported.

> [!NOTE]
> Workspace staging times out after 60 minutes. For long-running jobs, it’s recommended to use external storage for staging.

### Configure parameters in a copy activity

Parameters can be used to control the behavior of a pipeline and its activities. You can use **Add dynamic content** to specify parameters for your copy activity properties. Let's take specifying Lakehouse/Data Warehouse as an example to see how to use it.

1. In your source or destination, select **Use dynamic content** in the drop-down list of **Connection**.
1. In the pop-up **Add dynamic content** pane, under **Parameters** tab, select **+**.

    :::image type="content" source="./media/copy-data-activity/add-dynamic-content-page.png" alt-text="Screenshot showing the Add dynamic content page.":::

1. Specify the name for your parameter and give it a default value if you want, or you can specify the value for the parameter when it is triggered in the pipeline.

    :::image type="content" source="./media/copy-data-activity/new-parameter.png" alt-text="Screenshot shows creating a new parameter.":::

    The parameter value should be Lakehouse/Data Warehouse connection ID. To get it, open your **Manage Connections and Gateways**, choose the Lakehouse/Data Warehouse connection that you want to use, and open **Settings** to get your connection ID. If you want to create a new connection, you can select **+ New** on this page or go to get data page through **Connection** drop-down list.

1. Select **Save** to go back to the **Add dynamic content** pane. Then select your parameter so it appears in the expression box. Then select **OK**. You'll go back to the pipeline page and can see the parameter expression is specified after **Connection**.

    :::image type="content" source="./media/copy-data-activity/select-parameter.png" alt-text="Screenshot showing selecting parameter.":::

1. Specify the ID of your Lakehouse or Data Warehouse. To find the ID, go to your Lakehouse or Data Warehouse in your workspace. The ID appears in the URL after `/lakehouses/` or `/datawarehouses/`.

    - **Lakehouse ID**:

        :::image type="content" source="./media/copy-data-activity/lakehouse-object-id.png" alt-text="Screenshot showing the Lakehouse object ID.":::

    - **Warehouse ID**:

        :::image type="content" source="./media/copy-data-activity/data-warehouse-object-id.png" alt-text="Screenshot showing the Data Warehouse object ID.":::

1. Specify the [SQL connection string for your Data Warehouse](../data-warehouse/how-to-connect.md#find-the-warehouse-connection-string).

## Related content

- [Connector overview](connector-overview.md)
- [How to monitor pipeline runs](monitor-pipeline-runs.md)
