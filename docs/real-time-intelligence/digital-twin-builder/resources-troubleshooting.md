---
title: Troubleshooting digital twin builder (preview)
description: This article provides troubleshooting suggestions for digital twin builder (preview).
author: baanders
ms.author: baanders
ms.date: 08/04/2025
ms.topic: concept-article
---

# Troubleshooting digital twin builder (preview)

This article contains troubleshooting suggestions for digital twin builder (preview).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Get logs using Monitor hub

For general troubleshooting of your digital twin builder (preview) item, it can be helpful to view its logs in the Fabric *Monitor hub*. The hub is accessible through the **Monitor** button in the Fabric navigation bar on the left.

:::image type="content" source="media/resources-troubleshooting/troubleshoot-monitor-cropped.png" alt-text="Screenshot of the monitor hub." lightbox="media/resources-troubleshooting/troubleshoot-monitor.png":::

>[!NOTE]
>You might have to expand the overflow menu at the bottom of the bar to see the **Monitor** button.

The Monitor hub shows run history for two types of jobs:
* Digital twin builder flow items: These entries are the on-demand and scheduled executions for [digital twin builder flows](concept-flows.md). They show a status of either *Succeeded* or *Failed*, based on whether the set of operations in the digital twin builder flow completed successfully. 
* Lakehouse item jobs: These entries represent the actual Spark executions associated with the flows. They nearly always say *Succeeded*, even if the digital twin builder flow itself fails. Errors are captured and written to a log, which digital twin builder flows read to determine whether to report an overall success for the operation.

For more information about the Monitor hub, see [Use the Monitor hub](../../admin/monitoring-hub.md).

## Troubleshoot data missing from explorer

### Entity instances and time series data missing from explorer

What to do when the Explore mode view appears empty after mapping data to entity instances:
* Use the **Manage operations** tab to verify that mapping operations are completed successfully. If they failed, rerun them (starting with failed non-time series operations first, then time series operations).

    :::image type="content" source="media/resources-troubleshooting/operations-completed.png" alt-text="Screenshot of completed operations in the Manage operations tab.":::

* If mapping operations were successful, there might be a delay in the SQL endpoint provisioning. Look for the SQL endpoint associated with your digital twin builder (preview) data lakehouse. The lakehouse and the SQL endpoint are located at the root of your workspace, and named after your digital twin builder instance followed by *dtdm*.

    :::image type="content" source="media/resources-troubleshooting/sql-endpoint.png" alt-text="Screenshot of selecting the SQL endpoint from the Fabric workspace.":::

* If there's no SQL endpoint associated with your lakehouse, the lakehouse might have failed to provision correctly. Open the lakehouse and follow the error message prompts to recreate the SQL endpoint. For more information, see [What is the SQL analytics endpoint for a lakehouse? - SQL analytics endpoint reprovisioning](../../data-engineering/lakehouse-sql-analytics-endpoint.md#sql-analytics-endpoint-reprovisioning).

### Entity instances missing time series data

What to do when an entity instance in the Explore view is missing time series data in the **Charts** tab:
* The tab might appear empty because the time series mapping for the entity type ran before the non-time series mapping completed. Try creating a new time series mapping with the same source table, and running it with incremental mapping **disabled**.
* Time series data might be missing because the link property for the time series mapping doesn't exactly match the entity type property. In the time series mapping configuration, verify that the **Link with entity property** fields have exactly matching values. If they don't, redo the mapping so that the values match.

    :::image type="content" source="media/resources-troubleshooting/define-link.png" alt-text="Screenshot of defining the link between entity type property and time series.":::

## Troubleshoot operation failures

What to do when you see failed operations in the **Manage operations** tab:
* Select the **Details** link to open the operation details.

    :::image type="content" source="media/resources-troubleshooting/operation-details.png" alt-text="Screenshot of the Details for a failed operation.":::

    The **Runs** tab shows the run history of the operation, along with the flow that contained each run. Flows titled *On demand* represent ad-hoc runs of the individual operation. Looking at the run history can help you identify whether it was the operation itself that failed, or a larger flow.
* In the **Runs** tab, select the **Failed** status to see the error message, which gives you more information about the failure. For some error codes, see the following sections for specific troubleshooting steps. 
* If the failure message is empty, you can [Create a support ticket](/power-bi/support/create-support-ticket) for more help. 

    Have the job instance ID ready. You can see the job instance ID for each run in the **Monitor** hub, by adding **Job instance ID** as a column.

    :::image type="content" source="media/resources-troubleshooting/job-instance-id-1.png" alt-text="Screenshot of adding the job instance ID column in the monitor hub.":::

### Error: Concurrent update to the log. Multiple streaming jobs detected for 0

This error message is caused by multiple instances of a mapping operation running concurrently. If you see this error with a *Failed* status, try rerunning the mapping operation.

## Contact support

For information about self-help resources and support options in Microsoft Fabric, see [Get help with Microsoft Fabric](/power-bi/support/service-support-options).

For information about creating a support ticket, see [Create a support ticket](/power-bi/support/create-support-ticket).