---
title: Use a dataflow to bring data into databricks
description: This article describes how to use a dataflow to write data to adls gen2 and read it from databricks.
ms.topic: tutorial
ms.date: 10/20/2025
ms.reviewer: jeluitwi
ms.custom:
    - dataflows
---

# Use a dataflow to bring data into databricks

In this tutorial, you build a dataflow to move data from a Northwind OData source to an ADLS Gen2 destination, and then read that data in a notebook in Databricks.

## Prerequisites

To get started, you must complete the following prerequisites:

- Make sure you have a [[!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace](../fundamentals/create-workspaces.md) that isn't the default My Workspace.
- Make sure you have a Databricks workspace set up. For more information, see [Create a Databricks workspace in Microsoft Azure](/azure/databricks/getting-started).
- Make sure you have access to an ADLS Gen2 storage account. For more information, see [Create a storage account](/azure/storage/blobs/create-data-lake-storage-account)

## Create a new Dataflow Gen2

To create a new Dataflow Gen2 in your Fabric workspace, follow these steps:

1. In your Fabric workspace, select **New item** > **Dataflow Gen2**.

   :::image type="content" source="media/tutorial-dataflows-gen2-adlsgen2-databricks/create-dataflow-gen2.png" alt-text="Screenshot showing how to create a new Dataflow Gen2 in Fabric workspace.":::

2. When the Dataflow Gen2 canvas opens, you'll see the Power Query editor interface where you can start building your data transformation flow.

## Connect to the Northwind OData source

Next, you'll connect to the Northwind OData source to retrieve sample data:

1. In the Power Query editor, select **Get data** from the ribbon.

2. In the **Choose data source** dialog, search for "OData" and select **OData**.

   :::image type="content" source="media/tutorial-dataflows-gen2-adlsgen2-databricks/select-odata-source.png" alt-text="Screenshot showing the OData feed option in the Choose data source dialog.":::

3. In the **OData** dialog, enter the following URL:

   ```text
   https://services.odata.org/V3/Northwind/Northwind.svc/
   ```

4. Select **OK** to connect to the OData source using an anonymous connection.

5. In the **Navigator** window, you'll see the available tables from the Northwind database. For this tutorial, select the **Customers** and **Orders** tables.

   :::image type="content" source="media/tutorial-dataflows-gen2-adlsgen2-databricks/navigator-northwind-tables.png" alt-text="Screenshot showing the Navigator window with Northwind tables selected.":::

6. Select **Transform data** to proceed to the data transformation phase.

## Transform the data

Now you'll apply some basic transformations to prepare the data:

1. With the **Customers** table selected, you can see a preview of the data. Remove unnecessary columns by selecting the columns you want to keep:
   - CustomerID
   - CompanyName
   - ContactName
   - Country
   - City

2. Right-click on any of the selected columns and choose **Remove Other Columns**.

   :::image type="content" source="media/tutorial-dataflows-gen2-adlsgen2-databricks/remove-other-columns.png" alt-text="Screenshot showing how to remove unnecessary columns from the Customers table.":::

3. Switch to the **Orders** table and keep the following columns:
   - OrderID
   - CustomerID
   - OrderDate
   - ShippedDate
   - Freight

4. Apply the same **Remove Other Columns** operation.

## Configure ADLS Gen2 destination

Now you'll configure the destination to write data to your ADLS Gen2 storage account:

1. Select the **Customers** query in the Queries pane.
2. In the **Data destination** section that appears at the bottom, select **+** to add a new destination.

    :::image type="content" source="media/tutorial-dataflows-gen2-adlsgen2-databricks/add-data-destination.png" alt-text="Screenshot showing how to add a new data destination for the Customers query.":::

3. From the destination options, select **Azure Data Lake Storage Gen2**.

   :::image type="content" source="media/tutorial-dataflows-gen2-adlsgen2-databricks/select-adls-gen2.png" alt-text="Screenshot showing the ADLS Gen2 destination option.":::

4. In the **Connect to data destination** dialog, configure the connection settings:

   **Connection settings:**
   - **URL**: Enter your ADLS Gen2 storage account URL in the format: `https://[storageaccountname].dfs.core.windows.net`
   
   **Connection credentials:**
   - **Connection**: Select **Create new connection** from the dropdown
   - **Connection name**: Enter a descriptive name for this connection (e.g., "ADLS Gen2 Connection")
   - **Data gateway**: Select **(none)** for cloud-based storage
   - **Authentication kind**: Select **Organizational account** to use your Microsoft 365 credentials
   - **Privacy Level**: Select **None** for this tutorial

   > [!NOTE]
   > You'll see your current signed-in account displayed. You can switch accounts if needed by selecting **Switch account**.

   :::image type="content" source="media/tutorial-dataflows-gen2-adlsgen2-databricks/adls-connection-settings.png" alt-text="Screenshot showing the ADLS Gen2 connection settings dialog with organizational account authentication.":::

5. Select **Next** to continue.

6. In the **Choose destination target** dialog, configure the destination settings:

   On the left side, you'll see your storage account structure. Navigate to and select your desired container (e.g., "mydatacontainer").

   On the right side, configure the file settings:
   - **File name**: Enter a name for your file (e.g., "Customers.csv"). The system will show a preview that "A new file will be created in Azure Data Lake Storage Gen2"
   - **File format**: Select **Delimited text** from the dropdown
   - **File origin**: Select **65001: Unicode (UTF-8)** for proper character encoding
   - **Delimiter**: Select **Comma** as the field separator

   :::image type="content" source="media/tutorial-dataflows-gen2-adlsgen2-databricks/destination-settings.png" alt-text="Screenshot showing the destination target settings for ADLS Gen2 with file configuration options.":::

7. Select **Next** to proceed to the destination settings configuration.

8. In the **Choose destination settings** dialog, review the column mapping and settings. You can keep all the default settings for this tutorial.

   :::image type="content" source="media/tutorial-dataflows-gen2-adlsgen2-databricks/choose-destination-settings.png" alt-text="Screenshot showing the Choose destination settings dialog with column mapping and staging options.":::

9. Select **Save settings** to confirm the destination configuration.

10. Repeat steps 1-9 for the **Orders** query, using a similar file name like "Orders.csv".

## Save and run the dataflow

1. Select **Save and run** from the ribbon to save and execute your dataflow immediately.

   :::image type="content" source="media/tutorial-dataflows-gen2-adlsgen2-databricks/save-and-run-dataflow.png" alt-text="Screenshot showing the Save and run button in the dataflow editor.":::

2. Monitor the execution status. Once completed, your data will be available in the ADLS Gen2 storage account as CSV files.

## Set up Databricks notebook

Now you'll create a Databricks notebook to read the data from ADLS Gen2:

### Create a new notebook in Databricks

1. In your Databricks workspace, select **Create** > **Notebook**.

2. Give your notebook a name, such as "Northwind-Data-Analysis", and select **Python** as the language.

### Configure ADLS Gen2 connection

1. In the first cell of your notebook, add the following code to configure the connection to your ADLS Gen2 account:

   ```python
   # Configure ADLS Gen2 connection
   storage_account_name = "your_storage_account_name"
   storage_account_key = "your_storage_account_key"
   container_name = "mydatacontainer"  # Use the same container name you configured in the dataflow
   
   spark.conf.set(
       f"fs.azure.account.key.{storage_account_name}.dfs.core.windows.net",
       storage_account_key
   )
   ```

   > [!IMPORTANT]
   > Replace `your_storage_account_name` and `your_storage_account_key` with your actual ADLS Gen2 credentials. For production environments, consider using Azure Key Vault or other secure credential management methods.

2. Run the cell by pressing **Shift + Enter**.

### Read the CSV files

> [!NOTE]
> The file paths in the examples below assume your files are stored directly in the container root. Adjust the paths according to how you configured your destinations in the dataflow. For example, if you specified a folder structure or different file names during the destination setup, update the paths accordingly.

1. In a new cell, add code to read the Customers data:

   ```python
   # Read Customers data
   customers_path = f"abfss://{container_name}@{storage_account_name}.dfs.core.windows.net/Customers.csv"
   
   customers_df = spark.read.format("csv") \
       .option("header", "true") \
       .option("inferSchema", "true") \
       .load(customers_path)
   
   # Display the data
   customers_df.show(10)
   ```

2. In another cell, read the Orders data:

   ```python
   # Read Orders data
   orders_path = f"abfss://{container_name}@{storage_account_name}.dfs.core.windows.net/Orders.csv"
   
   orders_df = spark.read.format("csv") \
       .option("header", "true") \
       .option("inferSchema", "true") \
       .load(orders_path)
   
   # Display the data
   orders_df.show(10)
   ```

## Verify the solution

To verify that everything is working correctly:

1. **Check ADLS Gen2**: Navigate to your storage account in the Azure portal and verify that the CSV files are present in the specified containers and folders.

2. **Monitor Dataflow**: In your Fabric workspace, check the dataflow refresh history to ensure successful execution.

3. **Validate Data in Databricks**: Run the notebook cells and verify that data is being read correctly from ADLS Gen2.

## Clean up resources

When you're finished with this tutorial, you can delete the resources to avoid incurring additional charges:

- Delete the Dataflow Gen2 from your Fabric workspace
- Remove the CSV files from your ADLS Gen2 storage account
- Delete the Databricks notebook

## Related content

This tutorial showed you how to use a Dataflow Gen2 to extract data from an OData source, load it into ADLS Gen2, and analyze it in Databricks. You learned how to:

> [!div class="checklist"]
> - Create a Dataflow Gen2 in Microsoft Fabric
> - Connect to an OData source (Northwind database)
> - Transform and clean data using Power Query
> - Configure ADLS Gen2 as a destination for CSV files
> - Set up a Databricks notebook with ADLS Gen2 connectivity
> - Read and analyze data from ADLS Gen2 in Databricks

Next, advance to learn more about monitoring your dataflow runs and building more complex data pipelines.

> [!div class="nextstepaction"]
> [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
