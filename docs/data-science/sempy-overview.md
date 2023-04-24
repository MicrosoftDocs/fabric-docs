---
title: SemPy overview
description: Learn about SemPy's overall structure and purpose. SemPy is a new library in Azure Synapse vNext for working with tabular data.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: conceptual
ms.date: 02/10/2023
---

# SemPy in Microsoft Fabric overview

[!INCLUDE [preview-note](../includes/preview-note.md)]

We introduce new ways for data scientists and ML engineers to structure their code and collaborate while performing common data science tasks by making use of the data semantics. SemPy is a new library in Azure Synapse vNext for working with tabular data. With SemPy, you can preserve subject matter experts' knowledge about data semantics in a standardized form to help make the analysis faster and with fewer errors.

:::image type="content" source="media\sempy-overview\sempy-architecture.png" alt-text="Screenshot showing visual representation of the workflow between SemPy and user." lightbox="media\sempy-overview\sempy-architecture.png":::

SemPy's semantic model is the [E/R model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model).

SemPy improves data science process by facilitating many of the repetitive and time-consuming tasks:

- **Understanding and modeling of the data**: SemPy capabilities for automatic discovery and visualization of relationships between entities can help you understand the underlying structure of the data. It's also a tool for data scientists to collaborate with each other, data engineers, and Power BI analysts, which empowers sharing and storing of semantic knowledge.
- **Visualization capabilities**: SemPy helps increase productivity by reducing the need to manually create visualizations, from relationships between tables and functional dependencies to wrappers on top of common plotting libraries that simplify EDA by providing user-friendly interfaces and hiding complex parameters.
- **Data quality assessment and data cleaning**: SemPy can detect various types of non-trivial data quality issues by exploring violations of functional dependencies between columns. This can help you discover incorrect or missing entries, identify columns that have correlations with sensitive attributes, and more.
- **Auto-suggestions of code**: context-aware suggestions of common code snippets in SemPy reduce the need to manually type, saving time and reducing errors. This capability can help improve collaboration by driving consistency across the codebase and making it easier to understand code.

SemPy helps with creating and exploring semantic data models by discovering relationships, validating functional dependencies, and integrating with Power BI.

SemPy makes EDA and cleaning stages more consistent and reproducible, boosting the performance of data science team and helping new members learn faster.
