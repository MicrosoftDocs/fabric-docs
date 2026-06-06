---
title: Approval Activity in Fabric Data Factory Pipelines
description: Learn how to add an approval activity to a pipeline in Microsoft Fabric Data Factory to introduce human decision points into automated data workflows.
ms.reviewer: noelleli
ms.topic: how-to
ms.custom: pipelines
ms.date: 05/05/2026
ai-usage: ai-assisted
---

# Approval activity in Fabric Data Factory pipelines

The approval activity pauses a pipeline and sends an approval request to one or more reviewers. The pipeline waits for a response, then continues down different paths depending on whether the request is approved or rejected.

This is useful when your workflow needs a human decision before moving forward, for example, signing off on a data load, approving a report for publication, or enforcing separation of duties.

## The approval activity

When the pipeline reaches an approval activity, it:

1. Sends an approval request to the reviewers you specified.
1. Pauses and waits for a response.
1. Continues along the success or failure path based on the reviewer's decision. For details, see [Pipeline outcomes](#pipeline-outcomes).

## Prerequisites

Before you start, make sure you have:

- A [Microsoft Fabric workspace](/fabric/fundamentals/create-workspaces)
- A [pipeline](pipeline-overview.md) in your workspace

## Add an approval activity to a pipeline

1. Create a new pipeline or open an existing one.
1. Search for **Approval** in the **Activities** pane and select it to add it to the canvas.

   :::image type="content" source="media/approval-activity/approval-activity-activities.png" alt-text="Screenshot of the pipeline Activities pane with the approval activity highlighted." lightbox="media/approval-activity/approval-activity-activities.png":::

1. Select the approval activity on the canvas.

   :::image type="content" source="media/approval-activity/approval-activity-in-canvas.png" alt-text="Screenshot of the approval activity on the pipeline canvas." lightbox="media/approval-activity/approval-activity-in-canvas.png":::

1. On the **General** tab, configure the activity name and other general settings. For guidance, see [General settings](activity-overview.md#general-settings).

## Select the approval type

On the **Settings** tab, choose the **Type** of approval request:

- **Outlook 365**
- **Microsoft Teams**
- **Custom endpoint**

> [!NOTE]
> Outlook 365 and Microsoft Teams don't support role-based access control (RBAC) for approvals. If you need RBAC support, use the **Custom endpoint** type.

## Configure settings for Outlook 365

:::image type="content" source="media/approval-activity/approval-activity-settings.png" alt-text="Screenshot of the approval activity settings for Outlook 365." lightbox="media/approval-activity/approval-activity-settings.png":::

1. Select an existing **Connection** from the dropdown, or create a new one.
1. Enter a **Request** title. This appears in the subject line of the email. Keep it short and descriptive.
1. (Optional) Enter a **Description**. This appears in the email body. Include enough context so the reviewer understands what they're approving and why.
1. Enter the **Approver** email address. This can be an individual user or a group.

For more information about email connections, see [Office 365 Outlook activity](outlook-activity.md).

## Configure settings for Microsoft Teams

:::image type="content" source="media/approval-activity/approval-activity-settings-teams.png" alt-text="Screenshot of the approval activity settings for Microsoft Teams." lightbox="media/approval-activity/approval-activity-settings-teams.png":::

1. Select an existing **Connection** from the dropdown, or create a new one.
1. Enter a **Request** title. This appears as the first line of the Teams message.
1. (Optional) Enter a **Description**. This appears in the message body.
1. In the **Post in** setting, choose whether to post in a **Channel** or a **Group chat**.
1. Configure the remaining settings to specify the approver.

For more information about Teams connections, see [Teams activity](teams-activity.md).

## Configure settings for a custom endpoint

1. Select an existing **Connection** from the dropdown, or create a new one.
1. Enter the **Body** payload to send to the endpoint.

## Configure timeout behavior

To set a time limit for the approval, use the **Timeout** value on the **General** tab. If no response is received before the timeout, the activity fails and follows the rejection path.

> [!NOTE]
> The requestor (the person sending the approval request) is automatically the last person to modify the pipeline.

## Approver experience

When the pipeline reaches an approval activity, reviewers get a notification based on the approval type:

- **Outlook 365** - an email with **Approve** and **Reject** buttons.
- **Microsoft Teams** - a Teams message with approval action links.
- **Custom endpoint** - an HTTP request to your configured endpoint.

:::image type="content" source="media/approval-activity/approval-activity-email.png" alt-text="Screenshot of the approval request email received by a reviewer." lightbox="media/approval-activity/approval-activity-email.png":::

The notification includes a link to the **Monitoring Hub** for the pipeline.

### Respond to an approval request

1. Select the link in the notification to open the **Monitoring Hub**.
1. Go to the **Review** tab and submit your decision.

   :::image type="content" source="media/approval-activity/approval-activity-review.png" alt-text="Screenshot of the Review tab in the Monitoring Hub for an approval activity." lightbox="media/approval-activity/approval-activity-review.png":::

If the pipeline has multiple Approval activities and you're the approver for more than one, you can bulk approve or reject them all from the **Review** tab.

After you submit a decision, the pipeline resumes automatically.

## Pipeline outcomes

The approval activity has two outcomes:

- **Approved** - the pipeline continues along the success path.

  :::image type="content" source="media/approval-activity/approval-activity-succeeded.png" alt-text="Screenshot of a successfully approved pipeline run." lightbox="media/approval-activity/approval-activity-succeeded.png":::

- **Rejected** - the approver rejected the request, or the activity timed out. The pipeline continues along the failure path.

  :::image type="content" source="media/approval-activity/approval-activity-failed.png" alt-text="Screenshot of a rejected pipeline run." lightbox="media/approval-activity/approval-activity-failed.png":::

Connect downstream activities to the success or failure paths to control what happens next.

## Monitor approval runs

Approval activity runs appear in your pipeline run history. You can see:

- When approval requests were created and resolved.
- Who approved or rejected each request.
- Approval outcomes alongside overall pipeline status.

To view pending and completed approvals, go to the **Monitoring** page and open the **Review** tab.

:::image type="content" source="media/approval-activity/approval-activity-review-tab.png" alt-text="Screenshot of the Review tab showing pending and completed approval requests." lightbox="media/approval-activity/approval-activity-review-tab.png":::

## Best practices for approval activities

- **Include clear context** - give reviewers enough detail so they don't need to ask follow-up questions.
- **Keep approval scopes narrow** - only gate steps that need a human decision.
- **Design clear rejection paths** - handle rejections with notifications or remediation steps.
- **Reflect real business processes** - avoid using approvals as generic delays or pauses.

## Related content

- [Activity overview](activity-overview.md)
- [Office 365 Outlook activity](outlook-activity.md)
- [Teams activity](teams-activity.md)
- [Run, schedule, or use events to trigger a pipeline](pipeline-runs.md)
