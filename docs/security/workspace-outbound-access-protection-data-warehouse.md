---
title: Workspace outbound access protection for data warehouse workloads
description: "This article describes workspace outbound access protection for data warehouse workloads."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: overview #Don't change
ms.date: 10/16/2025

#customer intent: As a data engineer, I want to restrict and manage outbound network connections from my Fabric workspace’s data warehouse workloads, so that I can prevent unauthorized data exfiltration and ensure compliance with my organization’s security requirements.

---

# Workspace outbound access protection for Data Warehouse (preview)

Workspace outbound access protection controls outbound connections from your workspace to other workspaces and external sources, helping prevent unauthorized data exfiltration. These protections apply to Data Warehouse workloads, including warehouses and SQL analytics endpoints, just as they do for Spark workloads. When enabled, outbound access is restricted to the current workspace, ensuring consistent governance and reducing risk. This article explains how outbound access protection impacts Data Warehouse items.

## Understanding outbound access protection with Data Warehouse

When outbound access protection is enabled, the workspace automatically blocks all outbound warehouse and SQL endpoint connections to external networks and other workspaces. Any attempt to access data, services, or resources outside the current workspace is denied.

## Configuring outbound access protection for Data Warehouse

To configure outbound access protection for Data Warehouse, follow the steps in [Set up workspace outbound access protection](workspace-outbound-access-protection-set-up.md). After enabling outbound access protection, you can set up managed private endpoints to allow outbound access to other workspaces or external resources as needed.

At this time, exceptions can’t be configured through managed private endpoints or data connections rules. All outbound connections from warehouses and SQL analytics endpoints are blocked when outbound access protection is enabled.

## Supported Data Warehouse item types

These data warehouse item types are supported with outbound access protection:

* Warehouses
* SQL analytics endpoints

The following sections explain how outbound access protection affects these items in your workspace.

### Warehouses

With outbound access protection enabled, Fabric warehouses restrict ingestion pipelines and data load operations to trusted sources only. Data loads through COPY INTO, OPENROWSET, Bulk Insert, and similar commands are blocked from unapproved endpoints, reducing the risk of accidental or unauthorized access.

### SQL analytics endpoints

For SQL analytics endpoints, outbound access protection ensures that all queries and data retrieval operations are limited to resources within the current workspace. You can only use data import commands with data inside your workspace, unless you use the [updated COPY INTO feature](https://blog.fabric.microsoft.com/blog/announcing-public-preview-onelake-as-a-source-for-copy-into-and-openrowset) that enables you to ingest data directly from OneLake as a source. 

## Considerations and limitations

- All outbound connections from warehouses and SQL analytics endpoints are blocked when outbound access protection is enabled. Currently, exceptions can’t be configured through managed private endpoints or data connections rules. 
- Data import commands (such as COPY INTO, OPENROWSET, Bulk Insert) are restricted to sources within the current workspace, except when using the [COPY INTO](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true) feature to ingest data directly from OneLake as a source.
- For other limitations, refer to [Workspace outbound access protection overview - Microsoft Fabric](/fabric/security/workspace-outbound-access-protection-overview#considerations-and-limitations).

## Related content

* [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md)    
* [COPY INTO (Transact-SQL)](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true)
* [Browse File Content Before Ingestion with the OPENROWSET function](/fabric/data-warehouse/browse-file-content-with-openrowset)
