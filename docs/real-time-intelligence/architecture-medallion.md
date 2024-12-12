---
title: Implement medallion lakehouse architecture in Real-Time Intelligence
description: Understand the medallion lakehouse architecture and learn how to implement within Real-Time Intelligence.
author: shsagir
ms.author: shsagir
ms.reviewer: bwatts
ms.topic: concept-article
ms.date: 12/12/2024
#customer intent: As a data engineer, I want to understand medallion architecture in Real-Time Intelligence and learn how to implement a KQL database so that I can optimally structure and store my organization's data.
---

# Implement medallion lakehouse architecture in Real-Time Intelligence

**//TODO: Brad: Do we really want to keep referring to Lakehouse?**

This article explains how to implement the medallion lakehouse architecture using Real-Time Intelligence in Microsoft Fabric. The medallion architecture ensures the Atomicity, Consistency, Isolation, and Durability (ACID) properties as data moves through its stages. Starting with raw data, it undergoes a series of validations and transformations to become optimized for efficient analytics. The architecture consists of three stages: Bronze layer (raw data), Silver layer (validated data), and Gold layer (enriched data).

For more information, see [What is the medallion lakehouse architecture?](/azure/databricks/lakehouse/medallion).

## Medallion architecture in Real-Time Intelligence

Real-Time Intelligence allows you to build a medallion architecture by processing the data as it arrives. This enables you to build your Bronze, Silver, and Gold layers while maintaining the real-time aspect of your data.

:::image type="content" source="media/medallion-architecture/Architecture.png" alt-text="Diagram showing the medallion architecture in Real-Time Intelligence.":::

**Bronze layer**

The Bronze layer contains raw records that can be ingested into either Eventstream or a table in Eventhouse. This layer serves as the initial landing zone for all incoming data, ensuring that the raw, unprocessed data is captured and stored for further processing and transformation.

**Silver layer**

As data lands in the Bronze layer, it is transformed and enriched to add business value, including deduplication of records. Data ingested via an eventstream can use [event processing](/fabric/real-time-intelligence/event-streams/process-events-using-event-processor-editor?pivots=enhanced-capabilities) to add the business value and then insert the results into a table in an eventhouse. Data ingested into a table in an eventhouse with an [update policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true) is processed immediately and the results are inserted into another table in the eventhouse. Deduplication occurs using a [materialized view](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true), maintaining the real-time aspect of the solution by processing duplicate records as they arrive.

**Gold layer**

- Data in the gold layer is optimized for visualization needs while still maintaining the real-time aspect of your data
- Aggregate views are computed as data arrives via a [Materialized View](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true)
- Latest value views are also common via a [Materialized View](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true) allow quick access to the latest received value based on your dataset

## How does it work?

Real-Time Intelligence has features that facilitate creating the medallion architecture in a KQL database that doesn't require additional infrastructure. The features include:

- **Update policies**

    As data enters the Bronze layer, you can use update policies to transform and enrich it, adding business value such as improved data quality, consistency, and relevance for downstream analytics. Update policies facilitate the processing of continuous data streams by simplifying streaming concepts like incremental processing, checkpointing, and watermarks. This abstraction allows you to build streaming applications and pipelines without the need for extra tools. Real-Time Intelligence's capability to ingest and transform live streaming data enables data engineers and data scientists to handle real-time data from various sources.

    For more information, see [Update policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true).

- **Materialized views**

    Materialized views remove duplicate values as they arrive, making deduplicated records immediately available for querying. They compute aggregate views in real-time, ensuring performance enhancement, data freshness, and cost reduction. This eliminates the need for extra tools to perform data aggregation. By exposing an aggregation query over a source table or another materialized view, they always provide up-to-date results. Querying a materialized view is more efficient than running the aggregation directly over the source table, leading to performance improvements. Additionally, materialized views consume fewer resources, which can lead to cost savings.

    For more information, see [Materialized views](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true).

**Visualize and act**

- Data can be visualized using many components such as Power BI, RTI Dashboards, or KQL Querysets
- The performance capabilities of RTI allow these visuals to pull from both the Gold Layer for aggregated views and unlock high granularity analytics by pulling from the Silver Layer
- DataActivator unlocks the ability to act on data at any layer
  - As data arrives in Eventstream
  - High-Granular data in the Silver Layer
  - Aggregated Data from the Gold Layer

## Key Benefits of Medallion Lakehouse Architecture in Real-Time Intelligence

**Purposely Build**

Real-Time Intelligence in Microsoft Fabric was built to handle continuously flowing data along with high granularity data. The entire flow from Bronze to Gold is built into the product and with no scheduling is able to process the data from Bronze to Silver to Gold immediately as it arrives.

This is made possible by:
- [Event Processing](/fabric/real-time-intelligence/event-streams/process-events-using-event-processor-editor?pivots=enhanced-capabilities)
- [Update Policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true)
- [Materialized View](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true)

**Flexibility**

In a typical medallion lakehouse architecture, data is consumed only from the Gold Layer, losing the individual records and preventing high-granular analytics. With Eventhouse you are able to consume data from both the Gold Layer or the Silver Layer, unlocking high-granularity analytics. The Eventhouse engine is built to handle queries against billions of records in seconds.

**Built-In Data Management**

Data at each layer has different requirements for retention and querying. This process is easily implemented via built-in capabilities.

- **Bronze layer**

You may want to keep this data for Change Capture purposes and the ability to replay the data. If your Bronze Layer is utilizing Eventstream then you can output the data to OneLake before any transformations or enhancements are performed by the event processing. If your Bronze Layer is utilizing an Eventhouse table you can [mirror](/fabric/real-time-intelligence/event-house-onelake-availability) the data to OneLake.

- **Silver layer**

Typically, at this layer you will have two tables. One for the transformation and enhancements along with a materialized-view for deduplications. On the first table you can set the [retention policy](/kusto/management/retention-policy?view=microsoft-fabric&preserve-view=true) to 0 days meaning the data never shows up in the table but is still deduped by the materialized-view. The dedup materialized-view is used for high granular analytics, so setting both the [retention policy](/kusto/management/retention-policy?view=microsoft-fabric&preserve-view=true) for how long you want to keep the data and the [caching policy](/kusto/management/cache-policy?view=microsoft-fabric&preserve-view=true) based on your query patterns allows you to optimize your cost. Many time the silver layer is not needed for the length of time the Gold Layer is.

- **Gold layer**

This layer is optimized for visualization with your aggregate materialized-view and latest value materialized-view. In most scenarios this down-sampled data is kept and queried for a longer period of time than your Silver Layer. By utilizing [retention policy](/kusto/management/retention-policy?view=microsoft-fabric&preserve-view=true) for how long you want to keep the data and the [caching policy](/kusto/management/cache-policy?view=microsoft-fabric&preserve-view=true) based on your query patterns, this process is handled natively.

**Native Visualization layer**

With a single click I can pin any query from the Gold or Silver layer into a new or existing Power BI Report or RTI Dashboard.

**OneLake Availability**

Taking your data from the Silver Layer and expose it as delta parquet in OneLake via [Eventhouse OneLake Availability](/fabric/real-time-intelligence/event-house-onelake-availability). Different stakeholders in the organization use different tools, for example Data Scientist use historical data for ML model training. By making the data available in OneLake each stakeholder can effortlessly interact with the data without additional storage cost.

## Related content

For more information about implementing a Fabric lakehouse, see the following resources.

- [Microsoft Fabric decision guide: choose a data store](../get-started/decision-guide-data-store.md)
- Questions? Try asking the [Fabric community](https://community.fabric.microsoft.com/).
- Suggestions? [Contribute ideas to improve Fabric](https://ideas.fabric.microsoft.com/).
