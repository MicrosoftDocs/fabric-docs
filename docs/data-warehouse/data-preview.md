---
title: View data in the Data preview
description: Learn about using the Data preview in Microsoft Fabric.
author: jacindaeng
ms.author: jacindaeng
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: how-to
ms.search.form: Data preview
---

# View data in the Data preview in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

The **Data preview** is one of the three switcher modes along with the Query editor and Model view within the warehouse experience that provides an easy interface to view the data within your tables or views to preview sample data (top 1000 rows). 

## Get started

After creating a warehouse and ingesting data, select the **Data** tab. Choose a specific table or view you would like to display in the data grid of the Data preview page. 

:::image type="content" source="media\data-preview\data-preview.png" alt-text="Screenshot of the data grid on the Data preview screen within the warehouse." lightbox="media\data-preview\data-preview.png":::

 - **Search value** – Type in a specific keyword in the search bar and rows with that specific keyword will be filtered. In this example, "New York" is the keyword and only rows containing this keyword are shown. To clear the search, select on the `X` inside the search bar. 

 - **Sort columns (alphabetically or numerically)** – Hover over the column title and select on the up/down arrow that appears next to the title. 

    :::image type="content" source="media\data-preview\search-bar.png" alt-text="Screenshot of searching New York in the search bar within the data preview of the warehouse." lightbox="media\data-preview\search-bar.png":::

 - **Copy value** – Right-click a cell within the table and a **Copy** option will appear to copy the specific selection. 

    :::image type="content" source="media\data-preview\table-tools-copy.png" alt-text="Screenshot of copying a cell within the data preview of the warehouse." lightbox="media\data-preview\table-tools-copy.png":::

## Considerations and limitations

 - Only the top 1000 rows can be shown in the data grid of the Data preview. 
 - The Data preview view will change depending on how the columns are sorted or if there's a keyword that is searched. 

## Next steps

 - [Define relationships in data models for data warehousing](data-modeling-defining-relationships.md)
 - [Data modeling in the default Power BI dataset](model-default-power-bi-dataset.md)