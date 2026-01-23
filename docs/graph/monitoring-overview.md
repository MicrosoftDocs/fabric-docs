---
title: Monitoring and telemetry overview for Graph in Microsoft Fabric
description: Learn about monitoring and telemetry for Graph in Microsoft Fabric.
ms.topic: concept-article
ms.date: 01/22/2026
author: lorihollasch
ms.author: loriwhip
ms.reviewer: wangwilliam
---

# Monitoring and telemetry for Graph in Microsoft Fabric

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

Monitoring and telemetry for Graph in Microsoft Fabric follows the existing Fabric-wide telemetry framework. This data enables administrators and users to troubleshoot issues and optimize resource usage.

## Accessing monitoring data

You can use the [Monitoring hub](/fabric/admin/monitoring-hub) to track activities, view historical activity, and gain insights into the performance and usage of your Graph workloads.

To access monitoring data, select **Monitor** in Fabric's navigation pane.

Graph items are workspace-scoped (each Graph belongs to a specific workspace), but the Monitoring Hub aggregates visibility based on your role and permissions. This means you don't need to navigate workspace-by-workspace to monitor your Graph workloads. They're all visible in the centralized Monitoring Hub, filtered by what you're authorized to see.

## Related content

- [Graph overview](overview.md)
