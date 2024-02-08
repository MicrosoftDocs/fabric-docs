---
title: Use the Monitoring hub
description: Understand the Microsoft Fabric Monitoring hub and the information it provides.
author: davidiseminger
ms.author: davidi
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/02/2023
---

# Use the Monitoring hub

*Monitoring hub* enables users to monitor various Microsoft Fabric activities, such as semantic model refresh and Spark Job runs and many others, from a central location. You can access *Monitoring hub* by selecting its icon from the left pane.

:::image type="content" source="media/monitoring-hub/admin-monitoring-hub-01.png" alt-text="Screen shot of Monitoring hub in left pane.":::

*Monitoring hub* is available for Power BI, Data Factory, Data Engineering and Data Science.

## Prerequisites

Verify that the [new workspace experience](portal-workspace.md#create-workspaces-new-workspace-experience) is enabled.

## Permissions required

All items for which a user has read permissions [semantic model permissions](/power-bi/connect-data/service-datasets-permissions#what-are-the-dataset-permissions) will appear in the Monitoring Hub.

## Using the Monitoring hub

*Monitoring hub* shows activities based on which service is being used when Monitoring hub is selected. For example, if you're using Data Factory when you select Monitoring hub, a list of Data Factory activities is displayed. If you're using Power BI and then select Monitoring hub from the left pane, a list of Power BI related activities is displayed. 

:::image type="content" source="media/monitoring-hub/admin-monitoring-hub-02.png" alt-text="Screen shot of Monitoring hub in context with Power BI.":::

Because there might be many records in Monitoring hub, filters are applied by default to limit the number of items initially displayed. For example, the following image shows Monitoring hub for Power BI, where filters are applied to only show *semantic model*, *Dataflow Gen2*, and *Datamart* items.

You can dismiss filters by selecting the *x* beside the filter button, and you can select different filters by using the filter drop-down in the upper right corner of the window. You can also filter by keyword. 

:::image type="content" source="media/monitoring-hub/admin-monitoring-hub-03.png" alt-text="Screen shot of filters applied to Monitoring hub for Power BI.":::

The first seven columns in the list of items are shared across all Monitoring hub views. The columns after the first seven are specific to the viewing context, such as Power BI. 

## Getting detailed item information

When you select an item from the list, Monitoring hub displays detailed information about that item. 

When you hover over an item's name, any available quick actions for the item type are displayed, such as stop, start, re-run, or other quick actions. You can also open a detail pane for the item itself when you hover, for example, *View run history* for semantic models that are in Monitoring hub, to display their refresh activities. 

## Related content

* [Admin overview](microsoft-fabric-admin.md)
* [Browse the Apache Spark applications in the Fabric monitoring hub](../data-engineering/browse-spark-applications-monitoring-hub.md)
* [View refresh history and monitor your dataflows](../data-factory/dataflows-gen2-monitor.md)
* [Feature usage and adoption report](feature-usage-adoption.md)
