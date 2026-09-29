---
title: Programming model overview
description: Learn about the Fabric Apps programming model, including TypeScript decorators, schema generation, and how data models become production-ready APIs.
ms.reviewer: mksuni
ms.topic: concept-article
ms.date: 08/11/2026
ai-usage: ai-assisted
---

# Programming model overview

[Rayfin SDK](/javascript/api/fabric-apps-sdk-javascript/rayfin-overview) uses a decorator-driven programming model where you define your data schema once in TypeScript and automatically receive production-ready APIs, type-safe clients, and infrastructure.

## Key concepts

Rayfin SDK combines three core elements:

- **Decorator-driven schema**: Use TypeScript decorators to define data models, permissions, and relationships.
- **Automatic API generation**: Your decorated classes become GraphQL endpoints without writing controller code.
- **Type-safe clients**: Generated TypeScript clients provide compile-time validation for queries and mutations.

## How it works

When you create a Fabric app, your code flows through these stages:

| # | Stage | What happens |
| --- | --- | --- |
| 1 | Developer | You author the app in your editor of choice. |
| 2 | TypeScript | You write entity classes in TypeScript. |
| 3 | Decorators | You annotate classes and fields with `@entity`, `@uuid`, `@text`, `@role`, and other decorators. |
| 4 | Schema | The CLI compiles the decorated classes into a database schema, permission policies, and API configuration. |
| 5 | APIs | The schema is published as GraphQL endpoints. |
| 6 | Client | The generated `RayfinClient` exposes a type-safe data and auth client over those endpoints. |
| 7 | Application | Your frontend application consumes the client to read and write data. |

### 1. Define data models with decorators

You define your data structure using TypeScript classes and decorators from `@microsoft/rayfin-core`:

```typescript
import { entity, uuid, text, int } from '@microsoft/rayfin-core';

@entity()
export class Product {
  @uuid() id!: string;
  @text() name!: string;
  @text({ optional: true }) description?: string;
  @int() price!: number;
}
```

### 2. Schema generation

The Rayfin CLI (`npx rayfin`) analyzes your decorated classes and generates:

- **Database schema** - Tables, columns, constraints, and indexes
- **API configuration** - GraphQL endpoint definitions
- **Permission policies** - Row-level security and field-level access control

### 4. Type-safe client usage

GraphQL APIs are available to perform CRUD operations on your database. Rayfin SDK provides a data client operation out of the box to read or write or delete data.

```typescript
import { RayfinClient } from '@microsoft/rayfin-client';

const client = new RayfinClient();

// TypeScript knows about Product fields
const products = await client.data.products.query()
  .select(['id', 'name', 'price'])
  .execute();

// Compile-time error if field doesn't exist
const invalid = await client.data.products.query()
  .select(['nonexistentField'])  // ❌ TypeScript error
  .execute();
```

## Decorator reference

Rayfin SDK provides decorators for common data modeling patterns:

### Entity decorators

| Decorator | Purpose | Example |
| ----------- |---------|---------|
| `@entity()` | Mark a class as a database entity | `@entity() class Product` |

### Property decorators

| Decorator | Database type | TypeScript type |
| ----------- |--------------- |----------------- |
| `@uuid()` | UNIQUEIDENTIFIER | `string` |
| `@text()` | NVARCHAR | `string` |
| `@int()` | INT | `number` |
| `@decimal()` | DECIMAL | `number` |
| `@bool()` | BIT | `boolean` |
| `@date()` | DATETIME2 | `Date` |

### Permission decorators

| Decorator | Purpose |
| ----------- | --------- |
| `@role()` | Define role-based permissions |

See [Define data permissions](data-permissions.md) for authorization details.

## Functions

Create one `UserDataFunctions` instance, and register each function by calling `udf.func(name, handler, connections?)`.

Follow these rules when you define a function:

- Place the `RayfinContext` parameter anywhere in the handler signature. The runtime identifies it by type, injects it, and excludes it from the generated function inputs.
- Declare a connection for each delegated token the function needs. Omit the connections array for functions that only access app data or don't need delegated tokens.

The following example registers a plain function and a function that uses the invocation context:

```typescript
import {
  UserDataFunctions,
  type RayfinContext,
} from '@microsoft/fabric-user-data-functions';

// Match rayfin/data/schema.ts so getDataClient() is fully typed.
import type { TripPlan } from '../../data/TripPlan.js';

type AppSchema = { TripPlan: TripPlan };

const udf = new UserDataFunctions();

udf.func('greet', async (name: string): Promise<string> => {
  return `Hello, ${name}!`;
});

udf.func(
  'whoAmI',
  async (ctx: RayfinContext<AppSchema>): Promise<string> => {
    return ctx.accessToken ? 'authenticated' : 'anonymous';
  },
);
```

The `RayfinContext` provides the function's runtime services:

| Member | Purpose |
| --- | --- |
| `ctx.accessToken` | Provides the signed-in user's Rayfin JSON Web Token (JWT). Decode the `sub` claim to get a stable user ID. |
| `ctx.getToken(AudienceType.X)` | Gets a delegated, on-behalf-of token for a connection audience declared when you register the function. Replace `X` with the required audience. |
| `ctx.getSecret('NAME')` | Gets a secret for the current invocation. Returns `undefined` when the secret isn't set. |
| `ctx.getDataClient()` | Gets the typed data API for your entities. The client supports create, `findMany`, update, delete, and upsert operations. |
| `ctx.baseUrl` | Provides the Rayfin endpoint for the current item. |
| `ctx.publishableKey` | Provides the publishable key for the current item. |

For setup, local debugging, and deployment instructions, see [Use Functions in Fabric Apps](functions.md).

## Development workflow

A typical development cycle follows this pattern:

1. **Define or modify data models** - Add or update TypeScript classes with decorators
1. **Test locally with remote backend** - Run `npm run dev` to test your frontend code changes against your App backend in Fabric.
1. **Deploy to Fabric** - Run `npx rayfin up` to deploy to the managed Fabric service and applies your schema changes.

Changes to your TypeScript models automatically propagate through the entire stack — from database schema to API endpoints to client types.

## Authorization

Permissions are defined alongside your data models using the `@role` decorator:

```typescript
@entity()
@role('authenticated', ['create', 'read', 'update', 'delete'], {
  policy: (claims, item) => claims.sub.eq(item.userId)
})
export class UserDocument {
  @uuid() id!: string;
  @text() userId!: string;
  @text() content!: string;
}
```

This approach ensures:

- Security rules live next to the data they protect
- Type-safe policy expressions catch errors at compile time
- Refactoring entity fields automatically updates permission checks

## Related content

- [Data models overview](data-models.md)
- [Define data permissions](data-permissions.md)
- [Query data with GraphQL](read-write-data-graphql.md)
- [Use Functions in Fabric Apps](functions.md)
- [Manage function secrets](manage-function-secrets.md)
