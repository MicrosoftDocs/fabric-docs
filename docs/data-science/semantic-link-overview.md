---
title: What is semantic link (preview)?
description: Overview of semantic link.
ms.reviewer: mopeakande
ms.author: marcozo
author: eisber
reviewer: msakande
ms.topic: overview
ms.custom:
  - ignite-2023
ms.date: 06/06/2023
ms.search.form: semantic link
---

# What is semantic link (preview)?

Semantic link is a feature that allows you to establish a connection between [semantic models](/power-bi/connect-data/service-datasets-understand) and [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] in Microsoft Fabric.
Use of semantic link is only supported in Microsoft Fabric.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The primary goals of semantic link are to facilitate data connectivity, enable the propagation of semantic information, and seamlessly integrate with established tools used by data scientists, such as [notebooks](../data-engineering/how-to-use-notebook.md).
semantic link helps you to preserve domain knowledge about data semantics in a standardized way that can speed up data analysis and reduce errors.

## Overview of semantic link

The data flow starts with semantic models that contain data and semantic information. Semantic link bridges the gap between Power BI and the Data Science experience.

:::image type="content" source="media/semantic-link-overview/data-flow-with-semantic-link.png" alt-text="A diagram that shows data flow from Power BI to notebooks in Synapse Data Science and back to Power BI.":::

With semantic link, you can use semantic models from Power BI in the Data Science experience to perform tasks such as in-depth statistical analysis and predictive modeling with machine learning techniques.
The output of your data science work can be stored in [OneLake](../onelake/onelake-overview.md) using Apache Spark and ingested into Power BI using [Direct Lake](../get-started/direct-lake-overview.md).

## Power BI connectivity

Semantic models serve as the single [tabular object model](/analysis-services/tom/introduction-to-the-tabular-object-model-tom-in-analysis-services-amo), providing a reliable source for semantic definitions, such as Power BI measures. To connect to semantic models:

- Semantic link offers data connectivity to the Python [pandas](https://pandas.pydata.org/) ecosystem via the [SemPy Python library](/python/api/semantic-link-sempy/), making it easy for data scientists to work with the data.
- Semantic link provides access to semantic models through the **Spark native connector** for data scientists that are more familiar with the [Apache Spark](https://spark.apache.org/) ecosystem. This implementation supports various languages, including PySpark, Spark SQL, R, and Scala.

## Applications of semantic information

Semantic information in data includes Power BI [data categories](/power-bi/transform-model/desktop-data-categorization) such as address and postal code, relationships between tables, and hierarchical information.
These data categories comprise metadata that semantic link propagates into the Data Science environment to enable new experiences and maintain data lineage. Some example applications of semantic link are:

- Intelligent suggestions of built-in [semantic functions](semantic-link-semantic-functions.md).
- Innovative integration for augmenting data with Power BI measures through the use of [add-measures](semantic-link-power-bi.md#data-augmentation-with-power-bi-measures).
- Tools for [data quality validation](semantic-link-validate-data.md) based on the relationships between tables and functional dependencies within tables.

Semantic link is a powerful tool that enables business analysts to use data effectively in a comprehensive data science environment.
Semantic link facilitates seamless collaboration between data scientists and business analysts by eliminating the need to reimplement business logic embedded in [Power BI measures](/power-bi/transform-model/desktop-measures#understanding-measures). This approach ensures that both parties can work efficiently and productively, maximizing the potential of their data-driven insights.

## `FabricDataFrame` data structure

[FabricDataFrame](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe) is the core data structure of semantic link.
It subclasses the [pandas DataFrame](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html) and adds metadata, such as semantic information and lineage.
FabricDataFrame is the primary data structure that semantic link uses to propagate semantic information from semantic models into the Data Science environment.

:::image type="content" source="media/semantic-link-overview/semantic-link-overview-fabric-dataframes.png" alt-text="A diagram that shows data flow from connectors to semantic models to FabricDataFrame to Semantic Functions." lightbox="media/semantic-link-overview/semantic-link-overview-fabric-dataframes.png":::

FabricDataFrame supports all pandas operations and more.
It exposes semantic functions and the [add-measure](semantic-link-power-bi.md#data-augmentation-with-power-bi-measures) method that enable you to use Power BI measures in your data science work.

## Related content

- [Deepen your expertise of SemPy through the SemPy reference documentation](/python/api/semantic-link/overview-semantic-link/)
- [Tutorial: Clean data with functional dependencies (preview)](tutorial-data-cleaning-functional-dependencies.md)
- [Learn more about semantic link and Power BI connectivity (preview)](semantic-link-power-bi.md)
- [How to validate data with semantic link (preview)](semantic-link-validate-data.md)
- [Explore and validate relationships in semantic models (preview)](semantic-link-validate-relationship.md)
