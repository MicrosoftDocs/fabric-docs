---
title: Reliability in Microsoft Fabric 
description: Learn how to ensure analytics platform reliability with Microsoft Fabric by using availability zones, cross-region replication, and disaster recovery planning.
author: msmimart 
ms.author: mimart 
ms.topic: reliability-article
ms.service: fabric
ms.subservice: admin
ms.custom:
  - subject-reliability
  - references_regions
  - build-2023
  - ignite-2023
ms.date: 09/19/2025
---

# Reliability in Microsoft Fabric

This article describes reliability support in Microsoft Fabric, including both regional resiliency with availability zones and [cross-region recovery and business continuity](#cross-region-disaster-recovery-and-business-continuity). For a more detailed overview of reliability in Azure, see [Azure reliability](/azure/architecture/framework/resiliency/overview).

## Availability zone support

[Availability zones](/azure/reliability/availability-zones-overview) are physically separate groups of datacenters within an Azure region. When one zone fails, services can fail over to one of the remaining zones.

Fabric uses Azure availability zones to protect Fabric and Power BI items and data from datacenter failures. The service automatically distributes Fabric resources across multiple zones without requiring any customer configuration.
* Data engineering supports availability zones if you use OneLake. If you use other data sources such as ADLS Gen2, then you need to ensure that Zone-redundant storage (ZRS) is enabled.

### Zone down experience
During a zone-wide outage, no customer action is required. Fabric capabilities self-heal and rebalance automatically to take advantage of the healthy zone. In some cases, in-progress operations might need to restart. For example, running Spark Jobs might fail if the primary node is in the failed zone. In such a case, you need to resubmit the jobs. Data warehouse and SQL analytics endpoint query might fail if the front end node is in the failed zone. In such a case, you need to safely restart the query. 

>[!IMPORTANT]
> While Microsoft strives to provide uniform and consistent availability zone support, in some cases of availability-zone failure, Fabric capacities located in Azure regions with higher customer demand fluctuations might experience higher than normal latency.

## Cross-region disaster recovery and business continuity

Disaster recovery (DR) refers to practices that organizations use to recover from high-impact events, such as natural disasters or failed deployments that result in downtime and data loss. Regardless of the cause, the best remedy for a disaster is a well-defined and tested DR plan and an application design that actively supports DR. Before you start creating your disaster recovery plan, see [Recommendations for designing a disaster recovery strategy](/azure/well-architected/reliability/disaster-recovery). 

For DR, Microsoft uses the [shared responsibility model](/azure/reliability/concept-shared-responsibility). In this model, Microsoft ensures that the baseline infrastructure and platform services are available. However, many Azure services don't automatically replicate data or fall back from a failed region to cross-replicate to another enabled region. For those services, you're responsible for setting up a disaster recovery plan that works for your workload. Most services that run on Azure platform as a service (PaaS) offerings provide features and guidance to support DR. You can use [service-specific features to support fast recovery](/azure/reliability/reliability-guidance-overview) to help develop your DR plan.

This section describes a disaster recovery plan for Fabric that's designed to help your organization keep its data safe and accessible when an unplanned regional disaster occurs. The plan covers the following topics:

* **Cross-region replication**: Fabric offers cross-region replication for data stored in OneLake. You can opt in or out of this feature based on your requirements.

* **Data access after disaster**:  In a regional disaster scenario, Fabric guarantees data access, with certain limitations. While the creation or modification of new items is restricted after failover, the primary focus remains on ensuring that existing data remains accessible and intact.

* **Guidance for recovery**: Fabric provides a structured set of instructions to guide you through the recovery process. The structured guidance makes it easier for you to transition back to regular operations.

Power BI, now a part of the Fabric, has a solid disaster recovery system in place and offers the following features:

* **BCDR as default**: If a region is [paired](/azure/reliability/regions-list) with a [region that supports Power BI](/fabric/admin/region-availability), disaster recovery capabilities are included by default. You don't need to opt in or activate this feature separately. 

* **Cross-region replication**: Power BI uses [Azure storage geo-redundant replication](/azure/storage/common/storage-redundancy-grs/) and [Azure SQL geo-redundant replication](/azure/sql-database/sql-database-active-geo-replication/) to guarantee that backup instances exist in other regions and can be used. This means that data is duplicated across different regions, enhancing its availability, and reducing the risks associated with regional outages.

* **Continued services and access after disaster**: Even during disruptive events, Power BI items remain accessible in read-only mode. Items include semantic models, reports, and dashboards, ensuring that businesses can continue their analysis and decision-making processes without significant hindrance.

For more information, see the [Power BI high availability, failover, and disaster recovery FAQ](/power-bi/enterprise/service-admin-failover/).


>[!IMPORTANT]
> For customers affected by a disaster and whose home regions don't have an Azure paired region that supports Fabric, the ability to utilize Fabric capacities might be compromised, even if the data within those capacities is replicated. This limitation is tied to the home region’s infrastructure, which is essential for the operation of the capacities. To see the list of regions that support Fabric, go to [Fabric Region Availability](/fabric/admin/region-availability).

### Home region and capacity functionality

For effective disaster recovery planning, it's critical that you understand the relationship between your home region and capacity locations. Understanding home region and capacity locations helps you make strategic selections of capacity regions, as well as the corresponding replication and recovery processes.

The **home region** for your organization's tenancy and data storage is set to the billing address location of the first user that signs up. For further details on tenancy setup, go to [Power BI implementation planning: Tenant setup](/power-bi/guidance/powerbi-implementation-planning-tenant-setup#home-region).  When you create new capacities, your data storage is set to the home region by default. If you wish to change your data storage region to another region, you need to [enable Multi-Geo, a Fabric Premium feature](/fabric/admin/service-admin-premium-multi-geo#enable-and-configure).

  >[!IMPORTANT]
  > Choosing a different region for your capacity doesn't entirely relocate all of your data to that region. Some data elements still remain stored in the home region.  To see which data remains in the home region and which data is stored in the Multi-Geo enabled region, see [Configure Multi-Geo support for Fabric Premium](/fabric/admin/service-admin-premium-multi-geo). 
  >
  >In the case of a home region that doesn't have a paired region, capacities in any Multi-Geo enabled region might face operational problems if the home region encounters a disaster, as the core service functionality is tethered to the home region.
  >
  >If you select a Multi-Geo enabled region within the EU, it's guaranteed that your data is stored within the EU data boundary. 


To learn how to identify your home region, see [Find your Fabric home region](/fabric/admin/find-fabric-home-region). 

### Disaster recovery capacity setting

Fabric provides a disaster recovery switch on the capacity settings page. It's available where Azure [regional pairings](/azure/reliability/cross-region-replication-azure#azure-paired-regions) align with Fabric's service presence. Here are the specifics of this switch:

* **Role access**: Only users with the [capacity admin](/power-bi/enterprise/service-admin-premium-manage#setting-up-a-new-capacity-power-bi-premium/) role or higher can use this switch.

* **Granularity**: The granularity of the switch is the capacity level. It's available for both Premium and Fabric capacities.

* **Data scope**: The disaster recovery toggle specifically addresses OneLake data, which includes Lakehouse and Warehouse data. **The switch doesn't influence your data stored outside OneLake.**

* **BCDR continuity for Power BI**: While you can toggle disaster recovery for OneLake data on and off, BCDR for Power BI is always supported, regardless of whether the switch is on or off.

* **Frequency**: Once you change the disaster recovery capacity setting, you must wait 30 days before you can alter it again. The wait period maintains stability and prevents constant toggling. 

:::image type="content" source="/fabric/security/media/disaster-recovery-guide/disaster-recovery-capacity-setting.png" alt-text="Screenshot of the disaster recovery tenant setting.":::

> [!NOTE]
> After enabling the disaster recovery capacity setting or creating new workspaces within the capacity, data replication might take some time to start. You can check the status of each workspace on the capacity settings page under **Workspaces assigned to this capacity**. The **OneLake Geo-replication** column shows the status for enabling geo-replication.

### Data replication

When you turn on the disaster recovery capacity setting, cross-region replication is enabled as a disaster recovery capability for OneLake data. The Fabric platform aligns with Azure regions to provision the geo-redundancy pairs. However, some regions don't have an Azure pair region, or the pair region doesn't support Fabric. For these regions, data replication isn't available. For more information, see [Regions with availability zones and no region pair](/azure/reliability/cross-region-replication-azure#regions-with-availability-zones-and-no-region-pair/) and [Fabric region availability](/fabric/admin/region-availability).

> [!NOTE]
> While Fabric offers a data replication solution in OneLake to support disaster recovery, there are notable limitations. For instance, the data of KQL databases and query sets is stored externally to OneLake, which means that a separate disaster recovery approach is needed. Refer to the rest of this document for details of the disaster recovery approach for each Fabric item. 

### Billing

The disaster recovery feature in Fabric enables geo-replication of your data for enhanced security and reliability. This feature consumes more storage and transactions, which are billed as BCDR Storage and BCDR Operations respectively. You can monitor and manage these costs in the [Microsoft Fabric Capacity Metrics app](/fabric/enterprise/metrics-app), where they appear as separate line items.

For an exhaustive breakdown of all associated disaster recovery costs to help you plan and budget accordingly, see [OneLake compute and storage consumption](/fabric/onelake/onelake-consumption). 

## Set up disaster recovery 

While Fabric provides disaster recovery features to support data resiliency, you **must** follow certain manual steps to restore service during disruptions. This section details the actions you should take to prepare for potential disruptions.

#### Phase 1: Prepare

* **Activate the disaster recovery capacity settings**: Regularly review and set the [disaster recovery capacity settings](#disaster-recovery-capacity-setting) to make sure they meet your protection and performance needs.

* **Create data backups**: Copy critical data stored outside of OneLake to another region in a way that aligns to your disaster recovery plan.

### Phase 2: Disaster failover

When a major disaster makes the primary region unrecoverable, Microsoft Fabric initiates a regional failover. You can't access the Fabric portal until the failover is complete. A notification is posted on the [Microsoft Fabric support page](https://support.fabric.microsoft.com/support/).

The time it takes for failover to complete can vary, although it typically takes less than one hour. Once failover is complete, here's what you can expect:

* **Fabric portal**: You can access the portal, and read operations, such as browsing existing workspaces, task flows in workspaces, and items, continue to work. All write operations, such as creating or modifying a workspace, are paused.

* **Power BI**: You can perform read operations, such as displaying dashboards and reports. Refreshes, report publish operations, dashboard and report modifications, and other operations that require changes to metadata aren't supported.

* **Lakehouse/Warehouse**: You can't open these items, but you can access files through OneLake APIs or tools.

* **Spark Job Definition**: You can't open Spark job definitions, but you can access code files through OneLake APIs or tools. Any metadata or configuration is saved after failover.
  
* **Notebook**: You can't open notebooks, and code content isn't saved after the disaster.

* **ML Model/Experiment**: You can't open ML models or experiments. Code content and metadata such as run metrics and configurations aren't saved after the disaster.

* **Dataflow Gen2/Pipeline/Eventstream**: You can't open these items, but you can use supported disaster recovery destinations (lakehouses or warehouses) to protect data.

* **KQL Database/Queryset**: You can't access KQL databases and query sets after failover. More prerequisite steps are required to protect the data in KQL databases and query sets.

In a disaster scenario, the Fabric portal and Power BI are in read-only mode, and other Fabric items are unavailable. You can access their data stored in OneLake by using APIs or third-party tools. Both portal and Power BI retain the ability to perform read-write operations on that data. This ability ensures that critical data remains accessible and modifiable, and mitigates potential disruption of your business operations.

You can access OneLake data through multiple channels:

* OneLake ADLS Gen2 API: See [Connecting to Microsoft OneLake](/fabric/onelake/onelake-access-api)

* Examples of tools that can connect to OneLake data:
    
    * Azure Storage Explorer: See [Integrate OneLake with Azure Storage Explorer](/fabric/onelake/onelake-azure-storage-explorer)

    * OneLake File Explorer: See [Use OneLake file explorer to access Fabric data](/fabric/onelake/onelake-file-explorer)

* In a disaster scenario, the OneLake catalog is in read-only mode:
    
    * Explore tab: You can access the Explore tab to view all items and workspaces, including their metadata and related details.

    * Govern tab: You can access the Govern tab to view insights, recommended actions, and governance tools - based on the most recent successful model refresh prior to failover. 

#### Phase 3: Recovery plan

While Fabric ensures that data remains accessible after a disaster, you can also act to fully restore their services to the state before the incident. This section provides a step-by-step guide to help you through the recovery process.

### Recovery steps

1. Create a new Fabric capacity in any region after a disaster. Given the high demand during such events, select a region outside your primary geo to increase the likelihood of compute service availability. For information about creating a capacity, see [Buy a Microsoft Fabric subscription](/fabric/enterprise/buy-subscription).

1. Create workspaces in the newly created capacity. If necessary, use the same names as the old workspaces.

1. Create items with the same names as the ones you want to recover. This step is important if you use the custom script to recover lakehouses and warehouses.

1. Restore the items. For each item, follow the relevant section in the [Experience-specific disaster recovery guidance](/fabric/security/experience-specific-guidance) to restore the item.


## Next steps

- [Experience-specific disaster recovery guidance](/fabric/security/experience-specific-guidance)
- [Reliability in Azure](/azure/reliability/overview)