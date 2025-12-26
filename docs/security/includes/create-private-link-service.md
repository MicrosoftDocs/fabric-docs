---
title: Include file for creating a Private Link service
description: Include file for creating a Private Link service.
author: msmimart
ms.author: mimart
ms.topic: include
ms.custom: 
ms.date: 08/13/2025
---

1. Sign in to the [Azure portal](https://portal.azure.com).

1. From the Azure portal search bar, search for **deploy a custom template** and then select it in the search results.

1. On the **Custom deployment** page, select **Build your own template in the editor**.

1. In the editor, create a Fabric resource using the following ARM template, where:

    * `<resource-name>` is the name you choose for the Fabric resource.
    * `<tenant-object-id>` is your Microsoft Entra tenant ID. See [How to find your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).
    * `<workspace-id>` is the ID for the workspace. You can find the workspace ID in the workspace URL, after the */groups/* segment.

    ```json
    {
      "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
      "contentVersion": "1.0.0.0",
      "parameters": {},
      "resources": [
        {
          "type": "Microsoft.Fabric/privateLinkServicesForFabric",
          "apiVersion": "2024-06-01",
          "name": "<resource-name>",
          "location": "global",
          "properties": {
            "tenantId": "<tenant-id>",
            "workspaceId": "<workspace-id>"
          }
        }
      ]
    }
    ```

You can find details about the Private Link service in the JSON file.

You can also find the private link service resource in the resource group, but you need to select **Show hidden resources**.