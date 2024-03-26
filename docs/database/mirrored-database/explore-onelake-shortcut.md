---
title: "Explore data in your mirrored database with notebooks"
description: Learn how to access your mirrored database from Lakehouse and Spark queries in Notebooks.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, chweb, anithaa
ms.date: 03/13/2024
ms.service: fabric
ms.topic: how-to
---
# Explore data in your mirrored database with notebooks

You can explore the data replicated from your mirrored database with Spark queries in notebooks.

Notebooks are a powerful code item for you to develop Apache Spark jobs and machine learning experiments on your data. You can use notebooks in the Fabric Lakehouse to explore your mirrored tables.

## Prerequisites

- Complete the tutorial to create a mirrored database from your source database.
    - [Tutorial: Create a mirrored database from Azure Cosmos DB](azure-cosmos-db-tutorial.md)
    - [Tutorial: Create a mirrored database from Azure SQL Database](azure-sql-database-tutorial.md)
    - [Tutorial: Create a mirrored database from Snowflake](snowflake-tutorial.md)

## Create a shortcut

You first need to create a shortcut from your mirrored tables into the Lakehouse, and then build notebooks with Spark queries in your Lakehouse.

1. In the Fabric portal, open **Data Engineering**.
1. If you don't have a Lakehouse created already, select **Lakehouse** and create a new Lakehouse by giving it a name.
1. Select **Get Data** -> **New shortcut**.
1. Select **Microsoft OneLake**.
1. You can see all your mirrored databases in the Fabric workspace.
1. Select the mirrored database you want to add to your Lakehouse, as a shortcut.
1. Select desired tables from the mirrored database.
1. Select **Next**, then **Create**.
1. In the **Explorer**, you can now see selected table data in your Lakehouse.
    :::image type="content" source="media/explore-onelake-shortcut/explorer-table-data.png" alt-text="Screenshot from the Fabric portal, showing the Lakehouse Explorer displaying the mirrored database tables and data." lightbox="media/explore-onelake-shortcut/explorer-table-data.png":::

    > [!TIP]
    > You can add other data in Lakehouse directly or bring shortcuts like S3, ADLS Gen2. You can navigate to the **SQL analytics endpoint** of the Lakehouse and join the data across all these sources with mirrored data seamlessly. 

1. To explore this data in Spark, select the `...` dots next to any table. Select **New notebook** or **Existing notebook** to begin analysis.
    :::image type="content" source="media/explore-onelake-shortcut/create-notebook-lakehouse-spark-query.png" alt-text="Screenshot from the Fabric portal showing the context menu to open a mirrored database table in a notebook." lightbox="media/explore-onelake-shortcut/create-notebook-lakehouse-spark-query.png":::

1. The notebook will automatically open and the load the dataframe with a `SELECT ... LIMIT 1000` Spark SQL query.
    - New notebooks can take up to two minutes to load completely. You can avoid this delay by using an existing notebook with an active session.
    :::image type="content" source="media/explore-onelake-shortcut/notebook-lakehouse-spark-query.png" alt-text="Screenshot from the Fabric portal showing data from a mirrored database table in a new notebook with a Spark SQL query." lightbox="media/explore-onelake-shortcut/notebook-lakehouse-spark-query.png":::


## Related content

- [Explore data in your mirrored database using Microsoft Fabric](explore.md)
- [What are shortcuts in lakehouse?](../../data-engineering/lakehouse-shortcuts.md)
- [Explore the data in your lakehouse with a notebook](../../data-engineering/lakehouse-notebook-explore.md)
