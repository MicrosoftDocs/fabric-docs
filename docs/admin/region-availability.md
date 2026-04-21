---
title: Fabric region availability
description: Learn about Microsoft Fabric region availability, including details about the workloads and features supported in each region and how home region impacts access.
author: msmimart
ms.author: mimart
ms.custom:
  - references_regions
ms.topic: overview
ms.date: 03/05/2026
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

| Americas                                    | Europe                       | Middle East | Africa             | Asia Pacific                     |
|:--------------------------------------------|:-----------------------------|:------------|:-------------------|:---------------------------------|
| Brazil South                                | North Europe <sup>3</sup>    | UAE North   | South Africa North | Australia East <sup>5</sup>      |
| Canada Central                              | West Europe <sup>6</sup>     |             |                    | Australia Southeast <sup>6</sup> |
| Canada East                                 | France Central               |             |                    | Central India                    |
| Central US <sup>6</sup>                     | Germany West Central         |             |                    | East Asia                        |
| East US <sup>4, 5</sup>                     | Italy North <sup>6</sup>     |             |                    | Indonesia Central <sup>1</sup>   |
| East US 2 <sup>5</sup>                      | Norway East                  |             |                    | Israel Central <sup>1, 3, 6</sup>|
| Mexico Central <sup>1, 6</sup>              | Poland Central <sup>6</sup>  |             |                    | Japan East                       |
| North Central US                            | Spain Central <sup>1, 6</sup>|             |                    | Japan West <sup>1, 3, 5, 6</sup> |
| South Central US <sup>1, 2, 3, 4, 5, 6</sup>| Sweden Central               |             |                    | Korea Central                    |
| West US                                     | Switzerland North            |             |                    | Malaysia West <sup>1</sup>       |
| West US 2                                   | Switzerland West             |             |                    | New Zealand North <sup>1</sup>   |
| West US 3 <sup>6</sup>                      | UK South                     |             |                    | Southeast Asia                   |
|                                             | UK West                      |             |                    | South India                      |
|                                             |                              |             |                    | Taiwan North <sup>1</sup>        |
|                                             |                              |             |                    | Taiwan Northwest <sup>1</sup>    |

<sup>1</sup> [Ontology (preview)](../iq/ontology/overview.md) isn't available in these regions.
<sup>2</sup> [Healthcare Solutions](/industry/healthcare/healthcare-data-solutions/overview) isn't available in this region. 
<sup>3</sup> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) isn't available in these regions.
<sup>4</sup> [Operations agent (preview)](../real-time-intelligence/operations-agent.md) isn't available in these regions.
<sup>5</sup> [Plan (preview)](../iq/plan/overview.md) isn't available in these regions.
<sup>6</sup> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) isn't available in these regions.

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
