---
title: "Configure SQL Audit Logs in Fabric Data Warehouse"
description: Step-by-step instructions to enable and configure SQL audit logs on Fabric Data Warehouse.
ms.reviewer: fresantos
ms.date: 08/10/2026
ms.topic: how-to
ms.search.form: Warehouse SQL Audit Logs # This article's title should not change. If so, contact engineering.
---
# How to configure SQL audit logs

**Applies to:** [!INCLUDE [fabric-dw.md](includes/applies-to-version/fabric-dw.md)]

Auditing in Fabric Data Warehouse provides enhanced security and compliance capabilities by tracking and recording database events. 

You can configure [SQL audit logs in Fabric Data Warehouse](sql-audit-logs.md) in the Fabric portal or via REST API. 

## Prerequisites

To configure SQL audit logs for Fabric Data Warehouse, you need the following items:

- A Fabric workspace with an active capacity or trial capacity.
- Access to a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] item within a workspace.
- **Audit** permission to configure and query audit logs. For more information, see [Permissions](sql-audit-logs.md#permissions).

## Configure SQL audit logs

You can configure SQL audit logs by using the **Fabric portal** or **REST API**.

## [Configure using the Fabric portal](#tab/portal)

1. In your Fabric workspace, select the **Settings** of your warehouse item.
1. Select the **SQL audit logs** page.
1. Enable the setting **Save events to SQL audit logs**.

   :::image type="content" source="media/configure-sql-audit-logs/enable.png" alt-text="Screenshot from the Fabric portal of the setting to enable.":::

   By default, all actions are enabled and retained for nine years.

1. Under **Events to record**, select which events the SQL audit logs capture. Select the event categories or individual audit action groups you want to capture. Only select the events your organization requires to optimize storage and relevance.

   :::image type="content" source="media/configure-sql-audit-logs/set-groups.png" alt-text="Screenshot from the Fabric portal of the recording and retention options, the Events to record section.":::

1. Optionally, enter a **Predicate Expression** to filter events, such as excluding activity from a known service principal or automation identity. Use the syntax described in [Predicate expression syntax](sql-audit-logs.md#predicate-expression-syntax).

   :::image type="content" source="media/configure-sql-audit-logs/set-predicate.png" alt-text="Screenshot from the Fabric portal of the Predicate Expression option.":::

   > [!IMPORTANT]
   > Predicate filtering only applies to events already selected under **Events to record**. For example, to filter `SELECT` statements, you must also enable **Batch Was Completed**.

1. Specify a desired **log retention** period in **Years**, **Months**, and **Days**.

   :::image type="content" source="media/configure-sql-audit-logs/set-retention.png" alt-text="Screenshot from the Fabric portal of the Log retention options.":::

1. Select **Save** to apply your settings.

Your warehouse now records the selected audit events and stores the logs securely in OneLake.

## [Configure using the REST API](#tab/api)

<a id="obtain-your-power-bi-bearer-token"></a>

1. Download and install [Visual Studio Code](https://code.visualstudio.com/download).
1. Install the [REST Client extension from the Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).
1. Get the bearer token by following these steps. You can find your Power BI bearer token in **your browser's developer tools** or through **PowerShell**.

    **To use the Edge developer tools to find your Power BI bearer token:**
    
    1. Open your Microsoft Fabric workspace in a browser (Microsoft Edge).
    1. Press **F12** to open Developer Tools. 
    1. Select the **Console** tab. If necessary, select **Expand Quick View** to reveal the console prompt `>`.
    1. Type the command `powerBIAccessToken` and press **Enter**. Right-click on the large unique string returned in the console and select **Copy string contents**.
    1. Paste it in place of `<bearer token>` in the following scripts.
    
    **To use PowerShell to find your Power BI bearer token:**
    
    1. Install the `MicrosoftPowerBIMgmt` module from [Microsoft Power BI Cmdlets for Windows PowerShell and PowerShell Core](/powershell/power-bi/overview).
    
       ```powershell
       Install-Module -Name MicrosoftPowerBIMgmt
       ```
    
    1. Use [Connect-PowerBIServiceAccount](/powershell/module/microsoftpowerbimgmt.profile/connect-powerbiserviceaccount) to connect to Power BI PowerShell, and retrieve the bearer token.
    
       ```powershell
       Connect-PowerBIServiceAccount
       $token = (Get-PowerBIAccessToken).Authorization
       Write-Output "Bearer $token"
       ```
    
1. After you get the Power BI bearer token, send a `PATCH` request by using the REST Client extension. In VS Code, create a new text file with the `.http` extension.
1. Copy and paste the following request:

    ```http
    PATCH https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/warehouses/<warehouseId>/settings/sqlAudit
    content-type: application/json
    Authorization: Bearer <BEARER_TOKEN>
    
    {
        "state": "Enabled",
        "retentionDays": "0"
    }
    ```

    - Replace `<workspaceId>` and `<warehouseId>` with the corresponding Fabric workspace and warehouse IDs. To find these values, visit your warehouse in the Fabric portal.
        - `<workspaceID>`: Find the workspace GUID in the URL after the `/groups/` section, or by running `SELECT @@SERVERNAME` in an existing warehouse. For example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. 
        - `<warehouseID>`: Find the warehouse GUID in the URL after the `/warehouses/` section, or by running `SELECT @@SERVERNAME` in an existing warehouse. For example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters.
    - Replace `<BEARER_TOKEN>` with your [bearer token](#obtain-your-power-bi-bearer-token).
        - Set `state` to `Enabled` to turn on auditing (use `Disabled` to turn it off).
        - Set the `retentionDays` parameter to `0` for unlimited retention. This setting is the default.
    
   > [!IMPORTANT]
    > In the extension example code, you must include an empty line immediately after providing the bearer token. This empty line signals the extension where the HTTP headers end and the API command body begins, so the API can correctly distinguish between the two.
    
1. Select **Send Request**.

#### Check audit log status with the REST API

To verify if SQL audit logs are enabled, send a GET request by using the same REST Client extension.

1. In VS Code, create a new text file with the `.http` extension.
1. Copy and paste the following request, providing your own `workspaceId`, `<warehouseId>`, and `<BEARER_TOKEN>`.

```http
GET https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/warehouses/<warehouseId>/settings/sqlAudit
content-type: application/json
Authorization: Bearer <BEARER_TOKEN>
```

The response returns `ENABLED` or `DISABLED` and the current configuration of `auditActionsAndGroups` and `predicateExpression`.

#### Configure audit action groups with the REST API

SQL audit logs rely on predefined action groups that capture specific events within the database. For details on audit action groups, see [SQL audit logs in Fabric Data Warehouse](sql-audit-logs.md#database-level-audit-action-groups-and-actions). 

1. In VS Code, create a new text file with the `.http` extension.
1. Copy and paste the following request, providing your own `workspaceId`, `<warehouseId>`, and `<BEARER_TOKEN>`.

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/warehouses/<warehouseId>/settings/sqlAudit
    content-type: application/json
    Authorization: Bearer <BEARER_TOKEN>
    [  "DATABASE_OBJECT_PERMISSION_CHANGE_GROUP" ]
    ```

1. Select **Send Request**.

#### Configure a predicate expression

Use the same `PATCH` API request to configure a predicate expression that excludes specific events from being generated, such as activity from a known service principal or automation identity. For the full predicate syntax, see [Predicate expression syntax](sql-audit-logs.md#predicate-expression-syntax).

1. In VS Code, create a new text file with the `.http` extension.
1. Copy and paste the following request, providing your own `workspaceId`, `<warehouseId>`, and `<BEARER_TOKEN>`.

    ```http
    PATCH https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/warehouses/<warehouseId>/settings/sqlAudit
    content-type: application/json
    Authorization: ******

    {
        "state": "Enabled",
        "retentionDays": 10,
        "predicateExpression": "NOT statement LIKE 'SELECT %'"
    }
    ```

    - This example excludes `SELECT` statements from being audited by filtering on the `statement` field.
    - When you enable SQL auditing for the first time, omitting `predicateExpression` applies no predicate. On later updates, omitting it leaves the existing predicate unchanged. Specify an empty string (`""`) to remove an existing predicate.

   > [!IMPORTANT]
   > Predicate filtering only evaluates events that are already configured to be captured. To filter `SELECT` statements as shown in this example, you must also enable the **Batch Was Completed** (`BATCH_COMPLETED_GROUP`) action group. For more information, see [Database-level audit action groups and actions](sql-audit-logs.md#database-level-audit-action-groups-and-actions).

1. Select **Send Request**.

---

## Query audit logs

SQL audit log data is stored in **.XEL files** in the OneLake. You can access this data by using the [sys.fn_get_audit_file_v2](/sql/relational-databases/system-functions/sys-fn-get-audit-file-v2-transact-sql?view=fabric&preserve-view=true) Transact-SQL (T-SQL) function. For more information about how audit files are stored in the OneLake, see [SQL audit logs in Fabric Data Warehouse](sql-audit-logs.md#storage).

From the [SQL query editor](sql-query-editor.md) or any query tool such as [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [the MSSQL extension for Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true), use the following sample T-SQL queries. Be sure to provide your own `<workspaceId>` and `<warehouseId>`.

```sql
SELECT * 
FROM sys.fn_get_audit_file_v2
('https://onelake.blob.fabric.microsoft.com/<workspaceId>/<warehouseId>/Audit/sqldbauditlogs/'
, default, default, default, default);
```

To filter logs by time range, use the following query:

```sql
SELECT * 
FROM sys.fn_get_audit_file_v2
('https://onelake.blob.fabric.microsoft.com/<workspaceId>/<warehouseId>/Audit/sqldbauditlogs/'
, default, default, '2025-03-30T08:40:40Z', '2025-03-30T09:10:40Z');
```

## Related content

- [Security in Microsoft Fabric](../security/security-overview.md)
- [Security for data warehousing in Microsoft Fabric](security.md)
- [OneLake security for SQL analytics endpoints](../onelake/sql-analytics-endpoint-onelake-security.md)