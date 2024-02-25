---
title: Service tags
description: Learn how to use service tags in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 10/30/2023
---

# Service tags

You can use Azure [service tags](/azure/virtual-network/service-tags-overview) to enable connections to and from Microsoft Fabric. In Azure, a service tag is a defined group of IP addresses that you can configure to be automatically managed, as a group, to minimize the complexity of updates or changes to network security rules.

## Which service tags are supported?

In Microsoft Fabric, you can use the service tags listed in the table below. There's no service tag for untrusted code which is used in Data Engineering items.

| Tag | Purpose | Can use inbound or outbound? | Can be regional? | Can use with Azure Firewall? |
|--|--|--|--|--|
| DataFactory | Azure Data Factory | Both | No | Yes |
| EventHub | Azure Event Hubs | Outbound | Yes | Yes |
| Power BI | Power BI and Microsoft Fabric | Both | No | Yes |
| PowerQueryOnline | Power Query Online | Both | No | Yes |
| KustoAnalytics | Real-Time Analytics | Both | No | No |
|DataFactoryManagement| On-premises data Pipeline activity | Outbound | No | Yes |

## Use service tags

You can use the service tags to define network access controls on [network security groups](/azure/virtual-network/network-security-groups-overview#service-tags), [Azure Firewall](/azure/firewall/service-tags), and user-defined routes.

## Related content

* [Private endpoints](/power-bi/enterprise/service-security-private-links)

* [Azure IP Ranges and Service Tags – Public Cloud](https://www.microsoft.com/download/details.aspx?id=56519)
