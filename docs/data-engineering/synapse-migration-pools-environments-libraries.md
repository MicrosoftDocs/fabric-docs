---
title: Migrate Spark pools, environments, and libraries from Synapse to Fabric
description: Move Spark pool settings, environment configuration, Spark job definition runtime dependencies, and library strategy from Synapse to Fabric.
ms.topic: how-to
ms.date: 04/20/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Migrate Spark pools, environments, and libraries from Synapse to Fabric

This article is part 4 of 6 in the Azure Synapse Spark to Microsoft Fabric migration best practices series.

Use this article after your notebooks and Spark job definitions are migrated, when you need to decide on pool and environment strategy. This article explains when you can use Fabric Starter Pools (instead of migrating), when to create custom environments, and how to identify and resolve library compatibility gaps.

In this article, you learn how to:

- Decide whether to migrate Synapse Spark pools or use Fabric Starter Pools instead.
- Create custom Environments when you have Spark properties or library requirements.
- Identify Python, Java/Scala, and R library compatibility gaps between Synapse and Fabric.
- Plan library gap mitigation strategies.

## Spark pool migration

### Fabric Starter Pools

Fabric Starter Pools provide seconds-level Spark session startup — a significant improvement over Synapse Spark pools, which require minutes-long cold starts to start clusters. Starter Pools are ready to use from the platform and require no configuration.

> [!TIP]
> If your Synapse Spark pool has no custom configurations, no custom libraries, and no specific node size requirements beyond Medium—don't migrate the pool. Instead, let your notebooks and Spark job definitions use the Fabric workspace default Starter Pool settings. This approach gives you the fastest startup times and zero pool management overhead. Only create a Custom Pool or Environment when you have a specific need.

### When to create a custom pool or environment

Create a Fabric custom pool and/or environment only when your workload requires:

- A specific node size (Small, Large, XLarge, XXLarge) different from the default Medium.
- Custom libraries (pip packages, conda packages, JARs, wheels) that aren't in the Fabric built-in runtime.
- Custom Spark properties (for example, `spark.sql.shuffle.partitions`, `spark.executor.memory`) beyond the defaults.
- Managed Private Endpoints for accessing private data sources (requires Custom Pools).
- A specific Spark runtime version different from the workspace default.

## Configuration and library migration

Migrate Spark configurations and libraries to Fabric Environments.

For detailed steps on migrating libraries to Fabric Environments, see [Migrate Spark Libraries from Azure Synapse to Fabric](migrate-synapse-spark-libraries.md).

1. **Export Spark configs.** In Synapse Studio, go to **Manage** > **Spark Pools** > select pool > **Configurations + Libraries** > download as `.yml`/`.conf`/`.json`.

1. **Import to Environment.** In Fabric, create an Environment artifact. Go to **Spark Compute** > **Spark Properties** > **Upload** the exported `Sparkproperties.yml` file.

1. **Migrate libraries.** For pool-level libraries, upload packages (wheels, JARs, tars) to the Environment's library section. For PyPI/Conda packages, add them to the Environment's public library configuration.

> [!IMPORTANT]
> Workspace-level library settings in Fabric are deprecated. Migrate all libraries to Environment artifacts. The migration permanently removes existing workspace-level configurations—download all settings before enabling Environments.

## Library compatibility: Synapse vs. Fabric

Fabric Runtime 1.3 (Spark 3.5) ships with 223 Python, 183 Java/Scala, and 135 R libraries built-in. Most Synapse libraries are available in Fabric, but there are gaps that can cause runtime failures if not addressed before migration.

To identify which libraries your notebooks actually use, run these checks before reviewing the gap tables:

- **Python notebooks:** Search for `import` and `from ... import` statements across all `.py` / `.ipynb` files.
- **Java/Scala notebooks and SJDs:** Search for `import` statements and Maven coordinates; look for packages like `com.azure.cosmos.spark` or `com.microsoft.kusto.spark`.
- **Export full dependency list:** Run `pip freeze` in a Synapse notebook, compare against the Fabric Runtime 1.3 manifest. Only libraries that appear in both your `pip freeze` output and the gap tables below need action.
- **Pool-level and workspace-level custom libraries:** In Synapse Studio, go to **Manage** > **Apache Spark Pools** > select pool > **Packages** to see custom libraries that need to be reuploaded to a Fabric Environment.

### Python libraries missing from Fabric

| **Category** | **Libraries** | **Action** |
|----|----|----|
| **CUDA / GPU (9 libs)** | libcublas, libcufft, libcufile, libcurand, libcusolver, libcusparse, libnpp, libnvfatbin, libnvjitlink, libnvjpeg | Not available—Fabric doesn't support GPU pools. Refactor GPU workloads to use CPU-based alternatives or keep on Synapse. |
| **HTTP / API clients** | httpx, httpcore, h11, google-auth, jmespath | Install via Environment: `pip install httpx google-auth jmespath` |
| **ML / Interpretability** | interpret, interpret-core | Install via Environment: `pip install interpret` |
| **Data serialization** | marshmallow, jsonpickle, frozendict, fixedint | Install via Environment if needed: `pip install marshmallow jsonpickle` |
| **Logging / Telemetry** | fluent-logger, humanfriendly, library-metadata-cooker, impulse-python-handler | fluent-logger: install if used. Others are Synapse-internal—likely not needed. |
| **Jupyter internals** | jupyter-client, jupyter-core, jupyter-ui-poll, jupyterlab-widgets, ipython-pygments-lexers | Fabric manages Jupyter infrastructure internally. These libraries are usually not needed in user code. |
| **System / C libraries** | libgcc, libstdcxx, libgrpc, libabseil, libexpat, libnsl, libzlib | Low-level system libs. Usually not imported directly. Only install if you have C extensions that depend on them. |
| **File / concurrency** | filelock, fsspec, knack | Install via Environment if used: `pip install filelock fsspec` |

### Java/Scala libraries missing from Fabric

| **Library** | **Synapse Version** | **Action** |
|----|----|----|
| **azure-cosmos-analytics-spark** | 2.2.5 | Install as a custom JAR in the Fabric Environment if your Spark jobs use the Cosmos DB analytics connector. |
| **junit-jupiter-params** | 5.5.2 | Test-only library. Not needed in production notebooks. |
| **junit-platform-commons** | 1.5.2 | Test-only library. Not needed in production notebooks. |

### R libraries

Only one difference: Synapse includes the `lightgbm` R package (v4.6.0) which isn't in Fabric. Install via Environment if needed. Fabric adds `FabricTelemetry` (v1.0.2) which is Fabric-internal.

### Notable version differences

68 Python libraries exist on both platforms but with different versions. Most are minor version differences, but 17 have major version jumps that could affect behavior.

| **Library** | **Fabric Version** | **Synapse Version** | **Impact** |
|----|----|----|----|
| **libxgboost** | 2.0.3 | 3.0.1 | XGBoost API changes between v2 and v3. Test model training/prediction code. |
| **flask** | 2.2.5 | 3.0.3 | Flask 3.x has breaking changes. If serving Flask APIs from notebooks, test thoroughly. |
| **lxml** | 4.9.3 | 5.3.0 | Minor API changes. Test XML parsing workflows. |
| **libprotobuf** | 3.20.3 | 4.25.3 | Protobuf 4.x has breaking changes for custom proto definitions. |
| **markupsafe** | 2.1.3 | 3.0.2 | MarkupSafe 3.x drops Python 3.7 support but API is compatible. |
| **libpq** | 12.17 | 17.4 | PostgreSQL client library. Major version jump — test DB connections. |
| **libgcc-ng / libstdcxx-ng** | 11.2.0 | 15.2.0 | GCC runtime. Might affect C extension compatibility. |

> [!NOTE]
> Synapse generally ships newer versions of system-level libraries (GCC, protobuf, libpq) while Fabric ships newer versions of data/ML libraries (more Python packages overall). If you need a specific version, pin it in your Fabric Environment configuration.

> [!TIP]
> Run a quick compatibility check: export your Synapse pool's library list (`pip freeze`), compare against the Fabric Runtime 1.3 manifest, and pre-install any missing libraries in your Fabric Environment before running migrated notebooks. For a line-by-line comparison of every built-in library and version between Fabric and Synapse Spark runtimes, see the [microsoft/synapse-spark-runtime GitHub repository](https://github.com/microsoft/synapse-spark-runtime).

## Related content

- [Step 1: Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md)
- [Step 2: Migrate Synapse Spark workloads with Migration Assistant](synapse-migration-spark-assistant.md)
- [Step 3: Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md)
- [Step 4: Migrate Spark pools, environments, and libraries from Synapse to Fabric](synapse-migration-pools-environments-libraries.md)
- [Step 5: Migrate Hive Metastore metadata and data paths to Fabric](synapse-migration-hms-data.md)
- [Step 6: Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md)
