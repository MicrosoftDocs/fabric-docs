---
title: Microsoft Fabric F SKU Region Availability
description: Learn which regions Fabric is available in.
author: paulinbar
ms.author: painbar
ms.custom:
  - references_regions
  - build-2023
  - ignite-2023
ms.topic: overview
ms.date: 08/30/2024
---

# [Microsoft Fabric F SKU](../get-started/microsoft-fabric-overview.md) Regional Availability

Microsoft Fabric F SKUs are available in the [Azure public cloud regions](https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/) listed in this article. As Azure launches new regions, or data centers become constrained, there may be a period when Power BI is the only or one of a few Fabric experiences offered on F SKUs. This article describes what is available in each region and is divided into three sections:
1)	Azure regions with all Fabric experiences available
2)	Azure regions that have a limited number of Microsoft Fabric experiences but include Power BI 
3)	Azure regions that have a Fabric Public Preview experiences available

There is a home region associated with your tenant ([Find your Fabric home region](./find-fabric-home-region.md)), if your home region isn’t listed below you won’t be able to access certain functionalities in that region. In such cases, you might want to create a capacity in a region where Fabric is available. For more information, see [Multi-Geo support for Fabric](./service-admin-premium-multi-geo.md).

For details about purchasing a Fabric subscription, see [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md). Microsoft Fabric refers to the items grouped by experiences found [here](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/item-management-overview). These Microsoft Fabric items are available for users in the regions listed below:

| Americas          | Europe              | Middle East | Africa             | Asia Pacific       |
|:------------------|:--------------------|:------------|:-------------------|:-------------------|
| Brazil South      | North Europe        | UAE North   | South Africa North | Australia East     |
| Canada Central    | West Europe         |             |                    | Australia Southeast|
| Canada East       | France Central      |             |                    | Central India      |
| Central US        | Germany West Central|             |                    | East Asia          |
| East US           | Italy North         |             |                    | Japan East         |
| East US 2         | Norway East         |             |                    | Korea Central      |
| North Central US  | Poland Central      |             |                    | Southeast Asia     |
| South Central US  | Sweden Central      |             |                    | South India        |
| West US           | Switzerland North   |             |                    |                    |
| West US 2         | Switzerland West    |             |                    |                    |
| West US 3         | UK South            |             |                    |                    |
|                   | UK West             |             |                    |                    |

# Power BI F SKU Regional Availability

New regions or constrained regions will   only support Power BI artifacts. Over time, the new regions will expand to include additional Fabric artifacts. Currently, the regions listed below support Power BI and are in the process of onboarding additional Fabric artifacts. Note that India West is capacity constrained and will exclusively host Power BI on the F SKU and not launch other Fabric features.

| Americas      | Europe       | Middle East               | Africa           | Asia Pacific             |
|:--------------|:-------------|:--------------------------|:-----------------|:-------------------------|
| Mexico Central| France South | Israel Central            | South Africa West| India West (Indefinitely)|
|               | Germany North| Qatar Central (until 2027)|                  | Japan West               |
|               | Norway West  | UAE Central               |                  | Korea South              |
|               | Spain Central|                           |                  |                          |

# Public Preview Feature Regional Availability

The following lists indicate regions where Public Preview artifacts are currently available.


| Region              | Copilot for Dataflows | Copilot for Exploration | Copilot for Synapse Notebook    | Graph QL   | Healthcare Solutions | Retail Solutions | Sustainability Solutions     |
|:--------------------|:---------:|:-----------:|:-----------:|:----:|:---------:|:---------:|:-------------:|
| Australia East      | X         |             | X           | X    | X         | X         | X             |
| Australia Southeast | X         | X           | X           | X    | X         | X         | X             |
| Brazil South        | X         | X           | X           | X    | X         | X         | X             |
| Canada Central      | X         |             | X           | X    | X         | X         | X             |
| Canada East         |           |             | X           |      | X         |           |               |
| Central India       | X         |             | X           | X    | X         | X         | X             |
| Central US          |           |             |             |      |           |           |               |
| East Asia           |           |             | X           | X    | X         | X         | X             |
| East US             | X         | X           | X           | X    | X         | X         | X             |
| East US2            | X         | X           | X           | X    | X         | X         | X             |
| France Central      | X         | X           | X           | X    | X         |           | X             |
| Germany West Central| X         |             | X           |      | X         |           | X             |
| Italy North         |           |             |             |      |           |           |               |
| Japan East          | X         | X           | X           | X    | X         | X         |               |
| Korea Central       | X         |             | X           |      | X         |           |               |
| North Central US    | X         | X           | X           | X    | X         | X         | X             |
| North Europe        | X         | X           | X           | X    | X         | X         | X             |
| Norway East         |           |             |             |      | X         |           | X             |
| Poland Central      |           |             |             |      |           |           | X             |
| South Africa North  |           |             | X           | X    | X         | X         | X             |
| South Africa West   |           |             |             |      |           |           |               |
| South Central US    | X         | X           | X           | X    |           | X         | X             |
| Southeast Asia      | X         |             | X           | X    | X         | X         | X             |
| South India         | X         | X           |             |      |           |           |               |
| Sweden Central      |           |             | X           |      | X         |           | X             |
| Switzerland North   |           |             | X           | X    | X         |           | X             |
| Switzerland West    |           |             |             |      |           |           |               |
| UAE North           | X         | X           | X           |      | X         |           | X             |
| West Europe         | X         | X           | X           | X    | X         | X         | X             |
| West US             | X         | X           | X           | X    | X         | X         | X             |
| West US2            | X         | X           | X           | X    | X         | X         | X             |
| West US3            | X         |             | X           |      | X         | X         | X             |


## Related content

* [Azure public cloud regions](https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/)
* [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md)
* [Find your Fabric home region](./find-fabric-home-region.md)
* [Item Management Overview](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/item-management-overview)
* [Microsoft Fabric F SKU](../get-started/microsoft-fabric-overview.md)
* [Multi-Geo support for Fabric](./service-admin-premium-multi-geo.md)


