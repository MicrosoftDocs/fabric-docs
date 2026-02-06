---
title: Spark Connector in Microsoft Fabric
description: Learn how to use the Spark Connector in Microsoft Fabric.
ms.reviewer: misaacs
ms.topic: how-to
ms.date: 06/10/2024
ms.custom:
  - template-how-to
  - connectors
---

# Spark connector overview

The Spark connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities. The **Spark connector** in Microsoft Fabric enables you to access data from Spark servers. It supports reading tables, views, and executing custom T-SQL queries for advanced analytics and transformations.

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|None<br> On-premises<br> Virtual network |Spark<br> Microsoft Account|


## Prerequisites

Before you use the Spark connector, make sure you have:

- Access to a **Fabric workspace** with a Data Warehouse or Lakehouse.
- **Read permissions** on the warehouse or SQL analytics endpoint (similar to `CONNECT` in SQL Server).
- For SQL databases, permissions such as `db_datareader` and `db_datawriter`; optionally `db_owner` for full control.

>[!TIP]
> If you are using Spark connector v1.0, upgrade to v2.0 for improved native Spark support. 

## Supported capabilities

- **Read from tables and views** in Fabric Data Warehouse or Lakehouse.
- **Run custom T-SQL queries** from Spark.
- **Integrated security** with Microsoft Entra ID.
- **Object-level, row-level, and column-level security** enforced automatically.


## Authentication

- Uses **Microsoft Entra ID** for authentication and authorization.
- When signed into a Fabric workspace, credentials are automatically passed to the SQL engine.
- No additional configuration is required if Entra ID is enabled.



## Configuration steps

The Spark connector is included in the Fabric runtime; no manual installation is needed.

### Connect to Data Warehouse or Lakehouse
Example for reading a table:
```scala
synapsesql(tableName: String = "<Warehouse.Schema.Table>")
```

Example for running a custom query:
```spark.read
  .option(Constants.DatabaseName, "`<warehouse>`")
  .synapsesql("`<T-SQL Query>`")
  ```

## Security
- Enforces OLS, RLS, and CLS as defined at the SQL engine level. 



## Related content
Feel free to reference:
- [Spark's SQL programming guide](https://spark.apache.org/docs/latest/sql-programming-guide.html)
- [Fabrics Data Factor Connector Overview](connector-overview.md)