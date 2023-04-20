---
title: Conditional access
description: Learn how to configure conditional access for Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: concept
ms.date: 04/20/2023
---

# Conditional access in Fabric

Azure AD Conditional Access is a feature included in the Azure AD premium tier that provides centralized control and management of the identities and credentials used to access an organization’s resources and data. It provides a rich policy framework including controls such as requiring multi-factor authentication, limiting sign-in location, ensuring a compliant device, or even evaluating sign-in risk using the broad set of signals that Microsoft constantly gathers. For more information about Azure AD Conditional Access, see [asdf]().

To configure conditinoal access for Fabric, following the guidance provided in the [Azure AD Conditional Access documentation](/azure/active-directory/conditional-access/). To ensure that conditional access for Fabric works as intended and expected, it is recommended to follow the following best practices:

* Include the following apps in one single conditional access policy.
    
    |Product  |App ID  |
    |---------|---------|
    |Power BI Service           | 00000009-0000-0000-c000-000000000000 |
    |Azure Data Explorer        | 2746ea77-4702-4b45-80ca-3c97e680e8b7 |
    |Azure SQL Database         | 022907d3-0f1b-48f7-badc-1ba6abab6d66 |
    |Azure Storage              | e406a681-f3d4-42a8-90b6-c2b029497af1 |
    |Microsoft Azure Management |                                      |


* If you create a restrictive policy (such as one that blocks access for all apps except Power BI), certain features, such as dataflows, will not work.


Today, customers can configure conditional access (CA) policy for Power BI through Azure Portal or through Azure AD Conditional Access APIs by selecting the Power BI Service (app id 00000009-0000-0000-c000-000000000000). Power BI clients (web front end WFE, API, PowerShell, etc.) enforce the configured conditional access policies when users attempt to sign-in. Based on the policy, the user may be permitted to access intended resources, denied access, or challenged to provide muti-factor authentication details. Customers can configure CA policy for Azure applications such as SQL, which is honored by all SQL clients and tooling such as SSMS. Customers can also configure CA policies for Azure Data Explorer and Azure Storage. 



If you have turned on Fabric and configure Conditional Access for it, the following best practices are recommended to ensure that that it works as intended and expected.

1. Include the following apps in one single conditional access policy.
1. If you create a restrictive policy (such as one that blocks access for all apps except Power BI), certain features, such as dataflows, will not work.


Approach to Conditional Access for Trident Public Preview 

The customer facing application Power BI Service (app id 00000009-0000-0000-c000-000000000000) shows up in Azure AD Conditional Access app picker will be renamed to Microsoft Analytics (placeholder name) application.  

When user accesses Power BI or Trident workloads (data engineering and data science), AAD will enforce CA policies configured for Power BI Service app.  

We will externally recommend that customers set up a single CA policy that covers Power BI and Trident products such as SQL, Kusto, Dataflows, etc., but a customer may choose to do otherwise, and this will lead to some unexpected behaviors.



Here's what we will recommend to our customers:

 

As a best practice, you should set common policies across these related apps and services whenever possible. Having a consistent security posture provides you with the best user experience in Microsoft Fabric and related products. For example, setting a common policy across Power BI Service, Azure Storage, Azure SQL Database, Azure Data Explorer, and Microsoft Azure Management significantly reduces unexpected prompts that may arise from different policies being applied to downstream services.

 From <https://learn.microsoft.com/en-us/azure/active-directory/conditional-access/service-dependencies>

 

 

Azure Data Explorer app with the following app id: 2746ea77-4702-4b45-80ca-3c97e680e8b7
Azure SQL Database, see app id below
Azure Storage, see app id below
Power BI service, see app id below
Microsoft Azure Management  (will confirm the name and app id later)
 

 

Additional note in docs

Dataflows  - we need to mention that if the customer has a restrictive CA policy such as “block access for all apps except Power BI”, certain features like Dataflows will not work


## How it works?

Explain how business to business works in [!INCLUDE [product-name](../includes/product-name.md)].

## Next steps


