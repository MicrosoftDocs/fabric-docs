---
title: Conditional access
description: Learn how to configure conditional access for Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: concept-article
ms.custom: build-2023
ms.date: 07/05/2023
---

# Conditional access in Fabric

The Conditional Access feature in Azure Active Directory (Azure AD) offers a number of ways enterprise customers can secure apps in their tenants, including:

- Multi-factor authentication
- Allowing only Intune enrolled devices to access specific services
- Restricting user locations and IP ranges
For more information on the full capabilities of Conditional Access, see the article [Azure AD Conditional Access documentation](/azure/active-directory/conditional-access/).


## Configure conditional access for Fabric

To configure conditional access for Fabric, follow the guidance provided in the [Azure AD Conditional Access documentation](/azure/active-directory/conditional-access/). To ensure that conditional access for Fabric works as intended and expected, it's recommended to adhere to the following best practices:

* Configure a single, common, conditional access policy for the Power BI Service, Azure Storage, Azure SQL Database, Azure Data Explorer, and Microsoft Azure Management. Having a single, common policy will significantly reduce unexpected prompts that may arise from different policies being applied to downstream services, and the consistent security posture will provide the best user experience in Microsoft Fabric and its related products. 

    The products to include in the policy are the following: 

    **Product**
    * Power BI Service
    * Azure Data Explorer
    * Azure SQL Database
    * Azure Storage
    * Microsoft Azure Management

* If you create a restrictive policy (such as one that blocks access for all apps except Power BI), certain features, such as dataflows, won't work.

> [!NOTE]
> If you already have a conditional access policy configured for Power BI, be sure to include the other products listed in the table above in your existing Power BI policy, otherwise conditional access may not operate as intended in Fabric.

> [!NOTE]
> When a conditional access policy targets the Microsoft Azure Management app, services or clients with an Azure API service dependency can be impacted. This includes Azure Data Factory, Azure PowerShell, and Azure CLI. Learn more about [Microsoft Azure Management](/azure/active-directory/conditional-access/concept-conditional-access-cloud-apps#microsoft-azure-management).

## Next steps

* [Azure AD Conditional Access documentation](/azure/active-directory/conditional-access/)
