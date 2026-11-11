---
title: "PowerTable Automations: Manage and Monitor Workflows"
description: PowerTable automations give you full control over your workflows. Find out how to enable, duplicate, and delete them and how to track run status and duration.
ms.date: 11/02/2026
ms.topic: how-to
---

# Manage automations

This article explains how to manage automation workflows you created in PowerTable.

## Manage workflows

You can create multiple automation workflows for a table. To view the workflows that you created, select **Setup** > **Automations**. The following screen opens.

:::image type="content" source="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/manage-automations.png" alt-text="Screenshot of the Automations list showing two workflows with the enable/disable toggle and More options highlighted." lightbox="../media/powertable-how-to-create-automation/how-to-configure-automation-workflows/manage-automations.png":::

* **Enable or disable a workflow:** Use the toggle to enable or disable a workflow.
* **Duplicate a workflow:** Select **More options** (**...**), and then select **Duplicate** to create a copy of a workflow. Modify the copied workflow as needed instead of creating one from scratch.
* **Delete a workflow:** Select **More options** (**...**), and then select **Delete** to permanently remove a workflow. You must disable a workflow before you can delete it.
* **Search**: Use the search box to find a specific automation flow by name.

## View run history

Use the **Run History** pane to monitor workflow executions and review the status of each run. You can see the users who initiated the automations, when they initiated them, the duration and time of automation, and whether it succeeded or failed.

Failed automations trigger Microsoft Teams notifications for the user who initiated the automation.

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
