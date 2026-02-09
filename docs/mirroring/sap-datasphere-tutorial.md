---
title: "Tutorial: Configure Microsoft Fabric Mirrored Databases to Mirror SAP via SAP Datasphere (Preview)"
description: Learn how to mirror SAP systems via SAP Datasphere. Set up connections, replicate data, and integrate with Fabric for data management.
ms.reviewer: jingwang
ms.date: 11/03/2025
ms.topic: tutorial
---

# Mirroring SAP via SAP Datasphere (Preview)

[Mirroring in Fabric](../mirroring/overview.md) is an enterprise, cloud-based, zero-ETL, SaaS technology. In this section, you learn how to create a mirrored SAP database, which creates a read-only, continuously replicated copy of your SAP data in OneLake.

This tutorial introduces how to set up mirrored SAP via SAP Datasphere. For a solution overview, refer to [Mirroring for SAP via SAP Datasphere](sap.md#mirroring-for-sap-via-sap-datasphere).

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Prerequisites

You need:

- An existing capacity for Fabric. If you don't have one, [start a Fabric trial](../fundamentals/fabric-trial.md).
- An SAP Datasphere environment with Premium Outbound Integration.

## Set up SAP Datasphere

This section covers the setup steps you need to replicate data from your SAP source into an Azure Data Lake Storage (ADLS) Gen2 container. You'll use this container later to configure the mirrored SAP database in Fabric.

>[!TIP]
>If you already have running replication flow to replicate data into ADLS Gen2, you can skip this section and [create mirrored database](#create-a-mirrored-sap-database-via-sap-datasphere).

### Set up connections in SAP Datasphere

Before you can replicate data from your SAP source into ADLS Gen2, you need to create connections to both source and target in SAP Datasphere.

1. Go to SAP Datasphere, and select the **Connection** tool. You might need to select the Space where you want to create the connection.

1. Create the connection to your source SAP system. Select **+** -> **Create Connection**, choose the SAP source from which you want to replicate the data, and configure the connection details. As an example, you can [create connection to SAP S/4HANA on-premises](https://help.sap.com/docs/SAP_DATASPHERE/be5967d099974c69b77f4549425ca4c0/a49a1e3cc50f4af89711d8306bdd8f26.html?version=LATEST).

1. Create the connection to your ADLS Gen2 target. Select **Create Connection** and choose Azure Data Lake Storage Gen2. Enter the storage account name, the container name (under root path), your preferred authentication type, and the credential. Make sure the connection user/principal has enough privileges to create files and folders in ADLS Gen2. Learn more from [Microsoft Azure Data Lake Store Gen2 Connections](https://help.sap.com/docs/SAP_DATASPHERE/be5967d099974c69b77f4549425ca4c0/cd06b3c5ab5147c0905e3fa8abd13eb1.html?version=LATEST).

1. Before you continue, validate your connections by selecting your connection and choosing the **Validate** option in the top menu.

    :::image type="content" source="media/sap-datasphere-tutorial/sap-datasphere-connections.png" alt-text="Screenshot of the connections in SAP Datasphere." lightbox="media/sap-datasphere-tutorial/sap-datasphere-connections.png":::

### Set up a Datasphere replication flow

Create a replication flow to replicate data from your SAP source into ADLS Gen2. For more information on this configuration, see the SAP help on [creating a replication flow](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/25e2bd7a70d44ac5b05e844f9e913471.html?version=LATEST).

1. Launch the **Data Builder** in SAP Datasphere.

1. Select **New Replication Flow**.

1. When the replication flow canvas opens, select **Select Source Connection**, and select the connection you created for your SAP source system.

1. Select the appropriate source container, which is the type of source objects you want to replicate from. The following example uses CDS_EXTRACTION to replicate data from CDS views in an SAP S/4HANA on-premises source system. Then select **Select**.

    :::image type="content" source="media/sap-datasphere-tutorial/sap-datasphere-select-source-container.png" alt-text="Screenshot of selecting the source container in replication flow." lightbox="media/sap-datasphere-tutorial/sap-datasphere-select-source-container.png":::

1. Select **Add Source Objects** to choose the source objects you want to replicate. After you select all your sources, select **Next**.

    :::image type="content" source="media/sap-datasphere-tutorial/sap-datasphere-select-source-objects.png" alt-text="Screenshot of selecting the source objects in replication flow." lightbox="media/sap-datasphere-tutorial/sap-datasphere-select-source-objects.png":::

1. Configure the target ADLS Gen2. Select the target connection and container. Check that the target settings are correct: **Group Delta** by is set to **None** and **File Type** is set to **Parquet**.

    :::image type="content" source="media/sap-datasphere-tutorial/sap-datasphere-target-settings.png" alt-text="Screenshot of ADLS Gen2 target settings." lightbox="media/sap-datasphere-tutorial/sap-datasphere-target-settings.png":::

1. Configure the detail settings for the replication. Select **Settings** in the middle section of the canvas. Check and adjust the selected **Load Type** if needed. Currently, mirroring supports **Initial and Delta**.

    :::image type="content" source="media/sap-datasphere-tutorial/sap-datasphere-load-type.png" alt-text="Screenshot of replication flow load type settings." lightbox="media/sap-datasphere-tutorial/sap-datasphere-load-type.png":::

1. In the **Run Settings** dialog, you can adjust the load frequency of the replication and adjust resources if needed.

1. Deploy and run the replication to replicate the data.

1. Go to your ADLS Gen2 container and validate the data is replicated.

## Create a mirrored SAP database (via SAP Datasphere)

This section explains how to create the mirrored SAP database in Fabric.

## Create a Lakehouse shortcut

1. Open the [Fabric portal](https://fabric.microsoft.com).

1. [Create a lakehouse](../onelake/create-lakehouse-onelake.md) or reuse an existing lakehouse.

1. In your lakehouse, [create an Azure Data Lake Storage Gen2 shortcut](../onelake/create-adls-shortcut.md) to the storage container where SAP Datasphere replicates the source SAP data. Make sure you select the whole storage container when creating the shortcut:

    :::image type="content" source="media/sap-datasphere-tutorial/lakehouse-shortcut-adls-dialog.png" alt-text="Screenshot of the Lakehouse shortcut creation dialog for connecting to an ADLS container." lightbox="media/sap-datasphere-tutorial/lakehouse-shortcut-adls-dialog.png":::

1. Validate you can see the SAP data in your lakehouse under "Files".

### Create a mirrored database

1. In your workspace, select **New item** and find **Mirrored SAP (preview)**.

1. Select the lakehouse name that contains the shortcut to your ADLS Gen2 storage container from the OneLake catalog.

1. Select **Browse** and select the root folder that contains the replicated SAP data (`datasphere` in this example). You can also directly enter the shortcut path (omit the prefix "Files/") in the input box. Select **OK**, then **Next**.

    :::image type="content" source="media/sap-datasphere-tutorial/browse-lakehouse-and-select-path.png" alt-text="Screenshot of browsing the lakehouse and selecting the path." lightbox="media/sap-datasphere-tutorial/browse-lakehouse-and-select-path.png":::

1. Enter a name for the mirrored SAP database, and select **Create mirrored database**.

1. Mirroring begins and you're taken to the monitoring page. After a few minutes, you'll see the number of rows replicated and can view your data in the SQL analytics endpoint.

    :::image type="content" source="media/sap-datasphere-tutorial/monitor-replication.png" alt-text="Screenshot of monitoring the mirrored database for SAP." lightbox="media/sap-datasphere-tutorial/monitor-replication.png":::

## Monitor Fabric mirroring

Once mirroring is configured, you're directed to the **Mirroring Status** page. Here, you can monitor the current state of replication. For more information and details on the replication states, see [Monitor Fabric mirrored database replication](../mirroring/monitor.md).

## Related content

* [SAP mirroring overview](sap.md)
* [Limitations in Microsoft Fabric mirrored databases from SAP](sap-limitations.md)
