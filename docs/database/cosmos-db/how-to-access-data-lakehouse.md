---
title: Access Mirrored Cosmos DB Database Data From Lakehouse
titleSuffix: Microsoft Fabric
description: Learn how to use a lakehouse and notebook in Microsoft Fabric to query mirrored Cosmos DB data with Spark and Python for advanced analytics.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/29/2025
appliesto:
- ✅ Cosmos DB in Fabric
---

# Access mirrored Cosmos DB data from Lakehouse in Microsoft Fabric

Microsoft Fabric Lakehouse is a data architecture platform for storing, managing, and analyzing structured and unstructured data in a single location. In this guide, you access your mirrored Cosmos DB in Microsoft Fabric data in a lakehouse. You then use a notebook to perform a basic query of that date.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

## Open the SQL analytics endpoint for the database

Start by accessing the SQL analytics endpoint for the Cosmos DB in Fabric database to ensure that mirroring ran successfully at least once.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

    > [!IMPORTANT]
    > For this guide, the existing Cosmos DB database has the [sample data set](sample-data.md) already loaded. The remaining query examples in this guide assume that you're using the same data set for this database.

1. In the menu bar, select the **Cosmos DB** list and then select **SQL Endpoint**.

    :::image type="content" source="media/how-to-access-data-lakehouse/endpoint-selection.png" lightbox="media/how-to-access-data-lakehouse/endpoint-selection.png" alt-text="Screenshot of the endpoint selection option in the menu bar for a database in Cosmos DB in Fabric.":::

1. Once you're able to successfully navigate to the SQL analytics endpoint, this navigation step confirms that mirroring ran successfully at least once.

## Connect database to a lakehouse

Next, use Lakehouse to extend the number of tools you can use to analyze your Cosmos DB data. In this step, create a lakehouse and connect it to your mirrored data.

1. Navigate to the Fabric portal home page.

1. Select the **Create** option.

    :::image type="content" source="media/how-to-access-data-lakehouse/create-option.png" lightbox="media/how-to-access-data-lakehouse/create-option-full.png" alt-text="Screenshot of the option to 'Create' a new resource in the Fabric portal.":::

1. If the option to create an **Lakehouse** account isn't initially available, select **See all**.

1. Within the **Data Engineering** category, select **Lakehouse**.

    :::image type="content" source="media/how-to-access-data-lakehouse/lakehouse-option.png" lightbox="media/how-to-access-data-lakehouse/lakehouse-option-full.png" alt-text="Screenshot of the option to specifically create a lakehouse in the Fabric portal.":::

1. Give the lakehouse a unique name and then select **Create**.

    :::image type="content" source="media/how-to-access-data-lakehouse/lakehouse-name-dialog.png" lightbox="media/how-to-access-data-lakehouse/lakehouse-name-dialog-full.png" alt-text="Screenshot of the dialog to name a new lakehouse in the Fabric portal.":::

1. In the newly created lakehouse's menu, select the **Get data** option, and then select **New shortcut**.

1. Follow the sequential instructions in the various **New shortcut** dialogs to select your existing mirrored Cosmos DB database, and then select your target table.

    > [!IMPORTANT]
    > This guide assumes that you're selecting the **SampleData** table that's available when you mirror a Cosmos DB database that has the sample data set preloaded.

## Run a Spark query in a notebook

Finally, use Spark within a notebook to write Python queries for your mirrored data that is connected to the lakehouse. For this last step, create a notebook and then run a baseline Spark query using the Transact SQL (T-SQL) language syntax.

1. In the lakehouse menu, select the **Open notebook** category and then select **New notebook**.

1. In the newly created notebook, create a new **PySpark (Python)** cell.

1. Test a SQL query using a combination of the `display` and `spark.sql` functions in **PySpark**. Enter this code into the cell.

    ```python
    display(spark.sql("""
    SELECT countryOfOrigin AS geography, COUNT(*) AS itemCount
    FROM SampleData
    GROUP BY countryOfOrigin
    ORDER BY itemCount DESC
    LIMIT 5
    """))
    ```

    > [!IMPORTANT]
    > This query uses data found in the sample data set. For more information, see [sample data set](sample-data.md).

1. **Run** the notebook cell.

1. Observe the output from running the notebook cell. The results are rendered in tabular format.

    | `geography` | `itemCount` |
    | --- | --- |
    | Nigeria | 21 |
    | Egypt | 20 |
    | France | 18 |
    | Japan | 18 |
    | Argentina | 17 |

    :::image type="content" source="media/how-to-access-data-lakehouse/notebook-run.png" lightbox="media/how-to-access-data-lakehouse/notebook-run-full.png" alt-text="Screenshot of the notebook interface with a single cell and query results in tabular format.":::

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Query data cross-database with Cosmos DB in Microsoft Fabric](how-to-query-cross-database.md)
- [Connect using Microsoft Entra ID to Cosmos DB in Microsoft Fabric](how-to-authenticate.md)
