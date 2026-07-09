---
title: Fabric region availability
description: Learn about Microsoft Fabric region availability, including details about the workloads and features supported in each region and how home region impacts access.
author: msmimart
ms.author: mimart
ms.custom:
  - references_regions
ms.topic: overview
ms.date: 07/08/2026
---

# Fabric region availability

This article lists the region availability of the Fabric [F SKUs](../enterprise/licenses.md#capacity), which are available in the [Azure public cloud regions](https://azure.microsoft.com/explore/global-infrastructure/geographies/). Some of the Fabric workloads might not be immediately available in new regions, or regions where data centers become constrained.

For details about purchasing a Fabric subscription, see [Buy a Fabric subscription](../enterprise/buy-subscription.md).

## Fabric workload and feature availability

Fabric workloads and features are available in most Azure public cloud regions, but some workloads and features might have limited availability in specific regions.

### Home region and Fabric availability

Your [home region](find-fabric-home-region.md) is associated with your tenant. Fabric workload availability varies by tenant region, as shown in the next section. If you want to access all Fabric features in regions where they're not yet available, you can create a capacity in a region where Fabric is available. For more information, see [Multi-Geo support for Fabric](service-admin-premium-multi-geo.md).

<a id="all-workloads"></a>
### Regional Fabric and Power BI workload availability

The following table lists all Azure regions where Power BI or Fabric is available. Some regions support only Power BI, while others support all Fabric workloads. Unavailable features are noted where applicable.

| Geography    | Region               | Power BI | All Fabric<br> workloads | Unavailable Fabric features |
|--|--|:--:|:--:|--|
| Americas     | Brazil South         | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Americas     | Canada Central       | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Americas     | Canada East          | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Americas     | Chile Central        | ✅ | ❌ | Power BI only region |
| Americas     | Mexico Central       | ✅ | ✅ | Not available :<br> [Fabric App (preview)](../apps/overview.md)<br> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| Americas     | US - Central US      | ✅ | ✅ | Not available: <br> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| Americas     | US - East US         | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md)<br> [Operations agent (preview)](../real-time-intelligence/operations-agent.md)<br> [Plan (preview)](../iq/plan/overview.md) |
| Americas     | US - East US 2       | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md)<br> [Plan (preview)](../iq/plan/overview.md) |
| Americas     | US - North Central US| ✅ | ✅ |  |
| Americas     | US - South Central US| ✅ | ✅ | Not available: <br> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) <br> [Fabric App (preview)](../apps/overview.md) <br> [Healthcare Solutions](/industry/healthcare/healthcare-data-solutions/overview) <br> [Ontology (preview)](../iq/ontology/overview.md) <br> [Operations agent](../real-time-intelligence/operations-agent.md) <br> [Plan (preview)](../iq/plan/overview.md) <br> [Schema  Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| Americas     | US - West US         | ✅ | ✅ |  |
| Americas     | US - West US 2       | ✅ | ✅ |  |
| Americas     | US - West US 3       | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) <br> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| **Geography**| **Region** | **Power BI** | **All Fabric workloads** | **Unavailable Fabric features** |
| Europe       | Austria East         | ✅ | ❌ | Power BI only region |
| Europe       | Europe - North Europe| ✅ | ✅ | Not available: <br> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) <br> [Fabric App (preview)](../apps/overview.md) |
| Europe       | Europe - West Europe | ✅ | ✅ | Not available: <br> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| Europe       | France Central       | ✅ | ✅ |  |
| Europe       | France South         | ✅ | ❌ | Power BI only region |
| Europe       | Germany North        | ✅ | ❌ | Power BI only region |
| Europe       | Germany West Central | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Europe       | Italy North          | ✅ | ✅ | Not available: <br> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| Europe       | Norway East          | ✅ | ✅ |  |
| Europe       | Norway West          | ✅ | ❌ | Power BI only region |
| Europe       | Poland Central       | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) <br> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| Europe       | Spain Central        | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) <br> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| Europe       | Sweden Central       | ✅ | ✅ | Not available by default for Power BI: <br> [Business Continuity Disaster Recovery (BCDR)](/azure/reliability/reliability-fabric#cross-region-disaster-recovery-and-business-continuity).<br> Power BI is supported in the region but not in its paired region |
| Europe       | Switzerland North    | ✅ | ✅ |  |
| Europe       | Switzerland West     | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Europe       | UK South             | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Europe       | UK West              | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| **Geography**| **Region** | **Power BI** | **All Fabric workloads** | **Unavailable Fabric features** |
| Middle East  | Qatar Central        | ✅ | ❌ | Power BI only region |
| Middle East  | UAE Central          | ✅ | ❌ | Power BI only region |
| Middle East  | UAE North            | ✅ | ✅ |  |
| Africa       | South Africa North   | ✅ | ✅ |  |
| Africa       | South Africa West    | ✅ | ❌ | Power BI only region |
| Asia Pacific | Asia - East Asia     | ✅ | ✅ |  |
| Asia Pacific | Asia - Southeast Asia| ✅ | ✅ |  |
| Asia Pacific | Australia East       | ✅ | ✅ | Not available: <br> [Plan (preview)](../iq/plan/overview.md) |
| Asia Pacific | Australia Southeast  | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) <br> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| Asia Pacific | India - Central India| ✅ | ✅ |  |
| Asia Pacific | India - India West   | ✅ | ❌ | Power BI only region |
| Asia Pacific | India - South India  | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Asia Pacific | Indonesia Central    | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Asia Pacific | Israel Central       | ✅ | ✅ | Not available: <br> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) <br> [Fabric App (preview)](../apps/overview.md) <br> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| Asia Pacific | Japan East           | ✅ | ✅ |  |
| Asia Pacific | Japan West           | ✅ | ✅ | Not available: <br> [Digital twin builder (preview)](../real-time-intelligence/digital-twin-builder/overview.md) <br> [Fabric App (preview)](../apps/overview.md) <br> [Plan (preview)](../iq/plan/overview.md) <br> [Schema Registry (preview)](../real-time-intelligence/schema-sets/schema-registry-region-availability.md) |
| Asia Pacific | Korea Central        | ✅ | ✅ |  |
| Asia Pacific | Korea South          | ✅ | ❌ | Power BI only region |
| Asia Pacific | Malaysia West        | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Asia Pacific | New Zealand North    | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Asia Pacific | Taiwan North         | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |
| Asia Pacific | Taiwan Northwest     | ✅ | ✅ | Not available: <br> [Fabric App (preview)](../apps/overview.md) |

## Related content

* [Buy a Fabric subscription](../enterprise/buy-subscription.md)
* [Find your Fabric home region](./find-fabric-home-region.md)
