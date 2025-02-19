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

# Configuring AI skill Tenant Settings and XMLA Endpoint for Power BI Semantic Models  

To use AI skills within Microsoft Fabric, you must configure specific tenant settings, especially when you want to integrate with Power BI semantic models via XMLA endpoints. This guide ensures a seamless setup and connectivity.  

## Understanding AI skill Tenant Settings  

By default, the AI skill feature in Microsoft Fabric is disabled at the tenant level. To enable users to create and share AI skill items, tenant administrators must activate this setting. This activation allows users to craft natural language Q&A experiences using generative AI, and then share these AI skill items within the organization.  

## Enabling AI skill Tenant Settings

The following screenshot shows how to enable AI skill tenant settings:

:::image type="content" source="media/ai-skill-tenant-setting/tenant-setting.png" alt-text="Screenshot highlighting the AI skill creation and sharing option in the admin portal." lightbox="media/ai-skill-tenant-setting/tenant-setting.png":::

To enable AI skills for your organization:  

1. **Access the Admin Portal**:  
   - Sign in to the Microsoft Fabric portal with administrative privileges.  
   - Select the gear icon in the top-right corner, and then select **Admin Portal**.  

2. **Navigate to Tenant Settings**:  
   - In the Admin Portal, select **Tenant settings**.  

3. **Enable AI skill Feature**:  
   - Within the Tenant settings, locate the **AI skill** section.  
   - Enable the setting to allow users to create and share AI skill items.

## Integrating Power BI Semantic Models via XMLA Endpoints  

XMLA (XML for Analysis) is a protocol that enables client applications to interact with analytical data sources, such as Power BI datasets. Enabling XMLA endpoints allows AI skills to query and manage these semantic models programmatically. For AI skills to access and interact with Power BI semantic models as a data source, the XMLA endpoint must be configured correctly.  

## Configuring XMLA Endpoint Settings  

To set up the XMLA endpoint:  

1. **Enable XMLA Endpoints at the Tenant Level**:  
   - In the Admin Portal, navigate to **Tenant settings**.  
   - Locate the **Integration settings** section.  
   - Find the setting labeled **Allow XMLA endpoints and Analyze in Excel with on-premises datasets**.  
   - Enable this setting to allow users to connect to XMLA endpoints.  

2. **Configure XMLA Endpoint Access for Premium Capacities**:  
   - In the Admin Portal, go to **Capacity settings**.  
   - Select the desired capacity (for example, **Power BI Premium** or **Premium Per User**).  
   - Expand the **Workloads** section.  
   - Locate the **XMLA Endpoint** setting and set it to **Read Write** to permit both read and write operations.  

:::image type="content" source="media/ai-skill-tenant-setting/xmla-setting.png" alt-text="Screenshot highlighting the xmla setting in the admin portal." lightbox="media/ai-skill-tenant-setting/xmla-setting.png":::

## Important Considerations  

- **Workspace Assignment**: Ensure that workspaces containing the semantic models are assigned to a capacity with XMLA endpoints enabled.  
- **Security Measures**: Regularly review and manage permissions to maintain data security and compliance.  

With proper configuration of these tenant settings, your organization can fully apply AI skills in Microsoft Fabric, seamlessly using Power BI semantic models as data sources to enhance data interaction and analysis capabilities.

## Related content

- [AI Skill in Fabric](./concept-ai-skill.md)
- [About tenant settings](../admin/about-tenant-settings.md)
