---
title: Workspaces
description: Learn about workspaces, which are collections of artifacts such as lakehouses, warehouses, and reports built to deliver key metrics for your organization.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: yicw, mesrivas,liud
ms.topic: conceptual
ms.date: 05/23/2023
---

# Workspaces

*Workspaces* are places to collaborate with colleagues to create collections of artifacts such as lakehouses, warehouses, and reports. This article describes workspaces, how to manage access to them, and how to use them to create and distribute apps.

Ready to get started? Read [Create a workspace](create-workspaces.md).

:::image type="content" source="media/workspaces/power-bi-workspace-opportunity.png" alt-text="Screenshot showing a workspace.":::

## Working with workspaces

Here are some useful tips about working with workspaces.

- **Use granular workspace roles** for flexible permissions management in the workspaces: Admin, Member, Contributor, and Viewer.  Read more about [workspace roles](#roles-and-licenses) in this article.
- **Workspace settings**: As workspace admin, you can update and manage your workspace configurations in workspace settings.
- **Contact list**: Specify who receives notification about workspace activity. Read more about [workspace contact lists](#workspace-contact-list) in this article.
- **Create template apps**: You can create *template apps* in workspaces. Template apps are apps that you can distribute to customers outside of your organization. Those customers can then connect to their own data with your template app. Read the article about [template apps](/power-bi/connect-data/service-template-apps-overview).
- **Share datasets**: You can share datasets between workspaces. Read more about [shared datasets](/power-bi/connect-data/service-datasets-across-workspaces).

This article explains these features in more detail.

## Workspace settings

Workspace admins can use workspace settings to manage and update the workspace. The settings include general settings of the workspace, like the basic information of the workspace, contact list, OneDrive, license, Azure connections, storage, and other experiences' specific settings.

To open the workspace settings, you can select the workspace in the nav pane, then select **More options (...)** > **Workspace settings** next to the workspace name.

:::image type="content" source="media/workspaces/open-workspace-settings.png" alt-text="Screenshot showing Open workspace settings in nav pane.":::

You can also open it from the workspace page.

:::image type="content" source="media/workspaces/open-in-workspace.png" alt-text="Screenshot showing Open workspace settings in workspace." lightbox="media/workspaces/open-in-workspace.png":::

## Workspace contact list

The **Contact list** feature allows you to specify which users receive notification about issues occurring in the workspace. By default, any user or group specified as a workspace admin in the workspace is notified. You can add to that list. Users or groups in the contact list are also listed in the user interface (UI) of the workspace, so workspace users know whom to contact.

Read about [how to create the workspace contact list](create-workspaces.md#contact-list).

## Microsoft 365 and OneDrive

[!INCLUDE [product-name](../includes/product-name.md)] doesn't create a Microsoft 365 group behind the scenes when you create a workspace. All workspace administration is in [!INCLUDE [product-name](../includes/product-name.md)]. Still, you might find it useful to have a OneDrive associated with the workspace. 

- You can **manage user access** to content through Microsoft 365 groups, if you want. You add a Microsoft 365 group in the workspace access list.

    [!INCLUDE [product-name](../includes/product-name.md)] doesn't synchronize between Microsoft 365 group membership and permissions for users or groups with access to the workspace. You can synchronize them: Manage workspace access through the same Microsoft 365 group whose file storage you configure in this setting.

- You can also **store [!INCLUDE [product-name](../includes/product-name.md)] content in OneDrive for work or school**. With the Workspace OneDrive feature in workspaces, you can configure a Microsoft 365 group whose SharePoint Document Library file storage is available to workspace users. You create the group outside of [!INCLUDE [product-name](../includes/product-name.md)].

> [!NOTE]
> [!INCLUDE [product-name](../includes/product-name.md)] lists all Microsoft 365 groups that you're a member of in the workspaces list.

## Roles and licenses

Roles let you manage who can do what in workspaces, so team members can collaborate. To grant access to a workspace, assign those user groups or individuals to one of the workspace roles: Admin, Member, Contributor, or Viewer.

- **Licensing enforcement**: Publishing reports to a workspace enforces existing licensing rules. Users collaborating in workspaces or sharing content to others in the [!INCLUDE [product-name](../includes/product-name.md)] service need a [!INCLUDE [product-name](../includes/product-name.md)] Pro or Premium Per User (PPU) license. Users without a Pro or PPU license see the error "Only users with [!INCLUDE [product-name](../includes/product-name.md)] Pro licenses can publish to this workspace."
- **Read-only workspaces**: The Viewer role in workspaces gives users read-only access to the content in a workspace.
- **Users without a Pro or Premium Per User (PPU) license** can access a workspace if the workspace is in a [!INCLUDE [product-name](../includes/product-name.md)] Premium capacity, but only if they have the Viewer role.
- **Allow users to export data**: Even users with the Viewer role in the workspace can export data if they have Build permission on the datasets in that workspace. Read more about [Build permission for datasets](/power-bi/connect-data/service-datasets-build-permissions).
- **Assign user groups to workspace roles**: You can add Active Directory security groups, distribution lists, or Microsoft 365 groups to these roles, for easier user management.

See the article [Roles in workspaces](roles-workspaces.md) for more details about the different roles.

## Azure connections configuration

Workspace admins can configure dataflow storage to use Azure Data Lake Gen 2 storage and Azure Log Analytics (LA) connection to collect usage and performance logs for the workspace in workspace settings.

:::image type="content" source="media/workspaces/azure-connection.png" alt-text="Screenshot showing Azure resource configuration." lightbox="media/workspaces/azure-connection.png":::

With the integration of Azure Data Lake Gen 2 storage, you can bring your own storage to dataflows, and establish a connection at the workspace level. Read [Configure dataflow storage to use Azure Data Lake Gen 2](/power-bi/transform-model/dataflows/dataflows-azure-data-lake-storage-integration) for more detail.  

After the connection with Azure Log Analytics (LA), activity log data is sent continuously and is available in Log Analytics in approximately 5 minutes. Read more about [Using Azure Log Analytics](/power-bi/transform-model/log-analytics/desktop-log-analytics-overview) for more detail.

## System storage

System storage is the place to manage your dataset storage in your individual or workspace account so you can keep publishing reports and datasets. Your own datasets, Excel reports, and those items that someone has shared with you, are included in your system storage.

In the system storage, you can view how much storage you  have used and free up the storage by deleting the items in it.

Keep in mind that you or someone else may have reports and dashboards based on a dataset. If you delete the dataset, those reports and dashboards don't work anymore.

:::image type="content" source="media/workspaces/system-storage.png" alt-text="Screenshot showing Manage your storage." lightbox="media/workspaces/system-storage.png":::

## Remove the workspace

As an admin for a workspace, you can delete it. When you delete the workspace, everything contained within the workspace is deleted for all group members, and the associated app is also removed from AppSource.

In the Workspace settings pane, select Other > Remove this workspace.

:::image type="content" source="media/workspaces/remove-workspace.png" alt-text="Screenshot showing deleting workspace." lightbox="media/workspaces/remove-workspace.png":::

## Administering and auditing workspaces

Administration for workspaces is in the [!INCLUDE [product-name](../includes/product-name.md)] admin portal. [!INCLUDE [product-name](../includes/product-name.md)] admins decide who in an organization can create workspaces and distribute apps. Read about [managing users' ability to create workspaces](../admin/portal-workspace.md#create-workspaces) in the "Workspace settings" article.

Admins can also see the state of all the workspaces in their organization. They can manage, recover, and even delete workspaces. Read about [managing the workspaces themselves](../admin/portal-workspaces.md) in the "Admin portal" article.

### Auditing

[!INCLUDE [product-name](../includes/product-name.md)] audits the following activities for workspaces.

| Friendly name | Operation name |
|---|---|
| Created [!INCLUDE [product-name](../includes/product-name.md)] folder | CreateFolder |
| Deleted [!INCLUDE [product-name](../includes/product-name.md)] folder | DeleteFolder |
| Updated [!INCLUDE [product-name](../includes/product-name.md)] folder | UpdateFolder |
| Updated [!INCLUDE [product-name](../includes/product-name.md)] folder access| UpdateFolderAccess |

Read more about [[!INCLUDE [product-name](../includes/product-name.md)] auditing](/power-bi/admin/service-admin-auditing).

## Considerations and limitations

Limitations to be aware of:

- Workspaces can contain a maximum of 1,000 datasets, or 1,000 reports per dataset.
- Certain special characters aren't supported in workspace names when using an XMLA endpoint. As a workaround, use URL encoding of special characters, for example, for a forward slash **/**, use **%2F**.
- A user or a [service principal](/power-bi/enterprise/service-premium-service-principal) can be a member of up to 1,000 workspaces.

## Next steps

* [Create workspaces](create-workspaces.md)
* [Install and use apps](/power-bi/collaborate-share/service-create-distribute-apps)
