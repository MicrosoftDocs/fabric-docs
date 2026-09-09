---
title: Setting Up Approvals, Access Controls, and Automations in PowerTable
description: Set up approvals, access controls, and automations in PowerTable to govern data changes. Follow this tutorial to route edits for review and automate updates.
ms.date: 09/08/2026
ms.topic: tutorial
ai-usage: ai-assisted
---

# Fabric planning tutorial part 8: Set up approvals, access controls, and automations

The asset management app that you set up previously now needs additional checks and balances to maintain data quality. Do this by setting up approval workflows and access controls. In this exercise, you also set up automated workflows.

## Set up approval workflows within the *assets* sheet

Set up a simple approval mechanism that requires any user who makes changes to submit them for review, and prevents them from writing to the database without approval. This part takes 5-10 minutes to complete.

### Enable and configure simple approvals

1. Open the asset management plan item that you created in the [previous tutorial](tutorial-7-get-started-with-powertable.md). Switch from **Reading** to **Editing** mode by selecting the dropdown at the top-right corner of the plan item. Editing mode gives you access to the sheet's setup options.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/edit-read-mode-selector-toolbar.jpg" alt-text="Screenshot of switching from Reading to Editing mode using the dropdown at the top-right of the plan item.":::

1. Expand the **Explorer** pane on the left side and select the *assets* sheet (if you're not already on it). Collapse the pane after you select the sheet so the table has more room.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/explorer-pane-select-assets-sheet.jpg" alt-text="Screenshot of the Explorer pane with the assets sheet selected and the collapse arrows button highlighted.":::

1. Go to the **PowerTable** tab of the toolbar and select **Approvals**. PowerTable opens the **Approvals** screen, where you define who reviews changes before they reach the database.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-tab-approvals-button-toolbar.jpg" alt-text="Screenshot of the PowerTable toolbar tab with the Approvals button highlighted above the assets table." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-tab-approvals-button-toolbar.jpg":::

1. Turn on **Requires Approval for All Changes**. This switch routes every edit through review instead of writing straight to the database.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-approvals-configuration-toggle-on.jpg" alt-text="Screenshot of the Approvals Configuration page with the Requires Approval for All Changes toggle set to On and highlighted.":::

1. Under **Who can Approve changes?**, select **Specific users**, enter your email address, and select **Save**. Naming yourself as the approver lets you test the workflow end to end.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/specific-users.png" alt-text="Screenshot of Approvals Configuration with Specific users selected and an approver email highlighted.":::

1. After you save the approval settings, in the **Approvals** screen, select **Back to PowerTable** to return to the main table.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approvals-back-to-powertable-link-highlighted.jpg" alt-text="Screenshot of the Approvals screen with the Back to PowerTable link highlighted in the top left.":::

### Test approvals (optional)

1. You need a pending change before you can see how the review flow behaves. In the *assets* sheet, update the *Status* value on any row in the data (the following screenshot shows a change made to asset tag *IT-1248*).

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-row-edited-submit-for-review-highlighted.jpg" alt-text="Screenshot of PowerTable showing an edited row and the Submit for Review, Preview Changes, and Discard Changes buttons." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-row-edited-submit-for-review-highlighted.jpg":::

1. Notice that the **Save to Database** button now reads **Submit for Review**. This change confirms that your approval workflow is in place. Select **Submit for Review**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-submit-for-review-button-highlighted.jpg" alt-text="Screenshot of the PowerTable ribbon with the Submit for Review button highlighted next to Preview Changes (1) and Discard Changes.":::

1. PowerTable displays a **Submit for Review** pop-up. All fields in this pop-up are optional. Select **Submit** to send the change for approval.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-submit-for-review-dialog-description-due-date.jpg" alt-text="Screenshot of the Submit for review dialog with Description, Due Date, and Mark as Priority fields highlighted, and the Submit button highlighted.":::

1. In a moment, PowerTable reverts the changes to their original values and adds a spreadsheet-style note indicator on the updated cell. The indicator tells you that this record has a pending approval, so the database keeps the original values until someone approves the change.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-pending-approval-note-indicator-cell.jpg" alt-text="Screenshot of a PowerTable row with a Depot cell highlighted and a note indicator showing a tooltip that Depot changed to IT-01013." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-pending-approval-note-indicator-cell.jpg":::

1. In the **PowerTable** tab of the toolbar, the **Approvals** button now shows a badge with the number of pending approvals.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-toolbar-approvals-button-pending-badge.jpg" alt-text="Screenshot of the PowerTable toolbar with the Approvals button highlighted and showing a badge with one pending approval." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-toolbar-approvals-button-pending-badge.jpg":::
1. The approver also receives a Teams notification from which they can review the request.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approval-notification.png" alt-text="Screenshot of a Microsoft Teams chat showing a Fabric Plan approval notification card with request details and a Review request button." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approval-notification.png":::

1. Select **Approvals** to view the requested change.

1. Select the **Details** link to view the request.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approvals-pending-review-details-link-highlighted.jpg" alt-text="Screenshot of the Approvals page Pending Review tab listing one request with the Details link highlighted." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approvals-pending-review-details-link-highlighted.jpg":::

1. View the details of the request including the changed values. Select **Approve** and then select **Back to PowerTable**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approval-request-details-approve-button-highlighted.jpg" alt-text="Screenshot of an approval request details page with the Approve button and Back to PowerTable link highlighted, and a Location cell showing the changed value." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approval-request-details-approve-button-highlighted.jpg":::

1. Notice that PowerTable commits the save and the row now reflects the approved change. Select **Audit**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-toolbar-audit-button.jpg" alt-text="Screenshot of the PowerTable toolbar with the Audit button highlighted and a row showing the approved Location value IT-01013 highlighted." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-toolbar-audit-button.jpg":::

1. Notice that the audit log captures the save, including the person who made the change and the person who approved it.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/audit-log-data-tab-updated-by-approved-by.jpg" alt-text="Screenshot of the Audit page Data tab showing an Update row with Old Value Depot, New Value IT-01013, Updated By Cora Thomas, and Approved By Aled Parri highlighted." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/audit-log-data-tab-updated-by-approved-by.jpg":::

### Multi-level approval options (optional)

Multi-level approvals route a change request through multiple levels of review before final approval. This process supports compliance, oversight, and better decision-making. Each level corresponds to a different approver, who reviews and approves the request at that level.

You can create up to three levels of approval by using PowerTable sheets.

1. Within the *assets* sheet, on the **PowerTable** tab of the toolbar, select **Approvals**, and then select **Manage Approvals**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approvals-page-manage-approvals-button.jpg" alt-text="Screenshot of the Approvals page with the Manage Approvals button highlighted in the top-right corner." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approvals-page-manage-approvals-button.jpg":::

1. Toggle **Enable Multi Level Approval** to **On**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/enable-multi-level-approval-toggle-highlighted.jpg" alt-text="Screenshot of the Approvals Configuration panel with the Enable Multi Level Approval toggle set to On and highlighted.":::

1. PowerTable displays a pop-up dialog asking you to **Confirm your action**. Select **Proceed**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/confirm-action-dialog-proceed-highlighted.jpg" alt-text="Screenshot of the Confirm your action dialog with the Proceed button highlighted.":::

1. Set the **Number of approval levels** to 3. Then, in the **Approval Levels** section, search for and assign an approver within the respective **Search Users** field for each level. Select **Save** to save your changes.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approval-levels-assign-approvers-save.jpg" alt-text="Screenshot of the Approvals Configuration panel with Number of approval levels set to 3 and approvers assigned in Search Users fields for each level." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approval-levels-assign-approvers-save.jpg":::

### Rule-based approval options (optional)

Rule-based approvals route each request based on rules and criteria that you define. You can set as many rules as required and assign corresponding approvers for each.

1. Within the *assets* sheet, on the **PowerTable** tab of the toolbar, select **Approvals**, and then select the **Manage Approvals**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approvals-page-manage-approvals-button.jpg" alt-text="Screenshot of the Approvals page with Pending Requests and My Requests tabs, and the Manage Approvals button highlighted.":::

1. If the **Enable Multi Level Approval** option is on, toggle it off. Select **Proceed** on the **Confirm your action** pop-up dialog to proceed.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/enable-multi-level-approval-toggle-off.jpg" alt-text="Screenshot of the Approvals Configuration page with the Enable Multi Level Approval toggle set to Off and highlighted.":::

1. Under the **Approvers** section, select **Users based on rules** for the **Who can Approve changes?** field.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approvers-users-based-on-rules-selected.jpg" alt-text="Screenshot of the Approvals Configuration page highlighting the Who can Approve changes? field set to Users based on rules.":::

1. In the **Approval Rules** section, select the **+ Add Rule** option to add a new rule.

1. PowerTable displays a **New Rule** pop-up box to set up rules to check on the data. Within this pop-up, configure the **Name** for the rule first.
1. Add **Conditions** to check for by clicking the **+ Add Filter** option.
1. You can also add multiple filters and combine them together with a logical AND (meaning all of the defined conditions must be met) or a logical OR (meaning any one of the defined conditions must be met).
1. Finally, configure one or more **Approvers** to send the request to when these conditions are met. Select **Create** to create this rule.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/new-rule-pop-up-name-conditions-approvers.jpg" alt-text="Screenshot of the New Rule pop-up showing Name, Conditions, Approvers sections and the Create button.":::

1. You can configure multiple approval rules with different approvers for each rule.
1. You also need to provide a fail-safe approver so that requests that don't meet your conditions still reach someone who can approve them.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approval-rules-default-approver.jpg" alt-text="Screenshot of the Approvals Configuration page showing multiple approval rules, a fail-safe approver field, and the Save button." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/approval-rules-default-approver.jpg":::

1. When you finish setting up the rule, select **Save**.

## Set up access controls

Access controls dictate whether users can insert, update, and delete data from the table. Set up these access controls for the *assets* sheet. This part takes 5-10 minutes to complete.

### Configure who can add new rows in the *assets* sheet

1. On the *assets* PowerTable sheet, go to the **Setup** tab in the toolbar and select **Manage Access**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/setup-tab-manage-access-button.jpg" alt-text="Screenshot of the PowerTable toolbar with the Setup tab and Manage Access button highlighted.":::

1. Select **Row Access** and go to the **Add – Who can add new rows?** section. This section defines who can insert new rows into the table displayed in the PowerTable sheet. The available options are:

   - **No one** – turns off the ability to add new rows for everyone who has access to this Fabric Plan item.
   - **All users in this domain** – grants the ability to add new rows to everyone who has access to this Fabric Plan item.
   - **Specific users** – grants the ability to add new rows to specific individuals or security groups.

1. Select **All users in this domain** so that everyone with access to this plan item can insert new rows into the table.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/row-access-add-new-rows-all-users-domain.jpg" alt-text="Screenshot of Manage Access Row Access page with 'Who can add new rows?' and 'All users in this domain' selected.":::

### Configure who can update existing rows in the *assets* sheet

1. Scroll down to the **Update – Who can update existing rows?** section. This section defines who can change the existing data on the PowerTable sheet. The available options are:

   - **No one** – turns off the ability to update existing rows for everyone who has access to this Fabric Plan item.
   - **All users in this domain** – grants the ability to update existing rows to everyone who has access to this Fabric Plan item.
   - **Specific users** – grants the ability to update existing rows to specific individuals or security groups.
   - **Rule based access** – grants the ability to update existing rows to specific individuals or security groups based on business rules and filters. You can set up multiple rules here. Within each rule, you can define conditions to check for within the sheet's data, and the users who can edit rows that meet those conditions.

1. Select **All users in this domain**. This option allows everyone with access to this plan item to update existing data within the PowerTable sheet.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-update-access-all-users-this-domain-selected.jpg" alt-text="Screenshot of the Update section with Who can update existing rows? highlighted and All users in this domain selected.":::

### Configure who can delete rows in the *assets* sheet

1. Scroll down to the **Delete – Who can delete rows?** section. This section defines who can delete existing data on the PowerTable sheet. The available options are:

   - **No one** – turns off the ability to delete rows for everyone who has access to this Fabric Plan item.
   - **All users in this domain** – grants the ability to delete rows to everyone who has access to this Fabric Plan item.
   - **Specific users** – grants the ability to delete rows to specific individuals or security groups.
   - **Rule based access** – grants the ability to delete rows to specific individuals or security groups based on business rules and filters. You can set up multiple rules here. Within each rule, you can define conditions to check for within the sheet's data, and the users who can delete rows that meet those conditions.

1. Select **Specific users**. Within the **Search Name or Email** text area that appears, search for and select your name or email so that you can delete rows from this sheet. Then select **Save**. Limiting deletes to named users reduces the risk of accidental data loss.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/delete-rows.jpg" alt-text="Screenshot of the Delete section showing 'Who can delete rows?' options with Specific users selected and a user added." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/delete-rows.jpg":::

1. Select **Back to Setup**.

## Set up automations

You set up a simple automation workflow that lets users retire an asset with a single button select, instead of updating each row manually.

### Create the automation item and configure the trigger

In this step, you create the automation item and configure it to run when a user clicks the button.

1. On the *assets* PowerTable sheet, go to the **Setup** tab of the toolbar, and select **Automations**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-setup-tab-automations-button.jpg" alt-text="Screenshot of the PowerTable Setup ribbon with Setup tab and Automations button highlighted.":::

1. Select **Create Automation**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/create-automation-button.jpg" alt-text="Screenshot of the Get started with Automation empty state page with the Create Automation button highlighted.":::

1. Rename the automation to *Retire Asset* by selecting the pencil icon next to the breadcrumb. Under the suggested triggers, select **When a button is clicked**. A trigger defines what starts an automation, and this trigger starts the automation when a user clicks a button. In a later step, you create the button that triggers this automation.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/rename-automation-select-button-clicked-trigger.jpg" alt-text="Screenshot of an automation named Retire Asset showing Add Trigger and suggested triggers, with When a button is clicked outlined in red." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/rename-automation-select-button-clicked-trigger.jpg":::

### Configure the Find Record action

In this step, you dynamically retrieve the *Location Id* for the Depot location so the following Update action can use it. Alternatively, you can hard-code the *Location Id* in the Update action.

1. Select **Add Action** and then select **Find Record(s)**. The **Find Record(s)** action can retrieve a set of records that meet specific conditions from a table in the same Fabric SQL database that the PowerTable sheet connects to.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/button-clicked-trigger-configuration.jpg" alt-text="Screenshot of the Retire Asset automation editor with the When a button is clicked trigger added and find records action selected." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/button-clicked-trigger-configuration.jpg":::

1. With the **Find Record(s)** action selected in the automation flow, go to the **Properties** panel on the right side. Set the **Description** field to *lookup depot location*. Then, select *dbo* for the **Schema** property, and *locations* for the **Table** property. This table defines where the **Find Record(s)** action connects and retrieves records.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/find-records-schema-table-properties.jpg" alt-text="Screenshot of the automation editor showing Find Record(s) properties, including Description, Schema, and Table fields configured." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/find-records-schema-table-properties.jpg":::

1. While still on the **Find Record(s)** properties panel, select **Single Record** for **Fetch type**. Then, under **Rules**, select *Location* for **Field**, **is** for **Operator**, and enter *Depot* in the **Type or select from list** text box.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/find-configuration-single-record-fetch-type.jpg" alt-text="Screenshot of Find Configuration panel with Single Record selected and the rule set to Location is Depot." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/find-configuration-single-record-fetch-type.jpg":::

### Configure the Update Record action

In this step, you configure the **Update Record** action that retires the asset, moves it to the depot, and clears its assignment.

1. Select **Add Action** and then select **Update Record**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/add-action-menu-update-record-selected.jpg" alt-text="Screenshot of Add Action dropdown listing PowerTable actions with Update Record outlined in red.":::

1. Set the **Description** to *Update asset record to retired, set location to depot, clear assigned to*. Under the **Configuration** section, set the **Schema** to *dbo* and the **Table** to *assets*.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/update-record-properties-description-schema-table.jpg" alt-text="Screenshot of the Properties pane for an Update Record action with Description, Schema dbo, and Table assets highlighted.":::

1. Set the **Update type** to **Single Update**. Under the **Conditions** section set up a **Rule** as follows:

   - **Field**: select *Asset Id*.
   - **Operator**: select *=*.
   - **Value**: select the **+** button, select the **When a button is clicked** trigger, and then select *Asset Id*.

   This rule limits the update operation (retiring an asset) to only the row that corresponds to the button the user clicked. You set up that button later in this exercise.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/update-record-single-update-rule-asset-id.jpg" alt-text="Screenshot of Update type set to Single Update with a rule for Asset Id equals, and a dynamic content menu showing the When a button is clicked trigger and Asset Id.":::

1. In the **Fields** section, select the **Add Fields** option and then select *Assigned To*, *Location*, and *Status*. These fields update when a user clicks the button.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/fields-section-add-fields-option.jpg" alt-text="Screenshot of the Fields section with the Add Fields option highlighted below an Asset Id rule row.":::

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/add-fields-list-selecting-three-asset-fields.jpg" alt-text="Screenshot of a field picker list showing Assigned To, Location, and Status checked while other fields remain unchecked." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/add-fields-list-selecting-three-asset-fields.jpg":::

1. Update the fields as follows.

   - *Assigned To*: select **Clear Value**.
   - *Status*: select **Replace Value** and enter *Retired*.
   - *Location*: select the **+** button, select the **Find Record(s)** action, and then select *Location Id*.

    :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/field-rules-assigned-status-location-picker.jpg" alt-text="Screenshot of the Fields section with Assigned To set to Clear Value, Status set to Replace Value with Retired, and Location using a picker showing Find Record(s) and Location Id highlighted." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/field-rules-assigned-status-location-picker.jpg":::

1. Select **Save** to save the automation, and then select **Back to Setup**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/retire-asset-automation-save-back-to-setup.jpg" alt-text="Screenshot of the Retire Asset automation page with the Save button and Back to Setup link highlighted." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/retire-asset-automation-save-back-to-setup.jpg":::

### Configure the button column

In this step, you create the button that triggers this automation flow.

1. Go to the **PowerTable** tab on the toolbar in the *assets* sheet. Select **Insert Column**, and in the dropdown menu, select **Visual Column** > **Add Button Column**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-insert-column-visual-column-add-button-column.jpg" alt-text="Screenshot of the PowerTable tab with Insert Column open, Visual Column submenu expanded, and Add Button Column highlighted." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-insert-column-visual-column-add-button-column.jpg":::

1. Configure the **Add Button Column** panel as follows and then select **Save**:

   - **Column Name**: enter *Automation*.
   - **Label**: enter *Retire Asset*.
   - **Action**: select **Execute an Automation**.
   - **Automation**: select *Retire Asset*.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-add-button-column-configuration-settings.jpg" alt-text="Screenshot of the Add Button Column panel with Column Name Automation, Label Retire Asset, Action set to Execute an Automation, and Automation set to Retire Asset." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-add-button-column-configuration-settings.jpg":::

### Test the automation

1. Scroll to see the **Automation** column and select the **Retire Asset** button for one of the asset rows. PowerTable displays a confirmation message when it triggers the automation and again when the automation completes.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-automation-column-retire-asset-button.jpg" alt-text="Screenshot of the PowerTable assets sheet with a highlighted Retire Asset button in the Automation column and an Automation job completed successfully notification.":::

1. While still on the *assets* sheet, go to the **Setup** tab of the toolbar on top and select **Automations**.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-setup-tab-automations-button.jpg" alt-text="Screenshot of the PowerTable toolbar with the Setup tab and Automations button highlighted above the assets sheet.":::

1. Within the **Automations** screen, select the **Retire Asset** automation that you created earlier.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-automations-list-retire-asset.jpg" alt-text="Screenshot of the Automations screen showing the highlighted Retire Asset automation with trigger and action summary.":::

1. Select **Run History** and select the **View Details** link for the first job.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-automation-run-history-view-details.jpg" alt-text="Screenshot of the Retire Asset automation with the Run History button and View Details link highlighted." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-automation-run-history-view-details.jpg":::

1. View the results of the trigger, find record(s), and update actions. The run history confirms that each action did what you expected, and it's where you start troubleshooting when an automation fails.

   :::image type="content" source="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-automation-run-history-action-results.jpg" alt-text="Screenshot of the automation run history details showing trigger, find records, and update action results." lightbox="../../media/planning-tutorial/powertable/tutorial-8-set-up-approvals-access-controls-automations/powertable-automation-run-history-action-results.jpg":::

## Outcomes

This exercise covered the following outcomes.

> [!div class="checklist"]
> * Set up an approval workflow that governs changes to the data through a review process.
> * Set up access control mechanisms that restrict insert, update, and delete operations to authorized users.
> * Set up a simple automation workflow that updates rows based on a button select.
