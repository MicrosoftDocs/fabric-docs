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

The default `blankapp` template creates a Universal App workspace with Data disabled. Enable it with the template's data-modeling capability:

```bash
npm run pack:add -- data-modeling
```

This step adds a starter entity and shared contract. Put entity classes in `packages/data/src/`, register them in `packages/data/src/index.ts`, and maintain their client-facing contracts in `packages/shared/src/index.ts`. The data service uses `services.data.path: packages/data` in `rayfin/rayfin.yml`. When you configure Data manually for Fabric, also set `enabled: true` and `dialect: mssql`.

Flat templates can instead keep entities in `rayfin/data/` and use `rayfin/data/schema.ts`. Follow your configured service paths rather than creating a second data folder. See [Project structure](project-structure.md).

To create a data model, add the `@entity()` decorator to a TypeScript class. Then import the required decorators from `@microsoft/rayfin-core`:

```typescript
import { entity, uuid, text, date } from '@microsoft/rayfin-core';

@entity()
export class Todo {
  @uuid() id!: string;
  @text({ max: 200 }) title!: string;
  @text({ optional: true, max: 2000 }) description?: string;
  @date() createdAt!: Date;
  @date() updatedAt!: Date;
}
```

This entity generates a `Todo` table with columns for `id`, `title`, `description`, `createdAt`, and `updatedAt`.

> [!IMPORTANT]
> Give persisted text fields an explicit maximum length appropriate for your data. On Microsoft SQL Server, text without `max` generates `NVARCHAR(MAX)`, which can prevent GraphQL metadata generation. The examples use bounded text, including owner and foreign key strings. See [Troubleshoot data model issues](troubleshooting.md#data-api-returns-an-internal-server-error-after-deployment).

## Primary keys

Every entity uses a UUID `string` field named `id` as its primary key. If you don't declare `id` explicitly, Fabric Apps adds it to the schema automatically.

- The `id` field is optional during create operations—the server generates a UUID if you omit it.
- You can supply your own UUID at creation time if you prefer client-generated identifiers.
- Composite primary keys and custom key names aren't supported.

```typescript
@entity()
export class Note {
  @uuid() id!: string;  // UUID primary key, auto-generated when omitted
  @text({ max: 200 }) title!: string;
  @text({ max: 4000 }) content!: string;
}
```

## Supported data types

Use these decorators to define field types:

| Decorator | Type | Description |
| ----------- | ------ | ------------ |
| `@uuid()` | string | Unique identifier field. |
| `@text({ max: n })` | string | Text field with an explicit maximum length for persisted MSSQL columns. |
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
  @text({ max: 200 }) name!: string;
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
  @email({ unique: true, max: 254 }) email!: string;
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
  @text({ max: 200 }) name!: string;
  @date() createdAt!: Date;
  @many(() => Note) notes?: Note[];
}

@entity()
export class Note {
  @uuid() id!: string;
  @text({ max: 200 }) title!: string;
  @text({ max: 4000 }) content!: string;
  @date() createdAt!: Date;
  @text({ max: 36 }) notebook_id!: string;
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
  @text({ max: 36 }) notebook_id!: string;      // Foreign key field
  @one(() => Notebook) notebook?: Notebook;  // Navigation property
}
```

Custom foreign key names (`foreignKey`, `targetKey` options) aren't supported.

### Reference system entities

Fabric Apps doesn't support `@one()` relationships that point to system entities such as the built-in `USER` entity. To associate a row with the signed-in user, add a bounded `user_id` text field and populate it from the auth claims (typically `claims.sub`):

```typescript
@entity()
export class Task {
  @uuid() id!: string;
  @text({ max: 200 }) title!: string;
  @text({ max: 255 }) user_id!: string;  // System user ID from claims.sub
}
```

Filter rows by `user_id` in your role policies to enforce per-user access.

## Register entities in the schema

In a Universal App workspace, register runtime entity classes in `packages/data/src/index.ts`:

```typescript
import { Note } from './Note.js';
import { Notebook } from './Notebook.js';

export const schema = [Note, Notebook];
```

Keep the corresponding record interfaces and `UniversalAppSchema` map in `packages/shared/src/index.ts` aligned with those entities. The frontend imports `UniversalAppSchema` from `@rayfin-app/shared`; it doesn't import decorated runtime classes. Add `Product` to both registrations if you use the numeric aggregation examples in [Read and write data](read-write-data-graphql.md#aggregate-and-group-data).

For a **flat-template alternative**, map entity types in `rayfin/data/schema.ts`:

```typescript
import type { Note } from './Note.js';
import type { Notebook } from './Notebook.js';

export type NotesAppSchema = {
  Note: Note;
  Notebook: Notebook;
};
```

Update the registrations and schema types for your chosen layout whenever you create a new entity.

## Apply schema changes

After defining or modifying entities, apply the changes to the database. For the complete deployment and verification workflow, see [Apply and verify schema changes](apply-schema-changes.md).

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
- The entity is registered in your configured data package and shared schema, or in `rayfin/data/schema.ts` for a flat template.

## Related content

- [Query data with GraphQL](read-write-data-graphql.md)
- [Apply and verify schema changes](apply-schema-changes.md)
- [Define data permissions](data-permissions.md)
- [Deploy to Fabric](deploy-app.md)
