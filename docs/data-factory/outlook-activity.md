---
title: Office 365 Outlook activity (Preview)
description: Learn how to add an Office 365 Outlook activity to a pipeline and use it to send a Teams message.
ms.reviewer: xupxhou
ms.author: whhender
author: whhender
ms.topic: how-to
ms.date: 12/18/2024
ms.custom: pipelines
---

# Use the Office 365 Outlook activity to send an email with Outlook (Preview)

The Office 365 Outlook activity in Data Factory for Microsoft Fabric allows you to send an email with your Office 365 account. The message can include dynamic expressions to be customized as much as necessary.

> [!IMPORTANT]
> The Office 365 Outlook activity in Data Factory for Microsoft Fabric is currently in preview. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A workspace is created.

## Add an Office 365 Outlook activity to a pipeline with UI

To use an Office 365 Outlook activity in a pipeline, complete the following steps:

1. Create a new pipeline in your workspace.
1. Search for Office 365 Outlook in the pipeline **Activities** pane, and select it to add it to the pipeline canvas. It might be necessary to expand the activities list on the far right side of the pane, or the Outlook icon can be compressed without labeling text beneath it, as shown in this image, depending on the window width of your browser.

   :::image type="content" source="media/outlook-activity/add-outlook-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Office 365 Outlook activity highlighted.":::

1. Select the new Outlook activity on the canvas if it isn't already selected.

   :::image type="content" source="media/outlook-activity/outlook-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Office 365 Outlook activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

>[!TIP]
>If you're using outlook activities to nofity for failure, use a new outlook activity for each activity you want to monitor.
>
>If you attach more than one activity to the outlook activity, all connected statuses must be met to trigger the activity. For example, if you have two copy activities, both connected to an outlook activity 'on failure', both activities must fail to trigger the outlook activity. If only one fails, the outlook activity will not be triggered.

## Office 365 Outlook activity settings

1. Select the **Settings** tab, then select **Sign in** to sign in to your Office 365 account.

   :::image type="content" source="media/outlook-activity/sign-in-to-office-365.png" alt-text="Screenshot showing the Outlook activity Settings tab, highlighting the tab, and where to sign in.":::

1. An authentication dialog appears for you to provide credentials for the account you want to use in Outlook. After that, a confirmation appears for you to allow access to Outlook from your pipeline. Select **Allow access** on the confirmation dialog to connect your Outlook activity to your account.

1. Once connected, you can choose to provide details for the email, including its recipients, subject, body. You can also include **Advanced** details such as a custom from address, CC and BCC recipients, sensitivity, and a custom reply-to address. All of the fields support [dynamic expressions](expression-language.md).

   :::image type="content" source="media/outlook-activity/email-settings.png" alt-text="Screenshot showing the Office 365 Outlook activity Settings tab, after signing in, with the Post in options dropdown expanded to show its available options.":::

## Save and run or schedule the pipeline

The Office 365 Outlook activity is typically used with other activities, often as a status notification for the outcome of prior steps in a pipeline. After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

[How to monitor pipeline runs](monitor-pipeline-runs.md)
