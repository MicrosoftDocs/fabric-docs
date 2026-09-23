---
title: Fabric region availability
description: Learn about Microsoft Fabric region availability, including details about the workloads and features supported in each region and how home region impacts access.
author: msmimart
ms.author: mimart
ms.custom:
  - references_regions
ms.topic: overview
ms.date: 09/22/2026
---

# Fabric region availability

This article lists the region availability of the Fabric [F SKUs](../enterprise/licenses.md#capacity), which are available in the [Azure public cloud regions](https://azure.microsoft.com/explore/global-infrastructure/geographies/). Some of the Fabric workloads might not be immediately available in new regions, or regions where data centers become constrained.

For details about buying Fabric capacity, see [Buy Fabric capacity in Azure](../enterprise/buy-capacity.md).

## Fabric workload and feature availability

Fabric workloads and features are available in most Azure public cloud regions, but some workloads and features might have limited availability in specific regions.

### Home region and Fabric availability

Your [home region](find-fabric-home-region.md) is associated with your tenant. Fabric workload availability varies by tenant region, as shown in the next section. If you want to access all Fabric features in regions where they're not yet available, you can create a capacity in a region where Fabric is available. For more information, see [Multi-Geo support for Fabric](service-admin-premium-multi-geo.md).

<a id="all-workloads"></a>
### Regional Fabric and Power BI workload availability

The following table lists all Azure regions where Power BI or Fabric is available. Geography names follow the [Azure regions list](/azure/reliability/regions-list?tabs=all). Some regions support only Power BI, while others support all Fabric workloads. Unavailable features are noted where applicable.

| Geography    | Region               | Power BI | All Fabric<br> workloads | Unavailable Fabric features |
|--|--|:--:|:--:|--|
| Brazil       | Brazil South         | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Canada       | Canada Central       | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Canada       | Canada East          | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Chile        | Chile Central        | ✅ | ❌ | Power BI only region |
| Mexico       | Mexico Central       | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| United States | US - Central US      | ✅ | ✅ |  |
| United States | US - East US         | ✅ | ✅ |Not available:  <br> [Operations agent (preview)](../real-time-intelligence/operations-agent.md)|
| United States | US - East US 2       | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| United States | US - North Central US| ✅ | ✅ |  |
| United States | US - South Central US| ✅ | ✅ | Not available: <br> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) <br> [Fabric App (preview)](../apps/overview.md) <br> [Healthcare Solutions](/industry/healthcare/healthcare-data-solutions/overview) <br> [Ontology (preview)](../iq/ontology/overview.md) <br> [Operations agent](../real-time-intelligence/operations-agent.md) <br> [Schema  Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| United States | US - West US         | ✅ | ✅ |  |
| United States | US - West US 2       | ✅ | ✅ |  |
| United States | US - West US 3       | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| **Geography**| **Region** | **Power BI** | **All Fabric workloads** | **Unavailable Fabric features** |
| Austria      | Austria East         | ✅ | ❌ | Power BI only region |
| Belgium      | Belgium Central      | ✅ | ❌ | Power BI only region |
| Denmark      | Denmark East         | ✅ | ❌ | Power BI only region |
| Europe       | Europe - North Europe| ✅ | ✅ | Not available: <br> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) <br> [Fabric App (preview)](../apps/overview.md) |
| Europe       | Europe - West Europe | ✅ | ✅ |  |
| France       | France Central       | ✅ | ✅ |  |
| France       | France South         | ✅ | ❌ | Power BI only region |
| Germany      | Germany North        | ✅ | ❌ | Power BI only region |
| Germany      | Germany West Central | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Italy        | Italy North          | ✅ | ✅ |  |
| Norway       | Norway East          | ✅ | ✅ |  |
| Norway       | Norway West          | ✅ | ❌ | Power BI only region |
| Poland       | Poland Central       | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Spain        | Spain Central        | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Sweden       | Sweden Central       | ✅ | ✅ | Not available by default for Power BI: <br> [Business Continuity Disaster Recovery (BCDR)](/azure/reliability/reliability-fabric#cross-region-disaster-recovery-and-business-continuity).<br> Power BI is supported in the region but not in its paired region |
| Switzerland  | Switzerland North    | ✅ | ✅ |  |
| Switzerland  | Switzerland West     | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| United Kingdom | UK South            | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| United Kingdom | UK West             | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| **Geography**| **Region** | **Power BI** | **All Fabric workloads** | **Unavailable Fabric features** |
| Qatar        | Qatar Central        | ✅ | ❌ | Power BI only region |
| UAE          | UAE Central          | ✅ | ❌ | Power BI only region |
| UAE          | UAE North            | ✅ | ✅ |  |
| South Africa | South Africa North   | ✅ | ✅ |  |
| South Africa | South Africa West    | ✅ | ❌ | Power BI only region |
| Asia Pacific | Asia - East Asia     | ✅ | ✅ |  |
| Asia Pacific | Asia - Southeast Asia| ✅ | ✅ |  |
| Australia    | Australia East       | ✅ | ✅ |  |
| Australia    | Australia Southeast  | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| India        | India - Central India| ✅ | ✅ |  |
| India        | India - India West   | ✅ | ❌ | Power BI only region |
| India        | India - South India  | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Indonesia    | Indonesia Central    | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Israel       | Israel Central       | ✅ | ✅ | Not available: <br> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) <br> [Fabric App (preview)](../apps/overview.md) |
| Japan        | Japan East           | ✅ | ✅ |  |
| Japan        | Japan West           | ✅ | ✅ | Not available: <br> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) <br> [Fabric App (preview)](../apps/overview.md) |
| Korea        | Korea Central        | ✅ | ✅ |  |
| Korea        | Korea South          | ✅ | ❌ | Power BI only region |
| Malaysia     | Malaysia West        | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| New Zealand  | New Zealand North    | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Asia Pacific | Taiwan North         | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Asia Pacific | Taiwan Northwest     | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |

<!-- TODO: Confirm the Geography values for Taiwan North and Taiwan Northwest when Azure lists these regions. -->

## Related content

* [Buy Fabric capacity in Azure](../enterprise/buy-capacity.md)
* [Find your Fabric home region](./find-fabric-home-region.md)
