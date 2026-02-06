---
title: "Modeling Dimension Tables in Warehouse"
description: "Learn about dimension tables in Microsoft Fabric Warehouse."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: drubiolo, chweb
ms.date: 04/06/2025
ms.topic: concept-article
ms.custom:
  - fabric-cat
---

# Dimensional modeling in Microsoft Fabric Warehouse: Dimension tables

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [dimensional-modeling-series](includes/dimensional-modeling-series.md)]

This article provides you with guidance and best practices for designing **dimension** tables in a dimensional model. It provides practical guidance for [[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in Microsoft Fabric](data-warehousing.md), which is an experience that supports many T-SQL capabilities, like creating tables and managing data in tables. So, you're in complete control of creating your dimensional model tables and loading them with data.

> [!NOTE]
> In this article, the term _data warehouse_ refers to an enterprise data warehouse, which delivers comprehensive integration of critical data across the organization. In contrast, the standalone term _warehouse_ refers to a Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)], which is a software as a service (SaaS) relational database offering that you can use to implement a data warehouse. For clarity, in this article the latter is mentioned as _Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)]_.

> [!TIP]
> If you're inexperienced with dimensional modeling, consider this series of articles your first step. It isn't intended to provide a complete discussion on dimensional modeling design. For more information, refer directly to widely adopted published content, like _The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling_ (3rd edition, 2013) by Ralph Kimball, and others.

In a dimensional model, a dimension table describes an entity relevant to your business and analytics requirements. Broadly, dimension tables represent the _things_ that you model. Things could be products, people, places, or any other concept, including date and time. To easily identify dimension tables, you typically prefix their names with `d_` or `Dim_`.

## Dimension table structure

To describe the structure of a dimension table, consider the following example of a salesperson dimension table named `d_Salesperson`. This example applies good design practices. Each of the groups of columns is described in the following sections.

```sql
CREATE TABLE d_Salesperson
(
    --Surrogate key
    Salesperson_SK INT NOT NULL,
    
    --Natural key(s)
    EmployeeID VARCHAR(20) NOT NULL,
    
    --Dimension attributes
    FirstName VARCHAR(20) NOT NULL,
    <...>
    
    --Foreign key(s) to other dimensions
    SalesRegion_FK INT NOT NULL,
    <...>
    
    --Historical tracking attributes (SCD type 2)
    RecChangeDate_FK INT NOT NULL,
    RecValidFromKey INT NOT NULL,
    RecValidToKey INT NOT NULL,
    RecReason VARCHAR(15) NOT NULL,
    RecIsCurrent BIT NOT NULL,
    
    --Audit attributes
    AuditMissing BIT NOT NULL,
    AuditIsInferred BIT NOT NULL,
    AuditCreatedDate DATE NOT NULL,
    AuditCreatedBy VARCHAR(15) NOT NULL,
    AuditLastModifiedDate DATE NOT NULL,
    AuditLastModifiedBy VARCHAR(15) NOT NULL
);
```

### Surrogate key

The sample dimension table has a _surrogate key_, which is named `Salesperson_SK`. A surrogate key is a single-column unique identifier that's generated and stored in the dimension table. It's a [primary key](table-constraints.md) column used to relate to other tables in the dimensional model.

Surrogate keys strive to insulate the data warehouse from changes in source data. They also deliver many other benefits, allowing you to:

- Consolidate multiple data sources (avoiding clash of duplicate identifiers).
- Consolidate multi-column natural keys into a more efficient, single-column key.
- Track dimension history with a [slowly changing dimension (SCD) type 2](#scd-type-2).
- Limit fact table width for storage optimization (by selecting the smallest possible integer data type).

A surrogate key column is a recommended practice, even when a natural key (described next) seems an acceptable candidate. You should also avoid giving meaning to the key values (except for date and time dimension keys, as described later).

### Natural keys

The sample dimension table also has a _natural key_, which is named `EmployeeID`. A natural key is the key stored in the source system. It allows relating the dimension data to its source system, which is typically done by an Extract, Load, and Transform (ETL) process to load the dimension table. Sometimes a natural key is called a _business key_, and its values might be meaningful to business users.

Sometimes dimensions don't have a natural key. That could be the case for your [date dimension](#date-dimension) or lookup dimensions, or when you generate dimension data by normalizing a flat file.

### Dimension attributes

A sample dimension table also has _dimension attributes_, like the `FirstName` column. Dimension attributes provide context to the numeric data stored in related fact tables. They're typically text columns that are used in analytic queries to filter and group (slice and dice), but not to be aggregated themselves. Some dimension tables contain few attributes, while others contain many attributes (as many as it takes to support the query requirements of the dimensional model).

> [!TIP]
> A good way to determine which dimensions and attributes you need is to find the right people and ask the right questions. Specifically, stay alert for the mention of the word _by_. For example, when someone says they need to analyze sales _by_ salesperson, _by_ month, and _by_ product category, they're telling you that they need dimensions that have those attributes.

If you plan to create a [Direct Lake semantic model](../fundamentals/direct-lake-overview.md), you should include all possible columns required for filtering and grouping as dimension attributes. That's because Direct Lake semantic models don't support calculated columns.

### Foreign keys

The sample dimension table also has a _foreign key_, which is named `SalesRegion_FK`. Other dimension tables can reference a foreign key, and their presence in a dimension table is a special case. It indicates that the table is related to another dimension table, meaning that it might form part of a [snowflake dimension](#snowflake-dimensions) or it's related to an [outrigger dimension](#outrigger-dimensions).

Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)] [supports foreign key constraints](table-constraints.md#table-constraints) but they can't be enforced. Therefore, it's important that your ETL process tests for integrity between related tables when data is loaded.  

It's still a good idea to create foreign keys. One good reason to create unenforced foreign keys is to allow modeling tools, like Power BI Desktop, to automatically detect and create relationships between tables in the semantic model.

### Historical tracking attributes

The sample dimension table also has various _historical tracking attributes_. Historical tracking attributes are optional based on your need to track specific changes as they occur in the source system. They allow storing values to support the primary role of a data warehouse, which is to describe the past accurately. Specifically, these attributes store historical context as the ETL process loads new or changed data into the dimension.

For more information, see [Manage historical change](#manage-historical-change) later in this article.

### Audit attributes

The sample dimension table also has various _audit attributes_. Audit attributes are optional but recommended. They allow you to track when and how dimension records were created or modified, and they can include diagnostic or troubleshooting information raised during ETL processes. For example, you'll want to track who (or what process) updated a row, and when. Audit attributes can also help diagnose a challenging problem, like when an ETL process stops unexpectedly. They can also flag dimension members as errors or [inferred members](dimensional-modeling-load-tables.md#inferred-dimension-members).

## Dimension table size

Often, the most useful and versatile dimensions in a dimensional model are big, wide dimensions. They're _big_ in terms of rows (in excess of millions) and wide in terms of the number of dimension attributes (potentially hundreds). Size isn't so important (although you should design and optimize for the smallest possible size). What matters is that the dimension supports the required filtering, grouping, and accurate historical analysis of fact data.

Big dimensions might be sourced from multiple source systems. In this case, dimension processing needs to combine, merge, deduplicate, and standardize the data; and assign surrogate keys.

By comparison, some dimensions are tiny. They might represent lookup tables that contain only several records and attributes. Often these small dimensions store category values related to transactions in fact tables, and they're implemented as dimensions with surrogate keys to relate to the fact records.

> [!TIP]
> When you have many small dimensions, consider consolidating them into a [junk dimension](#junk-dimensions).

## Dimension design concepts

This section describes various dimension design concepts.

### Denormalization vs. normalization

It's almost always the case that dimension tables should be _denormalized_. While _normalization_ is the term used to describe data that's stored in a way that reduces repetitious data, denormalization is the term used to define where precomputed redundant data exists. Redundant data exists typically due to the storage of hierarchies (discussed later), meaning that hierarchies are flattened. For example, a product dimension could store subcategory (and its related attributes) and category (and its related attributes).

Because dimensions are generally small (when compared to fact tables), the cost of storing redundant data is almost always outweighed by the improved query performance and usability.

#### Snowflake dimensions

One exception to denormalization is to design a _snowflake dimension_. A snowflake dimension is normalized, and it stores the dimension data across several related tables.

The following diagram depicts a snowflake dimension that comprises three related dimension tables: `Product`, `Subcategory`, and `Category`.

:::image type="content" source="media/dimensional-modeling-dimension-tables/snowflake-dimension.svg" alt-text="Diagram shows an illustration of the snowflake dimension as described in the previous paragraph.":::

Consider implementing a snowflake dimension when:

- The dimension is extremely large and storage costs outweigh the need for high query performance. (However, periodically reassess that this still remains the case.)
- You need keys to relate the dimension to higher-grain facts. For example, the sales fact table stores rows at product level, but the sales target fact table stores rows at subcategory level.
- You need to [track historical changes](#manage-historical-change) at higher levels of granularity.

> [!NOTE]
> Bear in mind that a hierarchy in a semantic model can only be based on columns from a single semantic model table. Therefore, a snowflake dimension should deliver a denormalized result by using a view that joins the snowflake tables together.

### Hierarchies

Commonly, dimension columns produce _hierarchies_. Hierarchies enable exploring data at distinct levels of summarization. For example, the initial view of a matrix visual might show yearly sales, and the report consumer can choose to [drill down](/power-bi/visuals/desktop-matrix-visual#using-drill-down-actions-with-the-matrix-visual) to reveal quarterly and monthly sales.

There are three ways to store a hierarchy in a dimension. You can use:

- Columns from a single, denormalized dimension.
- A snowflake dimension, which comprises multiple related tables.
- A parent-child (self-referencing) relationship in a dimension.

Hierarchies can be balanced or unbalanced. It's also important to understand that some hierarchies are ragged.

#### Balanced hierarchies

_Balanced hierarchies_ are the most common type of hierarchy. A balanced hierarchy has the same number of levels. A common example of a balanced hierarchy is a calendar hierarchy in a date dimension that comprises levels for year, quarter, month, and date.

The following diagram depicts a balanced hierarchy of sales regions. It comprises two levels, which are sales region group and sales region.

:::image type="content" source="media/dimensional-modeling-dimension-tables/balanced-hierarchy.svg" alt-text="Diagram shows a table of sales region dimension members that includes Group and Sales Region columns.":::

Levels of a balanced hierarchy are either based on columns from a single, denormalized dimension, or from tables that form a snowflake dimension. When based on a single, denormalized dimension, the columns that represent the higher levels contain redundant data.

For balanced hierarchies, facts always relate to a single level of the hierarchy, which is typically the lowest level. That way, the facts can be aggregated (rolled up) to the highest level of the hierarchy. Facts can relate to any level, which is determined by the grain of the fact table. For example, the sales fact table might be stored at date level, while the sales target fact table might be stored at quarter level.

#### Unbalanced hierarchies

_Unbalanced hierarchies_ are a less common type of hierarchy. An unbalanced hierarchy has levels based on a parent-child relationship. For this reason, the number of levels in an unbalanced hierarchy is determined by the dimension rows, and not specific dimension table columns.

A common example of an unbalanced hierarchy is an employee hierarchy where each row in an employee dimension relates to a reporting manager row _in the same table_. In this case, any employee can be a manager with reporting employees. Naturally, some branches of the hierarchy will have more levels than others.

The following diagram depicts an unbalanced hierarchy. It comprises four levels, and each member in the hierarchy is a salesperson. Salespeople have a different number of ancestors in the hierarchy according to who they report to.

:::image type="content" source="media/dimensional-modeling-dimension-tables/unbalanced-hierarchy.svg" alt-text="Diagram shows a table of salesperson dimension members that includes a 'reports to' column.":::

Other common examples of unbalanced hierarchies include bill of materials, company ownership models, and general ledger.

For unbalanced hierarchies, facts always relate to the dimension grain. For example, sales facts relate to different salespeople, who have different reporting structures. The dimension table would have a surrogate key (named `Salesperson_SK`) and a `ReportsTo_Salesperson_FK` foreign key column, which references the primary key column. Each salesperson without anyone to manage isn't necessarily at the lowest level of any branch of the hierarchy. When they're not at the lowest level, a salesperson might sell products and have reporting salespeople who also sell products. So, the rollup of fact data must consider the individual salesperson and all their descendants.

Querying parent-child hierarchies can be complex and slow, especially for large dimensions. While the source system might store relationships as parent-child, we recommend that you _naturalize_ the hierarchy. In this instance, naturalize means to transform and store the hierarchy levels in the dimension as columns.

> [!TIP]
> If you choose not to naturalize the hierarchy, you can still create a hierarchy based on a parent-child relationship in a semantic model. However, this approach isn't recommended for large dimensions. For more information, see [Understanding functions for parent-child hierarchies in DAX](/dax/understanding-functions-for-parent-child-hierarchies-in-dax).

#### Ragged hierarchies

Sometimes a hierarchy is _ragged_ because the parent of a member in the hierarchy exists at a level that's not immediately above it. In these cases, missing level values repeat the value of the parent.

Consider an example of a balanced geography hierarchy. A ragged hierarchy exists when a country/region has no states or provinces. For example, New Zealand has neither states nor provinces. So, when you insert the New Zealand row, you should also store the country/region value in the `StateProvince` column.

The following diagram depicts a ragged hierarchy of geographical regions.

:::image type="content" source="media/dimensional-modeling-dimension-tables/ragged-hierarchy.svg" alt-text="Diagram shows a table of geography dimension members that includes Country/Region, State/Province, and City columns.":::

### Manage historical change

When necessary, historical change can be managed by implementing a _slowly changing dimension_ (SCD). An SCD maintains historical context as new, or changed data, is loaded into it.

Here are the most common SCD types.

- **Type 1:** Overwrite the existing dimension member.
- **Type 2:** Insert a new time-based _versioned_ dimension member.
- **Type 3:** Track limited history with attributes.

It's possible that a dimension could support both SCD type 1 and SCD type 2 changes.

SCD type 3 isn't commonly used, in part due to the fact that it's difficult to use in a semantic model. Consider carefully whether an SCD type 2 approach would be a better fit.

> [!TIP]
> If you anticipate a _rapidly changing dimension_, which is a dimension that has an attribute that changes frequently, consider adding that attribute to the [fact table](dimensional-modeling-fact-tables.md) instead. If the attribute is numeric, like the product price, you can add it as a measure in the fact table. If the attribute is a text value, you can create a dimension based on all text values and add its dimension key to the fact table.

#### SCD type 1

SCD type 1 changes overwrite the existing dimension row because there's no need to keep track of changes. This SCD type can also be used to correct errors. It's a common type of SCD, and it should be used for most changing attributes, like customer name, email address, and others.

The following diagram depicts the before and after state of a salesperson dimension member where their phone number has changed.

:::image type="content" source="media/dimensional-modeling-dimension-tables/slowly-changing-dimension-type-1.svg" alt-text="Diagram shows the structure of the salesperson dimension table, and the before and after values for a changed phone number for a single salesperson.":::

This SCD type doesn't preserve historical perspective because the existing row is updated. That means SCD type 1 changes can result in different higher-level aggregations. For example, if a salesperson is assigned to a different sales region, an SCD type 1 change would overwrite the dimension row. The rollup of salespeople historic sales results to region would then produce a different outcome because it now uses the new current sales region. It's as if that salesperson was always assigned to the new sales region.

#### SCD type 2

SCD type 2 changes result in new rows that represent a time-based version of a dimension member. There's always a current version row, and it reflects the state of the dimension member in the source system. [Historical tracking attributes](#historical-tracking-attributes) in the dimension table store values that allow identifying the current version (current flag is `TRUE`) and its validity time period. A surrogate key is required because there will be duplicate natural keys when multiple versions are stored.

It's a common type of SCD, but it should be reserved for attributes that must preserve historical perspective.

For example, if a salesperson is assigned to a different sales region, an SCD type 2 change involves an update operation and an insert operation.

1. The update operation overwrites the current version to set the historical tracking attributes. Specifically, the end validity column is set to the ETL processing date (or a suitable timestamp in the source system) and the current flag is set to `FALSE`.
1. The insert operation adds a new, current version, setting the start validity column to the end validity column value (used to update the prior version) and the current flag to `TRUE`.

It's important to understand that the granularity of related fact tables isn't at the salesperson level, but rather the _salesperson version_ level. The rollup of their historic sales results to region will produce correct results but there will be two (or more) salesperson member versions to analyze.

The following diagram depicts the before and after state of a salesperson dimension member where their sales region has changed. Because the organization wants to analyze salespeople effort by the region they're assigned to, it triggers an SCD type 2 change.

:::image type="content" source="media/dimensional-modeling-dimension-tables/slowly-changing-dimension-type-2.svg" alt-text="Diagram shows the structure of the salesperson dimension table, which includes 'start date', 'end date', and 'is current' columns.":::

> [!TIP]
> When a dimension table supports SCD type 2 changes, you should include a label attribute that describes the member and the version. Consider an example when the salesperson Lynn Tsoflias from Adventure Works changes assignment from the Australian sales region to the United Kingdom sales region. The label attribute for the first version could read "Lynn Tsoflias (Australia)" and the label attribute for the new, current version could read "Lynn Tsoflias (United Kingdom)." If helpful, you might include the validity dates in the label too.  
>
> You should balance the need for historic accuracy versus usability and efficiency. Try to avoid having too many SCD type 2 changes on a dimension table because it can result in an overwhelming number of versions that might make it difficult for analysts to comprehend.  
>
> Also, too many versions could indicate that a changing attribute might be better stored in the fact table. Extending the earlier example, if sales region changes were frequent, the sales region could be stored as a dimension key in the fact table rather than implementing an SCD type 2.

Consider the following SCD type 2 historical tracking attributes.

```sql
CREATE TABLE d_Salesperson
(
    <...>

    --Historical tracking attributes (SCD type 2)
    RecChangeDate_FK INT NOT NULL,
    RecValidFromKey INT NOT NULL,
    RecValidToKey INT NOT NULL,
    RecReason VARCHAR(15) NOT NULL,
    RecIsCurrent BIT NOT NULL,

    <...>
);
```

Here are the purposes of the historical tracking attributes.

- The `RecChangeDate_FK` column stores the date when the change came into effect. It allows you to query when changes took place.
- The `RecValidFromKey` and `RecValidToKey` columns store the effective dates of validity for the row. Consider storing the earliest date found in the date dimension for `RecValidFromKey` to represent the initial version, and storing `01/01/9999` for the `RecValidToKey` of the current versions.
- The `RecReason` column is optional. It allows documenting the reason why the version was inserted. It could encode which attributes changed, or it could be a code from the source system that states a particular business reason.
- The `RecIsCurrent` column makes it possible to retrieve current versions only. It's used when the ETL process looks up dimension keys when loading fact tables.

> [!NOTE]
> Some source systems don't store historical changes, so it's important that the dimension is processed regularly to detect changes and implement new versions. That way, you can detect changes shortly after they occur, and their validity dates will be accurate.

#### SCD type 3

SCD type 3 changes track limited history with attributes. This approach can be useful when there's a need to record the last change, or a number of the latest changes.

This SCD type preserves _limited_ historical perspective. It might be useful when only the initial and current values should be stored. In this instance, interim changes wouldn't be required.

For example, if a salesperson is assigned to a different sales region, an SCD type 3 change overwrites the dimension row. A column that specifically stores the previous sales region is set as the previous sales region, and the new sales region is set as the current sales region.

The following diagram depicts the before and after state of a salesperson dimension member where their sales region has changed. Because the organization wants to determine any previous sales region assignment, it triggers an SCD type 3 change.

:::image type="content" source="media/dimensional-modeling-dimension-tables/slowly-changing-dimension-type-3.svg" alt-text="Diagram shows the structure of the salesperson dimension table, which contains a 'previous sales region' and 'previous sales region end date' columns.":::

### Special dimension members

You might insert rows into a dimension that represent missing, unknown, N/A, or error states. For example, you might use the following surrogate key values.

| **Key value** | **Purpose** |
|:-:|---|
| **0** | Missing (not available in the source system) |
| **-1** | Unknown (lookup failure during a fact table load) |
| **-2** | N/A (not applicable) |
| **-3** | Error |

### Calendar and time

Almost without exception, fact tables store measures at specific points in time. To support analysis by date (and possibly time), there must be calendar (date and time) dimensions.

It's uncommon that a source system would have calendar dimension data, so it must be generated in the data warehouse. Typically, it's generated once, and if it's a calendar dimension, it's extended with future dates when needed.

#### Date dimension

The date (or calendar) dimension is the most common dimension used for analysis. It stores one row per date, and it supports the common requirement to filter or group by specific periods of dates, like years, quarters, or months.

> [!IMPORTANT]
> A date dimension shouldn't include a grain that extends to time of day. If time of day analysis is required, you should have both a date dimension and a [time dimension](#time-dimension) (described next). Fact tables that store time of day facts should have two foreign keys, one to each of these dimensions.

The natural key of the date dimension should use the **date** data type. The surrogate key should store the date by using `YYYYMMDD` format and the **int** data type. This accepted practice should be the only exception (alongside the time dimension) when the surrogate key value has meaning and is human readable. Storing `YYYYMMDD` as an **int** data type is not only efficient and sorted numerically, but it also conforms to the unambiguous International Standards Organization (ISO) 8601 date format.

Here are some common attributes to include in a date dimension.

- `Year`, `Quarter`, `Month`, `Day`
- `QuarterNumberInYear`, `MonthNumberInYear` – which might be required to sort text labels.
- `FiscalYear`, `FiscalQuarter` – some corporate accounting schedules start mid-year, so that the start/end of the calendar year and the fiscal year are different.
- `FiscalQuarterNumberInYear`, `FiscalMonthNumberInYear` – which might be required to sort text labels.
- `WeekOfYear` – there are multiple ways to label the week of year, including an ISO standard that has either 52 or 53 weeks.
- `IsHoliday`, `HolidayText` – if your organization operates in multiple geographies, you should maintain multiple sets of holiday lists that each geography observes as a separate dimension or naturalized in multiple attributes in the date dimension. Adding a `HolidayText` attribute could help identify holidays for reporting.
- `IsWeekday` – similarly, in some geographies, the standard work week isn't Monday to Friday. For example, the work week is Sunday to Thursday in many Middle Eastern regions, while other regions employ a four-day or six-day work week.
- `LastDayOfMonth`
- `RelativeYearOffset`, `RelativeQuarterOffset`, `RelativeMonthOffset`, `RelativeDayOffset` – which might be required to support relative date filtering (for example, previous month). Current periods use an offset of zero (0); previous periods store offsets of -1, -2, -3...; future periods store offsets of 1, 2, 3....

As with any dimension, what's important is that it contains attributes that support the known filtering, grouping, and hierarchy requirements. There might also be attributes that store translations of labels into other languages.

When the dimension is used to relate to higher-grain facts, the fact table can use the first date of the date period. For example, a sales target fact table that stores quarterly salespeople targets would store the first date of the quarter in the date dimension. An alternative approach is to create key columns in the date table. For example, a quarter key could store the quarter key by using `YYYYQ` format and the **smallint** data type.

The dimension should be populated with the known range of dates used by all fact tables. It should also include future dates when the data warehouse stores facts about targets, budgets, or forecasts. As with other dimensions, you might include rows that represent missing, unknown, N/A, or error situations.

> [!TIP]
> Search the internet for "date dimension generator" to find scripts and spreadsheets that generate date data.

Typically, at the beginning of the next year, the ETL process should extend the date dimension rows to a specific number of years ahead. When the dimension includes relative offset attributes, the ETL process must be run daily to update offset attribute values based on the current date (today).

#### Time dimension

Sometimes, facts need to be stored at a point in time (as in time of day). In this case, create a time (or clock) dimension. It could have a grain of minutes (24 x 60 = 1,440 rows) or even seconds (24 x 60 x 60 = 86,400 rows). Other possible grains include half hour or hour.

The natural key of a time dimension should use the **time** data type. The surrogate key could use an appropriate format and store values that have meaning and are human readable, for example, by using the `HHMM` or `HHMMSS` format.

Here are some common attributes to include in a time dimension.

- `Hour`, `HalfHour`, `QuarterHour`, `Minute`
- Time period labels (morning, afternoon, evening, night)
- Work shift names
- Peak or off-peak flags

### Conformed dimensions

Some dimensions might be _conformed dimensions_. Conformed dimensions relate to many fact tables, and so they're shared by multiple stars in a dimensional model. They deliver consistency and can help you to reduce ongoing development and maintenance.

For example, it's typical that fact tables store at least one date dimension key (because activity is almost always recorded by date and/or time). For that reason, a date dimension is a common conformed dimension. You should therefore ensure that your date dimension includes attributes relevant for the analysis of all fact tables.

The following diagram shows the `Sales` fact table and the `Inventory` fact table. Each fact table relates to the `Date` dimension and `Product` dimension, which are conformed dimensions.

:::image type="content" source="media/dimensional-modeling-dimension-tables/conformed-dimensions.svg" alt-text="Diagram shows an illustration of conformed dimensions as described in the previous paragraph.":::

As another example, your employee and users could be the same set of people. In this case, it might make sense to combine the attributes of each entity to produce one conformed dimension.

### Role-playing dimensions

When a dimension is referenced multiple times in a fact table, it's known as a _role-playing dimension_.

For example, when a sales fact table has order date, ship date, and delivery date dimension keys, the date dimension relates in three ways. Each way represents a distinct _role_, yet there's only one physical date dimension.

The following diagram depicts a `Flight` fact table. The `Airport` dimension is a role-playing dimension because it's related twice to the fact table as the `Departure Airport` dimension and the `Arrival Airport` dimension.

:::image type="content" source="media/dimensional-modeling-dimension-tables/role-playing-dimensions.svg" alt-text="Diagram shows an illustration of a star schema for airline flight facts as described in the previous paragraph.":::

### Junk dimensions

A _junk dimension_ is useful when there are many independent dimensions, especially when they comprise a few attributes (perhaps one), and when these attributes have low cardinality (few values). The objective of a junk dimension is to consolidate many small dimensions into a single dimension. This design approach can reduce the number of dimensions, and decrease the number of fact table keys and thus fact table storage size. They also help to reduce [Data pane](/power-bi/transform-model/desktop-field-list) clutter because they present fewer tables to users.

A junk dimension table typically stores the Cartesian product of all dimension attribute values, with a surrogate key attribute.

Good candidates include flags and indicators, order status, and customer demographic states (gender, age group, and others).

The following diagram depicts a junk dimension named `Sales Status` that combines order status values and delivery status values.

:::image type="content" source="media/dimensional-modeling-dimension-tables/junk-dimension.svg" alt-text="Diagram shows order status and delivery status values, and how the Cartesian product of those values creates the 'Sales Status' dimension rows.":::

### Degenerate dimensions

A _degenerate dimension_ can occur when the dimension is at the same grain as the related facts. A common example of a degenerate dimension is a sales order number dimension that relates to a sales fact table. Typically, the invoice number is a single, non-hierarchical attribute in the fact table. So, it's an accepted practice not to copy this data to create a separate dimension table.

The following diagram depicts a `Sales Order` dimension that's a degenerate dimension based on the `SalesOrderNumber` column in a sales fact table. This dimension is implemented as a view that retrieves the distinct sales order number values.

:::image type="content" source="media/dimensional-modeling-dimension-tables/degenerate-dimension.svg" alt-text="Diagram shows a degenerate dimension as described in the previous paragraph.":::

> [!TIP]
> It's possible to create a view in a Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)] that presents the degenerate dimension as a dimension for querying purposes.

From a Power BI semantic modeling perspective, a degenerate dimension can be created as a separate table by using [Power Query](/power-query/power-query-what-is-power-query). That way, the semantic model conforms to the best practice that fields used to filter or group are sourced from dimension tables, and fields used to summarize facts are sourced from fact tables.

### Outrigger dimensions

When a dimension table relates to other dimension tables, it's known as an _outrigger dimension_. An outrigger dimension can help to conform and reuse definitions in the dimensional model.

For example, you could create a geography dimension that stores geographic locations for every postal code. That dimension could then be referenced by your customer dimension _and_ salesperson dimension, which would store the surrogate key of the geography dimension. That way, customers and salespeople could then be analyzed by using consistent geographic locations.

The following diagram depicts a `Geography` dimension that's an outrigger dimension. It doesn't relate directly to the `Sales` fact table. Instead, it's related indirectly via the `Customer` dimension and the `Salesperson` dimension.

:::image type="content" source="media/dimensional-modeling-dimension-tables/outrigger-dimension.svg" alt-text="Diagram shows an illustration of an outrigger dimension as described in the previous paragraph.":::

Consider that the date dimension can be used as an outrigger dimension when other dimension table attributes store dates. For example, the birth date in a customer dimension could be stored by using the surrogate key of the date dimension table.

### Multivalued dimensions

When a dimension attribute must store multiple values, you need to design a _multivalued dimension_. You implement a multivalued dimension by creating a _bridge table_ (sometimes called a _join table_). A bridge table stores a many-to-many relationship between entities.

For example, consider there's a salesperson dimension, and that each salesperson is assigned to one or possibly more sales regions. In this case, it makes sense to create a sales region dimension. That dimension stores each sales region only once. A separate table, known as the bridge table, stores a row for each salesperson and sales region relationship. Physically, there's a one-to-many relationship from the salesperson dimension to the bridge table, and another one-to-many relationship from the sales region dimension to the bridge table. Logically, there's a many-to-many relationship between salespeople and sales regions.

In the following diagram, the `Account` dimension table relates to the `Transaction` fact table. Because customers can have multiple accounts and accounts can have multiple customers, the `Customer` dimension table is related via the `Customer Account` bridge table.

:::image type="content" source="media/dimensional-modeling-dimension-tables/multivalued-dimension.svg" alt-text="Diagram shows an illustration of a multivalued dimension as described in the previous paragraph.":::

## Related content

In the next article in this series, learn about guidance and design best practices for [fact tables](dimensional-modeling-fact-tables.md).
