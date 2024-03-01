---
title: OneLake Disaster Recovery
description: How to plan for disaster recovery of your OneLake data in Microsoft Fabric.
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Disaster recovery guidance for OneLake

All data in OneLake is accessed through data items. These data items can reside in different regions depending on their workspace, as a workspace is created under a capacity tied to a specific region. 

OneLake utilizes zone-redundant storage (ZRS) where available (see [Azure regions with availability zones](/azure/reliability/availability-zones-service-support#azure-regions-with-availability-zone-support)) and locally redundant storage (LRS) elsewhere. With both LRS and ZRS storage, your data is resilient to transient hardware failures within a data center. With ZRS, your data has fault tolerance to data center failures. This article provides guidance on how to further protect your data from rare region-wide outages.

## Disaster recovery

You can enable or disable BCDR (Business Continuity and Disaster Recovery) for a specific capacity through the Capacity Admin Portal. If your capacity has BCDR activated, your data is duplicated and stored in two different geographic regions, making it geo-redundant. The choice of the secondary region is determined by Azure's standard region pairings and can't be modified.

If a disaster makes the primary region unrecoverable, OneLake may initiate a regional failover.  Once the failover has completed, you can use OneLake's APIs through the [global endpoint](onelake-access-api.md) to access your data in the secondary region. Data replication to the secondary region is asynchronous, so any data not copied during the disaster will be lost. After a failover, the new primary data center will have local redundancy only.

For a comprehensive understanding of the end-to-end experience, see the Fabric BCDR documentation.

## Related content

- [OneLake compute and storage consumption](onelake-consumption.md)
