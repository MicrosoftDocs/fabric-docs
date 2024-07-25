---
title: Multi-Geo support for Fabric
description: Learn how you can deploy content to data centers in regions other than the home region of the Fabric tenant.
author: KesemSharabi
ms.author: kesharab
ms.reviewer: ''
ms.custom:
  - ignite-2023
ms.topic: how-to
ms.date: 01/28/2024
LocalizationGroup: Premium
---

# Configure Multi-Geo support for Fabric

Multi-Geo is a Fabric feature that helps multinational customers address regional, industry-specific, or organizational data residency requirements. As a Fabric customer, you can deploy content to data centers in regions other than the home region of the Fabric tenant. A geo (geography) can contain more than one region. For example, the United States is a geo, and West Central US and South Central US are regions in the United States. You might choose to deploy content to any of the following geographies (geos) defined in the [Azure geography map](https://azure.microsoft.com/global-infrastructure/geographies/).

Sovereign clouds support Multi-Geo across regions within that cloud.

> [!NOTE]
> China North currently does not support Multi-Geo as it resides on the old version of Premium.

Multi-Geo is now also available in Power BI Embedded. Read more at [Multi-Geo support for Power BI Embedded](/power-bi/developer/embedded/embedded-multi-geo).

> [!NOTE]
> Power BI Premium Per User (PPU) is not supported for Multi-Geo.

## Enable and configure

Enable Multi-Geo by selecting a region other than the default region when you're creating a new capacity. Once a capacity's created, it shows the region where it's currently located.

Follow these steps to change the default capacity region when you're creating a new capacity.

1. In the Power BI service, select **settings** and from the menu select **Admin portal**.

2. In the *Admin portal*, select **Capacity settings**.

3. Select **Set up new capacity**.

4. From the **Region** dropdown menu, select the region you want to use for this capacity.

After you create a capacity, it remains in that region, and any workspaces created under it will have their content stored in that region. You can migrate workspaces from one capacity to another through the dropdown on the workspace settings screen.

![Screenshot showing the edit workspace settings screen to change the currently selected region.](media/service-admin-premium-multi-geo/power-bi-multi-geo-edit-workspace.png)

You see this message to confirm the change.

![Screenshot of a prompt confirming a change to the workspace region.](media/service-admin-premium-multi-geo/power-bi-multi-geo-change-assigned-workspace-capacity.png)

During migration, certain operations might fail, such as publishing new semantic models or scheduled data refresh.  

The following items are stored in the Premium region when Multi-Geo is enabled:

- Models (*.ABF* files) for import and DirectQuery semantic models
- Query cache
- R images

These items remain in the home region for the tenant:

- Push datasets
- Dashboard/report metadata: tile names, tile queries, and any other data
- Service buses for gateway queries or scheduled refresh jobs
- Permissions
- Semantic model credentials
- Power BI Embedded Analytics Playground saved state
- Metadata linked to Purview Data Map

## View capacity regions

In the Admin portal, you can view all the capacities for your tenant and the regions where they're currently located.

![Screenshot of a table showing premium capacities and information relating to capacity name, capacity admins, actions, SKU, v-cores, region, and status.](media/service-admin-premium-multi-geo/power-bi-multi-geo-premium-capacities.png)

## Change the region for existing content

If you need to change the region for existing content, you have two options:

- Create a second capacity and move workspaces. Free users won't experience any downtime as long as the tenant has spare v-cores.
- If creating a second capacity isn't an option, you can temporarily move the content back to shared capacity from Premium. You don't need extra v-cores, but free users will experience some downtime.

## Move content out of Multi-Geo  

You can take workspaces out of Multi-Geo capacity in one of two ways:

- Delete the current capacity where the workspace is located. This action moves the workspace back to shared capacity in the home region.
- Migrate individual workspaces back to Premium capacity located in the home tenant.

Large-storage format semantic models shouldn't be moved from the region where they were created. Reports based on a large-format semantic model won't be able to load the semantic model and return a *Cannot load model* error. Move the large-storage format semantic model back to its original region to make it available again.

## Considerations and limitations

- Confirm that any movement you initiate between regions follows all corporate and government compliance requirements prior to initiating data transfer.
- Cached data and queries stored in a remote region stays in that region at rest. Additionally, the data at rest is replicated to another region in the same Azure geography for disaster recovery if the Azure geography contains more than one region. Data in transit might go back and forth between multiple geographies.
- The source data might remain in the region from which the data was moved for up to 30 days when moving data from one region to another in a Multi-Geo environment. During that time end users don't have access to it. It's removed from this region and destroyed during the 30-day period.
- Query text and query result traffic for imported and DirectQuery data models doesn't transit through the home region. The report metadata does still come from the home region, and certain DNS routing states might take such traffic out of the region.
- Certain features such as screenshots, data alerts and others will still process data in the home region.
- The detailed semantic model metadata that is cached as part of [enhanced metadata scanning](/power-bi/enterprise/service-admin-metadata-scanning) is always stored in the home region, even if the scanned semantic model is located in a remote region.
- The [dataflows](/power-bi/transform-model/dataflows/dataflows-introduction-self-service) feature isn't supported on Multi-Geo at this time.
- It's possible to create and maintain large-storage format semantic models in remote regions to meet data residency requirements. However, you can't move storage format semantic models to another region. Moving large-storage format semantic models from the region where they were created results in reports failing to load the semantic model. Move the large-storage semantic model back to its original region to make it available. If you must move such a model, deploy it as if it was a new model, and then delete the old model from the undesired region.
- Multi-Geo doesn't support [Metrics in Power BI](/power-bi/create-reports/service-goals-introduction).

## Related content

- [What is Power BI Premium?](/power-bi/enterprise/service-premium-what-is)
- [Multi-Geo support for Power BI Embedded](/power-bi/developer/embedded/embedded-multi-geo)
