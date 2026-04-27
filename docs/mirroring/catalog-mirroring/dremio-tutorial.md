---
title: "Tutorial: Configure mirrored Dremio catalog"
description: Learn how to create a mirrored Dremio catalog in Microsoft Fabric.
author: kgremban
ms.author: kgremban
ms.reviewer: mahi
ms.date: 04/27/2026
ms.topic: tutorial
---

# Tutorial: Configure mirrored Dremio catalog

[Catalog mirroring for Dremio](dremio.md) enables Microsoft Fabric customers to read data managed by Dremio from Fabric workloads.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

- You must have an active Dremio account with access to a Dremio project that contains Iceberg tables you want to mirror.
- The Dremio project must be reachable via the public internet. Firewall rules or other network restrictions are not currently supported. See [limitations and considerations of this feature](dremio-limitations.md).
- You need a Fabric workspace associated with a Fabric capacity (F SKU or Trial).
- You must have the necessary permissions in Dremio to read the catalogs, namespaces, and tables you want to mirror.
- Your Fabric tenant administrator must enable the [tenant admin setting](../../admin/about-tenant-settings.md) titled **Enable new mirrored catalog items (Preview)**.

## Create a mirrored Dremio catalog

Follow these steps to create a new mirrored Dremio catalog in Fabric.

1. Navigate to https://powerbi.com.

1. Select **+ New** and then **Mirrored Dremio catalog (preview)**.

1. Select an existing connection if you have one configured.
   
   If you don't have an existing connection, create a new connection and enter all the required details:
   
   - For **Warehouse**, enter your Dremio project name.
   - For **Connection credentials**, enter the PAT token for the identity you want to use, or select **Organizational account** if you'd like to use your signed-in identity associated with your Dremio project.

1. Once you connect to Dremio, on the **Choose data** page, select the **Catalog scope**, which is the part of the Dremio catalog you would like to mirror. Then, via the inclusion/exclusion list, select the namespaces and tables that you want to add and access from Fabric.
   - You can only see the catalogs, namespaces, and tables that you have access to based on the privileges granted in Dremio.
   - By default, the **Automatically sync future tables** option is enabled. For more information, see [Dremio catalog mirroring](dremio.md#metadata-sync).

   When you have made your selections, select **Next**.

1. On the **Review and create** page, you can review the details and set the mirrored catalog item name, which must be unique in your workspace. Select **Create**.

1. A mirrored Dremio catalog item is created. For each table, a corresponding shortcut is also automatically created.
   - Namespaces that don't have any tables aren't shown.

1. You can preview data by selecting a table, or by opening the SQL analytics endpoint. Open the SQL analytics endpoint item to launch the Explorer and Query editor page. You can query your mirrored Dremio tables with T-SQL in the SQL Editor.

## Create Lakehouse shortcuts to the mirrored Dremio catalog item

You can also create shortcuts from your Lakehouse to your mirrored Dremio catalog item to use your Lakehouse data and Spark Notebooks.

1. First, create a lakehouse. If you already have a lakehouse in this workspace, you can use an existing one.
   1. Select your workspace in the navigation menu.
   1. Select **+ New** > **Lakehouse**.
   1. Provide a name for your lakehouse in the **Name** field, and select **Create**.
1. In the **Explorer** view of your lakehouse, in the **Get data in your lakehouse** menu, under **Load data in your lakehouse**, select the **New shortcut** button.
1. Select **Microsoft OneLake**. Select the mirrored Dremio catalog item that you created in the previous steps. Then select **Next**.
1. Select tables within the namespace, and select **Next**.
1. Select **Create**.
1. Shortcuts are now available in your Lakehouse to use with your other Lakehouse data. You can also use Notebooks and Spark to perform data processing on the data for these catalog tables that you added from Dremio.

## Related content

- [Dremio catalog mirroring](dremio.md)
- [Limitations in Microsoft Fabric catalog mirroring for Dremio](dremio-limitations.md)
