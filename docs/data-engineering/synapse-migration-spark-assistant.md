---
title: Migrate Synapse Spark workloads with Migration Assistant
description: Use the Spark Migration Assistant to migrate notebooks, Spark job definitions, pools, and lake database metadata from Synapse to Fabric.
ms.topic: how-to
ms.date: 04/20/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Migrate Synapse Spark workloads with the Migration Assistant (Preview)

This article is part 2 of 6 in the Azure Synapse Spark to Microsoft Fabric migration best practices series.

Use this article to understand your migration scenario (Git-enabled vs. standard workspace) and what comes after the Migration Assistant runs. The assistant itself copies and transforms your items, but it doesn't complete the migration—you still need to refactor code, reconcile configuration gaps, and validate the results.

For step-by-step instructions on running the assistant, see [Spark Synapse to Fabric Spark Migration Assistant (Preview)](synapse-to-fabric-spark-migration-assistant.md).

In this article, you learn how to:

- Understand the migration workflow for standard (non-Git) Synapse workspaces.
- Understand the migration workflow for Git-enabled Synapse workspaces and Fabric serialization differences.
- Refactor migrated code and reconcile configuration gaps after migration.
- Plan your next steps for deployment pipelines and ongoing CI/CD.

The assistant migrates the following items:

- Spark pools are migrated to Fabric Pools and corresponding Environment artifacts.
- Notebooks and their associated environments are migrated.
- Spark job definitions are migrated with associated environments.
- Lake databases are mapped to Fabric schemas; managed Delta tables are migrated via OneLake catalog shortcuts.

> [!IMPORTANT]
> Spark configurations, custom libraries, and custom executor settings aren't migrated by the assistant. You must configure these manually in Fabric Environments. Synapse workspaces under a VNet can't be migrated with the assistant.

## Standard (non-Git) workspace migration

For workspaces where notebooks and SJDs are stored directly in Synapse (not in a Git repository):

1. Run the Spark Migration Assistant from your Fabric workspace (**Migrate** > **Data engineering items**). Select the source Synapse workspace and migrate all Spark items.

1. Validate dependencies: ensure the same Spark version is used. If notebooks reference other notebooks via `mssparkutils.notebook.run()`, verify those were also migrated. The Migration Assistant preserves folder structure (Fabric supports up to 10 levels of nesting).

1. Refactor code: replace `mssparkutils` with `notebookutils`, replace linked service references with Fabric Connections, and update file paths. See [Step 3: Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md) for details.

## Git-enabled workspace migration

For workspaces where notebooks and SJDs are stored in an Azure DevOps or GitHub repository, note that Synapse and Fabric use different Git serialization formats. Synapse stores notebooks as JSON; Fabric uses source format `.py`/`.scala` or `.ipynb`. You can't point a Fabric workspace at the same Synapse Git branch directly.

1. **Migrate items.** Use the Spark Migration Assistant to migrate notebooks and SJDs from the Synapse workspace to a Fabric workspace. This converts items to Fabric-compatible format.

1. **Refactor code.** Apply the same code refactoring as the standard scenario — replace `mssparkutils`, update file paths, replace linked services. See [Step 3: Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md) for details.

1. **Connect Fabric workspace to Git.** Connect your Fabric workspace to a new branch or folder in your repository (**Workspace Settings** > **Source Control** > **Git Integration**). Use a separate branch or folder from your Synapse content to avoid conflicts. Commit the Fabric workspace content to populate the new branch.

1. **Set up deployment pipelines (optional).** Configure Fabric deployment pipelines (Dev → Test → Prod) for ongoing CI/CD. Fabric supports auto-binding for default lakehouses and attached environments when deploying across stages.

> [!TIP]
> Keep your Synapse Git branch intact as a historical reference. Create a new branch or folder for Fabric content. Fabric stores notebooks as source files (`.py` for PySpark) rather than JSON, which provides cleaner Git diffs for code review.

## Related content

- [Step 1: Plan your Synapse Spark migration to Fabric](synapse-migration-strategy-planning.md)
- [Step 2: Migrate Synapse Spark workloads with Migration Assistant](synapse-migration-spark-assistant.md)
- [Step 3: Refactor Synapse Spark code for Fabric](synapse-migration-code-refactoring.md)
- [Step 4: Migrate Spark pools, environments, and libraries from Synapse to Fabric](synapse-migration-pools-environments-libraries.md)
- [Step 5: Migrate Hive Metastore metadata and data paths to Fabric](synapse-migration-hms-data.md)
- [Step 6: Complete Synapse to Fabric migration with security, validation, and cutover](synapse-migration-security-validation-cutover.md)
- [Migrate Azure Synapse notebooks to Fabric](migrate-synapse-notebooks.md)
- [Migrate Spark job definitions from Azure Synapse to Fabric](migrate-synapse-spark-job-definition.md)
- [Migrate Spark Pools from Azure Synapse to Fabric](migrate-synapse-spark-pools.md)
