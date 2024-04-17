---
title: Create a workspace
description: "Learn how you can create a workspace: a collection of items such as lakehouses, warehouses, and reports, with task flows built to deliver key metrics for your organization."
author: maggiesMSFT
ms.author: maggies
ms.reviewer: yicw, mesrivas
ms.topic: how-to
ms.date: 04/15/2024
ms.custom:
  - build-2023
  - ignite-2023
#customer intent: As a report creator, I want use workspaces so that I can create collections of artifacts that are related.
---
# Create a workspace

This article explains how to create *workspaces* in [!INCLUDE [product-name](../includes/product-name.md)]. In workspaces, you create collections of items such as lakehouses, warehouses, and reports. For more background, see the [Workspaces](workspaces.md) article.

To create a workspace:

1. Select **Workspaces** > **New workspace**. The Create a workspace pane opens.

    :::image type="content" source="media/create-workspaces/fabric-new-workspaces.png" alt-text="Screenshot of the Create a workspace option.":::

1. The Create a workspace pane opens.

    :::image type="content" source="media/create-workspaces/create-workspace-side-pane.png" alt-text="Screenshot of the Create a workspace side pane.":::

    * Give the workspace a unique name (mandatory).

    * Provide a description of the workspace (optional).

    * Assign the workspace to a domain (optional).

        If you are a domain contributor for the workspace, you can associate the workspace to a domain, or you can change an existing association. For information about domains, see [Domains in Fabric](../governance/domains.md).

1. When done, either continue to the advanced settings, or select **Apply**.

## Advanced settings

Expand **Advanced** and you see advanced setting options:

### Contact list

Contact list is a place where you can put the names of people as contacts for information about the workspace. Accordingly, people in this contact list receive system email notifications for workspace level changes. 

By default, the first workspace admin who created the workspace is the contact. You can add other users or groups according to your needs. Enter the name in the input box directly, it helps you to automatically search and match users or groups in your org.

![Screenshot of Contact list.](media/create-workspaces/fabric-contact-list.png)

### License mode

Different [license](../enterprise/licenses.md) mode provides different sets of feature for your workspace. After the creation, you can still change the workspace license type in workspace settings, but some migration effort is needed.

>[!NOTE]
> Currently, if you want to downgrade the workspace license type from Premium capacity to Pro (Shared capacity), you must first remove any non-Power BI Fabric items that the workspace contains. Only after you remove such items will you be allowed to downgrade the capacity. For more information, see [Moving data around](../admin/portal-workspaces.md#moving-data-around).

### Default storage format

Power BI semantic models can store data in a highly compressed in-memory cache for optimized query performance, enabling fast user interactivity. With Premium capacities, large semantic models beyond the default limit can be enabled with the Large semantic model storage format setting. When enabled, semantic model size is limited by the Premium capacity size or the maximum size set by the administrator. Learn more about [large semantic model storage format](/power-bi/enterprise/service-premium-large-models#enable-large-models).

### Template apps
  
[Power BI template apps](/power-bi/connect-data/service-template-apps-overview) are developed for sharing outside your organization. If you check this option, a special type of workspace (template app workspace) is created. It's not possible to revert it back to a normal workspace after creation.
  
### Dataflow storage (preview)

Data used with Power BI is stored in internal storage provided by Power BI by default. With the integration of dataflows and Azure Data Lake Storage Gen 2 (ADLS Gen2), you can store your dataflows in your organization's Azure Data Lake Storage Gen2 account. Learn more about [dataflows in Azure Data Lake Storage Gen2 accounts](/power-bi/transform-model/dataflows/dataflows-azure-data-lake-storage-integration#considerations-and-limitations).

## Give users access to your workspace

Now that you've created the workspace, you'll want to add other users to *roles* in the workspace, so you can collaborate with them. See these articles for more information:

- [Give users access to a workspace](give-access-workspaces.md)
- [Roles in workspaces](roles-workspaces.md)

## Pin workspaces

Quickly access your favorite workspaces by pinning them to the top of the workspace flyout list. 

1. Open the workspace flyout from the nav pane and hover over the workspace you want to pin. Select the **Pin to top** icon.

    ![Screenshot of pin workspace.](media/create-workspaces/pin-workspace.png)

1. The workspace is added in the **Pinned** list.

    ![Screenshot of pinned list.](media/create-workspaces/pinned-list.png)

1. To unpin a workspace, select the unpin button. The workspace is unpinned.

    ![Screenshot of unpin workspace.](media/create-workspaces/unpin-workspace.png)

## Related content

* Read about [workspaces](workspaces.md)
