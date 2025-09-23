---
title: Learn about editing semantic models in Direct Lake storage mode in the web
description: Describes using Power BI web modeling to edit semantic models in Power BI web modeling.
author: datazoems
ms.author: zoedouglas
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-premium
ms.topic: conceptual
ms.date: 05/01/2025
LocalizationGroup: Admin
---
# Direct Lake in web modeling (preview)

**Open data model**, or web modeling, works with semantic models with Direct Lake tables. Direct Lake tables can be **Direct Lake on SQL** or **Direct Lake on OneLake**, which have different considerations when creating and editing in the web.

| Scenario | Direct Lake on OneLake | Direct Lake on SQL |
|:-----------|:------------|:  ------------|
| Creating in the web       | 
- Select **Create** in the left navigation, then **OneLake catalog**. 
- Select **New semantic model** from Lakehouse.
- Select **OneLake catalog** from web modeling. Select **New item** from a workspace and choosing **Semantic model**, then **OneLake catalog**    |
- Select **New semantic model** from SQL analytics endpoints or Warehouses.       |
| Editing in the web       |
- Select **Open data model** from the semantic model details page or context menu.    |
- Select **Open data model** from the semantic model details page or context menu.    |

**Edit in Desktop** is available when web modeling to continue [live editing any Direct Lake semantic model in Power BI Desktop](direct-lake-power-bi-desktop.md). 

## Create a semantic model with Direct Lake tables

To create a semantic model with **Direct Lake on OneLake tables**, take the following steps.

1. Select **Create** from the left navigation bar, then select **OneLake catalog** and choose a Fabric item. Alternatively, open the Lakehouse and select **New semantic model**.
2.	Give your semantic model a name, pick a Fabric workspace for it, and select the tables to include. Then press **OK**.
   
The semantic model is created and now you're live editing the modeling in the browser.

To create a semantic model with **Direct Lake on SQL tables**, take the following steps.

1.	Open the SQL analytics endpoint or warehouse, go to **Reporting** and then select **New semantic model**.
2.	Give your semantic model a name, pick a Fabric workspace for it, and select the tables to include. Then press **OK**.
   
The semantic model is created and now you're live editing the modeling in the browser.

> [!NOTE]
> Check your pop-up blocker if web modeling doesn’t appear after clicking OK.

The differences between Direct Lake on OneLake and Direct Lake on SQL are explained in the [Overview](direct-lake-overview.md).

## Edit a semantic model in Direct Lake mode

To edit a semantic model with Direct Lake tables later, take the following steps.

1.	Navigate to the semantic model in the Fabric Portal. **Home**, **Onelake catalog**, and **search** at the top of the page are available to help you find it.
2.	Select the semantic model to open the details page, or use the context-menu, then select **Open data model**.

Now you are live editing the semantic model in the web. The model opens by default in **viewing mode** to avoid accidental edits. Change to **editing mode** in the top right-hand corner of the window. **Edit in Desktop** is also available to change to [live edit in Power BI Desktop](direct-lake-power-bi-desktop.md).

:::image type="content" source="media/direct-lake-web-modeling/web-modeling-mode.png" alt-text="Screenshot of edit in desktop from web modeling option." lightbox="media/direct-lake-web-modeling/web-modeling-mode.png":::


## Related content

-	[Edit data models in the Power BI service](/power-bi/transform-model/service-edit-data-models)




