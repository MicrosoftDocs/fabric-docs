---
title: Fabric data agent tenant settings (preview)
description: Learn how to configure Fabric data agent tenant settings for Power BI Semantic Models.
author: jonburchel
ms.author: jburchel
ms.reviewer: amjafari
reviewer: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: concept-article #Don't change; maybe should change to "how-to".
ms.date: 07/21/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
---

# Configure Fabric data agent tenant setting

To use a data agent in Microsoft Fabric, you must configure the required tenant settings. Additionally, if your Fabric data agent uses a Power BI semantic model as a data source, specific tenant settings must be enabled to allow connectivity. This guide walks you through the necessary configurations for a seamless setup.

## Accessing tenant settings

To configure the required settings, you need administrative privileges to access the **Admin Portal** in Microsoft Fabric.

1. **Sign in to Microsoft Fabric** with an admin account.
2. **Open the Admin Portal**:
   - Select the gear icon in the top-right corner.
   - Select **Admin Portal**.
3. **Navigate to Tenant Settings**:
   - In the Admin Portal, select **Tenant settings** from the left-hand navigation pane.

Once you are in **Tenant Settings**, you can proceed with enabling the necessary configurations.

> [!NOTE]
> The tenant settings might need up to one hour to take effect after you enable them.

## Enable Copilot and Azure OpenAI tenant switch

For a Fabric data agent to function properly, the [**Copilot and Azure OpenAI Service**](../admin/service-admin-portal-copilot.md#users-can-use-copilot-and-other-features-powered-by-azure-openai) tenant settings must be enabled. These settings control user access and data processing policies.

### Required settings

- **Users can use Copilot and other features powered by Azure OpenAI**:

  - This must be enabled to allow users to access Copilot-powered features, including Fabric data agent. This setting can be managed at both the tenant and the capacity levels. For more information, see [Overview of Copilot in Fabric](../fundamentals/copilot-fabric-overview.md).
  - To enable this setting, check the option in **Tenant Settings** as shown in the next screenshot:

:::image type="content" source="media/data-agent-tenant-settings/enable-copilot.png" alt-text="Screenshot showing the tenant setting where Copilot can be enabled and disabled." lightbox="media/data-agent-tenant-settings/enable-copilot.png":::

- **Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance**

  - Required for customers using Fabric data agent whose capacity's geographic region is outside of the EU data boundary and the US.
  - To enable this setting, check the option in **Tenant Settings** as shown in the next screenshot:

:::image type="content" source="media/data-agent-tenant-settings/fabric-copilot-data-processed.png" alt-text="Screenshot showing the tenant setting for data processing outside the capacity's region." lightbox="media/data-agent-tenant-settings/fabric-copilot-data-processed.png":::

- **Data sent to Azure OpenAI can be stored outside your capacity's geographic region, compliance boundary, or national cloud instance**

  - Required for customers using Fabric data agent whose capacity's geographic region is outside of the EU data boundary and the US.
  - To enable this setting, check the option in **Tenant Settings** as shown in the next screenshot:

:::image type="content" source="media/data-agent-tenant-settings/fabric-copilot-storage-tenant-setting.png" alt-text="Screenshot of Fabric Copilot Storage setting in the admin portal." lightbox="media/data-agent-tenant-settings/fabric-copilot-storage-tenant-setting.png":::

## Enable Fabric data agent tenant settings

By default, the Fabric data agent feature is disabled at the tenant level. To allow users to create and share Fabric data agent items, administrators must enable this setting. This activation allows users to craft natural language Q&A experiences using generative AI, and then share the Fabric data agent within the organization.

### Steps to enable Fabric data agent

1. In **Tenant Settings**, locate the **Fabric data agent** section.
2. To enable this setting, check the option in **Tenant Settings** as shown in the next screenshot:

:::image type="content" source="media/data-agent-tenant-settings/tenant-setting.png" alt-text="Screenshot highlighting the Fabric data agent creation and sharing option in the admin portal." lightbox="media/data-agent-tenant-settings/tenant-setting.png":::

## Enable integration of Power BI semantic models via XMLA endpoints

Fabric data agents can query and manage Power BI semantic models programmatically via XMLA (XML for Analysis) endpoints. To enable this functionality, XMLA endpoints must be configured correctly.

### Steps to enable XMLA endpoints

1. In **Tenant Settings**, navigate to the **Integration settings** section.
2. Locate **Allow XMLA endpoints and Analyze in Excel with on-premises datasets** and then enable it, as shown in the next screenshot:

:::image type="content" source="media/data-agent-tenant-settings/xmla-setting.png" alt-text="Screenshot highlighting the XMLA setting in the admin portal." lightbox="media/data-agent-tenant-settings/xmla-setting.png":::

## Related content

- [Data agent concept](concept-data-agent.md)
- [About tenant settings](../admin/about-tenant-settings.md)