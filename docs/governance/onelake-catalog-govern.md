---
title: Govern and manage your Fabric data with the OneLake catalog
description: Learn how the OneLake catalog's Govern section provides a unified experience for governing and managing your organization's Fabric data estate.
author: msmimart
ms.author: mimart
ms.reviewer: yaronc
ms.topic: overview
ms.date: 08/26/2026
ms.custom:
ai-usage: ai-assisted
#customer intent: As a Fabric admin or data owner, I want a single place to govern and manage my organization's Fabric data estate so that I can gain insights, act on recommendations, and reach administrative experiences from one location.
---
# Govern and manage your Fabric data estate with the OneLake catalog

The **Govern** section in the OneLake catalog is your centralized destination for governing and managing your organization's Fabric data estate.

Use Govern to assess and improve the governance status of data across your Fabric estate, act on recommended actions, and access governance and administrative experiences.

> [!NOTE]
> OneLake catalog and Govern are rolling out by region. If they're not available in your region,
> use the **Admin portal** to access the existing administration capabilities during the regional rollout.

## All data estate view

The **All data in Fabric** view gives you an organization-wide picture of the governance status of your Fabric estate. It's the default view when you have tenant-wide visibility, and it draws on the entire tenant metadata—from items through workspaces to capacities and domains (see [Considerations and limitations for exceptions](#considerations-and-limitations)).

The All data estate view surfaces:

* **Governance Insights** at a glance across the tenant.
* **Recommended Actions** to strengthen governance across the estate.
* Governance health signals across domains and subdomains, capacities, workspaces, and item counts, as currently documented.

The first time you open the **Govern** section, it might take a few moments for the insights and actions to appear. You can switch to the **My items** view to see the governance state of the items you own.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-left-rail-navigation.png" alt-text="Screenshot showing how to switch between views." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-left-rail-navigation.png":::

If your organization defines domains, you can use the OneLake catalog's [domain selector](./onelake-catalog-explore.md#scope-the-catalog-to-a-particular-domain) to choose a specific domain or subdomain. This action scopes the insights and recommended actions to items that reside within the selected domain.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-domains-selector.png" alt-text="Screenshot showing how to select a domain in the OneLake catalog." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-domains-selector.png":::

> [!NOTE]
> In the **All data estate** view, the domain filter doesn't apply to certain actions and those actions remain unchanged.

### Governance insights for the estate

The insights section provides a high-level snapshot of the current governance state of the entire Fabric tenant. Select **View more** to see all available insights.

These insights use data from the last successful refresh of the Admin Monitoring Storage, which is automatically generated in the Admin Monitoring workspace the first time you open the Govern section or access the Admin Monitoring workspace. The data refreshes automatically every day. (See [Considerations and limitations for exceptions](#considerations-and-limitations).)

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-insights-admins.png" alt-text="Screenshot showing the top governance insights for the All data estate view on the Govern section." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-insights-admins.png":::

<a id="govern-report"></a>
<a id="explore-the-comprehensive-report"></a>

Selecting **View more** gives you expanded governance, administration, and security insights for your Fabric data. The estate-wide report provides expanded insights across three tabs:

* **Manage your data estate** contains inventory overview, capacities and domains information, and details about feature usage across the tenant.

* **Protect, secure & comply** includes information about sensitivity label coverage and data loss prevention policies activated and scanned across the various workspaces in the organization.
   * The **Sensitivity labels** selector shows the most frequently used labels and the percentage of unlabeled items. Drill down by item type and user to identify labeling gaps and policy misalignment. Review a complete inventory of labels, or analyze label distribution by domain or workspace, to understand how labels are applied across the tenant.
   * The **DLP** selector shows the workspaces or data items evaluated by DLP policies, helping you identify policy violations and take action, such as applying a more restrictive label or removing sensitive information. Break down scanned items by type or location, and review the last evaluation time to assess data freshness and trigger a new scan if needed.

* **Discover, trust, and reuse** surfaces insights about data freshness, item curation state, description and endorsement coverage, and content sharing.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-view-more-report-admins.png" alt-text="Screenshot showing the view more report for the estate." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-view-more-report-admins.png":::

In the report, you can filter, drill through to get more details, and initiate Copilot at any point to gain more insights and support comprehensive, interactive data exploration (see [Considerations and limitations for exceptions](#considerations-and-limitations)).

### Recommended actions for the estate

The **Recommended Actions** section displays cards suggesting actions you can take to improve the governance posture across the estate. When you select a card, you see an insight highlighting the issue, an explanation of why the issue matters, and a list of steps about how to address the issue.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions-admins.png" alt-text="Screenshot showing the recommended actions section for the estate." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions-admins.png":::

Example of a recommended action card:

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions-admins-example.png" alt-text="Screenshot showing an example of a recommended action card." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions-admins-example.png":::

The recommended actions vary depending on what the insights reveal.

## My data view

The **My items** view scopes governance to the items you own - the items that appear when you apply the **My items** filter in the [Explore section](./onelake-catalog-explore.md) (see [Considerations and limitations for exceptions](#considerations-and-limitations)).

The **My data** view surfaces:

* **Governance Insights** scoped to the items you own.
* **Recommended Actions** for a data owner's items.
* Ownership-scoped governance signals, as currently documented.

### Governance insights for your items

In the **My items** view, the insights section shows high-level insights about the content you create in Fabric. Select **View more** to see all available insights.

These insights use data from the last successful refresh of your OneLake catalog governance report. The data refreshes automatically every time you open the **Govern** section. Select the **Refresh** button to make sure you have the latest data.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-governance-status.png" alt-text="Screenshot showing the top governance insights for a data owner on the Govern section." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-governance-status.png":::

Selecting **View more** opens a simplified report with more insights about your inventory, sensitivity label coverage, and curation state.

:::image type="content" source="./media/onelake-catalog-govern/OneLake-catalog-govern-view-more-data-owners.png" alt-text="Screenshot showing the view more report for a data owner." lightbox="./media/onelake-catalog-govern/OneLake-catalog-govern-view-more-data-owners.png":::

### Recommended actions for your items

The **Recommended Actions** section displays cards suggesting actions you can take to improve the governance posture of the items you own. Recommended actions in the **My items** view also include the ability to view all entities associated with a recommended action, including items, workspaces, and more, and open any of them with a single click.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions.png" alt-text="Screenshot showing the recommended actions section for a data owner." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions.png":::

Example of a recommended action page for a data owner:

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions-my-items.png" alt-text="Screenshot showing an example of a recommended action page in My items: review all related entities and open each one directly." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions-my-items.png":::

## Governance experiences in the Govern section

The Govern section brings Fabric's governance capabilities together in one destination. Each of the following capabilities is publicly documented today:

* [**Domains**](domains.md) — organize your data estate into domains and subdomains.
* [**Tags**](tags-overview.md) — classify and find items with organizational tags.
* [**Endorsement**](endorsement-overview.md) — signal the trust level of items across the estate.
* [**Metadata scanning**](metadata-scanning-overview.md) — extract and catalog metadata across the tenant.
* [**Cross-tenant sharing discovery**](external-data-sharing-overview.md) — understand where data is shared beyond your tenant.
* **Policies** — define and apply governance policies across your Fabric estate.

## Administrative experiences in the Govern section

The following administrative experiences are available from Govern:

* [**Capacities**](../admin/capacity-settings.md)
* [**Workspaces**](../admin/portal-workspaces.md)
* [**Configurations**](../admin/tenant-settings-index.md) — access tenant settings and Help and support links.
* [**Azure connections**](../admin/service-admin-portal-azure-connections.md)
* [**Workloads**](../fundamentals/fabric-home.md#create-items-and-explore-workloads)
* [**Organizational themes**](/power-bi/create-reports/desktop-organizational-themes)
* [**Fabric identities**](../admin/fabric-identities-manage.md)
* [**Branding settings**](../admin/service-admin-custom-branding.md)

## Who the Govern section is for

A single person often holds multiple responsibilities. The same individual might be a Capacity Admin, a Fabric Admin, a Domain Admin, a Workspace Admin, and a Data Steward. Because of this overlap, the Govern section is organized around what you're trying to do rather than around isolated personas. Whatever combination of roles you hold, you can use the Govern section to:

* **Find** the data and administrative controls relevant to your responsibilities.
* **Understand** the governance status of your estate through Governance Insights.
* **Act** on Recommended Actions to improve governance posture.
* **Secure and manage** your estate through governance capabilities and administrative experiences in one place.

The entries you see in Govern depend on your permissions:

* Users without admin permissions see **Configurations**, with Help and support entries only, when this experience is enabled for their tenant.
* Domain admins see **Configurations**, with Help and support entries, and **Domains**.
* Capacity admins see **Configurations**, with Help and support entries, and **Capacities**.

## Open the Govern section

To open the Govern section, select the [OneLake catalog icon in the Fabric navigation pane](./onelake-catalog-overview.md) and then select **Govern**.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-open.png" alt-text="Screenshot showing how to open the Govern section in the OneLake catalog." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-open.png":::

You can also access the Govern section from the settings gear by selecting the **OneLake Catalog | Govern** link.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-settings-gear.png" alt-text="Screenshot showing how to open the Govern section from the settings panel." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-settings-gear.png":::

### Use Quick access

The **Quick access** section connects you to common administration experiences:

| Card | Use it to |
| --- | --- |
| [Admin monitoring workspace](../admin/monitoring-workspace.md) | Monitor activity across your organization and gain insights from tenant-wide reports. |
| [Manage users](../admin/service-admin-portal-users.md) | Manage Fabric users, groups, and administrators in the Microsoft 365 admin center. |
| [Audit logs](../admin/service-admin-portal-audit-logs.md) | View tenant activity and export audit logs in the Microsoft Purview portal. |

The Govern section also provides links to tools and resources relevant to your scope of responsibility:

* **Top solutions**: Lists relevant Microsoft Fabric solutions for data governance, compliance, and security, along with links to documentation.
* **Read, watch, and learn**: Provides links to other relevant documentation and resources.

### Create custom reports

To customize a report, create a copy of the report and modify the copy, or create a new report based on the autogenerated semantic model.

> [!IMPORTANT]
> Don't modify the original autogenerated report or semantic model. Govern requires these artifacts to provide insights, and changes can cause the experience to stop working.

### Troubleshooting

- For the *My items* view, if the data isn't refreshing as expected, check the notifications pane and the Monitor page to see if you can identify the cause. If refresh fails repeatedly, or if you can't figure out what's causing it to fail, try regenerating the report. To do so, close the Govern section, and delete the OneLake catalog governance report and its associated semantic model from your *My workspaces*. Then reopen the Govern section.

### Considerations and limitations

The following list describes considerations and limitations when using the Govern section:

* **Subitems** - Subitems such as tables aren't supported and don't appear in insights.
* **Cross tenant** - The Govern section doesn't support cross-tenant scenarios or guest users.
* **Private Link** - The Govern section isn't available when Private Link is activated.
* ***View more* reports** - 
  * Copilot functionality depends on organizational setup and the capacity the workspace is assigned with. The workspace (*admin monitoring workspace* for the estate view and *My workspaces* for the data owner view) should be allocated to the appropriate capacity in order to activate the Copilot button.
  * Items of third-party workloads aren't included in the charts.
* **Data refresh** - Because estate insights, recommended actions, and *view more* reports are based on admin monitoring storage that refreshes once a day, there could be gaps between the data reflected and the actual state. It takes a day to get an updated view of all the changes made in the organization.
* ***Admin monitoring* workspace** - 
  * If you reassign the *Admin monitoring* workspace or *My workspace* to another capacity, you might get an error when accessing the Govern section of the OneLake catalog. In such cases, ensure the newly assigned capacity has enough resources to run the semantic models and reports.
  * All users viewing content in the admin monitoring workspace, including the estate report, must have a Power BI Pro license, unless the workspace is assigned to a capacity.
  * The estate semantic model is read-only and can't be used with Fabric data agents.

## Related content

**Discover and trust**

* [OneLake catalog overview](./onelake-catalog-overview.md)
* [Discover and explore Fabric items in the OneLake catalog](./onelake-catalog-explore.md)

**Govern and manage**

* [Governance documentation](index.yml)
* [Governance and compliance overview](governance-compliance-overview.md)
* [Fabric administration documentation](../admin/index.yml)
* [Domains](domains.md)
* [Administer Microsoft Fabric](https://go.microsoft.com/fwlink/?linkid=2321486)

**Secure and comply**

* [Sensitivity labels](information-protection.md)
* [Data protection](protection-policies-overview.md)
* [Use Microsoft Purview with Microsoft Fabric](microsoft-purview-fabric.md)
