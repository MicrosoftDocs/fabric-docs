---
title: Create a workspace
description: "Learn how you can create a workspace: a collection of items such as lakehouses, warehouses, and reports, with task flows built to deliver key metrics for your organization."
author: SnehaGunda
ms.author: sngun
ms.reviewer: yicw
ms.topic: how-to
ms.date: 01/30/2026
ms.custom:
#customer intent: As a report creator, I want use workspaces so that I can create collections of artifacts that are related.
---
# Create a workspace

This article explains how to create *workspaces* in [!INCLUDE [product-name](../includes/product-name.md)]. In workspaces, you create collections of items such as lakehouses, warehouses, and reports. For more background, see the [Workspaces](workspaces.md) article.

To create a workspace:

1. In the nav pane, select **Workspaces**.

1. At the bottom of the Workspace pane that opens, select **New workspace**.

1. The **Create a workspace** pane opens.

    * Give the workspace a unique name (mandatory).

    * Provide a description of the workspace (optional).

    * Assign the workspace to a domain (optional).

        If you are a domain contributor for the workspace, you can associate the workspace to a domain, or you can change an existing association. For information about domains, see [Domains in Fabric](../governance/domains.md).

1. When done, either continue to the advanced settings, or select **Apply**.

You can open and work across multiple workspaces side by side. Items are color-coded and numbered to indicate which workspace they belong to. To learn more see, [object explorer and tabbed navigation in Fabric portal](./fabric-home.md#multitask-with-tabs-and-object-explorer).

## Advanced settings

Expand **Advanced** and you see advanced setting options:

### Contact list

Contact list is a place where you can put the names of people as contacts for information about the workspace. Accordingly, people in this contact list receive system email notifications for workspace level changes. 

By default, the first workspace admin who created the workspace is the contact. You can add other users or groups according to your needs. Enter the name in the input box directly, it helps you to automatically search and match users or groups in your org.

:::image type="content" border="true" source="media/create-workspaces/fabric-contact-list.png" alt-text="Screenshot of Contact list.":::

### Workspace type

Different [workspace types](../enterprise/licenses.md#workspace-types) provide different sets of features for your workspace.
You can change the workspace type after creating a workspace. You can do so from the workspace settings, but some migration effort is needed.

>[!NOTE]
> Currently, if you want to downgrade the workspace type from a Power BI Premium to a Power BI Pro (Shared capacity), you must first remove any non-Power BI Fabric items that the workspace contains. Only after you remove such items will you be allowed to downgrade the capacity. For more information, see [Moving data around](../admin/portal-workspaces.md#moving-data-around).

### Default storage format

Power BI semantic models can store data in a highly compressed in-memory cache for optimized query performance, enabling fast user interactivity. With Premium capacities, large semantic models beyond the default limit can be enabled with the Large semantic model storage format setting. When enabled, semantic model size is limited by the Premium capacity size or the maximum size set by the administrator. Learn more about [large semantic model storage format](/power-bi/enterprise/service-premium-large-models#enable-large-models).

### Template apps
  
[Power BI template apps](/power-bi/connect-data/service-template-apps-overview) are developed for sharing outside your organization. If you check this option, a special type of workspace (template app workspace) is created. It's not possible to revert it back to a normal workspace after creation.
  
### Dataflow storage (preview)

Data used with Power BI is stored in internal storage provided by Power BI by default. With the integration of dataflows and Azure Data Lake Storage Gen 2 (ADLS Gen2), you can store your dataflows in your organization's Azure Data Lake Storage Gen2 account. Learn more about [dataflows in Azure Data Lake Storage Gen2 accounts](/power-bi/transform-model/dataflows/dataflows-azure-data-lake-storage-integration#considerations-and-limitations).

## Reassign a workspace to a different capacity

When you create a workspace, it's assigned to a [capacity](../enterprise/licenses.md#capacity). The capacity that new workspaces are assigned to by default is determined by the capacity type and/or by the configuration of Fabric or capacity administrators. After a workspace is created, you can reassign it to another available capacity if you have the [workspace admin role](roles-workspaces.md), the capacity admin role, or the capacity contributor role.

You can reassign a workspace to a different capacity via workspace types in the workspace settings.

1. Open the workspace settings and choose **Workspace type**. Information about the current workspace type is displayed.

1. Select **Edit**. The list of available workspace types appears.

1. Select the desired workspace type and specify the capacity the workspace will be hosted on.

> [!NOTE]
> * You can choose specific capacities only when you select one of the Fabric workspace types. Fabric automatically reserves shared capacity for Power BI workspace types.
> * The types of items contained in the workspace can affect the ability to change workspace types and/or move the workspace to a capacity in a different region. See [Moving data around](../admin/portal-workspaces.md#moving-data-around) for detail.

## Give users access to your workspace

Now that you've created the workspace, you'll want to add other users to *roles* in the workspace, so you can collaborate with them. See these articles for more information:

- [Give users access to a workspace](../fundamentals/give-access-workspaces.md)
- [Roles in workspaces](../fundamentals/roles-workspaces.md)

## Pin workspaces

Quickly access your favorite workspaces by pinning them to the top of the workspace flyout list. 

1. Open the workspace flyout from the nav pane and hover over the workspace you want to pin. Select the **Pin to top** icon.

    :::image type="content" border="true" source="media/create-workspaces/pin-workspace.png" alt-text="Screenshot of pin workspace.":::

1. The workspace is added in the **Pinned** list.

    :::image type="content" border="true" source="media/create-workspaces/pinned-list.png" alt-text="Screenshot of pinned list.":::

1. To unpin a workspace, select the unpin button. The workspace is unpinned.

    :::image type="content" border="true" source="media/create-workspaces/unpin-workspace.png" alt-text="Screenshot of unpin workspace.":::

## Related content

* Read about [workspaces](workspaces.md)
