---
title: Microsoft Fabric Variable Library Permissions
description: Understand who can access variable libraries and their values.
ms.reviewer: Lee
ms.topic: concept-article
ms.date: 12/15/2025
ms.search.form: Introduction to variable libraries, manage variable libraries, variable library permissions, variable types
#customer intent: As a developer, I want to learn how to use variable libraries and who has permission to view and edit them.
---

# Variable library permissions 

This article explains who can access variable libraries and their values.

## Permissions for a variable library item

The Microsoft Fabric variable library permissions are aligned with the Fabric workspace model. Permissions are according to your workspace role, or the variable library can be shared directly.

Workspace role | Permissions
---------------|------------
Viewer | Can view the variable library item
Contributor | Can view, add, edit, and delete the variable library item
Member | Can view, add, edit, delete, and reshare the variable library item
Admin | Can view, add, edit, delete, and reshare the variable library item

To share a variable library item, go to the item menu in the workspace, and then select **Share**. If the user that you share the item with doesn't have permission to the workspace, but has permission to one of the variable's consumer items (for example, a pipeline), the variable library isn't visible or available for use in that pipeline.

To set an item as a variable value in a variable library, you need to have at least read permission for that item. For example, if you want to set the value of a variable to be a lakehouse, you need read permission for the lakehouse.

For more information about workspace roles, see [Roles in workspaces in Microsoft Fabric](../../get-started/roles-workspaces.md).

## Variable permissions

There's no permission management at the variable level. Permission for each variable is the same as the permissions for the entire item.



## Permission validation

Permission validation ensures that referenced resources exist and that the user performing an action has at least read permissions to those resources. Validation is triggered across UI and non-UI workflows, including APIs, Git updates, and deployments. 

### When permission validation occurs
Permission checks are triggered in the following scenarios:

#### Create or edit reference variables

- UI
  - When creating a connection reference or item reference variable, or when updating the value of any value set (default or alternative), users can select only connections or items for which they have at least read permission.
  - Editing an existing reference value in the active value set also requires read permission to the referenced resource. [ws variables spec M1 | Word], [Variable l...soft Learn | Learn.Microsoft.com]
- APIs, Git updates, and deployments
  - Updates fail if the user or identity performing the operation does not have read permission to the active value of the referenced connection or item in the target workspace.
  - Variable library deployments fail under the same conditions. 


#### Edit a Variable library item
When editing a Variable library item that contains connection reference or item reference variables, validation is performed for all active reference values, even if those values were not modified:

- UI 
  – During save, the system validates that referenced resources exist and that the saving user has read permission to all active reference values.
- APIs/Git updates 
  – Validation occurs during update and fails if read permission is missing.
- Deployment 
  – Deployment fails if the user or identity applying the deployment lacks read permission to referenced resources in the target workspace.

#### Use of item reference variables in consumer items

- UI 
  – When creating a reference to an item reference variable from a consumer item (for example, using the Select variable dialog in a shortcut or data pipeline), the system validates that the user has read permission to the items referenced by the variable’s active value set.
  - If permissions are missing, only the item IDs are shown. 

#### Viewing reference details in the UI
- In the Variable library UI, users with access to the Variable library (workspace Viewer or higher) but without read permission to a referenced connection or item:
  - Do not see the full details of the referenced resource
  - See only the resource ID, accompanied by a hover message instead of the details component

 :::image type="content" source="media/connection-reference/connection-4.png" alt-text="Screenshot of the permissions being denied." lightbox="media/connection-reference/connection-4.png":::

 ## Related content
 
 * [Variable library overview](./variable-library-overview.md)
 * [Item reference variables](./item-reference-variable-type.md)
 * [Connection reference variables](./connection-reference-variable-type.md)
 * [Create and manage variable libraries](./get-started-variable-libraries.md)
 