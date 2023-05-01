---
title: Create a domain in Microsoft Fabric (preview)
description: As a Power BI administrator, learn how to create a domain in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: concept
ms.date: 04/08/2023
---

# Create a domain in Microsoft Fabric (preview)

## Create the domain

To create domain you must be a tenant admin.

1. Open the admin portal and select **Domains**.

1. On the **Domains** page that opens, select **Create new domain**.

    [Image]

1. On the new domain’s configuration page, provide a name (mandatory) and description for the domain.

    [Image]

1. Specify a domain image (optional). The domain image will be displayed in the OneLake data hub after filtering by this domain. WHen you select **Select an image**, a photo gallery will pop up and you can chose an image/color that you think best represents your domain.

1. Select **Apply**. The domain will be created, and you can continue configuring the domain as described in the following sections.


## Specify domain administrators

While creating a new domain or editing an existing domain, you can define domain admins for the domain. You can specify specific users, security groups, or both.

1. Open the admin center and select **Domains**. This opens the Domains page.

    [Image]

1. On the Domains page, select the domain you want to define domain admins for.

1. On the domain's configuration page, expand the Domain admins section and define the domain admins. You can specify specific users, security groups, or both.

    [Image]

1. Select **Apply**.

## Specify domain contributors

To specify domain contributors, you must be a domain admin for the domain or a tenant admin.

While creating a new domain or editing an existing domain, you can specify domain contributors.

1. On the domain's configuration page, expand the Domains section and specify the domain contributors. You can set it to be open for the entire organization (default), specific users/groups, or you can allow only tenant admins and the specific domain admins to associate workspaces to the domain.

    [Image]

1. Select **Apply**.

>[!NOTE]
> For domain contributors to be able to associate their workspaces with their domains, they must have an admin role in the workspaces they are trying to associate with the domain.

## Associate workspaces with domains

Tenant admins and domain admins can associate workspaces with the domain on the domains configuration page in the admin portal.

1. Expand the **Workspaces in this domain** section. If any workspaces have been associated with the domain, they will be listed here.

1. Select **Assign workspaces**.

    [Image]
 
1. In the **Assign workspaces to this domain** side pane that appears, select how to assign the workspaces.

    [Image]

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

[Image]


## Next steps

* placeholder