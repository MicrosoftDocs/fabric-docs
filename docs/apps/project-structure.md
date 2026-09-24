---
title: Fabric Apps project structure
description: Learn about the folder layout, configuration files, and key components in a Fabric Apps project.
ms.reviewer: mksuni
ms.topic: concept-article
ms.date: 06/02/2026
ai-usage: ai-assisted
---

# Fabric Apps project structure

Fabric Apps projects use a consistent folder layout so you can quickly find data models, backend configuration, and frontend code. This article explains the files and folders you're most likely to work with after you create a project.

## Folder layout

When you create a new Fabric Apps project, the template generates the following structure:

```text
your-project/
├── rayfin/
│   ├── data/
│   │   ├── schema.ts
│   │   └── *.ts
│   ├── .env
│   ├── rayfin.yml
│   └── tsconfig.json
├── src/
├── package.json
├── tsconfig.json
└── README.md
```

## Key configuration files

### rayfin/rayfin.yml

The `rayfin/rayfin.yml` file is the main configuration file for your Fabric Apps backend. It controls which services run during local development and supports environment variable interpolation for dynamic configuration values.

Full example:

```yaml
id: my-app
name: my-app
version: 1.0.0
services:
  auth:
    enabled: true
    expiryInMinutes: 60
    refreshToken:
      lifetimeInDays: 30
    customClaims:
      tenant: "default"
    scopes:
      - read:data
      - write:data
    allowedRedirectUris:
      - http://localhost:5173
      - http://localhost:5173/auth/callback
    password:
      enabled: true
    fabric:
      enabled: false
    passwordless:
      magicLink:
        enabled: false
        expiryMinutes: 15
      smsOtp:
        enabled: false
    email:
      enabled: false
      provider: smtp
      senderName: Rayfin Platform
      verificationTokenExpirationHours: 24
      passwordResetTokenExpirationMinutes: 30
      smtp:
        host: maildev
        port: 1025
        senderEmail: noreply@rayfin.local
        username: ""
        password: ""
        useSsl: false
        useStartTls: false
        webPort: 1080
  data:
    enabled: true
    dialect: mssql
  storage:
    enabled: false
  staticHosting:
    enabled: true
    root: .
    folder: dist
    buildCommand: npm run build
    indexDocument: index.html
```

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

#### `services.staticHosting`

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `false` | Enable static content hosting. |
| `root` | `string` | — | Root directory of the frontend project (relative to the project root). |
| `folder` | `string` | `"dist"` | Directory containing built static assets (relative to `root`). |
| `buildCommand` | `string` | — | Shell command to run before packaging (for example, `npm run build`). |
| `indexDocument` | `string` | — | Default document served for the root path (for example, `index.html`). |

> [!TIP]
> All string values support environment variable interpolation with `${VAR}` and `${VAR:-default}` syntax. Variables are resolved from `rayfin/.env` and the shell environment.

### rayfin/.env

The `rayfin/.env` file is an optional environment file used to supply values to `rayfin.yml` through interpolation. Don't commit secrets to your repository. Instead, create a `rayfin/.env.example` file for documentation purposes and add `.env` to your `.gitignore` file.

### rayfin/tsconfig.json

The `rayfin/tsconfig.json` file is a project-reference TypeScript configuration used by the Fabric Apps CLI to compile your entity definitions. It extends your root `tsconfig.json` and overrides the settings that Fabric Apps needs, such as `composite: true` and Node.js module resolution. You shouldn't need to edit this file directly.

## Data model files

### rayfin/data/*.ts

Files in the `rayfin/data/` folder define your entities. Entities are TypeScript classes decorated with `@entity()` plus field decorators like `@uuid()` and `@text()`. Each entity file exports a class that represents a data model in your application.

### rayfin/data/schema.ts

The `rayfin/data/schema.ts` file maps entity names to their classes. The Rayfin SDK client uses this map to provide type-safe access to entities through `client.data.<Entity>`. When you add a new entity, you must register it in this schema file.

## Generated artifacts

### rayfin/.temp/

The `rayfin/.temp/` folder contains generated backend artifacts that are created when you run the development server. If the backend appears to be using stale schema or configuration, stop and restart the dev stack to regenerate these files.

> [!IMPORTANT]
> Don't commit the `.temp/` folder to your repository. Add it to your `.gitignore` file.

## Frontend structure

The `src/` folder contains your frontend application code. The exact structure depends on which template you chose when creating your project, such as React or Vue.

Fabric Apps templates use the following Vite environment variables for frontend configuration:

- `VITE_RAYFIN_API_URL` – Base URL pointing the frontend at the Fabric Apps backend. Set this environment variable before running `npm run dev` to override the default.
- `VITE_RAYFIN_PUBLISHABLE_KEY` – Publishable key used for client authentication.
- `VITE_FABRIC_ITEM_ID` – Fabric item ID set by `rayfin up`. Written to `.env.fabric-<workspacename>` (and `.env.fabric`) during deployment. Used for Fabric brokered authentication.
- `VITE_FABRIC_WORKSPACE_ID` – Fabric workspace ID set by `rayfin up`. Written alongside `VITE_FABRIC_ITEM_ID` during deployment.

## Related content

- [Create your first Fabric Apps project](create-app.md)
- [Rayfin CLI reference](cli-reference.md)
