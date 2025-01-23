---
title: Copilot admin settings
description: Learn how administrators can configure Copilot admin settings in Fabric.
author: snehagunda
ms.author: sngun
ms.reviewer: 'guptamaya'
ms.custom:
  - tenant-setting
  - ignite-2023
ms.topic: how-to
ms.date: 12/31/2024
LocalizationGroup: Administration
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Copilot tenant settings

**Enabled by default:**

Copilot and the Azure OpenAI Service are controlled by settings in the **Copilot and Azure OpenAI Service** tenant settings group.​ The tenant settings for Fabric Copilot are enabled by default.


## Users can use Copilot and other features powered by Azure OpenAI

When this setting is enabled, users can access the features powered by Azure OpenAI, including Copilot. This setting can be managed at both the tenant and the capacity levels. For more information, see [Overview of Copilot in Fabric](/fabric/get-started/copilot-fabric-overview).

:::image type="content" source="../get-started/media/copilot-enable-fabric/enable-copilot.png" alt-text="Screenshot showing the tenant setting where copilot can be enabled and disabled.":::

## Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance


**Not enabled by default:**

- Capacities can be designated as Fabric Copilot capacities.  Copilot capacities allow the consolidation of users' copilot usage and billing on a single capacity. This setting allows Fabric administrators to designate specific groups, or the entire organization as able to designate capacities that they themselves administer as Fabric Copilot capacities. Capacity administrators will still need to designate which users can use which capacity as a Fabric Copilot Capacity. Note that these administrators can see the names of items associated with users's Copilot activity in the Fabric capacity metrics application.

    :::image type="content" source="media/service-admin-portal-copilot/fabric-copilot-capacity-tenant-setting.png" alt-text="Screenshot of Fabric Copilot Capacity setting in the admin portal.":::

This setting is only applicable for customers who want to use Copilot and AI features in Fabric powered by Azure OpenAI, and whose capacity's geographic region is outside of the EU data boundary and the US. For more information, see [Available regions](/fabric/get-started/copilot-fabric-overview#available-regions).


## Related content

- [Copilot in Fabric and Power BI overview](../get-started/copilot-fabric-overview.md)
- [About tenant settings](about-tenant-settings.md)

