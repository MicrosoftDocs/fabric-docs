---
title: Set alerts on streams in Real-Time hub
description: This article describes how to set alerts on streams in Real-Time hub.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.date: 05/21/2024
---

# Set alerts on streams in Real-Time hub
This article describes how to set alerts on streams in Real-Time hub.

## Launch the Set alert page 

Do steps from one of the following sections, which opens a side panel where you can configure the following options:

- Events you want to monitor.
- Conditions you want to look for in the events.
- Action you want Data Activator to take. 


### From the data streams list
Move the mouse over the data stream, and do one of the following steps: 

- Select the **Alert** button 
- Select **ellipsis (...)**, and select **Set alert**.

### From the data stream detail page

1. Select a data stream from the list to see the detail page. 
1. Select **Create alert** button at the top of page. 

## Set alert
On the **Set alert** page, follow these steps:

1. In the **Monitor** section, choose **Select events**.
1. On the **Select events** page, do these steps: 
    1. Select the **Azure subscription** that has the Azure storage account.
    1. Select the **Azure storage account**.
    1. Select the **events** that you want to monitor.
    1. Select **Ok** to navigate back to the **Set alert** page.
1. For **Condition**, select one of the following options:
    1. If you want to monitor each event with no condition, select **On each event**. 
1. For **Action**, select one of the following options:
    1. To receive an email when the event occurs and the condition is met, select **Send me an email**. 
    1. To receive notification via Teams, select **Message me in Teams**.
    1. To run a Fabric item, select **Run a Fabric item**. 
1. In the **Save location** section, do these steps: 
    1. For **Workspace**, select the workspace where you want to save the alert. 
    1. For **Reflex item**, select an existing Reflex item or create a Reflex item for this alert. 



