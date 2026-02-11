---
title: "Tutorial: Copy job with SAP Datasphere Outbound (Preview)"
description: Learn how to configure Copy job for SAP Datasphere Outbound.
ms.reviewer: jingwang
ms.date: 01/28/2026
ms.topic: tutorial
---

# Change Data Capture from SAP via SAP Datasphere Outbound in Copy job (Preview)  

This tutorial introduces how to set up CDC replication in Copy job from SAP via SAP Datasphere Outbound. For a CDC overview in Copy job, refer to [Change data capture (CDC) in Copy job](cdc-copy-job.md).

Using SAP Datasphere Outbound to obtain change data from SAP is a two-step process:

1. Extract data with SAP Datasphere:

    Use SAP Datasphere to extract both the initial snapshot and subsequent changed records from the SAP source system. The extracted data is then landed in an Azure Data Lake Storage Gen2, Amazone S3 or Google Cloud Storage, which serves as a staging area.

2. Move data with Copy job:

    Use Copy Job to connect to a staging container in your cloud storage and replicate data—including inserts, updates, and deletions—to any supported destination.

This solution supports all types of SAP sources offered by SAP Datasphere, including SAP S/4HANA, SAP ECC, SAP BW/4HANA, SAP BW, and SAP Datasphere itself.

SAP Datasphere Premium Outbound Integration pricing applies when using Copy job to replicate SAP data via SAP Datasphere.

## Prerequisites

You need:

- An existing capacity for Fabric. If you don't have one, [start a Fabric trial](../fundamentals/fabric-trial.md).
- An SAP Datasphere environment with Premium Outbound Integration.

## Set up SAP Datasphere

This section covers the setup steps you need to replicate data from your SAP source into an Azure Data Lake Storage (ADLS) Gen2, Amazon S3 or Google Cloud Storage. You'll use this later to configure the Copy job in Fabric.

### Set up connections in SAP Datasphere

Before you can replicate data from your SAP source into cloud storage, you need to create connections to both source and target in SAP Datasphere.

1. Go to SAP Datasphere, and select the **Connection** tool. You might need to select the Space where you want to create the connection.

1. Create the connection to your source SAP system. Select **+** -> **Create Connection**, choose the SAP source from which you want to replicate the data, and configure the connection details. As an example, you can [create connection to SAP S/4HANA on-premises](https://help.sap.com/docs/SAP_DATASPHERE/be5967d099974c69b77f4549425ca4c0/a49a1e3cc50f4af89711d8306bdd8f26.html?version=LATEST).

1. Create the connection to your target ADLS Gen2, Amazon S3 or Google Cloud Storage. Select **Create Connection** and choose the proper type. For example, for ADLS Gen2, enter the storage account name, the container name (under root path), your preferred authentication type, and the credential. Make sure the connection user/principal has enough privileges to create files and folders in ADLS Gen2. Learn more from [Microsoft Azure Data Lake Store Gen2 Connections](https://help.sap.com/docs/SAP_DATASPHERE/be5967d099974c69b77f4549425ca4c0/cd06b3c5ab5147c0905e3fa8abd13eb1.html?version=LATEST).

1. Before you continue, validate your connections by selecting your connection and choosing the **Validate** option in the top menu.

    :::image type="content" source="media/copy-job/sap-datasphere-connections.png" alt-text="Screenshot of the connections in SAP Datasphere." lightbox="media/copy-job/sap-datasphere-connections.png":::

### Set up a Datasphere replication flow

Create a replication flow to replicate data from your SAP source into cloud storage. For more information on this configuration, see the SAP help on [creating a replication flow](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/25e2bd7a70d44ac5b05e844f9e913471.html?version=LATEST).

1. Launch the **Data Builder** in SAP Datasphere.

1. Select **New Replication Flow**.

1. When the replication flow canvas opens, select **Select Source Connection**, and select the connection you created for your SAP source system.

1. Select the appropriate source container, which is the type of source objects you want to replicate from. The following example uses CDS_EXTRACTION to replicate data from CDS views in an SAP S/4HANA on-premises source system. Then select **Select**.

    :::image type="content" source="media/copy-job/sap-datasphere-select-source-container.png" alt-text="Screenshot of selecting the source container in replication flow." lightbox="media/copy-job/sap-datasphere-select-source-container.png":::

1. Select **Add Source Objects** to choose the source objects you want to replicate. After you select all your sources, select **Next**.

    :::image type="content" source="media/copy-job/sap-datasphere-select-source-objects.png" alt-text="Screenshot of selecting the source objects in replication flow." lightbox="media/copy-job/sap-datasphere-select-source-objects.png":::

1. Configure the target cloud storage. Select the target connection and container. Check that the target settings are correct: **Group Delta** is set to **None** and **File Type** is set to **Parquet**.

    :::image type="content" source="media/copy-job/sap-datasphere-target-settings.png" alt-text="Screenshot of ADLS Gen2 target settings." lightbox="media/copy-job/sap-datasphere-target-settings.png":::

1. Configure the detail settings for the replication. Select **Settings** in the middle section of the canvas. Check and adjust the selected **Load Type** if needed. Currently, mirroring supports **Initial and Delta**.

    :::image type="content" source="media/copy-job/sap-datasphere-load-type.png" alt-text="Screenshot of replication flow load type settings." lightbox="media/copy-job/sap-datasphere-load-type.png":::

1. In the **Run Settings** dialog, you can adjust the load frequency of the replication and adjust resources if needed.

1. Deploy and run the replication to replicate the data.

1. Go to your storage container and validate the data is replicated.

## Create a Copy job

This section explains how to create a Copy job to replicate data from SAP via SAP Datasphere Outbound.

1. In your workspace, select **New item** and find **Copy job**.

1. Select the SAP Datasphereo outbound for ADLS Gen2, Amazon S3 or Google Cloud Storage, and set up the connection details.

    :::image type="content" source="media/copy-job/copy-job-sap-datasphere-adls-gen2-connections.png" alt-text="Screenshot of browsing the lakehouse and selecting the path." lightbox="media/copy-job/copy-job-sap-datasphere-adls-gen2-connections.png":::

1. Specify the folders where your SAP Datasphere outbound data is stored and that you want to move to your destinations.
   
1. The remaining steps are the same as CDC replication for any other CDC-enabled source.


## Limitations

- Copy job for SAP CDC via SAP Datasphere supports all types of SAP sources offered by SAP Datasphere, including SAP S/4HANA, SAP ECC, SAP BW/4HANA, SAP BW, and SAP Datasphere itself. Refer to [SAP Datasphere replication flow documentation](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/25e2bd7a70d44ac5b05e844f9e913471.html) for details.

- SAP Datasphere replication flow setup requirements:

  - Ensure you configure the target storage settings propertly: set **Group Delta** to **None** and set **File Type** to **Parquet**.
  - Currently, SAP mirroring supports replication flow load type as **Initial and Delta**.

- Once the Copy job is configured, you can monitor the current state of replication from cloud storage to supported destinations. If you observe a delay in the appearance of mirrored data, also check the SAP Datasphere replication flow status and if the data is replicated into the storage.


## Related content

* [CDC in Copy job](cdc-copy-job.md)
