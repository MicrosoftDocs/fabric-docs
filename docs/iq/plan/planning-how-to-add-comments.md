---
title: Commenting and Collaboration in Planning sheet
description: Learn how to use commenting and collaboration features in Planning sheets to assign tasks, add context, and streamline team workflows with real-time discussions.
ms.date: 04/15/2026
ms.topic: how-to
ai-usage: ai-assisted
#customer intent: As a user, I want to understand and use commenting and collaboration feature effectively.
---
# Commenting and collaboration

Commenting and collaboration features allow users to add contextual discussions directly within the Planning sheets. These capabilities enable teams to review data, provide feedback, assign tasks, and track discussions all within the Planning sheet environment.

Data-level commentary is commonly used in analytical and planning scenarios. The Planning sheet provides built-in support for notes, annotations, and collaborative comments, which are dynamically associated with specific data points such as cells, rows, columns, or report sections that remain linked to the relevant data context even when filters or hierarchies change.

## Prerequisites

* You have saved a Planning sheet configured with the required dataset.
* You have appropriate *user permissions* to create, reply to, or manage comments.

## Add data-level comments

Data-level comments allow you to add discussions to a **specific cell, row, or column** in a report.

1. Select the **cell, row, or column** where you want to add a comment.
1. Select **Add a comment** from the toolbar.

     :::image type="content" source="media/planning-how-to-add-comments/comments-toolbar.png" alt-text="Screenshot of the comments option.":::

1. Enter the comment in the **comment editor**.
1. Apply formatting, such as color, links, or text styling, as required.
1. **Assign to user** as needed.
1. Select **Post**.

     :::image type="content" source="media/planning-how-to-add-comments/add-comments.png" alt-text="Screenshot of the adding comments." lightbox="media/planning-how-to-add-comments/add-comments.png":::

The comment is saved along with metadata such as **author name and timestamp**.

### Mention users and collaborate

You can notify other users by mentioning them in a comment.

1. Select the cell and add a comment.
1. Type **@** followed by the user's name.
1. Select the user from the list of suggestions.
1. Post the comment.

Mentioned users receive email notifications with a link to the sheet so they can respond or take action.

:::image type="content" source="media/planning-how-to-add-comments/mention-users.png" alt-text="Screenshot of the mentioning users in comments." lightbox="media/planning-how-to-add-comments/mention-users.png":::

Comments help you assign and track tasks for effective workflow collaboration.

The task status is initially **Open** and can later be updated to **Resolved** when the task is completed.

:::image type="content" source="media/planning-how-to-add-comments/assign-track-tasks.png" alt-text="Screenshot showing assigning and tracking tasks of users in comments.":::

### Lock or resolve comment threads

You can manage comment threads to control discussions.

To lock a thread:

1. Open the comment thread menu.
1. Select **Lock thread**.

Locked threads cannot be edited or replied to until they are unlocked.

To resolve a thread:

1. Open the thread menu.
1. Select **Resolve thread**.

Resolved threads can be reopened if further discussion is needed.

### Reply to comments

Comments support threaded conversations that allow multiple users to collaborate.

1. Select the comment thread.
1. Enter your response in the **Reply** editor.
1. Post the message.

Replies appear as part of the same comment thread, making it easier to track discussions.

## Add report-level comments

Report-level comments allow users to discuss the **entire report instead of a specific data point**.

1. Select the **Comments** dropdown.
1. Choose **Report-level comments**.

     :::image type="content" source="media/planning-how-to-add-comments/add-report-level-comments.png" alt-text="Screenshot of the showing report level comments option.":::

1. Enter the comment in the side panel.
1. Select **Post**.

Report-level comments support the same capabilities as data-level comments, including mentions, replies, formatting, notifications, and task assignments.

 :::image type="content" source="media/planning-how-to-add-comments/report-level-comment.png" alt-text="Screenshot of the adding report level comments." lightbox="media/planning-how-to-add-comments/report-level-comment.png":::

## View all comments

You can view all comments in a centralized panel to track discussions across headers, rows, columns, and cells.

Select **View all comments from** **Comments**.

Comments are grouped by category:

* **Header comments**: Comments added at the header level.
* **Row comments**: Comments associated with specific rows.
* **Column comments**: Comments associated with specific columns.
* **Cell comments**: Comments added to individual cells.

Expand each section by selecting **>** to view the associated comments.

:::image type="content" source="media/planning-how-to-add-comments/view-all-comments.png" alt-text="Screenshot of the showing view all comments option." lightbox="media/planning-how-to-add-comments/view-all-comments.png":::

## Configure comment settings

Administrators and report owners can configure how comments behave in a report.

To open comment settings:

1. Select the **Comments** dropdown.
1. Select **Settings**.

     :::image type="content" source="media/planning-how-to-add-comments/configure-comments.png" alt-text="Screenshot of configuring comments.":::

### General settings

General settings allow you to:

* Enable or disable comments in a report
* Show the comments panel automatically when the report loads
* Highlight starred comments when the report loads
* Enable or disable the comments column
* Customize comment indicators' display size and position, along with the preview
* Enable or disable teams notifications
* Delete all comments from the report

   :::image type="content" source="media/planning-how-to-add-comments/comments-settings.png" alt-text="Screenshot of configuring comment settings." lightbox="media/planning-how-to-add-comments/comments-settings.png":::

## Configure comment access

You can control who can access, manage, and interact with comments using the **Security** settings.

### Open comment security settings

1. Select **Security** from the toolbar.
1. In the left pane, select **Comments**.

The **Comments settings** page opens.

### Manage comment access

Use the following options to define access:

* **Who can access comments**:\
  Specify users who can view and interact with comments. Enter names or email addresses to grant access.
* **Who can access user lock/unlock**:\
  Define users who can lock or unlock comments for others.
* **Who can starred comments**:\
  Specify users who can mark comments as important (starred).

> [!NOTE]
> Report authors and editors can delete comments from other users (for example, inappropriate comments).

### Save changes

* Select **Save** to apply changes.
* Select **Cancel** to discard changes.

    :::image type="content" source="media/planning-how-to-add-comments/comment-access.png" alt-text="Screenshot of configuring comment access settings." lightbox="media/planning-how-to-add-comments/comment-access.png":::
