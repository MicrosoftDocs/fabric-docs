---
title: "Fabric Planning Tutorial: Set Up Your Environment"
description: "Fabric planning tutorial part 0: prepare your workspace, enable tenant settings, connect a semantic model, and create your first planning sheet"
ms.date: 09/02/2026
ms.topic: tutorial
ai-usage: ai-assisted
---

# Fabric planning tutorial part 0: Introduction and environment setup

In this tutorial series, you build a complete enterprise planning solution in Microsoft Fabric. Starting from scratch, you connect to a semantic model, set revenue targets, generate statistical forecasts, build P&L hierarchies, and create a multi-dimensional profitability view by using planning sheets.

You then move your IT asset data out of spreadsheets into PowerTable, a governed data app in Fabric planning. Here, you create the database, build a sheet for each table, format and connect the columns, and keep the data relevant through appropriate insertions and updates.

Finally, by using intelligence sheets, you turn a live semantic model into an interactive enterprise dashboard, building variance and trend charts, KPI cards, and filters, and adding comments to collaborate with your team.

## Prerequisites

Before starting this tutorial series, verify that you have:

1. Access to a Microsoft Fabric capacity (F2 or higher) or a [Fabric trial](../../../../fundamentals/fabric-trial.md).
1. A workspace role as Member or Admin. Contributor access isn't sufficient - planning requires Member or Admin to create connections and generate embed tokens.
1. The following tenant settings enabled in the Fabric admin portal:

    * **Integration settings** > **Allow XMLA Endpoints & Analyze in Excel with on-premises semantic models**.

        :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/integration-settings-allow-xmla-endpoints.png" alt-text="Screenshot of integration settings option enabled to allow xmla endpoints with on-premise datasets." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/integration-settings-allow-xmla-endpoints.png":::

    * **Developer settings** > **Embed content in apps**

        :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/developer-settings-embed-content.png" alt-text="Screenshot of developer settings to embed content in apps." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/developer-settings-embed-content.png":::

    * **Developer settings** > **Service principals can call Fabric public APIs**

        :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/developer-settings-service-principal.png" alt-text="Screenshot of developer settings option enabled for service principals to call public APIs." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/developer-settings-service-principal.png":::

1. Under **Capacity Settings**, ensure the **XMLA Endpoint** setting is set to **Read Only** or **Read Write**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/capacity-settings-xmla-endpoint-read-write.png" alt-text="Screenshot of capacity settings with XMLA endpoint options for read and write." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/capacity-settings-xmla-endpoint-read-write.png":::

1. Installed Microsoft Edge or Google Chrome. Safari isn't supported for planning.
1. Downloaded the data used in the planning sheet tutorials from the Fabric Samples GitHub repository: [Northwind_FMCG.pbix](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/iq/plan/Northwind_FMCG.pbix)

> [!NOTE]
> Plan doesn't support Microsoft Entra B2B guest accounts. Workspaces that use private links aren't supported either.

## Business context

In this tutorial series, you build a complete planning environment, set and optimize a revenue target, generate a rolling forecast, build a row-based and measure-based P&L model, and connect plans across two planning teams into a single profitability view.

Follow the tutorials in order:

1. Set up, plan, and optimize: Connect the *Northwind_FMCG.pbix* semantic model, create a Fabric SQL database, and build the Plan app. Set a $30m revenue target, build a bottom-up sales plan, and run the Optimizer to achieve a $12.5m gross profit target.
2. Create a rolling forecast: Build a rolling 2026 forecast, generate a statistical forecast using 24 months of actuals, close January as actuals arrive, extend the horizon to January 2027, and commit the finalized forecast to the Fabric SQL database.
3. Build a P&L hierarchy with Measure Model: Organize a few semantic model measures into a structured P&L hierarchy. Create a *Best-Case* scenario and a *Cost Restructuring* scenario, then compare both side by side.
4. Build a row-based P&L model: Use Row Model builder to construct a P&L hierarchy from scratch, starting from *Net Profit* and layering in *Gross Profit*, *Net Revenue*, *COGS*, and *Operating Expenses* as connected nodes.
5. Create a multi-dimensional plan: Build a *Regional Plan*, a *Product Plan*, and a *Profitability* sheet. Use Cube measures to allocate values across dimensions automatically and keep all three sheets in sync.

## Sample dataset

The planning sheet tutorial uses the *Northwind_FMCG.pbix* dataset. The dataset includes three fact tables that share a common date dimension:

* *Sales Transactions* - revenue and cost actuals at geography and product level.
* *P&L Measures* - driver-level measures for key financial metrics, including sales volume, Avg selling price, COGS components, and operating expenses.
* *P&L Rows* - P&L line items structured as rows, with cost data at the individual line-item level

## Set up the planning environment

In this section, you import the sample dataset, create a Fabric SQL database, build the Plan app, and connect both the semantic model and the database, so the planning sheet is ready for input and collaboration.

### Import the dataset

In this step, you import the *Northwind_FMCG* semantic model into your Fabric workspace. You use this semantic model throughout the planning sheet tutorial.

1. Go to [app.fabric.microsoft.com](https://app.fabric.microsoft.com) and sign in.
1. Navigate to your training workspace. Select **New folder**, enter the folder name, and select **Create**.
1. Open the folder. Select **Import** > **Report, Paginated Report or Workbook** > **From this computer**.
1. Select *Northwind_FMCG.pbix* and select **Open**. The report and semantic model appear in your folder.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/import-semantic-model-workspace.png" alt-text="Screenshot of importing the semantic model into the Fabric workspace." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/import-semantic-model-workspace.png":::

> [!TIP]
> A warning stating "Refresh failed due to missing data source credentials" might appear. Ignore this warning—the data is fully available, and the planning sheet connects correctly.

### Create the SQL database

In this step, you create a Fabric SQL database in your workspace. This database becomes the writeback destination for your forecast and plan data.

1. Select **New item**, search for **SQL database**, and select it.
1. Enter *Northwind_FMCG* followed by your name as a suffix - for example, *Northwind_FMCG_Lisa Taylor* and select **Create**. The database is created in your folder.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/create-fabric-sql-database-workspace.png" alt-text="Screenshot of creating a Fabric SQL database to use for writeback." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/create-fabric-sql-database-workspace.png":::

### Create the Plan app

In this step, you create the Plan app that hosts your planning sheets. This app is where you configure connections, build sheets, and collaborate on the plan.

1. Select **New item**, search for **Plan**, and select it.
1. Enter *Northwind_FMCG_Plan* in the **Name** field and select **Create**. Fabric planning opens, and you see the launch screen.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/plan-app-launch-screen-fabric.png" alt-text="Screenshot of the landing page with options to source data and create sheets in Fabric planning." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/plan-app-launch-screen-fabric.png":::

### Connect to the semantic model

In this step, you connect the Northwind FMCG semantic model to the Plan app through a semantic model connection. This connection makes the model's dimensions, measures, and date table available for planning.

1. On the launch screen, select **Semantic Model**.
1. In the semantic model connection window, select **Create Connection**.
1. In the connection list, select **Create a new connection**.
1. Enter *Northwind_FMCG* as the connection name. Your account identifier is added automatically. Select **Sign in**, authenticate, and select **Create**.
1. Confirm the new connection is selected. In the Semantic model field, select *Northwind FMCG* and select **Add**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/connect-semantic-model-planning.png" alt-text="Screenshot of connecting to the semantic model from planning." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/connect-semantic-model-planning.png":::

1. Select **Connect**. The *Northwind FMCG* tables appear in the **Data** tab—dimensions, measures, and the date table are ready for planning.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/measures-dimensions-imported-planning.png" alt-text="Screenshot of semantic model tables imported into the Data pane in Fabric planning." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/measures-dimensions-imported-planning.png":::

### Create a planning sheet

In this step, you create your first planning sheet and assign rows, columns, and values from the semantic model. This sheet is the foundation where you build the revenue target and plan on.

1. In the **Home** ribbon, select **New Planning Sheet**. Enter *Plan Intro* as the name and select **Create**.
1. Configure the field assignments as follows:

    | Field       | Value                                           |
    | ----------- | ----------------------------------------------- |
    | **Rows**    | *Region* → *Category* → *Sub-Category*          |
    | **Columns** | Date hierarchy—*Year*, *Quarter*, *Month Short* |
    | **Values**  | *2025 Gross Revenue* (From Measures table)      |

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/assign-measures-dimensions-planning-sheet.png" alt-text="Screenshot of dimensions and measures assigned to the rows, columns, and values data wells." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/assign-measures-dimensions-planning-sheet.png":::

### Connect to the SQL database

In this step, you create a Fabric SQL connection and connect planning to a SQL database. Planning maintains this database internally. Connect to the database to collaborate — it saves and enables you to share the plan. Set up the database after you build the planning sheet.

1. In the top-right corner, select **Set up connection**.
1. In **Fabric SQL connection**, select **Create connection**.
1. In the connection list, select **Create new connection**. Enter *Northwind_FMCG* as the connection name and select **Create**.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/create-database-connection-enable-collaboration.png" alt-text="Screenshot of creating a connection to the internal Fabric SQL database used for collaboration." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/create-database-connection-enable-collaboration.png":::

1. Confirm the connection is selected and select **Connect**. The Plan app is ready for collaboration.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/fabric-sql-database-connection-success-notification.png" alt-text="Screenshot of the notification confirming a successful connection to the Fabric SQL database for planning." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/fabric-sql-database-connection-success-notification.png":::

### Explore the planning interface

Before entering plan data, take a few minutes to get familiar with the ribbons, panels, and controls you'll use throughout this tutorial series.

1. Select the down arrow in the top right to expand the full ribbon view. Review what each ribbon contains:

    * **Home:** Add new planning, PowerTable, or intelligence sheets
    * **Planning:** Layout options, formatting, bulk edit, pivot, filters, audit log
    * **Model:** Forecasts, scenarios, driver-based models, cube
    * **Format:** Conditional and semantic formatting
    * **Writeback:** Write back data to destinations, manage settings, view logs

1. In the header, select each icon to review the available controls: **Security**, **Comments**, **Editing/Reading View**, and **Save**.
1. Select the arrow on the left to expand the **Explorer** pane. Use it to add sheets, manage sheets, and navigate between them.
1. In the sidebar on the right, select each icon to open the panels: **Data**, **Fields**, **Filter**, **Comments**, and **Bookmarks**.
1. In the footer, select the **Rows and Columns** count to view dimension and measure statistics. Use the zoom slider to adjust the canvas, and select the **Settings** icon to configure rows per page.

    :::image type="content" source="../../media/planning-tutorial/planning/tutorial-0-introduction/planning-sheet-interface.png" alt-text="Screenshot of various elements like the toolbar, footer, explorer, and side panes in Fabric planning." lightbox="../../media/planning-tutorial/planning/tutorial-0-introduction/planning-sheet-interface.png":::
