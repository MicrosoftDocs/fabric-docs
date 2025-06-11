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

Once a variable is defined within a variable library, it can be assigned to shortcut properties. Variable assignments can be done through the shortcuts management UX or through the shortcuts Rest API.

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
 

## Assign a variable through the shortcut rest API

Variable paths can also be referenced within the payload of a create or update shortcut API request. These variables can only be used on the target properties of the shortcut payload. The variable must also be of string type only. 
The variable path uses the following format: "$(/**/{VariableLibary}/{VariableName})" where {VariableLibrary} is the name of the variable library within the workspace and {VariableName} is the name of the variable within the library. The following sample request payload shows how to assign a variable to the Target Connection property.

```json
{
  "path": "Tables/dbo ",
  "name": "DIM_Customer",
  "target": {
    "type": "AmazonS3",
    "amazonS3": {
      "location": "https://s3.amazonaws.com",
      "subpath": "/testnm1/Northwind/DIM_Customer",
      "connectionId": "$(/**/Variable_2/MyConnectionID)"
    }
  }
}
```

See: [OneLake Shortcuts - Create Shortcut - REST API (Core)](/rest/api/fabric/core/onelake-shortcuts/create-shortcut?tabs=HTTP) for more information

  > [!NOTE]
> Only **User** identities are supported on the OneLake shortcuts APIs when using workspace variables.  **Service Principals** and **Managed Identities** are not currently supported.
