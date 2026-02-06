---
title: High concurrency mode in Apache Spark compute for Fabric
description: Learn about sharing Spark sessions using high concurrency mode in Microsoft Fabric for data engineering and data science workloads.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom:
ms.date: 10/20/2023
---

# High concurrency mode in Apache Spark for Fabric

High concurrency mode allows users to share the same Spark sessions in Spark for Fabric for data engineering and data science workloads. An item like a notebook uses a standard Spark session for its execution. In high concurrency mode, the Spark session can support independent execution of multiple items within individual read-eval-print loop (REPL) cores that exist within the Spark application. These REPL cores provide isolation for each item, and prevent local notebook variables from being overwritten by variables with the same name from other notebooks sharing the same session.

As the session is already running, this provides users with an instant run experience when reusing the session across multiple notebooks.

> [!NOTE]
> For custom pools with high concurrency mode, users get 36X faster session start experience compared to a standard Spark session.

:::image type="content" source="media\high-concurrency-mode-for-notebooks\high-concurrency-mode-security-multitask-overview.png" alt-text="Diagram showing the working of high concurrency mode in Fabric." lightbox="media\high-concurrency-mode-for-notebooks\high-concurrency-mode-security-multitask-overview.png":::

> [!IMPORTANT]
> Session sharing conditions include:
>
>- Sessions should be within a single user boundary.
>- Sessions should have the same default lakehouse configuration.
>- Sessions should have the same Spark compute properties.

As part of Spark session initialization, a REPL core is created. Every time a new item starts sharing the same session and the executors are allocated in FAIR based manner to these notebooks running in these REPL cores inside the Spark application preventing starvation scenarios.


## Billing of High Concurrency Sessions

When you use high concurrency mode, **only the initiating session** that starts the shared Spark application is billed. All subsequent sessions that share the same Spark session **do not incur additional billing**. This approach enables cost optimization for teams and users running multiple concurrent workloads in a shared context.

### 📌 Example:

- A user starts **Notebook 1**, which initiates a Spark session in high concurrency mode.
- The same session is then shared by **Notebook 2**, **Notebook 3**, **Notebook 4**, and **Notebook 5**.
- In this case, **only Notebook 1 will be billed** for the Spark compute usage.
- The shared notebooks (2 to 5) **will not be billed** individually.

This billing behavior is also reflected in **Capacity Metrics**, where usage is only reported against the initiating notebook (Notebook 1 in this case).

> [!NOTE]
> The same billing behavior applies when high concurrency mode is used within **pipeline activities**, where only the notebook or activity that initiates the Spark session is charged.

## Related content

- To get started with high concurrency mode in notebooks, see [Configure high concurrency mode for Fabric notebooks](configure-high-concurrency-session-notebooks.md).
