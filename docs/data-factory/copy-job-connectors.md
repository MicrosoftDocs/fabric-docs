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

[!INCLUDE [copy-job-general-copy-connectors](includes/copy-job-general-copy-connectors.md)]

## CDC Replication (Preview)

[!INCLUDE [copy-job-cdc-replication-connectors](includes/copy-job-cdc-replication-connectors.md)]

## Automatic table creation and truncate on destination

[!INCLUDE [copy-job-auto-table-creation-and-truncate-connectors](includes/copy-job-auto-table-creation-and-truncate-connectors.md)]

## Related content

- [How to create a Copy job](create-copy-job.md)
- [How to monitor a Copy job](monitor-copy-job.md)
- [What is a Copy job?](what-is-copy-job.md)