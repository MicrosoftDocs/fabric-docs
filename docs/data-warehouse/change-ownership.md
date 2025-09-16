---
title: Change Ownership of a Warehouse
description: Learn how to change the ownership of a warehouse item in Microsoft Fabric. Follow step-by-step instructions and improve data security.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dhsundar, fresantos
ms.date: 05/21/2025
ms.topic: how-to
---

# Change ownership of a warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This guide walks you through the steps to change the owner of a warehouse item in Microsoft Fabric.

The warehouse item uses the owner's identity when accessing data on OneLake. You can change the warehouse owner's identity to an SPN or other organization account (Microsoft Entra ID). For more information, see [Microsoft Entra authentication as an alternative to SQL authentication](entra-id-authentication.md).

You can view the current owner of a warehouse item in the Fabric portal. The owner is listed in the workspace listing of items or in the **Settings** menu of the warehouse item.

The takeover API only works for warehouse items, not the SQL analytics endpoint.

## Prerequisites

Before you begin, you need:

- A Fabric workspace with an active capacity or trial capacity.
- A Fabric warehouse item.
- Membership in the **Administrator**, **Member**, or **Contributor** roles on the workspace.

## [Change ownership of a warehouse in the Fabric portal](#tab/portal)

You can change the ownership to yourself (the user currently in context) by selecting the **Take Over** option directly in the user interface.

> [!IMPORTANT]
 > The **Take Over** option currently **only supports assigning ownership to the user in context** (the currently signed-in user). It is **not possible to set a Service Principal Name (SPN) as the owner** via the Fabric portal. If you require an SPN to take ownership, use [the PowerShell method to change ownership of a warehouse](change-ownership.md?tabs=powershell#connect).

1. Navigate to your warehouse in the Fabric portal.
1. Open the **Settings** menu.
1. Select the **Take Over** button.

## [Change ownership of a warehouse with PowerShell](#tab/powershell)

### Connect

1. Install and import the Power BI PowerShell module, if not installed already. Open Windows PowerShell as an administrator in an internet-connected workstation and execute the following command:

  ```powershell
  Install-Module -Name MicrosoftPowerBIMgmt
  Import-Module MicrosoftPowerBIMgmt 
  ```
1. Open Windows PowerShell as an administrator.
1. Connect to your Power BI Service:
  ```powershell
  Connect-PowerBIServiceAccount
  ```

### Take ownership of Warehouse

1. Navigate to the Warehouse item you want to change the owner in the workspace. Open the SQL Editor.
1. Copy the URL from your browser and place a text editor for use later on.
1. Copy the first GUID from the URL, for example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. Store this in a text editor for use soon. This is the workspace ID.
1. Copy the second GUID from the URL, for example, `11aaa111-a11a-1111-1aaa-aa111111aaa`. Don't include the `/` characters. Store this in a text editor for use soon. This is the warehouse ID.
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
    $url = 'groups/' + $workspaceID + '/datawarehouses/' + $warehouseid + '/takeover'
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
$url = 'groups/' + $workspaceID + '/datawarehouses/' + $warehouseid + '/takeover'
Invoke-PowerBIRestMethod -Url $url -Method Post -Body ""
```

---

## Related content

- [Security for data warehousing in Microsoft Fabric](security.md)
- [OneLake security for SQL analytics endpoints](../onelake/sql-analytics-endpoint-onelake-security.md)