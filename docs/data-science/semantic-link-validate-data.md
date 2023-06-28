---
title: Validate data with Semantic Link
description: Validate data with Semantic Link
ms.reviewer: mopeakande
ms.author: romanbat
author: RomanBat
ms.topic: overview 
ms.date: 06/06/2023
ms.search.form: Semantic Link
---

# Data validation with Semantic Link and Microsoft Fabric
# Validate relationships between tables
PowerBI and Microsoft Fabric provide rich set of data modelling capabilities, including ability to detect, define and manage foreign key relationships between tables and their cardinalities [link?]. 
As referential integrity is not automatically enforced for Lakehouse datasets, this may lead to hard to find data quality problems, which can affect the quality of BI reports and ML models. 
Semantic Link provides tools to validate referential integrity based on the relationships defined by the data model and find violations.

# Use functional depenencies to find and fix data quality issues 

existing docs:

Understanding and modeling of the data: SemPy capabilities for for automatic discovery and visualization of relationships between entities can help you understand the underlying structure of the data. It is also a tool for data scientists to collaborate with each other, data engineers, and PowerBI analysts that empowers sharing and storing of semantic knowledge.

Data quality assessment and data cleaning: SemPy can detect various types of non-trivial data quality issues by exploring violations of functional dependencies between columns. This can help you discover incorrect or missing entries, identify columns that have correlations with sensitive attributes, and more.

https://sempy.azurewebsites.net/dev/notebooks/data_cleaning_functional_dependencies.html
