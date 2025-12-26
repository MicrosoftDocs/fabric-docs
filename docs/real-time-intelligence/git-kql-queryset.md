---
title: KQL Queryset - Git integration
description: Learn about the Git integration for KQL Queryset.
ms.reviewer: bwatts
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 05/29/2025
# customer intent: I want to understand the integration of Eventhouse and KQL database with Microsoft Fabric's deployment pipelines and git, and how to configure and manage them in the ALM system.
---

# KQL queryset integration
The following article details the folder and file structure for KQL queryset once they're synced to a GitHub or Azure Devops repository.

## Folder structure
Once a workspace is synced to a repo, you see a top level folder for the workspace and a subfolder for each item that was synced. Each subfolder is formatted with **Item Name**.**Item Type**

Within the folder for your KQL queryset, you see the following files:

- **Platform**: Defines fabric platform values such as display name and description.
- **Properties**: Defines item specific values.

Here's an example of the folder structure:

**Repo**
* Workspace A
  * Item_A.KQLQueryset
    * .platform
    * RealTimeQueryset.json
* Workspace B
  * Item_B.KQLQueryset
    * .platform
    * RealTimeQueryset.json

### KQL queryset files

The following files are contained in a KQL queryset folder:

- **.platform**

    The file uses the following schema to define an eventhouse:

    ```json
    {
      "$schema": "https://developer.microsoft.com/json-schemas/fabric/gitIntegration/platformProperties/2.0.0/schema.json",
      "metadata": {
        "type": "KQLQueryset",
        "displayName": "",
        "description": ""
      },
      "config": {
        "version": "2.0",
        "logicalId": ""
      }
    }
    ```

- **KQLQueryset.json**

    The file uses the following schema to define a KQL queryset:
    
    ```json
    {
      "queryset": {
        "version": "1.0.0",
        "tabs": [
          {
            "id": "",
            "title": "",
            "content": "",
            "dataSourceId": "Guid1"
          }
        ],
        "dataSources": [
          {
            "id": "",
            "clusterUri": "",
            "type": "AzureDataExplorer",
            "databaseName": ""
          },
          {
            "id": "Guid1",
            "clusterUri": "",
            "type": "Fabric",
            "databaseItemId": "",
            "databaseItemName": ""
          }
        ]
      }
    }
    ```

## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)