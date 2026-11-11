---
title: Fabric Apps project structure
description: Learn about the folder layout, configuration files, and key components in a Fabric Apps project.
ms.reviewer: mksuni
ms.topic: concept-article
ms.date: 06/02/2026
ai-usage: ai-assisted
---

# Fabric Apps project structure

Fabric Apps projects separate backend configuration, data models, and frontend code. The exact layout depends on the template. The default `blankapp` template resolves to **Universal App**, an npm workspace with separate frontend, data, and shared packages.

## Folder layout

The default Universal App scaffold has the following structure:

```text
your-project/
├── rayfin/
│   ├── .env
│   ├── rayfin.yml
│   └── tsconfig.json
├── packages/
│   ├── frontend/
│   │   ├── src/
│   │   └── package.json
│   ├── data/
│   │   └── src/index.ts
│   └── shared/
│       └── src/index.ts
├── package.json
├── tsconfig.json
└── README.md
```

| Location | Ownership |
| --- | --- |
| `rayfin/` | Backend configuration and active environment values. |
| `packages/frontend/` | Browser UI, client initialization, and frontend build. |
| `packages/data/` | Decorated runtime entity classes and schema registration. |
| `packages/shared/` | Isomorphic record contracts and schema types shared with the frontend. Don't put backend-only code here. |

Data is disabled in the base scaffold. Enable it when your app needs persisted records:

```bash
npm run pack:add -- data-modeling
```

The capability adds a starter entity and shared contract and enables the data service. For entity authoring and MSSQL dialect configuration, see [Define data models](data-models.md).

### Flat-template alternative

Some templates and existing apps use a flat layout with frontend code in root `src/`, entities in `rayfin/data/`, and a schema type map in `rayfin/data/schema.ts`. This layout remains valid. Don't move files or create duplicate packages just to match another template. Read the service paths in `rayfin/rayfin.yml` to find the directories your project actually builds.

## Key configuration files

### rayfin/rayfin.yml

The `rayfin/rayfin.yml` file is the main configuration file for your Fabric Apps backend. It controls which services run during local development and supports environment variable interpolation for dynamic configuration values.

The default workspace uses explicit service paths. The following example shows those paths with Data enabled for an app that needs a database:

```yaml
id: my-app
name: my-app
version: 1.0.0
services:
  auth:
    enabled: true
    allowedRedirectUris:
      - http://localhost:5173
    fabric:
      enabled: true
      externalEntraExchange: true
    password:
      enabled: false
  data:
    enabled: true
    dialect: mssql
    path: packages/data
    buildCommand: npm run build
  staticHosting:
    enabled: true
    path: packages/frontend
    folder: dist
    buildCommand: npm run build:fabric
    indexDocument: index.html
    assetAccess: protected
```

Service `path` values are relative to the project root. Build commands run from the resolved service directory. Functions initialization also records `services.functions.path` when it selects a workspace package such as `packages/functions`. Flat projects can use the existing `rayfin/functions` location. See [Use Functions](functions.md#understand-the-project-layout).

The configuration includes these key fields:

#### Top-level fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | Project slug used as the Docker Compose project name and Fabric item identifier. |
| `name` | `string` | Yes | Human-readable project display name. |
| `version` | `string` | Yes | Project version (semver). |
| `services` | `object` | Yes | Service configuration block. |

#### `services.data`

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `false` | Enable the data service. |
| `dialect` | `string` | — | Use `mssql` for a SQL database in Fabric. Required when Data is enabled. |
| `path` | `string` | — | Data package directory relative to the project root, such as `packages/data`. Flat templates can use `rayfin/data`. |
| `buildCommand` | `string` | — | Build command for the configured data package. |

#### `services.storage`

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `false` | Enable remote file storage. Requires `services.data.enabled: true`. |
| `path` | `string` | `.` | Storage project root, relative to the app root. For example, `packages/storage`. |

Storage runs on Fabric, including during development.
It doesn't use a local storage service or emulator.
Declare folders and their access policies under `rayfin/storage/` in the configured storage project root.
For setup instructions, see [Store and manage files](storage.md).

#### `services.auth`

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `false` | Enable the auth service. |
| `expiryInMinutes` | `number` | — | JWT token expiry in minutes. |
| `customClaims` | `Record<string, string>` | — | Custom claims added to issued JWTs. |
| `scopes` | `string[]` | — | OAuth scopes (for example, `["read:data", "write:data"]`). |
| `refreshToken.lifetimeInDays` | `number` | — | Refresh token lifetime in days. |
| `allowedRedirectUris` | `string[]` | `["http://localhost:5173"]` | Allowed redirect URIs for auth callbacks. |

**`services.auth.password`**

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | Enable email and password authentication for local development |

**`services.auth.fabric`**

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `false` | Enable Fabric brokered authentication (Microsoft Entra ID SSO). |
| `externalEntraExchange` | `boolean` | — | Enable direct delegated Entra token exchange and external-parent-host authentication when supported by the target environment. |

#### `services.staticHosting`

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `false` | Enable static content hosting. |
| `path` | `string` | — | Frontend package directory relative to the project root. |
| `root` | `string` | — | Legacy frontend root used by flat configurations. |
| `folder` | `string` | `"dist"` | Directory containing built static assets relative to the resolved frontend path. |
| `buildCommand` | `string` | — | Shell command to run before packaging (for example, `npm run build`). |
| `indexDocument` | `string` | — | Default document served for the root path (for example, `index.html`). |

> [!TIP]
> All string values support environment variable interpolation with `${VAR}` and `${VAR:-default}` syntax. Variables are resolved from `rayfin/.env` and the shell environment.

### rayfin/.env

The `rayfin/.env` file contains the active runtime and deployment values and supplies values to `rayfin.yml` through interpolation. The CLI writes framework-neutral `RAYFIN_PUBLIC_*` values for the active backend. Only variables with that prefix are projected into generated frontend environment files. Never put secrets in `RAYFIN_PUBLIC_*` variables.

Keep `rayfin/.env` out of source control. Use `rayfin/.env.example` to document expected variables with placeholders.

### rayfin/.deployments.json

The deployment registry records backend URLs, hosting URLs, item IDs, and workspace IDs for your project's deployments. It isn't a frontend environment file. Keep it out of source control. Use `npx rayfin up list` to list recorded deployments and `npx rayfin up switch <name>` to switch the active deployment and regenerate its environment values.

### rayfin/tsconfig.json

Templates provide TypeScript configuration for their layout. Workspace packages have their own configurations and project references; flat templates can compile entities through `rayfin/tsconfig.json`. Preserve the scaffold's references and use its build and type-check scripts rather than assuming a single root compilation.

## Data model files

Keep runtime registration and client-facing types aligned for your chosen layout.

### Workspace entities and shared contracts

In Universal App, files under `packages/data/src/` define decorated entity classes. Register the runtime classes in the `schema` array exported by `packages/data/src/index.ts`.

Maintain matching record interfaces and the `UniversalAppSchema` type in `packages/shared/src/index.ts`. The frontend imports this contract from `@rayfin-app/shared` instead of importing decorated backend classes.

### Flat-template entities

In a flat template, `rayfin/data/*.ts` defines entities and `rayfin/data/schema.ts` maps entity names to types for `client.data.<Entity>`. Follow the registration mechanism supplied by that template.

## Storage files

The optional `rayfin/storage/` folder under the storage project root contains classes decorated with `@blob()` and a `schema.ts` file that registers them.
When you omit `services.storage.path` or set it to `.`, add these files under your app's `rayfin/storage/` folder.
For example, `services.storage.path: packages/storage` places these files under `packages/storage/rayfin/storage/`.
Export a `schema` array that lists the folders to deploy to Fabric.
The `AppStorageSchema` type maps folder names to classes for typed client access.
For an example, see [Store and manage files](storage.md).

## Generated artifacts

### rayfin/.temp/

The `rayfin/.temp/` folder contains generated backend artifacts that are created when you run the development server. If the backend appears to be using stale schema or configuration, stop and restart the dev stack to regenerate these files.

> [!IMPORTANT]
> Don't commit the `.temp/` folder to your repository. Add it to your `.gitignore` file.

## Frontend structure

The default frontend is in `packages/frontend/src/`. Flat templates can use root `src/`. The `services.staticHosting.path` setting identifies the frontend package.

### Active environment and framework mapping

`rayfin dev` and `rayfin up` generate framework-specific `.env.local` values from `rayfin/.env`. For a nested frontend, the file is written under `services.staticHosting.path`, such as `packages/frontend/.env.local`; flat projects use the project root.

| Source in `rayfin/.env` | Vite output in `.env.local` | Next.js output in `.env.local` |
| --- | --- | --- |
| `RAYFIN_PUBLIC_API_URL` | `VITE_RAYFIN_API_URL` | `NEXT_PUBLIC_RAYFIN_API_URL` |
| `RAYFIN_PUBLIC_PUBLISHABLE_KEY` | `VITE_RAYFIN_PUBLISHABLE_KEY` | `NEXT_PUBLIC_RAYFIN_PUBLISHABLE_KEY` |
| `RAYFIN_PUBLIC_ITEM_ID` | `VITE_FABRIC_ITEM_ID` | `NEXT_PUBLIC_FABRIC_ITEM_ID` |
| `RAYFIN_PUBLIC_WORKSPACE_ID` | `VITE_FABRIC_WORKSPACE_ID` | `NEXT_PUBLIC_FABRIC_WORKSPACE_ID` |
| `RAYFIN_PUBLIC_PORTAL_URL` | `VITE_FABRIC_PORTAL_URL` | `NEXT_PUBLIC_FABRIC_PORTAL_URL` |

Edit the source values in `rayfin/.env`, not the generated file. To regenerate without deploying:

```bash
npx rayfin env --framework vite
```

Use `--framework nextjs` or `--framework plain` for other supported mappings. Use `--output <dir>` to choose an output directory or `--show` to inspect the public mapping without writing. Keep generated `.env.local` files out of source control.

### Migrate an older environment layout

Older projects might contain `.env.fabric` or `.env.fabric-<workspace>` files. These files aren't the active environment files in the current layout. Run `npx rayfin up` to use the current environment workflow. Review any migration messages, and copy custom values into `rayfin/.env` as needed. The deployment registry replaces per-workspace environment files. Don't configure new apps to depend on them.

## Related content

- [Create your first Fabric Apps project](create-app.md)
- [Rayfin CLI reference](cli-reference.md)
