---
title: Using the portal editor - User Data Functions
description: Learn how to use the portal editor in User Data Functions
ms.author: eur
ms.reviewer: luisbosquez
author: eric-urban
ms.topic: overview
ms.custom: freshness-kr
ms.date: 01/21/2026
ms.search.form: Use the portal editor
---

# Use the portal editor to write and publish your User Data Functions

User Data Functions can be edited, published, and managed directly from the Fabric portal. This article provides an overview of the portal components you work with most often, including toolbars, settings, and navigation elements. You learn how to use the portal interface to manage your functions, connections, and libraries.

> [!TIP]
> This article focuses on the portal interface. For information about writing function code, see the [Python programming model](./python-programming-model.md).

## Overview of the portal editor

The portal editor is the web-based interface that you access when you open your User Data Functions items. The following are the elements of the portal editor:

   :::image type="content" source="..\media\user-data-functions-portal-editor\portal-editor-overview.png" alt-text="Screenshot showing the elements of the portal editor." lightbox="..\media\user-data-functions-portal-editor\portal-editor-overview.png":::

1. **Home and Edit tabs:** Use these tabs to switch between the **Home** and **Edit** tools. For more information about the tools available on each tab, see the [Home toolbar](#home-toolbar) and [Edit toolbar](#edit-toolbar) sections.
1. **Settings:** This button opens the User Data Functions item settings. The settings include User Data Functions item description, sensitivity label, endorsement, manage connections, and library management settings. The settings in this menu are applicable to all functions in this item.
1. **Functions list:** This list contains the functions inside of this User Data Functions item. Hovering over a list item reveals Run or Test functionality along with more options.
   - In **Develop** mode, the list includes both published and unpublished functions with a **Test** button.
   - In **Run only** mode, the list shows only published functions with a **Run** button.
1. **Code viewer/editor:** Contains the code for all the functions in this User Data Functions item.
   - In **Develop** mode, code is editable and may include unpublished functions.
   - In **Run only** mode, code is read-only and shows only published functions.
1. **Status bar:** This bar contains two elements: 
    1. **Test session indicator:** Shows if your test session is running (Develop mode only). Learn more about testing functions in the [Develop mode documentation](./test-user-data-functions.md).
    1. **Publish process indicator:** Shows if your functions are currently being published, or the timestamp of the last time they were successfully published.
1. **Mode switcher:** This drop-down menu allows you to switch between **Develop** mode and **Run only** mode. Learn more in the [Develop mode documentation](./test-user-data-functions.md).
1. **Share button:** This feature allows you to share this User Data Functions item with other users and assign permissions to them (Share, Edit and/or Execute permissions).
1. **Publish button:** This button starts the publish process for your User Data Functions item. This process publishes all functions in your item. After your functions are published, other users and Fabric items can run your functions.
   - Only available in **Develop** mode.

## Home toolbar
This toolbar provides features that are applicable to all functions in the User Data Functions items. Some of these features are only available in **Develop** mode.

   :::image type="content" source="..\media\user-data-functions-portal-editor\portal-editor-home-toolbar.png" alt-text="Screenshot showing the elements of the home toolbar." lightbox="..\media\user-data-functions-portal-editor\portal-editor-home-toolbar.png":::

1. **Settings:** This button opens the User Data Functions item settings. The settings include item description, sensitivity label, endorsement, manage connections, and library management. The settings in this menu are applicable to all functions in the User Data Functions item.
1. **Refresh button:** This button refreshes the User Data Functions item to display the latest published functions and metadata. You can use the refresh button to ensure you are working with the latest version of your code.
1. **Language selector:** This read-only button shows Python as the default option.
4. **Generate invocation code:** This feature automatically generates code templates for calling your functions from external applications or Fabric items. Learn more about [generating invocation code](./generate-invocation-code.md).
1. **Manage connections:** This feature allows you to create connections to Fabric data sources using the OneLake data catalog. This button opens to the **Manage connections** page in **Settings**. Learn more about the [Manage connections feature](./connect-to-data-sources.md). 
1. **Library management:** This feature allows you to install public and private libraries for your function code to use. This button opens to the **Library management** page in **Settings**. Learn more about the [Library management feature](./how-to-manage-libraries.md).
1. **Open in VS Code button:** This button allows you to open your functions in the VS Code editor by using the [Fabric User Data Functions VS Code extension](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-functions&ssr=false). Learn more about using [the VS Code extension](./create-user-data-functions-vs-code.md).
1. **Publish button:** This button starts the publish process for your User Data Functions item. This process publishes all functions in your item.
   - Only available in **Develop** mode.

## Edit toolbar

This toolbar provides features to help you edit your functions code. Most of these features are only available in **Develop** mode.

   :::image type="content" source="..\media\user-data-functions-portal-editor\portal-editor-edit-toolbar.png" alt-text="Screenshot showing the elements of the edit toolbar." lightbox="..\media\user-data-functions-portal-editor\portal-editor-edit-toolbar.png":::

1. **Reset code button:** This button resets all your functions to the published version of the code. This feature undoes any code changes that are different from the published functions.
   - Only available in **Develop** mode.
1. **Edit buttons:** These buttons provide the following functionality for the code editor: Undo, Redo, Copy, and Paste.
   - Only available in **Develop** mode.
1. **Insert sample:** This feature provides code templates that help you get started for a given scenario. Once you select a code template, it is inserted at the bottom of your functions. Make sure you install the necessary libraries and add the necessary connections according to the [programming model](./python-programming-model.md) guidelines.
   - Only available in **Develop** mode.
1. **Manage connections:** This feature allows you to create connections to Fabric data sources using the OneLake data catalog. This button opens to the Manage connections page in Settings. Learn more about the [Manage connections feature](./connect-to-data-sources.md). 
1. **Library management:** This feature allows you to install public and private libraries for your function code to use. This button opens to the Library management page in Settings. Learn more about the [Library management feature](./how-to-manage-libraries.md).
1. **Find and replace:** This feature allows you to search for keywords in the code editor and replace them as needed.
   - Only available in **Develop** mode.
1. **Publish button:** This button starts the publish process for your User Data Functions item. This process publishes all functions in your item.
   - Only available in **Develop** mode.

Now that you're familiar with the portal editor interface, you can use these tools to create, edit, test, and publish your User Data Functions. The portal provides everything you need to manage your functions, from writing code to managing connections and libraries.

## Related content

- [Create user data functions in the portal](./create-user-data-functions-portal.md) - Quickstart guide for creating and running your first functions using the portal editor
- [Connect to data sources](./connect-to-data-sources.md) - Learn how to manage connections to Fabric data sources from the portal
- [Manage libraries](./how-to-manage-libraries.md) - Install and manage Python libraries for your functions
- [Test your functions](./test-user-data-functions.md) - Learn about Develop mode and Run only mode for testing
