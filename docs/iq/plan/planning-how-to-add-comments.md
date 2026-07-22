---
title: Commenting and Collaboration in Planning Sheet
description: Commenting and collaboration in Planning sheets lets you add data-level comments, mention users, and track tasks. Discover how to streamline your team workflows.
ms.date: 07/21/2026
ms.topic: how-to
ai-usage: ai-assisted
#customer intent: As a planning sheet user, I want to add comments to specific cells, rows, and columns, so that I can provide context and feedback directly within my data.
---

# Commenting and collaboration

By using the commenting and collaboration features, you can add contextual discussions directly within the planning sheets. Use these capabilities with your team to review data, provide feedback, assign tasks, and track discussions all within the planning sheet environment.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

You commonly use data-level commentary in analytical and planning scenarios. The planning sheet provides built-in support for notes, annotations, and collaborative comments. It dynamically associates each comment with specific data points, such as cells, rows, columns, or report sections. These comments stay linked to the relevant data context even when filters or hierarchies change.

## Prerequisites

* You have a planning sheet saved with the required dataset.
* You have appropriate [**user permissions**](#configure-comment-access) to create, reply to, or manage comments.

## Add data-level comments

Data-level comments let you add discussions to a specific **cell**, **row**, or **column** in a report.

1. Select the **cell**, **row**, or **column** where you want to add a comment.
1. Select **Comments** from the toolbar or **Add new comment** from the **Comments** dropdown.

   :::image type="content" source="media/planning-how-to-add-comments/add-new-comment.png" alt-text="Screenshot of the Comments and Add new comment options." :::

1. Enter the comment in the **comment editor**.
1. Apply formatting, such as color, links, or text styling, as required.

   :::image type="content" source="media/planning-how-to-add-comments/entering-comment.png" alt-text="Screenshot of entering the comment in comment editor with formatting." lightbox="media/planning-how-to-add-comments/entering-comment.png":::

1. Make a comment important by selecting the star icon, which turns it into a starred comment.
1. Select **Assign to User** to assign a user from the dropdown list as needed.
1. Select the **Send** icon to post the comment.

   :::image type="content" source="media/planning-how-to-add-comments/post-comment.png" alt-text="Screenshot of the Assign to user and send icon options in the comment editor." lightbox="media/planning-how-to-add-comments/post-comment.png":::

The sheet saves the comment along with metadata such as **author name** and **timestamp**.

## Mention users and collaborate

You can notify other users by mentioning them in a comment.

1. Select the cell and add a comment.
1. Type **@** followed by the user’s name.
1. Select the user from the list of suggestions.
1. Post the comment by selecting the send icon.

Mentioned users receive Microsoft Teams notifications with a link to the sheet so they can respond or take action.

:::image type="content" source="media/planning-how-to-add-comments/mention-user.png" alt-text="Screenshot of mentioning a user in the comment." lightbox="media/planning-how-to-add-comments/mention-user.png":::

Comments help you assign and track tasks for effective workflow collaboration.

The task status starts as **Open**. You can later update it to **Resolved** when you complete the task.

## Lock, resolve, and reopen comment threads

You can manage comment threads to control discussions.

### Lock a thread

1. Hover over the comment indicator in the planning sheet to open the comment thread.
1. Select the **three-dot** menu and then select **Lock Thread**.

Locked threads appear grayed out, and no one can edit or reply to them until you unlock them. To unlock the thread, select the unlock icon.

### Resolve a thread

1. Hover over the comment indicator to open the comment thread.
1. Select the **three-dot** menu and then select **Resolve Thread**.

You can reopen a resolved thread if you need further discussion. To reopen the thread, select the undo icon ![Screenshot of the Undo icon](media/planning-how-to-add-comments/undo-icon.png) or reply to the thread.

:::image type="content" source="media/planning-how-to-add-comments/lock-resolve.png" alt-text="Screenshot of the Resolve Thread and Lock Thread options in the comment's menu." :::

## Reply to comments

Comments support threaded conversations that let multiple users collaborate.

1. Hover over the comment indicator to open the comment thread.
1. Enter your response in the **Reply** editor.
1. Post the message by selecting the send icon.

Replies appear as part of the same comment thread, making it easier to track discussions.

## View all comments

You can view all comments in a centralized panel to track discussions across headers, rows, columns, and cells.

To view all the comments:

1. Select **View all comments** from the **Comments** dropdown.
1. The **All Comments** panel opens with the **Data Level** tab selected by default.

:::image type="content" source="media/planning-how-to-add-comments/view-all-comments.png" alt-text="Screenshot of the View all comments option." :::

The panel organizes comments by category and shows the number of comments in each category:

* **Header Comments**: Comments added at the header level.
* **Row Comments**: Comments associated with specific rows.
* **Column Comments**: Comments associated with specific columns.
* **Cell Comments**: Comments added to individual cells.

Expand each section by selecting **>** to view the associated comments.

## Add report-level comments

Report-level comments let you discuss the entire report instead of focusing on a specific data point.

To view report-level comments:

1. Select **View all comments** from the **Comments** dropdown. The **All Comments** panel opens.
1. Select the **Report Level** tab.
1. Enter your comment in the side panel.
1. Select **Add Comment**.

:::image type="content" source="media/planning-how-to-add-comments/report-level-comment.png" alt-text="Screenshot of adding a report level comment." lightbox="media/planning-how-to-add-comments/report-level-comment.png":::

Report-level comments support the same capabilities as data-level comments, including mentions, replies, formatting, notifications, and task assignments.

## Configure comment settings

Customize how comments appear and configure notification settings.

To open the **Comment Settings** pane:

1. Select **Comments** on the toolbar.
1. Expand the **Comments** dropdown, and then select **Settings**.

    The following options are available:

    * **Enable Commenting**: Turn commenting on or off for the planning sheet.
    * **Comments Column**: Show or hide the dedicated **Comments** column. For more information, see [**Add a comments column**](#add-comments-column).
    * **Rollup Indicator**: Show or hide rollup indicators that summarize comments when you collapse hierarchical rows.
    * **Star indicator for starred comments**: Show or hide star indicators for starred comments.
    * **Indicator Size**: Specify the size, in pixels, of the comment indicator that appears in the planning sheet.
    * **Indicator Position**: Choose where the comment indicator appears within a cell.
    * **Preview**: Preview how the selected indicator size and position appear.
    * **Teams Notification**: Turn Microsoft Teams notifications for comments on or off.
    * **Delete all comments**: Permanently remove all comments from the table.
    * **Reset**: Discard any unsaved changes and restore the previously saved settings.

1. Select **Save** to apply your changes in the **Comment Settings** pane.

    :::image type="content" source="media/planning-how-to-add-comments/comment-settings.png" alt-text="Screenshot of the Comment Settings panel." lightbox="media/planning-how-to-add-comments/comment-settings.png":::

> [!NOTE]
> Deleting all comments permanently removes all comment threads from the table. This action can't be undone.

## Add comments column

Add a dedicated **Comments** column to capture row-level discussions. When you add a comment as a task, the sheet creates the **Assignee** and **Status** columns to display the assigned user and the current task status. Comments that you add in the **Comments** column appear under **Row Comments** in the **View all comments** panel.

To add a comments column:

1. Enable the **Show comments column** toggle in the [**Comment Settings**](#configure-comment-settings) panel. A **Comments** column appears in the table.
1. Double-click the required row in the **Comments** column. The comment editor opens.
1. Enter the comment, and then select the **Send** icon to post it.

Comments in the **Comments** column support replies, user assignments, and task status tracking. To show or hide the **Assignee** and **Status** columns, select the **>** icon in the **Comments** column header.

:::image type="content" source="media/planning-how-to-add-comments/assignee-status.png" alt-text="Screenshot of the Comments, Assignee, and Status columns." lightbox="media/planning-how-to-add-comments/assignee-status.png":::

To remove the **Comments** column, turn off the **Show comments column** toggle in the **Comment Settings** pane.

## Configure comment access

Use the **Security** settings to control who can access, manage, and interact with comments.

### Open comment security settings

1. Select **Security** from the toolbar.
1. In the left pane, select **Comments**.

The Comments settings page opens.

:::image type="content" source="media/planning-how-to-add-comments/security-comments.png" alt-text="Screenshot of the comments security settings." lightbox="media/planning-how-to-add-comments/security-comments.png":::

### Manage comment access

Use the following options to define access:

* **Who can view comments**: Specify users who can view and interact with comments. Enter names or email addresses to grant access.
* **Who can lock or unlock comments**: Define users who can lock or unlock comments.
* **Who can star comments**: Specify users who can mark comments as important (starred).

> [!NOTE]
> Report authors and editors can delete comments from other users, such as inappropriate comments.

### Save or discard changes

* Select **Save** to apply changes.
* Select **Cancel** to discard changes.
