---
title: Set up content certification
description: Learn how to enable certification for Fabric content.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.date: 04/09/2023
---

# Set up content certification

Your organization can certify selected content to identify it an as authoritative source for critical information. Currently, the following content types can be certified:
* Datasets
* Dataflows
* Reports
* Apps

As a Power BI admin, you're responsible for enabling and setting up the certification process for your organization. This means:
* Enabling certification on your tenant.
* Defining a list of security groups whose members will be authorized to certify content.
* Providing a URL that points to the documentation for the organization's content certification process, if such documentation exists.

Certification is part of Power BI's *endorsement* feature. See [Endorsement: Promoting and certifying Power BI content](endorsement-overview.md) for more information.

## Set up certification

1. In the Admin portal, go to Tenant settings.
1. Under the Export and sharing settings section, expand the Certification section.

   [ ![Screenshot of how to set up dataset and dataflow certification](media/endorsement-setup/service-admin-certification-setup-dialog.png)](media/endorsement-setup/service-admin-certification-setup-dialog.png#lightbox)

1. Set the toggle to **Enabled**.
1. If your organization has a published certification policy, provide its URL here. This will become the **Learn more** link in the certification section of the [endorsement settings dialog](endorsement-certify.md#request-content-certification). If you don't supply a link, users who want to request certification of their content will be advised to contact their Power BI administrator.
1. Specify one or more security groups whose members will be authorized to certify content. These authorized certifiers will able to use the Certification button in the certification section of the [endorsement settings dialog](endorsement-certify.md#certify-content). This field accepts security groups only. You can't enter named users.
    
    If a security group contains subsecurity groups that you don't want to give certification rights to, you can check the **Except specific security groups** box and enter the name(s) of those group(s) in a text box that will appear.
1. Click **Apply**.

## Next steps
* [Read about endorsement in Fabric](endorsement-overview.md)
* [Promote Fabric content](endorsement-promote.md)
* [Certify Fabric content](endorsement-certify.md)
* Questions? [Try asking the Power BI Community](https://community.powerbi.com/)