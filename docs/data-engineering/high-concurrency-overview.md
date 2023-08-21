---
title: High Concurrency Mode in Fabric Spark Compute
description: Learn about sharing spark sessions using High Concurrency Mode in Microsoft Fabric for Data Engineering and Data Science workloads
ms.reviewer: snehagunda
ms.author: santhoshravindran7
author: saravi
ms.topic: concepts
ms.date: 07/16/2023
---

# High Concurrency Mode in Fabric Spark

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

### What is High Concurrency Mode 
High Concurrency mode allows users to share the same spark sessions in Fabric spark for data engineering and data science workloads. A standard spark session is used by a item like notebook for its execution. In high concurrency mode the spark session can support independent execution of multiple items within individual repl cores which exist within the spark application. These repl cores provide the isolation for each item and prevent local variables declared in a notebook to not be overwritten by variables with the same variable name from other notebooks sharing the same session. 
As the session is already running, this provides users with an instant run experience when reusing the session across multiple notebooks. 

> [!NOTE]
> In the case of Custom Pools with High Concurrency Mode, users get 36X faster session start experience compared to a standard spark session

The session sharing is always within a single user boundary, where a user will be able to share High Concurrency sessions among the data engineering and data science items they have created and not with a different user. 

:::image type="content" source="media\high-concurrency-mode-for-notebooks\high-concurrency-mode-securityandmultitask-overview.png" alt-text="Diagram showing the working of high concurrency mode in Fabric" lightbox="media\high-concurrency-mode-for-notebooks\high-concurrency-mode-securityandmultitask-overview.png":::

As part of Spark session initialization,  a REPL core is created and every time a new item starts sharing the same session and the executors are allocated in F.A.I.R to these notebooks running in these REPL cores inside the spark application. 
 

## Next steps

In this document, you get a basic understanding of a session sharing through high concurrency mode in Fabric Spark. Advance to the next articles to learn how to create and get started with your own Data Engineering experiences using High Concurrency Mode in Notebooks:

- To get started with High Concurrency mode in Notebooks, see [Run Notebooks in High Concurrency Session](configure-highconcurrency-session-notebooks.md).
