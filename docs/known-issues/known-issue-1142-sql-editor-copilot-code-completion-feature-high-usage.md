---
title: Known issue - SQL editor Copilot code completion feature might cause high usage
description: A known issue is posted where SQL editor Copilot code completion feature might cause high usage.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/15/2025
ms.custom: known-issue-1142
---

# Known issue - SQL editor Copilot code completion feature might cause high usage

You can use Copilot code completion in a data warehouse. You might find that the completion feature causes high capacity units (CU) usage which might result in throttling issues.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

You can work in the SQL editor view and write T-SQL. You see the inline code completion is triggered too frequently (on every space or tab). When monitoring the workspace CU, you use high usage by the **Copilot** operation name.

## Solutions and workarounds

To work around the issue, you can use of these options:

- Disable inline completion by [selecting the inline completion toggle button](/fabric/data-warehouse/copilot-code-completion) on the status bar of the SQL editor view. This option is recommended for workspaces with lower capacity.
- Disable Copilot in the [tenant admin settings](/fabric/data-warehouse/copilot#enable-copilot). This setting disables all Copilot features in Fabric.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
