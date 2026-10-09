---
title: Fabric Apps frequently asked questions (FAQ)
description: Answers to common questions about Microsoft Fabric Apps, including capabilities, limitations, deployment, and architecture.
ms.reviewer: mksuni
ms.topic: faq
ms.date: 09/15/2026
ai-usage: ai-generated
---

# Fabric Apps frequently asked questions (FAQ)

This article answers common questions about Fabric Apps.

## General

### What is Fabric Apps?

Fabric Apps is a backend platform that helps TypeScript developers build and deploy data-driven applications faster. You define data models using TypeScript decorators, and Fabric Apps generates GraphQL APIs, database schemas, and type-safe clients automatically.

### Who should use Fabric Apps?

Fabric Apps is ideal for developers building:

- Internal tools and dashboards
- Data exploration and visualization applications
- Rapid prototypes
- AI and agent applications that need persistent state

### What databases are supported?

Fabric Apps supports **SQL Server** – Default for Fabric deployments.

### Can I use Fabric Apps with existing databases?

No. Fabric Apps manages the database schema based on your TypeScript data models. You can't point it at an existing database with a predefined schema.

## Development

### How do I install CLI?

You can install [Rayfin CLI](https://www.npmjs.com/package/@microsoft/rayfin-cli) with `npm`. Since it's an npm package you can update with `npm update`.

```bash
npm i @microsoft/rayfin-cli
```

### Can I use Fabric Apps without TypeScript?

No. Data models must be defined using TypeScript decorators. The frontend application can use JavaScript, but the backend requires TypeScript for model definitions.

### What frontend frameworks are supported?

Fabric Apps works with any frontend framework that can make HTTP requests:

- React
- Vue
- Angular
- Svelte
- Vanilla JavaScript/TypeScript

The client SDK provides type-safe APIs for all frameworks.

## Authentication

### What authentication methods are supported?

| Environment | Supported methods |
| ------------- | ------------------- |
| Local development | Microsoft Entra SSO and Email/password |
| Deployed to Fabric | Microsoft Entra SSO only |

>[!NOTE]
>Email and password authentication doesn't work after deploying to Fabric.
>You can't deploy an app to Fabric unless authentication is enabled.

### Can I use custom authentication providers?

No. Fabric Apps supports Microsoft Entra single sign-on (SSO) and email/password only. You can't integrate other providers.

## Deployment

### Can I deploy an app without authentication enabled?

No. Fabric requires fabric authentication to be enabled before you deploy a Fabric App.

### Can I deploy to multiple environments (dev, staging, production)?

You can manually manage separate Fabric workspaces and deploy to different items.

### How long does deployment take?

Initial deployment typically takes 2-5 minutes. Subsequent deployments with `npx rayfin up staticapp deploy` (static content only) take 30-60 seconds.

### Can I roll back a deployment?

Redeploy the previous version by checking out the prior git commit and running `npx rayfin up`.

### How do I debug deployment failures?

- **Build errors** — Run `npm run build` before deploying. The most common deployment failure is a missing production build. After the build succeeds, run `npx rayfin up`.
- **Capacity or permission errors** — Verify that your workspace has Fabric capacity assigned and that you have permission to create or modify items in the workspace.
- **Database schema errors** — If the error occurs while applying the database schema, review the schema changes you made since the last successful deployment and resolve any conflicts.

## Data models

### Can I use composite primary keys?

No. Every entity must use a single UUID field named `id` as the primary key.

### Are many-to-many relationships supported?

No. Use an explicit join entity with two `@one()` navigation decorators instead.

### Can I write custom SQL queries?

Fabric Apps doesn't expose raw custom SQL through its generated API or connectors. Use the generated GraphQL client for app-owned data. To access an existing lakehouse, warehouse, or SQL database in Fabric, add a connector and use its typed operations.

## Performance and scale

### What are the performance limits?

Performance depends on your Fabric capacity. Contact your Fabric administrator for capacity-specific limits.

### Can I cache query results?

Yes. Implement client-side caching in your frontend application. The backend doesn't provide built-in caching.

### How do I optimize query performance?

- Select only the fields you need
- Use pagination for large result sets
- Include related entity fields in a single query rather than making multiple requests

## Security

### How is data secured?

- Authentication is required by default (configurable per entity)
- Row-level security policies filter data based on JWT claims
- All communication uses HTTPS in Fabric deployments

## Limitations

### What are the current limitations?

- `count()` isn't available on the fluent GraphQL client
- Many-to-many relationships aren't supported
- Composite primary keys aren't supported
- Custom authentication providers aren't supported
- Multiple environments management isn't available out of the box
- Workspace outbound access protection isn't supported at this time.
- Tenant-level and workspace-level private links aren't supported at this time.
- Application lifecycle management (ALM) isn't supported at this time.

See [Troubleshoot Fabric Apps](troubleshooting.md) for workarounds.

### Can I export my data?

Yes. Use the generated data client to read app-owned data, or use a connector to read from a supported Fabric data item. Select only the fields you need, page through large result sets, and generate the export in your application.

## Related content

- [What is Fabric Apps?](overview.md)
- [Create your first project](create-app.md)
- [Connect Fabric Apps to Fabric data](connectors.md)
- [Troubleshoot Fabric Apps](troubleshooting.md)
