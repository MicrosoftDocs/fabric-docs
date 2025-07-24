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

Fabric User data functions provides capabilities to test your functions and validate your code changes in the Fabric portal or by using the [VS Code extension](./create-user-data-functions-vs-code.md). This is helpful to ensure that your functions can run successfully without needing to publish them. 

In this article, you learn how to:

- Use the Develop and Run only modes in the portal editor.
- Use the Test capabilities in Develop mode to test your functions.

>[!NOTE]
> Some users may not have access to the Test capability in Develop mode depending on the region of their Fabric tenant. These users will still need to publish and run their functions to test them, or use VS Code to test them locally.

## What is Develop mode and Run only mode?

Fabric User Data Functions provides two modes to interact with your functions in the Fabric portal: **Develop mode** and **Run only mode**. You can find the mode switcher in the upper right corner of your User Data Functions page.

   :::image type="content" source="..\media\user-data-functions-test\switch_develop_mode.gif" alt-text="Screenshot showing how to switch modes in the Fabric portal." lightbox="..\media\user-data-functions-test\switch_develop_mode.gif":::

### Develop mode

**Develop mode** allows users with Write permissions to edit, test and publish their code. In this mode, users will see their modified code including any new, unpublished functions they may have created.

   :::image type="content" source="..\media\user-data-functions-test\user-data-functions-develop-mode.png" alt-text="Screenshot showing the components of Develop mode in the Fabric portal." lightbox="..\media\user-data-functions-test\user-data-functions-develop-mode.png":::

The following are the components of Develop mode:
1. **Mode switcher:** This control allows you to switch to Develop mode from Run only mode. 
1. **Functions list:** This list contains new functions along with any previously published function. The dot on the left indicates new functions that have not been published yet.
1. **Code editor:** In Develop mode, the code editor is enabled and the user can make changes to the code. 
1. **Test session indicator:** This indicator shows if the test session is active. The test session will be created after running a test and it will timeout after 15 minutes of inactivity.

### Run only mode

In **Run only mode** users can view and run the published functions. This creates a separate view between the published code that will be executed once the functions are invoked and the code that is being modified in Develop mode.

   :::image type="content" source="..\media\user-data-functions-test\user-data-functions-run-only-mode.png" alt-text="Screenshot showing the components of Develop mode in the Fabric portal." lightbox="..\media\user-data-functions-test\user-data-functions-run-only-mode.png":::

The following are the components of Run only mode:
1. **Mode switcher:** This control allows you to switch to Run only mode from Develop mode. 
1. **Functions list:** In Run only mode, the functions list contains only published functions. 
1. **Code editor:** In Run only mode, the code editor is ready-only and cannot be modified. 
1. **Code changes indicator:** This message bar indicates if there are unpublished changes in Develop mode. To see those changes, the user needs to switch to Develop mode by clicking on the button in the bar or using the Mode switcher. 

>[!NOTE]
> Users that only have View permissions will be able to see the code in Run only mode but cannot execute any functions.

## Use Develop mode to test your changes in the Fabric portal

You can test your code changes in real-time by using the Test capability in Develop mode. You can access it by hovering over the function you'd like to test and clicking on the Test icon.

   :::image type="content" source="..\media\user-data-functions-test\test-your-function.gif" alt-text="Screenshot showing how to test a new function." lightbox="..\media\user-data-functions-test\test-your-function.gif":::

>[!NOTE]
> The test session might take several seconds to start. Once it starts you will be able to run tests immediately, even after making code changes. 

This step will open the Test panel which includes the following components: 
1. **Test session indicator:** This indicator will turn green when the test session is active. The session will start when a test is run for the first time and will timeout after 15 minutes of inactivity. 
1. **Function selector:** This drop down allows to select any function in your code to test. This includes published and unpublished functions.
1. **Test button:** This button allows you to test the function. If the selected function has parameters, you need to provide those before trying to test the function.
1. **Test output:** This panel contains the output that results from testing the function. This panel will show either the return value of the function or an object with the state and error output of the function.
1. **Logs output:** This panel contains the logs generated in the code, including the statements added to the `logging` object.

   :::image type="content" source="..\media\user-data-functions-test\user-data-functions-test-panel.png" alt-text="Screenshot showing the different parts of the Test panel." lightbox="..\media\user-data-functions-test\user-data-functions-test-panel.png":::

Learn more about the service limitations.

## Next steps

- [Create a Fabric User data functions item](./create-user-data-functions-portal.md) from within Fabric or [use the Visual Studio Code extension](./create-user-data-functions-vs-code.md)
- [Learn about the User data functions programming model](./python-programming-model.md)
