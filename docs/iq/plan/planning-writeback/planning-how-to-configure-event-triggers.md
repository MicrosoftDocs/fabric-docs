---
title: Automate Processes with Event Triggers in Fabric Planning
description: Automate processes with event triggers to refresh data, calculate metrics, and start downstream workflows the moment writeback events occur.
ms.date: 09/25/2026
ms.topic: how-to
---

# Automate processes with event triggers

Invoke a downstream process, such as executing a database stored procedure, dataflow, pipeline, or notebook, based on writeback events. Use event triggers to transform data, refresh dependent data, calculate metrics, or start downstream workflows.

Instead of relying on scheduled batch jobs, event triggers turn writeback into a real-time event-driven workflow. Common use cases include:

* Executives instantly see consolidated, up-to-date reports without waiting for an end-of-day batch processing run.
* Finance teams get immediate visibility into liquidity based on newly entered budget scenarios.
* Event triggers can automatically flag the record if a target exceeds its allocated threshold by a set percentage.
* Operations can immediately identify potential inventory shortfalls or long-lead component needs based on the latest sales trajectory.

## When to use event triggers

* Calculations and validations: Run complex server-side business logic or validation routines immediately after user submission.
* Data orchestration: Trigger ETL/ELT pipelines to push data into downstream operational systems or data warehouses.
* Real-time reporting: Automatically trigger an incremental refresh of a Power BI semantic model so dashboards instantly reflect updated planning entries.

The following table shows the supported trigger types and use cases:

| Trigger | Scenario |
| ---------- | :------- |
| **Writeback initialized** | Start a validation or preprocessing pipeline when a budget or forecast writeback begins.<br>Run a stored procedure to calculate financial metrics such as variance, gross margin, or EBITDA. |
| **Writeback succeeds** | Refresh financial reports or consolidate business-unit budgets after a successful writeback.<br>Trigger a dataflow to move approved forecasts into a downstream reporting or consolidation model.<br>Recalculate sales targets or forecast metrics using a stored procedure or notebook. |
| **Writeback fails** | Trigger an error-handling pipeline to log failed submissions and notify the relevant operations team. |

## Prerequisite

Configure at least one writeback destination.

## Configure an event trigger

Follow these steps to set up event triggers that automatically start a process, such as running a pipeline, in response to a writeback event.

1. In the **Writeback** ribbon, select **Event Trigger**.
1. In the **Event Triggers** side pane, select **+Add New** to configure your first trigger.
1. Enter a name to uniquely identify the trigger.
1. Select the event type. You can start the downstream process on writeback initialization, success, or failure.
    
    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/select-event-type.png" alt-text="Screenshot of selecting an event type for writeback trigger." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/select-event-type.png":::

1. Select the process to trigger from **Action Type**. See the following sections for configuration details for each process type.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/select-action-type.png" alt-text="Screenshot of selecting an action type for the event trigger." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/select-action-type.png":::

1. You can pass parameters to stored procedures, notebooks, and pipelines. Select **Edit action** to configure parameters. You can either enter parameter values or select the **Plus (+)** icon for built-in options such as Trigger Execution ID, Created By, Created At, Error, and Status.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/configure-stored-procedure-parameters.png" alt-text="Screenshot of mapping stored procedure parameters with built-in option list." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/configure-stored-procedure-parameters.png":::

1. Select **Save**. Saving the trigger configuration enables the **Test Action** option. Use this option to ensure the event trigger is working.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/test-event-trigger.png" alt-text="Screenshot of the Test Action button used to verify an event trigger configuration." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/test-event-trigger.png":::

1. Initiate writeback to start the configured event trigger.

## Trigger a stored procedure

Use stored procedure-based event triggers to run complex business logic and recalculate metrics. Trigger a stored procedure to automatically roll up local-level planning entries, convert currencies, and aggregate budgets and forecasts into parent entities for executive-level visibility.

1. In a Fabric SQL database, create the stored procedure to execute when a writeback is initialized, succeeds, or fails. Refer to the writeback destination table in the stored procedure to consolidate, aggregate, or reconcile data in a planning sheet.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/create-stored-procedure.png" alt-text="Screenshot of stored procedure code that consolidates and aggregates financial data in a Fabric SQL database." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/create-stored-procedure.png":::

1. In your planning sheet, select **Event Trigger** in the **Writeback** ribbon. Add a new trigger and select **Stored Procedure** as the **Action Type** in the event trigger configuration.
1. Select the Fabric SQL connection and select the database and schema where the stored procedure you created in step 1 resides. 

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/select-connection-database.png" alt-text="Screenshot of Select Database and Schema fields highlighted in event trigger configuration." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/select-connection-database.png":::

1. Select the stored procedure from the dropdown.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/select-stored-procedure.png" alt-text="Screenshot of selecting the schema and stored procedure from the dropdown menus." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/select-stored-procedure.png":::

1. After you select the stored procedure, the **Parameters** section auto-populates any required parameters. Enter the parameter values or select them from built-in options by selecting the **Plus (+)** icon.

    In this example, the region and year are user-defined parameters. Use the built-in parameter **CreatedBy** to capture the user name.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/configure-event-trigger-parameters.png" alt-text="Screenshot of mapping parameter values for a stored procedure event trigger action." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/configure-event-trigger-parameters.png":::

1. Save the event trigger configuration, then initiate writeback after you receive a success notification that the webhook was added.
1. Select **Trigger Logs** in the **Writeback** ribbon to view details such as the completion status, start time, duration, and stored procedure name.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/view-stored-procedure-event-trigger-logs.png" alt-text="Screenshot of viewing stored procedure event trigger logs." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/view-stored-procedure-event-trigger-logs.png":::

## Trigger a Fabric data pipeline

Pipeline-based event triggers allow you to orchestrate end-to-end data integration workflows whenever writeback events occur. By linking writeback actions directly to Microsoft Fabric data pipelines, you can automatically extract, transform, aggregate, and move planning data across your enterprise systems without waiting for scheduled batch jobs.

This capability is particularly useful when you need to validate writeback data across multiple sources, combine it with historical actuals, load it into a centralized Data Warehouse or Lakehouse, or trigger conditional multi-step alerts and downstream applications.

1. Create a Fabric data pipeline with your required downstream activities, such as extracting the writeback data or sending conditional email notifications.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/create-data-pipeline.png" alt-text="Screenshot of a Fabric data pipeline with Lookup, If Condition, Stored procedure, and Office365 Email activities." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/create-data-pipeline.png":::

1. In your planning sheet, select **Event Trigger** in the **Writeback** ribbon. Add a new trigger and select **Run Pipeline** as the **Action Type** in the event trigger configuration.
1. Select the pipeline from the OneLake catalog, then choose the Fabric Data Pipeline connection to establish access from your planning sheet.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/select-pipeline-select-connection.png" alt-text="Screenshot of selecting the pipeline and connection." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/select-pipeline-select-connection.png":::

1. If your pipeline requires parameters, select **Edit action** and create the parameters. In this example, you create user-defined parameters to pass the email list and delta load.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/pipeline-parameters.png" alt-text="Screenshot of editing action showing EmailList and IsDeltaLoad pipeline parameters with values." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/pipeline-parameters.png":::

1. Save the event trigger configuration, then initiate writeback after you receive a success notification that the webhook was added.
1. Select **Trigger Logs** in the **Writeback** ribbon to view details such as the completion status, start time, duration, and pipeline name.

## Trigger a semantic model refresh

Keep your Power BI semantic models automatically aligned with your latest planning data. If you write back planning data to your source semantic model, set up a semantic model refresh event trigger so writeback updates instantly push through to ensure reports and dashboards reflect up-to-date figures in real time.

1. In your planning sheet, select **Event Trigger** in the **Writeback** ribbon. Add a new trigger and select **Refresh Semantic Model** from **Action Type** in the event trigger configuration.
1. Select your source semantic model from the OneLake catalog and select a Power BI Semantic Model connection.
1. Optionally pass a request body to set parameters such as commitMode, maxParallelism, retryCount, or timeout. Select **Save**.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/semantic-model-refresh-configuration.png" alt-text="Screenshot of configuration for a semantic model refresh." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/semantic-model-refresh-configuration.png":::

1. Save the event trigger configuration, then initiate writeback after you receive a success notification that the webhook was added.
1. Select **Trigger Logs** in the **Writeback** ribbon to view details such as the completion status, start time, duration, and semantic model name.

## Trigger a dataflow

Use dataflow event triggers to automatically clean, transform, or enrich planning data immediately after a writeback. For example, when a regional team submits new forecast entries, a dataflow can instantly run validation logic, adjust currency conversions, or merge writeback entries with historical actuals, ensuring your downstream reporting tables remain clean and fully reconciled without manual intervention or batch delays.

1. Create a Fabric dataflow with the required data cleansing and transformation logic.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/create-dataflow.png" alt-text="Screenshot of the Power Query editor showing applied steps for a dataflow." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/create-dataflow.png":::

1. In your planning sheet, select **Event Trigger** in the **Writeback** ribbon. Add a new trigger and select **Run Dataflow** from **Action Type** in the event trigger configuration.
1. Select the dataflow to run from the OneLake catalog, then choose the Dataflow connection to establish access from your planning sheet.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/event-trigger-dataflow-connection-selection.png" alt-text="Screenshot of selecting the dataflow and connection." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/event-trigger-dataflow-connection-selection.png":::

1. Save the event trigger configuration, then initiate writeback after you receive a success notification that the webhook was added.
1. Select **Trigger Logs** in the **Writeback** ribbon to view details such as the completion status, start time, and duration.

## Trigger a notebook

Extend your planning capabilities by running code-driven workflows immediately following a writeback event. Use notebooks to:

* Pass writeback entries directly into models to predict churn, forecast demand, or detect budget anomalies in real time.
* Run custom mathematical algorithms to distribute top-down budget entries down to lower-level SKUs or cost centers.
* Append or merge newly submitted planning data directly into Delta tables in OneLake using Spark batch writes.

1. Create a Fabric notebook to run the required post-processing logic.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/writeback-transformation-sql-code.png" alt-text="Screenshot of notebook code assigning writeback columns and displaying resulting SQL query table." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/writeback-transformation-sql-code.png":::

1. In your planning sheet, select **Event Trigger** in the **Writeback** ribbon. Add a new trigger and select **Run Notebook** from **Action Type** in the event trigger configuration.
1. Select the notebook you created in step 1 from the OneLake catalog, then choose the Notebook connection to establish access from your planning sheet.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/notebook-connection.png" alt-text="Screenshot of selecting the notebook and connection for the event trigger action." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/notebook-connection.png":::

1. If your notebook requires parameters, select **Edit action** and create the parameters. In this example, you pass the region and year as user-defined parameters and use built-in parameters to capture the username and update time.

    :::image type="content" source="../media/planning-writeback/planning-how-to-configure-event-triggers/create-notebook-parameters.png" alt-text="Screenshot of the Edit Action dialog mapping notebook parameters like region, fiscal year, and updated by." lightbox="../media/planning-writeback/planning-how-to-configure-event-triggers/create-notebook-parameters.png":::

1. Save the event trigger configuration, then initiate writeback after you receive a success notification that the webhook was added.
1. Select **Trigger Logs** in the **Writeback** ribbon to view details such as the completion status, start time, and duration.

## Related content

* [Data pipelines in Fabric](/fabric/data-factory/pipeline-overview)
* [How to use Fabric notebooks](/fabric/data-engineering/how-to-use-notebook)
* [Create a dataflow in Fabric and transform data](/fabric/data-factory/create-first-dataflow-gen2)

