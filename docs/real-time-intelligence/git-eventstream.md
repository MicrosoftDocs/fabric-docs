---
title: Eventstream - Git
description: Learn about the Git integration for Eventstream
ms.reviewer: bwatts
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 05/29/2025
ms.search.form: Eventstream
# customer intent: I want to understand the integration of Eventstream with Microsoft Fabric's deployment pipelines and git, and how to configure and manage them in the ALM system.
---

# Eventstream - GitHub Integration

The following article details the file structure for Eventstream once they're synced to a GitHub or Azure Devops Repository.

## Folder Structure
Once a workspace is synced to a repo, you see a top level folder for the workspace and a subfolder for each item that was synced. Each subfolder is formatted with **Item Name**.**Item Type**

Within the folder for the eventstream, you see have the following files:
- Platform: Defines fabric platform values such as Display Name and Description.
- Properties: Defines item specific values.

Here's an example of what the folder structure looks like:

**Repo**
* Workspace A
  * Item_A.Eventstream
    * .platform
    * EventstreamProperties.json
* Workspace B
  * Item_C.Eventstream
    * .platform
    * EventstreamProperties.json

### Eventstream files

The following files are contained in an eventstream folder:

- **.platform**

    The file uses the following schema to define an eventstream:

    ```json
    {
      "$schema": "https://developer.microsoft.com/json-schemas/fabric/gitIntegration/platformProperties/2.0.0/schema.json",
      "metadata": {
        "type": "Eventstream",
        "displayName": "",
        "description": ""
      },
      "config": {
        "version": "2.0",
        "logicalId": ""
      }
    }
    ```

- **EventstreamProperties.json**

    The file allows you to configure platform-level settings for the eventstream item.

## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)