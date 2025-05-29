---
title: Real-Time Dashboard - Git
description: Learn about the Git integration for Real-Time Dashboard. 
ms.reviewer: bwatts
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 05/29/2025
# customer intent: I want to understand the integration of Eventhouse and KQL database with Microsoft Fabric's deployment pipelines and git, and how to configure and manage them in the ALM system.
---

# Real-time Dashboard - Git integration

The following article detials the file structure for Real-Time dashboard once they are synced to a Github or Azure Devops Repository.


## Folder Structure
Once a workspace is synced to a repo you will have a top level folder for the workspace and a sub-folder for each item that was synced. Each sub-folder will be formated with **Item Name**.**Item Type**

Within the folder for KQL Queryset you will have the following files
- Platform: This defines fabric platform values such as Display Name and Description.
- Properties: This defines item specific values.

Here is an example of what the folder structure will look like

**Repo**
* Workspace A
  * Item_A.KQLDashboard
    * .platform
    * RealTimeDashboard.json
* Workspace B
  * Item_B.KQLDashboard
    * .platform
    * RealTimeDashboard.json



### KQL Queryset files

The following files are contained in an eventhouse folder:

- **.platform**

    The file uses the following schema to define an eventhouse:

    ```json
    {
      "$schema": "https://developer.microsoft.com/json-schemas/fabric/gitIntegration/platformProperties/2.0.0/schema.json",
      "metadata": {
        "type": "KQLDashboard",
        "displayName": "",
        "description": ""
      },
      "config": {
        "version": "2.0",
        "logicalId": ""
      }
    }
    ```

- ### Real-Time Dashboard files

The file uses the following schema to define a Real-Time Dashboard:

```json
{
  "$schema": "",
  "id": "",
  "eTag": "\"\"",
  "schema_version": "",
  "title": "",
  "tiles": [
    {
      "id": "",
      "title": "",
      "visualType": "",
      "pageId": "",
      "layout": {
        "x": ,
        "y": ,
        "width": ,
        "height":
      },
      "queryRef": {
        "kind": "",
        "queryId": ""
      },
      "visualOptions": {
        "multipleYAxes": {
          "base": {
            "id": "",
            "label": "",
            "columns": [],
            "yAxisMaximumValue": ,
            "yAxisMinimumValue": ,
            "yAxisScale": "",
            "horizontalLines": []
          },
          "additional": [],
          "showMultiplePanels":
        },
        "hideLegend": ,
        "legendLocation": "",
        "xColumnTitle": "",
        "xColumn": ,
        "yColumns": ,
        "seriesColumns": ,
        "xAxisScale": "",
        "verticalLine": "",
        "crossFilterDisabled": ,
        "drillthroughDisabled": ,
        "crossFilter": [
          {
            "interaction": "",
            "property": "",
            "parameterId": "",
            "disabled":
          }
        ],
        "drillthrough": [],
        "selectedDataOnLoad": {
          "all": ,
          "limit":
        },
        "dataPointsTooltip": {
          "all": ,
          "limit":
        }
      }
    }
  ],
  "baseQueries": [],
  "parameters": [
    {
      "kind": "",
      "id": "",
      "displayName": "",
      "description": "",
      "variableName": "",
      "selectionType": "",
      "includeAllOption": ,
      "defaultValue": {
        "kind": ""
      },
      "dataSource": {
        "kind": "",
        "columns": {
          "value": ""
        },
        "queryRef": {
          "kind": "",
          "queryId": ""
        }
      },
      "showOnPages": {
        "kind": ""
      },
      "allIsNull":
    },
  ],
  "dataSources": [
    {
      "id": "",
      "name": "",
      "clusterUri": "",
      "database": "",
      "kind": "",
      "scopeId": ""
    }
  ],
  "pages": [
    {
      "name": "",
      "id": ""
    }
  ],
  "queries": [
    {
      "dataSource": {
        "kind": "",
        "dataSourceId": ""
      },
      "text": "",
      "id": "",
      "usedVariables": [
        "",
        ""
      ]
    }
  ]
}
```

## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)