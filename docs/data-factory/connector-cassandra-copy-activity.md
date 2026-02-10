---
title: Configure Cassandra in a copy activity
description: This article explains how to copy data using Cassandra.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 07/31/2025
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure Cassandra in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from Cassandra.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for Cassandra under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-cassandra/source.png" alt-text="Screenshot showing the source tab and the list of properties." lightbox="./media/connector-cassandra/source.png":::

The following properties are **required**:

- **Connection**: Select a Cassandra connection from the connection list. If no connection exists, then create a new Cassandra connection.

- **Use query**: Select **Table** or **Query**.
    - If you select **Table**:
        - **Keyspace**: Specify the name of the keyspace or schema in Cassandra database.
        - **Table**: Specify the name of the table in Cassandra database to read data.

    - If you select **Query**:

    - **Query**: Specify the custom CQL query to read data. For more information about CQL query, see [CQL reference](https://docs.datastax.com/en/archived/cql/3.1/cql/cql_reference/cqlReferenceTOC.html).

      :::image type="content" source="./media/connector-cassandra/query.png" alt-text="Screenshot showing query." lightbox="./media/connector-cassandra/query.png":::

Under **Advanced**, you can specify the following fields:

- **Consistency level**: The consistency level specifies how many replicas must respond to a read request before returning data to the client application. Cassandra checks the specified number of replicas for data to satisfy the read request. See [Configuring data consistency](https://docs.datastax.com/en/cassandra/2.1/cassandra/dml/dml_config_consistency_c.html) for details.<br/>Allowed values are: **ONE** (default), **TWO**, **THREE**, **QUORUM**, **ALL**, **LOCAL_QUORUM**, **EACH_QUORUM**, and **LOCAL_ONE**.

- **Additional columns**: Add more data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). If you choose Binary as your file format, mapping won't be supported.

### Settings

For **Settings** tab configuration, see [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Cassandra.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|< your Cassandra connection >|Yes|connection|
|**Use query** |The way to read data from Cassandra. Apply **Table** to read data from the specified table or apply **Query** to read data using queries.| • **Table**<br>  • **Query** |No| / |
| For ***Table*** | | | | |
|**Keyspace** |Name of the keyspace or schema in Cassandra database.|< your keyspace >| No (if **Query** is specified) |keyspace|
|**Table** |Name of the table in Cassandra database to read data.|< your table name >| No (if **Query** is specified) |tableName|
| For ***Query*** | | | | |
| **Query** | Use the custom CQL query to read data. | < CQL queries > | No (if **Keyspace** and **Table** are specified) | query |
| | | | | |
| **Consistency level** | The consistency level specifies how many replicas must respond to a read request before returning data to the client application. Cassandra checks the specified number of replicas for data to satisfy the read request. See [Configuring data consistency](https://docs.datastax.com/en/cassandra/2.1/cassandra/dml/dml_config_consistency_c.html) for details.<br/><br/>Allowed values are: **ONE** (default), **TWO**, **THREE**, **QUORUM**, **ALL**, **LOCAL_QUORUM**, **EACH_QUORUM**, and **LOCAL_ONE**. | < your consistency level > | No |consistencyLevel:<br>• one (default) <br>• two <br>• three <br>• quorum <br>• all <br>• local_quorum <br>• each_quorum <br>• local_one|
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. |• Name <br>• Value | No | additionalColumns:<br> • name<br>• value|

## Related content

- [Cassandra connector overview](connector-cassandra-overview.md)
