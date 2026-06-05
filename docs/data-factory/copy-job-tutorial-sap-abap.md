---
title: "Tutorial: Copy job with SAP ABAP Add-On (Preview)"
description: Learn how to use SAP ABAP Add-On to copy data from SAP systems in Copy Job.
ms.reviewer: jingwang
ms.date: 06/03/2026
ms.topic: tutorial
---

# Copy job for SAP via ABAP Add-On (preview)

Copy job for SAP via ABAP Add-On extends the built-in SAP connectors (SAP HANA, SAP Table, and SAP BW OpenHub) in Fabric. It extracts data from SAP using a proprietary Microsoft Data Integration ABAP Add-On installed on your SAP server, providing more scalable and flexible data ingestion with advanced capabilities than the classic connector.

:::image type="content" source="media/copy-job-tutorial-sap-abap/sap-abap-overview.png" alt-text="Screenshot of the copy job for SAP via ABAP Add-On ovverview." lightbox="media/copy-job-tutorial-sap-abap/sap-abap-overview.png":::

During the copy job execution, on-premises data gateway connects to the SAP application server and triggers data extraction, while the data is written directly from SAP to OneLake staging, then to the destination store.

## Supported capabilities

- **Supported SAP source systems:** The Microsoft Data Integration ABAP Add-On supports **SAP S/4HANA (all versions)** and **SAP ECC 6.0 EhP 8 (based on SAP NetWeaver 7.50)**. SAP ECC 6.0 EhP 7 (based on SAP NetWeaver 7.40) or earlier version isn't supported. Import into unsupported SAP versions may fail with syntax errors.

- **Supported SAP source objects:** Copy job for SAP via ABAP Add-On reads data from SAP sources using ABAP SQL on the SAP application server. It can copy data from **tables (transparent, pool, cluster)**, **views**, and **CDS views**. To extract data from a CDS view, use the SQL view name given in the CDS view definition.

- It supports both **full and incremental** (watermark-based) [copy modes](what-is-copy-job.md#copy-modes-full-copy-incremental-copy) in copy job. For incremental copy, as examples, you can use long timestamps in format `YYYYMMDDhhmmss.mmmuuun` (for example, domain `TZNTSTMPL`, DEC length 21 with 7 decimals), short timestamps in format `YYYYMMDDhhmmss` (for example, domain `TZNTSTMPS`, DEC length 15 with 0 decimals), date columns of type `DATS` as watermark.

## Prerequisites

You need:

- An existing capacity for Fabric. If you don't have one, [start a Fabric trial](../fundamentals/fabric-trial.md).
- [Set up an on-premises data gateway](#set-up-on-premises-data-gateway).
- [Set up your SAP system](#set-up-sap-system) to import the ABAP Add-On transports.

### Set up on-premises data gateway

1. [Install the latest on-premises data gateway](/data-integration/gateway/service-gateway-install). The minimal supported version is May 2026.
1. Download the 64-bit [SAP Connector for Microsoft .NET](https://support.sap.com/en/product/connectors/msnet.html?anchorId=section_512604546) from SAP website, and install it on the on-premises data gateway machine.
1. Ensure your gateway machine allows outbound HTTPS communication to Fabric OneLake (`*.onelake.fabric.microsoft.com`). The gateway connects to OneLake during copy job execution.

### Set up SAP system

1. [Download the Microsoft Data Integration ABAP Add-On](https://aka.ms/sap-copyjob-abap-download). Share these transport files with your SAP admin for installation in your SAP ECC or SAP S/4HANA system.

    > [!NOTE]
    > Follow the README.md file in the download package to rename the transport files properly before importing them into the SAP systems.

1. Ensure your SAP system's firewall allows:

      - Inbound RFC communication from the on-premises data gateway machine.
      - Outbound HTTPS communication to Fabric OneLake (`*.onelake.fabric.microsoft.com`). The ABAP Add-On writes data into OneLake during copy job execution.

## Create a Copy job

Complete the following steps to create a new Copy job to ingest data from SAP via ABAP Add-On to a destination:

1. In your workspace, select **New item**, choose **Copy job**, name your Copy job, and select **Create**.

1. Select **SAP Table Application Server**, and set up the connection details. You can also choose an existing connection of this type you created upfront.

1. Select the **Use ABAP Add-On (Preview)** option, and configure the tables to copy. The UI offers two ways to select source tables for extraction.

    - **Select from list**
    - **Enter manually**

    In some cases, such as SAP S/4HANA, **Select from list** fails because the list of retrieved tables/views exceeds 300,000 objects. **Enter manually** works independently of the SAP source system type.

    :::image type="content" source="media/copy-job-tutorial-sap-abap/sap-abap-add-on-option.png" alt-text="Screenshot showing the Use ABAP Add-On option in the copy job configuration." lightbox="media/copy-job-tutorial-sap-abap/sap-abap-add-on-option.png":::

1. To enter table name manually, click **+ New**, enter the name of the table, view, or CDS View (use the corresponding SQL view name) you want to extract. The preview functionality shows you a small data sample of your source object.

    :::image type="content" source="media\copy-job-tutorial-sap-abap\sap-abap-enter-table-name.png" alt-text="Screenshot showing manual entry of a source table or view for extraction." lightbox="media\copy-job-tutorial-sap-abap\sap-abap-enter-table-name.png":::

1. Select your destination store and configure the connection.

1. Choose the copy mode - full copy or incremental copy.

1. For incremental copy:

    1. Select an **incremental column** from the drop-down menu. The drop-down menu lists all columns with data types supported as incremental watermarks.

        :::image type="content" source="media\copy-job-tutorial-sap-abap\sap-abap-configure-incremental-copy.png" alt-text="Screenshot showing incremental copy mode and incremental column selection." lightbox="media\copy-job-tutorial-sap-abap\sap-abap-configure-incremental-copy.png" :::

    1. Click **Edit write method** to configure how new data is updated to the destination. In the dialog, select **Merge** as update method, and add the **key columns** of each source object.

        :::image type="content" source="media\copy-job-tutorial-sap-abap\sap-abap-configure-key-columns.png" alt-text="Screenshot showing the Edit write method dialog with Merge selected and key columns added." lightbox="media\copy-job-tutorial-sap-abap\sap-abap-configure-key-columns.png":::

1. Review the job summary, (optionally) set the run option to on schedule, and select **Save + Run**.

1. Your copy job starts immediately. [Monitor the copy job](monitor-copy-job.md).

## Known limitations

- Table name with special character (e.g. `/`) is currently not supported.
- Data type handling: Copy job maps SAP data types to the best corresponding data types on the destination. For example, `DATS` columns in SAP are mapped to `Timestamp` in Delta tables in a Fabric Lakehouse. If your data contains invalid values (for example, an arbitrary sequence of 8 characters in such case), which technically is allowed in SAP, copy job fails.
- Copy operation times out after 12 hours (from SAP to OneLake staging) or 24 hours for end-to-end per table. You may encounter error when copying large amount of data.
- Connecting to SAP Message Server currently isn't supported.
- When using date type column as watermark in incremental copy, copy job doesn't apply [delayed extraction](incremental-copy-job.md#supported-watermark-column-types). If you run multiple times in a day, incremental data may be retrieved multiple times. Use merge as the update method in the destination setting.

## Related content

* [What is a Copy job?](what-is-copy-job.md)
