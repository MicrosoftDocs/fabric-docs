---
title: "Create a SQL database with the REST API"
description: Learn how to deploy a new SQL database in Microsoft Fabric with the REST API.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy
ms.date: 07/02/2025
ms.topic: how-to
ms.search.form: Develop and run queries in SQL editor
---
# Create a SQL database with the REST API for Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

You can use the [Fabric REST API](/rest/api/fabric/articles/) to deploy and manage resources, include SQL databases in Fabric. 

This article and sample script demonstrate how to use PowerShell to call the Fabric REST API to deploy a Fabric SQL database.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- You can use an existing workspace or [create a new Fabric workspace](../../fundamentals/workspaces.md).
- You must be a member of the [Admin or Member roles for the workspace](../../fundamentals/give-access-workspaces.md) to create a SQL database. 
- Install the golang version of [SQLCMD](/sql/tools/sqlcmd/sqlcmd-utility). Run `winget install sqlcmd` on Windows to install. For other operating systems, see [aka.ms/go-sqlcmd](https://aka.ms/go-sqlcmd).
- PowerShell 5.1 or [PowerShell 7.4 and higher](/powershell/scripting/install/installing-powershell-on-windows)
- The Az PowerShell module. Run `Install-Module az` in PowerShell to install.

## Create a new SQL database via REST API

This example script uses `Connect-AzAccount`, an alias of `az login` to prompt for credentials. It uses those credentials to obtain an access token to use for the REST API calls. SQLCMD uses the context of the account that was given to `Connect-AzAccount`.

The script creates a database named with the logged-in user's alias and the date. Currently, the REST API doesn't return a status so we must loop and check for the database to be created. After the database is created, SQLCMD is used to create some objects and then query for their existence. Finally, we delete the database.

In the following script, replace `<your workspace id>` with your Fabric workspace ID. You can [find the ID of a workspace](../../admin/portal-workspace.md#identify-your-workspace-id) easily in the URL, it's the unique string inside two `/` characters after `/groups/` in your browser window. For example, `11aa111-a11a-1111-1abc-aa1111aaaa` in `https://fabric.microsoft.com/groups/11aa111-a11a-1111-1abc-aa1111aaaa/`.


### [PowerShell 5.1](#tab/5dot1)

This script demonstrates:
 1. Retrieve an access token using [Get-AzAccessToken](/powershell/module/az.accounts/get-azaccesstoken) and [convert it from a secure string](/powershell/azure/faq?view=azps-13.1.0&preserve-view=true#how-can-i-convert-a-securestring-to-plain-text-in-powershell-). If using PowerShell 7, [ConvertFrom-SecureString](/powershell/module/microsoft.powershell.security/convertfrom-securestring?view=powershell-7.4&preserve-view=true#example-4-convert-a-secure-string-directly-to-a-plaintext-string) is also an option.
 1. Create a new SQL database using the [Items - Create Item API](/rest/api/fabric/core/items/create-item).
 1. List all SQL databases in a Fabric workspace.
 1. Connect to the database with [SQLCMD](/sql/tools/sqlcmd/sqlcmd-utility) to run a script to create an object.
 1. Delete the database using the [Items - Delete Item API](/rest/api/fabric/core/items/delete-item).

```powershell
Import-Module Az.Accounts

az login

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
    );
    insert into test2 values (1);
    insert into test2 values (2);
    insert into test2 values (3);
    select * from test2;' 

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

### [PowerShell 7.4+](#tab/7dot4)

This script demonstrates:
 1. Retrieve an access token using [Get-AzAccessToken](/powershell/module/az.accounts/get-azaccesstoken) and convert it from a secure string using [ConvertFrom-SecureString](/powershell/module/microsoft.powershell.security/convertfrom-securestring?view=powershell-7.4&preserve-view=true#example-4-convert-a-secure-string-directly-to-a-plaintext-string).
 1. Create a new SQL database using the [Items - Create Item API](/rest/api/fabric/core/items/create-item).
 1. List all SQL databases in a Fabric workspace.
 1. Connect to the database with [SQLCMD](/sql/tools/sqlcmd/sqlcmd-utility) to run a script to create an object.
 1. Delete the database using the [Items - Delete Item API](/rest/api/fabric/core/items/delete-item).

```powershell
Import-Module Az.Accounts

az login

$workspaceid = '<your workspace id>'

$databaseid = $null 
$headers = $null

# 1. Get the access token and add it to the headers

$access_token = (Get-AzAccessToken -AsSecureString -ResourceUrl https://api.fabric.microsoft.com) 

$headers = @{ 
    Authorization = $access_token.Type + ' ' + (ConvertFrom-SecureString -SecureString $access_token.Token -AsPlainText)
}

$access_token.UserId -match('^[^@]+') | Out-Null

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

 # 2. Create the database and wait for it to be created.

Invoke-RestMethod @parameters -StatusCodeVariable statusCode -ResponseHeadersVariable responseHeader

$operationId = $responseHeader.'x-ms-operation-id'

While($statusCode -eq 202)
{
    Write-Host 'Waiting on database create.'
    Start-Sleep -Seconds $responseHeader.'retry-after'[0]
    $databaseid = (Invoke-RestMethod -Headers $headers -Uri https://api.fabric.microsoft.com/v1/operations/$($operationId)/result -StatusCodeVariable statusCode -ResponseHeadersVariable responseHeader).id
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
    );
    insert into test2 values (1);
    insert into test2 values (2);
    insert into test2 values (3);
    select * from test2;' 

#5. Delete the database

Write-Host 'Cleaning up' $databaseProperties.DatabaseName

$parameters = @{
    Method="Delete"
    Headers=$headers
    ContentType="application/json"
    Body=($body | ConvertTo-Json)
    Uri = 'https://api.fabric.microsoft.com/v1/workspaces/' + $workspaceid + '/items/' + $databaseid
}

Invoke-RestMethod @parameters

Write-Output 'Cleaned up: '$databaseProperties.DatabaseName
```

---

## Related content

- [Microsoft Fabric REST API references - Microsoft Fabric REST APIs](/rest/api/fabric/articles/)
- [Identity support for logging into the Microsoft Fabric - Microsoft Fabric REST APIs](/rest/api/fabric/articles/identity-support)
- [Options to create a SQL database in the Fabric portal](create-options.md)