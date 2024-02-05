---
title: Configure Amazon Redshift in a copy activity
description: This article explains how to copy data using Amazon Redshift.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Amazon Redshift in a copy activity

This article outlines how to use the copy activity in data pipelines to copy data from Amazon Redshift.


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

:::image type="content" source="./media/connector-amazon-redshift/source.png" alt-text="Screenshot showing source tab and the list of properties.":::

The following three properties are **required**:

- **Data store type**: Select **External**.
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

## Table summary

See the following table for the summary and more information of the Amazon Redshift copy activity.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **Data store type** | Your data store type. | **External** | Yes | / | 
| **Connection** | Your connection to the source data store. | < your Amazon Redshift connection > | Yes | connection | 
|**Use query** |The way to read data. Apply **Table** to read data from the specified table or apply **Query** to read data using queries.|• **Table** <br>• **Query** |Yes |• typeProperties (under *`typeProperties`* -> *`source`*)<br>&nbsp; - schema<br>&nbsp; - table<br>• query|
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.| • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [Amazon Redshift connector overview](connector-amazon-redshift-overview.md)
