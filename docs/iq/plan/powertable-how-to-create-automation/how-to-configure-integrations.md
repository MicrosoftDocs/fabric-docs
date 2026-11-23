---
title: Sync Semantic Model Data in PowerTable Automations
description: PowerTable Power BI integration keeps your table data current. Discover how to refresh your semantic model and add sync actions to automation workflows today.
ms.date: 10/26/2026
ms.topic: how-to
---

# Integrations in automation

Learn how to use the PowerTable sync integration feature to bring in updated data from Power BI semantic model.

The **PowerTable** and **Power BI** integration lets you synchronize data from a Power BI semantic model so you can work with the latest analytical data in PowerTable.

This integration is a one-way sync from the semantic model into PowerTable, so changes made in PowerTable can't be synced back to the semantic model that you're syncing with.
To learn more, see [FAQs on connecting PowerTable to a semantic model](../powertable-how-to-connect-semantic-model.md#faq).

## Refresh semantic model

When you create a PowerTable sheet using a Power BI semantic model as the source, you can refresh the source (semantic model) so the table data is up to date.

To learn more, see [Refresh semantic model](../powertable-how-to-connect-semantic-model.md#refresh-semantic-model).

## Sync the semantic model in an automation

You can also synchronize the semantic model as part of an automation workflow to ensure that subsequent actions use the latest available data.

The following steps explain how to synchronize with the semantic model through the automation workflow.

1. In your automation workflow, select **Add Action**.
1. Select **Power BI** > **Sync semantic model**.
1. Add any subsequent actions required for your workflow.

The **Sync semantic model** action runs whenever the automation executes, allowing subsequent actions to work with the latest synchronized data.

:::image type="content" source="../media/powertable-how-to-create-automation/how-to-add-integration-automation/sync-semantic-model.png" alt-text="Screenshot of an automation workflow with Add Action selected and the Power BI integration menu showing the Sync semantic model option." lightbox="../media/powertable-how-to-create-automation/how-to-add-integration-automation/sync-semantic-model.png":::
