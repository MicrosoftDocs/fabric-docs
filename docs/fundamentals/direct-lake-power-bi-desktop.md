---
title: Learn about editing semantic models in Direct Lake in Power BI Desktop (preview)
description: Describes using Power BI Desktop to edit semantic models in Power BI Desktop.
author: davidiseminger
ms.author: davidi
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-premium
ms.topic: conceptual
ms.date: 01/14/2025
LocalizationGroup: Admin
---
# Direct Lake in Power BI Desktop (preview)

Semantic models using Direct Lake mode access OneLake data directly, which requires running the Power BI Analysis Services engine in a workspace with a Fabric capacity. Semantic models using import or DirectQuery mode can have the Power BI Analysis Services engine running locally on your computer by using Power BI Desktop for creating and editing the semantic model. Once published, such models operate using Power BI Analysis Services in the workspace. 

To facilitate editing Direct Lake semantic models in Power BI Desktop, you can now perform a **live edit** of a semantic model in Direct Lake mode, enabling Power BI Desktop to make changes to the model by using the Power BI Analysis Services engine in the Fabric workspace.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-01.png" alt-text="Diagram of semantic model edit process with Direct Lake in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-01.png":::


## Enable preview feature

Live editing semantic models in Direct Lake mode with **Power BI Desktop** is enabled by default. You can disable this feature by turning off the **Live edit of Power BI semantic models in Direct Lake mode** preview selection, found in **Options and Settings > Options > Preview features**. 

## Live edit a semantic model in Direct Lake mode

To perform a live edit of a semantic model in Direct Lake mode, take the following steps. 

1.	Open **Power BI Desktop** and select **OneLake data hub**:

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-02.png" alt-text="Screen shot of OneLake data hub banner item in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-02.png":::

You can also open the **OneLake data hub** from a blank report, as shown in the following image:

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-03.png" alt-text="Screen shot of OneLake data hub ribbon item in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-03.png":::

2.	Search for a semantic model in Direct Lake mode, expand the **Connect** button and select **Edit**.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-04.png" alt-text="Screen shot of searching for a semantic model for Direct Lake mode in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-04.png":::

> [!NOTE]
> Selecting a semantic model that is not in Direct Lake mode will result in an error.
> 
3.	The selected semantic model opens for editing at which point you are in live edit mode, as demonstrated in the following screenshot.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-05.png" alt-text="Screen shot of semantic model opening for editing in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-05.png":::

4.	You can edit your semantic model using Power BI Desktop, enabling you to make changes directly to the selected semantic model. Changes include all modeling tasks, such as renaming tables/columns, [creating measures](/power-bi/transform-model/desktop-measures), and [creating calculation groups](/power-bi/transform-model/calculation-groups). [DAX query view](/power-bi/transform-model/dax-query-view) is available to run DAX queries to preview data and test measures before saving them to the model.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-06.png" alt-text="Screen shot of adding calculation groups and other available tasks in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-06.png":::

> [!NOTE]
> Notice that the **Save** option is disabled, because you don’t need to save. Every change you make is immediately applied to the selected semantic model in the workspace.
> 
In the title bar, you can see the workspace and semantic model name with links to open these items in the Fabric portal.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-07.png" alt-text="Screen shot of semantic model matching issue." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-07.png":::

When you connect and live edit a semantic model. During the preview it's not possible to select an existing report to edit, and the **[Report view](/power-bi/create-reports/desktop-report-view)** is hidden. You can open an existing report or create a new one by live connecting to this semantic model in another instance of Power BI Desktop or in the workspace. You can write DAX queries in the workspace with DAX query view in the web. And you can visually explore the data with the new [explore your data](/power-bi/consumer/explore-data-service) feature in the workspace.


## Automatically save your changes

As you make changes to your semantic model, your changes are automatically saved and the **Save** button is disabled when in Live edit mode. Changes are permanent with no option to undo. 

If two or more users are live editing the same semantic model and a conflict occurs, Power BI Desktop alerts one of the users, shown in the following image, and refreshes the model to the latest version. Any changes you were trying to make will need to be performed again after the refresh.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-08.png" alt-text="Screen shot of error saving semantic model in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-08.png":::

## Edit tables

Changes to the tables and columns in the OneLake data source, typically a Lakehouse or Warehouse, like import or DirectQuery data sources, aren't automatically reflected in the semantic model. To update the semantic model with the latest schema, such as getting column changes in existing tables or to add or remove tables, go to **Transform data > Data source settings > Edit Tables**. 

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-09.png" alt-text="Screen shot of editing tables of a semantic model in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-09.png":::

Learn more about [Edit tables for Direct Lake semantic models](./direct-lake-edit-tables.md). 

## Use refresh

Semantic models in Direct Lake mode automatically reflect the latest data changes in the delta tables when *Keep your direct Lake data up to date* is enabled. When disabled, you can manually refresh your semantic model using Power BI Desktop **Refresh** button to ensure it targets the latest version of your data. This is also sometimes called *reframing*.


## Export to a Power BI Project

To support professional enterprise development workflows of semantic models in Direct Lake mode, you can export the definition of your semantic model after opening it for editing, which provides a local copy of the semantic model and report metadata that you can use with Fabric deployment mechanisms such as [Fabric Git Integration](../cicd/git-integration/intro-to-git-integration.md). The Power BI Desktop report view becomes enabled letting you view and edit the local report, publish directly from Power BI Desktop isn't available but you can publish using Git integration. The **Save** button is also enabled to save the local model metadata and report in the Power BI Project folder.

Navigate to **File > Export > Power BI Project** and export it as a [Power BI Project file (PBIP)](/power-bi/developer/projects/projects-overview).

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-10.png" alt-text="Screen shot of opening a Power BI Project in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-10.png":::

By default, the PBIP file is exported to the `%USERPROFILE%\Microsoft Fabric\repos\[Workspace Name]` folder. However, you can choose a different location during the export process.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-11.png" alt-text="Screen shot choosing a different path location for a Power BI Project file." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-11.png":::

Selecting **Export** opens the folder containing the PBIP files of the exported semantic model along with an empty report.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-12.png" alt-text="Screen shot of exported folder containing the files of an exported semantic model in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-12.png":::

After exporting you should open a new instance of Power BI Desktop and open the exported PBIP file to continue editing with a Power BI Project. When you open the PBIP file, Power BI Desktop prompts you to either create a new semantic model in a Fabric workspace, or select an existing semantic model for **remote modeling**.

### Remote modeling with a Power BI Project

When working on a Power BI Project (PBIP) with a semantic model that can't run on the local Power BI Analysis Services engine, such as Direct Lake mode, Power BI Desktop requires to be connected to a semantic model in a Fabric workspace, a remote semantic model. Like *live edit*, all changes you make are immediately applied to the semantic model in the workspace. However, unlike live edit, you can save your semantic model and report definitions to local PBIP files that can later be deployed to a Fabric workspace using a deployment mechanism such as [Fabric Git Integration](../cicd/git-integration/intro-to-git-integration.md).

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-13.png" alt-text="Diagram of remote semantic model modeling with a Power BI Project in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-13.png":::

> [!NOTE]
> Semantic models in Direct Lake mode, when exported to a Git repository using [Fabric Git Integration](../cicd/git-integration/intro-to-git-integration.md), can be edited using Power BI Desktop. To do so, make sure at least one report is connected to the semantic model, then open the report's exported [definition.pbir](/power-bi/developer/projects/projects-overview#definitionpbr) file to edit both the report and the semantic model.
> 

### Open your Power BI Project

When opening a Power BI Project (PBIP) that require a remote semantic model, Power BI Desktop prompts you to either create a new semantic model or select an existing semantic model in a Fabric workspace.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-14.png" alt-text="Screen shot of setting up the remote model for the Power BI Project." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-14.png":::

If you select an existent semantic model and the definition differs, Power BI Desktop warns you before overwriting, as shown in the following image.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-15.png" alt-text="Screen shot of semantic model issues in Power BI Desktop." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-15.png":::

> [!NOTE]
> You can select the same semantic model you exported the PBIP from. However, the best practice when working with a PBIP that requires a remote semantic model is for each developer to work on their own private remote semantic model to avoid conflicts with changes from other developers.
> 

Selecting the title bar displays both the PBIP file location and the remote semantic model living in a Fabric workspace, shown in the following image.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-16.png" alt-text="Screen shot of semantic model file location." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-16.png":::

A local setting will be saved in the Power BI Project files with the configured semantic model, next time you open the PBIP, you won't see the prompt, and Fabric semantic model will be overwritten with the metadata from the semantic model in the Power BI Project files.

### Change remote semantic model

During the **preview**, if you wish to switch the remote semantic model in the PBIP you must navigate to the `\*.SemanticModel\.pbi\localSettings.json` file. There, you can either modify the *remoteModelingObjectId* property to the ID of the semantic model you want to connect to, or remove the property altogether. Upon reopening the PBIP, Power BI Desktop connects to the new semantic model or prompts you to create or select an existing semantic model.

:::image type="content" source="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-17.png" alt-text="Screen shot of semantic model ID." lightbox="media/direct-lake-power-bi-desktop/direct-lake-power-bi-desktop-17.png":::

> [!NOTE]
> The configuration described in this section is intended solely for local development and should not be used for deployment across different environments.
> 
## Common uses for Direct Lake in Power BI Desktop

**Scenario:** I’m getting errors when opening the Direct Lake semantic model for Edit with Power BI Desktop.

**Solution:** Review all the [requirements and permissions](#requirements-and-permissions). If you met all the requirements, check whether you can edit the semantic modeling using [web modeling](/power-bi/transform-model/service-edit-data-models).

**Scenario:** I lost the connection to the remote semantic model and can't recover it. Have I lost my changes?

**Solution:** All your changes are immediately applied to the remote semantic model. You can always close Power BI Desktop and restart the editing session with the semantic model you were working on.

**Scenario:** I exported to Power BI Project (PBIP). Can I select the same semantic model I was live editing?

**Solution:** You can, but you should be careful. If each developer is working on their local PBIP and all select the same semantic model as a remote model, they'll overwrite each other's changes. The best practice when working with a PBIP is for each developer to have their own isolated copy of the Direct Lake semantic model.

**Scenario:** I’m live editing the Direct Lake semantic model and can't create field parameters.

**Solution:** When live editing a semantic model, Report View isn't available, which is required for the field parameters UI. You can export to a Power BI Project (PBIP) and open it to access Report View and the field parameters UI.

**Scenario:** I made changes to the semantic model using an external tool, but I don't see those changes reflected in Power BI Desktop.

**Solution:** Changes made by external tools are applied to the remote semantic model, but these changes will only become visible in Power BI Desktop after either the next modeling change is made within Power BI Desktop, or the semantic model is refreshed.


## Requirements and permissions

* XMLA Endpoint must be enabled on the tenant. Learn more in the [XMLA endpoint article](../admin/service-admin-portal-integration.md#allow-xmla-endpoints-and-analyze-in-excel-with-on-premises-datasets).
* XMLA Endpoint with *Read Write* access must be enabled at the capacity. Learn more in the [tools article](/power-bi/enterprise/service-premium-connect-tools).
* User must have *Write* permission on the semantic model. Learn more in the [permissions article](/power-bi/connect-data/service-datasets-permissions).
* User must have *Viewer* permission on the lakehouse. Learn more in the [lakehouse article](/fabric/data-engineering/workspace-roles-lakehouse).
* This feature is unavailable for users with a free license.




## Considerations and limitations

Live edit of semantic models in Direct Lake mode in Power BI Desktop is currently in preview. Keep the following in mind:

* You can't edit default semantic models.
* You can't transform data using Power Query editor. In the Lakehouse you can use a dataflow to perform Power Query transformations.
* You can’t have multiple data sources. You can shortcut to or add additional data to Lakehouse or Warehouse data sources to use in the semantic model.
* You can't publish the Power BI Project (PBIP) from Power BI Desktop. You can use Fabric Deployment mechanisms such as Fabric Git Integration or Fabric Item APIs to publish your local PBIP files to a Fabric workspace.
* You can't validate RLS roles from Power BI Desktop. You can validate the role in the service.
* Service-created model diagram layouts aren't displayed in Power BI Desktop, and layouts created in Power BI Desktop aren't persisted in the Power BI service.
* Signing off during editing could lead to unexpected errors.
* You can open external tools, but the external tool must manage authentication to the remote semantic model.
* Changing the data category to *barcode* won't allow reports linked to the semantic model to be filtered by barcodes.
* Externally shared semantic models aren't eligible for live edit.

Additionally, please consider the current known issues and limitations of Direct Lake.



## Related content

- [Direct Lake overview](direct-lake-overview.md)
- [Power BI Project files](/power-bi/developer/projects/projects-overview)
