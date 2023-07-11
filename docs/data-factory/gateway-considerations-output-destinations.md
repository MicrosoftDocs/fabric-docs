---
title: On-premises data gateway considerations for output destinations in Dataflow Gen2
description: Describes how to troubleshoot a refresh error that might occur when trying to access an output destination through an on-premises data gateway.
author: nikkiwaghani
ms.author: miescobar
ms.topic: conceptual
ms.date: 07/10/2023
---

# On-premises data gateway considerations for output destinations in Dataflow Gen2

When using Microsoft Fabric Dataflow Gen2 with an on-premises data gateway, you might encounter issues with the dataflow refresh process. The underlying problem occurs when the gateway is unable to connect to the dataflow staging Lakehouse in order to read the data before copying it to the desired output destination. This issue can occur regardless of the type of output destination being used.

During the overall dataflow refresh, the tables refresh can show as "Succeeded," but the activities section shows as *"Failed"*. The error details for the activity `WriteToDatabaseTableFrom_...` indicate the following error:

```Mashup Exception Error: Couldn't refresh the entity because of an issue with the mashup document MashupException.Error: Microsoft SQL: A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: TCP Provider, error: 0 - An attempt was made to access a socket in a way forbidden by its access permissions.) Details: DataSourceKind = Lakehouse;DataSourcePath = Lakehouse;Message = A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: TCP Provider, error: 0 - An attempt was made to access a socket in a way forbidden by its access permissions.);ErrorCode = -2146232060;Number = 10013```

>[!NOTE]
>From an architectural perspective, the dataflow engine uses an HTTPS endpoint to write data into a Lakehouse. However, reading data from the Lakehouse requires the use of the TDS protocol (TCP over port 1433). This protocol is utilized to copy the data from the staging lakehouse to the output destination. This explains why the Tables Load step succeeds while the output destination activity fails, even when both lakehouses are in the same OneLake instance.

## Troubleshooting

To troubleshoot the issue, follow these steps:

1. Confirm that the dataflow is configured with an output destination.

   :::image type="content" source="media/gateway-considerations-output-destination/dataflow-output-configuration.png" alt-text="<alt text>" lightbox="media/gateway-considerations-output-destination/dataflow-output-configuration.png":::

2. Verify that the dataflow refresh fails, with tables refresh showing as *"Succeeded"* and activities showing as *"Failed"*.

   :::image type="content" source="media/gateway-considerations-output-destination/refresh-history-failure.png" alt-text="<alt text>" lightbox="media/gateway-considerations-output-destination/refresh-history-failure.png":::

3. Review the error details for the Activity `WriteToDatabaseTableFrom_...`, which provides information about the encountered error.

   :::image type="content" source="media/gateway-considerations-output-destination/refresh-history-detail.png" alt-text="<alt text>" lightbox="media/gateway-considerations-output-destination/refresh-history-detail.png":::

### Viewing through SQL Server Management Studio (SSMS)

When investigating this issue, you can use SQL Server Management Studio (SSMS) to view the details of the error, and further diagnose the problem.

:::image type="content" source="media/gateway-considerations-output-destination/ssms.png" alt-text="<alt text>" lightbox="media/gateway-considerations-output-destination/ssms.png":::

## Solution: Set new firewall rules on server running the gateway

The firewall rules on the gateway server and/or customer's proxy servers need to be updated to allow outbound traffic from the gateway server to the following:

* **Protocol**: TCP
* **Endpoint**: *.datawarehouse.pbidedicated.windows.net
* **Port**: 1433

If you want to narrow down the scope of the endpoint to the actual OneLake instance in a workspace (instead of the wildcard *.datawarehouse.pbidedicated.windows.net), that URL can be found by navigating to the Fabric workspace, locating `DataflowsStagingLakehouse`, and selecting **View Details**. Then, copy and paste the SQL connection string.

:::image type="content" source="media/gateway-considerations-output-destination/staging.png" alt-text="<alt text>" lightbox="media/gateway-considerations-output-destination/staging.png":::

:::image type="content" source="media/gateway-considerations-output-destination/staging-overview.png" alt-text="<alt text>" lightbox="media/gateway-considerations-output-destination/staging-overview.png":::

The entire endpoint name looks similar to the following example:

`x6eps4xrq2xudenlfv6naeo3i4-l27nd6wdk4oephe4gz4j7mdzka.datawarehouse.pbidedicated.windows.net`
