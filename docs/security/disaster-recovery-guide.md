---
title: Microsoft Fabric disaster recovery guide
description: Find out about Microsoft Fabric's recovery plan in the event of a disaster.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom: build-2023
ms.date: 11/06/2023
---

# Microsoft Fabric disaster recovery guide

This document describes a disaster recovery plan for Fabric that is designed to help organizations keep their data safe and accessible if an unplanned regional disaster occurs. It covers strategy, features, and recovery steps.

## What does the Fabric disaster recovery plan include?

The goal of the Fabric disaster recovery plan is to keep your organization's data safe and accessible. Power BI, now a part of the Fabric platform, has a solid disaster recovery system in place. This means your services stay protected. For other Fabric items, while a full disaster recovery system isn't currently supported, we've ensured that data in stored in OneLake is backed up across regions. This means that even if there's a regional disaster, you can still access your data. This document contains guides to help you get back on track.

## Power BI

Power BI, as a core service of Fabric, has an integrated disaster recovery function designed to ensure service continuity and data protection. Key features of this framework include:

* **BCDR** as default: Power BI automatically includes disaster recovery capabilities in its default offering. This means users don't need to opt in or activate this feature separately.

* **Cross-region replication**: Power BI supports cross-region replication. This means that data is duplicated across different regions, enhancing its availability and reducing the risks associated with regional outages.

* **Continued services and access after disaster**: Even during disruptive events, Power BI items remain accessible in read-only mode. This includes semantic models, reports, and dashboards, ensuring that businesses can continue their analytic and decision-making processes without significant interruption.

For more information, see the [Power BI high availability, failover, and disaster recovery FAQ](/power-bi/enterprise/service-admin-failover/)

## Other Fabric experiences

While customers continue to have full disaster recovery support in Power BI, the disaster plan described here is designed to make sure your data stays safe and can be accessed or restored if something unexpected happens. To help protect your data, the plan offers: 

* **Cross-region replication**: Fabric offers a cross-region replication for customer data stored in OneLake (that is, customer data created via Lakehouse data and Warehouse). Depending on their requirements, customers can opt in or out of this feature.

* **Data access after disaster**: In the event of a regional disaster, Fabric guarantees data access, albeit in a limited capacity. While the creation or modification of new items is restricted after failover, the primary focus remains on ensuring that existing data remains accessible and intact.

* **Guidance for recovery**: Fabric provides a structured set of instructions to guide users through the recovery process. This makes it easier for them to transition back to regular operations.

## Next steps

* [Resiliency in Azure](/azure/availability-zones/overview)