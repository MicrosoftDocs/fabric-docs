---
title: "Limitations in Microsoft Fabric Mirrored Databases From Azure Databricks"
description: Learn about limitations for Azure Databricks mirroring in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.reviewer: sheppardshep, whhender, preshah
ms.date: 12/19/2025
ms.topic: overview
ms.custom: references_regions
---

# Limitations in Microsoft Fabric mirrored databases from Azure Databricks

This article lists current limitations with mirrored Azure Databricks in Microsoft Fabric.

## Network

- Azure Databricks workspaces shouldn't be behind a private endpoint.
- Azure Databricks IP Access lists aren't supported.

## Supported Spark Versions

Fabric Runtime Version needs to be at least Spark 3.4 Delta 2.4. Verify in Workspace Settings, Data Engineering/Science, Spark Settings, Environment Tab.

## Limitations

- Mirrored Azure Databricks item doesn't support renaming schema, table, or both when added to the inclusion or exclusion list.
- Azure Data Lake Storage Gen 2 account that is utilized by your Azure Databricks workspace must also be accessible to Fabric.

The following table types are not supported:

- Tables with RLS/CLM policies
- Lakehouse federated tables
- Delta sharing tables
- Streaming tables
- Views, Materialized views

### Supported regions

Here's a list of regions that support mirroring for Azure Databricks Catalog:

:::row:::
   :::column span="":::
    **Americas**:

    - Brazil South
    - Canada Central
    - Canada East
    - Mexico Central
    - Central US
    - East US
    - East US2
    - North Central US
    - South Central US
    - West US
    - West US 2
    - West US 3
 
   :::column-end:::
   :::column span="":::
    **Asia Pacific**:

    - East Asia
    - Southeast Asia
    - Australia East
    - Australia Southeast
    - Central India
    - South India
    - Indonesia Central
    - Japan East
    - Japan West
    - Korea Central
    - Malaysia West
    - New Zealand North
    - Singapore
    - Taiwan North
    - Taiwan Northwest
   :::column-end:::
   :::column span="":::
   **Europe, Middle East, and Africa**:

    - North Europe
    - West Europe
    - France Central
    - Germany North
    - Germany West Central
    - Israel Central
    - Italy North
    - Norway East
    - Norway West
    - Poland Central
    - Spain Central
    - Sweden Central
    - Switzerland North
    - Switzerland West
    - South Africa North
    - South Africa West
    - UAE North
    - UK South
    - UK West
   :::column-end:::

:::row-end:::

## Related content

- [Tutorial: Configure Microsoft Fabric mirrored databases from Azure Databricks](../mirroring/azure-databricks-tutorial.md)
- [Secure Fabric mirrored databases from Azure Databricks](../mirroring/azure-databricks-security.md)
- [Review the FAQ](../mirroring/azure-databricks-faq.yml)
- [Mirroring Azure Databricks Unity Catalog](../mirroring/azure-databricks.md)
