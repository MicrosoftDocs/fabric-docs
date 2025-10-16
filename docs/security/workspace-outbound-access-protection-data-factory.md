---
title: Workspace outbound access protection for Data Factory
description: Learn how to configure Workspace Outbound Access Protection (outbound access protection) to secure your data engineering and integration artifacts in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure data connections to only approved destinations.
author: msmimart
ms.author: mimart
ms.reviewer: mimart
ms.date: 09/23/2025
ms.topic: how-to
---

# Workspace outbound access protection for Data Factory

Workspace outbound access protection helps safeguard your data by controlling outbound connections from your workspace to other workspaces and external sources. When this feature is enabled, Data Factory items are restricted from making outbound connections to public endpoints unless access is explicitly granted. You can only create an allowlist using data connection rules; managed private endpoints aren't supported for Data Factory workloads. This capability is crucial for organizations in secure or regulated environments, as it helps prevent data exfiltration and enforces organizational network boundaries.

## Understanding outbound access protection with Data Factory

When configuring workspace outbound access protection, the workspace admin first enables outbound access protection, which blocks all outbound connections from Dataflow by default.  

:::image type="content" source="media/workspace-outbound-access-protection-data-factory/block-by-default.png" alt-text="Diagram showing the outbound access protection configuration process for Dataflow." lightbox="media/workspace-outbound-access-protection-data-factory/block-by-default.png" border="false":::

Next, the workspace admin configures data connection rules for cloud or gateway connection policies to specify which external sources are allowed, such as SQL Server and ADLS Gen2 Storage. Once policies are set, Dataflow can connect only to the approved destinations (in this example, SQL Server and ADLS Gen2 Storage), while all other outbound connections remain blocked.

:::image type="content" source="media/workspace-outbound-access-protection-data-factory/block-and-allow.png" alt-text="Screenshot of Dataflow connections showing allowed connections to SQL Server and ADLS G2 Storage." lightbox="media/workspace-outbound-access-protection-data-factory/block-and-allow.png" border="false":::

## Configuring outbound access protection for Data Factory

You can only create an allowlist using data connection rules; managed private endpoints aren't supported for Data Factory workloads. To configure outbound access protection for Data Factory:

1. Follow the steps to [enable outbound access protection](workspace-outbound-access-protection-set-up.md). 

1. After enabling outbound access protection, you can set up [data connection rules for cloud or gateway connection policies](workspace-outbound-access-protection-allow-list-connector.md) to allow outbound access to other workspaces or external resources as needed.

Once configured, Data Factory items can connect only to the approved destinations specified in the data connection rules, while all other outbound connections remain blocked.

## Supported Data Factory item types

The following Data Factory item types are supported with outbound access protection:

- Data Flows Gen2 (with CICD)
- Data Pipelines
- Copy Jobs

The next section explains how outbound access protection affects several common Data Factory scenarios.

## Common Scenarios

Workspace outbound access protection affects how Data Factory items connect to other workspaces and external data sources. Below are common scenarios illustrating how outbound access protection impacts these connections.

### Internal Fabric connectors

The following tables summarize how workspace outbound access protection applies to Fabric connectors with and without workspace-level granularity.

#### Fabric connectors with workspace allowlist (Lakehouse, Warehouse, Fabric SQL DB, and Dataflows)

For Fabric connectors that support workspace-level granularity, you can specify which destination workspaces are permitted for each connector.

| Source WS | Destination WS | Connector Type | Connector Setting | Result |
|----|----|----|----|----|
| A | A | Lakehouse | Allowed/Blocked | Connection is allowed to A because it's in the same workspace |
| A | B | Lakehouse | Connector allowed | Connection is allowed to B and all other lakehouses in the tenant |
| A | B | Lakehouse | Connector blocked (only workspace B is allowed) | Connection is allowed only to lakehouses in workspace B |
| A | B | Lakehouse | Connector blocked (only workspace C) | Connection to workspace B is blocked |

#### Fabric connectors without granularity (all Fabric connectors except those in 4.1) (example: data pipeline triggering a notebook)

For Fabric connectors that lack workspace-level granularity, the allowlist applies to all item types and either allows or blocks all connections without workspace-specific exceptions.

| Data Pipeline WS | Notebook WS | Connector Type | Connector Setting (Allowed/Blocked) | Result |
|----|----|----|----|----|
| A | Any (including A) | Notebook | Allowed | The data pipeline can connect to the notebook because it's within the workspace boundary |
| A | Any | Notebook | Blocked | The data pipeline can't connect to the notebook because it's outside the workspace boundary |

### External data sources

The following tables show how workspace outbound access protection applies to external connectors with granular endpoint exceptions, allowing admins to permit or block specific external destinations.

#### External connector with granular endpoints exception (for example, ADLS Gen2 storage)

For external connectors that support endpoint-level granularity, you can specify individual destination endpoints as exceptions to outbound access restrictions.

| Dataflow WS | Destination | Connector Type | Connector Setting | Result |
|----|----|----|----|----|
| A | SQL Server 1 | SQL Server | Blocked at connector level | Connection is blocked to SQL Server 1 |
| A | SQL Server 1 | SQL Server | Blocked at connector level with exception for SQL Server 1 | Connection is allowed to SQL Server 1 |
| A | SQL Server 1 | SQL Server | Allowed at connector level | Connection is allowed to all SQL Server instances |

#### External data source connectivity using granular endpoints exception

For external connectors that support granular endpoint exceptions for Azure Cosmos DB, you can allow or block connections to Azure Cosmos DB destinations.

| Dataflow WS | Azure Cosmos DB destination | Connector Type | Connector Setting (Allowed/Blocked) | Result |
|----|----|----|----|----|
| A | Any | Azure Cosmos DB | Allowed | Dataflow can connect to any Azure Cosmos DB |
| A | Any | Azure Cosmos DB | Blocked | Dataflow can't connect to any Azure Cosmos DB |

### Gateway and network connections

The following table summarizes how workspace outbound access protection applies to virtual network and on-premises data gateway connections.

#### Virtual network and on-premises data gateway connections

When you allowlist a gateway, dataflows can connect to any data source accessible through that gateway. All outbound connections made via the allowlisted gateway are allowed.

| Dataflow WS | Connection type | Destination type | Connection Setting (Allowed/Blocked) | Result |
|----|----|----|----|----|
| A | VNet/OPDG | Any | Allowed | Dataflow connects to all VNets and OPDGs |
| A | VNet/OPDG | Any | Blocked (no exceptions) | Dataflow can't connect to any VNet or OPDG |
| A | VNet/OPDG | VNet V1 | Blocked; only VNet V1 is an exception | Dataflow connects only to sources behind VNet V1 |
| A | VNet/OPDG | OPDG O1 | Blocked; only OPDG O1 is an exception | Dataflow connects only to sources behind OPDG O1 |

## Considerations and limitations

- Only the following Fabric connectors support workspace level granularity:

  - Lakehouse
  - Warehouse
  - Fabric SQL DB
  - Dataflows

> [!NOTE]
> Other Fabric connectors like Datamarts and KQL Database don’t support WS level granularity.

- Data Pipelines only support following Fabric connectors:

  - FabricDataPipeline,
  - CopyJob
  - UserDataFunction
  - PowerBIDataset

- For Dataflows, cross-workspace Data Warehouse destinations aren't supported.

- Workspace outbound access protection (WS outbound access protection) isn't supported for Lakehouse with default Semantic models. To ensure the Lakehouse is compatible with outbound access protection:

  - We recommend enabling outbound access protection on the workspace before creating a Lakehouse to ensure compatibility.
  - Enabling outbound access protection on an existing workspace that already contains a Lakehouse (and its associated Semantic model) isn't supported.

- For other limitations, refer to [Workspace outbound access protection overview - Microsoft Fabric](/fabric/security/workspace-outbound-access-protection-overview#considerations-and-limitations).
