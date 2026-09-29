---
title: Use the Business Action Activity in a Pipeline
description: Learn how to use the business action activity in a Microsoft Fabric Data Factory pipeline.
ms.reviewer: conxu
ms.topic: how-to
ms.date: 09/23/2026
ai-usage: ai-assisted
---

# Use the business action activity in a pipeline

Use the business action activity to invoke an enterprise application action through a Logic Apps connector from a Data Factory pipeline.

For example, after a pipeline produces a daily data-quality result, you can use a business connector action to notify the operations team and make the action response available to later pipeline logic.

This article shows you how to add a business action, configure its connector and connection, pass pipeline data as action inputs, and verify the action run.

> [!IMPORTANT]
> The business action activity is in preview.
> Availability, supported connectors, and the final portal experience can change before general availability.

## Prerequisites

[!INCLUDE[basic-prerequisites](includes/basic-prerequisites.md)]

- Permission to create, edit, and run a pipeline in the workspace.
- Permission to create or use a connection for the business application.
- An account authorized to use the connector action that you plan to run.

## Add a business action activity to a pipeline

1. Open your Fabric workspace.
1. Create a pipeline, or open the pipeline that contains your data-quality activity.
1. In the pipeline authoring canvas, add the **Business Actions** activity.

   :::image type="content" source="media/business-actions-activity/add-business-actions-activity.png" alt-text="Screenshot of a business action activity on the pipeline canvas with the Settings tab open.":::

1. Select the activity to open its configuration pane.
1. On the **General** tab, enter a descriptive name, such as `NotifyOperations`.
1. Optionally configure the activity description, timeout, and retry policy.

For more information, see [General settings](activity-overview.md#general-settings).

## Select a connector action and connection

1. Open the **Settings** tab.
1. Use the connector browser to search or browse the business connector catalog.
1. Select a connector and then select the action that you want to run.
1. Select an existing connection, or select the option to create a connection and complete the required authentication flow.

   :::image type="content" source="media/business-actions-activity/configure-business-action.png" alt-text="Screenshot of business action settings configured for a Stripe action, connection, parameters, and activity preview." lightbox="media/business-actions-activity/configure-business-action.png":::

1. Keep **Wait for completion** enabled when a downstream activity requires the action result.
1. When **Wait for completion** is enabled, review the polling interval.

The business action activity uses the Fabric connection framework for connector credentials.
You don't create or manage a separate Logic Apps resource for this pipeline activity.

## Provide action parameters

1. Open the **Parameters** tab.
1. Enter the values required by the selected connector action.
1. For values that come from the pipeline, select **Add dynamic content** and add a pipeline expression.
1. Reference values from pipeline parameters, variables, or earlier activity outputs as needed.
1. Review the generated parameter values and confirm that they match the connector action you selected.

The activity generates the input form from the selected action's schema.

## Save and run or schedule the pipeline

[!INCLUDE[save-run-schedule-pipeline](includes/save-run-schedule-pipeline.md)]

After the pipeline runs:

1. Open the pipeline run details and confirm that the business action activity reaches a terminal status.
1. Select the activity run and review the action status and output.
1. Verify that the target business application received the expected action.
1. When you use a downstream activity, verify that it can read the business action output.

## Considerations and limitations

- The business action activity is in preview. Connector availability and the final experience can change.
- The first release is planned as a prioritized subset of Logic Apps connectors, not the full connector catalog.
- Connector availability and authentication requirements depend on the selected connector and action.
- Long-running connector operations require the activity to wait for completion and use polling.
- Connection credentials can require reauthorization when a connector credential expires.
- Pricing details for the business action activity aren't finalized in the source specification.
- AI-assisted payload completion can vary in availability during preview.

## Related content

- [Activity overview](activity-overview.md)
- [Fabric Actions activity in Data Factory](fabric-actions-activity.md)
- [Monitor pipeline runs in Fabric Data Factory](monitor-pipeline-runs.md)
