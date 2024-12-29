---
title: "Data warehouse tutorial: Build a Power BI report from OneLake data hub in Microsoft Fabric"
description: "In this tutorial, you will build a report from OneLake data hub with the data ingested into the warehouse."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scbradl
ms.date: 11/10/2024
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
---

# Tutorial: Build a Power BI report from OneLake data hub in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this tutorial, you will build a report from OneLake data hub with the data ingested into the warehouse.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a Microsoft Fabric workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse in Microsoft Fabric](tutorial-create-warehouse.md)
> 1. [Ingest data into a Warehouse in Microsoft Fabric](tutorial-ingest-data.md)

## Build a report

In this task, you will build a report from OneLake data hub.

1. In the Fabric portal, in the navigation pane, select **OneLake data hub**. TODO: Reference OneLake button.

1. In the OneLake data hub landing page, to limit the list of items to your data, select the **My data** filter option.

   :::image type="content" source="media/tutorial-build-report-onelake-data-hub/filter-my-data.png" alt-text="Screenshot of the OneLake data hub landing page, highlighting the My data filter option." border="false":::

1. From the item list, select  the item named `Wide World Importers` that is of type **Semantic model (default)**.

   > [!NOTE]
   > Every warehouse has a corresponding [default semantic model](semantic-models.md#understand-whats-in-the-default-power-bi-semantic-model). It presents a [star schema model](dimensional-modeling-overview.md#star-schema-design) of the warehouse tables, providing you with a quick way to report on data in the warehouse._

1. In the semantic model landing page, in the **Discover business insights** section, open the dropdown, and then select **Auto-create a report**.

   :::image type="content" source="media/tutorial-build-report-onelake-data-hub/auto-create-report.png" alt-text="Screenshot of the Discover business insights section, highlighting the Auto-create a report option." border="false":::

1. Review the report that was automatically generated.

1. On the ribbon, select **File** > **Save**.

1. In the **Save your report** window, in the **Enter a name for your report** box, enter `Customer Quick Summary`.

1. Select **Save**.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Clean up tutorial resources](tutorial-clean-up.md)
