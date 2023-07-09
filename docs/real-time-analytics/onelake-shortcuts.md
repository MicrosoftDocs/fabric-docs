---
title: Create OneLake shortcuts in Real-Time Analytics
description: Learn how to create a OneLake shortcut to query data from internal and external sources.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 07/09/2023
ms.search.form: product-kusto
---

# Create OneLake shortcuts

[!INCLUDE [preview-note](../includes/preview-note.md)]

OneLake is a single, unified, logical data lake for [!INCLUDE [product-name](../includes/product-name.md)] to store lakehouses, warehouses, KQL databases, and other items. Shortcuts are embedded references within OneLake that point to other files' store locations without moving the original data. The embedded reference makes it appear as though the files and folders are stored locally but in reality; they exist in another storage location. Shortcuts can be updated or removed from your items, but these changes don't affect the original data and its source. For more information, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

In this article, you learn how to create a OneLake shortcut from internal and external sources to query your data in Real-Time Analytics. Select the desired tab that corresponds with the shortcut you'd like to create.

> [!NOTE]
> Use OneLake shortcuts when you want to infrequently run queries on historical data without partitioning or indexing the data.
> If you want to run queries frequently and accelerate performance, import the data directly into your KQL database.

## [OneLake shortcut](#tab/onelake-shortcut)

[!INCLUDE [onelake-shortcut-prerequisites](../includes/real-time-analytics/onelake-shortcut-prerequisites.md)]

1. Browse to an existing KQL database.
1. Select **New** > **OneLake shortcut**.

    :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/home-tab.png" alt-text="Screenshot of the Home tab showing the dropdown of the New button. The option titled OneLake shortcut is highlighted.":::

1. Under **Internal sources**, select **Microsoft OneLake**.

    :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing the two methods for creating a shortcut. The option titled OneLake is highlighted."  lightbox="media/onelake-shortcuts/onelake-shortcut/new-shortcut-expanded.png":::

1. Select the data source you want to connect to, and then select **Next**.

    :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/data-source.png" alt-text="Screenshot of the Select a data source type window showing the available data sources to use with the shortcut. The Next button is highlighted."  lightbox="media/onelake-shortcuts/onelake-shortcut/data-source.png":::

1. Expand **Files**, and select a specific subfolder to connect to, then select **Create** to create your connection.

    :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/create-shortcut.png" alt-text="Screenshot of the New shortcut window showing the data in the LakeHouse. The subfolder titled StrmSC and the Create button are highlighted.":::

1. Select **Close**.

> [!NOTE]
> You can only connect to one subfolder or table per shortcut. To connect to more data, repeat these steps and create additional shortcuts.

## [Azure Data Lake Storage Gen2](#tab/adlsgen2)

[!INCLUDE [adlsgen2-prerequisites](../includes/real-time-analytics/adlsgen2-prerequisites.md)]

1. Browse to an existing KQL database.
1. Select **New** > **OneLake shortcut**.

    :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/home-tab.png" alt-text="Screenshot of the Home tab showing the dropdown of the New button. The option titled OneLake shortcut is highlighted.":::

1. Under **External sources**, select **Azure Data Lake Storage Gen2**.
    :::image type="content" source="media/onelake-shortcuts/adls-gen2-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing the two methods for creating a shortcut. The option titled Azure Data Lake Storage Gen2 is highlighted." lightbox="media/onelake-shortcuts/adls-gen2-shortcut/new-shortcut-expanded.png":::

1. Enter the **Connection settings** according to the following table:

    :::image type="content" source="media/onelake-shortcuts/adls-gen2-shortcut/shortcut-details.png" alt-text="Screenshot of the New shortcut window showing the Connection settings and Connection credentials."  lightbox="media/onelake-shortcuts/adls-gen2-shortcut/shortcut-details.png":::

      |Field | Description| Value|
      |-----|-----| -----|
      | **URL**| The connection string for your delta container. | `https://`*StorageAccountName*`.dfs.core.windows.net`|
      |**Connection** | Previously defined connections for the specified storage location appear in the drop-down. If none exist, create a new connection.| *Create new connection*. |
      |**Connection name** | The Azure Data Lake Storage Gen2 connection name.| A name for your connection.|
      |**Authentication kind**| The authorization model. The supported models are: Organizational account, Account Key, Shared Access Signature (SAS), and Service principal. For more information, see [ADLS shortcuts](../onelake/onelake-shortcuts.md#adls-shortcuts). | Dependent on the authorization model. Once you select an authentication kind, fill in the required credentials.|

1. Select **Next**
1. Under **Shortcut Name**, enter a name for your shortcut.
1. Under **Sub Path**, enter a sub path to select a specific folder in your storage account.
1. Select **Create**.
1. In the **Shortcut creation completed** window, select **close**.

## [Amazon S3](#tab/amazon-s3)

[!INCLUDE [amazons3-prerequisites](../includes/real-time-analytics/amazons3-prerequisites.md)]

1. Browse to an existing KQL database.
1. Select **New** > **OneLake shortcut**.

    :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/home-tab.png" alt-text="Screenshot of the Home tab showing the dropdown of the New button. The option titled OneLake shortcut is highlighted.":::

1. Under **External sources**, select **Amazon S3**.
    :::image type="content" source="media/onelake-shortcuts/amazons3-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing the two methods for creating a shortcut. The option titled Amazon S3 is highlighted."  lightbox="media/onelake-shortcuts/amazons3-shortcut/new-shortcut-expanded.png":::
1. Enter the **Connection settings** according to the following table:

    :::image type="content" source="media/onelake-shortcuts/amazons3-shortcut/shortcut-details.png" alt-text="Screenshot of the New shortcut window showing the Connection settings and Connection credentials."  lightbox="media/onelake-shortcuts/amazons3-shortcut/shortcut-details.png":::

      |Field | Description| Value|
      |-----|-----| -----|
      | **URL**| The connection string for your Amazon S3 bucket. | `https://`*BucketName*`.s3.`*RegionName*`.amazonaws.com` |
      |**Connection** | Previously defined connections for the specified storage location appear in the drop-down. If none exist, create a new connection.| *Create new connection*. |
      |**Connection name** | The Amazon S3 connection name.| A name for your connection.|
      |**Authentication kind**| The *Identity and Access Management (IAM)* policy. The policy must have read and list permissions. For more information, see [IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html).| Dependent on the bucket policy.|
      |**Access Key ID**| The *Identity and Access Management (IAM)* user key. For more information, see [Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html). | Your access key.|
      |**Secret Access Key**| The *Identity and Access Management (IAM)* secret key. | Your secret key.|

1. Select **Next**
1. Enter a name for your shortcut.

    Optionally, you can enter a sub path to select a specific folder in your S3 bucket.
    > [!NOTE]
    > Shortcut paths are case sensitive.

    :::image type="content" source="media/onelake-shortcuts/amazons3-shortcut/shortcut-settings.png" alt-text="Screenshot of the New shortcut window showing the shortcut settings."  lightbox="media/onelake-shortcuts/amazons3-shortcut/shortcut-settings.png":::

1. Select **Create**.

---

The database refreshes automatically. The shortcut appears under **Shortcuts** in the **Data tree**.

:::image type="content" source="media/onelake-shortcuts/adls-gen2-shortcut/data-tree.png" alt-text="Screenshot of the data tree showing the new shortcut.":::

The OneLake shortcut has been created. You can now query this data.

## Query data

To query data from the OneLake shortcut, use the [`external_table()` function](/azure/data-explorer/kusto/query/externaltablefunction?context=/fabric/context/context).

1. On the rightmost side of your database, select **Explore your data**. The window opens with a few sample queries you can run to get an initial look at your data.
1. Replace the table name placeholder with `external_table('`*Shortcut name*`')`.
1. Select **Run** or press **Shift+ Enter** to run a selected query.

:::image type="content" source="media/onelake-shortcuts/amazons3-shortcut/query-shortcut.png" alt-text="Screenshot of the Explore your data window showing the results of a sample query."  lightbox="media/onelake-shortcuts/amazons3-shortcut/query-shortcut.png":::

## Next steps

- [Query data in a KQL queryset](kusto-query-set.md)
- [`external_table()` function](/azure/data-explorer/kusto/query/externaltablefunction?context=/fabric/context/context)
