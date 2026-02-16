---
title: OneLake Disaster Recovery and Data Protection
description: Get information on how to plan for disaster recovery and ensure OneLake data protection in Microsoft Fabric.
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom:
ms.date: 02/11/2026
#customer intent: As a OneLake user, I want to understand disaster recovery and data protection options so that I can help ensure the safety and availability of my data.
---

# Disaster recovery and data protection for OneLake

All data in OneLake is accessed through data items. These data items can reside in different regions depending on their workspace, because a workspace is created under a capacity that's tied to a specific region.

OneLake uses zone-redundant storage (ZRS) where that storage type is available. (See [Azure regions with availability zones](/azure/reliability/availability-zones-service-support#azure-regions-with-availability-zone-support).) Elsewhere, OneLake uses locally redundant storage (LRS). With both LRS and ZRS, your data is resilient to transient hardware failures within a datacenter.

Just like for [Azure Storage](/azure/storage/common/storage-redundancy), LRS replicates data within a single datacenter in the primary region. LRS provides at least 99.999999999% (11 nines) durability of objects over a year. This durability helps protect against server rack and drive failures, but not against datacenter disasters.

Meanwhile, ZRS provides fault tolerance to datacenter failures by copying data synchronously across three Azure availability zones in the primary region. ZRS offers a durability of at least 99.9999999999% (12 nines) over a year.

This article provides guidance on how to further protect your data from rare region-wide outages.

## Disaster recovery

You can enable or disable disaster recovery (DR) for a specific capacity through the [capacity admin portal](/azure/reliability/reliability-fabric#disaster-recovery-capacity-setting). If your capacity has DR enabled, your data is duplicated and stored in two geographic regions so that it's geo-redundant. The standard region pairings in Azure determine the choice of the secondary region. You can't modify the secondary region.

If a disaster makes the primary region unrecoverable, OneLake might initiate a regional failover. After the failover finishes, you can use the OneLake APIs through the [global endpoint](onelake-access-api.md) to read and write data in the secondary region. Data replication to the secondary region is asynchronous, so any data not copied during the disaster is lost. After a failover, the new primary datacenter has local redundancy only.

For a comprehensive understanding of the end-to-end experience, see [Reliability in Microsoft Fabric](/azure/reliability/reliability-fabric).

## Soft delete for OneLake files

OneLake automatically protects your data with soft delete, which retains deleted files for seven days before permanent removal. This built-in protection helps you recover from accidental deletions or user errors.

For step-by-step instructions on how to list and restore soft-deleted files, see [Recover deleted files in OneLake](soft-delete.md).

## Related content

- [Recover deleted files in OneLake](soft-delete.md)
- [OneLake compute and storage consumption](onelake-consumption.md)
