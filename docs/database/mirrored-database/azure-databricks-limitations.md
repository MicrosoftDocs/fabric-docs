---
title: Limitations in Microsoft Fabric mirrored databases from Azure Databricks (Preview)
description: Learn about limitations for Azure Databricks mirroring in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sheppardshep, whhender
ms.date: 09/20/2024
ms.topic: overview
---

# Limitations in Microsoft Fabric mirrored databases from Azure Databricks (Preview)

This article lists current limitations with mirrored Azure Databricks in Microsoft Fabric.

## Network

- Azure Databricks workspaces shouldn't be behind a private endpoint.
- Storage accounts containing unity catalog data can't be behind a firewall.
- Azure Databricks IP Access lists aren't supported.

## Supported Spark Versions

Fabric Runtime Version needs to be at least Spark 3.4 Delta 2.4. Verify in Workspace Settings, Data Engineering/Science, Spark Settings, Environment Tab.

## Limitations

- Mirrored Azure Databricks item doesn't support renaming schema, table, or both when added to the inclusion or exclusion list.
- Azure Databricks workspaces shouldn't be behind a private endpoint.
- Azure Data Lake Storage Gen 2 account that is utilized by your Azure Databricks workspace must also be accessible to Fabric.

The following table types are not supported:

- Tables with RLS/CLM policies
- Lakehouse federated tables
- Delta sharing tables
- Streaming tables
- Views, Materialized views

## Related content

- [Mirroring Azure Databricks (Preview) Tutorial](azure-databricks-tutorial.md)
- [Secure Fabric mirrored databases from Azure Databricks](azure-databricks-security.md)
- [Review the FAQ](azure-databricks-faq.yml)
- [Mirroring Azure Databricks Unity Catalog (Preview)](azure-databricks.md)
