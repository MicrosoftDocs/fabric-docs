---
title: Known issue - Mirroring for Azure Cosmos DB fails
description: A known issue is posted where mirroring for Azure Cosmos DB fails.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 08/06/2024
ms.custom: known-issue-796
---

# Known issue - Mirroring for Azure Cosmos DB fails

You might experience issues with mirroring on a mirrored Azure Cosmos DB. The mirroring fails, and the **Monitor replication page** shows an exception.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

In the **Monitor replication page**, you see an exception for your mirrored Azure Cosmos DB. The exception message is similar to: `Continuous backup not enabled for account: {AccountEndpoint}`.

## Solutions and workarounds

To work around the issue, follow these steps:

1. Go to the source Cosmos DB account in Azure
1. Go to the **Backup and Restore** left navigation tab and enable **7 Days Continuous Backup**
1. Wait until the continuous backup migration succeeds in the Azure portal
1. Go back to Fabric and start mirroring again

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
