---
title: Secure inbound connections with Tenant and Workspace Private Links
description: Learn how to set up tenant- and workspace-level private links in Fabric and stream data securely to Eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 9/15/2025
ms.search.form: fabric's private links
---

# Secure inbound connections with Tenant and Workspace Private Links

Private Link is a network security feature of the Fabric platform that provides secure access for data traffic in Fabric. By integrating Eventstream with the Private Links, it enables secure, private connectivity between your data sources and Microsoft Fabric—without exposure to the public internet.

Fabric supports private links at both the tenant level and the workspace level:
* [Tenant-level private links](/fabric/security/security-private-links-overview.md) provide network policy to the entire tenant.
* [Workspace-level private links](/fabric/security/security-workspace-level-private-links-overview.md) provide granular control, making it possible to restrict access to certain workspaces while allowing the rest of the workspaces to remain open for public access.

## Tenant private link

There are two tenant settings in the Fabric admin portal involved in Private Link configuration:

* **Azure Private Links**

    :::image type="content" source="/media/set-up-private-links/enable-azure-private-link.png" alt-text="A screenshot of enabling Azure Private Link at tenant-level." lightbox="/media/set-up-private-links/enable-azure-private-link.png":::

* **Block Public Internet Access**

    :::image type="content" source="/media/set-up-private-links/block-public-internet-access-tenant-setting.png" alt-text="A screenshot of blocking public internet access at tenant-level." lightbox="/media/set-up-private-links/block-public-internet-access-tenant-setting.png":::


If **Azure Private Link** is **enabled** and **Block Public Internet Access** is **enabled**:
* Supported Fabric items are only accessible for your organization from private endpoints, and aren't accessible from the public Internet.
* Traffic from the virtual network targeting endpoints and scenarios that support private links are transported through the private link.
* Traffic from the virtual network targeting endpoints and scenarios that don't support private links are blocked by the service.
* There could be scenarios that don't support private links, which are blocked at the service when Block Public Internet Access is enabled.

If **Azure Private Link** is **enabled** and **Block Public Internet Access** is **disabled**:
* Traffic from the public Internet is allowed by Fabric services.
* Traffic from the virtual network targeting endpoints and scenarios that support private links are transported through the private link.
* Traffic from the virtual network targeting endpoints and scenarios that don't support private links is transported through the public Internet, and is allowed by Fabric services.
* If the virtual network is configured to block public Internet access, scenarios that don't support private links are blocked by the virtual network.

To set up and use a tenant-level private link, see [Set up and use tenant-level private links](/fabric/security/security-private-links-use.md)

## Workspace Private Link

A workspace-level private link maps a workspace to a specific virtual network using the Azure Private Link service. With this integration in Eventstream, it allows you to restrict public internet access and enforce access only through approved virtual networks via private links. This ensures that data streaming into Eventstream is tightly controlled and protected from unauthorized access.

The diagram demonstrates a typical Eventstream setup operating under Workspace Private Link.

:::image type="content" source="/media/tenant-and-workspace-private-link/workspace-private-link-scenario.png" alt-text="A screenshot of the Eventstream workspace private link architecture." lightbox="/media/tenant-and-workspace-private-link/workspace-private-link-scenario.png":::

* Contoso App1 securely streams data to Eventstream via Private Links.
* Contoso App2 is blocked from connecting because public access to the workspace is disabled.

To set up and use a workspace-level private link, see [Set up and use workspace-level private links](/fabric/security/security-workspace-level-private-links-set-up.md).

## Supported scenarios

Currently, when tenant or workspace level private link is enabled, you can only create and manage Eventstream using Fabric REST APIs. Eventstream APIs use a graph-like structure to define an Eventstream item, which consists of two key components: source and destination. The following table shows the currently supported scenarios for Private Link. **Note**: If you include an unsupported component in the Eventstream API payload, it might result in failure.

| Source / Destination  | Category               | Type                    | Private Link support |
|-----------------------|------------------------|-------------------------|--------------|
| **Sources**           | **Azure streams**      | Azure Event Hubs        | Yes          |
|                       |                        | Azure IoT Hub           | Yes          |
|                       |                        | Azure Service Bus       | Yes          |
|                       |                        | Azure Data Explorer DB  | Yes          |
|                       | **Basic**              | Custom Endpoint         | No           |
|                       |                        | Sample data             | Yes          |
|                       |                        | Weather data            | Yes          |
|                       | **External streams**   | Confluent Cloud for Apache Kafka | Yes |
|                       |                        | Amazon Kinesis          | Yes          |
|                       |                        | Amazon MSK Kafka        | Yes          |
|                       |                        | Apache Kafka            | Yes          |
|                       |                        | Google Cloud Pub/Sub    | Yes          |
|                       |                        | Solace PubSub+          | Yes          |
|                       |                        | MQTT                    | Yes          |
|                       | **Database CDC**       | Azure Cosmos DB         | Yes          |
|                       |                        | PostgreSQL DB           | Yes          |
|                       |                        | Azure SQL DB            | Yes          |
|                       |                        | Azure SQL MI DB         | Yes          |
|                       |                        | MySQL DB                | Yes          |
|                       |                        | SQL Server on VM DB     | Yes          |
|                       | **Fabric events**      | Workspace item events   | Yes          |
|                       |                        | OneLake events          | Yes          |
|                       |                        | Fabric job events       | Yes          |
|                       |                        | Capacity events         | Yes          |
|                       | **Azure events**       | Azure Blob Storage      | Yes          |
|                       |                        | Azure Event Grid        | Yes          |
| **Destinations**      | **Fabric destinations**| Lakehouse               | Yes          |
|                       |                        | Eventhouse (preprocessing mode)         | Yes          |
|                       |                        | Eventhouse (direct ingestion mode)     | No           |
|                       |                        | Data Activator          | No           |
|                       |                        | Custom Endpoint         | No           |

## Related content

* [Network security in Fabric](/fabric/security/security-overview.md)
* [Tenant-level private links](/fabric/security/security-private-links-overview.md)
* [Workspace-level private links](/fabric/security/security-workspace-level-private-links-overview.md)
