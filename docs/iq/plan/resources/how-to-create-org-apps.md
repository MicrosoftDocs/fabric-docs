---
title: Organize Plans with Org Apps in Fabric Planning
description: Learn how to build an Org App that bundles budget, sales, and workforce plans into one connected planning experience for your team.
ms.date: 09/25/2026
ms.topic: how-to
---

# Planning solutions with org apps

Organizational apps provide a centralized experience for planning, analysis, and decision-making by bringing related content together in a single destination. With organizational apps, teams can access the plans they need, collaborate on planning activities, track progress, and review performance insights from one place.

Users can access plans, review analytics, submit updates, and track approvals without switching between different workspaces or applications. This approach simplifies navigation, promotes collaboration, and delivers a connected planning experience.

This article guides you through creating an organizational app that consolidates enterprise planning across forecasts, budgets, sales, and workforce data.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=ea4ecfe6-6e0f-4190-98e2-0f251e206fa3]

## Prerequisites

* Users must be an admin, member, or contributor to create org app items.
* Create the Fabric Plan items to bundle in the org app.
* In the **Home** ribbon, go to **Manage Connections** and create an **App Database** connection to enable collaboration on a Plan item in reading view.


:::image type="content" source="../media/resources/how-to-create-org-apps/create-app-database-connection.png" alt-text="Screenshot of the Manage Connections dialog with App Database Connection selected and a connection chosen." lightbox="../media/resources/how-to-create-org-apps/create-app-database-connection.png":::

## Create an org app

Bundle multiple plan items, such as budget planning, forecasting, workforce planning, and sales planning, into an organizational app that's tailored to a specific business process or department.

1. Open your shared workspace and select **New Item** from the Workspace home page.
1. Select **Org app** from the **Distribute data** section.

    :::image type="content" source="../media/resources/how-to-create-org-apps/new-item-org-app.png" alt-text="Screenshot of selecting a new Org App item." lightbox="../media/resources/how-to-create-org-apps/new-item-org-app.png":::

1. Enter the app name.

1. Select **Add Content** from the org apps homepage toolbar. Select the Fabric items to package into an org app and select **Add to app**.

    :::image type="content" source="../media/resources/how-to-create-org-apps/add-content-select-items.png" alt-text="Screenshot of the select items dialog for adding plans, reports, and related items to an org app." lightbox="../media/resources/how-to-create-org-apps/add-content-select-items.png":::

1. The side pane shows the items you added. Select any plan item to view data and collaborate by updating forecasts and budgets.

    :::image type="content" source="../media/resources/how-to-create-org-apps/plan-items-side-pane.png" alt-text="Screenshot of the side pane showing plan items added to the org app." lightbox="../media/resources/how-to-create-org-apps/plan-items-side-pane.png":::

## Add an overview page

An overview page in an org app serves as a centralized landing page that lists and organizes all the content included within the app such as reports, plans, and links. Create an overview page to give consumers an immediate, high-level map of all available content as soon as they open the app. You can have one overview page in an org app.

1. Select **Add** > **Overview**, and then enter the page name.

    :::image type="content" source="../media/resources/how-to-create-org-apps/new-overview-page-name-dialog.png" alt-text="Screenshot of the new overview page dialog with a page name field and create button." lightbox="../media/resources/how-to-create-org-apps/new-overview-page-name-dialog.png":::

1. Add a title and description.

    :::image type="content" source="../media/resources/how-to-create-org-apps/add-overview-title-header.png" alt-text="Screenshot of adding a page title and description." lightbox="../media/resources/how-to-create-org-apps/add-overview-title-header.png":::

    The following image shows the overview page:

    :::image type="content" source="../media/resources/how-to-create-org-apps/enterprise-planning-overview-page-elements.png" alt-text="Screenshot of the Enterprise Planning overview page listing app elements like Finance Plan and Sales Plan." lightbox="../media/resources/how-to-create-org-apps/enterprise-planning-overview-page-elements.png":::

## Add navigation and folders

Organize and streamline your workspace navigation by grouping related items into dedicated sections, such as by department, project, or region. Add navigation to help end users quickly locate specific resources by expanding relevant sections rather than scanning through a long, unstructured menu.

1. Group related items into folders by adding a section. Select **Add** > **Section**, enter the name, and select **Create**.

    :::image type="content" source="../media/resources/how-to-create-org-apps/new-section-dialog-create-folder.png" alt-text="Screenshot of creating a navigation section." lightbox="../media/resources/how-to-create-org-apps/new-section-dialog-create-folder.png":::

1. To move an item into a folder, hover over an item and select the **More options (...)** menu. Select **Move to section** and choose the section name.

    :::image type="content" source="../media/resources/how-to-create-org-apps/move-item-section.png" alt-text="Screenshot of options to move items under a navigation section." lightbox="../media/resources/how-to-create-org-apps/move-item-section.png":::

    The following screenshot shows the navigation structure:

    :::image type="content" source="../media/resources/how-to-create-org-apps/navigation-side-bar.png" alt-text="Screenshot of the completed navigation bar with items grouped under sections." lightbox="../media/resources/how-to-create-org-apps/navigation-side-bar.png":::

## Add links

By adding links to an organizational app, you can integrate relevant external resources, such as SharePoint sites, internal documentation, web portals, or supporting forms directly into the app's main navigation pane. Users can access complementary tools, reference guides, or external resources without leaving the app.

1. To add an external link, select **Add** > **Link**.
1. Enter the URL and link name. Then select whether to open the URL within the app or in a new browser tab.

    :::image type="content" source="../media/resources/how-to-create-org-apps/add-link-configuration.png" alt-text="Screenshot of New link dialog with fields for link name, URL address, and link behavior options." lightbox="../media/resources/how-to-create-org-apps/add-link-configuration.png":::

    The following screenshot shows the link content accessed from within the app:

    :::image type="content" source="../media/resources/how-to-create-org-apps/open-links-within-app.png" alt-text="Screenshot of an Excel workbook showing regional sales data accessed as a linked app resource." lightbox="../media/resources/how-to-create-org-apps/open-links-within-app.png":::

## View and share apps

1. Select **Preview app** to test the user interface, navigation, and layout before publishing.
1. After verifying your changes, select **Save**.
1. Access the org app from your workspace:

    :::image type="content" source="../media/resources/how-to-create-org-apps/access-org-app-workspace.png" alt-text="Screenshot of Enterprise Planning Hub org app listed among workspace items." lightbox="../media/resources/how-to-create-org-apps/access-org-app-workspace.png":::

1. Select **Share** from the top-right corner to copy the app link and manage access.

    * Select **Copy link to this app** to share the org app item. Users who use the link you send must already have access.
    * Select **Link to this app page,** and users go directly to the item you have in view when copying the link.

    :::image type="content" source="../media/resources/how-to-create-org-apps/share-options.png" alt-text="Screenshot of share menu options for an org app, including copy link, manage access, add person." lightbox="../media/resources/how-to-create-org-apps/share-options.png":::

    To learn more about sharing org apps, see [Sharing your Org App](/power-bi/explore-reports/org-app-items#granting-others-access-to-and-sharing-your-org-app).

## Related content

* Get started with [Org Apps](/power-bi/explore-reports/org-app-items).

* Manage [user access and permissions to org apps](/power-bi/explore-reports/org-app-items#managing-org-app-permissions-like-removing-users).

* Configure [audiences for Org Apps](/power-bi/explore-reports/org-app-items#add-users-and-groups-to-audiences).
