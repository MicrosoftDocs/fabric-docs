---
title: Azure SQL Database CDC connector for Fabric event streams
description: This include file has the common content for configuring an Azure SQL Database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 04/22/2024
---

1. On the **Select a data source** screen, select **Azure SQL DB (CDC)**.

   ![A screenshot of selecting Azure SQL DB (CDC).](media/azure-sql-database-cdc-source-connector/select-external-source.png)

1. On the **Connect** screen, enter the following **Connection settings** for your Azure SQL database:

   - **Server:** Enter the Azure SQL server name from the Azure portal.
   - **Database:** Enter the Azure SQL database name from the Azure portal.

   ![A screenshot of the Connect screen.](media/azure-sql-database-cdc-source-connector/connect.png)

1. Scroll down, and enter the **Connection credentials** and **Table(s)** for your Azure SQL database.

   - **Connection name**: Automatically generated, or you can enter a new name.
   - **Authentication kind:** Currently, Fabric event streams only supports **Basic** authentication.
   - **Username** and **Password**: Enter the username and password for the database.
   - **Table(s)**: Enter the table name for the new source. The table name should be the full name, for example `dbo.demotable`.

1. Select **Connect**.

   ![A screenshot showing the second half of the Connect screen and the Connect button.](media/azure-sql-database-cdc-source-connector/select-connect.png)

1. Select **Next**. On the **Review and create** screen, review the summary, and then select **Add**.

