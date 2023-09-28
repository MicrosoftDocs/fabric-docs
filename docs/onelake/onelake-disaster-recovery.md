---
title: OneLake Disaster Recovery
description: How to plan for disaster recovery of your OneLake data in Microsoft Fabric.
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom: build-2023
ms.date: 09/20/2023
---

# Disaster recovery guidance for OneLake

All data in OneLake is accessed through data items. These data items can reside in different regions depending on their workspace, as a workspace is created under a capacity tied to a specific region. 

OneLake utilizes zone-redundant storage (ZRS) where available (see [Azure regions with availability zones](/azure/reliability/availability-zones-service-support#azure-regions-with-availability-zone-support)) and locally redundant storage (LRS) elsewhere. With both LRS and ZRS storage, your data is resilient to transient hardware failures within a data center. With ZRS, your data has fault tolerance to data center failures. This article provides guidance on how to further protect your data from rare region-wide outages.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Disaster recovery

To protect your data from rare region-wide outages, we recommend copying your critical data to another region with a frequency aligned with the needs of your disaster recovery plan.  
To store your data in two different regions, you need to use data items in two different workspaces. Choose workspaces that are associated with capacities in two different regions.  

Data factory in Microsoft Fabric is a useful service for creating and deploying data movement pipelines on a recurring basis. For more information, please refer to [Create your first data pipeline to copy data](../data-factory/create-first-pipeline-with-sample-data.md).

If a regional outage occurs, you can then access your data in a different region where the data was copied.
