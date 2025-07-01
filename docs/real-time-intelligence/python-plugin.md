---
title: Enable Python plugin in Real-Time Intelligence
description: Learn how to enable the Python plugin in your KQL database.
ms.reviewer: adieldar
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 12/25/2024
ms.search.form: product-kusto
---

# Enable Python plugin

The Python plugin runs a user-defined function (UDF) using a Python script. The Python script gets tabular data as its input, and produces tabular output. For more information on the Python plugin, see [Python plugin](/azure/data-explorer/kusto/query/pythonplugin?context=%2Ffabric%2Fcontext%2Fcontext-rti&pivots=fabric).

## Prerequisite

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions

## Enable the plugin

The plugin is disabled by default.

1. To enable the plugin, browse to your **KQL database**.
1. Select **Eventhouse** > **Plugins**.
1. Enable the **Python language extension** by toggling the button to **On**, then select **Done**.

    > [!WARNING]
    >
    > - Enabling the Python plugin consumes additional compute resources, which might lead to increased costs.
    > - Enabling plugins requires a refresh of the cached data on the SSD disk, which can take up to one hour.

    :::image type="content" source="media/python-plugin/enable-python-plugin.png" alt-text="Screenshot of the plugins pane showing the Python language extension. The toggle button is highlighted.":::

## Related content

* For examples of user-defined functions that use the Python plugin, see the [Functions library](/azure/data-explorer/kusto/functions-library/functions-library?context=%2Ffabric%2Fcontext%2Fcontext-rti&pivots=fabric).
* [Query data in a KQL queryset](kusto-query-set.md)
