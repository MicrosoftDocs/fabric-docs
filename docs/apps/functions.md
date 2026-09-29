---
title: Use Functions in Fabric Apps
description: Learn how to add server-side TypeScript functions to a Fabric app, run them locally, and deploy them to Microsoft Fabric.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 08/11/2026
ai-usage: ai-generated
---

# Use Functions in Fabric Apps

Functions are TypeScript functions that run on the server inside your Fabric app. Use functions for logic that must not run in the browser, such as working with secrets, accessing privileged data, and calling downstream services on behalf of the signed-in user.

Each function is registered with a name and exposed as a callable HTTP endpoint. Your React frontend calls the function through the typed Rayfin client, so you don't need to implement requests, routing, or token handling.

> [!NOTE]
> Functions are currently available through the `functions` feature flag. The commands in this article use a preview version of the Rayfin CLI.

## When to use a function

Use a Rayfin Function to:

- Call an external API with a delegated, on-behalf-of token. Examples include Azure AI Foundry, Azure DevOps, Fabric, Azure Storage, and Azure Key Vault.
- Read or write the app's database with server-enforced row-level security.
- Keep API keys, model deployment names, and other secrets out of client code.
- Run orchestration, such as fan-out calls, aggregation, or AI prompting, close to the data.

> [!IMPORTANT]
> Currently, only the app owner can run an app that uses delegated authentication. App builders can't share the app with other users. Other users see an error when they run the app.

## Prerequisites

Before you begin, install or create the following resources:

- Node.js 20 or later and npm.
- A Fabric app scaffold created with the Rayfin CLI.
- [Azure Functions Core Tools](https://github.com/Azure/azure-functions-core-tools), which the local functions host uses for debugging.

Install Azure Functions Core Tools version 4:

```powershell
npm install --global azure-functions-core-tools@4
```

## Create an app with functions

Scaffold an app and initialize its functions project:

```powershell
npm create @microsoft/rayfin@latest

cd my-app

npx rayfin functions init

```

The `rayfin functions init` command adds the functions project, its TypeScript configuration, and a starter function file to the existing app.

## Build the app with GitHub Copilot

The scaffold includes the GitHub Copilot instructions and skills needed to work with the project. Open the project in Visual Studio Code, and describe the app you want to build in GitHub Copilot Chat.

For example, use the following prompt to build an AI pull request review assistant:

```text
Build an app that lets me view all pull requests for the repository
<repoURL>, chat with my Azure AI Foundry agent <agentName> to review
pull requests, and post review comments. Use functions with delegated
authentication to connect to Azure AI Foundry and Azure DevOps.
```

GitHub Copilot can generate and update the required files and components. You can also ask the agent to run the app, debug functions locally, and deploy the app.

## Understand the project layout

The functions initialization command updates `rayfin/rayfin.yml` and creates `rayfin/functions`. A typical app with functions has the following structure:

```text
my-app/
├── rayfin/
│   ├── rayfin.yml
│   ├── data/
│   │   ├── TripPlan.ts
│   │   └── schema.ts
│   └── functions/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── function_app.ts
│           └── types.ts
└── src/
    └── services/
```

The files serve the following purposes:

| Path | Purpose |
| --- | --- |
| `rayfin/rayfin.yml` | Configures authentication, data, functions, and static hosting services. |
| `rayfin/data/` | Contains the app's data models and schema exports. |
| `rayfin/functions/package.json` | Defines dependencies and build scripts for the functions project. |
| `rayfin/functions/tsconfig.json` | Configures the TypeScript build for functions. |
| `rayfin/functions/src/function_app.ts` | Contains your function implementations. |
| `rayfin/functions/src/types.ts` | Contains the generated `AppFunctionsSchema` types. Don't edit this file manually. |
| `src/` | Contains the React frontend and any shared domain types or wrappers. |

When you enable functions, `rayfin/rayfin.yml` includes the functions service:

```yaml
services:
  functions:
    enabled: true
    buildCommand: npm run build
```

## Run the app locally

From the app's root folder, sign in once and set the feature flag for the current PowerShell session:

```powershell
cd my-app
npx rayfin login

```

Start the frontend and the local functions host:

```powershell
npm run dev
```

In a functions-enabled project, `npm run dev` maps to `rayfin dev`. This command applies the schema, starts the local functions host, and starts the Vite development server. Open the local URL printed in the terminal, and keep the terminal running while you develop and debug the app.

To start only the functions host, for example when you run the frontend separately, use the following command instead:

```powershell
cd my-app

npx rayfin dev functions apply
```

> [!IMPORTANT]
> Don't run `npm run dev` and `npx rayfin dev functions apply` at the same time. Both commands start a functions host, so running them together creates a second host and a port mismatch.

## Deploy to Fabric

Set the feature flag and deploy the app's data, static site, and functions:

```powershell

npx rayfin up --workspace <workspace-name>
```

Replace `<WORKSPACE>` with the name of the target Fabric workspace.

## Add functions to an existing app

From the root of an existing Fabric app, enable the feature and initialize the functions project once:

```powershell

npx rayfin functions init
```

After initialization, add function implementations to `rayfin/functions/src/function_app.ts`.

## Related content

- [Understand the Fabric Apps project structure](project-structure.md)
- [Authentication for Fabric Apps](authentication.md)
- [Manage function secrets](manage-function-secrets.md)
- [Deploy a Fabric app to Fabric](deploy-app.md)
- [Rayfin CLI reference](cli-reference.md)
