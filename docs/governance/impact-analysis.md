---
title: Impact analysis
description: Learn how to visualize and analyze the downstream impact of making changes to Fabric items.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.service: azure
ms.date: 05/23/2023
---

# Impact analysis

When you make changes to a Fabric item, or are considering making changes, it's important to be able to assess the potential impact of those changes on downstream items that depend on that item. **Impact analysis** provides you with information that can help you make this assessment.

* It shows you how many workspaces and Fabric items might be affected by your change, and provides easy navigation to the workspaces where the affected items are located so that you can investigate further. For data sources, it shows you the path to the data source.
* It provides an easy way to notify the relevant people about a change you made or are thinking about making.

## Open impact analysis for an item

You can open an item's impact analysis from its card in lineage view, or from the **Lineage** option on the items detail's page.

* From a card in lineage view:

    :::image type="content" source="./media/impact-analysis/open-impact-analysis-from-card.png" alt-text="Screenshot of impact analysis button on lineage view card.":::

* From an item's details page

    :::image type="content" source="./media/impact-analysis/open-impact-analysis-from-item-details.png" alt-text="Screenshot of impact analysis button option in item details.":::

## General impact analysis pane

The following image shows an example of the impact analysis pane for most Fabric items.

:::image type="content" source="./media/impact-analysis/impact-analysis-pane-general.png" alt-text="Screenshot of the impact analysis side pane.":::

* The **impact summary** shows you the number of potentially impacted workspaces, reports, and dashboards, as well as the total number of views for all the downstream reports and dashboards that are connected to the dataset.
* The **notify contacts** link opens a dialog where you can create a message about any dataset changes you make, and send it to the contact lists of the affected workspaces.

## Data source impact analysis

Data source impact analysis helps you see where your data source is being used throughout your organization. This can be useful when the data source is temporarily or permanently taken offline, and you want to get an idea about who is impacted. Impact analysis shows you how many workspaces and items use the data source, and provides easy navigation to the workspaces where the affected dataflows and datasets are located so that you can investigate further.

Data source impact analysis can also help you spot data duplication in the tenant, such as when many different users build similar models on top of the same data source. By helping you discover such redundant items, data source impact analysis supports the goal of having *a single source of truth*.

:::image type="content" source="./media/impact-analysis/data-source-impact-analysis-side-pane.png" alt-text="Screenshot of data source impact analysis side pane.":::

* **Data source type**: Indicates the data source type.
* **Path to data source**: Path to the data source
* **Impact summary**: The number of potentially impacted workspaces and items. This count includes workspaces you don't have access to.
* **Usage breakdown**: For each workspace, the names of the impacted dataflows and datasets. To further explore the impact on a particular workspace, select the workspace name to open the workspace. Then use [dataset impact analysis](impact-analysis.md) to see the usage details about connected reports and dashboards.

## Notify contacts

If you've made a change to an item or are thinking about making a change, you might want to contact the relevant users to tell them about it. When you notify contacts, an email is sent to the [contact lists](../get-started/workspaces.md#workspace-contact-list) of all the impacted workspaces. Your name appears on the email so the contacts can find you and reply back in a new email thread.

1. Select **Notify contacts** in the impact analysis side pane. The notify contacts dialog appears.

    :::image type="content" source="./media/impact-analysis/notify-contacts-dialog.png" alt-text="Screenshot of the Notify contacts dialog box.":::

1. In the text box, provide some detail about the change.
1. When the message is ready, select **Send**.

## Privacy

In order to perform impact analysis on an item, you must have write permissions to it. In the impact analysis side pane, you only see real names for workspaces and items that you have access to. Items that you don't have access to are listed as **Limited access**. This is because some item names may contain personal information.

Even if you don't have access to some workspaces, your notify contacts messages will still reach the contact lists of those workspaces.

## Next steps

* [Lineage](lineage.md)