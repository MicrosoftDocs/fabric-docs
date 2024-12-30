---
title: Get started with Variable libraries
description: Learn how to use Microsoft Fabric Variable libraries to customize and share item configurations in a workspace.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: get-started
ms.date: 12/16/2024
ms.search.form: Variable library, create Variable library, manage Variable libraries, edit Variable library
#customer intent: As a developer, I want to learn how to use the Microsoft Fabric Variable library tool to customize and share item configurations in a workspace so that I can manage my content lifecycle.

---

# How to use Variable libraries (preview)

The Microsoft Fabric Variable library is a tool that allows you to customize and share item configurations in a workspace. This article explains how to create a Variable library item and add variables to it.

## Prerequisites

To create Variable library items in Fabric, you need:

* A Fabric tenant account with an active subscription. [Create an account for free](../../get-started/fabric-trial.md).
* A [workspace](../../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)
* The following [tenant switches](../../admin/about-tenant-settings.md) must be enabled from the Admin portal:
  * [Users can create Fabric items](../../admin/fabric-switch.md)

  These switches can be enabled by the tenant admin, capacity admin, or workspace admin, depending on your [organization's settings](../../admin/delegate-settings.md).

## Create a Variable library item

You can create a Variable library item from the Fabric home page or from inside your workspace.

### [From home page](#tab/home-page)

1. From the side navigation bar, select **Create** (If it’s not there, select the three dots -> create)
1. In the **Data Factory** section, select **Variable library**

   :::image type="content" source="./media/get-started-with-variable-libraries/create-from-home.png" alt-text="Screenshot of UI for creating a Variable library item from the Fabric home page.":::

1. Name the new Variable library and select **Create**. Make sure the name conforms to the required [naming conventions](./variable-types.md#variable-library-name).

### [From workspace](#tab/workspace)

1. Select **+ New item**
1. Scroll down to the **Develop data** section, and select **Variable library**

   :::image type="content" source="./media/get-started-with-variable-libraries/create-from-workspace.png" alt-text="Screenshot of UI for creating a Variable library item from an existing workspace.":::

1. Name the new Variable library and select **Create**. Make sure the name conforms to the required [naming conventions](./variable-types.md#variable-library-name).

---

An empty Variable library appears. You can now add variables to it.

:::image type="content" source="./media/get-started-with-variable-libraries/empty-variable-library.png" alt-text="Screenshot of an empty Variable library. It says there are no variables, and there's a green button that says New variable.":::

## Manage Variable library and their variables

You can manage the variables in the Variable library from the top menu bar

:::image type="content" source="./media/get-started-with-variable-libraries/add-variable.png" alt-text="Screenshot of a Variable library. On top, there's a button that says New variable.":::

### Add a variable

To add a new variable to the library:

1. Select **+ New variable**
1. Enter a name (make sure it follows the [naming conventions](./variable-types.md#name-of-a-variable-in-the-variable-library))
1. Select a type from the drop-down list
1. Enter a default value
1. Add a note explaining what the variable is for or how to use it (optional)
1. Select **Save**

### Delete or edit a variable

* To delete a variable, select one or more variables and select **Delete variable** and then **Save**.
* To edit the name, type, or value set of a variable, change the value and select **Save**.
* To add another alternative value set, select **Add value set**.

> [!NOTE]
> Selecting **Save** after editing any variable in the Variable library triggers an error validation check to make sure all the variable names and values are valid. Any errors must be fixed before the changes are saved.

### Add a value set

To add another value set that can be used a different stage:

1. Select **Add value set**
1. Name the value set (make sure it follows the [naming conventions](./variable-types.md#name-of-a-value-set-in-the-variable-library))
1. Select **Set as active** if you want to use this value to be the currently active value set
1. Enter values for all the variables in the Variable library
1. Select **Save**

### Edit a value set

To edit a value set, select the three dots next to the name of the value set.

:::image type="content" source="./media/get-started-with-variable-libraries/edit-value-set.png" alt-text="Screenshot of the edit value set options. There are three options, set as active, Rename, and Delete.":::

You have the following options:

* Set as active value set for that stage
* Rename the value set
* Delete the value set

Select **Save**.

To reset a variable value of each variable to the default value, select the reset button.

:::image type="content" source="./media/get-started-with-variable-libraries/reset-to-default.png" alt-text="Screenshot of a Variable library. There's a reset button next to the value of a variable.":::

## Related content

* [Related article title](link.md)
* [Related article title](link.md)
* [Related article title](link.md)
