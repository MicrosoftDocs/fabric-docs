---
title: "Data Warehouse Tutorial: Generate a Report from the OneLake Catalog"
description: "In this tutorial, learn how to generate a report from the OneLake catalog with the data ingested into the warehouse."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scbradl
ms.date: 07/21/2025
ms.topic: tutorial
---

# Tutorial: Generate a report from the OneLake catalog

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this tutorial, learn how to generate a report from the OneLake catalog with the data ingested into the warehouse.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse](tutorial-create-warehouse.md)
> 1. [Ingest data into a Warehouse](tutorial-ingest-data.md)

## Generate a report

In this task, learn how to generate a report from the OneLake catalog.

1. In the Fabric portal, in the navigation pane, select **OneLake**.

1. In the OneLake catalog landing page, to limit the list of items to your data, select the **My items** filter option.

   :::image type="content" source="media/tutorial-build-report-onelake-data-hub/filter-my-items.png" alt-text="Screenshot of the OneLake catalog landing page, highlighting the My items filter option.":::

1. From the item list, select the item named `Sales Model` that is of type **Semantic model**.

   > [!NOTE]
   > A [semantic model](semantic-models.md) can present a [star schema model](dimensional-modeling-overview.md#star-schema-design) of the warehouse tables, which provides you with a quick way to report on warehouse data.

1. To open the semantic model landing page, select **Open**.

   :::image type="content" source="media/tutorial-build-report-onelake-data-hub/open-semantic-model-landing-page.png" alt-text="Screenshot of the semantic model, highlighting the Open button.":::

1. In the semantic model landing page, in the **Discover business insights** section, open the dropdown list, and then select **Auto-create a report**.

   :::image type="content" source="media/tutorial-build-report-onelake-data-hub/auto-create-report.png" alt-text="Screenshot of the Discover business insights section, highlighting the Auto-create a report option.":::

1. Review the report that Fabric generated for you.

1. On the ribbon, select **File** > **Save**.

1. In the **Save your report** window, in the **Enter a name for your report** box, enter `Customer Quick Summary`.

1. Select **Save**.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Clean up tutorial resources](tutorial-clean-up.md)
