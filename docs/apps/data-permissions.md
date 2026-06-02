---
title: Define data permissions
description: Learn how to use the @role decorator to define authorization rules, row-level security, and field-level permissions for Fabric Apps.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 06/02/2026
ai-usage: ai-assisted
---

# Define data permissions

Fabric Apps uses the `@role` decorator to attach authorization rules directly to your data models. Permissions are type-safe, refactor-friendly, and automatically compiled into the underlying data access configuration.

## Before you begin

- Understand the difference between authentication (who you are) and authorization (what you can do)
- Review [Configure authentication](authentication.md) to set up identity verification
- Understand [Data models overview](data-models.md) for entity basics

## Built-in roles

Fabric Apps recognizes the built-in `authenticated` role. You can also define custom roles in your policies when needed.

| Role            | Description                  | Use case                           |
|-----------------|------------------------------|-------------------------------------|
| `authenticated` | Requires a valid user session with Fabric authentication | User-specific data, protected resources |

## The `@role` decorator

Apply `@role` at the class level to control which roles can perform which actions on an entity:

```typescript
@role(roleName, actions, options?)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleName` | `string` | The role name, such as `'authenticated'` or a custom application role |
| `actions` | `string \| string[]` | Single action or array: `'create'`, `'read'`, `'update'`, `'delete'`, or `'*'` for all |
| `options` | `object` | Optional object with `check`, `include`, and `exclude` properties |

## Basic example

Restrict authenticated users to their own data:

```typescript
import { entity, role, uuid, text } from '@microsoft/rayfin-core';

@entity()
@role('authenticated', ['create', 'read', 'update', 'delete'], {
  policy: (claims, item) => claims.sub.eq(item.userId),
})
export class Todo {
  @uuid() id!: string;
  @text() title!: string;
  @text({ optional: true }) description?: string;
  @text() userId!: string;
}
```

In this example:

- Authenticated users can access only Todo items where `userId` matches their JWT `sub` claim.

## Type-safe policy expressions

The `policy` callback provides typed access to both claims and entity fields. TypeScript infers the entity type from the decorated class, giving you autocompletion and refactor safety:

```typescript
policy: (claims, item) => claims.sub.eq(item.userId)
```

### Supported claims

| Claim | Description | Example value |
| ------- | ------------- | --------------- |
| `claims.sub` | Subject identifier (user ID) | `00000000-0000-0000-0000-000000000001` |
| `claims.email` | User email address | `user@contoso.com` |
| `claims.role` | User role (if provided by identity provider) | `admin` |

### Expression operators

| Operator | Example | Description |
| ---------- | --------- | ------------- |
| `.eq()` | `claims.sub.eq(item.userId)` | Equality check |

### Logical operators

Combine expressions with `.and()` and `.or()`:

```typescript
// User must own the item AND item must be active
@role('authenticated', 'read', {
  policy: (claims, item) =>
    claims.sub.eq(item.userId).and(item.isActive.eq(true))
})

// User is admin OR user owns the item
@role('authenticated', ['update', 'delete'], {
  policy: (claims, item) =>
    claims.role.eq('admin').or(claims.sub.eq(item.ownerId))
})
```

Both sides are parenthesized automatically for correct grouping.

## Field-level permissions

Specify the fields a role can access using `include` or `exclude` in the role options.

### Include specific fields

Only allow the `title` field during create operations:

```typescript
@entity()
@role('authenticated', 'create', {
  policy: (claims, item) => claims.sub.eq(item.createdBy),
  include: ['title'],
})
export class Document {
  @uuid() id!: string;
  @text() title!: string;
  @text({ optional: true }) content?: string;
  @text() createdBy!: string;
}
```

### Exclude specific fields

Hide sensitive fields from read operations:

```typescript
@entity()
@role('authenticated', 'read', {
  exclude: ['lastLogin', 'passwordHash'],
})
export class User {
  @uuid() id!: string;
  @text() email!: string;
  @date({ optional: true }) lastLogin?: Date;
  @text() passwordHash!: string;
}
```

> [!NOTE]
> Field arrays are typed to the entity's actual property names. Renaming a field produces a compile-time error in every `include` or `exclude` list that references it.

## Action-specific permissions

Apply different rules per action using multiple `@role` decorators:

```typescript
@entity()
@role('authenticated', 'create', {
  policy: (claims, item) => claims.sub.eq(item.createdBy),
  include: ['title', 'content'],
})
@role('authenticated', 'read', {
  policy: (claims, item) => claims.sub.eq(item.createdBy),
})
@role('authenticated', 'update', {
  policy: (claims, item) => claims.sub.eq(item.createdBy),
  exclude: ['adminNotes'],
})
@role('authenticated', 'delete', {
  policy: (claims, item) => claims.sub.eq(item.createdBy),
})
export class SecureDocument {
  @uuid() id!: string;
  @text() title!: string;
  @text({ optional: true }) content?: string;
  @text({ optional: true }) adminNotes?: string;
  @text() createdBy!: string;
}
```

This configuration:

- **Create**: Only the creator can create, and only `title` and `content` fields are allowed.
- **Read**: Only the creator can read their own documents.
- **Update**: Only the creator can update, but they can't modify `adminNotes`.
- **Delete**: Only the creator can delete.

## How permissions work

- **Metadata collection**: The `@role` decorator collects permission metadata when the class is defined.
- **Schema generation**: When you run `db apply`, the CLI reads metadata and generates permission configuration.
- **Policy compilation**: TypeScript policy callbacks are compiled into data access policy expressions (for example, `@claims.sub eq @item.userId`).
- **Runtime enforcement**: The data access layer enforces permissions on every API request.
- **Conflict detection**: Multiple `@role` decorators on the same class are aggregated per role, with warnings for conflicting declarations.

## Common patterns

### Owner-only access

```typescript
@entity()
@role('authenticated', '*', {
  policy: (claims, item) => claims.sub.eq(item.ownerId)
})
export class PrivateNote {
  @uuid() id!: string;
  @text() ownerId!: string;
  @text() content!: string;
}
```

### Full access for authenticated users

```typescript
@entity()
@role('authenticated', '*')
export class BlogPost {
  @uuid() id!: string;
  @text() title!: string;
  @text() content!: string;
}
```

### Admin override

```typescript
@entity()
@role('authenticated', ['create', 'read', 'update'], {
  policy: (claims, item) =>
    claims.role.eq('admin').or(claims.sub.eq(item.ownerId))
})
@role('authenticated', 'delete', {
  policy: (claims, _item) => claims.role.eq('admin')
})
export class ManagedResource {
  @uuid() id!: string;
  @text() ownerId!: string;
  @text() name!: string;
}
```

Admins can modify any resource, but only admins can delete.

## Next steps

- [Configure authentication](authentication.md) to set up identity providers
- [Query data with GraphQL](read-write-data-graphql.md) to test permission-protected queries
- [CLI command reference](cli-reference.md) for schema generation commands
