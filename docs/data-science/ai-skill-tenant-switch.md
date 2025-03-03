---
title: AI skill tenant setting (preview)
description: Learn how to configure AI skill tenant settings for Power BI Semantic Models.
author: fbsolo-ms1
ms.author: amjafari
ms.reviewer: franksolomon
reviewer: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: concept-article #Don't change; maybe should change to "how-to".
ms.date: 02/18/2025
ms.collection: ce-skilling-ai-copilot

---

# Configure AI skill tenant setting

To use an AI skill in Microsoft Fabric, you must configure the required tenant settings. Additionally, if your AI skill uses a Power BI semantic model as a data source, specific tenant settings must be enabled to allow connectivity. This guide walks you through the necessary configurations for a seamless setup.

## Accessing tenant settings

To configure the required settings, you need administrative privileges to access the **Admin Portal** in Microsoft Fabric.

1. **Sign in to Microsoft Fabric** with an admin account.
2. **Open the Admin Portal**:
   - Select the gear icon in the top-right corner.
   - Click **Admin Portal**.
3. **Navigate to Tenant Settings**:
   - In the Admin Portal, select **Tenant settings** from the left-hand navigation pane.

Once you are in **Tenant Settings**, you can proceed with enabling the necessary configurations.

## Enable Copilot and Azure OpenAI tenant switch

For AI skill to function properly, the [**Copilot and Azure OpenAI Service**](../admin/service-admin-portal-copilot.md#users-can-use-copilot-and-other-features-powered-by-azure-openai) tenant settings must be enabled. These settings control user access and data processing policies.

### Required settings

- **Users can use Copilot and other features powered by Azure OpenAI**:

  - This must be enabled to allow users to access Copilot-powered features, including AI skill. This setting can be managed at both the tenant and the capacity levels. For more information, see [Overview of Copilot in Fabric](../fundamentals/copilot-fabric-overview.md).
  - To enable this setting, check the option in **Tenant Settings** as shown below:

:::image type="content" source="media/ai-skill-tenant-setting/enable-copilot.png" alt-text="Screenshot showing the tenant setting where Copilot can be enabled and disabled." lightbox="media/ai-skill-tenant-setting/enable-copilot.png":::

- **Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance**

  - Required for customers using AI skill in Fabric whose capacity's geographic region is outside of the EU data boundary and the US.
  - To enable this setting, check the option in **Tenant Settings** as shown below:

:::image type="content" source="media/ai-skill-tenant-setting/fabric-copilot-data-processed.png" alt-text="Screenshot showing the tenant setting for data processing outside the capacity's region." lightbox="media/ai-skill-tenant-setting/fabric-copilot-data-processed.png":::

- **Data sent to Azure OpenAI can be stored outside your capacity's geographic region, compliance boundary, or national cloud instance**

  - Required for customers using AI skill in Fabric whose capacity's geographic region is outside of the EU data boundary and the US.
  - To enable this setting, check the option in **Tenant Settings** as shown below:

:::image type="content" source="media/ai-skill-tenant-setting/fabric-copilot-storage-tenant-setting.png" alt-text="Screenshot of Fabric Copilot Storage setting in the admin portal." lightbox="media/ai-skill-tenant-setting/fabric-copilot-storage-tenant-setting.png":::

## Enable AI skill tenant settings

By default, the AI skill feature in Microsoft Fabric is disabled at the tenant level. To allow users to create and share AI skill items, administrators must enable this setting. This activation allows users to craft natural language Q&A experiences using generative AI and then share AI skill within the organization.

### Steps to enable AI skill

1. In **Tenant Settings**, locate the **AI skill** section.
2. To enable this setting, check the option in **Tenant Settings** as shown below:

:::image type="content" source="media/ai-skill-tenant-setting/tenant-setting.png" alt-text="Screenshot highlighting the AI skill creation and sharing option in the admin portal." lightbox="media/ai-skill-tenant-setting/tenant-setting.png":::

## Enable integration of Power BI semantic models via XMLA endpoints

AI skills can query and manage Power BI semantic models programmatically via XMLA (XML for Analysis) endpoints. To enable this functionality, XMLA endpoints must be configured correctly.

### Steps to enable XMLA endpoints

1. In **Tenant Settings**, navigate to the **Integration settings** section.
2. Locate **Allow XMLA endpoints and Analyze in Excel with on-premises datasets** and then enable it as shown below:

:::image type="content" source="media/ai-skill-tenant-setting/xmla-setting.png" alt-text="Screenshot highlighting the XMLA setting in the admin portal." lightbox="media/ai-skill-tenant-setting/xmla-setting.png":::

## Related content

- [AI Skill in Fabric](./concept-ai-skill.md)
- [About tenant settings](../admin/about-tenant-settings.md)