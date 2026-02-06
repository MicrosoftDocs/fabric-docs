---
title: "Monitor mirrored Fabric SQL database replication"
description: Learn about monitoring mirrored Fabric SQL database replication.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: nzagorac
ms.date: 11/06/2024
ms.topic: concept-article
ms.search.form: SQL database replication to OneLake
---
# Monitor Fabric mirrored Fabric SQL database replication

Once mirroring is configured, visit the **Monitor replication** page to monitor the current state of replication.

## Current status

1. Switch to the **Replication** tab on your Fabric SQL database.
1. Select **Monitor replication**.

The **Monitor replication** pane shows you the current state of the source database replication, with the corresponding statuses of the tables, total rows replicated, and last refresh date/time as well.

The following are the possible statuses for the replication:

| **Monitor** | **Status** |
|:--|:--|
| Database level | **Running**: Replication is currently running bringing snapshot and change data into OneLake.<br/>**Running with warning**: Replication is running, with transient errors.</br>**Stopping/Stopped**: Replication has stopped.<br/>**Error**: Fatal error in replication that can't be recovered.|
| Table level | **Running**: Data is replicating.<br/>**Running with warning**: Warning of nonfatal error with replication of the data from the table.</br>**Stopping/Stopped**: Replication has stopped.<br/>**Error**: Fatal error in replication for that table.<br/>**NotSupported**: Replication prevented due to unsupported feature in the table, typically an [unsupported data type](mirroring-limitations.md). |

The **NotSupported** replication status in the **Replication monitor** page contains status information specific to the table.

:::image type="content" source="media/mirroring-monitor/notsupported-replication-status.png" alt-text="Screenshot from the Fabric SQL database Mirroring Replication monitor showing the NotSupported status and the information icons." lightbox="media/mirroring-monitor/notsupported-replication-status.png":::

## Related content

- [Troubleshoot mirroring from Fabric SQL database](mirroring-troubleshooting.md)
