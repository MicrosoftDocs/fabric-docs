---
title: Configure Resource Profile Configurations in Microsoft Fabric
description: Learn how to configure predefined Spark resource profiles in Microsoft Fabric to optimize for different workload patterns.
ms.reviewer: saravi
ms.topic: how-to
ms.custom:
  - fabcon-2025
ms.date: 03/05/2026
ai-usage: ai-assisted
---

# Configure Resource Profile Configurations in Microsoft Fabric

Resource profiles in Microsoft Fabric let you apply predefined Spark configuration sets for common workload patterns such as read-heavy and write-heavy processing.

Profiles reduce manual Spark tuning and provide a faster path to predictable performance.

## Benefits of resource profiles

- **Performance by default**: Apply tested Spark settings for common patterns.
- **Flexibility**: Choose a predefined profile or use custom settings.
- **Lower tuning overhead**: Reduce trial-and-error configuration changes.

> [!NOTE]
> - New Fabric workspaces default to the `writeHeavy` profile.
> - In `writeHeavy`, VOrder is disabled by default and must be enabled manually when needed.

## Available resource profiles

| Profile | Use case | Configuration property |
|---|---|---|
| `readHeavyForSpark` | Optimized for Spark workloads with frequent reads | `spark.fabric.resourceProfile = readHeavyForSpark` |
| `readHeavyForPBI` | Optimized for Power BI queries on Delta tables | `spark.fabric.resourceProfile = readHeavyForPBI` |
| `writeHeavy` | Optimized for high-frequency ingestion and writes | `spark.fabric.resourceProfile = writeHeavy` |
| `custom` | Fully user-defined profile | `spark.fabric.resourceProfile = custom` |

## Default configuration values by profile

| Resource profile | Configs |
|---|---|
| `writeHeavy` | `{"spark.sql.parquet.vorder.default": "false", "spark.databricks.delta.optimizeWrite.enabled": "null", "spark.databricks.delta.optimizeWrite.binSize": "128", "spark.databricks.delta.optimizeWrite.partitioned.enabled": "true"}` |
| `readHeavyForPBI` | `{"spark.sql.parquet.vorder.default": "true", "spark.databricks.delta.optimizeWrite.enabled": "true", "spark.databricks.delta.optimizeWrite.binSize": "1g"}` |
| `readHeavyForSpark` | `{"spark.databricks.delta.optimizeWrite.enabled": "true", "spark.databricks.delta.optimizeWrite.partitioned.enabled": "true", "spark.databricks.delta.optimizeWrite.binSize": "128"}` |
| `custom` (example: `fastIngestProfile`) | User-defined settings, for example `{"spark.sql.shuffle.partitions": "800", "spark.sql.adaptive.enabled": "true", "spark.serializer": "org.apache.spark.serializer.KryoSerializer"}` |

> [!TIP]
> Use descriptive custom profile names such as `fastIngestProfile` or `lowLatencyAnalytics`.

## Configure resource profiles

You can configure profiles at environment level or at runtime.

### Configure profiles in an environment

Set the default profile for all Spark jobs in an environment unless overridden at runtime.

1. Go to your **Fabric workspace**.
1. Create a new environment or edit an existing one.
1. In **Spark configurations**, set `spark.fabric.resourceProfile` to one of the following values:
   - `writeHeavy`
   - `readHeavyForPBI`
   - `readHeavyForSpark`
   - A custom profile name
1. Save the environment.

You can also start from an existing profile and modify specific properties as needed.

### Configure profiles at runtime with spark.conf.set

You can override the profile during notebook or Spark job execution:

```python
spark.conf.set("spark.fabric.resourceProfile", "readHeavyForSpark")
```

Runtime configuration is useful when different parts of a workload need different behavior.

> [!NOTE]
> If both environment and runtime configurations are set, runtime configuration takes precedence.

## Default behavior

All newly created Fabric workspaces default to `writeHeavy`. This default is optimized for ingestion-heavy workloads, including ETL and streaming.

If your workload is read-optimized (for example, interactive queries or Power BI scenarios), switch to `readHeavyForSpark` or `readHeavyForPBI`, or customize profile settings.

> [!IMPORTANT]
> In new Fabric workspaces, `VOrder` is disabled by default (`spark.sql.parquet.vorder.default=false`) to optimize write-heavy processing.

## Related content

- [Native Execution Engine in Microsoft Fabric](./native-execution-engine-overview.md)
