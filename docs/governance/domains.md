---
title: Domains
description: Learn about domains and how to create and manage them.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 03/19/2024
---

# Fabric domains

Today, organizations are facing massive growth in data, and there's an increasing need to be able to organize and manage that data in a logical way that facilitates more targeted and efficient use and governance.

To meet this challenge, organizations are shifting from traditional IT centric data architectures, where the data is governed and managed centrally, to more federated models organized according to business needs. This federated data architecture is called *data mesh*. A data mesh is a decentralized data architecture that organizes data by specific business domains, such as marketing, sales, human resources, etc.

Currently, Microsoft Fabric's data mesh architecture primarily supports organizing data into domains and enabling data consumers to be able to filter and find content by domain. It also enables federated governance, which means that some governance currently controlled at the tenant level can be [delegated to domain-level control](#domain-settings-delegation), enabling each business unit/department to define its own rules and restrictions according to its specific business needs.

## Key concepts

### Domains

In Fabric, a domain is a way of logically grouping together all the data in an organization that is relevant to a particular area or field. One of the most common uses for domains is to group data by business department, making it possible for departments to manage their data according to their specific regulations, restrictions, and needs.

To group data into domains, workspaces are associated with domains. When a workspace is associated with a domain, all the items in the workspace are also associated with the domain, and they receive a domain attribute as part of their metadata. Currently, the association of workspaces and the items in them with domains primarily enables a better consumption experience. For instance, in the [OneLake data hub](../get-started/onelake-data-hub.md), users can filter content by domain in order find content that is relevant to them. In addition, some tenant-level settings for managing and governing data can be [delegated to the domain level](#domain-settings-delegation), thus allowing domain-specific configuration of those settings.

### Subdomains

A subdomain is a way for fine tuning the logical grouping of your data. You can create subdomains under domains. For information about how to create subdomains, see [Create subdomains](#create-subdomains). 
 
### Domain roles

There are three roles involved in the creation and management of domains:

* **Fabric admin** (or higher): Fabric admins can create and edit domains, specify domain admins and domain contributors, and associate workspaces with domains. Fabric admins see all the defined domains on the Domains tab in the admin portal, and they can edit and delete domains.

* **Domain admin**: Ideally, the domain admins of a domain are the business owners or designated experts. They should be familiar with the data in their area and the regulations and restrictions that are relevant to it.

    Domain admins can access to the **Domains** tab in the admin portal, but they can only see and edit the domains they're admins of. Domain admins can update the domain description, define/update domain contributors, and associate workspaces with the domain. They also can define and update the [domain image](#domain-image) and [override tenant settings](#domain-settings-delegation) for any specific settings the tenant admin has delegated to the domain level. They can't delete the domain, change the domain name, or add/delete other domain admins.

* **Domain contributor**: Domain contributors are [workspace admins](../get-started/roles-workspaces.md) whom a domain or Fabric admin has authorized to assign the workspaces they're the admins of to a domain, or to change the current domain assignment.

    Domain contributors assign the workspaces they're an admin of in the settings of the workspace itself. They don't have access to the **Domains** tab in the admin portal.
    
    > [!NOTE]
    > Remember, to be able to assign a workspace to a domain, a domain contributor must be a workspace admin (that is, have the [Admin role](../get-started/roles-workspaces.md) in the workspace).

### Domain settings delegation

To allow domain-specific configuration, some tenant-level settings for managing and governing data can be [delegated to the domain level](#delegate-settings-to-the-domain-level). Domain settings delegation enables each business unit/department to define its own rules and restrictions according to its specific business needs.

### Domain image

When users look for data items in the OneLake data hub, they might want to see only the data items that belong to a particular domain. To do this, they can select the domain in the domain selector on the data hub to display only items belonging to that domain. To remind them which domain's data items they're seeing, you can choose an image to represent your domain. Then, when your domain is selected in the domain selector, the image becomes part of the data hub's theme, as illustrated in the following image.

:::image type="content" source="./media/domains/domain-image-data-hub.png" alt-text="Screenshot of the OneLake data hub with a domain image.":::

For information about how to specify an image for a domain, see [Specify a domain image](#specify-a-domain-image).

### Default domain

A default domain is a domain that has been defined as the default domain for specified users and/or specified security groups. When you define a domain as the default domain for specified users and/or specified security groups, the following happens:

1. The system scans the organization's workspaces. When it finds a workspace whose admin is one of the specified users or a member of the one of the specified security groups:
    * If the workspace already has a domain assignment, nothing happens. The default domain doesn't override the current assignment.
    * If the workspace is unassigned, it is assigned to the default domain.
1. After this, whenever a specified user or member of a specified security group creates a new workspace, it is assigned to the default domain.

The specified users and/or members of the specified security groups generally automatically become domain contributors of workspaces that are assigned in this manner.

For information about specifying a default domain, see [Specify a default domain](#define-the-domain-as-a-default-domain).

## Create a domain

To create domain, you must be a Fabric admin.

1. Open the admin portal and select the **Domains** tab.

1. On the **Domains** tab, select **Create new domain**.

    :::image type="content" source="./media/domains/domains-page.png" alt-text="Screenshot of domains page." lightbox="./media/domains/domains-page.png":::

1. In the **New domain** dialog that appears, provide a name (mandatory) and specify domain admins (optional). If you don't specify domain admins, you can do this later in the domain settings.

    :::image type="content" source="./media/domains/domains-new-name.png" alt-text="Screenshot of domains new details section.":::

1. Select **Create**. The domain is created, and you can continue configuring the domain as described in the following sections.

## Structure your data in the domain

Once you create some domains, you can refine the logic of the way you're structuring your data by creating subdomains for the domains.

You organize your data into the appropriate domains and subdomains by assigning the workspaces the data is located in to the relevant domain or subdomain. When a workspace is assigned to a domain, all the items in the workspace are associated with the domain.

### Create subdomains

To create subdomains for a domain, you must be Fabric admin or domain admin.

1. Open the domain you want to create a subdomain for and select **New subdomain**.

    :::image type="content" source="./media/domains/select-new-subdomain.png" alt-text="Screenshot of open domain menu option.":::
 
1. Provide a name for the subdomain in the **New subdomain** dialog that appears. When done, select **Create**.

    :::image type="content" source="./media/domains/new-subdomain-dialog.png" alt-text="Screenshot of new subdomain dialog.":::

    > [!NOTE]
    > Subdomains don't have their own domain admins. A subdomain's domain admins are the domain admins of its parent domain.

### Assign workspaces to domains and subdomains

To assign workspaces to a domain or subdomain in the admin portal, you must be a Fabric admin or a domain admin.

1. Go to the domain or subdomain's page and select **Assign workspaces**.

    :::image type="content" source="./media/domains/domain-assign-workspaces-link.png" alt-text="Screenshot showing assign workspaces link.":::
 
1. In the **Assign workspaces to this domain** side pane, select how to assign the workspaces.

    :::image type="content" source="./media/domains/domain-assign-workspaces-to-this-domain.png" alt-text="Screenshot showing assign workspaces side pane.":::

* **Assign by workspace name**

    * Some organizations have naming conventions for workspaces that make it easy to identify the data's business context.
    * You can search for and select multiple workspaces at once
    * If a workspace is already associated with another domain, you'll see an icon next to the specific name. If you chose to continue the action, a warning message pops up, but you'll be able to continue and override the previous association.

* **Assign by workspace admin**
    * You can select specific users or security groups as per your business structure. When you confirm the selection, all the workspaces the users and security groups are admins of will be associated to the domain.
    * This action excludes "My workspaces".
    * If some of the workspaces are already associated with another domain, a warning message will pop up, but you'll be able to continue and override the previous association.
   * This action affects existing workspaces only. It won't affect workspaces the selected users create after the action has been performed.
 * **Assign by capacity**
    * Some organizations have dedicated capacities per department/business unit.
     * You can search for and select multiple capacities at once. When you confirm your selection, all the workspaces associated to the selected capacities will be assigned to the domain.
    * If some of the workspaces are already associated with another domain, a warning message will pop up, but you'll be able to continue and override the previous association.
     * This action excludes "My workspaces".
    * This action affects existing workspaces only. It won't affect workspaces that are assigned to the specified capacities after the action has been performed.

> [!NOTE]
> Workspace domain assignments by Fabric and domain admins will override existing assignments only if the **Allow tenant and domain admins to override workspace assignments (preview)** tenant setting is enabled. For more information, see [Allow tenant and domain admins to override workspace assignments (preview)](../admin/service-admin-portal-domain-management-settings.md#allow-tenant-and-domain-admins-to-override-workspace-assignments-preview).

To unassign a workspace from a domain or subdomain, select the checkbox next to the workspace name and then select the **Unassign** button above the list. You can select several checkboxes to unassign more than one workspace at a time.

:::image type="content" source="./media/domains/domain-unassign-workspace.png" alt-text="Screenshot showing how to unassign workspaces.":::

## Configure domain settings

You configure domain and subdomain settings on the domain or subdomain's **Domain settings** side pane.

The domain settings side pane has the following tabs:

* [General settings](#edit-name-and-description): Edit domain name and description
* [Image](#specify-a-domain-image): Specify domain image
* [Admins](#specify-domain-admins): Specify domain admins
* [Contributors](#specify-domain-contributors): Specify domain contributors
* [Default domain](#specify-a-default-domain): Set up domain as a default domain
* [Delegated settings](#delegate-settings-to-the-domain-level): Override tenant-level settings

> [!NOTE]
> Subdomains currently have general settings only.

To open the **Domain settings** side pane, open the domain or subdomain and select **Domain settings** (for subdomains, **Subdomain settings**).

:::image type="content" source="./media/domains/open-domain-settings.png" alt-text="Screenshot showing how to open the domain settings pane.":::

Alternatively, for domains, you can hover over the domain on the Domain tab, select **More options (...)**, and choose **Settings**.

:::image type="content" source="./media/domains/open-domain-settings-menu-option.png" alt-text="Screenshot of the domain settings menu option.":::

### Edit name and description

1. Select **General settings** and then edit the name and description fields as desired.

    :::image type="content" source="./media/domains/domain-edit-details.png" alt-text="Screenshot showing the domains name and description fields.":::

    >[!NOTE]
    > Domain admins can only edit the description field.

1. When done, select **Apply**.

### Specify a domain image

Select **Image** and then select **Select an image**.

In the photo gallery that pops up you can choose an image or color to represent your domain in the OneLake data hub when your domain is selected.

:::image type="content" source="./media/domains/domain-image-gallery.png" alt-text="Screenshot showing the domains image gallery.":::

### Specify domain admins

You must be a Fabric admin to specify domain admins.

Select **Admins** and then specify who can change domain settings and add or remove workspaces. When done, select **Apply**.

:::image type="content" source="./media/domains/domain-specify-domain-admins.png" alt-text="Screenshot showing domain admins specification section.":::

### Specify domain contributors

You must be a domain admin of the domain or a Fabric admin to specify domain contributors.

Select **Contributors** and then specify who can assign workspaces to the domain. You can specify everyone in the organization (default), specific users/groups only, or you can allow only tenant admins and the specific domain admins to assign workspaces to the domain. When done, select **Apply**.

:::image type="content" source="./media/domains/domain-specify-domain-contributors.png" alt-text="Screenshot showing domain contributor specification section.":::

>[!NOTE]
> For domain contributors to be able to associate their workspaces with their domains, they must have an admin role in the workspaces they are trying to associate with the domain.

### Define the domain as a default domain

To specify a domain as a default domain, you must be a Fabric admin or a domain admin of the domain.

Select **Default domain** and specify users and/or security groups. When you add people to the default domain list, new and unassigned workpaces they are admins of are automatically assigned to the domain. For a more detailed description of the process, see [Default domain](#default-domain).

:::image type="content" source="./media/domains/domain-specify-default-domain.png" alt-text="Screenshot showing default domain specification section.":::

> [!Note]
> The users and/or members of the security groups specified in the default domain definition generally automatically become domain contributors of the workspaces that get assigned to the domain via the default domain mechanism.

### Delegate settings to the domain level

Some tenant-level settings can potentially be overridden at the domain level. To see these settings, select **Delegated Settings**. The following admin settings can potentially be overridden.

#### Certification settings

Certification is a way for organizations to label items that it considers to be quality items. For more information about certification, see [Endorsement](./endorsement-overview.md).

Certification settings at the domain level mean you can:

* Enable or disable certification of items that belong to the domain.
* Specify certifiers who are experts in the domain.
* Provide a URL to documentation that is relevant to certification in the domain.

To override the tenant-level certification settings, expand the certification section, select the **Override tenant admin selection** checkbox, and configure the settings as desired.

:::image type="content" source="./media/domains/domain-override-tenant-admin-selection.png" alt-text="Screenshot of certification override.":::

For descriptions of the things you need to set, see [Set up certification](../admin/endorsement-setup.md#set-up-certification).

## Microsoft Fabric REST Admin APIs for domains

Most of the actions available from the UI are available through the Fabric REST Admin APIs for domains. For more information, see [Domains API reference](/rest/api/fabric/admin/domains).

## Track user activity on domains

Whenever a domain is created, edited or deleted, that activity is recorded in the audit log for Fabric. You can track these activities in the unified audit log or in the Fabric activity log. For information about the information in the Fabric auditing schema that's specific to domains, see [Audit schema for domains](./domains-audit-schema.md).

## Related content

* [Domain management tenant settings](../admin/service-admin-portal-domain-management-settings.md)
* [Microsoft Fabric REST Admin APIs for domains](/rest/api/fabric/admin/domains)
* [Audit schema for domains](./domains-audit-schema.md)
* [Admin role in workspaces](../get-started/roles-workspaces.md)
