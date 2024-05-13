---
title: Fabric extensibility frontend manifest
description: Learn about the schema, functionality and examples of a workload's Frontend Manifest.
author: paulinbar
ms.author: painbar
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 12/25/2023
---

# Frontend manifest

This document describes the schema, functionality and examples of a workload's Frontend Manifest.
The basic structure is comprised of three entries:

```json
{
  extension: {}
  product: {}
  artifacts: [
    {}, {}, {}
  ]
}
```

The examples below are based on the contents provided in `localWorkloadManifest.json` [file](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Frontend/Manifests/localWorkloadManifest.json)

## *Extension* section

In this section, you'll find the workload's **name** and **URL** used by Fabric to locate the Workload's UI.
Additionally - the **devAADAppConfig** config resides here, as described in the Authentication section
During development, ensure the URL remains pointed to `http://127.0.0.1:60006`.
It's crucial to maintain uniformity in the Workload's name across the entire manifest. Any change made here will necessitate corresponding changes in other relevant sections.

### Validation of name and URL

An invalid URL, or a name that doesn't adhere to the allowed format will show a notification when attempted to load into Fabric.

:::image type="content" source="./media/frontend-manifest/validation-error.png" alt-text="Screenshot of workload validation error.":::

* the URL is validated to be ``http://127.0.0.1:60006``
* the name must consist of 2 **dot separated** words, each - alpha-numeric with optional hyphens, and a total max length of 32, e.g.  `My-publisher-id.SampleItem01`

> [!NOTE]
>] In addition to the notification, a console.error is printed. However, Fabric's console errors can be seen only after adding the **unmin=1** query parameter to the URL.

## *Product* section

This section outlines the core attributes of the Product, such as name, display name, and icons. Additionally, we'll explore the Create Experience, which offers different ways to create new items along with associated actions.

* Name, Display Name, Icons: These define the workload's identity and appearance.
* Create Experience: Describes the looks and experience for creating new items that the workload provides. In our Sample workload, there's a single Create card. When clicked, it triggers the action `open.createSampleWorkload`, which opens the Sample UI.

```json
      "createExperience": {
   "description": "Creating a Sample Workload Item - Product Description",
   "cards": [           // multiple cards can be used, each invoking an action
    {
     "title": "Sample Item",
     "description": "Create a Sample Workload Item for your Dev Experience",
     "icon": {
      "name": "trophy_24_filled"   // these are Fabric's built-in icons. Here we can reference an image file located under 'assets' (e.g. "name": "/assets/myImage1.svg")
     },
     "icon_small": {
      "name": "trophy_20_regular"
     },
     "onClick": {
      "extensionName": "sample-workload",    // must be our workload name
      "action": "open.createSampleWorkload"    //  the action to call
     },
     "availableIn": [  // this CARD will be available in several locations of Fabric.
      "home",                         //  main HOME page, as seen in the above screenshots
      "create-hub",                   //  Create Hub page - currently doesn't support custom Workloads
      "workspace-plus-new",           //  "NEW" menu when in Workspace view
      "workspace-plus-new-teams"      //  In Microsoft Teams - "NEW" menu in Workspace View   
     ],
     "visibilityChecker": "SampleWorkloadArtifact"
    }
   ]
  }
```

## *Artifacts* section

The *artifacts* section is where we define the configuration of each type of item - `artifact`  - available actions, names, icons, etc.
These are not relevant for a Frontend-only experience.
The main parts of this section are presented here as comments for each sample entry:

```json
"artifacts": [
{
  "name": "Fabric.WorkloadSample.SampleWorkloadArtifact",   // must match the name in Workload Backend's WorkloadManifest.xml
  "displayName": "Sample Workload Artifact",    // as displayed in Workspace view
  "editor": { 
    "extension": "Fabric.WorkloadSample", // name of the Workload, must match the main `extension` section
    "path": "/sample-workload-editor"        // path, as registered in App.ts, to open for editing.
   },
  "icon": {     "name": "trophy_20_regular" }, // icon to present in workspace view 
  "contextMenuItems": [  // actions available from the ellipsis (...) next to an item
  {
    "name": "SampleArtifactCustomAction",
    "displayName": "Run short job",
    "icon": {
 "sprite": "fluentui-icons",
 "name": "/assets/execute.svg"
     },
    "handler": {
 "extensionName": "Fabric.WorkloadSample",
 "action": "run.short.job" // example of an action 
    },
    "_comment": "Adding a custom button to the artifact context menu"
  }  ],
 "quickActionItems": [  // actions visible next to the item in workspace view
  {
 /// same syntax as contextMenuItems
   "_comment": "Adding a quick action button to the artifact"
  }]
```
