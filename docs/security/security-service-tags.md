---
title: Service tags
description: Learn how to use service tags in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom: build-2023
ms.date: 06/01/2023
---

# Service tags

[!INCLUDE [preview-note](../includes/preview-note.md)]

You can use Azure [service tags](/azure/virtual-network/service-tags-overview) with Microsoft Fabric to enable an Azure SQL Managed Instance (MI) to allow incoming connections from the Microsoft Fabric. In Azure, a service tag is a defined group of IP addresses that you can configure to be automatically managed, as a group, to minimize the complexity of updates or changes to network security rules. By using service tags with Microsoft Fabric, you can enable a SQL Managed Instance to allow incoming connections from the Microsoft Fabric service.

## Which service tags are supported?

You can use the service tags in this table in Microsoft Fabric.

| Tag | Purpose | Can use inbound or outbound? | Can be regional? | Can use with Azure Firewall? |
|--|--|--|--|--|
| DataFactory | Azure Data Factory | Both | No | Yes |
| EventHub | Azure Event Hubs | Outbound | Yes | Yes |
| PowerBI | Power BI and Microsoft Fabric | Both | No | Yes |
| PowerQueryOnline | Power Query Online | Both | No | Yes |
| KustoAnalytics | Real-Time Analytics | Both | No | No |

## How to enable service tags?

To enable service tags in Microsoft Fabric, follow the instructions in [Use service tags with Power BI](/power-bi/enterprise/service-premium-service-tags).

1. [Enable a public endpoint](/power-bi/enterprise/service-premium-service-tags#enable-a-public-endpoint) in the SQL Managed Instance.

2. [Create a Network Security Group rule](/power-bi/enterprise/service-premium-service-tags#create-a-network-security-group-rule) to allow inbound traffic.

3. [Enter the credentials](/power-bi/enterprise/service-premium-service-tags#enter-the-credentials-in-power-bi) in Microsoft Fabric.

## Next steps

[Private endpoints](/power-bi/enterprise/service-security-private-links)
