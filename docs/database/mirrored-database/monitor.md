---
title: "Monitor mirrored database replication"
description: Learn about monitoring mirrored database replication in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, maprycem, cynotebo
ms.service: fabric
ms.date: 03/13/2024
ms.topic: conceptual
---
# Monitor Fabric mirrored database replication

Once mirroring is configured, visit the **Monitor replication** page to monitor the current state of replication.

The **Monitor replication** pane shows you the current state of the source database replication, with the corresponding statuses of the tables, total rows replicated, and last refresh date/time as well.

:::image type="content" source="media/monitor/monitor-azure-cosmos-db.png" alt-text="Screenshot from the Fabric portal of the Monitor mirror database pane. The status of the source replication and all tables show Running.":::

## Status

The following are the possible statuses for the replication:

| **Monitor** | **Status** |
|:--|:--|
| Database level | **Running**: Replication is currently running bringing snapshot and change data into OneLake.<br/>**Running with warning**: Replication is running, with transient errors.</br>**Stopping/Stopped**: Replication has stopped.<br/>**Error**: Fatal error in replication that can't be recovered.|
| Table level | **Running**: Data is replicating.<br/>**Running with warning**: Warning of nonfatal error with replication of the data from the table.</br>**Stopping/Stopped**: Replication has stopped.<br/>**Error**: Fatal error in replication for that table.|

## Related content

- [Troubleshoot Fabric mirrored databases](troubleshooting.md)
- [What is Mirroring in Fabric?](overview.md)
