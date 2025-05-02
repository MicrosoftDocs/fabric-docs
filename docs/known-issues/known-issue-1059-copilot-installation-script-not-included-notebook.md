---
title: Known issue - Copilot installation script not included in notebook
description: A known issue is posted where the Copilot installation script not included in notebook.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/18/2025
ms.custom: known-issue-1059
---

# Known issue - Copilot installation script not included in notebook

For new notebooks, you can use Spark runtime 3.5. If you select the **Copilot** button, you might not see the installation script pop-up. The issue is due to the installer cell not being injected at the top of the notebook.

**Status:** Open

**Product Experience:** Data Science

## Symptoms

If you run a Copilot magic command, such as %%code and %%chat, you receive a message similar to: `no module installed 'chat-magics'`. The Copilot Chat panel shows a message similar to: `If you want to use Copilot, you must install the required package`. You see the messages in the output although you don't see the installer cell at the top of the notebook.

## Solutions and workarounds

As a workaround, use the [installation commands for Copilot](/fabric/data-engineering/copilot-notebooks-overview#introduction-to-copilot-for-data-science-and-data-engineering-for-fabric-data-science).

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
