---
title: "Configure SQL Audit Logs in Fabric Data Warehouse (Preview)"
description: Step-by-step instructions to enable and configure SQL audit logs on Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: fresantos
ms.date: 07/15/2025
ms.topic: how-to
ms.search.form: Warehouse SQL Audit Logs # This article's title should not change. If so, contact engineering.
---
# How to configure SQL audit logs in Fabric Data Warehouse (Preview)

**Applies to:** [!INCLUDE [fabric-dw.md](includes/applies-to-version/fabric-se-and-dw.md)]

Auditing in Fabric Data Warehouse provides enhanced security and compliance capabilities by tracking and recording database events. 

You can configure SQL audit logs in the Fabric portal or via REST API. The SQL audit logs feature is currently in preview.

## Prerequisites

- A Fabric workspace with an active capacity or trial capacity.
- You should have access to a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] item within a workspace.
- You must have the **Audit permission** to configure and query audit logs. For more information, see [Permissions](sql-audit-logs.md#permissions).

## Configure SQL audit logs

You can configure SQL audit logs using the **Fabric portal** or via **REST API**.

## [Configure using the Fabric portal](#tab/portal)

1. In your Fabric workspace, select the **Settings** of your warehouse item.
1. Select the **SQL audit logs** page.
1. Enable the setting **Save events to SQL audit logs**.

   :::image type="content" source="media/configure-sql-audit-logs/enable.png" alt-text="Screenshot from the Fabric portal of the setting to enable.":::

   By default, all actions are enabled and retained for nine years.

1. You can configure which events will be captured by SQL audit logs under **Events to record**. Select which event categories or individual audit action groups you want to capture. Only select the events your organization requires to optimize storage and relevance.

   :::image type="content" source="media/configure-sql-audit-logs/set-groups.png" alt-text="Screenshot from the Fabric portal of the recording and retention options, the Events to record section.":::

1. Specify a desired **log retention** period in **Years**, **Months**, and **Days**.

   :::image type="content" source="media/configure-sql-audit-logs/set-retention.png" alt-text="Screenshot from the Fabric portal of the Log retention options.":::

1. Select **Save** to apply your settings.

Your warehouse will now record the selected audit events and store the logs securely in OneLake.

## [Configure using the REST API](#tab/api)

<a id="obtain-your-power-bi-bearer-token"></a>

1. Download and install [Visual Studio Code](https://code.visualstudio.com/download).
1. Install the [REST Client extension from the Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).
1. Obtain the bearer token using the following steps. You can find your Power BI bearer token in **your browser's developer tools** or via **PowerShell**.

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
    
1. Once you have obtained the Power BI bearer token, you can send a `PATCH` request using the REST Client extension. In VS Code, create a new text file in VS Code with the `.http` extension.
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
    - Setting `state` to "Enabled" activates auditing (use "Disabled" to turn it off).
    - The `retentionDays` parameter is set to `0` by default for unlimited retention.
1. Select **Send Request**.

#### Check audit log status with the REST API

To verify if the SQL Audit Logs are enabled, send a GET request using the same REST Client extension.

1. In VS Code, create a new text file in VS Code with the `.http` extension.
1. Copy and paste the following request, providing your own `workspaceId`, `<warehouseId>`, and `<BEARER_TOKEN>`.

```http
GET https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/warehouses/<warehouseId>/settings/sqlAudit
content-type: application/json
Authorization: Bearer <BEARER_TOKEN>
```

The response returns `ENABLED` or `DISABLED` and the current configuration of `auditActionsAndGroups`.

#### Configure audit action groups with the REST API

SQL audit logs rely on predefined action groups that capture specific events within the database. For details on audit action groups, see [SQL audit logs in Fabric Data Warehouse](sql-audit-logs.md#database-level-audit-action-groups-and-actions). 

1. In VS Code, create a new text file in VS Code with the `.http` extension.
1. Copy and paste the following request, providing your own `workspaceId`, `<warehouseId>`, and `<BEARER_TOKEN>`.

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/warehouses/<warehouseId>/settings/sqlAudit
    content-type: application/json
    Authorization: Bearer <BEARER_TOKEN>
    [  "DATABASE_OBJECT_PERMISSION_CHANGE_GROUP" ]
    ```

1. Select **Send Request**.

---

## Query audit logs

SQL audit log data is stored in **.XEL files** in the OneLake, and can only be accessed using the [sys.fn_get_audit_file_v2](/sql/relational-databases/system-functions/sys-fn-get-audit-file-v2-transact-sql?view=fabric&preserve-view=true) Transact-SQL (T-SQL) function. For more information on how audit files are stored in the OneLake, see [SQL audit logs in Fabric Data Warehouse](sql-audit-logs.md#storage).

From the [SQL query editor](sql-query-editor.md) or any query tool such as [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true), use the following sample T-SQL queries, providing your own `workspaceId` and `<warehouseId>`.

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
- [SQL audit logs in Fabric Data Warehouse](sql-audit-logs.md)
- [Security for data warehousing in Microsoft Fabric](security.md)
