---
title: GQL status codes reference for graph in Microsoft Fabric
description: Understand the public Query API status codes and canonical GQLSTATUS codes reported for graph in Microsoft Fabric queries.
ms.topic: reference
ms.date: 09/18/2026
ms.reviewer: splantikow
ai-usage: ai-assisted
---

# GQL status codes reference

When you run GQL queries in Microsoft Fabric, you receive status information along with the result. The public Query API status code and the canonical GQLSTATUS reported by the query engine aren't always the same. This article explains how to use both.

## Query API status codes

The Query API uses a small set of codes in the primary `status.code` field:

| API status code | Meaning |
| --------------- | ------- |
| `00000` | Successful completion with at least one result row. |
| `00001` | Successful completion with an omitted result. Reserved for future DDL and DML support. |
| `01000` | A warning or informational condition. Inspect the description and diagnostics. |
| `02000` | No result rows are currently available from a row-producing query. If the result contains `nextPage`, execution is still in progress and you can poll for the result. |
| `42000` | A syntax, access-rule, or other user-correctable query error. |
| `50000` | A system or otherwise unclassified error. |

For broad application control flow, use `status.code`. Don't parse the status description because its text can vary.

## Canonical query-engine GQLSTATUS

The Query API preserves the canonical GQLSTATUS from the query engine in the `_graphaneGqlStatus` member of each status object's `diagnostics` record:

```json
"_graphaneGqlStatus": {
  "gqlType": "STRING",
  "value": "22012"
}
```

For example, numeric overflow and division by zero are user-correctable errors, so both use `42000` as the public `status.code`. The diagnostic value distinguishes canonical GQLSTATUS `22003` from `22012`.

The following table lists common canonical GQLSTATUS values. The query engine can report additional values for more specific conditions.

| GQLSTATUS | Meaning |
| --------- | ------- |
| `00000` | Successful query completion with at least one row. |
| `00001` | Successful completion with an omitted result. |
| `02000` | No-data condition for a row-producing query. |
| `01M11` | Incomplete result. The result was truncated. |
| `22000` | General data exception. This code can appear as the cause of a more specific primary condition. |
| `22003` | Numeric value out of range, including overflow in a literal, operation, aggregate, or cast. |
| `22012` | Division by zero. |
| `42000` | General syntax error or access-rule violation. |
| `G2000` | Graph type violation. |

Primary statuses, entries in `additionalStatuses`, and nested `cause` statuses each have their own diagnostic record and canonical GQLSTATUS.

## Related content

- [GQL language guide](gql-language-guide.md)
- [GQL Query API status object](gql-query-api.md#status-object)
- [Handle nulls and query errors](gql-language-guide.md#handle-nulls-and-query-errors)
