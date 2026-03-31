---
title: Comment and collaborate
description: Learn how to perform collaborative commenting in Intelligence sheets with cell, row, and column-level threaded conversations, task assignments, and mentions.
ms.date: 03/31/2026
ms.topic: how-to
#customer intent: As a user, I want to understand how to collaborate on reports with comments.
---

# Collaborate on reports with comments

Comments are collaborative threads that facilitate conversations directly from within your report. The Intelligence sheet provides a context-aware commenting solution with support for cell, row, and column-level threaded conversations. Key features include `@mentions`, email notifications, and task assignments.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Add comments

1. Select a cell/row/column. Select **Comment**>**Add New Comment**.
2. Use the rich text editor to format text and add hyperlinks in comments.

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/add-comment.png" alt-text="Screenshot of a formatted comment with bold, red text." lightbox="media/intelligence-how-to-comment-collaborate/add-comment.png":::

3. After adding a comment, hover over the indicator to view it.
4. You can mark important comments with a star to easily find and reference them later.

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/star-comment.png" alt-text="Screenshot of a starred comment." lightbox="media/intelligence-how-to-comment-collaborate/star-comment.png":::

5. When writeback is performed, comments added to a report are captured and saved to the destination.

> [!TIP]  
> Use writeback to capture comments in the report, ensuring they’re preserved for future collaboration.

:::image type="content" source="media/intelligence-how-to-comment-collaborate/write-back-comment.png" alt-text="Screenshot of comment writeback." lightbox="media/intelligence-how-to-comment-collaborate/write-back-comment.png":::

## Assign comments and tag users

1. Select **Assign to user** to search for and assign the comment to another user.

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/assign-user.png" alt-text="Screenshot of assigning a comment to a user.":::

2. Reply to a comment to start a thread.
3. Tag other users with `@mentions`. The `@user` mention in a comment automatically sends an email notification to that user, with a link to the report.

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/tag-user.png" alt-text="Screenshot of a comment containing a tag to a user.":::

## Resolve threads and lock comments

Resolve comment threads to indicate that an issue has been addressed. You can also lock threads and make them read-only.

* After a task is assigned, the assignee can respond in the comment thread. If the response resolves the issue, you can close the thread. Select **Resolve Thread**.

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/resolve-thread.jpg" alt-text="Screenshot of resolving a comment." lightbox="media/intelligence-how-to-comment-collaborate/resolve-thread.jpg":::

* Select the undo icon or reply to a thread to reopen it.

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/reopen-thread.png" alt-text="Screenshot of reopening a thread." lightbox="media/intelligence-how-to-comment-collaborate/reopen-thread.png":::

* Lock comments to prevent further editing and replies. Select **Lock Thread**.

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/lock-thread.png" alt-text="Screenshot of locking a thread." lightbox="media/intelligence-how-to-comment-collaborate/lock-thread.png":::

* Select the unlock icon to make the thread editable again.

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/unlock-thread.png" alt-text="Screenshot of unlocking a thread." lightbox="media/intelligence-how-to-comment-collaborate/unlock-thread.png":::

## Manage comments in a report

Work with threads by viewing, replying, sorting, and filtering discussions in the comments pane. You can also star, assign, lock, and resolve threads.

* Select **Comments** > **View All Comments** to browse all the comments from a single view. In the detailed view, you can see all comments and replies with their timestamps, along with the specific row and column dimensions to which each comment is linked. You can also reply to comments in the detailed view.
You can keep the comments panel visible at all times by enabling **Show comments panel** in **Comments > Settings**

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/view-all-comments.jpg" alt-text="Screenshot of comments panel." lightbox="media/intelligence-how-to-comment-collaborate/view-all-comments.jpg":::

* Use the **Simple** view to see a concise summary of all the comments.

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/simple-view.png" alt-text="Screenshot of summary view" lightbox="media/intelligence-how-to-comment-collaborate/simple-view.png":::

* Sort based on creation time and filter comments by type, assignee, or creation date for quicker access.&#x20;

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/sort-filter-comments.png" alt-text="Screenshot of sorting and filtering in the comments panel." lightbox="media/intelligence-how-to-comment-collaborate/sort-filter-comments.png":::

* Select the refresh icon to update the report with the latest comments.

    :::image type="content" source="media/intelligence-how-to-comment-collaborate/refresh-comment.png" alt-text="Screenshot of comments refresh." lightbox="media/intelligence-how-to-comment-collaborate/refresh-comment.png":::
