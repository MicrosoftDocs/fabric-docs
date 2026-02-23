---
title: Supported commands for dbt jobs
description: List and description of supported commands for dbt jobs in Microsoft Fabric.
ms.reviewer: akurnala
ms.topic: include
ms.date: 11/20/2025
---

| Command | Description |
|---------|-------------|
| `dbt build` | Builds all models, seeds, and tests in the project. |
| `dbt run` | Runs all SQL models in dependency order. |
| `dbt seed` | Loads CSV files from the seeds/ directory. |
| `dbt test` | Runs schema and data tests defined in schema.yml. |
| `dbt compile` | Generates compiled SQL without running transformations. |
| `dbt snapshot` | Captures and tracks slowly changing dimensions over time. |