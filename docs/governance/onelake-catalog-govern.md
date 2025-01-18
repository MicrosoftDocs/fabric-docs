---
title: Govern your data in Fabric 
description: Use the OneLake catalog's govern tab to get insights about the governance posture of the data you own in Fabric and guidance about how to improve it.
author: paulinbar
ms.author: painbar
ms.reviewer: yaronc
ms.topic: overview
ms.date: 01/18/2025
ms.custom:
#customer intent: As data owner, I want to learn about OneLake catalog's Govern tab, and use it's capabilities to get insights about and govern the data in Fabric that I own.
---

# Monitor and improve your data's governance posture with the OneLake catalog

OneLake catalog's govern tab is a centralized place to help you analyze, improve, and monitor the governance posture of the data you own across Fabric. The govern tab provides:

* Insights that help you understand the governance status of your data and identify areas for improvement.

* Recommended actions you can take to improve your data's governance posture. The recommended actions are accompanied by guidance to help you accomplish them.

* Links to tools and learning resources you can use to help you analyze, improve, and maintain the governance of the data you own in Fabric.

## Open the govern tab

To get to the govern tab, select the OneLake catalog icon in the Fabric navigation pane and then select the govern tab.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-open.png" alt-text="Screenshot showing how to open the OneLake catalog.":::

## Get insights about the governance status of your data


### Top insights

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-governance-status.png" alt-text="Screenshot showing the top insights on the govern tab." lightbox="./media/onelake-catalog-govern/onelake-catalog-govern-tab-governance-status.png":::

| Insight | What does it show and why is it important |
|:--------|:--------|
| **Summary** | Shows you at a glance how many items you own, how many workspaces they're spread over, and how many domains you have items associated with. |
| **Items you own by type** | Shows you at a glance how your data is distributed over different item types. |
| **Items you own by last refresh date** | Shows you at a glance how current your data is. Regularly refreshing items ensures that data remains current and relevant, and reduces the risk of outdated or unused items cluttering up the system. Review the list of items that haven’t been refreshed recently to identify outdated items and reduce maintenance costs. |
| **Items with description** | Descriptions provide essential context for users to understand and effectively use your data. Lack of an informative description can lead to misunderstandings and/or limit data usability, as well as hinder reuse. |
| **Items by your last access date** | Reviewing rarely visited items helps you identify outdated or unused data. This can help you reduce the number of unnecessary items and free up resources for more relevant content. |

### All insights

#### Your data estate

| Insight | What does it show and why is it important |
|:--------|:--------|
| **Domains, Workspaces, Items** | Shows you how many items you own, how many domains your items are associated with, and how many workspaces they're spread across. |
| **Data hierarchy** | Shows you where your data is located. The visual is interactive, and enables you to drill down through the hierarchy from the domain level to the level of the individual items. |
| **Workspace assignment to domains** | Shows you how many workspaces as assigned to a domain. |
| **Items by type** | Shows you how many items you own by type. |
| **Items by last refresh** | Shows you how current your data is. Regularly refreshing items ensures that data remains current and relevant, and reduces the risk of outdated or unused items cluttering up the system. Review the list of items that haven’t been refreshed recently to identify outdated items and reduce maintenance costs.|
| **Items last refreshed more than 4 months ago** | Data that hasn't been refreshed in over four months is quite likely to be stale and could indicate a refresh problem. |
| **Items by your last access date** | Reviewing rarely visited items helps you identify outdated or unused data. This can help you reduce the number of unnecessary items and free up resources for more relevant content. |
| **Items you last visited more than 4 months ago** | Shows you the number and type of items that you should review to make sure that they are still current and needed. |

#### Sensitivity label coverage

Sensitivity labels help users understand the sensitivity of the data they work with. Moreover, some organizations mightt use sensitivity labels to apply access control on sensitive data. Hence unlableled items represent a potential security risk, both because users are more likely to make inappropriate use such data, and because there is no protection in the case of accidental exposure to non-authorized users.

| Insight | What does it show and why is it important |
|:--------|:--------|
| **Sensitivity  label coverage** | Shows you what percentage of the items you own have a sensitivity label applied. |
| **Items per sensitivity label** | Shows you how much each sensitivity label is used. This information might be used as a preliminary indication of whether the correct labels are being applied to your data. |
| **Unlabeled items by type** | Seeing which type of items are unlabeled might help you identify a problem in your labeling strategy. |
| **Unlabeled items that were recently refreshed** | Recently refreshed items often contain updated or active data. Without sensitivity labels, they could be accidentally shared, creating compliance and/or security risks.|
| **Your unlabled items you recently visited** | Recently visited items that don't have sensitivity labels are at risk of unauthorized access or misuse, as their security level is unknown and they lack the protections that they might have gotten if they had the appropriate sensitivity label. |

#### Discover, trust, and reuse

Metadata attributes such as endorsement, description, and tags

| Insight | What does it show and why is it important |
|:--------|:--------|
| **Master Data, Certified, Promoted** ||
| **Unendorsed items by type** ||
| **Items with description** ||
| **Items without description by type** ||
| **Tagged items by type** ||
| **Untagged items by type** ||

### OneLake catalog governance report

### Data refresh

The data shown in the insights visuals reflects the last successful refresh of the the OneLake catalog report located in your My workspace. The data automatically refreshes whenever you visit the govern tab. You can also manually refresh the data on demand using the **Refresh** button on the govern tab.

If the data is not refreshing as expected, check the notifications pane and the [Monitor page](/fabric/admin/monitoring-hub). If case of repeated failure, or if you can't figure out what's causing the failure, try regenerating the report by closing the govern tab, deleting the OneLake catalog governance report and its associated semantic model from your My workspace, and then opening the govern tab once again.

## Improve your data's governance posture

## Get help with your data governance efforts

## Considerations and limitations

* The govern tab doesn't currently support cross-tenant scenarios.

* Currently, only insights are filtered according to OneLake catalog's domain filter. This means that if you set the filter to a given domain, the only insights you'll see are those that are related to the selected domain domain, but you might see recommended actions that are related to items associated with other domains as well.

## Related content

* [Endorsement](./endorsement-overview.md)
* [Fabric domains](./domains.md)
* [Lineage in Fabric](./lineage.md)
* [Monitor hub](../admin/monitoring-hub.md)