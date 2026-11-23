---
title: Use Microsoft Purview with Microsoft Fabric
description: Learn how Microsoft Purview helps protect Fabric data and supports audit, risk, and compliance scenarios.
ms.reviewer: viseshag
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 08/26/2026
ai-usage: ai-assisted
---

# Use Microsoft Purview to protect Microsoft Fabric

Microsoft Fabric provides built-in governance capabilities for discovering, governing, and managing data. Microsoft Purview works with Fabric to protect sensitive data and support audit, risk, and compliance scenarios. This article explains when to use each experience.

## Governance in Microsoft Fabric

Microsoft Fabric includes built-in governance capabilities that help organizations discover, govern, manage, and protect data.

The OneLake catalog is the primary Fabric experience for discovering and governing Fabric data. From the catalog, data consumers and data owners can find trusted data, understand where it comes from, and act on its governance state without leaving Fabric. Built-in governance capabilities include:

- **Discovery** — find and explore data across your Fabric estate from a single catalog experience.
- **Governance Insights** — see the governance state of your data across the organization and for the data you own.
- **Recommended Actions** — get prioritized guidance to improve the governance posture of your data.
- **Domains** — organize data by business area to support federated, distributed ownership.
- **Endorsement** — promote or certify trusted items so consumers can find high-quality, approved data.
- **Lineage** — trace how data flows across Fabric items, from source to report.

To learn more about these capabilities, see [Fabric governance documentation](./index.yml), [Governance and compliance in Microsoft Fabric](governance-compliance-overview.md), [OneLake catalog overview](onelake-catalog-overview.md), and [Govern your Fabric data with the OneLake catalog](onelake-catalog-govern.md).

Fabric brings governance and administrative experiences together in the **Govern** section of the OneLake catalog. Use **Govern** to review governance insights and recommended actions and to access tenant configuration, workspace and capacity management, policies, and other organization-wide controls.

A single person often holds more than one of these responsibilities. Someone who manages capacities might also be a Fabric administrator, a domain administrator, a workspace administrator, or a data steward. The **Govern** section is organized around what you're trying to accomplish rather than around a single role.

## When to use Microsoft Purview with Fabric

Microsoft Purview works with Fabric to support information protection, compliance, risk management,
and security scenarios.

Microsoft Fabric provides the built-in governance capabilities described previously. Microsoft Purview adds protection and monitoring when your security, risk, and compliance needs extend beyond Fabric. Consider Microsoft Purview when you need to:

- Discover and classify sensitive data, and apply protection with information protection and sensitivity labels.
- Prevent risky sharing or movement of sensitive data with data loss prevention.
- Audit and investigate user activity for compliance and security.
- Address broader compliance and risk-management requirements.

Using Microsoft Purview doesn't change where Fabric governance lives. The OneLake catalog remains
the primary experience for governing Fabric data, and Microsoft Purview adds protection, audit,
risk, and compliance coverage.

## How Fabric and Purview work together

Microsoft Fabric surfaces its governance capabilities natively, and Microsoft Purview integrates
with Fabric so you can protect and monitor Fabric data. The following integrations are available
today:

- **Microsoft Purview Information Protection** — discover, classify, and protect Fabric data using sensitivity labels. Sensitivity labels can be set on all Fabric items, and data remains protected when it's exported through supported export paths. For more information, see [Information Protection in Microsoft Fabric](information-protection.md). *Customer outcome:* keep sensitive Fabric data classified and protected wherever it goes.
- **Microsoft Purview Data Loss Prevention (DLP)** — DLP policies support structured data in Fabric, such as lakehouses, warehouses, databases, and semantic models. Policies evaluate sensitivity labels and sensitive info types to limit user actions when data is classified as sensitive, and can generate policy tips and alerts. For more information, see [data loss prevention policies](/power-bi/enterprise/service-security-dlp-policies-for-power-bi-overview). *Customer outcome:* prevent the risky sharing or movement of sensitive Fabric data.
- **Microsoft Purview Audit** — all Microsoft Fabric user activities are logged and available in the Microsoft Purview audit log. For more information, see [track user activities in Microsoft Fabric](../admin/track-user-activities.md) and [track user activities in Power BI](../admin/service-admin-portal-audit-usage.md). *Customer outcome:* audit and investigate activity across Fabric for compliance and security.
- **Microsoft Purview Insider Risk Management (IRM)** — IRM policies support ready-to-use risk indicators for Microsoft Fabric, such as Power BI and lakehouse activities, to help detect potential data theft or leakage. For more information on supported Fabric workloads, see [Configure policy indicators in Insider Risk Management](/purview/insider-risk-management-settings-policy-indicators#microsoft-fabric-indicators). *Customer outcome:* identify and respond to insider risks involving Fabric data.
- **Microsoft Purview governance for Fabric Copilots and agents** — Purview provides governance and risk controls for Fabric Copilots and agents, including risk discovery in prompts and responses, audit coverage for AI interactions, and retention and eDiscovery applicability to AI-generated content. For more information, see [Microsoft Purview data security and compliance protections for generative AI apps](/purview/ai-microsoft-purview). *Customer outcome:* govern and monitor AI usage across supported Fabric workloads.

## Security and compliance scenarios

Use the following scenarios to decide which experience to reach for. Fabric's built-in governance is
the starting point, and Microsoft Purview extends protection, audit, risk, and compliance.

### Discover and govern data

Start with Fabric's built-in governance experiences to find and govern your Fabric data:

- [OneLake catalog overview](onelake-catalog-overview.md)
- [Govern your Fabric data with the OneLake catalog](onelake-catalog-govern.md)
- [Fabric governance documentation](./index.yml)
- [Governance and compliance in Microsoft Fabric](governance-compliance-overview.md)

### Protect sensitive data

Fabric supports sensitivity labels natively, and Microsoft Purview extends protection with information protection and data loss prevention:

- [Information Protection in Microsoft Fabric](information-protection.md)
- [Microsoft Purview data security and compliance protections for generative AI apps](/purview/ai-microsoft-purview)

### Audit and investigate activity

Fabric user activity is available in the Microsoft Purview audit log for compliance and investigation:

- [Track user activities in Microsoft Fabric](../admin/track-user-activities.md)
- [Track user activities in Power BI](../admin/service-admin-portal-audit-usage.md)

## Related documentation

### Start with Fabric governance

- [Fabric governance documentation](./index.yml)
- [Governance and compliance in Microsoft Fabric](governance-compliance-overview.md)
- [OneLake catalog overview](onelake-catalog-overview.md)

### Govern data

- [Govern your Fabric data with the OneLake catalog](onelake-catalog-govern.md)

### Microsoft Purview integrations

- [Microsoft Purview data security and compliance protections for generative AI apps](/purview/ai-microsoft-purview)
