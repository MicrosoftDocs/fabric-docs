---
title: Activator (Reflex) - Git
description: Learn about the Git integration for Fabric Activator, which is formerly called Reflex.
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 05/29/2025
ms.search.form: Activator
# customer intent: I want to understand the integration of Activator with Microsoft Fabric's deployment pipelines and git, and how to configure and manage them in the ALM system.
---

# Activator (also called Reflex) - GitHub integration

The following article details the file structure for Activator once they're synced to a GitHub or Azure Devops Repository.

## Folder structure
Once a workspace is synced to a repo, you see a top level folder for the workspace and a subfolder for each item that was synced. Each subfolder is formatted with **Item Name**.**Item Type**

Within the folder for the activator, you see have the following files:
- Platform: Defines fabric platform values such as Display Name and Description.
- Properties: Defines item specific values.

Here's an example of what the folder structure looks like:

**Repo**
* Workspace A
  * Item_A.Reflex
    * .platform
    * ReflexEntities.json
* Workspace B
  * Item_C.Reflex
    * .platform
    * ReflexEntities.json

### Activator (also called Reflex) files

The following files are contained in a Reflex folder:

- **.platform**

    The file uses the following schema to define an activator: 

    ```json
    {
        "$schema": "https://developer.microsoft.com/json-schemas/fabric/gitIntegration/platformProperties/2.0.0/schema.json",
        "metadata": {
            "type": "Reflex",
            "displayName": "displayNameGoesHere"
        },
        "config": {
            "version": "2.0",
            "logicalId": "4f6a991f-721e-45c6-ba5a-ae09ad2897f2"
        }
    }
    ```

- **ReflexEntities.json**
    
    This file has an array of JSON objects. We'll publish the schemas soon. 


## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)