---
title: Start and Stop SQL Database Mirroring with the Fabric REST API
description: Learn how to start and stop SQL database mirroring to OneLake with the Fabric REST API.
ms.reviewer: imotiwala
ms.date: 10/28/2025
ms.topic: how-to
---
# Start and stop SQL database mirroring with the Fabric REST API

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

You can use the [Fabric REST API](/rest/api/fabric/articles/) to start and stop mirroring from a SQL database to the OneLake in Fabric. This article and sample script demonstrate how to use PowerShell to call the Fabric REST API start or stop mirroring.

SQL database mirroring to the OneLake is always running, by default. There are scenarios where mirroring for SQL database in Fabric might need to be stopped. For example, to enable creation clustered column indexes on an existing table, which cannot be created when mirroring is running.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- You can use an existing workspace or [create a new Fabric workspace](../../fundamentals/workspaces.md).
- You must be a member of the [Admin or Member roles for the workspace](../../fundamentals/give-access-workspaces.md) to create a SQL database. 
- Install the golang version of [SQLCMD](/sql/tools/sqlcmd/sqlcmd-utility). Run `winget install sqlcmd` on Windows to install. For other operating systems, see [aka.ms/go-sqlcmd](https://aka.ms/go-sqlcmd).
- PowerShell 5.1 or [PowerShell 7.4 and higher](/powershell/scripting/install/installing-powershell-on-windows)
- The Az PowerShell module. Run `Install-Module az` in PowerShell to install.

## Stop mirroring of SQL database to OneLake in Fabric

The following PowerShell examples stop mirroring of a SQL database to the OneLake in Fabric.

This example script uses `Connect-AzAccount`, an alias of `az login` to prompt for credentials. It uses those credentials to obtain an access token to use for the REST API calls. SQLCMD uses the context of the account that was given to `Connect-AzAccount`.

In the following script, you need to provide the workspace ID and database ID. Both can be found in the URL. `https://powerbi.com/groups/<fabric_workspace_id>/sqldatabases/<fabric_sql_database_id>`. The first string in the URL is the Fabric workspace ID, and the second string is the SQL database ID.

- Replace `<your workspace id>` with your Fabric workspace ID. You can [find the ID of a workspace](../../admin/portal-workspace.md#identify-your-workspace-id) easily in the URL, it's the unique string inside two `/` characters after `/groups/` in your browser window.
- Replace `<your database id>` with your SQL database in Fabric database ID. You can find the ID of the database item easily in the URL, it's the unique string inside two `/` characters after `/sqldatabases/` in your browser window.

### [PowerShell 5.1](#tab/5dot1)

This script demonstrates:
 1. Retrieve an access token using [Get-AzAccessToken](/powershell/module/az.accounts/get-azaccesstoken) and [convert it from a secure string](/powershell/azure/faq?view=azps-13.1.0&preserve-view=true#how-can-i-convert-a-securestring-to-plain-text-in-powershell-). If using PowerShell 7, [ConvertFrom-SecureString](/powershell/module/microsoft.powershell.security/convertfrom-securestring?view=powershell-7.4&preserve-view=true#example-4-convert-a-secure-string-directly-to-a-plaintext-string) is also an option.
 1. Assemble API call.
 1. Invoke API call. 
 
```powershell
Import-Module Az.Accounts

az login

$workspaceid = '<your workspace id>' # Find in the URL
$databaseid = '<your database id>' # Find in the URL

$headers = $null

# 1. Get the access token and add it to the headers

$access_token = (Get-AzAccessToken -AsSecureString -ResourceUrl https://api.fabric.microsoft.com)

$ssPtr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($access_token.Token)

try {
$headers = @{ 
       Authorization = $access_token.Type + ' ' + ([System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ssPtr))
    }

$access_token.UserId -match('^[^@]+') | Out-Null

$stopMirroringUri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceid/sqlDatabases/$databaseid/stopMirroring"

$parameters = @{
        Method="Post"
        Headers=$headers
        Uri = $stopMirroringUri
    }

Invoke-RestMethod @parameters -ErrorAction Stop

 } finally {
    # The following lines ensure that sensitive data is not left in memory.
    $headers = [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ssPtr)
}
```

### [PowerShell 7.4+](#tab/7dot4)

This script demonstrates:
 1. Retrieve an access token using [Get-AzAccessToken](/powershell/module/az.accounts/get-azaccesstoken) and convert it from a secure string using [ConvertFrom-SecureString](/powershell/module/microsoft.powershell.security/convertfrom-securestring?view=powershell-7.4&preserve-view=true#example-4-convert-a-secure-string-directly-to-a-plaintext-string).
 1. Assemble API call.
 1. Invoke API call. 
  
```powershell
Import-Module Az.Accounts

az login

$workspaceid = '<your workspace id>' # Find in the URL
$databaseid = '<your database id>' # Find in the URL

$headers = $null

# 1. Get the access token and add it to the headers

$access_token = (Get-AzAccessToken -AsSecureString -ResourceUrl https://api.fabric.microsoft.com)

$headers = @{ 
    Authorization = $access_token.Type + ' ' + (ConvertFrom-SecureString -SecureString $access_token.Token -AsPlainText)
}

$access_token.UserId -match('^[^@]+') | Out-Null

$stopMirroringUri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceid/sqlDatabases/$databaseid/stopMirroring"

$parameters = @{
        Method="Post"
        Headers=$headers
        Uri = $stopMirroringUri
    }

Invoke-RestMethod @parameters -ErrorAction Stop
```

---

## Start mirroring of SQL database to OneLake in Fabric

The following PowerShell examples start mirroring of a SQL database to the OneLake in Fabric.

This example script uses `Connect-AzAccount`, an alias of `az login` to prompt for credentials. It uses those credentials to obtain an access token to use for the REST API calls. SQLCMD uses the context of the account that was given to `Connect-AzAccount`.

In the following script, replace `<your workspace id>` with your Fabric workspace ID. You can [find the ID of a workspace](../../admin/portal-workspace.md#identify-your-workspace-id) easily in the URL, it's the unique string inside two `/` characters after `/groups/` in your browser window. For example, `11aa111-a11a-1111-1abc-aa1111aaaa` in `https://fabric.microsoft.com/groups/11aa111-a11a-1111-1abc-aa1111aaaa/`.

### [PowerShell 5.1](#tab/5dot1)

This script demonstrates:
 1. Retrieve an access token using [Get-AzAccessToken](/powershell/module/az.accounts/get-azaccesstoken) and [convert it from a secure string](/powershell/azure/faq?view=azps-13.1.0&preserve-view=true#how-can-i-convert-a-securestring-to-plain-text-in-powershell-). If using PowerShell 7, [ConvertFrom-SecureString](/powershell/module/microsoft.powershell.security/convertfrom-securestring?view=powershell-7.4&preserve-view=true#example-4-convert-a-secure-string-directly-to-a-plaintext-string) is also an option.
 1. Assemble API call.
 1. Invoke API call. 
 
```powershell
Import-Module Az.Accounts

az login

$workspaceid = '<your workspace id>' # Find in the URL
$databaseid = '<your database id>' # Find in the URL

$headers = $null

# 1. Get the access token and add it to the headers

$access_token = (Get-AzAccessToken -AsSecureString -ResourceUrl https://api.fabric.microsoft.com)

$ssPtr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($access_token.Token)

try {
$headers = @{ 
       Authorization = $access_token.Type + ' ' + ([System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ssPtr))
    }

$access_token.UserId -match('^[^@]+') | Out-Null

$startMirroringUri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceid/sqlDatabases/$databaseid/startMirroring"

$parameters = @{
        Method="Post"
        Headers=$headers
        Uri = $startMirroringUri
    }

Invoke-RestMethod @parameters -ErrorAction Stop

 } finally {
    # The following lines ensure that sensitive data is not left in memory.
    $headers = [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ssPtr)
}
```

### [PowerShell 7.4+](#tab/7dot4)

This script demonstrates:
 1. Retrieve an access token using [Get-AzAccessToken](/powershell/module/az.accounts/get-azaccesstoken) and convert it from a secure string using [ConvertFrom-SecureString](/powershell/module/microsoft.powershell.security/convertfrom-securestring?view=powershell-7.4&preserve-view=true#example-4-convert-a-secure-string-directly-to-a-plaintext-string).
 1. Assemble API call.
 1. Invoke API call. 
  
```powershell
Import-Module Az.Accounts

az login

$workspaceid = '<your workspace id>' # Find in the URL
$databaseid = '<your database id>' # Find in the URL

$headers = $null

# 1. Get the access token and add it to the headers

$access_token = (Get-AzAccessToken -AsSecureString -ResourceUrl https://api.fabric.microsoft.com)

$headers = @{ 
    Authorization = $access_token.Type + ' ' + (ConvertFrom-SecureString -SecureString $access_token.Token -AsPlainText)
}

$access_token.UserId -match('^[^@]+') | Out-Null

$startMirroringUri = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceid/sqlDatabases/$databaseid/startMirroring"

$parameters = @{
        Method="Post"
        Headers=$headers
        Uri = $startMirroringUri
    }

Invoke-RestMethod @parameters -ErrorAction Stop
```

---

## Related content

- [Limitations in SQL database in Microsoft Fabric](limitations.md)
