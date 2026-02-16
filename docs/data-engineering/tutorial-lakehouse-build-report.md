---
title: Lakehouse tutorial - Create a semantic model and build a report
description: Create a semantic model from your lakehouse data, define table relationships, and build a Power BI report.
ms.reviewer: arali
ms.author: eur
author: eric-urban
ms.topic: tutorial
ms.date: 02/14/2026
ai-usage: ai-assisted
---

# Lakehouse tutorial: Create a semantic model and build a report

In this section of the tutorial, you create a semantic model from your lakehouse data and define the relationships between fact and dimension tables. With the data model in place, you can build Power BI reports.

## Prerequisites

Before you begin, you must complete the previous tutorials in this series:

1. [Create a workspace](tutorial-lakehouse-get-started.md)
1. [Create a lakehouse](tutorial-build-lakehouse.md)
1. [Ingest data into the lakehouse](tutorial-lakehouse-data-ingestion.md)
1. [Prepare and transform the data](tutorial-lakehouse-data-preparation.md)

## Create a semantic model

Power BI is natively integrated in Fabric. When you create a semantic model from a lakehouse, it uses [Direct Lake](../fundamentals/direct-lake-overview.md) mode, which loads data directly from OneLake into memory for fast analysis without importing or duplicating data.

1. In your browser, go to your Fabric workspace in the [Fabric portal](https://app.fabric.microsoft.com/).

1. Select the **wwilakehouse** lakehouse to open it.

1. Select **SQL analytics endpoint** from the **Lakehouse** dropdown menu at the top right of the screen.

   :::image type="content" source="media\tutorial-lakehouse-build-report\load-data-choose-sql-endpoint.png" alt-text="Screenshot showing where to find and select SQL analytics endpoint from the top right dropdown menu." lightbox="media\tutorial-lakehouse-build-report\load-data-choose-sql-endpoint.png":::

    From the SQL analytics endpoint pane, you should be able to see all the tables you created. If you don't see them yet, select the **Refresh** icon at the top left.

1. Select **New semantic model** from the ribbon.

1. In the **New semantic model** dialog box:
   - Enter a name for your semantic model (for example, "WWI Sales Model")
   - Select the workspace to save it in
   - Select all the tables you created in this tutorial series
   - Select **Confirm**

### Troubleshoot missing tables with lakehouse schemas

If you enabled [lakehouse schemas](lakehouse-schemas.md) and get an error like "We can't access the source Delta table" when creating the semantic model, the tables might not be registered in the Spark metastore. To resolve the issue, open a notebook attached to your lakehouse and run the following code to explicitly register the tables:

> [!TIP]
> You can go back to the notebook you used in the [previous tutorial](tutorial-lakehouse-data-preparation.md) and add this code as a new cell instead of creating a new notebook.

```python
tables = ['fact_sale', 'dimension_city', 'dimension_customer', 'dimension_date',
          'dimension_employee', 'dimension_stock_item',
          'aggregate_sale_by_date_city', 'aggregate_sale_by_date_employee']

for table in tables:
    df = spark.read.format("delta").load(f"Tables/{table}")
    df.write.mode("overwrite").option("overwriteSchema", "true").format("delta").saveAsTable(table)
```

After the code runs successfully, go back to the SQL analytics endpoint and create the semantic model again.

## Define table relationships

To create reports that combine data from multiple tables, you define relationships between the fact table and each dimension table. These relationships tell Power BI how to join the tables when building visualizations.

1. Go to your workspace and select the semantic model you created to open it.

1. Select **Open** from the toolbar to open the web modeling experience.

1. In the top right corner, select the dropdown and choose **Editing** to switch to editing mode.

1. From the **fact_sale** table, select and drag the **CityKey** field to the **CityKey** field in the **dimension_city** table to create a relationship. 

   :::image type="content" source="media\tutorial-lakehouse-build-report\drag-drop-tables-relationships.png" alt-text="Screenshot showing drag and drop fields across tables to create relationships." lightbox="media\tutorial-lakehouse-build-report\drag-drop-tables-relationships.png":::

1. The **New relationship** dialog box appears with the following default settings:

   - **From table**: **fact_sale** and the column **CityKey**.
   - **To table**: **dimension_city** and the column **CityKey**.
   - **Cardinality**: **Many to one (\*:1)**.
   - **Cross filter direction**: **Single**.
   - **Make this relationship active**: selected.

   Select the box next to **Assume referential integrity**, and then select **Save**.

   :::image type="content" source="media\tutorial-lakehouse-build-report\create-relationship-dialog.png" alt-text="Screenshot of the New relationship dialog box, showing where to select Assume referential integrity." lightbox="media\tutorial-lakehouse-build-report\create-relationship-dialog.png":::

   > [!NOTE]
   > When defining relationships for this report, make sure **fact_sale** is always the **From table** and the **dimension_\*** table is the **To table**, not vice versa.

1. Repeat the previous steps to create relationships for the remaining dimension tables. For each relationship, select and drag the key column from **fact_sale** to the matching column in the dimension table. Use the same **New relationship** settings as before, including **Assume referential integrity**.

   | **Drag from fact_sale** | **To table** | **To column** |
   |---|---|---|
   | StockItemKey | dimension_stock_item | StockItemKey |
   | SalespersonKey | dimension_employee | EmployeeKey |
   | CustomerKey | dimension_customer | CustomerKey |
   | InvoiceDateKey | dimension_date | Date |

   After you add these relationships, your data model is ready for reporting as shown in the following image:

   :::image type="content" source="media\tutorial-lakehouse-build-report\new-report-relationships.png" alt-text="Screenshot of a New report screen showing multiple table relationships." lightbox="media\tutorial-lakehouse-build-report\new-report-relationships.png":::

## Build a report

With the semantic model and relationships in place, your data model is ready for reporting. From the semantic model, select **New report** in the ribbon to open the Power BI report canvas where you can create visualizations using your data.

To learn more about creating reports, see [Create reports on semantic models in Microsoft Fabric](../data-warehouse/create-reports.md).

## Next step

> [!div class="nextstepaction"]
> [Clean up resources](tutorial-lakehouse-clean-up.md)
