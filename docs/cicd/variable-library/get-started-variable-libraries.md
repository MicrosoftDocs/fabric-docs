---
title: Get started with Variable libraries
description: Learn how to manage Microsoft Fabric Variable libraries to customize and share item configurations in a workspace.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: quickstart
ms.date: 03/20/2025
ms.search.form: Create and use Variable library
#customer intent: As a developer, I want to learn how to use the Microsoft Fabric Variable library tool to customize and share item configurations in a workspace so that I can manage my content lifecycle.
---

# Create and manage Variable libraries (preview)

Microsoft Fabric Variable libraries enable developers to customize and share item configurations within a workspace, streamlining content lifecycle management. This article explains how to create, manage, and consume Variable libraries.

<!--- For a more detailed walkthrough of the process, see the [Variable library tutorial](./tutorial-variable-library.md). --->

## Prerequisites

To create Variable library items in Fabric, you need:

* A Fabric tenant account with an active subscription. [Create an account for free](../../get-started/fabric-trial.md).
* A [workspace](../../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)
* The following [tenant switches](../../admin/about-tenant-settings.md) must be enabled from the Admin portal:
  * [Users can create Fabric items](../../admin/fabric-switch.md)
  * Users can create variable libraries

  :::image type="content" source="./media/get-started-variable-libraries/variable-library-switch.png" alt-text="Screenshot of Variable library tenant switch.":::

  These switches can be enabled by the tenant admin, capacity admin, or workspace admin, depending on your [organization's settings](../../admin/delegate-settings.md).

## Before you begin

Before you create a Variable library, make sure you understand who will have [permission](./variable-library-permissions.md) to access it.

## Create a Variable library item

You can create a Variable library item from the Fabric home page or from inside your workspace.

### [From home page](#tab/home-page)

1. From the side navigation bar, select **Create** (If it’s not there, select the three dots -> Create)

1. In the **Data Factory** section, select **Variable library**

   :::image type="content" source="./media/get-started-variable-libraries/create-from-home.png" alt-text="Screenshot of UI showing the location of variable libraries in the data factory section." lightbox="./media/get-started-variable-libraries/create-from-home.png":::

1. Name the new Variable library and select **Create**. Make sure the name conforms to the required [naming conventions](./variable-types.md#variable-library-item-name).

### [From workspace](#tab/workspace)

1. Select **+ New item**
1. Scroll down to the **Develop data** section, and select **Variable library**

   :::image type="content" source="./media/get-started-variable-libraries/create-from-workspace.png" alt-text="Screenshot of UI for creating a Variable library item from an existing workspace." lightbox="./media/get-started-variable-libraries/create-from-workspace.png":::

1. Name the new Variable library and select **Create**. Make sure the name conforms to the required [naming conventions](./variable-types.md#variable-library-item-name).

---

An empty Variable library appears. You can now add variables to it.

:::image type="content" source="./media/get-started-variable-libraries/empty-variable-library.png" alt-text="Screenshot of an empty Variable library. It says there are no variables, and there's a green button that says New variable.":::

## Manage Variable library and their variables

You can manage the variables in the Variable library from the top menu bar

:::image type="content" source="./media/get-started-variable-libraries/add-variable.png" alt-text="Screenshot of a Variable library. On top, there's a button that says New variable.":::

### Add a variable

To add a new variable to the library:

1. Select **+ New variable**
1. Enter a name (make sure it follows the [naming conventions](./variable-types.md#variable-name))
1. Select a type from the drop-down list (See a list of [supported variable types](./variable-types.md#variable-types))
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

To add another value set that can be used in a different stage:

1. Select **Add value set**
1. Name the value set (make sure it follows the [naming conventions](./variable-types.md#variable-types)) and give it a description (optional) of up to 2,048 characters.
1. Select **Set as active** if you want to use this value to be the currently active value set in this workspace
1. Enter values for all the variables in the Variable library
1. Select **Save**

### Edit a value set

To edit a value set, select the three dots next to the name of the value set.

:::image type="content" source="./media/get-started-variable-libraries/edit-value-set.png" alt-text="Screenshot of the edit value set options. There are three options, set as active, Rename, and Delete.":::

You have the following options:

* Set as active value set for this workspace
* Rename the value set
* Delete the value set

Select **Save**. Any changes only take effect after you save them.

To reset a variable value of each variable to the default value, select the reset button.

:::image type="content" source="./media/get-started-variable-libraries/reset-to-default.png" alt-text="Screenshot of a Variable library. There's a reset button next to the value of a variable.":::

## Considerations and limitations

 [!INCLUDE [limitations](../includes/variable-library-limitations.md)]
