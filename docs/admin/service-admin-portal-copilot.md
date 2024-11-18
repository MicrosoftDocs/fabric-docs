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
ms.date: 02/07/2024
LocalizationGroup: Administration
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Copilot tenant settings

Fabric has a tenant setting group, **Copilot and Azure OpenAI Service**, with the following settings:

Enabled by default:

- Admins can turn on Copilot for specific security groups, or for their entire organization. Users in those groups can use a preview of Copilot and other features powered by Azure OpenAI.

    :::image type="content" source="media/service-admin-portal-copilot/copilot-open-ai-service.png" alt-text="Screenshot of Copilot setting in the admin portal.":::

- Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance.

    :::image type="content" source="media/service-admin-portal-copilot/copilot-data-sent-azure-ai-outside-sg.png" alt-text="Screenshot of Copilot setting for sending data outside your tenant's geographic region, compliance boundary, or national cloud instance." lightbox="media/service-admin-portal-copilot/copilot-data-sent-azure-ai-outside-security-group.png":::

Not enabled by default:

- Capacities can be designated as Fabric Copilot capacities.  Copilot capacities allow the consolidation of users' copilot usage and billing on a single capacity. This setting allows Fabric administrators to designate specific groups, or the entire organization as able to designate capacities that they themselves administer as Fabric Copilot capacities. Capacity administgrators will still need to designate which users can use which capacity as a Fabric Copilot Capacity.

    :::image type="content" source="media/service-admin-portal-copilot/fabric-copilot-capacity-tenant-setting.png" alt-text="Screenshot of Fabric Copilot Capacity setting in the admin portal.":::

## Related content

- [Copilot in Fabric and Power BI overview](../get-started/copilot-fabric-overview.md)
- [About tenant settings](about-tenant-settings.md)

