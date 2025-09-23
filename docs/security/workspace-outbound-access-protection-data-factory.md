---
title: Workspace outbound access protection for Data Factory
description: Learn how to configure Workspace Outbound Access Protection (OAP) to secure your data engineering and integration artifacts in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure data connections to only approved destinations.
author: msmimart
ms.author: mimart
ms.reviewer: mimart
ms.date: 09/23/2025
ms.topic: concept-article
---

# Workspace outbound access protection for Data Factory

Workspace Outbound Access Protection (OAP) is a security feature in Microsoft Fabric that enables workspace administrators to control and restrict outbound data connections from their workspaces. By configuring OAP, workspace admins can block outbound connections from the workspace and only allow connections to the destinations connected via managed private endpoints. Workspace
admins can choose to create [Cross WS Managed private
endpoints](security-cross-workspace-communication.md)
within Fabric or they can create [Managed Private
Endpoints](security-managed-private-endpoints-overview.md)
to external destinations that support it.

This article explains how to enable and manage OAP for Data Factory artifacts, including Data Flows Gen2 (with CICD), Data Pipelines, and CopyJobs, which rely on Data Connection policies for allowlisting outbound connections to allowed targets. It outlines supported scenarios and provides guidance on best practices and limitations.

## Overview of OAP configuration for Data Factory artifacts

**Step 1**: OAP is turned On (all outbound connections blocked for
Dataflow)

:::image type="content" source="media/workspace-outbound-access-protection-data-factory/image1.png" alt-text="Diagram showing the OAP configuration process for Dataflow.":::

**Step 2**: Workspace Admin Configures Data connection policies under
OAP to

- SQL Server : **Allowed**

- ADLS G2 Storage: **Allowed**

:::image type="content" source="media/workspace-outbound-access-protection-data-factory/image2.png" alt-text="Screenshot of data connection policies configuration showing ADLS G2 Storage allowed. ":::

**Step 3**: Dataflow is now able to connect with SQL sever and ADLS G2
storage, all other connections still remain blocked

:::image type="content" source="media/workspace-outbound-access-protection-data-factory/image3.png" alt-text="Screenshot of Dataflow connections showing allowed connections to SQL Server and ADLS G2 Storage.":::

## Setup

> Prerequisite:

- Microsoft enables relevant feature switches

- Re-register Microsoft.Fabric in Azure for Subscriptions containing
  workspace private link resource and private endpoint.

- Workspace needs to use Fabric capacity. Trial is not supported.

- Ensure the [Workspace OAP tenant
  switch](workspace-outbound-access-protection-tenant-setting.md)
  is enabled

- You can only configure OAP on the workspace if you are the workspace
  Admin

### Enabling/Disabling OAP

#### Using the Fabric portal

1.  Login to the Fabric using the URL: To access the feature use the
    URL:
    <https://app.fabric.microsoft.com/home?experience=fabric-developer&lhDepRestrictions=true>
    (with workspace Admin role)

1.  Go to Workspace->Workspace setting->Network Security, and turn on
    Block Outbound Access under Outbound access protection

:::image type="content" source="media/workspace-outbound-access-protection-data-factory/image4.png" alt-text="Screenshot of workspace network security settings showing the Block Outbound Access toggle enabled.":::

1.  Add the data connection rules to allow/block different types of
    sources that the workspace can connect to.

:::image type="content" source="media/workspace-outbound-access-protection-data-factory/image5.png" alt-text="Screenshot of data connection rules configuration listing allowed and blocked connection types.":::

1.  You can also add Gateway connection policies to allow/block certain
    gateways.

#### Using the API

1. Call the following PUT API to configure WS OAP:

- **Note**: Only workspace Admins can call this API

- **API format**: 
```
PUT https://api.fabric.microsoft.com/v1/workspaces/{workspace-id}/networking/communicationPolicy
```

- You have to pass Authentication code with Bearer Token (PowerBI Access
  Token)

- Add the body with **outbound** set as deny/allow. Make sure you are
  setting the inbound setting as well to the past choice so that it
  doesn’t set to default value (allow).

```http
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

1.  Call the following APIs to view/update the Data Connection rules
    (Cloud Connections)

- **Note**: Only workspace Admins can call this API

\<TBA\>

1.  Call the following APIs to view/update the Data Connection rules
    (Gateways)

- **Note**: Only workspace Admins can call this API

\<TBA\>

# 3. Supported artifacts

You can use WS OAP only for the following artifacts:

- Data Engineering Artifacts (already in Public Preview): [Workspace
  outbound access protection overview - Microsoft Fabric \| Microsoft
  Learn](/fabric/security/workspace-outbound-access-protection-overview)

- Data Integration Artifacts (In Private Preview)

  - Dataflows Gen 2 (with CICD)

  - Data Pipelines

  - CopyJob

## Common Scenarios

### Cloud connections

#### Fabric data sources

#### Non-Fabric data sources

#### Fabric connectors with workspace allowlist (Lakehouse, Warehouse, Fabric SQL DB, and Dataflows)

Some Fabric connectors have workspace-level granularity.
Workspace admins select which destination workspace they want to allow for a connector.

| Source WS | Destination WS | Connector Type | Connector Setting | Result |
|----|----|----|----|----|
| A | A | Lakehouse | Allowed/Blocked | Connection is allowed to A because it's in the same workspace |
| A | B | Lakehouse | Connector allowed | Connection is allowed to B and all other lakehouses in the tenant |
| A | B | Lakehouse | Connector blocked (only workspace B is allowed) | Connection is allowed only to lakehouses in workspace B |
| A | B | Lakehouse | Connector blocked (only workspace C) | Connection to workspace B is blocked |

#### 4.1.2 Fabric connectors without granularity (all Fabric connectors except those in 4.1) (example: data pipeline triggering a notebook)

Some Fabric connectors don't have workspace-level granularity.
For these connectors, the allowlist either allows all item types or blocks all item types.

| Data Pipeline WS | Notebook WS | Connector Type | Connector Setting (Allowed/Blocked) | Result |
|----|----|----|----|----|
| A | Any (including A) | Notebook | Allowed | The data pipeline can connect to the notebook because it's within the workspace boundary |
| A | Any | Notebook | Blocked | The data pipeline can't connect to the notebook because it's outside the workspace boundary |

### 4.2 For non-Fabric data sources 

#### 4.2.1: External connector with granular endpoints exception (for example, ADLS Gen2 storage)

Some external connectors have endpoint-level granularity, so
workspace admins can select which destination endpoints act
as exceptions.

| Dataflow WS | Destination | Connector Type | Connector Setting | Result |
|----|----|----|----|----|
| A | SQL Server 1 | SQL Server | Blocked at connector level | Connection is blocked to SQL Server 1 |
| A | SQL Server 1 | SQL Server | Blocked at connector level with exception for SQL Server 1 | Connection is allowed to SQL Server 1 |
| A | SQL Server 1 | SQL Server | Allowed at connector level | Connection is allowed to all SQL Server instances |

#### 4.2.2: External data source connectivity using granular endpoints exception

| Dataflow WS | Azure Cosmos DB destination | Connector Type | Connector Setting (Allowed/Blocked) | Result |
|----|----|----|----|----|
| A | Any | Azure Cosmos DB | Allowed | Dataflow can connect to any Azure Cosmos DB |
| A | Any | Azure Cosmos DB | Blocked | Dataflow cannot connect to any Azure Cosmos DB |


### 4.2 For VNet and on-premises data gateway connections

Allow list gateways to let dataflows use all data sources behind the gateway (all gateway connections are allowed).

| Dataflow WS | Connection type | Destination type | Connection Setting (Allowed/Blocked) | Result |
|----|----|----|----|----|
| A | VNet/OPDG | Any | Allowed | Dataflow connects to all VNets and OPDGs |
| A | VNet/OPDG | Any | Blocked (no exceptions) | Dataflow can't connect to any VNet or OPDG |
| A | VNet/OPDG | VNet V1 | Blocked; only VNet V1 is an exception | Dataflow connects only to sources behind VNet V1 |
| A | VNet/OPDG | OPDG O1 | Blocked; only OPDG O1 is an exception | Dataflow connects only to sources behind OPDG O1 |

### 4.4 Mirrored DBs

## 5. Limitations and Considerations

- Only the following Fabric Connector support workspace level
  granularity:

  - Lakehouse

  - Warehouse

  - Fabric SQL DB

  - Dataflows

> Other Fabric connectors like Datamarts and KQL Database don’t support
> WS level granularity

- Data Pipelines only support following Fabric connectors:

  - FabricDataPipeline,

  - CopyJob

  - UserDataFunction

  - PowerBIDataset

- For Dataflows Cross WS Datawarehouse destination is not supported

- Workspace outbound access protection (WS OAP) isn't supported for
  Lakehouse with default Semantic models. To ensure the Lakehouse is
  compatible with OAP:

  - We recommend enabling OAP on the workspace before creating a
    Lakehouse. This ensures compatibility.

  - If you try to enable OAP on an existing workspace that already
    contains a Lakehouse (and its associated Semantic model) it won’t
    work.

- For other limitations please refer to this doc: [Workspace outbound
  access protection overview - Microsoft Fabric \| Microsoft
  Learn](/fabric/security/workspace-outbound-access-protection-overview#considerations-and-limitations)

