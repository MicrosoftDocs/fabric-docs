---
title: Add a Markdown Visual to a Real-Time Dashboard
description: Learn how to embed images and formatted text in a Real-Time Dashboard by using a Markdown visual.
ms.reviewer: gabil, mbar
ms.topic: how-to
ms.subservice: rti-dashboard
ms.custom:
ms.date: 08/23/2026
ai-usage: ai-assisted
---

# Add a Markdown visual to a Real-Time Dashboard

Use a Markdown visual to display formatted text and embed images in your Real-Time Dashboard tiles.

For more information on GitHub Flavored Markdown, see [GitHub Flavored Markdown Spec](https://github.github.com/gfm/).

## Embed images

1. Open a [Real-Time Dashboard](dashboard-real-time-create.md#create-a-new-dashboard).
1. In the top menu, select **Add markdown** to open a markdown tile.

    :::image type="content" source="media/customize-dashboard-visuals/add-tile.png" alt-text="Screenshot of the Home menu in a Real-Time Dashboard. The option titled Add markdown is highlighted." lightbox="media/customize-dashboard-visuals/add-tile.png":::

1. In the query pane, paste the URL of an image located in an image hosting service by using the following syntax:

    ```md
    ![](URL)
    ```

    The image renders in the tile's preview.

    :::image type="content" source="media/customize-dashboard-visuals/embed-image.png" alt-text="Screenshot of dashboard query pane showing image syntax in markdown text." lightbox="media/customize-dashboard-visuals/embed-image.png":::

1. In the top menu, select **Done** to save the tile.

For more information on image syntax in GitHub Flavored Markdown, see [Images](https://github.github.com/gfm/#images).

## Related content

* [Real-Time Dashboard visual gallery](dashboard-visual-gallery.md)
* [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md)
* [Dashboard supported visual types](dashboard-supported-visuals.md)
