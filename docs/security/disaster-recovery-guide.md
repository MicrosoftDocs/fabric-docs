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

The goal of the Fabric disaster recovery plan is to keep your organization's data safe and accessible. Power BI, now a part of the Fabric platform, has a solid disaster recovery system in place. This means your services stay protected. For other Fabric items, while a full disaster recovery system isn't currently supported, we've ensured that data stored in OneLake is backed up across regions. This means that even if there's a regional disaster, you can still access your data. This document contains guides to help you get back on track. 

### Power BI

Power BI, as a core service of Fabric, has an integrated disaster recovery function designed to ensure service continuity and data protection. Key features of this framework include: 

* **BCDR as default**: Power BI automatically includes disaster recovery capabilities in its default offering. This means users don't need to opt-in or activate this feature separately. 

* **Cross-region replication**: Power BI uses [Azure storage geo-redundant replication](/azure/storage/common/storage-redundancy-grs/) and [Azure SQL geo-redundant replication](/azure/sql-database/sql-database-active-geo-replication/) to guarantee that backup instances exist in other regions and can be used. This means that data is duplicated across different regions, enhancing its availability, and reducing the risks associated with regional outages.

* **Continued services and access after disaster**: Even during disruptive events, Power BI items remain accessible in read-only mode. This includes semantic models, reports, and dashboards, ensuring that businesses can continue their analysis and decision-making processes without significant hindrance.

For more information, see the [Power BI high availability, failover, and disaster recovery FAQ](/power-bi/enterprise/service-admin-failover/)

### Other Fabric experiences

While customers continue to have full disaster recovery support in Power BI, the disaster plan described here is designed to make sure your data stays safe and can be accessed or restored if something unexpected happens. To help protect your data, the plan offers:

* **Cross-region replication**: Fabric offers cross-region replication for customer data stored in OneLake. Customers can opt in or out of this feature based on their requirements.

* **Data access after disaster**: In the event of a regional disaster, Fabric guarantees data access, albeit in a limited capacity. While the creation or modification of new items is restricted after failover, the primary focus remains on ensuring that existing data remains accessible and intact.

* **Guidance for recovery**: Fabric provides a structured set of instructions to guide users through the recovery process. This makes it easier for them to transition back to regular operations.

### Cross-region replication

#### Disaster recovery capacity setting

Fabric provides a disaster recovery switch on the capacity settings page. It is available where Azure regional pairings align with Fabric's service presence. Here are the specifics of this switch:

* **Role access**: Only users with the [capacity admin]() role or higher can use this switch.
* **Granularity**: The granularity of the switch is the capacity Level. It is only available for Premium or Fabric capacities.
* **Data scope**: The disaster recovery toggle specifically addresses OneLake data, which includes Lakehouse and Warehouse data. **The switch does not influence customers data stored outside OneLake.**
* **BCDR continuity for Power BI**: While disaster recovery for OneLake data can be toggled on and off, BCDR for Power BI is always supported, regardless of this toggle's state.
* **Frequency**: To maintain stability and prevent constant toggling, once a customer changes the disaster recovery capacity setting, they need to wait 30 days before being able to alter it again.

:::image type="content" source="./media/disaster-recovery-guide/disaster-recovery-capacity-setting.png" alt-text="Screenshot of the Disaster Recovery tenant setting.":::

> [!NOTE]
> After turning on the setting, it can take up to 72 hours for the data to start replicating.

#### Data replication

When Fabric customers turn on the disaster recovery capacity setting, cross-region replication is enabled as a disaster recovery capability for OneLake data. Geo-redundancy storage is provisioned as the default storage by the Fabric platform at the capacity level. The Fabric platform aligns with Azure regions to provision the geo-redundancy pairs. However, note that some regions do not have an Azure pair region, or the pair region does not support Fabric. For these regions, geo-redundant storage (GRS) is not be available. Please see Regions with availability zones and no region pair and Fabric region availability for more information.

#### Billing

## How can I prepare for disaster?

### Phase 1: Prepare

### Phase 2: Disaster failover

### Phase 3: Recovery plan

#### Common steps

#### Dedicated Fabric experience plans

## Next steps

* [Resiliency in Azure](/azure/availability-zones/overview)