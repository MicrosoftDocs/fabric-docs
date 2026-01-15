---
title: Monitor Eventstream for Stopped Events in Activator
description: Learn how to monitor eventstreams and create alerts for stopped events using Activator. Set up efficient, cost-effective monitoring with summarized data.
#customer intent: As a data engineer, I want to create a rule to monitor eventstream activity so that I can receive alerts when data stops flowing.
author: spelluru
ms.author: spelluru
ms.reviewer: spelluru
ms.date: 01/12/2026
ms.topic: how-to
---


# Monitor eventstream for stopped events

This article shows how to create an Activator rule that alerts you when an eventstream stops sending events. 

## Scenario overview

In this scenario, you monitor an eventstream powered by real-time data from city bicycle stations. The goal is to receive an automatic alert whenever no events arrive for one hour.

The example uses an eventstream configured with sample bicycle data from London's bike stations, where each event reports a station's current capacity. Rather than ingesting the full eventstream into Activator (which would be costly and inefficient), you add a summarization node in eventstream that emits a count of events per minute. You then send this summarized output to Activator and create a rule that fires when the summarized event flow stops.

This approach provides efficient monitoring with lower cost by processing only aggregated data rather than individual events.

## Set up eventstream with sample data

1. Create a new eventstream and select **Use sample data** on the welcome screen.

   :::image type="content" source="media/alert-stop-events/use-sample-data-option.png" alt-text="Screenshot of the Eventstream welcome screen with the Use sample data option highlighted.":::

1. Choose **Bicycles** from the sample data options and select **Add**.

   :::image type="content" source="media/alert-stop-events/sample-data-bicycles-selection.png" alt-text="Screenshot of the sample data selection dialog with Bicycles option and Add button.":::

## Configure event aggregation

1. Add a **Group by** transformation to your eventstream.

   :::image type="content" source="media/alert-stop-events/group-by-transformation-node.png" alt-text="Screenshot of how to add a Group by transformation node to the eventstream." lightbox="media/alert-stop-events/group-by-transformation-node.png":::

1. Select the edit icon. In the **Aggregations** section, choose **Count** as the operation and select **Add**.

   :::image type="content" source="media/alert-stop-events/aggregation-count-operation.png" alt-text="Screenshot of the aggregation configuration with Count operation selected." lightbox="media/alert-stop-events/aggregation-count-operation.png":::

1. Set the time window duration to **60 seconds** and select **Save**.

   :::image type="content" source="media/alert-stop-events/time-window-duration-configuration.png" alt-text="Screenshot of the time window configuration set to 60 seconds." lightbox="media/alert-stop-events/time-window-duration-configuration.png":::

## Connect to Activator

1. [Add an Activator destination](/fabric/real-time-intelligence/event-streams/add-destination-activator) to the **GroupBy** node.

   :::image type="content" source="media/alert-stop-events/activator-destination-setup.png" alt-text="Screenshot of the Activator destination being added to the GroupBy node." lightbox="media/alert-stop-events/activator-destination-setup.png":::

1. Publish the eventstream to make your changes active.

   :::image type="content" source="media/alert-stop-events/publish-event-stream-button.png" alt-text="Screenshot of the Publish button to activate the eventstream configuration." lightbox="media/alert-stop-events/publish-event-stream-button.png":::

## Create the alert rule

1. Go to the Activator item connected to your Eventstream. You see that the system ingests only one event per minute. Select **New rule**.

   :::image type="content" source="media/alert-stop-events/activator-new-rule-button.png" alt-text="Screenshot of the Activator interface with aggregated events and the New rule button." lightbox="media/alert-stop-events/activator-new-rule-button.png":::

1. In the rule configuration, choose **No presence of data** from the **Operation** dropdown and select **1 hour** in the **Time elapsed** dropdown. Select **Save and start**.

   :::image type="content" source="media/alert-stop-events/bicycles-stream-alert-rule.png" alt-text="Screenshot of the rule configuration with No presence of data operation and 1 hour time elapsed settings." lightbox="media/alert-stop-events/bicycles-stream-alert-rule.png":::

Your rule is now running and sends you an email alert if the eventstream stops sending events for one hour. This alert prompts you to investigate any problems with your data pipeline.