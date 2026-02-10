---
title: "Limitations in Microsoft Fabric mirrored databases from SAP"
description: Learn about the limitations in mirrored databases from SAP in Microsoft Fabric.
ms.reviewer: jingwang
ms.date: 11/03/2025
ms.topic: concept-article
---

# Limitations in Microsoft Fabric mirrored databases from SAP

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Current limitations in the [mirroring SAP in Microsoft Fabric](sap.md) are listed in this page. This page is subject to change.

## Mirrored SAP via SAP Datasphere

- Mirroring for SAP via SAP Datasphere supports all types of SAP sources offered by SAP Datasphere, including SAP S/4HANA, SAP ECC, SAP BW/4HANA, SAP BW, and SAP Datasphere itself. Refer to [SAP Datasphere replication flow documentation](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/25e2bd7a70d44ac5b05e844f9e913471.html) for details.

- SAP Datasphere replication flow setup requirements:

  - Ensure you configure the target storage settings propertly: set **Group Delta** to **None** and set **File Type** to **Parquet**.
  - Currently, SAP mirroring supports replication flow load type as **Initial and Delta**.

- Mirroring for SAP replicates all the data under the lakehouse shortcut path configured in the mirrored database. To add or remove the objects to mirror, update the SAP Datasphere replication flow and clean up the storage if needed.

- Once the mirrored database is configured, you can [monitor](monitor.md) the current state of replication. The **Monitor replication** section shows the status and metrics from ADLS Gen2 to mirrored database. If you observe a delay in the appearance of mirrored data, also check the SAP Datasphere replication flow status and if the data is replicated into the storage.

## Supported regions

Database mirroring is available in all Microsoft Fabric regions. For more information, see [Fabric region availability](../admin/region-availability.md).

## Related content

- [SAP mirroring overview](sap.md)
- [Tutorial to set up mirroring for Google BigQuery](google-bigquery-tutorial.md)
