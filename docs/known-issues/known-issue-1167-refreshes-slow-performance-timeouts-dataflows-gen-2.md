---
title: Known issue - Refreshes have slow performance and timeouts for Dataflows Gen2 with CI/CD
description: A known issue is posted where dataflow refreshes have slow performance and timeouts for Dataflows Gen2 with CI/CD.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/25/2025
ms.custom: known-issue-1167
---

# Known issue - Refreshes have slow performance and timeouts for Dataflows Gen2 with CI/CD

When you refresh a Dataflow Gen2 with CI/CD capability in Fabric, you might notice that the refresh runs slower or times out when compared with the same Dataflow 2.0 without CI/CD.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

Dataflow refresh runs for a long period when compared with the same Dataflow Gen2 without CI/CD capabilities. You might notice the dataflow refresh takes too long and times out. This issue happens on workspaces where no new CI/CD enabled dataflow were created after May 24, 2025.

## Solutions and workarounds

To work around this issue, create a new Dataflow Gen2 with CI/CD capabilities in the same workspace of the dataflow where you see the performance issue. Wait for 10 minutes and then run the dataflow refresh again with better performance.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
