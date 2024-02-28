---
title: Known issue - Dataflow Gen1 refresh fails in premium workspaces connecting to Azure Cosmos DB
description: A known issue is posted where a Dataflow Gen1 refresh fails in premium workspaces connecting to Azure Cosmos DB.
author: mihart
ms.author: mihart
ms.topic: troubleshooting
ms.date: 02/27/2024
ms.custom: known-issue-602
---

# Known issue - Dataflow Gen1 refresh fails in premium workspaces connecting to Azure Cosmos DB

In this scenario, you have a Dataflow Gen1 dataflow that resides in a workspace assigned to a Premium or Fabric capacity or are moving the residing workspace from a Pro capacity to a Premium or Fabric capacity. The dataflow uses an Azure Cosmos DB connection and you receive refresh or connection failures.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

On your Dataflow Gen1 dataflow connected to Azure Cosmos DB in Premium workspaces, you receive a refresh or connection failure.

## Solutions and workarounds

There are two possible workarounds:

- Move your dataflow from Dataflow Gen1 to Dataflow Gen2
- Move your dataflow to a workspace assigned to a Pro capacity

## Next steps

- [About known issues](/power-bi/troubleshoot/known-issues/power-bi-known-issues)
