---
title: "Manage Fabric materialized view DAG"
description: Learn how to Manage Fabric materialized view DAG.
ms.author: apsinhar
author: apurbasroy
ms.reviewer: nijelsf
ms.topic: tutorial
ms.date: 03/21/2025
---

# Manage Fabric materialized view DAG

Fabric Materialized views are an efficient way to manage and query large datasets by pre-computing and storing the results of a query. 
In a fabric environment, managing these views effectively can significantly enhance performance and reduce query times. 
This document delves into the various aspects of managing a Fabric materialized view, including understanding the view DAG (Directed Acyclic Graph), scheduling the DAG runs, 
exploring the history of materialized views, and detailing operational run specifics.

## View DAG
A Directed Acyclic Graph (DAG) is a fundamental structure for managing dependencies and scheduling tasks. In the context of Materialized Views(MV’s), the DAG represents the sequence of MV’s that need to be executed to refresh the view once new data is available.
Once the materialized view is created by the user, click on Manage Materialized views and it will navigate to the DAG view displaying the Job Graph.
Learn how to create Materialized views **<Link>**.

## Job Graph

The Job Graph(the MV flow) is as per the code written by the user in the notebook, after the MV end to end flow is created.
Image1

To run the DAG, the user has to schedule the runs as per their sequence an
Once the Job Graph is scheduled, navigate to the current run and check the DAG view.

Image2

## Understand the DAG view

The DAG for a materialized view ensures that data is processed in the correct order, respecting all dependencies. Each node in the DAG represents a specific operation, such as reading from a source table or performing a transformation. Arrows between nodes signify the dependencies, dictating the execution order. User can click on a particular node to understand the flow right from the source tables and parent nodes to the dependent nodes as well.
The DAG UI also has the following functionalities:
*	Refresh: This button is for a DAG UI refresh just to update the current status of the DAG if there are any changes which have occurred

> [!NOTE]
> This is a DAG UI refresh only and not for data refresh.

Image3

*	New Materialized view: User can open a notebook to make changes to the Materialized Views as per their requirements.

> [!NOTE]
> These notebooks are not directly linked to a DAG and are just used to create a Materialized View

Image4

*	Schedule: User can schedule a run as per their business requirements as and when they require the Materialized Views to be refreshed when new data is present

Image5

* Toggle View: User can now toggle the view to Portrait or Landscape view depending on the size of the DAG. 
* User also has the option to adjust the DAG UI according to the screen size using the Reset DAG button.

Image6


  ## Next steps
  
