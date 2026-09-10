---
title: Configure Workflow Triggers, Actions, and Conditions
description: Configure automation workflows to trigger actions when records change. Learn how to add triggers, create and update records, add conditions, and save your flow.
#customer intent: As a PowerTable user, I want to create an automation workflow so that I can run tasks automatically without manual work.
ms.date: 07/31/2026
ms.topic: how-to
---

# Configure automation workflows

This article explains how to create an automation workflow. You learn how to configure workflow triggers and actions to automate tasks such as creating records and cascading updates across related tables.

> [!NOTE]
> To learn about the concept of automation, see [Automation](../powertable-concept-automation.md).

## Create an automation flow

1. To create an automation for a table, go to **Setup** > **Automations**.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/open-automations-from-setup-menu.png" alt-text="Screenshot of the PowerTable ribbon with the Setup tab and Automations button highlighted.":::

1. In the new window, select **Create Automation** to create a new automation flow.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/create-automation-button.png" alt-text="Screenshot of the Automations window with the Create Automation button highlighted." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/create-automation-button.png":::

1. A new automation workflow is created for you to configure the trigger and actions. Name your automation flow by selecting the pencil icon.

## Add trigger

1. Select **Add Trigger** and choose a trigger. Alternatively, select one of the suggested triggers directly.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/add-trigger.png" alt-text="Screenshot of the Automations editor with the Add Trigger button and pencil rename icon highlighted." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/add-trigger.png":::

    * **When a record is created:** Triggers the workflow when a user creates a record.
    * **When a record is updated:** Triggers the workflow when a user updates a record.
    * **When a record is deleted:** Triggers the workflow when a user deletes a record.
    * **When a form is submitted:** Triggers the workflow when a user submits a form that creates a record.
    * **When a button is clicked:** Triggers the workflow when a user selects a button in a button column.

    > [!NOTE]
    > All triggers monitor events in the current table where you configure the automation.

1. After you select a trigger, the **Properties** pane opens.

    * Enter a description.
    * Select **+ Add** to add one or more rules that determine when the trigger starts.
    * Use **AND** or **OR** to combine multiple rules. The trigger runs only when the specified record or the data changes meet the configured conditions.
    * For **Update Record** trigger, you can specify which fields to monitor for data changes. If you specify all fields, the workflow includes any new fields that you add in the future.
    * The available operators depend on the selected field's data type. You can use operators such as **Equals**, **Less than**, **Greater than**, **Is**, **Is empty**, and **Contains**, and more.
    * The rules support using predefined built-in functions such as **Current date**, **Current user email**, and any field references that are available through forms or **Find Record(s)**.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/automation-workflow-trigger-options.png" alt-text="Screenshot of the Properties pane for a When a record is created trigger with the Rules section highlighted." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/automation-workflow-trigger-options.png":::

## Add actions

Select **Add Action** to add one or more actions. Each action type is explained in the following sections.

:::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/automation-add-action-menu-options.png" alt-text="Screenshot of the Add Action button highlighted with a menu listing Conditional Group, Repeating Group, Create Record, Update Record, Delete Record, Find Records, Bulk Create Record, and Execute Stored Procedure.":::

### Create Record

This action creates a new record in the specified table.

1. Enter the schema and table name.
1. Select **Add Fields** to specify the fields for the new record.
1. Enter the field values or use predefined functions to fill in their corresponding values.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/automation-create-record-add-fields-properties.png" alt-text="Screenshot of the Create Record action Properties pane with Add Fields highlighted and a menu listing trigger fields like OrderDateTime and OrderNumber." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/automation-create-record-add-fields-properties.png":::

### Update record

This action updates one or more records that meet the specified conditions.

1. Enter the schema and table name to update.
1. Select **Update type**.
   * **Single Update**: Updates only the first record that matches the specified condition.
   * **Multiple Updates**: Updates all records that match the condition.
1. Configure the conditions for update.
1. Select **Add Fields** to add the fields that you want to update.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/automation-update-record-add-fields.png" alt-text="Screenshot of automation editor showing Update Configuration, Single Update type, Conditions rules, and highlighted Add Fields button." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/automation-update-record-add-fields.png":::

1. Replace the existing values with static values or dynamically calculated values by using formulas, or clear the existing values.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/update-record-value-options.png" alt-text="Screenshot of update field dropdown listing Replace Value, Clear Value, and arithmetic options in the Update Configuration pane.":::

### Delete record

This action deletes one or more records from the specified table that meet the configured conditions.

1. Enter the schema and the table name.
1. Configure the rules to pick the records to delete.

### Find records

Use **Find Record(s)** to retrieve one or more records from the specified table that meet the configured conditions.

1. After entering the schema and table name, select the **Fetch type**.
   * Select **Single Record** to retrieve a single record.
   * Select **Multiple Records** to retrieve multiple records in a single action. You can retrieve up to 1,000 records. Configure the **Retrieve Limit** to specify the maximum number of records to return.
1. Select the fields to retrieve.
1. Optionally, sort the retrieved records in ascending or descending order. The action returns the records in the specified order.
1. Configure the conditions used to find the records.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/find-records-action-properties.png" alt-text="Screenshot of the Find Record(s) action Properties pane showing Fetch type, record limit, selected columns, sorting, and condition rules." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/find-records-action-properties.png":::

### Bulk create records

This creates multiple records in the specified table by using the records returned by the **Find Record(s)** action.

1. Include a [**Find Record(s)**](#find-records) action in your flow before adding records in bulk.
1. Select **Add Action** and select **Bulk Create Record**.
1. Specify the schema and table name where you want to create the records.
1. For **Input List**, select the records returned by the **Find Record(s)** action.
1. Select **Add Fields** to create the required destination fields.
1. Enter the field values or map each destination field to its corresponding field value from the records returned by the **Find Record(s)** action.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/bulk-create-record-input-list-map.png" alt-text="Screenshot of the Bulk Create Record action Properties pane with Sales table selected and Record Mapping fields." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/bulk-create-record-input-list-map.png":::

> [!NOTE]
> An automation flow can include multiple **Find Record(s)** actions. If you include multiple **Find Record(s)** actions, select the action that returns the records you want to use as the input list.

### Execute stored procedure

Use this action to run a stored procedure that you created in the database.

1. Enter the schema and the table name.
1. Configure the rules.
1. Select the stored procedure that you want to run.

### Conditional Group

**Conditional Group** defines **If/Otherwise** branching logic. It evaluates one or more conditions and runs the corresponding actions based on the conditions that are met.

1. Select **Add Action**, and then select **Conditional Group**.
1. In the **Properties** pane, add one or more conditions for the **If** branch.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/automation-if-condition.png" alt-text="Screenshot of the Properties pane Conditions section with a Rules row set to Quantity, less than, and 100." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/automation-if-condition.png":::

1. Select **Add Action** within the **If** branch to add an action to run when the conditions are met. Hover over to select **+** and add more actions if necessary.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/automation-if-branch-create-record-action.png" alt-text="Screenshot of the automation flow with a Create Record action in the If branch highlighted and a plus button to add more actions." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/automation-if-branch-create-record-action.png":::

1. Select **Add Condition** to add an **Otherwise If** branch, and then configure its conditions.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/otherwise-if-branch.png" alt-text="Screenshot of an automation with an Otherwise If branch added and the empty Rules row highlighted in the Properties pane." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/otherwise-if-branch.png":::

1. Select **Add Action** within the **Otherwise** **If** branch to add one or more actions when the conditions are met.
1. Repeat these steps to add additional **Otherwise If** branches and their corresponding actions.
1. To add a final **Otherwise** branch, select **If no other conditions are met** in the **Properties** pane. The actions in this branch run only when none of the preceding conditions are met.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/otherwise-branch.png" alt-text="Screenshot of an automation with an Otherwise branch highlighted and the If no other conditions are met option selected in the Properties pane." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/otherwise-branch.png":::

### Repeating group

**Repeating group** repeats the same set of actions for each record that a **Find Record(s)** action returns.

1. Before adding a repeating group, include a [**Find Record(s)**](#find-records) action in your flow.
1. Select **Add Action**, and then select **Repeating Group**.
1. Enter an optional description.
1. For **Input List**, select the records that the **Find Record(s)** action returns.

    > [!NOTE]
    > An automation flow can include multiple **Find Record(s)** actions. If you include multiple **Find Record(s)** actions, select the action that returns the records you want to use as the input list.

1. If an iteration fails, select **Continue** to continue processing the remaining records or select **Fail** to stop the workflow.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/repeating-group.png" alt-text="Screenshot of the Repeating Group Properties panel with Input List set to Find Record(s) and Continue selected for failed iterations." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/repeating-group.png":::

1. Within the **Repeat for each** block, select **Add Action**, and then select an action that runs for each record in the input list. Use **+** to include more actions.

## Duplicate, delete, or rearrange actions

* Use the **More options** (**...**) menu on an action to duplicate or delete it.
* Use the **drag handle** (six-dot icon) to drag and drop the action and reorder the workflow.
* To insert an action between existing actions, select the **+** icon at the required location in the workflow.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/action-options-duplicate-delete-menu.png" alt-text="Screenshot of a workflow action with the highlighted More options button and a menu offering Duplicate Action and Delete Action.":::

## Save the workflow

After you complete all configurations, the **Save** option is enabled. Select **Save** to save the workflow. Select **Back to Setup** to return to the previous page.

:::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/save-workflow.png" alt-text="Screenshot of the Automations workflow editor with the Save button highlighted in the top-right corner." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/save-workflow.png":::

## Manage automations

You can create multiple automation workflows for a table. To view the workflows that you created, select **Setup** > **Automations**.

* **Enable or disable a workflow:** Use the toggle to enable or disable a workflow.
* **Duplicate a workflow:** Select **More options** (**...**), and then select **Duplicate** to create a copy of a workflow. Modify the copied workflow as needed instead of creating one from scratch.
* **Delete a workflow:** Select **More options** (**...**), and then select **Delete** to permanently remove a workflow. You must disable a workflow before you can delete it.
* **Search**: Use the search box to find a specific automation flow by name.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/manage-automations.png" alt-text="Screenshot of the Automations list showing two workflows with the enable/disable toggle and More options highlighted." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/manage-automations.png":::

## View run history

Use the **Run History** pane to monitor workflow executions and review the status of each run.

Open the required automation workflow and select **Run History**.

:::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/view-run-history.png" alt-text="Screenshot of the Get Order automation with the Run History pane open, listing eight runs with Job ID, Started At, Status, Duration, and Details." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/view-run-history.png":::

The pane lists all workflow runs along with details such as:

| Column | Description |
| --- | --- |
| **Job ID** | Unique identifier for the workflow run. |
| **Started At** | Date and time when the workflow started. |
| **Status** | Current execution status, such as **Success** or **Failed**. |
| **Duration** | Total time taken to complete the workflow run. |
| **Started By** | User who triggered the workflow. |
| **Details** | Select **View Details** to view the full execution details for the workflow run. |

You can also use the following options:

* **Retry**: Failed runs display a **Retry** option. Select it to rerun the workflow after resolving the issue.
* **Refresh**: Use **Refresh** to refresh the run history and display the status of latest workflow runs.

## Related content

[Create a sample automation](./how-to-create-sample-automation.md).
