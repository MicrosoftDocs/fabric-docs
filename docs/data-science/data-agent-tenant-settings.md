---
title: Configure Fabric data agent tenant settings
description: Learn how to configure Fabric data agent tenant settings.
ms.author: scottpolly
author: s-polly
ms.reviewer: amjafari
ms.topic: how-to
ms.date: 09/29/2026
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
---

# Configure Fabric data agent tenant settings

To use a data agent in Microsoft Fabric, configure the required tenant settings. This guide walks you through the necessary configurations for a seamless setup.

> [!IMPORTANT]
> Users may configure Fabric data agents to be consumed from other services such as Microsoft Foundry, Microsoft Copilot Studio, M365 Copilot or as an MCP server ("non-Fabric services"). When users connect to these non-Fabric services, responses returned by Fabric data agents may be sent outside of Fabric's compliance boundary or geographic region, and processed and/or stored according to the non-Fabric service(s) applicable terms and data handling policies.

## Access tenant settings

To configure the required settings, you need administrative privileges to access tenant settings in Microsoft Fabric.

1. **Sign in to Microsoft Fabric** with an admin account.
1. Go to **OneLake catalog** > **Govern** > **Configurations** > **Tenant settings**.

When you're in **Tenant Settings**, enable the necessary configurations.

> [!NOTE]
> The tenant settings might take up to one hour to take effect after you enable them.

## Enable Copilot and Azure OpenAI tenant switch

For a Fabric data agent to function properly, enable the [**Copilot and Azure OpenAI Service**](../admin/service-admin-portal-copilot.md#users-can-use-copilot-and-other-features-powered-by-azure-openai) tenant settings. These settings control user access and data processing policies.

### Required settings

- **Users can use Copilot and other features powered by Azure OpenAI**:

  - Enable this setting to allow users to access Copilot-powered features, including Fabric data agent. You can manage this setting at both the tenant and the capacity levels. For more information, see [Overview of Copilot in Fabric](../fundamentals/copilot-fabric-overview.md).
  - To enable this setting, check the option in **Tenant Settings** as shown in the following screenshot:

:::image type="content" source="media/data-agent-tenant-settings/enable-copilot.png" alt-text="Screenshot showing the tenant setting where Copilot can be enabled and disabled." lightbox="media/data-agent-tenant-settings/enable-copilot.png":::

- **Capacities can be designated as Fabric Copilot capacities**:

  - Enable this setting to allow capacity administrators to designate capacities as Fabric Copilot capacities for Copilot usage, including Fabric data agent.
  - For more information, see [Capacities can be designated as Fabric Copilot capacities](../admin/service-admin-portal-copilot.md#fabric-copilot-capacities).

- **Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance**

  - Required for customers using Fabric data agent whose capacity's geographic region is outside of the EU data boundary and the US.
  - To enable this setting, check the option in **Tenant Settings** as shown in the following screenshot:

:::image type="content" source="media/data-agent-tenant-settings/fabric-copilot-data-processed.png" alt-text="Screenshot showing the tenant setting for data processing outside the capacity's region." lightbox="media/data-agent-tenant-settings/fabric-copilot-data-processed.png":::

> [!NOTE]
> Fabric data agents store conversation history across user sessions so that they can maintain context. This history is stored for up to 28 days if the user doesn't clear the chat. Data agents don't require the **Data sent to Azure OpenAI can be stored outside your capacity's geographic region, compliance boundary, or national cloud instance** tenant setting.

## Related content

- [Data agent concept](concept-data-agent.md)
- [About tenant settings](../admin/about-tenant-settings.md)
