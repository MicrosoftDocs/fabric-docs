---
title: Assign variables to shortcuts
description: Learn how to set workspace variable to shortcuts properties
ms.reviewer: trolson
ms.author: trolson
author: trolson
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom:
ms.date: 05/30/2025
#customer intent: As a data engineer, I want to learn how to integrate shortcuts into my CI/CD pipeline.
---

# Assign variables to shortcuts (preview)

Fabric lifecycle management tools allow for the simple collaboration and continuous development of analytical solutions across multiple environments like testing and production. To lean more about these tools and processes see: [Introduction to CI/CD in Microsoft Fabric ](../cicd/cicd-overview.md)

When deploying solutions across environments, you may want to configure properties that are unique to each environment so your testing environment points to test data and your production environment points to production data. Workspace variables make this possible.

You can use workspace variables within individual shortcut properties. This allows you to have unique values for properties like connection ID or target location for each environment. Workspace variables and variable values sets can be defined within a variable library. See: [Learn how to use Variable libraries ](../cicd/variable-library/variable-library-overview.md). 

Once a variable is defined within a variable library, it can be assigned to a shortcut property using the manage shortcuts UX.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Assign a variable through the UX 

1.	Open a lakehouse and select an existing shortcut
1.	Right click on the shortcut and choose **Manage Shortcut**

    :::image type="content" source="media\assign-variables-to-shortcuts\manage-shortcut.png" alt-text="Screenshot showing context menu where manage shortcuts option is selected.":::

1.	Select **Edit variables** and choose the desired property to assign the variable to.

    :::image type="content" source="media\assign-variables-to-shortcuts\edit-variables.png" alt-text="Screenshot showing manage shortcuts panel with edit variable dropdown menu selected.":::

1.	Assign a variable from the variable library
1.	Once the variable is assigned, the variable name and variable value appear below the shortcut property

    :::image type="content" source="media\assign-variables-to-shortcuts\variable-properties.png" alt-text="Screenshot showing managed shortcuts panel with variable assigned to shortcut connection including both variable name and value.":::

> [!NOTE]
> Only variables of type string are supported. Selecting a variable of any other type  results in an error.

> [!NOTE]
> Assignment of workspace variables through the shortcuts REST API is not currently supported.
 