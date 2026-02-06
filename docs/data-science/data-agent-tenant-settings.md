---
title: Configure Fabric data agent tenant settings (preview)
description: Learn how to configure Fabric data agent tenant settings for Power BI Semantic Models.
author: jonburchel
ms.author: jburchel
ms.reviewer: amjafari
reviewer: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: concept-article #Don't change; maybe should change to "how-to".
ms.date: 02/02/2026
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
---

# Configure Fabric data agent tenant settings

To use a data agent in Microsoft Fabric, configure the required tenant settings. If your Fabric data agent uses a Power BI semantic model as a data source, enable specific tenant settings to allow connectivity. This guide walks you through the necessary configurations for a seamless setup.

## Access tenant settings

To configure the required settings, you need administrative privileges to access the **Admin Portal** in Microsoft Fabric.

1. **Sign in to Microsoft Fabric** with an admin account.
1. **Open the Admin Portal**:
   - Select the gear icon in the top-right corner.
   - Select **Admin Portal**.
1. **Navigate to Tenant Settings**:
   - In the Admin Portal, select **Tenant settings** from the left-hand navigation pane.

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

- **Data sent to Azure OpenAI can be stored outside your capacity's geographic region, compliance boundary, or national cloud instance**

  - Required for customers using Copilot in Notebooks and the Data agent Feature in Fabric powered by Azure OpenAI whose capacity's geographic region is outside of the EU data boundary and the US.
  - To enable this setting, check the option in **Tenant Settings** as shown in the following screenshot:

:::image type="content" source="media/data-agent-tenant-settings/fabric-copilot-storage-tenant-setting.png" alt-text="Screenshot of Fabric Copilot Storage setting in the admin portal." lightbox="media/data-agent-tenant-settings/fabric-copilot-storage-tenant-setting.png":::

- **Conversation history stored outside your capacity's geographic region, compliance boundary, or national cloud instance**

  - This setting is only applicable for customers who want to use Copilot in Notebooks and Fabric data agents powered by Azure OpenAI whose capacity's geographic region is outside of the EU data boundary and the US.
  - In order to use fully conversational agentic AI experiences, the agent needs to store conversation history across user sessions. This ensures that the AI agent keeps context about what a user asked in previous sessions. Conversation history is stored for as long as the user allows, up to 28 days if not manually removed.
  - Users can delete their conversation history at any time by clearing the chat.
  - For more information, see [Conversation history stored outside your capacity's geographic region](../admin/service-admin-portal-copilot.md#conversation-history-stored-outside-your-capacitys-geographic-region-compliance-boundary-or-national-cloud-instance).

- **Capacities can be designated as Fabric Copilot capacities**

  - Enable this setting to allow capacity administrators to designate capacities as Fabric Copilot capacities. This consolidates Copilot usage and billing under a single capacity.
  - For more information, see [Capacities can be designated as Fabric Copilot capacities](../admin/service-admin-portal-copilot.md#capacities-can-be-designated-as-fabric-copilot-capacities).

## Fabric data agent tenant setting

By default, the Fabric data agent feature is enabled at the tenant level. This activation allows users to craft natural language Q&A experiences using generative AI, and then share the Fabric data agent within the organization.

To prevent users from creating and sharing Fabric data agent items, administrators can disable this setting.

### Steps to disable Fabric data agent

1. In **Tenant Settings**, locate the **Fabric data agent** section.
1. To disable this setting, toggle the **Disabled** option in **Tenant Settings** and select **Apply** as shown in the next screenshot:

:::image type="content" source="media/data-agent-tenant-settings/disable-dataagent-tenant-setting.png" alt-text="Screenshot highlighting the Fabric data agent creation and sharing option in the admin portal." lightbox="media/data-agent-tenant-settings/disable-dataagent-tenant-setting.png":::

## Enable integration of Power BI semantic models via XMLA endpoints

Fabric data agents can query and manage Power BI semantic models programmatically via XMLA (XML for Analysis) endpoints. To enable this functionality, you must configure XMLA endpoints correctly.

### Steps to enable XMLA endpoints

1. In **Tenant Settings**, go to the **Integration settings** section.
1. Find **Allow XMLA endpoints and Analyze in Excel with on-premises datasets** and turn it on, as shown in the next screenshot:

:::image type="content" source="media/data-agent-tenant-settings/xmla-setting.png" alt-text="Screenshot highlighting the XMLA setting in the admin portal." lightbox="media/data-agent-tenant-settings/xmla-setting.png":::

## Related content

- [Data agent concept](concept-data-agent.md)
- [About tenant settings](../admin/about-tenant-settings.md)
