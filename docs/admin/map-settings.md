---
title: Map tenant settings 
description: Toggle tenant settings to permit or restrict organization members from using Map items.
author: deniseatmicrosoft
ms.author: limingchen
ms.topic: how-to
ms.date: 09/15/2025
ms.search.form: Map tenant settings
ms.service: azure-maps
ms.subservice: 
---

# Map tenant settings

Tenant settings control whether members of your organization can use Map items. Administrators can enable or disable this feature to allow or restrict access. If enabled, users can create, view, and interact with Map items in their Fabric environment. If disabled, Map item functionality is unavailable to all users in the tenant.

Microsoft Fabric includes two tenant settings that determine whether Azure Maps services are available in Map items and Map visualizations. These settings affect user access to map-powered features, including Map items and Map visualizations within Notebooks.

## Access to Azure Maps Services

When the **Users can use Azure Maps services** setting is enabled, users can access both the Map item and the Map visualization in Notebooks. These features, powered by Azure Maps, allow users to create location-aware reports, monitor real-time telemetry, and explore spatial data directly within Microsoft Fabric.

This setting determines whether members of your organization, or specific security groups, can access Azure Maps-powered experiences within Microsoft Fabric. When enabled, users can utilize features such as Interactive Maps and geospatial analytics across Fabric components like Map items, Map visualizations, and Notebooks. Disabling this setting restricts access to these location-aware capabilities, helping administrators manage data usage and compliance based on organizational needs.

:::image type="content" source="media/tenant-settings/access-azure-maps-services.png" alt-text="A screenshot of the Azure Maps 'Users can use Azure Maps services' settings.":::

**Default**: Enabled

## Configure global data processing

The **Data sent to Azure Maps can be processed outside your capacity’s geographic region, compliance boundary or national cloud instance** setting is relevant only for customers who plan to use Map items and Map visualizations in Notebooks powered by Azure Maps, and whose capacity's geographic region is outside the supported Azure Maps service regions.

When enabled, this setting allows data sent to Azure Maps to be routed to the nearest available region, which may reside outside your organization’s compliance boundary or national cloud instance. This ensures uninterrupted access to Azure Maps capabilities in unsupported regions.

> [!NOTE]
> This setting alone does not enable Azure Maps. You must also enable the setting **Users can use Azure Maps services**.

:::image type="content" source="./media/tenant-settings/configure-global-data-processing.png" alt-text="A screenshot of the Azure Maps global data processing settings.":::

**Default**: Disabled

> [!NOTE]
> Azure Maps does not process or transmit any customer names or personally identifiable information (PII).
