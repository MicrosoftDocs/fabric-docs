---
title: Fabric region availability
description: Learn which regions Fabric is available in.
author: msmimart
ms.author: mimart
ms.custom:
  - references_regions
ms.topic: overview
ms.date: 07/28/2025
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

| Americas                        | Europe                       | Middle East | Africa             | Asia Pacific                  | 
|:--------------------------------|:-----------------------------|:------------|:-------------------|:------------------------------|
| Brazil South                    | North Europe <sup>4</sup>    | UAE North   | South Africa North | Australia East                |
| Canada Central                  | West Europe                  |             |                    | Australia Southeast           |
| Canada East <sup>3</sup>        | France Central               |             |                    | Central India                 | 
| Central US                      | Germany West Central         |             |                    | East Asia                     |
| East US                         | Italy North                  |             |                    | Israel Central <sup>4</sup>   |
| East US 2                       | Norway East                  |             |                    | Japan East                    |
| Mexico Central                  | Poland Central               |             |                    | Japan West <sup>4</sup>       |
| North Central US                | Spain Central                |             |                    | Southeast Asia                |
| South Central US <sup>2, 4</sup>| Sweden Central               |             |                    | South India                   |
| West US                         | Switzerland North            |             |                    | Korea Central                 |
| West US 2                       | Switzerland West <sup>3</sup>|             |                    |                               |
| West US 3                       | UK South                     |             |                    |                               |
|                                 | UK West <sup>1</sup>         |             |                    |                               |


  <sup>1</sup> [Fabric SQL database](../database/sql/overview.md) isn't  available in this region.
  <sup>2</sup> [Healthcare Solutions](/industry/healthcare/healthcare-data-solutions/overview) isn't available in this region. 
  <sup>3</sup> [Fabric User Data Functions](../data-engineering/user-data-functions/user-data-functions-overview.md) isn't available in these regions.
  <sup>4</sup> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) isn't available in these regions.

### Power BI

This table lists regions where the only available Fabric workload is Power BI.

 | Europe        | Middle East    | Africa            | Asia Pacific     |
 |:--------------|:---------------|:------------------|:-----------------|
 | France South  | Qatar Central  | South Africa West | India West       |
 | Germany North | UAE Central    |                   | Korea South      |
 | Norway West   |                |                   | New Zealand North|
 |               |                |                   | Taiwan North     |
 |               |                |                   | Taiwan Northwest |
 |               |                |                   | Indonesia Central |
 |               |                |                   | Malaysia West |

** Copilot is not supported for regions listed in this section. 

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
| West US2             | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705;         | &#x2705;                 |
| West US3             | <li>Dataflows</li><li>Synapse Notebook</li>                     | &#x2705;         | &#x2705;                 |


** Only the workloads listed in the table are available in each region. If no workloads are listed, Copilot isn't available in that region.

## Related content

* [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md)
* [Find your Fabric home region](./find-fabric-home-region.md)
