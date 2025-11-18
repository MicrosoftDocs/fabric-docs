---
title: dbt jobs in Microsoft Fabric (Preview)
description: Learn how to use dbt jobs in Microsoft Fabric to transform your data with SQL.
ms.reviewer: whhender
ms.author: akurnala
author: abhinayakurnala1
ms.date: 11/13/2025
ms.topic: overview
ms.custom:
   - dbt
ai-usage: ai-assisted
---

# dbt jobs in Microsoft Fabric (Preview)

> [!NOTE]
> This feature is in [preview](/fabric/fundamentals/preview).

[dbt](https://docs.getdbt.com/) jobs in Microsoft Fabric let you transform your data with SQL directly in the Fabric interface. You get a no-code setup to build, test, and deploy dbt models on top of your Fabric data warehouse.

With dbt jobs, you can develop and manage your transformation logic in one place—no command line or external orchestration tools needed. Fabric's integration with dbt Core lets you schedule, monitor, and visualize dbt workflows in the same workspace where your data pipelines and reports live.

## Supported dbt version

Fabric currently supports dbt Core v1.7 (subject to periodic updates). Microsoft maintains alignment with major dbt Core releases to ensure compatibility and feature parity. Updates are applied automatically, and you can find notifications in the Fabric release notes.

### dbt job run time

A dbt Runtime is a managed execution environment that provides everything required to run dbt jobs in Microsoft Fabric. It ensures consistency, security, and performance by bundling the dbt engine, operating system, and dependencies into a single versioned package. Currently we will be releasing dbt job version

### Key Components
- dbt Engine
   - dbt Core (current) – open-source engine for SQL-based transformations.
   - dbt Fusion (future) – next-generation engine designed for speed and scalability.
- Operating System – Linux-based environment (e.g., Ubuntu or Mariner).
- Dependencies – Pre-installed Python packages and libraries required for dbt execution.

### Benefits
-   Predictable Execution: Jobs run in a standardized environment, reducing compatibility issues.
-   Automatic Updates: Stay aligned with major dbt releases without manual intervention.
-   Future-Ready: Supports both dbt Core and upcoming dbt Fusion for advanced performance.

###  Runtime Lifecycle
Each runtime version includes release stage, dbt engine version, and OS details. 
|                       | Runtime 1.1            | Runtime 2.1            |
|-----------------------|------------------------|-------------------------|
| **Release Stage**     | Public Preview        | Public Preview         |
| **dbt Runtime**       | dbt Core v1.9           | dbt Fusion Beta        |
| **Operating System**  | Windows                |                         |
| **Adapters Supported**| Microsoft Fabric Warehouse<br>Azure SQL Database<br>PostgreSQL<br>Snowflake |                         |
| **Pre-Installed Packages** |                  |                         |

### Conceptual Model
Below is a simplified view of how dbt jobs interact with runtimes in Fabric:

```bash
dbt Job  →  dbt Runtime  →  Fabric Compute
```

### Explanation:
- **dbt Job**: Your transformation logic and models.
- **dbt Runtime**: Provides the engine (Core or Fusion), OS, and dependencies.
- **Fabric Compute**: Executes the job at scale with managed resources.
  
### Conceptual Diagram
```bash
+-------------------+
|     dbt Job       |
| (Models & Logic)  |
+-------------------+
          ↓
+-------------------+
|   dbt Runtime     |
| (Engine + OS +    |
| Dependencies)     |
+-------------------+
          ↓
+-------------------+
|  Fabric Compute   |
| (Managed Resources|
| & Scale)          |
+-------------------+
```

## Related content

- [dbt Official Documentation](https://docs.getdbt.com/)
