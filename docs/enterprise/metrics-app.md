---
title: What is the utilization and metrics app?
description: Learn how to evaluate your Microsoft Fabric capacity's health, by reading the metrics app.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept
ms.date: 12/27/2022
---

# What is the utilization and metrics app?

The Microsoft Fabric utilization and metrics app is designed to provide monitoring capabilities for Microsoft Fabric capacities. Monitoring your capacities is essential for making informed decisions on how to best use your capacity resources. For example, the app can help identify when to scale up your capacity or when to turn on [autoscale](/power-bi/enterprise/service-premium-auto-scale).

The app is updated often with new features and functionalities and provides the most in-depth information into how your capacities are performing.

## Install the app

You must be a capacity admin to install the utilization and metrics app. Once installed, anyone in the organization with the right permissions can view the app.

To install the app follow the instructions in [Install the utilization and metrics app](metrics-app-install.md).

## Considerations and limitations

When using the Microsoft Fabric utilization and metrics app, consider the following limitations.

* In the [CU over time](metrics-app-overview-page.md#cu-over-time) visual logarithmic's view, the *CU % Limit* value isn't aligned with the total CU % values.

* In the [interactive](metrics-app-timepoint-page.md#interactive-operations) and [background](metrics-app-timepoint-page.md#background-operations) operation tables, the *Throttling(s)* column displays zero when throttling is disabled, even when the capacity is overloaded.

* There's a difference of 0.01-0.05 percent between the *CU %* value in the [Top row visuals](metrics-app-timepoint-page.md#top-row-visuals) *Heartbeat line chart*, and the [interactive](metrics-app-timepoint-page.md#interactive-operations) and [background](metrics-app-timepoint-page.md#background-operations) operations tables *Total CU* values.

## Next steps

[Install the utilization and metrics app](metrics-app-install.md)
