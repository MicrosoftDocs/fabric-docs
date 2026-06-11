---
title: Rayfin CLI reference
description: Complete command reference for the Rayfin CLI, including project scaffolding, remote deployment, and configuration management.
ms.reviewer: mksuni
ms.topic: reference
ms.date: 06/02/2026
ai-usage: ai-assisted
---

# Rayfin CLI reference

Find the Rayfin CLI commands for creating projects, managing schema changes, deploying to Fabric, and configuring environment settings. Each section lists command syntax, options, and common uses.

## Installation

Use `npm i @microsoft/rayfin-cli` to install the CLI.

## Getting started

Follow the steps in your terminal to create a Fabric app.

```bash
npm create @microsoft/rayfin@latest my-app  # 1. Create a project from a template
cd my-app
npm run dev     # 2. Run the frontend dev server
npx rayfin up   # 3. Deploy to Microsoft Fabric
```

> [!TIP]
> For existing or empty projects, use `npx rayfin init` instead of `npm create` to add Rayfin to a project that already has source code or an empty directory. The init command walks you through enabling services, choosing a database dialect, and configuring static hosting without scaffolding a new template.

For the full walkthrough, see [Create and deploy your first Fabric app with the CLI](create-app-with-cli.md) and [Deploy a Fabric app to Fabric](deploy-app.md).

## Scaffold a project with `npm create`

`npm create` (alias of `npm init`) bootstraps a new project by invoking a create initializer package. To scaffold a Fabric app, use it with the `@microsoft/rayfin` initializer:

```bash
npm create @microsoft/rayfin@latest my-app --workspace <workspace name>
```

## Command reference

The commands and flags in this article were verified from the locally installed CLI help output.

## Top-level commands

Use this table to find the right command quickly.

| Command | Use it to |
| --- | --- |
| [`rayfin init [directory]`](#rayfin-init-directory) | Create or configure a Rayfin project. |
| [`rayfin up`](#rayfin-up) | Deploy the app to Fabric and manage remote deployments. |
| [`rayfin env`](#rayfin-env) | Generate framework-specific environment files from `rayfin/.env`. |
| [`rayfin login`](#rayfin-login) | Sign in to the Rayfin platform. |
| [`rayfin logout`](#rayfin-logout) | Sign out and clear cached credentials. |

## Create or configure a project

### `rayfin init [directory]`

Use `rayfin init` to add Rayfin to a new or existing project.

| Argument | Description |
| --- | --- |
| `--project-name <name>` | Set the project name. |
| `-t, --template <uri>` | Specify the template URI to use. |
| `--template-name <name>` | Select a template by name. |
| `-l, --list-templates` | List available templates. |
| `--dialect <dialect>` | Set the database dialect. |
| `--services <list>` | Choose which services to enable. |
| `--auth-methods <list>` | Choose authentication methods. |
| `--static-hosting` | Enable static hosting setup. |
| `--overwrite` | Overwrite existing generated files. |
| `--workspace-id <id>` | Use a specific Fabric workspace ID. |
| `--workspace-uri <uri>` | Use a specific Fabric workspace URI. |
| `--base-api-url <url>` | Override the base API URL. |
| `--item-id <id>` | Target a specific Fabric item ID. |

**Examples**

List available templates before scaffolding:

```bash
npx rayfin init --list-templates
```

Initialize Rayfin in the current directory by using a named template and a specific dialect:

```bash
npx rayfin init . --template-name react-vite --dialect mssql
```

Create a new project non-interactively with services and authentication configured:

```bash
npx rayfin init my-app --project-name my-app --services db,storage --auth-methods fabric --static-hosting --overwrite
```

## Deploy to Fabric

### `rayfin up`

Use `rayfin up` to deploy the application to Fabric as a Rayfin item.

| Argument | Description |
| --- | --- |
| `--tenant <id>` | Use a specific tenant ID. |
| `--workspace-id <id>` | Deploy to a specific Fabric workspace ID. |
| `--workspace-uri <uri>` | Deploy to a specific Fabric workspace URI. |
| `--base-api-url <url>` | Override the base API URL. |
| `--force` | Force deployment steps when needed. |
| `--dry-run` | Preview deployment actions without applying them. |
| `--env-file <path>` | Load environment values from a file. |
| `--verbose` | Show verbose deployment output. |
| `--json` | Return deployment output in JSON format. |
| `-y, --yes` | Accept prompts automatically. |
| `--encryption-fallback-enabled` | Enable encryption fallback behavior. |

**Examples**

Deploy to the currently selected Fabric workspace:

```bash
npx rayfin up
```

Preview deployment actions without applying them:

```bash
npx rayfin up --dry-run --verbose
```

Deploy to a specific workspace non-interactively:

```bash
npx rayfin up --workspace-id 00000000-0000-0000-0000-000000000000 --yes
```

| Subcommand | Description |
| --- | --- |
| `rayfin up db apply` | Generate and apply DAB configuration to the remote Rayfin item workload endpoint. |
| `rayfin up staticapp deploy` | Build, package, and deploy static content to the remote Rayfin item. |
| `rayfin up status` | Show the current deployment status. |
| `rayfin up list` | List all Fabric deployments recorded for the project. |
| `rayfin up switch [workspace]` | Switch the active Fabric deployment and rewrite `rayfin/.env`. |

### `rayfin up db apply`

Generates and applies DAB configuration to the remote Rayfin item workload endpoint.

| Argument | Description |
| --- | --- |
| `--verbose` | Show verbose output. |
| `--force` | Force regeneration and apply configuration. |
| `--json` | Return output in JSON format. |

**Examples**

Apply database configuration changes to the remote Rayfin item:

```bash
npx rayfin up db apply
```

Force regeneration and capture machine-readable output:

```bash
npx rayfin up db apply --force --json
```

### `rayfin up staticapp deploy`

Builds, packages, and deploys static content to the remote Rayfin item.

| Argument | Description |
| --- | --- |
| `--verbose` | Show verbose output. |
| `--skip-build` | Deploy without running the build step. |
| `--json` | Return output in JSON format. |

**Examples**

Build and deploy static content:

```bash
npx rayfin up staticapp deploy
```

Deploy a prebuilt `dist` folder without rerunning the build:

```bash
npx rayfin up staticapp deploy --skip-build
```

### `rayfin up status`

Displays the status of the cloud deployment.

| Argument | Description |
| --- | --- |
| `--json` | Return status in JSON format. |
| `--verbose` | Show verbose output. |

**Examples**

Check the current deployment status:

```bash
npx rayfin up status
```

Return status as JSON for use in scripts:

```bash
npx rayfin up status --json
```

### `rayfin up list`

Lists all Fabric deployments recorded for this project.

| Argument | Description |
| --- | --- |
| `--json` | Return the deployment list in JSON format. |

**Examples**

List all recorded Fabric deployments for the project:

```bash
npx rayfin up list
```

### `rayfin up switch [workspace]`

Switches the active Fabric deployment and rewrites `rayfin/.env` accordingly.

| Argument | Description |
| --- | --- |
| `-l, --list` | List available deployments without switching. |
| `--no-emit-env` | Skip writing emitted environment files. |

**Examples**

List available deployments to switch to:

```bash
npx rayfin up switch --list
```

Switch the active deployment to a specific workspace:

```bash
npx rayfin up switch my-workspace
```

## Generate environment files

### `rayfin env`

Use `rayfin env` to emit framework-specific `.env.local` values from `rayfin/.env`.

| Argument | Description |
| --- | --- |
| `--framework <vite|nextjs|plain>` | Choose the target framework format. |
| `--output <dir>` | Write generated files to a specific directory. |
| `--show` | Print emitted values without writing files. |

**Examples**

Generate a Vite-compatible `.env.local`:

```bash
npx rayfin env --framework vite
```

Preview emitted environment values without writing files:

```bash
npx rayfin env --framework nextjs --show
```

## Sign in and sign out

### `rayfin login`

Use `rayfin login` to sign in to the Rayfin platform.

| Argument | Description |
| --- | --- |
| `--tenant <id>` | Use a specific tenant ID. |
| `--service-principal` | Attempt service principal sign-in. This option is listed in help but isn't currently supported. |
| `-u, --client-id <id>` | Provide the client ID for service principal sign-in. This option is listed in help but isn't currently supported. |
| `-p, --client-secret <secret>` | Provide the client secret for service principal sign-in. This option is listed in help but isn't currently supported. |
| `--select` | Select from available signed-in accounts or contexts. |
| `--encryption-fallback-enabled` | Enable encryption fallback behavior. |

**Examples**

Sign in interactively:

```bash
npx rayfin login
```

Sign in to a specific tenant:

```bash
npx rayfin login --tenant 00000000-0000-0000-0000-000000000000
```

Switch between signed-in accounts:

```bash
npx rayfin login --select
```

| Subcommand | Description |
| --- | --- |
| `rayfin login status` | Display the current authentication status. |

### `rayfin login status`

Displays current authentication status.

| Argument | Description |
| --- | --- |
| None | This subcommand doesn't list any options in the CLI help output. |

#### Example

Check whether you're signed in:

```bash
npx rayfin login status
```

### `rayfin logout`

Signs out and clears cached credentials.

| Argument | Description |
| --- | --- |
| None | This command doesn't list any options in the CLI help output. |

#### Example

Sign out and clear cached credentials:

```bash
npx rayfin logout
```
