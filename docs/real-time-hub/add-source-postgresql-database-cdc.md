---
title: Add PostgreSQL Database CDC as source in Real-Time hub
description: This article describes how to add PostgreSQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub. 
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 04/03/2024
---

# Add PostgreSQL Database CDC as source in Real-Time hub
This article describes how to add PostgreSQL Database Change Data Capture (CDC) as an event source in Fabric Real-Time hub. 

The PostgreSQL Database Change Data Capture (CDC) source connector for Microsoft Fabric event streams allows you to capture a snapshot of the current data in a PostgreSQL database. The connector then monitors and records any future row-level changes to this data. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- Registered user access in the PostgreSQL database.
- CDC enabled in the PostgreSQL database.

  If you have Azure Database for PostgreSQL, follow the steps in the next section to enable CDC. For detailed information, see [Logical replication and logical decoding - Azure Database for PostgreSQL - Flexible Server](/azure/postgresql/flexible-server/concepts-logical).

  For other PostgreSQL databases, see [Debezium connector for PostgreSQL :: Debezium Documentation](https://debezium.io/documentation/reference/stable/connectors/postgresql.html#setting-up-postgresql).

>[!NOTE]
>Multiple tables CDC isn't supported.


[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Add Azure Database for PostgreSQL CDC as a source

[!INCLUDE [postgresql-database-cdc-source-connector](../real-time-intelligence/event-streams/includes/postgresql-database-cdc-source-connector.md)]