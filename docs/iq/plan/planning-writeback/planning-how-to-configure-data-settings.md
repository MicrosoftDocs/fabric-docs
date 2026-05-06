---
title: Configure data settings for writeback
description: Learn how to configure data settings, including selecting series for writeback and managing HTML formatting in text inputs and Data Analysis Expressions (DAX) measures.
ms.date: 05/02/2026
ms.topic: how-to
#customer intent: As a user, I want to configure which data series are written to the destination and how HTML content is processed and exported.
---

# Configure data settings for writeback

This article explains how to view all series configurations and select the series to include in writeback. This process defines which data is written back to the destination.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Select series for writeback

The **Series allowed for Writeback** section of the **Writeback Settings** tab lists all series that are available for writeback. By default, all series are selected. 

Clear series that should not be written back to the destination.

:::image type="content" source="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings.jpg" alt-text="Screenshot of the Writeback Settings" lightbox="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings.jpg":::

## Show text inputs with HTML formatting

The following sections explain how to include HTML content in text data input columns and DAX measures for writeback.

### Use HTML in a text data input column

You can enter and render HTML directly in a text input column.

1. Double-click inside the text data input column.
1. Select the rich text editor icon to open the editor window.
1. In the editor, choose the **Script** option.
1. Enter your HTML code.
1. Select **Apply**.

The HTML content is rendered and displayed within the visual.

### Configure writeback behavior for HTML content

Control whether HTML content is saved as plain text or with HTML tags during writeback.

1. Go to **Writeback > Settings > Data**.
1. Enable or disable the **Show Text Inputs with HTML Formatting** toggle.

    * When disabled, the content is written back as plain text.
    * When enabled, the content is written back with HTML tags preserved.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings-dialog-box.png" alt-text="Screenshot of the Writeback Settings with the Show Text Inputs with HTML Formatting toggle enabled.":::

### Use HTML in DAX measures

To embed HTML directly in a DAX measure:

1. Define a DAX measure that includes HTML code.
1. Drag the DAX measure to **Other (OM)** in the **Data** pane.
1. The HTML content is rendered in the visual.

### Export HTML content

The **Show Text Inputs with HTML Formatting** toggle controls how HTML content is exported:

* When enabled, HTML content in both text input columns and DAX measures is preserved and rendered correctly in outputs such as PDF exports.
* When disabled, the content is exported as plain text without HTML rendering.
