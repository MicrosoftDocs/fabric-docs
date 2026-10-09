---
title: Use Functions in Fabric Apps
description: Learn how to add server-side TypeScript functions to a Fabric app, run them locally, and deploy them to Microsoft Fabric.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 09/25/2026
ai-usage: ai-generated
---

# Use Functions in Fabric Apps

Functions are TypeScript functions that run on the server inside your Fabric app. Use functions for logic that must not run in the browser, such as working with secrets, accessing privileged data, and calling downstream services with the app identity.

Each function is registered with a name and exposed as a callable HTTP endpoint. Your React frontend calls the function through the typed Rayfin client, so you don't need to implement requests, routing, or token handling.

> [!NOTE]
> The commands in this article use a preview version of the Rayfin CLI.

## When to use a function

Use a Rayfin Function to:

- Call an external API with an application token. Examples include Azure AI Foundry, Azure DevOps, Fabric, Azure Storage, and Azure Key Vault.
- Read or write the app's database with server-enforced row-level security.
- Keep API keys, model deployment names, and other secrets out of client code.
- Run orchestration, such as fan-out calls, aggregation, or AI prompting, close to the data.

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
Build an app that helps business analysts track sales performance across
regions. Show key metrics, let analysts ask questions about trends, and
use Functions to securely retrieve data from our sales API with application
authentication.
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
    auth:
      type: application
    buildCommand: npm run build
```

## Application authentication

Enabled Functions require explicit application authentication in `rayfin/rayfin.yml`:

```yaml
services:
  functions:
    enabled: true
    auth:
      type: application
    buildCommand: npm run build
```

New Functions scaffolds set `auth.type: application`.

Disabled Functions can omit `auth`. However, if you supply `auth`, it must include:

```yaml
auth:
  type: application
```

A full `npx rayfin up` and the normal `npx rayfin dev` flow validate this setting before applying project settings to either the Fabric or Docker backend.

Run a full `npx rayfin up` to apply the YAML authentication mode to an existing remote app.

### Authentication paths used by deployed Functions

Deployed Functions use two separate authentication paths:

| Access path | Credential | Identity and permissions |
| --- | --- | --- |
| External connections through `ctx.Tokens.*` | Platform-provided resource token | Application identity and its permissions on the external resource |
| Rayfin DB through `ctx.getDataClient()` | Invocation's Rayfin token | Caller's identity and permissions on the Rayfin DB |

For current Fabric apps, the application identity is the owner of the BaaS item.

External connections therefore use the item owner's permissions, not the permissions of the app user who invokes the function. Grant the app identity the permissions required by every external resource and API called by the Functions code.

Declaring an audience or deploying Functions doesn't grant the app identity permissions to an external resource.

App sign-in and authorization to invoke a function are separate from the app identity's access to external resources.

Rayfin DB access always uses the Rayfin token and preserves the caller's identity and database permissions. Setting `services.functions.auth.type: application` doesn't switch Rayfin DB access to the application identity.

For audience declarations, resource tokens, permissions, and local development behavior, see [Connect Functions to external resources](functions-connect-external-resources.md).

## Run the app locally

From the app's root folder, sign in:

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
npx rayfin dev 
```

## Deploy to Fabric

Deploy the app's data, static site, and functions:

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

## Limitations

- **Function ownership**: Only the owner of the user data functions item can modify and publish the Functions code.
- **Publishing cooldown**: Wait at least two minutes after publishing before publishing again. This cooldown applies when publishing from the Functions in-browser portal, the user data functions Visual Studio Code extension, the Git import action, or deployment pipelines.
- **Deployment package size**: The Functions ZIP file can't exceed 30 MB.
- **Request payload size**: The user data functions service documents a 4 MB maximum for all request parameters combined. This limit is expected to apply to Rayfin Functions, but hasn't been verified.
- **Execution timeout**: A function can run for up to 240 seconds.
- **Invocation log retention**: Historical invocation logs are retained for 30 days by default.
- **Application identity**: The application identity is currently the owner of the BaaS item.

For regional availability requirements and more details about user data functions limitations, see [Service details and limitations of Fabric user data functions](../data-engineering/user-data-functions/user-data-functions-service-limits.md#limitations).

## Related content

- [Understand the Fabric Apps project structure](project-structure.md)
- [Authentication for Fabric Apps](authentication.md)
- [Connect Functions to external resources](functions-connect-external-resources.md)
- [Manage function secrets](manage-function-secrets.md)
- [Deploy a Fabric app to Fabric](deploy-app.md)
- [Rayfin CLI reference](cli-reference.md)
