---
title: Get Started with Variable Libraries
description: Learn how to manage Microsoft Fabric variable libraries to customize and share item configurations in a workspace.
author: billmath
ms.author: billmath
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: quickstart
ms.date: 12/15/2025
ms.search.form: Create and use variable library
#customer intent: As a developer, I want to learn how to use a Microsoft Fabric variable library to customize and share item configurations in a workspace, so that I can manage my content lifecycle.
---

# Create and manage variable libraries

Microsoft Fabric variable libraries enable developers to customize and share item configurations within a workspace, with a goal of streamlining content lifecycle management. This article explains how to create, manage, and consume variable libraries.

For a more detailed walkthrough of the process, see the [tutorial for using variable libraries](./tutorial-variable-library.md).

## Prerequisites

To create variable library items in Fabric, you need:

* A Fabric tenant account with an active subscription. [Create an account for free](../../get-started/fabric-trial.md).
* A [workspace](../../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* The following [tenant switches](../../admin/about-tenant-settings.md) enabled from the Admin portal:
  * [Users can create Fabric items](../../admin/fabric-switch.md)

  The tenant admin, capacity admin, or workspace admin can enable these switches, depending on your [organization's settings](../../admin/delegate-settings.md).

## Security considerations and permissions management for Fabric variable libraries

Fabric variable libraries are powerful constructs that enable centralized management of variables across multiple Fabric items. However, this flexibility introduces critical security considerations.

Because variable libraries themselves are Fabric items, they're governed by their own [permission](./variable-library-permissions.md) sets. These permission sets might differ from those of the items that consume their variables. This discrepancy can lead to scenarios where a user has write access to a variable library but lacks any access to the consuming item.

In such cases, unauthorized users can modify variable values in ways that intentionally or unintentionally alter the behavior of dependent Fabric items. This ability creates a potential attack vector where malicious updates to shared variables could compromise the integrity, security, or functionality of those items.

To mitigate these risks, follow these key practices:

* **Adopt strict permission controls**: Administrators must carefully manage write [permissions](./variable-library-permissions.md) on variable libraries so that only trusted users or services can modify them. This practice includes avoiding overly permissive access and regularly auditing permission assignments.
* **Use trusted library references**: Items should reference variables only from libraries that are explicitly designated as trusted. This trust model should be enforced through governance policies that validate the source of variable references during development and deployment.

For more information, see [Variable library permissions](./variable-library-permissions.md).

## Naming conventions

### Variable library name

The name of a variable library item itself must follow these conventions:

- Isn't empty
- Doesn't have leading or trailing spaces
- Starts with a letter
- Can include letters, numbers, underscores, hyphens, and spaces
- Doesn't exceed 256 characters in length

The variable library name is *not* case sensitive.

## Create a variable library item

You can create a variable library item from the Fabric home page or from inside your workspace:

### [Home page](#tab/home-page)

1. On the sidebar, select **Create**. (If it's not there, select the three dots, and then select **Create**.)

1. In the **Data Factory** section, select **Variable library**.

   :::image type="content" source="./media/get-started-variable-libraries/create-from-home.png" alt-text="Screenshot of the Fabric interface that shows the location of variable libraries in the data factory section." lightbox="./media/get-started-variable-libraries/create-from-home.png":::

1. Name the new variable library and then select **Create**. Make sure that the name conforms to the required [naming conventions](#naming-conventions).

### [Workspace](#tab/workspace)

1. Select **+ New item**.
1. Scroll down to the **Develop data** section and select **Variable library**.

   :::image type="content" source="./media/get-started-variable-libraries/create-from-workspace.png" alt-text="Screenshot of the Fabric interface for creating a variable library item from an existing workspace." lightbox="./media/get-started-variable-libraries/create-from-workspace.png":::

1. Name the new variable library and then select **Create**. Make sure that the name conforms to the required [naming conventions](#naming-conventions).

---

An empty variable library appears. You can now add variables to it.

:::image type="content" source="./media/get-started-variable-libraries/empty-variable-library.png" alt-text="Screenshot of an empty variable library with a button for a new variable.":::

## Manage variable libraries and their variables

You can manage the variables in the variable library from the top menu bar.

:::image type="content" source="./media/get-started-variable-libraries/add-variable.png" alt-text="Screenshot of a variable library, with a button for creating a new variable on the menu bar.":::

### Add a variable

To add a new variable to the library:

1. Select **+ New variable**.
1. Enter a name. Make sure that it follows the [naming conventions](variable-types.md#naming-conventions).
1. In the dropdown list, select a type. [See a list of supported variable types](variable-types.md#supported-types-in-variable-libraries).
1. Enter a default value.
1. Add a note that explains what the variable is for or how to use it (optional).
1. Select **Save**.

### Delete or edit a variable

* To delete a variable, select one or more variables and then select **Delete variable** > **Save**.
* To edit the name, type, or value set of a variable, change the value and then select **Save**.
* To add another alternative value set, select **Add value set**.

> [!NOTE]
> Selecting **Save** after editing any variable in the variable library triggers an error validation check to make sure that all the variable names and values are valid. You must fix any errors before you save the changes.

### Add a value set

To add another value set that you can use in a different stage:

1. Select **Add value set**.

1. Name the value set. Make sure that it follows the [naming conventions](value-sets.md#naming-conventions-for-value-sets). Give it a description (optional) of up to 2,048 characters.

1. If you want to use this value to be the currently active value set in this workspace, select **Set as active**.

1. Enter values for all the variables in the variable library.

1. Select **Save**.

### Edit a value set

To edit a value set:

1. Select the three dots next to the name of the value set.

1. Select **Set as active** (for this workspace), **Rename**, or **Delete**.

   :::image type="content" source="./media/get-started-variable-libraries/edit-value-set.png" alt-text="Screenshot of the options for editing a value set: set as active, rename, and delete.":::

1. Select **Save**. Changes take effect only after you save them.

To reset the value of each variable to the default value, select the reset button.

:::image type="content" source="./media/get-started-variable-libraries/reset-to-default.png" alt-text="Screenshot of a variable library that shows a reset button next to each value of a variable.":::

## Considerations and limitations

[!INCLUDE [limitations](../includes/variable-library-limitations.md)]
