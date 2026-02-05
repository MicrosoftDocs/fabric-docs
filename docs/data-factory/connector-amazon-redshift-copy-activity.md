---
title: Configure Amazon Redshift in a copy activity
description: This article explains how to copy data using Amazon Redshift.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 01/22/2026
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure Amazon Redshift in a copy activity

This article outlines how to use the copy activity in pipelines to copy data from Amazon Redshift.


## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

Go to **Source** tab to configure your copy activity source. See the following content for the detailed configuration.

The following three properties are **required**:

- **Connection**:  Select an Amazon Redshift connection from the connection list. If no connection exists, then create a new Amazon Redshift connection by selecting **New**.
- **Use query**: Select from **Table** or **Query**.

    If you select **Table**: 

    - **Table**: Specify the name of the table. Select the table from the drop-down list or enter the name manually by selecting **Edit**.
    
    :::image type="content" source="./media/connector-amazon-redshift/source-table.png" alt-text="Screenshot showing Use query when selecting Table." :::

    If you select **Query**:

    - **Query**: Specify the custom query to read data. For example: `select * from MyTable`.

    :::image type="content" source="./media/connector-amazon-redshift/source-query.png" alt-text="Screenshot showing Use query when selecting Query." :::

 
Under **Advanced**, you can specify the following fields:

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. 

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). 

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Data type mapping for Amazon Redshift

When copying data from Amazon Redshift, the following mappings are used from Amazon Redshift data types to interim data types used by the service internally.

| Amazon Redshift data type | Interim service data type |
|:--- |:--- |
| BIGINT |Int64 |
| BOOLEAN |Boolean |
| CHAR |String |
| DATE |DateTime |
| DECIMAL  (Precision <= 28) |Decimal |
| DECIMAL (Precision > 28) |String |
| DOUBLE PRECISION |Double |
| INTEGER |Int32 |
| REAL |Single |
| SMALLINT |Int16 |
| TEXT |String |
| TIMESTAMP |DateTime |
| VARCHAR |String |

## Table summary

See the following table for the summary and more information of the Amazon Redshift copy activity.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **Connection** | Your connection to the source data store. | < your Amazon Redshift connection > | Yes | connection | 
|**Use query** |The way to read data. Apply **Table** to read data from the specified table or apply **Query** to read data using queries.|• **Table** <br>• **Query** |Yes |• typeProperties (under *`typeProperties`* -> *`source`*)<br>&nbsp; - schema<br>&nbsp; - table<br>• query|
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.| • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [Amazon Redshift connector overview](connector-amazon-redshift-overview.md)
