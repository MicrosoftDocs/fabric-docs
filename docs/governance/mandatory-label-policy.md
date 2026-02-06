---
title: Mandatory label policy in Fabric and Power BI
description: Learn how organizations can require users to apply sensitivity labels to items with a mandatory label policy in Fabric and Power BI.
author: msmimart
ms.author: mimart
ms.service: fabric
ms.subservice: governance
ms.topic: concept-article
ms.custom:
ms.date: 12/02/2025
LocalizationGroup: Data from files
---

# Mandatory label policy for Fabric and Power BI

To help ensure comprehensive protection and governance of sensitive data, you can require your organization's Fabric and Power BI users to apply sensitivity labels to items they create or edit. You do this by enabling, in their sensitivity label policies, a special setting for mandatory labeling in Fabric and Power BI. This article describes the user actions that are affected by a mandatory labeling policy, and explains how to enable a mandatory labeling policy for Fabric and Power BI.

>[!NOTE]
> The mandatory label policy setting for Fabric and Power BI is independent of the mandatory label policy setting for files and email.
>
> Mandatory labeling in Fabric and Power BI isn't supported for service principals and APIs. Service principals and APIs aren't subject to mandatory label policies.

## What happens when a mandatory label policy is in effect?

**In Fabric and the Power BI service**:

* Users must apply a sensitivity label before they can save new items (if the item is a [supported item type](#supported-item-types)).
* Users must apply a sensitivity label before they can save changes to the settings or content of existing, unlabeled items (if the item is a [supported item type](#supported-item-types)).
* If users try to import data from an unlabeled *.pbix* file, a prompt requires them to select a label before the import can continue. The label they select is applied to the resulting semantic model and report in the service. **It's not applied to the *.pbix* file itself**.

**In Power BI Desktop**:

* Users must apply sensitivity labels to unlabeled *.pbix* files before they can save or publish to the service.

## Supported item types

Mandatory labeling in Fabric and Power BI is supported for all item types except:

* Scorecard
* Dataflow Gen 1
* Dataflow Gen 2
* Streaming semantic model
* Streaming dataflow

## Enabling a mandatory label policy for Fabric and Power BI

Users with [appropriate permissions](/purview/dlp-create-deploy-policy?tabs=purview#permissions) can enable a mandatory label policy for Fabric and Power BI by selecting the **Require users to apply a label to their Fabric and Power BI content** checkbox at the **Default settings for Fabric and Power BI content** stage of the policy configuration process in the [Microsoft Purview portal](https://purview.microsoft.com/informationprotection/labelpolicies). For more information, see [What label policies can do](/purview/sensitivity-labels#what-label-policies-can-do).

:::image type="content" source="media/mandatory-label-policy/require-users-set-label.png" alt-text="Screenshot of mandatory label setting in the Microsoft Purview compliance portal.":::

If you have an existing policy, and you want to enable mandatory labeling in Power BI, you can use the [Security & Compliance PowerShell setLabelPolicy API](/powershell/module/exchange/set-labelpolicy).

```powershell
Set-LabelPolicy -Identity "<policy name>" -AdvancedSettings @{powerbimandatory="true"}
```

Where:
* `<policy name>` is the name of the policy where you want to set labeling in Fabric and Power BI as mandatory.

**Requirements for using PowerShell**

* You need the Exchange Online PowerShell (EXO) module to run this command. For more information, see [About the Exchange Online PowerShell module](/powershell/exchange/exchange-online-powershell-v2#install-and-maintain-the-exchange-online-powershell-module).
* A connection to the Microsoft Purview portal is also required. For more information, see [Connect to Security & Compliance PowerShell using the EXO module](/powershell/exchange/connect-to-scc-powershell).

### Documentation

* [Admin Guide: Advanced settings for Microsoft Purview Information Protection client](/azure/information-protection/rms-client/clientv2-admin-guide-customizations)
* [Use PowerShell for sensitivity labels and their policies](/purview/create-sensitivity-labels#use-powershell-for-sensitivity-labels-and-their-policies)
* [Set-LabelPolicy documentation](/powershell/module/exchange/set-labelpolicy)

## Considerations and limitations
* Mandatory labeling in Fabric and Power BI covers most common scenarios, but there might be some less common flows that still allow a user to create or edit unlabeled content.
* The mandatory label policy setting for Fabric and Power BI is independent of the mandatory label policy setting for files and email.
* Mandatory labeling in Fabric and Power BI isn't supported for service principals and APIs. Service principals and APIs aren't subject to mandatory label policies.
* Mandatory labeling in Fabric and Power BI isn't supported for [external guest users (B2B users)](/fabric/enterprise/powerbi/service-admin-entra-b2b). B2B users aren't subject to mandatory label policies.

## Related content

* [Default label policy for Fabric and Power BI](./sensitivity-label-default-label-policy.md)
