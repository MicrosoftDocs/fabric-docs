---
title: "Quickstart: Create a Fabric app in Visual Studio Code"
description: Learn how to create a Microsoft Fabric app with the Microsoft Fabric extension for Visual Studio Code, set up its local project, and deploy it to Fabric.
ms.reviewer: mksuni
ms.topic: quickstart
ms.date: 11/02/2026
ai-usage: ai-generated
---

# Quickstart: Create a Fabric app in Visual Studio Code

Use the Microsoft Fabric extension for Visual Studio Code (VS Code) to create a Fabric app in your workspace and open its **Getting Started** page. The page provides a command tailored to your app so you can set up the local project with Rayfin, the framework for Fabric apps.

In this quickstart, you create an app named `demoapp12`, set up its source code locally, and run and deploy the app.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/).
- The [Microsoft Fabric extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric) with the **Apps** and **Get Started** features shown in this quickstart.
- [Node.js 20 or later](https://nodejs.org/) and npm.
- A Microsoft account with access to Fabric.
- A Fabric workspace with Fabric capacity assigned, where you have Contributor, Member, or Admin permissions. See [Fabric Apps prerequisites](overview.md).

## Sign in and select a workspace

1. Open VS Code. If you didn't install the Microsoft Fabric extension, open **Extensions**, search for **Microsoft Fabric**, and install the extension linked in the prerequisites.
1. Press **F1**, enter `Fabric: Sign in`, and select the command.
1. Complete the sign-in prompts with the account you use to access your Fabric workspace.
1. Select **Microsoft Fabric** in the activity bar.
1. In **Fabric Workspaces**, expand the workspace where you want to create the app. Select your workspace.

## Create the app item

Create the app in your selected workspace before you set up its local project.

1. Press **F1**, enter `Fabric: Create item`, and select the workspace.

   :::image type="content" source="media/create-app-with-vs-code/fabric-workspace-apps.png" alt-text="Screenshot of the create new item." lightbox="media/create-app-with-vs-code/fabric-workspace-apps.png":::

1. Select **App**.
1. Enter a name and press **Enter** to confirm.

   :::image type="content" source="media/create-app-with-vs-code/new-app-name.png" alt-text="Screenshot of the New App name prompt after selecting the plus button beside Apps in the Fabric workspace tree." lightbox="media/create-app-with-vs-code/new-app-name.png":::

## Open the app's getting started page

You can return to the setup instructions at any time.

1. Right-click your app item.
1. Select **Get Started**.

   :::image type="content" source="media/create-app-with-vs-code/get-started-menu.png" alt-text="Screenshot of the demoapp12 app context menu with Get Started selected and Open in Fabric available below it." lightbox="media/create-app-with-vs-code/get-started-menu.png":::

The **Getting Started** page contains the project setup command for the selected app and workspace, along with instructions for editing the app.

:::image type="content" source="media/create-app-with-vs-code/getting-started-page.png" alt-text="Screenshot of the app Getting Started page with Copy prompt, Open a terminal, Set up your project, a dataapp template option, and Edit the app instructions." lightbox="media/create-app-with-vs-code/getting-started-page.png":::

## Set up the local project

Use the command from your app's **Getting Started** page rather than copying the example values from the following screenshot.

1. In VS Code, select **Terminal** > **New Terminal**.
1. Go to the parent folder where you want to create the project.
1. Under **Set up your project** on the **Getting Started** page, copy the full scaffold command and run it in the terminal. Follow any prompts.

   The command uses `npm create @microsoft/rayfin@latest` and includes settings for your selected app and workspace. Copy the complete command, including any text that extends beyond the visible code block.

1. After setup finishes, go to the generated project folder. If you used `demoapp12`, run:

   ```powershell
   cd demoapp12
   ```

1. Select **File** > **Open Folder** and open the generated project folder.
1. Review the generated files before making changes. For an explanation of the configuration and source files, see [Understand the project structure](project-structure.md).

> [!TIP]
> If you want an app connected to a semantic model, the **Getting Started** page also provides a command that uses the `dataapp` template. Use that command instead of the default scaffold command, not in addition to it. See [Create an app connected to a semantic model](data-apps-template.md) for the additional requirements and setup.

### Use a coding agent instead

If you use an AI coding agent, select **Copy prompt** at the top of the **Getting Started** page and paste it into your agent's chat. For GitHub Copilot in VS Code, use **Agent** mode with terminal access.

Review the prompt before submitting it, approve commands as required, and complete any browser sign-in prompts. Review the generated files before deployment. You don't need to repeat the manual scaffold steps if the agent already completed them.

## Run and deploy the app

Run these commands from the generated project folder, not its parent folder. The frontend runs locally, but the backend runs in Fabric.

1. Deploy the initial app and backend to Fabric:

   ```powershell
   npx rayfin up
   ```

   Complete the browser sign-in flow if prompted. Check the selected workspace before proceeding with deployment.

1. Confirm the deployment status:

   ```powershell
   npx rayfin up status
   ```

   If deployment fails, resolve the reported error before continuing. See [Troubleshoot Fabric Apps](troubleshooting.md).

1. Start the frontend development server:

   ```powershell
   npm run dev
   ```

1. Open the local URL printed in the terminal to view your app. Keep the development server running while you edit and preview the frontend.
1. Customize the app in VS Code and review your changes in the local preview.
1. When you're ready to publish your changes, run `npx rayfin up` again. You can use another terminal while the development server is running.
1. Run `npx rayfin up status` again and open the hosted app URL printed by the deployment command.

You created a Fabric app item, set up its local project, and deployed the app to your workspace. For more deployment options, see [Deploy a Fabric app to Fabric](deploy-app.md).

## Related content

- [Create a Fabric app with the Rayfin CLI](create-app-with-cli.md).
- [Create a semantic model app with GitHub Copilot](create-app-with-github-copilot.md).
- [Understand the project structure](project-structure.md).
- [Microsoft Fabric extensions for Visual Studio Code](../data-engineering/set-up-fabric-vs-code-extension.md).
