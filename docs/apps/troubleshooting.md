---
title: Troubleshoot Fabric Apps
description: Common issues and solutions for Microsoft Fabric Apps, including deployment failures, authentication problems, database errors, and CLI issues.
ms.reviewer: mksuni
ms.topic: troubleshooting
ms.date: 08/24/2026
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

### Static deploy exceeds size limit

**Symptom:** Static content deployment fails with a size limit error.

**Cause:** The compressed archive exceeds 100 MB.

**Solution:**

Reduce build output size by:

- Excluding source maps from production builds
- Optimizing or removing large images and videos
- Moving binary files to storage instead of bundling them
- Verifying your bundler configuration excludes development artifacts

### Static deployment has no remote endpoint

**Symptom:** Running `npx rayfin up staticapp deploy` reports that no remote endpoint is configured.

**Cause:** Static-only deployment updates an existing deployment. It can't provision the initial remote app.

**Solution:**

Run a full deployment once:

```bash
npx rayfin up
```

After provisioning completes, use `npx rayfin up staticapp deploy` for subsequent static-only updates.

## Authentication issues

### Authentication token acquisition fails

**Symptom:** `npx rayfin login` or another authenticated CLI command reports `Failed to acquire authentication token` or a credential-storage error.

**Cause:** The CLI isn't signed in, or the environment doesn't provide operating-system-backed credential storage.

**Solution:**

Sign in again:

```bash
npx rayfin login
```

For a restricted local development environment without credential storage, you can enable the encryption fallback:

```bash
npx rayfin login --encryption-fallback-enabled
```

> [!WARNING]
> Encryption fallback stores the token cache in plaintext. Use it only in a trusted development environment. Don't use it in production or shared environments.

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

### Fabric authentication times out

**Symptom:** Fabric authentication fails after five minutes.

**Cause:** The Fabric portal didn't return the handoff code before the flow expired.

**Solution:**

Confirm that `returnOrigin` matches your app's origin, close the popup, and start the sign-in flow again.

### Fabric SSO reports an origin mismatch

**Symptom:** The Fabric SSO handoff rejects the response because its origin doesn't match.

**Cause:** `returnOrigin`, `allowedRedirectUris`, or `fabricPortalUrl` doesn't match the environment where the app and Fabric portal are running.

**Solution:**

1. Set `returnOrigin` to your app's bare origin.
1. Confirm that the origin appears in `services.auth.allowedRedirectUris`.
1. Use the Fabric portal URL for the correct production, preview, or development environment.
1. Run `npx rayfin up` after changing `rayfin.yml`.

For more information, see [Configure authentication redirect URIs](configure-authentication-redirect-uris.md).

### `initEmbeddedAuth()` returns `null`

**Symptom:** Embedded authentication doesn't create a session.

**Cause:** The SDK didn't detect that the app is running inside Fabric.

**Solution:**

Include `?fabricEmbedded=true` in the app URL, or set `fabricEmbedded: true` in `FabricAuthOptions`.

### Fabric authentication reports a state mismatch

**Symptom:** Sign-in fails because the response state doesn't match the request state.

**Cause:** The response belongs to an expired flow or a previous sign-in attempt.

**Solution:**

Close the Fabric popup and restart the sign-in flow. Don't reuse callback URLs or state values from an earlier attempt.

## Data model issues

### Data API returns an internal server error after deployment

**Symptom:** `npx rayfin up` or `npx rayfin up db apply` succeeds, but the GraphQL or REST data API returns an internal server error.

**Cause:** On Microsoft SQL Server, an `@text()` field without `max` generates an `NVARCHAR(MAX)` column, which can prevent GraphQL schema generation.

**Solution:**

Add an explicit maximum length to each affected text field:

```typescript
@text({ max: 200 })
title!: string;
```

Then review and apply the schema change:

```bash
npx rayfin up db apply --force
```

> [!CAUTION]
> Review all reported operations before using `--force`. The option can cause permanent data loss.

### Data service requires a dialect

**Symptom:** Deployment fails with an HTTP 400 response and reports `Dialect is required when Data module is enabled`.

**Cause:** `services.data.enabled` is `true`, but `rayfin.yml` doesn't define a dialect.

**Solution:**

Configure Microsoft SQL Server:

```yaml
services:
  data:
    enabled: true
    dialect: mssql
```

### New entity isn't available after deployment

**Symptom:** Deployment succeeds, but queries against a new or changed entity fail or behave as if the entity doesn't exist.

**Cause:** The database schema might still be applying, or the frontend might be using stale generated types or cached configuration.

**Solution:**

1. Check the deployment:

   ```bash
   npx rayfin up status
   ```

1. Wait until the deployment is healthy.
1. Refresh or rebuild the frontend.
1. If the entity still fails, apply the schema explicitly:

   ```bash
   npx rayfin up db apply
   ```

For the complete workflow, see [Apply and verify schema changes](apply-schema-changes.md).

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

### CLI global and local version mismatch

**Symptom:** CLI commands fail with unexpected errors across projects.

**Cause:** Global and local installation of the CLI versions and they don't match.

**Solution**: Validate local version `npm list @microsoft/rayfin-cli`. This shows the version in your current project’s node_modules. Check global version `npm list -g @microsoft/rayfin-cli`. This shows the version installed system-wide. Use `npm uninstall -g` with Rayfin CLI package to remove global version and use your local versions.

## Secret management issues

### Secret command doesn't prompt

**Symptom:** `npx rayfin secret set <NAME>` exits without prompting for a value.

**Cause:** Standard input isn't an interactive terminal, or the `CI` environment variable is set to `true`. The command uses a masked interactive prompt.

**Solution:**

Use one of the following supported alternatives for noninteractive secret creation:

- Set one secret by piping its value to the command:

  ```powershell
  Get-Content .\secret.txt | npx rayfin secret set <NAME> --stdin
  ```

- Set multiple secrets from an environment file:

  ```powershell
  npx rayfin secret set --env-file .\secrets.env
  ```

Keep secret values out of your shell history and don't commit `secret.txt` or `.\secrets.env` to source control.

### Secret command returns permission denied

**Symptom:** `npx rayfin secret set` or `npx rayfin secret list` returns a permission error.

**Cause:** The app isn't deployed, or the signed-in account doesn't have access to the target Fabric workspace.

**Solution:**

1. Run `npx rayfin up` to provision the app.
1. Run `npx rayfin login` and select an account with access to the workspace.
1. Retry the secret command.

For more information, see [Manage function secrets](manage-function-secrets.md).

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

### Database schema apply fails

**Symptom:** Running `npx rayfin up db apply` or `npx rayfin up db apply --force` fails.

**Cause:** The schema in the remote database and the schema defined in the app code are out of sync. The app code is the source of truth for a Fabric app.

**Don't modify** the remote database schema through the Fabric portal, SQL Server Management Studio (SSMS), the SQL Server extension for Visual Studio Code, or other SQL tools. The following changes to columns in a data entity aren't supported:

- Renaming a column.
- Changing a column's data type.
- Removing a column.

Adding a column is supported. Removing or altering an existing column can break the app and its deployment to Fabric.

**Solution:**

1. Revert any manual changes to the remote database schema so that it matches the schema in the app code.
1. If a coding agent made an unsupported schema change in the app code, instruct the agent to revert that change.
1. Run the schema apply command again:

   ```bash
   npx rayfin up db apply
   ```

   For a column rename, `--force` might allow the schema update to complete:

   ```bash
   npx rayfin up db apply --force
   ```

   > [!CAUTION]
   > Using `--force` can cause permanent data loss. Review the proposed operations and confirm that you accept the data-loss risk before proceeding.

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
1. Check the [GitHub repository](https://github.com/microsoft/project-rayfin) for known issues.
1. File a bug report with detailed logs and reproduction steps.

## Related content

- [CLI reference](cli-reference.md)
- [Apply and verify schema changes](apply-schema-changes.md)
- [Configure authentication redirect URIs](configure-authentication-redirect-uris.md).
- [Manage function secrets](manage-function-secrets.md).
- [Deploy to Fabric](deploy-app.md)
- [Configure authentication](authentication.md)
