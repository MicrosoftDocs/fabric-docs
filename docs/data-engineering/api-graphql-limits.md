---
title: Limitations of API for GraphQL
description: This article contains a list of current limitations in Microsoft Fabric API for GraphQL.
author: afernandez
ms.author: afernandez
ms.reviewer: snehagunda
ms.date: 03/04/2025
ms.topic: conceptual
ms.custom:
ms.search.form: Fabric API GraphQL Limitations # This article's title should not change. If so, contact engineering.
---
# Limitations of Microsoft Fabric API for GraphQL

This article details the current limitations in Microsoft Fabric API for GraphQL.

## Limitations

Current general product limitations for API for GraphQL in Microsoft Fabric are listed in this article. We are constantly improving API for GraphQL with new features. For more information on the future of Microsoft Fabric, see [Fabric Roadmap](https://blog.fabric.microsoft.com/blog/announcing-the-fabric-roadmap?ft=All).

- Any data source that leverages a SQL Analytics Endpoint for access only support read operations against it. For example, mutations are not available for Lakehouses or mirrored databases.
- The current maximum page size is 100, which means that every request will return a maximum of 100 elements in the reply. If your result set is larger than 100, iterate through results using [GraphQL pagination](https://graphql.org/learn/pagination/).
- The maximum reply size we support is 64MB. That means that any API request with a reply size larger than 64MB return an error. To work around this limitation you can either issue multiple filtered requests, or use pagination.
- Limitations for Stored Procedures (Applies to Azure SQL, SQL Database in Fabric, and Data Warehouses):
    - Only the first result set returned by the stored procedure is used by API for GraphQL.
    - Only those stored procedures whose metadata for the first result set described by *sys.dm_exec_describe_first_result_set* are supported.
    - When a stored procedure parameter is specified both in the configuration file and in the URL query string, the parameter in the URL query string takes precedence.
    - Entities backed by a stored procedure do not have all the capabilities automatically provided for entities backed by tables or views.
    - Stored procedure backed entities do not support pagination, ordering, or filtering. Nor do such entities support returning items specified by primary key values.

## Known issues

For known issues in API for GraphQL, visit [Microsoft Fabric Known Issues](https://support.fabric.microsoft.com/known-issues/).

## Related content

- [API for GraphQL Overview](api-graphql-limits.md)
- [Connect applications to Fabric API for GraphQL](connect-apps-api-graphql.md)
- [API for GraphQL Frequently Asked Questions](graphql-faq.yml)