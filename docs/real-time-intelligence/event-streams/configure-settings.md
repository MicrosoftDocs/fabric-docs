---
title: Configure settings for a Fabric eventstream
description: This article describes how to configure sensitivity label, endorsement, retention, and throughput settings for an eventstream. 
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.date: 03/15/2024
ms.search.form: Event Streams Overview
---

# Configure settings for a Fabric eventstream
This article describes how to configure sensitivity label, endorsement, retention, and throughput settings for an eventstream. 

When you open an existing eventstream, you see the **Settings** button on the toolbar.

:::image type="content" source="./media/configure-settings/settings-button-existing-event-stream.png" alt-text="Screenshot that shows the Settings button on an Eventstream page. " lightbox="./media/configure-settings/settings-button-existing-event-stream.png":::

You can also launch the **Settings** page from a workspace by selecting **...(ellipsis)** next to the eventstream in the list of artifacts, and then selecting **Settings**.

:::image type="content" source="./media/configure-settings/workspace-settings-button.png" alt-text="Screenshot that shows the Settings button on the workspace page. " lightbox="./media/configure-settings/workspace-settings-button.png":::

## Retention setting
For the **retention** setting, you can specify the duration for which the incoming data needs to be retained. The default retention period is one day. Events are automatically removed when the retention period expires. If you set the retention period to one day (24 hours), the event becomes unavailable exactly 24 hours after it's accepted. You can't explicitly delete events. The maximum value for this setting is 90 days. To learn more about usage billing and reporting, see [Monitor capacity consumption for event streams](monitor-capacity-consumption.md).

:::image type="content" source="./media/create-manage-an-eventstream/retention-setting.png" alt-text="Screenshot that shows the retention setting for an event stream.":::

## Event throughput setting
For the **event throughput** setting, you can select the throughput rate for incoming events for your eventstream. This feature allows you to scale your eventstream, ranging from 1 MB/sec to 100 MB/sec. 

:::image type="content" source="./media/create-manage-an-eventstream/throughput-setting.png" alt-text="Screenshot that shows the throughput setting for an event stream.":::

> [!NOTE]
> Pause the node before you update the throughput setting and reactivate the node. 

## Endorsement setting
On the **Endorsement** tab of the **Settings** page, you can promote or endorse or recommended the eventstream for others to use. For more information on endorsement, see [Endorsement](/fabric/governance/endorsement-overview).

:::image type="content" source="./media/create-manage-an-eventstream/endorsement-setting.png" alt-text="Screenshot that shows the endorsement setting for an event stream.":::

## Sensitivity label setting
On the **Sensitivity label** tab of the **Settings** page, you can specify the sensitivity level of the eventstream. 

## Related content

- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
