---
title:       Shortcut transformations (AI-powered)
description: Use AI-powered shortcut transformations to convert unstructured text files into queryable Delta tables.
ms.reviewer: preshah
ms.topic:    how-to
ms.date:     03/25/2026
ai-usage:    ai-assisted
---

# Transform unstructured text files into Delta tables by using AI-powered tools (preview)

Use AI-powered shortcut transformations to extract insights from unstructured text files. AI-powered transformations apply language processing to `.txt` files to summarize content, detect sentiment, translate languages, redact PII, or extract named entities.

For structured files like CSV, Parquet, or JSON, see [Shortcut transformations (file)](./transformations.md).

> [!IMPORTANT]
> AI-powered shortcut transformations are currently in **public preview**. Features and behavior might change before general availability.

## Why use AI-powered shortcut transformations?

Shortcut transformations in Microsoft Fabric include a set of built-in, AI-powered transformations that you can apply directly to `.txt` files referenced through shortcuts. The engine automatically keeps the output Delta table in sync with the source files.

| Benefit | What it means for you |
| --- | --- |
| **Accelerate time-to-insight** | Go from raw text to a queryable Delta table in minutes, no ETL required. |
| **Lower maintenance** | The transformation engine watches the source folder on a 2-minute schedule, so outputs stay up to date automatically. |
| **Enterprise-grade security** | PII detection helps you redact sensitive data before it lands in analytics. |
| **Consistent, repeatable results** | Built-in AI models provide standardized sentiment scores, entity tags, and translations, eliminating manual data-prep drift. |

## Prerequisites

| Requirement | Details |
| --- | --- |
| Microsoft Fabric SKU | Capacity or trial that supports **Lakehouse** workloads. |
| Source data | A folder that contains `.txt` files. |
| Workspace role | **Contributor** or higher. |

## Supported AI transformations

| Transformation | Purpose |
| --- | --- |
| **Summarization** | Generate concise summaries from long-form text. |
| **Translation** | Translate text between supported languages. |
| **Sentiment analysis** | Label text sentiment as *positive*, *negative*, or *neutral*. |
| **PII detection** | Find and redact personally identifiable information (names, phone numbers, emails). |
| **Name recognition** | Extract named entities such as people, organizations, or locations. |

For example, customer feedback stored in a data lake might contain sensitive details like names, emails, and phone numbers. Apply the **PII detection** transformation to scan and redact this content automatically and produce a privacy-compliant Delta table for analysis.

> [!NOTE]
> AI transformations support **`.txt` files only** as input.

## Create a shortcut with AI transformation

1. **Create a shortcut**  
   Reference a folder of `.txt` files in Azure Data Lake, Amazon S3, or another OneLake shortcuts source.
1. **Select an AI-powered transformation**  
   Pick one of the supported transformations during shortcut creation.
1. **Configure subfolder processing**  
   By default, new transformations include subfolders recursively. Clear the **Include subfolders** option if you want to process only the top-level folder.
1. **Automatic sync**  
   The engine checks the source folder every two minutes. New, modified, or deleted files are reflected in the Delta table.  
1. **Query-ready output**  
   Use the resulting table immediately in reports, notebooks, or downstream pipelines.

## Regional availability

AI-powered transformations are currently available in these regions: [Azure Language in Foundry Tools regional support](/azure/ai-services/language-service/concepts/regional-support).

## Limitations

The following limitations currently apply to AI-powered shortcut transformations:

* **Input format:** Only `.txt` files are supported.
* **Nested folder support:** The following limitations apply to subfolder processing:
  * Only available for new transformations. Existing transformations can't enable subfolder support.
  * Once subfolder support is enabled, it can't be disabled.
  * Shortcuts nested inside the target folder aren't followed. Only physical folders and files are processed.
  * Selective include or exclude of specific subfolders isn't supported.
  * Nested folders don't work with SharePoint shortcuts.
