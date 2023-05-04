---
title: Domains (preview)
description: Learn about domains and how to create and manage them.
author: paulinbar
ms.author: painbar
ms.topic: concept
ms.date: 05/02/2023
---

# Domains (preview)

Today, organizations are facing massive growth in data, and there's an increasing need to be able to organize and manage that data in a logical way that facilitates more targeted and efficient use and governance.

To meet this challenge, organizations are shifting from traditional IT centric data architectures, where the data is governed and managed centrally, to more federated models organized according to business needs. This federated data architecture is called data mesh. A data mesh is a decentralized data architecture that organizes data by specific business domains, such as marketing, sales, human resources, etc.

For public preview, Microsoft Fabric's data mesh architecture primarily supports organizing data into domains and enabling data consumers to be able to filter and find content by domain. Future releases will enable federated governance, which means that some of the governance currently controlled at the tenant level will move to domain-level control, enabling each business unit/department to define its own rules and restrictions according to its specific business needs.

## What are Fabric domains?

In Fabric, a domain is a way of logically grouping together all the data in an organization that is relevant to a particular area or field. One of the most common uses for domains is to group data by business department, making it possible for departments to manage their data according to their specific regulations, restrictions, and needs.

To group data into domains, workspaces are associated with domains. When a workspace is associated with a domain, all the items in the workspace are also associated with the domain, and they receive a domain attribute as part of their metadata. During the Fabric public preview, the association of workspaces and the items included within them with domains primarily enables a better consumption experience. For instance, in the OneLake data hub, users can filter content by domain in order find content that is relevant to them. Going forward, capabilities for managing and governing data at the domain level will be added.

## Key concepts

### Domain roles

There are three roles involved in domains:

* **Power BI admin** (or higher): Power BI admins can create and edit domains, specify domain admins and domain contributors, and associate workspaces with domains. Power BI admins can also see all the defined domains on the Domains page in the admin center, and they can edit and delete domains.

* **Domain admin**: Ideally, the domain admins of a domain are the business owners or designated experts. They should be familiar with the data in their area and the regulations and restrictions that are relevant to it.

    Domain admins have access to the **Domains** page in the admin center, but they can only see and edit the domains they're admins of. Domain admins can update the domain description, define/update domain contributors, and associate workspaces with the domain. They also can define and update the domain image and override tenant settings for any specific settings the tenant admin has delegated to the domain level. They can't delete the domain, change the domain name, or add/delete other domain admins.

* **Domain contributor**: Domain contributors are [workspace admins](../get-started/roles-workspaces.md) who have been authorized by the domain or Power BI admin to associate the workspaces they're the admins of to a domain, or to change the current domain association.

    Domain contributors associate the workspaces they're an admin of in the settings of the workspace itself. They don’t have access to the **Domains** page in the admin center.
    
    > [!NOTE]
    > Remember, to be able to associate a their workspace to a domain, a domain contributor must be a workspace admin (that is, have the [Admin role](../get-started/roles-workspaces.md) in the workspace).

### Domain image

When users look for data items in the OneLake data hub, they may want to see only the data items that belong to a particular domain. To do this they can select the domain in the domain selector on the data hub to display only items belonging to that domain. To remind them of which domain's data items they're seeing, you can choose an image to represent your domain. Then, when your domain is selected, the image will become part of the theme of the data hub, as illustrated in the following image.

:::image type="content" source="./media/domains/domain-image-data-hub.png" alt-text="Screenshot of the OneLake data hub with a domain image.":::

## Create a domain

To create domain you must be a Power BI admin.

1. Open the admin center and select **Domains**.

1. On the **Domains** page that opens, select **Create new domain**.

    :::image type="content" source="./media/domains/domains-page.png" alt-text="Screenshot of domains page.":::

1. On the new domain’s configuration page, provide a name (mandatory) and a description for the domain.

    :::image type="content" source="./media/domains/domains-new-name.png" alt-text="Screenshot of domains new details section.":::

1. Select **Apply**. The domain will be created, and you can continue configuring the domain as described in the following sections.

## Configure a domain

Power BI and domain admins can configure a domain on the domain's configuration page. To get to the domain's configuration page, go to the admin center, choose **Domains**, and then select the domain you want to configure.

:::image type="content" source="./media/domains/configure-choose-domain.png" alt-text="Screenshot showing the domains page-for choosing domain to configure.":::

Domain admins see only domains they are admins of.

### Edit name and description

Power BI admins can edit the name and description fields. Domain admins can edit the description field only.

1. Expand the Name and description section and make your desired changes.

    :::image type="content" source="./media/domains/domain-edit-details.png" alt-text="Screenshot showing the domains name and description fields.":::

1. When done, select **Apply**.

### Choose a domain image

Expand the Domain image section and select **Select an image**. In the photo gallery that pops up you can choose an image or color to represent your domain in the OneLake data hub when your domain is selected.

:::image type="content" source="./media/domains/domain-image-gallery.png" alt-text="Screenshot showing the domains image gallery.":::

### Specify domain admins

To specify domain admins, you must be a Power BI admin.

1. Expand the Domain admins section and specify who will be able to assign workspaces to the domain. You can specify everyone in the organization (default), specific users/groups only, or you can allow only tenant admins and the specific domain admins to associate workspaces to the domain.

    :::image type="content" source="./media/domains/domain-specify-domain-admins.png" alt-text="Screenshot showing domain admins specification section.":::

1. Select **Apply**.

### Specify domain contributors

To specify domain contributors, you must be a domain admin for the domain or a Power BI admin.

1. Expand the Domain contributors section and specify who will be able to assign workspaces to the domain. You can specify everyone in the organization (default), specific users/groups only, or you can allow only tenant admins and the specific domain admins to associate workspaces to the domain.

    :::image type="content" source="./media/domains/domain-specify-domain-contributors.png" alt-text="Screenshot showing domain contributor specification section.":::

1. Select **Apply**.

>[!NOTE]
> For domain contributors to be able to associate their workspaces with their domains, they must have an admin role in the workspaces they are trying to associate with the domain.

### Assign workspaces to the domain

Power BI admins and domain admins can associate workspaces with the domain on the domains.

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

## Next steps

* Domain contributors: [Specify a domain in a workspace](../get-started/create-workspaces.md#specify-a-domain)