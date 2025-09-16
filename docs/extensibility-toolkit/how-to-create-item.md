---
title: HowTo - Define Item Creation
description: Learn how to Define your item creation experience in Fabric
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 09/04/2025
---

# Define item creation

The item creation is standardized through a dedicated Fabric control that guides users through the process. This control allows users to select the workspace where the item is created, assign Sensitivity labels, and configure other relevant settings. By using this standardized experience, you no longer need to handle the complexities of item creation yourself or worry about future changes to the process. Additionally, this approach enables item creation directly from your workload page, providing a seamless and integrated user experience.

The configuration for the standard item creation experience can be found in the [Product.json](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/Workload/Manifest/Product.json) file, specifically within the `create` section under `createItemDialogConfig`. It allows you to define event handlers for failure and success. Here's a snippet for reference:

```json
{
    "name": "Product",
    "version": "1.100",
    "displayName": "Workload_Display_Name",
    "createExperience": {
        "description": "Workload_Description",
        "cards": [
            {
              "title": "CreateHub_Card_2_Title",
              "description": "CreateHub_Card_2_Description",
              "icon": {
                "name": "assets/images/HelloWorldItem-icon.png"
              },
              "icon_small": {
                "name": "assets/images/HelloWorldItem-icon.png"
              },
              "availableIn": [
                "home",
                "create-hub",
                "workspace-plus-new",
                "workspace-plus-new-teams"
              ],
              "itemType": "SampleItem",
              "createItemDialogConfig": {
                "onCreationFailure": { "action": "item.onCreationFailure" },
                "onCreationSuccess": { "action": "item.onCreationSuccess" }
              }
            }
        ]
    }    
}
```

This configuration defines the dialog used for creating new items, including the fields, labels, and button text.
