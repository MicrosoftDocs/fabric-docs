---
title: Manage sources
description: Learn how to manage Infobridge sources, view source details, refresh sources, and review refresh history.
ms.topic: how-to
ms.date: 08/24/2026
---

# Manage sources

You can manage Infobridge sources from the Manage Source interface. View source details, refresh sources, manage measures, and review refresh history.

## Open Manage Source

1. On the **Home** ribbon, select **Manage Source**.

:::image type="content" source="media/infobridge-how-to-manage-sources/manage-source-home-ribbon.png" alt-text="Screenshot of the Manage Source option on the Home ribbon." lightbox="media/infobridge-how-to-manage-sources/manage-source-home-ribbon.png":::

The **Manage Source** window opens and displays the available sources.

## View source details

The **General** tab displays details about the selected source.

:::image type="content" source="media/infobridge-how-to-manage-sources/manage-source-source-details-general.png" alt-text="Screenshot of the Manage Source window showing source details on the General tab." lightbox="media/infobridge-how-to-manage-sources/manage-source-source-details-general.png":::

The **Manage Source** window includes the following options:

- **Search**: Search for a source or query by name. Select a source to view its details.
- **General**: Displays details about the selected source.
- **Refresh History**: Displays the refresh operations performed for the selected source.
- **Refresh Source**: Manually refreshes the selected source.
- **Owner**: Displays the user who owns the source.
- **Sheet**: Select the link icon to open the planning sheet associated with the source.
- **Created At**: Displays the date and time when the source was created.
- **Updated At**: Displays the date and time when the source was last updated.
- **Queries**: Lists the queries associated with the source.
- **Measures**: Lists the measures available from the source.
- **Update**: Applies the selected measures. The option is available when there are changes to apply.

## Refresh a source

To manually refresh the selected source:

1. In **Manage Source**, select **Refresh Source**.

The refresh operation updates the source with the latest available data.

## View refresh history

The **Refresh History** tab displays the refresh operations performed for the selected source.

:::image type="content" source="media/infobridge-how-to-manage-sources/manage-source-refresh-history.png" alt-text="Screenshot of the Manage Source window showing refresh history for a source." lightbox="media/infobridge-how-to-manage-sources/manage-source-refresh-history.png":::

Use the following options and columns to review refresh operations:

- **Search**: Search the refresh history for a specific execution.
- **Started By**: Filter refresh operations by the user who started them.
- **Add More**: Add more filter criteria to the refresh history.
- **Reset Filter**: Clear the applied filters and return to the default history view.
- **Execution ID**: Displays the unique identifier for each refresh operation.
- **Started By**: Displays the user who started the refresh operation.
- **Started At**: Displays the date and time when the refresh operation started.
- **Duration**: Displays how long the refresh operation took to complete.
- **Status**: Displays the result of the refresh operation, such as **Success**.

Use the refresh history to review previous refresh operations and verify whether a refresh completed successfully.
