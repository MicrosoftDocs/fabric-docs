---
title: How to integrate notebooks with Org app
description: Learn how to create an org app, integrate notebooks, and preview contents in the app.
ms.reviewer: jingzh
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.search.form: Create and use notebooks
ms.date: 07/25/2024
---

# How to integrate notebooks with Org app

This article shows you how to integrate notebooks into an app. This new integration is designed to enhance your productivity by using Notebook as a rich content carrier and streamline your workflow by providing a seamless experience within [Org app](/power-bi/consumer/org-app-items/org-app-items), making it easier than ever to interact with data insights.  

## Notebook in Org app 

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

You can now easily embed the Fabric Notebook in the Org app. With rich content like code and markdown cells, visuals, tables, charts, and widgets, the notebook can be a practical storytelling tool, similar to dashboards. By following the steps below, you'll be able to add a specific notebook to an Org app. The notebook will become read-only within the app context, but widgets like rich dataframe previews, built-in charts, and outputs from popular libraries like Plotly will remain interactive. This will enable app consumers to explore and interact with the notebook conveniently.

The operations applied to the embedded Notebook in Org app by consumers won't be saved, after refreshing the page, all the settings will be reset to default view.

:::image type="content" border="true" source="media/notebook-in-app/notebook-in-app.gif" alt-text="Animated GIF of notebook in app.":::

1. Create an **Org app** in the workspace new item panel with your APP name.

1. **Add workspace content** on navigation pane or **add contents** straightly -> add notebooks into the app.

    :::image type="content" source="media\notebook-in-app\add-workspace-content.png" alt-text="Screenshot showing add workspace content.":::

1. **Preview app** to check contents. **Close preview** and back to **save** your changes if everything is well.

    :::image type="content" source="media\notebook-in-app\save-changes-and-preview-app.png" alt-text="Screenshot showing where to save changes and preview app.":::

1. After notebooks are integrated into the app, you are entering into a read-only mode but you can also manage visualization in the cell output.

1. **Share** the app link will help collaborators find your app conveniently.

    :::image type="content" source="media\notebook-in-app\manage-access.png" alt-text="Screenshot showing where to manage access.":::

## Related content

- [Notebook visualization](notebook-visualization.md)
