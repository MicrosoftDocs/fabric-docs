---
title: What is Fabric Apps?
description: Learn about Microsoft Fabric Apps, a platform for building and deploying backend services with TypeScript data models, authentication, and static hosting on Microsoft Fabric.
ms.reviewer: mksuni
ms.topic: overview
ms.date: 11/13/2026
ai-usage: ai-assisted
ms.search.form: Fabric Apps overview
---

# What are Fabric Apps?

Fabric Apps is built on the Rayfin SDK and enables developers to create data-driven applications on Fabric using a unified development workflow. Developers define data models in TypeScript, and Fabric Apps automatically generates APIs, handles authentication, provides hosting, and integrates with Fabric services. Fabric Apps supports TypeScript for data models, client code, and application logic. Learn more in the [Rayfin SDK overview](/javascript/api/fabric-apps-sdk-javascript/rayfin-overview).

## Key features

Fabric Apps provides these capabilities:

- **Data models to APIs** – Decorate TypeScript classes with `@entity()`, `@text()`, `@uuid()`, and other decorators. Fabric Apps generates database schemas and GraphQL endpoints automatically.
- **Server-side functions** - Run TypeScript logic on the server and call it from your frontend through the typed client. Access app data, work with secrets, and call external APIs. See [Use Functions in Fabric Apps](functions.md).
- **Bring your own data with connectors** - Add typed access to an existing lakehouse, warehouse, SQL database in Fabric, or semantic model. Supported operations depend on the connector. See [Connect Fabric Apps to Fabric data](connectors.md).
- **File storage** - Define typed folders, control access with authenticated policies, and upload, download, list, and delete files in Fabric. See [Store and manage files](storage.md).
- **Type-safe clients** – The client SDK validates queries and mutations before they reach the backend, catching errors during development.
- **Built-in authentication** – Session management, token handling, and authentication flows are included. Configure Fabric SSO for deployed applications or use email and password during local development.
- **Static hosting** – Build and serve your frontend application alongside your backend APIs. Require Fabric item access or allow anonymous access to hosted assets.
- **Development workflow** - Scaffold projects, develop with GitHub Copilot or other coding agents, and deploy to Fabric using the Rayfin CLI. Use Fabric-backed services during development or Docker for supported local services. File storage uses Fabric storage in both development and deployment.

## Regions supported

For region availability, see [Fabric region availability](../admin/region-availability.md).

## Prerequisites

### License and workspace

Workspace requirements depend on your app's licensing option:

- For a capacity-backed app, assign Fabric capacity or an active Fabric trial capacity to the workspace. App services consume capacity units from that capacity.
- For the Power BI Pro experience, use a Pro workspace. You don't need to assign Fabric capacity. The [Power BI Pro limits](licensing.md#power-bi-pro-limits) apply.

For licensing requirements, see [Choose a licensing option for Fabric Apps](licensing.md). To create an app with either option, follow [Create an app from the portal](create-app.md#create-an-app-from-portal).

### Tenant admin settings

A Fabric tenant administrator must enable the Fabric Apps workload before users can create items.

1. Sign in to the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal).
1. Navigate to **Tenant settings**.
1. Under **Fabric Apps**, toggle the setting to **Enabled**.
1. Choose whether to enable for the entire organization or specific security groups.
1. Select **Apply**.

Changes might take a few minutes to propagate.

## How it works

A Fabric app brings together frontend hosting and managed backend services. Your frontend uses the Rayfin client to access data APIs, invoke functions, manage files, and query connected data. Fabric manages the hosting, networking, and scaling. Deployed apps use Fabric SSO (Microsoft Entra ID single sign-on) for user authentication; other sign-in providers aren't available after deployment.

:::image type="content" source="media\overview\fabric-app-overview.png" alt-text="Screenshot showing Fabric app managed service and components." lightbox="media\overview\fabric-app-overview.png" border="true":::

When you deploy with the Rayfin CLI, Fabric provisions or updates the services enabled in `rayfin.yml`. Choose the services your app needs:

| Service | What it provides |
| --- | --- |
| Data and GraphQL APIs | Structured app data in a SQL database in Fabric, with schemas and APIs generated from your TypeScript data models and authorization rules. |
| Functions | Server-side TypeScript logic exposed through callable HTTP endpoints, with typed client calls and access to app data and external services. |
| File storage | OneLake-backed storage for documents, images, and attachments, with typed folders and authenticated access rules. Storage requires the Data service. |
| Authentication | Fabric SSO for deployed apps, so users sign in with their existing Fabric identity. |
| Static hosting | Your built frontend files served from a hosting URL, with protected or anonymous access to the static content. |

## Management in the Fabric portal

After deployment, you can manage your Fabric app directly in the Fabric portal.

A Fabric administrator can temporarily block other users from loading your app. As the app owner, you can still open the app. For more information, see [Block and unblock Fabric apps](../governance/block-unblock-fabric-apps.md?toc=/fabric/admin/TOC.json&bc=/fabric/admin/breadcrumb/toc.json).

If you own or use a blocked app, see [What happens when an app is blocked](../governance/block-unblock-fabric-apps.md?toc=/fabric/admin/TOC.json&bc=/fabric/admin/breadcrumb/toc.json#what-happens-when-an-app-is-blocked).

### Item permissions

Workspace roles don't supersede item-level permissions. To share an app with someone in your organization, they need **Run and interact** permission (Read and execute) to run the app and invoke the backend APIs.

| Permission | What it allows |
| --- | --- |
| **Run and interact** (default) | Open and use the deployed application. All workspace members receive this level by default. |
| **Edit (Write)** | Modify the Fabric app—deploy code with `rayfin up`, apply schema changes, update settings, and manage child services. |
| **Reshare** | Grant other users access to the Fabric app. Requires **admin** role on the workspace. |

Learn more about [Workspace roles](../fundamentals/roles-workspaces.md).

For the sharing workflow, related item permissions, and access requests, see [Share a Fabric app](share-app.md).

## Development with Rayfin CLI

The CLI scaffolds new projects, launches local infrastructure, syncs schema changes, and deploys to Fabric. Install it with `npm create @microsoft/rayfin@latest`.

Key commands:

| Command | Purpose |
| --------- | --------- |
| `npm create @microsoft/rayfin@latest` | Create a new project from a template. |
| `npx rayfin up` | Deploy your project to Fabric. |
| `npx rayfin up db apply` | Apply database schema changes. |

For a complete command reference, see [CLI reference](cli-reference.md).

### Data model decorators

Define data models using TypeScript decorators:

The default `blankapp` scaffold is a Universal App workspace. Data is opt-in: enable it before adding entities to `packages/data/src/`, and keep client-facing contracts in `packages/shared/src/`. Flat templates can use `rayfin/data/` instead. See [Define data models](data-models.md).

```typescript
import {
  entity,
  role,
  text,
  boolean,
  date,
  uuid,
} from '@microsoft/rayfin-core';

@entity()
@role('authenticated', '*', {
  policy: (claims, item) => claims.sub.eq(item.user_id),
})
export class Todo {
  @uuid() id!: string;
  @text({ min: 1, max: 100 }) title!: string;
  @boolean() isCompleted!: boolean;
  @date() createdAt!: Date;
  @date({ optional: true }) dueDate?: Date;
  @text({ max: 255 }) user_id!: string;
}

```

You can also connect to existing data rather than storing all data in the app's database. Connectors provide read access to a lakehouse through its SQL analytics endpoint, supported read and write operations on a warehouse or SQL database in Fabric, and queries against a semantic model. Connector access requires the appropriate source permissions; it doesn't grant access to the underlying data. See [Connect Fabric Apps to Fabric data](connectors.md).

For data and services outside these connectors, use functions to call external APIs and supported Azure and Fabric resources. External connections use the app identity's permissions, while access to the app's database through a function preserves the caller's permissions. Keep credentials and resource tokens on the server. See [Connect Functions to external resources](functions-connect-external-resources.md).

## When to use Fabric Apps

Fabric Apps is ideal for:

- **Rapid prototyping** – Go from idea to live URL in minutes with preconfigured infrastructure.
- **Internal tools and dashboards** – Build authenticated admin interfaces without writing backend boilerplate.
- **Data exploration and visualization** – Use connectors to query supported Fabric data items and display the results in custom frontends.
- **AI and agent applications** – Provide structured backend services for AI agents that need persistent state.

Fabric Apps might not be suitable for:

- Applications requiring complex multi-step transactions or stored procedures.
- Apps requiring sign-in providers other than Fabric SSO after deployment.

## Security responsibilities

**Fabric provides:** Fabric Single Sign on (Microsoft Entra ID), row-level security via `@role` decorators, HTTPS, PKCE, and workspace and item-level permissions.

**You're responsible for:**

- Keeping secrets, API keys, and sensitive data out of your code, frontend assets, and repository. Don't store secrets in frontend assets, regardless of the configured hosting access.
- What your app exposes through Fabric SSO controls sign-in since your code controls what authenticated users see and do.
- Granting only the permissions contributors need to deploy or manage the app.
- Legal and compliance accountability for the data your app collects, processes, and stores.

## Next steps

- [Create your first Fabric Apps project](create-app.md)
- [Define data models with decorators](data-models.md)
- [Connect Fabric Apps to Fabric data](connectors.md)
- [Add server-side functions](functions.md)
- [Connect functions to external resources](functions-connect-external-resources.md)
- [Store and manage files](storage.md)
- [Deploy to Fabric](deploy-app.md)
- [Configure authentication](authentication.md)
