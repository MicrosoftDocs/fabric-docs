---
title: Eventstream streaming connector virtual network and on-premises support overview
description: Learn how Eventstream streaming connectors securely access streaming sources in virtual networks and on‑premises environments with a streaming virtual network data gateway.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom: sfi-image-nochange, sfi-ropc-nochange
ms.date: 01/27/2026
ms.search.form: Eventstream connector private network support
---

# Eventstream streaming connector virtual network and on-premises support overview (preview)

Real-Time Intelligence Eventstream is designed to bring real-time data from diverse sources, transforming it, and effortlessly routing it to various destinations. For sources that run in private network environments, such as cloud virtual network or on-premises infrastructures, a secure method is required to enable Eventstream to access the source.

The streaming connector’s support for virtual networks and on-premises environments offers a secure, managed pathway, enabling Eventstream to reliably connect with these private-network streaming sources.

## Architecture

To enable data transfer from a source within a private network into Eventstream, it's necessary to establish an Azure managed virtual network as an intermediary bridge, as illustrated in the diagram. The Azure virtual network should be connected to the private network hosting the data source using appropriate methods, such as VPN or ExpressRoute for on-premises scenarios, and private endpoints or network peering for Azure sources. Then, the Eventstream streaming connector instance is injected into this virtual network through virtual network injection, allowing secure connectivity between the connector and the data source located within the private network.

:::image type="content" source="media/streaming-connector-virtual-network-on-premises-support-overview/overview.png" alt-text="Screenshot of showing the overview of the architecture." lightbox="media/streaming-connector-virtual-network-on-premises-support-overview/overview.png":::

## What is a streaming virtual network data gateway

To facilitate streaming connector virtual network injection into an Azure virtual network created by you, Fabric provides a centralized location for network engineers or data engineers to manage the references to Azure virtual network resources. The streaming virtual network data gateway in Fabric serves this purpose for Eventstream. Specifically, the streaming virtual network data gateway:

- Refers to the Azure virtual network resource in Fabric, **storing customer Azure virtual network resource**.
- Is used **exclusively** in Eventstream to pass the Azure virtual network resource information for streaming connector virtual network injection.
- Can be created and managed via the ‘**Manage Connections and Gateways**’ page in Fabric.
- Can be selected when setting up streaming connections for Eventstream sources using the Get Events wizard.
- Unlike 'Virtual network data gateways' and 'On-premises data gateways', it doesn't require cluster provisioning or extra capacity. However, the user experience across all three gateway types remains largely similar.

To learn more about how to create and manage the streaming virtual network data gateway, refer to [Create and manage streaming virtual network data gateways](create-manage-streaming-virtual-network-data-gateways.md).

:::image type="content" source="media/streaming-connector-virtual-network-on-premises-support-overview/data-gateway.png" alt-text="Screenshot of showing what is streaming virtual network data gateway." lightbox="media/streaming-connector-virtual-network-on-premises-support-overview/data-gateway.png":::

## Supported sources

[!INCLUDE [streaming-connector-vnet-supported-sources](./includes/streaming-connector-virtual-network-supported-sources.md)]

## Next steps

To get the detailed step-to-step configuration guide, check out the [Streaming Connector Private Network Support Guide](./streaming-connector-private-network-support-guide.md).

## Limitations

- **Data preview on sources in private network is not supported**.  
    Some connector sources support previewing the data, such as the database Change Data Capture (CDC) sources, Confluent, Amazon Web Services (AWS) Kinesis, etc. if they are in a public network. When they are in private network, the data preview on these sources can't work. It shows errors when previewing it in either Edit mode or Live mode. 

- **The source with virtual network/subnet configured cannot be updated after this eventstream is published**.  
    Once the virtual network or subnet is configured for your Eventstream source, it won't be updated unless you make changes and republish the Eventstream. We recommend that you don't modify the virtual network or subnet settings while the connector is running.  

- **Custom DNS Server is not supported yet**  
    If your source is located in a private network with a custom DNS server configured, the injected streaming connector within your Azure virtual network might not be able to resolve the source server’s address. There are three options to work around this issue:

    - Create and link a [Private DNS Zone](/azure/dns/private-dns-privatednszone) to your injected virtual network and add an A record resolving your data source DNS name to the private IP address.
    - Create a [DNS Private Resolver](/azure/dns/dns-private-resolver-overview), which forwards DNS traffic to your custom DNS server.
    - Configure the private IP address directly when creating your connector. This option doesn't work for connectors that require a fully qualified domain name.

- **Race condition issue may occur when creating and deleting vNet connector with same virtual network’s subnet configured at same time**  
    If you delete a connector source with a virtual network subnet configured and add a new connector source with the same subnet in Eventstream's edit mode, publishing both changes might cause race condition conflicts. To prevent this issue, follow these steps: delete the connector source with virtual network in Edit mode -> publish the eventstream -> reenter edit mode -> add the new connector source with virtual network -> and publish again.


## Related content

- [Eventstream streaming connector private network support guide](./streaming-connector-private-network-support-guide.md)
- [Create and managed streaming virtual network data gateway](./create-manage-streaming-virtual-network-data-gateways.md)
- [Choose the right network security feature for Eventstream](./choose-the-right-network-security-feature.md)