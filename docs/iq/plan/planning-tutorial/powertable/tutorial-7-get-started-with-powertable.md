---
title: Get Started with PowerTable and Create a Data App in Plan
description: Build a PowerTable asset management app on Microsoft Fabric Plan. Learn how to create a Fabric SQL database, connect it, and import Excel data in under an hour.
#customer intent: As a new PowerTable user, I want to walk through an end-to-end example, so that I can learn the basics before I build my own app.
ms.date: 09/03/2026
ms.topic: tutorial
ai-usage: ai-assisted
---

# Fabric planning tutorial part 7: Get started with PowerTable

This part of the tutorial provides an end-to-end walkthrough of building an asset management app using PowerTable inside Fabric Plan.

Move your IT asset data out of spreadsheets and into PowerTable, a governed data app in Fabric planning.

## Business context

In this tutorial, you move the *Northwind FMCG*'s IT asset data out of spreadsheets and into a governed data app on Microsoft Fabric. You create the database, build a PowerTable sheet for each table, format and connect the columns, and then keep the data relevant by using appropriate insertions and updates.

Work through the parts in order:

1. **Get started with PowerTable**: Import *Northwind FMCG*’s IT assets data from Excel sheets where you currently track it, into a Fabric SQL Database by using PowerTable. Then, set up the PowerTable sheet connecting to the *assets* table and format it so you can maintain it by using PowerTable going forward. Keep the data relevant by updating or inserting data to it.

1. **Setting up approvals, access control, and automations**: Enhance Northwind’s assets PowerTable sheet by setting up approval workflows to govern changes being made in data. Also, set up access controls to restrict who can make changes to the data. Finally, set up automations to enable one-click operations for asset retirement.

## Sample dataset

This tutorial uses the Northwind FMCG asset dataset. Download it here: [Northwind FMCG assets dataset](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/iq/plan/Northwind-FMCG-assets-powertable-tutorial.xlsx)

The dataset includes one central table and two reference tables that it looks up against:

* *Assets*: Hardware records covering classification, make and model, serial number, custody, status, purchase price, and lifecycle dates. This dataset also contains columns to identify who an asset is assigned to, and the current location of the asset.
* *Employees*: Employee staff records, looked up by the *Assigned To* column to display a full name instead of an ID.
* *Locations*: Location site records, looked up by the *Location* column to display a site name instead of an ID.

## Getting started with PowerTable

*Northwind FMCG* needs an asset management data app. It currently tracks its asset data in spreadsheets. Move that data to a database and manage it in a data app on Microsoft Fabric by using Fabric Plan. This exercise takes 30 to 45 minutes to complete.

## Create and connect the Fabric Plan item

Create the Fabric SQL database that the PowerTable app uses for data management, and create the Fabric Plan item that holds the PowerTable app.

### Create a new Fabric SQL database

Create the database that stores the asset data.

1. Go to the training workspace and select **New item**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/new-item-toolbar.jpg" alt-text="Screenshot of the New item button highlighted in a Fabric workspace.":::

1. In the **New item** side panel, select **All items**, search for *SQL* in the **Filter by keyword** search box, and select **SQL database**. This database is where you import the data.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/new-item-panel-sql-database-tile.jpg" alt-text="Screenshot of New item side panel filtered by the keyword SQL, with the SQL database tile highlighted.":::

1. Enter *fabric_plan_training* for **Name** and select **Create**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/new-sql-database-dialog-create-button.jpg" alt-text="Screenshot of New SQL database dialog with the name fabric_plan_training entered and the Create button highlighted.":::

1. View the newly created database in the training workspace.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/workspace-new-sql-database-item.jpg" alt-text="Screenshot of Training workspace listing the newly created fabric_plan_training SQL database.":::

### Create a new Fabric Plan item

Create the Plan item that holds the PowerTable app.

1. In the same training workspace, select **New item**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/training-workspace-new-item-toolbar.jpg" alt-text="Screenshot of Fabric workspace toolbar with the New item button highlighted.":::

1. In the **New item** side panel, select **All items**, search for *Plan* in the **Filter by keyword** search box, and select **Plan**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/new-item-panel-plan.jpg" alt-text="Screenshot of New item side panel filtered by the keyword Plan, with the Plan tile highlighted.":::

1. Enter *Asset Management* for **Name** and select **Create**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/new-plan-dialog-asset-management.jpg" alt-text="Screenshot of the New Plan dialog with Asset Management typed in the Name box and the Create button highlighted.":::

## Create the PowerTable sheets

Create the *assets*, *employees*, and *locations* sheets by importing data from an Excel spreadsheet. This part takes about 20 minutes.

### Create the assets PowerTable sheet

Create your first PowerTable sheet, set up the database connection, and import all three tables from the source workbook.

1. In the Plan welcome screen, select **PowerTable**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/plan-welcome-screen-powertable-tile.jpg" alt-text="Screenshot of the Plan welcome screen with the PowerTable tile highlighted in the Create new sheet section.":::

1. In the **New PowerTable Sheet** pop-up, enter *Assets* as the **Name** and select **Create**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-sheet-name-assets-create-dialog.jpg" alt-text="Screenshot of the New PowerTable Sheet dialog with Assets entered in the Name field and the Create button highlighted.":::

   > [!IMPORTANT]
   > You complete the following **Set up connection** steps only *once* for each Fabric Plan item. This connection links the Plan item to the app database, so users with a **Viewer** workspace role can use and work with the Plan item.

1. Select the **Set up connection** button. This connection is required so users using the app can collaborate with each other.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-sheet-toolbar-set-up-connection-button.jpg" alt-text="Screenshot of the PowerTable sheet showing the toolbar and highlighted Set up connection option.":::

1. In the **Select Fabric SQL Connection** pop-up, select **+ Create Connection**. If you already set up a connection, use the **Select a Connection** dropdown menu to select your connection.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/select-fabric-sql-connection-create-connection.jpg" alt-text="Screenshot of the Select Fabric SQL Connection pop-up with the Create Connection option highlighted.":::

1. Configure the **Create New Connection** dialog with the following values and then select **Create**.

   * **Connection**: select *Create new connection*
   * **Connection Name**: enter the name of your new connection
   * **Authentication kind**: select *Organizational account*
   * **You are currently signed in as**: this defaults to your account, select **Switch account** to change it.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/create-connection-organizational-account.jpg" alt-text="Screenshot of the Create New Connection dialog with Connection, Connection name, Authentication kind, and signed-in account fields.":::

1. Back in the **Select Fabric SQL Connection** pop-up, select **Connect** and finalize the connection.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/select-fabric-sql-connection-connect-button.jpg" alt-text="Screenshot of the Select Fabric SQL Connection pop-up with the Connect button highlighted.":::

1. On the PowerTable welcome screen, select **Create a New App**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-welcome-screen-create-new-app.jpg" alt-text="Screenshot of the PowerTable welcome screen with the Create a New App tile highlighted.":::

1. In **Select Fabric SQL Connection**, select the connection you previously created. Set the **Select Database From** option to **Database Item**. Then, select the database you previously created and select **Connect**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/configure-connection.jpg" alt-text="Screenshot of Select Fabric SQL Connection with the saved connection, Database Item option, and target database selected.":::

1. Configure the **Select Table** dialog as follows and then select on the **Next** button once it is enabled.

   * **Select Table**: select *New Table*
   * **Schema**: select *dbo*
   * **Table Name**: enter *assets*
   * **Import Data**: select *Upload File*
   * **Import Type**: select *Excel*
   * **Upload File**: select the **Upload File** section and choose the *assets.xlsx* file.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/configure-table.jpg" alt-text="Screenshot of the Select Table screen with Schema set to dbo, Table Name set to assets, and Import Type set to Excel." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/configure-table.jpg":::

1. On the **Preview Data** screen of the pop-up dialog, select the **Assets (1)** tab. Set the **Table Name** to *assets*. Don't modify the values for **Start Cell** and **End Cell**. Ensure that the checkbox next to the **assets** label is selected. Use the chevron next to the checkbox to expand and view a preview of the data.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/preview-data.jpg" alt-text="Screenshot of the Preview Data screen with the Assets (1) tab selected and Table Name set to assets." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/preview-data.jpg":::

1. While still on the **Preview Data** screen, select the **Employees (1)** tab. Set the **Table Name** to *employees*. Don't modify the values for **Start Cell** and **End Cell**. Ensure that the checkbox next to the **employees** label is selected.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/preview-employees.jpg" alt-text="Screenshot of the Preview Data screen on the Employees tab with the table name set to employees and the checkbox selected." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/preview-employees.jpg":::

1. On the same screen, select the **Locations (1)** tab. Set the **Table Name** to *locations*. Don't modify the values for **Start Cell** and **End Cell**. Ensure that the checkbox next to the **locations** label is selected.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-preview-data-locations-tab.jpg" alt-text="Screenshot of Preview Data screen on the Locations tab with the table name set to locations and the checkbox selected." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-preview-data-locations-tab.jpg":::

1. While still on the **Preview Data** screen, select the **Import (1)** tab. Clear the checkbox next to the **Import** label. The tab name changes to **Import**. Select **Next**.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-preview-data-import-tab-checkbox-cleared.jpg" alt-text="Screenshot of Preview Data screen on the Import tab with the Import checkbox cleared." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-preview-data-import-tab-checkbox-cleared.jpg":::

1. On the **Configure Table** screen, select the **assets** tab. Select the checkbox under the **Identity Column** section corresponding to the *Asset Id* column.

    The identity column uniquely identifies each row, which is what lets PowerTable match edits and imports back to the correct record. This column also creates the next value in the sequence automatically when creating new rows.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-assets-tab-identity-column.jpg" alt-text="Screenshot of Configure Table screen on the assets tab with Assets Id selected as the identity column." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-assets-tab-identity-column.jpg":::

1. Next, go to the **employees** tab. Select the checkbox under the **Identity Column** section corresponding to the *Employee Id* column.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-employees-tab-identity-column.jpg" alt-text="Screenshot of Configure Table screen on the employees tab with Employee Id selected as the identity column." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-employees-tab-identity-column.jpg":::

1. Finally, go to the **locations** tab. Select the checkbox under the **Identity Column** section corresponding to the *Location Id* column. Then select **Finish**.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-locations-tab-identity-column.jpg" alt-text="Screenshot of Configure Table screen on the locations tab with Location Id selected as the identity column." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-locations-tab-identity-column.jpg":::

1. On the **Creating Tables** pop-up dialog, after PowerTable creates all three tables, select **Done**. PowerTable now has all three tables and their corresponding sheets.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-creating-tables-dialog-done.jpg" alt-text="Screenshot of Creating Tables pop-up confirming all three tables were created, with the Done button highlighted.":::

## Set up the assets sheet

You format the *assets* sheet columns, add a conditional formatting rule, configure lookups, and add a formula column.

### Format the Logo URL column

Change the column input type so the sheet renders the logo images.

1. In the asset management app you created, expand the **Explorer** pane on the left side and select the **assets** sheet if you're not already on it. Collapse the pane after you select the sheet.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-explorer-pane-sheets-list.jpg" alt-text="Screenshot of Expanded Explorer pane listing the assets, employees, and locations sheets.":::

1. Hover over the *Logo URL* column, select the ellipsis "**...**" button in the column header, and then select **Edit** on the context menu that appears.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-column-header-ellipsis-menu.jpg" alt-text="Screenshot of Logo URL column header context menu with the Edit option highlighted." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-column-header-ellipsis-menu.jpg":::

1. On the **Logo URL** side panel that appears on the right, set the value of the **Input Type** dropdown to **Image**. This setting tells PowerTable to render the stored URL as a thumbnail instead of raw text.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-column-input-type-dropdown.jpg" alt-text="Screenshot of Logo URL side panel with the Input Type dropdown set to Image.":::

1. Within the **Logo URL** side panel, navigate to the **Display** tab. Type *Logo* into the **Display Name** field. Then select **Save**.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/logo-url-side-panel-display-tab.jpg" alt-text="Screenshot of Display tab of the Logo URL side panel with the display name set to Logo." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/logo-url-side-panel-display-tab.jpg":::

1. Resize the *Logo* column by dragging the edge of the column with your cursor. Then, select **Save** in the toolbar in the top-right corner.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/fabric-plan-toolbar-save-button.jpg" alt-text="Screenshot of Fabric Plan toolbar with the Save button highlighted in the top-right corner.":::

1. Your **Assets** sheet should now look like this.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-assets-sheet-logo-column-images.jpg" alt-text="Screenshot of Assets sheet showing the Logo column rendering manufacturer logo images." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-assets-sheet-logo-column-images.jpg":::

### Format the *asset type* and *status* columns

Convert both columns to single-select lists based on the values already in the data.

1. Hover over the *Asset Type* column, select the ellipsis "**...**" button in the column header, and then select **Edit** in the context menu.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/asset-type-column-header-context-menu.jpg" alt-text="Screenshot of Asset Type column header context menu with the Edit option highlighted.":::

1. Change **Input Type** to **Single Select** and change **Values Type** to **Distinct Values**. This setting restricts entry to values already present in the column, which prevents typos and keeps filtering reliable. Select **Save**.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/asset-type-side-panel-single-select.jpg" alt-text="Screenshot of Asset Type side panel with Input Type set to Single Select and Values Type set to Distinct Values." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/asset-type-side-panel-single-select.jpg":::

1. Repeat the previous two steps for the *Status* column.

1. Select **Save** in the toolbar.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/fabric-plan-toolbar-save-button.jpg" alt-text="Screenshot of Fabric Plan toolbar with the Save button highlighted in the top-right corner.":::

1. Your **Assets** sheet should now look like this.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-assets-sheet-formatted-columns.jpg" alt-text="Screenshot of Assets sheet showing Asset Type and Status values rendered as colored single-select chips." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-assets-sheet-formatted-columns.jpg":::

### Create a conditional formatting rule for retired assets

Add a rule that styles every row whose status is *Retired*.

1. Select the **Format** tab in the toolbar, select the **Format Rules** dropdown, and select **Create Rule**.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/format-tab-format-rules-dropdown.jpg" alt-text="Screenshot of Format tab of the toolbar with the Format Rules dropdown open and Create Rule highlighted.":::

1. Configure the **Create Formatting Rule** dialog as shown in the following image and then select **Apply**.

   * **Title**: enter *Retired*
   * **Apply To**: select *Rows*
   * **Condition If**: select *Status*, select *Is*, select *Retired*
   * **Style**: select *Italics*, select *gray* for Fill Color, and select *red* for Font Color

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-create-formatting-rule-dialog.jpg" alt-text="Screenshot of Create Formatting Rule dialog configured to style rows where Status is Retired." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-create-formatting-rule-dialog.jpg":::

1. Select the **X** to close the **Manage Rule** dialog.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/manage-rule-dialog-close-button.jpg" alt-text="Screenshot of Manage Rule dialog with the close button highlighted." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/manage-rule-dialog-close-button.jpg":::

1. Select **Save** in the toolbar.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/fabric-plan-toolbar-save-button.jpg" alt-text="Screenshot of Fabric Plan toolbar with the Save button highlighted in the top-right corner.":::

1. Your **Assets** sheet should now look like this.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/assets-sheet-retired-rows-formatting.jpg" alt-text="Screenshot of Assets sheet showing retired rows displayed in italic red text on a gray fill." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/assets-sheet-retired-rows-formatting.jpg":::

### Configure lookup values for the *assigned to* and *location* columns

Point both columns at the employees and locations tables so they display readable names instead of ID numbers.

1. Hover over the *Assigned To* column, select the ellipsis "**...**" in the column header, and then select **Edit** on the context menu that appears.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/assigned-to-column-context-menu-edit.jpg" alt-text="Screenshot of Assigned To column header context menu with the Edit option highlighted.":::

1. In the **Assigned To** side panel, set the following values for the indicated options under the **General** tab. A lookup pulls its values from another table, so the assets sheet shows employee names while still storing the underlying *Employee Id*.

   * **Input Type**: select *Single Select*
   * **Values Type**: select *Lookup*
   * **Lookup Schema**: select *dbo*
   * **Lookup Table**: select *employees*
   * **Lookup Key Column**: select *Employee Id*
   * **Lookup Display Column**: select *Full Name*

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-assigned-employee-lookup-general-tab.jpg" alt-text="Screenshot of General tab of the Assigned To side panel configured as a lookup against the employees table." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-assigned-employee-lookup-general-tab.jpg":::

1. Within the **Assigned To** side panel, go to the **Display** tab and set the value for the **Display Name** field to *Assigned Employee*. Then, select **Save**.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-display-tab-assigned-employee.jpg" alt-text="Screenshot of Display tab of the Assigned To side panel with the display name set to Assigned Employee." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-display-tab-assigned-employee.jpg":::

1. Next, hover over the *Location* column, select on the ellipsis "**...**" in the column header, and then select **Edit** on the context menu that appears.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-column-header-location-ellipsis-menu.jpg" alt-text="Screenshot of Location column header context menu with the Edit option highlighted.":::

1. Within the **Location** side panel, set the following values for the indicated options under the **General** tab, and then select **Save**.

   * **Input Type**: select *Single Select*
   * **Values Type**: select *Lookup*
   * **Lookup Schema**: select *dbo*
   * **Lookup Table**: select *locations*
   * **Lookup Key Column**: select *Location Id*
   * **Lookup Display Column**: select *Location*

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-lookup-column-configuration.jpg" alt-text="Screenshot of General tab of the Location side panel configured as a lookup against the locations table." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-lookup-column-configuration.jpg":::

1. Select **Save** in the toolbar.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/fabric-plan-toolbar-save-button.jpg" alt-text="Screenshot of Fabric Plan toolbar with the Save button highlighted in the top-right corner.":::

### Add a new formula column to calculate the end-of-life date

Derive an expected end-of-life date from the purchase date and the expected lifetime.

1. In the **PowerTable** ribbon of the toolbar, select **Insert Column**, and then select **Formula Column** in the dropdown menu that appears.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/insert-column-formula-column-option.jpg" alt-text="Screenshot of PowerTable ribbon with the Insert Column dropdown open and Formula Column highlighted.":::

1. Configure the **Add Formula Column** dialog with the following values and then select **Save**.

   * **Column Name**: *Expected EOL Date*
   * **Formula**: enter `DATEADD([Purchase Date], (365*[Expected Lifetime In Years]))`

   > [!NOTE]
   > Don't copy and paste the formula. It doesn't work. Type the formula manually, because of the way PowerTable references columns behind the scenes.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-add-formula-column-dialog.jpg" alt-text="Screenshot of Add Formula Column dialog with the column name Expected EOL Date and the DATEADD formula entered." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-add-formula-column-dialog.jpg":::

1. Select **Save** in the toolbar.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/fabric-plan-toolbar-save-button.jpg" alt-text="Screenshot of Fabric Plan toolbar with the Save button highlighted in the top-right corner.":::

1. Your **Assets** sheet should now look like this.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/assets-sheet-with-expected-lifetime-column.jpg" alt-text="Screenshot of Assets sheet showing the new Expected EOL Date column populated with calculated dates." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/assets-sheet-with-expected-lifetime-column.jpg":::

## Manage data in PowerTable

You edit rows by using single-row edits, the **Bulk Editor**, and the **Form Editor**. You can also import new data into PowerTable from files.

### Row editor

Edit cells directly in the grid and commit the changes to the database.

1. In the **Assets** sheet, make the following changes in the fourth row, which has the *Asset Tag* value *IT-1248*.

   * Change *Status* from *In Use* to *Available*.

     :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-assets-sheet-status-cell-dropdown.jpg" alt-text="Screenshot of the Assets sheet with the Status cell open in row four and Available selected in the dropdown list." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/powertable-assets-sheet-status-cell-dropdown.jpg":::

   * Clear the *Assigned To* value by right-clicking on the cell and selecting **Clear Contents** in the context menu.

     :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/clear-assigned-to-cell.jpg" alt-text="Screenshot of selecting Clear Contents in a cell from the assigned to column." :::

1. PowerTable then enables the **Save to Database**, **Preview Changes**, and **Discard Changes** buttons. Select **Save to Database**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/save-preview-discard.jpg" alt-text="Screenshot of save, preview, and discard changes.":::

   > [!NOTE]
   > Use your keyboard or mouse to navigate between the rows and columns. You can also copy and paste values between columns and rows as well as from other applications into the rows.

1. PowerTable asks you to confirm the save. Check the **Don't show this again** option if you don't want to confirm with every change and then select **Proceed**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/do-not-show-dialog-box.jpg" alt-text="Screenshot of Save confirmation dialog with the Don't show this again option and the Proceed button.":::

1. PowerTable displays the **Data saved successfully** toast message when the save completes, and then refreshes the page to show the changes. PowerTable then disables the **Save to Database**, **Preview Changes**, and **Discard Changes** buttons again.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/data-saved.jpg" alt-text="Screenshot of Data saved successfully toast message shown after the save completes.":::

### Insert a row

Switch the insert behavior to use a form, and then add a record.

1. On the **Assets** sheet, go to the **PowerTable** tab on the toolbar. Select the chevron in the **Insert Row** button. In the dropdown menu, toggle the option labeled **Insert Using Form By Default** to the on position. The form view shows every column with its configured input type, which is easier than typing across a wide row in the grid.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/insert-using-form-by-default.jpg" alt-text="Screenshot of Insert Row dropdown with the Insert Using Form By Default toggle switched on.":::

1. Now, on the **PowerTable** tab, select **Insert Row** rather than the arrow that opens the dropdown. PowerTable displays a form for inserting new data.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/insert-row.jpg" alt-text="Screenshot of PowerTable tab with the Insert Row button highlighted.":::

1. Enter values for the new row, and then select **Apply**. This action creates the new row.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/enter-row-details.jpg" alt-text="Screenshot of Insert row form with field values entered and the Apply button highlighted." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/enter-row-details.jpg":::

1. Select **Save to Database** to commit the change to the database.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/save-to-database-new.jpg" alt-text="Screenshot of PowerTable action bar with the Save to Database button highlighted.":::

### Update a single row by using the form editor (optional)

Edit one record through the **Record Details** side panel instead of the grid.

1. Select the row selector next to any row, and then select **Manage Record** in the toolbar.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/manage-record.jpg" alt-text=" Screenshot of Assets sheet with a row selected and the Manage Record button highlighted in the toolbar.":::

1. In the **Record Details** side panel that appears, under the **Form Editor** tab, change the *Assigned To* column to *Estie Liebenberg* and then change the *Status* to *In Use*. Select **Apply**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/edit-details.jpg" alt-text="Screenshot of Record Details side panel on the Form Editor tab with the assigned employee and status updated.":::

1. Combine these changes with other changes, then **Preview Changes** together, **Save to Database**, or **Discard Changes** from here.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/save-edited-changes.jpg" alt-text="Screenshot of PowerTable action bar showing pending changes with Preview Changes and Discard Changes enabled.":::

### Update multiple rows by using the form editor (optional)

Apply the same field edits across several selected records at once.

> [!NOTE]
> The **Form Editor** behaves differently for single row versus multiple row edits. The multiple row **Form Editor** replaces only the fields you edit across all selected rows. Unedited fields remain unchanged.

Select the row selector for multiple rows, and then select **Manage Record** in the toolbar. This selection displays the **Record Details** side panel on the **Form Editor** tab. Change the **Location** column to *Depot* and then change the **Status** to *Under Maintenance*. Select **Apply**.

:::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/assets-table-after-changes.jpg" alt-text="Screenshot of Record Details side panel applying a location and status change to several selected rows." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/assets-table-after-changes.jpg":::

### Bulk Editor (optional)

Run calculated offsets against a field across a range of selected rows.

1. Select the row selector next to the fourth through sixth rows. On the **Row** tab of the toolbar, select **Bulk Edit**. PowerTable displays the **Bulk Edit** side panel.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/bulk-edit.jpg" alt-text="Screenshot of Assets sheet with three rows selected and the Bulk Edit button highlighted on the Row tab.":::

1. On the **Bulk Edit** side panel, perform the following actions and select the **Apply** button.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/edit-data-bulk-editor.jpg" alt-text="Screenshot of Bulk Edit side panel showing two configured actions against Warranty Exp Date and Purchase Price." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/edit-data-bulk-editor.jpg":::

   * Under the **Action 1** section, add one year to the current warranty expiry date:
     * Set **Field** to *Warranty Exp Date*.
     * Set **Action** to *Offset Value*.
     * Set **Interval** to *Year*.
     * Set **Offset by** to *Add*.
     * Set the **Add** field value to *1*.
   * Select the **+ Add Action** option to add a new action.
   * Under the **Action 2** section:
     * Set **Field** to *Purchase Price*.
     * Set **Action** to *Offset Value*.
     * Set **Operation** to *Increase*.
     * Set **Value** to *150*.
   * Select **Apply**. Once changes are applied, close the **Bulk Edit** side panel, then select **Save to Database** to commit the changes to the database.

### Preview changes and save to database (optional)

Review pending edits before you commit them.

PowerTable enables the **Preview Changes** and **Discard Changes** buttons whenever a pending change to the database exists. Select **Preview Changes** to view the pending changes or select **Discard Changes** to revert all pending changes.

1. Select **Preview Changes** in the toolbar.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/preview-changes-after-bulk-edit.jpg" alt-text="Screenshot of Preview Changes view listing the pending row edits.":::

1. Note that you can select one or more rows and revert the pending changes using **Reset** option.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/reset-changes-preview-screen.jpg" alt-text="Screenshot of Preview Changes view with rows selected and the revert option available.":::

1. Ensure that you don't select any rows. Select **Save to Database** and then select **Proceed** if the **Save Changes?** popup appears.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/save-to-database-preview-screen.jpg" alt-text="Screenshot of PowerTable action bar with the Save to Database button highlighted and no rows selected.":::

### Find and replace (optional)

Find a text string or value across one or more columns in the table, and replace it with another text string or value.

1. Select **Find and Replace** in the toolbar. Configure the following inputs, select **Find all** to preview the matches, and then select **Replace all**.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/find-replace-button.jpg" alt-text="Screenshot of PowerTable toolbar with the Find and Replace button highlighted.":::

   * Set **Column** to *Features*.
   * Set **Find** to *Contoso OS 10 Pro*.
   * Set **Replace With** to *Contoso OS 10.5 Pro*.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/find-replace-dialog.jpg" alt-text="Screenshot of Find and Replace dialog configured against the Features column with the find and replace values entered." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/find-replace-dialog.jpg":::

1. Verify the updates in the **Features** column. Select the **X** button to close the **Find and Replace** popup, and select **Save to Database**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/save-after-replace-all.jpg" alt-text="Screenshot of Find and Replace dialog reporting that all occurrences were replaced, with the updated Features column highlighted." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/save-after-replace-all.jpg":::

### Summary of row-editing methods

The following table lists the features that each row-editing method supports.

| Feature | Row Editor | Form Editor (single row) | Form Editor (multiple rows) | Bulk Edit | Find and Replace |
| --- | --- | --- | --- | --- | --- |
| View existing field values | Yes | Yes | No | No | No |
| Set field value | Yes | Yes | Yes | Yes | Yes |
| Clear field value | Yes | Yes | No | Yes | Yes |
| Offset field values (add, subtract, multiply, divide, prefix, suffix) | Yes, manually | No | No | Yes | No |
| Replace text within existing text | Yes, manually | No | No | No | Yes |
| Replace a value across multiple rows and columns in a single action | No | No | No | No | Yes |
| Copy and paste values across multiple rows | Yes | N/A | N/A | N/A | N/A |
| Fill down values to adjacent rows | Yes | N/A | N/A | N/A | N/A |
| Preview changes | Yes | Yes | Yes | Yes | Yes |
| Discard changes | Yes | Yes | Yes | Yes | Yes |

### Import data from a file (optional)

Load more records into the sheet from an Excel workbook.

1. On the **Assets** sheet, in the **PowerTable** tab of the toolbar, select **Import**. In the **Import** pop-up dialog, select **Excel** and then select **Continue**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/import-excel.jpg" alt-text="Screenshot of Import pop-up dialog with Excel selected and the Continue button highlighted.":::

1. Select the space to upload the **Assets.xlsx** file and then select **Upload**.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/upload-file.jpg" alt-text="Screenshot of Import dialog file picker prompting you to select a file to upload.":::

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/uploaded-file-upload-button.jpg" alt-text="Screenshot of Import dialog showing the selected Assets.xlsx file with the Upload button highlighted.":::

1. Select the **Import** sheet and then select **Proceed**.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/proceed-import.jpg" alt-text="Screenshot of Sheet selection step with the Import sheet selected and the Proceed button highlighted.":::

1. PowerTable scans the file and determines which rows result in an insert, update, or error. View the results and then select **Import**.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/import-rows-excel.jpg" alt-text="Screenshot of Import Rows dialog summarizing the insert, update, and error counts from the scan.":::

1. After PowerTable imports the rows, close the **Import Rows** pop-up dialog.

1. Expand the **Filter** panel, select *Phone* to filter **Asset Type**, and view the newly imported phone records.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/filter-assets.jpg" alt-text="Screenshot of Assets sheet filtered to Asset Type Phone showing the newly imported phone records." lightbox="../../media/planning-tutorial/powertable/tutorial-7-get-started-with-powertable/filter-assets.jpg":::

## Outcomes

You completed the following work in this exercise.

* You created a Fabric SQL database for data management.
* You created a Fabric Plan item with a PowerTable sheet for each of the assets, employees, and locations tables.
* You configured the *Assets* sheet with formatted columns and lookups.
* You ran update and insert operations by using several different approaches.
