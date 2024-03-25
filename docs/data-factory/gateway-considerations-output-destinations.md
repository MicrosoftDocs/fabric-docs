---
title: On-premises data gateway considerations for data destinations in Dataflow Gen2
description: Describes multiple considerations and limitations when using a data gateway and the data destination feature inside of Dataflow Gen2
author: nikkiwaghani
ms.author: nikkiwaghani
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# On-premises data gateway considerations for data destinations in Dataflow Gen2

This article tries to list the limitations and considerations when using the Data Gateway with data destinations scenarios in Dataflow Gen2.

## Evaluation time outs

Dataflows that use a Gateway and the data destination feature are limited to an evaluation or refresh time of one hour.

Learn more about this limitation from the article on the [Troubleshoot the on-premises data gateway article](/data-integration/gateway/service-gateway-tshoot#limitations-and-considerations).

## Network issues with port 1433

When using Microsoft Fabric Dataflow Gen2 with an on-premises data gateway, you might encounter issues with the dataflow refresh process. The underlying problem occurs when the gateway is unable to connect to the dataflow staging Lakehouse in order to read the data before copying it to the desired data destination. This issue can occur regardless of the type of data destination being used.

During the overall dataflow refresh, the tables refresh can show as "Succeeded," but the activities section shows as *"Failed"*. The error details for the activity `WriteToDatabaseTableFrom_...` indicate the following error:

```Mashup Exception Error: Couldn't refresh the entity because of an issue with the mashup document MashupException.Error: Microsoft SQL: A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: TCP Provider, error: 0 - An attempt was made to access a socket in a way forbidden by its access permissions.) Details: DataSourceKind = Lakehouse;DataSourcePath = Lakehouse;Message = A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: TCP Provider, error: 0 - An attempt was made to access a socket in a way forbidden by its access permissions.);ErrorCode = -2146232060;Number = 10013```

>[!NOTE]
>From an architectural perspective, the dataflow engine uses an outbound HTTPS (port 443) endpoint to write data into a Lakehouse. However, reading data from the Lakehouse requires the use of the TDS protocol (TCP over port 1433). This protocol is utilized to copy the data from the staging lakehouse to the data destination. This explains why the Tables Load step succeeds while the data destination activity fails, even when both lakehouses are in the same OneLake instance.

### Troubleshooting

To troubleshoot the issue, follow these steps:

1. Confirm that the dataflow is configured with a data destination.

   :::image type="content" source="media/gateway-considerations-output-destination/dataflow-output-configuration.png" alt-text="Screenshot of the Power Query editor with the Lakehouse data destination emphasized." lightbox="media/gateway-considerations-output-destination/dataflow-output-configuration.png":::

2. Verify that the dataflow refresh fails, with tables refresh showing as *"Succeeded"* and activities showing as *"Failed"*.

   :::image type="content" source="media/gateway-considerations-output-destination/refresh-history-failure.png" alt-text="Screenshot of the dataflow details with tables showing succeeded and activities failed." lightbox="media/gateway-considerations-output-destination/refresh-history-failure.png":::

3. Review the error details for the Activity `WriteToDatabaseTableFrom_...`, which provides information about the encountered error.

   :::image type="content" source="media/gateway-considerations-output-destination/refresh-history-detail.png" alt-text="Screenshot of the WriteToDatabaseTablefrom activity showing the error message." lightbox="media/gateway-considerations-output-destination/refresh-history-detail.png":::

### Solution: Set new firewall rules on server running the gateway

The firewall rules on the gateway server and/or customer's proxy servers need to be updated to allow outbound traffic from the gateway server to the below endpoints. If your firewall does not support wildcards, 
then use the IP addresses from [Azure IP Ranges and Service Tags](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.microsoft.com%2Fen-us%2Fdownload%2Fdetails.aspx%3Fid%3D56519&data=05%7C02%7CNikita.Waghani%40microsoft.com%7Caaa71e3a46df465f10ce08dc4a944869%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C638467247942873812%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C0%7C%7C%7C&sdata=gnMtWIOsUsZocKEu3zqPMs9e2d7gVIPH%2B28OqlIhLps%3D&reserved=0). Note that they will need to be kept in sync each month.

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

### Workaround: Split dataflow in a separate ingest and load dataflow

If you're unable to update the firewall rules, you can split the dataflow into two separate dataflows. The first dataflow is responsible for ingesting the data into the staging lakehouse. The second dataflow is responsible for loading the data from the staging lakehouse into the data destination. This workaround isn't ideal, as it requires the use of two separate dataflows, but it can be used as a temporary solution until the firewall rules can be updated.

To implement this workaround, follow these steps:

1. Remove the data destination from your current dataflow that ingests data via your gateway.

    :::image type="content" source="media/gateway-considerations-output-destination/remove-destination.png" alt-text="Screenshot of the Power Query editor with the Lakehouse data destination being removed." lightbox="media/gateway-considerations-output-destination/remove-destination.png":::

1. Create a new dataflow that uses the dataflow connector to connect to the ingest dataflow. This dataflow is responsible for ingesting the data from staging into the data destination.

    :::image type="content" source="media/gateway-considerations-output-destination/get-data-dataflow-connector.png" alt-text="Screenshot of the Power Query editor with the Get Data option selected, and the Dataflow connector option emphasized." lightbox="media/gateway-considerations-output-destination/get-data-dataflow-connector.png":::

    :::image type="content" source="media/gateway-considerations-output-destination/dataflow-connector-get-data.png" alt-text="Screenshot of the Get Data dialog with the Dataflow connector option selected." lightbox="media/gateway-considerations-output-destination/dataflow-connector-get-data.png":::

1. Set the data destination to be the data destination of your choice for this new dataflow.

    :::image type="content" source="media/gateway-considerations-output-destination/set-data-destination.png" alt-text="Screenshot of the Power Query editor with the Lakehouse data destination being set." lightbox="media/gateway-considerations-output-destination/set-data-destination.png":::

1. Optionally, you can disable staging for this new dataflow. This change prevents the data from being copied to the staging lakehouse again and instead copies the data directly from the ingest dataflow to the data destination.

    :::image type="content" source="media/gateway-considerations-output-destination/disable-staging.png" alt-text="Screenshot of the Power Query editor with the staging option being disabled." lightbox="media/gateway-considerations-output-destination/disable-staging.png":::
