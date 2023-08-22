---
title: High concurrency mode in Fabric Spark compute
description: Learn about sharing Spark sessions using High Concurrency Mode in Microsoft Fabric for Data Engineering and Data Science workloads
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: concepts
ms.date: 07/16/2023
---

# High Concurrency mode in Fabric Spark

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

High Concurrency mode allows users to share the same Spark sessions in Fabric Spark for data engineering and data science workloads. A standard Spark session is used by an item like notebook for its execution. In High Concurrency mode the Spark session can support independent execution of multiple items within individual REPL cores which exist within the Spark application. These REPL cores provide the isolation for each item and prevent local variables declared in a notebook to not be overwritten by variables with the same variable name from other notebooks sharing the same session. 
As the session is already running, this provides users with an instant run experience when reusing the session across multiple notebooks. 

> [!NOTE]
> In the case of Custom Pools with High Concurrency Mode, users get 36X faster session start experience compared to a standard Spark session.

:::image type="content" source="media\high-concurrency-mode-for-notebooks\high-concurrency-mode-security-multitask-overview.png" alt-text="Diagram showing the working of High Concurrency mode in Fabric." lightbox="media\high-concurrency-mode-for-notebooks\high-concurrency-mode-security-multitask-overview.png":::

> [!IMPORTANT]
> Session Sharing Conditions include
>  - Sessions should be within a single user boundary.
>  - Sessions should have the same default lakehouse configuration.
>  - Sessions should have the same Spark compute properties.

As part of Spark session initialization,  a REPL core is created and every time a new item starts sharing the same session and the executors are allocated in FAIR based manner to these notebooks running in these REPL cores inside the Spark application preventing starvation scenarios.
 

## Next steps

In this document, you get a basic understanding of a session sharing through High Concurrency mode in Fabric Spark. Advance to the next articles to learn how to create and get started with your own Data Engineering experiences using High Concurrency Mode in Notebooks:

- To get started with High Concurrency mode in Notebooks, see [Run Notebooks in High Concurrency Session](configure-high-concurrency-session-notebooks.md).
