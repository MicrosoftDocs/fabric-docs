---
title: Prerequisites for Eventstream workspace monitoring
description: Learn the prerequisites for using Eventstream workspace monitoring in Microsoft Fabric, including required permissions, settings, and eventstream configurations.
#customer intent: As a Fabric workspace admin, I want to know the prerequisites for using Eventstream workspace monitoring so that I can prepare my workspace and eventstreams for monitoring.
ms.topic: include
ms.date: 08/24/2026
author: spelluru
ms.author: spelluru
ms.service: fabric
ms.subservice: rti-eventstream
ai-usage: ai-assisted
---

## Prerequisites

- A Power BI Premium or a Fabric capacity.
- The **Workspace admins can turn on monitoring for their workspaces** tenant setting is enabled. To enable the setting, you need to be a Fabric administrator. If you're not a Fabric administrator, ask the Fabric administrator in your organization to enable the setting.
- You have the **admin** role in the workspace.
- Workspace monitoring is enabled at the workspace level, and **Log Eventstream activity** is enabled for each eventstream. Enabling workspace monitoring for the workspace doesn't automatically enable activity logging for eventstreams.

