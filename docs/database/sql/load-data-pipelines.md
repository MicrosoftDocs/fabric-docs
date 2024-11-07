---
title: "Ingest data into SQL database via data pipelines"
description: Learn about using data pipelines to ingest data into SQL database in Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: antho, sukkaur
ms.date: 10/07/2024
ms.topic: how-to
ms.search.form:
---
# Ingest data into SQL database in Fabric via data pipelines

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

In this tutorial, you'll create a new pipeline that loads sample data from an Azure SQL Database into a [SQL database in Fabric](overview.md).

A data pipeline is a logical grouping of activities that together perform a data ingestion task. Pipelines allow you to manage extract, transform, and load (ETL) activities instead of managing each one individually.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../get-started/fabric-trial.md).
- Create or use an existing SQL database in Fabric.
    - If you don't have one already, [create a new SQL database in Fabric](create.md).
<!--    - During the current preview, we recommend using a copy of one of your existing databases or any existing test or development database that you can recover quickly from a backup. If you want to use a database from an existing backup, see [Restore a database from a backup in Azure SQL Database](/azure/azure-sql/database/recovery-using-backups). -->
- Create or use an existing Azure SQL Database with data.
    - The source Azure SQL Database can be either a single database or a database in an elastic pool.
    - If you don't have an Azure SQL Database, [create a new single database](/azure/azure-sql/database/single-database-create-quickstart?view=azuresql-db&preserve-view=true&tabs=azure-portal). Use the [Azure SQL Database free offer](/azure/azure-sql/database/free-offer?view=azuresql-db&preserve-view=true) if you haven't already.
- For this walkthrough we rely on opening ports on the source Azure SQL Database using the "Allow Azure services and resources to access this server" setting. For heightened security, consider:
    - Set up a gateway to transfer your data. For more information, see [How to access on-premises data sources in Data Factory](../../data-factory/how-to-access-on-premises-data.md).
- Download and install [SQL Server Management Studio](https://aka.ms/ssms).

## Create destination tables

Fabric SQL database requires that all tables have a primary key. Data pipelines create tables for you but they won't have primary keys, causing them to fail. Instead, we need to load data into an existing table. We can generate the table scripts from within [SQL Server Management Studio (SSMS)](https://aka.ms/ssms).

1. Open SSMS and connect to your source Azure SQL Database within the **Object Explorer**.
1. Right-click on your source database. Select **Generate Scripts...**.
1. In the **Choose objects** page, select only those tables necessary to bring over.
1. In the **Set scripting options** page, generate a T-SQL script of the `CREATE TABLE` statements to **Open in a new query window** in SSMS. Select **Next** and **Finish**.
1. Modify table definitions to avoid unsupported features, such as user-defined data types, computed columns, and unsupported data types. See Limitations.
1. When ready, connect to and execute the script against your SQL database in Fabric.

## Create data pipeline

1. In your workspace, select **+ New**, then **More options**.
1. Under **Data Factory**, select **Data pipeline**.
1. Once the data pipeline is created, under **Start with guidance**, choose **Copy data assistant**.
1. In the **Choose data source** page, select **Azure SQL Database**.
1. Provide authentication for the connection to the source Azure SQL Database.
1. Next, choose **Fabric SQL database connector** as the destination.
1. In a new tab, open the Fabric SQL database that you want to copy data into. Go to the **Settings** tab in your SQL database. Select **Connection strings**. Copy the values for `Data Source` and `Initial Catalog` from the ADO.NET connection string. These will be the **Server** and **Database**, respectively.
1. In the **Choose data destination** page, provide the **Server** and **Database** values for the data pipeline connection settings. Authenticate using your organizational account.
1. Select **Next**.

## Load data

1. On the **Connect to data destination** page, select **Load to existing table** for each table. Verify the mappings for each table. Select **Next**.  
1. Review **Source** and **Destination** details.
1. Check the box next to **Start data transfer immediately**.
1. Select **Save + Run**.
1. In the **Activity runs** pane, you should see all green checkmarks for successful copy activities. If there are any errors, troubleshooting information will be available in the failed row.

## Related content

- [SQL database in Microsoft Fabric](overview.md)
