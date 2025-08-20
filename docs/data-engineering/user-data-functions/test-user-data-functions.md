---
title: Test your User Data Functions
description: Learn how to test your User Data Functions to validate your code changes
ms.author: luisbosquez
author: luisbosquez
ms.topic: overview
ms.date: 07/31/2025
ms.search.form: Test your User Data Functions
---

# Test your User Data Functions in the Fabric portal (preview)

Fabric User data functions provide capabilities to test and validate your code changes in the Fabric portal or by using the [VS Code extension](./create-user-data-functions-vs-code.md). These features are helpful to ensure that your functions can run successfully without the need to publish them. 

In this article, you will learn how to:
- Use the Develop and View/Run only modes in the portal editor.
- Use the Test capabilities in Develop mode to test your functions.

>[!NOTE]
> Some users may not have access to the Test capability in Develop mode depending on the region of their Fabric tenant. Please review the [regional limitations](#regional-limitations-for-test-capability-in-develop-mode) note in this article. 

## What is Develop mode and View/Run only mode?

Fabric User Data Functions provides two modes to interact with your functions in the Fabric portal: **Develop mode** and **Run/View only mode**. You can find the mode switcher in the upper right corner of your User Data Functions page.

   :::image type="content" source="..\media\user-data-functions-test\switch-develop-mode.gif" alt-text="Screenshot showing how to switch modes in the Fabric portal." lightbox="..\media\user-data-functions-test\switch-develop-mode.gif":::

### Develop mode

**Develop mode** allows users with Write permissions to edit, test, and publish their code. In this mode, users can see their modified code including any new, unpublished functions they wrote.

   :::image type="content" source="..\media\user-data-functions-test\user-data-functions-develop-mode.png" alt-text="Screenshot showing the components of Develop mode in the Fabric portal." lightbox="..\media\user-data-functions-test\user-data-functions-develop-mode.png":::

The following are the components of Develop mode:
1. **Mode switcher:** This control allows you to switch to Develop mode from Run only mode. 
1. **Functions list:** This list contains new functions along with any previously published function. The dot next to the function name indicates that a function is new and that it's not published yet.
1. **Code editor:** In Develop mode, the code editor is enabled and the user can make changes to the code. 
1. **Test session indicator:** This indicator shows if the test session is active. The test session is created after running a test and it has a timeout after 15 minutes of inactivity.

### Run or View only mode

In **Run only mode** users with Execute permissions can view and run the published functions. This experience creates a separate view between the published version of the code the version that is under development in Develop mode.

   :::image type="content" source="..\media\user-data-functions-test\user-data-functions-run-only-mode.png" alt-text="Screenshot showing the components of Run only mode in the Fabric portal." lightbox="..\media\user-data-functions-test\user-data-functions-run-only-mode.png":::

The following are the components of Run only mode:
1. **Mode switcher:** This control allows you to switch to Run only mode from Develop mode. 
1. **Functions list:** In Run only mode, the functions list contains only published functions. 
1. **Code editor:** In Run only mode, the code editor is ready-only and can't be modified in this mode. 
1. **Code changes indicator:** This message bar indicates if there are unpublished changes in Develop mode. To see those changes, the user needs to switch to Develop mode by clicking on the button in the bar or using the Mode switcher. 

Users that only have View permissions can see the **View only mode**. In this mode, users have access to a read-only version of the code and its metadata. 

>[!NOTE]
> Only users that only have View permissions are able to see the code the View only mode.

## Use Develop mode to test your changes in the Fabric portal

You can test your code changes in real-time by using the Test capability in Develop mode. You can access it by hovering over the function you'd like to test and clicking on the Test icon.

   :::image type="content" source="..\media\user-data-functions-test\test-your-function.gif" alt-text="Screenshot showing how to test a new function." lightbox="..\media\user-data-functions-test\test-your-function.gif":::

>[!NOTE]
> The test session might take a few seconds to start. Once it starts you can run tests immediately, even after making code changes.

This step opens the Test panel, which includes the following components: 
1. **Test session indicator:** This indicator turns green when the test session is active. The session starts when a test is run for the first time and times out after 15 minutes of inactivity. 
1. **Function selector:** This drop-down allows you to select any function in your code to test. This list includes published and unpublished functions.
1. **Test button:** This button allows you to test the function. If the selected function requires parameters, you need to provide them before testing the function.
1. **Test output:** This panel contains the output that results from testing the function. This panel shows either the return value of the function or an object with the state and error output of the function.
1. **Logs output:** This panel contains the logs generated in the code, including the statements added to the `logging` object.

   :::image type="content" source="..\media\user-data-functions-test\user-data-functions-test-panel.png" alt-text="Screenshot showing the different parts of the Test panel." lightbox="..\media\user-data-functions-test\user-data-functions-test-panel.png":::

## Regional limitations for Test capability in Develop mode

The Test capability is not available in all Fabric regions yet. If your Tenant region is not supported yet, you may see the following message in the Functions portal. You can view the supported regions in the [Service details and limitations](./user-data-functions-service-limits.md#limitations) article.

   :::image type="content" source="..\media\user-data-functions-test\user-data-functions-test-region-unavailable.png" alt-text="Screenshot showing the region unavailable banner." lightbox="..\media\user-data-functions-test\user-data-functions-test-region-unavailable.png":::

If you see this informational message, you can still publish your functions and use the Run capability to test them as you did before. Learn more about [how to manage your Fabric capacity](../../admin/capacity-settings.md#create-a-new-capacity) if you prefer to create a new capacity in a supported region.

## Next steps

- Learn more about the [service limitations](./user-data-functions-service-limits.md).
- [Create a Fabric User data functions item](./create-user-data-functions-portal.md) from within Fabric or [use the Visual Studio Code extension](./create-user-data-functions-vs-code.md)
- [Learn about the User data functions programming model](./python-programming-model.md)
