---
title: "Data Warehouse collation"
description: Learn about Fabric warehouse collations, how to change the workspace warehouse default collation, and how to create a warehouse with a non-default collation.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: pvenkat, twcyril
ms.date: 08/14/2025
ms.topic: how-to
---
# Data Warehouse collation

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Fabric Data Warehouse supports both case sensitive and case insensitive collations. Supported warehouse collations are:

- `Latin1_General_100_BIN2_UTF8` (default) (case-sensitive)
- `Latin1_General_100_CI_AS_KS_WS_SC_UTF8` (case-insensitive)

New warehouses and all SQL analytics endpoints are configured based on the workspace's Data Warehouse default collation setting, which by default is the case-sensitive collation `Latin1_General_100_BIN2_UTF8`. 

Changing the workspace-level collation does not affect existing warehouses or SQL analytics endpoints. Cross-warehouse queries could encounter errors or unexpected query results across items with different collations.

To create a warehouse with a case-insensitive collation: 
- Change the workspace collation setting and create a new warehouse. When creating a [new warehouse](create-warehouse.md), the collation of the workspace will be used.
- You can also [create the warehouse with a non-default collation with the REST API](#create-a-warehouse-with-a-non-default-collation-with-rest-api).

> [!IMPORTANT]
> Once a warehouse or SQL analytics endpoint is created, the collation cannot be changed.

## Modify the workspace default collation for Fabric Data Warehouse

This section explains how to configure the default collation for warehouses at workspace level, a setting affects all warehouse and SQL analytics endpoint items.

### Permissions

- Members of the Fabric workspace roles Admin, Member, Contributor: Can change the workspace collation from the workspace settings panel.
- Viewers: Can view collation settings but cannot modify them. 

### Change workspace default collation for Fabric Data Warehouse in the Fabric portal

1. Go to the Microsoft Fabric workspace.
1. Open the workspace **Settings**.
1. In the **Workspace settings** window, select the **Data Warehouse** tab.
1. Select the **Collations** page.
1. Under **Case sensitivity**, choose **Case sensitive (Latin1_General_100_BIN2_UTF8)** (default) or **Case insensitive (Latin1_General_100_CI_AS_KS_WS_SC_UTF8)**. Any *new* warehouse and SQL analytics endpoint items created in this workspace will be created with the chosen workspace collation. 
1. After creating a warehouse, use the following T-SQL statement in the [Fabric Query editor](sql-query-editor.md) to confirm the collation of your warehouse:
   ```sql
   SELECT name, collation_name FROM sys.databases;
   ```

> [!NOTE]
> The new SQL analytics endpoint item for a new mirrored SQL Server database, mirrored SQL Managed Instance database, mirrored Azure SQL Database, or SQL database in Fabric uses the Fabric workspace collation, not the collation of the parent item.

## Create a warehouse with a non-default collation with REST API

This section explains how to use Visual Studio Code to create a warehouse with a non-default collation using the REST Client extension.

### API endpoint

To create a warehouse with REST API, use the API endpoint: `POST https://api.fabric.microsoft.com/v1/workspaces/<workspace-id>/items`

Here's a sample JSON request body for creating a warehouse, including the warehouse collation in the `defaultCollation` parameter:

```json
{ 
  "type": "Warehouse", 
  "displayName": "CaseInsensitiveAPIDemo", 
  "description": "New warehouse with case-insensitive collation", 
  "creationPayload": { 
    "defaultCollation": "Latin1_General_100_CI_AS_KS_WS_SC_UTF8" 
  } 
}
```

### Use Visual Studio Code to invoke the REST API

You can easily create a new warehouse with a non-default collation using [Visual Studio Code](https://code.visualstudio.com/) and the [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). Follow these steps:

1. If not already, download and install [Visual Studio Code](https://code.visualstudio.com/download) to download and install the application.
1. Install the [REST Client - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).
1. Create a new text file in VS Code with the `.http` extension.
1. Input the request details in the file body. There should be a blank space between the header and the body, placed after the "Authorization" line.
   ```json
     POST https://api.fabric.microsoft.com/v1/workspaces/<workspaceID>/items HTTP/1.1
     Content-Type: application/json
     Authorization: Bearer <bearer token>

   { 
      "type": "Warehouse", 
      "displayName": "<Warehouse name here>", 
      "description": "<Warehouse description here>", 
      "creationPayload": { 
        "defaultCollation": "Latin1_General_100_CI_AS_KS_WS_SC_UTF8" 
      } 
    }
   ```
1. Replace the placeholder values:
   - `<workspaceID>`: Find the workspace GUID in the URL after the `/groups/` section, or by running `SELECT @@SERVERNAME` in an existing warehouse. 
   - `<bearer token>`: Obtain the bearer token by following these steps:
      1. Open your Microsoft Fabric workspace in a browser (Microsoft Edge).
      1. Press **F12** to open Developer Tools. 
      1. Select the **Console** tab. If necessary, select **Expand Quick View** to reveal the console prompt `>`.
      1. Type the command `powerBIAccessToken` and press **Enter**. Right-click on the large unique string returned in the console and select **Copy string contents**.
      1. Paste it in place of `<bearer token>`.
   - `<Warehouse name here>`: Enter the desired warehouse name.
   - `<Warehouse description here>`: Enter the desired warehouse description.

1. Select the **Send Request** link displayed over your POST command in the VS Code editor.
1. You should receive a response with the status code **202 Accepted**, along with other details about your POST request.
1. Go to the newly created warehouse in the Fabric portal.
1. Execute the following T-SQL statement in the Query editor to confirm that the collation for your warehouse aligns with what you specified in the JSON:
   ```sql
   SELECT name, collation_name FROM sys.databases;
   ```

## Related content

- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
- [Tables in Fabric Data Warehouse](tables.md)
- [Data types in Fabric Data Warehouse](data-types.md)
