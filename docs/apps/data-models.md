---
title: Define data models for Fabric Apps
description: Learn how to define data models using TypeScript decorators in Microsoft Fabric Apps, including entity definitions and relationships.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 06/02/2026
ai-usage: ai-assisted
ms.search.form: Adding data models
---

# Define data models for Fabric Apps

Fabric Apps uses TypeScript decorators to define data models that generate database tables and APIs. You define each entity as a class decorated with `@entity()`, add field decorators for data types, and map relationships between entities.

For authorization and access control guidance, see [Define data permissions](data-permissions.md).

## Prerequisites

- A Fabric Apps project created with `npm create @microsoft/rayfin@latest` or initialized with `npx rayfin init`.
- Basic understanding of TypeScript classes and decorators.

## Define an entity

To create a data model, add the `@entity()` decorator to a TypeScript class. Then import the required decorators from `@microsoft/rayfin-core`:

```typescript
import { entity, uuid, text, date } from '@microsoft/rayfin-core';

@entity()
export class Todo {
  @uuid() id!: string;
  @text() title!: string;
  @text({ optional: true }) description?: string;
  @date() createdAt!: Date;
  @date() updatedAt!: Date;
}
```

This entity generates a `Todo` table with columns for `id`, `title`, `description`, `createdAt`, and `updatedAt`.

## Primary keys

Every entity uses a UUID `string` field named `id` as its primary key. If you don't declare `id` explicitly, Fabric Apps adds it to the schema automatically.

- The `id` field is optional during create operations—the server generates a UUID if you omit it.
- You can supply your own UUID at creation time if you prefer client-generated identifiers.
- Composite primary keys and custom key names aren't supported.

```typescript
@entity()
export class Note {
  @uuid() id!: string;  // UUID primary key, auto-generated when omitted
  @text() title!: string;
  @text() content!: string;
}
```

## Supported data types

Use these decorators to define field types:

| Decorator | Type | Description |
| ----------- | ------ | ------------ |
| `@uuid()` | string | Unique identifier field. |
| `@text()` | string | Text field with optional length constraints. |
| `@int()` | number | Integer field. |
| `@decimal()` | number | Decimal or numeric field. |
| `@boolean()` | boolean | True or false field. |
| `@date()` | Date | Date and time field, serializes from ISO strings or `Date` objects. |
| `@email()` | string | Text field with email validation. |
| `@set()` | string | Enumerated set of string literals. |

### Example with multiple types

```typescript
import { entity, uuid, text, int, decimal, boolean, date, set } from '@microsoft/rayfin-core';

@entity()
export class Product {
  @uuid() id!: string;
  @text() name!: string;
  @decimal() price!: number;
  @int() stockQuantity!: number;
  @boolean() isAvailable!: boolean;
  @date() createdAt!: Date;
  @set('draft', 'published', 'archived') status!: 'draft' | 'published' | 'archived';
}
```

## Type modifiers

Add modifiers to field decorators to configure validation and constraints:

| Modifier | Description |
| ---------- | ------------- |
| `{ optional: true }` | Allow NULL values. Fields are required by default. |
| `{ unique: true }` | Add a unique constraint. |
| `{ default: value }` | Set a default value expression. |
| `{ max: n }`, `{ min: n }` | String length constraints (maximum and minimum number of characters). |
| `{ min: n }`, `{ max: n }` | Numeric value constraints. |

> [!NOTE]
> The TypeScript optional marker (`?` after a property name) only affects the static TypeScript type. It doesn't make the database column nullable. To make a field nullable, add `{ optional: true }` to the decorator. Use `!` to assert that a required field is initialized by the framework.

### Example with modifiers

```typescript
@entity()
export class User {
  @uuid() id!: string;
  @email({ unique: true }) email!: string;
  @text({ min: 3, max: 50 }) username!: string;
  @text({ optional: true, max: 500 }) bio?: string;
  @int({ min: 0, max: 150 }) age!: number;
  @boolean({ default: false }) isVerified!: boolean;
}
```

## Define relationships

Use `@one()` and `@many()` decorators to define navigation properties between entities. Fabric Apps auto-generates foreign key columns when you define relationships.

- **One-to-many** – Use `@many()` on the parent and `@one()` on the child.
- **Many-to-one** – Use `@one()` on the child to reference the parent.
- Many-to-many relationships aren't supported—use an explicit join entity instead.

### Example with one-to-many relationship

```typescript
import { entity, uuid, text, date, one, many } from '@microsoft/rayfin-core';

@entity()
export class Notebook {
  @uuid() id!: string;
  @text() name!: string;
  @date() createdAt!: Date;
  @many(() => Note) notes?: Note[];
}

@entity()
export class Note {
  @uuid() id!: string;
  @text() title!: string;
  @text() content!: string;
  @date() createdAt!: Date;
  @text() notebook_id!: string;
  @one(() => Notebook) notebook?: Notebook;
}
```

When you define `@one(() => Notebook)` on the `Note` entity, Fabric Apps automatically creates a `notebook_id` foreign key column. Declare the foreign key field explicitly only if you plan to read or set it in application code.

### Foreign key naming convention

When you define a foreign key field, use the `{property}_id` naming convention:

```typescript
@entity()
export class Note {
  @uuid() id!: string;
  @text() notebook_id!: string;      // Foreign key field
  @one(() => Notebook) notebook?: Notebook;  // Navigation property
}
```

Custom foreign key names (`foreignKey`, `targetKey` options) aren't supported.

### Reference system entities

Fabric Apps doesn't support `@one()` relationships that point to system entities such as the built-in `USER` entity. To associate a row with the signed-in user, add a plain `user_id` field of type `@text()` and populate it from the auth claims (typically `claims.sub`):

```typescript
@entity()
export class Task {
  @uuid() id!: string;
  @text() title!: string;
  @text() user_id!: string;  // System user ID from claims.sub
}
```

Filter rows by `user_id` in your role policies to enforce per-user access.

## Register entities in the schema

Add all entity classes to `rayfin/data/schema.ts` so the client can generate GraphQL proxies:

```typescript
import type { Note } from './Note.js';
import type { Notebook } from './Notebook.js';

export type NotesAppSchema = {
  Note: Note;
  Notebook: Notebook;
};
```

Update this type whenever you create a new entity.

## Apply schema changes

After defining or modifying entities, apply the changes to the database:

1. Deploy the updated schema to Fabric:

   ```bash
   npx rayfin up db apply
   ```

1. If the schema change includes destructive operations (dropping columns, renaming tables), the CLI warns you and refuses to proceed. Use `--force` to override the safety check:

   ```bash
   npx rayfin up db apply --force
   ```

> [!NOTE]
> Using `--force` can cause data loss. Review the listed operations carefully before proceeding.

## Best practices

- Define foreign key fields only when you need to read or set them in code—Fabric Apps generates them automatically from navigation decorators.
- Use relative imports with `.js` extensions in entity files so the emitted ESM JavaScript resolves correctly.
- For authorization patterns and role-based access, see [Define data permissions](data-permissions.md).

## Troubleshooting

### Missing relationships

If relationships don't appear in the API, verify that:

- The navigation decorator (`@one()` or `@many()`) is present.
- The entity is registered in `rayfin/data/schema.ts`.

## Related content

- [Query data with GraphQL](read-write-data-graphql.md)
- [Define data permissions](data-permissions.md)
- [Deploy to Fabric](deploy-app.md)
