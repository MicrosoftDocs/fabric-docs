---
title: Enable content certification
description: Learn how to enable certification for semantic models, dataflows, reports, and apps.
author: paulinbar
ms.author: painbar
ms.service: powerbi
ms.subservice: powerbi-eim
ms.custom:
  - ignite-2023
ms.topic: how-to
ms.date: 11/02/2023
LocalizationGroup: Share your work
---

# Enable content certification

Your organization can certify selected content to identify it an as authoritative source for critical information. Currently, the following content types can be certified:
* Semantic models
* Dataflows
* Reports
* Apps

As a Fabric admin, you're responsible for enabling and setting up the certification process for your organization. This means:
* Enabling certification on your tenant.
* Defining a list of security groups whose members are authorized to certify content.
* Providing a URL that points to the documentation for the organization's content certification process, if such documentation exists.

Certification is part of Power BI's *endorsement* feature. See [Endorsement: Promoting and certifying Power BI content](/power-bi/collaborate-share/service-endorsement-overview) for more information.

## Set up certification

1. In the Admin portal, go to Tenant settings.
1. Under the Export and sharing settings section, expand the Certification section.

    :::image type="content" source="media/service-admin-setup-certification/service-admin-certification-setup-dialog.png" alt-text="Screenshot of settings to enable semantic model and dataflow certification.":::

1. Set the toggle to **Enabled**.
1. If your organization has a published certification policy, provide its URL here. This becomes the **Learn more** link in the certification section of the [endorsement settings dialog](/power-bi/collaborate-share/service-endorse-content#request-content-certification). If you don't supply a link, users who want to request certification of their content will be advised to contact their Fabric administrator.
1. Specify one or more security groups whose members are authorized to certify content. These authorized certifiers will able to use the Certification button in the certification section of the [endorsement settings dialog](/power-bi/collaborate-share/service-endorse-content#certify-content). This field accepts security groups only. You can't enter named users.

    If a security group contains subsecurity groups that you don't want to give certification rights to, you can check the **Except specific security groups** box and enter the name(s) of those group(s) in a text box that appears.
1. Select **Apply**.

## Related content

- [Promote or certify content](/power-bi/collaborate-share/service-endorse-content)
- [Read about endorsement in Power BI](/power-bi/collaborate-share/service-endorsement-overview)
