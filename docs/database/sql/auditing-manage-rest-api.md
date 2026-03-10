---
title: Manage SQL database auditing with the REST API
description: Learn how to view and configure SQL database auditing settings across a workspace using the Microsoft Fabric REST API and PowerShell.
author: VanMSFT
ms.author: vanto
ms.reviewer: srsaluru, wiassaf
ms.date: 03/10/2026
ai-usage: ai-assisted
ms.topic: how-to
ms.search.form: SQL database security
---

# Manage SQL database auditing with the REST API

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

You can use the [Fabric REST API](/rest/api/fabric/articles/) to view and configure SQL database auditing settings programmatically. While the Fabric portal allows you to configure auditing per database, the REST API lets you manage auditing consistently across all databases in a workspace.

This article demonstrates how to use PowerShell and the Fabric REST API to retrieve and update SQL auditing settings for SQL databases in a Fabric workspace.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- You can use an existing workspace or [create a new Fabric workspace](../../fundamentals/workspaces.md) with one or more SQL databases.
- You must be a member of the [Admin, Member, or Contributor roles for the workspace](../../fundamentals/give-access-workspaces.md) to manage auditing settings.
- PowerShell 5.1 or [PowerShell 7.4 and higher](/powershell/scripting/install/installing-powershell-on-windows).
- The Az PowerShell module. Run `Install-Module az` in PowerShell to install.

## Auditing REST API endpoints

The SQL audit settings API provides two operations for managing auditing on individual SQL databases:

| Operation | Method | URI |
|---|---|---|
| [Get SQL audit settings](/rest/api/fabric/sqldatabase/sql-audit-settings/get-sql-audit-settings) | `GET` | `https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/sqlDatabases/{sqlDatabaseId}/settings/sqlAudit` |
| [Update SQL audit settings](/rest/api/fabric/sqldatabase/sql-audit-settings/update-sql-audit-settings) | `PATCH` | `https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/sqlDatabases/{sqlDatabaseId}/settings/sqlAudit` |

The **Get** operation requires `SQLDatabase.Read.All`, `SQLDatabase.ReadWrite.All`, `Item.Read.All`, or `Item.ReadWrite.All` delegated scope. The **Update** operation requires `SQLDatabase.ReadWrite.All` or `Item.ReadWrite.All` delegated scope. Both operations support user identities, service principals, and managed identities.

## Audit settings properties

The audit settings object includes the following properties:

| Property | Type | Description |
|---|---|---|
| `auditActionsAndGroups` | string[] | Audit actions and groups to capture. Default: `BATCH_COMPLETED_GROUP`, `FAILED_DATABASE_AUTHENTICATION_GROUP`, `SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP`. |
| `predicateExpression` | string | A T-SQL predicate expression used to filter audit events. For example, `statement not like '[select ]%'` excludes SELECT statements. |
| `retentionDays` | integer | Number of days to retain audit logs. `0` indicates indefinite retention. |
| `state` | string | Audit state: `Enabled` or `Disabled`. When you enable auditing for the first time without specifying other properties, the system uses default values. |
| `storageEndpoint` | string | (Read-only) The OneLake storage endpoint that stores audit logs. |

## View auditing settings for all databases in a workspace

The following PowerShell script lists all SQL databases in a workspace and retrieves the auditing configuration for each database.

In the following script, replace `<your workspace id>` with your Fabric workspace ID. You can [find the ID of a workspace](../../admin/portal-workspace.md#identify-your-workspace-id) in the URL, it's the unique string inside two `/` characters after `/groups/` in your browser window. For example, `00001111-aaaa-2222-bbbb-3333cccc4444` in `https://fabric.microsoft.com/groups/00001111-aaaa-2222-bbbb-3333cccc4444/`.

```powershell
Import-Module Az.Accounts

Connect-AzAccount

$workspaceId = '<your workspace id>'
$baseUri = "https://api.fabric.microsoft.com"

# Obtain an access token
$token = (Get-AzAccessToken -ResourceUrl "https://api.fabric.microsoft.com")
$secureToken = $token.Token | ConvertFrom-SecureString -AsPlainText

$headers = @{
    "Authorization" = "Bearer $secureToken"
    "Content-Type"  = "application/json"
}

# List all SQL databases in the workspace
$databasesUri = "$baseUri/v1/workspaces/$workspaceId/sqlDatabases"
$databases = @()
$continuationToken = $null

do {
    $url = $databasesUri
    if ($continuationToken) {
        $encoded = [System.Web.HttpUtility]::UrlEncode($continuationToken)
        $url = "$url`?continuationToken=$encoded"
    }
    $response = Invoke-RestMethod -Method GET -Uri $url -Headers $headers
    if ($response.value) { $databases += $response.value }
    $continuationToken = $response.continuationToken
} while ($continuationToken)

Write-Host "Found $($databases.Count) SQL databases."

# Retrieve audit settings for each database
$results = @()

foreach ($db in $databases) {
    try {
        $auditUri = "$baseUri/v1/workspaces/$workspaceId/sqlDatabases/$($db.id)/settings/sqlAudit"
        $audit = Invoke-RestMethod -Method GET -Uri $auditUri -Headers $headers

        $results += [PSCustomObject]@{
            DatabaseName        = $db.displayName
            DatabaseId          = $db.id
            State               = $audit.state
            RetentionDays       = $audit.retentionDays
            AuditActionsAndGroups = ($audit.auditActionsAndGroups -join "; ")
            PredicateExpression = $audit.predicateExpression
        }
    }
    catch {
        $results += [PSCustomObject]@{
            DatabaseName        = $db.displayName
            DatabaseId          = $db.id
            State               = "ERROR"
            RetentionDays       = ""
            AuditActionsAndGroups = ""
            PredicateExpression = $_.Exception.Message
        }
    }
}

$results | Format-Table -AutoSize
```

## Configure auditing for all databases in a workspace

After you review the current auditing state, use the following script to configure auditing consistently across all databases in a workspace.

Replace `<your workspace id>` with your Fabric workspace ID. Modify the `$auditPayload` object to match your desired auditing configuration.

```powershell
Import-Module Az.Accounts

Connect-AzAccount

$workspaceId = '<your workspace id>'
$baseUri = "https://api.fabric.microsoft.com"

# Obtain an access token
$token = (Get-AzAccessToken -ResourceUrl "https://api.fabric.microsoft.com")
$secureToken = $token.Token | ConvertFrom-SecureString -AsPlainText

$headers = @{
    "Authorization" = "Bearer $secureToken"
    "Content-Type"  = "application/json"
}

# Define the audit configuration to apply
$auditPayload = @{
    state                = "Enabled"
    auditActionsAndGroups = @(
        "BATCH_COMPLETED_GROUP",
        "FAILED_DATABASE_AUTHENTICATION_GROUP",
        "SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP"
    )
    retentionDays        = 10
    predicateExpression  = "statement not like '[select ]%'"
} | ConvertTo-Json -Depth 5

# List all SQL databases in the workspace
$databasesUri = "$baseUri/v1/workspaces/$workspaceId/sqlDatabases"
$databases = @()
$continuationToken = $null

do {
    $url = $databasesUri
    if ($continuationToken) {
        $encoded = [System.Web.HttpUtility]::UrlEncode($continuationToken)
        $url = "$url`?continuationToken=$encoded"
    }
    $response = Invoke-RestMethod -Method GET -Uri $url -Headers $headers
    if ($response.value) { $databases += $response.value }
    $continuationToken = $response.continuationToken
} while ($continuationToken)

Write-Host "Configuring auditing for $($databases.Count) SQL databases..."

foreach ($db in $databases) {
    try {
        $auditUri = "$baseUri/v1/workspaces/$workspaceId/sqlDatabases/$($db.id)/settings/sqlAudit"
        Invoke-RestMethod -Method PATCH -Uri $auditUri -Headers $headers -Body $auditPayload | Out-Null
        Write-Host "[OK] Updated auditing for: $($db.displayName)"
    }
    catch {
        Write-Host "[FAIL] $($db.displayName): $($_.Exception.Message)"
    }
}
```

## Best practices

- Always retrieve the current audit settings with a `GET` request before updating with `PATCH`, to understand the existing configuration.
- Handle failures per database. If one database update fails, continue processing the remaining databases.
- Retry transient failures individually instead of rerunning the entire bulk update script.
- Use a service principal or managed identity for automated or scheduled auditing configuration in production environments.

## Related content

- [Auditing for SQL database in Fabric](auditing.md)
- [SQL Audit Settings - Get SQL Audit Settings](/rest/api/fabric/sqldatabase/sql-audit-settings/get-sql-audit-settings)
- [SQL Audit Settings - Update SQL Audit Settings](/rest/api/fabric/sqldatabase/sql-audit-settings/update-sql-audit-settings)
- [Security in SQL database in Microsoft Fabric](security-overview.md)
- [Create a SQL database with the REST API](deploy-rest-api.md)
