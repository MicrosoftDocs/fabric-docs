---
title: Set alerts on Fabric events in Real-Time hub
description: This article describes how to set alerts on Fabric events in Real-Time hub.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.date: 05/21/2024
---

# Set alerts on Fabric events in Real-Time hub
This article describes how to set alerts on Fabric events in Real-Time hub.

## Launch the Set alert page 

Do steps from one of the following sections, which opens a side panel where you can configure the following options:

- Events you want to monitor.
- Conditions you want to look for in the events.
- Action you want Data Activator to take. 

### From the events list

1. In Real-Time hub, switch to the **Fabric events** tab. 
1. Move the mouse over either **Azure blob storage events** or **Fabric workspace item events**, and do one of the following steps: 
    - Select the **Alert** button 
    - Select **ellipsis (...)**, and select **Set alert**.

### From the event detail page

1. Select either **Azure blob storage events** or **Fabric workspace item events** from the list see the detail page. 
1. On the detail page, select **Create alert** button at the top of page. 

## Set alert for Azure blob storage events

On the **Set alert** page, follow these steps:

1. In the **Monitor** section, choose **Select events**.
1. In the **Get events** wizard, do these steps:
    1. On the **Connect** page, do these steps: 
        1. Select the **Azure subscription** that has the Azure storage account.
        1. Select the **Azure storage account**.
        1. Select **Next**.
    1. On the **Configure trigger** page, do these steps:
        1. For **Event types**, select the events that you want to monitor.
        1. In the **Set filters** section, select **+ Filter** to a filter based on a field.
        1. Select **Next**. 
    1. On the **Review and create** page, review the settings, and select **Create source**. 
1. For **Condition**, select one of the following options:
    1. If you want to monitor each event with no condition, select **On each event**. 
1. For **Action**, select one of the following options:
    1. To receive an email when the event occurs and the condition is met, select **Send me an email**. 
    1. To receive notification via Teams, select **Message me in Teams**.
    1. To run a Fabric item, select **Run a Fabric item**. 
1. In the **Save location** section, do these steps: 
    1. For **Workspace**, select the workspace where you want to save the alert. 
    1. For **Reflex item**, select an existing Reflex item or create a Reflex item for this alert. 


## Set alert for Fabric workspace item events

On the **Set alert** page, follow these steps:

1. In the **Monitor** section, choose **Select events**.
1. In the **Get events** wizard, do these steps:
    1. On the **Connect** page, do these steps:
        1. For **Event types**, select the events that you want to monitor.
        1. In the **Set filters** section, select **+ Filter** to a filter based on a field.
        1. Select **Next**. 
    1. On the **Configure trigger** page, do these optional setps:
        1. In the **Set filters** section, select **+ Filter** to a filter based on a field.
        1. Select **Next**. 
    1. On the **Review and create** page, review the settings, and select **Create source**. 
1. For **Condition**, select one of the following options:
    1. If you want to monitor each event with no condition, select **On each event**. 
1. For **Action**, select one of the following options:
    1. To receive an email when the event occurs and the condition is met, select **Send me an email**. 
    1. To receive notification via Teams, select **Message me in Teams**.
    1. To run a Fabric item, select **Run a Fabric item**. 
1. In the **Save location** section, do these steps: 
    1. For **Workspace**, select the workspace where you want to save the alert. 
    1. For **Reflex item**, select an existing Reflex item or create a Reflex item for this alert. 
