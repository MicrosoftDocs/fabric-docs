---
title: On-premises and virtual network data gateway considerations for data destinations in Dataflow Gen2
description: Learn about considerations and limitations when using a data gateway with data destinations in Dataflow Gen2.
ms.reviewer: jeluitwi
ms.topic: concept-article
ms.custom: dataflows, sfi-image-nochange
ms.date: 08/26/2025
ai-usage: ai-assisted
---

# On-premises and virtual network data gateway considerations for data destinations in Dataflow Gen2

This article explains the limitations and considerations when using the Data Gateway with data destinations in Dataflow Gen2.

## Network issues with port 1433 when referencing queries

When using Microsoft Fabric Dataflow Gen2 with an on-premises data gateway, you might face issues during the dataflow refresh process. This happens when the gateway can't connect to the dataflow staging Lakehouse to read data before using it in a query that references the staged data. Typically, this issue occurs if the firewall rules on the gateway server or the customer's proxy servers block outbound traffic to the required endpoints over port 1433.

### Scenarios where port 1433 access isn't required

Dataflow refresh should succeed without access to port 1433 in these cases:

- The dataflow has a single query that writes to a Lakehouse, and no other queries reference it.
- Fast Copy is disabled.
- The dataflow has multiple queries, but none reference each other.

### Scenarios where port 1433 access is required

If multiple queries reference each other, the dataflow refresh might fail due to network issues with port 1433. The dataflow engine needs to read data from the staging Lakehouse using the TDS protocol over port 1433. During the refresh, table refreshes might show as "Succeeded," but the activities section could display *"Failed"*. The error details for the activity `WriteToDatabaseTableFrom_...` might include the following message:

```plaintext
Mashup Exception Error: Couldn't refresh the entity because of an issue with the mashup document MashupException.Error: Microsoft SQL: A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: TCP Provider, error: 0 - An attempt was made to access a socket in a way forbidden by its access permissions.) Details: DataSourceKind = Lakehouse;DataSourcePath = Lakehouse;Message = A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: TCP Provider, error: 0 - An attempt was made to access a socket in a way forbidden by its access permissions.);ErrorCode = -2146232060;Number = 10013
```

> [!NOTE]
> The dataflow engine uses an outbound HTTPS (port 443) endpoint to write data into a Lakehouse. However, reading data from the Lakehouse requires the TDS protocol (TCP over port 1433). This explains why the first query might succeed, while a query referencing it could fail, even if both Lakehouses are in the same OneLake instance.

## Troubleshooting

To troubleshoot, review the error details for the failed table or activity. These details provide information about the encountered error.

:::image type="content" source="media/gateway-considerations-output-destination/refresh-history-detail.png" alt-text="Screenshot of the WriteToDatabaseTablefrom activity showing the error message." lightbox="media/gateway-considerations-output-destination/refresh-history-detail.png":::

## Solution: Update firewall rules on the gateway server

Update the firewall rules on the gateway server or the customer's proxy servers to allow outbound traffic to the following endpoints. If your firewall doesn't support wildcards, use the IP addresses from [Azure IP Ranges and Service Tags](https://www.microsoft.com/download/details.aspx?id=56519). Keep these in sync monthly.

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

If you can't update the firewall rules, try these workarounds:

- Combine queries that reference each other into a single query.
- Disable staging on all referenced queries.

These options aren't final solutions and might affect performance with complex transformations, but they can serve as temporary fixes until the firewall rules are updated.
