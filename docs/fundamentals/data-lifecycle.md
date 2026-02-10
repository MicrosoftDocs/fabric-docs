---
title: End-to-end data lifecycle in Microsoft Fabric
description: Learn how Microsoft Fabric's architecture unifies data ingestion, storage, preparation, analytics, and visualization into a single cohesive system.
#customer intent: As a data professional, I want to understand the end-to-end data lifecycle in Microsoft Fabric so that I can effectively use its integrated capabilities.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 02/09/2026
ms.topic: concept-article
---

# End-to-end data lifecycle in Microsoft Fabric

At a high level, Microsoft Fabric's architecture unifies data ingestion, data storage, data preparation, analytics, and data visualization functions into a single, cohesive system. The architecture diagram below illustrates the different Fabric artifacts and the role they play in each of these functions.

The architecture diagram shows how different types of datasets come from a wide variety of data sources across different data scenarios (data replication, external storage references, batch datasets, and real-time data streams). You ingest and transform these datasets through Fabric's integration tools. They land in OneLake, the centralized data storage for all of Fabric.

Once in OneLake, you can further transform and analyze the data by using either code-first engines (like Spark notebooks) or low-code tools (Power Query dataflows and SQL). All these options are within Fabric with no data movement between the analytics engines. Finally, use the prepared data to train ML models and to be consumed by analytics services like Power BI for visualization, or by other applications via standard interfaces (via SQL endpoints, GraphQL endpoints, or via OneLake open APIs).

Natural language support comes in the form of Power BI Copilot, Data Agents, and Operations Agent where they can reason over your enterprise data in OneLake and produce answers based on the data assets users have access to. You can integrate Data Agents into Microsoft 365 Copilot, Microsoft Foundry, and Copilot Studio so users can get insights from OneLake in their flow of work in different applications.

:::image type="content" source="./media/data-lifecycle/fabric-data-lifecycle.png" alt-text="Screenshot showing the end-to-end data lifecycle in Microsoft Fabric.":::