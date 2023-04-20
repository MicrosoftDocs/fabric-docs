---
title: Conditional access
description: Learn how to configure conditional access for Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: concept
ms.date: 04/20/2023
---

# Conditional access in Fabric

Azure AD Conditional Access is a feature included in the Azure AD premium tier that enables products that use Azure Active Directory to allow conditional access policies to be applied when users sign-in. Azure AD Conditional Access provides a rich policy framework including controls such as requiring multi-factor authentication, limiting sign-in location, ensuring a compliant device, or even evaluating sign-in risk using the broad set of signals that Microsoft constantly gathers.

Products that wish to take advantage of conditional access polices must take the step of configuring a policy for the product in Azure AD Conditional Access amd allowing it to be applied when users login in. For more information about Azure AD Conditional Access, see [Azure AD Conditional Access documentation](/azure/active-directory/conditional-access/).

## Configure conditional access for Fabric

To configure conditional access for Fabric, follow the guidance provided in the [Azure AD Conditional Access documentation](/azure/active-directory/conditional-access/). To ensure that conditional access for Fabric works as intended and expected, it is recommended to adhere to the following best practices:

* Configure a single, common, conditional access policy for the Power BI Service, Azure Storage, Azure SQL Database, Azure Data Explorer, and Microsoft Azure Management. Having a single, common policy for will significantly reduce unexpected prompts that may arise from different policies being applied to downstream services, and the consistent security posture will provide the best user experience in Microsoft Fabric and its related products.

    The products to include in the policy along with their App IDs are shown in the following table. 
    
    |Product  |App ID  |
    |---------|---------|
    |Power BI Service           | 00000009-0000-0000-c000-000000000000 |
    |Azure Data Explorer        | 2746ea77-4702-4b45-80ca-3c97e680e8b7 |
    |Azure SQL Database         | 022907d3-0f1b-48f7-badc-1ba6abab6d66 |
    |Azure Storage              | e406a681-f3d4-42a8-90b6-c2b029497af1 |
    |Microsoft Azure Management |                                      |

* If you create a restrictive policy (such as one that blocks access for all apps except Power BI), certain features, such as dataflows, will not work.

+++++++

Tell what happens when you have Power BI already set, what will be covered. WHen you turn on the switch, there will be other workloads such as XXX that will be uncovered. You need to configure these for conditional access as well.

When user accesses Power BI or Trident workloads (data engineering and data science), AAD will enforce CA policies configured for Power BI Service app.  

In addition, you need to include in the policy SQL, Kusto, Dataflows, etc.

## Next steps

* [Azure AD Conditional Access documentation](/azure/active-directory/conditional-access/)