---
title: Implementation guide
description: Learn how to implement a workload for Fabric.
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 12/15/2025
---

# Implementation guide

Start from the [Starter-Kit Repository](https://aka.ms/fabric-extensibility-starter-kit) to get productive fast. Forking the repository is the recommended best practice—you can keep your customization in your fork and use it as the base for your own project. The project is preconfigured so you can run locally right away, and scripts are available to set up everything for you.

## Prerequisites

Local development is supported on Windows, macOS, and Linux. Install or have access to:

- Node.js LTS: [Download Node.js](https://nodejs.org/en/download)
- PowerShell 7 (pwsh on macOS/Linux): [Install PowerShell](/powershell/scripting/install/installing-powershell)
- .NET SDK (for macOS use the x64 build): [Download .NET](https://dotnet.microsoft.com/download)
- VS Code or similar editor: [Download VS Code](https://code.visualstudio.com/download)
- Fabric tenant and a workspace you can use: [Fabric portal](https://app.fabric.microsoft.com)
- Fabric capacity assigned to that workspace: [Fabric capacity](/fabric/enterprise/licenses)
- Azure CLI (used only for Microsoft Entra app creation): [Install Azure CLI](/cli/azure/install-azure-cli)
- Microsoft Entra application: either use an existing app or permission to create a new one

Optional

- Dev container / [GitHub Codespaces](https://github.com/features/codespaces). If you use Codespaces, choose at least an 8‑core machine and open the codespace in VS Code locally. Then follow the setup guide in the repository.

## 1. Fork and clone the Starter-Kit (recommended)

Fork the [Starter-Kit](https://aka.ms/fabric-extensibility-starter-kit) into your own GitHub account so you can track and maintain your changes.

```pwsh
git clone https://github.com/<your-account>/fabric-extensibility-toolkit.git
cd fabric-extensibility-toolkit
```


## 2. Start the development environment

Run the setup script to configure prerequisites (for example, Microsoft Entra app, defaults). Use `pwsh` on macOS/Linux.

```pwsh
# From the repo root
pwsh ./scripts/Setup/Setup.ps1 -WorkloadName "Org.MyWorkload"
```

Then start the local development environment and the DevGateway:

```pwsh
# Terminal 1: start the local dev server (frontend + APIs)
pwsh ./scripts/Run/StartDevServer.ps1

# Terminal 2: register your local instance with Fabric
pwsh ./scripts/Run/StartDevGateway.ps1
```

## 3. Test your setup

In the Fabric portal:

- Ensure the required tenant developer settings are enabled in the Admin Portal.
- Turn on Fabric Developer Mode for your account.
- Open the Workload Hub, find your workload (for example, `Org.MyWorkload`), and create a Hello World item in your development workspace.
- The editor opens—verify the item works as expected and appears like a native artifact in the workspace.

## 4. Customize the code to your needs

Make small changes first and verify end to end:

- Update the editor component (for example): `Workload/app/items/HelloWorldItem/HelloWorldItemEditor.tsx`
- Or scaffold a new item type with: `./scripts/Setup/CreateNewItem.ps1`
- Update your manifest as needed and re-run locally to verify behavior

## AI-assisted development

This repository works well with AI pair-programming tools. Whether you develop locally or in GitHub Codespaces, you can use GitHub Copilot or other AI assistants to accelerate tasks like editing React components, update routes, or generate test scaffolding.

> [!TIP]
> The Starter-Kit repository is AI-enabled and includes GitHub Copilot instructions that guide you through adapting the Hello World item to your needs. Other AI tools (for example, Anthropic Claude) can follow the same guidance, but must be configured to read the repository’s guidance files or docs.

- Use AI to draft item editor/view components and then adapt to the host API patterns used in the Starter-Kit.
- Ask AI to summarize the workload manifest and propose minimal permission sets.
- In Codespaces, Copilot is available in the browser or VS Code desktop; keep the dev server running to see changes instantly.

> [!TIP]
> If you're interested to see what others build open the [Extensibility Samples](https://aka.ms/fabric-extensibility-toolkit-samples) and deploy it to your environment. There you can find rich item types that help you get started.

## Rapid iteration and debugging in Fabric

The Extensibility framework is designed for rapid development.

- With the dev server and DevGateway running, code changes in your app are reflected immediately when you open your item inside Fabric.
- You can debug using your browser’s dev tools while the workload is hosted in the Fabric iFrame.
- Iterate on UI, routes, and manifest configuration quickly, and validate end-to-end behavior in your Fabric workspace.

## Best practices

- Fork the [Starter-Kit](https://aka.ms/fabric-extensibility-starter-kit) repository and use your fork as the base of your project.
- Keep your fork in sync with upstream to pick up improvements.
- Validate your workload manifest early and follow least-privilege permissions.
- Use a dev container or Codespaces for a consistent, disposable environment.
- Use the provided scripts (Setup, StartDevServer, StartDevGateway) to automate setup and daily workflow.

## Related links

- [Architecture](architecture.md)
- [Workload manifest](manifest-workload.md)
- [DevGateway](tools-register-local-workload.md)
- [Publish your workload](publish-workload-flow.md)
