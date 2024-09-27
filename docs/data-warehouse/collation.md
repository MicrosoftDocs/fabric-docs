---
# Required metadata
# For more information, see https://review.learn.microsoft.com/en-us/help/platform/learn-editor-add-metadata?branch=main
# For valid values of ms.service, ms.prod, and ms.topic, see https://review.learn.microsoft.com/en-us/help/platform/metadata-taxonomies?branch=main

title: Creating Data Warehouses with (CI) Case Insensitive Collation
description: This article provides a step-by-step guide on how to create a data warehouse with case-insensitive collation through the RESTful API. It also explains how to use Visual Studio Code with the REST Client extension to facilitate the process, making it easier for users to configure their warehouses to better meet their data management needs.
author:      twinklecyril # GitHub alias
ms.author:   twcyril # Microsoft alias
ms.service: fabric
ms.topic: article
ms.date: 10/07/2024
---
# Creating Data Warehouses with (CI) Case Insensitive Collation

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

All [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] by default are configured with case-sensitive (CS) collation Latin1_General_100_BIN2_UTF8. Users now have the option to create warehouses with case-insensitive (CI) collation - Latin1_General_100_CI_AS_KS_WS_SC_UTF8, providing greater flexibility in data management.

## How to Create a Case Insensitive Warehouse

Currently, the only method available for creating a case-insensitive data warehouse is through RESTful API. When making a request to create a warehouse, users must specify the desired collation in the request body. If no collation is specified, the system will default to creating a case-sensitive warehouse.

> [!IMPORTANT]
>It is crucial to note that once a data warehouse is created, the collation setting cannot be changed. Therefore, users should carefully consider their needs before initiating the creation process to ensure they select the appropriate collation type.

This article provides a step-by-step guide on how to create a data warehouse with case-insensitive collation through the RESTful API. It also explains how to use Visual Studio Code with the REST Client extension to facilitate the process, making it easier for users to configure their warehouses to better meet their data management needs.

## API Endpoint

To create a warehouse with CI collation, use the following API endpoint:

* `POST https://api.fabric.microsoft.com/v1/workspaces/{workspace-id}/items`

## Example Request Body (JSON)

Here’s a sample JSON request body for creating a warehouse:


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

## Authentication

To authenticate your request, use a Bearer token. Service Principal authentication will be supported soon.

## Using Visual Studio Code to Invoke the CI Collations API

You can easily create a new warehouse with case-insensitive collation using Visual Studio Code (VS Code) and the REST Client extension. Follow these steps:

__Step-by-Step Instructions__

1. __Download and Install VS Code__

   - Visit [Visual Studio Code](https://code.visualstudio.com/download) to download and install the application.
   
1. __Install the REST Client Extension__

   - Navigate to the [REST Client - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) and install the extension.
   
1. __Create a New File in VS Code__

   - Open VS Code and create a new file with the .http extension.
   
1. __Input the Request Details__

   - In the file body, type the following request
* `POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceID}/items HTTP/1.1`
* `Content-Type: application/json`
* `Authorization: Bearer {bearer token}`

```json

{ 
  "type": "Warehouse", 
  "displayName": "<Warehouse name here>", 
  "description": "<Warehouse description here>", 
  "creationPayload": { 
    "defaultCollation": "Latin1_General_100_CI_AS_KS_WS_SC_UTF8" 
  } 
}
```

__Replace the placeholders:__

- __workspaceID__: Find the workspace GUID in the URL after the /groups/ section or by running SELECT @@SERVERNAME in an existing warehouse.

- __bearer token__: Obtain this by following these steps:

1. Open your Microsoft Fabric workspace in a browser (Microsoft Edge or Google Chrome).

1. Press F12 to open Developer Tools.

1. Select the Console tab.

1. Type copy(powerBIAccessToken) and press Enter. The bearer token will be copied to your clipboard.

1. Paste it in place of <bearer token>.

- __Warehouse name here__: Enter the desired warehouse name.

- __Warehouse description here__: Enter the desired warehouse description.

__5. Send the Request__

- Click the “Send Request” link displayed above your POST command in the code editor.

__6. Check the Response__

- You should receive a response with the status code 202 Accepted, along with additional details about your POST request.

Now, if you go to the newly created Warehouse in the portal and execute this T-SQL statement, you should see that the collation for your warehouse aligns with what you specified in the JSON above: 


```sql
SELECT name, collation_name FROM sys.databases 
```

