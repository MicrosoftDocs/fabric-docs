---
title: "Data Warehouse Tutorial: Ingest Data into a Warehouse"
description: "In this tutorial, learn how to ingest data from Microsoft Azure Storage into a Warehouse to create tables."
ms.reviewer: jovanpop, procha, salilkanade
ms.date: 09/14/2026
ms.topic: tutorial
ms.custom: sfi-image-nochange
---

# Tutorial: Ingest data into a Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In this tutorial, you learn how to ingest sample data into a Warehouse by using a **Copy job** or **T-SQL scripts**. You create a table from a sample data file and populate it with sample data.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse](tutorial-create-warehouse.md)

## Ingest data

In this task, learn how to ingest data into the warehouse to create tables by using a Data Factory copy job or T-SQL.

Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

# [Copy job](#tab/copy-job)

1. In the workspace landing pane, select **+ New Item** to display the full list of available item types.

1. From the list, in the **Get data** section, select the **Copy job** item type.

1. In the **New copy job** window, in the **Name** box, enter `Load Customer Data`.

1. Select **Create**. Provisioning is complete when the **Copy job** page opens.

1. On the first page of the **Copy job** window, you can pick from various data sources, or select from one of the provided samples to get started. For this tutorial, select **Sample data** from the menu bar on this page. For this tutorial, we use the **Retail Data Model from Wide World Importers** sample. Select this option to navigate to the next page

   :::image type="content" source="media/tutorial-ingest-data/sample-data-retail-data-model.png" alt-text="Screenshot from the Fabric portal of the Sample Data page. The Retail Data model is selected.":::

1. The data preview of the sample data loads. In the **Choose data** page, you can preview the selected dataset. After you review the data, select **Next**.

1. The **Choose data destination** page allows you to configure the type of item. In the **OneLake catalog**, select your `Wide World Importers` warehouse created in the previous tutorial step, and select **Next**.

1. The **Choose copy job mode** page allows you to configure how you want the data to be copied: a full copy, or incremental copies that perform only subsequent copies when the source data changes. For this example, pick **Full copy** and select **Next**. 

1. The last step to configure the destination is to provide a name to the destination table and configure the column mappings. You can load the data to a new table or to an existing one, provide a schema and table names, change column names, remove columns, or change their mappings. 

   For this example, provide a new name to the table. Replace the text with a table name of your choice, such as `WWI Tutorial`. 
   
   Select **Next**.
   
1. On the **Review + save** page, review the **Source** and **Destination**. 

   Keep the **Start data transfer immediately** checkbox checked, this will start the copy job as soon as it's ready to run.
   
   Select **Save + Run**.
   
   :::image type="content" source="media/tutorial-ingest-data/copy-data-into-data-warehouse-review-save.png" alt-text="Screenshot from the Fabric portal of the Copy Data Review + Save screen.":::
   
1. The Copy job will be created and the Fabric portal will open the new **Load Customer Data** object design canvas when ready.

1. Use the **Results** tab to monitor the execution of the Copy job. 

1. When complete, the **Copy job** will deliver a **Succeeded** notification and status. You'll now see six new tables from the Wide World Importers dataset in your warehouse.

# [T-SQL](#tab/tsql)

1. In the `Wide World Importers` warehouse, on the **Home** ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-clone-table/ribbon-new-sql-query.png" alt-text="Screenshot of the New SQL query option on the ribbon." lightbox="media/tutorial-clone-table/ribbon-new-sql-query.png":::

1. In the query editor, paste the following code. The code creates a `fact_sale` table.

   ```sql
    CREATE TABLE dbo.fact_sale (
      SaleKey bigint,
      CityKey int,
      CustomerKey int,
      BillToCustomerKey int,
      StockItemKey int,
      InvoiceDateKey datetime2(6),
      DeliveryDateKey datetime2(6),
      SalespersonKey int,
      WWIInvoiceID int,
      Description varchar(max),
      Package varchar(100),
      Quantity int,
      UnitPrice numeric(18,2),
      TaxRate numeric(18,3),
      TotalExcludingTax numeric(18,2),
      TaxAmount numeric(18,2),
      Profit numeric(18,2),
      TotalIncludingTax numeric(18,2),
      TotalDryItems int,
      TotalChillerItems int,
      LineageKey int
   )
   ```

1. To execute the query, on the query designer ribbon, select **Run**.

   :::image type="content" source="media/tutorial-clone-table/run-to-execute.png" alt-text="Screenshot of the Run option on the query editor ribbon.":::

1. In the query editor, replace the previous code with the following code. The code loads the source files into the `fact_sale` table.

   ```sql
   COPY INTO dbo.fact_sale
   FROM 'https://fabrictutorialdata.dfs.core.windows.net/sampledata/WideWorldImportersDW/parquet/full/fact_sale'
   WITH ( FILE_TYPE = 'PARQUET' );
   ```

1. Run the query and verify that the import is finished.

1. In the query editor, paste the following code. The code automatically creates a `dimension_city` table directly from the source files.

   ```sql
   CREATE TABLE dbo.dimension_city AS
   SELECT *
   FROM OPENROWSET(BULK 'https://fabrictutorialdata.dfs.core.windows.net/sampledata/WideWorldImportersDW/parquet/full/dimension_city/*.parquet');
   ```

1. Run the query and verify that the `dimension_city` table is created.

---

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Clone a table with T-SQL in a Warehouse](tutorial-clone-table.md)

## Related content

- [Create tables in the Warehouse in Microsoft Fabric](create-table.md)
- [Ingest data in the warehouse](ingest-data-into-table.md)
- [Ingest data into your Warehouse using the COPY statement](ingest-data-copy.md)
- [Ingest data into your Warehouse using Transact-SQL](ingest-data-tsql.md)
