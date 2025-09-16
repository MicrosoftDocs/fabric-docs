---
title: Set alerts on anomaly detection events in Real-Time hub
description: This article describes how to set alerts on anomaly detection events in Real-Time hub.
author: hzargari-ms
ms.author: v-hzargari
ms.reviewer: tessahurr
ms.topic: how-to
ms.custom:
ms.date: 09/15/2025
ms.search.form: Set Alerts, Anomaly Detection Alerts, Anomaly Detection Set Alerts
---

# Set alerts on anomaly detection events in Real-Time hub (Preview)

This article walks you through how to configure alerts for anomaly detection events using the Real-Time hub in Microsoft Fabric. The alerts help you monitor specific events and trigger automated actions when those events occur.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## How to set alerts on anomaly detection events

### Launch the Set alert page

1. Select the **Real-Time hub** icon in the left navigation pane of the Fabric portal.

    :::image type="content" source="media/set-alerts-anomaly-detection/real-time-hub.png" alt-text="Screenshot that shows the Real-time hub icon in the Fabric portal." lightbox="media/set-alerts-anomaly-detection/real-time-hub.png":::

1. In the Real-Time hub, select **Fabric events** under the **Subscribe to** category.

    :::image type="content" source="media/set-alerts-anomaly-detection/fabric-events.png" alt-text="Screenshot of the Fabric events option." lightbox="media/set-alerts-anomaly-detection/fabric-events.png":::

1. In the **Fabric events** list, locate **Anomaly detection event**. Select either the ⚡ lightning icon or the ⋯ (three dots) menu next to the event, then select **Set alert**.

    :::image type="content" source="media/set-alerts-anomaly-detection/set-alert.png" alt-text="Screenshot that shows the Anomaly Detection events in the Fabric events list.":::

### Set alert for anomaly detection events

In the **Add rule** side panel, configure the following settings:

1. **Rule name:** Enter a name for your alert rule.

    :::image type="content" source="media/set-alerts-anomaly-detection/rule-name.png" alt-text="Screenshot of the Rule name field in the Set alert side panel.":::

1. **Monitor:** Choose which anomaly detection events you want to track.

    :::image type="content" source="media/set-alerts-anomaly-detection/select-events.png" alt-text="Screenshot of the Set alert side panel.":::

    1. In the **Configure connection settings** dialog, choose your Fabric workspace. This workspace should contain the anomaly detection events you want to monitor.

        :::image type="content" source="media/set-alerts-anomaly-detection/select-workspace.png" alt-text="Screenshot of the Configure connection settings dialog.":::

    1. Select the **Item** that you want to monitor. This item should be a Fabric workspace item that contains the anomaly detection events you want to track.

        :::image type="content" source="media/set-alerts-anomaly-detection/select-item.png" alt-text="Screenshot of the Item setting.":::

    1. Select the **Configuration** option.

    1. Set filters to narrow down the events you want to monitor. You can filter by specific attributes, including **Field**, **Operator**, and **Value**.
        Ideally, set the filter for when `data.ConfidenceScore` is greater than a specified value to ensure that only high-confidence anomaly detection events are tracked.

        :::image type="content" source="media/set-alerts-anomaly-detection/filters.png" alt-text="Screenshot of the Set filters section in the Configure connection settings dialog.":::

    1. Select **Next** to proceed to the next step.
    1. Review your selections on the **Review + connect** page. Ensure that the Fabric workspace and item are correct, and that the filters are set as desired. Select **Save** to confirm your selections or **Back** to edit.

        :::image type="content" source="media/set-alerts-anomaly-detection/finish-configure.png" alt-text="Screenshot of the Review + connect page in the Configure connection settings dialog.":::

1. **Alert conditions:** The system alerts you on every anomaly detection event.

1. **Actions to take:** Specify what action Fabric Activator should perform when the alert is triggered:

    1. To receive an email when the event occurs and the condition is met, select Send me an email.
    1. To receive notification via Teams, select Message me in Teams.
    1. To run a Fabric item, select Run a Fabric item.

    :::image type="content" source="media/set-alerts-anomaly-detection/action.png" alt-text="Screenshot of the actions settings.":::

1. In the **Save location** section:

    1. Select the workspace where you want to save the alert.

        :::image type="content" source="media/set-alerts-anomaly-detection/alert-location.png" alt-text="Screenshot of the Set alert location setting.":::

    1. For **Item**, select an existing [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] item or create a new [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] item for this alert.

        :::image type="content" source="media/set-alerts-anomaly-detection/alert-item.png" alt-text="Screenshot that shows the Set alert page with item selected.":::

    1. Select **Create** to finalize the alert setup.

## Related content

- [Set alerts on Azure blob storage events](set-alerts-azure-blob-storage-events.md)
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)
