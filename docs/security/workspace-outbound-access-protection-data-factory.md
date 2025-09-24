---
title: Workspace outbound access protection for Data Factory
description: Learn how to configure Workspace Outbound Access Protection (OAP) to secure your data engineering and integration artifacts in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure data connections to only approved destinations.
author: msmimart
ms.author: mimart
ms.reviewer: mimart
ms.date: 09/23/2025
ms.topic: how-to
---

# Workspace outbound access protection for Data Factory

Workspace Outbound Access Protection (OAP) is a security feature in Microsoft Fabric that lets workspace administrators control and restrict outbound data connections from their workspaces. By configuring OAP, workspace admins block outbound connections from the workspace and allow connections only to destinations connected via managed private endpoints. Workspace admins can choose to create [Cross WS Managed private endpoints](security-cross-workspace-communication.md)
within Fabric or they can create [Managed Private Endpoints](security-managed-private-endpoints-overview.md) to external destinations that support it.

This article explains how to enable and manage OAP for Data Factory artifacts, including Data Flows Gen2 (with CICD), Data Pipelines, and CopyJobs, which rely on Data Connection policies to allow outbound connections to approved targets. It describes supported scenarios and offers guidance on best practices and limitations.

## How OAP works with Data Factory items

When configuring workspace OAP, the workspace admin first enables OAP, which blocks all outbound connections from Dataflow by default.  

:::image type="content" source="media/workspace-outbound-access-protection-data-factory/block-by-default.png" alt-text="Diagram showing the OAP configuration process for Dataflow.":::

Next, the workspace admin configures data connection policies to specify which external sources are allowed, such as SQL Server and ADLS Gen2 Storage.  

:::image type="content" source="media/workspace-outbound-access-protection-data-factory/data-connection-rules.png" alt-text="Screenshot of data connection policies configuration showing ADLS G2 Storage allowed.":::

Once policies are set, Dataflow can connect only to the approved destinations (in this example, SQL Server and ADLS Gen2 Storage), while all other outbound connections remain blocked.

:::image type="content" source="media/workspace-outbound-access-protection-data-factory/block-and-allow.png" alt-text="Screenshot of Dataflow connections showing allowed connections to SQL Server and ADLS G2 Storage.":::

## Setting up workspace OAP

Before you begin setting up workspace OAP, review the steps below to ensure your workspace is properly configured and meets all prerequisites.

### Prerequisites
- To configure workspace OAP settings in the Fabric portal or via API, you must be a workspace admin.
- For subscriptions using workspace private link resources and private endpoints, ensure the Microsoft.Fabric resource provider is re-registered in Azure.
- The workspace must be assigned to Fabric capacity; trial capacities aren't supported.
- The [Workspace OAP tenant switch](workspace-outbound-access-protection-tenant-setting.md) must be enabled.

### [Fabric portal](#tab/fabric-portal)

1. Sign in to the Fabric as a workspace admin.

1. Go to **Workspace** > **Workspace settings** > **Network security**.
1. Under **Outbound access protection**, turn the **Block Outbound public access** toggle to **On**. 

   :::image type="content" source="media/workspace-outbound-access-protection-data-factory/network-security-block-outbound.png" alt-text="Screenshot of workspace network security settings showing the Block Outbound Access toggle enabled.":::

1. Add the data connection rules to allow/block different types of sources that the workspace can connect to.

   :::image type="content" source="media/workspace-outbound-access-protection-data-factory/data-connection-rules.png" alt-text="Screenshot of data connection rules configuration listing allowed and blocked connection types.":::

1. You can also use the **Gateway connection policies** settings to allow or block specific gateways.

### [API](#tab/api)

Use the following PUT API to configure WS OAP:

`PUT https://api.fabric.microsoft.com/v1/workspaces/{workspace-id}/networking/communicationPolicy`

Pass the authentication code with Bearer Token (Power BI Access Token).

Add the body with **outbound** set as deny/allow. Make sure you're setting the inbound setting as well to the past choice so that it doesn’t set to default value (allow).

```json
{
  "inbound": {
    "publicAccessRules": {
      "defaultAction": "Allow"
    }
  },
  "outbound": {
    "publicAccessRules": {
      "defaultAction": "Deny"
    }
  }
}
```

Call the following APIs to view/update the Data Connection rules (Cloud Connections).

TODO

Call the following APIs to view/update the Data Connection rules (Gateways).

TODO

## Supported Fabric items

You can use workspace OAP for the following items only:

- Data Engineering items

- Data Factory items
  - Dataflow Gen2 (with CICD)
  - Data pipelines
  - CopyJob

## Common Scenarios

Workspace outbound access protection affects how Data Factory items connect to other workspaces and external data sources. Below are common scenarios illustrating how OAP impacts these connections.

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

### Mirrored databases

TODO

## Limitations and Considerations

- Only the following Fabric Connector support workspace level granularity:

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

- Workspace outbound access protection (WS OAP) isn't supported for Lakehouse with default Semantic models. To ensure the Lakehouse is compatible with OAP:

  - We recommend enabling OAP on the workspace before creating a Lakehouse to ensure compatibility.
  - Enabling OAP on an existing workspace that already contains a Lakehouse (and its associated Semantic model) isn't supported.

- For other limitations, refer to [Workspace outbound access protection overview - Microsoft Fabric](/fabric/security/workspace-outbound-access-protection-overview#considerations-and-limitations).
