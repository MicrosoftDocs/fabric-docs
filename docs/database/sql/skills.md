---
title: Skills for SQL database in Fabric
description: Learn how to install and use Skills for SQL database in Fabric.
ms.reviewer: sukkaur
ms.date: 08/06/2026
ms.topic: how-to
---
# Skills for SQL database in Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

[Skills for Fabric](../../fundamentals/skills-for-fabric-overview.md) are reusable instructions that help an AI coding assistant understand Fabric workloads, APIs, query patterns, and operational best practices. The SQL database skills provide task-specific guidance for working with SQL database in Fabric from an agentic command-line or coding environment.

This article shows how to install the Fabric skill bundle, connect the assistant to your Fabric environment, and use the SQL database authoring, consumption, and operations skills. The skills guide the assistant; your identity, permissions, tools, and Fabric security controls still govern every action.

## Prerequisites

[!INCLUDE [skills-for-fabric-prereqs](../../fundamentals/includes/skills-for-fabric-prereqs.md)]

## Install the Microsoft Fabric skills

1. Open GitHub Copilot CLI or Claude Code. Both GitHub Copilot CLI and Claude Code use the same plugin marketplace workflow.
1. Add the public marketplace in GitHub Copilot CLI:

   ```PowerShell
   /plugin marketplace add microsoft/skills-for-fabric
   ```

1. Add the Skills for Fabric marketplace:

   ```PowerShell
   /plugin marketplace add microsoft/skills-for-fabric
   ```

   To view all the plugins and skills available in the marketplace, enter: `/plugin marketplace browse fabric-collection`.

1. Install the Fabric collection.

   ```PowerShell
   /plugin install fabric-skills@fabric-collection
   ```

   To reduce the scope, install a focused bundle, such as `fabric-operations`, which includes the `sqldb-cli` skills:

   ```PowerShell
   /plugin install fabric-operations@fabric-collection
   ```

1. Quit and restart your tool to load the skills:

   ```PowerShell
   /quit
   ```

1. Verify the installation:

   ```PowerShell
   /skills
   ```

## SQL database skills

The following skills are relevant to SQL database in Fabric:

| Skill | Use it for | Example intent |
|----|----|----|
| `sqldb-authoring-cli` | Creating and modifying database objects or data. | Create a table, load rows, add an index, or deploy a stored procedure. |
| `sqldb-consumption-cli` | Discovering schema and running read-only queries. | List tables, inspect columns, summarize recent orders, or explain a result set. |
| `sqldb-operations-cli` | Investigating health, performance, and operational issues. | Analyze slow queries, identify blocking, or review database resource usage. |

For the full catalog of available skills across all Fabric workloads, see [GitHub: Skills for Fabric](https://github.com/microsoft/skills-for-fabric/tree/main/skills).

## How to use Skills with SQL database in Fabric

1. Open a terminal in your project or working folder.
1. Type `Copilot` and select `Enter`.

   :::image type="content" source="media/skills/powershell-terminal.png" alt-text="Screenshot of a Windows PowerShell terminal.":::

   GitHub Copilot launches.

   :::image type="content" source="media/skills/github-copilot-terminal.png" alt-text="Screenshot of a PowerShell terminal displaying the GitHub Copilot interface.":::

1. To authenticate with the Microsoft identity that has access to the target Fabric workspace, type `az login` and follow the steps.

## Develop a SQL database

Use the `sqldb-authoring-cli` skill when the task changes database state. To author or update database objects with GitHub Copilot, always include the target workspace, database, environment, object, expected schema, constraints, and whether the assistant should generate a script only or execute it after your review. For schema changes or data changes, you can ask for `TRY...CATCH` to handle errors and perform a rollback of the transaction.

> [!TIP]
> Begin with a read-only request to generate T-SQL statements, then review any generated T-SQL statement before execution.

For example, these sample prompts can be used to create and load a table with sample data.

```copilot-prompt
In the Sales SQL database, create a dbo.CustomerFeedback table with an identity key, 
customer ID, feedback text, sentiment, created date, and a foreign key to 
dbo.Customer.CustomerID. All columns should be nullable. The create date should 
be populated by a default. Generate the T-SQL for review; don't execute it. 
```

```copilot-prompt
Generate 100 sample data rows for the dbo.CustomerFeedback as a single 
INSERT statement, referencing rows in the dbo.Customer table. 
Generate a TRY...CATCH structure to handle any errors and rollback. 
Do not execute the script, let me review.
```

## Explore and query data

Use the `sqldb-consumption-cli` skill for read-only discovery and analysis. Ask the assistant to inspect metadata first, qualify object names, limit result size, and explain assumptions.

For example, use Copilot to query metadata or table data:

```copilot-prompt
List the user tables and views in the Sales SQL database and describe their relationships. 
Don't modify any objects.
```

```copilot-prompt
Find the top 10 products by revenue in the last 30 days. 
Show the T-SQL and summarize the result.
```

```copilot-prompt
Inspect the available columns before answering: 
Which customers have not placed an order in the last 90 days?
```

## Investigate database operations

Use the `sqldb-operations-cli` skill to investigate performance and reliability. Provide the time window, observed symptom, affected workload, and whether the assistant can collect diagnostic data.

For example, the following queries investigate current or past performance issues, or tune query performance.

```copilot-prompt
Investigate why the nightly order-processing query slowed down between 01:00 and 02:00 UTC. 
Start with read-only diagnostics and rank the likely causes.
```

```copilot-prompt
Check for blocking sessions and long-running requests. 
Explain the evidence before recommending a mitigation.
```

```copilot-prompt
Review this execution plan and suggest indexes only when the expected benefit and write overhead are clear.
```

## Checklist to review and execute the T-SQL query

1.  Confirm that the assistant selected the intended SQL database skill.
1.  Verify the workspace, database, schema, and object names.
1.  Review generated T-SQL for destructive operations, transaction behavior, and data scope. 
1.  Ask for an impact summary and rollback approach before authoring changes. For schema changes, prepare a rollback or undo T-SQL script. 
1.  Execute only after the plan matches your intent.
1.  Validate the result with a separate read-only query.

## Security and responsible use

- The skills don't bypass Microsoft Entra authentication, Fabric permissions, SQL permissions, or organizational policies.
- Always use least-privileged identities and separate development, test, and production targets.
- Don't place secrets, access tokens, or sensitive data in prompts or project files.
- Treat generated SQL as proposed code. Review it as you would any other database change.
- Prefer read-only discovery before authoring or remediation.

For more information, see [Privacy, security, and responsible AI use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md).

## Related content

- [What is Copilot in the SQL database in Fabric workload?](copilot-sql-database.md)
- [How to use the Copilot chat pane in the SQL database workload](copilot-chat-pane.md)
