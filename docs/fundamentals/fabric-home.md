---
title: Find content from Microsoft Fabric Home
description: Open reports, workloads, and workspaces from the Microsoft Fabric Home. Learn how to change your layout and feature your important content.
author: julcsc
ms.author: juliacawthra
ms.topic: concept-article
ms.custom:
ms.date: 08/20/2025
#customer intent: As a Fabric user, I know how to find my content from Home.
---

# Self-help with the Fabric contextual Help pane

This article explains how to use the Fabric Help pane and helps you navigate to your items from [!INCLUDE [product-name](../includes/product-name.md)] Home. The Help pane is feature-aware and displays articles about the actions and features available on the current Fabric screen. The Help pane is also a search engine that quickly finds answers to questions in the Fabric documentation and Fabric community forums.

## Find what you need on your Home canvas

The final section of Home is the center area, called the **canvas**. The content of your canvas updates as you select different items. By default, the Home canvas displays options for creating new items, recents, and getting started resources. To collapse a section on your canvas, select the **Show less** view.

When you create a new item, it saves in your **My workspace** unless you selected a workspace from **Workspaces**. To learn more about creating items in workspaces, see [create workspaces](../fundamentals/create-workspaces.md).

> [!NOTE]
> Power BI **Home** is different from the other product workloads. To learn more, visit [Power BI Home](/power-bi/consumer/end-user-home).

## Overview of Home

On Home, you see items that you create and that you have permission to use. These items are from all the workspaces that you access. That means that the items available on everyone's Home are different. At first, you might not have much content, but that changes as you start to create and share [!INCLUDE [product-name](../includes/product-name.md)] items.

> [!NOTE]
> Home isn't workspace-specific. For example, the **Recent workspaces** area on Home might include items from many different workspaces.

In [!INCLUDE [product-name](../includes/product-name.md)], the term *item* refers to: apps, lakehouses, activators, warehouses, reports, and more. Your items are accessible and viewable in [!INCLUDE [product-name](../includes/product-name.md)], and often the best place to start working in [!INCLUDE [product-name](../includes/product-name.md)] is from **Home**. However, once you create at least one new workspace, been granted access to a workspace, or you add an item to **My workspace**, you might find it more convenient to start working directly in a workspace. One way to navigate to a workspace is by using the nav pane and workspace selector.

:::image type="content" source="media/fabric-home/workspace.png" alt-text="Screenshot showing sample Home for the Data Engineering workload.":::

To open **Home**, select it from the top of your navigation pane (nav pane).

:::image type="content" source="media/fabric-home/fabric-home-icon.png" alt-text="Screenshot showing the Home button.":::

## Most important content at your fingertips

The items that you can create and access appear on Home. If your Home canvas gets crowded, use [global search](../fundamentals/fabric-search.md) to find what you need, quickly. The layout and content on Fabric Home is different for every user.

:::image type="content" source="media/fabric-home/fabric-home-steps.png" alt-text="Screenshot of Home with sections of the canvas numbered." lightbox="media/fabric-home/fabric-home-steps.png":::

1. The left navigation pane (nav pane) links you to different views of your items and to creator resources. You can [remove buttons from the nav pane](#add-and-remove-buttons-from-the-nav-pane) to suit your workflow.
1. The selector for switching between Fabric and Power BI.
1. Options for creating new items.
1. The top menu bar for orienting yourself in Fabric, finding items, help, and sending feedback to Microsoft. The Account manager control is a critical button for looking up your account information and managing your Fabric trial.
1. Learning resources to get you started learning about Fabric and creating items.
1. Your items organized by recent workspaces, recent items, and favorites.

> [!IMPORTANT]
> Only the content that you can access appears on your Home. For example, if you don't have permissions to a report, that report doesn't appear on Home. The exception to this restriction is if your subscription or license changes to one with less access, then you receive a prompt letting you know that the item is no longer available and asking you to start a trial or upgrade your license.

## Locate items from Home

[!INCLUDE [product-name](../includes/product-name.md)] offers many ways of locating and viewing your items and ways of creating new items. All approaches access the same pool of items, just in different ways. Searching is sometimes the easiest and quickest way to find something. While other times, using the nav pane to open a workspace, using the nav pane to open OneLake, or selecting a card on the Home canvas is your best option.

### Use the navigation pane

Along the left side is a narrow vertical bar, referred to as the ***nav pane***. The nav pane organizes actions you can take with your items in ways that help you get to where you want to be quickly. Occasionally, using the nav pane is the quickest way to get to your items.

:::image type="content" source="media/fabric-home/fabric-left-nav-panes.png" alt-text="Screenshot of the nav pane for Data factory.":::

In the bottom section of the nav pane is where your active workspaces and items are listed. In this example, our active items are: an Activator, the *Retail sales* workspace, and a KQL database. Select any of these items to display them on your canvas. To open other workspaces, use the [workspace selector](#find-and-open-workspaces) to view a list of your workspaces and select one to open on your canvas. To open other items, select them from the nav pane buttons.

The nav pane is there when you open Home and remains there as you open other areas of [!INCLUDE [product-name](../includes/product-name.md)].

#### Add and remove buttons from the nav pane

You can remove buttons from the nav pane for products and actions you don't think you need. You can always add them back later.

To remove a button, right-click the button and select **Unpin**.

To add a button back to the nav pane, start by selecting the ellipses (...). Then right-click the button and select **Pin**. If you don't have space on the nav pane, the pinned button might displace a current button.

:::image type="content" source="media/fabric-home/fabric-add-icon.png" alt-text="Screenshot showing how to add an item back to the nav pane.":::

### Find and open workspaces

*Workspaces* are places to collaborate with colleagues to create collections of items such as lakehouses, warehouses, and reports and to create task flows.

There are different ways to find and open your workspaces. If you know the name or owner, you can search. Or you can select the **Workspaces** button in the nav pane and choose which workspace to open.

:::image type="content" source="media/fabric-home/fabric-home-workspaces.png" alt-text="Screenshot showing list of workspaces with red outlines around the Search fields and Workspaces buttons.":::

The workspace opens on your canvas, and the name of the workspace is listed on your nav pane. When you open a workspace, you can view its content. It includes items such as notebooks, pipelines, reports, and lake houses.

- If no workspaces are active, by default you see **My workspace**.  
- When you open a workspace, its name replaces **My workspace**.  
- Whenever you create a new item, it's added to the open workspace.  

For more information, see [Workspaces](../fundamentals/workspaces.md).

## Create items

### Create workspaces using a task flow

The first row on your Home canvas is a selection of task flow templates. Fabric task flow is a workspace feature that enables you to build a visualization of the flow of work in the workspace. Fabric provides a range of predefined, end-to-end task flows based on industry best practices that are intended to make it easier to get started with your project.

To learn more, see [Task flows in Microsoft Fabric](../fundamentals/task-flow-overview.md)

### Create items using workloads

**Workloads** refer to the different capabilities available in [!INCLUDE [product-name](../includes/product-name.md)]. [!INCLUDE [product-name](../includes/product-name.md)] includes preinstalled workloads that can't be removed, including Data Factory, Data Engineering, Real-Time Intelligence, and more. You might also have preinstalled workloads that Microsoft or your organization added.

The Workload hub is a central location where you can view all the workloads available to you. Navigate to your Workload hub by selecting **Workloads** from the nav pane. [!INCLUDE [product-name](../includes/product-name.md)] displays a list and description of the available workloads. Select a workload to open it and learn more.

:::image type="content" source="media/fabric-home/fabric-workload-hub.png" alt-text="Screenshot of Workloads selected from the nav pane.":::

If your organization gives you access to more workloads, your Workload hub displays more tabs.

:::image type="content" source="./media/fabric-home/fabric-my-workloads-organization.png" alt-text="Screenshot of the My workloads interface." lightbox="./media/fabric-home/fabric-my-workloads-organization.png":::

When you select a workload, the landing page for that workload displays. Each workload in Fabric has its own item types associated with it. The landing page has information about these items type and details about the workload, learning resources, and samples that you can use to test run the workload.

:::image type="content" source="media/fabric-home/fabric-home-workload-landing.png" alt-text="Screenshot of the Data Engineering workload detail page." lightbox="media/fabric-home/fabric-home-workload-landing.png":::

For more information about workloads, see [Workloads in Fabric](../workload-development-kit/more-workloads-add.md)

## Tabbed navigation to access resources (preview)

The tabbed navigation allows you to work with multiple items and workspaces at the same time. It enhances navigation and reduces the need to switch context.

### Tabs for open items

When you create or open an item, it appears in a tab horizontally across the top of the Fabric portal and shows the item name, icon for the item type (for example, notebook, pipeline, semantic model etc.). You can hover over the tab to view the workspace it's created in. You can drag a tab to the required position. Tabs make it easier to identify and switch between open items without losing focus.

### Multiple open workspaces

You can open and work across multiple workspaces side by side. Items are color-coded and numbered to indicate which workspace they belong to. This feature helps reduce confusion and improves context when working in multiple environments.

### Object explorer

The object explorer provides a structured view of items across all your currently open workspaces. Use it to quickly locate and open resources without having to switch between pages. You can pin the object explorer for easy access. Use the filter option to view items of a specific type or search for an item by a keyword. The items are organized by the hierarchy they belong to.

:::image type="content" source="media/fabric-home/tabs-object-explorer.png" alt-text="Screenshot showing the object explorer & multiple tabs to quickly locate and open resources.":::

### More open items

The previous limit of 10 open items has been increased. You can keep more resources active at once. This is especially useful for complex workflows that require multiple pipelines, notebooks, or reports.

> [!NOTE]
> These multitasking features are rolling out in phases starting mid September 2025. Availability might vary across tenants as the rollout progresses.

## Get help from the Help pane

The Help pane is feature-aware and displays articles about the actions and features available on the current Fabric screen. The feature-aware state is the default view of the Help pane when you open it without entering any search terms. The Help pane shows a list of recommended topics, resources that are relevant to your current context and location in Fabric, and a list of links for other resources. It has three sections:

- Feature-aware documents: This section groups the documents by the features that are available on the current screen. Select a feature in the Fabric screen and the Help pane updates with documents related to that feature. Select a document to open it in a separate browser tab.

- Forum topics: This section shows topics from the community forums that are related to the features on the current screen. Select a topic to open it in a separate browser tab.

- Other resources: This section has links for feedback and Support.

The Help pane is also a search engine. Enter a keyword to find relevant information and resources from Microsoft documentation and community forum articles. Use the dropdown to filter the results.

:::image type="content" source="media/fabric-home/help-start.png" alt-text="Screenshot of the help pane open for search." lightbox="media/fabric-home/fabric-home-workload-landing.png":::

## Find your content using search, sort, and filter

To learn about the many ways to search from [!INCLUDE [product-name](../includes/product-name.md)], see [Searching and sorting](../fundamentals/fabric-search.md). Global searching is available by item, name, keyword, workspace, and more.

## Find answers in the context sensitive Help pane

Select the Help icon (**?**) to open and use the contextual Help pane and to search for answers to questions.

[!INCLUDE [product-name](../includes/product-name.md)] provides context sensitive help in the right rail of your browser. In this example, we selected **Browse** from the nav pane and the Help pane automatically updates to show us articles about the features of the **Browse** screen. For example, the Help pane displays articles on *View your favorites* and *See content that others shared with you*. If there are community posts related to the current view, they display under **Forum topics**.

Leave the Help pane open as you work, and use the suggested articles to learn how to use [!INCLUDE [product-name](../includes/product-name.md)] features and terminology. Or, select the **X** to close the Help pane and save screen space.

:::image type="content" source="media/fabric-home/fabric-home-help-context.png" alt-text="Screenshot of the Help pane with Recent selected in Data factory." lightbox="media/fabric-home/fabric-home-help-context.png":::

The Help pane is also a great place to search for answers to your questions. Type your question or keywords in the **Search** field.

:::image type="content" source="media/fabric-home/fabric-home-help-results.png" alt-text="Screenshot of the Help pane before beginning a search.":::

To return to the default Help pane, select the left arrow.

:::image type="content" source="media/fabric-home/fabric-home-arrow.png" alt-text="Screenshot of the left arrow icon.":::

For more information about searching, see [Searching and sorting](../fundamentals/fabric-search.md).

For more information about the Help pane, see [Get in-product help](fabric-help-pane.md).

## Find help and support

If the self-help answers don't resolve your issue, scroll to the bottom of the Help pane for more resources. Use the links to ask the community for help or to connect with [!INCLUDE [product-name](../includes/product-name.md)] Support. For more information about contacting Support, see [Support options](/power-bi/support/service-support-options).

## Find your account and license information

Information about your account and license is available from the Account manager. To open your Account manager, select the tiny photo from the upper-right corner of [!INCLUDE [product-name](../includes/product-name.md)].

:::image type="content" source="media/fabric-home/fabric-home-account.png" alt-text="Screenshot showing the Account manager expanded.":::

For more information about licenses and trials, see [Licenses](../enterprise/licenses.md).

## Find notifications, settings, and feedback

In the upper-right corner of Home are several helpful icons. Take time to explore your **Notifications center**, **Settings**, and **Feedback** options. The Help (**?**) icon displays your [Help and search options](#find-help-and-support) and the [**Account manager** icon](#find-your-account-and-license-information) displays information about your account and license. Both of these features are described in detail earlier in this article.

## Related content

- [Power BI Home](/power-bi/consumer/end-user-home)
- [Start a Fabric trial](../fundamentals/fabric-trial.md)
