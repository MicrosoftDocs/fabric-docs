---
title: "Configure SQL Audit Logs in Fabric Data Warehouse (Preview)"
description: Step-by-step instructions to enable and configure SQL Audit Logs on Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: fresantos
ms.date: 05/09/2025
ms.topic: how-to
ms.search.form: Warehouse SQL Audit Logs # This article's title should not change. If so, contact engineering.
---
# How to configure SQL audit logs in Fabric Data Warehouse (Preview)

**Applies to:** [!INCLUDE [fabric-dw.md](includes/applies-to-version/fabric-se-and-dw.md)]

Auditing in Fabric Data Warehouse provides enhanced security and compliance capabilities by tracking and recording database events. Learn how to enable and configure audit logs in this article.

In the preview of Microsoft Fabric, enabling SQL Audit Logs requires using the Audit API. This guide provides step-by-step instructions on how to configure SQL Audit Logs using Visual Studio Code (VS Code) and the REST Client extension. 

## Prerequisites

- A Fabric workspace with an active capacity or trial capacity.
- You must have the **Audit permission** to configure and query audit logs. For more information, see [Permissions](sql-audit-logs.md#permissions).
- If you haven't already, download and install [Visual Studio Code](https://code.visualstudio.com/download) to download and install the application.
- If you haven't already, install the [REST Client - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

## Obtain your Power BI bearer token

### [Browser developer tools](#tab/browser)

1. Open your Microsoft Fabric workspace in a browser (Microsoft Edge).
1. Press **F12** to open Developer Tools. 
1. Select the **Console** tab. If necessary, select **Expand Quick View** to reveal the console prompt `>`.
1. Type the command `powerBIAccessToken` and press **Enter**. Copy the resulting large block of string contents. In Windows, right-click on the text and select **Copy String contents**.
1. Paste it in place of `<bearer token>` in the following scripts.

### [PowerShell](#tab/powershell)

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
    
---

## Enable SQL audit logs via the Audit API

Once you have obtained the Power BI bearer token, you can send a PATCH request using the REST Client extension.

1. In VS Code, create a new text file in VS Code with the `.http` extension.
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
        - `<warehouseID>`: Find the warehouse GUID in the URL after the `/warehouses/` section, or by running `SELECT @@SERVERNAME` in an existing warehouse. For example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. If your `/groups/` URL is followed by `/me/`, you're using the default workspace, and currently SQL Audit for Fabric Data Warehouse isn't supported in the default workspace. 
    - Replace `<BEARER_TOKEN>` with your [bearer token](#obtain-your-power-bi-bearer-token).
    - Setting `state` to "Enabled" activates auditing (use "Disabled" to turn it off).
    - The `retentionDays` parameter is set to `0` by default for unlimited retention.
1. Select **Send Request**.

### Check audit log status

To verify if the SQL Audit Logs are enabled, send a GET request using the same REST Client extension.

1. In VS Code, create a new text file in VS Code with the `.http` extension.
1. Copy and paste the following request, providing your own `workspaceId`, `<warehouseId>`, and `<BEARER_TOKEN>`.

```http
GET https://api.fabric.microsoft.com/v1/workspaces/<workspaceId>/warehouses/<warehouseId>/settings/sqlAudit
content-type: application/json
Authorization: Bearer <BEARER_TOKEN>
```

The response returns `ENABLED` or `DISABLED` and the current configuration of `auditActionsAndGroups`.

### Configure audit action groups

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

## Query audit logs

SQL audit log data is stored in **.XEL files** in the OneLake, and can only be accessed using the [sys.fn_get_audit_file_v2](/sql/relational-databases/system-functions/sys-fn-get-audit-file-v2-transact-sql?view=fabric&preserve-view=true) Transact-SQL (T-SQL) function. For more information on how audit files are stored in the OneLake, see [SQL audit logs in Fabric Data Warehouse](sql-audit-logs.md#storage).

From the [SQL query editor](sql-query-editor.md) or any query tool such as [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true), use the following sample T-SQL queries, providing your own `workspaceId` and `<warehouseId>`. 

```sql
SELECT * FROM sys.fn_get_audit_file_v2('https://onelake.blob.fabric.microsoft.com/<workspaceId>/<warehouseId>/Audit/sqldbauditlogs/', default, default, default, default)
```

To filter logs by time range, use the following query:

```sql
SELECT * FROM sys.fn_get_audit_file_v2('https://onelake.blob.fabric.microsoft.com/<workspaceId>/<warehouseId>/Audit/sqldbauditlogs/', default, default, '2025-03-30T08:40:40Z', '2025-03-30T09:10:40Z')
```

## Related content

- [Security in Microsoft Fabric](../security/security-overview.md)
- [SQL audit logs in Fabric Data Warehouse](sql-audit-logs.md)
- [Security for data warehousing in Microsoft Fabric](security.md)
