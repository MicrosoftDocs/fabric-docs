---
title: Domains
description: Learn about domains and how to create and manage them.
author: paulinbar
ms.author: painbar
ms.topic: concept-article
ms.custom: build-2023
ms.date: 10/30/2023
---

# Fabric domains

Today, organizations are facing massive growth in data, and there's an increasing need to be able to organize and manage that data in a logical way that facilitates more targeted and efficient use and governance.

To meet this challenge, organizations are shifting from traditional IT centric data architectures, where the data is governed and managed centrally, to more federated models organized according to business needs. This federated data architecture is called data mesh. A data mesh is a decentralized data architecture that organizes data by specific business domains, such as marketing, sales, human resources, etc.

Currently, Microsoft Fabric's data mesh architecture primarily supports organizing data into domains and enabling data consumers to be able to filter and find content by domain. It also enables federated governance, which means that some governance currently controlled at the tenant level can be [delegated to domain-level control](#override-tenant-level-settings), enabling each business unit/department to define its own rules and restrictions according to its specific business needs.

> [!NOTE]
> Customers using Purview, are strongly recommended to create the same domains in Fabric and in Purview for better integration and alignment.

## Key concepts

### Domains

In Fabric, a domain is a way of logically grouping together all the data in an organization that is relevant to a particular area or field. One of the most common uses for domains is to group data by business department, making it possible for departments to manage their data according to their specific regulations, restrictions, and needs.

To group data into domains, workspaces are associated with domains. When a workspace is associated with a domain, all the items in the workspace are also associated with the domain, and they receive a domain attribute as part of their metadata. Currently, the association of workspaces and the items included within them with domains primarily enables a better consumption experience. For instance, in the [OneLake data hub](../get-started/onelake-data-hub.md), users can filter content by domain in order find content that is relevant to them. In addition, some tenant-level settings for managing and governing data can be [delegated to the domain level](#override-tenant-level-settings), thus allowing domain-specific configuration of those settings.

### Subdomains

You can create subdomains under domains. A subomain is a way for fine tuning the logical grouping of your data. For information about how to create subdomains, see [Create subdomains](#create-subdomains). 
 
### Domain roles

There are three roles involved in the creation and management of domains:

* **Fabric admin** (or higher): Fabric admins can create and edit domains, specify domain admins and domain contributors, and associate workspaces with domains. Fabric admins can also see all the defined domains on the Domains page in the admin portal, and they can edit and delete domains.

* **Domain admin**: Ideally, the domain admins of a domain are the business owners or designated experts. They should be familiar with the data in their area and the regulations and restrictions that are relevant to it.

    Domain admins have access to the **Domains** page in the admin portal, but they can only see and edit the domains they're admins of. Domain admins can update the domain description, define/update domain contributors, and associate workspaces with the domain. They also can define and update the domain image and override tenant settings for any specific settings the tenant admin has delegated to the domain level. They can't delete the domain, change the domain name, or add/delete other domain admins.

* **Domain contributor**: Domain contributors are [workspace admins](../get-started/roles-workspaces.md) who have been authorized by the domain or Fabric admin to associate the workspaces they're the admins of to a domain, or to change the current domain association.

    Domain contributors associate the workspaces they're an admin of in the settings of the workspace itself. They don’t have access to the **Domains** page in the admin portal.
    
    > [!NOTE]
    > Remember, to be able to associate a workspace to a domain, a domain contributor must be a workspace admin (that is, have the [Admin role](../get-started/roles-workspaces.md) in the workspace).

### Domain settings delegation

Some tenant-level settings for managing and governing data can be [delegated to the domain level](#override-tenant-level-settings). This allows domain-specific configuration of those settings.

It also enables federated governance, which means that some governance currently controlled at the tenant level can be [delegated to domain-level control](#override-tenant-level-settings), enabling each business unit/department to define its own rules and restrictions according to its specific business needs.

### Domain image

When users look for data items in the OneLake data hub, they may want to see only the data items that belong to a particular domain. To do this they can select the domain in the domain selector on the data hub to display only items belonging to that domain. To remind them of which domain's data items they're seeing, you can choose an image to represent your domain. Then, when your domain is selected, the image will become part of the theme of the data hub, as illustrated in the following image.

:::image type="content" source="./media/domains/domain-image-data-hub.png" alt-text="Screenshot of the OneLake data hub with a domain image.":::

For information about how to specify an image for a domain, see [Specify a domain image](#specify-a-domain-image).

### Default domain

A default domain is a domain that has been specified as default domain for specific users and security groups. It means that when these users/security groups create a new workspace, or when they update a workspacethat they are an admin of and as yet has no associate domain, that workspace will automatically be associated to that (default) domain. In general, these users/security groups will become "default"’" contributors. Default domain contributors associate the workspaces they're an admin of in the settings of the workspace itself. They don't have access to the Domains page in the admin portal.

Default domains are defined by tenant and domain admins in the domains section of the admin portal. See [Default domains](#default-domain) for details.

## Create a domain

To create domain you must be a Fabric admin.

1. Open the admin portal and select **Domains**.

1. On the **Domains** page that opens, select **Create new domain**.

    :::image type="content" source="./media/domains/domains-page.png" alt-text="Screenshot of domains page.":::

1. On the new domain’s configuration page, provide a name (mandatory) and a description for the domain.

    :::image type="content" source="./media/domains/domains-new-name.png" alt-text="Screenshot of domains new details section.":::

1. Select **Apply**. The domain will be created, and you can continue configuring the domain as described in the following sections.

## Structure your data in the domain

### Create subdomains

### Assign workspaces to domains

Fabric admins and domain admins can associate workspaces with the domain on the domains.

1. Expand the **Workspaces in this domain** section. If any workspaces have been associated with the domain, they will be listed here.

1. Select **Assign workspaces**.

    :::image type="content" source="./media/domains/domain-assign-workspaces-link.png" alt-text="Screenshot showing assign workspaces link.":::
 
1. In the **Assign workspaces to this domain** side pane that appears, select how to assign the workspaces.

    :::image type="content" source="./media/domains/domain-assign-workspaces-to-this-domain.png" alt-text="Screenshot showing assign workspaces side pane.":::

* **Assign by workspace name**

    * Some organizations have naming conventions for workspaces that make it easy to identify the data’s business context.
    * You can search for and select multiple workspaces at once
    * If a workspace is already associated with another domain, you’ll see an icon next to the specific name. If you chose to continue the action, a warning message will pop up, but you’ll be able to continue and override the previous association.

* **Assign by workspace admin**
    * You can select specific users or security groups as per your business structure. When you confirm the selection, all the workspaces the users and security groups are admins of will be associated to the domain.
    * This action excludes “My workspaces”.
    * If some of the workspaces are already associated with another domain, a warning message will pop up, but you’ll be able to continue and override the previous association.
   * This action affects existing workspaces only. It won’t affect workspaces the selected users create after the action has been performed.
 * **Assign by capacity**
    * Some organizations have dedicated capacities per department/business unit.
     * You can search for and select multiple capacities at once. When you confirm your selection, all the workspaces associated to the selected capacities will be associated with the domain.
    * If some of the workspaces are already associated with another domain, a warning message will pop up, but you’ll be able to continue and override the previous association.
     * This action excludes “My workspaces”.
    * This action affects existing workspaces only. It won’t affect workspaces that are assigned to the specified capacities after the action has been performed.

To unassign a workspace in the Workspaces in this domain section, hover over the workspace entry and select the unassign icon that appears.

To unassign several workspaces at a time, select the checkboxes next to the workspace names and then select the **Unassign** button above the table.

## Configure domain settings

Sub domains configuration contains name and description only at this stage, Fabric admins and domain admins can create, edit and delete sub domains 

### General settings

Fabric admins can edit the name and description fields. Domain admins can edit the description field only.

1. Expand the Name and description section and make your desired changes.

    :::image type="content" source="./media/domains/domain-edit-details.png" alt-text="Screenshot showing the domains name and description fields.":::

1. When done, select **Apply**.

### Specify a domain image

Expand the Domain image section and select **Select an image**. In the photo gallery that pops up you can choose an image or color to represent your domain in the OneLake data hub when your domain is selected.

:::image type="content" source="./media/domains/domain-image-gallery.png" alt-text="Screenshot showing the domains image gallery.":::

### Admins

To specify domain admins, you must be a Fabric admin.

1. Expand the Domain admins section and specify who will be able to assign workspaces to the domain. You can specify everyone in the organization (default), specific users/groups only, or you can allow only tenant admins and the specific domain admins to associate workspaces to the domain.

    :::image type="content" source="./media/domains/domain-specify-domain-admins.png" alt-text="Screenshot showing domain admins specification section.":::

1. Select **Apply**.

### Contributors

To specify domain contributors, you must be a domain admin for the domain or a Fabric admin.

1. Expand the Domain contributors section and specify who will be able to assign workspaces to the domain. You can specify everyone in the organization (default), specific users/groups only, or you can allow only tenant admins and the specific domain admins to associate workspaces to the domain.

    :::image type="content" source="./media/domains/domain-specify-domain-contributors.png" alt-text="Screenshot showing domain contributor specification section.":::

1. Select **Apply**.

>[!NOTE]
> For domain contributors to be able to associate their workspaces with their domains, they must have an admin role in the workspaces they are trying to associate with the domain.

### Default domain

To specify default domain, you must be a domain admin for the domain or a Fabric admin.

Go to Domain Settings and click on the Default Domain tab and specify who will be the users/security group which their WS will be assigned to the domain by default.

Image

### Delegated settings

Some tenant-level settings can potentially be overridden at the domain level. To see these settings, select the **Delegated Settings** tab on the domain's [configuration page](#configure-a-domain). To override a setting, expand the setting you want to override.

The following admin settings can potentially be overridden.

### Certification settings

Certification is a way for organizations to label items that it considers to be quality items. For more information about certification, see [Endorsement](./endorsement-overview.md).

Certification settings at the domain level mean you can:

* Enable or disable certification of items that belong to the domain.
* Specify certifiers who are experts in the domain.
* Provide a URL to documentation that is relevant to certification in the domain.

To override the tenant-level certification settings, expand the certification section. You'll see the tenant-level selections, but greyed out. Select the **Override tenant admin selection** checkbox, and then configure the settings as desired.

> [!NOTE]
> If the checkbox is greyed out and you can't select it, it means that the Fabric admin has not [allowed this setting to be overridden at the domain level](../admin/endorsement-setup.md#set-up-certification).

For descriptions of the things you need to set, see [Set up certification](../admin/endorsement-setup.md#set-up-certification).

:::image type="content" source="./media/domains/domain-override-tenant-admin-selection.png" alt-text="Screenshot of certification override.":::

## Audit schema for domains

## Admin APIs

## Next steps


## Configure a domain

Fabric admins and a domain's admins can configure the domain on the domain's configuration page. To get to the domain's configuration page, go to the admin portal, choose **Domains**, and then select the domain you want to configure.

:::image type="content" source="./media/domains/configure-choose-domain.png" alt-text="Screenshot showing the domains page-for choosing domain to configure.":::

Domain admins see only domains they are admins of.

When you open a domain, you see two tabs: **Details** and **Delegated Settings**.

:::image type="content" source="./media/domains/domain-configuration-page.png" alt-text="Screenshot of domain configuration page, showing the Details and Delegated settings tabs.":::

* On the **Details** tab, you can [configure the various properties of the domain](#configure-domain-details). Some details can only be configured by a Fabric admin, and some details can be configured by either Fabric admins or domain admins.

* On the **Delegated Settings** tab, Fabric admins and domain admins can [override tenant-level settings that have been delegated to the domain level](#override-tenant-level-settings).

## Configure domain details

To configure domain details, select the **Details** pane on the domain's [configuration page](#configure-a-domain).

### Edit name and description

Fabric admins can edit the name and description fields. Domain admins can edit the description field only.

1. Expand the Name and description section and make your desired changes.

    :::image type="content" source="./media/domains/domain-edit-details.png" alt-text="Screenshot showing the domains name and description fields.":::

1. When done, select **Apply**.

### Choose a domain image

Expand the Domain image section and select **Select an image**. In the photo gallery that pops up you can choose an image or color to represent your domain in the OneLake data hub when your domain is selected.

:::image type="content" source="./media/domains/domain-image-gallery.png" alt-text="Screenshot showing the domains image gallery.":::

### Specify domain admins

To specify domain admins, you must be a Fabric admin.

1. Expand the Domain admins section and specify who will be able to assign workspaces to the domain. You can specify everyone in the organization (default), specific users/groups only, or you can allow only tenant admins and the specific domain admins to associate workspaces to the domain.

    :::image type="content" source="./media/domains/domain-specify-domain-admins.png" alt-text="Screenshot showing domain admins specification section.":::

1. Select **Apply**.

### Specify domain contributors

To specify domain contributors, you must be a domain admin for the domain or a Fabric admin.

1. Expand the Domain contributors section and specify who will be able to assign workspaces to the domain. You can specify everyone in the organization (default), specific users/groups only, or you can allow only tenant admins and the specific domain admins to associate workspaces to the domain.

    :::image type="content" source="./media/domains/domain-specify-domain-contributors.png" alt-text="Screenshot showing domain contributor specification section.":::

1. Select **Apply**.

>[!NOTE]
> For domain contributors to be able to associate their workspaces with their domains, they must have an admin role in the workspaces they are trying to associate with the domain.

### Assign workspaces to the domain

Fabric admins and domain admins can associate workspaces with the domain on the domains.

1. Expand the **Workspaces in this domain** section. If any workspaces have been associated with the domain, they will be listed here.

1. Select **Assign workspaces**.

    :::image type="content" source="./media/domains/domain-assign-workspaces-link.png" alt-text="Screenshot showing assign workspaces link.":::
 
1. In the **Assign workspaces to this domain** side pane that appears, select how to assign the workspaces.

    :::image type="content" source="./media/domains/domain-assign-workspaces-to-this-domain.png" alt-text="Screenshot showing assign workspaces side pane.":::

* **Assign by workspace name**

    * Some organizations have naming conventions for workspaces that make it easy to identify the data’s business context.
    * You can search for and select multiple workspaces at once
    * If a workspace is already associated with another domain, you’ll see an icon next to the specific name. If you chose to continue the action, a warning message will pop up, but you’ll be able to continue and override the previous association.

* **Assign by workspace admin**
    * You can select specific users or security groups as per your business structure. When you confirm the selection, all the workspaces the users and security groups are admins of will be associated to the domain.
    * This action excludes “My workspaces”.
    * If some of the workspaces are already associated with another domain, a warning message will pop up, but you’ll be able to continue and override the previous association.
   * This action affects existing workspaces only. It won’t affect workspaces the selected users create after the action has been performed.
 * **Assign by capacity**
    * Some organizations have dedicated capacities per department/business unit.
     * You can search for and select multiple capacities at once. When you confirm your selection, all the workspaces associated to the selected capacities will be associated with the domain.
    * If some of the workspaces are already associated with another domain, a warning message will pop up, but you’ll be able to continue and override the previous association.
     * This action excludes “My workspaces”.
    * This action affects existing workspaces only. It won’t affect workspaces that are assigned to the specified capacities after the action has been performed.

To unassign a workspace in the Workspaces in this domain section, hover over the workspace entry and select the unassign icon that appears.

To unassign several workspaces at a time, select the checkboxes next to the workspace names and then select the **Unassign** button above the table.

## Override tenant-level settings

Some tenant-level settings can potentially be overridden at the domain level. To see these settings, select the **Delegated Settings** tab on the domain's [configuration page](#configure-a-domain). To override a setting, expand the setting you want to override.

The following admin settings can potentially be overridden.

### Certification settings

Certification is a way for organizations to label items that it considers to be quality items. For more information about certification, see [Endorsement](./endorsement-overview.md).

Certification settings at the domain level mean you can:

* Enable or disable certification of items that belong to the domain.
* Specify certifiers who are experts in the domain.
* Provide a URL to documentation that is relevant to certification in the domain.

To override the tenant-level certification settings, expand the certification section. You'll see the tenant-level selections, but greyed out. Select the **Override tenant admin selection** checkbox, and then configure the settings as desired.

> [!NOTE]
> If the checkbox is greyed out and you can't select it, it means that the Fabric admin has not [allowed this setting to be overridden at the domain level](../admin/endorsement-setup.md#set-up-certification).

For descriptions of the things you need to set, see [Set up certification](../admin/endorsement-setup.md#set-up-certification).

:::image type="content" source="./media/domains/domain-override-tenant-admin-selection.png" alt-text="Screenshot of certification override.":::

## Next steps

* [Admin role in workspaces](../get-started/roles-workspaces.md)
