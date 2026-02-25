---
title: Eventstream streaming connector virtual network and on-premises support guide
description: Learn how to create and manage Streaming virtual network data gateways, connect streaming source’s network to the Azure virtual network and then add data source in private network into Eventstream.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: how-to
ms.custom: sfi-image-nochange, sfi-ropc-nochange
ms.date: 01/27/2026
ms.search.form: Eventstream connector private network support
---

# Eventstream streaming connector virtual network and on-premises support guide

The streaming connector virtual network and on-premises support offers a secure, managed way for Eventstream to access streaming sources that are in private networks. This guide shows you how to use this feature to connect your private-network sources with Eventstream. You learn how to grant the necessary permissions, set up a virtual network, link your source network, create a data gateway for the streaming virtual network, and add your private network data source to Eventstream.

## End-to-End workflow

By following this guide, you will: 

1. Register the `Microsoft.MessagingConnectors` resource provider in your Azure subscription.
2. Create an Azure virtual network with a subnet and delegate a subnet to `Microsoft.MessagingConnectors`.
3. Connect your streaming source private network to the Azure virtual network using one of the supported methods:  
    1. VPN connection or Azure ExpressRoute connection (For 3rd-party cloud virtual network or On-premises sources)  
    1. Private endpoint  
    1. Selected network (Service Endpoint)  
    1. Azure virtual network peering
1. Enable the workspace identity for your workspace where your Eventstream is located.
1. Grant **Network Contributor** role to your workspace identity.
1. Create a streaming virtual network data gateway in the Fabric portal.
1. Create a Connection with streaming virtual network data gateway.
1. Add your private network data source to the eventstream and publish.

To learn more about the solution architecture and concept, visit [Eventstream Streaming Connector virtual network (virtual network) and on-premises Support Overview](./streaming-connector-private-network-support-overview.md)

## Supported sources

[!INCLUDE [streaming-connector-vnet-supported-sources](./includes/streaming-connector-virtual-network-supported-sources.md)]

## Prerequisite 1: Register the connector resource provider

Eventstream Streaming Connector vNet/On-prem requires the ‘Microsoft.MessagingConnectors’ provider to be registered in the subscription hosting the virtual network.

1. Go to your subscription resource in Azure portal, select the subscription that is to be used for your virtual network creation. 
2. Select **Resource providers** and search **Microsoft.MessagingConnectors**.
3. Check if **Microsoft.MessagingConnectors** is registered. If not, select it and select **Register** button to get it registered. 

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/resource-provider.png" alt-text="Screenshot of showing how to register the connector resource provider." lightbox="media/streaming-connector-virtual-network-on-premises-support/resource-provider.png":::

## Prerequisite 2: Set up an Azure virtual network

This section shows how to prepare the Azure virtual network with a subnet configured.  

> [!NOTE]  
> The subscription used to create the Azure virtual network must include **Owner** permission so that you can grant access later.

1. Create an Azure virtual network in the Azure portal. Make sure the region you select matches the region of your eventstream.  

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/create-virtual-network.png" alt-text="Screenshot of showing the first step of creating virtual network." lightbox="media/streaming-connector-virtual-network-on-premises-support/create-virtual-network.png":::

    You can reuse the existing Azure virtual network that is this region. But ensure the virtual network has an IP address range that doesn't overlap with the following ranges: **10.240.0.0/16** and **10.224.0.0/12**. 

2. Navigate to the **Subnets** tab under your virtual network resource to prepare the subnet. 
3. You can either select an existing subnet to edit or create a new one. 

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/select-subnet.png" alt-text="Screenshot of showing selecting or creating subnets." lightbox="media/streaming-connector-virtual-network-on-premises-support/select-subnet.png":::

4. When configuring your subnet, make sure to use an IP address range that doesn't overlap with **10.240.0.0/16** or **10.224.0.0/12** and at least **16 IPs** are available (for example, when creating subnet in Azure, make sure you set xx.xx.xx.xx **/27** at least), and select Subnet Delegation to delegate subnet to service: **Messaging Connectors**.

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/set-up-subnet.png" alt-text="Screenshot of showing how to set up a subnet." lightbox="media/streaming-connector-virtual-network-on-premises-support/set-up-subnet.png":::

## Prerequisite 3: Connect your streaming source’s network to the Azure virtual network 

When the source is in private network, it's required to have your Azure virtual network created in the previous step to be connected with your source’s private network, that is, the client in this Azure virtual network should be able to connect to this source.  

### Non-Azure sources and on-premises sources

For non-Azure source or on-premises scenario, you need to use a **VPN connection** or **Azure ExpressRoute connection** to connect your source to this Azure virtual network. Refer to [Connect an on-premises network to Azure](/azure/architecture/reference-architectures/hybrid-networking). If you have such sources in private network, ensure that a virtual machine in this Azure virtual network can connect to your source before you use this Azure virtual network to configure your eventstream.

There are several publicly available documents providing detailed instructions for such connections, including:

- To Amazon Web Services (AWS) Virtual Private Cloud (VPC): [How to easily set up a VPN between Azure and AWS using managed services](https://techcommunity.microsoft.com/blog/startupsatmicrosoftblog/how-to-easily-set-up-a-vpn-between-azure-and-aws-using-managed-services-updated-/4278966)
- To AWS VPC: [Designing private network connectivity between AWS and Microsoft Azure](https://aws.amazon.com/blogs/modernizing-with-aws/designing-private-network-connectivity-aws-azure)
- To Google Cloud VPC: [Create HA VPN connections between Google Cloud and Azure](https://docs.cloud.google.com/network-connectivity/docs/vpn/tutorials/create-ha-vpn-connections-google-cloud-azure) 

### Azure sources

For streaming sources on Azure, like Azure SQL Server Database CDC, Azure Cosmos DB CDC, Azure Service Bus, etc., you can use ‘**private endpoint**’ or ‘**add virtual network in selected network**’ or ‘[Virtual network peering](/azure/virtual-network/virtual-network-peering-overview)’ to allow a virtual network to access the source in this private network. 

This guide uses Azure streaming source with the methods of ‘**private endpoint**’ or ‘**add virtual network in selected network**’ and ‘[Virtual network peering](/azure/virtual-network/virtual-network-peering-overview)’ to connect to the virtual network created in previous steps.  

#### Method 1: Private endpoint

This approach is applicable for the following Azure streaming sources such as: 

- Azure SQL Server DB 
- Azure SQL Managed Instance 
- Azure Service Bus Premium tier 
- Azure Cosmos DB 
- Azure Data Explorer 
- Azure Database for PostgreSQL 
- Azure Database for MySQL 

Or other sources that are in Azure virtual network, for example, Confluent Cloud for Apache Kafka (on Azure).

The example demonstrates using Azure SQL Server source. 

1. Go to your source (for example, Azure SQL Server), select **Networking > Private access > Create a private endpoint** to create the private endpoint.  

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/create-private-endpoint.png" alt-text="Screenshot of showing how create a private endpoint." lightbox="media/streaming-connector-virtual-network-on-premises-support/create-private-endpoint.png":::

1. Use the wizard to create the private endpoint, selecting the Azure virtual network created in Prerequisite #1 during the 'Virtual Network' step. For the subnet selection, choose a subnet different from the one delegated to ‘MessagingConnector’ in Prerequisite #1. 

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/configure-virtual-network.png" alt-text="Screenshot of showing how to delegate to ‘MessagingConnector’." lightbox="media/streaming-connector-virtual-network-on-premises-support/configure-virtual-network.png":::

1. After the private point is successfully created, you can find the private endpoint under **Setting > Private endpoints** in the Azure virtual network resource.

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/private-endpoint-in-virtual-network.png" alt-text="Screenshot of showing the private endpoint in Azure virtual network." lightbox="media/streaming-connector-virtual-network-on-premises-support/private-endpoint-in-virtual-network.png":::

    And a corresponding private DNS zone should be attached to this Azure virtual network. You can check it in **Setting > DNS**. If you can't find the corresponding private DNS zone, you should delete this private endpoint and re-create it again.

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/private-dns-zone-in-virtual-network.png" alt-text="Screenshot of showing the private DNS zone in Azure virtual network." lightbox="media/streaming-connector-virtual-network-on-premises-support/private-dns-zone-in-virtual-network.png":::

#### Method 2: Add virtual network in selected network

This approach is applicable for the following Azure streaming sources such as:  

- Azure SQL Server DB 
- Azure Service Bus Premium tier 
- Azure Cosmos DB 

The example shown is using Azure Service Bus with premium tier (this approach isn't available in Service Bus Basic or Standard tier). 

Go to your source (for example, Azure Service Bus), select **Networking > Public access > Selected network > Add a virtual network**, select the virtual network you created in Prerequisite#1. 

:::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/configure-selected-network.png" alt-text="Screenshot of showing how to configure selected networks." lightbox="media/streaming-connector-virtual-network-on-premises-support/configure-selected-network.png":::

#### Method 3: Virtual network peering

This approach is applicable for the Azure streaming sources such as:

- SQL Server on VM (Azure) 
- Azure SQL Managed Instance 

Or other sources that are in Azure virtual network. The example is using the SQL Server on Azure VM source. 

1. Go to your source SQL Server on Azure VM on Azure portal, and select **Network settings** of the SQL VM > **Virtual network / subnet** to open the virtual network of the SQL VM. 
1. In the SQL VM virtual network page, select **Peerings > Add** to peering with the Azure virtual network you created in Prerequisite#1. 

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/configure-network-peering.png" alt-text="Screenshot of showing how to configure network peering." lightbox="media/streaming-connector-virtual-network-on-premises-support/configure-network-peering.png":::

## Prerequisite 4: Enable the workspace identity and add role assignment to the workspace identity

The workspace identity needs **Network Contributor** role on the Azure virtual network you created so that it can be used for streaming connector virtual network injection.

1. Check whether your workspace where your eventstream is located has workspace identity enabled. If not, go to **Workspace settings > Workspace identity**, and enable Workspace identity.

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/enable-workspace-identity.png" alt-text="Screenshot of showing where to enable workspace identity." lightbox="media/streaming-connector-virtual-network-on-premises-support/enable-workspace-identity.png":::

1. Copy the workspace identity **ID** from **Workspace settings → Workspace identity**.

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/copy.png" alt-text="Screenshot of showing where to copy workspace identity ID." lightbox="media/streaming-connector-virtual-network-on-premises-support/copy.png":::

1. Then go back to your Azure virtual network and open **Access control (IAM)**. Select **Add role assignment**.

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/add-role-assignment.png" alt-text="Screenshot of showing where to add access control." lightbox="media/streaming-connector-virtual-network-on-premises-support/add-role-assignment.png":::

1. Search for and select the **Network Contributor** role, then select **Next**. Under **Assign access to**, choose **User**, **group**, or **service principal**. **Select Members**, and either enter the name of your workspace or paste the **ID** you copied to locate it.

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/configure-access.png" alt-text="Screenshot of showing how to assign network contributor role." lightbox="media/streaming-connector-virtual-network-on-premises-support/configure-access.png":::

## Add the data source in private network into your eventstream in Fabric

Once all the prerequisites are in place, you can now add the data source that is in private network into your eventstream in Fabric.

Go to Fabric portal, select **Connect data sources** in your eventstream or **Data sources** in Real-Time Hub, and select a source. This guide takes Azure Service Bus as an example.  

:::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/select-service-bus.png" alt-text="Screenshot of showing selecting service bus as eventstream data source." lightbox="media/streaming-connector-virtual-network-on-premises-support/select-service-bus.png":::

### Create a Streaming virtual network data gateway

Select a source, that is, Azure Service Bus and the Get events wizard is opened. Select **Set up** to open the **Manage connections and gateways** page and you can create your **Streaming virtual network gateways**.

:::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/wizard.png" alt-text="Screenshot of showing the service bus wizard." lightbox="media/streaming-connector-virtual-network-on-premises-support/wizard.png":::

1. Navigate to **Streaming virtual network data gateways**, then select **New**. 
1. Select the **Azure subscription** where you created the virtual network in the previous steps, along with the **Resource group**, **Virtual network**, and **Subnet**. 
1. Specify a **name** and select **Save** to complete the creation.

:::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/create-data-gateway.png" alt-text="Screenshot of showing how to create streaming virtual network data gateway." lightbox="media/streaming-connector-virtual-network-on-premises-support/create-data-gateway.png":::

To learn more about how to manage the Streaming virtual network data gateways, visit [Create and manage streaming virtual network data gateways](create-manage-streaming-virtual-network-data-gateways.md). 

### Create the Connection

After the Streaming virtual network data gateway is created, go back to Get events wizard page and select **New connection** on the wizard create a connection with selecting the data gateway you created.

1. Select **New connection**

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/new-connection.png" alt-text="Screenshot of showing how to create a new DMTS connection." lightbox="media/streaming-connector-virtual-network-on-premises-support/new-connection.png":::

1. Ensure selecting the **streaming virtual network data gateway** under **Data gateway**. It has the prefix `[Streaming vNet]`. You can select refresh icon to get the newly created gateway listed.

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/select-data-gateway.png" alt-text="Screenshot of showing how to select a streaming virtual network when creating new DMTS connection." lightbox="media/streaming-connector-virtual-network-on-premises-support/select-data-gateway.png":::

    > [!NOTE]  
    > If a data gateway is selected, skip the test connection step in this connection creation wizard.
    
1. Select the **Connection** you created with the streaming virtual network data gateway included. It has a prefix: `[vNet]`.

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/select-connection.png" alt-text="Screenshot of showing how to select a streaming virtual network connection." lightbox="media/streaming-connector-virtual-network-on-premises-support/select-connection.png":::


Alternatively, you can create a connection in **Manage connections and gateways** page, and then select it in **Connection** on Get events wizard page.

1. On the **Manage connections and gateways** page, select **Connections** tab and select **+ New** button. When creating a **new connection**, select **Streaming virtual network**.

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/create-connection.png" alt-text="Screenshot of showing how to create connection from Manage connections and gateways page." lightbox="media/streaming-connector-virtual-network-on-premises-support/create-connection.png":::

1. Choose the **Streaming data gateway** name you created in the previous step and then provide the required resource information.
1. Using **Azure Service Bus** as an example, enter the **Connection name**, **Connection type** (Select Azure Service Bus), **Host name**, **Shared access key name**, and **Shared access key**, and then select **Create**.

    :::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/save-connection.png" alt-text="Screenshot of showing how to save connection from Manage connections and gateways page." lightbox="media/streaming-connector-virtual-network-on-premises-support/save-connection.png":::

Ensure that the right **Connection type** is selected for your source. 

Source type | Connection type
--- | ---
Azure SQL Database CDC | SQL Server
Azure SQL Managed Instance CDC | SQL Server
Azure Service Bus | Azure Service Bus
Azure Cosmos DB CDC | Azure Cosmos DB v2
Azure Data Explorer (ADX) | Azure Data Explorer (Kusto)
Azure Event Hubs (Extended features mode) | Event Hubs
Amazon MSK Kafka | Kafka Cluster
Apache Kafka | Kafka Cluster
Amazon Kinesis Data Streams | Kinesis
Confluent Cloud for Apache Kafka | Kafka Cluster
PostgreSQL CDC | PostgreSQL
MongoDB CDC | MongoDB
Google Cloud Pub/Sub | Google Pub Sub
MQTT | MQTT
HTTP | Web v2
Solace PubSub+ | Solace PubSub+
SQL Server on VM CDC | SQL Server
MySQL Database CDC | MySQL

## Finish the configuration and publish the eventstream

The remaining steps follow the standard Eventstream source configuration process. Finish all other source configurations, then get this eventstream created or published. 

:::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/edit-mode.png" alt-text="Screenshot of showing the edit mode of eventstream." lightbox="media/streaming-connector-virtual-network-on-premises-support/edit-mode.png":::

In Live view, Azure service bus source is Active, and the data should be flowing into Eventstream. You can check the Data insight or Data Preview of the middle node to verify.

:::image type="content" source="media/streaming-connector-virtual-network-on-premises-support/live-view.png" alt-text="Screenshot of showing the live view of eventstream." lightbox="media/streaming-connector-virtual-network-on-premises-support/live-view.png":::

## Related content

- [Eventstream streaming connector private network support overview](./streaming-connector-private-network-support-overview.md)
- [Create and managed streaming virtual network data gateway](./create-manage-streaming-virtual-network-data-gateways.md)
- [Choose the right network security feature for Eventstream](./choose-the-right-network-security-feature.md)