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

Semantic Link establishes a connection between Power BI datasets and the Data Science workload in Microsoft Fabric.
The feature aims to provide data connectivity, propagation of semantic information and seemless integration with established tools used by data scientists.
You can preserve subject matter experts' knowledge about data semantics in a standardized form to help make the analysis faster and with less errors.

[!INCLUDE [preview-note](../includes/preview-note.md)]

<!-- 3. Article body ------------------------------------------------------------ Required: After
the intro, you can develop your overview by discussing the features that answer the "Why should I
care" question with a bit more depth. Be sure to call out any basic requirements and dependencies,
as well as limitations or overhead. Don't catalog every feature, and some may only need to be
mentioned as available, without any discussion.

-->

Power BI datasets act as the single semantic model and the source of truth for semantic definitions, such as Power BI measures.

Semantic Link supports data connectivity to the Python [Pandas](https://pandas.pydata.org/) ecosystem through the SemPy Python library.

Data scientist more familiar with the [Apache Spark](https://spark.apache.org/) ecosystem can gain access to Power BI datasets through the Semantic Link Spark native connector.
The implementation enables a wide variety of languages: PySpark, Spark SQL, R and Scala.

Furthermore, Semantic Link implements [semantic propagation](./semantic-link-powerbi.md#semantic-propagation) to enable downstream task such as [measure-join](./semantic-link-powerbi.md#measure-join) and intelligent suggestion of built-in [semantic functions](./semantic-link-powerbi.md#semantic-functions). It does so by maintaining metadata across data transformations.

## TODO: add second heading
<!-- Top tasks ------------------------------------------------------------------------------

Suggested: An effective way to structure you overview article is to create an H2 for the top
customer tasks you identified during the [planning process](../contribute/content-dev-plan.md) and
describe how the product/service helps customers with that task.

Create a new H2 for each task you list.

--->

## TODO: add third heading
<!-- Top tasks ------------------------------------------------------------------------------

Suggested: An effective way to structure you overview article is to create an H2 for the top
customer tasks you identified during the [planning process](../contribute/content-dev-plan.md) and
describe how the product/service helps customers with that task.

Create a new H2 for each task you list.

--->

## Next steps
<!-- 5. Next steps ------------------------------------------------------------------------

Required: In Overview articles, provide at least one next step and no more than three. Next steps in
overview articles will often link to a quickstart. Use regular links; do not use a blue box link.
What you link to will depend on what is really a next step for the customer. Do not use a "More info
section" or a "Resources section" or a "See also section".

TODO: Add your next step link(s) -->