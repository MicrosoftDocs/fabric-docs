---
title: Learn about editing semantic models in Direct Lake in Power BI Project (preview)
description: Describes using Power BI Project to edit semantic models in Power BI Desktop.
author: datazoems
ms.author: zoedouglas
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-premium
ms.topic: concept-article
ms.date: 05/1/2025
LocalizationGroup: Admin
---
# Direct Lake in Power BI Project (preview)

When working on a Power BI Project (PBIP) with a semantic model with Direct Lake tables, Power BI Desktop needs to connect to a semantic model in a Fabric workspace, also termed as a remote semantic model. Remote modeling is live editing, as all changes you make are immediately applied to the semantic model in the workspace. However, unlike live edit, you can save your semantic model and report definitions, or metadata, to your local PBIP files that can later be deployed to a Fabric workspace using a deployment mechanism such as Fabric Git Integration. Learn more about remote modeling with [Power BI Project (PBIP)](/power-bi/developer/projects/projects-overview).

To support professional enterprise development workflows of semantic models in Direct Lake mode, you can export the definition of your semantic model after opening it for editing, which provides a local copy of the semantic model and report metadata that you can use with Fabric deployment mechanisms such as Fabric Git Integration. The Power BI Desktop **report view** becomes enabled letting you view and edit the local report. **Publish** directly from Power BI Desktop isn't available but you can publish using Git integration. The **Save** button is also enabled to save the local model metadata and report in the Power BI Project folder.

## Export to a Power BI Project

To support professional enterprise development workflows of semantic models in Direct Lake mode, you can export the definition of your semantic model after opening it for editing, which provides a local copy of the semantic model and report metadata that you can use with Fabric deployment mechanisms such as [Fabric Git Integration](../cicd/git-integration/intro-to-git-integration.md). The Power BI Desktop report view becomes enabled letting you view and edit the local report, publish directly from Power BI Desktop isn't available but you can publish using Git integration. The **Save** button is also enabled to save the local model metadata and report in the Power BI Project folder.

Navigate to **File > Export > Power BI Project** and export it as a [Power BI Project file (PBIP)](/power-bi/developer/projects/projects-overview).

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-10.png" alt-text="Screenshot of opening a Power BI Project in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-10.png":::

By default, the PBIP file is exported to the `%USERPROFILE%\Microsoft Fabric\repos\[Workspace Name]` folder. However, you can choose a different location during the export process.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-11.png" alt-text="Screenshot choosing a different path location for a Power BI Project file." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-11.png":::

Selecting **Export** opens the folder containing the PBIP files of the exported semantic model along with an empty report.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-12.png" alt-text="Screenshot of exported folder containing the files of an exported semantic model in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-12.png":::

After exporting, you should open a new instance of Power BI Desktop and open the exported PBIP file to continue editing with a Power BI Project. When you open the PBIP file, Power BI Desktop prompts you to either create a new semantic model in a Fabric workspace, or select an existing semantic model for **remote modeling**.

### Remote modeling with a Power BI Project

When working on a Power BI Project (PBIP) with a semantic model that can't run on the local Power BI Analysis Services engine, such as Direct Lake mode, Power BI Desktop requires to be connected to a semantic model in a Fabric workspace, a remote semantic model. Like *live edit*, all changes you make are immediately applied to the semantic model in the workspace. However, unlike live edit, you can save your semantic model and report definitions to local PBIP files that can later be deployed to a Fabric workspace using a deployment mechanism such as [Fabric Git Integration](../cicd/git-integration/intro-to-git-integration.md).

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-13.png" alt-text="Diagram of remote semantic model modeling with a Power BI Project in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-13.png":::

> [!NOTE]
> Semantic models in Direct Lake mode, when exported to a Git repository using [Fabric Git Integration](../cicd/git-integration/intro-to-git-integration.md), can be edited using Power BI Desktop. To do so, make sure at least one report is connected to the semantic model, then open the report's exported [definition.pbir](/power-bi/developer/projects/projects-overview#definitionpbr) file to edit both the report and the semantic model.
> 

### Open your Power BI Project

When opening a Power BI Project (PBIP) that require a remote semantic model, Power BI Desktop prompts you to either create a new semantic model or select an existing semantic model in a Fabric workspace.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-14.png" alt-text="Screenshot of setting up the remote model for the Power BI Project." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-14.png":::

If you select an existent semantic model and the definition differs, Power BI Desktop warns you before overwriting, as shown in the following image.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-15.png" alt-text="Screenshot of semantic model issues in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-15.png":::

> [!NOTE]
> You can select the same semantic model you exported the PBIP from. However, the best practice when working with a PBIP that requires a remote semantic model is for each developer to work on their own private remote semantic model to avoid conflicts with changes from other developers.
> 

Selecting the title bar displays both the PBIP file location and the remote semantic model living in a Fabric workspace, shown in the following image.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-16.png" alt-text="Screenshot of semantic model file location." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-16.png":::

A local setting will be saved in the Power BI Project files with the configured semantic model, next time you open the PBIP, you won't see the prompt, and Fabric semantic model will be overwritten with the metadata from the semantic model in the Power BI Project files.

### Change remote semantic model

During the **preview**, if you wish to switch the remote semantic model in the PBIP you must navigate to the `\*.SemanticModel\.pbi\localSettings.json` file. There, you can either modify the *remoteModelingObjectId* property to the ID of the semantic model you want to connect to, or remove the property altogether. Upon reopening the PBIP, Power BI Desktop connects to the new semantic model or prompts you to create or select an existing semantic model.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-17.png" alt-text="Screenshot of semantic model ID." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-17.png":::

> [!NOTE]
> The configuration described in this section is intended solely for local development and should not be used for deployment across different environments.

## Related 

- [Power BI Project (PBIP)](/power-bi/developer/projects/projects-overview)
