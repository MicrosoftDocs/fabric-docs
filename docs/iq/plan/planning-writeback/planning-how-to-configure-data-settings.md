---
title: Configure data settings for writeback
description: Learn how to configure data settings, including selecting series for writeback and managing HTML formatting in text inputs and DAX measures.
ms.date: 05/02/2026
ms.topic: how-to
#customer intent: As a user, I want to configure which data series are written to the destination and how HTML content is processed and exported.
---

# Data Settings

Under **Data settings**, you can view all series configurations and select the series that you want to include in **Writeback**. This is where you control what data gets written back to the destination.

## 1. Select series for writeback

This section lists all series that are available for writeback. By default, all series are selected. You can clear the series that you do not want to **write back data** to the destination.

:::image type="content" source="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings.jpg" alt-text="Screenshot of the Writeback settings" lightbox="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings.jpg":::

## 2. Show Text Inputs with HTML Formatting

You can include your HTML content within the Text data input column as well as in DAX measures, which can be written back.

:::image type="content" source="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings-dialog-box.png" alt-text="Screenshot of the Writeback settings":::

### 2.1 Use HTML in a text data input column

You can enter and render HTML directly within a text input column.

1. Double-click inside the text data input column.
2. Select the rich text editor icon to open the editor window.
3. In the editor, choose the Script option.
4. Enter your HTML code.
5. Select Apply.

The HTML content is rendered and displayed within the visual.

### 2.2 Configure writeback behavior for HTML content

When performing a writeback, you can control whether the HTML content is saved as plain text or with HTML tags.

1. Go to **Writeback> Settings > Data** in the Writeback Settings dialog.
2. Enable or disable the **Show Text Inputs with HTML Formatting** toggle.

* When disabled, the content is written back as plain text.
* When enabled, the content is written back with HTML tags preserved.

### 2.3 Use HTML in DAX measures

You can embed HTML directly in a DAX measure.

* Define a DAX measure that includes HTML code.
* Drag the DAX measure to **Other (OM)** in the **Data** pane.
* The HTML content is rendered in the visual.

### 2.4 Export HTML content

When exporting data:

* If the **Writeback as HTML** option is enabled, HTML content in both:

  * **Text input columns**, and
  * **DAX measures**

  is preserved and rendered correctly in outputs such as **PDF exports**.
* If the option is disabled, the content is exported as **plain text** without HTML rendering.
