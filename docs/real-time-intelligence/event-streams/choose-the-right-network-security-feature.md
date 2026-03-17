---
title: Choose the right network security feature for Eventstream
description: Learn how to select the appropriate network security feature for Eventstream, including managed private endpoints, tenant-level private links, and workspace-level private links.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: concept-article
ms.date: 01/16/2025
ms.search.form: fabric's network security
ai-usage: ai-assisted

#customer intent: As a Fabric administrator, I want to understand the network security options for Eventstream so that I can choose the right feature to secure my data streaming.

---

# Choose the right network security feature for Eventstream

Secure data streaming is critical for protecting sensitive information as it moves between your systems and the Fabric platform. Eventstream provides multiple network security features that help you control how data is ingested into Fabric, routed within Fabric, or sent out of Fabric. Understanding the differences between these features and when to use each one ensures your data remains protected while meeting your organization's security requirements.

This article helps you understand the available network security features in Eventstream and choose the right one for your scenario. You learn about the three types of network traffic, explore the main security features, and discover which feature best fits your needs.

## Understand the three types of network traffic

In Eventstream, network traffic describes which side **initiates the connection**. It falls into three categories: **internal**, **inbound**, and **outbound**. Understanding how network traffic flows to and from Fabric - and where the connection is initiated - helps you determine whether extra network security features are required and which option to use.

### Internal calls: Secure by default

Internal calls refer to network traffic between Eventstream and other Fabric-native items within the same Fabric environment. This traffic stays within Fabric's security boundary and doesn't cross any network perimeters. Internal calls don't require extra network security features because they're already protected by Fabric's built-in security model.

Sources and destinations that use internal calls include:

**Fabric-native sources:**

- Fabric Workspace Item events
- Fabric OneLake events
- Fabric Job events
- Fabric capacity overview events
- Sample data, for example, Bicycle, Taxi
- Real-time weather data

**Fabric-native destinations (i.e., Fabric item as destination):**, for example:

- Lakehouse
- Eventhouse
- Activator
- Spark Notebook

Internal calls are secure by default and protected by Microsoft Entra ID authentication, workspace permission model, and encryption at rest and in transit. The network security features described in this article apply only to external network traffic, inbound and outbound connections between Eventstream and resources outside the Fabric platform.

### Inbound network traffic

Inbound network traffic refers to **connections initiated by external data sources to Eventstream**, typically to push data into Eventstream or, in some cases, to pull data from Eventstream. By configuring inbound network security, you control which sources can connect to your Eventstream and from which networks. This helps prevent unauthorized access and ensures that only approved sources can stream/pull data into/from your Fabric Eventstream.

Examples of inbound scenarios include:

- Custom applications initiating connections and sending events to Eventstream by using the **Custom endpoint** source.
- Custom applications initiating connections and pulling events from Eventstream by using the **Custom endpoint** destination.
- The **Azure Event Grid Namespace** source pushing system events to Eventstream.

Inbound network security features restrict access to Eventstream itself, ensuring that only traffic from approved networks can reach your streaming environment.

### Outbound network traffic

Outbound network traffic refers to **connections that Eventstream makes to external data sources outside the Fabric platform**. When you configure outbound security, you control how Eventstream connects to Azure-based data sources and other external systems. This ensures that data flowing from external sources into Eventstream travels over secure, private connections.

Examples of outbound scenarios include:

- Eventstream pulling events from **Azure Event Hubs** source
- Eventstream capturing database change events from database cdc source, for example, **Azure SQL DB (CDC)** source
- Eventstream retrieving events from **Apache Kafka** source

Outbound security features ensure that when Eventstream reaches out to external data sources, those connections remain private, and don't traverse the public internet.

## Network security features for Eventstream

Eventstream supports three main network security features. Each feature serves a different purpose and operates at a different scope within your Fabric environment.

### Managed Private Endpoints

Managed private endpoints enable Eventstream to securely connect to Azure resources that are behind a firewall or not accessible from the public internet. When you create a managed private endpoint, Fabric automatically provisions a managed virtual network for your Eventstream, allowing outbound connections to Azure resources over a private network.

**Direction:** Outbound (Eventstream connecting to external resources)

**Use case:** Use managed private endpoints when your **Azure IoT Hub** and **Azure Event Hubs** have public access disabled or are protected by firewall rules. The private endpoint ensures that data flows from Azure IoT Hub or Azure event hub to Eventstream without traversing the public internet.

Managed Private Endpoints are ideal when your Azure Event Hubs or Azure IoT Hub network setting isn't publicly accessible, such as when public access is disabled or restricted by firewall rules.

**Related documents**: [Connect to Azure resources securely using managed private endpoints](./set-up-private-endpoint.md)

### Tenant and Workspace-level Private Links

Tenant-level and workspace-level private links are inbound network security features that restrict access to Fabric and Eventstream from the public internet. Both options use Azure Private Link services to ensure only traffic from approved Azure virtual networks can access your resources, but they differ in scope and flexibility.

**Direction:** Inbound (controlling access to Fabric and Eventstream)

**Tenant-level Private Links:**

- Apply to the entire Fabric tenant, securing all workspaces and workspace items
- Use when your organization requires a comprehensive security policy for all users and workspaces
- Block public internet access to Fabric tenant entirely; all access must come through approved private endpoints
- Enabled by a Fabric administrator in the admin portal

**Workspace-level Private Links:**

- Apply to individual workspaces, allowing granular control
- Use when you need to secure specific workspaces with sensitive data or production workloads, while keeping other workspaces open for public access
- Block public internet access only for the configured workspace; other workspaces remain accessible if not restricted
- Enabled by a workspace administrator for each workspace

Tenant-level private links are ideal for organizations with strict, company-wide security policies. Workspace-level private links are best for organizations needing flexibility to secure only select workspaces.

**Related documents**: [Secure inbound connections with Tenant and Workspace Private Links](./set-up-tenant-workspace-private-links.md)

### Streaming Connector virtual network Injection

The streaming connector virtual network injection feature enables you to securely retrieve data from external data sources located in a private network directly to Eventstream by injecting the streaming connector into an intermediate **Azure virtual network** that is prepared by you. By using this feature, you can connect to sources that aren't accessible from the public internet, ensuring that data flows securely over a private network. This capability is ideal for organizations that require secure, private connectivity between their on-premises or cloud-based virtual network resources and Fabric Eventstream, without exposing those resources to the public internet.

**Direction:** Outbound (Eventstream connecting to external resources)

**Use case:** Use Streaming connector virtual network injection when you need to connect Eventstream to external streaming platforms (like Apache Kafka, Amazon Kinesis, Google Pub/Sub, MQTT) or database Change Data Capture (CDC) sources (PostgreSQL, MySQL, SQL Server) that reside in private networks, that is, 3rd-party cloud virtual network or on-premises environment.

Streaming Connector virtual network injection is ideal when you need to pull data from external systems or databases that are behind firewalls or in private networks. And it requires you to have an Azure virtual network provisioned as prerequisite.

**Related documents**: [Eventstream streaming connector virtual network and on-premises support overview](./streaming-connector-private-network-support-overview.md)


## Choose the right network security feature

Selecting the right network security feature depends on your specific scenario and requirements. Use the following guidance to determine which feature best fits your needs.

### Decision criteria

Ask yourself these questions:

- **Is your source or destination within Fabric?**
   - If you're using Fabric-native sources (like Workspace Item events, OneLake events, Sample data) or Fabric-native destinations (like Lakehouse, Eventhouse, Activator), these are **secure by default**—no extra network security features are needed
   - If you're connecting to external Azure resources or custom applications, continue to the next questions

- **Is your data source residing in a protected network?**
   - If your data source is publicly accessible and needs to send data to Eventstream, no action required.
   - If your data source resides behind a firewall and isn't publicly accessible, continue to the next questions.

- **What direction does the network traffic flow? Inbound or outbound**
   - If external sources initiate connections and push data to Eventstream (inbound), use **Private Links**
   - If Eventstream needs to connect to external sources (outbound), continue to the next questions.

- **Is your data source an Azure Event Hubs or Azure IoT Hub?**
   - If yes, use **Managed Private Endpoint**
   - For other external data sources, use **Streaming Connector vNet Injection**

   > [!NOTE]
   > The Azure Event Hubs source supports two feature levels. The **Basic** feature level requires the **Managed Private Endpoint** solution, while the **Extended** feature level requires the **Streaming Connector vNet Injection** solution.


   > [!NOTE]
   > If you encounter challenges preparing an Azure virtual network for the Streaming Connector virtual network Injection solution, you might consider using the **Connector IP Allowlist** approach for outbound scenarios. 
   >
   > Eventstream's streaming connector in each region has a single outbound IP address. If your company's network policy permits allow listing this IP address and your source has a publicly resolvable address, Eventstream's connector can bring real-time data into Fabric, though the transmission occurs over a public network.
   >
   > This solution is applicable to all streaming connector sources. If you're interested in implementing this solution, kindly reach out to the product team by completing the following form: [Real-Time Intelligence Eventstream Streaming Connector IP allow list Request](https://aka.ms/EventStreamsConnIPAllowlistRequest)


### Decision matrix

Use the following flowchart and decision matrix to determine the right network security feature for your Eventstream scenario:

:::image type="content" source="media/choose-the-right-network-security-feature/choose-right-network-security-decision-flow.png" alt-text="A screenshot of how to choose the right network security feature." lightbox="media/choose-the-right-network-security-feature/choose-right-network-security-decision-flow.png":::

#### Sources

| Category        | Examples                                                     | Direction | Network Security Feature | Stage & Release  |
| --------------- | ------------------------------------------------------------ | --------- | ------------------------ | ---------------- |
| Sample data         | Bicycle, Stock market, Taxi, Buses, S&P 500 companies stocks, Semantic Model Logs          | Internal  | Secure by default        | -                |
| Public feeds    | Weather                                                      | Internal  | Secure by default        | -                |
| Fabric events   | Fabric Workspace item, Fabric OneLake events, Fabric Job events, etc. | Internal  | Secure by default        | -                |
| Azure streaming sources   | Azure Event Hubs (Basic feature level), Azure IoT Hub                               | Outbound  | Managed Private Endpoint | GA  |
| External        | Confluent Cloud for Apache Kafka, Amazon Kinesis, Google Pub/Sub, MQTT, etc. [Full list](./streaming-connector-private-network-support-overview.md#supported-sources)        | Outbound  | Connector virtual network injection           | PuPr  |
| Database CDC    | PostgreSQL, MySQL, SQL Server, etc. [Full list](./streaming-connector-private-network-support-overview.md#supported-sources)                                | Outbound  | Connector virtual network injection           | PuPr |

#### Destinations

| Category        |  Examples          | Direction | Network Security Feature | Stage & Release |
| ----------------|--------------------|---------- | --------- | ------------------------ |
| Fabric items    | Lakehouse, Eventhouse, Activator, Spark Notebook, etc. | Internal  | Secure by default        | -               |

## Common scenarios

The following scenarios demonstrate when to use each network security feature.

### Scenario 1: Connect to Azure IoT hub behind a firewall

Your organization stores streaming data in Azure IoT hub, and your security policy requires that Iot hub doesn't accept public internet traffic. You need to stream this data into Eventstream for processing.

**Solution:** Use **Managed Private Endpoints**

Managed private endpoints allow Eventstream to connect to your Event Hubs over a private network. You create a managed private endpoint in your Fabric workspace, provide the IoT hub resource ID, and after approval from your Azure resource networking, Eventstream can securely retrieve events without the data traversing the public internet.

### Scenario 2: Restrict Eventstream access to corporate network

Your organization requires that users and applications can only access Eventstream from the corporate network. You want to ensure that no one can send data to Eventstream from outside your approved virtual networks.

**Solution:** Use **Tenant or Workspace-level Private Links**

If this requirement applies to all workspaces, use tenant-level private links to block public access across your entire Fabric tenant. If only specific workspaces need this restriction, use workspace-level private links to secure those workspaces individually while keeping others accessible from the public internet.

### Scenario 3: Connect to Apache Kafka in a private network

Your organization uses Apache Kafka as your streaming source, and your Kafka cluster is deployed within a private network for security reasons. You need to stream data from Apache Kafka into Eventstream for real-time processing and analytics in Fabric.

**Solution:** Use **Streaming Connector vNet Injection**

Streaming Connector virtual network injection enables Eventstream to securely connect to Apache Kafka through your virtual network. Configure the virtual network settings in your Eventstream workspace to establish a private connection to your Kafka cluster. Once configured, Eventstream can retrieve streaming data from Apache Kafka without exposing traffic to the public internet.

## Limitations and considerations

When choosing a network security feature, keep these limitations in mind:

### Managed Private Endpoints limitations

- Currently supported only for Azure Event Hubs (Basic feature level) and Azure IoT Hub sources
- Data preview might not be available for sources connected through managed private endpoints
- Requires approval from the Azure resource administrator
- Available for Fabric trial and all Fabric F SKU capacities

### Private Links limitations

- When tenant or workspace level private links are enabled, you can only create and manage Eventstream using Fabric REST APIs
- Some Eventstream sources and destinations aren't supported with private links enabled (see [Supported scenarios](set-up-tenant-workspace-private-links.md#supported-scenarios))
- Custom endpoint source and destination are supported with private links
- Eventhouse destinations with direct ingestion mode aren't supported

### General considerations

- Network security features require Azure resources (virtual networks, private endpoints)
- You need appropriate permissions in both Fabric and Azure
- Set up complexity increases with the scope of the security requirement
- Private links require coordination between Fabric administrators and Azure network administrators

## Related content

- [Connect to Azure resources securely using managed private endpoints](set-up-private-endpoint.md)
- [Secure inbound connections with Tenant and Workspace Private Links](set-up-tenant-workspace-private-links.md)
- [Streaming connector private network support overview](./streaming-connector-private-network-support-overview.md)
- [Security in Microsoft Fabric](../../security/security-overview.md)
- [Overview of managed private endpoints](../../security/security-managed-private-endpoints-overview.md)
- [Private links for Fabric tenants](../../security/security-private-links-overview.md)
- [Private links for Fabric workspaces](../../security/security-workspace-level-private-links-overview.md)
