---
title: How to configure Iceberg format in the pipeline of Data Factory in Microsoft Fabric
description: This article explains how to configure Iceberg format in the pipeline of Data Factory in Microsoft Fabric.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 09/06/2024
ms.custom:
  - template-how-to
---

# Iceberg format for Data Factory in Microsoft Fabric

This article outlines how to configure Iceberg format in Data Factory.

## Supported capabilities

Iceberg format is supported for the following activities and connectors as destination.

| Category | Connector/Activity |
|---|---|
| **Supported connector** | [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-copy-activity.md) |
| **Supported activity** | [Copy activity](copy-data-activity.md) (-/destination) |

## Iceberg format in copy activity

To configure Iceberg format, choose your connection in the destination of the pipeline copy activity, and then select **Iceberg** in the drop-down list of **File format**.

:::image type="content" source="./media/format-iceberg/file-settings-iceberg.png" alt-text="Screenshot showing selecting Iceberg.":::

### Iceberg as destination

Specify the Iceberg format as the destination format to copy data. Unlike other file format, you don't need to specify the file name when coping data to the destination, and the service will generate the file names automatically.

If you apply Iceberg format and the destination file is auto created, you can map your data by referring to [Mapping](copy-data-activity.md#configure-your-mappings-under-mapping-tab) and edit the type for your destination columns.

## Table summary

### Iceberg as destination

The following properties are supported in the copy activity **Destination** section when using Iceberg format.

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **File format**|The file format that you want to use.| **Iceberg**|Yes|type (*under `datasetSettings`*):<br>Iceberg |


## Related content

- [Connectors overview](connector-overview.md)
