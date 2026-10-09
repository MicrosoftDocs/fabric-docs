---
title: Manage Fabric settings in OneLake Catalog
description: Learn about the Fabric settings you can manage and configure in the OneLake catalog on the Govern tab, including settings for capacities, workspaces, domains, tags, and other Fabric configurations including tenant settings.
#customer intent: As a Fabric admin, I want to know how to use the OneLake catalog to manage all the settings across my Fabric tenants and workspaces.
ms.date: 09/10/2026
ms.topic: how-to
---

# Manage Microsoft Fabric settings in OneLake catalog

The OneLake catalog in Fabric provides a centralized location for managing and configuring Fabric settings. Administrators can use this interface to efficiently oversee and adjust settings across capacities, workspaces, domains, tags, and other Fabric configurations, including tenant settings.

## Manage capacities

In the OneLake catalog, administrators can manage capacities, which are the resources allocated for various workloads in Fabric. This task includes creating new capacities, configuring capacity settings, and monitoring their usage to ensure optimal performance and resource allocation.

To manage capacities:

1. Sign in to Fabric by using your administrator account.
1. Select **OneLake catalog**, and then go to **Govern** > **Capacities**.
   - To view details and usage data for an existing capacity, select a capacity from the list.
   - To take actions on a capacity (such as pause, resize, reassign, configure settings, and more) select the options menu (three dots) next to the capacity name. 
   - To create a new capacity, select **+ New capacity**.
      
For more guidance on managing capacities, refer to the [Manage Fabric capacities](onelake-catalog-capacities.md) article.

:::image type="content" source="media/onelake-catalog-manage-settings/onelake-catalog-manage-capacities.png" alt-text="Screenshot of OneLake catalog Manage Capacities page listing capacities with status, size, region, and admins." lightbox="media/onelake-catalog-manage-settings/onelake-catalog-manage-capacities.png":::

## Manage workspaces

Administrators can manage workspaces in the OneLake catalog. Workspaces serve as collaborative environments for organizing and working with data, reports, and other resources. This management includes creating new workspaces, configuring workspace settings, managing access permissions, and monitoring workspace activity to maintain efficient collaboration and security.

To manage workspaces:

1. Sign in to Fabric by using your administrator account.
1. Select **OneLake catalog**, and then go to **Govern** > **Workspaces**.
   - To configure settings for a workspace, select the **More options** menu (three dots) next to a workspace name, then select **Edit**. 
   - To manage access to a workspace, select the three dots next to the capacity name to take actions on a capacity such as pause, resize, reassign, and configure settings. 
   - To create a new capacity, select **+ New capacity**.
      
For more guidance on managing workspaces, refer to the [Manage Fabric workspaces](../admin/portal-workspaces.md) article.

:::image type="content" source="media/onelake-catalog-manage-settings/onelake-catalog-govern-workspaces-list.png" alt-text="Screenshot of OneLake catalog Govern tab showing the Workspaces list with names, types, states, and capacity details." lightbox="media/onelake-catalog-manage-settings/onelake-catalog-govern-workspaces-list.png":::

## Manage domains

The OneLake catalog allows administrators to manage domains, which organize and control access to data within Fabric. Administrators can create and configure domains, assign ownership, and set access policies to ensure proper data governance and security.

To manage domains:

1. Sign in to Fabric by using your administrator account.
2. Select **OneLake catalog**, and then go to **Govern** > **Domains**.
   - To create a new domain, select **+ New domain**.
   - To view details and manage an existing domain, select a domain from the list.

:::image type="content" source="media/onelake-catalog-manage-settings/onelake-catalog-govern-domains-dashboard.png" alt-text="Screenshot of OneLake catalog Govern tab showing Domains overview with charts and recommended actions." lightbox="media/onelake-catalog-manage-settings/onelake-catalog-govern-domains-dashboard.png":::

## Manage tags

Administrators can use tags in the OneLake catalog to categorize and label various resources for easier management and discovery. This task includes creating new tags, applying them to resources, and managing existing tags to maintain a well-organized and searchable catalog.

To manage tags:

1. Sign in to Fabric by using your administrator account.
2. Select **OneLake catalog**, and then go to **Govern** > **Tags**.
   - To create a new tag, select **+ New tag**.
   - To view details and manage an existing tag, select a tag from the list.

For more guidance on managing tags, see [Manage Fabric tags](tags-apply.md).

:::image type="content" source="media/onelake-catalog-manage-settings/onelake-catalog-tags-list-view.png" alt-text="Screenshot of OneLake catalog Govern tab showing Tags page with New tag button and list of tags." lightbox="media/onelake-catalog-manage-settings/onelake-catalog-tags-list-view.png":::

## Manage other Fabric settings

In addition to capacities, workspaces, domains, and tags, the OneLake catalog provides options for configuring other Fabric settings, including tenant settings. Administrators can configure these settings to tailor the Fabric environment to their organization's needs, ensuring optimal performance, security, and compliance.

To manage other Fabric settings:

1. Sign in to Fabric by using your administrator account.
2. Select **OneLake catalog**, and then go to **Govern** > **Configurations**.
   - To modify tenant settings, select **Tenant settings** and make the necessary changes.
   - To configure other Fabric options, select the relevant configuration and update the settings as needed.
   
:::image type="content" source="media/onelake-catalog-manage-settings/onelake-catalog-govern-tenant-settings-configurations.png" alt-text="Screenshot of OneLake catalog Govern tab showing Configurations page with Tenant settings and Microsoft Fabric options." lightbox="media/onelake-catalog-manage-settings/onelake-catalog-govern-tenant-settings-configurations.png":::

## Related content

- [Azure connections](../admin/service-admin-portal-azure-connections.md)
- [Embed codes](../admin/service-admin-portal-embed-codes.md)
- [Fabric identities](../admin/fabric-identities-manage.md)
- [Featured content](../admin/service-admin-portal-featured-content.md)
- [Organizational visuals](../admin/service-admin-portal-organizational-visuals.md)
- [Workloads](../admin/service-admin-portal-additional-workloads.md)
- [Help and support settings](../admin/service-admin-portal-help-support.md)
- [Custom branding](../admin/service-admin-custom-branding.md)
