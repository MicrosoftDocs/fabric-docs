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

# Configuring AI skill tenant settings  

To use an AI skill in Microsoft Fabric, you must configure the required tenant settings. Additionally, if your AI skill uses a Power BI semantic model as a data source, you must enable specific tenant settings to allow connectivity. This guide walks you through the necessary configurations for a seamless setup.

## Understanding AI skill tenant settings  

By default, the AI skill feature in Microsoft Fabric is disabled at the tenant level. To enable users to create and share AI skill items, tenant administrators must activate this setting. This activation allows users to craft natural language Q&A experiences using generative AI, and then share these AI skill items within the organization. The following screenshot shows how to enable AI skill tenant settings:

:::image type="content" source="media/ai-skill-tenant-setting/tenant-setting.png" alt-text="Screenshot highlighting the AI skill creation and sharing option in the admin portal." lightbox="media/ai-skill-tenant-setting/tenant-setting.png":::

To enable AI skills for your organization:  

1. **Access the Admin Portal**:  
   - Sign in to the Microsoft Fabric portal with administrative privileges.  
   - Select the gear icon in the top-right corner, and then select **Admin Portal**.  

1. **Navigate to Tenant Settings**:  
   - In the Admin Portal, select **Tenant settings**.  

1. **Enable AI skill Feature**:  
   - Within the Tenant settings, locate the **AI skill** section.  
   - Enable the setting to allow users to create and share AI skill items.

## Enable integration of Power BI semantic models via XMLA endpoints tenant settings

XMLA (XML for Analysis) is a protocol that enables client applications to interact with analytical data sources, such as Power BI datasets. Enabling XMLA endpoints allows AI skills to query and manage these semantic models programmatically. For AI skills to access and interact with Power BI semantic models as a data source, the XMLA endpoint must be configured correctly.  

To set up the XMLA endpoint:  

**Enable XMLA Endpoints at the Tenant Level**:  
- In the Admin Portal, navigate to **Tenant settings**.  
- Locate the **Integration settings** section.  
- Find the setting labeled **Allow XMLA endpoints and Analyze in Excel with on-premises datasets**.  
- Enable this setting to allow users to connect to XMLA endpoints.  

:::image type="content" source="media/ai-skill-tenant-setting/xmla-setting.png" alt-text="Screenshot highlighting the xmla setting in the admin portal." lightbox="media/ai-skill-tenant-setting/xmla-setting.png":::

With proper configuration of these tenant settings, your organization can fully apply AI skills in Microsoft Fabric, seamlessly using Power BI semantic models as data sources to enhance data interaction and analysis capabilities.

## Related content

- [AI Skill in Fabric](./concept-ai-skill.md)
- [About tenant settings](../admin/about-tenant-settings.md)