---
title: Conditional access
description: Learn how to configure conditional access for Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.custom:
ms.date: 06/04/2025
---

# Conditional access in Fabric

The Conditional Access feature in Microsoft Entra ID offers several ways enterprise customers can secure apps in their tenants, including:

- Multifactor authentication
- Allowing only Intune enrolled devices to access specific services
- Restricting user locations and IP ranges

For more information on the full capabilities of Conditional Access, see the article [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/).

## Configure conditional access for Fabric

To ensure a smooth and secure experience across Microsoft Fabric and its connected services, we recommend setting up one common conditional access policy. This helps:

* Reduce unexpected sign-in prompts caused by different policies on downstream services.
* Maintain a consistent security setup across all tools.
* Improve the overall user experience.

  The products to include in the policy are:

  * Power BI Service
  * Azure Data Explorer
  * Azure SQL Database
  * Azure Storage
  * Azure Cosmos DB

* If your policy is too restrictive—for example, if it blocks all apps except Power BI— some features, such as dataflows, may not work.

> [!NOTE]
> If you already have a conditional access policy configured for Power BI, be sure to include the products listed above in your existing Power BI policy, otherwise conditional access may not operate as intended in Fabric.

The following steps show how to configure a conditional access policy for Microsoft Fabric.

1. Sign in to the Azure portal as at least a [Conditional Access Administrator](/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator).
1. Select **Microsoft Entra ID**.
1. On the Overview page, choose **Security** from the menu.
1. On the Security | Getting started page, choose **Conditional Access**.
1. On the Conditional Access | Overview page, select **+Create new policy**.
1. Provide a name for the policy.
1. Under **Assignments**, select the **Users** field. Then, on the Include tab, choose **Select users and groups**, and then check the **Users and groups** checkbox. The **Select users and groups** pane opens, and you can search for and select a Microsoft Entra user or group for conditional access and **Select** it.
1. Place your cursor in the **Target resources** field and choose **Cloud apps** from the drop-down menu. Then, on the Include tab, choose **Select apps** and place your cursor in the **Select** field. In the **Select** side pane that appears, find and select **Power BI Service**, **Azure Data Explorer**, **Azure SQL Database**, **Azure Storage**, and **Azure Cosmos DB**. Once you select all five items, close the side pane by clicking **Select**.
1. Under **Access controls**, put your cursor in the **Grant** field. In the **Grant** side pane that appears, configure the policy you want to apply, and **Select**.
1. Set the **Enable policy** toggle to **On**, then select **Create**.

## Related content

* [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/)
