---
title: Variable library item reference
description: Learn how to use a Microsoft Fabric item reference with variable libraries.
author: billmath
ms.author: billmath
ms.service: fabric
ms.subservice: cicd
ms.topic: overview
ms.date: 01/22/2025
#customer intent: As a developer, I want to learn how to use a Fabric application lifecycle management (ALM) variable library to customize my release stages, so that I can manage my content lifecycle.
---


# Item reference variable type (preview)

To enhance flexibility and scalability, we're introducing advanced variables alongside the existing basic variable types. These advanced variables are designed to meet key requirements such as parameterizing external and internal connections (e.g., Snowflake, AWS, OneLake). 

An **item reference** variable is an advanced variable type used within the Fabric Variable Library to hold a reference to an existing Fabric item—such as a lakehouse, notebook, or data pipeline, by storing its workspace ID and item ID. This type of variable enables internal connection parameterization, allowing developers to dynamically link items to specific Fabric items based on deployment stage or workspace context. 


## How to use
An item reference variable can be used just like other variables in a variable library.

1. Sign in to Microsoft Fabric
2. Navigate to your workspace and variable library
3. At the top, select **+ New Variable**
4. Provide a name for the variable, select **item reference** for the type, and then click the **...** to select a value
5. This will open a dialog to select the desired item. You'll see all of the items that you have permissions on, available for selection. Use the explorer on the left to filter the list by workspace. Use the filter in the top-right corner to filter by type.
 
 :::image type="content" source="media/item-reference/item-2.png" alt-text="Screenshot of the items available for the item reference." lightbox="media/item-reference/item-2.png":::
6. Once selected, it will appear like this on the varlib page - as a read only component showing the name of the item.
 
 :::image type="content" source="media/item-reference/item-1.png" alt-text="Screenshot of the item reference." lightbox="media/item-reference/item-1.png":::

 

If you need to edit an item reference or need to double-check the value:
- to see additional details click the value 
- to edit this value or values of other value-sets- click the button next to the value. 

 :::image type="content" source="media/item-reference/item-3.png" alt-text="Screenshot of the item reference pop-up." lightbox="media/item-reference/item-3.png":::


## How it works
An Item Reference variable's value is essentially a static pointer to a Fabric item identified by **Workspace ID + Item ID**. The value is stored as a pair of GUIDs corresponding to the target item's workspace and the item itself. For example, a reference might be stored internally as:

 - WorkspaceID = aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb 
 - ItemID  = 00aa00aa-bb11-cc22-dd33-44ee44ee44ee

These two IDs together uniquely identify the referenced item. 

Keep in mind the following when working with item references:

- Item references enable internal connection parameterization, allowing developers to dynamically link items to specific Fabric resources based on deployment stage or workspace context.
- The reference is static, pointing to a specific item and not automatically adjusting across environments.
- For stage-specific variations, use value-sets, where each set can point to a different static item (e.g., different lakehouses per stage).
- All values across value-sets **should** be of the same item type to ensure compatibility and prevent runtime errors. However, we don't enforce having the same item type across value sets.


## Supported items
The following is a list of items that are currently supported using item reference:
- [Shortcut for a lakehouse ](../../onelake/assign-variables-to-shortcuts.md)
- [User data functions](../../data-engineering/user-data-functions/connect-to-data-sources.md)
- Notebook, through [NotebookUtils](../../data-engineering/notebook-utilities.md#variable-library-utilities)
 
 :::image type="content" source="media/item-reference/item-4.png" alt-text="Screenshot of the item reference notebook." lightbox="media/item-reference/item-4.png":::


>[!NOTE]
>Notebook, through [`%%configure`](../../data-engineering/author-execute-notebook.md#spark-session-configuration-magic-command) isn't supported.

### Limitations
Currently, you can only reference fabric items and semantic models. Other Power BI items, like Datamarts, Dataflow Gen1 are currently not supported.



### Permissions Required to Create/Use Item References
Using Item Reference variables involves two layers of permissions:

- **Create/Edit** - Although any workspace contributor can modify variable values, an Item reference variable only permits users to set as value items for which they have read permissions. This applies to any value, the default active value set or other value-sets. Be aware that during when saving a Variable Library item, a permission check is performed on the active values of item reference variables for the user who's saving the item, even if those values remain unchanged.
- **Use an item ref variable** - When creating/updating a reference to a variable in a consumer item, users can't set a reference to an item reference variable unless they have at least **READ** permission for the item in the active value-set.

#### Permission validation
Permission validation is triggered in the following use-cases:

- Edit a Variable library item which has Item reference variables 
When editing we validate both that the referenced items exist, and that the user has at least read permissions to them, for all item reference values in the active value set, for the following scenarios:
 - UI - During **SAVE** of the Variable Library item, a permission check is performed on the active values of item reference variables for the user who's saving the item, even if those values remain unchanged.
 - APIs/Git Update - Permission validation is done during Update and fails if no read permission to the Item ref's active value of the updated workspace.
 - Deployment - A variable library item's deployment will fail if no read permission to the Item ref's active value of the target workspace.

- View item reference additional details in the Variable library page (UI only) 
Users with access to the Variable library (WS viewer or higher) who lack permissions for the item in the referenced item variable, won't see their details in the UI. Instead, they'll see the item ID accompanied by a hover message, rather than the details component.

 :::image type="content" source="media/item-reference/item-5.png" alt-text="Screenshot of the permissions." lightbox="media/item-reference/item-5.png":::

- Create/Edit item reference variable 
  - UI - When updating Value of any value set (Default or other), user can select item from a list showing only items he has at least read permission to.
  - APIs/Git Update or Deployment - see Edit Variable library item above.

- Use of item reference variable in a consumer item
  - UI - Creating a Reference to variable - When creating in an item a reference to an 'Item reference' variable using the 'Select variable' UI dialog (like in Shortcut for Lakehouse and Data pipeline), there's validation that the user creating the reference has at least read permission to the items in the 'item reference' variables (the validation is for the active values only). If not, the user sees just the items' ID.

### Behavior Across CI/CD Pipelines and Deployment Stages
The Variable Library enables CI/CD for Fabric content across environments (Dev, Test, Prod) using Item Reference variables for stage-specific configurations. Keep in mind the following:

**Static References**

- Item References are tied to a specific workspace and item ID.
- Deploying to a new stage, these references still point to the original workspace unless manually updated.
- Use Multiple Value-Sets for each stage and activate the correct set manually or via API scripts.

For more information, see [value-sets in variable libraries](value-sets.md).




### Representation in Git and APIs
The Variable Library is managed as code. Using Git or REST APIs, Item Reference variables have a clear JSON format. All variables appear in the Variable Library’s definition file (stored in Git, usually .json), listing properties like name, type, and value.

For an Item Reference (Static) variable, the value is structured data for workspace and item IDs. Example:

```json

{
 "name": "MyDataLake",
 "note": "",
 "type": "ItemReference",
 "value": {
  "itemId": "00aa00aa-bb11-cc22-dd33-44ee44ee44ee",
  "workspaceId": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb"
 }
}

 
```

Remember the following when working via API:

- Only IDs are stored; names and metadata are retrieved at runtime or cached in Fabric. 
- Creating/updating via API, you provide workspace and item IDs. Invalid IDs cause errors.




## Related content

- [Variable library overview](variable-library-overview.md)
- [Variable types](variable-types.md)
- [Value sets](value-sets.md)
- Variable library permissions](./variable-library-permissions.md)
