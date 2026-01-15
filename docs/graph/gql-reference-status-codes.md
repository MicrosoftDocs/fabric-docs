---
title: GQL Status Codes Reference
description: Complete reference of GQLSTATUS codes used by graph in Microsoft Fabric
ms.topic: reference
ms.date: 11/18/2025
author: lorihollasch
ms.author: loriwhip
ms.reviewer: splantikow
---

# GQL status codes reference

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

When you run GQL queries in Microsoft Fabric, you receive status information along with your results. This reference lists all GQLSTATUS codes used by graph in Microsoft Fabric.

## Success codes

| GQLSTATUS | Message                                      | Description                                                          |
|-----------|----------------------------------------------|----------------------------------------------------------------------|
| 00000     | note: successful completion                  | Query executed successfully with at least one row                    |
| 00001     | note: successful completion - omitted result | Query executed successfully but no table returned (currently unused) |
| 02000     | note: no data                                | Query executed successfully but returned an empty table              |

## Error codes

| GQLSTATUS | Message                                      | Description                                   |
|-----------|----------------------------------------------|-----------------------------------------------|
| 22000     | error: data exception                        | Runtime error in data processing              |
| 42000     | error: syntax error or access rule violation | Query syntax error or access permission issue |
| G2000     | error: graph type violation                  | Query violates graph schema constraints       |

## Understanding status codes

**Success indicators:** Codes starting with `0` indicate successful query execution. Even if your query returns no data (02000), query execution was successful.

**Using status codes:** Check the GQLSTATUS code to determine if your query succeeded and handle empty results appropriately in your applications.

## Related content

- [GQL Language Guide](gql-language-guide.md) - Complete guide to GQL syntax and usage
- [GQL Quick Reference](gql-reference-abridged.md) - Syntax quick reference
- [Error handling strategies](gql-language-guide.md#error-handling-strategies) - Best practices for robust queries
