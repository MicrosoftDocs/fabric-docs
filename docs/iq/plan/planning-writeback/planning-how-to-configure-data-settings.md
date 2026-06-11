---
title: Configure Data Settings for Writeback
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

:::image type="content" source="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings.jpg" alt-text="Screenshot of the Writeback Settings." lightbox="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings.jpg":::

## Show text inputs with HTML formatting

Include HTML content in text data input columns and DAX measures for writeback.

### Configure writeback behavior for HTML content

Control whether HTML content is saved as plain text or with HTML tags during writeback.

1. Go to **Writeback > Settings > Data**.
1. Enable or disable the **Show Text Inputs with HTML Formatting** toggle.

    * When disabled, the content is written back as plain text.
    * When enabled, the content is written back with HTML tags preserved.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-data-settings/writeback-settings-dialog-box.png" alt-text="Screenshot of the Writeback Settings with the Show Text Inputs with HTML Formatting toggle enabled.":::

### Export HTML content

The **Show Text Inputs with HTML Formatting** toggle controls how HTML content is exported:

* When enabled, HTML content in both text input columns and DAX measures is preserved and rendered correctly in outputs such as PDF exports.
* When disabled, the content is exported as plain text without HTML rendering.
