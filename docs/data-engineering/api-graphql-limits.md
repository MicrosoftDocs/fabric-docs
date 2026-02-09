---
title: Limitations of API for GraphQL
description: This article contains a list of current limitations in Microsoft Fabric API for GraphQL
author: eric-urban
ms.author: eur
ms.reviewer: edlima
ms.date: 01/21/2026
ms.topic: concept-article
ms.custom: freshness-kr
ms.search.form: Fabric API GraphQL Limitations # This article's title shouldn't change. If so, contact engineering.
---
# Limitations of Microsoft Fabric API for GraphQL

Current general product limitations for API for GraphQL in Microsoft Fabric are listed in this article. We're continually improving API for GraphQL with new features. For more information on the future of Microsoft Fabric, see [Fabric Roadmap](https://aka.ms/FabricRoadmap).

## Who needs to understand limitations

Understanding GraphQL API limitations is crucial for:
- **Application developers** designing applications that work within Fabric GraphQL API constraints
- **Data engineers** planning data exposure strategies and understanding platform boundaries
- **Solution architects** scoping Fabric-based solutions and setting appropriate technical expectations
- **Fabric workspace contributors** troubleshooting issues and implementing workarounds for current limitations
- **Project managers** communicating Fabric platform constraints to stakeholders during project planning

Review these limitations when planning GraphQL API implementations or troubleshooting unexpected API behavior.

## Data source operations

**SQL Analytics Endpoint data sources** only support read operations. Data sources accessed through SQL Analytics Endpoints (such as Lakehouses and mirrored databases) don't support mutations. You can query data but can't create, update, or delete records through the GraphQL API.

## Size and performance limits

The following table summarizes key size, pagination, and performance constraints:

| Limit type | Value | Description | Workaround |
|-----------|-------|-------------|------------|
| Default page size | 100 items | Maximum items returned per request by default | Use [GraphQL pagination](https://graphql.org/learn/pagination/) to iterate through larger result sets |
| Maximum pagination size | 100,000 items | Maximum total items that can be retrieved through pagination | Issue multiple filtered requests if you need more than 100K items (uncommon pattern in GraphQL) |
| Maximum response size | 64 MB | Maximum size of API response payload | Issue multiple filtered requests to retrieve data in smaller chunks |
| Request timeout | 100 seconds | Maximum execution time for a single request | Optimize queries or break complex operations into smaller requests |
| Maximum query depth | 10 levels | Maximum nesting level of fields in a query | Reduce query nesting to avoid performance issues from excessive data fetching |

## Stored procedure limitations

Stored procedures in Azure SQL, SQL Database in Fabric, and Data Warehouses have specific constraints:

- **Result set handling**: Only the first result set returned by the stored procedure is used. Multiple result sets aren't supported.
- **Metadata requirements**: Only stored procedures whose first result set metadata can be described by `sys.dm_exec_describe_first_result_set` are supported.
- **Parameter precedence**: When a stored procedure parameter is specified in both the configuration file and the URL query string, the URL query string value takes precedence.
- **Limited GraphQL features**: Entities backed by stored procedures have reduced capabilities compared to table or view-backed entities:
  - No pagination support
  - No ordering or filtering
  - No primary key-based lookups

## Known issues

For known issues in API for GraphQL, visit [Microsoft Fabric Known Issues](https://support.fabric.microsoft.com/known-issues/).

## Related content

- [API for GraphQL Overview](api-graphql-limits.md)
- [Connect applications to Fabric API for GraphQL](connect-apps-api-graphql.md)
- [API for GraphQL Frequently Asked Questions](graphql-faq.yml)
