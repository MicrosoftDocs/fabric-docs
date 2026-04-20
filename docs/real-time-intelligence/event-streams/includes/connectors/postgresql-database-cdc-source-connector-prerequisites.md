---
title: PostgreSQL CDC connector - prerequisites
description: The include file has the common content for the prerequisites for using a PostgreSQL Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub.
ms.reviewer: zhenxilin
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 04/02/2026
---

The PostgreSQL Database Change Data Capture (CDC) source connector for Microsoft Fabric event streams allows you to capture a snapshot of the current data in a PostgreSQL database. Currently, PostgreSQL Database Change Data Capture (CDC) is supported from the following services where the databases can be accessed publicly: 
- **Azure Database for PostgreSQL**
- **Amazon RDS for PostgreSQL**
- **Amazon Aurora PostgreSQL**
- **Google Cloud SQL for PostgreSQL**

Once the PostgreSQL Database CDC source is added to the eventstream, it captures row-level changes to the specified tables. These changes can then be processed in real-time and sent to different destinations for further analysis.

> [!NOTE]
> With **DeltaFlow (Preview)**, you can transform raw Debezium CDC events into analytics-ready streams that mirror your source table structure. DeltaFlow automates schema registration, destination table management, and schema evolution handling. To use DeltaFlow, choose **Analytics-ready events & auto-updated schema** during the schema handling step. 

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- Registered user access in the PostgreSQL database.
- Your PostgreSQL database should be publicly accessible and not be behind a firewall or secured in a virtual network. If it resides in a protected network, connect to it by using [Eventstream connector virtual network injection](../../streaming-connector-private-network-support-guide.md).
- CDC enabled in the PostgreSQL database and tables.

  If you have Azure Database for PostgreSQL, follow the steps in the next section to enable CDC. For detailed information, see [Logical replication and logical decoding - Azure Database for PostgreSQL - Flexible Server](/azure/postgresql/flexible-server/concepts-logical).

  For other PostgreSQL databases, see [Debezium connector for PostgreSQL :: Debezium Documentation](https://debezium.io/documentation/reference/stable/connectors/postgresql.html#setting-up-postgresql).
- If you don't have an eventstream, [create an eventstream](../../create-manage-an-eventstream.md). 

## Enable CDC in your PostgreSQL Database

This section uses **Azure Database for PostgreSQL** as an example.

To enable CDC in your **Azure Database for PostgreSQL Flexible Server**, follow these steps:

1. On your Azure Database for PostgreSQL Flexible Server page in the Azure portal, select **Server parameters** in the navigation menu.

1. On the **Server parameters** page:

   - Set **wal_level** to **logical**.
   - Update the **max_worker_processes** to at least **16**.

   :::image type="content" border="true" source="media/postgresql-database-cdc-source-connector/enable-cdc-flexible.png" alt-text="A screenshot of enabling CDC for a flexible server deployment.":::

1. Save the changes and restart the server.

1. Confirm that your Azure Database for PostgreSQL Flexible Server instance allows public network traffic.

1. Grant the **admin user** replication permissions by running the following SQL statement. If you want to use other user account to connect your PostgreSQL Database (DB) to fetch CDC, ensure the user is the **table owner**.

   ```sql
   ALTER ROLE <admin_user_or_table_owner_user> WITH REPLICATION;
   ```