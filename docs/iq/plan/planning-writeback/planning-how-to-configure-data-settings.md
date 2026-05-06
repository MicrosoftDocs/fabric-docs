---
title: Configure data settings for writeback
description: Learn how to configure data settings, including selecting series for writeback and managing HTML formatting in text inputs and Data Analysis Expressions (DAX) measures.
ms.date: 05/02/2026
ms.topic: how-to
#customer intent: As a user, I want to configure which data series are written to the destination and how HTML content is processed and exported.
---

# Data Settings

View all series configurations and select the series to include in **Writeback**. Defines which data is written back to the destination.

## Select series for writeback

This section lists all series that are available for writeback. By default, all series are selected. Clear series that should not be written back to the destination.

:::image type="content" source="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings.jpg" alt-text="Screenshot of the Writeback settings" lightbox="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings.jpg":::

## Show Text Inputs with HTML Formatting

Include HTML content in text data input columns and DAX measures for writeback.

:::image type="content" source="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings-dialog-box.png" alt-text="Screenshot of the Writeback settings":::

### Use HTML in a text data input column

Enter and render HTML directly in a text input column.

1. Double-click inside the text data input column.
2. Select the rich text editor icon to open the editor window.
3. In the editor, choose the Script option.
4. Enter your HTML code.
5. Select Apply.

The HTML content is rendered and displayed within the visual.

### Configure writeback behavior for HTML content

Control whether HTML content is saved as plain text or with HTML tags during writeback.

1. Go to **Writeback > Settings > Data**.
2. Enable or disable the **Show Text Inputs with HTML Formatting** toggle.

* When disabled, the content is written back as plain text.
* When enabled, the content is written back with HTML tags preserved.

### Use HTML in DAX measures

Embed HTML directly in a DAX measure.

* Define a DAX measure that includes HTML code.
* Drag the DAX measure to **Other (OM)** in the **Data** pane.
* The HTML content is rendered in the visual.

### Export HTML content

Export HTML content:

* If the Writeback as HTML option is enabled, HTML content in both:

  * Text input columns, and
  * DAX measures

  is preserved and rendered correctly in outputs such as PDF exports.
* If the option is disabled, the content is exported as plain text without HTML rendering.
