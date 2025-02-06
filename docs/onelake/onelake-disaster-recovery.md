---
title: OneLake Disaster Recovery and Data Protection
description: Information on how to plan for disaster recovery and ensure OneLake data protection in Microsoft Fabric.
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
#customer intent: As a OneLake user, I want to understand disaster recovery and data protection options so that I can ensure the safety and availability of my data.
---

# Disaster recovery and data protection for OneLake

All data in OneLake is accessed through data items. These data items can reside in different regions depending on their workspace, as a workspace is created under a capacity tied to a specific region.

OneLake utilizes zone-redundant storage (ZRS) where available (see [Azure regions with availability zones](/azure/reliability/availability-zones-service-support#azure-regions-with-availability-zone-support)) and locally redundant storage (LRS) elsewhere. With both LRS and ZRS storage, your data is resilient to transient hardware failures within a data center. With ZRS, your data has fault tolerance to data center failures. This article provides guidance on how to further protect your data from rare region-wide outages.

## Disaster recovery

You can enable or disable Business Continuity and Disaster Recovery (BCDR) for a specific capacity through the Capacity Admin Portal. If your capacity has BCDR activated, your data is duplicated and stored in two different geographic regions, making it geo-redundant. The choice of the secondary region is determined by Azure's standard region pairings and can't be modified.

If a disaster makes the primary region unrecoverable, OneLake may initiate a regional failover. Once the failover completes, you can use OneLake's APIs through the [global endpoint](onelake-access-api.md) to access your data in the secondary region. Data replication to the secondary region is asynchronous, so any data not copied during the disaster is lost. After a failover, the new primary data center will have local redundancy only.

For a comprehensive understanding of the end-to-end experience, see [Fabric BCDR](/azure/reliability/reliability-fabric).

## Soft delete for OneLake files

OneLake soft delete protects individual files from accidental deletion by retaining files for a default retention period before it's permanently deleted. The current default is 7 days. All soft-deleted data is billed at the same rate as active data.

You can restore files and folders using Blob REST APIs, Azure Storage SDKs, and the PowerShell Az.Storage module.  Learn how to list and undelete files using these [PowerShell instructions](/azure/storage/blobs/soft-delete-blob-manage#restore-soft-deleted-blobs-and-directories-by-using-powershell) and how to connect to [OneLake with PowerShell](../onelake/onelake-powershell.md#connect-to-onelake-with-azure-powershell).

### Restore soft deleted files via Microsoft Azure Storage Explorer

You can restore files which were deleted from a Lakehouse by connecting via Microsoft Azure Storage Explorer with the following steps:
1. Download, Install and Open Microsoft Azure Storage Explorer
2. Select `Connect to Azure Storage`
3. Select `ADLS Gen2 or directory`
4. Sign in using OAuth (or your prefered method)
5. Enter connection info: Blob Container or Directory URL: https://onelake.dfs.fabric.microsoft.com/ + your workspace ID.
  e.g. `https://onelake.dfs.fabric.microsoft.com/8ebe7fed-acac-4905-8e5c-027c55521e54`. You can retrieve the workspace ID from thew workspace URL (/groups/{workspaceID}).
6. Connect
7. Click the drop-down to the left of the bar containing the path and select 'Active and soft deleted blobs' instead of the default 'Active Blobs'
8. Navigate to the folder containing the soft-deleted file
9. Right click the file and select 'undelete'

Please note that the Undelete API  will not work using the workspace friendly name as the container name.

## Related content

- [OneLake compute and storage consumption](onelake-consumption.md)
