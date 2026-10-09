---
title: Apply and verify schema changes in Fabric Apps
description: Learn how to apply Rayfin entity changes to a Fabric app database and verify that the schema reached the server.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 08/24/2026
ai-usage: ai-generated
---

# Apply and verify schema changes in Fabric Apps

Apply Rayfin entity changes to the database by using `rayfin up` or `rayfin up db apply`, and verify that the schema reached the server.

Editing a class in `rayfin/data/` doesn't change the deployed database by itself. Rayfin reads your entities and generates Data API Builder (DAB) configuration only when you explicitly apply the changes.

## Use `rayfin up` for application updates

Run `npx rayfin up` whenever you want to deploy your latest entity changes to a Fabric app:

```bash
npx rayfin up
```

This command:

- Synchronizes runtime settings.
- Applies the database schema generated from the decorators in `rayfin/data/`.
- Builds and deploys static content when `staticHosting` is enabled.

Run the command after every change to a file in `rayfin/data/`. After the first deployment, subsequent runs update the same deployment instead of creating a new one.

## Apply only database schema changes

Use `npx rayfin up db apply` when you want to apply the database schema without synchronizing runtime settings or deploying static content:

```bash
npx rayfin up db apply
```

This advanced subcommand is useful when you run the frontend with `npm run dev`, the backend is already deployed, and you want to iterate on the schema independently.

If a change might cause data loss, such as dropping a column, or renaming a table, the CLI blocks the operation and describes the potential impact. After you review the operations and accept the data loss, apply the change with `--force`:

```bash
npx rayfin up db apply --force
```

> [!CAUTION]
> The `--force` option can cause permanent data loss. Use it only after you review every operation reported by the CLI.

## Verify the deployed schema

> [!WARNING]
> A successful `rayfin up` or `rayfin up db apply` command doesn't guarantee that your frontend can immediately query a new or changed entity. Verify that the deployment is healthy before you test the entity.

After any change in `rayfin/data/`, check the deployment:

```bash
npx rayfin up status
```

If a new or changed entity still returns GraphQL errors after the deployment becomes healthy, apply the schema explicitly, and then test the entity again:

```bash
npx rayfin up db apply
```

Add `--force` only if the CLI reports a potentially destructive change and you accept the data loss.

For machine-readable deployment status, use JSON output:

```bash
npx rayfin up status --json
```

You can use the JSON response in a script that waits for a healthy deployment before running further checks.

## Follow a typical schema workflow

```bash
# 1. Edit an entity, such as rayfin/data/Todo.ts.
# 2. Apply the application changes.
npx rayfin up

# 3. Verify that the deployment is healthy.
npx rayfin up status

# 4. If the changed entity still fails, apply the schema explicitly.
npx rayfin up db apply
```

If step 4 reports a potentially destructive operation, review it before rerunning the command with `--force`.

## Troubleshoot schema changes

### GraphQL returns an internal server error

Check every `@text()` field on the affected entity for a missing `max` value. With Microsoft SQL Server, `@text()` without `max` generates an `NVARCHAR(MAX)` column, which can prevent GraphQL schema generation.

Add explicit maximum lengths, and then apply the schema:

```typescript
@text({ max: 200 })
title!: string;
```

```bash
npx rayfin up db apply --force
```

Review the reported operations before you use `--force`.

### The CLI reports a potentially destructive change

Review the listed operations, including dropped columns, narrowed types, and renamed tables. Rerun the command with `--force` only after you confirm that the data loss is acceptable.

### The schema apply fails

Run `npx rayfin up status`, and wait for the services to become healthy before you retry the schema apply.

### The data service has no dialect

When `services.data.enabled` is `true`, configure `dialect: mssql` in `rayfin/rayfin.yml`.

```yaml
services:
  data:
    enabled: true
    dialect: mssql
```

## Use an AI prompt

Copy the following prompt into GitHub Copilot or another coding agent that has access to your project and terminal:

```text
I just added a new field to an entity in my Rayfin project's rayfin/data/ folder. Run
`npx rayfin up` to apply the change, then run `npx rayfin up status` to confirm the
deployment is healthy. If querying the changed entity still fails after that, run
`npx rayfin up db apply` and check again. Review any potentially destructive operations with me before using `--force`.
```

## Related content

- [Define data models for Fabric Apps](data-models.md)
- [Read and write data with GraphQL](read-write-data-graphql.md)
- [Deploy a Fabric app to Fabric](deploy-app.md)
- [Rayfin CLI reference](cli-reference.md)
