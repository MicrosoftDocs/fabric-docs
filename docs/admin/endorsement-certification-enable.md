---
title: "Enable item certification"
description: "This article shows Microsoft Fabric administrators how to enable item certification in their tenant."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.subservice: governance
ms.topic: how-to #Don't change
ms.date: 07/11/2024

#customer intent: As a Fabric administrator, I want to enable the certification endorsement feature so that specified users can apply the Certified badge to items that they can certify as meeting organizational quality standards.
---

# Enable item certification

Your organization can certify selected items to identify them an as authoritative sources for critical information. Currently, all Fabric items except Power BI dashboards can be certified.

As a Fabric admin, you're responsible for enabling and setting up the certification process for your organization. This means:
* Enabling certification on your tenant.
* Defining a list of security groups whose members will be authorized to certify items.
* Providing a URL that points to the documentation for the organization's item certification process, if such documentation exists.
* Deciding whether to delegate certification setup to domain administrators, so that they can set up certification specifically for their domain. When you delegate certification setup to domain administrators, the administrators of each domain can override any or all tenant-level certification settings, including enable/disable, for their domain.

Certification is part of Power BI's *endorsement* feature. For more information, see the [endorsement overview](../governance/endorsement-overview.md).

## Enable item certification

1. [In the Admin portal, go to Tenant settings](./about-tenant-settings.md#how-to-get-to-the-tenant-settings).
1. Under the Export and sharing settings section, expand the Certification section.

   :::image type="content" source="./media/endorsement-certification-enable/certification-setup-dialog.png" alt-text="Screenshot of how to set up semantic model and dataflow certification.":::

1. Set the toggle to **Enabled**.
1. If your organization has a published certification policy, provide its URL here. This becomes the **Learn more** link in the certification section of the [endorsement settings dialog](../fundamentals/endorsement-promote-certify.md#request-certification-or-master-data-designation). If you don't supply a link, users who want to request certification of their item will be advised to contact their Fabric administrator.
1. Specify one or more security groups whose members will be authorized to certify items. These authorized certifiers will able to use the Certification button in the certification section of the [endorsement settings dialog](../fundamentals/endorsement-promote-certify.md#certify-items). This field accepts security groups only. You can't enter named users.
    
    If a security group contains subsecurity groups that you don't want to give certification rights to, you can check the **Except specific security groups** box and enter the names of those groups in a text box that will appear.

1. Check the **Domain admins can enable/disable** checkbox if you want domain administrators to be able to override any or all tenant-level certification settings.

    > [!NOTE]
    > Selecting the checkbox enables domain admins to override any or all tenant-level certification settings, including enable/disable, even though the checkbox description only mentions enable/disable.

1. Select **Apply**.

## Related content

* [Read about endorsement in Fabric](../governance/endorsement-overview.md)
* [Enable master data endorsement](./endorsement-master-data-enable.md)
* [Promote Fabric items](../fundamentals/endorsement-promote-certify.md#promote-items)
* [Certify Fabric items](../fundamentals/endorsement-promote-certify.md#certify-items)