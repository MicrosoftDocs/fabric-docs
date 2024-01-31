---
title: Disaster recovery guidance for Fabric Data Science
description: Guidance for disaster recovery in Fabric Data Science
ms.reviewer: larryfr
ms.author: midesa
author: midesa
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 10/13/2023
---

# Disaster recovery guidance for Fabric Data Science

In Microsoft Fabric, machine learning experiments and models consist of files and metadata. This article provides guidance on how to further protect your data from rare region-wide outages.



## Disaster recovery

To protect your data from rare region-wide outages, we recommend that you copy your critical data to another region with a frequency aligned with the needs of your disaster recovery plan.

To store your machine learning experiments and models in two different regions, you need to create these items in two different workspaces. When selecting workspaces, you must choose workspaces that are associated with capacities in two different regions.

Then, export and copy your Fabric notebooks into your secondary workspace and rerun the notebooks to create the relevant machine learning items in the secondary workspace.

If a regional outage occurs, you can then access your machine learning items in the different region where the items were copied.

## Related content

- [OneLake Disaster Recovery](../onelake/onelake-disaster-recovery.md)
