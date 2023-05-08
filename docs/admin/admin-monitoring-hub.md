---
title: Using Monitoring hub
description: Understand the Microsoft Fabric Monitoring hub and the information it provides.
author: davidiseminger
ms.author: davidi
ms.topic: overview
ms.service: azure
ms.date: 05/23/2023
---

# Using Monitoring hub

[!INCLUDE [preview-note](../includes/preview-note.md)]

*Monitoring hub* enables users to monitor various Microsoft Fabric activities, such as dataset refresh and Spark Job runs and many others, from a central location. You can access *Monitoring hub* by selecting its icon from the left pane.

:::image type="content" source="media/admin-monitoring-hub/admin-monitoring-hub-01.png" alt-text="Screen shot of Monitoring hub in left pane.":::

*Monitoring hub* is available for Power BI, Data Factory, Data Engineering and Data Science during the Microsoft Fabric public preview. 

## Prerequisites

Verify that the [new workspace experience](/power-bi/admin/service-admin-portal-workspace#create-workspaces-new-workspace-experience) is enabled.

## Using Monitoring hub

*Monitoring hub* shows activities based on which service is being used when Monitoring hub is selected. For example, if you're using Data Factory when you select Monitoring hub, a list of Data Factory activities is displayed. If you're using Power BI and then select Monitoring hub from the left pane, a list of Power BI related activities is displayed. 

:::image type="content" source="media/admin-monitoring-hub/admin-monitoring-hub-02.png" alt-text="Screen shot of Monitoring hub in context with Power BI.":::

Because there may be many records in Monitoring hub, filters are applied by default to limit the number of artifacts initially displayed. For example, the following image shows Monitoring hub for Power BI, where filters are applied to only show *Dataset*, *Dataflow Gen2*, and *Datamart* artifacts.

You can dismiss filters by selecting the *x* beside the filter button, and you can select different filters by using the filter drop-down in the upper right corner of the window. You can also filter by keyword. 

:::image type="content" source="media/admin-monitoring-hub/admin-monitoring-hub-03.png" alt-text="Screen shot of filters applied to Monitoring hub for Power BI.":::

The first seven columns in the list of artifacts are shared across all Monitoring hub views. The columns after the first seven are specific to the viewing context, such as Power BI. 

## Getting detailed artifact information

When you select an artifact from the list, Monitoring hub displays detailed information about that artifact. 

When you hover over an artifact's name, any available quick actions for the artifact type are displayed, such as stop, start, re-run, or other quick actions. You can also open a detail pane for the artifact itself when you hover, for example, *View run history* for datasets that are in Monitoring hub, to display their refresh activities. 


## Next steps

* [Admin overview](admin-overview.md)
* [View refresh history and monitor your dataflows](../data-factory/dataflows-gen2-monitor.md)
* [Feature usage and adoption report](admin-feature-usage-adoption.md)
