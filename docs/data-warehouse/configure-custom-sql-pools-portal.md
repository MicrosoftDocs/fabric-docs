---
title: Configure Custom SQL Pools in the Fabric Portal
description: Learn how to use the Fabric portal to configure custom SQL pools.
ms.reviewer: brmyers
ms.date: 03/11/2026
ms.topic: quickstart
---

# Configure custom SQL pools in the Fabric portal

**Applies to**: [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

By using custom SQL pools, administrators can control how the system allocates resources to handle requests. In this quickstart, you configure custom SQL pools and view the classifier values in the Fabric portal.

Workspace administrators can use the application name (or program name) from the connection string to route requests to different compute pools. Workspace administrators can also control the percentage of resources each compute SQL pool can access, based on the burstable scale limit of the workspace capacity.

## Prerequisites

- Access to a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] item in a workspace. You must be a member of the Administrator role.

## Configure custom SQL pools via the portal

1. In the Fabric portal, go to the Fabric workspace where you want to enable custom SQL pools. 
1. In the workspace, select **Workspace Settings**. 
1. In the **Workspace settings** pane, expand **Data Warehouse**. Select the **SQL Pools** page. 

   :::image type="content" source="media/configure-custom-sql-pools-portal/workspace-settings-sql-pools.png" alt-text="Screenshot from the Fabric portal showing the SQL pools page in Workspace Settings." lightbox="media/configure-custom-sql-pools-portal/workspace-settings-sql-pools.png":::

   An informational bubble says **Using built-in pools** when default pool settings are in place. When you configure custom SQL pools, the bubble shows **Using custom setup**.
1. Select the **Set up custom pools** button to enable custom SQL pools.
1. Select the **Classifier type** dropdown list and select either **Application name (exact name)** for exact application name classification or **Application name (regex)** for regular expression application name classification. For this exercise, choose **Application name (regex)** to create classifiers based on a regular expression.

   :::image type="content" source="media/configure-custom-sql-pools-portal/classifiers.png" alt-text="Screenshot from the Fabric portal showing the custom SQL pools classifiers dropdown list." lightbox="media/configure-custom-sql-pools-portal/classifiers.png":::
    
1. Configure a custom SQL pool:

   - A pool is automatically generated named **Sql pool1**. Edit the **Pool name** field to give it your own name, like `ETL`.
   - The pool is automatically defined as the **default** pool so the **App name (regex)** field is disabled. You can only define one default pool.

    1. Define the compute percentage for this pool. 
    1. Check the **Optimize for reads** box if you want the pool to be optimized for `SELECT` type queries.

1. Create additional custom SQL pools:

   1. Select the **+ New SQL Pool** button to add more pools to the list.
   1. Provide a descriptive name for the pool, like `MyContosoApp`. Each pool must have a unique name.
   1. Each pool must also have a unique **Application name (exact name)** [classifier value](custom-sql-pools.md#classifiers). In this sample, provide two values: `MyContosoApp` and `DMS_user`.
       - To capture multiple *exact* application names, use the **Application name (exact name)** classifier type.
       - To capture variable application names using regular expressions, use the **Application name (regex)** classifier type.
   1. Assign values in the **Compute %** field. The sum of all **Compute %** must be less than or equal to 100%.
    
   :::image type="content" source="media/configure-custom-sql-pools-portal/configuration.png" alt-text="Screenshot from the Fabric portal of custom SQL pools example configuration." lightbox="media/configure-custom-sql-pools-portal/configuration.png":::

1. Select **Save**.

> [!TIP]
> Use these helpful **Application Name (regex)** classifier values for traffic from Fabric: 
>
> - To pool queries from Fabric pipelines, use `^Data Integration-to[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$`.
> - To pool queries from Power BI, use `^(PowerBIPremium-DirectQuery|Mashup Engine(?: \(PowerBIPremium-Import\))?)`.
> - To pool queries from the [Fabric portal SQL query editor](sql-query-editor.md), use `DMS_user`.

## Set the application name in SQL Server Management Studio (SSMS)

The classifier for custom SQL pools uses the application name or program name parameter of common connection strings. 

1. In SQL Server Management Studio (SSMS), specify the [server name for the warehouse](how-to-connect.md#find-the-warehouse-connection-string) and provide authentication. **Microsoft Entra MFA** is recommended.
1. Select the **Advanced** button.
1. In the **Advanced Properties** page, under **Context**, change the value of **Application Name** to `MyContosoApp`.

   :::image type="content" source="media/configure-custom-sql-pools-portal/advanced-properties-application-name.png" alt-text="Screenshot from SQL Server Management Studio of the Advanced Properties page with Application Name = MyContosoApp." lightbox="media/configure-custom-sql-pools-portal/advanced-properties-application-name.png":::

1. Select **OK**.
1. Select **Connect**.
1. To generate some sample activity, use this connection in SSMS to run a simple query in your warehouse, for example:

    ```sql
    SELECT *
    FROM dbo.DimDate;
    ```

## Observe query insights for the custom SQL pool

1. Review the `sys.dm_exec_sessions` dynamic management view to see that `MyContosoApp` is the application name that SQL Server Management Studio passes to the SQL engine. 

   ```sql
   SELECT session_id, program_name
   FROM   sys.dm_exec_sessions
   WHERE  program_name = 'MyContosoApp';
   ```

   For example:

   :::image type="content" source="media/configure-custom-sql-pools-portal/program-name-query-result.png" alt-text="Screenshot from SQL Server Management Studio showing the results of the query on sys.dm_exec_sessions and the session identified by the program name MyContosoApp.":::

1. Because the `program_name` matches the application name in the `MyContosoApp` custom SQL pool, this query uses the resources in that pool. To prove what custom SQL pool the query used, you can query the [queryinsights.exec_requests_history](/sql/relational-databases/system-views/queryinsights-exec-requests-history-transact-sql?view=fabric&preserve-view=true) system view. Wait 10-15 minutes for query insights to populate, and then run the following query:

    ```sql
    SELECT distributed_statement_id, submit_time, program_name, sql_pool_name, start_time, end_time
    FROM   queryinsights.exec_requests_history 
    WHERE  program_name = 'MyContosoApp';
    ```

1. You can also identify the pool of a query by its Statement ID. In the [Fabric portal SQL query editor](sql-query-editor.md), run a query against your warehouse or SQL analytics endpoint. 

    ```sql
    SELECT *
    FROM dbo.DimDate;
    ```

1. Select the **Messages** tab and record the **Statement ID** for the query execution. In the SQL query editor, the `program_name` is `DMS_user`, which you configured to use the `MyContosoApp` custom SQL pool.
1. Wait 10-15 minutes for query insights to populate. 
1. Retrieve the `sql_pool_name` and other information to verify that the proper custom SQL pool was used.

    ```sql
    SELECT distributed_statement_id, submit_time, program_name, sql_pool_name, start_time, end_time
    FROM   queryinsights.exec_requests_history 
    WHERE  distributed_statement_id = '<Statement ID>';
    ```

## Revert the custom SQL pools configuration

To return the workspace to the original state:

1. Go back to **Workspace settings** and the **SQL pool** configuration page. 
1. Select the **Revert to built-in setup** button. A pop-up appears asking if you want to revert the custom SQL pool configuration back to the autonomous workload management configuration of `SELECT` and Non-`SELECT` pools. 

## Related content

- [Custom SQL Pools](custom-sql-pools.md)
- [Workload Management](workload-management.md)
