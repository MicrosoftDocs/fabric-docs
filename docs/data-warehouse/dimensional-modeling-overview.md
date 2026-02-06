---
title: "Dimensional Modeling"
description: "Learn about dimensional modeling in Microsoft Fabric Data Warehouse."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: drubiolo, chweb
ms.date: 04/06/2025
ms.topic: concept-article
ms.custom:
  - fabric-cat
---

# Dimensional modeling in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article is the first in a series about dimensional modeling inside a warehouse. It provides practical guidance for [[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in Microsoft Fabric](data-warehousing.md), which is an experience that supports many T-SQL capabilities, like creating tables and managing data in tables. So, you're in complete control of creating your dimensional model tables and loading them with data.

> [!NOTE]
> In this article, the term _data warehouse_ refers to an enterprise data warehouse, which delivers comprehensive integration of critical data across the organization. In contrast, the standalone term _warehouse_ refers to a Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)], which is a software as a service (SaaS) relational database offering that you can use to implement a data warehouse. For clarity, in this article the latter is mentioned as _Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)]_.

> [!TIP]
> If you're inexperienced with dimensional modeling, consider that this series of articles is your first step. It isn't intended to provide a complete discussion on dimensional modeling design. For more information, refer directly to widely adopted published content, like _The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling_ (3rd edition, 2013) by Ralph Kimball, and others.

## Star schema design

_Star schema_ is a dimensional modeling design technique adopted by relational data warehouses. It's a recommended design approach to take when creating a Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. A star schema comprises _fact tables_ and _dimension tables_.

- **Dimension tables** describe the entities relevant to your organization and analytics requirements. Broadly, they represent the things that you model. Things could be products, people, places, or any other concept, including date and time. For more information and design best practices, see [Dimension tables](dimensional-modeling-dimension-tables.md) in this series.
- **Fact tables** store measurements associated with observations or events. They can store sales orders, stock balances, exchange rates, temperature readings, and more. Fact tables contain dimension keys together with granular values that can be aggregated. For more information and design best practices, see [Fact tables](dimensional-modeling-fact-tables.md) in this series.

A star schema design is optimized for analytic query workloads. For this reason, it's considered a prerequisite for enterprise Power BI [semantic models](/power-bi/connect-data/service-datasets-understand). Analytic queries are concerned with filtering, grouping, sorting, and summarizing data. Fact data is summarized within the context of filters and groupings of the related dimension tables.

The reason why it's called a star schema is because a fact table forms the center of a star while the related dimension tables form the points of the star.

:::image type="content" source="media/dimensional-modeling-overview/star-schema.svg" alt-text="Diagram shows an illustration of a star schema for sales facts. There are five dimensions, each located at a point of the star.":::

A star schema often contains multiple fact tables, and therefore multiple stars.

A well-designed star schema delivers high performance (relational) queries because of fewer table joins, and the higher likelihood of useful indexes. Also, a star schema often requires low maintenance as the data warehouse design evolves. For example, adding a new column to a dimension table to support analysis by a new attribute is a relatively simple task to perform. As is adding new facts and dimensions as the scope of the data warehouse evolves.

Periodically, perhaps daily, the tables in a dimensional model are updated and loaded by an Extract, Transform, and Load (ETL) process. This process synchronizes its data with the source systems, which store operational data. For more information, see [Load tables](dimensional-modeling-load-tables.md) in this series.

## Dimensional modeling for Power BI

For enterprise solutions, a dimensional model in a Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is a recommended prerequisite for creating a Power BI [semantic model](/power-bi/connect-data/service-datasets-understand). Not only does the dimensional model support the semantic model, but it's also a source of data for other experiences, like [machine learning models](../data-science/machine-learning-model.md).

However, in specific circumstances it might not be the best approach. For example, self-service analysts who need freedom and agility to act quickly, and without dependency on IT, might create semantic models that connect directly to source data. In such cases, the theory of dimensional modeling is still relevant. That theory helps analysts create intuitive and efficient models, while avoiding the need to create and load a dimensional model in a data warehouse. Instead, a quasi-dimensional model can be created by using [Power Query](/power-query/power-query-what-is-power-query), which defines the logic to connect to, and transform, source data to create and load the semantic model tables. For more information, see [Understand star schema and the importance for Power BI](/power-bi/guidance/star-schema).

> [!IMPORTANT]
> When you use Power Query to define a dimensional model in the semantic model, you aren't able to [manage historical change](dimensional-modeling-dimension-tables.md#manage-historical-change), which might be necessary to analyze the past accurately. If that's a requirement, you should create a data warehouse and allow periodic ETL processes to capture and appropriately store dimension changes.

<a id="planning-for-a-data-warehouse"></a>

## Plan for a data warehouse

You should approach the creation of a data warehouse and the design of a dimension model as a serious and important undertaking. That's because the data warehouse is a core component of your data platform. It should form a solid foundation that supports analytics and reporting—and therefore decision making—for your entire organization.

To this end, your data warehouse should strive to store quality, conformed, and historically accurate data as a _single version of the truth_. It should deliver understandable and navigable data with fast performance, and enforce permissions so that the right data can only ever be accessed by the right people. Strive to design your data warehouse for resilience, allowing it to adapt to change as your requirements evolve.

The successful implementation of a data warehouse depends on good planning. For information about strategic and tactical considerations, and action items that lead to the successful adoption of Fabric and your data warehouse, see the [Microsoft Fabric adoption roadmap](/power-bi/guidance/fabric-adoption-roadmap).

> [!TIP]
> We recommend that you build out your enterprise data warehouse iteratively. Start with the most important subject areas first, and then over time, according to priority and resources, extend the data warehouse with other subject areas.

## Related content

In the next article in this series, learn about guidance and design best practices for [dimension tables](dimensional-modeling-dimension-tables.md).
