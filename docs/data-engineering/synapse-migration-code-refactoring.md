---
title: Refactor Synapse Spark code for Fabric
description: Update notebooks and Spark job code by replacing Synapse-specific APIs, linked service patterns, and unsupported catalog methods for Fabric.
ms.topic: how-to
ms.date: 04/20/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Refactor Synapse Spark code for Fabric

This article is part 3 of 6 in the Azure Synapse Spark to Microsoft Fabric migration best practices series.

Use this article after migrating your notebooks and Spark job definitions when you need to fix code patterns that the Migration Assistant can't convert automatically. This article guides you through replacing Synapse-specific APIs, updating file paths, and changing credential patterns to work with Fabric.

In this article, you learn how to:

- Audit your code for Synapse-specific patterns before refactoring.
- Replace mssparkutils references with notebookutils equivalents.
- Update file paths and storage references for OneLake.
- Refactor linked service authentication to direct authentication or Key Vault.
- Adapt Spark catalog APIs and data connector patterns for Fabric.

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

Update Synapse notebooks that use relative paths or Synapse-managed storage paths to use direct `abfss://` paths or OneLake paths in Fabric.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `"abfss://...@<synapse_storage>.dfs.core.windows.net/user/trusted-service-user/deltalake"` | `"abfss://<workspace_id>@onelake.dfs.fabric.microsoft.com/<lakehouse_id>/Tables/deltalake"` |
| `spark.read.synapsesql("<pool>.<schema>.<table>")` | `spark.read.format("delta").load("abfss://.../<lakehouse>/Tables/<table>")` |

> [!TIP]
> Replace all Synapse-managed storage paths with OneLake paths (`abfss://<workspace_id>@onelake.dfs.fabric.microsoft.com/<item_id>/...`). For ADLS Gen2 data, create OneLake shortcuts and reference the shortcut paths instead.

## Spark Catalog API

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

## MSSparkUtils and NotebookUtils

Replace `mssparkutils` calls with the Fabric `notebookutils` equivalents. The most common credential-related changes are:

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `mssparkutils.credentials.getSecretWithLS("sampleLS", secretKey)` | `notebookutils.credentials.getSecret("https://<vault>.vault.azure.net/", secretKey)` |
| `TokenLibrary.getSecret("foo", "bar")` | `notebookutils.credentials.getSecret("https://foo.vault.azure.net/", "bar")` |

In Fabric, linked service-based secret retrieval (`getSecretWithLS`) isn't supported. Instead, reference the Key Vault URL directly by using `notebookutils.credentials.getSecret(vaultUrl, secretName)`. The same pattern applies to `TokenLibrary.getSecret()` calls.

> [!NOTE]
> Most `mssparkutils.fs` methods (for example, `ls`, `cp`, `mv`, `rm`, `mkdirs`, `head`) work identically as `notebookutils.fs` in Fabric. The primary changes are credential and secret methods, and `notebook.run()` path references.

## Azure Data Explorer (Kusto) connector

Synapse notebooks that connect to Azure Data Explorer (Kusto) via linked services must be refactored to use direct endpoint authentication.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `.option("spark.synapse.linkedService", "AzureDataExplorer1")` | Remove linked service reference |
| Read with linked service option set | `.option("accessToken", notebookutils.credentials.getToken("https://<cluster>.kusto.windows.net"))` |

Replace the linked service option with an `accessToken` option. Use `notebookutils.credentials.getToken()` to obtain a token for your Kusto cluster endpoint. The rest of the query options (`kustoDatabase`, `kustoQuery`) remain unchanged.

## Cosmos DB connector

Update Cosmos DB connections in Synapse that use linked services or `getSecretWithLS`.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `.option("spark.synapse.linkedService", "CosmosDbLS")` | Remove linked service reference |
| `mssparkutils.credentials.getSecretWithLS("cosmosKeyLS", "cosmosKey")` | `notebookutils.credentials.getSecret("https://<vault>.vault.azure.net/", "cosmosKey")` |

Replace the linked service reference with direct Cosmos DB endpoint configuration. Store the Cosmos DB account key in Azure Key Vault and retrieve it by using `notebookutils.credentials.getSecret(vaultUrl, secretName)` instead of `getSecretWithLS()`.

## Linked service references

Replace all Synapse linked service references in Fabric.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `spark.conf.set("spark.storage.synapse.linkedServiceName", ls_name)` | Remove — not supported in Fabric |
| `spark.conf.set("fs.azure.account.oauth.provider.type", "com.microsoft.azure.synapse.tokenlibrary.LinkedServiceBasedTokenProvider")` | `spark.conf.set("fs.azure.account.oauth.provider.type", "org.apache.hadoop.fs.azurebfs.oauth2.ClientCredsTokenProvider")` |
| `TokenLibrary.getPropertiesAsMap(linked_service_cfg)` | Remove — use direct connection string or service principal config |

In Fabric, there are no linked services. Replace the Synapse token provider with standard OAuth client credentials (service principal). Configure `fs.azure.account.auth.type`, `oauth.provider.type`, `client.id`, `client.secret`, and `client.endpoint` directly by using `spark.conf.set()`.

## Token library

Synapse's `TokenLibrary` for getting tokens and reading linked service properties isn't available in Fabric. Replace it with equivalent patterns.

| **Before (Synapse)** | **After (Fabric)** |
|----|----|
| `TokenLibrary.getPropertiesAsMap(serviceConnection)` | Remove — configure storage account directly |
| `val my_account = conexion("Endpoint").toString.substring(8)` | `val my_account = "<storage_account_name>" // Hardcode or retrieve via notebookutils` |
| `mssparkutils.fs.head(internalPath, Int.MaxValue)` | `notebookutils.fs.head(internalPath, Int.MaxValue)` |

For OAuth-based ADLS Gen2 access, configure the service principal credentials directly by using `spark.conf.set()` with the storage account-specific keys (for example, `fs.azure.account.auth.type.<account>.dfs.core.windows.net`) instead of relying on linked service token providers.

> [!IMPORTANT]
> Review all notebooks for linked service references before cutover. Any remaining `spark.synapse.linkedService`, `TokenLibrary`, or `getSecretWithLS` calls fail at runtime in Fabric.

## Spark job definition migration

Spark job definitions (SJDs) are batch job configurations that reference a main executable file (`.py`, `.jar`, or `.R`), optional reference libraries, command-line arguments, and a lakehouse context. While the Spark Migration Assistant handles SJD migration automatically, important differences between Synapse and Fabric SJDs require attention.

### Key differences between Synapse and Fabric SJDs

- **Lakehouse context required.** In Fabric, every SJD must have at least one lakehouse associated with it. This lakehouse serves as the default file system for Spark runtime. Any code that uses relative paths reads and writes from the default lakehouse. In Synapse, SJDs use the workspace default storage (ADLS Gen2) as the default file system.

- **Supported languages.** Fabric supports PySpark (Python), Spark (Scala/Java), and SparkR. .NET for Spark (C#/F#) isn't supported in Fabric. You must rewrite these workloads in Python or Scala before migration.

- **Retry policies.** Fabric SJDs support built-in retry policies, such as max retries and retry interval. This feature is useful for Spark Structured Streaming jobs that need to run indefinitely.

- **Environment binding.** In Synapse, SJDs bind to a Spark pool. In Fabric, SJDs bind to an Environment, which contains pool configuration, libraries, and Spark properties. The Migration Assistant automatically maps Synapse pool references to Fabric Environments.

- **Scheduling.** Fabric SJDs have built-in scheduling (**Settings** > **Schedule**) without requiring a separate pipeline. In Synapse, SJD scheduling requires a pipeline with a Spark Job activity. If you have Synapse pipelines that only trigger SJDs, consider using Fabric's built-in SJD scheduling instead of migrating the pipeline.

- **Import/export.** Synapse supports UI-based JSON import and export for SJDs. Fabric doesn't support UI import or export. Use the Spark Migration Assistant or the Fabric REST API to create or update SJDs programmatically.

### Refactor SJD code

The same code refactoring patterns in this article apply to SJD main files. Changes fall into two categories.

Source code changes (inside the `.py`, `.jar`, or `.R` main file):

- Replace `mssparkutils` with `notebookutils` for credential and file system operations.
- Update hardcoded file paths in code to OneLake `abfss://` paths or shortcut paths, when needed. SJDs that use only relative paths against the default lakehouse might not require changes.
- Replace linked service references in code with Key Vault secrets or Fabric Connections.

> [!NOTE]
> DMTS Connections aren't yet supported in Fabric hddSpark job definitions (supported in notebooks only). If your SJD code uses DMTS, refactor to use direct endpoint authentication.

**SJD configuration changes (in the Fabric SJD item settings):**

- Verify that ADLS Gen2 paths referenced by main definition files are still accessible from the Fabric workspace. If files were stored in Synapse workspace-internal storage, re-upload them to the Fabric SJD or move them to an accessible ADLS Gen2 location.
- Verify all reference files (`.py`, `.R`, `.jar`) are accessible after migration. Re-upload any files that were stored in Synapse workspace-internal storage.
- If command-line arguments contain Synapse-specific paths or connection strings, update them to Fabric equivalents.

## Related content

- [Step 1: Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md)
- [Step 2: Migrate Synapse Spark workloads with Migration Assistant](synapse-migration-spark-assistant.md)
- [Step 3: Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md)
- [Step 4: Migrate Spark pools, environments, and libraries from Synapse to Fabric](synapse-migration-pools-environments-libraries.md)
- [Step 5: Migrate Hive Metastore metadata and data paths to Fabric](synapse-migration-hms-data.md)
- [Step 6: Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md)
