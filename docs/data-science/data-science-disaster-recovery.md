---
title: Disaster recovery guidance for Fabric Data Science
description: Guidance for disaster recovery in Fabric Data Science
ms.reviewer: midesa
reviewer: midesa
ms.author: scottpolly
author: s-polly
ms.topic: concept-article
ms.custom: 
ms.date: 04/10/2025
---

# Disaster recovery guidance for Fabric Data Science

In Microsoft Fabric, machine learning experiments and models consist of files and metadata. This article provides guidance about how to protect your data from rare, region-wide outages.

## Disaster recovery

To protect your data from rare region-wide outages, we recommend that you copy your critical data to another region, with a frequency that matches the needs of your disaster recovery plan.

To store your machine learning experiments and models in two different regions, you must create these resources in two different workspaces. When you select workspaces, you must choose workspaces associated with capacities in two different regions.

Next, export and copy your Fabric notebooks into your secondary workspace, and rerun the notebooks to create the relevant machine learning items in the secondary workspace.

If a regional outage occurs, you can then access your machine learning items in the second region where you copied the items.

## Related content

- [OneLake Disaster Recovery](../onelake/onelake-disaster-recovery.md)
