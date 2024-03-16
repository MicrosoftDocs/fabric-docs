---
title: Include file for Google Cloud Storage shortcut in Microsoft Fabric
description: Include file for Google Cloud Storage shortcut in Microsoft Fabric.
author: YaelSchuster
ms.author: yaschust
ms.topic: include
ms.date: 07/16/2023
---
## Select a source

1. Under **External sources**, select **Google Cloud Storage**.
    
    :::image type="content" source="../includes/media/onelake-shortcuts/gcs-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing the available shortcut types. The option titled Google Cloud Storage is highlighted." lightbox="../includes/media/onelake-shortcuts/gcs-shortcut/new-shortcut.png":::

1. Enter the **Connection settings** according to the following table:

    :::image type="content" source="../includes/media/onelake-shortcuts/gcs-shortcut/shortcut-details.png" alt-text="Screenshot of the New shortcut window showing the Connection settings and Connection credentials." lightbox="../includes/media/onelake-shortcuts/gcs-shortcut/shortcut-details.png":::

      |Field | Description| Value|
      |-----|-----| -----|
      | **URL**| The connection string for your GCS bucket. The bucket name is optional. | `https://`*BucketName*`.storage.googleapis.com` `https://storage.googleapis.com` |
      |**Connection** | Previously defined connections for the specified storage location appear in the drop-down. If no connections exist, create a new connection.| *Create new connection* |
      |**Connection name** | The user defined name for the connection.| A name for your connection.|
      |**Authentication kind**| Fabric uses Hash-based Message Authentication Code (HMAC) keys to access Google Cloud storage. These keys are associated with a user or service account. The account must have permission to access the data within the GCS bucket. If the bucket specific endpoint was used in the connection URL, the account must have the `storage.objects.get` and `stoage.objects.list` permissions. If the global endpoint was used in the connection URL, the account must also have the `storage.buckets.list` permission. | HMAC Key|
      |**Access ID**| The access key associated with a user or service account. For more on creating HMAC keys, see [Manage HMAC Keys](https://cloud.google.com/storage/docs/authentication/managing-hmackeys#create). | Your access key.|
      |**Secret**| The secret for the access key. | Your secret key.|

1. Select **Next**.
1. Browse to the target location for the shortcut.

    :::image type="content" source="../includes/media/onelake-shortcuts/gcs-shortcut/new-shortcut.png" alt-text="Screenshot of the storage browse window with multiple folders selected." lightbox="../includes/media/onelake-shortcuts/gcs-shortcut/new-shortcut.png":::

    If you used the global endpoint in the connection URL, all of your available buckets appear in the left navigation view. If you used a bucket specific endpoint in the connection URL only the specified bucket and its contents appear in the navigation view.

    Navigate the storage account by selecting a folder or clicking on the expansion carrot next to a folder.

    In this view, you can select one or more shortcut target locations.  Choose target locations by clicking the checkbox next a folder in the left navigation view.
1. Select **Next**

    :::image type="content" source="../includes/media/onelake-shortcuts/gcs-shortcut/shortcut-review.png" alt-text="Screenshot of the storage browse window with multiple folders selected." lightbox="../includes/media/onelake-shortcuts/gcs-shortcut/shortcut-review.png":::

    The review page allows you to verify all of your selections. Here you can see each shortcut that will be created.  In the action column, you can click the pencil icon to edit the shortcut name. You can click the trash can icon to delete shortcut.

1. Select **Create**.