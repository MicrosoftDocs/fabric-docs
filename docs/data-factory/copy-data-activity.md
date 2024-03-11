---
title: How to copy data using copy activity
description: Learn how to add a copy activity directly or through the copy assistant.
ms.reviewer: DougKlopfenstein
ms.author: jianleishen
author: jianleishen
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# How to copy data using copy activity

In Data Pipeline, you can use the Copy activity to copy data among data stores located in the cloud. 

After you copy the data, you can use other activities to further transform and analyze it. You can also use the Copy activity to publish transformation and analysis results for business intelligence (BI) and application consumption.

To copy data from a source to a destination, the service that runs the Copy activity performs these steps:

1. Reads data from a source data store.
1. Performs serialization/deserialization, compression/decompression, column mapping, and so on. It performs these operations based on the configuration.
1. Writes data to the destination data store.

## Prerequisites

To get started, you must complete the following prerequisites:

- A Microsoft Fabric tenant account with an active subscription. Create an account for free.

- Make sure you have a Microsoft Fabric enabled Workspace.

## Add a copy activity using copy assistant

Follow these steps to set up your copy activity using copy assistant.

### Start with copy assistant

1. Open an existing data pipeline or create a new data pipeline.
1. Select **Copy data** on the canvas to open the **Copy Assistant** tool to get started. Or select **Use copy assistant** from the **Copy data** drop down list under the **Activities** tab on the ribbon.

   :::image type="content" source="media/copy-data-activity/use-copy-assistant.png" alt-text="Screenshot showing options for opening the copy assistant." lightbox="media/copy-data-activity/use-copy-assistant.png":::

### Configure your source

1. Select a data source type from the category. You'll use Azure Blob Storage as an example. Select **Azure Blob Storage** and then select **Next**.

   :::image type="content" source="media/copy-data-activity/choose-data-source.png" alt-text="Screenshot of Choose data source screen." lightbox="media/copy-data-activity/choose-data-source.png":::

   :::image type="content" source="media/copy-data-activity/choose-azure-blob-storage-source.png" alt-text="Screenshot showing where to select the correct data source." lightbox="media/copy-data-activity/choose-azure-blob-storage-source.png":::

2. Create a connection to your data source by selecting **Create new connection**.

   :::image type="content" source="media/copy-data-activity/create-new-azure-blob-storage-connection.png" alt-text="Screenshot showing where to select New connection." lightbox="media/copy-data-activity/create-new-azure-blob-storage-connection.png":::

    After you select **Create new connection**, fill in the required connection information and then select **Next**. For the details of connection creation for each type of data source, you can refer to each [connector article](connector-overview.md#supported-data-stores-in-data-pipeline).

   If you have existing connections, you can select **Existing connection** and select your connection from the drop-down list.

   :::image type="content" source="media/copy-data-activity/existing-connection.png" alt-text="Screenshot showing the existing connection." lightbox="media/copy-data-activity/existing-connection.png":::

3. Choose the file or folder to be copied in this source configuration step, and then select **Next**.

   :::image type="content" source="media/copy-data-activity/choose-copy-file-or-folder.png" alt-text="Screenshot showing where to select the data to be copied." lightbox="media/copy-data-activity/choose-copy-file-or-folder.png":::

### Configure your destination

1. Select a data source type from the category. You'll use Azure Blob Storage as an example. Select **Azure Blob Storage**, and then select **Next**.

   :::image type="content" source="media/copy-data-activity/choose-destination.png" alt-text="Screenshot showing how to select Azure Blob Storage." lightbox="media/copy-data-activity/choose-destination.png":::

2. You can either create a new connection that links to a new Azure Blob Storage account by following the steps in the previous section or use an existing connection from the connection drop-down list. The capabilities of **Test connection** and **Edit** are available to each selected connection.

   :::image type="content" source="media/copy-data-activity/destination-connection-configuration.png" alt-text="Screenshot showing data connection options." lightbox="media/copy-data-activity/destination-connection-configuration.png":::

3. Configure and map your source data to your destination. Then select **Next** to finish your destination configurations.

   :::image type="content" source="media/copy-data-activity/map-to-destination.png" alt-text="Screenshot of Map to destination screen." lightbox="media/copy-data-activity/map-to-destination.png":::

   :::image type="content" source="media/copy-data-activity/connect-to-data-destination.png" alt-text="Screenshot of Connect to data destination." lightbox="media/copy-data-activity/connect-to-data-destination.png":::

### Review and create your copy activity

1. Review your copy activity settings in the previous steps and select **OK** to finish. Or you can go back to the previous steps to edit your settings if needed in the tool.

   :::image type="content" source="media/copy-data-activity/review-and-create-copy-activity.png" alt-text="Screenshot showing the Review and create screen." lightbox="media/copy-data-activity/review-and-create-copy-activity.png":::

Once finished, the copy activity will then be added to your data pipeline canvas. All settings, including advanced settings to this copy activity, are available under the tabs when it’s selected.

:::image type="content" source="media/copy-data-activity/pipeline-with-copy-activity.png" alt-text="Screenshot showing a copy activity on the data pipeline canvas." lightbox="media/copy-data-activity/pipeline-with-copy-activity.png":::

Now you can either save your data pipeline with this single copy activity or continue to design your data pipeline.

## Add a copy activity directly

Follow these steps to add a copy activity directly.

### Add a copy activity

1. Open an existing data pipeline or create a new data pipeline.
1. Add a copy activity either by selecting **Add pipeline activity** > **Copy activity** or by selecting **Copy data** > **Add to canvas** under the **Activities** tab.

   :::image type="content" source="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png" alt-text="Screenshot showing two ways to add a copy activity." lightbox="media/copy-data-activity/add-copy-activity-to-pipeline-canvas.png":::

### Configure your general settings under general tab

To learn how to configure your general settings, see [General](activity-overview.md#general-settings).

### Configure your source under the source tab

1. Select **+ New** beside the **Connection** to create a connection to your data source.

   :::image type="content" source="media/copy-data-activity/configure-source-connection-in-pipeline.png" alt-text="Screenshot showing where to select New." lightbox="media/copy-data-activity/configure-source-connection-in-pipeline.png":::

   1. Choose the data source type from the pop-up window. You'll use Azure SQL Database as an example. Select **Azure SQL Database**, and then select **Continue**.
   
      :::image type="content" source="media/copy-data-activity/choose-azure-sql-database-connection-in-pipeline.png" alt-text="Screenshot showing how to select the data source." lightbox="media/copy-data-activity/choose-azure-sql-database-connection-in-pipeline.png":::

   1. It navigates to the connection creation page. Fill in the required connection information on the panel, and then select **Create**. For the details of connection creation for each type of data source, you can refer to each [connector article](connector-overview.md#supported-data-stores-in-data-pipeline).
   
      :::image type="content" source="media/copy-data-activity/configure-connection-details.png" alt-text="Screenshot showing New connection page." lightbox="media/copy-data-activity/configure-connection-details.png":::

   1. Once your connection is created successfully, it takes you back to the data pipeline page. Then select **Refresh** to fetch the connection that you created from the drop-down list. You could also choose an existing Azure SQL Database connection from the drop-down directly if you already created it before. The capabilities of **Test connection** and **Edit** are available to each selected connection. Then select **Azure SQL Database** in **Connection** type.
   
      :::image type="content" source="media/copy-data-activity/refresh-source-connection-in-pipeline.png" alt-text="Screenshot showing where to refresh your connection." lightbox="media/copy-data-activity/refresh-source-connection-in-pipeline.png":::

1. Specify a table to be copied. Select **Preview data** to preview your source table. You can also use **Query** and **Stored procedure** to read data from your source.

   :::image type="content" source="media/copy-data-activity/specify-source-data.png" alt-text="Screenshot showing source table settings options." lightbox="media/copy-data-activity/specify-source-data.png":::

1. Expand **Advanced** for more advanced settings.

   :::image type="content" source="media/copy-data-activity/advanced-details-in-pipeline.png" alt-text="Screenshot of advanced settings." lightbox="media/copy-data-activity/advanced-details-in-pipeline.png":::

### Configure your destination under the destination tab

1. Choose your destination type. It could be either your internal first class data store from your workspace, such as Lakehouse, or your external data stores. You'll use Lakehouse as an example.

   :::image type="content" source="media/copy-data-activity/configure-destination-connection-in-pipeline.png" alt-text="Screenshot showing where to select destination type." lightbox="media/copy-data-activity/configure-destination-connection-in-pipeline.png":::

2. Choose to use **Lakehouse** in **Workspace data store type**. Select **+ New**, and it navigates you to the Lakehouse creation page. Specify your Lakehouse name and then select **Create**.

   :::image type="content" source="media/copy-data-activity/create-lakehouse.png" alt-text="Screenshot showing Lakehouse creation." lightbox="media/copy-data-activity/create-lakehouse.png":::


3. Once your connection is created successfully, it takes you back to the data pipeline page. Then select **Refresh** to fetch the connection that you created from the drop-down list. You could also choose an existing Lakehouse connection from the drop-down directly if you already created it before.

   :::image type="content" source="media/copy-data-activity/destination-connection-in-pipeline.png" alt-text="Screenshot showing selecting connection." lightbox="media/copy-data-activity/destination-connection-in-pipeline.png":::

1. Specify a table or set up the file path to define the file or folder as the destination. Here select **Tables** and specify a table to write data.

   :::image type="content" source="media/copy-data-activity/configure-destination-file-settings-in-pipeline.png" alt-text="Screenshot showing where to find Table settings." lightbox="media/copy-data-activity/configure-destination-file-settings-in-pipeline.png":::

1. Expand **Advanced** for more advanced settings.

   :::image type="content" source="media/copy-data-activity/configure-destination-file-details-in-pipeline.png" alt-text="Screenshot of Advanced options." lightbox="media/copy-data-activity/configure-destination-file-details-in-pipeline.png":::

Now you can either save your data pipeline with this single copy activity or continue to design your data pipeline.

### Configure your mappings under mapping tab

If the connector that you apply supports mapping, you can go to **Mapping** tab to configure your mapping. 

1. Select **Import schemas** to import your data schema. 

   :::image type="content" source="media/copy-data-activity/configure-mapping-in-pipeline.png" alt-text="Screenshot of mapping settings 1." lightbox="media/copy-data-activity/configure-mapping-in-pipeline.png":::

2. You can see the auto mapping is shown up. Specify your **Source** column and **Destination** column. If you create a new table in the destination, you can customize your **Destination** column name here. If you want to write data into the existing destination table, you can't modify the existing **Destination** column name. You can also view the **Type** of source and destination columns. 

   :::image type="content" source="media/copy-data-activity/configure-mapping-in-pipeline-2.png" alt-text="Screenshot of mapping settings 2." lightbox="media/copy-data-activity/configure-mapping-in-pipeline-2.png":::

Besides, you can select **+ New mapping** to add new mapping, select **Clear** to clear all mapping settings, and select **Reset** to reset all mapping **Source** column.

#### Configure your type conversion

Expand **Type conversion settings** to configure your type conversion if needed. 

   :::image type="content" source="media/copy-data-activity/mapping-type-conversion.png" alt-text="Screenshot of mapping type conversion." lightbox="media/copy-data-activity/mapping-type-conversion.png":::

See the following table for the setting details.

|Setting  |Description  |
|---------|---------|
|**Allow data truncation** |Allow data truncation when converting source data to destination with different type during copy. For example, from decimal to integer, from DatetimeOffset to Datetime.  |
|**Treat boolean as number** | Treat boolean as number. For example, treat true as 1. |
|**DateTime format** |Format string when converting between dates without time zone offset and strings. For example, "yyyy-MM-dd HH:mm:ss.fff". |
|**DateTimeOffset format** | Format string when converting between dates with time zone offset and strings. For example, "yyyy-MM-dd HH:mm:ss.fff zzz".|
|**TimeSpan format**| Format string when converting between time periods and strings. For example, "dd\.hh\:mm\:ss".|
|**Culture**| Culture information to be used when convert types. For example, "en-us", "fr-fr".|


### Configure your other settings under settings tab

The **Settings** tab contains the settings of performance, staging, and so on.

   :::image type="content" source="media/copy-data-activity/pipeline-settings.png" alt-text="Screenshot of Settings tab." lightbox="media/copy-data-activity/pipeline-settings.png":::

See the following table for the description of each setting.

|Setting  |Description  |
|---------|---------|
|**Intelligent throughput optimization** |Specify to optimize the throughput. You can choose from: <br>• **Auto**<br>• **Standard**<br>• **Balanced**<br>• **Maximum**<br> When you choose **Auto**, the optimal setting is dynamically applied based on your source-destination pair and data pattern. You can also customize your throughput, and custom value can be 2-256 while higher value implies more gains.  |
|**Degree of copy parallelism** | Specify the degree of parallelism that data loading would use. |
|**Fault tolerance** |When selecting this option, you can ignore some errors occurred in the middle of copy process. For example, incompatible rows between source and destination store, file being deleted during data movement, etc.  |
|**Enable logging** |When selecting this option, you can log copied files, skipped files and rows|
|**Enable staging** | Specify whether to copy data via an interim staging store. Enable staging only for the beneficial scenarios.|
|**Staging account connection**| When selecting **Enable staging**, specify the connection of an Azure storage data source as an interim staging store. Select **+ New** to create a staging connection if you don't have it.|

### Configure parameters in a copy activity

Parameters can be used to control the behavior of a pipeline and its activities. You can use **Add dynamic content** to specify parameters for your copy activity properties. Let's take specifying Lakehouse/Data Warehouse/KQL Database as an example to see how to use it.

1. In your source or destination, after selecting **Workspace** as data store type and specifing **Lakehouse**/**Data Warehouse**/**KQL Database** as workspace data store type, select **Add dynamic content** in the drop-down list of **Lakehouse** or **Data Warehouse** or **KQL Database**.
1. In the pop-up **Add dynamic content** pane, under **Parameters** tab, select **+**.

    :::image type="content" source="./media/copy-data-activity/add-dynamic-content-page.png" alt-text="Screenshot showing the Add dynamic content page.":::

1. Specify the name for your parameter and give it a default value if you want, or you can specify the value for the parameter after selecting **Run** in the pipeline. 

    :::image type="content" source="./media/copy-data-activity/new-parameter.png" alt-text="Screenshot shows creating a new parameter.":::

    Note that the parameter value should be Lakehouse/Data Warehouse/KQL Database object ID. To get your Lakehouse/Data Warehouse/KQL Database object ID, open your Lakehouse/Data Warehouse/KQL Database in your workspace, and the ID is after `/lakehouses/`or `/datawarehouses/` or `/databases/` in your URL.
    
    - **Lakehouse object ID**:
    
        :::image type="content" source="./media/copy-data-activity/lakehouse-object-id.png" alt-text="Screenshot showing the Lakehouse object ID.":::

    - **Data Warehouse object ID**:
    
        :::image type="content" source="./media/copy-data-activity/data-warehouse-object-id.png" alt-text="Screenshot showing the Data Warehouse object ID.":::

    - **KQL Database object ID**:
    
        :::image type="content" source="./media/copy-data-activity/kql-database-object-id.png" alt-text="Screenshot showing the KQL Database object ID.":::

1. Select **Save** to go back to the **Add dynamic content** pane. Then select your parameter so it appears in the expression box. Then select **OK**. You'll go back to the pipeline page and can see the parameter expression is specified after **Lakehouse object ID**/**Data Warehouse object ID**/**KQL Database object ID**.

    :::image type="content" source="./media/copy-data-activity/select-parameter.png" alt-text="Screenshot showing selecting parameter.":::


## Related content

- [Connector overview](connector-overview.md)
- [How to monitor pipeline runs](monitor-pipeline-runs.md)
