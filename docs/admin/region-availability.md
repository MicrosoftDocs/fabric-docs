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
| Brazil South <sup>8</sup>                               | North Europe <sup>3, 8</sup> | UAE North   | South Africa North | Australia East <sup>5</sup>         |
| Canada Central <sup>8</sup>                 | West Europe <sup>6</sup>     |             |                    | Australia Southeast <sup>6, 8</sup> |
| Canada East <sup>8</sup>                    | France Central               |             |                    | Central India                       |
| Central US <sup>6</sup>                     | Germany West Central <sup>8</sup> |        |                    | East Asia                           |
| East US <sup>4, 5, 8</sup>                  | Italy North <sup>6</sup>     |             |                    | Indonesia Central <sup>8</sup>      |
| East US 2 <sup>5, 8</sup>                   | Norway East                  |             |                    | Israel Central <sup>3, 6, 8</sup>   |
| Mexico Central <sup>6, 8</sup>              | Poland Central <sup>6, 8</sup> |           |                    | Japan East                          |
| North Central US                            | Spain Central <sup>6, 8</sup> |            |                    | Japan West <sup>3, 5, 6, 8</sup>    |
| South Central US <sup>1, 2, 3, 4, 5, 6, 8</sup> | Sweden Central <sup>7</sup> |            |                    | Korea Central                       |
| West US                                     | Switzerland North            |             |                    | Malaysia West <sup>8</sup>          |
| West US 2                                   | Switzerland West <sup>8</sup> |            |                    | New Zealand North <sup>8</sup>      |
| West US 3 <sup>6, 8</sup>                   | UK South <sup>8</sup>        |             |                    | Southeast Asia                      |
|                                             | UK West <sup>8</sup>         |             |                    | South India <sup>8</sup>            |
|                                             |                              |             |                    | Taiwan North <sup>8</sup>           |
|                                             |                              |             |                    | Taiwan Northwest <sup>8</sup>    |

<sup>1</sup> [Ontology (preview)](../iq/ontology/overview.md) isn't available in these regions.
<sup>2</sup> [Healthcare Solutions](/industry/healthcare/healthcare-data-solutions/overview) isn't available in this region.
<sup>3</sup> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) isn't available in these regions.
<sup>4</sup> [Operations agent (preview)](../real-time-intelligence/operations-agent.md) isn't available in these regions.
<sup>5</sup> [Plan (preview)](../iq/plan/overview.md) isn't available in these regions.
<sup>6</sup> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) isn't available in these regions.
<sup>7</sup> [Business Continuity Disaster Recovery (BCDR)](/azure/reliability/reliability-fabric#cross-region-disaster-recovery-and-business-continuity) for Power BI isn't available by default in this region. Power BI is supported in this region but not in its paired region.
<sup>8</sup> [Fabric App (preview)](../apps/overview.md) isn't available in these regions.

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
