---
title: Conditional access
description: Learn how to configure conditional access for Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: concept
ms.date: 04/13/2023
---

# Conditional access in Fabric

Enterprise customers require centralized control and management of the identities and credentials used to access their resources and data. Microsoft Azure AD provides that service. Microsoft 365 products that use Azure AD authentication must take the additional step to allow conditional access policies to be applied when users sign-in. Azure AD Conditional Access provides a rich policy framework including controls like requiring multi-factor authentication, limiting sign-in location, ensuring a compliant device, or even evaluating sign-in risk using the broad set of signals that Microsoft constantly gathers. Azure AD Conditional Access is a feature included in Azure AD premium tier.  

 

Today, customers can configure conditional access (CA) policy for Power BI through Azure Portal or through Azure AD Conditional Access APIs by selecting the Power BI Service (app id 00000009-0000-0000-c000-000000000000). Power BI clients (web front end WFE, API, PowerShell, etc.) enforce the configured conditional access policies when users attempt to sign-in. Based on the policy, the user may be permitted to access intended resources, denied access, or challenged to provide muti-factor authentication details. Customers can configure CA policy for Azure applications such as SQL, which is honored by all SQL clients and tooling such as SSMS. Customers can also configure CA policies for Azure Data Explorer and Azure Storage.  

## How it works?

Explain how business to business works in [!INCLUDE [product-name](../includes/product-name.md)].

## Next steps


