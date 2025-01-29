---
title: "Deploy a SQL database via REST API"
description: Learn how to deploy a new SQL database in Microsoft Fabric using REST API.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy
ms.date: 01/14/2025
ms.topic: how-to
ms.custom:
  - ignite-2024
---
# Create a SQL database in Microsoft Fabric via REST API

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

The Fabric platform has a rich set of REST APIs that can be used to deploy and manage resources. Those APIs can be used to deploy Fabric SQL databases. This article and sample script demonstrate a basic PowerShell script that can be used to deploy a Fabric SQL database and add data to it.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Make sure that you [Enable SQL database in Fabric using Admin Portal tenant settings](enable.md).
- [Create a new workspace](../../fundamentals/workspaces.md) or use an existing Fabric workspace.
- You must be a member of the Admin or Member roles for the workspace to create a SQL database.
- Install the golang version of [SQLCMD](/sql/tools/sqlcmd/sqlcmd-utility). Run `winget install sqlcmd` on Windows to install. For other operating systems, see [aka.ms/go-sqlcmd](https://aka.ms/go-sqlcmd).
- The Az PowerShell module. Run `Install-Module az` in PowerShell to install.

## Create a new SQL database via REST API

This example script uses `Connect-AzAccount`, an alias of `az login` to prompt for credentials. It uses those credentials to obtain an access token to use for the REST API calls. SQLCMD uses the context of the account that was given to `Connect-AzAccount`.

The script creates a database named with the logged-in user's alias and the date. Currently, the REST API doesn't return a status so we must loop and check for the database to be created. After the database is created, SQLCMD is used to create some objects and then query for their existence. Finally, we delete the database.

In the following script, replace `<your workspace id>` with your Fabric workspace ID. You can [find the ID of a workspace](../../admin/portal-workspace.md#identify-your-workspace-id) easily in the URL, it's the unique string inside two `/` characters after `/groups/` in your browser window. For example, `11aa111-a11a-1111-1abc-aa1111aaaa` in `https://fabric.microsoft.com/groups/11aa111-a11a-1111-1abc-aa1111aaaa/`.
 
This script demonstrates:
 1. Retrieve an access token using [Get-AzAccessToken](/powershell/module/az.accounts/get-azaccesstoken) and [convert it from a secure string](/powershell/azure/faq?view=azps-13.1.0&preserve-view=true#how-can-i-convert-a-securestring-to-plain-text-in-powershell-). If using PowerShell 7, [ConvertFrom-SecureString](/powershell/module/microsoft.powershell.security/convertfrom-securestring?view=powershell-7.4&preserve-view=true#example-4-convert-a-secure-string-directly-to-a-plaintext-string) is also an option.
 1. Create a new SQL database using the [Items - Create Item API](/rest/api/fabric/core/items/create-item).
 1. List all SQL databases in a Fabric workspace.
 1. Connect to the database with [SQLCMD](/sql/tools/sqlcmd/sqlcmd-utility) to run a script to create an object.
 1. Delete the database using the [Items - Delete Item API](/rest/api/fabric/core/items/delete-item).

```powershell
Import-Module Az.Accounts

Connect-AzAccount

$workspaceid = '<your workspace id>'

$databaseid = $null 
$headers = $null
$responseHeaders = $null 

# 1. Get the access token and add it to the headers

$access_token = (Get-AzAccessToken -AsSecureString -ResourceUrl https://api.fabric.microsoft.com) 

$ssPtr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($access_token.Token)

try {

    $headers = @{ 
       Authorization = $access_token.Type + ' ' + ([System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ssPtr))
    }

    $access_token.UserId -match('^[^@]+') | Out-Null

    # 2. Create the database and wait for it to be created.

    $body = @{
        displayName = $matches[0] + (Get-Date -Format "MMddyyyy")
        type = "SQLDatabase"
        description = "Created using public api"
    }

    $parameters = @{
        Method="Post"
        Headers=$headers
        ContentType="application/json"
        Body=($body | ConvertTo-Json)
        Uri = 'https://api.fabric.microsoft.com/v1/workspaces/' + $workspaceid + '/items'
    }

    Invoke-RestMethod @parameters -ErrorAction Stop

    $databases = (Invoke-RestMethod -Headers $headers -Uri https://api.fabric.microsoft.com/v1/workspaces/$($workspaceid)/SqlDatabases).value
    $databaseid = $databases.Where({$_.displayName -eq $body.displayName}).id

    While($databaseid -eq $null)
    {
        Write-Host 'Waiting on database create.'
        Start-Sleep 30
        $databases = (Invoke-RestMethod -Headers $headers -Uri https://api.fabric.microsoft.com/v1/workspaces/$($workspaceid)/SqlDatabases).value
        $databaseid = $databases.Where({$_.displayName -eq $body.displayName}).id
    }

    # 3. List all SQL databases in a Fabric workspace

    Write-Host 'Listing databases in workspace.'

    Invoke-RestMethod -Headers $headers -Uri https://api.fabric.microsoft.com/v1/workspaces/$($workspaceid)/items?type=SQlDatabase | select -ExpandProperty Value | ft

    $databaseProperties = (Invoke-RestMethod -Headers $headers -Uri https://api.fabric.microsoft.com/v1/workspaces/$($workspaceid)/SqlDatabases/$($databaseid) | select -ExpandProperty Properties)

    #4. Connnect to the database and create a table

    Write-Host 'Attempting to connect to the database.'

    sqlcmd.exe -S $databaseProperties.ServerFqdn -d $databaseProperties.DatabaseName -G -Q 'create table test2 
       ( 
       id int 
       )' 

    #5. Delete the database

    $parameters = @{
        Method="Delete"
        Headers=$headers
        ContentType="application/json"
        Body=($body | ConvertTo-Json)
        Uri = 'https://api.fabric.microsoft.com/v1/workspaces/' + $workspaceid + '/items/' + $databaseid
    }

    Invoke-RestMethod @parameters

    Write-Output 'Cleaned up:' $body.displayName
 
 } finally {
    # The following lines ensure that sensitive data is not left in memory.
    $headers = [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ssPtr)
    $parameters = [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ssPtr)
}
```

## Related content

- [Microsoft Fabric REST API references - Microsoft Fabric REST APIs](/rest/api/fabric/articles/)
- [Identity support for logging into the Microsoft Fabric - Microsoft Fabric REST APIs](/rest/api/fabric/articles/identity-support)
