---
title: Known issue - Copilot button unavailable in Power BI Desktop
description: A known issue is posted where the Copilot button unavailable in Power BI Desktop.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/20/2025
ms.custom: known-issue-1179
---

# Known issue - Copilot button unavailable in Power BI Desktop

Currently, for Copilot to function in Power BI Desktop, the tenant-level setting **Users can use Copilot and other features powered by Azure OpenAI** must be enabled. This setting is required even if the delegated Copilot setting is enabled at the capacity level and your workspace is properly configured. In the Power BI Desktop July release, this behavior is expected to change. The delegated Copilot setting at the capacity level is respected, allowing Copilot to function in Desktop without requiring the tenant-level setting to be turned on.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

The Copilot button is disabled in Power BI Desktop.

## Solutions and workarounds

Enable Copilot at the tenant level. In the Microsoft Fabric Admin Portal, go to **Tenant settings** > **Copilot and Azure OpenAI service**. Enable **Users can use Copilot and other features powered by Azure OpenAI** for the user or their security group. Also, ensure the capacity is Copilot-Enabled. In the Fabric Admin Portal, go to **Capacity settings**. Select the Fabric capacity, and under **Delegated tenant settings** enable **Users can use Copilot and other features powered by Azure OpenAI** for the user or their security group.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
