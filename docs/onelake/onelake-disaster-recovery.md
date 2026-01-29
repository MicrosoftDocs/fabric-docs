---
title: OneLake Disaster Recovery and Data Protection
description: Get information on how to plan for disaster recovery and ensure OneLake data protection in Microsoft Fabric.
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom:
ms.date: 11/15/2023
#customer intent: As a OneLake user, I want to understand disaster recovery and data protection options so that I can help ensure the safety and availability of my data.
---

# Disaster recovery and data protection for OneLake

All data in OneLake is accessed through data items. These data items can reside in different regions depending on their workspace, because a workspace is created under a capacity that's tied to a specific region.

OneLake uses zone-redundant storage (ZRS) where that storage type is available. (See [Azure regions with availability zones](/azure/reliability/availability-zones-service-support#azure-regions-with-availability-zone-support).) Elsewhere, OneLake uses locally redundant storage (LRS). With both LRS and ZRS, your data is resilient to transient hardware failures within a datacenter.

Just like for [Azure Storage](/azure/storage/common/storage-redundancy), LRS replicates data within a single datacenter in the primary region. LRS provides at least 99.999999999% (11 nines) durability of objects over a year. This durability helps protect against server rack and drive failures, but not against datacenter disasters.

Meanwhile, ZRS provides fault tolerance to datacenter failures by copying data synchronously across three Azure availability zones in the primary region. ZRS offers a durability of at least 99.9999999999% (12 nines) over a year.

This article provides guidance on how to further protect your data from rare region-wide outages.

## Disaster recovery

You can enable or disable business continuity and disaster recovery (BCDR) for a specific capacity through the capacity admin portal. If your capacity has BCDR activated, your data is duplicated and stored in two geographic regions so that it's geo-redundant. The standard region pairings in Azure determine the choice of the secondary region. You can't modify the secondary region.

If a disaster makes the primary region unrecoverable, OneLake might initiate a regional failover. After the failover finishes, you can use the OneLake APIs through the [global endpoint](onelake-access-api.md) to access your data in the secondary region. Data replication to the secondary region is asynchronous, so any data not copied during the disaster is lost. After a failover, the new primary datacenter has local redundancy only.

For a comprehensive understanding of the end-to-end experience, see [Reliability in Microsoft Fabric](/azure/reliability/reliability-fabric).

## Soft deletion for OneLake files

In OneLake, soft deletion prevents accidental file loss by retaining deleted files for seven days before permanent removal. Soft-deleted data is billed at the same rate as active data.

You can restore files and folders by using Azure Blob Storage REST APIs, Azure Storage SDKs, and the Azure PowerShell Az.Storage module. Learn how to list and restore files by using [these PowerShell instructions](/azure/storage/blobs/soft-delete-blob-manage#restore-soft-deleted-blobs-and-directories-by-using-powershell) and how to connect to [OneLake with PowerShell](../onelake/onelake-powershell.md#connect-to-onelake-with-azure-powershell).

### Restore soft-deleted files via Azure Storage Explorer

You can restore deleted Lakehouse files by using Azure Storage Explorer. First, [connect to your workspace from Storage Explorer](onelake-azure-storage-explorer.md). You can connect using the workspace GUID or friendly name in the OneLake path to restore data.

After you connect to your workspace, follow these steps to restore soft-deleted data:

1. Select the dropdown button next to the path bar, and then select **Active and soft deleted blobs** instead of the default **Active blobs**.

1. Go to the folder that contains the soft-deleted file.

1. Right-click the file, and then select **Undelete**.

## Related content

- [OneLake compute and storage consumption](onelake-consumption.md)
