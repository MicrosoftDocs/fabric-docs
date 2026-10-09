---
title: Connect Functions to external resources
description: Learn how Fabric Apps Functions use application authentication to connect to Fabric and Azure resources.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 09/25/2026
ai-usage: ai-generated
---

# Connect Functions to external resources

Deployed Functions call external Azure and Fabric resources as the app identity by using application authentication. Declare the audiences a function needs, and use platform-provided, resource-scoped tokens through `ctx.Tokens`.

Developer CLI sign-in and authoring-time endpoint discovery are separate from deployed runtime access. Verify the deployed app identity's permissions even when a developer can access the resource.

## Prerequisites

- A Fabric app with Functions initialized. For setup instructions, see [Use Functions in Fabric Apps](functions.md).
- `services.functions.auth.type` set to `application` in `rayfin/rayfin.yml`. For configuration details, see [Application authentication](functions.md#application-authentication).
- The app identity granted access to each external resource that the Functions code calls.

## Declare an external connection

Declare audiences in the `RayfinContext` annotation, and then read the scoped token from `ctx.Tokens`:

```typescript
import {
  UserDataFunctions,
  AudienceType,
  type RayfinContext,
} from '@microsoft/fabric-user-data-functions';

const udf = new UserDataFunctions();

udf.func(
  'accessStorage',
  async (
    ctx: RayfinContext<AppSchema, AudienceType.Storage>,
  ): Promise<string> => {
    const token: string = ctx.Tokens.Storage;
    // Use the token with the resource SDK or REST API.
    return 'ok';
  },
  [],
);
```

The annotation is the declaration. Listing an audience in `RayfinContext<Schema, Audiences>` registers the connection binding. Keep the third argument of `udf.func()` as `[]`.

`ctx.Tokens` is narrowed to the audiences that you declare. An undeclared audience causes a compile error:

```typescript
async (
  ctx: RayfinContext<AppSchema, AudienceType.Sql | AudienceType.Storage>,
) => {
  const sqlToken: string = ctx.Tokens.Sql;
  const storageToken: string = ctx.Tokens.Storage;
};
```

Token values have the `string` type. Declaring an audience registers its binding, but doesn't guarantee token availability or resource access. If the host doesn't supply a declared token, reading its `ctx.Tokens` property throws an error.

### Specify the schema argument

`RayfinContext` takes your app schema first. Use the same schema that you pass to `RayfinClient<AppSchema>` so the data client stays typed when you add audiences:

```typescript
async (ctx: RayfinContext<AppSchema, AudienceType.Sql>) => {
  const data = ctx.getDataClient();
  const token = ctx.Tokens.Sql;
};
```

If a function needs audiences but doesn't access Rayfin DB, pass the default schema explicitly:

```typescript
async (ctx: RayfinContext<Record<string, any>, AudienceType.Fabric>) => {
  const token = ctx.Tokens.Fabric;
};
```

## Supported audiences

`AudienceType` is the source of truth for supported audiences:

| External resource | `AudienceType` |
| --- | --- |
| Fabric lakehouse, warehouse, SQL database in Fabric, mirrored database, or Azure SQL Database | `Sql` |
| Fabric OneLake files, Azure Blob Storage, Azure Table storage, or Azure Queue Storage | `Storage` |
| Microsoft Fabric REST API | `Fabric` |
| Azure AI Foundry | `AzureAI` |
| Azure DevOps | `ADO` |

A Power BI semantic model isn't available through `ctx.Tokens`. Use the `fabric-semanticmodel` connector instead. For connector guidance, see [Connect to Fabric data](connectors.md).

## Understand deployment metadata

Type arguments are erased before a function runs. During `npx rayfin up`, the TypeScript compiler resolves the declared audiences and writes the union into deployment metadata. The Functions worker uses that metadata to bind the connections.

A type alias works when the Functions project has a `tsconfig.json`:

```typescript
type SqlAccess = AudienceType.Sql;

async (ctx: RayfinContext<AppSchema, SqlAccess>) => {
  const token = ctx.Tokens.Sql;
};
```

Prefer literal `AudienceType.X` values. If the Functions project has no `tsconfig.json`, the CLI can't use the compiler and instead reads the annotation syntax. In that mode, an alias resolves to its own name rather than the audience it represents. Treat the CLI warning about this fallback as an error to fix.

The context parameter must have an explicit `RayfinContext<...>` annotation. Type generation identifies the context parameter by this annotation. Without it, the parameter is treated as a request-body parameter.

## Grant resource permissions

For current Fabric apps, the app identity is the owner of the Fabric app item. External connections use this identity and its permissions, not the identity or permissions of the app user who invokes the function.

Grant the app identity the permissions required by every resource and API that the Functions code calls. Declaring an audience and deploying Functions register a token binding but don't grant permissions on the target resource.

Keep resource tokens on the server. Never return them as function results or send them to the frontend.

App sign-in and authorization to invoke a function are separate from the app identity's access to external resources.

### Rayfin DB identity

Rayfin DB uses a separate authentication path. `ctx.getDataClient()` uses the invocation's Rayfin token, so database access preserves the caller's identity and database permissions. Application authentication for Functions doesn't switch Rayfin DB access to the application identity.

## Use a token with an Azure SDK

Many Azure SDK clients expect a `TokenCredential` instead of a raw token string. Define an adapter that returns the token from the context:

```typescript
import type { TokenCredential, AccessToken } from '@azure/identity';

class ContextTokenCredential implements TokenCredential {
  constructor(private readonly token: string) {}

  async getToken(): Promise<AccessToken> {
    return {
      token: this.token,
      expiresOnTimestamp: Date.now() + 3600_000,
    };
  }
}
```

Pass `new ContextTokenCredential(ctx.Tokens.Storage)` or the appropriate declared token to an SDK client that requires a credential. Install resource SDK packages in `rayfin/functions/package.json`, not in the project root.

## Develop locally

`npx rayfin dev` and `npx rayfin dev functions apply` start a local Azure Functions Core Tools host. In the local Functions host, external resource tokens use the identity and permissions of the account that the app builder uses to sign in.

Deployed Functions instead use the app identity. A successful local call therefore doesn't prove that the deployed app identity has permission to access the resource. Test the deployed function after granting the app identity the required permissions.

## Related content

- [Use Functions in Fabric Apps](functions.md)
- [Connect to Fabric data](connectors.md)
- [Manage function secrets](manage-function-secrets.md)
- [Deploy a Fabric app to Fabric](deploy-app.md)
