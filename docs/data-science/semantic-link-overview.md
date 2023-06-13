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

Semantic Link is a feature that allows you to establish a connection between [Power BI datasets](/power-bi/connect-data/service-datasets-understand) and [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] in Microsoft Fabric. The primary goals of Semantic Link are to facilitate data connectivity, enable the propagation of semantic information, and seamlessly integrate with established tools used by data scientists. Semantic Link helps you to preserve domain knowledge about data semantics in a standardized way that can speed up data analysis and reduce errors.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Overview of Semantic Link

The data flow starts with Power BI datasets that contain data and semantic information. Semantic Link bridges the gap between Power BI and the Data Science experience.

:::image type="content" source="media/semantic-link-overview/data-flow-with-semantic-link.png" alt-text="Graphic showing the data flow from Power BI to notebooks in Synapse Data Science and back to Power BI.":::

With Semantic Link, you can use datasets from Power BI in the Data Science experience to perform tasks such as in-depth statistical analysis and predictive modeling with machine learning techniques. The output of your data science work can be stored in [OneLake](../onelake/onelake-overview.md) using Apache Spark and ingested into Power BI using [Direct Lake](/power-bi/enterprise/directlake-overview).

## Power BI Connectivity

Power BI datasets serve as the single [semantic model](/analysis-services/tom/introduction-to-the-tabular-object-model-tom-in-analysis-services-amo), providing a reliable source for semantic definitions, such as Power BI measures. To connect to Power BI datasets:

- Semantic Link offers data connectivity to the Python [Pandas](https://pandas.pydata.org/) ecosystem via the **SemPy Python library**, making it easy for data scientists to work with the data.
- Semantic Link provides access to Power BI datasets through the **Spark native connector** for data scientists that are more familiar with the [Apache Spark](https://spark.apache.org/) ecosystem. This implementation supports various languages, including PySpark, Spark SQL, R, and Scala.

## Applications of Semantic Information

Semantic information in data includes Power BI [data categories](/power-bi/transform-model/desktop-data-categorization) such as address and postal code, relationships between tables, and hierarchical information. These data categories comprise metadata that Semantic Link propagates into the data science environment to enable new experiences and maintain data lineage.

Examples of the capabilities provided by Semantic Link include: intelligent suggestions of built-in [semantic functions](./semantic-link-powerbi.md#semantic-functions) and innovative integration for augmenting data with Power BI measures through [measure-joins](./semantic-link-powerbi.md#measure-join).

Semantic Link is a powerful tool designed to enable business analysts to use their data effectively in a comprehensive data science environment, such as [notebooks](../data-engineering/how-to-use-notebook.md). It aims to facilitate seamless collaboration between data scientists and business analysts by eliminating the need to reimplement business logic embedded in [Power BI measures](../power-bi/transform-model/desktop-measures#understanding-measures). This approach ensures that both parties can work efficiently and productively, maximizing the potential of their data-driven insights.

## Next steps

- [Learn more about Semantic Link and Power BI connectivity](semantic-link-powerbi.md)
- [How to explore data with Semantic Link](semantic-link-explore-data.md)
- [How to validate data with Semantic Link](semantic-link-validate-data.md)
