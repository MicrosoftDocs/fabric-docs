---
title: Create and manage Real-Time Dashboard parameters
description: Learn how to create, configure, view, and manage parameters and parameter card indicators in a Real-Time Dashboard in Microsoft Fabric.
author: spelluru
ms.author: spelluru
ms.reviewer: gabil
ms.topic: how-to
ms.subservice: rti-dashboard
ms.date: 09/08/2026
ai-usage: ai-assisted
---

# Create and manage Real-Time Dashboard parameters

Parameters are the building blocks for filters in Real-Time Dashboards. Create and manage parameters at the dashboard level to control the filter values that dashboard queries can use.

> [!NOTE]
> You can manage parameters only in **Editing** mode for dashboard editors.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* Editor permissions on a [Real-Time Dashboard](dashboard-real-time-create.md).
* A dashboard with visuals that uses the **StormEvents** table in the *Weather analytics* sample data from the [samples gallery](sample-gallery.md#get-data).

## View the parameter list

To view the list of all dashboard parameters, select **Manage** > **Parameters**.

## Create a parameter

To create a parameter:

1. Select the **New parameter** button on the top menu. The **Parameters** pane opens.
1. Select **+ Add** at the top of the right pane.
1. Fill in the relevant [properties](#configure-parameter-properties) for your parameter.
1. Select **Done** to create the parameter.

### Configure parameter properties

In the **Add parameter** pane, configure the following properties.

| Field | Description |
| --- | --- |
| **Label** | The name of the parameter shown on the dashboard or edit card. |
| **Parameter type** | One of the following parameter types:<br />- **Single selection**: Users select one value in the filter.<br />- **Multiple selection**: Users select one or more values in the filter.<br />- **Time range**: Adds time-based parameters to filter queries and dashboards. Every dashboard includes a time range picker by default.<br />- **Free text**: Users type or paste a value into the filter. The filter keeps the most recently used values.<br />- **Data source**: Users select one or more dashboard data sources. |
| **Description** | Optional description of the parameter. |
| **Variable name** | The parameter name that you use in the query. |
| **Data type** | The data type of the parameter values. |
| **Show on pages** | The pages where this parameter appears. **Select all** shows the parameter on all pages. |
| **Source** | The source of the parameter values:<br />- **Fixed values**: Manually entered static filter values.<br />- **Query**: Values returned by a KQL query. |
| **Add "Select all" value** | Applies only to single-selection and multiple-selection parameter types. Use this option to retrieve data for all parameter values. Build support for this option into the query. For an example, see [Use a multiple-selection query-based parameter](dashboard-parameters.md#use-a-multiple-selection-query-based-parameter). |
| **Default value** | The value that the filter uses when the dashboard first renders. |

## Create cascading parameters

Cascading parameters create a parent-child relationship between dashboard filters. The query-based child parameter uses the parent parameter selection to determine its available values. In this example, the fixed-values **Event Type** parameter (`_eventType`) is the parent, and the query-based **State** parameter (`_state`) is the child.

1. Create the parent parameter with the following properties:

    * **Label**: Event Type
    * **Parameter type**: Multiple selection
    * **Variable name**: `_eventType`
    * **Data type**: String
    * **Source**: Fixed values
    * **Values**:

        | Value | Parameter display name |
        | --- | --- |
        | Thunderstorm Wind | Thunderstorm wind |
        | Hail | Hail |
        | Flash Flood | Flash flood |
        | Drought | Drought |
        | Winter Weather | Winter weather |

    * **Default value**: Thunderstorm Wind

1. Create the child parameter with the following properties:

    * **Label**: State
    * **Parameter type**: Single selection
    * **Variable name**: `_state`
    * **Data type**: String
    * **Source**: Query
    * **Data source**: StormEventsSample

1. In **Edit query**, enter the following value query, and then select **Done**:

    ```kusto
    StormEvents
    | where StartTime between (_startTime.._endTime)
    | where EventType in (_eventType) or isempty(_eventType)
    | summarize TotalEvents = count() by State
    | top 5 by TotalEvents
    | project State
    ```

    This query returns up to five **State** values because it uses `top 5`. It filters the values by the selected **Event Type** values. If you enable **Select all** for the parent parameter, `isempty(_eventType)` applies that selection.

1. Set **Value** and **Display name** to **State**, select a default value, and then select **Done**.

1. In the visual's query editor, enter the following query to use both parameters:

    ```kusto
    StormEvents
    | where StartTime between (_startTime.._endTime)
    | where EventType in (_eventType) or isempty(_eventType)
    | where State == _state
    | summarize TotalEvents = count() by State
    | top 5 by TotalEvents
    ```

    The value query filters the available **State** values by **Event Type**. The visual query then filters the visual by both the **Event Type** and **State** selections.

## Manage parameters

After you select **Parameters** on the top bar, you can view the list of existing parameters. In each parameter card, select the edit icon to modify the parameter, or select **More [...]** to duplicate, delete, or move it.

You can view the following indicators in the parameter card:

* Parameter display name.
* Variable name.
* Number of queries that use the parameter.
* Pages where the parameter appears.

Reorder parameter cards by dragging and dropping them or by selecting **Move to >**.

:::image type="content" source="media/dashboard-parameters/parameters-cards.png" alt-text="Screenshot of sample parameter cards.":::

## Related content

* [Use parameters in Real-Time Dashboard queries](dashboard-parameters.md)
* [Configure interactions in Real-Time Dashboards](dashboard-interactions.md)
