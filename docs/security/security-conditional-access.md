---
title: Conditional access
description: Learn how to configure conditional access for Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/07/2023
---

# Conditional access in Fabric

The Conditional Access feature in Microsoft Entra ID offers several ways enterprise customers can secure apps in their tenants, including:

- Multifactor authentication
- Allowing only Intune enrolled devices to access specific services
- Restricting user locations and IP ranges

For more information on the full capabilities of Conditional Access, see the article [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/).

## Configure conditional access for Fabric

To ensure that conditional access for Fabric works as intended and expected, it's recommended to adhere to the following best practices:

* Configure a single, common, conditional access policy for the Power BI Service, Azure Data Explorer, Azure SQL Database, and Azure Storage. Having a single, common policy significantly reduces unexpected prompts that might arise from different policies being applied to downstream services, and the consistent security posture provides the best user experience in Microsoft Fabric and its related products.

    The products to include in the policy are the following:

    **Product**
    * Power BI Service
    * Azure Data Explorer
    * Azure SQL Database
    * Azure Storage

* If you create a restrictive policy (such as one that blocks access for all apps except Power BI), certain features, such as dataflows, won't work.

> [!NOTE]
> If you already have a conditional access policy configured for Power BI, be sure to include the other products listed above in your existing Power BI policy, otherwise conditional access may not operate as intended in Fabric.

The following steps show how to configure a conditional access policy for Microsoft Fabric.

1. Sign in to the Azure portal using an account with *global administrator permissions*.
1. Select **Microsoft Entra ID**.
1. On the Overview page, choose **Security** from the menu.
1. On the Security | Getting started page, choose **Conditional Access**.
1. On the Conditional Access | Overview page, select **+Create new policy**.
1. Provide a name for the policy.
1. Under **Assignments**, select the **Users** field. Then, on the Include tab, choose **Select users and groups**, and then check the **Users and groups** checkbox. The **Select users and groups** pane opens, and you can search for and select a Microsoft Entra user or group for conditional access. When done, click **Select**.
1. Place your cursor in the **Target resources** field and choose **Cloud apps** from the drop-down menu. Then, on the Include tab, choose **Select apps** and place your cursor in the **Select** field. In the **Select** side pane that appears, find and select **Power BI Service**, **Azure Data Explorer**, **Azure SQL Database**, and **Azure Storage**. When you've selected all four items, close the side pane by clicking **Select**.
1. Under **Access controls**, put your cursor in the **Grant** field. In the **Grant** side pane that appears, configure the policy you want to apply, and then click **Select**.
1. Set the **Enable policy** toggle to **On**, then select **Create**.

## Related content

* [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/)
