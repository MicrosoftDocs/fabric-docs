---
title: What is semantic link?
description: Get an overview of semantic link, which lets you connect semantic models to Synapse Data Science in Microsoft Fabric.
ms.author: jburchel
author: jonburchel
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: overview
ms.custom: 
ms.date: 07/16/2025
ms.search.form: semantic link
---

# What is semantic link?

Semantic link is a feature that allows you to establish a connection between [semantic models](/power-bi/connect-data/service-datasets-understand) and [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] in Microsoft Fabric.
Use of semantic link is supported only in Microsoft Fabric.

- For Spark 3.4 and above, semantic link is available in the default runtime when using Fabric, and there's no need to install it.
- For Spark 3.3 or below, or to update to the latest version of semantic link, run the following command:

  ```python
  %pip install -U semantic-link
  ```

The primary goals of semantic link are to:

- Facilitate data connectivity.
- Enable the propagation of semantic information.
- Seamlessly integrate with established tools data scientists use, such as [notebooks](../data-engineering/how-to-use-notebook.md).

Semantic link helps you preserve domain knowledge about data semantics in a standardized way that can speed up data analysis and reduce errors.

## Semantic link data flow

The semantic link data flow starts with semantic models that contain data and semantic information. Semantic link bridges the gap between Power BI and the Synapse Data Science experience.

:::image type="content" source="media/semantic-link-overview/data-flow-with-semantic-link.png" alt-text="A diagram that shows data flow from Power BI to notebooks in Synapse Data Science and back to Power BI." border="false":::

Semantic link allows you to use semantic models from Power BI in the Synapse Data Science experience to perform tasks such as in-depth statistical analysis and predictive modeling with machine learning techniques. You can store the output of your data science work into [OneLake](../onelake/onelake-overview.md) by using Apache Spark, and ingest the stored output into Power BI by using [Direct Lake](../fundamentals/direct-lake-overview.md).

## Power BI connectivity

A semantic model serves as a single [tabular object model](/analysis-services/tom/introduction-to-the-tabular-object-model-tom-in-analysis-services-amo) that provides reliable sources for semantic definitions such as Power BI measures. Semantic link connects to semantic models in the following ecosystems, making it easy for data scientists to work in the system they're most familiar with.

- Python [pandas](https://pandas.pydata.org/) ecosystem, through the [SemPy Python library](/python/api/semantic-link-sempy/).
- [Apache Spark](https://spark.apache.org/) ecosystem, through the **Spark native connector**. This implementation supports various languages, including PySpark, Spark SQL, R, and Scala.

## Applications of semantic information

Semantic information in data includes Power BI [data categories](/power-bi/transform-model/desktop-data-categorization) such as address and postal code, relationships between tables, and hierarchical information.

These data categories comprise metadata that semantic link propagates into the Synapse Data Science environment to enable new experiences and maintain data lineage.

Some example applications of semantic link include:

- Intelligent suggestions of built-in [semantic functions](semantic-link-semantic-functions.md).
- Innovative integration for augmenting data with Power BI measures, by using [add-measures](semantic-link-power-bi.md#data-augmentation-with-power-bi-measures).
- Tools for [data quality validation](semantic-link-validate-data.md) based on the relationships between tables and functional dependencies within tables.

Semantic link is a powerful tool that enables business analysts to use data effectively in a comprehensive data science environment.

Semantic link facilitates seamless collaboration between data scientists and business analysts by eliminating the need to reimplement business logic embedded in [Power BI measures](/power-bi/transform-model/desktop-measures#understanding-measures). This approach ensures that both parties can work efficiently and productively, maximizing the potential of their data-driven insights.

## FabricDataFrame data structure

[FabricDataFrame](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe) is the primary data structure that semantic link uses to propagate semantic information from semantic models into the Synapse Data Science environment.

:::image type="content" source="media/semantic-link-overview/semantic-link-overview-fabric-dataframes.png" alt-text="A diagram that shows data flow from connectors to semantic models to FabricDataFrame to semantic functions." lightbox="media/semantic-link-overview/semantic-link-overview-fabric-dataframes.png" border="false":::

The `FabricDataFrame` class:

- Supports all pandas operations.
- Subclasses the [pandas DataFrame](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html) and adds metadata, such as semantic information and lineage.
- Exposes semantic functions and the [add-measure](semantic-link-power-bi.md#data-augmentation-with-power-bi-measures) method that lets you use Power BI measures in data science work.

## Related content

- [Explore the reference documentation for the Python semantic link package (SemPy)](/python/api/semantic-link/overview-semantic-link/)
- [Tutorial: Clean data with functional dependencies](tutorial-data-cleaning-functional-dependencies.md)
- [Power BI connectivity with semantic link and Microsoft Fabric](semantic-link-power-bi.md)
- [Explore and validate data by using semantic link](semantic-link-validate-data.md)
- [Explore and validate relationships in semantic models](semantic-link-validate-relationship.md)
