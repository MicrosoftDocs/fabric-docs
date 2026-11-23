---
title: Read and write data with GraphQL in Fabric Apps
description: Learn how to read and write data using the type-safe GraphQL client in Microsoft Fabric Apps, including filtering, pagination, and relationship navigation.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 06/02/2026
ai-usage: ai-generated
---

# Read and write data with GraphQL in Fabric Apps

Fabric Apps provides a type-safe GraphQL client that lets you perform create, read, update, and delete operations without writing raw queries. The client generates GraphQL automatically from your method calls and returns typed entities based on your data model definitions.

## Prerequisites

- A Fabric Apps project with data models defined. See [Define data models](data-models.md).
- The backend services running locally or deployed to Fabric.

## Initialize the client

Instantiate `RayfinClient` with your backend URL, publishable key, and schema type:

```typescript
import { RayfinClient } from '@microsoft/rayfin-client';
import type { UniversalAppSchema } from '@rayfin-app/shared';

const client = new RayfinClient<UniversalAppSchema>({
  baseUrl: import.meta.env.VITE_RAYFIN_API_URL,
  publishableKey: import.meta.env.VITE_RAYFIN_PUBLISHABLE_KEY,
});
```

The generic type argument enables TypeScript to provide autocomplete and type checking for all data operations.

These examples assume that you enabled Data and registered `Note` and `Notebook` in the Universal App's `packages/data/src/index.ts` and shared schema contract. In a flat template, import your schema type from `rayfin/data/schema.ts` instead. See [Define data models](data-models.md#register-entities-in-the-schema).

## Read data

Access entity collections through `client.data.<EntityName>`. The fluent API provides methods for querying, filtering, sorting, and pagination.

### Fetch a page of records

`execute()` returns only one page, with 100 records by default. It doesn't return cursor metadata or fetch subsequent pages. Use [forward pagination](#paginate-large-result-sets) for lists that can grow beyond one page.

```typescript
const notes = await client.data.Note.select([
  'id',
  'title',
  'content',
  'createdAt',
  'isPinned',
]).execute();
```

### Fetch a single record by primary key

```typescript
const note = await client.data.Note.findById('00000000-0000-0000-0000-000000000000');
```

`findById()` returns `null` if no record exists. The released implementation selects only the primary key, so don't assume that other entity fields are populated. Select fields explicitly when you need their values:

```typescript
const notes = await client.data.Note.select(['id', 'title', 'content'])
  .where({ id: { eq: '00000000-0000-0000-0000-000000000000' } })
  .first(1)
  .execute();

const note = notes[0] ?? null;
```

### Filter records

Use the `where()` method to filter results:

```typescript
const pinnedNotes = await client.data.Note.select([
  'id',
  'title',
  'isPinned',
])
  .where({ isPinned: { eq: true } })
  .execute();
```

#### Filter operators

| Operator | Description | Example |
|----------|-------------|---------|
| `eq` | Equals | `{ status: { eq: 'active' } }` |
| `neq` | Not equals | `{ status: { neq: 'archived' } }` |
| `gt` | Greater than | `{ age: { gt: 18 } }` |
| `gte` | Greater than or equal | `{ age: { gte: 21 } }` |
| `lt` | Less than | `{ price: { lt: 100 } }` |
| `lte` | Less than or equal | `{ price: { lte: 50 } }` |
| `contains` | Contains substring | `{ title: { contains: 'draft' } }` |

### Sort results

Use `orderBy()` to sort query results:

```typescript
const notes = await client.data.Note.select([
  'id',
  'title',
  'createdAt',
])
  .orderBy({ createdAt: 'desc' })
  .execute();
```

Sort by multiple columns:

```typescript
const notes = await client.data.Note.select([
  'id',
  'title',
  'isPinned',
  'createdAt',
])
  .orderBy({ isPinned: 'desc' })
  .orderBy({ createdAt: 'desc' })
  .execute();
```

### Navigate relationships

When you define relationships with `@one()` and `@many()` decorators, you can include related entity fields in the same query:

```typescript
const notes = await client.data.Note.select([
  'id',
  'title',
  'content',
  'notebook.id',
  'notebook.name',
])
  .execute();
```

Each note includes its associated notebook data without requiring a separate query.

## Paginate large result sets

Use cursor-based pagination for large lists:

```typescript
const page = await client.data.Note.select([
  'id',
  'title',
  'createdAt',
])
  .orderBy({ createdAt: 'desc' })
  .orderBy({ id: 'asc' })
  .first(25)
  .executePaginated();

console.log('Items:', page.items);
console.log('Has next page:', page.hasNextPage);
console.log('End cursor:', page.endCursor);
```

Fetch the next page using the cursor:

```typescript
if (page.hasNextPage) {
  if (!page.endCursor) {
    throw new Error('The next page is missing its cursor.');
  }
  const nextPage = await client.data.Note.select([
    'id',
    'title',
    'createdAt',
  ])
    .orderBy({ createdAt: 'desc' })
    .orderBy({ id: 'asc' })
    .first(25)
    .after(page.endCursor)
    .executePaginated();
}
```

> [!NOTE]
> The backend doesn't populate the `totalCount` property on the `PagedResult` type. The `page.items.length` value counts only the current page, not all matching records.

To process every matching record, continue forward until `hasNextPage` is `false`. Keep selections, filters, and sort order unchanged across requests.

```typescript
let cursor: string | undefined;
let matchingRecords = 0;

while (true) {
  let query = client.data.Note.select(['id'])
    .where({ isArchived: { eq: false } })
    .orderBy({ id: 'asc' })
    .first(100);

  if (cursor !== undefined) {
    query = query.after(cursor);
  }

  const page = await query.executePaginated();
  matchingRecords += page.items.length;

  if (!page.hasNextPage) {
    break;
  }
  if (!page.endCursor) {
    throw new Error('The next page is missing its cursor.');
  }
  cursor = page.endCursor;
}

console.log('Records read across all pages:', matchingRecords);
```

Paging doesn't provide a snapshot across requests. Concurrent changes can affect the records you read and count.

## Aggregate and group data

Use `aggregate()` for server-side totals and `groupBy()` for per-group summaries. The standalone fluent `count()` method isn't available, but `count` is supported inside an aggregation specification.

All five aggregate operations (`sum`, `avg`, `min`, `max`, and `count`) require a numeric field. Don't count a UUID `id` or a text field. For example, the following query assumes a registered `Product` entity with a required numeric `stockQuantity` field:

```typescript
const totals = await client.data.Product.where({ isAvailable: { eq: true } })
  .aggregate({
    matchingProducts: { count: 'stockQuantity' },
    totalStock: { sum: 'stockQuantity' },
    averageStock: { avg: 'stockQuantity' },
    lowestStock: { min: 'stockQuantity' },
    highestStock: { max: 'stockQuantity' },
  })
  .execute();

console.log(totals[0].aggregations.matchingProducts);
```

`count` counts non-null values of the specified numeric field. Use a required numeric field to count matching rows. If your entity has no suitable field, count identifiers across *all* pages as shown earlier, not just one page.

For grouped totals:

```typescript
const groups = await client.data.Product.groupBy(['status'])
  .aggregate({
    matchingProducts: { count: 'stockQuantity' },
    totalStock: { sum: 'stockQuantity' },
  })
  .execute();

for (const row of groups) {
  console.log(row.fields.status, row.aggregations.totalStock);
}
```

Aggregation results are arrays with `fields` and `aggregations` objects. A grand total has one row with an empty `fields` object. `count` returns a `number`; the other operations return `number | null` for empty or all-null inputs.

Apply `where()` before aggregation. Don't combine aggregation with row selection, ordering, or paging through `select()`, `orderBy()`, `first()`, or `after()`.

## Create records

Use the `create()` method to insert new records:

```typescript
const newNote = await client.data.Note.create({
  title: 'Meeting notes',
  content: 'Discussion points from the team sync',
  isPinned: false,
  isArchived: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  user_id: 'user-123',
});
```

The method returns the created record, including its autogenerated `id`. Use an explicit selected read when you need additional stored fields.

### Create records with relationships

When creating entities that have relationships, pass either the full related object or an object with just the primary key:

```typescript
// Option 1: Pass just the ID
const note = await client.data.Note.create({
  title: 'Weekly summary',
  content: 'Summary of this week',
  notebook: { id: '22222222-3333-4444-5555-666666666666' },
  isPinned: false,
  isArchived: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Option 2: Select the related fields you need before creating the note.
const notebooks = await client.data.Notebook.select(['id', 'name'])
  .where({ id: { eq: '22222222-3333-4444-5555-666666666666' } })
  .first(1)
  .execute();
const notebook = notebooks[0];
if (!notebook) {
  throw new Error('Notebook not found.');
}

const noteWithNotebook = await client.data.Note.create({
  title: 'Weekly summary',
  content: 'Summary of this week',
  notebook,
  isPinned: false,
  isArchived: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

Both forms produce the same result. Use the first form when you already know the related entity's ID and want to avoid an extra fetch.

The client uses the related object's primary key to set the relationship. Passing an object doesn't create or update the related notebook.

## Update records

Use the `update()` method to modify existing records. Pass a filter object and an object containing the fields to update:

```typescript
await client.data.Note.update(
  { id: 'note-123' },
  {
    title: 'Updated title',
    updatedAt: new Date(),
  }
);
```

### Update relationships

To change a relationship, pass the new related entity or just its ID:

```typescript
// Move a note to a different notebook
await client.data.Note.update(
  { id: 'note-123' },
  { notebook: { id: 'new-notebook-789' } }
);
```

## Delete records

Use the `delete()` method to remove records matching a filter:

```typescript
await client.data.Note.delete({ id: 'note-123' });
```

The method resolves when the backend confirms deletion. If no records match the filter, the method still succeeds.

## Create or update a record

Use `upsert(where, create, update)` to create a missing record or update an existing one. Supply the same ID in the lookup and the create input:

```typescript
const id = '11111111-2222-3333-4444-555555555555';
const now = new Date();

await client.data.Note.upsert(
  { id },
  {
    id,
    title: 'Daily summary',
    content: 'Summary of today',
    isPinned: false,
    isArchived: false,
    createdAt: now,
    updatedAt: now,
    user_id: 'user-123',
  },
  { title: 'Daily summary', updatedAt: now },
);
```

This helper performs a read followed by a separate create or update. It isn't atomic, and concurrent calls can race. Don't use it as a transaction or concurrency guarantee.

## Handle authentication

Sign in before performing protected data operations. For a deployed backend, use the app's configured [Microsoft Entra sign-in flow](fabric-authentication.md). The following email and password example is for a local backend only:

```typescript
await client.auth.signIn({ email, password });

// All subsequent data calls include authentication context
const notes = await client.data.Note.select(['id', 'title']).execute();
```

The client automatically attaches the authentication session to all data API calls. You don't need to pass tokens manually.

## Best practices

- **Select only needed fields** – Fetch only the fields you use to reduce payload size and improve performance.
- **Use pagination for large lists** – Avoid fetching thousands of records at once by using `first()` and `executePaginated()`.
- **Batch relationship queries** – Include related entity fields in the same query rather than making separate requests.
- **Cache frequently accessed data** – Store static reference data in memory to reduce API calls.

## Current limitations

- A standalone `count()` method isn't available. Use a numeric-field [aggregation](#aggregate-and-group-data), or count records across all pages. An array's length counts only the records returned in that page.
- Many-to-many relationships aren't supported. Use an explicit join entity with two `@one()` navigation decorators.
- The `totalCount` property on `PagedResult` isn't populated by the backend.

## Related content

- [Define data models](data-models.md)
- [Configure authentication](authentication.md)
- [Deploy to Fabric](deploy-app.md)
