---
title: CSV upload to Delta for PBI reporting
description: Go from your CSV file to a Lakehouse Delta table to a PBI report.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: get-started
ms.date: 05/23/2023
ms.search.form: csv load to delta to pbi report
---

# CSV upload to Delta for PBI reporting

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] [Lakehouse](lakehouse-overview.md) is a data architecture platform for storing, managing, and analyzing structured and unstructured data in a single location. In order to achieve seamless data access across all compute engines in [!INCLUDE [product-name](../includes/product-name.md)], [Delta Lake](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake) is chosen as the unified table format.

Saving data in the Lakehouse using capabilities such as __Load to Delta__ or methods described in [Options to get data into the Fabric Lakehouse](load-data-lakehouse.md), all data is saved in Delta format. Delta is also used as the default Spark table format mode in code-first experiences such as Notebooks and Spark Job Definitions.

## Next steps

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
