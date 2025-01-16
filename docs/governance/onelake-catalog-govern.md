---
title: Discover and explore Fabric items in the OneLake catalog
description: Learn how to discover, explore, manage, and use your organization's Fabric items in the OneLake catalog.
author: paulinbar
ms.author: painbar
ms.reviewer: yaronc
ms.topic: overview
ms.date: 01/12/2025
ms.custom:
#customer intent: As data owner, I want to learn about OneLake catalog's Govern tab, and use it's capabilities to get insights about and govern the data in Fabric that I own.
---

# Govern your data in Fabric

OneLake catalog's govern tab is a centralized place to help you analyze, improve, and monitor the governance posture of the data you own across Fabric. The govern tab provides:

* Insights that help you understand the governance status of your data and identify areas for improvement.

* Recommended actions you can take to improve your data's governance posture. The recommended actions are accompanied by guidance to help you accomplish them.

* Links to tools and learning resources you can use to help you analyze, improve, and maintain the governance of the data you own in Fabric.

## Open the govern tab

To open the govern tab, select the OneLake catalog icon in the Fabric navigation pane and then select the govern tab.

:::image type="content" source="./media/onelake-catalog-govern/onelake-catalog-govern-tab-open.png" alt-text="Screenshot showing how to open the OneLake catalog." lightbox="./media/onelake-catalog/onelake-catalog-open.png":::

## Data refresh

The data shown in the insights visuals reflects the last successful refresh of the the OneLake catalog report located in your My workspace. The data automatically refreshes whenever you visit the govern tab. You can also manually refresh the data on demand using the **Refresh** button on the govern tab.

If the data is not refreshing as expected, check the notifications pane and the [Monitor page](/fabric/admin/monitoring-hub). If case of repeated failure, or if you can't figure out what's causing the failure, try regenerating the report by closing the govern tab, deleting the OneLake catalog governance report and its associated semantic model from your My workspace, and then opening the govern tab once again.

## Considerations and limitations

* The govern tab doesn't currently support cross-tenant scenarios.

* Currently, only insights are filtered according to OneLake catalog's domain filter. This means that if you set the filter to a given domain, the only insights you'll see are those that are related to the selected domain domain, but you might see recommended actions that are related to items associated with other domains as well.

## Related content

* [Endorsement](./endorsement-overview.md)
* [Fabric domains](./domains.md)
* [Lineage in Fabric](./lineage.md)
* [Monitor hub](../admin/monitoring-hub.md)