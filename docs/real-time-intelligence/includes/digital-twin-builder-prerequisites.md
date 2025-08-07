---
title: Include file for the tutorial prerequisites digital twin builder
ms.reviewer: baanders
description: Include file for the prerequisites for completing the digital twin builder (preview) tutorials in Real-Time Intelligence.
author: baanders
ms.author: baanders
ms.topic: include
ms.date: 08/07/2025
---

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* Digital twin builder (preview) enabled on your tenant.
    - [Fabric administrators](../../admin/roles.md) can grant access to digital twin builder in the [admin portal](../../admin/admin-center.md). In the [tenant settings](../../admin/tenant-settings-index.md), enable *Digital Twin Builder (preview).*

        :::image type="content" source="media/digital-twin-builder-prerequisites/prerequisite-tenant-setting.png" alt-text="Screenshot of enabling digital twin builder in the admin portal.":::

    - The tenant can't have [Autoscale Billing for Spark](../../data-engineering/autoscale-billing-for-spark-overview.md) enabled, as digital twin builder isn't compatible with it. This setting is also managed in the [admin portal](../../admin/admin-center.md). 