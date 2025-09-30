---
title: "Load data with pipelines into SQL database"
description: Learn how to load data with pipelines into SQL database in Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: antho, sukkaur, dlevy
ms.date: 01/02/2025
ms.topic: how-to
ms.search.form: Ingesting data into SQL database
---
# Load data with pipelines into SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

In this tutorial, you create a new pipeline that loads sample data from an Azure SQL Database into a [SQL database in Fabric](overview.md).

A pipeline is a logical grouping of activities that together perform a data ingestion task. Pipelines allow you to manage extract, transform, and load (ETL) activities instead of managing each one individually.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Create a new workspace or use an existing Fabric workspace.
- Create or use an existing **SQL database in Fabric**. If you don't have one already, [create a new SQL database in Fabric](create.md).
- Create or use an existing **Azure SQL Database**, with data.
    - The source Azure SQL Database can be either a single database or a database in an elastic pool.
    - If you don't have an Azure SQL Database, [create a new single database](/azure/azure-sql/database/single-database-create-quickstart?view=azuresql-db&preserve-view=true&tabs=azure-portal). Use the [Azure SQL Database free offer](/azure/azure-sql/database/free-offer?view=azuresql-db&preserve-view=true) if you haven't already.
- For this walkthrough, we rely on opening ports on the source Azure SQL Database using the "Allow Azure services and resources to access this server" setting.
   - For heightened security, consider a gateway to transfer your data. For more information, see [How to access on-premises data sources in Data Factory](../../data-factory/how-to-access-on-premises-data.md).

## Create pipeline

1. In your workspace, select **+ New**, then **More options**.
1. Under **Data Factory**, select **Pipeline**.
1. Once the pipeline is created, under **Start with guidance**, choose **Copy data assistant**.
1. In the **Choose data source** page, select **Azure SQL Database**.
1. Provide authentication for the connection to the source Azure SQL Database.
1. For the destination, choose **Fabric SQL database** from the list in the **OneLake catalog**.
1. Select **Next**.

## Load data

1. On the **Connect to data destination** page, select **Load to new table** for each table. Verify the mappings for each table. Select **Next**.  
1. Review **Source** and **Destination** details.
1. Check the box next to **Start data transfer immediately**.
1. Select **Save + Run**.
1. In the **Activity runs** pane, you should see all green checkmarks for successful copy activities. If there are any errors, troubleshooting information is available in the failed row.

## Related content

- [Get started with deployment pipelines integration with SQL database in Microsoft Fabric](deployment-pipelines.md)
- [Ingest sample data and create objects and data](tutorial-ingest-data.md)
- [Set up your SQL database connection in Data Factory (Preview)](../../data-factory/connector-sql-database.md)
- [SQL database connector overview (Preview)](../../data-factory/connector-sql-database-overview.md)
- [Configure SQL database in a copy activity (Preview)](../../data-factory/connector-sql-database-copy-activity.md)
