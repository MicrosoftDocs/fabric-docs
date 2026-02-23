---
title:       Shortcut transformations (AI-powered)
description: Use AI-powered shortcut transformations to convert unstructured text files into queryable Delta tables.
ms.reviewer: mideboer
ms.topic:    how-to
ms.date:     07/16/2025
---

# Transform unstructured text files into Delta tables by using AI-powered tools

Use AI-powered shortcut transformations to extract insights from unstructured text files. AI-powered transformations apply language processing to `.txt` files to summarize content, detect sentiment, translate languages, redact PII, or extract named entities.

> [!IMPORTANT]
> Shortcut transformations are currently in **public preview**. Features and behavior might change before general availability.

## Why use AI-powered shortcut transformations?

Shortcut transformations in Microsoft Fabric include a set of built-in, AI-powered transformations that you can apply directly to `.txt` files referenced through shortcuts. The engine automatically keeps the output Delta table in sync with the source files.

| Benefit | What it means for you |
|---|---|
| **Accelerate time-to-insight** | Go from raw text to a queryable Delta table in minutes, no ETL required. |
| **Lower maintenance** | The transformation engine watches the source folder on a 2-minute schedule, so outputs stay up to date automatically. |
| **Enterprise-grade security** | PII detection helps you redact sensitive data before it lands in analytics. |
| **Consistent, repeatable results** | Built-in AI models provide standardized sentiment scores, entity tags, and translations, eliminating manual data-prep drift. |

## Supported AI transformations

| Transformation | Purpose |
|---|---|
| **Summarization** | Generate concise summaries from long-form text. |
| **Translation** | Translate text between supported languages. |
| **Sentiment analysis** | Label text sentiment as *positive*, *negative*, or *neutral*. |
| **PII detection** | Find and redact personally identifiable information (names, phone numbers, emails). |
| **Name recognition** | Extract named entities such as people, organizations, or locations. |

For example, customer feedback stored in a data lake might contain sensitive details like names, emails, and phone numbers. Apply the **PII detection** transformation to scan and redact this content automatically and produce a privacy-compliant Delta table for analysis.

> [!NOTE]
> AI transformations support **`.txt` files only** as input.

## How it works

1. **Create a shortcut**  
   Reference a folder of `.txt` files in Azure Data Lake, Amazon S3, or another OneLake shortcuts source.  
1. **Select an AI-powered transformation**  
   Pick one of the supported transformations during shortcut creation.  
1. **Automatic sync**  
   The engine checks the source folder every two minutes. New, modified, or deleted files are reflected in the Delta table.  
1. **Query-ready output**  
   Use the resulting table immediately in reports, notebooks, or downstream pipelines.

## Regional availability

AI-powered transforms are currently available in these regions: [Azure AI Language regional support](/azure/ai-services/language-service/concepts/regional-support)
