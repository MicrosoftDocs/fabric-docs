---
title: Multi-Geo support for Fabric
description: Learn how you can deploy content to data centers in regions other than the home region of the Fabric tenant.
author: KesemSharabi
ms.author: kesharab
ms.reviewer: ''
ms.custom:
  - ignite-2023
ms.topic: how-to
ms.date: 08/14/2024
LocalizationGroup: Premium
---

# Configure Multi-Geo support for Fabric

Multi-Geo is a Microsoft Fabric feature that helps multinational customers address regional, industry-specific, or organizational data residency requirements. As a Fabric customer, you can deploy content to data centers in regions other than the home region of the Fabric tenant. A geo (geography) can contain more than one region. For example, the United States is a geo, and West Central US and South Central US are regions in the United States. You might choose to deploy content to any of the following geographies (geos) defined in the [Azure geography map](https://azure.microsoft.com/global-infrastructure/geographies/).

* Sovereign clouds support Multi-Geo across regions within that cloud.

* China North doesn't support Multi-Geo.

* Power BI Embedded supports Multi-Geo.

* Power BI Premium Per User (PPU) isn't supported for Multi-Geo.

## Enable and configure

Enable Multi-Geo by selecting a region other than the default region when you're creating a new capacity. Once a capacity's created, it shows the region where it's currently located.

After you create a capacity, it remains in that region, and any workspaces created under it will have their content stored in that region. 

Follow these steps to change the default capacity region when you're creating a new capacity.

# [Power BI Premium](#tab/power-bi-premium)

1. In Fabric, select **settings** (&#9881;) and from the menu select **Admin portal**.

2. In the *Admin portal*, select **Capacity settings**.

3. Select **Set up new capacity**.

4. From the **Region** dropdown menu, select the region you want to use for this capacity.

# [Power BI Embedded](#tab/power-bi-embedded)

1. In Fabric, select **settings** (&#9881;) and from the menu select **Admin portal**.

2. In the *Admin portal*, select **Capacity settings**.

3. Select **Set up new capacity**.

4. From the **Region** dropdown menu, select the region you want to use for this capacity.

# [Trial](#tab/trial)

Trial capacities are created in your home region and don't support Multi-Geo.

# [Fabric Capacity](#tab/fabric-capacity)

1. In Fabric, select **settings** (&#9881;) and from the menu select **Admin portal**.

2. In the *Admin portal*, select the link **Set up a new capacity in Azure**.

3. In Azure, set up your capacity and in the **Region** dropdown menu, select the region you want to use for this capacity.

---

## Move workspaces between capacities

Follow the steps below to move workspaces from one capacity to another in the same region. During migration, certain operations might fail, such as publishing new semantic models or scheduled data refresh.

1. Open the [workspace settings](../get-started/workspaces.md#workspace-settings).

2. From the side bar, select **License info**.

3. From the **License capacity** dropdown menu, select the capacity you want to move the workspace to.

## Change the region of your existing content

To change the region for existing content, do one of the following:

* Create a new capacity and move your workspaces to the new capacities. Free users won't experience any downtime as long as the tenant has spare v-cores.

* Temporarily move your content to a shared capacity. You don't need extra v-cores, but free users will experience some downtime. After you create a new capacity in the desired region, move your workspaces to the new capacity.

## Move content to your home region

To move workspaces to your home region, do one of the following:

* Delete the current capacity where the workspace is located. Workspaces in the deleted capacity are moved to a shared capacity in the home region.

* Move individual workspaces to a capacity located in the home tenant.

Large-storage format semantic models shouldn't be moved from the region where they were created. Reports based on a large-format semantic model won't be able to load the semantic model and will return a *Cannot load model* error. Move the large-storage format semantic model back to its original region to make it available again.

## Considerations and limitations

* Confirm that any movement you initiate between regions follows all corporate and government compliance requirements prior to initiating data transfer.

* When you're using Multi-Geo, the following items are stored in the region that isn't your home region:
    * Models (*.ABF* files) for import and DirectQuery semantic models
    * Query cache
    * R images

    These items remain in the home region of the tenant:
    * Push datasets
    * Dashboard/report metadata: tile names, tile queries, and any other data
    * Service buses for gateway queries or scheduled refresh jobs
    * Permissions
    * Semantic model credentials
    * Power BI Embedded Analytics Playground saved state
    * Metadata linked to Purview Data Map

* Cached data and queries stored in a remote region stays in that region at rest. Additionally, the data at rest is replicated to another region in the same Azure geography for disaster recovery if the Azure geography contains more than one region. Data in transit might go back and forth between multiple geographies.

* When moving data from one region to another, the source data might remain in the region from which the data was moved for up to 30 days. During that time end users don't have access to it. The data is removed from this region and destroyed during the 30-day period.

* Query text and query result traffic for imported and DirectQuery data models doesn't transit through the home region. However, the report metadata comes from the home region, and certain DNS routing states might take such traffic out of the region.

* Certain features such as screenshots, data alerts and others process data in the home region.

* The detailed semantic model metadata that is cached as part of [enhanced metadata scanning](/power-bi/enterprise/service-admin-metadata-scanning) is always stored in the home region, even if the scanned semantic model is located in a remote region.

* The [dataflows](/power-bi/transform-model/dataflows/dataflows-introduction-self-service) feature isn't supported on Multi-Geo.

* It's possible to create and maintain large-storage format semantic models in remote regions to meet data residency requirements. However, you can't move storage format semantic models to another region. Moving large-storage format semantic models from the region where they were created results in reports failing to load the semantic model. Move the large-storage semantic model back to its original region to make it available. If you must move such a model, deploy it as if it was a new model, and then delete the old model from the undesired region.

* Multi-Geo doesn't support [Metrics in Power BI](/power-bi/create-reports/service-goals-introduction).

## Related content

* [What is Power BI Premium?](/power-bi/enterprise/service-premium-what-is)

* [Multi-Geo support for Power BI Embedded](/power-bi/developer/embedded/embedded-multi-geo)
