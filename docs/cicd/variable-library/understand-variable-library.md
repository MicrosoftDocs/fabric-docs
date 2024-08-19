---
title: The Microsoft Fabric variable library
description: Understand how variable libraries are used in the Fabric Application lifecycle management (ALM) tool.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 08/15/2024
ms.search.form: Introduction to Deployment pipelines, Manage access in Deployment pipelines, Deployment pipelines operations
#customer intent: As a developer, I want to learn how to use the variable library item in the Microsoft Fabric Application lifecycle management (ALM) tool, so that I can manage my content lifecycle.
---

# Variable library concepts

This article describes what you need to know to use the Microsoft Fabric [variable library](./variable-library-overview.md) item in your workspace. The variable library is a container that holds values for different variables that can be consumed by other items in the workspace. It can hold several values for each variable, is fully supported in CI/CD, and can be automated.

## Prerequisites

* A [workspace](../../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)

## Variable library structure

The variable library is a Fabric item that allows you to define and manage workspace items in different stages of your pipeline.

The following table represents the contents of a sample variable library. It lists different items in the workspace and their types:

| Item name | Item type |
| --- | --- |
| My Variables | Variable library |
| MyLakehouse | Lakehouse |
| NYC-taxi pipeline | Data pipeline |
| NYC-taxi NB | Notebook |
| NYC-taxi Env | Environment |
| NYC-taxi SM | Semantic model |

Other items in the workspace can refer to and use variables in the library

The following table lists the names of different variables stored in the variable library along with their type, default value, and values at different stages of the pipeline:

| Variable name | Type | Default value | Test stage value| Prod stage value |
| --- | --- | --- | --- | --- |
| SMdatasource-server | string | PBIAnalyticsDM-pbiAn… | <default> | PBIAnalyticsP |
|SparkRuntimeVersion | string | 1.1 (Spark 3.3, Delta 2.2) | 1.1.3 (Spark 3.2, Delta 2.1) | 1.2 (Spark 4.1, Delta 3.2) |
| mylakehouse | string | MainLakehouse | TestLakehouse | <default> |
| S3connection | string | connection1 | connection2 | connection3 |



Is deployed to all stages. Only difference between stages is active value set. Fir each stage define which value set to use (ed. in the previous table, define active value set at default, Test stage or Prod stage).

## Supported items

The following items are supported in the variable library:

- Lakehouse
- Data pipeline
- Notebook

## Learn to use the variable library

## Variable library automation

## Related content

- [End to end lifecycle management tutorial](./cicd-tutorial.md) 