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

   ![A screenshot of selecting Azure SQL DB (CDC).](media/amazon-kinesis-data-streams-connector/select-external-source.png)

1. On the **Connect** screen, enter the **Connection settings** and **Connection credentials** for your Azure SQL database.

   ![A screenshot of the Connect screen.](media/amazon-kinesis-data-streams-connector/connect.png)

   - **Server:** Enter the Azure SQL server name from the Azure portal.
   - **Database:** Enter the Azure SQL database name from the Azure portal.
   - **Authentication kind:** Currently, Fabric event streams only supports **Basic** authentication.
   - **Username** and **Password**: Enter the username and password for the database.
   - **Table(s)**: Enter the table name for the new source. The table name should be the full name, for example `dbo.demotable`.

1. Select **Connect**.

   ![A screenshot showing the second half of the Connect screen and the Connect button.](media/amazon-kinesis-data-streams-connector/select-connect.png)

1. Select **Next**. On the **Review and create** screen, review the summary and then select **Add**. You can see the Azure SQL DB (CDC) source added to your eventstream in the editor.

>[!NOTE]
>- Mirroring shouldn't be enabled in your database.
>- Multiple tables CDC isn't supported.

