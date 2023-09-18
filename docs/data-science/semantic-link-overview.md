---
title: What is Semantic Link?
description: Overview of Semantic Link.
ms.reviewer: mopeakande
ms.author: marcozo
author: eisber
reviewer: msakande
ms.topic: overview 
ms.date: 06/06/2023
ms.search.form: Semantic Link
---

# What is Semantic Link?

Semantic Link is a feature that allows you to establish a connection between [Power BI datasets](/power-bi/connect-data/service-datasets-understand) and [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] in Microsoft Fabric.
Use of Semantic Link is only supported in Microsoft Fabric.

[!INCLUDE [preview-note](../includes/preview-note.md)]

The primary goals of Semantic Link are to facilitate data connectivity, enable the propagation of semantic information, and seamlessly integrate with established tools used by data scientists, such as [notebooks](../data-engineering/how-to-use-notebook.md).
Semantic Link helps you to preserve domain knowledge about data semantics in a standardized way that can speed up data analysis and reduce errors.

## Overview of Semantic Link

The data flow starts with Power BI datasets that contain data and semantic information. Semantic Link bridges the gap between Power BI and the Data Science experience.

:::image type="content" source="media/semantic-link-overview/data-flow-with-semantic-link.png" alt-text="A diagram that shows data flow from Power BI to notebooks in Synapse Data Science and back to Power BI.":::

With Semantic Link, you can use datasets from Power BI in the Data Science experience to perform tasks such as in-depth statistical analysis and predictive modeling with machine learning techniques.
The output of your data science work can be stored in [OneLake](../onelake/onelake-overview.md) using Apache Spark and ingested into Power BI using [Direct Lake](/power-bi/enterprise/directlake-overview).

## Power BI connectivity

Power BI datasets serve as the single [semantic model](/analysis-services/tom/introduction-to-the-tabular-object-model-tom-in-analysis-services-amo), providing a reliable source for semantic definitions, such as Power BI measures. To connect to Power BI datasets:

- Semantic Link offers data connectivity to the Python [pandas](https://pandas.pydata.org/) ecosystem via the [SemPy Python library](/python/api/semantic-link-sempy/), making it easy for data scientists to work with the data.

## Applications of semantic information

Semantic information in data includes Power BI [data categories](/power-bi/transform-model/desktop-data-categorization) such as address and postal code, relationships between tables, and hierarchical information.
These data categories comprise metadata that Semantic Link propagates into the Data Science environment to enable new experiences and maintain data lineage. Some example applications of Semantic Link are:
- Intelligent suggestions of built-in [semantic functions](semantic-link-semantic-functions.md).
- Innovative integration for augmenting data with Power BI measures through the use of [add-measures](semantic-link-power-bi.md#data-augmentation-with-power-bi-measures).
- Tools for [data quality validation](semantic-link-validate-data.md) based on the relationships between tables and functional dependencies within tables.

Semantic Link is a powerful tool that enables business analysts to use data effectively in a comprehensive data science environment.
Semantic Link facilitates seamless collaboration between data scientists and business analysts by eliminating the need to reimplement business logic embedded in [Power BI measures](/power-bi/transform-model/desktop-measures#understanding-measures). This approach ensures that both parties can work efficiently and productively, maximizing the potential of their data-driven insights.

## `FabricDataFrame` data structure

[FabricDataFrame](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe) is the core data structure of Semantic Link.
It subclasses the [pandas DataFrame](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html) and adds metadata, such as semantic information and lineage.
FabricDataFrame is the primary data structure that Semantic Link uses to propagate semantic information from Power BI datasets into the Data Science environment.

:::image type="content" source="media/semantic-link-overview/semantic-link-overview-fabricdataframes.svg" alt-text="A diagram that shows data flow from connectors to Power BI datasets to FabricDataFrame to Semantic Functions.":::

FabricDataFrame supports all pandas operations and more.
It exposes semantic functions and the [add-measure](semantic-link-power-bi.md#data-augmentation-with-power-bi-measures) method that enable you to use Power BI measures in your data science work.

## Next steps

- [Deepen your expertise of SemPy through the SemPy reference documentation](/python/api/semantic-link-sempy/)
- [Learn more about Semantic Link and Power BI connectivity](semantic-link-power-bi.md)
- [How to validate data with Semantic Link](semantic-link-validate-data.md)
- [Explore and validate relationships in Power BI datasets](semantic-link-validate-relationship.md)