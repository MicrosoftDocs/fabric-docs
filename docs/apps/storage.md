---
title: Store and manage files in Fabric Apps
description: Learn how to configure storage folders, control file access, and upload, download, list, and delete files in a Fabric app.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 11/05/2026
ai-usage: ai-generated
---

# Store and manage files in Fabric Apps

Fabric Apps Storage is built on [OneLake](../onelake/onelake-overview.md) and lets you add documents, images, and attachments to your app.
Define folders and access rules with Rayfin, then use the client SDK to upload, list, download, and delete files.
Keep structured app data in your data models.

File operations use Fabric storage during development as well as after deployment; there's no local storage emulator.

## Prerequisites

- A [Fabric Apps project](create-app-with-cli.md) and Node.js 20 or later.
- [Fabric Apps enabled for your tenant](overview.md#tenant-admin-settings).
- The **Users can access data stored in OneLake with apps external to Fabric** tenant setting enabled. See [Enable OneLake access](#enable-onelake-access).
- Access to a Fabric workspace with a supported Fabric capacity assigned. Storage isn't supported in Power BI Pro workspaces.
- Permission to deploy the app and apply its storage configuration.
- A configured [Data service](data-models.md#define-an-entity), including `services.data.dialect`.
- [Fabric authentication](fabric-authentication.md) configured for the app and a sign-in flow for its users.

### Enable OneLake access

File uploads and downloads depend on OneLake access.
Ask your Fabric administrator to enable the [**Users can access data stored in OneLake with apps external to Fabric**](../admin/service-admin-portal-onelake.md#users-can-access-data-stored-in-onelake-with-apps-external-to-fabric) tenant setting.
It's enabled for the entire organization by default. Fabric Apps Storage requires this setting to be enabled.
This setting governs access from applications outside Fabric generally, not just your app.
You also need to define folder permissions to control which files each app user can access.
For more information, see [OneLake tenant settings](../admin/service-admin-portal-onelake.md).

## Enable storage

Use GitHub Copilot or another coding agent with access to your project and terminal to configure storage.
For example, use the following prompt:

```text
Use Rayfin Storage to add a documents folder to my Fabric app.
Allow signed-in users to manage their own PDF files, up to 10 MiB each.
Use the installed Rayfin documentation and project guidance to configure and
register the folder, and connect storage to my existing authenticated client.
Preserve my existing services and folders. Show me the changes before deploying,
and ask before making any potentially destructive changes.
```

Review the generated configuration, folder permissions, and client changes.
Storage requires the Data service to be enabled and configured.
Every folder requires an authenticated permission rule.
Folder permissions control access to files; paths only organize the content.
For more information about permissions, see [Define data permissions](data-permissions.md).

## Apply the configuration

Deploy your app from the project root:

```bash
npx rayfin up
```

A full deployment applies the registered folders when Storage is enabled.
Check the deployment output for storage warnings before using the folders.
To retry a failed storage step or apply only folder changes to an existing deployment, run:

```bash
npx rayfin up storage apply
```

You don't need to run the storage-only command after a successful full deployment.

### Develop against remote storage

Start your development session:

```bash
npx rayfin dev
```

By using the default Fabric provider, this command applies enabled storage declarations to your development app in Fabric.
Your frontend runs locally, but file operations read and write remote files.
Use a development app and avoid production data while testing.

To retry storage configuration for the active development deployment, run:

```bash
npx rayfin dev storage apply
```

Start a full `rayfin dev` session before using this storage-only command.
The retry command uses the active deployment and doesn't accept `--workspace` or `--workspace-id`.
Storage isn't supported with the Docker provider.

## Configure the client

Connect storage to your app's existing client and retain its configuration and sign-in flow.
The [setup prompt](#enable-storage) can help you configure the client for your project.
Sign-in and storage calls must use the same client session.
Creating the client doesn't sign in a user.

## Work with files

The following examples use your configured, signed-in `client` instance and the `documents` folder.
Object paths are relative to that folder.
Use `/` between path segments, and include the file name for upload, download, and delete operations.
Don't use a leading or trailing `/`, backslashes, empty segments, `.` segments, or `..` segments.

### Upload a file

Pass a browser `File` selected by the user:

```typescript
async function uploadDocument(file: File) {
  return client.storage.documents.upload('reports/quarterly-report.pdf', file, {
    contentType: 'application/pdf',
    contentDisposition: 'attachment; filename="quarterly-report.pdf"',
  });
}
```

After the upload finishes, use the same path to download or delete the file.
Uploading to the same path again follows the folder's `onConflict` setting.
The optional `contentDisposition` value stores metadata that describes how the file should be presented, such as an attachment with a suggested file name.

### List files

List from the folder root, or supply a directory path to narrow the results:

```typescript
const firstPage = await client.storage.documents.list('reports', {
  limit: 20,
});

for (const item of firstPage.items) {
  console.log(item.path, item.size);
}

if (firstPage.continuation) {
  const nextPage = await client.storage.documents.list('reports', {
    limit: 20,
    continuation: firstPage.continuation,
  });
  console.log(nextPage.items);
}
```

Call `list()` without a directory path to list from the folder root.
Use the returned continuation token to retrieve additional pages.
The storage API can include files in a `Deleting` state in list results.
You can't upload or download a file in that state.
If deletion doesn't complete, retry deleting the file.

### Download a file

Use the same relative path that you supplied during upload:

```typescript
const result = await client.storage.documents.download(
  'reports/quarterly-report.pdf'
);
const file = await new Response(result.stream, {
  headers: result.contentType
    ? { 'Content-Type': result.contentType }
    : undefined,
}).blob();
```

Use the resulting `Blob` in your app's display or download flow for bounded files.
This conversion buffers the entire file in memory.
For large files, consume `result.stream` incrementally instead.
If you create an object URL with `URL.createObjectURL`, revoke it when the app no longer needs it.

### Delete a file

Delete the file by its relative path:

```typescript
await client.storage.documents.delete('reports/quarterly-report.pdf');
```

If an upload or delete operation is interrupted, it might temporarily block another operation on the same path.
Wait and retry. In some cases, the path can remain blocked for about 70 minutes.

## Change or remove folders

Edit folder declarations in your project and apply them with `npx rayfin up` or `npx rayfin up storage apply`.

> [!WARNING]
> Removing a folder from an applied configuration makes it unavailable and permanently deletes its files.
> Back up any files you need before applying the removal.
> You can't restore the folder.
> You can't reuse its name until deletion finishes.

Removing a non-empty folder requires explicit approval with `--force`:

```bash
npx rayfin up storage apply --force
```

Review the change before using `--force`.
This option permits data loss; it isn't a routine deployment flag.

After removal, the folder is unavailable while its files are deleted in the background.
If cleanup doesn't complete and your schema still has registered folders, rerun `npx rayfin up storage apply` and check its output for warnings.
If no folders remain registered, contact support for help with cleanup.

Removing all folder declarations doesn't delete the deployed folders.
Don't use an empty schema as a cleanup procedure.

## Monitor storage

In the Fabric portal, open your app's management view and select **Storage** to inspect its files.
When available, select **Metrics**, then select **Storage** to see the storage request count and request error rate.

## Frequently asked questions

### Do I need a separate lakehouse or Azure Storage account?

No. Fabric Apps uses OneLake storage associated with your app and workspace.
You don't need to create a separate lakehouse or Azure Storage account.

### Does enabling storage in the app enable the OneLake tenant setting?

No. Enabling Data and Storage configures your app's services; it doesn't change tenant policies. Your Fabric administrator must verify the OneLake setting in the [prerequisites](#prerequisites).

### Do app users need separate OneLake credentials?

No. Sign users in to your app and use the storage SDK with the same authenticated client session. Control access with folder permissions. Anonymous storage access isn't supported.

### What should I check if I can't upload or download files?

Confirm that the OneLake setting in the [prerequisites](#prerequisites) allows storage for your app. Ensure the user is signed in and has the folder permissions required for the operation. Check the Rayfin deployment output for storage warnings, and apply any folder changes before retrying.

## Related content

- [Define data models](data-models.md)
- [Define data permissions](data-permissions.md)
- [Configure Fabric authentication](fabric-authentication.md)
- [Deploy a Fabric app to Fabric](deploy-app.md)
- [Rayfin CLI reference](cli-reference.md)
