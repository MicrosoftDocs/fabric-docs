---
title: Conditional Access
description: Learn how to configure conditional access for Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.custom:
ms.date: 02/25/2026
---

# Conditional Access in Fabric

Microsoft Fabric uses Microsoft Entra ID Conditional Access as part of its identity-based, Zero Trust security model. Every request to Fabric is authenticated with Microsoft Entra ID, and Conditional Access policies can determine access based on signals such as user identity, device state, and location. Common policies include:

- Require multifactor authentication (MFA)
- Allow only Intune-enrolled devices to access specific services
- Restrict user locations and IP ranges

Conditional Access is one of several security controls available for protecting access to Fabric. It complements network‑based protections such as private links and supports a layered security approach aligned with Zero Trust principles. For more information on the full capabilities of Conditional Access, see [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/).

## Configure Conditional Access for Fabric

To ensure a smooth and secure experience across Microsoft Fabric and its connected services, we recommend setting up one common Conditional Access policy. This helps:

* Reduce unexpected sign-in prompts caused by different policies on downstream services.
* Maintain a consistent security setup across all tools.
* Improve the overall user experience.

The target resources to include in the policy are:

* Power BI Service
  * Azure Data Explorer
  * Azure SQL Database
  * Azure Storage
  * Azure Cosmos DB

If your policy is too restrictive—for example, if it blocks all apps except Power BI—some features, such as dataflows, might not work.

> [!NOTE]
> If you already have a Conditional Access policy configured for Power BI, be sure to include the resources listed here in your existing Power BI policy. Otherwise, Conditional Access might not operate as intended in Fabric.
> Power BI doesn't support [continuous access evaluation (CAE)](/entra/identity/conditional-access/concept-continuous-access-evaluation#limitations).
> In split tunneling environments, enabling CAE in Conditional Access policies could prevent access to Power BI management experiences such as adding or editing gateway users. Requests to Microsoft Graph and Fabric services can originate from different network paths, causing CAE challenges that Power BI experiences don't handle.

The following steps show how to get started in Conditional Access and configure **Target resources** for Microsoft Fabric.

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/) as at least a [Conditional Access Administrator](/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator).
1. Browse to **Entra ID** > **Conditional Access** > **Policies**.
1. Select **New policy**.
1. Give your policy a name. We recommend that organizations create a meaningful standard for the names of their policies.
1. Under **Assignments**, select the **Users, agents or workload identities**, field. Then, on the Include tab, choose **Select users and groups**, and then check the **Users and groups** checkbox. The **Select users and groups** pane opens, and you can search for and select a Microsoft Entra user or group for conditional access and **Select** it.
1. Under **Target resources**, select the following options: 
   1. Select what this policy applies to **Resources (formerly cloud apps)**.
   1. Include **All resources (formerly 'All cloud apps')** Then, on the Include tab, choose **Select apps** and place your cursor in the **Select** field. In the **Select** side pane that appears, find and select **Power BI Service**, **Azure Data Explorer**, **Azure SQL Database**, **Azure Storage**, and **Azure Cosmos DB**. Once you select all five items, close the side pane by clicking **Select**.
1. Continue configuring the remaining sections based on your scenario, including **Conditions**, **Grant**, **Session**, and policy state. For common policy design patterns, see the Conditional Access [How-to guides](/entra/identity/conditional-access/plan-conditional-access).

## Related content

* [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/) - Learn more about Conditional Access features, policy design, and best practices.
* [Azure security baseline for Microsoft Fabric](/security/benchmark/azure/baselines/fabric-security-baseline) – Review recommendations from Microsoft cloud security benchmark standards.
* [Protect inbound traffic to Microsoft Fabric](../security/protect-inbound-traffic.md) – Understand how Conditional Access works alongside private links to control inbound access to Fabric.
