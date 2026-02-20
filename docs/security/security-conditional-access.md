---
title: Conditional Access
description: Learn how to configure conditional access for Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.custom:
ms.date: 02/20/2026
---

# Conditional Access in Fabric

Microsoft Entra Conditional Access offers several ways enterprise customers can secure apps in their tenants, including:

- Multifactor authentication (MFA)
- Allow only Intune-enrolled devices to access specific services
- Restrict user locations and IP ranges

For more information on the full capabilities of Conditional Access, see [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/).

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

The following steps show how to get started in Conditional Access and configure **Target resources** for Microsoft Fabric.

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/) as at least a [Conditional Access Administrator](/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator).
1. Browse to **Entra ID** > **Conditional Access** > **Policies**.
1. Select **New policy**.
1. Give your policy a name. We recommend that organizations create a meaningful standard for the names of their policies.
1. Under **Target resources**, select the following options: 
   1. Select what this policy applies to **Resources (formerly cloud apps)**.
   1. Include **All resources (formerly 'All cloud apps')** Then, on the Include tab, choose **Select apps** and place your cursor in the **Select** field. In the **Select** side pane that appears, find and select **Power BI Service**, **Azure Data Explorer**, **Azure SQL Database**, **Azure Storage**, and **Azure Cosmos DB**. Once you select all five items, close the side pane by clicking **Select**.

After you set **Target resources**, configure **Users, agents (Preview) or workload identities**, **Conditions**, **Grant**, **Session**, and policy state based on your scenario. For policy design patterns, see [Common Conditional Access policies](/entra/identity/conditional-access/concept-conditional-access-policy-common).

For **Grant** controls, use [Authentication strengths](/entra/identity/authentication/concept-authentication-strengths) and select a phishing-resistant strength (for example, **Phishing-resistant**) when possible to reduce MFA phishing risk. Review prerequisites and impact before rollout.

If your organization uses service principals or other workload identities to call Fabric-related APIs (such as Power BI REST APIs), evaluate [Conditional Access for workload identities](/entra/identity/conditional-access/workload-identity). Then create appropriate workload identity policies.

### Reduce unexpected sign-in prompts

To reduce interruptions while preserving security, tune **Session** controls such as sign-in frequency and use Continuous Access Evaluation (CAE) where supported for near real-time enforcement. Confirm CAE support for each downstream app in [Continuous Access Evaluation supported services](/entra/identity/conditional-access/concept-continuous-access-evaluation).

### Recommended Zero Trust baseline for Fabric access

Use this baseline as a starting point, then tailor by user, app, and risk level:

* Enforce phishing-resistant MFA by using authentication strengths.
* Block legacy authentication.
* Require compliant devices for sensitive actions.
* Apply location or IP-based restrictions where appropriate.
* Enable sign-in risk policies for high-risk sessions.

For implementation guidance, see [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/) and [Zero Trust guidance](/security/zero-trust/).

## Related content

* [Microsoft Entra Conditional Access documentation](/entra/identity/conditional-access/)
* [Zero Trust guidance](/security/zero-trust/)