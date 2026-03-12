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


>[!NOTE]
>There's no permission management at the variable level. Permission for each variable is the same as the permissions for the entire item.



## Item reference variable type (preview)
The following section provides permissions information on item referenence variables.

### Permissions Requirements
Using item reference variables involves two layers of permissions:

- **Create and Edit an item reference variable**: Users with Contributor or above roles in the workspace can create and edit variables in the library, while Viewers are read-only.
- **Accessing the item reference variable**: In addition to rights on the Variable Library, **you must have at least Read permission on the item reference variable** you intend to reference.

### Permissions enforcement

1. During variable library item updates
When updating a variable library item, the Variable Library enforces the following permissions checks:

- All referenced items in the active value set must exist.
- The calling user must have **READ** permissions for each referenced item in the active value set.

2. During variable usage in a consuming item
When calling consumption APIs (such as Resolve or Discover), if the caller principal lacks permissions to the referenced item or the referenced item does not exist, the request does not fail.
Instead, an appropriate status is returned, as explained below.

### Missing permissions or nonexistent items
If the caller lacks READ permissions or the item doesn't exist, the APIs will still return the variable value, but without extended metadata. The resolvedDetails.status will indicate the issue.

The following examples show the resolvedDetails.status for a discover and a resolve call where the item reference does not exist.

```json
 {
 	"name": "ItemRefDemo",
 	"note": "",
 	"type": "ItemReference",
 	"value": {
 		"itemId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
 		"workspaceId": "aaaabbbb-0000-1111-2222-aaaaaabbbbbb"
 	},
 	"resolvedDetails": {
 		"status": "ReferencedEntityNotFound" // or "ReferencedEntityAccessDenied" if caller has no permissions to item.
 	},
 	"libraryName": "VariableLibraryDemo"
 }
 ```

 ```json
  {
 	"referenceString": "$(/**/VariableLibraryDemo/ItemRefDemo)",
 	"status": "Ok",
 	"variableLibraryObjectId": "aaaabbbb-1111-2222-3333-aaaabbbbcccc",
 	"type": "ItemReference",
 	"value": {
 		"itemId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
 		"workspaceId": "aaaabbbb-0000-1111-2222-aaaaaabbbbbb"
 	},
             "resolvedDetails": {
 		"status": "ReferencedEntityNotFound" // or "ReferencedEntityAccessDenied" if caller has no permissions to item.
 	},
 }
 ```

## Connection reference variable type (preview)
The following section provides permissions information on connection referenence variables.

### Permissions requirements
Using connection reference variables involves two layers of permissions:

- **Create and Edit a connection reference variable**: Users with Contributor or above roles in the workspace can create and edit variables in the library, while Viewers are read-only.
- **Accessing the connection reference variable**: In addition to rights on the Variable Library, **you must have at least Read permission on the connection reference variable** you intend to reference.

### Permissions enforcement

1. During variable library item updates
When updating a variable library item, the Variable Library enforces the following permissions checks:

- All referenced connections in the active value set must exist.
- The calling user must have READ permissions for each referenced connection in the active value set.

2. During variable usage in a consuming item
When calling consumption APIs (such as Resolve or Discover), if the caller principal lacks permissions to the referenced connection or the referenced connection does not exist, the request does not fail.
Instead, an appropriate status is returned, as explained below.

### Missing permissions or nonexistent items
If the caller lacks READ permissions or the connection doesn't exist, the APIs will still return the variable value, but without extended metadata. The resolvedDetails.status will indicate the issue.

The following examples show the resolvedDetails.status for a discover and a resolve call where the connection reference does not exist.

```json
 {
 	"name": "ConnectionRefDemo",
 	"note": "",
 	"type": "ConnectionReference",
 	"value": {
 		"connectionId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
 	},
 	"resolvedDetails": {
 		"status": "ReferencedEntityNotFoundOrAccessDenied"
 	},
 	"libraryName": "VariableLibraryDemo"
 }
```

```json
 {
 	"referenceString": "$(/**/VariableLibraryDemo/ConnectionRefDemo)",
 	"status": "Ok",
 	"variableLibraryObjectId": "aaaabbbb-0000-1111-2222-aaaaaabbbbbb",
 	"type": "ConnectionReference",
 	"value": {
 		"connectionId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb"
 	},
             "resolvedDetails": {
 		"status": "ReferencedEntityNotFoundOrAccessDenied"
 	},
 }
 ```
The following shows how this would appear in the Fabric portal.

 :::image type="content" source="media/connection-reference/connection-4.png" alt-text="Screenshot of the permissions being denied." lightbox="media/connection-reference/connection-4.png":::


 ## Related content
 
 * [Variable library overview](./variable-library-overview.md)
 * [Item reference variables](./item-reference-variable-type.md)
 * [Connection reference variables](./connection-reference-variable-type.md)
 * [Create and manage variable libraries](./get-started-variable-libraries.md)
 