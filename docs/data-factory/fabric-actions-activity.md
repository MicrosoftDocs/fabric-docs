---
title: Use the Fabric Actions Activity in a Pipeline
description: Learn how to use the Fabric actions activity in a Microsoft Fabric Data Factory pipeline.
ms.reviewer: conxu
ms.topic: how-to
ms.date: 09/23/2026
ai-usage: ai-assisted
---

# Use the Fabric actions activity in a pipeline

The **Fabric actions activity** lets a pipeline *do something in Fabric* as one of its steps. You can run a notebook, create a shortcut, update an item, or start a job. You don't need to write code or call an API yourself. You choose the action from a list, fill in its inputs, and the pipeline runs it for you. Later steps in the pipeline can use the result.

Behind the scenes, each action is a [Microsoft Fabric REST API](/rest/api/fabric/articles/get-started/using-fabric-apis) operation. The activity handles the connection, sign-in, and request format, so you work with a form instead of HTTP requests.

> [!IMPORTANT]
> The Fabric actions activity is in **preview**. Availability, supported operations, and the portal experience can change before general availability.

## What the Fabric actions activity does

The activity runs **one Fabric operation per activity**. Each time it runs, it:

1. **Takes the action you selected**, such as *Run On Demand Item Job* or *Create Item*.
2. **Fills in the inputs** you provided, such as a workspace ID, item ID, or request body. Inputs can be fixed values or dynamic content.
3. **Calls Fabric** with your Fabric connection, using the same permissions as the identity behind that connection.
4. **Returns Fabric's response** as activity output so later steps can use it. For example, a later step can read a new item's ID or a job's status.

### Why it matters

- **Orchestrate all of Fabric from one place.** A pipeline can load data and then act on the rest of your Fabric estate (items, jobs, schedules, shortcuts, and more) without leaving the pipeline.
- **No custom code.** Without this activity, you'd typically need a Web activity with hand-built URLs, headers, and authentication, or a notebook that calls the API. The Fabric actions activity replaces that need with a guided selection and form.
- **Dynamic, end-to-end workflows.** Because the response becomes activity output, you can chain actions. For example, you can create an item, then pass its ID to the next step.

### Example scenarios

| Scenario | Example action (Fabric REST API operation) |
|---|---|
| Start a Fabric job after data lands | [Run On Demand Item Job](/rest/api/fabric/core/job-scheduler) |
| Check or cancel a running job | Get Item Job Instance, Cancel Item Job Instance |
| Create, update, or schedule an item as part of a deployment workflow | [Create Item, Update Item](/rest/api/fabric/core/items), Create Item Schedule |
| Look up items in a workspace and branch on the result | List Items, Get Item |
| Move or organize items | Move Item, Bulk Move Items |

## What it supports

### Supported operations

The Fabric actions activity is built on the **Microsoft Fabric REST APIs**. For the complete, current list of operations, including every operation's required parameters, request body, and response, see:

**[Microsoft Fabric REST API references](/rest/api/fabric/articles/)**

The REST API reference is grouped into these areas:

| API area | What it covers | Examples |
|---|---|---|
| **Core** | Operations that work across all of Fabric | [Items](/rest/api/fabric/core/items) (create, get, list, update, move, definitions), [Job Scheduler](/rest/api/fabric/core/job-scheduler) (run, monitor, cancel, and schedule item jobs), workspaces, connections, and more |
| **Item-specific (workload) APIs** | Operations for a particular Fabric item type | Operations for item types such as Apache Airflow jobs, anomaly detectors, lakehouses, notebooks, and other Fabric items |
| **Admin** | Tenant-level governance operations. Require Fabric administrator permissions. | Workspaces, items, domains, connections, tenant settings, tags, and labels |

> [!NOTE]
> Operations marked **(preview)** or **(beta)** in the REST API reference can change. Use them with care in production pipelines.

### Authentication

The activity calls Fabric through a **Fabric connection**. The operation runs with the permissions of the identity in that connection. That identity must have access to the target workspace and item, and must be allowed to call the selected operation.

### Operation output

The activity exposes the Fabric REST API response body as activity output. Downstream activities can reference it with dynamic content, such as `@activity('RunFabricOperation').output`.

### When to use a different activity

| If you want to... | Consider |
|---|---|
| Run a notebook and wait for it with built-in notebook settings | [Notebook activity](/fabric/data-factory/notebook-activity) |
| Refresh a Power BI semantic model | [Semantic model refresh activity](/fabric/data-factory/semantic-model-refresh-activity) |
| Call a non-Fabric API or service | [Web activity](/fabric/data-factory/web-activity) |
| Run a business action in another system, such as Logic Apps or connectors | [Business action activity](/fabric/data-factory/business-actions-activity) |
| Run any Fabric REST API operation, including ones with no dedicated activity | **Fabric actions activity** |

## Prerequisites

[!INCLUDE[basic-prerequisites](includes/basic-prerequisites.md)]
- Permission to create, edit, and run a pipeline in the workspace.
- Access to the Fabric item and operation that you plan to use.
- A Fabric connection, or permission to create one.

## Add a Fabric actions activity to a pipeline

1. Open your Fabric workspace.
1. Create a pipeline, or open the pipeline that you want to update.
1. In the pipeline authoring canvas, add the **Fabric actions** activity.

   :::image type="content" source="media/fabric-actions-activity/add-fabric-actions-activity.png" alt-text="Screenshot of a Fabric actions activity on the pipeline canvas with the Settings tab open.":::

1. Select the activity to open its configuration pane.
1. On the **General** tab, enter a descriptive name, such as `RunFabricOperation`.

For more information, see [General settings](activity-overview.md#general-settings).

## Configure a Fabric operation

1. In the activity configuration pane, select a Fabric item type or search for the Fabric operation that you want to run.
1. Select the operation from the browse and search experience.
1. Select an existing Fabric connection, or create a Fabric connection when prompted. When creating a new connection, ensure the Base Url is: `https://api.fabric.microsoft.com`.
1. Provide every required operation parameter.
1. Use dynamic content or pipeline expressions for values that come from pipeline parameters or preceding activity outputs.
1. Review the operation and parameter values before you run the pipeline.

   :::image type="content" source="media/fabric-actions-activity/configure-fabric-action.png" alt-text="Screenshot of Fabric actions settings configured to create a workspace, with the request body and activity preview." lightbox="media/fabric-actions-activity/configure-fabric-action.png":::

   > [!TIP]
   > Use expressions when a value is only known at run time, such as an identifier returned by an earlier activity.

## Use the action response

1. Add a downstream activity, such as **Set Variable** or an activity that supports conditional logic.
1. In the downstream activity, select **Add dynamic content**.
1. Reference the Fabric actions activity output by using the activity name.
1. Select the response property that the downstream activity needs.

The activity exposes the Fabric REST API response as activity output for downstream pipeline activities.

## Save and run or schedule the pipeline

[!INCLUDE[save-run-schedule-pipeline](includes/save-run-schedule-pipeline.md)]

After the pipeline runs:

1. Open the pipeline run details and confirm that the Fabric actions activity finishes successfully.
1. Select the activity run to review its output.
1. Confirm that the downstream activity receives the expected response value.

## Considerations and limitations

- Fabric actions are in preview. The supported Fabric operations and user interface can change.
- You must have access to both the Fabric workspace and the item or operation that you invoke.
- Required parameters depend on the selected operation.
- Confirm the final operation input before you run a pipeline, especially when an expression supplies identifiers or request values.
- AI-assisted action selection and parameter or request-body completion can vary during preview.

## Related content

- [Activity overview](activity-overview.md)
- [Business action activity in Data Factory](business-actions-activity.md)
- [Monitor pipeline runs in Fabric Data Factory](monitor-pipeline-runs.md)
