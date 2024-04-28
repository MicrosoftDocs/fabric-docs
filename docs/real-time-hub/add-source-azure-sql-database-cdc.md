---
title: Add Azure SQL Database CDC as source in Real-Time hub
description: This article describes how to add an Azure SQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub. 
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 04/03/2024
---

# Add Azure SQL Database Change Data Capture (CDC) as source in Real-Time hub
This article describes how to add an Azure SQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub. 

The Azure SQL Database CDC source connector for Microsoft Fabric event streams allows you to capture a snapshot of the current data in an Azure SQL database. The connector then monitors and records any future row-level changes to this data. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- A running Azure SQL server with an Azure SQL database.
- Membership in the **sysadmin** fixed server role for the SQL Server, and **db_owner** role on the database.
- CDC enabled on your Azure SQL database by running the stored procedure `sys.sp_cdc_enable_db`. For details, see [Enable and disable change data capture](/sql/relational-databases/track-changes/enable-and-disable-change-data-capture-sql-server).

>[!NOTE]
>- Mirroring shouldn't be enabled in your database.
>- Multiple tables CDC isn't supported.

## Get events from an Azure SQL Database CDC
You can get events from an Azure SQL Database CDC into Real-Time hub in one of the ways:

- Using the **Get events** experience
- Using the **Microsoft sources** tab

[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

Use instructions from the [Add Azure SQL Database CDC as a source](#add-azure-sql-database-cdc-as-a-source) section. 

## Using the Microsoft sources tab

1. In Real-Time hub, switch to the **Microsoft sources** tab. 
1. In the **Source** drop-down list, select **Azure SQL DB (CDC)**. 
1. For **Subscription**, select an **Azure subscription** that has the resource group with your SQL database. 
1. For **Resource group**, select a **resource group** that has your SQL database.
1. For **Region**, select a location where your SQL database is located. 
1. Now, move the mouse over the name of the SQL database that you want to connect to Real-Time hub in the list of databases, and select the **Connect** button, or select **... (ellipsis)**, and then select the **Connect** button. 

    :::image type="content" source="./media/add-source-azure-sql-database-cdc/microsoft-sources-connect-button.png" alt-text="Screenshot that shows the Microsoft sources tab with filters to show SQL databases and the connect button for a SQL database.":::

    To configure connection information, use steps from the [Add Azure SQL Database CDC as a source](#add-azure-sql-database-cdc-as-a-source) section. Skip the first step of selecting Azure SQL DB (CDC) as a source type in the Get events wizard. 

## Add Azure SQL Database CDC as a source

[!INCLUDE [azure-sql-database-cdc-source-connector](../real-time-intelligence/event-streams/includes/azure-sql-database-cdc-source-connector.md)]