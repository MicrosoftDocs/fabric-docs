---
title: On-premise and VNET data gateway considerations for data destinations in Dataflow Gen2
description: Describes multiple considerations and limitations when using a data gateway and the data destination feature inside of Dataflow Gen2
author: whhender
ms.author: whhender
ms.topic: conceptual
ms.custom: dataflows, sfi-image-nochange
ms.date: 04/30/2025
---

# On-premise and VNET data gateway considerations for data destinations in Dataflow Gen2

This article lists the limitations and considerations when using the Data Gateway with data destinations scenarios in Dataflow Gen2.

## Network issues with port 1433 when referencing queries

When using Microsoft Fabric Dataflow Gen2 with an on-premises data gateway, you might encounter issues with the dataflow refresh process. The underlying problem occurs when the gateway is unable to connect to the dataflow staging Lakehouse in order to read the data before using it in the query that referenced the staged data. This issue is no longer a problem if you have a single query that isn't referencing staged data and writes to a data destination.

During the overall dataflow refresh, the tables refresh can show as "Succeeded," but the activities section shows as *"Failed"*. The error details for the activity `WriteToDatabaseTableFrom_...` indicate the following error:

```Mashup Exception Error: Couldn't refresh the entity because of an issue with the mashup document MashupException.Error: Microsoft SQL: A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: TCP Provider, error: 0 - An attempt was made to access a socket in a way forbidden by its access permissions.) Details: DataSourceKind = Lakehouse;DataSourcePath = Lakehouse;Message = A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: TCP Provider, error: 0 - An attempt was made to access a socket in a way forbidden by its access permissions.);ErrorCode = -2146232060;Number = 10013```

>[!NOTE]
>From an architectural perspective, the dataflow engine uses an outbound HTTPS (port 443) endpoint to write data into a Lakehouse. However, reading data from the Lakehouse requires the use of the TDS protocol (TCP over port 1433). This protocol is utilized to copy the data from the staging lakehouse to the referenced query for further processing. This explains why the first query succeeds, while the query referencing the first query might fail, even when both lakehouses are in the same OneLake instance.

### Troubleshooting

To troubleshoot the issue, review the error details for the failed table or activity, which provides information about the encountered error.

   :::image type="content" source="media/gateway-considerations-output-destination/refresh-history-detail.png" alt-text="Screenshot of the WriteToDatabaseTablefrom activity showing the error message." lightbox="media/gateway-considerations-output-destination/refresh-history-detail.png":::

### Solution: Set new firewall rules on server running the gateway

The firewall rules on the gateway server and/or customer's proxy servers need to be updated to allow outbound traffic from the gateway server to the below endpoints. If your firewall doesn't support wildcards, 
then use the IP addresses from [Azure IP Ranges and Service Tags](https://www.microsoft.com/en-us/download/details.aspx?id=56519). They need to be kept in sync each month.

* **Protocol**: TCP
* **Endpoints**: *.datawarehouse.pbidedicated.windows.net, *.datawarehouse.fabric.microsoft.com, *.dfs.fabric.microsoft.com 
* **Port**: 1433

>[!NOTE]
>In certain scenarios, especially when the capacity is located in a region that is not the nearest to the Gateway, it might be necessary to configure the firewall to allow access to multiple endpoints(*cloudapp.azure.com). This adjustment is required to accommodate redirections that may occur under these conditions. If the traffic destined to *.cloudapp.azure.com do not get intercepted by the rule, you can alternatively allow the [IP addresses](/data-integration/gateway/service-gateway-communication#ports) for your data region in your firewall.

If you want to narrow down the scope of the endpoint to the actual OneLake instance in a workspace (instead of the wildcard *.datawarehouse.pbidedicated.windows.net), that URL can be found by navigating to the Fabric workspace, locating `DataflowsStagingLakehouse`, and selecting **View Details**. Then, copy and paste the SQL connection string.

:::image type="content" source="media/gateway-considerations-output-destination/staging.png" alt-text="Screenshot of the Fabric workspace with DataflowsStagingLakehouse, with the ellipsis selected, and the View details option emphasized." lightbox="media/gateway-considerations-output-destination/staging.png":::

:::image type="content" source="media/gateway-considerations-output-destination/staging-overview.png" alt-text="Screenshot of the DataflowsStagingLakehouse details information, with the SQL connection string emphasized." lightbox="media/gateway-considerations-output-destination/staging-overview.png":::

The entire endpoint name looks similar to the following example:

`x6eps4xrq2xudenlfv6naeo3i4-l27nd6wdk4oephe4gz4j7mdzka.datawarehouse.pbidedicated.windows.net`

### Workaround: Combine multiple queries into one or disable staging for the queries

If you're unable to update the firewall rules, you can combine the queries that reference each other into a single query or disable staging on all the queries being referenced. While this isn't a final solution and might impact performance with complex transformations, but it can be used as a temporary solution until the firewall rules can be updated.
