---
title: Workspace outbound access protection for data warehouse workloads
description: "This article describes workspace outbound access protection for data warehouse workloads."
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 11/17/2025

#customer intent: As a data engineer, I want to restrict and manage outbound network connections from my Fabric workspace’s data warehouse workloads, so that I can prevent unauthorized data exfiltration and ensure compliance with my organization’s security requirements.

---

# Workspace outbound access protection for Data Warehouse

Workspace outbound access protection helps safeguard your data by controlling outbound connections from Data Warehouse items in your workspace to external data sources. When this feature is enabled, [Data Warehouse items](#supported-data-warehouse-item-types) are restricted from making outbound connections.

When outbound access protection is enabled, outbound connections from warehouses and SQL analytics endpoints are allowed only to destinations explicitly permitted by configured Data Connection Rules. Any destination not included in the allow list is blocked.

## Understanding outbound access protection with Data Warehouse

When outbound access protection is enabled, the workspace restricts outbound connections from warehouses and SQL analytics endpoints according to the configured Data Connection Rules. Only destinations that are explicitly allowed by the workspace configuration can be accessed. Any attempt to access data, services, or resources that aren’t permitted by these rules is denied.

## Configuring outbound access protection for Data Warehouse

To configure outbound access protection for Data Warehouse, follow the steps in [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md). Outbound connections from warehouses and SQL analytics endpoints are evaluated against the configured Data Connection Rules. Connections are allowed only when the destination is explicitly permitted. Destinations that aren't allowed by the rules are blocked.

## Supported Data Warehouse item types

These Data Warehouse item types are supported with outbound access protection:

* Warehouses
* SQL analytics endpoints

The following sections explain how outbound access protection affects these items in your workspace.

### Warehouses

With outbound access protection enabled, Fabric warehouses enforce outbound connection rules for ingestion pipelines and data load operations. Commands such as COPY INTO, OPENROWSET, BULK INSERT, and similar operations can only connect to destinations that are explicitly allowed by the workspace Data Connection Rules. Attempts to connect to destinations that aren’t allowed are blocked.

### SQL analytics endpoints

For SQL analytics endpoints, outbound access protection ensures that queries and data access operations can only reach destinations allowed by the workspace Data Connection Rules. Data import commands and external data access operations are permitted only when the target destination is included in the configured allow list.

## Considerations and limitations

- When outbound access protection is enabled, all outbound connections from warehouses and SQL analytics endpoints must comply with the configured Data Connection Rules. Currently, exceptions can't be configured through managed private endpoints.
- Data import commands (such as COPY INTO, OPENROWSET, BULK INSERT) follow the configured Data Connection Rules. Fabric Warehouse and SQL analytics endpoints support rules for Azure Data Lake Storage Gen2 and Lakehouse connections to other Fabric items. Connections are allowed only when the destination is explicitly permitted by the workspace rules.
- When using a Lakehouse connection, Fabric Warehouse evaluates the Data Connection Rule only against the workspace associated with the Lakehouse connector. After the connection to that workspace is allowed, the warehouse can access any valid item within that workspace. The rule doesn’t enforce filtering at the individual item level within that workspace.
- For other limitations, refer to [Workspace outbound access protection overview - Microsoft Fabric](/fabric/security/workspace-outbound-access-protection-overview#considerations-and-limitations).

## Related content

* [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md)    
* [COPY INTO (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true)
* [Browse File Content Before Ingestion with the OPENROWSET function](/fabric/data-warehouse/browse-file-content-with-openrowset)
