---
title: "Learn About Editing Semantic Models in Direct Lake in Power BI Desktop"
description: Describes using Power BI Desktop to edit semantic models in Power BI Desktop.
author: DataZoeMS
ms.author: zoedouglas
ms.date: 08/01/2025
ms.service: powerbi
ms.subservice: powerbi-premium
ms.topic: how-to
LocalizationGroup: Admin
---
# Direct Lake in Power BI Desktop

Power BI Desktop can create and edit Power BI semantic models with Direct Lake tables. Semantic models with Direct Lake tables are created in, and edited from, the Fabric workspace, not on your local machine, so when using Power BI Desktop, you **live edit** the semantic model where it is. There's no publish action as changes made in Power BI Desktop happen to the semantic model in the Fabric workspace. This experience is the same as when you're editing the semantic model in the web, or in the Fabric workspace, by choosing the **Open data model** action. 

**Version history** is available and automatically creates a version each time you start a live editing session, so you can undo an accidental change. **Git integration** is also available for semantic models, giving you full control over changes. And **deployment pipelines** can also be used to only live edit a semantic model in a development workspace before pushing to a production workspace.

In a semantic model with import tables, the data is downloaded and locally available on your computer. In a semantic model with Direct Lake tables, the data remains in the OneLake. When visuals use data, the semantic model provides the data from where it is stored. Learn more about [Direct Lake query performance](direct-lake-understand-storage.md).

Metadata for the semantic model that is the information about the tables columns, measures, relationships, and all other semantic modeling features, can be downloaded, with the data, as a **PBIX file** for semantic models not using Direct Lake tables. Metadata for the semantic model when you include Direct Lake tables can also be downloaded, without the data, using the **Power BI Project (PBIP)** format. Learn more about [Direct Lake with PBIP](direct-lake-power-bi-project.md).

Power BI reports can be created from all semantic models from Power BI Desktop with a live connection by choosing a **Power BI semantic model** from the **OneLake catalog** and selecting **Connect**. Reports can also be created in the Fabric workspace from many places, including the right-click context menu and choosing **create a report**. Learn more about [building reports](building-reports.md).

This article discusses more details about live editing in Power BI Desktop, and how to create and add Direct Lake tables to a semantic model in Power BI Desktop.

## Create a semantic model with Direct Lake tables

To create a semantic model with Direct Lake tables, take the following steps.

1. Open **Power BI Desktop** and select **OneLake catalog**.
1. Select a Fabric item, such as a **Lakehouse** or **Warehouse**, and press **Connect**.
1. Give your semantic model a name, pick a Fabric workspace for it, and select the tables to include. Then press **OK**.

The semantic model is created in the Fabric workspace and now you're live editing the semantic model in Power BI Desktop.

Semantic models with Direct Lake tables created in Power BI Desktop use **Direct Lake on OneLake** storage mode. The differences between Direct Lake on OneLake and Direct Lake on SQL are explained in the [Overview](direct-lake-overview.md).

:::image type="content" source="media/direct-lake-power-bi-desktop/power-bi-desktop-direct-lake-create.png" alt-text="Screenshot of Power BI Desktop when creating a semantic model with tables in Direct Lake storage mode." lightbox="media/direct-lake-power-bi-desktop/power-bi-desktop-direct-lake-create.png":::

## Add Direct Lake tables from other Fabric items

To add Direct Lake tables from other Fabric items, take the following steps.

1. While live editing a Direct Lake on OneLake semantic model in Power BI Desktop, open the **OneLake catalog** and select another Fabric item, such as a **Lakehouse** or **Warehouse**.
1. In the dialog, select the tables you want to include then press **OK**.

The tables are added to your semantic model and you can continue live editing. 

:::image type="content" source="media/direct-lake-power-bi-desktop/power-bi-desktop-direct-lake-add.png" alt-text="Screenshot of Power BI Desktop when adding tables in Direct Lake storage mode." lightbox="media/direct-lake-power-bi-desktop/power-bi-desktop-direct-lake-add.png":::

## Live edit a semantic model with Direct Lake

To edit a semantic model with Direct Lake tables later, take the following steps.

1. In a **new instance of Power BI Desktop**, open the **OneLake catalog** and select the **Power BI semantic model**.
1. Select the **Connect** dropdown list and choose **Edit**.

Now you're live editing the semantic model.

:::image type="content" source="media/direct-lake-power-bi-desktop/power-bi-desktop-direct-lake-edit.png" alt-text="Screenshot of Power BI Desktop when editing a semantic model with tables in Direct Lake storage mode later." lightbox="media/direct-lake-power-bi-desktop/power-bi-desktop-direct-lake-edit.png":::

> [!NOTE]
> Semantic models with Direct Lake tables are supported. Import tables must be part of a Direct Lake composite model.
>
>**Edit tables**, **OneLake catalog**, and **Transform data** are only available in web modeling. [Use Direct Lake in Power BI web modeling](direct-lake-web-modeling.md).

Alternatively, if you have [exported the semantic model to a Power BI Project (PBIP)](direct-lake-power-bi-project.md), take the following steps.

1. Double-click the PBIP file on in the Power BI Project (PBIP) folder.
1. Or, in Power BI Desktop choose **File** then **Open** and navigate to the **PBIP file in the Power BI Project (PBIP)** folder.

## Live editing in Power BI Desktop differences

Live editing in Power BI Desktop is different than editing a local model with import and DirectQuery tables, and different than editing a report with a live connection. 

### Report view

The report view is removed when live editing, unless you're [live editing with Power BI Project (PBIP)](direct-lake-power-bi-project.md). 

To create a report, follow these steps in Power BI Desktop.

1. Select **File** then **Blank report** to create a new report.
1. Open the **OneLake catalog** and choose the **Power BI semantic model** you're live editing (it should show at the top of the list). 
1. Select **Connect**.
1. Now you can create the report. Save the file and publish to the Fabric workspace when ready.

Learn more about [building reports](building-reports.md).

### Table view

The table view is also removed when live editing, unless you have a [calculation group](https://aka.ms/calculationgroups) or [calculated table](/power-bi/transform-model/desktop-calculated-tables) in the semantic model. These derived tables use import storage mode. Calculated tables without direct references to Direct Lake table columns are allowed. A common example is using [INFO.VIEW DAX functions](/dax/info-functions-dax#infoview-dax-functions) to self-document the semantic model. 

> [!NOTE]
> Import tables from any data source can be added to the semantic model with Direct Lake on OneLake tables using web modeling. [Use Direct Lake in Power BI web modeling](direct-lake-web-modeling.md).

### Saving

As you make changes to your semantic model, your changes are automatically saved and the **Save** button is disabled when in Live edit mode. Changes made in Power BI Desktop automatically happen to the semantic model in the Fabric workspace. 

[Version history](/power-bi/transform-model/service-semantic-model-version-history) creates a version at the beginning of each live editing session if you need to revert a change. There's no undo action available as you make changes. [Git integration](../cicd/git-integration/intro-to-git-integration.md) or using [deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md) to first live edit in a development workspace then pushing to a production environment are also available to live edit without affecting downstream users.

There's no local file created but if you would like a local copy of the metadata, you can [export to a Power BI Project (PBIP)](direct-lake-power-bi-project.md) and continue live editing with a **Save** button for the local metadata. You can utilize local Git techniques to undo changes. To export to Power BI Project (PBIP), go to **File** then **Export**, and choose **Power BI Project (PBIP)**.

If two or more users are live editing the same semantic model and a conflict occurs, Power BI Desktop alerts one of the users, and syncs the model to the latest version. Any changes you were trying to make will need to be performed again after the model sync. This behavior is the same behavior as [editing data models in the Power BI service](/power-bi/transform-model/service-edit-data-models), also called web modeling.

### Refresh

Selecting the Refresh button when live editing a semantic model with Direct Lake tables performs a schema refresh and reframe the Direct Lake tables. 

The schema refresh checks the tables definitions in the model and compares it to the same named table in the data source for any changes to columns. Changes detected from the data source, in this case a Fabric artifact, are made to the semantic model. For example, a column was added to a table. Changing the table or column name in the semantic model in Power BI Desktop persist after a refresh. 

Changing a table or column name at the data source removes the table or column on the next schema refresh. You can use [TMDL view](/power-bi/transform-model/desktop-tmdl-view) to see the SourceLineageTag property and update it to the new name to avoid the semantic model removing it on schema refresh.

Another way to perform a schema refresh is to return to [Edit tables](direct-lake-edit-tables.md) and select **OK**. Go to **Transform data** dropdown list then **Data source settings** and select **Edit tables**.

Scheduled refresh in the Fabric workspace only reframe the Direct Lake tables without a schema refresh. Learn more about [refresh in Power BI](/power-bi/connect-data/refresh-data).

### Power BI Project (PBIP)

When working on a Power BI Project (PBIP) with a semantic model with Direct Lake tables, Power BI Desktop needs to connect to a semantic model in a Fabric workspace, also termed as a remote semantic model. Remote modeling is live editing, as all changes you make are immediately applied to the semantic model in the workspace. In addition, you can save your semantic model and report definitions, or metadata, to your local PBIP files. The PBIP files can later be deployed to a Fabric workspace using a deployment mechanism such as Fabric Git Integration. Learn more about [remote modeling with Power BI Project (PBIP)](direct-lake-power-bi-project.md)

### Name in header links

Selecting the name of the semantic model in the top left corner of Power BI Desktop expands to show the location of the semantic model in the Fabric workspace. Selecting the workspace name or semantic model name navigates you to them in the web. Version history is also available.

### TMDL view

TMDL (Tabular Model Definition Language) view can be used with Direct Lake semantic models. The TMDL scripts aren't saved unless you're live editing with a [Power BI Project (PBIP)](direct-lake-power-bi-project.md). Learn more about [TMDL view](/power-bi/transform-model/desktop-tmdl-view). 

### DAX query view

DAX (Data Analysis Expressions) query view can be used with Direct Lake semantic models. The DAX queries aren't saved unless you're live editing with a [Power BI Project (PBIP)](direct-lake-power-bi-project.md). Learn more about [DAX query view](/power-bi/transform-model/dax-query-view). 


<a id="migrating-direct-lake-on-sql-semantic-models-to-direct-lake-on-onelake"></a>

## Migrate Direct Lake on SQL semantic models to Direct Lake on OneLake

If you already have an existing **Direct Lake on SQL** semantic model and want to migrate to **Direct Lake on OneLake**, you can by using **TMDL view**. Direct Lake on OneLake offers the advantage of having tables from multiple sources and no fallback to DirectQuery. 

These migration steps aren't recommended if you're using SQL analytics endpoint views in the Direct Lake on SQL semantic model. 

To change to Direct Lake on OneLake, follow these steps.

1. **Live edit** the semantic model you want to migrate in Power BI Desktop.
1. In the header, open the dropdown list on the name and choose **Version history** to make a version to return to, if you want to have that option.
1. Go to **TMDL view**.
1. Drag the **Semantic model** node into the editor to script the entire model.
1. Find the **Expression** toward the bottom of the script.
1. Change <code>Sql.Database("SQL endpoint connection string", "ID of the SQL analytics endpoint")</code> to <code>AzureStorage.DataLake("https://onelake.dfs.fabric.microsoft.com/ID of the workspace/ID of the lakehouse or warehouse")</code>.
1. If the source is a **Lakehouse without schemas**, remove all <code>schemaName</code> property references. Select **Find** in the ribbon to find one. Select it and use <code>CTRL+SHIFT+L</code> to select them all, then <code>CTRL+SHIFT+K</code> to remove all the lines at once.
1. Then select **Apply**.
1. On success, go to **Model view** to **Refresh** the model. You can adjust credentials in the **Settings** page of the model in the web.

Now the semantic model is using Direct Lake on OneLake. If there are issues, you can restore to the version you created to return to Direct Lake on SQL storage mode.

## Requirements and permissions

* XMLA Endpoint must be enabled on the tenant. Learn more in the [XMLA endpoint article](../admin/service-admin-portal-integration.md#allow-xmla-endpoints-and-analyze-in-excel-with-on-premises-datasets).
* XMLA Endpoint with *Read Write* access must be enabled at the capacity. Learn more in the [tools article](/power-bi/enterprise/service-premium-connect-tools).
* User must have *Write* permission on the semantic model. Learn more in the [permissions article](/power-bi/connect-data/service-datasets-permissions).
* User must have *Viewer* permission on the lakehouse. Learn more in the [lakehouse article](../data-engineering/workspace-roles-lakehouse.md).
* This feature is unavailable for users with a free license.

## Considerations and limitations

* You can't have multiple data sources when using Direct Lake on SQL. Add data to the Fabric data source used by semantic model. Multiple data sources are supported for Direct Lake on OneLake storage mode.
* You can't publish the Power BI Project (PBIP) from Power BI Desktop. You can use Fabric Deployment mechanisms such as Fabric Git Integration or Fabric Item APIs to publish your local PBIP files to a Fabric workspace.
* You can't validate RLS roles from Power BI Desktop. You can validate the role in the service.
* You can't sign out during live editing without unexpected errors.
* You can open external tools, but the external tool must manage authentication to the remote semantic model.
* You can change the data category to *barcode*, but reports linked to the semantic model can't filter by barcodes.
* You can't live edit externally shared semantic models.
* You can use live edit on import tables only if they're part of a composite model, including Direct Lake on OneLake tables
* Review the current [known issues and limitations of Direct Lake](direct-lake-overview.md#considerations-and-limitations).

## Related content

- [Direct Lake overview](direct-lake-overview.md)
- [Power BI Project files](/power-bi/developer/projects/projects-overview)
