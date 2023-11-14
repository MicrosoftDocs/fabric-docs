---
title: Microsoft Fabric disaster recovery guide
description: Find out about Microsoft Fabric's recovery plan in the event of a disaster.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/14/2023
---

# Microsoft Fabric disaster recovery guide

This document describes a disaster recovery plan for Fabric that is designed to help organizations keep their data safe and accessible if an unplanned regional disaster occurs. It covers strategy, features, and recovery steps.

## What does the Fabric disaster recovery plan include?

The goal of the Fabric disaster recovery plan is to keep your organization's data safe and accessible. Power BI, now a part of the Fabric, has a solid disaster recovery system in place. For other Fabric experiences, while a full disaster recovery system isn't currently supported, the [Disaster Recovery capacity setting](#disaster-recovery-capacity-setting) makes it possible to ensure that that data stored in OneLake is backed up across regions. This means that even if there's a regional disaster, you can still access your data.

### Power BI

Power BI, as a core service of Fabric, offers the following:

* **BCDR as default**: Power BI automatically includes disaster recovery capabilities in its default offering. This means users don't need to opt in or activate this feature separately. 

* **Cross-region replication**: Power BI uses [Azure storage geo-redundant replication](/azure/storage/common/storage-redundancy-grs/) and [Azure SQL geo-redundant replication](/azure/sql-database/sql-database-active-geo-replication/) to guarantee that backup instances exist in other regions and can be used. This means that data is duplicated across different regions, enhancing its availability, and reducing the risks associated with regional outages.

* **Continued services and access after disaster**: Even during disruptive events, Power BI items remain accessible in read-only mode. This includes semantic models, reports, and dashboards, ensuring that businesses can continue their analysis and decision-making processes without significant hindrance.

For more information, see the [Power BI high availability, failover, and disaster recovery FAQ](/power-bi/enterprise/service-admin-failover/)

### Other Fabric experiences

While customers continue to have full disaster recovery support in Power BI, the disaster plan described here is designed to make sure your data stays safe and can be accessed or restored if something unexpected happens. To help protect your data, the plan offers:

* **Cross-region replication**: Fabric offers cross-region replication for customer data stored in OneLake. Customers can opt in or out of this feature based on their requirements.

* **Data access after disaster**: In the event of a regional disaster, Fabric guarantees data access, with certain limitations. While the creation or modification of new items is restricted after failover, the primary focus remains on ensuring that existing data remains accessible and intact.

* **Guidance for recovery**: Fabric provides a structured set of instructions to guide users through the recovery process. This makes it easier for them to transition back to regular operations.

### Cross-region replication

#### Disaster recovery capacity setting

Fabric provides a disaster recovery switch on the capacity settings page. It's available where Azure regional pairings align with Fabric's service presence. Here are the specifics of this switch:

* **Role access**: Only users with the [capacity admin](/power-bi/enterprise/service-admin-premium-manage#setting-up-a-new-capacity-power-bi-premium/) role or higher can use this switch.

* **Granularity**: The granularity of the switch is the capacity Level. It's available for both Premium and Fabric capacities.

* **Data scope**: The disaster recovery toggle specifically addresses OneLake data, which includes Lakehouse and Warehouse data. **The switch does not influence customers data stored outside OneLake.**

* **BCDR continuity for Power BI**: While disaster recovery for OneLake data can be toggled on and off, BCDR for Power BI is always supported, regardless of whether the switch is on or off.

* **Frequency**: To maintain stability and prevent constant toggling, once a customer changes the disaster recovery capacity setting, they need to wait 30 days before being able to alter it again.

:::image type="content" source="./media/disaster-recovery-guide/disaster-recovery-capacity-setting.png" alt-text="Screenshot of the Disaster Recovery tenant setting.":::

> [!NOTE]
> After turning on the setting, it can take up to 72 hours for the data to start replicating.

#### Data replication

When Fabric customers turn on the disaster recovery capacity setting, cross-region replication is enabled as a disaster recovery capability for OneLake data. Geo-redundancy storage (GRS) is provisioned as the default storage by the Fabric platform at the capacity level. The Fabric platform aligns with Azure regions to provision the geo-redundancy pairs. However, note that some regions don't have an Azure pair region, or the pair region doesn't support Fabric. For these regions, data replication isn't available. For more information, see [Regions with availability zones and no region pair](/azure/reliability/cross-region-replication-azure#regions-with-availability-zones-and-no-region-pair/) and [Fabric region availability](../admin/region-availability.md).

> [!NOTE]
> While Fabric offers a data replication solution in OneLake to support disaster recovery, there are notable limitations. For instance, KQL Database/Queryset data is stored externally to OneLake, which means that a separate disaster recovery approach is needed. Refer to the following sections for the details of the disaster recovery approach for each Fabric item.

#### Billing

The disaster recovery feature in Fabric enables geo-replication of your data for enhanced security and reliability. This feature consumes additional storage and transactions, which are billed as BCDR Storage and BCDR Operations respectively. You can monitor and manage these costs in the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md), where they appear as separate line items.

For more information about the pricing and consumption rates of disaster recovery, see [OneLake compute and storage consumption](../onelake/onelake-consumption.md). You'll find there an exhaustive breakdown of all associated disaster recovery costs to help you plan and budget accordingly.

## How can I prepare for disaster?

While Fabric provides disaster recovery features to support data resiliency, customers **must** follow certain manual steps to restore service during disruptions. This section details the actions customers should take to prepare for potential disruptions.

### Phase 1: Prepare

* **Activate the Disaster Recovery capacity settings**: Regularly review and set the **[Disaster Recovery](#disaster-recovery-capacity-setting)** to make sure they meet your protection and performance needs.

* **Create data backups**: Copy critical data stored outside of OneLake to another region in a way that aligns to your disaster recovery plan.

### Phase 2: Disaster failover

When a major disaster renders the primary region unrecoverable, Microsoft Fabric initiates a regional failover. Access to the Fabric portal will be unavailable until the failover is complete. A notification will be posted on the [Microsoft Fabric support page](https://support.fabric.microsoft.com/support/).

The time it takes for failover to complete can vary, although it typically takes less than one hour. Once failover is complete, here's what you can expect:

* **Fabric portal**: You can access the portal, and read operations such as browsing existing workspaces and items will continue to work. All write operations, such as creating or modifying a workspace, will be paused.

* **Power BI**: You can perform read operations, such as displaying dashboards and reports. Refreshes, report publish operations, dashboard and report modifications, and other operations that require changes to metadata aren't supported.

* **Lakehouse/Warehouse**: You can't open these items, but files can be accessed via OneLake APIs or tools.

* **Spark Job Definition**: You can't open Spark Job Definition items, but code files can be accessed via OneLake APIs or tools. Any metadata or configuration will be saved after failover.
  
* **Notebook**: You can't open notebooks, and code content **won't** be saved after the disaster.

* **ML Model/Experiment**: You can't open the ML model or Experiment. Code content and metadata such as run metrics and configurations won't be saved after the disaster.

* **Dataflow Gen2/Pipeline/Eventstream**: You can't open these items, but you can use supported disaster recovery destinations (Lakehouse or Warehouse) to protect data.

* **KQL Database/Queryset**: You won't be able to access KQL databases and querysets after failover. Additional prerequisite steps are required to protect KQL Database/Queryset data.

Although the Fabric portal and Power BI will be in read-only mode, and other Fabric items will be unavailable, customers can access their data stored in OneLake using APIs or third-party tools, and they retain the ability to perform read-write operations on that data. This ensures that critical data remains accessible and modifiable, and mitigates potential disruption of your business operations.

OneLake data remains accessible through multiple channels:

* OneLake ADLS Gen2 API: See [Connecting to Microsoft OneLake](../onelake/onelake-access-api.md)

    Examples of tools that can connect to OneLake data:
    
    * Azure Storage Explorer: See [Integrate OneLake with Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md)

    * OneLake File Explorer: See [Use OneLake file explorer to access Fabric data](../onelake/onelake-file-explorer.md)

### Phase 3: Recovery plan

While Fabric ensures that data remains accessible after a disaster, customers can also act to fully restore their services to the state before the incident. This section provides a step-by-step guide to help customers through the recovery process.

#### Common steps

1. Create a new Fabric capacity in any region after a disaster. Given the high demand during such events, we recommend selecting a region outside your primary geo to increase the likelihood of successful capacity creation. [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md).

1. Create workspaces in the newly created capacity. If necessary, use the same names as the old workspaces.

1. Create items with the same names as the ones you want to recover. This is important if you use the custom script to recover Lakehouse and Warehouse items.

1. Restore the items. For each item, follow the relevant section in the [Experience-specific disaster recovery guidance](./experience-specific-guidance.md) to restore the item.

## Next steps

* [Experience-specific disaster recovery guidance](./experience-specific-guidance.md)

## Related information

* [Resiliency in Azure](/azure/availability-zones/overview)
