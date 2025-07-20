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

Power BI Desktop can create and edit Power BI semantic models with Direct Lake tables. Semantic models with Direct Lake tables are created in, and edited from, the Fabric workspace, not on your local machine, so when using Power BI Desktop, you **live edit** the semantic model where it is. There is no publish action as changes made in Power BI Desktop happen to the semantic model in the Fabric workspace. This is the same as when you are editing the semantic model in the web, or in the Fabric workspace, by choosing the **Open data model** action. 

**Version history** is available and automatically creates a version each time you start a live editing session, so you undo an accidental change. **Git integration** is also available for semantic models, giving you full control over changes. And **deployment pipelines** can also be used to only live edit a semantic model in a development workspace before pushing to a production workspace.

In a semantic model with import tables, the data is downloaded and locally available on your computer. In a semantic model with Direct Lake tables, the data remains in the OneLake. When visuals use data, the semantic model provides the data from where it is stored. 

Metadata for the semantic model that is the information about the tables columns, measures, relationships, and all other semantic modeling features, can be downloaded, with the data, as a **PBIX file** for semantic models not using Direct Lake tables. Metadata for the semantic model when you include Direct Lake tables can also be downloaded, without the data, using the **Power BI Project (PBIP)** format.

Power BI reports can be created from all semantic models from Power BI Desktop with a live connection by choosing a **Power BI semantic model** from the **OneLake catalog** and selecting **Connect**. Reports can also be created in the Fabric workspace from many places, including the right-click context menu and choosing **create a report**.

This article discusses more details about live editing in Power BI Desktop, and how to create and add Direct Lake tables to a semantic model in Power BI Desktop.

## Enable preview feature

Live editing semantic models in Direct Lake mode with Power BI Desktop is enabled by default. You can disable this feature by turning off the **Live edit of Power BI semantic models in Direct Lake mode** preview selection, found in **Options** and Settings** > **Options** > **Preview features**.

Creating semantic models with Direct Lake tables is in public preview, and you need to enable it. You can enable this feature by turning on **Create semantic models in Direct Lake storage mode from one or more Fabric artifacts** preview selection, found in **Options and Settings** > **Options** > **Preview features**.

## Create a semantic model with Direct Lake tables

To create a semantic model with Direct Lake tables, take the following steps.

1.	Open **Power BI Desktop** and select **OneLake catalog**
2.	Select a **Lakehouse** or **Warehouse** and press **Connect**
3.	Give your semantic model a name, pick a Fabric workspace for it, and select the tables to include. Then press **OK**.

The semantic model is created in the Fabric workspace and now you are live editing the semantic model in Power BI Desktop.

Semantic models with Direct Lake tables created in Power BI Desktop use **Direct Lake on OneLake** storage mode. The differences between Direct Lake on OneLake and Direct Lake on SQL are explained in the [Overview](direct-lake-overview.md).

> [!Note]
> Adding shortcut tables may cause an error. To use a shortcut table with Direct Lake on OneLake, onboarding to the early access or limited preview version of [OneLake security](/fabric/onelake/security/get-started-security#onelake-security-preview) is required. Using any table in a Lakehouse with only the public preview of OneLake security is not supported and will result in an error.


## Add Direct Lake tables from other Fabric artifacts

To add Direct Lake tables from other Fabric artifacts, take the following steps.

1.	While live editing a Direct Lake on OneLake semantic model in Power BI Desktop, open the **OneLake catalog** and select another **Lakehouse** or **Warehouse**
2.	In the dialog, select the tables you want to include then press **OK**

The tables are added to your semantic model and you can continue live editing 

## Live edit a semantic model with Direct Lake tables

To edit a semantic model with Direct Lake tables later, take the following steps.

1.	In a **new instance of Power BI Desktop**, open the **OneLake ** and select the **Power BI semantic model**
2.	Select the **Connect drop-down button** and choose **Edit**.

Now you are live editing the semantic model.

> [!NOTE]
> Semantic models with Direct Lake storage modes are supported. Selecting a semantic model with tables in other storage modes results in an error.

Alternatively, if you have [exported the semantic model to a Power BI Project (PBIP)](direct-lake-power-bi-project.md), take the following steps.

1.	Double-click the PBIP file on in the Power BI Project (PBIP) folder
2.	Or, in Power BI Desktop choose **File** then **Open** and navigate to the **PBIP file in the Power BI Project (PBIP)** folder

## Live editing in Power BI Desktop differences

Live editing in Power BI Desktop is different than editing a local model with import and DirectQuery tables, and different than editing a report with a live connection. 

### Report view

The report view is removed when live editing, unless you are [live editing with Power BI Project (PBIP)](direct-lake-power-bi-project.md). 

To create a report, follow these steps in Power BI Desktop.

1.	Go to **File** then **Blank report** to open a new instance of Power BI Desktop
2.	Open the **OneLake catalog** and choose the **Power BI semantic model** you are live editing (it should show at the top of the list) and press **Connect**

Now you can create the report. Save the PBIX file and publish to the Fabric workspace when ready.

### Table view

The table view is also removed when live editing, unless you have a [calculation group](https://aka.ms/calculationgroups) or [calculated table](/power-bi/transform-model/desktop-calculated-tables) in the semantic model. These derived tables use import storage mode. Calculated tables without direct references to Direct Lake table columns are allowed. A common example is using [INFO.VIEW DAX functions](/dax/info-functions-dax#infoview-dax-functions) to self-document the semantic model. 

> [!NOTE]
> Import tables from any data source may be added to the semantic model with Direct Lake on OneLake tables using XMLA but live editing Power BI Desktop is not yet supported for this scenario.

### Saving

As you make changes to your semantic model, your changes are automatically saved and the **Save** button is disabled when in Live edit mode. Changes made in Power BI Desktop automatically happen to the semantic model in the Fabric workspace. 

[Version history](/power-bi/transform-model/service-semantic-model-version-history) creates a version at the beginning of each live editing session if you need to revert a change. There is no undo action available as you make changes. [Git integration](/fabric/cicd/git-integration/intro-to-git-integration?tabs=azure-devops) or using [deployment pipelines](/fabric/cicd/deployment-pipelines/get-started-with-deployment-pipelines) to first live edit in a development workspace then pushing to a production environment are also available to live edit without impacting downstream users.

There is no PBIX file created but if you would like a local copy of the metadata, you can [export to a Power BI Project (PBIP)](direct-lake-power-bi-project.md) and continue live editing with a **Save** button for the local metadata. You can utilize local Git techniques to undo changes. To export to Power BI Project (PBIP), go to **File** then **Export**, and choose **Power BI Project (PBIP)**.

If two or more users are live editing the same semantic model and a conflict occurs, Power BI Desktop alerts one of the users, and syncs the model to the latest version. Any changes you were trying to make will need to be performed again after the model sync. This behavior is the same behavior as [editing data models in the Power BI service](/power-bi/transform-model/service-edit-data-models), also called web modeling.

### Refresh

Selecting the Refresh button when live editing a semantic model with Direct Lake tables performs a schema refresh and reframe the Direct Lake tables. 

The schema refresh checks the tables definitions in the model and compares it to the same named table in the data source for any changes to columns. Changes detected from the data source, in this case a Fabric artifact, are made to the semantic model. For example, a column was added to a table. Changing the table or column name in the semantic model in Power BI Desktop persist after a refresh. 

Changing a table or column name at the data source removes the table or column on the next schema refresh. You can use [TMDL view](/power-bi/transform-model/desktop-tmdl-view) to see the SourceLineageTag property and update it to the new name to avoid the semantic model removing it on schema refresh.

Another way to perform a schema refresh is to return to [Edit tables](/fabric/fundamentals/direct-lake-edit-tables) and click **OK**. Go to **Transform data drop-down** then **Data source settings** and click **Edit tables**.

Scheduled refresh in the Fabric workspace only reframe the Direct Lake tables without a schema refresh. Learn more about [refresh in Power BI](/power-bi/connect-data/refresh-data).

### Power BI Project (PBIP)

When working on a Power BI Project (PBIP) with a semantic model with Direct Lake tables, Power BI Desktop needs to connect to a semantic model in a Fabric workspace, also termed as a remote semantic model. Remote modeling is live editing, as all changes you make are immediately applied to the semantic model in the workspace. However, unlike live edit, you can save your semantic model and report definitions, or metadata, to your local PBIP files that can later be deployed to a Fabric workspace using a deployment mechanism such as Fabric Git Integration. Learn more about [remote modeling with Power BI Project (PBIP)](direct-lake-power-bi-project.md)

### Name in header links

Selecting the name of the semantic model in the top left corner of Power BI Desktop expands to show the location of the semantic model in the Fabric workspace. Selecting the workspace name or semantic model name navigates you to them in the web. Version history is also available.

### TMDL view

TMDL (Tabular Model Definition Language) view can be used with Direct Lake semantic models. The TMDL scripts are not saved unless you are live editing with a [Power BI Project (PBIP)](direct-lake-power-bi-project.md). Learn more about [TMDL view](/power-bi/transform-model/desktop-tmdl-view). 

### DAX query view

DAX (Data Analysis Expressions) query view can be used with Direct Lake semantic models. The DAX queries are not saved unless you are live editing with a [Power BI Project (PBIP)](direct-lake-power-bi-project.md). Learn more about [DAX query view](/power-bi/transform-model/dax-query-view). 


## Migrating Direct Lake on SQL semantic models to Direct Lake on OneLake

If you already have an existing **Direct Lake on SQL** semantic model and want to migrate to **Direct Lake on OneLake**, you can by using **TMDL view**. Direct Lake on OneLake offers the advantage of having tables from multiple sources and no fallback to DirectQuery. 

This is not recommended if you are using views or shortcut tables in the Direct Lake on SQL semantic model.

To change to Direct Lake on OneLake, follow these steps.

1. **Live edit** the semantic model you want to migrate in Power BI Desktop.
2. In the header, open the drop-down on the name and choose **Version history** to make a version to return to, if you want to have that option.
3. Go to **TMDL view**.
4. Drag the **Semantic model** node into the editor to script the entire model.
5. Find the **Expression** toward the bottom of the script.
6. Change <code>Sql.Database("SQL endpoint connection string", "ID of the SQL analytics endpoint")</code> to <code>AzureStorage.DataLake("https://onelake.dfs.fabric.microsoft.com/ID of the workspace/ID of the lakehouse or warehouse")</code>.
7. If the source is a **Lakehouse without schemas**, remove all <code>schemaName</code> property references. Select **Find** in the ribbon to find one. Select it and use <code>CTRL+SHIFT+L</code> to select them all, then <code>CTRL+SHIFT+K</code> to remove all the lines at once.
8. Then click **Apply**.
9. On success, go to **Model view** to **Refresh** the model. You may need to go to the model in the web to adjust credentials in the **Settings** page.

Now the semantic model is using Direct Lake on OneLake. If there are issues, you can restore to the version you created to return to Direct Lake on SQL storage mode.

## Requirements and permissions

* XMLA Endpoint must be enabled on the tenant. Learn more in the [XMLA endpoint article](../admin/service-admin-portal-integration.md#allow-xmla-endpoints-and-analyze-in-excel-with-on-premises-datasets).
* XMLA Endpoint with *Read Write* access must be enabled at the capacity. Learn more in the [tools article](/power-bi/enterprise/service-premium-connect-tools).
* User must have *Write* permission on the semantic model. Learn more in the [permissions article](/power-bi/connect-data/service-datasets-permissions).
* User must have *Viewer* permission on the lakehouse. Learn more in the [lakehouse article](/fabric/data-engineering/workspace-roles-lakehouse).
* This feature is unavailable for users with a free license.

## Considerations and limitations

Live edit of semantic models in Direct Lake mode in Power BI Desktop is currently in preview. Keep the following in mind:

* You can't edit default semantic models.
* You can't transform data using Power Query editor. In the Lakehouse, you can use a dataflow to perform Power Query transformations.
* You can’t have multiple data sources when using Direct Lake on SQL. Add data to the Fabric data source used by semantic model. Multiple data sources are supported for Direct Lake on OneLake storage mode.
* You can't publish the Power BI Project (PBIP) from Power BI Desktop. You can use Fabric Deployment mechanisms such as Fabric Git Integration or Fabric Item APIs to publish your local PBIP files to a Fabric workspace.
* You can't validate RLS roles from Power BI Desktop. You can validate the role in the service.
* Service-created model diagram layouts aren't displayed in Power BI Desktop, and layouts created in Power BI Desktop aren't persisted in the Power BI service.
* Signing off during editing could lead to unexpected errors.
* You can open external tools, but the external tool must manage authentication to the remote semantic model.
* Changing the data category to *barcode* won't allow reports linked to the semantic model to be filtered by barcodes.
* Externally shared semantic models aren't eligible for live edit.
* Adding shortcut tables may cause an error. To use a shortcut table with Direct Lake on OneLake, onboarding to the early access or limited preview version of [OneLake security](/fabric/onelake/security/get-started-security#onelake-security-preview) is required. Using any table in a Lakehouse with only the public preview of OneLake security is not supported and will result in an error.

In addition to the current known issues and limitations of Direct Lake.



## Related content

- [Direct Lake overview](direct-lake-overview.md)
- [Power BI Project files](/power-bi/developer/projects/projects-overview)
