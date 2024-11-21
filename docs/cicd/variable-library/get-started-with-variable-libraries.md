---
title: Get started with variable libraries
description: Learn how use Microsoft Fabric variable libraries to customize and share item configurations in a workspace.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: get-started
ms.date: 08/15/2024
ms.search.form: variable library
#customer intent: As a developer, I want to learn how to use the Microsoft Fabric variable library tool to customize and share item configurations in a workspace so that I can manage my content lifecycle.

---

# Get started with variable libraries (preview)

The Microsoft Fabric variable library is a tool that allows you to customize and share item configurations in a workspace. This article explains how to create a variable library item and add variables to it.

## Prerequisites

To create variable library items in Fabric, you need:

* A Fabric tenant account with an active subscription. [Create an account for free](../../get-started/fabric-trial.md).
* A [workspace](../../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)
* In addition, the following [tenant switches](../../admin/about-tenant-settings.md) must be enabled from the Admin portal:
  * [Users can create Fabric items](../../admin/fabric-switch.md)

  These switches can be enabled by the tenant admin, capacity admin, or workspace admin, depending on your [organization's settings](../../admin/delegate-settings.md).

## Create a variable library item

You can create a variable library item from the Fabric home page or from inside your workspace.

### [From home page](#tab/home-page)

1. From the side navigation bar, select **Create** (If it’s not there, select the three dots -> create)
1. In the **Data Factory** section, select **Variable library**

   :::image type="content" source="./media/get-started-with-variable-libraries/create-from-home.png" alt-text="Screenshot of UI for creating a variable library item from the Fabric home page.":::

1. Name the new variable library and select **Create**. Make sure the name conforms to the required [naming conventions](./understand-variable-library.md#variable-library-name).

### [From workspace](#tab/workspace)

1. Select **+ New item**
1. Scroll down to the **Develop data** section, and select **Variable library**

   :::image type="content" source="./media/get-started-with-variable-libraries/create-from-workspace.png" alt-text="Screenshot of UI for creating a variable library item from an existing workspace.":::

1. Name the new variable library and select **Create**. Make sure the name conforms to the required [naming conventions](./understand-variable-library.md#variable-library-name).

---

An empty variable library appears. You can now add variables to it.

:::image type="content" source="./media/get-started-with-variable-libraries/empty-variable-library.png" alt-text="Screenshot of an empty variable library. It says there are no variables, and there's a green button that says New variable.":::

## Add a variable

To add a variable to the library:

1. Select **+ Add variable**
1. Enter a name (make sure it follows the [naming conventions](./understand-variable-library.md#name-of-a-variable-in-the-variable-library))
1. Select a type from the drop-down list
1. Enter default value set of the defined type
1. Add one or more alternative value sets (optional)
1. Add a note explaining what the variable is for or how it’s used (optional)

:::image type="content" source="./media/get-started-with-variable-libraries/add-variable.png" alt-text="Screenshot of a variable library. On top, there's a button that says add variable.":::

## Edit a variable

* To delete a variable, select one or more variables and select **Delete variable**.
* To edit the name, type, or value set of a variable, change the value and select Save. 
* To add another alternative value set, select Add value set. 

## Related content

* [Related article title](link.md)
* [Related article title](link.md)
* [Related article title](link.md)
