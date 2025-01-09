---
title: "Deploy a SQL database via REST API"
description: Learn how to deploy a new SQL database in Microsoft Fabric using REST API.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy
ms.date: 11/06/2024
ms.topic: how-to
ms.custom:
  - ignite-2024
---
# Create a SQL database in Microsoft Fabric via REST API

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

The Fabric platform has a rich set of REST APIs that can be used to deploy and manage resources. Those APIs can be used to deploy Fabric SQL databases. This article and sample script demonstrate a basic PowerShell script that can be used to deploy a Fabric SQL database and add data to it.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../get-started/fabric-trial.md).
- Make sure that you [Enable SQL database in Fabric using Admin Portal tenant settings](enable.md).
- [Create a new workspace](../../get-started/workspaces.md) or use an existing Fabric workspace.
- You must be a member of the Admin or Member roles for the workspace to create a SQL database.
- Install the golang version of [SQLCMD](/sql/tools/sqlcmd/sqlcmd-utility). Run `winget install sqlcmd` on Windows to install. For other operating systems, see [aka.ms/go-sqlcmd](https://aka.ms/go-sqlcmd).
- The Az PowerShell module. Run `Install-Module az` in PowerShell to install.

## Create a new SQL database via REST API

This example script uses `Connect-AzAccount`, an alias of `az login` to prompt for credentials. It then uses the credentials to obtain an access token that will be used for the REST API calls. SQLCMD uses the context of the account that was given to `Connect-AzAccount`.

The script creates a database named with the logged-in user's alias and the date. Currently, the REST API doesn't return a status so we must loop and check for the database to be created. After the database is created, SQLCMD is used to create some objects and then query for their existence. Finally, we delete the database.

In the following script, replace `<your workspace id>` with your Fabric workspace ID. You can [find the ID of a workspace](../../admin/portal-workspace.md#identify-your-workspace-id) easily in the URL, it's the unique string inside two `/` characters after `/groups/` in your browser window. For example, `11aa111-a11a-1111-1abc-aa1111aaaa` in `https://fabric.microsoft.com/groups/11aa111-a11a-1111-1abc-aa1111aaaa/`.

```powershell
Import-Module Az 
Connect-AzAccount 
$access_token = (Get-AzAccessToken -ResourceUrl https://analysis.windows.net/powerbi/api) 
$headers = @{ 
   Authorization = $access_token.Type + ' ' + $access_token.Token 
   } 
$workspaceid = '<your workspace id>' 
$databaseid = $null 
$responseHeaders = $null 
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
```

Now, list the databases in the workspace to see the new SQL database.

```powershell
Write-Host 'Listing databases in workspace.' 

Invoke-RestMethod -Headers $headers -Uri https://api.fabric.microsoft.com/v1/workspaces/$($workspaceid)/items?type=SQlDatabase | select -ExpandProperty Value | ft 

$databaseProperties = (Invoke-RestMethod -Headers $headers -Uri https://api.fabric.microsoft.com/v1/workspaces/$($workspaceid)/SqlDatabases/$($databaseid) | select -ExpandProperty Properties) 
```

You can also run scripts T-sQL statements via SQLCMD and REST API calls. In this next sample script, we'll create some tables.

```powershell
Write-Host '...Creating a table.' 

# this script requires the golang version of SQLCMD. Run 'winget install sqlcmd' on a Windows desktop to install. For other operating systems, visit aka.ms/go-sqlcmd 

sqlcmd.exe -S $databaseProperties.ServerFqdn -d $databaseProperties.DatabaseName -G -Q 'create table test2 
   ( 
   id int 
   )' 

Write-Host '...Query sys.tables to confirm create.' 

sqlcmd.exe -S $databaseProperties.ServerFqdn -d $databaseProperties.DatabaseName -G -Q 'SELECT * FROM sys.tables' 

Invoke-RestMethod -Headers $headers -Uri https://api.fabric.microsoft.com/v1/workspaces/$($workspaceid)/items?type=SQlDatabase | select -ExpandProperty Value | ft 
```

## Clean up resources

Optionally, you can delete the database using a REST API call as well.

```powershell
Write-Host 'Deleting database.' 

$parameters = @{ 

Method="Delete" 

Headers=$headers 

ContentType="application/json" 

Body=($body | ConvertTo-Json) 

Uri = 'https://api.fabric.microsoft.com/v1/workspaces/' + $workspaceid + '/items/' + $databaseid 

} 

Invoke-RestMethod @parameters 

Write-Output 'Deleted database.' 
```

## Related content

- [Microsoft Fabric REST API references - Microsoft Fabric REST APIs](/rest/api/fabric/articles/)
- [Identity support for logging into the Microsoft Fabric - Microsoft Fabric REST APIs](/rest/api/fabric/articles/identity-support)
