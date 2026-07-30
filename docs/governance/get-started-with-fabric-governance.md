---
title: Get started with data governance
description: "Get started with Microsoft Fabric governance by exploring your data in the OneLake catalog, then choose the capability for your next job."
ms.topic: get-started
ms.date: 07/28/2026
ms.search.form: Get started
ai-usage: ai-assisted
#customer intent: As someone new to Fabric governance, I want to find the specific capability that solves the problem I'm trying to solve, so that I can get started without having to learn every feature first.
---

# Get started with Fabric governance

Microsoft Fabric governance helps you find, organize, protect, and track your organization's data so the right people can use the right data safely. Governance spans many capabilities, and when you're new to it, it's hard to know where to begin. Start in the OneLake catalog, where you can see everything your organization already has before you decide what to control.

When you finish, you'll have explored your organization's data in the OneLake catalog and know which Fabric governance capability to use next for each job.

Getting started with governance follows these high-level stages:

1. **Explore** your data estate in the OneLake catalog.
1. **Organize** your estate into domains and tags.
1. **Classify and protect** sensitive data.
1. **Trace** how data flows and what depends on it.
1. **Share** data safely outside your organization.
1. **Extend** governance to your broader security stack.

For background on what Fabric governance covers and why it matters, see [Governance and compliance in Fabric](governance-compliance-overview.md).

## Prerequisites

- A Microsoft Fabric tenant that already contains data you can browse.
- Access to at least one workspace or item, so items appear for you in the OneLake catalog. You see only the items you have permission to access.
- Purview-dependent capabilities—sensitivity labels, protection policies, DLP, and Microsoft Purview integration—require extra Microsoft Purview licensing. Everything else works with your Fabric license.

## Start in the OneLake catalog

Before you add any controls, browse what your organization already has in the OneLake catalog.

1. Open the **OneLake catalog** from the Fabric navigation pane.
1. Browse the items you can access, and filter by workspace or domain to focus on a business area.
1. Select an item to see its owner, so you know who to contact about it.
1. Note the endorsement badges as you browse: subject matter experts review *promoted* items, and *certified* items meet a higher organizational bar.

For more information about these capabilities, see [OneLake catalog](onelake-catalog-overview.md) and [Endorsement](endorsement-overview.md).

After you know what's in your estate, pick the next job to tackle. Each capability in the following sections is where to go next for a specific goal.

## Organize your data estate

Structure your estate so users can find the right data and you can delegate ownership.

| When you want to... | Use this capability |
| --- | --- |
| Group data by business area (finance, HR, sales) and delegate governance to domain owners | [Domains](domains.md) |
| Apply a custom taxonomy your organization defines (project codes, data sensitivity tiers, cost centers) | [Tags](tags-overview.md) |
| Search across the whole tenant for a specific item, filtered by domain, workspace, or endorsement | [OneLake catalog](onelake-catalog-overview.md) |

## Classify and protect sensitive data

Classify sensitive data so users and systems recognize it, then apply policies that act on the label. These capabilities require Microsoft Purview licensing.

| When you want to... | Use this capability |
| --- | --- |
| Label data as public, general, confidential, or restricted so users and automated systems can identify what needs extra care | [Sensitivity labels](information-protection.md) |
| Restrict who can access an item based on the sensitivity label it carries | [Protection policies](protection-policies-overview.md) |
| Block or alert on risky data movement, for example exporting an item that carries a specific label | [Data loss prevention (DLP) policies](data-loss-prevention-configure.md) |
| Govern Fabric alongside the rest of your data estate from a single Microsoft Purview experience | [Microsoft Purview and Fabric](microsoft-purview-fabric.md) |

## Trace how data flows and what depends on it

Find out where data comes from and what breaks when something changes.

| When you want to... | Use this capability |
| --- | --- |
| See every upstream source and every downstream item for a piece of data | [Lineage](lineage.md) |
| Preview what will break before you change or delete an item | [Impact analysis](impact-analysis.md) |

## Share data safely outside your organization

Give partners, suppliers, or subsidiaries access to Fabric data without copying it or losing control of it.

| When you want to... | Use this capability |
| --- | --- |
| Share OneLake data with users in a different Microsoft Entra tenant without moving the data | [External data sharing](external-data-sharing-overview.md) |

## Extend governance to your broader security stack

Connect Fabric to the cataloging, cloud app security, and auditing tools you already use.

| When you want to... | Use this capability |
| --- | --- |
| Feed a third-party catalog or governance tool with Microsoft Fabric metadata | [Metadata scanning](metadata-scanning-overview.md) |
| Detect and respond to risky user activity in Power BI content with your existing cloud app security tool | [Microsoft Defender for Cloud Apps controls](service-security-using-defender-for-cloud-apps-controls.md) |
| Audit who did what across your Microsoft Fabric tenant | [Track user activity](../admin/track-user-activities.md) |
| Verify Microsoft Fabric meets a specific regulatory, industry, or internal standard | [Standards compliance](standards-compliance.md) |

## Capabilities that require Microsoft Purview

Most Fabric governance capabilities work out of the box with your Fabric license. These capabilities require Microsoft Purview licensing:

- Sensitivity labels and information protection
- Protection policies
- Data loss prevention (DLP) policies
- Microsoft Purview integration for cross-estate governance

For licensing details and how these capabilities fit into an overall governance strategy, see [Governance and compliance in Fabric](governance-compliance-overview.md).
## Related content

- [Governance and compliance in Fabric](governance-compliance-overview.md)
- [OneLake catalog](onelake-catalog-overview.md)
- [Security in Microsoft Fabric](../security/security-overview.md)
- [Admin documentation](../admin/index.yml)
