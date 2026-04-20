---
title: Refactor Synapse Spark code for Fabric
description: Update notebooks and Spark job code by replacing Synapse-specific APIs, linked service patterns, and unsupported catalog methods for Fabric.
ms.topic: how-to
ms.date: 04/20/2026
ai-usage: ai-assisted
---

# Refactor Synapse Spark code for Fabric

This article is part 3 of 6 in the Azure Synapse Spark to Microsoft Fabric migration best practices series.

Use this article to convert Synapse-specific code patterns into Fabric-compatible implementations. It focuses on code-level changes such as path updates, catalog API replacements, NotebookUtils updates, connector authentication changes, and removal of linked service token patterns.

In this article, you learn how to:

- Run a pre-refactoring audit across notebooks and Spark job code.
- Replace Synapse file path and storage assumptions with OneLake-compatible paths.
- Replace unsupported Spark catalog APIs with Spark SQL equivalents.
- Replace MSSparkUtils and TokenLibrary credential patterns with NotebookUtils and direct authentication.
- Refactor Azure Data Explorer and Cosmos DB connector authentication patterns.

- Refactor Azure Data Explorer and Cosmos DB connector authentication patterns.

After migrating notebooks (via the Migration Assistant or manually), you must refactor code that uses Synapse-specific APIs, linked services, or file paths. For the full NotebookUtils API reference, see [NotebookUtils for Fabric](notebook-utilities.md).

## Pre-refactoring audit

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

## File path usage

Synapse notebooks that use relative paths or Synapse-managed storage paths must be updated to use direct `abfss://` paths or OneLake paths in Fabric.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `"abfss://...@<synapse_storage>.dfs.core.windows.net/user/trusted-service-user/deltalake"` | `"abfss://<workspace_id>@onelake.dfs.fabric.microsoft.com/<lakehouse_id>/Tables/deltalake"` |
| `spark.read.synapsesql("<pool>.<schema>.<table>")` | `spark.read.format("delta").load("abfss://.../<lakehouse>/Tables/<table>")` |

> [!TIP]
> Replace all Synapse-managed storage paths with OneLake paths (`abfss://<workspace_id>@onelake.dfs.fabric.microsoft.com/<item_id>/...`). For ADLS Gen2 data, create OneLake shortcuts and reference the shortcut paths instead.

## Spark Catalog API

Several `spark.catalog` methods aren't supported in Fabric. Replace them with Spark SQL equivalents.

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

## MSSparkUtils and NotebookUtils

Replace `mssparkutils` calls with the Fabric `notebookutils` equivalents. The most common credential-related changes:

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `mssparkutils.credentials.getSecretWithLS("sampleLS", secretKey)` | `notebookutils.credentials.getSecret("https://<vault>.vault.azure.net/", secretKey)` |
| `TokenLibrary.getSecret("foo", "bar")` | `notebookutils.credentials.getSecret("https://foo.vault.azure.net/", "bar")` |

In Fabric, linked service-based secret retrieval (`getSecretWithLS`) isn't supported. Instead, reference the Key Vault URL directly using `notebookutils.credentials.getSecret(vaultUrl, secretName)`. The same pattern applies to `TokenLibrary.getSecret()` calls.

> [!NOTE]
> Most `mssparkutils.fs` methods (for example, `ls`, `cp`, `mv`, `rm`, `mkdirs`, `head`) work identically as `notebookutils.fs` in Fabric. The primary changes are credential/secret methods and `notebook.run()` path references.

## Azure Data Explorer (Kusto) connector

Synapse notebooks that connect to Azure Data Explorer (Kusto) via linked services must be refactored to use direct endpoint authentication.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `.option("spark.synapse.linkedService", "AzureDataExplorer1")` | Remove linked service reference |
| Read with linked service option set | `.option("accessToken", notebookutils.credentials.getToken("https://<cluster>.kusto.windows.net"))` |

Replace the linked service option with an `accessToken` option. Use `notebookutils.credentials.getToken()` to obtain a token for your Kusto cluster endpoint. The rest of the query options (`kustoDatabase`, `kustoQuery`) remain unchanged.

## Cosmos DB connector

Cosmos DB connections in Synapse that use linked services or `getSecretWithLS` must be updated.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `.option("spark.synapse.linkedService", "CosmosDbLS")` | Remove linked service reference |
| `mssparkutils.credentials.getSecretWithLS("cosmosKeyLS", "cosmosKey")` | `notebookutils.credentials.getSecret("https://<vault>.vault.azure.net/", "cosmosKey")` |

Replace the linked service reference with direct Cosmos DB endpoint configuration. Store the Cosmos DB account key in Azure Key Vault and retrieve it using `notebookutils.credentials.getSecret(vaultUrl, secretName)` instead of `getSecretWithLS()`.

## Linked service references

All Synapse linked service references must be replaced in Fabric.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `spark.conf.set("spark.storage.synapse.linkedServiceName", ls_name)` | Remove — not supported in Fabric |
| `spark.conf.set("fs.azure.account.oauth.provider.type", "com.microsoft.azure.synapse.tokenlibrary.LinkedServiceBasedTokenProvider")` | `spark.conf.set("fs.azure.account.oauth.provider.type", "org.apache.hadoop.fs.azurebfs.oauth2.ClientCredsTokenProvider")` |
| `TokenLibrary.getPropertiesAsMap(linked_service_cfg)` | Remove — use direct connection string or service principal config |

In Fabric, there are no linked services. Replace the Synapse token provider with standard OAuth client credentials (service principal). Configure `fs.azure.account.auth.type`, `oauth.provider.type`, `client.id`, `client.secret`, and `client.endpoint` directly using `spark.conf.set()`.

## Token Library

Synapse's `TokenLibrary` for obtaining tokens and reading linked service properties isn't available in Fabric. Replace with equivalent patterns.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `TokenLibrary.getPropertiesAsMap(serviceConnection)` | Remove — configure storage account directly |
| `val my_account = conexion("Endpoint").toString.substring(8)` | `val my_account = "<storage_account_name>" // Hardcode or retrieve via notebookutils` |
| `mssparkutils.fs.head(internalPath, Int.MaxValue)` | `notebookutils.fs.head(internalPath, Int.MaxValue)` |

For OAuth-based ADLS Gen2 access, configure the service principal credentials directly via `spark.conf.set()` using the storage account-specific keys (for example, `fs.azure.account.auth.type.<account>.dfs.core.windows.net`) instead of relying on linked service token providers.

> [!IMPORTANT]
> Review all notebooks for linked service references before cutover. Any remaining `spark.synapse.linkedService`, `TokenLibrary`, or `getSecretWithLS` calls will fail at runtime in Fabric.

## Spark job definition migration

Spark Job Definitions (SJDs) are batch job configurations that reference a main executable file (`.py`, `.jar`, or `.R`), optional reference libraries, command-line arguments, and a lakehouse context. While the Spark Migration Assistant handles SJD migration automatically, there are important differences between Synapse and Fabric SJDs that require attention.

### Key differences between Synapse and Fabric SJDs

- **Lakehouse context required.** In Fabric, every SJD must have at least one lakehouse associated with it. This lakehouse serves as the default file system for Spark runtime. Any code using relative paths reads/writes from the default lakehouse. In Synapse, SJDs use the workspace default storage (ADLS Gen2) as the default file system.

- **Supported languages.** Fabric supports PySpark (Python), Spark (Scala/Java), and SparkR. .NET for Spark (C#/F#) isn't supported in Fabric — these workloads must be rewritten in Python or Scala before migration.

- **Retry policies.** Fabric SJDs support built-in retry policies (max retries, retry interval), which is useful for Spark Structured Streaming jobs that need to run indefinitely.

- **Environment binding.** In Synapse, SJDs are bound to a Spark pool. In Fabric, SJDs are bound to an Environment (which contains pool config, libraries, and Spark properties). The Migration Assistant maps Synapse pool references to Fabric Environments automatically.

- **Scheduling.** Fabric SJDs have built-in scheduling (**Settings** > **Schedule**) without requiring a separate pipeline. In Synapse, SJD scheduling requires a pipeline with a Spark Job activity. If you have Synapse pipelines that only trigger SJDs, consider using Fabric's built-in SJD scheduling instead of migrating the pipeline.

- **Import/export.** Synapse supports UI-based JSON import/export for SJDs. Fabric doesn't support UI import/export — use the Spark Migration Assistant or the Fabric REST API to create/update SJDs programmatically.

### Refactor SJD code

The same code refactoring patterns in this article apply to SJD main files. Changes fall into two categories.

**Source code changes (inside the `.py` / `.jar` / `.R` main file):**

- Replace `mssparkutils` with `notebookutils` for credential and file system operations.
- Update hardcoded file paths in code to OneLake `abfss://` paths or shortcut paths, when needed. SJDs that use only relative paths against the default lakehouse might not require changes.
- Replace linked service references in code with Key Vault secrets or Fabric Connections.

> [!NOTE]
> DMTS Connections aren't yet supported in Fabric Spark Job Definitions (supported in notebooks only). If your SJD code uses DMTS, refactor to use direct endpoint authentication.

**SJD configuration changes (in the Fabric SJD item settings):**

- Verify that ADLS Gen2 paths referenced by main definition files are still accessible from the Fabric workspace. If files were stored in Synapse workspace-internal storage, re-upload them to the Fabric SJD or move them to an accessible ADLS Gen2 location.
- Verify all reference files (`.py`, `.R`, `.jar`) are accessible after migration. Re-upload any files that were stored in Synapse workspace-internal storage.
- If command-line arguments contain Synapse-specific paths or connection strings, update them to Fabric equivalents.

## Related content

- [Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md)
- [Migrate Synapse Spark workloads with Migration Assistant](synapse-migration-spark-assistant.md)
- [Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md)
- [Migrate Spark pools, environments, and libraries from Synapse to Fabric](synapse-migration-pools-environments-libraries.md)
- [Migrate Hive Metastore metadata and data paths to Fabric](synapse-migration-hms-data.md)
- [Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md)
