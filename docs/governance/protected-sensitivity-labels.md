---
title: Protected sensitivity labels in Fabric and Power BI
description: Learn about protected sensitivity labels in Fabric and Power BI and how they control what you can do with files.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 02/14/2024
---
# Protected sensitivity labels in Fabric and Power BI

Protected labels are sensitivity labels that have file protection policies associated with them and can be used to protect files and data. A file protection policy for a label grants usage rights to users, such as the ability to open a file, edit a file, copy from a file, etc. When a protected label is applied to a file or item, users who are included in the policy can perform the actions they have the usage rights for under the label policy. A file protection policy can grant different sets of users different sets of usage rights. For example, under the policy, one set of users might be granted full control over the file, while another set of users might only be permitted to open and view the file.

Having a set of sensitivity labels and policies in place is a prerequisite for using sensitivity labels in Fabric and Power BI. The labels and their file protection policies are defined by security admins in the [Microsoft Purview compliance portal](https://go.microsoft.com/fwlink/p/?linkid=2077149). Typically, the same set of protected labels is used across an organization for Office apps such as Word, Excel, and PowerPoint as well as for Fabric and Power BI.

## How protected labels work in Fabric and Power BI

In Fabric and the Power BI service, protected labels only control the ability to change or remove labels on items. They don't control access to content. In order for a user to be able to change or remove a protected label from an item, the user must either be the user who applied the sensitivity label (the RMS owner), or have at least one of the following usage rights requirements for the label.

* OWNER
* EXPORT
* EDIT and EDITRIGHTSDATA

If the label on the item was set via an automated process, such as inheritance from data sources or downstream inheritance, then the third option, EDIT and EDITRIGHTSDATA, is reduced to just EDIT. See [Relaxations to accommodate automatic labeling scenarios](#relaxations-to-accommodate-automatic-labeling-scenarios) for details.

In Power BI Desktop, protected labels control not only the ability to change or remove the protected label, but also access to content (viewing, editing, exporting, etc.). As a result, collaboration scenarios with protected PBIX files might be blocked, since it's unlikely that most users will have sufficient usage rights under the label to open and edit the file. 

For example, imagine that you create a report in Power BI Desktop, apply a protected label to it, and then share the PBIX file with another user. It is quite likely that the user won't have sufficient permissions to open the file.

To prevent this situation and enable more users to work with protected PBIX files, the Fabric administrator should enable the **Increase the number of users who can edit and republish encrypted PBIX files (preview)** tenant setting. When this setting is enabled, more users (see note) will able to open, edit, and publish/republish protected PBIX files, with the following restrictions:

* They can't export to formats that don't support sensitivity labels, such as CSV files.
* They can't change the label on the PBIX file.
* They can only republish the PBIX file to the original workspace the file came from. (Note: The file must have been published at least once for other users to be able to publish it back to that specific workspace. If the file hasn't yet been published, then the latest label issuer (the one who most recently set the protected label) or a user with sufficient usage rights must publish it and then share the file with the other editors.)

These restrictions ensure that the security of the content remains under the control of those who have high enough permissions to set the label.

> [!NOTE]
> Users must have all of the following usage rights under the label policy:
>
> * View Content (VIEW)
> * Edit Content (DOCEDIT)
> * Save (EDIT)
> * Copy and extract content (EXTRACT)
> * Allow Macros (OBJMODEL)

These usage rights are a subset of the Co-Author permissions preset in the Microsoft Purview Microsoft Purview compliance portal.

In addition, the **Less elevated user support** preview feature switch in Power BI Desktop must be selected. See [Desktop preview feature switch for editing by users with restrictive sensitivity permissions](../admin/service-admin-portal-information-protection.md#desktop-preview-feature-switch-for-editing-by-users-with-restrictive-sensitivity-permissions) for detail.

## Relaxations to accommodate automatic labeling scenarios

Fabric and Power BI support several capabilities, such as [label inheritance from data sources](service-security-sensitivity-label-inheritance-from-data-sources.md) and [downstream inheritance](service-security-sensitivity-label-downstream-inheritance.md), which automatically apply sensitivity labels to content. These automated scenarios can result in situations where no user has been set as the RMS label issuer for a label on an item. This means that there's no user who is guaranteed to be able to change or remove the label.

In such cases, the usage rights requirements for changing or removing the label are relaxed - a user needs just one of the following usage rights to be able to change or remove the label:

* OWNER
* EXPORT
* EDIT 

If no user has even these usage rights, nobody will be able to change or remove the label from the item, and access to the item is potentially endangered.

To avoid this situation, the Fabric admin can enable the **Allow workspace admins to override automatically applied sensitivity labels** tenant setting. This makes it possible for workspace admins to override automatically applied sensitivity labels without regard to label change enforcement rules.

To enable this setting, go to: **Admin portal > Tenant settings > Information protection**, and enable the toggle on the **Allow workspace admins to override automatically applied sensitivity labels** setting.

## Related content

* [Information protection](information-protection.md)
