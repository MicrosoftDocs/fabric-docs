---
title: Troubleshoot Fabric Apps
description: Common issues and solutions for Microsoft Fabric Apps, including deployment failures, authentication problems, database errors, and CLI issues.
ms.reviewer: mksuni
ms.topic: troubleshooting
ms.date: 06/02/2026
ai-usage: ai-generated
---

# Troubleshoot Fabric Apps

Diagnose common problems when you develop or deploy a Fabric Apps project. This article covers issues with sign-in, local services, schema changes, static hosting, and the CLI.

## Deployment issues

### Deployment fails with 401 or 403 error

**Symptom:** Running `npx rayfin up` returns an authentication error.

**Cause:** Your authentication session expired or you aren't signed in.

**Solution:**

Reauthenticate and retry the deployment:

```bash
npx rayfin login
npx rayfin up
```

### Database apply reports destructive changes

**Symptom:** Running `npx rayfin up db apply` blocks with a warning about data loss.

**Cause:** The CLI detected schema changes that could delete data (dropping columns, renaming tables).

**Solution:**

Review the listed operations carefully. If you accept the data loss, use `--force`:

```bash
npx rayfin up db apply --force
```

> [!CAUTION]
> Using `--force` can cause permanent data loss. Verify the operations before proceeding.

### Static deploy exceeds size limit

**Symptom:** Static content deployment fails with a size limit error.

**Cause:** The compressed archive exceeds 100 MB.

**Solution:**

Reduce build output size by:

- Excluding source maps from production builds
- Optimizing or removing large images and videos
- Moving binary files to storage instead of bundling them
- Verifying your bundler configuration excludes development artifacts

## Authentication issues

### Session not persisting after sign-in

**Symptom:** Users are signed out immediately after authentication.

**Cause:** The client isn't configured with the correct base URL or publishable key.

**Solution:**

Verify the `RayfinClient` configuration matches your backend:

```typescript
const client = new RayfinClient({
  baseUrl: import.meta.env.VITE_RAYFIN_API_URL ?? 'http://localhost:5168',
  publishableKey: import.meta.env.VITE_RAYFIN_PUBLISHABLE_KEY,
});
```

### Fabric SSO popup blocked

**Symptom:** Browser blocks the Fabric portal window during sign-in.

**Cause:** `ensureSignedInWithFabric()` wasn't called from a user-gesture handler.

**Solution:**

Call the function from a synchronous event handler:

```typescript
async function handleClick() {
  await ensureSignedInWithFabric(client.auth, options);
}

// Attach to button click
<button onClick={handleClick}>Sign in</button>
```

## Data model issues

### Relationships not appearing in API

**Symptom:** Related entity fields aren't available when querying.

**Cause:** The navigation decorator is missing or the schema wasn't applied.

**Solution:**

1. Verify the relationship decorators are present:

   ```typescript
   @one(() => Notebook) notebook?: Notebook;
   ```

1. Reapply the schema.

### Authorization policy not working

**Symptom:** Users can access records they shouldn't see.

**Cause:** The policy expression is incorrect or the claim names don't match.

**Solution:**

1. Verify the policy uses correct claim names (`sub`, `email`, `role`):

   ```typescript
   policy: (claims, item) => claims.sub.eq(item.user_id)
   ```

1. Log the decoded JWT to verify claim values match your code.

### Stale API responses

**Symptom:** Frontend returns outdated data shapes after schema changes.

**Cause:** The generated configuration is cached.

**Solution:**

1. Stop the backend.

1. Delete the `.temp/` directory in `rayfin/`:

   ```bash
   rm -rf rayfin/.temp/
   ```

1. Restart services and reapply the schema.

## CLI issues

### Command not found

**Symptom:** Running `npx rayfin` returns "command not found."

**Cause:** The CLI isn't installed or npm isn't in your PATH.

**Solution:**

1. Verify Node.js and npm are installed:

   ```bash
   node --version
   npm --version
   ```

1. Reinstall dependencies:

   ```bash
   npm install
   ```

### CLI version mismatch

**Symptom:** CLI commands fail with unexpected errors after updating.

**Cause:** Cached CLI version is outdated.

**Solution:**

Update and reinstall:

```bash
npm update --save
npm install
npx rayfin --version
```

### CLI global vs local version mismatch 

**Symptom:** CLI commands fail with unexpected errors across projects.

**Cause:** Global and local installation of the CLI versions and they don't match.

**Solution**: Validate local version `npm list @microsoft/rayfin-cli`. This shows the version in your current project’s node_modules. Check global version `npm list -g @microsoft/rayfin-cli`. This shows the version installed system-wide. Use `npm uninstall -g` with Rayfin CLI package to remove global version and use your local versions.

## Build and packaging issues

### Build command fails

**Symptom:** Static hosting deployment fails because the build command produced no output.

**Cause:** Build errors or misconfigured build command.

**Solution:**

1. Run the build command manually:

   ```bash
   npm run build
   ```

1. Fix any errors reported.
1. Verify the output folder contains files.

### Empty static folder

**Symptom:** Static deployment fails with "empty folder" error.

**Cause:** The configured `folder` path is incorrect.

**Solution:**

Verify the `folder` path in `rayfin.yml` matches your build output:

```yaml
services:
  staticHosting:
    folder: dist  # Verify this matches your build output
    buildCommand: npm run build
```

## Database issues

### Connection refused

**Symptom:** Data operations fail with connection errors.

**Cause:** The database container isn't running or health checks failed.

**Solution:**

1. Review container logs:

   ```bash
   docker compose logs -f
   ```

1. Restart services.

### Data loss after restart

**Symptom:** Data disappears after stopping and starting services.

**Cause:** Volumes were deleted with `--purge`.

**Solution:**

Use `--down` instead of `--purge` to preserve data.

## Known limitations

For current limitations and recommended workarounds, see:

- `count()` isn't available on the fluent GraphQL client—use `results.length`.
- Many-to-many relationships aren't supported—use an explicit join entity.
- Session objects are opaque—check `isAuthenticated` or `user` properties.
- After enabling or disabling auth in `rayfin.yml`, restart the backend.

## Get help

If the issue persists:

1. Review the [Fabric Apps documentation](overview.md).
1. Check the [GitHub repository](https://github.com/microsoft/rayfin) for known issues.
1. File a bug report with detailed logs and reproduction steps.

## Related content

- [CLI reference](cli-reference.md)
- [Deploy to Fabric](deploy-app.md)
- [Configure authentication](authentication.md)
