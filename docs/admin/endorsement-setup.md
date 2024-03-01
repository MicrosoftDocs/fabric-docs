---
title: Set up content certification
description: Learn how to enable certification for Fabric content.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/02/2023
---

# Set up item certification

Your organization can certify selected items to identify them an as authoritative sources for critical information. Currently, all Fabric items except Power BI dashboards can be certified.

As a Fabric admin, you're responsible for enabling and setting up the certification process for your organization. This means:
* Enabling certification on your tenant.
* Defining a list of security groups whose members will be authorized to certify items.
* Providing a URL that points to the documentation for the organization's item certification process, if such documentation exists.
* Deciding whether to delegate certification setup to domain administrators, so that they can set up certification specifically for their domain. When you delegate certification setup to domain administrators, the administrators of each domain can override any or all tenant-level certification settings, including enable/disable, for their domain.

Certification is part of Power BI's *endorsement* feature. For more information, see the [endorsement overview](../governance/endorsement-overview.md).

## Set up certification

1. In the Admin portal, go to Tenant settings.
1. Under the Export and sharing settings section, expand the Certification section.

   :::image type="content" source="./media/endorsement-setup/certification-setup-dialog.png" alt-text="Screenshot of how to set up semantic model and dataflow certification.":::

1. Set the toggle to **Enabled**.
1. If your organization has a published certification policy, provide its URL here. This becomes the **Learn more** link in the certification section of the [endorsement settings dialog](../get-started/endorsement-promote-certify.md#request-item-certification). If you don't supply a link, users who want to request certification of their item will be advised to contact their Fabric administrator.
1. Specify one or more security groups whose members will be authorized to certify items. These authorized certifiers will able to use the Certification button in the certification section of the [endorsement settings dialog](../get-started/endorsement-promote-certify.md#certify-items). This field accepts security groups only. You can't enter named users.
    
    If a security group contains subsecurity groups that you don't want to give certification rights to, you can check the **Except specific security groups** box and enter the name(s) of those group(s) in a text box that will appear.

1. Check the **Domain admins can enable/disable** checkbox if you want domain administrators to be able to override any or all tenant-level certification settings.

    > [!NOTE]
    > Selecting the checkbox enables domain admins to override any or all tenant-level certification settings, including enable/disable, even though the checkbox description only mentions enable/disable.

1. Select **Apply**.

## Related content

* [Read about endorsement in Fabric](../governance/endorsement-overview.md)
* [Promote Fabric items](../get-started/endorsement-promote-certify.md#promote-items)
* [Certify Fabric items](../get-started/endorsement-promote-certify.md#certify-items)
