---
title: The Microsoft Fabric deployment pipelines process
description: Understand how deployment pipelines, the Fabric Application lifecycle management (ALM) tool, works.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: conceptual
ms.custom:
ms.date: 07/29/2024
ms.search.form: Introduction to Deployment pipelines, Manage access in Deployment pipelines, Deployment pipelines operations
---

Item type:
Bucket of variables to be consumed by other items in the workspace.
Holds several values for variables, one for each stage in the release pipeline.
Fully supported in CI/CD. (Gir, DP, automation)

The following table lists different items in the workspace and their types:

| Item name | Item type | Description |
| --- | --- | --- |
| My Variables | Variable library | Holds several values for variables, one for each stage in the release pipeline. |
| MyLakehouse | Lakehouse | Represents a data lake in the workspace. |
| NYC-taxi pipeline | Data pipeline | Represents a data pipeline in the workspace. |
| NYC-taxi NB | Notebook | Represents a notebook in the workspace. |
| NYC-taxi Env | Environment | Represents an environment in the workspace. |
| NYC-taxi SM | Semantic model | Represents a semantic model in the workspace. |

Other items in the workspace can refer to and use variables in the library

The following table lists the names of different variables stored in the variable library along with their type, default value, and values at different stages of the pipeline:

| Variable name | Type | Default value | Test stage value| Prod stage value |
| --- | --- | --- | --- | --- |
| SMdatasource-server | string | server1 | server2 | server3 |
|SparkRuntimeVersion | string | 3.0 | 3.1 | 3.2 |
| mylakehouse | string | lakehouse1 | lakehouse2 | lakehouse3 |
| S3connection | string | connection1 | connection2 | connection3 |



Is deployed to all stages. Only difference between stages is active value set. Fir each stage define which value set to use (ed. in the previous table, define active value set at default, Test stage or Prod stage).