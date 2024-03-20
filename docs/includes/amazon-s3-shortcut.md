---
title: Include file for Amazon S3 shortcut in Microsoft Fabric
description: Include file for Amazon S3 shortcut in Microsoft Fabric.
author: YaelSchuster
ms.author: yaschust
ms.topic: include
ms.date: 07/16/2023
---
## Select a source

1. Under **External sources**, select **Amazon S3**.
    :::image type="content" source="../real-time-analytics/media/onelake-shortcuts/amazon-s3-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing the two methods for creating a shortcut. The option titled Amazon S3 is highlighted." lightbox="../real-time-analytics/media/onelake-shortcuts/amazon-s3-shortcut/new-shortcut-expanded.png":::
1. Enter the **Connection settings** according to the following table:

    :::image type="content" source="../real-time-analytics/media/onelake-shortcuts/amazon-s3-shortcut/shortcut-details.png" alt-text="Screenshot of the New shortcut window showing the Connection settings and Connection credentials." lightbox="../real-time-analytics/media/onelake-shortcuts/amazon-s3-shortcut/shortcut-details.png":::

      |Field | Description| Value|
      |-----|-----| -----|
      | **URL**| The connection string for your Amazon S3 bucket. | `https://`*BucketName*`.s3.`*RegionCode*`.amazonaws.com` |
      |**Connection** | Previously defined connections for the specified storage location appear in the drop-down. If no connections exist, create a new connection.| *Create new connection* |
      |**Connection name** | The Amazon S3 connection name.| A name for your connection.|
      |**Authentication kind**| The *Identity and Access Management (IAM)* policy. The policy must have read and list permissions. For more information, see [IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html).| Dependent on the bucket policy.|
      |**Access Key ID**| The *Identity and Access Management (IAM)* user key. For more information, see [Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html). | Your access key.|
      |**Secret Access Key**| The *Identity and Access Management (IAM)* secret key. | Your secret key.|

Select **Next**.
1. Browse to the target location for the shortcut.

    :::image type="content" source="../includes/media/onelake-shortcuts/aws-s3-shortcut/shortcut-browse.png" alt-text="Screenshot of the storage browse window with multiple folders selected." lightbox="../includes/media/onelake-shortcuts/aws-s3-shortcut/shortcut-browse.png":::

    If you used the global endpoint in the connection URL, all of your available buckets appear in the left navigation view. If you used a bucket specific endpoint in the connection URL, only the specified bucket and its contents appear in the navigation view.

    Navigate the storage account by selecting a folder or clicking on the expansion carrot next to a folder.

    In this view, you can select one or more shortcut target locations. Choose target locations by clicking the checkbox next a folder in the left navigation view.
1. Select **Next**

    :::image type="content" source="../includes/media/onelake-shortcuts/aws-s3-shortcut/shortcut-review.png" alt-text="Screenshot of shortcut review page with options to rename and delete shortcuts." lightbox="../includes/media/onelake-shortcuts/aws-s3-shortcut/shortcut-review.png":::

    The review page allows you to verify all of your selections. Here you can see each shortcut that will be created. In the action column, you can click the pencil icon to edit the shortcut name. You can click the trash can icon to delete shortcut.
1. Select **Create**.
