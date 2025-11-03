---
title: Real-Time Intelligence tutorial - Introduction
description: Get started with Real-Time Intelligence in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom:
ms.date: 12/02/2024
ms.subservice: rti-core
ms.search.form: Get started//
---
# Real-Time Intelligence tutorial: Introduction

Real-Time Intelligence in Microsoft Fabric is a powerful tool to extract insights and visualize your data in motion. Real-Time Intelligence provides an end-to-end solution for event-driven scenarios, streaming data, and different types of logs.

In this tutorial, you'll learn how to set up and use the main features of Real-Time Intelligence with a sample set of data.

 For more information, see [What is Real-Time Intelligence in Fabric?](overview.md).

## Scenario

The sample data you'll use in this tutorial is a set of bicycle data, containing information about bike ID, location, timestamp, and more. You'll learn how to set up resources, ingest data, set alerts on the data, and visualize the data to extract insights.

Specifically, in this tutorial, you learn how to:

> [!div class="checklist"]
>
> * Set up your environment
> * Get data in the Real-Time hub
> * Transform events
> * Publish an eventstream
> * Use update policies to transform data in Eventhouse
> * Use Copilot to create a KQL query
> * Create a KQL query
> * Create an alert based on a KQL query
> * Create a Real-Time dashboard
> * Explore data visually in the Real-Time dashboard
> * Set up anomaly detection on Eventhouse tables
> * Create a map using geospatial data
> * Set an alert on the eventstream

## Prerequisites

* To successfully complete this tutorial, you need a [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* The tenant admin must enable the maps and anomaly detector preview settings in the admin portal. For more information, see [What is the admin portal?](../admin/admin-center.md).
    
    :::image type="content" source="media/tutorial/enable-preview.png" alt-text="Screenshot of enabling the preview items in the admin portal.":::

## Related content

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 1: Set up Eventhouse](tutorial-1-resources.md)
