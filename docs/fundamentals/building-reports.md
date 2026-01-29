---
title: Build Power BI Reports with Direct Lake Tables
description: Learn how to build Power BI reports on top of semantic models with Direct Lake tables
ms.reviewer: snehagunda
ms.author: zoedouglas
author: DataZoeMS
ms.topic: how-to
ms.custom:
ms.date: 10/01/2025
ms.search.form: Direct Lake Power BI Reporting
---


# Build Power BI Reports with Direct Lake Tables

Semantic models with Direct Lake tables can be used like any other Power BI semantic model. You can create Power BI reports, Power BI explorations, and run Data Analysis eXpression (DAX) queries.

When a Power BI report shows data in visuals, it requests it from the semantic model. With Direct Lake mode, the semantic model accesses the OneLake delta table to consume data and return it to the Power BI report. For efficiency, the semantic model can keep some recently accessed data in the cache.

With Direct Lake on SQL, when the semantic model can't use Direct Lake it can fall back to DirectQuery and access the data via the SQL analytics endpoint. This behavior is controlled by the **Direct Lake behavior** property.

## Creating a report

Creating a report from a Power BI semantic model is easy. The report live connects to the semantic model. In a live connection, the report can be created and edited without editing the semantic model itself. You need at least Build permission on the semantic model to live connect.

### Power BI Desktop

Power BI Desktop can live connect to any semantic model in the Power BI service to create a report.

> [!NOTE]
> Live connect is different from live editing a semantic model in Power BI Desktop. Live connect is also different than having a local semantic model with import or DirectQuery tables and report together.

1. Open **Power BI Desktop**
1. Select **OneLake catalog** or **Get data from other sources** ribbon button
1. Filter by **Semantic model**
1. Select the semantic model with the Direct Lake tables and then **Connect**

You're now live connected to the semantic model and can start creating the report. Learn more about Power BI reports at the [Power BI reporting documentation](/power-bi/create-reports/). Save the file locally and publish to any workspace when ready to see it online and share with others.

In Power BI Desktop, report measures can be created in a live connected report to add a calculation without adding measures to the semantic model itself.

### Power BI service or Fabric portal

The Power BI service or Fabric portal has many paths to create a report with a live connection to a semantic model. Here are a few of the paths to create a report.

- Use the context menu (...) of a semantic model in a workspace, then choose **Create report**
- From **Home** choose **New report**, then **Pick a published semantic model** and select the semantic model with Direct lake tables
- From **OneLake catalog** using the drop-down **All items by** filter to **Data** and **Semantic model**, select the semantic model with Direct lake tables then select **Explore** and **Create a blank report** from the top bar
- In web modeling, after choosing **Open data model**, go to **File**, then **Create new report**

:::image type="content" source="media\power-bi-reporting\dataset.png" alt-text="Screenshot of the semantic model details page." lightbox="media\power-bi-reporting\dataset.png":::

Any of these actions create a Power BI report in the web browser.

### Other reporting options

There are many other ways to use Power BI semantic models. Here are a few of the other options.

- [Explore](/power-bi/consumer/explore-data-service) are created from the context menu or details page of a semantic model in the Power BI service
- [Paginated reports](/power-bi/paginated-reports/paginated-reports-report-builder-power-bi) are created from the context menu or details page of a semantic model in the Power BI service
- [DAX queries](/dax/dax-queries) can be run from the context menu or details page of a semantic model in the Power BI service or in Power BI Desktop using [DAX query view](/power-bi/transform-model/dax-query-view)
- [Excel with Power BI add-on pane](/power-bi/collaborate-share/service-analyze-in-excel) can be used to create refreshable pivot tables or flat tables of data from a semantic model

## Setting permissions for report consumption

The semantic model in Direct Lake mode is consuming data from the OneLake on demand when visuals load in a report. To make sure that data is accessible, necessary permissions on the Fabric item that owns the OneLake data need to be set. 

The semantic model can use single sign-on (SSO) or a fixed identity to access OneLake data of a Fabric item. With SSO, the report consumers need access to the data in the Fabric item. With a fixed identity, report consumers need _viewer_ role or higher on the semantic model and report, or access granted to the report via an [app](/power-bi/collaborate-share/service-create-distribute-apps).

_Viewer_ role or higher can be granted via [workspace roles](/fabric/fundamentals/roles-workspaces) or individually to any Fabric item, semantic model, or report.

Also, with fixed identity, row-level security defined in the semantic model can limit the data the report consumer sees while maintaining Direct Lake mode.

### Consumption scenarios

Here are some common scenarios to demonstrate how to use these different permission options.

#### Permissions to view report only

Use a fixed identity to the Fabric item on the semantic model, and publish the report.

- **App option:** Publish an app from the workspace with the report. Only give report consumers permission in the app.

- **Item option**: Grant report consumers _viewer_ role on both the report and semantic model individually.

- **Workspace option:** Publish the report and semantic model to their own workspace, separate from the source Fabric item, and grant report consumers _viewer_ role on the workspace. [Workspace roles](/fabric/fundamentals/roles-workspaces) apply to all items in the workspace, including new items are added later.

#### Permissions to view report and create their own reports only

Use a fixed identity to the Fabric item on the semantic model, and publish the report.

- **App option:** Publish an app from the workspace with the report. Give report consumers permission in the app, with the advanced option to include _build_ permission to create their own reports.

- **Item option**: Grant report consumers _viewer_ role on both the report and semantic model individually. Include _build_ access on the semantic model.

- **Workspace option:** Publish the report and semantic model to their own workspace, separate from the source Fabric item, and grant report consumers _viewer_ role on the workspace. [Workspace roles](/fabric/fundamentals/roles-workspaces) apply to all items in the workspace, including new items added later. Include _build_ access on the semantic model.

#### Permissions to view report, create their own reports, use the SQL analytics endpoint, and access the delta tables directly

Use SSO to the Fabric item on the semantic model, and publish the report.

- **App option:** Publish an app from the workspace with the report. Give report consumers permission in the app, with the advanced option to include _build_ permission to create their own reports. In addition, make sure the users have _ReadAll_ permission on the Fabric item.

- **Item option**: Grant report consumers _viewer_ role on both the report and semantic model individually. Include _build_ access on the semantic model. In addition, make sure the users have _ReadAll_ permission on the Fabric item.

- **Workspace option:** Publish the report and semantic model to the workspace with the source Fabric item, and grant report consumers _viewer_ role on the workspace. [Workspace roles](/fabric/fundamentals/roles-workspaces) apply to all items in the workspace, including new items added later. Include _build_ access on the semantic model and ReadAll access on the Fabric item.

#### Permissions to view and edit the report, semantic model, and Fabric items in the workspace

Use SSO to the Fabric item on the semantic model, and publish the report. Grant the users any [workspace roles](/fabric/fundamentals/roles-workspaces) higher than _viewer_.

## Related content

- [Power BI reporting](/power-bi/create-reports/)
