---
title: Create an Amazon S3 shortcut
description: Learn how to create a OneLake shortcut for Amazon S3 data access inside a Microsoft Fabric lakehouse.
ms.reviewer: eloldag
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 07/25/2024
#customer intent: As a data engineer, I want to learn how to create an Amazon S3 shortcut inside a Fabric lakehouse so that I can efficiently access and manage S3 data within the lakehouse environment.
---

# Create an Amazon S3 shortcut

In this article, you learn how to create an Amazon S3 shortcut inside a Fabric lakehouse. When you create shortcuts to Amazon S3 accounts, the target path must contain a bucket name at a minimum. S3 doesn't natively support hierarchical namespaces but you can use prefixes to mimic a directory structure. You can include prefixes in the shortcut path to further narrow the scope of data accessible through the shortcut. When you access data through an S3 shortcut, prefixes are represented as folders.

S3 shortcuts are read-only. They don't support write operations regardless of the user's permissions.

For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md).

S3 shortcuts can take advantage of file caching to reduce egress costs associated with cross-cloud data access. For more information, see [OneLake shortcuts > Caching](onelake-shortcuts.md#caching).

## Prerequisites

- If you don't have a lakehouse, create one by following these steps: [Create a lakehouse with OneLake](create-lakehouse-onelake.md).

- Ensure your chosen S3 bucket and IAM user meet the [access](#access) and [authorization](#authorization) requirements for S3 shortcuts.

## Create a shortcut

1. Open a lakehouse.

1. Right-click on the **Tables** directory within the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="Screenshot of right click context menu showing where to select New shortcut from the Lake view.":::

1. Under **External sources**, select **Amazon S3**.
    :::image type="content" source="./media/create-s3-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing the two methods for creating a shortcut. The option titled Amazon S3 is highlighted." lightbox="./media/create-s3-shortcut/new-shortcut-expanded.png":::

1. Enter the **Connection settings** according to the following table:

    :::image type="content" source="./media/create-s3-shortcut/shortcut-details.png" alt-text="Screenshot of the New shortcut window showing the Connection settings and Connection credentials." lightbox="./media/create-s3-shortcut/shortcut-details.png":::

      |Field | Description| Value|
      |-----|-----| -----|
      | **URL**| The connection string for your Amazon S3 bucket. | `https://`*BucketName*`.s3.`*RegionCode*`.amazonaws.com` |
      |**Connection** | Previously defined connections for the specified storage location appear in the drop-down. If no connections exist, create a new connection.| *Create new connection* |
      |**Connection name** | The Amazon S3 connection name.| A name for your connection.|
      |**Authentication kind**| The *Identity and Access Management (IAM)* policy. The policy must have read and list permissions. For more information, see [IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html).| Dependent on the bucket policy.|
      |**Access Key ID**| The *Identity and Access Management (IAM)* user key. For more information, see [Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html). | Your access key.|
      |**Secret Access Key**| The *Identity and Access Management (IAM)* secret key. | Your secret key.|

1. Select **Next**.

1. Browse to the target location for the shortcut.

    :::image type="content" source="./media/create-s3-shortcut/shortcut-browse.png" alt-text="Screenshot of the storage browse window with multiple folders selected." lightbox="./media/create-s3-shortcut/shortcut-browse.png":::

    If you used the global endpoint in the connection URL, all of your available buckets appear in the left navigation view. If you used a bucket specific endpoint in the connection URL, only the specified bucket and its contents appear in the navigation view.

    Navigate the storage account by selecting a folder or clicking on the expansion arrow next to a folder.

    In this view, you can select one or more shortcut target locations. Choose target locations by clicking the checkbox next a folder in the left navigation view.

1. Select **Next**

    :::image type="content" source="./media/create-s3-shortcut/shortcut-review.png" alt-text="Screenshot of shortcut review page with options to rename and delete shortcuts." lightbox="./media/create-s3-shortcut/shortcut-review.png":::

    The review page allows you to verify all of your selections. Here you can see each shortcut that will be created. In the action column, you can click the pencil icon to edit the shortcut name. You can click the trash can icon to delete shortcut.

1. Select **Create**.
   The lakehouse automatically refreshes. The shortcut appears in the left **Explorer** pane under the **Tables** section.

   :::image type="content" source="media\create-onelake-shortcut\folder-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of folders that display the shortcut symbol.":::

## Access

S3 shortcuts must point to the https endpoint for the S3 bucket.

Example: `https://bucketname.s3.region.amazonaws.com/`

> [!NOTE]
> You don't need to disable the S3 Block Public Access setting for your S3 account for the S3 shortcut to function.
>
> Access to the S3 endpoint must not be blocked by a storage firewall or Virtual Private Cloud unless you configure an on-premises data gateway. To set up a data gateway, see [Create shortcuts to on-premises data](create-on-premises-shortcut.md).

## Authorization

S3 shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the S3 shortcut and all access to that shortcut is authorized using that credential. The supported delegated credential is a key and secret for an IAM user.

The IAM user must have the following permissions on the bucket that the shortcut is pointing to:

- `S3:GetObject`
- `S3:GetBucketLocation`
- `S3:ListBucket`

S3 shortcuts support S3 buckets that use S3 Bucket Keys for SSE-KMS encryption. To access data encrypted with SSE-KMS encryption, the user must have encrypt/decrypt permissions for the bucket key, otherwise they receive a **"Forbidden" error (403)**. For more information, see [Configuring your bucket to use an S3 Bucket Key with SSE-KMS for new objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/configuring-bucket-key.html).

## Limitations

The following limitations apply to S3 shortcuts:

- S3 shortcuts are read-only. They don't support write operations regardless of the user's permissions.
- S3 shortcut target paths can't contain any reserved characters from [RFC 3986 section 2.2](https://www.rfc-editor.org/rfc/rfc3986#section-2.2). For allowed characters, see [RFC 3968 section 2.3](https://www.rfc-editor.org/rfc/rfc3986#section-2.3).
- S3 shortcuts don't support the Copy Blob API.
- More shortcuts can't be created inside S3 shortcuts.

## Related content

- [Create a OneLake shortcut](create-onelake-shortcut.md)
- [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
