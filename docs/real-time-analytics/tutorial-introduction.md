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

# Real-Time Analytics Tutorial- Introduction

Real-Time Analytics is a portfolio of capabilities that provides an
end-to-end analytics streaming solution across Trident experiences. It
supplies high velocity, low latency data analysis, and is optimized for
time-series data, including automatic partitioning and indexing of any
data format and structure, such as structured data, semi-structured
(JSON), and free text.

## Scenario

This tutorial is based on sample data called *New York Yellow Taxi trip data*. The dataset contains trip records of New York's yellow taxis. The yellow taxi trip records include fields capturing pick-up and drop-off dates/times, pick-up and drop-off locations, trip distances, itemized fares, rate types, payment types, and driver-reported passenger counts. This data does not contain latitude and longitude data.

You'll use the streaming and query capabilities of Real-Time Analytics to answer key questions about the trip statistics, taxi demand in the boroughs of New York and related insights.

In this tutorial, you learn how to:

> [!div class="checklist"]
> * Create a KQL Database
> * Enable data copy to OneLake
> * Create an Eventstream
> * Stream data from Eventstream to a KQL database
> * Check your data with sample queries
> * Save the queries as a KQL queryset
> * Create a Power BI report

## Prerequisites

To successfully complete this tutorial, you need a [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled [workspace](../get-started/create-workspaces.md).


## Next steps

> [!div class="nextstepaction"]
> [Tutorial part 1: Set up resources](tutorial-1-resources.md)