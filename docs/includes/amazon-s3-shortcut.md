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

1. Select **Next**.
1. Enter a name for your shortcut.

    Optionally, you can enter a sub path to select a specific folder in your S3 bucket.
    > [!NOTE]
    > Shortcut paths are case sensitive.

    :::image type="content" source="../real-time-analytics/media/onelake-shortcuts/amazon-s3-shortcut/shortcut-settings.png" alt-text="Screenshot of the New shortcut window showing the shortcut settings." lightbox="../real-time-analytics/media/onelake-shortcuts/amazon-s3-shortcut/shortcut-settings.png":::

1. Select **Create**.
