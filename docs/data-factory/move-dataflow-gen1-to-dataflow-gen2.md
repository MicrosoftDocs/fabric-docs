---
title: Move queries from Dataflow Gen1 to Dataflow Gen2
description: This article describes the procedure for moving Dataflow Gen1 queries to Dataflow Gen2 in Data Factory.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Move queries from Dataflow Gen1 to Dataflow Gen2

Dataflow Gen2 is the new generation of dataflows. However, many existing dataflows have been created over the years using the original version of dataflows  (now called *Dataflow Gen1* and listed as the **Dataflow** type in your workspace).  This article describes how you can reuse your older Dataflow Gen1 dataflows by importing Dataflow Gen1 dataflows into Dataflow Gen2 using the export template feature. It also includes information on how to copy the Gen1 queries and paste them into a new Dataflow Gen2.

## Use the export template feature

To use the export template feature:

1. From your Power BI or Data Factory workspace, select the ellipsis next to an existing Dataflow Gen1 and then select **Edit**.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/edit-dataflow.png" alt-text="Screenshot showing the workspace, with the dataflow menu open and edit emphasized." lightbox="./media/move-dataflow-gen1-to-dataflow-gen2/edit-dataflow.png":::

1. In the **Home** tab of the Power Query editor, select **Export template**.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/export-template.png" alt-text="Screenshot showing the Power Query editor, with the Export template option emphasized." lightbox="./media/move-dataflow-gen1-to-dataflow-gen2/export-template.png":::

1. In **Export template**, enter the name you want to call this template in **Name**. Optionally, you can add a description for this template in **Description**.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/export-template-information.png" alt-text="Screenshot showing the Export template dialog box, with Contoso Sample 48 entered in Name.":::

1. Select **OK** to save the template. The template is saved in your default Downloads folder.

1. From your Data Factory workspace, select **New**, and then select **Dataflow Gen2**.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/new-dataflow-gen2.png" alt-text="Screenshot with the New menu opened with Dataflow Gen2 emphasized.":::

1. From the current view pane of the Power Query editor, select **Import from a Power Query template**.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/import-from-power-query-template.png" alt-text="Screenshot showing the current view with Import from a Power Query template emphasized." lightbox="./media/move-dataflow-gen1-to-dataflow-gen2/import-from-power-query-template.png":::

1. In the **Open** dialog box, browse to your default Downloads folder and select the .pqt file you saved in the previous steps. The select **Open**.

1. The template is then imported to your Dataflow Gen2. You might be required to enter your credentials at this time. If so, select **Configure connection** and enter your credentials. Then select **Connect**.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/configure-your-connection.png" alt-text="Screenshot showing the Power Query editor with Configure connection emphasized." lightbox="./media/move-dataflow-gen1-to-dataflow-gen2/configure-your-connection.png":::

Your Dataflow Gen1 has now been imported to Dataflow Gen2.

## Copy and paste existing Dataflow Gen1 queries

To copy existing Dataflow Gen1 queries:

1. From your Power BI or Data Factory workspace, select the ellipsis next to an existing Dataflow Gen1 and then select **Edit**.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/edit-dataflow.png" alt-text="Screenshot showing the workspace where you choose to edit the dataflow." lightbox="./media/move-dataflow-gen1-to-dataflow-gen2/edit-dataflow.png":::

1. In Power Query, select the query or queries you want to copy. If there are multiple queries or folders (called _groups_ in Power Query) you want to copy, select **Ctrl** as you select the queries or folders you want to copy. Then either select Ctrl+C or right-click in the selection and select **Copy**.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/copy-queries.png" alt-text="Screenshot showing the Power Query workspace with the Contoso Financial Sample query selected and the copy option emphasized.":::

1. Open an existing Dataflow Gen2, or create a new Dataflow Gen2 in Data Factory. To create a new dataflow, open an existing workflow and select **New** > **Dataflow Gen2**.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/new-dataflow-gen2.png" alt-text="Screenshot showing the New menu opened with Dataflow Gen2 emphasized.":::

1. In the Power Query editor, select **Get data** > **Blank query**.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/select-blank-query.png" alt-text="Screenshot showing the Get data menu opened with Blank query emphasized.":::

1. In the **Blank query** dialog box, select **Next**.

1. Select inside the **Queries** pane of the Power Query editor, and then select **Ctrl+V** to paste the query.

1. You might need to add your credentials before you can use the pasted queries. If a `Credentials are required to connect to the Web source.` message appears, select **Configure connection**, and then enter your credentials.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/configure-connection.png" alt-text="Screenshot showing the credentials error message and configure credentials button." lightbox="./media/move-dataflow-gen1-to-dataflow-gen2/configure-connection.png":::

1. Select **Connect** to connect to your data.

1. Once you've connected to your data, right-click the initial blank query, and then select **Delete** to remove the empty query.

   :::image type="content" source="./media/move-dataflow-gen1-to-dataflow-gen2/clean-up-query.png" alt-text="Screenshot showing the blank query selected, with emphasis on the delete option in the query's menu.":::

## Related content

- [Differences between Dataflow Gen1 and Gen2 in Microsoft Fabric](dataflows-gen2-overview.md)
