---
title: Migrate Synapse Spark workloads to Fabric
description: Migrate notebooks, Spark job definitions, pools, environments, and libraries from Synapse to Fabric using the Migration Assistant and code refactoring guidance.
ms.topic: how-to
ms.date: 04/27/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Phase 2: Spark workload migration

This article is Phase 2 of 4 in the Azure Synapse Spark to Microsoft Fabric migration best practices series.

Use this article to migrate your Spark workloads from Azure Synapse to Microsoft Fabric. This article covers running the Migration Assistant, refactoring code patterns that can't be automatically converted, and migrating Spark pool configurations, environments, and libraries.

In this article, you learn how to:

- Understand the migration workflow for standard (non-Git) and Git-enabled Synapse workspaces.
- Use the Spark Migration Assistant to migrate notebooks, Spark job definitions, and pools.
- Refactor Synapse-specific code patterns for Fabric compatibility.
- Migrate Spark pool settings, environments, and libraries.
- Identify and resolve library compatibility gaps between Synapse and Fabric.

## Migrate with the Migration Assistant

The Spark Migration Assistant automates the migration of notebooks, Spark job definitions, pools, and lake database metadata from Synapse to Fabric. The assistant copies and transforms your items, but doesn't complete the migration—you still need to refactor code, reconcile configuration gaps, and validate the results.

For step-by-step instructions on running the assistant, see [Spark Synapse to Fabric Spark Migration Assistant (Preview)](synapse-to-fabric-spark-migration-assistant.md).

The assistant migrates the following items:

- Spark pools are migrated to Fabric Pools and corresponding Environment artifacts.
- Notebooks and their associated environments are migrated.
- Spark job definitions are migrated with associated environments.
- Lake databases are mapped to Fabric schemas; managed Delta tables are migrated via OneLake catalog shortcuts.

> [!IMPORTANT]
> Spark configurations, custom libraries, and custom executor settings aren't migrated by the assistant. You must configure these manually in Fabric Environments. Synapse workspaces under a VNet can't be migrated with the assistant.

### Standard (non-Git) workspace migration

For workspaces where notebooks and SJDs are stored directly in Synapse (not in a Git repository):

1. Run the Spark Migration Assistant from your Fabric workspace (**Migrate** > **Data engineering items**). Select the source Synapse workspace and migrate all Spark items.

1. Validate dependencies: ensure the same Spark version is used. If notebooks reference other notebooks via `mssparkutils.notebook.run()`, verify those were also migrated. The Migration Assistant preserves folder structure (Fabric supports up to 10 levels of nesting).

1. Refactor code: replace `mssparkutils` with `notebookutils`, replace linked service references with Fabric Connections, and update file paths. See the [Refactor Spark code](#refactor-spark-code) section for details.

### Git-enabled workspace migration

For workspaces where notebooks and SJDs are stored in an Azure DevOps or GitHub repository, note that Synapse and Fabric use different Git serialization formats. Synapse stores notebooks as JSON; Fabric uses source format `.py`/`.scala` or `.ipynb`. You can't point a Fabric workspace at the same Synapse Git branch directly.

1. **Migrate items.** Use the Spark Migration Assistant to migrate notebooks and SJDs from the Synapse workspace to a Fabric workspace. This converts items to Fabric-compatible format.

1. **Refactor code.** Apply the same code refactoring as the standard scenario — replace `mssparkutils`, update file paths, replace linked services. See the [Refactor Spark code](#refactor-spark-code) section for details.

1. **Connect Fabric workspace to Git.** Connect your Fabric workspace to a new branch or folder in your repository (**Workspace Settings** > **Source Control** > **Git Integration**). Use a separate branch or folder from your Synapse content to avoid conflicts. Commit the Fabric workspace content to populate the new branch.

1. **Set up deployment pipelines (optional).** Configure Fabric deployment pipelines (Dev → Test → Prod) for ongoing CI/CD. Fabric supports auto-binding for default lakehouses and attached environments when deploying across stages.

> [!TIP]
> Keep your Synapse Git branch intact as a historical reference. Create a new branch or folder for Fabric content. Fabric stores notebooks as source files (`.py` for PySpark) rather than JSON, which provides cleaner Git diffs for code review.

## Refactor Spark code

After migrating your notebooks and Spark job definitions, you need to fix code patterns that the Migration Assistant can't convert automatically. This section guides you through replacing Synapse-specific APIs, updating file paths, and changing credential patterns to work with Fabric.

### Pre-refactoring audit

Before addressing individual refactoring patterns, run a codebase-wide search across all notebooks to identify Synapse-specific code that needs changes.

| **Search Pattern** | **Category** | **Action Required** |
|----|----|----|
| `spark.synapse.linkedService` | Linked Services | Remove; replace with direct endpoint auth or Key Vault secrets |
| `getSecretWithLS` | Credentials | Replace with `getSecret(vaultUrl, secretName)` |
| `TokenLibrary` | Token/Auth | Remove; use direct OAuth config or notebookutils |
| `synapsesql` | SQL Connector | Replace `spark.read.synapsesql()` with Delta format reads |
| `mssparkutils` | Spark Utils | Replace with `notebookutils` (most APIs identical) |
| `spark.catalog.listDatabases` | Catalog API | Replace with `spark.sql("SHOW DATABASES")` |
| `spark.catalog.currentDatabase` | Catalog API | Replace with `spark.sql("SELECT CURRENT_DATABASE()")` |
| `spark.catalog.getDatabase` | Catalog API | Replace with `spark.sql("DESCRIBE DATABASE ...")` |
| `spark.catalog.listFunctions` | Catalog API | Not supported in Fabric — remove |
| `spark.catalog.registerFunction` | Catalog API | Not supported — use `spark.udf.register()` instead |
| `spark.catalog.functionExists` | Catalog API | Not supported in Fabric — remove |
| `LinkedServiceBasedTokenProvider` | Auth Provider | Replace with `ClientCredsTokenProvider` |
| `getPropertiesAsMap` | Linked Services | Remove; configure storage account directly |
| `spark.storage.synapse` | Linked Services | Remove — not supported in Fabric |
| `/user/trusted-service-user/` | File Paths | Replace with OneLake path or shortcut path |
| `cosmos.oltp` | Cosmos DB | Update to use Key Vault for secrets instead of linked service |
| `kusto.spark.synapse` | Kusto/ADX | Replace linked service auth with `accessToken` via `getToken()` |

> [!TIP]
> Run these searches across your entire notebook repository before migration. Notebooks with zero matches are safe to migrate as-is. Notebooks with matches should be prioritized for code refactoring using the detailed guidance in the following sections.

### File path usage

Update Synapse notebooks that use relative paths or Synapse-managed storage paths to use direct `abfss://` paths or OneLake paths in Fabric.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `"abfss://...@<synapse_storage>.dfs.core.windows.net/user/trusted-service-user/deltalake"` | `"abfss://<workspace_id>@onelake.dfs.fabric.microsoft.com/<lakehouse_id>/Tables/deltalake"` |
| `spark.read.synapsesql("<pool>.<schema>.<table>")` | `spark.read.format("delta").load("abfss://.../<lakehouse>/Tables/<table>")` |

> [!TIP]
> Replace all Synapse-managed storage paths with OneLake paths (`abfss://<workspace_id>@onelake.dfs.fabric.microsoft.com/<item_id>/...`). For ADLS Gen2 data, create OneLake shortcuts and reference the shortcut paths instead.

### Spark Catalog API

Fabric doesn't support several `spark.catalog` methods. Replace them with Spark SQL equivalents.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `spark.catalog.listDatabases()` | `spark.sql("SHOW DATABASES").show()` |
| `spark.catalog.currentDatabase()` | `spark.sql("SELECT CURRENT_DATABASE()").first()["current_database()"]` |
| `spark.catalog.getDatabase(db_name)` | `spark.sql(f"DESCRIBE DATABASE {db_name}").show()` |
| `spark.catalog.listFunctions()` | Not supported in Fabric — remove or skip |
| `spark.catalog.registerFunction(name, fn)` | Not supported in Fabric — use `spark.udf.register()` instead |
| `spark.catalog.functionExists(name)` | Not supported in Fabric — remove or skip |

> [!NOTE]
> `spark.catalog` table methods such as `createTable()`, `tableExists()`, and `listTables()` work normally in Fabric. Only database-level and function-level catalog methods require refactoring.

### MSSparkUtils and NotebookUtils

Replace `mssparkutils` calls with the Fabric `notebookutils` equivalents. The most common credential-related changes are:

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `mssparkutils.credentials.getSecretWithLS("sampleLS", secretKey)` | `notebookutils.credentials.getSecret("https://<vault>.vault.azure.net/", secretKey)` |
| `TokenLibrary.getSecret("foo", "bar")` | `notebookutils.credentials.getSecret("https://foo.vault.azure.net/", "bar")` |

In Fabric, linked service-based secret retrieval (`getSecretWithLS`) isn't supported. Instead, reference the Key Vault URL directly by using `notebookutils.credentials.getSecret(vaultUrl, secretName)`. The same pattern applies to `TokenLibrary.getSecret()` calls.

> [!NOTE]
> Most `mssparkutils.fs` methods (for example, `ls`, `cp`, `mv`, `rm`, `mkdirs`, `head`) work identically as `notebookutils.fs` in Fabric. The primary changes are credential and secret methods, and `notebook.run()` path references.

### Azure Data Explorer (Kusto) connector

Synapse notebooks that connect to Azure Data Explorer (Kusto) via linked services must be refactored to use direct endpoint authentication.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `.option("spark.synapse.linkedService", "AzureDataExplorer1")` | Remove linked service reference |
| Read with linked service option set | `.option("accessToken", notebookutils.credentials.getToken("https://<cluster>.kusto.windows.net"))` |

Replace the linked service option with an `accessToken` option. Use `notebookutils.credentials.getToken()` to obtain a token for your Kusto cluster endpoint. The rest of the query options (`kustoDatabase`, `kustoQuery`) remain unchanged.

### Cosmos DB connector

Update Cosmos DB connections in Synapse that use linked services or `getSecretWithLS`.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `.option("spark.synapse.linkedService", "CosmosDbLS")` | Remove linked service reference |
| `mssparkutils.credentials.getSecretWithLS("cosmosKeyLS", "cosmosKey")` | `notebookutils.credentials.getSecret("https://<vault>.vault.azure.net/", "cosmosKey")` |

Replace the linked service reference with direct Cosmos DB endpoint configuration. Store the Cosmos DB account key in Azure Key Vault and retrieve it by using `notebookutils.credentials.getSecret(vaultUrl, secretName)` instead of `getSecretWithLS()`.

### Linked service references

Replace all Synapse linked service references in Fabric.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `spark.conf.set("spark.storage.synapse.linkedServiceName", ls_name)` | Remove — not supported in Fabric |
| `spark.conf.set("fs.azure.account.oauth.provider.type", "com.microsoft.azure.synapse.tokenlibrary.LinkedServiceBasedTokenProvider")` | `spark.conf.set("fs.azure.account.oauth.provider.type", "org.apache.hadoop.fs.azurebfs.oauth2.ClientCredsTokenProvider")` |
| `TokenLibrary.getPropertiesAsMap(linked_service_cfg)` | Remove — use direct connection string or service principal config |

In Fabric, there are no linked services. Replace the Synapse token provider with standard OAuth client credentials (service principal). Configure `fs.azure.account.auth.type`, `oauth.provider.type`, `client.id`, `client.secret`, and `client.endpoint` directly by using `spark.conf.set()`.

### Token library

Synapse's `TokenLibrary` for getting tokens and reading linked service properties isn't available in Fabric. Replace it with equivalent patterns.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `TokenLibrary.getPropertiesAsMap(serviceConnection)` | Remove — configure storage account directly |
| `val my_account = conexion("Endpoint").toString.substring(8)` | `val my_account = "<storage_account_name>" // Hardcode or retrieve via notebookutils` |
| `mssparkutils.fs.head(internalPath, Int.MaxValue)` | `notebookutils.fs.head(internalPath, Int.MaxValue)` |

For OAuth-based ADLS Gen2 access, configure the service principal credentials directly by using `spark.conf.set()` with the storage account-specific keys (for example, `fs.azure.account.auth.type.<account>.dfs.core.windows.net`) instead of relying on linked service token providers.

> [!IMPORTANT]
> Review all notebooks for linked service references before cutover. Any remaining `spark.synapse.linkedService`, `TokenLibrary`, or `getSecretWithLS` calls fail at runtime in Fabric.

### Spark job definition migration

Spark job definitions (SJDs) are batch job configurations that reference a main executable file (`.py`, `.jar`, or `.R`), optional reference libraries, command-line arguments, and a lakehouse context. While the Spark Migration Assistant handles SJD migration automatically, important differences between Synapse and Fabric SJDs require attention.

#### Key differences between Synapse and Fabric SJDs

- **Lakehouse context required.** In Fabric, every SJD must have at least one lakehouse associated with it. This lakehouse serves as the default file system for Spark runtime. Any code that uses relative paths reads and writes from the default lakehouse. In Synapse, SJDs use the workspace default storage (ADLS Gen2) as the default file system.

- **Supported languages.** Fabric supports PySpark (Python), Spark (Scala/Java), and SparkR. .NET for Spark (C#/F#) isn't supported in Fabric. You must rewrite these workloads in Python or Scala before migration.

- **Retry policies.** Fabric SJDs support built-in retry policies, such as max retries and retry interval. This feature is useful for Spark Structured Streaming jobs that need to run indefinitely.

- **Environment binding.** In Synapse, SJDs bind to a Spark pool. In Fabric, SJDs bind to an Environment, which contains pool configuration, libraries, and Spark properties. The Migration Assistant automatically maps Synapse pool references to Fabric Environments.

- **Scheduling.** Fabric SJDs have built-in scheduling (**Settings** > **Schedule**) without requiring a separate pipeline. In Synapse, SJD scheduling requires a pipeline with a Spark Job activity. If you have Synapse pipelines that only trigger SJDs, consider using Fabric's built-in SJD scheduling instead of migrating the pipeline.

- **Import/export.** Synapse supports UI-based JSON import and export for SJDs. Fabric doesn't support UI import or export. Use the Spark Migration Assistant or the Fabric REST API to create or update SJDs programmatically.

#### Refactor SJD code

The same code refactoring patterns in this article apply to SJD main files. Changes fall into two categories.

Source code changes (inside the `.py`, `.jar`, or `.R` main file):

- Replace `mssparkutils` with `notebookutils` for credential and file system operations.
- Update hardcoded file paths in code to OneLake `abfss://` paths or shortcut paths, when needed. SJDs that use only relative paths against the default lakehouse might not require changes.
- Replace linked service references in code with Key Vault secrets or Fabric Connections.

> [!NOTE]
> DMTS Connections aren't yet supported in Fabric Spark job definitions (supported in notebooks only). If your SJD code uses DMTS, refactor to use direct endpoint authentication.

**SJD configuration changes (in the Fabric SJD item settings):**

- Verify that ADLS Gen2 paths referenced by main definition files are still accessible from the Fabric workspace. If files were stored in Synapse workspace-internal storage, re-upload them to the Fabric SJD or move them to an accessible ADLS Gen2 location.
- Verify all reference files (`.py`, `.R`, `.jar`) are accessible after migration. Re-upload any files that were stored in Synapse workspace-internal storage.
- If command-line arguments contain Synapse-specific paths or connection strings, update them to Fabric equivalents.

## Migrate pools, environments, and libraries

After your notebooks and Spark job definitions are migrated, you need to decide on pool and environment strategy. This section explains when you can use Fabric Starter Pools (instead of migrating), when to create custom environments, and how to identify and resolve library compatibility gaps.

### Spark pool migration

#### Fabric Starter Pools

Fabric Starter Pools provide seconds-level Spark session startup — a significant improvement over Synapse Spark pools, which require minutes-long cold starts to start clusters. Starter Pools are ready to use from the platform and require no configuration.

> [!TIP]
> If your Synapse Spark pool has no custom configurations, no custom libraries, and no specific node size requirements beyond Medium—don't migrate the pool. Instead, let your notebooks and Spark job definitions use the Fabric workspace default Starter Pool settings. This approach gives you the fastest startup times and zero pool management overhead. Only create a Custom Pool or Environment when you have a specific need.

#### When to create a custom pool or environment

Create a Fabric custom pool and/or environment only when your workload requires:

- A specific node size (Small, Large, XLarge, XXLarge) different from the default Medium.
- Custom libraries (pip packages, conda packages, JARs, wheels) that aren't in the Fabric built-in runtime.
- Custom Spark properties (for example, `spark.sql.shuffle.partitions`, `spark.executor.memory`) beyond the defaults.
- Managed Private Endpoints for accessing private data sources (requires Custom Pools).
- A specific Spark runtime version different from the workspace default.

### Configuration and library migration

Migrate Spark configurations and libraries to Fabric Environments.

For detailed steps on migrating libraries to Fabric Environments, see [Migrate Spark Libraries from Azure Synapse to Fabric](migrate-synapse-spark-libraries.md).

1. **Export Spark configs.** In Synapse Studio, go to **Manage** > **Spark Pools** > select pool > **Configurations + Libraries** > download as `.yml`/`.conf`/`.json`.

1. **Import to Environment.** In Fabric, create an Environment artifact. Go to **Spark Compute** > **Spark Properties** > **Upload** the exported `Sparkproperties.yml` file.

1. **Migrate libraries.** For pool-level libraries, upload packages (wheels, JARs, tars) to the Environment's library section. For PyPI/Conda packages, add them to the Environment's public library configuration.

> [!IMPORTANT]
> Workspace-level library settings in Fabric are deprecated. Migrate all libraries to Environment artifacts. The migration permanently removes existing workspace-level configurations—download all settings before enabling Environments.

### Library compatibility: Synapse vs. Fabric

Fabric Runtime 1.3 (Spark 3.5) ships with 223 Python, 183 Java/Scala, and 135 R libraries built-in. Most Synapse libraries are available in Fabric, but there are gaps that can cause runtime failures if not addressed before migration.

To identify which libraries your notebooks actually use, run these checks before reviewing the gap tables:

- **Python notebooks:** Search for `import` and `from ... import` statements across all `.py` / `.ipynb` files.
- **Java/Scala notebooks and SJDs:** Search for `import` statements and Maven coordinates; look for packages like `com.azure.cosmos.spark` or `com.microsoft.kusto.spark`.
- **Export full dependency list:** Run `pip freeze` in a Synapse notebook, compare against the Fabric Runtime 1.3 manifest. Only libraries that appear in both your `pip freeze` output and the gap tables below need action.
- **Pool-level and workspace-level custom libraries:** In Synapse Studio, go to **Manage** > **Apache Spark Pools** > select pool > **Packages** to see custom libraries that need to be reuploaded to a Fabric Environment.

#### Python libraries missing from Fabric

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

#### Java/Scala libraries missing from Fabric

| **Library** | **Synapse Version** | **Action** |
|----|----|----|
| **azure-cosmos-analytics-spark** | 2.2.5 | Install as a custom JAR in the Fabric Environment if your Spark jobs use the Cosmos DB analytics connector. |
| **junit-jupiter-params** | 5.5.2 | Test-only library. Not needed in production notebooks. |
| **junit-platform-commons** | 1.5.2 | Test-only library. Not needed in production notebooks. |

#### R libraries

Only one difference: Synapse includes the `lightgbm` R package (v4.6.0) which isn't in Fabric. Install via Environment if needed. Fabric adds `FabricTelemetry` (v1.0.2) which is Fabric-internal.

#### Notable version differences

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

- [Phase 1: Migration strategy and planning](synapse-migration-strategy-planning.md)
- [Phase 3: Hive Metastore and data migration](synapse-migration-hms-data.md)
- [Phase 4: Security and governance migration](synapse-migration-security-validation-cutover.md)
- [Migrate Azure Synapse notebooks to Fabric](migrate-synapse-notebooks.md)
- [Migrate Spark job definitions from Azure Synapse to Fabric](migrate-synapse-spark-job-definition.md)
- [Migrate Spark Pools from Azure Synapse to Fabric](migrate-synapse-spark-pools.md)
