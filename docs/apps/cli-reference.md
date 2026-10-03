---
title: Rayfin CLI reference
description: Complete command reference for the Rayfin CLI, including project scaffolding, remote deployment, and configuration management.
ms.reviewer: mksuni
ms.topic: reference
ms.date: 09/25/2026
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
npx rayfin dev  # 2. Run the frontend dev server
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
| [`npx rayfin init [directory]`](#rayfin-init-directory) | Create or configure a Rayfin project. |
| [`npx rayfin connector`](#connector-commands) | Find, configure, inspect, and invoke Fabric data connectors. |
| [`npx rayfin functions init`](#rayfin-functions-init-directory) | Scaffold a Functions package. |
| [`npx rayfin dev`](#development-commands) | Run the app and Functions locally. |
| [`npx rayfin init ai-files`](#manage-agent-files) | Install or check Rayfin agent context files. |
| [`npx rayfin up`](#rayfin-up) | Deploy the app to Fabric and manage remote deployments. |
| [`npx rayfin env`](#rayfin-env) | Generate framework-specific environment files from `rayfin/.env`. |
| [`npx rayfin login`](#rayfin-login) | Sign in to the Rayfin platform. |
| [`npx rayfin logout`](#rayfin-logout) | Sign out and clear cached credentials. |

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

## Connector commands

The `connector` command group manages external Fabric data sources.

### `rayfin connector types`

Lists connector types that you can add to a project.

| Option | Description |
| --- | --- |
| `--json` | Emit the connector type list as JSON. |
| `-v, --verbose` | Include capability details. |

### `rayfin connector search [query]`

Searches Fabric sources that the signed-in identity can add as connectors.

| Argument or option | Description |
| --- | --- |
| `[query]` | Optional, case-insensitive source-name filter. |
| `--query <text>` | Named source-name filter that takes precedence over `[query]`. |
| `--type <type>` | Comma-separated connector types; required with `--workspace-id` or `--all-workspaces`. |
| `--workspace-id <id>` | Search one Fabric workspace. |
| `--all-workspaces` | Search every workspace the identity can access. |
| `-y, --yes` | Automatically accept the interactive add handoff. |
| `--limit <n>` | Maximum number of displayed results. |
| `--output <interactive\|plain\|json>` | Select the output format. |
| `--json` | Print results as JSON and skip the interactive picker. |
| `-v, --verbose` | Enable verbose output. |

When neither workspace option is supplied, the command searches the workspaces recorded for the current project deployment.

### `rayfin connector add --type <type>`

Adds a connector declaration and scaffolds its project files.

| Option | Description |
| --- | --- |
| `--type <type>` | **Required.** Connector type; use `rayfin connector types` to list types. |
| `--name <name>` | Connector name; derived from the item when omitted. |
| `--workspace-id <id>` | Fabric workspace ID. |
| `--item-id <id>` | Fabric item ID. |
| `--operations <ops>` | Comma-separated subset of allowed operations. |
| `-v, --verbose` | Enable verbose output. |
| `-y, --yes` | Automatically accept confirmations. |
| `--json` | Emit JSON output. |

### `rayfin connector list`

Lists the connectors declared in `rayfin.yml`.

| Option | Description |
| --- | --- |
| `-v, --verbose` | Include connector metadata and capabilities. |
| `--json` | Emit JSON output. |

### `rayfin connector inspect`

Inspects a configured connector or a directly addressed Fabric source without making changes.

| Option | Description |
| --- | --- |
| `--name <name>` | Configured connector name. |
| `-w, --workspace <name>` | Workspace name for direct inspection. |
| `--workspace-id <id>` | Workspace ID for direct inspection. |
| `--item <name>` | Item name for direct inspection. |
| `--item-id <id>` | Item ID for direct inspection. |
| `--type <type>` | Connector type for direct inspection. |
| `--url <url>` | Semantic model portal URL; derives the workspace and item IDs. |
| `--entity <name>` | Entity or table to sample; omit with `--query` to list entities. |
| `--query <path>` | `.sql` or `.dax` file to execute in read-only mode. |
| `--rows <n>` | Row limit; defaults to 10 for samples and is capped at 100. |
| `-v, --verbose` | Enable verbose output. |
| `--output <interactive\|plain\|json>` | Select the output format. |
| `--json` | Emit JSON output. |

Use `--name` for a configured connector, a complete direct-source selector, or `--url` for a semantic model.

### `rayfin connector invoke [connector-name] [operation]`

Invokes an operation on a configured connector.

| Argument or option | Description |
| --- | --- |
| `[connector-name]` | Configured connector name. |
| `[operation]` | Connector operation, such as `executeQuery`. |
| `--name <name>` | Named alternative to `[connector-name]`. |
| `--operation <operation>` | Named alternative to `[operation]`. |
| `--input <json>` | JSON operation input. |
| `--file <path>` | JSON file containing operation input. |
| `--transport <auto\|deployed>` | Invocation path; defaults to `auto`. |
| `-v, --verbose` | Enable verbose output. |
| `--output <interactive\|plain\|json>` | Select the output format. |
| `--output-file <path>` | Write the complete result to a file. |
| `--max-inline-bytes <bytes>` | Result-size threshold for writing a file; defaults to 1 MiB. |
| `--json` | Emit JSON output. |

### `rayfin connector remove <name>`

Removes a connector declaration and its generated connector files.

| Argument or option | Description |
| --- | --- |
| `<name>` | **Required.** Connector name to remove. |
| `-v, --verbose` | Enable verbose output. |
| `-y, --yes` | Automatically accept the removal confirmation. |
| `--json` | Emit JSON output. |

## Functions commands

### `rayfin functions init [directory]`

Scaffolds and configures a Functions package.

| Argument or option | Description |
| --- | --- |
| `[directory]` | Project root; defaults to the current directory. |
| `--force` | Overwrite an existing Functions scaffold. |
| `--path <relative-path>` | Functions package location relative to the project root. |

The package location defaults to a detected workspace location or `rayfin/functions`.

## Development commands

### `rayfin dev [project-path]`

Starts a local development session against a Rayfin backend.

| Argument or option | Description |
| --- | --- |
| `[project-path]` | Project root; defaults to the current directory. |
| `--skip-db-apply` | Skip automatic database configuration apply. |
| `--env-file <path>` | `.env` file used for `rayfin.yml` interpolation. |
| `--provider <fabric>` | Backend provider; defaults to `fabric`. |
| `-w, --workspace <name>` | Fabric workspace name for a first-run backend. |
| `--workspace-id <id>` | Fabric workspace ID for a first-run backend. |
| `--capacity-id <id>` | Fabric capacity ID for a workspace without usable capacity. |
| `-t, --tenant <id>` | Microsoft Entra tenant ID. |
| `--encryption-fallback-enabled` | Permit plaintext token storage when no OS keychain is available. |
| `--no-emit-env` | Don't regenerate the framework `.env.local` file. |
| `-v, --verbose` | Enable verbose logging. |

### `rayfin dev functions apply`

Starts the local Functions host against the active deployment.

| Option | Description |
| --- | --- |
| `--port <port>` | Local Functions host port; defaults to `7071`. |
| `--inspect-port <port>` | Node.js inspector port; defaults to `9229`. |
| `--no-debug` | Disable the Node.js inspector. |
| `--no-emit-env` | Don't regenerate the framework `.env.local` file. |
| `--verbose` | Show diagnostic output. |
| `--json` | Emit JSON output. |
| `-y, --yes` | Run without interactive prompts. |

## Manage agent files

The `rayfin init ai-files` command manages Rayfin agent context files in your project: `AGENTS.md`, `.mcp.json`, and `.agents/skills/rayfin/SKILL.md`. The CLI installs these files automatically when you scaffold a project. Run the commands below to install or refresh them in an existing project, or check their status.

### `rayfin init ai-files install`

Installs or refreshes the Rayfin agent files. The command is idempotent and preserves existing user configuration.

| Option | Description |
| --- | --- |
| `--enable <id>` | Install or keep a specific item by its namespaced ID, such as `skill:rayfin`. Repeatable. |
| `--disable <id>` | Stop managing a specific item without deleting its file. Repeatable. |
| `--remove-files` | Remove the on-disk file when disabling an item. Requires `--disable`. |
| `--force [ids...]` | Overwrite modified items, restore missing items, or rebuild malformed `.mcp.json`. Accepts optional namespaced IDs to scope the operation. Never overwrites `AGENTS.md`. |
| `-n, --dry-run` | Report the changes without writing files. |
| `--json` | Emit structured output as JSON; implies non-interactive mode. |
| `-y, --yes`, `--non-interactive` | Skip the interactive prompt and accept defaults. |

For example, install defaults without prompting:

```bash
npx rayfin init ai-files install --yes
```

### `rayfin init ai-files status`

Prints the state of each managed agent file. Use `--json` for structured output.

Possible states include `up-to-date`, `update-available`, `user-modified`, `missing`, `not-installed`, `disabled`, `orphaned`, and `unreadable`. Run `rayfin init ai-files install` to refresh files or `rayfin init ai-files install --force <id>` to overwrite a specific managed item.

## Deploy to Fabric

### `rayfin up`

Use `rayfin up` to deploy the application to Fabric as a Rayfin item.

| Argument | Description |
| --- | --- |
| `-t, --tenant <id>` | Use a specific tenant ID. |
| `-w, --workspace <name>` | Deploy to a Fabric workspace by name; defaults to `My Workspace`. |
| `--workspace-id <id>` | Deploy to a specific Fabric workspace ID. |
| `--workspace-uri <uri>` | Deploy to a specific Fabric workspace URI. |
| `--item-name <name>` | Fabric item display name; defaults to the project ID. |
| `--capacity-id <id>` | Fabric capacity ID when the target workspace needs capacity. |
| `--force` | Allow destructive data-schema changes. |
| `-n, --dry-run` | Validate inputs and resolve the workspace without deploying. |
| `--env-file <path>` | `.env` file for deployment properties; defaults to `rayfin/.env`. |
| `-v, --verbose` | Enable verbose output. |
| `--json` | Return deployment output in JSON format. |
| `-y, --yes` | Automatically accept confirmations. |
| `--encryption-fallback-enabled` | Permit plaintext token storage when no OS keychain is available. |
| `--exclude-services <names>` | Comma-separated services to skip during build and deployment: `staticHosting` or `functions`. |
| `--provider <fabric>` | Deployment provider; defaults to `fabric`. |

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
npx rayfin up --workspace-id <workspace-id> --yes
```

Deploy without building or deploying Functions:

```bash
npx rayfin up --exclude-services functions
```

`--capacity-id` can't be combined with `--workspace`, `--workspace-id`, or `--workspace-uri`.

| Subcommand | Description |
| --- | --- |
| `npx rayfin up db apply` | Generate and apply DAB configuration to the remote Rayfin item workload endpoint. |
| `npx rayfin up functions deploy` | Build, package, and deploy Functions to the active remote item. |
| `npx rayfin up staticapp deploy` | Build, package, and deploy static content to the remote Rayfin item. |
| `npx rayfin up connector apply` | Apply database configuration for declared GraphQL connectors. |
| `npx rayfin up status` | Show the current deployment status. |
| `npx rayfin up list` | List all Fabric deployments recorded for the project. |
| `npx rayfin up switch [workspace]` | Switch the active Fabric deployment and rewrite `rayfin/.env`. |

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

### `rayfin up functions deploy`

Builds, packages, and deploys Functions to the active remote item.

| Option | Description |
| --- | --- |
| `--verbose` | Show verbose output. |
| `--skip-build` | Deploy existing Functions output without building. |
| `--json` | Emit JSON output. |

### `rayfin up connector apply`

Applies database configuration for declared GraphQL connectors.

| Option | Description |
| --- | --- |
| `--name <name>` | Apply only the named connector. |
| `--verbose` | Enable verbose output. |
| `--json` | Emit JSON output. |

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
| `npx rayfin login status` | Display the current authentication status. |

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
