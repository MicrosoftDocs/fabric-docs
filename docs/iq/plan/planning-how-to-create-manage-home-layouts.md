---
title: Configure Role-Based Home Layouts for Planning Sheets
description: Home Layouts let you build role-based landing pages in Planning Sheets. Learn how to add banners, sections, and sheet cards so each team sees what matters most.
ms.date: 09/25/2026
ms.topic: how-to
---

# Configure and manage role-based home layouts

By using **Home Layout**, you can create role-based landing pages within an item. You can configure different layouts for different roles so that users see the sheets and information that are most relevant to their responsibilities when they open the item.

A home layout can include sections, images, a hero banner, and available sheet cards. You can customize the content, layout, visibility, and priority of each home layout.

## Use case

Organizations often have multiple teams working within the same item, but each team might require access to different information and customization.

For example, project managers might need visibility into planning activities, business analysts might focus on forecasts and reporting, and QA teams might need quick access to testing and defect-related information. Showing all available sheets to every user can make it difficult to find relevant information.

By using **Home Layout**, you can create dedicated landing pages for different roles, ensuring that users see only the most relevant content for their day-to-day activities.

## Key concepts

### Home Layout

A **Home Layout** is a customized landing page that determines the content users see when they select **Home** in the **Explorer**.

A home layout can contain:

* A hero banner
* Sections
* Images
* Available sheet cards
* Titles and descriptions

### Roles

Home layouts are associated with roles. You can create separate layouts for different roles and customize the content displayed to users assigned to those roles.

### Item Baseline role

**Item Baseline** is the default system role. Users who aren't assigned to a specific role see the home layout configured for the **Item Baseline** role.

### Layout priority

Users can be assigned to multiple roles. When a user has access to multiple role-based home layouts, the layout with the highest priority is displayed.

You can [reorder layouts](#change-layout-priority) in the **Layouts** pane to change their priority.

## Role security and home layouts

Home layout respects the **Role Security** settings configured for a role. Role Security determines which sheets are available to that role, while **Home Layout** determines how those available sheets are presented.

If a sheet is hidden for a role through Role Security:

* The sheet isn't available when configuring a home layout for that role.
* The sheet can't be added to that role's home layout.
* Users assigned to the role can't access the sheet through the home layout.

> [!NOTE]
> **Role Security** settings take precedence over **Home Layout** settings.

## Create a home layout

Create a home layout for an existing role, an [Item Baseline](#item-baseline-role), or a new role.

To create a home layout:

1. Go to the **Home** tab.
1. Select **Home Layout**.

   :::image type="content" source="media/planning-how-to-create-manage-home-layouts/select-home.png" alt-text="Screenshot of the Home tab ribbon with the Home Layout button highlighted." lightbox="media/planning-how-to-create-manage-home-layouts/select-home.png":::

1. In the **Home Layout** window, select **Create Layout**.
1. Select an existing role or create a new role. <!--Add hyperlink after available to creating a new role page -->

   :::image type="content" source="media/planning-how-to-create-manage-home-layouts/select-role-list.png" alt-text="Screenshot of the Create Layout dialog with the Role dropdown open, listing existing roles and an Add new role option." lightbox="media/planning-how-to-create-manage-home-layouts/select-role-list.png":::

1. Configure the role's security settings and assign the role to the required users. <!-- For more information, see [Configure role security](/planning-sheets/how-tos/manage-security-in-planning.md#configure-general-permissions) and [Assign a role to users](/planning-sheets/how-tos/manage-security-in-planning.md#assign-users-to-roles).-->
1. Configure the [layout content](#configure-home-layout-content).
1. Select [**Preview**](#preview-a-home-layout) to review the layout.
1. Select **Save**.

The home layout is created and associated with the selected role.

> [!NOTE]
>
> * Sheets hidden through Role Security aren't available in the Home Layout configuration for that role and aren't displayed in the Explorer.
> * You can create only one Home layout per role.

## Configure home layout content

After you create a **Home Layout**, the layout configuration window opens. A new layout contains the following elements by default:

* A Hero Banner
* Two section blocks
* An Available Sheets block

:::image type="content" source="media/planning-how-to-create-manage-home-layouts/configure-home-layout-overview.png" alt-text="Screenshot of the Home layout configuration window showing a default Hero Banner, two section blocks, and an Available Sheets block highlighted." lightbox="media/planning-how-to-create-manage-home-layouts/configure-home-layout-overview.png":::

Use the layout toolbar to customize these elements or add more content.

### Customize the hero banner

The **Hero Banner** provides a prominent area at the top of the home layout where you can display a title, description, and background image.

To customize the hero banner:

1. Select the title or description and enter the text you want.
1. Select text to apply available formatting, such as font color or highlighting.

   :::image type="content" source="media/planning-how-to-create-manage-home-layouts/customize-hero-banner.png" alt-text="Screenshot of the Hero Banner with the title Development Workspace selected and a formatting toolbar showing font color and highlight options." lightbox="media/planning-how-to-create-manage-home-layouts/customize-hero-banner.png":::

1. Hover over the hero banner and select the **gripper** icon, or right-click the block, to access more options:
   * **Change image** to change the hero banner background image.
   * **Move block** to move the hero banner up or down.
   * **Delete** to remove the hero banner.

     :::image type="content" source="media/planning-how-to-create-manage-home-layouts/hero-banner-options.png" alt-text="Screenshot of the Hero Banner context menu highlighted, showing Change Image, Move block, and Delete options." lightbox="media/planning-how-to-create-manage-home-layouts/hero-banner-options.png":::

If you delete the hero banner, you can add it again by selecting **Hero Banner** on the layout toolbar.

:::image type="content" source="media/planning-how-to-create-manage-home-layouts/add-hero-banner-after-delete.png" alt-text="Screenshot of the layout toolbar showing the Hero Banner option highlighted and the Hero Banner restored at the top of the layout." lightbox="media/planning-how-to-create-manage-home-layouts/add-hero-banner-after-delete.png":::

### Add and organize sections

Sections provide flexible content blocks within the home layout. You can add a name and description to a section and use it to present information such as highlights, key metrics, or KPI-style content.

To configure a section:

1. Select **Add Section Name** and enter a name.
1. Select the **Add description** and enter the required information.
1. Use the available formatting options to format the description as numbered or unordered lists.
1. To add another section, select **New section** on the layout toolbar. The new section is added to the bottom of the layout.

   :::image type="content" source="media/planning-how-to-create-manage-home-layouts/add-new-section.png" alt-text="Screenshot of the home layout editor with New section highlighted on the toolbar and a new Add Section Name block added at the bottom." lightbox="media/planning-how-to-create-manage-home-layouts/add-new-section.png":::

You can organize a section using the following options:

* Hover over the section block and select the **gripper** icon, or right-click the block, to access more options:
  * **Move block** to move the section up or down.
  * **Duplicate** to create a copy of the section.
  * **Delete** to remove the section.

    :::image type="content" source="media/planning-how-to-create-manage-home-layouts/organize-sections.png" alt-text="Screenshot of the home layout editor with a section context menu showing Move block, Duplicate, and Delete, and a submenu with Move up and Move down." lightbox="media/planning-how-to-create-manage-home-layouts/organize-sections.png":::

* Drag the section using its gripper to reposition it within the layout.
* Hover over the block and then drag the resize handle at the bottom-right corner to adjust the section size.

  :::image type="content" source="media/planning-how-to-create-manage-home-layouts/reposition-resize-section.png" alt-text="Screenshot of a section block in the home layout editor with the gripper and bottom-right resize handle highlighted for repositioning and resizing." lightbox="media/planning-how-to-create-manage-home-layouts/reposition-resize-section.png":::

### Configure Available Sheets

The **Available Sheets** block displays sheets that are available to the role in the home layout.

To configure the Available Sheets block:

1. Hover over the block and select the **gripper** icon.
1. Use **Layout** to display the available sheets in three or four columns.

   :::image type="content" source="media/planning-how-to-create-manage-home-layouts/display-columns.png" alt-text="Screenshot of the Available Sheets block menu with Layout expanded, showing 3 Column selected and 4 Column options." lightbox="media/planning-how-to-create-manage-home-layouts/display-columns.png":::

1. Use **Move block** to move the block up or down.
1. Use **Show Sheets** to show or hide the sheets within the Available Sheets block.

   :::image type="content" source="media/planning-how-to-create-manage-home-layouts/show-sheets.png" alt-text="Screenshot of the Available Sheets block menu with Show sheets expanded, showing Sprint Planning, Resource Master, and Defect Analysis selected." lightbox="media/planning-how-to-create-manage-home-layouts/show-sheets.png":::

1. Use **Delete** to remove the block.

If you delete the Available Sheets block, you can add it again by selecting **List of Available Sheets** on the layout toolbar.

Use the search box to quickly find a sheet when the item contains a large number of sheets.

> [!NOTE]
>
> * Hiding a sheet by using **Show Sheets** only removes it from the Available Sheets block in the Home Layout. It doesn't hide the sheet from the Explorer or change the user's access to the sheet.
> * To restrict access to a sheet, use Role Security.
> * You can include only one hero banner and one list of available sheets in a layout.

### Add and configure an image

You can add images to provide extra visual context or branding within a home layout.

To add an image:

1. Select **Image** on the layout toolbar.
1. An image block is added to the bottom of the layout.
1. Select the image block and upload an image.

   :::image type="content" source="media/planning-how-to-create-manage-home-layouts/upload-image.png" alt-text="Screenshot of home layout editor with Image toolbar button highlighted and a new image block showing Click to upload image at the bottom." lightbox="media/planning-how-to-create-manage-home-layouts/upload-image.png":::

After adding an image, hover over the image block and select the **gripper** icon, or right-click the block, to access the available options:

* **Change image** to replace the image.
* **Move block** to move the image up or down.
* **Image settings** to select **Fit** or **Fill** for the image.
* **Delete** to remove the image.

  :::image type="content" source="media/planning-how-to-create-manage-home-layouts/image-settings.png" alt-text="Screenshot of home layout editor with image block context menu showing Change Image, Move block, Image settings, and Delete options." lightbox="media/planning-how-to-create-manage-home-layouts/image-settings.png":::

To resize the image block, hover over the image block and drag the resize handle at the bottom-right corner of the block.

:::image type="content" source="media/planning-how-to-create-manage-home-layouts/resize-image.png" alt-text="Screenshot of home layout editor showing a resized Software Development image block beside Issue Tracking and Sprint Planning sections." lightbox="media/planning-how-to-create-manage-home-layouts/resize-image.png":::

### Undo and redo changes

Use the **Undo** and **Redo** icons on the layout toolbar to undo or redo changes you made while configuring the home layout.

:::image type="content" source="media/planning-how-to-create-manage-home-layouts/undo-redo.png" alt-text="Screenshot of home layout editor toolbar with Undo and Redo icons highlighted next to New section, Image, Hero Banner, and List of Available Sheets." lightbox="media/planning-how-to-create-manage-home-layouts/undo-redo.png":::

## Preview a home layout

Use **Preview** on the layout toolbar to review the home layout before saving it. Previewing the layout helps you verify the arrangement of sections, images, banners, and sheet cards from a user's perspective.

:::image type="content" source="media/planning-how-to-create-manage-home-layouts/preview-layout.png" alt-text="Screenshot of home layout preview mode showing Development Workspace hero banner, sections, image, and Available Sheets cards with Close preview button." lightbox="media/planning-how-to-create-manage-home-layouts/preview-layout.png":::

After reviewing the layout in preview mode, select **Close preview** to return to the configuration view. Then select **Save** to save the layout.

## Manage home layouts

After creating a home layout, you can update its content and configuration at any time.

To manage home layouts:

1. Go to the **Home** tab.
1. Select **Home Layout**.
1. Select the layout you want to manage.

You can perform the following actions:

* [Show or hide a layout](#show-or-hide-a-layout).
* [Add a new layout](#add-a-layout).
* [Reorder layouts to change their priority](#change-layout-priority).
* Edit the layout content.
* Delete a layout that you no longer need.

### Show or hide a layout

Use the **Show** toggle in the **Layouts** pane to control whether a layout is available to users.

When you hide a layout:

* The layout configuration is retained.
* Users can't access the layout.
* The layout becomes available again when you enable **Show**.

:::image type="content" source="media/planning-how-to-create-manage-home-layouts/show-hide-layout.png" alt-text="Screenshot of the Home layout editor with the Show toggle highlighted in the Layouts pane for the Developer layout." lightbox="media/planning-how-to-create-manage-home-layouts/show-hide-layout.png":::

This approach allows you to temporarily disable a layout without deleting its configuration.

### Add a layout

To create another home layout:

1. In the **Layouts** pane, select **Add Layout**.

   :::image type="content" source="media/planning-how-to-create-manage-home-layouts/add-layout.png" alt-text="Screenshot of the Home layout editor with the Add Layout button highlighted at the bottom of the Layouts pane." lightbox="media/planning-how-to-create-manage-home-layouts/add-layout.png":::

1. Select the role for the new layout.
1. Configure the [layout content](#configure-home-layout-content).
1. Select **Save**.

### Change layout priority

Users assigned to multiple roles see the home layout with the highest priority.

To change the priority:

1. In the **Layouts** pane, select and hold the layout you want to move.
1. Drag it to the required position.
1. Release the layout to reorder the list.

The order of layouts determines their priority. In the following example, the **Developer** layout has the highest priority. If a user is assigned to the **Developer**, **QA Engineer**, and **Business Analyst** roles, the **Developer** Home Layout is displayed.

:::image type="content" source="media/planning-how-to-create-manage-home-layouts/change-layout-priority.png" alt-text="Screenshot of the Layouts pane with Developer, QA Engineer, Business Analyst, and Item Baseline layouts highlighted in priority order." lightbox="media/planning-how-to-create-manage-home-layouts/change-layout-priority.png":::

### Edit a home layout

Select the layout you want to edit and start rearranging or changing it on the right side.

### Delete a home layout

To delete a layout, use the bin icon next to the layout that you want to delete.

## View a home layout

After you save and make a home layout visible, users assigned to the corresponding role can access it from the item.

To view a home layout:

1. Open the item.
1. In the Explorer, select **Home**.
1. View the home layout configured for your role.

   :::image type="content" source="media/planning-how-to-create-manage-home-layouts/view-home-layout.png" alt-text="Screenshot of Planner item with Home selected in Explorer, showing the Development Workspace home layout with resources and available sheets." lightbox="media/planning-how-to-create-manage-home-layouts/view-home-layout.png":::

If you configure a layout for the **Item Baseline** role, users without a specific role assignment see that layout. Users assigned to multiple roles see the highest-priority visible layout available to them.

## Example: Configure personalized home layouts

Consider an item used by multiple project teams. The item contains the following sheets:

* Resource Master
* Sprint Planning
* Test Execution Dashboard
* Defect Analysis
* Release Readiness
* Forecast Intelligence
* Executive Summary

You can create home layouts for different roles:

| Role             | Sheets included in the Home Layout                           |
| ---------------- | ------------------------------------------------------------ |
| QA Engineer      | Test Execution Dashboard, Defect Analysis, Release Readiness |
| Developer        | Resource Master, Sprint Planning, Defect Analysis            |
| Business Analyst | Forecast Intelligence, Executive Summary                     |
| Item Baseline    | Sprint Planning, Executive Summary                           |

In this configuration, when you assign roles to corresponding team members:

* QA Engineers see the QA-specific home layout.

  :::image type="content" source="media/planning-how-to-create-manage-home-layouts/quality-engineer-role-home-layout.png" alt-text="Screenshot of the QA Engineer home layout showing the Quality Assurance Workspace banner, Defect Management section, and Available Sheets cards." lightbox="media/planning-how-to-create-manage-home-layouts/quality-engineer-role-home-layout.png":::

* Developers see the Developer-specific home layout.

  :::image type="content" source="media/planning-how-to-create-manage-home-layouts/developer-role-layout.png" alt-text="Screenshot of the Developer home layout showing the Development Workspace banner, Issue Tracking and Sprint Planning sections, and Available Sheets cards." lightbox="media/planning-how-to-create-manage-home-layouts/developer-role-layout.png":::

* Business Analysts see the Business Analyst home layout.

  :::image type="content" source="media/planning-how-to-create-manage-home-layouts/business-analyst-layout.png" alt-text="Screenshot of the Business Analyst home layout showing the Business Insights Workspace banner, Business Forecasting section, and Available Sheets cards." lightbox="media/planning-how-to-create-manage-home-layouts/business-analyst-layout.png":::

* Users without a specific role assignment see the Item Baseline home layout.

  :::image type="content" source="media/planning-how-to-create-manage-home-layouts/item-baseline-default-layout.png" alt-text="Screenshot of the Item Baseline home layout showing the Project Overview banner, Key Highlights and Project Planning sections, and Available Sheets cards." lightbox="media/planning-how-to-create-manage-home-layouts/item-baseline-default-layout.png":::

* Users assigned to multiple roles see the highest-priority visible layout available to them.

This approach provides each team with quick access to the information most relevant to their responsibilities without requiring them to navigate through unrelated sheets.

## Best practices

* Create layouts based on user responsibilities and common workflows.
* Use descriptive section names and descriptions.
* Place frequently used content near the top of the layout.
* Use images and banners when they improve visual clarity or navigation.
* Review Role Security settings before configuring a role-specific home layout.
* Maintain a useful Item Baseline layout for users without a specific role assignment.
* Review and update layouts periodically as business requirements change.
* Use layout priority carefully when users can belong to multiple roles.
