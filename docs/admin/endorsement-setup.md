---
title: Set up content certification
description: Learn how to enable certification for Fabric content.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.service: azure
ms.date: 05/23/2023
---

# Set up item certification

Your organization can certify selected items to identify them an as authoritative sources for critical information. Currently, all Fabric items except Power BI dashboards can be certified.

As a Power BI admin, you're responsible for enabling and setting up the certification process for your organization. This means:
* Enabling certification on your tenant.
* Defining a list of security groups whose members will be authorized to certify items.
* Providing a URL that points to the documentation for the organization's item certification process, if such documentation exists.

Certification is part of Power BI's *endorsement* feature. For more information, see the [endorsement overview](../get-started/endorsement-overview.md).

## Set up certification

1. In the Admin portal, go to Tenant settings.
1. Under the Export and sharing settings section, expand the Certification section.

   :::image type="content" source="./media/endorsement-setup/certification-setup-dialog.png" alt-text="Screenshot of how to set up dataset and dataflow certification.":::

1. Set the toggle to **Enabled**.
1. If your organization has a published certification policy, provide its URL here. This becomes the **Learn more** link in the certification section of the [endorsement settings dialog](../get-started/endorsement-promote-certify.md#request-item-certification). If you don't supply a link, users who want to request certification of their item will be advised to contact their Power BI administrator.
1. Specify one or more security groups whose members will be authorized to certify items. These authorized certifiers will able to use the Certification button in the certification section of the [endorsement settings dialog](../get-started/endorsement-promote-certify.md#certify-items). This field accepts security groups only. You can't enter named users.
    
    If a security group contains subsecurity groups that you don't want to give certification rights to, you can check the **Except specific security groups** box and enter the name(s) of those group(s) in a text box that will appear.
1. Select **Apply**.

## Next steps

* [Read about endorsement in Fabric](../get-started/endorsement-overview.md)
* [Promote Fabric items](../get-started/endorsement-promote-certify.md#promote-items)
* [Certify Fabric items](../get-started/endorsement-promote-certify.md#certify-items)