---
title: Fabric region availability
description: Learn which regions Fabric is available in.
author: paulinbar
ms.author: painbar
ms.custom:
  - references_regions
ms.topic: overview
ms.date: 02/13/2025
---

# Fabric region availability

This article lists the region availability of the Microsoft Fabric [F SKUs](../enterprise/licenses.md#capacity), which are available in the [Azure public cloud regions](https://azure.microsoft.com/explore/global-infrastructure/geographies/). Some of the Fabric workloads might not be immediately available in new regions, or regions where data centers become constrained.

For details about purchasing a Fabric subscription, see [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md).

## Home region

Your [home region](find-fabric-home-region.md) is associated with your tenant. If your home region doesn't reside in the regions listed below, you won’t be able to access all the Fabric functionalities. In such cases, to access all the Fabric features, you can create a capacity in a region where Fabric is available. For more information, see [Multi-Geo support for Fabric](service-admin-premium-multi-geo.md).

[!INCLUDE [tenant-region-availability-note](../includes/tenant-region-availability-note.md)]

## Workload and feature availability

The tables below list the availability of Fabric workloads according to the region your tenant is in.

### All workloads

This table lists regions where all Fabric workloads are available.

| Americas | Europe  | Middle East | Africa  | Asia Pacific  |
|:--------------|:-------------|:---------|:---------|:----|
| Brazil South<sup>4</sup>  | North Europe  | UAE North<sup>4</sup>  | South Africa North<sup>4</sup> | Australia East   |
| Canada Central<sup>4</sup>  | West Europe<sup>4</sup>     |      |     | Australia Southeast<sup>4</sup>|
| Canada East<sup>4</sup>   | France Central<sup>4</sup>    |      |    | Central India<sup>4</sup>   |
| Central US<sup>4</sup> | Germany West Central<sup>4</sup>   |        |           | East Asia            |
| East US    | Italy North<sup>1</sup>,<sup>4</sup>    |             |             | Japan East<sup>4</sup>       |
| East US 2    | Norway East<sup>4</sup>         |      |         | Korea Central<sup>4</sup>         |
| North Central US<sup>4</sup>    | Poland Central <sup>4</sup> |             |        | Southeast Asia      |
| South Central US<sup>2</sup>| Sweden Central|     |         | South India<sup>4</sup>     |
| West US<sup>4</sup>  | Switzerland North<sup>4</sup>     |             |     |              |
| West US 2    | Switzerland West<sup>4</sup>           |             |                    |           |
| West US 3 <sup>3</sup>,<sup>4</sup>     | UK South           |             |             |        |
|       | UK West<sup>1</sup>,<sup>4</sup>        |             |            |         |


  <sup>1</sup> [Fabric SQL database](../database/sql/overview.md) isn't  available in this region.
  <sup>2</sup> [Healthcare Solutions](/industry/healthcare/healthcare-data-solutions/overview) isn't available in this region. 
  <sup>3</sup> [Fabric API for GraphQL](../data-engineering/api-graphql-overview.md) isn't  available in this region. 
  <sup>4</sup> [Fabric User Data Functions](../data-engineering/user-data-functions/user-data-functions-overview.md) isn't  available in these regions.

### Power BI

This table lists regions where the only available Fabric workload is Power BI.

| Americas       | Europe        | Middle East    | Africa            | Asia Pacific |
|:---------------|:--------------|:---------------|:------------------|:-------------|
| Mexico Central | France South  | Israel Central | South Africa West | India West   |
|                | Germany North | Qatar Central  |                   | Japan West   |
|                | Norway West   | UAE Central    |                   | Korea South  |
|                | Spain Central |                |                   |              |

### Public preview

This table lists regions where public preview features are available, according to workload.

| Region               | Copilot**                                                         | Retail Solutions | Dataflow Gen2 with CI/CD |
|:---------------------|:----------------------------------------------------------------|:-----------------|:-------------------------|
| Australia East       | <li>Dataflows</li><li>Synapse Notebook</li>                     | &#x2705;         | &#x2705;                 |
| Australia Southeast  | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x2705;                 |
| Brazil South         | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x2705;                 |
| Canada Central       | <li>Dataflows</li><li>Synapse Notebook</li>                     | &#x2705;         | &#x2705;                 |
| Canada East          | Synapse Notebook                                                | &#x274C;         | &#x2705;                 |
| Central India        | <li>Dataflows</li><li>Synapse Notebook</li>                     | &#x2705;         | &#x2705;                 |
| Central US           | &#x274C;                                                        | &#x274C;         | &#x2705;                 |
| East Asia            | Synapse Notebook                                                | &#x2705;         | &#x2705;                 |
| East US              | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x2705;                 |
| East US2             | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x2705;                 |
| France Central       | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x274C;         | &#x2705;                 |
| Germany West Central | <li>Dataflows</li><li>Synapse Notebook</li>                     | &#x274C;         | &#x2705;                 |
| Italy North          | &#x274C;                                                        | &#x274C;         | &#x2705;                 |
| Japan East           | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x2705;                 |
| Korea Central        | <li>Dataflows</li><li>Synapse Notebook</li>                     | &#x274C;         | &#x2705;                 |
| North Central US     | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x2705;                 |
| North Europe         | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x2705;                 |
| Norway East          | &#x274C;                                                        | &#x274C;         | &#x2705;                 |
| Poland Central       | &#x274C;                                                        | &#x274C;         | &#x2705;                 |
| South Africa North   | Synapse Notebook                                                | &#x2705;         | &#x2705;                 |
| South Africa West    | &#x274C;                                                        | &#x274C;         | &#x2705;                 |
| South Central US     | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x274C;                 |
| Southeast Asia       | <li>Dataflows</li><li>Synapse Notebook</li>                     | &#x2705;         | &#x2705;                 |
| South India          | <li>Dataflows</li><li>Exploration</li>                          | &#x274C;         | &#x2705;                 |
| Sweden Central       | Synapse Notebook                                                | &#x274C;         | &#x2705;                 |
| Switzerland North    | Synapse Notebook                                                | &#x274C;         | &#x2705;                 |
| Switzerland West     | &#x274C;                                                        | &#x274C;         | &#x2705;                 |
| UAE North            | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> |                  | &#x2705;                 |
| West Europe          | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x2705;                 |
| West US              | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x2705;                 |
| West US2             | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x274C;                 |
| West US3             | <li>Dataflows</li><li>Synapse Notebook</li>                     | &#x2705;         | &#x274C;                 |


** Only the workloads listed in the table are available in each region. If no workloads are listed, Copilot isn't available in that region.

## Related content

* [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md)
* [Find your Fabric home region](./find-fabric-home-region.md)
