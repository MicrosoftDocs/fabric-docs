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
<!-- 2. Introductory paragraph ----------------------------------------------------------

Required: The introductory paragraph helps customers quickly determine whether an article is
relevant. Describe in customer-friendly terms what the service is and does, and why the customer
should care. Keep it short for the intro. You can go into more detail later in the article. Many
services add artwork or videos below the introduction.

-->

Semantic Link is a feature that establishes a connection between [Power BI datasets](../power-bi/connect-data/service-datasets-understand) and the Data Science workload in Microsoft Fabric. Its primary goal is to facilitate data connectivity, enable the propagation of semantic information, and seamlessly integrate with established tools used by data scientists.
You can preserve subject matter experts' knowledge about data semantics in a standardized form to help make the analysis faster and with fewer errors.

:::image type="content" source="media/semantic-link/overview.png" alt-text="Graphic showing the data flow from Power BI to notebooks to Power BI." lightbox="media/semantic-link/overview.png":::

[!INCLUDE [preview-note](../includes/preview-note.md)]

<!-- 3. Article body ------------------------------------------------------------ Required: After
the intro, you can develop your overview by discussing the features that answer the "Why should I
care" question with a bit more depth. Be sure to call out any basic requirements and dependencies,
as well as limitations or overhead. Don't catalog every feature, and some may only need to be
mentioned as available, without any discussion.

-->

The graph visualizes the data flow, starting with data and semantic information stored in Power BI datasets. Semantic Link bridges the gap into the data science experience enabling tasks such as in-depth statistical analysis and predictive modeling using machine learning techniques.
The output of the data science work can be stored in [One Lake](../fabric/onelake/onelake-overview) using Apache Spark and ingested into Power BI using [Direct Lake](../power-bi/enterprise/directlake-overview).

Semantic Link is a powerful tool designed to enable business analysts to use their data effectively in a comprehensive data science environment, such as [notebooks](../fabric/data-engineering/how-to-use-notebook). It aims to facilitate seamless collaboration between data scientists and business analysts by eliminating the need to reimplement business logic embedded in [Power BI measures](../power-bi/transform-model/desktop-measures#understanding-measures). This approach ensures that both parties can work efficiently and productively, maximizing the potential of their data-driven insights.

## Power BI Connectivity

Power BI datasets serve as the single [semantic model](../analysis-services/tom/introduction-to-the-tabular-object-model-tom-in-analysis-services-amo?view=asallproducts-allversions), providing a reliable source for semantic definitions, such as Power BI measures.

Semantic Link offers data connectivity to the Python [Pandas](https://pandas.pydata.org/) ecosystem via the SemPy Python library, making it easy for data scientists to work with the data.

For data scientists who are more familiar with the [Apache Spark](https://spark.apache.org/) ecosystem, Semantic Link provides access to Power BI datasets through the Spark native connector. This implementation supports a wide range of languages, including PySpark, Spark SQL, R, and Scala.

Both implementations are subject to Power BI backend limitations (see [details](read-write-powerbi.md#read-limitations)).

## Applications of Semantic Information

Semantic information includes Power BI [data categories](../power-bi/transform-model/desktop-data-categorization) such as address and postal code, relationships between tables and hierarchical information.
Semantic Link propagates this metadata into the data science environment, which enables new experiences and maintains data lineage.

Examples of the capabilities provided by Semantic Link include intelligent suggestions of built-in [semantic functions](./semantic-link-powerbi.md#semantic-functions) and innovative integration for augmenting data with Power BI measures through [measure-joins](./semantic-link-powerbi.md#measure-join).

## Next steps
<!-- 5. Next steps ------------------------------------------------------------------------

Required: In Overview articles, provide at least one next step and no more than three. Next steps in
overview articles will often link to a quickstart. Use regular links; do not use a blue box link.
What you link to will depend on what is really a next step for the customer. Do not use a "More info
section" or a "Resources section" or a "See also section".

TODO: Add your next step link(s) -->

- [Learn more about Semantic Link and Power BI connectivity](semantic-link-powerbi.md)
- [How to explore data with Semantic Link](semantic-link-explore-data.md)
- [How to validate data with Semantic Link](semantic-link-validate-data.md)
