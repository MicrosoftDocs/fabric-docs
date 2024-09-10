---
title: Pause and resume data streams
description: Learn how to pause and resume data streams.
ms.reviewer: spelluru
ms.author: xujiang1
author: wenyang
ms.topic: how-to
ms.custom:
  - build-2024
ms.date: 08/07/2024
ms.search.form: Pause and Resume
---

# Pause and resume data streams (preview)

The **Pause** and **Resume** (i.e., **Deactivate** and **Activate**) features in Eventstream give you a full control over your data streams, enabling you to pause data streaming from various sources and destinations within Eventstream. You can then resume data streaming seamlessly from the paused time or a customized time, ensuring no data loss.

* **Activate/Deactivate All**: Quickly pause and resume all data traffic flowing in and out of Eventstream using the Activate All and Deactivate All options on the menu bar.
* **Activate/Deactivate Toggle Switch Button**: Each node has a toggle switch button, allowing you to activate (i.e., resume) or deactivate (i.e., pause) the data streaming from or to selected sources and destinations.

> [!NOTE]
>Currently, the Pause and Resume feature is only available in **standard capabilities** Eventstream.


The following table outlines the description of different node statuses:

| Node Status | Description |
| --- | --- |
| Active | Data source is currently active and data is flowing in or out of Eventstream. |
| Inactive | Data source is currently inactive, and no data is flowing in or out of Eventstream. |
| Loading | Data source is in the process of being turned on or off. |
| Error | Data source is currently paused due to errors.  |
| Warning | Data source is operational but experiencing some issues, although data traffic is still occurring. |

## Activating or deactivating a node using the switch toggle

For nodes that support pause and resume features, you can easily manage their data flow using the toggle switch. Simply find the desired node and toggle the switch on or off to activate (i.e., resume) or deactivate (i.e., pause) the data traffic. Nodes that do not currently support pause and resume functionality will not have a toggle switch.

Here is a detailed table of the nodes that support pause and resume functionality along with the available resume options:

| Node                          | Type                  | Supports Pause and Resume |  Resume Options                              |
|-------------------------------|-----------------------|-----------------------|---------------------------------------------|
| Sample Data                   | Source                | YES                   | - Now                                       |
| Azure Event Hubs              | Source                | YES                   | - When streaming was last stopped<br>- Now<br>- Custom time |
| Azure IoT Hub                 | Source                | YES                   | - When streaming was last stopped<br>- Now<br>- Custom time |
| Custom App                    | Source                | NO                    |                              |
| Custom App                    | Destination           | NO                    |                              |
| Lakehouse                     | Destination           | YES                   | - When streaming was last stopped<br>- Now<br>- Custom time |
| KQL Database (Direct Ingestion) | Destination           | NO                    |                               |
| KQL Database (Event processing before ingestion) | Destination           | YES                   | - When streaming was last stopped<br>- Now<br>- Custom time |
| Reflex                        | Destination           | NO                    |                               |

Below is a description of the available resume options:

| Resume Option                 | Description                                      |
|-------------------------------|----------------------------------------------|
| When streaming was last stopped | Resumes from the point where streaming was last stopped |
| Now                           | Resumes from the current time                |
| Custom time                   | Resumes from a customized time |

:::image type="content" source="./media/pause-resume-data-streams/pause-resume-switch-toggle.png" alt-text="Screenshot showing switch toggle on the node and details." lightbox="./media/pause-resume-data-streams/pause-resume-switch-toggle.png" :::

## Activating or deactivating all nodes

You can easily pause or resume all data traffic within Eventstream by selecting either the **Activate All** or **Deactivate All** option from the menu bar. When selecting **Activate All**, be aware that the available resume options may differ based on the sources and destinations configured in your eventstream. Refer to the detailed table in the previous section for specific resume options for each node. This action will either resume or pause all data traffic flowing in or out of Eventstream. Note that it only applies to nodes that support pause and resume functionality. For nodes that do not currently support this feature, data traffic cannot be paused.

:::image type="content" source="./media/pause-resume-data-streams/active-deactive-all.png" alt-text="Screenshot showing how to active or deactive all nodes at simultaneously." lightbox="./media/pause-resume-data-streams/active-deactive-all.png" :::

## Related content

* [Add and manage destinations in an eventstream](./add-manage-eventstream-destinations.md).
* [Add and manage an event in an eventstream](./add-manage-eventstream-sources.md).
