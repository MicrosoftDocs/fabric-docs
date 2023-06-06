---
title: Semantic Link: Introduction
description: Overview of Semantic Link.
ms.reviewer: larryfr
ms.author: marcozo
author: eisber
ms.topic: overview 
ms.date: 06/06/2023
ms.search.form: Semantic Link
---

# Overview of Semantic Link

[!INCLUDE [preview-note](../includes/preview-note.md)]

This document provides an overview of the Semantic Link feature.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

## Overview

Semantic Link establishes a connection between Power BI datasets and the Data Science workload.
The feature aims to provide data connectivity, propagation of semantic information and seemless integration with established tools used by data scientists.

TODO Alternative Pitch: With SemPy, you can preserve subject matter experts’ knowledge about data semantics in a standardized form to help make the analysis faster and with less errors.

Power BI datasets act as the single semantic model and the source of truth for semantic definitions.

Semantic Link supports data connectivity to the Python [Pandas](https://pandas.pydata.org/) ecosystem through the SemPy library.

The [Apache Spark](https://spark.apache.org/) ecosystem including PySpark, Spark SQL, R and Scala are supported through the Semantic Link Spark native connector.

[Semantic propagation](#semantic-propagation) exposes metadata such as Power BI source table information or Power BI data categories to enable downstream task as [measure-join](#measure-join) and intelligent suggestion of built-in [semantic functions](#semantic-functions).
