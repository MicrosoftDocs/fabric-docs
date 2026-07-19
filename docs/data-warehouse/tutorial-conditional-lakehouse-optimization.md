---
title: "Tutorial: Optimize Lakehouse Tables Based on Health Checks"
description: "Learn how to build a Microsoft Fabric data pipeline that checks Lakehouse table health before deciding whether to run OPTIMIZE, saving capacity units on tables that don't need maintenance."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: procha
ms.date: 06/16/2026
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: tutorial
---

# Optimize Lakehouse tables based on health checks

**Applies to:** [!INCLUDE [fabric-se](includes/applies-to-version/fabric-se.md)]

In this tutorial, you learn how to build a Microsoft Fabric Pipeline to perform intelligent table maintenance.

This solution calls the `sys.sp_get_table_health_metrics` T-SQL stored procedure on the Lakehouse SQL analytics endpoint, evaluates the result, and runs `OPTIMIZE` only when the table actually needs maintenance. This "check-then-act" pattern prevents unnecessary compute spend on healthy tables while ensuring degraded tables are maintained automatically.

## Why maintenance is necessary

Lakehouse tables can accumulate too many small Parquet files over time, which hurts query performance on the SQL analytics endpoint. 

Rather than running `OPTIMIZE` on a fixed schedule regardless of table state, this pipeline makes an informed decision: it checks the table's health first, and only triggers optimization when an anomaly is detected.

## Prerequisites

Before you begin, make sure you have:

- A [Microsoft Fabric workspace](../get-started/workspaces.md) with contributor or higher permissions.
- A Lakehouse in that workspace containing at least one Delta table you want to monitor. This tutorial uses a Lakehouse named `SalesDataLakehouse`.
- Familiarity with [Fabric data pipelines](/fabric/data-factory/activity-overview).
- Familiarity with [Fabric notebooks](/fabric/data-engineering/how-to-use-notebook).

## Solution structure

The completed pipeline has this structure:

1. **Script activity**: Executes `sp_get_table_health_metrics` against the target table and returns table-health metrics as structured output.
1. **If Condition activity**: Reads `PotentialAnomalyType` directly from the Script output and checks if it's greater than zero. For more information on the `PotentialAnomalyType`, see [Potential anomaly type codes](/sql/relational-databases/system-stored-procedures/sp-get-table-health-metrics-transact-sql?view=fabric&preserve-view=true#potential-anomaly-type-codes).
1. **Notebook activity** (inside the **True** branch): Runs `OPTIMIZE` on the table from a Spark notebook.

At the end of this tutorial, you will have a notebook that takes parameters from the pipeline and optimizes a table when triggered.

## Step 1: Create the optimization notebook

The notebook accepts the target Lakehouse, schema, and table name as parameters from the pipeline, then executes `OPTIMIZE` using Spark SQL.

1. In your Fabric workspace, select **+ New item** > **Notebook**.
1. Name the notebook **Optimize-Table**.
1. Under **Location**, select the Lakehouse where the tables that you check are stored. This exercise uses a Lakehouse named `SalesDataLakehouse`.
1. Select **Create**.

#### Add the parameter cell

The first cell defines the variables that the pipeline overrides at runtime.

1. In the first cell, enter the following parameters. The values aren't important, and the pipeline overrides them at runtime.

    ```python
    # Parameters 
    lakehouse_name = "<LakehouseName>"
    schema_name    = "<SchemaName>"
    table_name     = "<TableName>"
    ```
    
    > [!IMPORTANT]
    > **How parameterization works in Fabric notebooks:** At runtime, Fabric injects a new cell immediately after the parameter cell that reassigns these variables with the values passed by the pipeline. The values you set here only initialize the variables and improve readability.

1. Select the cell menu (**...**) > **Toggle parameter cell** to mark this cell as a parameter cell.

#### Add the OPTIMIZE cell

The `OPTIMIZE` command is a Spark SQL command, not a T-SQL command. You must run it in Spark environments such as notebooks, Spark job definitions, or the Lakehouse Maintenance interface. The SQL analytics endpoint and Warehouse SQL query editor don't support this command directly.

1. In the second cell, enter:

    ```python
    full_name = f"{lakehouse_name}.{schema_name}.{table_name}"
    print(f"Optimizing {full_name} ...")
    
    result = spark.sql(f"OPTIMIZE {full_name}")
    result.show(truncate=False)
    ```

1. Add Markdown cells as needed to properly document the notebook for other users. Your finalized notebook should look something like the following: 

   :::image type="content" source="media/tutorial-conditional-lakehouse-optimization/table-optimization-notebook.png" alt-text="Screenshot of a Fabric notebook titled 'Optimize a Lakehouse table when health checks show it's needed,' with two PySpark cells: one sets pipeline-provided lakehouse, schema, and table parameters, and the other runs an OPTIMIZE command for the selected Lakehouse table." lightbox="media/tutorial-conditional-lakehouse-optimization/table-optimization-notebook.png":::

> [!NOTE]
> This example considers a Lakehouse with schemas enabled. Adjust the three-part name on `full_name` accordingly if you don't use Lakehouse schemas. 

## Step 2: Create the pipeline

1. In your Fabric workspace, select **+ New item** > **Pipeline**.
1. Name the pipeline **Check-and-Optimize-Table**.
1. Select the pipeline canvas background, and then open the **Parameters** tab. Add three parameters:

    | Name | Type | Default value |
    |---|---|---|
    | `lakehouse_name` | String | `SalesDataLakehouse` |
    | `schema_name` | String | `dbo` |
    | `table_name` | String | `FactSales` |

## Step 3: Add the Script activity

The Script activity runs `sys.sp_get_table_health_metrics` on the SQL analytics endpoint and captures the result.

> [!IMPORTANT]
> Use the **Script** activity, not the **Stored procedure** activity. Only the Script activity exposes the result set as structured JSON output that downstream activities can parse.

1. From the **Activities** tab, select **Script** to add it onto the canvas.
1. Name it **Check Table Health**.
1. In the **Settings** tab:
   - **Connection**: Select the SQL analytics endpoint for your Lakehouse. If it isn't listed, select **Browse all** at the bottom of the dropdown list, and then locate your Lakehouse's SQL analytics endpoint.
   - **Script type**: Select **Query**.
   - **Script**: Select **Add dynamic content** and enter the following expression:

        ```text
        @concat('EXEC sys.sp_get_table_health_metrics ''',
                pipeline().parameters.schema_name, '.',
                pipeline().parameters.table_name, '''')
        ```

This expression produces the SQL command that executes the stored procedure against your target table, for example: `EXEC sys.sp_get_table_health_metrics 'dbo.FactSales'`.

### Verify the script output

Run the pipeline once and inspect the **Script activity** output. You see a JSON object similar to:

```json
{
  "resultSetCount": 1,
  "resultSets": [
    {
      "rowCount": 1,
      "rows": [
        {
          "PotentialAnomalyType": 3,
          "PotentialAnomalyDescription": "Too many small files...",
          "FileCount": 2688,
          "...": "..."
        }
      ]
    }
  ]
}
```

> [!IMPORTANT]
> Your actual result might vary based on the state of your table. The key is that it returns the columns exposed by `sys.sp_get_table_health_metrics`.

## Step 4: Add the If Condition activity

The **If Condition** activity reads `PotentialAnomalyType` directly from the **Script** activity output and takes a decision based on its result. Use the following steps: 

1. From the **Activities** tab, select **If Condition** to add an activity onto the canvas.
1. Name it **Check Anomaly**.
1. Draw a **Success** (green) arrow from **Check Table Health** to **Check Anomaly**.
1. In the **Activities** tab of the **If Condition** activity, set the **Expression** to:

    ```text
    @greater(int(activity('Check Table Health').output.resultSets[0].rows[0]['PotentialAnomalyType']), 0)
    ```

This expression reads the first row returned by `sys.sp_get_table_health_metrics`, casts `PotentialAnomalyType` to an integer, and evaluates to `true` when the value is greater than zero, which indicates an anomaly detected in the target table.

## Step 5: Add the Notebook activity (True branch)

With the **If Condition** activity selected, select **Edit** (pencil icon) next to **True**. The canvas switches to a sub-canvas scoped to the **True** branch.

1. Drag a **Notebook** activity onto the True sub-canvas.
1. Name it **Run OPTIMIZE**.
1. In the **Settings** tab:

   - **Notebook**: Select the **Optimize-Table** notebook you created in Step 1.
   - Expand **Base parameters**, then add three rows:

      | Name | Type | Value |
      |---|---|---|
      | `lakehouse_name` | String | `@pipeline().parameters.lakehouse_name` |
      | `schema_name` | String | `@pipeline().parameters.schema_name` |
      | `table_name` | String | `@pipeline().parameters.table_name` |

The three name column values must match the variable names in the notebook's parameter cell *exactly*.

> [!NOTE]
> You can leave **False activities** empty. The If Condition activity treats an empty False branch as a no-op and reports the pipeline as succeeded.

Your completed pipeline should look like the following: 

:::image type="content" source="media/tutorial-conditional-lakehouse-optimization/full-pipeline.png" alt-text="Screenshot of a Fabric data pipeline with a Check Table Health script activity connected to a Check Anomaly conditional activity. The true branch runs an OPTIMIZE notebook activity, while the false branch has no activities." lightbox="media/tutorial-conditional-lakehouse-optimization/full-pipeline.png":::

## Step 6: Validate and run

1. Select **Validate** on the pipeline toolbar to check for configuration errors.
1. Select **Run** to execute the pipeline manually.
1. Monitor the run and confirm:

   1. **Check table health**: inspect the Output from this activity when it runs. You should see the output from the `sys.sp_get_table_health_metrics` stored procedure in JSON format. 
   1. **Check Anomaly**: evaluates correctly by reading `PotentialAnomalyType` directly from the Script output.
   1. **Run OPTIMIZE** (only if `PotentialAnomalyType > 0`): if the **Check Anomaly** activity evaluates **True**, review the input of the **Run OPTIMIZE** activity to verify that it uses the correct parameters (Lakehouse name, schema, and table name) and check the output to review the messages from the `OPTIMIZE` operation. 

## Clean up resources

If you created resources only for this tutorial and no longer need them, delete the following items from your workspace:

- The **Check-and-Optimize-Table** pipeline.
- The **Optimize-Table** notebook.

## Related content

- [sp_get_table_health_metrics (Transact-SQL)](/sql/relational-databases/system-stored-procedures/sp-get-table-health-metrics-transact-sql?view=fabric&preserve-view=true)
- [Performance guidelines in Fabric Data Warehouse](guidelines-warehouse-performance.md)