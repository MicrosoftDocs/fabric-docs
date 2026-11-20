---
title: On-Demand Billing overview (preview)
description: Learn about on-demand billing in Microsoft Fabric, including billing categories, F0 capacity, spend limits, and quotas.
ms.topic: concept-article
ms.reviewer: mboris, harieswar
ms.date: 11/06/2026
ai-usage: ai-generated
---

# On-demand billing in Microsoft Fabric

> [!IMPORTANT]
> On-demand billing is currently in preview.
> This information relates to a prerelease product that might be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

On-demand billing is a consumption-based billing model for Microsoft Fabric. Operations in an enabled on-demand billing category run outside the capacity's shared compute limit and are billed separately through Azure on-demand billing meters.

You can use on-demand billing in two ways:

- **On a Fabric capacity (F2 or higher)** - Enable one or more on-demand billing categories on an existing capacity. The capacity then operates as a hybrid capacity. Operations in enabled categories no longer draw capacity units (CUs) from the shared capacity and are billed separately. Other operations continue to use the shared capacity.
- **On an F0 capacity** - Create a capacity with zero provisioned CUs and no upfront capacity cost. All supported on-demand billing categories use on-demand billing.

## Benefits of on-demand billing

On-demand billing offers the following benefits:

- **Pay for what you use.** Operations are billed through their mapped on-demand billing meters.
- **Set spending controls.** Each on-demand billing category has its own spend limit, independent of other categories and the capacity's CU limit.
- **Separate variable demand from provisioned capacity.** Operations in an enabled category don't consume the capacity's provisioned CUs.
- **Burst beyond capacity limits.** Operations in an enabled category can use compute beyond the provisioned capacity's CU limit without triggering capacity-wide throttling or requiring a capacity upgrade.
- **Start without upfront commitment.** The F0 capacity lets you begin building on Fabric with no provisioned capacity cost.

## Billing categories

A *billing category* groups related Fabric operations for on-demand billing. When you enable a category, Fabric bills consumption from that category separately from the capacity price.

The following billing categories are available:

| On-demand billing category | Included operations |
|---|---|
| AI data transform | AI Functions and AI Services, Dataflow Gen2, notebook and Spark job runs, shortcut transformations, Project Osmos, SQL analytics endpoint and Warehouse queries, and AI Function Evaluation operations. |
| Application Development | User Data Functions and API for GraphQL operations. |
| Copilot | Copilot operations in Fabric. |
| Cosmos DB database | Cosmos DB capacity usage operations. |
| Data agents | AI query operations. |
| Data Factory | Dataflow, data movement, pipeline activity, and Apache Airflow job operations. |
| VNet data gateway | VNet data gateway uptime operations. |
| Mirroring | Extended capabilities for mirroring billing operations. |
| Data Science | Machine learning model endpoint operations. |
| Data Warehouse | Warehouse query, SQL analytics endpoint query, snapshot query, and notebooks running T-SQL operations. |
| Fabric IQ | Ontology modeling, discovery, AI and reasoning, Graph general, ingestion, and serving, and Fabric Planning background and session operations. |
| OneLake | OneLake read, write, security, and diagnostic operations. |
| Power BI Core Services | Full report email subscription, interactive and public API exports, subscription export, parameter processing, and report rendering operations. |
| Power BI Semantic Models | Semantic model refresh, queries, AI Function Evaluation, VNet data gateway, web modeling, and XMLA read and write operations. |
| Real-Time Intelligence - Eventhouse | Eventhouse uptime, KQL Database, and KQL Queryset operations. |
| Real-Time Intelligence | Eventstream, event ingestion and operations, listeners and alerts, anomaly detection, Activator event computations, Investigation agent reasoning, Operations Agent reasoning and compute, and Maps operations. |
| SQL Database | SQL database in Fabric usage operations. |

> [!NOTE]
> On-demand Billing for Apache Spark is a separate billing scenario with its own configuration and meter. To learn more, see [On-demand Billing for Spark](../data-engineering/autoscale-billing-for-spark-overview.md).

## How on-demand billing works

To manage on-demand billing costs, understand the relationship between CUs and CU-hours.

### CU vs. CU-hours

| Concept | Description | Analogy |
| -- | -- | -- |
| **CU** (capacity units) | A unit of compute power. Some experiences use CUs to define the maximum concurrent compute available at a given time. | Speed |
| **CU-hours** | The amount of compute consumed over time, calculated as CUs multiplied by hours. Billing uses CU-hours, and spend limits evaluate the CU-hours consumed during the preceding rolling 24-hour window. | Fuel |

A billing category that uses 512 CUs continuously for 24 hours consumes 12,288 CU-hours (512 &times; 24). A category that uses 12,288 CUs continuously for one hour consumes the same 12,288 CU-hours.

### Billing meters and pricing

Operations in an on-demand billing category map to separate Azure on-demand billing meters. A category can use multiple meters, and each operation-to-meter mapping has a multiplier against the regional pay-as-you-go price per CU-hour.

To calculate the pay-as-you-go price per CU-hour, find the hourly price for a Fabric capacity SKU in your region and currency on the [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) page, and then divide that price by the number of CUs in the SKU. For example, divide the F2 hourly price by `2`.

> [!NOTE]
> The [Azure Retail Prices REST API](/rest/api/cost-management/retail-prices/azure-retail-prices) returns the regional retail rate for an on-demand billing meter. The rate already includes the on-demand billing multiplier. Don't apply the multiplier again.

For operation-to-meter mappings and multipliers, see [Understand on-demand billing meters and multipliers](on-demand-billing-meters-multipliers.md).

On-demand consumption isn't smoothed. The service sends reported usage to the billing system as it is reported.

## On-demand billing spend limits

Each billing category has a spend limit, which is the CU-hour threshold used to reject new operations based on consumption during the preceding rolling 24-hour window. A spend limit isn't a hard consumption or billing cap. Because the service evaluates usage every five minutes and in-progress operations continue to completion, actual consumption can exceed the configured limit.

Key characteristics of spend limits:

- **24-hour rolling window**: the service evaluates usage every five minutes against the total consumption in the past 24 hours.
- **When the limit is reached**: the service rejects new jobs for that category. In-progress jobs continue to completion and are charged.
- **Setting a limit to 0 CU-hours**: rejects new operations for that category. In-progress operations continue to completion, and operations that don't currently enforce spend limits can continue to consume CUs.
- **Default value**: if you don't configure a spend limit, it defaults to the full quota for that category.
- **Maximum value**: the spend limit can't exceed the quota assigned to that category.

## On-demand billing quotas

Microsoft manages quotas to protect against fraud and maintain service health. On-demand billing has two quota types:

- **On-demand billing quota** - Configured for a billing category, subscription, and region. The configured category limit applies independently to each capacity where the category is enabled and determines the upper bound for the spend limit.
- **On-demand billing-enabled capacity quota** - Limits the number of F0 and hybrid capacities in a subscription and region. The default limit is 20.

The default on-demand quotas depend on the region. Due to regional availability, some quotas can default to 0 CU-hours. You can request an increase from **Quotas** or by creating an Azure support request.

For more information, see [View and increase on-demand billing quotas](fabric-on-demand-billing-quotas.md).

## F0 capacity

The F0 capacity SKU has no provisioned CUs and no upfront capacity cost. All supported billing categories use on-demand billing.

F0 characteristics include:

- **No upfront capacity cost.** You pay for the CUs consumed through on-demand billing.
- **Category-level controls.** Each enabled billing category has its own spend limit and quota.
- **Same quotas and limits.** The same category quotas and spend limits that apply on paid capacities apply to F0.
- **Pause and resume.** You can pause an F0 capacity like any other capacity. When paused, billing categories stop accepting requests.
- **Upgrade anytime.** You can upgrade from F0 to a paid SKU (or downgrade from a paid SKU to F0) at any time.

### F0 vs. paid capacity with on-demand billing

| | F0 capacity | Paid capacity with on-demand billing categories |
| -- | -- | -- |
| **Provisioned CUs** | None | Based on SKU (F2 and higher) |
| **On-demand billing categories** | All supported categories use on-demand billing | You enable available categories |
| **Upfront cost** | None | Capacity price |
| **When to use** | You don't know your capacity requirements yet, or you want pure pay-per-use | You have predictable baseline usage but need burst capacity for specific billing categories |

## Transition behavior

When you change on-demand billing settings or switch SKUs, billing transitions apply to new operations as follows.

| Scenario | New operations | Unreported or smoothed consumption | Spend limit window |
|---|---|---|---|
| **Enable on-demand billing for a category** | Billed through on-demand billing | Consumption already in smoothing continues to bill to the capacity. | Starts fresh |
| **Disable on-demand billing for a category** | Billed to the capacity | Smoothed consumption is billed to the capacity. | Not applicable |
| **Switch from a paid SKU to F0** | Categories use on-demand billing. | Smoothed consumption is reported and charged to the capacity at the time of scaling. Unreported consumption is billed to the capacity. | Starts fresh for enabled billing categories |
| **Switch from F0 to a paid SKU** | On-demand billing is disabled for all categories. New operations use the shared capacity. | Unreported consumption is billed to the capacity. | Not applicable |

## Choose the right capacity model

The right model depends on where you are in your Fabric journey and how predictable your Fabric workloads are.

| Stage | Recommended model | Rationale |
| -- | -- | -- |
| **Evaluating Fabric** | Free trial, then F0 | Start with a trial to learn the platform. When the trial ends, create an F0 capacity. |
| **Early production** | F0 | You don't yet know your capacity requirements. Pay only for what you use while you monitor consumption trends. |
| **Stable, predictable usage** | Paid capacity (F2+) | When you understand your steady-state consumption, upgrade to a paid SKU to benefit from discounted pricing (reserved instances). |
| **Predictable baseline with variable demand** | Paid capacity with on-demand billing | Move operations in enabled billing categories outside the shared capacity limit while other operations continue to use the provisioned capacity. |

## Example scenario

Contoso has an F64 capacity that supports Data Warehouse and other Fabric operations.

- **Steady state**: All workloads run on the F64 paid capacity, within the 64-CU limit.
- **Sales promotion**: Data Warehouse demand increases during a promotion. Contoso enables on-demand billing for the Data Warehouse billing category. Other operations continue to draw from the capacity's 64-CU limit.
- **Billing impact**: Contoso continues to pay for the F64 capacity. Data Warehouse consumption is billed separately through on-demand billing and appears as a separate line item on the Azure bill.
- **After the promotion**: Contoso disables on-demand billing for Data Warehouse. New Data Warehouse operations return to the F64 capacity.

## Considerations and limitations

- On-demand billing isn't available for trial capacities.
- When you pause a capacity, its on-demand billing categories also pause.
- You enable on-demand billing for a category at the capacity level, not for individual workspaces. Data Warehouse provides additional workspace-level compute controls.
- Storage-related charges are billed separately and aren't affected by capacity pause or resume.
- On-demand billing limits aren't currently enforced for VNet data gateway operations.

## Related content

- [Set up on-demand billing in Microsoft Fabric](on-demand-billing-setup.md)
- [Monitor on-demand billing usage in Microsoft Fabric](on-demand-billing-monitor.md)
- [Understand on-demand billing meters and multipliers](on-demand-billing-meters-multipliers.md)
- [View and increase on-demand billing quotas](fabric-on-demand-billing-quotas.md)
- [Understand your Fabric capacity throttling](throttling.md)
- [Capacity overage in Microsoft Fabric](capacity-overage-overview.md)
- [Microsoft Fabric capacity quotas](fabric-quotas.md)
