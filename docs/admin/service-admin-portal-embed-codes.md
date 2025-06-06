---
title: Manage embed codes
description: Learn how to manage Power BI embed codes.
author: msmimart
ms.author: mimart
ms.reviewer: Ben.Zulauf
ms.custom: admin-portal
ms.topic: how-to
ms.date: 05/22/2025
LocalizationGroup: Administration
---

# Manage embed codes

As a Fabric administrator, you can view the embed codes that are generated for sharing reports publicly, using the [Publish to web from Power BI](/power-bi/collaborate-share/service-publish-to-web) feature. You can also disable or delete embed codes.

:::image type="content" source="media/service-admin-portal-embed-codes/power-bi-settings-embed-codes.png" alt-text="Screenshot that shows the embed codes within the Fabric admin portal.":::

To learn how to access the Fabric admin portal settings, see [What is the admin portal?](admin-center.md)

## Disable embed codes

You can disable the *Publish to web* feature, or allow embed codes to work only in your organization. If you disable *Publish to web*, the existing embed codes aren't deleted. When you reenable *Publish to web*, the existing embed codes become active again.

Disabling the embed codes is described in [Publish to web](service-admin-portal-export-sharing.md#publish-to-web).

## Delete embed codes

To delete embed codes, select the codes you want to delete and then select **Delete**.

## Transfer embed code ownership

Embed codes are linked directly to the publisher who creates them. This means that if the publisher loses access to the workspace where a report is published, users can no longer view the embedded report. When a publisher leaves a workspace or an organization, Tenant admins can reassign ownership through the Admin portal, thereby restoring user access. 

To change ownership from the Admin portal, follow these steps:

1. On the **Embed codes** page, select **Change ownership**. 

   :::image type="content" source="media/service-admin-portal-embed-codes/admin-portal-embed-1.png" alt-text="Screenshot of the highlighted Change Ownership button and menu.":::  

1. Choose the new embed code owner from the dropdown menu, then select **OK**.

   :::image type="content" source="media/service-admin-portal-embed-codes/admin-portal-embed.png" alt-text="Screenshot of the Change Ownership dialog.":::

## Related content

- [Publish to web](service-admin-portal-export-sharing.md#publish-to-web)
- [What is the admin portal?](admin-center.md)
