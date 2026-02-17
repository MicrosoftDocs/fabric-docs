---
title: Govern your Fabric data with the OneLake catalog
description: Fabric admins and data owners can use the OneLake catalog's Govern tab to gain insights on their scope of responsibility and guidance about how to improve it.
author: msmimart
ms.author: mimart
ms.reviewer: yaronc
ms.topic: overview
ms.date: 11/12/2025
#customer intent: As a Fabric admin, I would like to gain visibility on my organization governance state and improve it in one central place. As data owner, I want to learn about OneLake catalog's Govern tab and use its capabilities to get insights about and govern the data in Fabric that I own.
---
# Govern Fabric data

The Govern tab in the OneLake catalog enables you to assess, enhance, and oversee the governance status of the data you manage throughout Fabric. It brings everything together in a single location:
* [Insights](#get-insights-about-the-governance-status) that help you understand the governance status of data and identify areas for improvement.
* [Recommended actions](#take-actions-to-improve-the-governance-posture) you can take to improve data's governance posture. The recommended actions are accompanied by guidance to help you accomplish them.
* [Links to tools and learning resources](#get-help-with-your-data-governance-efforts) you can use to help you analyze, improve, and maintain the governance of the data in Fabric.

As a Fabric admin, the insights you see on the Govern tab are based on the entire tenant metadata, from items through workspaces to capacities and domains (see [Considerations and limitations for exceptions](#considerations-and-limitations)).

As a data owner, the insights you see are based on all the items in Fabric that you own. These items appear when you apply the **My items** filter on the [explore tab](./onelake-catalog-explore.md) (see [Considerations and limitations for exceptions](#considerations-and-limitations)).

To get to the Govern tab, select the [OneLake catalog icon in the Fabric navigation pane](./onelake-catalog-overview.md) and then select **Govern**.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-open.png" alt-text="Screenshot showing how to open the Govern tab in the OneLake catalog." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-open.png":::

You can also access the Govern tab from the settings gear by selecting the **OneLake Catalog | Govern** link.  

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-settings-gear.png" alt-text="Screenshot showing how to open the Govern tab from setting panel." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-settings-gear.png":::

## Governance information 

The first time you open the Govern tab, it might take a few moments for the insights and actions to appear.

When Fabric Admins access the Govern tab, they see **All Data in Fabric** by default. They can switch to their own items' governance state by selecting **My items**. Data owners see their own items view by default.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-left-rail-navigation.png" alt-text="Screenshot showing how admins can switch between views." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-left-rail-navigation.png":::

## Scope the insights and recommended actions by domain

If your organization defines domains, you can use the OneLake catalog's [domain selector](./onelake-catalog-explore.md#scope-the-catalog-to-a-particular-domain) to choose a specific domain or subdomain. This action scopes the insights and recommended actions to items that reside within the selected domain.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-domains-selector.png" alt-text="Screenshot showing how to select a domain in the OneLake catalog." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-domains-selector.png":::

> [!NOTE]
> For Fabric admins, the domain filter doesn't apply to certain actions and those actions remain unchanged.

## Get insights about the governance status

The insights section provides a snapshot of the current governance state of your data.

### Insights for Fabric admins

For Fabric admins, the insights section provides high-level insights about the entire Fabric tenant. Select **View more** to see [all available insights](#all-insights).

These insights use data from the last successful refresh of the Admin Monitoring Storage, which is automatically generated in the Admin Monitoring workspace the first time an admin opens the Govern tab or accesses the Admin Monitoring workspace. The data refreshes automatically every day. (See [Considerations and limitations for exceptions](#considerations-and-limitations).)

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-insights-admins.png" alt-text="Screenshot showing the top insights for Fabric admins on the Govern tab." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-insights-admins.png":::

### Insights for data owners

For data owners, the insights section in the My Items view shows basic high-level insights about the content you create in Fabric. Select **View more** to see [all available insights](#all-insights).

These insights use data from the last successful refresh of your OneLake catalog governance report. The data refreshes automatically every time you open the Govern tab. Select the Refresh button to make sure you have the latest data.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-governance-status.png" alt-text="Screenshot showing the top insights for data owners on the Govern tab." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-governance-status.png":::

## All insights

Selecting **View more** in the insights section gives you expanded insights for your Fabric data.

Fabric admins see a report that provides access to expanded insights across three tabs:

* **Manage your data estate** contains inventory overview, capacities & domains information and details about feature usage across the tenant. 

* **Protect, secure & comply** includes information about sensitivity label coverage and data loss prevention policies activated and scanned across the various workspaces in the organization.

* **Discover, trust, and reuse** surfaces insights about data freshness, item curation state with information about description and endorsement coverage and content sharing view.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-view-more-report-admins.png" alt-text="Screenshot showing the view more report for admins." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-view-more-report-admins.png":::

Data owners see a simplified report with more insights about their inventory, sensitivity label coverage, and curation state. 

:::image type="content" source="./media/onelake-catalog-govern/OneLake-catalog-govern-view-more-data-owners.png" alt-text="Screenshot showing the view more report for data owners." lightbox="./media/onelake-catalog-govern/OneLake-catalog-govern-view-more-data-owners.png":::

In both reports, you can filter, drill through to get more details and initiate Copilot at any point to gain more insights and support comprehensive, interactive data exploration (see [Considerations and limitations for exceptions](#considerations-and-limitations)).

## Take actions to improve the governance posture

The recommended actions section displays cards suggesting actions you can take to improve the governance posture of the data. When you select a card, you see an insight highlighting the issue, an explanation of why the issue revealed by the insight matters, and a list of steps about how to address the issue.

Recommended actions for Fabric admins: 

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions-admins.png" alt-text="Screenshot showing the recommended action section for admins." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions-admins.png":::

Recommended actions for data owners: 

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions.png" alt-text="Screenshot showing the recommended action section for data owners." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions.png":::

Example of recommended action card:

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions-admins-example.png" alt-text="Screenshot showing an example of a recommended action card." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions-admins-example.png":::

The recommended actions vary depending on what the insights reveal.

## Get help with your data governance efforts

The Govern tab provides links to tools and resources relevant to your scope of responsibility:

* **Top solutions**: Lists relevant Microsoft Fabric solutions for data governance, compliance, and security, along with links to documentation.

* **Read, watch, and learn** Provides links to other relevant documentation and resources.

## Create custom reports

If you wish to customize the report, either create a copy of the report and then modify the copy, or create a new report based on the autogenerated semantic model. 

> [!IMPORTANT]
> **Do not** under any circumstances modify the original autogenerated report or semantic model. They're required for the proper functioning of the Govern tab's insights, and any changes you make to these items can cause the insights to cease working properly.

## Troubleshooting

If *admin monitoring workspace* or *My workspaces* are reassigned to another capacity, users could get an error when accessing the Govern tab in the OneLake Catalog. In such cases, ensure the newly assigned capacity has enough resources to run the semantic models and reports or try to reallocate the workspaces to another capacity.

For the *My items* view, if the data isn't refreshing as expected, check the notifications pane and the Monitor page to see if you can identify the cause. If refresh fails repeatedly, or if you can't figure out what's causing it to fail, try regenerating the report. To do so, close the Govern tab, and delete the OneLake catalog governance report and its associated semantic model from your My workspaces. Then reopen the Govern tab.

## Considerations and limitations

The following are some considerations and limitations when using the Govern tab:

* Subitems, such as tables, aren't supported and don't surface into the insights.
* The Govern tab doesn't support cross-tenant scenarios or guest users
* The Govern tab isn't available when Private Link is activated.
* Copilot functionality depends on organizational setup and the capacity the workspace is assigned with. The workspace (*admin monitoring workspace* for the admin view and *My workspaces* for the data owners view) should be allocated to the appropriate capacity in order to activate the Copilot button.
* Because admin insights, recommended actions, and view more reports are based on admin monitoring storage that refreshes once a day, there could be gaps between the data reflected and the actual state. It takes a day to get an updated view of all the changes made in the organization.
* If *admin monitoring workspace* or *My workspaces* are reassigned to another capacity, users could get an error when accessing the Govern tab in the OneLake Catalog. In such cases, ensure the newly assigned capacity has enough resources to run the semantic models and reports.
* All users viewing content in the admin monitoring workspace, including the admins report, must have a Power BI Pro license, unless the workspace is assigned to a capacity.
* The admins semantic model is read-only and can't be used with Fabric data agents.

## Related content

* [OneLake catalog overview](./onelake-catalog-overview.md)
* [Discover and explore Fabric items in the OneLake catalog](./onelake-catalog-explore.md)
* [Administer Microsoft Fabric](https://go.microsoft.com/fwlink/?linkid=2321486)
