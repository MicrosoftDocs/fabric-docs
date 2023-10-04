---
title: Disaster recovery guidance for Fabric Data Science
description: Guidance for disaster recovery in Fabric Data Science
ms.reviewer: mopeakande
ms.author: midesa
author: midesa 
ms.topic: conceptual
ms.date: 10/04/2023
---

# Disaster recovery guidance for Fabric Data Science

In Fabric, machine learning experiments and models consist of files and metadata. This article provides guidance on how to further protect your data from rare region-wide outages.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Disaster recovery

To protect your data from rare region-wide outages, we recommend copying your critical data to another region with a frequency aligned with the needs of your disaster recovery plan.

To store your machine learning experiments and models in two different regions, you need to create these items in two different workspaces. To do this, you must choose workspaces that are associated with capacities in two different regions.

Then, you will need to export and copy your Fabric notebooks into your secondary workspace and re-run to create the relevant machine learning artifacts.

If a regional outage occurs, you can then access your machine learning artifacts in a different region where the artifacts were copied.

## Next steps

- [OneLake Disaster Recovery](../onelake/onelake-disaster-recovery.md)