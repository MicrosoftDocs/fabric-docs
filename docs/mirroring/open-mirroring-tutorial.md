---
title: "Tutorial: Configure Open Mirroring"
description: Learn how to configure an open mirrored database in Microsoft Fabric.
ms.reviewer: tinglee, sbahadur, marakiketema, maprycem
ms.date: 06/04/2025
ms.topic: tutorial
---

# Tutorial: Configure Microsoft Fabric open mirrored databases

In this tutorial, you configure an open mirrored database in Fabric. This example guides you to create a new open mirrored database and learn how to land data into the landing zone. You'll get proficient with the concepts of open mirroring in Microsoft Fabric.

## Prerequisites

- You need an existing capacity for Fabric. If you don't, [start a Fabric trial](../fundamentals/fabric-trial.md).
    - The Fabric capacity needs to be active and running. A paused or deleted capacity will affect Mirroring and no data will be replicated.

## Create a mirrored database

In this section, we provide a brief overview of how to create a new open mirrored database in the Fabric portal. Alternatively, you could use the [Create mirrored database REST API](mirrored-database-rest-api.md#create-mirrored-database) together with the JSON definition example of open mirroring for creation.

1. Use an existing workspace or create a new workspace. From your workspace, navigate to the **Create** hub. Select **Create**.
1. Locate and select the **Mirrored Database** card.
1. Enter a name for the new mirrored database.
1. Select **Create**.
1. Once an Open mirrored database is created via the user interface, the mirroring process is ready. Review the **Home** page for the new mirrored database item. Locate the **Landing zone** URL is in the details section of the mirrored database home page.

:::image type="content" source="media/open-mirroring-tutorial/landing-zone-url.png" alt-text="Screenshot from the Fabric portal showing the Landing zone URL location in the Home page of the mirrored database item." lightbox="media/open-mirroring-tutorial/landing-zone-url.png":::

## Start replicating data

Once you've created a mirrored database, start uploading your files. You can upload your initial data and future changed data sets using the Fabric portal or programmatically via the OneLake.

### Upload via the Fabric portal

To upload initial data and/or incremental changed data for open mirroring:

1. Select the **Upload files** on the home page of the mirrored database.

   :::image type="content" source="media/open-mirroring-tutorial/upload-files.png" alt-text="Screenshot from the Fabric portal of the Upload Files options on the home screen of an open mirrored database." lightbox="media/open-mirroring-tutorial/upload-files.png":::

1. On the **Upload files** page, upload a file using the upload dialog in the Fabric portal.
   
   > [!IMPORTANT]
   > The file name of the Parquet or delimited text file needs to match the format and filename documented. For more information, see [Open mirroring landing zone requirements and format](../mirroring/open-mirroring-landing-zone-format.md).

1. On the **Preview data** page, you can see a preview of the data you are about to upload. Provide the **Table name** a name and specify **Primary key column(s)**. Select **Create table**.

1. Once uploaded, your data immediately starts to replicate into OneLake. After a few minutes, in the **Explorer**, you can view the files that have been replicated in OneLake by selecting a file from **Uploaded files** or a table in **Tables in OneLake**.

1. From the **Replication status** in the **Explorer**, you can see how many rows have been replicated and any errors associated with the data you are mirroring into OneLake.

1. If you have changed data in a format for existing tables in your mirrored database, you can upload or drag and drop these change files. The changes are automatically reflected in OneLake. 

### Write change data into the landing zone using other mechanisms

Your application can now write initial load and incremental change data into the landing zone URL, which is your specific open mirroring path to the OneLake. 

- Follow [Connecting to Microsoft OneLake](../onelake/onelake-access-api.md) to authorize and write to the mirrored database landing zone in OneLake, using the [ADLS Gen2 API](/rest/api/storageservices/data-lake-storage-gen2).
- Review the [Open mirroring landing zone requirements and format](../mirroring/open-mirroring-landing-zone-format.md) specifications.
- Use the [Open Mirroring Python SDK](https://github.com/microsoft/fabric-toolbox/tree/main/tools/OpenMirroringPythonSDK) to get started! 

## Start mirroring process

1. The **Configure mirroring** screen allows you to mirror all data in the database, by default.
    - **Mirror all data** means that any new tables created after Mirroring is started will be mirrored.
    - Optionally, choose only certain objects to mirror. Disable the **Mirror all data** option, then select individual tables from your database.
    For this tutorial, we select the **Mirror all data** option.
1. Select **Mirror database**. Mirroring begins.
1. Wait for 2-5 minutes. Then, select **Monitor replication** to see the status.
1. After a few minutes, the status should change to *Running*, which means the tables are being synchronized.
   If you don't see the tables and the corresponding replication status, wait a few seconds and then refresh the panel.
1. When they have finished the initial copying of the tables, a date appears in the **Last refresh** column.
1. Now that your data is up and running, there are various analytics scenarios available across all of Fabric.

## Monitor Fabric Mirroring

Once mirroring is configured, you're directed to the **Mirroring Status** page. Here, you can monitor the current state of replication.

For more information and details on the replication states, see [Monitor Fabric mirrored database replication](../mirroring/monitor.md).

## Next step

> [!div class="nextstepaction"]
> [Open Mirroring Python SDK](https://github.com/microsoft/fabric-toolbox/tree/main/tools/OpenMirroringPythonSDK) 

## Related content

- [Connecting to Microsoft OneLake](../onelake/onelake-access-api.md)
- [Open mirroring landing zone requirements and format](../mirroring/open-mirroring-landing-zone-format.md)
