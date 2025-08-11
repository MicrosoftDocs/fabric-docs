---
title: Govern your Fabric data with the OneLake catalog
description: Use the OneLake catalog's govern tab to get insights about the governance posture of the data you own in Fabric and guidance about how to improve it.
author: msmimart
ms.author: mimart
ms.reviewer: yaronc
ms.topic: overview
ms.date: 02/03/2025
ms.custom:
#customer intent: As data owner, I want to learn about OneLake catalog's Govern tab, and use it's capabilities to get insights about and govern the data in Fabric that I own.
---

# Govern your Fabric data

OneLake catalog's govern tab helps you analyze, improve, and monitor the governance posture of the data you own across Fabric. It centralizes in one place:

* [Insights](#get-insights-about-the-governance-status-of-your-data) that help you understand the governance status of your data and identify areas for improvement.

* [Recommended actions](#improve-the-governance-posture-of-your-data) you can take to improve your data's governance posture. The recommended actions are accompanied by guidance to help you accomplish them.

* [Links to tools and learning resources](#get-help-with-your-data-governance-efforts) you can use to help you analyze, improve, and maintain the governance of the data you own in Fabric.

The insights that you see on the govern tab are based on all the items in Fabric that you own. These are the items that can appear when you apply the **My items** filter on the [explore tab](./onelake-catalog-explore.md) (see [Considerations and limitations for exceptions](#considerations-and-limitations)).

The first time you open the govern tab, it might take a few moments for the insights and recommended actions to appear.

## Open the govern tab

To get to the govern tab, select the [OneLake catalog icon in the Fabric navigation pane](./onelake-catalog-overview.md) and then select the govern tab.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-open.png" alt-text="Screenshot showing how to open govern tab in the OneLake catalog." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-open.png":::

## Scope the insights and recommended actions by domain

If your organization has defined domains, you can use the OneLake catalog's [domain selector](./onelake-catalog-explore.md#scope-the-catalog-to-a-particular-domain) to choose a specific domain or subdomain. This will scope the insights and recommended actions to items that reside within the selected domain.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-domains-selector.png" alt-text="Screenshot showing how to select a domain in the OneLake catalog." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-domains-selector.png":::

## Get insights about the governance status of your data

The govern tab gives you basic, high-level insights about the content you've created in Fabric, and provides a link to a page with [more insights](#all-insights). The data in the insights is based on the last successful refresh of the OneLake catalog governance report that was automatically generated in your My workspace the first time you opened the govern tab. The data refreshes automatically every time you open the govern tab. You can also select the Refresh button if you want to make sure that you've got the latest data.

Select **View more** to see [all available insights](#all-insights), which include insights about sensitivity label coverage and item metadata.

### Your governance status at a glance

This section provides basic high-level insights about the content you've created in Fabric. The data in these insights is based on the last successful refresh of your OneLake catalog governance report. The data refreshes automatically every time you open the govern tab. You can also select the Refresh button if you want to make sure that you've got the latest data.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-governance-status.png" alt-text="Screenshot showing the top insights on the govern tab." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-governance-status.png":::

| Insight | What does it show and why is it important |
|:--------|:--------|
| **Summary** | Shows you at a glance how many items you own, how many workspaces they're spread over, and how many domains and subdomains you have items associated with. |
| **Items you own by type** | Shows you at a glance how your data is distributed over different item types. |
| **Items you own by last refresh date** | Shows you at a glance how current your data is. Regularly refreshing items ensures that data remains current and relevant, and reduces the risk of outdated or unused items cluttering up the system. Review the list of items that haven’t been refreshed recently to identify outdated items and reduce maintenance costs. |
| **Items with description** | Descriptions provide essential context for users to understand and effectively use your data. Lack of an informative description can lead to misunderstandings and/or limit data usability, and hinder reuse. |
| **Items by your last access date** | Reviewing rarely visited items helps you identify outdated or unused data. This can help you reduce the number of unnecessary items and free up resources for more relevant content. |

## Take actions to improve the governance posture of your data

The recommended actions section displays cards suggesting actions you can take to improve the governance posture of the data you own. When you select a card, you see an insight about your data, an explanation of why the issue revealed by the insight matters, and a list of steps about how to address the issue.
The recommended actions vary depending on what the insights reveal about your data.

Examples of recommended actions include refreshing potentially outdated items, improving metadata curation by adding tags or descriptions to enhance visibility and reuse across your organization, and protecting items with sensitivity labels if your organization has sensitivity labeling enabled but your coverage is low.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions.png" alt-text="Screenshot showing the recommended action guidance tool-tip.":::

### All insights

#### Your data estate

The Your data estate insights provide an overview of the content you've created in Fabric to help you identify actions you can take to improve your content's governance posture.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-your-data-estate.png" alt-text="Screenshot showing the your data estate insights on the OneLake catalog govern tab." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-your-data-estate.png":::

| Insight | What does it show and why is it important |
|:--------|:--------|
| **Domains, Subdomains, Workspaces, Items** | Shows you how many items you own, how many domains your items are associated with, and how many workspaces they're spread across. |
| **Data hierarchy** | Shows you where your data is located. The visual is interactive, and enables you to drill down through the hierarchy from the domain level to the level of the individual items. |
| **Workspace assignment to domains** | Shows you how many workspaces are assigned to a domain. |
| **Items by type** | Shows you how many items you own by type. |
| **Items by last refresh** | Shows you how current your data is. Regularly refreshing items ensures that data remains current and relevant, and reduces the risk of outdated or unused items cluttering up the system. Review the list of items that haven’t been refreshed recently to identify outdated items and reduce maintenance costs.|
| **Items last refreshed more than 4 months ago** | Data that hasn't been refreshed in over four months is likely to be stale and could indicate a refresh problem. |
| **Items by your last access date** | Reviewing rarely visited items helps you identify outdated or unused data. This can help you reduce the number of unnecessary items and free up resources for more relevant content. |
| **Items that failed last refresh by type** | Shows you the number and type of your data items that failed to successfully refresh on their most recent refresh attempt. |

#### Sensitivity label coverage

Sensitivity labels help users understand the sensitivity of the data they work with. Moreover, some organizations might use sensitivity labels to apply access control on sensitive data. Hence unlabeled items represent a potential security risk, both because users are more likely to make inappropriate use of such data, and because there's no protection in the case of accidental exposure to unauthorized users.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-sensitivity-label-coverage.png" alt-text="Screenshot showing the sensitivity label coverage insights on the OneLake catalog govern tab." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-sensitivity-label-coverage.png":::

| Insight | What does it show and why is it important |
|:--------|:--------|
| **Sensitivity  label coverage** | Shows you what percentage of the items you own have a sensitivity label applied. |
| **Items per sensitivity label** | Shows you how much each sensitivity label is used. This information might serve as a preliminary indication of whether the correct labels are being applied to your data. |
| **Unlabeled items by type** | Seeing which type of items are unlabeled might help you identify a problem in your labeling strategy. |
| **Unlabeled items that were recently refreshed** | Recently refreshed items often contain updated or active data. Without sensitivity labels, they could be accidentally shared, creating compliance and/or security risks.|
| **Your unlabeled items you recently visited** | Recently visited items that don't have sensitivity labels are at risk of unauthorized access or misuse, as their security level is unknown and they lack the protections that they might have gotten if they had the appropriate sensitivity label. |

#### Discover, trust, and reuse

The visuals in the Discover, trust, and reuse section provide insights about item metadata attributes such as endorsement status, description, and tags. For more information about endorsement, see [Endorsement overview](./endorsement-overview.md). For more information about tags, see [Tags in Microsoft Fabric](./tags-overview.md).

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-metadata-attributes.png" alt-text="Screenshot showing the discover, trust, and reuse insights on the OneLake catalog govern tab." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-metadata-attributes.png":::

| Insight | What does it show and why is it important |
|:--------|:--------|
| **Master Data, Certified, Promoted** | Shows you how many items have been endorsed with each endorsement type. A small number of certified items might indicate that most of the data hasn't gone through the certification process and might not meet quality standards. Increase the number of certified items to promote trust in the data. |
| **Unendorsed items by type** | Endorsing items as Master data, Certified, or Promoted increases trust and reuse. When data isn't endorsed, people are more likely to create more duplicates, leading to discovery, security, and capacity issues. |
| **Items with description** |Descriptions provide essential context for users to understand and effectively use your data. Lack of an informative description can lead to misunderstandings and/or limit data usability, as well as hinder reuse.|
| **Items without description by type** | Helps you focus on what kinds of items are missing a description. |
| **Tagged items by type** | Helps you understand the different types of content being tagged. |
| **Untagged items by type** | Tags enhance searchability. By tagging frequently accessed content and recently visited items can help users locate valuable resources quickly. |

## Improve the governance posture of your data

The recommended actions section displays cards suggesting actions you can take to improve the governance posture of the data you own. When you select a card, you see an insight about your data, an explanation of why the issue revealed by the insight matters, and a list of steps about how to address the issue.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-recommended-actions.png" alt-text="Screenshot showing the recommended action guidance tool-tip.":::

The recommended actions vary depending on what the insights reveal about your data.

## Get help with your data governance efforts

The govern tab provides links to tools and resources you can use to help you keep your data healthy from the standpoint of governance:

* **Top solutions**: Lists relevant Microsoft Fabric solutions for data governance, compliance, and security, along with links to documentation.

* **Read, watch, and learn** Provides links to other relevant documentation and resources.

## Create custom reports

The first time you open the govern tab, a report and semantic model named *OneLake catalog governance report (automatically generated)* are generated in your My workspace. The data in these items refreshes every time you visit the govern tab or select the **Refresh** button on the tab.

If you wish to customize the report, either create a copy of the report and then modify the copy, or create a new report based on the autogenerated semantic model. **DO NOT** under any circumstances modify the original autogenerated report or semantic model. They are required for the proper functioning of the govern tab's insights, and any changes you make to these items will likely cause the insights to cease working properly.

## Troubleshooting

If the data isn't refreshing as expected, check the notifications pane and the [Monitor page](/fabric/admin/monitoring-hub) to see if you can identify the cause. If refresh fails repeatedly, or if you can't figure out what's causing it to fail, try regenerating the report by closing the govern tab, deleting the OneLake catalog governance report and its associated semantic model from your My workspace, and then opening the govern tab once again.

## Considerations and limitations

* Sub-items, such as tables, are not supported and don't figure into the insights.

* The govern tab doesn't support cross-tenant scenarios.

## Related content

* [OneLake catalog overview](./onelake-catalog-overview.md)
* [Discover and explore Fabric items in the OneLake catalog](./onelake-catalog-explore.md)
* [Endorsement](./endorsement-overview.md)
* [Fabric domains](./domains.md)
* [Lineage in Fabric](./lineage.md)
* [Monitor hub](../admin/monitoring-hub.md)