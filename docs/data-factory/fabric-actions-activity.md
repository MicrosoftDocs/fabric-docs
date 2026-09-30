---
title: Use the Fabric Actions Activity in a Pipeline
description: Learn how to use the Fabric actions activity in a Microsoft Fabric Data Factory pipeline.
ms.reviewer: conxu
ms.topic: how-to
ms.date: 09/23/2026
ai-usage: ai-assisted
---

# Use the Fabric actions activity in a pipeline

Use the Fabric actions activity to run a [Fabric REST API operation](/rest/api/fabric/articles/get-started/using-fabric-apis) from a Data Factory pipeline.

For example, after a pipeline prepares sales data for reporting, you can run a Fabric operation and make its response available to later pipeline logic.

This article shows you how to add a Fabric actions activity, configure a Fabric operation with pipeline values, run the pipeline, and use the response in a downstream activity.

> [!IMPORTANT]
> Fabric actions is in preview.
> Availability, supported operations, and the final portal experience can change before general availability.

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
1. Select an existing Fabric connection, or create a Fabric connection when prompted. When creating a new connection, ensure the Base Url is: 'https://api.fabric.microsoft.com'.
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
