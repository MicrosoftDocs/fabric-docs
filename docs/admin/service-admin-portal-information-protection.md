---
title: Information protection tenant settings
description: Learn how to configure information protection tenant settings in Fabric.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-admin
ms.custom:
  - tenant-setting
  - ignite-2023
ms.topic: how-to
ms.date: 02/14/2024
LocalizationGroup: Administration
---

# Information protection tenant settings

Information protection tenant settings help you to protect sensitive information in your Power BI tenant. Allowing and applying sensitivity labels to content ensures that information is only seen and accessed by the appropriate users. These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Allow users to apply sensitivity labels for content

With this setting enabled, specified users can apply sensitivity labels from Microsoft Purview Information Protection.

All [prerequisite steps](/power-bi/enterprise/service-security-enable-data-sensitivity-labels#licensing-and-requirements) must be completed before enabling this setting.

Sensitivity label settings, such as encryption and content marking for files and emails, aren't applied to content. Sensitivity labels and protection are only applied to files exported to Excel, PowerPoint, or PDF files that are controlled by **Export to Excel** and **Export reports as PowerPoint presentation or PDF documents** settings. All other export and sharing options don't support the application of sensitivity labels and protection.

To learn more, see [Sensitivity labels in Power BI](/power-bi/enterprise/service-security-sensitivity-label-overview).

To view sensitivity label settings for your organization, visit the [Microsoft Purview compliance portal](https://protection.officeppe.com/sensitivity?flight=EnableMIPLabels).

## Apply sensitivity labels from data sources to their data in Power BI

When this setting is enabled, Power BI semantic models that connect to sensitivity-labeled data in supported data sources can inherit those labels, so that the data remains classified and secure when brought into Power BI.

To learn more about sensitivity label inheritance from data sources, see [Sensitivity label inheritance from data sources (preview)](/power-bi/enterprise/service-security-sensitivity-label-inheritance-from-data-sources).

## Automatically apply sensitivity labels to downstream content

When a sensitivity label is applied to a semantic model or report in the Power BI service, it's possible to have the label trickle down and be applied to content that's built from that semantic model or report.

To learn more, see [Sensitivity label downstream inheritance](/power-bi/enterprise/service-security-sensitivity-label-downstream-inheritance).

## Allow workspace admins to override automatically applied sensitivity labels

Fabric admins can enable the **Allow workspace admins to override automatically applied sensitivity labels** tenant setting. This makes it possible for workspace admins to override automatically applied sensitivity labels without regard to label change enforcement rules.

To learn more, see [Relaxations to accommodate automatic labeling scenarios](/power-bi/enterprise/service-security-sensitivity-label-change-enforcement#relaxations-to-accommodate-automatic-labeling-scenarios).

## Restrict content with protected labels from being shared via link with everyone in your organization

When this setting is enabled, users can't generate a sharing link for **People in your organization** for content with protection settings in the sensitivity label.

> [!NOTE]
> This setting is disabled if you haven't enabled both the **Allow users to apply sensitivity labels for Power BI content** setting and the **Allow shareable links to grant access to everyone in your organization** setting.

Sensitivity labels with protection settings include encryption or content markings. For example, your organization might have a *Highly Confidential* label that includes encryption and applies a *Highly Confidential* watermark to content with this label. Therefore, when this tenant setting is enabled and a report has a sensitivity label with protection settings, then users can't create sharing links for **People in your organization**:

:::image type="content" source="media/tenant-settings/admin-organization-doesnt-allow-option.png" alt-text="Screenshot of disabled sharing link to people in your organization.":::

To learn more about protection settings for sensitivity labels, see [Restrict access to content by using sensitivity labels to apply encryption](/microsoft-365/compliance/encryption-sensitivity-labels).

## Increase the number of users who can edit and republish encrypted PBIX files (preview)

When enabled, users with [restrictive sensitivity permissions in the Microsoft Purview compliance portal](#restrictive-sensitivity-permissions) on an encrypted sensitivity label can open, edit, publish, and republish PBIX files protected by that label, with [restrictions](#restrictions).

> [!NOTE]
> The [Enable Less Elevated User feature switch in Power BI Desktop](#desktop-preview-feature-switch-for-editing-by-users-with-restrictive-sensitivity-permissions) must be selected in order for a user with restrictive sensitivity permissions to be able to open, edit, and publish/republish a PBIX file protected by an encrypted sensitivity label.

### Restrictive sensitivity permissions

Restrictive sensitivity permissions in this context means that the user must have all of the following usage rights:

  * View Content (VIEW)
  * Edit Content (DOCEDIT)
  * Save (EDIT)
  * Copy and extract content (EXTRACT)
  * Allow Macros (OBJMODEL)

   > [!NOTE]
   > Usage rights are granted to users by compliance admins in the Microsoft Purview compliance portal as part of sensitivity label definition.

### Restrictions

The following are the restrictions that apply to users with restrictive sensitivity permissions:

* Users with restrictive sensitivity permissions can't export to formats that don't support sensitivity labels, such as CSV files.
* Users with restrictive sensitivity permissions can't change the label on the PBIX file.
* Users with restrictive sensitivity permissions can republish the PBIX file only to the original workspace they downloaded it from.

These restrictions ensure that protection is preserved and control of protection settings remains with users that have higher permission levels.

For more information, see [Sensitivity label change enforcement](/power-bi/enterprise/service-security-sensitivity-label-change-enforcement).

### Desktop preview feature switch for editing by users with restrictive sensitivity permissions

The **Less Elevated User** feature switch in Power BI Desktop must be selected in order for a user with restrictive sensitivity permissions to be able to open, edit, and publish/republish a PBIX file protected by an encrypted sensitivity label. Desktop users can check to make sure the switch is selected by opening Power BI Desktop and navigating to **File** > **Options and settings** > **Options** > **Preview features**. The **Less Elevated User feature** switch is selected by default, but if for some reason it isn't selected, the user should select it.

## Related content

* [About tenant settings](tenant-settings-index.md)
