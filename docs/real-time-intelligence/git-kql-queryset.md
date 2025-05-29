---
title: KQL queryset - Git
description: Learn about the Git integration for KQL Queryset
ms.reviewer: bwatts
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 05/29/2025
ms.search.form: Eventhouse, KQL database, Overview
# customer intent: I want to understand the integration of Eventhouse and KQL database with Microsoft Fabric's deployment pipelines and git, and how to configure and manage them in the ALM system.
---

# KQL Queryset Integration

The following article detials the file structure for Eventhouse and KQL Database once they are synced to a Github or Azure Devops Repository.

## Folder Structure
Once a workspace is synced to a repo you will have a top level folder for the workspace and a sub-folder for each item that was synced. Each sub-folder will be formated with **Item Name**.**Item Type**

Within the folder for KQL Queryset you will have the following files
- Platform: This defines fabric platform values such as Display Name and Description.
- Properties: This defines item specific values.

Here is an example of what the folder structure will look like

**Repo**
* Workspace A
  * Item_A.KQLQueryset
    * .platform
    * RealTimeQueryset.json
* Workspace B
  * Item_B.KQLQueryset
    * .platform
    * RealTimeQueryset.json



### KQL Queryset files

The following files are contained in an eventhouse folder:

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

- **RealTimeQueryset.json**
The files uses the following schema to define a KQL querset:

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