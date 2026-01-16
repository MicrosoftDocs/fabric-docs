---
title: Fabric region availability
description: Learn about Microsoft Fabric region availability, including details about the workloads and features supported in each region and how home region impacts access.
author: msmimart
ms.author: mimart
ms.reviewer: mimart
ms.custom:
  - references_regions
ms.topic: overview
ms.date: 01/16/2026
---

# Fabric region availability

This article lists the region availability of the Microsoft Fabric [F SKUs](../enterprise/licenses.md#capacity), which are available in the [Azure public cloud regions](https://azure.microsoft.com/explore/global-infrastructure/geographies/). Some of the Fabric workloads might not be immediately available in new regions, or regions where data centers become constrained.

For details about purchasing a Fabric subscription, see [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md).

## Home region

Your [home region](find-fabric-home-region.md) is associated with your tenant. If your home region doesn't reside in the following regions, you won't be able to access all the Fabric functionalities. In such cases, to access all the Fabric features, you can create a capacity in a region where Fabric is available. For more information, see [Multi-Geo support for Fabric](service-admin-premium-multi-geo.md).

## Workload and feature availability

The following tables list the availability of Fabric workloads according to the region of your tenant.

### All workloads

This table lists regions where all Fabric workloads are available.

| Americas                           | Europe                       | Middle East | Africa             | Asia Pacific                  | 
|:-----------------------------------|:-----------------------------|:------------|:-------------------|:------------------------------|
| Brazil South                          | North Europe <sup>4</sup>    | UAE North   | South Africa North | Australia East                |
| Canada Central                        | West Europe                  |             |                    | Australia Southeast           |
| Canada East <sup>3</sup>              | France Central               |             |                    | Central India                 | 
| Central US                            | Germany West Central         |             |                    | East Asia                     |
| East US <sup>5</sup>                  | Italy North                  |             |                    | Indonesia Central <sup>6</sup>|
| East US 2                             | Norway East                  |             |                    | Israel Central <sup>4, 6</sup>|
| Mexico Central <sup>6</sup>           | Poland Central               |             |                    | Japan East                    |
| North Central US                      | Spain Central <sup>6</sup>   |             |                    | Japan West <sup>4, 6</sup>    |
| South Central US <sup>2, 4, 5, 6</sup>| Sweden Central               |             |                    | Korea Central                 |
| West US                               | Switzerland North            |             |                    | Malaysia West                 |
| West US 2                             | Switzerland West             |             |                    | New Zealand North <sup>6</sup>|
| West US 3                             | UK South                     |             |                    | Southeast Asia                |
|                                       | UK West <sup>1</sup>         |             |                    | South India                   |
|                                       |                              |             |                    | Taiwan North                  |
|                                       |                              |             |                    | Taiwan Northwest              |


  <sup>1</sup> [Fabric SQL database](../database/sql/overview.md) isn't  available in this region.
  <sup>2</sup> [Healthcare Solutions](/industry/healthcare/healthcare-data-solutions/overview) isn't available in this region. 
  <sup>3</sup> [Fabric User Data Functions](../data-engineering/user-data-functions/user-data-functions-overview.md) isn't available in these regions.
  <sup>4</sup> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) isn't available in these regions.
  <sup>5</sup> [Operations agent (preview)](../real-time-intelligence/operations-agent.md) isn't available in these regions.
  <sup>6</sup> [Ontology (preview)](../iq/ontology/overview.md) isn't available in these regions.

### Power BI

This table lists regions where the only available Fabric workload is Power BI.

| Americas      | Europe        | Middle East    | Africa            | Asia Pacific     |
|:--------------|:--------------|:---------------|:------------------|:-----------------|
| Chile Central | Austria East  | Qatar Central  | South Africa West | India West       |
|               | France South  | UAE Central    |                   | Korea South      |
|               | Germany North |                |                   |                  |
|               | Norway West   |                |                   |                  |

## Related content

* [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md)
* [Find your Fabric home region](./find-fabric-home-region.md)
