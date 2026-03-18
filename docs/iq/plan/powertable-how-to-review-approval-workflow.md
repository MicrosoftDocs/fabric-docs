---
title: Review changes in approval workflow
description: Learn how to review and approve pending data changes in a PowerTable approval workflow to ensure controlled and governed data updates.
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a reviewer or approver, I want to review pending changes in a PowerTable approval workflow so that I can approve or reject data updates before they are applied.
---

# Review changes in PowerTable approval workflow

In this article, you learn how the approval workflow operates from both the **author** and **approver** perspectives. The **author** is the user who submits changes, while the **approver** reviews and approves those changes.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## The approval process

The approval review process includes these main steps:

1. As an author, make changes and select **Submit for review**.
1. Enter the description of the changes, the due date, and the priority.
1. Select **Submit for Review**.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/submit-for-review.png" alt-text="Screenshot of the Submit for Review button." lightbox="media/powertable-how-to-review-approval-workflow/submit-for-review.png":::

Next, approvers navigate to the **Approvals** section to review the summary and detailed information about the submitted change requests.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/approvals-tab.png" alt-text="Screenshot of the Approvals button in the PowerTable tab of the menu ribbon." lightbox="media/powertable-how-to-review-approval-workflow/approvals-tab.png":::

The **Approvals** section has two tabs:

* **My Requests** (requests raised by you)
* **Pending Requests** (requests you need to approve)

>[!NOTE]
>In some scenarios, a user might act as both an **author** and an **approver** based on the configured rules for specific sections or departments. In this case, the user can switch between these tabs to view both submitted requests and pending approvals.

## My Requests tab

This tab displays an overview of the requests and changes that are waiting for approval.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/my-requests-overview.png" alt-text="Screenshot of My Requests showing requests that are pending review." lightbox="media/powertable-how-to-review-approval-workflow/my-requests-overview.png":::

It contains the following categories:
* **Pending Review**: Displays all open requests that are waiting for approval.
* **Overdue**: Shows open requests that are past their approval due date.
* **Action Required**: Displays requests where the approver suggested changes that require your action.
* **Closed**: Displays requests that are approved or closed.

You can switch between these tabs to view requests by status. Once a request is approved or closed, it moves to the **Closed** tab.

Use the **search box** to find specific requests.

### Detailed view of your request

To understand each change request in detail, select **View Details**.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/view-details.png" alt-text="Screenshot of selecting View Details on a review item." lightbox="media/powertable-how-to-review-approval-workflow/view-details.png":::

It displays details such as the request ID, description (if provided), approver information, date and time raised, approval due date, request owner, priority, and current status.

Select **Edit Details** to change any of these details.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/edit-details.png" alt-text="Screenshot of editing details on a review item." lightbox="media/powertable-how-to-review-approval-workflow/edit-details.png":::

### Add comments

Add comments to provide more context for the approver.

1. Select the cell to enable the **Comment** icon.
1. Add a comment and then post it. The comments are updated automatically, and approvers can see them when they open the requests.
1. You can also add assignees and start a comment thread. To add assignees, select **Assign to user** and select the assignee, or you can directly use an `@mention` and add their names in the comments.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/add-comments.png" alt-text="Screenshot of adding comments to a cell." lightbox="media/powertable-how-to-review-approval-workflow/add-comments.png":::

The task status is automatically set to **Open**, and an email notification is sent to the assignees. They can reply to the thread to start a conversation.

### View comments

Select **View Comments** to view all the added comments at once.

### Edit data

1. Select **Edit** to modify the data in the submitted changes. You can add new changes or undo or modify existing ones.
1. After editing, select **Save** to submit them.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/edit-data.png" alt-text="Screenshot of editing data in a review item." lightbox="media/powertable-how-to-review-approval-workflow/edit-data.png":::

### View history

Select **View History** to view the history of edits or user actions.

#### Close request

Use **Close Request** to withdraw your submitted request and move it from the **Open** section to the **Closed** section.

### Re-submit For Review

If the approver requests changes during the review, you can apply the suggested updates or skip them and add a comment. After making the changes or adding your comment, select **Re-submit for Review** to submit the request again.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/resubmit-review.png" alt-text="Screenshot of resubmitting a request for review." lightbox="media/powertable-how-to-review-approval-workflow/resubmit-review.png":::

## Pending Requests tab

If you're an approver, this tab displays all pending requests submitted by other users for your review and approval.

Similar to the **My Requests** tab, you can use the search option to find specific requests. Use the **Requested By** filter to filter requests based on users.

Select **Approve** to instantly approve a request.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/pending-requests-approve.png" alt-text="Screenshot of viewing pending requests with the option to approve." lightbox="media/powertable-how-to-review-approval-workflow/pending-requests-approve.png":::

#### Detailed view of a request

Select **Details** for any request to view detailed information.

The approver can review all changes in the selected request. Updated values are highlighted in **blue**, and deleted rows appear in **red**.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/detailed-view-approver.png" alt-text="Screenshot of the detailed view that an approver sees." lightbox="media/powertable-how-to-review-approval-workflow/detailed-view-approver.png":::

Explore the request details with these actions:
1. Select **View Comments** to see all comments.
1. Select **View History** to view the action history for the request.
1. Finally, select **Approve** to approve the request or **Reject** to reject it.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/approve-reject-buttons.png" alt-text="Screenshot of the button to approve a request." lightbox="media/powertable-how-to-review-approval-workflow/approve-reject-buttons.png":::

## Request changes or adjustments

Approvers can request modifications to a submitted request. Select **Request Changes** to suggest modifications.

Select **Request Changes** and add a comment describing the suggested change. Comments help the author understand the required modifications. Select **Submit** to send the request.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/request-changes.png" alt-text="Screenshot of the button to submit changes to a request." lightbox="media/powertable-how-to-review-approval-workflow/request-changes.png":::

The author receives an email notification, reviews the suggestions, makes the required changes, and [resubmits the request](#re-submit-for-review) for approval.

Both the author and the approver receive email notifications for suggested changes and resubmissions, enabling faster collaboration through a conversation thread.

## Disable approval workflow

To disable approvals, select the **Manage Approvals** button, turn off **Enable Approvals**, and select **Proceed**.

:::image type="content" source="media/powertable-how-to-review-approval-workflow/disable-approval.png" alt-text="Screenshot of the Manage Approvals tab with the option to disable an approval.":::

>[!NOTE]
>When the approval workflow is disabled, all active requests are removed. Any new changes to the table can be committed directly by selecting **Save to Database**.