---
title: Fabric region availability
description: Learn which regions Fabric is available in.
author: paulinbar
ms.author: painbar
ms.custom:
  - references_regions
  - build-2023
  - ignite-2023
ms.topic: overview
ms.date: 01/10/2025
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

| Americas                     | Europe                     | Middle East | Africa             | Asia Pacific                    |
|:-----------------------------|:---------------------------|:------------|:-------------------|:--------------------------------|
| Brazil South                 | North Europe               | UAE North   | South Africa North | Australia East                  |
| Canada Central               | West Europe                |             |                    | Australia Southeast<sup>*</sup> |
| Canada East                  | France Central             |             |                    | Central India                   |
| Central US                   | Germany West Central       |             |                    | East Asia                       |
| East US                      | Italy North<sup>*</sup>    |             |                    | Japan East<sup>*</sup>          |
| East US 2                    | Norway East                |             |                    | Korea Central                   |
| North Central US             | Poland Central<sup>*</sup> |             |                    | Southeast Asia                  |
| South Central US             | Sweden Central             |             |                    | South India                     |
| West US                      | Switzerland North          |             |                    |                                 |
| West US 2                    | Switzerland West           |             |                    |                                 |
| West US 3<sup>*</sup>        | UK South                   |             |                    |                                 |
|                              | UK West<sup>*</sup>        |             |                    |                                 |

<sup>*</sup> [Fabric SQL database](../database/sql/overview.md) isn't available in this region.

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

| Region | Copilot<sup>**</sup> | Graph QL | Healthcare Solutions | Retail Solutions |
|:-|:-|:-|:-|:-|
| Australia East | <li>Dataflows</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| Australia Southeast | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| Brazil South | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| Canada Central | <li>Dataflows</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; |&#x2705; |
| Canada East | Synapse Notebook | &#x274C; | &#x2705; | &#x274C; |
| Central India | <li>Dataflows</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| Central US | &#x274C; | &#x274C; | &#x274C; | &#x274C; |
| East Asia |Synapse Notebook  | &#x2705; | &#x2705; | &#x2705; |
| East US | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| East US2 | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| France Central | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x274C; |
| Germany West Central | <li>Dataflows</li><li>Synapse Notebook</li> | &#x274C; | &#x2705; | &#x274C; |
| Italy North | &#x274C; | &#x274C; | &#x274C; | &#x274C; |
| Japan East | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| Korea Central | <li>Dataflows</li><li>Synapse Notebook</li> | &#x274C; | &#x2705; | &#x274C; |
| North Central US | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| North Europe | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| Norway East | &#x274C; | &#x274C; | &#x2705; | &#x274C; |
| Poland Central | &#x274C; | &#x274C; | &#x274C; | &#x274C; |
| South Africa North | Synapse Notebook | &#x2705; | &#x2705; | &#x2705; |
| South Africa West | &#x274C; | &#x274C; | &#x274C; | &#x274C; |
| South Central US | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x274C; | &#x2705; |
| Southeast Asia | <li>Dataflows</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| South India | <li>Dataflows</li><li>Exploration</li> | &#x274C; | &#x274C; | &#x274C; |
| Sweden Central | Synapse Notebook | &#x274C; | &#x2705; | &#x274C; |
| Switzerland North | Synapse Notebook | &#x2705; | &#x2705; | &#x274C; |
| Switzerland West | &#x274C; | &#x274C; | &#x274C; | &#x274C; |
| UAE North | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> |  | &#x2705; |  |
| West Europe | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| West US | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| West US2 | <li>Dataflows</li><li>Exploration</li><li>Synapse Notebook</li> | &#x2705; | &#x2705; | &#x2705; |
| West US3 | <li>Dataflows</li><li>Synapse Notebook</li> | &#x274C; | &#x2705; | &#x2705; |

<sup>**</sup> Only the workloads listed in the table are available in each region. If no workloads are listed, Copilot isn't available in that region.

## Related content

* [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md)
* [Find your Fabric home region](./find-fabric-home-region.md)
