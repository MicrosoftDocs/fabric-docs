---
title: Create a Google Cloud Storage(GCS) shortcut
description: Learn how to create a OneLake shortcut for Google Cloud Storage (GCS) inside a Microsoft Fabric lakehouse.
ms.reviewer: eloldag
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 03/15/2024
#customer intent: As a data engineer, I want to learn how to create a shortcut for Google Cloud Storage (GCS) inside a Microsoft Fabric lakehouse so that I can easily access and manage my GCS data within the lakehouse environment.
---

# Create a Google Cloud Storage (GCS) shortcut

In this article, you learn how to create a Google Cloud Storage (GCS) shortcut inside a Fabric lakehouse. Shortcuts can be created to Google Cloud Storage(GCS) using the XML API for GCS. When you create shortcuts to Google Cloud Storage, the target path must contain a bucket name at a minimum. You can also restrict the scope of the shortcut by further specifying the prefix/folder you want to point to within the storage hierarchy.

GCS shortcuts are read-only. They don't support write operations regardless of the user's permissions.

For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md).

GCS shortcuts can take advantage of file caching to reduce egress costs associated with cross-cloud data access. For more information, see [OneLake shortcuts > Caching](onelake-shortcuts.md#caching).

## Prerequisites

- If you don't have a lakehouse, create one by following these steps: [Creating a lakehouse with OneLake](create-lakehouse-onelake.md).

- Ensure your chosen GCS bucket and user meet the [access](#access) and [authorization](#authorization) requirements for GCS shortcuts.

## Create a shortcut

1. Open a lakehouse.

1. Right-click on a directory within the **Lake view** of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="Screenshot of right click context menu showing where to select New shortcut from the Lake view." lightbox="media\create-onelake-shortcut\new-shortcut-lake-view.png":::

## Select a source

1. Under **External sources**, select **Google Cloud Storage**.

    :::image type="content" source="./media/create-gcs-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing the available shortcut types. The option titled Google Cloud Storage is highlighted." lightbox="./media/create-gcs-shortcut/new-shortcut.png":::

1. Enter the **Connection settings** according to the following table:

    :::image type="content" source="./media/create-gcs-shortcut/shortcut-details.png" alt-text="Screenshot of the New shortcut window showing the Connection settings and Connection credentials." lightbox="./media/create-gcs-shortcut/shortcut-details.png":::

      |Field | Description| Value|
      |-----|-----| -----|
      | **URL**| The connection string for your GCS bucket. The bucket name is optional. | `https://`*BucketName*`.storage.googleapis.com` `https://storage.googleapis.com` |
      |**Connection** | Previously defined connections for the specified storage location appear in the drop-down. If no connections exist, create a new connection.| *Create new connection* |
      |**Connection name** | The user defined name for the connection.| A name for your connection.|
      |**Authentication kind**| Fabric uses Hash-based Message Authentication Code (HMAC) keys to access Google Cloud storage. These keys are associated with a user or service account. The account must have permission to access the data within the GCS bucket. If the bucket specific endpoint was used in the connection URL, the account must have the `storage.objects.get` and `storage.objects.list` permissions. If the global endpoint was used in the connection URL, the account must also have the `storage.buckets.list` permission. | HMAC Key|
      |**Access ID**| The access key associated with a user or service account. For more on creating HMAC keys, see [Manage HMAC Keys](https://cloud.google.com/storage/docs/authentication/managing-hmackeys#create). | Your access key.|
      |**Secret**| The secret for the access key. | Your secret key.|

1. Select **Next**.

1. Browse to the target location for the shortcut.

    :::image type="content" source="./media/create-gcs-shortcut/shortcut-browse.png" alt-text="Screenshot of the storage browse window with multiple folders selected." lightbox="./media/create-gcs-shortcut/shortcut-browse.png":::

    If you used the global endpoint in the connection URL, all of your available buckets appear in the left navigation view. If you used a bucket specific endpoint in the connection URL, only the specified bucket and its contents appear in the navigation view.

    Navigate the storage account by selecting a folder or clicking on the expansion arrow next to a folder.

    In this view, you can select one or more shortcut target locations.  Choose target locations by clicking the checkbox next a folder in the left navigation view.

1. Select **Next**

    :::image type="content" source="./media/create-gcs-shortcut/shortcut-review.png" alt-text="Screenshot of shortcut review page with options to rename and delete shortcuts." lightbox="./media/create-gcs-shortcut/shortcut-review.png":::

    The review page allows you to verify all of your selections. Here you can see each shortcut that will be created.  In the action column, you can click the pencil icon to edit the shortcut name. You can click the trash can icon to delete shortcut.

1. Select **Create**.

The lakehouse automatically refreshes. The shortcut appears in the left **Explorer** pane.

   :::image type="content" source="media\create-gcs-shortcut\table-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of tables that display the shortcut symbol." lightbox="media\create-gcs-shortcut\table-shortcut-symbol.png":::

## Access

When configuring the connection for a GCS shortcut, you can either specify the global endpoint for the storage service or use a bucket-specific endpoint.

- Global endpoint example: `https://storage.googleapis.com`
- Bucket-specific endpoint example: `https://<BucketName>.storage.googleapis.com`

## Authorization

GCS shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the GCS shortcut and all access to that shortcut is authorized using that credential. The supported delegated credential is an HMAC key and secret for a Service account or User account.

The account must have permission to access the data within the GCS bucket. If the bucket-specific endpoint was used in the connection for the shortcut, the account must have the following permissions:

- `storage.objects.get`
- `storage.objects.list`

If the global endpoint was used in the connection for the shortcut, the account must also have the following permission:

- `storage.buckets.list`

## Limitations

The following limitations apply to Google Cloud Storage shortcuts:

* GCS shortcuts are read-only. They don't support write operations regardless of the user's permissions.

## Related content

- [Create a OneLake shortcut](create-onelake-shortcut.md)
- [Create an Azure Data Lake Storage Gen2 shortcut](create-adls-shortcut.md)
- [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
