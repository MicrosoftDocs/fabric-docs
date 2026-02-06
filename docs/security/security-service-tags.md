---
title: Service tags
description: Learn how to use service tags in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: concept-article
ms.custom:
ms.date: 02/25/2024
---

# Service tags

You can use Azure [service tags](/azure/virtual-network/service-tags-overview) to enable connections to and from Microsoft Fabric. In Azure, a service tag is a defined group of IP addresses that is automatically managed, as a group, to minimize the complexity of updates or changes to network security rules.

## Which service tags are supported?

In Microsoft Fabric, you can use the service tags listed in the table below. There's no service tag for untrusted code that is used in Data Engineering items.

| Tag | Purpose | Can use inbound or outbound? | Can be regional? | Can use with Azure Firewall? |
|--|--|--|--|--|
| DataFactory | Azure Data Factory | Both | Yes | Yes |
| DataFactoryManagement| On premises pipeline activity | Outbound | No | Yes |
| EventHub | Azure Event Hubs | Outbound | Yes | Yes |
| Power BI | Power BI and Microsoft Fabric | Both | Yes | Yes |
| PowerQueryOnline | Power Query Online | Both | No | Yes |
| KustoAnalytics | Real-Time Analytics | Both | No | No |
| SQL | Warehouse | Outbound | Yes | Yes |


## Use service tags

You can use the service tags to define network access controls on [network security groups](/azure/virtual-network/network-security-groups-overview#service-tags), [Azure Firewall](/azure/firewall/service-tags), and user-defined routes.

## Related content

* [Private endpoints](/power-bi/enterprise/service-security-private-links)

* [Azure IP Ranges and Service Tags – Public Cloud](https://www.microsoft.com/download/details.aspx?id=56519)<br/>You can refer to the `PowerBI` tag. 
