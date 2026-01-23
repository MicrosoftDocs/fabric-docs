---
# Required metadata
# For more information, see https://learn.microsoft.com/help/platform/learn-editor-add-metadata
# For valid values of ms.service, ms.prod, and ms.topic, see https://learn.microsoft.com/help/platform/metadata-taxonomies

title:       OneLake shortcuts AI transformations # Add a title for the browser tab
description: AI transformations in OneLake shortcuts# Add a meaningful description for search results
author:      miquelladeboer # GitHub alias
ms.author:   mideboer # Microsoft alias
# ms.service:  Shortcuts 
# ms.prod:   # To use ms.prod, uncomment it and delete ms.service
ms.topic:    how-to # Add the ms.topic value
ms.date:     07/16/2025
---

# Shortcut transformations (AI-powered)

> [!IMPORTANT]
> AI transforms for OneLake shortcuts are currently **Public Preview**. Features and behavior may change before general availability.

Modern data lakes are brimming with raw, unstructured text, product reviews, support emails, IoT device logs, and more. Turning that text into actionable insights typically requires custom code, orchestration pipelines, and constant maintenance. **OneLake Shortcut Transformations** remove that overhead: you point to your files once, choose an AI transform, and Fabric does the rest.

## Why use AI-powered transforms?

| Benefit | What it means for you |
|---|---|
| **Accelerate time-to-insight** | Go from raw text to a queryable Delta table in minutes, no ETL required. |
| **Lower maintenance** | The transformation engine watches the source folder on a 2-minute schedule, so outputs stay up to date automatically. |
| **Enterprise-grade security** | PII detection helps you comply with GDPR, HIPAA, and other regulations by redacting sensitive data before it lands in analytics. |
| **Consistent, repeatable results** | Built-in AI models provide standardized sentiment scores, entity tags, and translations, eliminating manual data-prep drift. |

OneLake Shortcut Transformations in **Microsoft Fabric** include a set of built-in, AI-powered transforms that you can apply directly to `.txt` files referenced through shortcuts, without writing code or building pipelines. The engine automatically keeps the output **Delta table** in sync, so your data is query-ready for **Power BI**, notebooks, pipelines, and other Fabric experiences.

## Supported AI transforms

| Transform | Purpose |
|---|---|
| **Summarization** | Generates concise summaries from long-form text. |
| **Translation** | Translates text between supported languages. |
| **Sentiment analysis** | Labels text sentiment as *positive*, *negative*, or *neutral*. |
| **PII detection** | Finds and redacts personally identifiable information (names, phone numbers, emails). |
| **Name recognition** | Extracts named entities such as people, organizations, or locations. |

> [!NOTE]
> AI transforms currently support **`.txt` files only** as input.

## Example — PII detection in customer feedback

Customer feedback stored in a data lake may contain sensitive details (names, emails, phone numbers). Apply the **PII detection** transform to automatically scan and redact this content and produce a privacy-compliant Delta table for analysis.

## How it works

1. **Create a shortcut**  
   Reference a folder of `.txt` files in Azure Data Lake, Amazon S3, or another OneLake shortcuts source.  
2. **Select an AI transform**  
   Pick one of the supported transforms during shortcut creation.  
3. **Automatic sync**  
   The engine checks the source folder every **2 minutes**. New, modified, or deleted files are reflected in the Delta table.  
4. **Query-ready output**  
   Use the resulting table immediately in reports, notebooks, or downstream pipelines.

## Regional availability

AI-powered transforms are currently available in these regions: [Azure AI Language regional support](/azure/ai-services/language-service/concepts/regional-support)

