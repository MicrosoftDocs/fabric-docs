---
title: High concurrency mode in Fabric Spark compute
description: Learn about sharing Spark sessions using high concurrency mode in Microsoft Fabric for data engineering and data science workloads.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: concepts
ms.custom:
  - ignite-2023
ms.date: 10/20/2023
---

# High concurrency mode in Fabric Spark

High concurrency mode allows users to share the same Spark sessions in Fabric Spark for data engineering and data science workloads. An item like a notebook uses a standard Spark session for its execution. In high concurrency mode, the Spark session can support independent execution of multiple items within individual read-eval-print loop (REPL) cores that exist within the Spark application. These REPL cores provide isolation for each item, and prevent local notebook variables from being overwritten by variables with the same name from other notebooks sharing the same session.

As the session is already running, this provides users with an instant run experience when reusing the session across multiple notebooks.

> [!NOTE]
> In the case of custom pools with high concurrency mode, users get 36X faster session start experience compared to a standard Spark session.

:::image type="content" source="media\high-concurrency-mode-for-notebooks\high-concurrency-mode-security-multitask-overview.png" alt-text="Diagram showing the working of high concurrency mode in Fabric." lightbox="media\high-concurrency-mode-for-notebooks\high-concurrency-mode-security-multitask-overview.png":::

> [!IMPORTANT]
> Session sharing conditions include:
>
>- Sessions should be within a single user boundary.
>- Sessions should have the same default lakehouse configuration.
>- Sessions should have the same Spark compute properties.

As part of Spark session initialization, a REPL core is created. Every time a new item starts sharing the same session and the executors are allocated in FAIR based manner to these notebooks running in these REPL cores inside the Spark application preventing starvation scenarios.

## Related content

- To get started with high concurrency mode in notebooks, see [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md).
