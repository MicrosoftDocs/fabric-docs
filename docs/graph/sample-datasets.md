---
title: Example Graph Datasets for graph in Microsoft Fabric
description: Information about the example graph datasets used in the documentation for graph in Microsoft Fabric, including data models, schemas, and sample queries.
ms.topic: reference
ms.date: 03/26/2026
ms.reviewer: splantikow
ms.search.form: GQL Example Graph Datasets
ai-usage: ai-assisted
---

# Example graph datasets

Most documentation articles for graph in Microsoft Fabric assume one of the following example [property graphs](graph-data-models.md) when they provide GQL queries:

- The *social network example graph* is the primary example graph used in the GQL reference documentation.
  The article on its [schema definition](gql-schema-example.md) explains the detailed structure of the graph.

- The *AdventureWorks example graph* is used in the [quickstart](quickstart.md) and [tutorial](tutorial-introduction.md).

The [graph samples repository](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/graph) publishes the required datasets for these graphs. Both datasets are packaged as zip archives containing subfolders of Delta Parquet files. For loading instructions, see the quickstart [Load sample data](quickstart.md#load-sample-data) section.

For further instructions on how to obtain and load these datasets, see the [README file](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/graph/README.md).

## AdventureWorks dataset

The `adventureworks_docs_sample.zip` file contains a custom-transformed version of the Adventure Works sample database, structured for graph modeling. The [quickstart](quickstart.md) uses two tables (customers, orders). The full [tutorial](tutorial-introduction.md) uses all eight tables.

> [!NOTE]
> This dataset differs from the standard Adventure Works datasets used in other Microsoft documentation. It's specifically transformed for graph scenarios.

### AdventureWorks tables

| Table | Node label | Key column | Description |
| ----- | ---------- | ---------- | ----------- |
| adventureworks_customers | Customer | CustomerID_K | People who purchase products |
| adventureworks_employees | Employee | EmployeeID_K | Staff who process sales |
| adventureworks_orders | Order | SalesOrderDetailID_K | Sales transactions (line-item level) |
| adventureworks_products | Product | ProductID_K | Items available for purchase |
| adventureworks_productcategories | ProductCategory | CategoryID_K | Top-level product classification |
| adventureworks_productsubcategories | ProductSubcategory | SubcategoryID_K | Mid-level product classification |
| adventureworks_vendors | Vendor | VendorID_K | Suppliers who produce products |
| adventureworks_vendorproduct | VendorProduct | ProductID_FK | Vendor-to-product mapping |

## Social network dataset

The `ldbc_snb_docs_sample.zip` file contains a dataset derived from the [LDBC Social Network Benchmark](https://ldbcouncil.org/benchmarks/snb/). It models a social media platform with people, forums, posts, comments, and tags. This dataset demonstrates advanced graph schema features including node type inheritance, edge type families, and compound property types.

### Social network tables

The dataset contains tables for 14 node types and 23 edge types, following this naming convention:

- `ldbc_snb_node_XXX` — Node table for `:XXX` nodes
- `ldbc_snb_edge_FROM_XXX_TO` — Edge table for `:XXX` edges from `:FROM` to `:TO` nodes

Every row in a node table is uniquely identified by the `id` column. Edge tables use `src_XXX_id` and `dst_YYY_id` columns to link source and destination nodes.

For the complete GQL schema definition with all node and edge types, see [GQL schema example: Social network](gql-schema-example.md).

## Related content

- [Quickstart: Create your first graph](quickstart.md)
- [Tutorial: Introduction to graph](tutorial-introduction.md)
- [GQL schema example: Social network](gql-schema-example.md)
