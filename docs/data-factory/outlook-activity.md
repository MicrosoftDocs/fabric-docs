---
title: Office 365 Outlook activity
description: Learn how to add an Office 365 Outlook activity to a pipeline and use it to send a Teams message.
ms.reviewer: xupxhou
ms.topic: how-to
ms.date: 08/25/2025
ms.custom: pipelines
ai-usage: ai-assisted
---

# Use the Office 365 Outlook activity to send an email with Outlook

The Office 365 Outlook activity in Data Factory for Microsoft Fabric lets you send emails using your Office 365 account. You can customize the message with dynamic expressions.

## Prerequisites

Make sure you have the following:

- A tenant account with an active subscription. [Sign up for free](../fundamentals/fabric-trial.md).
- A created workspace.

## Add the Office 365 Outlook activity to a pipeline

Follow these steps to use the Office 365 Outlook activity in a pipeline:

1. Create a new pipeline in your workspace.
1. Search for "Office 365 Outlook" in the pipeline **Activities** pane and select it to add it to the pipeline canvas. Depending on your browser window width, you might need to expand the activities list or look for the Outlook icon without a label.

   :::image type="content" source="media/outlook-activity/add-outlook-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Office 365 Outlook activity highlighted.":::

1. Select the new Outlook activity on the canvas if it isn’t already selected.

   :::image type="content" source="media/outlook-activity/outlook-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Office 365 Outlook activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guide to configure the **General** settings tab.

> [!TIP]
> Use a separate Outlook activity for each activity you want to monitor for failures.
>
> If you attach more than one activity to the Outlook activity, all connected statuses must be met to trigger it. For example, if two copy activities are connected to an Outlook activity set to trigger "on failure," both activities must fail to activate the Outlook activity. If only one fails, the Outlook activity won’t trigger.

## Configure the Office 365 Outlook activity

To set up the Office 365 Outlook activity:

1. Add a connection to your Outlook activity at the top of the settings. You can create a new connection or use an existing one.

   > [!NOTE]
   > * If you’re using user authentication and deploying the pipeline with the Outlook or Teams activity to another workspace, the activity will be inactive in the target workspace until you create a new user authentication connection there.
   > * If you don't have access to the connections used in the Outlook activity, the initial deployment will fail. To troubleshoot, you can edit the target pipeline and change the authorization or set the activity to inactive.
   > * **The content being sent from the email will be sent from your account.**

1. Provide details for the email, including recipients, subject, and body. You can also add advanced details like a custom "from" address, CC and BCC recipients, sensitivity, and a custom reply-to address. All fields support [dynamic expressions](expression-language.md).

   :::image type="content" source="media/outlook-activity/email-details.png" alt-text="Screenshot showing the settings windows in the Outlook Activity.":::

## Known limitations

- The Outlook activity will be inactive when using CI/CD.
- The Outlook activity does not support WI or SPN.

## Related content

- [Run, schedule, and trigger pipelines](pipeline-runs.md)
- [Monitor pipeline runs](monitor-pipeline-runs.md)
