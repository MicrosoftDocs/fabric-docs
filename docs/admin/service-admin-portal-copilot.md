---
title: Copilot admin settings (preview)
description: Learn how administrators can configure Copilot admin settings in Fabric.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: 'guptamaya'
ms.service: powerbi
ms.subservice: powerbi-admin
ms.custom:
  - tenant-setting
  - ignite-2023
ms.topic: how-to
ms.date: 02/07/2024
LocalizationGroup: Administration
---

# Copilot tenant settings (preview)

Fabric has a new tenant setting group, **Copilot and Azure OpenAI Service (preview)**, with following two settings:

- Admins can turn on Copilot for specific security groups, or for their entire organization. Users in those groups can use a preview of Copilot and other features powered by Azure OpenAI.

    :::image type="content" source="media/service-admin-portal-copilot/copilot-open-ai-service.png" alt-text="Screenshot of Copilot setting in the admin portal.":::

- Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance.

    :::image type="content" source="media/service-admin-portal-copilot/copilot-data-sent-azure-ai-outside-sg.png" alt-text="Screenshot of Copilot setting for sending data outside your tenant's geographic region, compliance boundary, or national cloud instance." lightbox="media/service-admin-portal-copilot/copilot-data-sent-azure-ai-outside-security-group.png":::

By default, the **Tenant settings** for Fabric OpenAI are disabled. Ask your tenant admins to enable them if they're willing and allowed to use the features powered by Azure OpenAI.

## Related content

- [Copilot in Fabric and Power BI overview](../get-started/copilot-fabric-overview.md)
- [About tenant settings](about-tenant-settings.md)

