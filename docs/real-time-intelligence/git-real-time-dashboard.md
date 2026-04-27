---
title: Real-Time Dashboard - Git
description: Learn about the Git integration for Fabric real-time dashboards. 
ms.reviewer: bwatts
ms.topic: concept-article
ms.subservice: rti-dashboard
ms.date: 05/29/2025
#customer intent: I want to understand the integration of Eventhouse and KQL database with Microsoft Fabric's deployment pipelines and git, and how to configure and manage them in the ALM system.
---

# Real-time dashboard - Git integration
This article details the folder and file structure for Real-Time dashboard items once they're synced to a GitHub or Azure Devops repository.

## Folder structure
Once a workspace is synced to a repo, you see a top level folder for the workspace and a subfolder for each item that was synced. Each subfolder is formatted with **Item Name**.**Item Type**

Within the folder for the dashboard, you see the following files:

- **Platform**: Defines fabric platform values such as display name and description.
- **Properties**: Defines item specific values.

Here's an example of the folder structure:

**Repo**

* Workspace A
  * Item_A.KQLDashboard
    * .platform
    * RealTimeDashboard-1.json
* Workspace B
  * Item_B.KQLDashboard
    * .platform
    * RealTimeDashboard-2.json


### Real-Time dashboard files

The following files are contained in a dashboard folder:

- **.platform**

    The file uses the following schema to define a real-time dashboard:

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

- **RealTimeDashboard.json**

    The file uses the following schema to define a real-time dashboard:
    
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
## Real-Time dashboard validation

The Real-Time Dashboard load endpoint validates the JSON beyond standard schema conformance. Violations surface to users in the dashboard UI as error messages like: `Error loading dashboard / Error found at: /<section> / Message: <reason>`.

### Query reference uniqueness

Every `queryId` in the dashboard must be referenced **exactly once**, counted
across:

- `tiles[].queryRef.queryId`
- `baseQueries[].queryId`
- `parameters[].dataSource.queryRef.queryId`

If a `queryId` is shared between two tiles, or between a tile and a baseQuery, then validation will fail with: `/queries: Some query ids are used in multiple query references (tiles, base queries, parameters)`.

When duplicating a tile to a new page programmatically, also duplicate the query (assign a new `queryId`, keep the same `text` and `dataSource`) and point the new tile's `queryRef.queryId` at the new query.

### ID uniqueness within category

Every `id` in `tiles[]`, `queries[]`, `baseQueries[]`, `parameters[]`, `dataSources[]`, and `pages[]` must be a unique GUID within its category.

### Identity preservation across edits

To preserve the link between the file and the live workspace item, do not modify the following on **existing** entries:

- Top-level: `id`, `eTag`, `schema_version`
- Per tile: `id`, `pageId`, `queryRef.queryId`
- Per query: `id`, `dataSource.dataSourceId`
- Per dataSource: `id`, `scopeId`
- Per page: `id`
- Per parameter: `id`, `variableName` (and `beginVariableName` / `endVariableName` for `kind: "duration"`)
- `.platform`: `config.logicalId`

Modifying these will cause the change to be treated as a deletion and a re-creation on the next `Update from Git`, which will cause lost context: pinned-item references, share targets, and any state attached to the original `id`.

### Parameters
When a tile that uses a parameter (referenced via the query's `usedVariables`) is added to a new page, that parameter does not automatically appear on the new page. 
If the parameter's `showOnPages.kind` is `"selection"`, you need to append the new page's `id` to `showOnPages.pageIds`. 
If the parameter has a usable `defaultValue`, then the tile renders with the default.

Multi-variable parameters like `kind: "duration"` parameters expose two variables via `beginVariableName` and `endVariableName` (commonly `_startTime` and `_endTime`). They share a single parameter object with one `showOnPages` setting.

## Example edits via Git
Using the schema and validation notes allows you to make changes to the Real-Time dashboard via Git instead of via the user interface.

### Example: Copy a tile to a new page

To copy a tile from page A to a newly added page B by editing `RealTimeDashboard-N.json`:

1. Add page B to `pages[]` with a new `id`.
2. Deep-copy the source tile in `tiles[]`. Assign:
   - new tile `id` (fresh GUID)
   - `pageId` = page B's id
3. Find the source query in `queries[]` by the source tile's `queryRef.queryId`.
4. Deep-copy the query into `queries[]` with a new `id`.
5. Update the cloned tile's `queryRef.queryId` to the new query's `id`.
6. For each parameter referenced in the cloned query's `usedVariables[]`: if `showOnPages.kind == "selection"`, append page B's id to `showOnPages.pageIds`.
7. Validate that no `queryId` appears more than once across `tiles[]`, `baseQueries[]`, and `parameters[].dataSource.queryRef`.
8. Commit, push, and run **Update from Git** on the workspace.

## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
