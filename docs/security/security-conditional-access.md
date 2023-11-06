---
title: Conditional access
description: Learn how to configure conditional access for Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom: build-2023
ms.date: 11/06/2023
---

# Conditional access in Fabric

The Conditional Access feature in Microsoft Entra ID offers a number of ways enterprise customers can secure apps in their tenants, including:

- Multi-factor authentication
- Allowing only Intune enrolled devices to access specific services
- Restricting user locations and IP ranges
For more information on the full capabilities of Conditional Access, see the article [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/).


## Configure conditional access for Fabric

The following steps show how to configure a conditional access policy for Microsoft Fabric.

1. Sign in to the Azure portal using an account with *global administrator permissions*, select **Microsoft Entra ID**, choose **Security** from the menu.
2. Select **Conditional Access**, then choose **+Create new Policy**, and provide a name for the policy.
3. Under **Assignments**, select **Users and groups**, check the **Select users and groups** option, and then select a Microsoft Entra user or group for Conditional access. Click Select.
4. Under **Target resources**, select **Cloud apps**, select **Select apps**, then click in the **Select** field. In the Select side pane that appears, find and select **Power BI Service**, **Azure Data Explorer**, **Azure SQL Database**, and **Azure Storage**. When you've selected all four items, close the side pane by clicking Select.
5. Under **Access controls**, select **Grant**. In the Grant side pane that appears, check the policy you want to apply, and then click Select.
6. Set the **Enable policy** toggle to **On**, then select **Create**.

To configure conditional access for Fabric, follow the guidance provided in the [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/). To ensure that conditional access for Fabric works as intended and expected, it's recommended to adhere to the following best practices:

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
> When a conditional access policy targets the Microsoft Azure Management app, services or clients with an Azure API service dependency can be impacted. This includes Azure Data Factory, Azure PowerShell, and Azure CLI. Learn more about [Microsoft Azure Management](/entra/identity/conditional-access/concept-conditional-access-cloud-apps#microsoft-azure-management).

## Next steps

* [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/)
