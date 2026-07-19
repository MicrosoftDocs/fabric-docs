---
title: Ingest Data into Your Warehouse Using BCP API (Preview)
description: Learn how to ingest data directly from client applications into a warehouse table by using bcp.exe, C# SqlBulkCopy, and Java SQLServerBulkCopy.
ms.reviewer: procha, jovanpop
ms.date: 07/01/2026
ms.topic: how-to
ms.search.form: Ingesting data
---

# Ingest data into your warehouse by using BCP API (Preview)

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

The BCP API provides a direct, client-side ingestion path to load data into [!INCLUDE [fabric-dw](includes/fabric-dw.md)] without staging files in external storage.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

The [BCP tool (bcp utility)](/sql/tools/bcp/bcp-utility?view=sql-server-ver16&preserve-view=true), [.NET `SqlBulkCopy` class](/dotnet/api/microsoft.data.sqlclient.sqlbulkcopy?view=sqlclient-dotnet-core-6.1&preserve-view=true), and [Java `SQLServerBulkCopy` class](/java/api/com.microsoft.sqlserver.jdbc.sqlserverbulkcopy?view=mssql-jdbc-12.8.0.jre11&preserve-view=true) are established ingestion methods used across SQL Server, Azure SQL, and Azure Synapse dedicated SQL pool workloads. These interfaces use the BCP API and TDS bulk-load protocol, which is typically more efficient than row-by-row `INSERT` statements for high-volume ingestion.

> [!IMPORTANT]
> For the highest ingestion throughput in production scenarios where you can stage files first, use [COPY INTO](ingest-data-copy.md).

Use BCP API when data is already in your client or application tier and you need direct ingestion into warehouse tables over a SQL connection.

## When to use BCP API

Use BCP API for direct-ingestion scenarios such as:
- Application services that keep data in memory and write in batches.
- Operational scripts and runbooks that load files through command-line automation.
- Data integration tools that use SQL bulk copy semantics.
- Existing client tools or integrations that already use BCP API semantics and can't be refactored to a `COPY INTO` staging pattern.
- Micro-batching workloads where clients push frequent small batches directly over the warehouse SQL connection.

## Prerequisites

- Use Microsoft Entra ID authentication. SQL authentication (username and password) isn't supported in [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

## Option 1: Use bcp.exe for script-based ingestion

Use the [bcp utility](/sql/tools/bcp/bcp-utility?view=sql-server-ver16&preserve-view=true) when you need repeatable command-line ingestion from scripts, scheduled jobs, or runbooks. This option is a good fit for file-based imports where you want explicit control over delimiters, encoding, batch size, and error output.

This option is also recommended when source files were created by `bcp ... out` from SQL Server, Azure SQL, or similar SQL endpoints and you want to preserve compatible bulk-copy file conventions.

Typical flow:

1. Prepare a target table in your warehouse.
1. Prepare a source file (for example CSV) with column order that matches the target, or use a format file.
1. Run `bcp ... in` with your warehouse SQL endpoint and database.
1. Tune options such as batch size and delimiters based on file size and format.

Example:

```console
bcp dbo.Sales in sales.csv -S <workspace-endpoint> -d <database> -G -U <user@domain.com> -c -t ,
```

Useful options from bcp documentation:

- `-S` sets the SQL endpoint or the [warehouse connection string](how-to-connect.md#find-the-warehouse-connection-string).
- `-d` sets the destination database.
- `-G` uses Microsoft Entra authentication. This is the only supported authentication option for this preview scenario.
- `-U` specifies your Microsoft Entra user principal name for interactive sign-in patterns.
- `-c` uses character data format.
- `-t` sets the field terminator (`,` in this example).
- `-b` can set batch size for large loads.

For full syntax and platform-specific options, see [Bulk Copy with bcp Utility](/sql/tools/bcp/bcp-utility?view=sql-server-ver16&preserve-view=true).

## Option 2: Use C# SqlBulkCopy

Use [Microsoft.Data.SqlClient.SqlBulkCopy](/dotnet/api/microsoft.data.sqlclient.sqlbulkcopy?view=sqlclient-dotnet-core-6.1&preserve-view=true) for .NET services and applications that already hold data in memory (for example, `DataTable` or `DbDataReader`). `SqlBulkCopy` streams rows efficiently to a destination table over one SQL connection. It's a better choice than issuing many individual `INSERT` statements.

Typical flow:

1. Open a SQL connection with the [warehouse connection string](how-to-connect.md#find-the-warehouse-connection-string) by using Microsoft Entra authentication.
1. Create a `SqlBulkCopy` instance and set `DestinationTableName`.
1. (Optional) Add column mappings if source and target column names or order differ.
1. Set performance-related properties such as `BatchSize` and `BulkCopyTimeout`.
1. Call `WriteToServer` or `WriteToServerAsync` to load the batch.

Example:

```csharp
using Microsoft.Data.SqlClient;

using var connection = new SqlConnection(connectionString);
await connection.OpenAsync();

using var bulk = new SqlBulkCopy(connection);
bulk.DestinationTableName = "dbo.Sales";
await bulk.WriteToServerAsync(dataTable);
```

Common tuning options include `BatchSize`, `BulkCopyTimeout`, and explicit column mappings where source and target schemas differ.

## Option 3: Use Java SQLServerBulkCopy

Use [SQLServerBulkCopy](/java/api/com.microsoft.sqlserver.jdbc.sqlserverbulkcopy?view=mssql-jdbc-12.8.0.jre11&preserve-view=true) in Java services that ingest data from JDBC sources or in-memory data streams. It provides bulk-loading behavior similar to bcp.exe, but directly in application code.

Typical flow:

1. Open a JDBC connection with the [warehouse connection string](how-to-connect.md#find-the-warehouse-connection-string) by using Microsoft Entra authentication.
1. Create a `SQLServerBulkCopy` instance and set `setDestinationTableName`.
1. (Optional) Configure `SQLServerBulkCopyOptions` and column mappings.
1. Provide the source data as `ResultSet`, `RowSet`, or `ISQLServerBulkRecord`.
1. Call `writeToServer` to ingest data.

Example:

```java
try (SQLServerBulkCopy bulkCopy = new SQLServerBulkCopy(connectionString)) {
    bulkCopy.setDestinationTableName("dbo.Sales");
    bulkCopy.writeToServer(resultSet);
}
```

The JDBC bulk copy API supports writing from `ResultSet`, `RowSet`, and `ISQLServerBulkRecord` sources.

## Remarks on bulk copy option support

This section explains how common bulk copy options behave in Fabric Data Warehouse. The option names map to settings in .NET `SqlBulkCopyOptions`, Java `SQLServerBulkCopyOptions`, and related bcp bulk-load hints.

### Not applicable options

Common client APIs accept the following options, but bulk copy in Fabric Data Warehouse ignores them and uses default service behavior:

- `CheckConstraints`
- `TableLock`
- `KeepNulls`
- `FireTriggers`

## Performance considerations

Bulk copy performance depends heavily on batch sizing and client upload network quality.

### Batch size

Batch size has a major impact on throughput. Each batch has fixed processing overhead, so sending very small batches (for example, tens or hundreds of rows) can significantly reduce performance when loading large datasets.

For larger loads, use larger batches. A practical target is roughly **150 MB to 1 GB per batch**.

A good starting point for many workloads is **250 MB to 500 MB per batch**, then adjust based on throughput and client memory limits.

### Client upload connection quality

Bulk copy streams data from the client to the warehouse endpoint. If upload bandwidth is limited or network latency is high, ingestion throughput can decrease even when warehouse resources are available.

For best performance, run the client application in the same Azure region as the warehouse and use a high-bandwidth, low-latency network path.

## BCP API compared to COPY INTO

- Use **BCP API** when data is generated or held in the client/application tier and direct ingestion is required.
- Use `COPY INTO` when you can stage files in storage and want the primary server-side path for highest-throughput ingestion.

## Related content

- [Ingest data into the warehouse](ingest-data.md)
- [Ingest data into your Warehouse using the COPY statement](ingest-data-copy.md)
- [Using Bulk Copy API for faster ingestion in Fabric Data Warehouse (blog)](https://community.fabric.microsoft.com/t5/Fabric-Updates-Blog/Using-Bulk-Copy-API-for-faster-ingestion-in-Fabric-Data/ba-p/5195627)
- [Bulk Copy with bcp Utility](/sql/tools/bcp/bcp-utility?view=sql-server-ver16&preserve-view=true)
- [SqlBulkCopy Class](/dotnet/api/microsoft.data.sqlclient.sqlbulkcopy?view=sqlclient-dotnet-core-6.1&preserve-view=true)
- [SQLServerBulkCopy Class](/java/api/com.microsoft.sqlserver.jdbc.sqlserverbulkcopy?view=mssql-jdbc-12.8.0.jre11&preserve-view=true)
- [Using bulk copy with the JDBC driver](/sql/connect/jdbc/using-bulk-copy-with-the-jdbc-driver?view=sql-server-ver16&preserve-view=true)
