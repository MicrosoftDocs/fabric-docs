---
title: "How To: Create Warehouses with Case-Insensitive (CI) Collation"
description: Learn how to create a Fabric warehouse with case-insensitive collation through the RESTful API.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: twcyril
ms.date: 05/09/2025
ms.topic: how-to
---
# How to: Create a warehouse with case-insensitive (CI) collation

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

All Fabric warehouses by default are configured with case-sensitive (CS) collation **Latin1_General_100_BIN2_UTF8**. You can also create warehouses with case-insensitive (CI) collation - **Latin1_General_100_CI_AS_KS_WS_SC_UTF8**.

Currently, the only method available for creating a case-insensitive data warehouse is via REST API. This article provides a step-by-step guide on how to create a warehouse with case-insensitive collation through the REST API. It also explains how to use Visual Studio Code with the REST Client extension to facilitate the process.

> [!IMPORTANT]
> Once a warehouse is created, the collation setting cannot be changed. Carefully consider your needs before initiating the creation process.

## Prerequisites

- A Fabric workspace with an active capacity or trial capacity.
- Download and install [Visual Studio Code](https://code.visualstudio.com/download) to download and install the application.
- Install the [REST Client - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

## API endpoint

To create a warehouse with REST API, use the API endpoint: `POST https://api.fabric.microsoft.com/v1/workspaces/<workspace-id>/items`

Here's a sample JSON request body for creating a warehouse:

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

## Use Visual Studio Code to invoke the REST API

You can easily create a new warehouse with case-insensitive collation using [Visual Studio Code (VS Code)](https://code.visualstudio.com/) and the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension. Follow these steps:

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
   - `<bearer token>`: Obtain this by following these steps:
      1. Open your Microsoft Fabric workspace in a browser (Microsoft Edge).
      1. Press **F12** to open Developer Tools. 
      1. Select the **Console** tab. If necessary, select **Expand Quick View** to reveal the console prompt `>`.
      1. Type the command `powerBIAccessToken` and press **Enter**. Right-click on the large unique string returned in the console and select **Copy string contents**.
      1. Paste it in place of `<bearer token>`.
   - `<Warehouse name here>`: Enter the desired warehouse name.
   - `<Warehouse description here>`: Enter the desired warehouse description.

1. Select the **Send Request** link displayed over your POST command in the VS Code editor.
1. You should receive a response with the status code **202 Accepted**, along with additional details about your POST request.
1. Go to the newly created warehouse in the Fabric portal.
1. Execute the following T-SQL statement in the Query editor to confirm that the collation for your warehouse aligns with what you specified in the JSON above:
   ```sql
   SELECT name, collation_name FROM sys.databases;
   ```

## Related content

- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
- [Tables in data warehousing in Microsoft Fabric](tables.md)
- [Data types in Microsoft Fabric](data-types.md)
