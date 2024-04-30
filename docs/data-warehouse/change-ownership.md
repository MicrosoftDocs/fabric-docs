---
title: Change ownership of Fabric Warehouse
description: Learn how to change the owner of a Fabric Warehouse via API call.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: stwynant
ms.date: 04/24/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
---

# Change ownership of Fabric Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

The Warehouse item uses the owner's identity when accessing data on OneLake. To change the owner of these items, currently the solution method is to use an API call as described in this article.

This guide walks you through the steps to change your Warehouse owner to your Organizational account. The takeover APIs for each allow you to change this owner's identity to an SPN or other organization account (Microsoft Entra ID).

The takeover API only works for Warehouse, not the SQL analytics endpoint.
 
## Prerequisites

Before you begin, you need:

- A Fabric workspace with an active capacity or trial capacity.
- A Fabric warehouse on a Lakehouse.
- Either be a member of the **Administrator**, **Member**, or **Contributor** roles on the workspace.
- Install and import the Power BI PowerShell module, if not installed already. Open Windows PowerShell as an administrator in an internet-connected workstation and execute the following command:

  ```powershell
  Install-Module -Name MicrosoftPowerBIMgmt
  Import-Module MicrosoftPowerBIMgmt 
  ```

## Connect

1. Open Windows PowerShell as an administrator.
1. Connect to your Power BI Service:
  ```powershell
  Connect-PowerBIServiceAccount
  ```

## Take ownership of Warehouse

1. Navigate to the Warehouse item you want to change the owner in the workspace. Open the SQL Editor.
1. Copy the URL from your browser and place a text editor for use later on.
1. Copy the first GUID from the URL, for example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. Store this in a text editor for use soon.
1. Copy the second GUID from the URL, for example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. Store this in a text editor for use soon.
1. In the following script, replace `workspaceID` with the first GUID you copied. Run the following command.
    ```powershell
    $workspaceID = 'workspaceID'
    ```
1. In the following script, replace `warehouseID` with the second GUID you copied. Run the following command.
    ```powershell
    $warehouseid = 'warehouseID'
    ```
1. Run the following command:
    ```powershell
    $url = '/groups/' + $workspaceID + '/datawarehouses/' + $warehouseid + '/takeover'
    ```
1. Run the following command:
    ```powershell
    Invoke-PowerBIRestMethod -Url $url -Method Post -Body ""
    ```
1. Owner of the warehouse item has now changed.

**Full script**

```powershell
# Install the Power BI PowerShell module if not already installed
Install-Module -Name MicrosoftPowerBIMgmt

# Import the Power BI PowerShell module
Import-Module MicrosoftPowerBIMgmt

# Fill the parameters
$workspaceID = 'workspaceID'
$warehouseid = 'warehouseID'

# Connect to the Power BI service
Connect-PowerBIServiceAccount

#Invoke warehouse takeover
$url = '/groups/' + $workspaceID + '/datawarehouses/' + $warehouseid + 'takeover'
Invoke-PowerBIRestMethod -Url $url -Method Post -Body ""
```

## Related content

- [Security for data warehousing in Microsoft Fabric](security.md)
