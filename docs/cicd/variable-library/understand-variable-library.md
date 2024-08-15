---
title: The Microsoft Fabric variable library
description: Understand how variable libraries are used in the Fabric Application lifecycle management (ALM) tool.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: Lee
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 08/15/2024
ms.search.form: Introduction to Deployment pipelines, Manage access in Deployment pipelines, Deployment pipelines operations
#customer intent: As a developer, I want to learn how to use the variable library item in the Microsoft Fabric Application lifecycle management (ALM) tool, so that I can manage my content lifecycle.
---

---
title: [Follow SEO guidance at 
https://review.learn.microsoft.com/en-us/help/platform/seo-meta-title]
description: "[Article description]."
author: [your GitHub alias]
ms.author: [your Microsoft alias or a team alias]
ms.service: [the approved service name]
ms.topic: concept-article #Don't change.
ms.date: [mm/dd/yyyy]

#customer intent: As a <role>, I want <what> so that <why>.

---

<!-- --------------------------------------

- Use this template with pattern instructions for:

Concept

- Before you sign off or merge:

Remove all comments except the customer intent.

- Feedback:

https://aka.ms/patterns-feedback

-->

# [noun phrase] concept(s)

or

# [noun] overview

<!-- Required: Article headline - H1

Identify the product, service, or feature the
article covers.

-->

[Introduce and explain the purpose of the article.]

<!-- Required: Introductory paragraphs (no heading)

Write a brief introduction that can help the user
determine whether the article is relevant for them
and to describe the concept the article covers.

For definitive concepts, it's better to lead with a
sentence in the form, "X is a (type of) Y that does Z."

-->

## Prerequisites

<!--Optional: Prerequisites - H2

If this section is needed, make "Prerequisites" your
first H2 in the article.

Use clear and unambiguous language and use
an unordered list format. 

-->

## [Main idea]

[Describe a main idea.]

<!-- Required: Main ideas - H2

Use one or more H2 sections to describe the main ideas
of the concept.

Follow each H2 heading with a sentence about how
the section contributes to the whole. Then, describe 
the concept's critical features as you define what it is.

-->

## Related content

- [Related article title](link.md)
- [Related article title](link.md)
- [Related article title](link.md)

<!-- Optional: Related content - H2

Consider including a "Related content" H2 section that 
lists links to 1 to 3 articles the user might find helpful.

-->

<!--

Remove all comments except the customer intent
before you sign off or merge to the main branch.

-->


# The Microsoft Fabric variable library

The variable library is a Fabric item that allows you to define and manage workspace items in different stages of your pipeline. It's basically a container that holds values for different variables that can be consumed by other items in the workspace. The variable library can hold several values for each variables, one for each stage in the release pipeline. It's fully supported in CI/CD and can be automated.

The following table lists different items in the workspace and their types:

| Item name | Item type | Description |
| --- | --- | --- |
| My Variables | Variable library | Holds several values for variables, one for each stage in the release pipeline. |
| MyLakehouse | Lakehouse | Represents a data lake in the workspace. |
| NYC-taxi pipeline | Data pipeline | Represents a data pipeline in the workspace. |
| NYC-taxi NB | Notebook | Represents a notebook in the workspace. |
| NYC-taxi Env | Environment | Represents an environment in the workspace. |
| NYC-taxi SM | Semantic model | Represents a semantic model in the workspace. |

Other items in the workspace can refer to and use variables in the library

The following table lists the names of different variables stored in the variable library along with their type, default value, and values at different stages of the pipeline:

| Variable name | Type | Default value | Test stage value| Prod stage value |
| --- | --- | --- | --- | --- |
| SMdatasource-server | string | PBIAnalyticsDM-pbiAn… | <default> | PBIAnalyticsP |
|SparkRuntimeVersion | string | 1.1 (Spark 3.3, Delta 2.2) | 1.1.3 (Spark 3.2, Delta 2.1) | 1.2 (Spark 4.1, Delta 3.2) |
| mylakehouse | string | MainLakehouse | TestLakehouse | <default> |
| S3connection | string | connection1 | connection2 | connection3 |



Is deployed to all stages. Only difference between stages is active value set. Fir each stage define which value set to use (ed. in the previous table, define active value set at default, Test stage or Prod stage).

## Supported items

The following items are supported in the variable library:

- Lakehouse
- Data pipeline
- Notebook

## Related content

- [End to end lifecycle management tutorial](./cicd-tutorial.md) 