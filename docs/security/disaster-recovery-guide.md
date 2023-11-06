---
title: Microsoft Fabric disaster recovery guide
description: Find out about BCDR in Microsoft Fabric 
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom: build-2023
ms.date: 11/06/2023
---

# Microsoft Fabric disaster recovery guide

This document discribes a disaster recovery plan for Fabric that is designed to help organizations keep their data safe and accessible in the event of an unplanned regional disaster. It covers strategy, features, and recovery steps.

## What does the Fabric disaster recovery plan include?

The goal of the Fabric disaster recovery plan is to keep your organization's data safe and accessible. Power BI, now part of Fabric platform, has a solid disaster recovery system in place. This means your services stay protected. For other Fabric items, while a full disaster recovery system is we've ensured that data in OneLake is backed up across regions. Even if there is a regional disaster, you can still access your data, and we've got guides to help you get back on track. Here is the detail of our disaster recovery plan: 

 

Power BI 

Power BI, as a core service of Fabric, has an integrated disaster recovery function designed to ensure service continuity and data protection. Key features of this framework include: 

BCDR as Default: Power BI automatically includes disaster recovery capabilities in its default offering. This means users don't need to opt-in or activate this feature separately. 

Cross-region Replication: Power BI supports cross-region replication. This means that data is duplicated across different regions, enhancing its availability, and reducing the risks associated with regional outages. 

Continued Services and Access After Disaster: Even during disruptive events, Power BI artifacts remain accessible in read-only. This includes datasets, reports, and dashboards, ensuring that businesses can continue their analysis and decision-making processes without significant hindrance. 

 

For more information, see Power BI high availability, failover, and disaster recovery FAQ 


## Next steps

* [Resiliency in Azure](/azure/availability-zones/overview)