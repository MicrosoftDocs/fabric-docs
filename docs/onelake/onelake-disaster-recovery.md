---
title: OneLake Disaster Recovery and Data Protection
description: Information on how to plan for disaster recovery and ensure OneLake data protection in Microsoft Fabric.
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom:
ms.date: 11/15/2023
#customer intent: As a OneLake user, I want to understand disaster recovery and data protection options so that I can ensure the safety and availability of my data.
---

# Disaster recovery and data protection for OneLake

All data in OneLake is accessed through data items. These data items can reside in different regions depending on their workspace, as a workspace is created under a capacity tied to a specific region.

OneLake utilizes zone-redundant storage (ZRS) where available (see [Azure regions with availability zones](/azure/reliability/availability-zones-service-support#azure-regions-with-availability-zone-support)) and locally redundant storage (LRS) elsewhere. With both LRS and ZRS storage, your data is resilient to transient hardware failures within a data center. Just like for [Azure Storage](/azure/storage/common/storage-redundancy), LRS replicates data within a single data center in the primary region, providing at least 99.999999999% (11 nines) durability of objects over a given year. This protects against server rack and drive failures but not against data center disasters. Meanwhile, ZRS provides fault tolerance to data center failures by copying data synchronously across three Azure availability zones in the primary region, offering durability of at least 99.9999999999% (12 nines) over a given year.

This article provides guidance on how to further protect your data from rare region-wide outages.

## Disaster recovery

You can enable or disable Business Continuity and Disaster Recovery (BCDR) for a specific capacity through the Capacity Admin Portal. If your capacity has BCDR activated, your data is duplicated and stored in two different geographic regions, making it geo-redundant. The choice of the secondary region is determined by Azure's standard region pairings and can't be modified.

If a disaster makes the primary region unrecoverable, OneLake may initiate a regional failover. Once the failover completes, you can use OneLake's APIs through the [global endpoint](onelake-access-api.md) to access your data in the secondary region. Data replication to the secondary region is asynchronous, so any data not copied during the disaster is lost. After a failover, the new primary data center will have local redundancy only.

For a comprehensive understanding of the end-to-end experience, see [Fabric BCDR](/azure/reliability/reliability-fabric).

## Soft delete for OneLake files

OneLake soft delete prevents accidental file loss by retaining deleted files for 7 days before permanent removal. Soft-deleted data is billed at the same rate as active data.

You can restore files and folders using Blob REST APIs, Azure Storage SDKs, and the PowerShell Az.Storage module. Learn how to list and undelete files using these [PowerShell instructions](/azure/storage/blobs/soft-delete-blob-manage#restore-soft-deleted-blobs-and-directories-by-using-powershell) and how to connect to [OneLake with PowerShell](../onelake/onelake-powershell.md#connect-to-onelake-with-azure-powershell).

### Restore soft deleted files via Microsoft Azure Storage Explorer

You can restore deleted Lakehouse files using Microsoft Azure Storage Explorer.  First, [connect to your workspace from Azure Storage Explorer](onelake-azure-storage-explorer.md) using the workspace ID in the URL. For example, `https://onelake.dfs.fabric.microsoft.com/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb`.  You can find the workspace ID from the Fabric portal browser URL ('/groups/{workspaceID}). Ensure you use the GUID-based OneLake path to undelete data.


After connecting to your workspace, follow these steps to restore soft-deleted data:
1. Select the dropdown button next to the path bar and select **Active and soft deleted blobs** instead of the default "Active Blobs."
1. Navigate to the folder containing the soft-deleted file.

1. Right click the file and select 'undelete'.

## Related content

- [OneLake compute and storage consumption](onelake-consumption.md)
