---
title: On-premises and virtual network data gateway considerations for data destinations in Dataflow Gen2
description: Learn about considerations and limitations when using a data gateway with data destinations in Dataflow Gen2.
ms.reviewer: jeluitwi
ms.topic: concept-article
ms.custom: dataflows, sfi-image-nochange
ms.date: 09/17/2026
ai-usage: ai-assisted
---

# On-premises and virtual network data gateway considerations for data destinations in Dataflow Gen2

This article explains how staging affects network requirements for Dataflow Gen2 when you use an on-premises or virtual network data gateway with a Lakehouse destination. Writing data to a lakehouse and reading staged data during a refresh have different network requirements.

The requirements in this article apply to connections from the gateway to Fabric. Data sources and other data destinations can have their own network requirements.

## Network issues with port 1433 when referencing queries

When a dataflow reads staged data through a lakehouse SQL analytics endpoint, the gateway needs outbound connectivity over TCP port 1433. The refresh can fail if firewall rules on the gateway server or proxy servers block that connection. The relevant distinction is whether the dataflow reads staged data, not how many queries it contains.

### Scenarios where port 1433 access isn't required

For staging and Lakehouse destination operations, port 1433 access isn't required when **all** of the following conditions are met:

- Fast copy is disabled.
- No query reads data from staging.
- Staging is disabled on each query that writes to a Lakehouse destination.

These conditions can apply to one or many queries. Multiple queries can write to staging, provided the dataflow doesn't read that staged data. Referencing a query that has staging disabled doesn't by itself introduce a read from staging.

Disabling fast copy alone isn't sufficient if the dataflow still reads staged data. For more information about fast copy, see [Fast copy in Dataflow Gen2](dataflows-gen2-fast-copy.md).

### Scenarios where port 1433 access is required

You need access to port 1433 when the gateway reads staged data through a SQL analytics endpoint. This requirement includes queries that directly or indirectly reference a staged query. A query that has staging enabled and writes to a Lakehouse destination can also read its staged result before writing to the destination, even if no other query references it.

During the refresh, table refreshes might show as "Succeeded," but the activities section could display *"Failed"*. The error details for the activity `WriteToDatabaseTableFrom_...` might include the following message:

```plaintext
Mashup Exception Error: Couldn't refresh the entity because of an issue with the mashup document MashupException.Error: Microsoft SQL: A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: TCP Provider, error: 0 - An attempt was made to access a socket in a way forbidden by its access permissions.) Details: DataSourceKind = Lakehouse;DataSourcePath = Lakehouse;Message = A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: TCP Provider, error: 0 - An attempt was made to access a socket in a way forbidden by its access permissions.);ErrorCode = -2146232060;Number = 10013
```

> [!NOTE]
> The dataflow engine uses outbound HTTPS (port 443) to write data into a lakehouse, including the staging lakehouse. Reading staged data through the SQL analytics endpoint uses the TDS protocol over TCP port 1433. A write can therefore succeed while a later read of the staged data fails, even if both lakehouses are in the same OneLake instance.

> [!NOTE]
> It is important to note that many proxy services are designed only for generic TCP, HTTP, or TLS traffic, and do not support TDS protocol.

## Troubleshooting

To troubleshoot, review the error details for the failed table or activity. These details provide information about the encountered error.

:::image type="content" source="media/gateway-considerations-output-destination/refresh-history-detail.png" alt-text="Screenshot of the WriteToDatabaseTablefrom activity showing the error message." lightbox="media/gateway-considerations-output-destination/refresh-history-detail.png":::

## Solution: Update firewall rules on the gateway server

For scenarios that require SQL analytics endpoint access, update the firewall rules on the gateway server or proxy servers to allow outbound traffic to the following endpoints. If your firewall doesn't support wildcards, use the IP addresses from [Azure IP Ranges and Service Tags](https://www.microsoft.com/download/details.aspx?id=56519). Keep these in sync monthly.

- **Protocol**: TCP
- **Endpoints**: *.datawarehouse.pbidedicated.windows.net, *.datawarehouse.fabric.microsoft.com, *.dfs.fabric.microsoft.com
- **Port**: 1433

> [!NOTE]
> If the capacity is in a region far from the Gateway, you might need to allow access to multiple endpoints (*.cloudapp.azure.com). If traffic to *.cloudapp.azure.com isn't intercepted by the rule, allow the [IP addresses](/data-integration/gateway/service-gateway-communication#ports) for your data region in your firewall.

To narrow the endpoint scope to the actual OneLake instance in a workspace, navigate to the Fabric workspace, locate `DataflowsStagingLakehouse`, and select **View Details**. Copy and paste the SQL connection string.

:::image type="content" source="media/gateway-considerations-output-destination/staging.png" alt-text="Screenshot of the Fabric workspace with DataflowsStagingLakehouse, with the ellipsis selected, and the View details option emphasized." lightbox="media/gateway-considerations-output-destination/staging.png":::

:::image type="content" source="media/gateway-considerations-output-destination/staging-overview.png" alt-text="Screenshot of the DataflowsStagingLakehouse details information, with the SQL connection string emphasized." lightbox="media/gateway-considerations-output-destination/staging-overview.png":::

The endpoint name looks similar to this example:

`x6eps4xrq2xudenlfv6naeo3i4-l27nd6wdk4oephe4gz4j7mdzka.datawarehouse.pbidedicated.windows.net`

## Workaround: Combine queries or disable staging

If you can't allow the required outbound traffic, disable fast copy and remove the need to read staged data:

- Combine dependent queries into a single query so that intermediate results don't need to be read from staging.
- Disable staging on all referenced queries.

For any query that writes to a Lakehouse destination, also keep staging disabled.

Alternatively, separate ingestion from transformation. Use a gateway-backed dataflow to land data in a Lakehouse destination with staging and fast copy disabled. After that dataflow completes, use a separate Dataflow Gen2 with only cloud connections to read the landed data and perform transformations. You can split the transformation logic across queries or dataflows without routing those reads through the on-premises gateway.

These workarounds can require changes to an existing dataflow design and might affect performance with complex transformations. If you split ingestion and transformation into separate dataflows, coordinate their refresh order.
