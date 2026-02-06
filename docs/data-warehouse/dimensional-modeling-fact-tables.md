---
title: "Modeling Fact Tables in Warehouse"
description: "Learn about fact tables in Microsoft Fabric Warehouse."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: drubiolo, chweb
ms.date: 04/06/2025
ms.topic: concept-article
ms.custom:
  - fabric-cat
---

# Dimensional modeling in Microsoft Fabric Warehouse: Fact tables

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [dimensional-modeling-series](includes/dimensional-modeling-series.md)]

This article provides you with guidance and best practices for designing **fact** tables in a dimensional model. It provides practical guidance for [[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in Microsoft Fabric](data-warehousing.md), which is an experience that supports many T-SQL capabilities, like creating tables and managing data in tables. So, you're in complete control of creating your dimensional model tables and loading them with data.

> [!NOTE]
> In this article, the term _data warehouse_ refers to an enterprise data warehouse, which delivers comprehensive integration of critical data across the organization. In contrast, the standalone term _warehouse_ refers to a Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)], which is a software as a service (SaaS) relational database offering that you can use to implement a data warehouse. For clarity, in this article the latter is mentioned as _Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)]_.

> [!TIP]
> If you're inexperienced with dimensional modeling, consider this series of articles your first step. It isn't intended to provide a complete discussion on dimensional modeling design. For more information, refer directly to widely adopted published content, like _The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling_ (3rd edition, 2013) by Ralph Kimball, and others.

In a dimensional model, a fact table stores measurements associated with observations or events. It could store sales orders, stock balances, exchange rates, temperature readings, and more.

Fact tables include measures, which are typically numeric columns, like sales order quantity. Analytic queries summarize measures (by using sum, count, average, and other functions) within the context of dimension filters and groupings.

Fact tables also include dimension keys, which determine the _dimensionality_ of the facts. The dimension key values determine the _granularity_ of the facts, which is the atomic level by which facts are defined. For example, an order date dimension key in a sales fact table sets the granularity of the facts at date level, while a target date dimension key in a sales target fact table could set the granularity at quarter level.

> [!NOTE]
> While it's possible to store facts at a higher granularity, it's not easy to split out measure values to lower levels of granularity (if required). Sheer data volumes, together with analytic requirements, might provide valid reason to store higher granularity facts but at the expense of detailed analysis.

To easily identify fact tables, you typically prefix their names with `f_` or `Fact_`.

## Fact table structure

To describe the structure of a fact table, consider the following example of a sales fact table named `f_Sales`. This example applies good design practices. Each of the groups of columns is described in the following sections.

```sql
CREATE TABLE f_Sales
(
    --Dimension keys
    OrderDate_Date_FK INT NOT NULL,
    ShipDate_Date_FK INT NOT NULL,
    Product_FK INT NOT NULL,
    Salesperson_FK INT NOT NULL,
    <...>
    
    --Attributes
    SalesOrderNo INT NOT NULL,
    SalesOrderLineNo SMALLINT NOT NULL,
    
    --Measures
    Quantity INT NOT NULL,
    <...>
    
    --Audit attributes
    AuditMissing BIT NOT NULL,
    AuditCreatedDate DATE NOT NULL,
    AuditCreatedBy VARCHAR(15) NOT NULL,
    AuditLastModifiedDate DATE NOT NULL,
    AuditLastModifiedBy VARCHAR(15) NOT NULL
);
```

### Primary key

As is the case in the example, the sample fact table doesn't have a [primary key](table-constraints.md). That's because it doesn't typically serve a useful purpose, and it would unnecessarily increase the table storage size. A primary key is often implied by the set of dimension keys and attributes.

### Dimension keys

The sample fact table has various _dimension keys_, which determine the dimensionality of the fact table. Dimension keys are references to the surrogate keys (or higher-level attributes) in the related dimensions.

> [!NOTE]
> It's an unusual fact table that doesn't include at least one date dimension key.

A fact table can reference a dimension multiple times. In this case, it's known as a [role-playing dimension](dimensional-modeling-dimension-tables.md#role-playing-dimensions). In this example, the fact table has the `OrderDate_Date_FK` and `ShipDate_Date_FK` dimension keys. Each dimension key represents a distinct _role_, yet there's only one physical date dimension.

It's a good practice to set each dimension key as `NOT NULL`. During the fact table load, you can use [special dimension members](dimensional-modeling-dimension-tables.md#special-dimension-members) to represent missing, unknown, N/A, or error states (if necessary).

### Attributes

The sample fact table has two _attributes_. Attributes provide additional information and set the granularity of fact data, but they're neither dimension keys nor dimension attributes, nor measures. In this example, attribute columns store sales order information. Other examples could include tracking numbers or ticket numbers. For analysis purposes, an attribute could form a [degenerate dimension](dimensional-modeling-dimension-tables.md#degenerate-dimensions).

### Measures

The sample fact table also has _measures_, like the `Quantity` column. Measure columns are typically numeric and commonly additive (meaning they can be summed, and summarized by using other aggregations). For more information, see [Measure types](#measure-types) later in this article.

### Audit attributes

The sample fact table also has various _audit attributes_. Audit attributes are optional. They allow you to track when and how fact records were created or modified, and they can include diagnostic or troubleshooting information raised during Extract, Transform, and Load (ETL) processes. For example, you'll want to track who (or what process) updated a row, and when. Audit attributes can also help diagnose a challenging problem, like when an ETL process stops unexpectedly.

## Fact table size

Fact tables vary in size. Their size corresponds to the dimensionality, granularity, number of measures, and amount of history. In comparison to dimension tables, fact tables are more narrow (fewer columns) but big _or even immense_ in terms of rows (in excess of billions).

## Fact design concepts

This section describes various fact design concepts.

### Fact table types

There are three types of fact tables:

- Transaction fact tables
- Periodic snapshot fact tables
- Accumulating snapshot fact tables

#### Transaction fact tables

A _transaction fact table_ stores business events or transactions. Each row stores facts in terms of dimension keys and measures, and optionally other attributes. All the data is fully known when inserted, and it never changes (except to correct errors).

Typically, transaction fact tables store facts at the lowest possible level of granularity, and they contain measures that are [additive](#additive-measures) across all dimensions. A sales fact table that stores every sales order line is a good example of a transaction fact table.

#### Periodic snapshot fact tables

A _periodic snapshot fact_ table stores measurements at a predefined time, or specific intervals. It provides a summary of key metrics or performance indicators over time, and so it's useful for trend analysis and monitoring change over time. Measures are always [semi-additive](#semi-additive-measures) (described later).

An inventory fact table is a good example of a periodic snapshot table. It's loaded every day with the end-of-day stock balance of every product.

Periodic snapshot tables can be used instead of a transaction fact table when recording large volumes of transactions is expensive, and it doesn't support any useful analytic requirement. For example, there might be millions of stock movements in a day (which could be stored in a transaction fact table), but your analysis is only concerned with trends of end-of-day stock levels.

#### Accumulating snapshot fact tables

An _accumulating snapshot fact_ table stores measurements that accumulate across a well-defined period or workflow. It often records the state of a business process at distinct stages or milestones, which might take days, weeks, or even months to complete.

A fact row is loaded soon after the first event in a process, and then the row is updated in a predictable sequence every time a milestone event occurs. Updates continue until the process completes.

Accumulating snapshot fact table have multiple date dimension keys, each representing a milestone event. Some dimension keys might record a [N/A state](dimensional-modeling-dimension-tables.md#special-dimension-members) until the process arrives at a certain milestone. Measures typically record durations. Durations between milestones can provide valuable insight into a business workflow or assembly process.

### Measure types

Measures are typically numeric, and commonly additive. However, some measures can't always be added. These measures are categorized as either semi-additive or non-additive.

#### Additive measures

An _additive measure_ can be summed across any dimension. For example, order quantity and sales revenue are additive measures (providing revenue is recorded for a single currency).

#### Semi-additive measures

A _semi-additive measure_ can be summed across certain dimensions only.

Here are some examples of semi-additive measures.

- Any measure in a periodic snapshot fact table can't be summed across other time periods. For example, you shouldn't sum the age of an inventory item sampled nightly, but you could sum the age of all inventory items on a shelf, each night.
- A stock balance measure in an inventory fact table can't be summed across other products.
- Sales revenue in a sales fact table that has a currency dimension key can't be summed across currencies.

#### Non-additive measures

A _non-additive measure_ can't be summed across any dimension. One example is a temperature reading, which by its nature doesn't make sense to add to other readings.

Other examples include rates, like unit prices, and ratios. However, it's considered a better practice to store the values used to compute the ratio, which allows the ratio to be calculated if needed. For example, a discount percentage of a sales fact could be stored as a discount amount measure (to be divided by the sales revenue measure). Or, the age of an inventory item on the shelf shouldn't be summed over time, but you might observe a trend in the average age of inventory items.

While some measures can't be summed, they're still valid measures. They can be aggregated by using count, distinct count, minimum, maximum, average, and others. Also, non-additive measures can become additive when they're used in calculations. For example, unit price multiplied by order quantity produces sales revenue, which is additive.

### Factless fact tables

When a fact table doesn't contain any measure columns, it's called a _factless fact table_. A factless fact table typically records events or occurrences, like students attending class. From an analytics perspective, a measurement can be achieved by counting fact rows.

### Aggregate fact tables

An _aggregate fact table_ represents a rollup of a base fact table to a lower dimensionality and/or higher granularity. Its purpose is to accelerate query performance for commonly queried dimensions.

> [!NOTE]
> A Power BI semantic model can generate [user-defined aggregations](/power-bi/transform-model/aggregations-advanced) to achieve the same result, or use the data warehouse aggregate fact table by using [DirectQuery storage mode](/power-bi/transform-model/aggregations-advanced#storage-modes).

## Related content

In the next article in this series, learn about guidance and design best practices for [loading dimensional model tables](dimensional-modeling-load-tables.md).
