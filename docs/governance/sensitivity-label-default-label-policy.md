---
title: Default label policy in Power BI and Fabric
description: Learn how to ensure comprehensive protection and governance of sensitive data by enabling a default label policy for Power BI and Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.service: powerbi
ms.subservice: powerbi-eim
ms.topic: concept-article
ms.custom:
ms.date: 03/03/2025
LocalizationGroup: Data from files
---

# Default label policy for Fabric and Power BI

To help ensure comprehensive protection and governance of sensitive data, organizations can create default label policies for Fabric and Power BI that automatically apply default sensitivity labels to unlabeled items.

This article describes how to enable a default label policy, both in the [Microsoft Purview compliance portal](https://compliance.microsoft.com/informationprotection) and by using the [Security & Compliance PowerShell setLabelPolicy API](/powershell/module/exchange/set-labelpolicy).

>[!NOTE]
> The default label policy settings for Fabric and Power BI are independent of the default label policy settings for files and email.

## What happens when a default label policy is in effect?

* **In Power BI Desktop**

    When a user to whom the policy applies opens a new .pbix file or an existing unlabeled .pbix file, the default label is applied to the file. If the user is working offline, the label is applied when the user signs in.

* **In Fabric**

    When a user to whom the policy applies creates a new item, the default label is applied to that item.

    When a user to whom the policy updates an unlabeled item:
    
    * If the item is a Power BI item, a change to any of its attributes causes the default label to be applied if the user doesn't apply a label.
    
    * If the item is a non-Power BI Fabric item, only changes to certain attributes, such as name and description, cause the default label to be applied. And this is only if the change is made in the item's flyout menu. For changes made in the experience interface, default labeling isn't currently supported.

## Enabling a default label policy for Fabric and Power BI

A Microsoft 365 administrator can enable a default label policy for Fabric and Power BI by selecting the desired label in the **Apply this default label to Power BI content** dropdown menu in the policy settings for Power BI in the [Microsoft Purview compliance portal](https://compliance.microsoft.com/informationprotection). For more information, see [What label policies can do](/microsoft-365/compliance/sensitivity-labels#what-label-policies-can-do).

:::image type="content" source="./media/sensitivity-label-default-label-policy/default-labels-config-in-compliance-center.png" alt-text="Screenshot of the default label setting in the Microsoft compliance portal." lightbox="./media/sensitivity-label-default-label-policy/default-labels-config-in-compliance-center.png":::

For existing policies, it's also possible to enable default label policies for Fabric and Power BI using the [Security & Compliance PowerShell setLabelPolicy API](/powershell/module/exchange/set-labelpolicy).

```powershell
Set-LabelPolicy -Identity "<default label policy name>" -AdvancedSettings @{powerbidefaultlabelid="<LabelId>"}
```

Where:

* `<default label policy name>` is the name of the policy whose associated sensitivity label you want to be applied by default to unlabeled items in Fabric and Power BI.

>[!IMPORTANT]
>If a user has more than one label policy, the default label setting is always taken from the policy with the highest priority, make sure to configure the default label on that policy.

**Requirements for using PowerShell**

* The Exchange Online PowerShell V2 (EXO V2) module. For more information, see [About the Exchange Online PowerShell V2 module](/powershell/exchange/exchange-online-powershell-v2#install-and-maintain-the-exo-v2-module)
* A connection to the Microsoft Purview compliance portal. For more information, see [Connect to Security & Compliance PowerShell](/powershell/exchange/connect-to-scc-powershell)

### Documentation

* [Admin Guide: Custom configurations for the Azure Information Protection unified labeling client](/azure/information-protection/rms-client/clientv2-admin-guide-customizations#available-advanced-settings-for-labels)
* [Create and configure sensitivity labels and their policies](/microsoft-365/compliance/create-sensitivity-labels#use-powershell-for-sensitivity-labels-and-their-policies)
* [Set-LabelPolicy documentation](/powershell/module/exchange/set-labelpolicy)

## Considerations and limitations

* Default labeling in Fabric Power BI covers most common scenarios, but there might be some less common flows that still allow users to open or create unlabeled *.pbix* files or Fabric items.
* Default label policy settings for Fabric and Power BI are independent of the default label policy settings for files and email.
* Default labeling in Fabric and Power BI isn't supported for service principals and APIs. Service principals and APIs aren't subject to default label policies.
* Default label policies in Fabric and Power BI aren't supported for [external guest users (Microsoft Entra B2B)](/fabric/enterprise/powerbi/service-admin-entra-b2b). When a B2B user opens or creates an unlabeled *.pbix* file in Power BI Desktop or Fabric or Power BI item in Fabric, no default label is applied automatically.

## Related content

* [Mandatory label policy for Power BI](service-security-sensitivity-label-mandatory-label-policy.md)
