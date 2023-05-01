---
title: Synapse Real-Time Analytics Tutorial- Introduction
description: Introduction to the Synapse Real-Time Analytics tutorial in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# Synapse Real-Time Analytics Tutorial- Introduction

Synapse Real-Time Analytics in Microsoft Fabric is a fully managed big data analytics platform optimized for streaming, time-series data. It contains a dedicated query language and engine with exceptional performance for searching structured, semi-structured, and unstructured data with high performance. Real-Time Analytics is fully integrated with the entire suite of Fabric products, for both data loading and advanced visualization scenarios. For more information, see [What is Real-Time Analytics in Fabric?](overview.md). 

## Scenario

This tutorial is based on sample streaming data called *New York Yellow Taxi trip data*. The dataset contains trip records of New York's yellow taxis, with fields capturing pick-up and drop-off dates/times, pick-up and drop-off locations, trip distances, itemized fares, rate types, payment types, and driver-reported passenger counts. This data does not contain latitude and longitude data, which will be loaded from a separate, no-streaming source and joined together with the streaming data. 

You'll use the streaming and query capabilities of Real-Time Analytics to answer key questions about the trip statistics, taxi demand in the boroughs of New York and related insights, and build Power BI reports.

Specifically, in this tutorial, you learn how to:

> [!div class="checklist"]
> * Create a KQL database
> * Enable data copy to OneLake
> * Create an Eventstream
> * Stream data from Eventstream to your KQL database
> * Check your data with sample queries
> * Build a Power BI report from a query
> * Enrich your data with additional datasets
> * Explore enriched data
> * Save the queries as a KQL queryset
> * Create a Power BI report
> * Clean up resources

## Prerequisites

To successfully complete this tutorial, you need a [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled [workspace](../get-started/create-workspaces.md).

## Next steps

> [!div class="nextstepaction"]
> [Tutorial part 1: Set up resources](tutorial-1-resources.md)