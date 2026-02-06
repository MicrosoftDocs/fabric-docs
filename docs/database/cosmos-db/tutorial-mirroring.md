---
title: "Tutorial: Query Fabric Mirrored Databases From Cosmos DB"
description: Learn how to query Microsoft Fabric mirrored databases from Cosmos DB in this tutorial. Follow step-by-step instructions to get started.
author: seesharprun
ms.author: sidandrews
ms.topic: tutorial
ms.date: 10/22/2025
ai-usage: ai-generated
---

# Tutorial: Query a mirrored database from Cosmos DB in Microsoft Fabric

In this tutorial, you query a Fabric mirrored database from an existing Cosmos DB in Fabric database. You learn how to enable mirroring on your database, verify the mirroring status, and then use both the source and mirrored data for analytics.

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

## Configure your Cosmos DB in Fabric database

First, ensure that your Cosmos DB in Fabric database is properly configured and contains data for mirroring.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

    > [!IMPORTANT]
    > For this tutorial, the existing Cosmos DB database should have the [sample data set](sample-data.md) already loaded. The remaining steps in this tutorial assume that you're using the same data set for this database.

1. Verify that your database contains at least one container with data. Do this verification by expanding the container in the navigation pane and observing that items exist.

1. In the menu bar, select **Settings** to access the database configuration.

1. In the **Settings** dialog, navigate to the **Mirroring** section to verify that mirroring is enabled for this database.

    > [!NOTE]
    > Mirroring is automatically enabled for all Cosmos DB databases in Fabric. This feature doesn't require any extra configuration and ensures that your data is always analytics-ready in OneLake.

## Connect to the source database

Next, confirm that you can connect to and query the source Cosmos DB database directly.

1. Navigate back to your existing Cosmos DB database in the Fabric portal.

1. Select and expand your existing container to view its contents.

1. Select **Items** to browse the data directly in the database.

1. Verify that you can see the items in your container. For example, if using the sample data set, you should see items with properties like `name`, `category`, and `countryOfOrigin`.

1. Select **New query** from the menu to open the NoSQL query editor.

1. Run a test query to verify connectivity and data availability:

    ```sql
    SELECT COUNT(1) AS itemCount FROM container
    ```

    This query should return the total number of items in your container.

## Connect to the mirrored database

Now, access the mirrored version of your database through the SQL analytics endpoint to query the same data using T-SQL.

1. In the menu bar, select the **Cosmos DB** list and then select **SQL analytics endpoint** to switch to the mirrored database view.

1. Verify that your container appears as a table in the SQL analytics endpoint. The table should have the same name as your container.

1. Select **New SQL query** from the menu to open the T-SQL query editor.

1. Run a test query to verify that mirroring is working correctly:

    ```sql
    SELECT COUNT(*) AS itemCount FROM [dbo].[SampleData]
    ```

    > [!NOTE]
    > Replace `[SampleData]` with the name of your container if you're not using the sample data set.

1. The query should return the same count as your NoSQL query, confirming that mirroring is successfully replicating your data.

[!INCLUDE[Cosmos DB Mirroring Tutorial](../../mirroring/cosmos-db/includes/mirroring-tutorial.md)]

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Mirror OneLake in Cosmos DB database in Microsoft Fabric](mirror-onelake.md)
- [Access mirrored Cosmos DB data from Lakehouse in Microsoft Fabric](how-to-access-data-lakehouse.md)
- [Query cross-database data in Cosmos DB in Microsoft Fabric](how-to-query-cross-database.md)
