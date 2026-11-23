---
title: OneLake catalog overview
description: Learn about the Microsoft Fabric's OneLake catalog and the capabilities it offers.
author: msmimart
ms.author: mimart
ms.reviewer: yaronc
ms.topic: overview
ms.date: 08/26/2026
ai-usage: ai-assisted
#customer intent: As data engineer, data scientist, analyst, decision maker, or business user, I want to learn about the OneLake catalog and the capabilities it offers.
---

# OneLake catalog overview

OneLake catalog is the central experience in Microsoft Fabric for discovering data, understanding governance status, and managing security across your Fabric environment. It's a centralized place that helps you find, explore, and use the Fabric items you need, and govern the data you own.

You access the catalog from the Fabric navigation pane. The catalog is also embedded in Microsoft Teams, Microsoft Excel, and Microsoft Copilot Studio so you can discover and act on items directly from these applications. You can also programmatically discover catalog metadata across workspaces by using the [Microsoft Fabric Catalog Search REST API](/rest/api/fabric/core/catalog/search).

OneLake catalog is organized into three experiences—Explore, Govern, and Secure.

:::image type="content" source="media/onelake-catalog-overview/onelake-catalog-overview-govern.png" alt-text="Screenshot of the OneLake catalog Govern tab showing Configurations and Tenant settings for Microsoft Fabric." lightbox="media/onelake-catalog-overview/onelake-catalog-overview-govern.png":::

The Govern tab in the OneLake catalog is where you understand your governance status, act on recommendations, and manage administrative settings for the data you own. Explore and Secure are the two other tabs in the OneLake catalog.

## Manage and govern your Fabric estate in Govern

Govern is the centralized experience for managing and governing organizational content in Microsoft Fabric.

In addition to governance capabilities such as domains, endorsements, metadata scanning, policies, and governance insights, Govern also provides access to administrative experiences including workspace management, capacity management, tenant settings, and other organization-wide controls.

As administrative capabilities continue to move from the Admin portal into Fabric, administrators can use Govern as their primary destination for managing and governing their organization's data estate.
<!-- TODO: confirm Govern-routing public by FabCon -->

## Find and understand data

The **[Explore tab](./onelake-catalog-explore.md)** is where you find and understand Fabric items. It has an items list with an in-context item details view that makes it possible to browse through and explore items without losing your list context. It also provides selectors and filters to narrow down and focus the list, making it easier to find what you need. By default, OneLake catalog opens on the Explore tab. You can also open and work across multiple workspaces side by side using the [object explorer](../fundamentals/fabric-home.md#multitask-with-tabs-and-object-explorer).

For more information, see [Discover and explore Fabric items in the OneLake catalog](./onelake-catalog-explore.md) and the [Microsoft Fabric Catalog Search REST API](/rest/api/fabric/core/catalog/search).

## Understand Governance Health

The **[Govern tab](./onelake-catalog-govern.md)** helps you understand and improve the **Governance Health** of the data you own in Fabric.

Govern provides a unified experience for governing and managing your organization's Fabric estate.

In the Govern tab, **Governance Insights** explain the current governance status of your data and highlight the areas that need attention, so you always know where you stand.

Administrative experiences are now surfaced within Govern. Fabric administrators can access governance insights, tenant configuration, workspace and capacity management, policies, and other administrative controls from a single location.
<!-- TODO: confirm Govern-routing public by FabCon -->

## Take action

After you understand your Governance Health, the Govern tab presents **Recommended Actions** you can take to improve the governance status of your data, along with guidance resources that help you act.

Govern serves both governance and administrative personas, helping organizations manage, secure, monitor, and govern their Fabric data estate from a centralized experience. A single person often holds more than one of these responsibilities—a Capacity Admin might also be a Fabric Admin, Domain Admin, Workspace Admin, or data owner—so Govern focuses on the outcome you want rather than on a single role.

For more information, see [Govern your data in Fabric](./onelake-catalog-govern.md).

## Secure data access

The **[Secure tab](./secure-your-data.md)** centralizes security management in Microsoft Fabric by providing a unified view of workspace roles and OneLake security roles across items. From a single location, you can review access, understand permissions, and manage security roles. Admins can audit permissions, view user access, and create, edit, or delete security roles to keep data access consistent.

For more information, see [Secure your data](./secure-your-data.md).

## Choose the right experience

| I want to… | Use | Where |
|---|---|---|
| Find, browse, and inspect Fabric items | Explore tab | OneLake catalog → Explore |
| Understand my Governance Health and act on Recommended Actions | Govern tab | OneLake catalog → Govern |
| Manage workspace and OneLake security roles, audit permissions, review user access | Secure tab | OneLake catalog → Secure |
| Search and explore catalog items and metadata programmatically | REST API | OneLake catalog REST API overview |

## Open OneLake catalog

To open OneLake catalog, select the OneLake icon in the Fabric navigation pane. Select the tab you're interested in if it isn't displayed by default.

:::image type="content" source="./media/onelake-catalog-overview/onelake-catalog-overview-general-view.png" alt-text="Screenshot showing the OneLake catalog." lightbox="./media/onelake-catalog-overview/onelake-catalog-overview-general-view.png":::

## Related content

**Discover**

* [Discover and explore Fabric items in the OneLake catalog](./onelake-catalog-explore.md)
* [Microsoft Fabric Catalog Search REST API](/rest/api/fabric/core/catalog/search)

**Govern**

* [Govern your data in Fabric](./onelake-catalog-govern.md)
* [Fabric domains](./domains.md)

**Secure**

* [Secure your data](./secure-your-data.md)
