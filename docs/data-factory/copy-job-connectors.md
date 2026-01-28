---
title: Connectors for Copy Job
description: This article covers the supported connectors for Copy Job in Microsoft Fabric, including source, destination, CDC replication, automatic table creation, and truncate on destination capabilities.
author: whhender
ms.author: whhender
ms.reviewer: yexu
ms.topic: how-to
ms.date: 01/05/2025
ms.search.form: copy-job-tutorials 
ms.custom: copy-job
ai-usage: ai-assisted
---

# Connectors for Copy Job

With [Copy job](what-is-copy-job.md), you can move your data between cloud data stores or from on-premises sources that are behind a firewall or inside a virtual network using a gateway.

Copy job supports the following functionalities:

- [Copy sources and destinations](#copy-job-sources-and-destinations)
- [Change data capture (CDC) replication (Preview)](#cdc-replication-preview)
- [Automatic table creation and truncate on destination](#automatic-table-creation-and-truncate-on-destination)

## Copy job sources and destinations

The following table shows which connectors are supported as sources and destinations in Copy job, and whether they support different read and write modes.

- **Read - Full load**: Read the entire data from the source.
- **Read - Incremental load (watermark based)**: Read only the changed data from the source using a watermark column.
- **Write - Append**: Add new data to the destination without affecting existing data.
- **Write - Override**: Replace existing data in the destination with new data.
- **Write - Merge**: Combine new data with existing data in the destination based on a specified key.

For more information about each of these modes, see [the copy job overview](what-is-copy-job.md).

[!INCLUDE [copy-job-source-destination-connectors](includes/copy-job-source-destination-connectors.md)]

## CDC Replication (Preview)

Change data capture (CDC) in Copy job enables automated replication of changed data (including inserted, updated, and deleted records) from a source to a destination. This table outlines the connectors that support CDC replication in Copy job, including their capabilities for reading and writing CDC data.

For more information about using CDC replication in Copy job, see [Change data capture in Copy job](cdc-copy-job.md).

[!INCLUDE [copy-job-cdc-replication-connectors](includes/copy-job-cdc-replication-connectors.md)]

## Automatic table creation and truncate on destination

Copy job can automatically create tables in the destination if they don’t already exist. You can also optionally truncate destination data before the full load, ensuring their source and destination are fully synchronized without duplicates. This table outlines the connectors that support automatic table creation and truncate on destination in Copy job.

For more information about these features, see [the copy job overview](what-is-copy-job.md).

[!INCLUDE [copy-job-auto-table-creation-truncate-connectors](includes/copy-job-auto-table-creation-truncate-connectors.md)]

## Related content

- [How to create a Copy job](create-copy-job.md)
- [How to monitor a Copy job](monitor-copy-job.md)
- [What is a Copy job?](what-is-copy-job.md)