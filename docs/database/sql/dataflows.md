---
title: "Load data with Dataflow Gen2 into SQL database"
description: Learn how to load data into a SQL database with Dataflow Gen2 in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy
ms.date: 11/06/2024
ms.topic: how-to
ms.search.form: Ingesting data into SQL database
---
# Load data with Dataflow Gen2 into SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Fabric Dataflow Gen2 allows you to transform data while moving it. This article is a quick orientation for using dataflows with SQL database in Fabric, one of several options to copy data from source to source. For comparison of options, see [Microsoft Fabric decision guide: copy activity, dataflow, or Spark](../../fundamentals/decision-guide-pipeline-dataflow-spark.md).

Fabric Dataflow Gen2 supports many configurations and options, including scheduling, this article's example is simplified to get you started with a simple data copy.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- [Create a new workspace](../../fundamentals/workspaces.md) or use an existing Fabric workspace.
- [Create a new SQL database](create.md) or use an existing SQL database.
- Load the [AdventureWorks sample data](load-adventureworks-sample-data.md) in a new SQL database, or use your own sample data.

## Get started with Fabric Dataflow Gen2

1. Open your workspace. Select **+ New Item**.
1. Select **Data Flow Gen 2** from the menu.
1. Once the new Data Flow opens, select **Get Data**. You can also select the down arrow on **Get data** and then **More**.
1. Pick your Fabric SQL database from the **OneLake** list. It will be the source of this Data Flow.
1. Pick a table by checking the box next to it.
1. Select **Create**.
1. You now have most of your data flow configured. There are many different configurations you can do from here to get the movement of data setup to meet your needs.
1. Next, we need to configure a destination. Select the plus button (**+**) next to **Data destination**.
   :::image type="content" source="media/dataflows/add-data-destination.png" alt-text="Screenshot of the Data destination plus button to Add a data destination in Fabric Dataflow Gen2.":::
1. Select **SQL database**. 
1. Select **Next**. If **Next** isn't enabled, select **Sign-in** to reauthenticate.
1. Select your destination target.
    1. Leave the **New Table** button selected.
    1. Select a SQL database name in the object listing as the destination to copy the table.
    1. Give your new table a name.
   :::image type="content" source="media/dataflows/choose-destination-target.png" alt-text="Screenshot of the Choose destination target window from the Fabric portal." lightbox="media/dataflows/choose-destination-target.png":::
1. Select **Next**.
1. Review the settings and options available. Use **Automatic Settings**.
1. Select **Next**. You now have a complete data flow.
1. Select **Publish**. When the Data Flow publishes, it refreshes the data. That means as soon as the data flow is published you'll see it refreshing. Once it finishes refreshing, you'll see your new table in your database.

## Related content

- [Quickstart: Create your first dataflow to get and transform data](../../data-factory/create-first-dataflow-gen2.md)
