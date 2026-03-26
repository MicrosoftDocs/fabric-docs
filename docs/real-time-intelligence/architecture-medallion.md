---
title: Implement Medallion Architecture in Real-Time Intelligence
description: Understand the medallion architecture and learn how to implement it in Real-Time Intelligence for optimal data structuring and storage.
ms.reviewer: bwatts
ms.topic: concept-article
ms.date: 03/19/2026
#customer intent: As a data engineer, I want to understand medallion architecture in Real-Time Intelligence and learn how to implement a KQL database so that I can optimally structure and store my organization's data.
---

# Implement medallion architecture in Real-Time Intelligence

This article explains how to implement the medallion architecture by using Real-Time Intelligence in Microsoft Fabric. The medallion architecture ensures the Atomicity, Consistency, Isolation, and Durability (ACID) properties as data moves through its stages. Starting with raw data, it undergoes a series of validations and transformations to become optimized for efficient analytics. The architecture consists of three stages: Bronze layer (raw data), Silver layer (validated data), and Gold layer (enriched data).

For more information, see [What is the medallion architecture?](/azure/databricks/lakehouse/medallion).

## How does it work?

Real-Time Intelligence has features that facilitate creating the medallion architecture in a KQL database that doesn't require extra infrastructure. The features include:

- **Update policies**

    As data enters the Bronze layer, you can use update policies to transform and enrich it, adding business value such as improved data quality, consistency, and relevance for downstream analytics. Update policies facilitate the processing of continuous data streams by simplifying streaming concepts like incremental processing, checkpointing, and watermarks. This abstraction allows you to build streaming applications and pipelines without the need for extra tools. By ingesting and transforming live streaming data, Real-Time Intelligence enables data engineers and data scientists to handle real-time data from various sources.

    For more information, see [Update policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true).

- **Materialized views**

    Materialized views remove duplicate values as they arrive, making deduplicated records immediately available for querying. They compute aggregate views in real time, ensuring performance enhancement, data freshness, and cost reduction. This capability eliminates the need for extra tools to perform data aggregation. By exposing an aggregation query over a source table or another materialized view, they always provide up-to-date results. Querying a materialized view is more efficient than running the aggregation directly over the source table, leading to performance improvements. Additionally, materialized views consume fewer resources, which can lead to cost savings.

    For more information, see [Materialized views](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true).

## Implement the medallion architecture

By using Real-Time Intelligence, you can build a medallion architecture that processes data as it arrives. This approach enables you to create Bronze, Silver, and Gold layers while keeping the real-time aspect of your data.

:::image type="content" source="media/architecture-medallion/architecture-medallion.png"  alt-text="Diagram showing the medallion architecture in Real-Time Intelligence." lightbox="media/architecture-medallion/architecture-medallion.png":::

- Bronze layer

    The Bronze layer serves as the initial landing zone for all incoming raw data. In Real-Time Intelligence, the Bronze layer can ingest data by using Eventstream or a table in Eventhouse. This layer provides a foundation for subsequent enrichment and analysis in the Silver and Gold layers.

    > [!TIP]
    > You might want to keep this data for change capture purposes and to enable data replay. If your Bronze layer uses Eventstream, you can output the data to OneLake before any transformations or enhancements are performed by the event processing. If your Bronze layer uses a table, you can [mirror](event-house-onelake-availability.md) the data to OneLake.

- Silver layer

    The Silver layer contains data that's transformed and enriched to add business value, including deduplication of records. This layer processes data from the Bronze layer by using methods such as event processing and update policies, as follows:

    - **Event processing**: Enrich data in Eventstream by using [event processing](/fabric/real-time-intelligence/event-streams/process-events-using-event-processor-editor?pivots=enhanced-capabilities) to add business value, and then insert the results into a *Silver layer* table in Eventhouse.
    - **Update policy**: Process data in a *Bronze layer* table immediately by using an [update policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true). Insert the results into a *Silver layer* table in Eventhouse. Deduplication occurs by using a [materialized view](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true), which keeps the data up-to-date and maintains the real-time aspect of the solution.

    > [!TIP]
    > Typically, at this layer, you have two tables: one for transformations and enhancements, and a materialized view for deduplication. For the first table, set the [retention policy](/kusto/management/retention-policy?view=microsoft-fabric&preserve-view=true) to zero days, which means the data never appears in the table but the materialized view still deduplicates it. Use the deduplicated materialized view for high-granularity analytics. By setting both the [retention policy](/kusto/management/retention-policy?view=microsoft-fabric&preserve-view=true) for how long you want to keep the data and the [caching policy](/kusto/management/cache-policy?view=microsoft-fabric&preserve-view=true) based on your query patterns, you can optimize your costs. Often, you don't need the Silver layer for as long as the Gold layer.

- Gold layer

    The Gold layer contains data that's optimized for visualization needs while maintaining the real-time aspect of the data. This layer aggregates and computes data as it arrives by using a [materialized view](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true), which provides quick access to the latest received value based on your dataset. The Gold layer ensures that the data is ready for advanced analytics and visualization tools, so it provides up-to-date and high-quality insights for decision-making.

    This layer is optimized for visualization by using aggregate and latest-value materialized views. In most scenarios, you retain and query this down-sampled data for a longer period of time than the Silver layer. By using the [retention policy](/kusto/management/retention-policy?view=microsoft-fabric&preserve-view=true) to determine how long to keep the data and the [caching policy](/kusto/management/cache-policy?view=microsoft-fabric&preserve-view=true) based on your query patterns, the process is handled natively.

**Visualize and act**

By using the performance capabilities of Real-Time Intelligence, you can visualize the data by using components such as Power BI, Real-Time Dashboards, or KQL querysets. You can pull data from both the Gold layer for aggregated views and the Silver layer to unlock high granularity analytics. Additionally, you can act on the data at any layer by using [Activator](data-activator/activator-introduction.md), which unlocks the ability to act on data as it arrives in Eventstream, high-granular data in the Silver layer, and aggregated data from the Gold layer.

## Key benefits

The medallion architecture in Real-Time Intelligence provides several benefits, including:

- Purposely built for real-time data processing

    Real-Time Intelligence in Microsoft Fabric is built to handle continuously flowing data along with high granularity data. The entire flow from Bronze to Gold layers is built into the product. Without scheduling, it processes the data from Bronze to Silver to Gold immediately as it arrives. This capability comes from:

    - [Event processing](/fabric/real-time-intelligence/event-streams/process-events-using-event-processor-editor?pivots=enhanced-capabilities)
    - [Update policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true)
    - [Materialized views](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true)

- Flexibility

    In a typical medallion architecture, you consume data only from the Gold Layer, which loses the individual records and prevents high-granular analytics. By using Eventhouse, you can consume data from both the Gold and Silver layers, unlocking high-granularity analytics. Eventhouse handles queries against billions of records in seconds.

- Built-in data management

    Data at each layer has different requirements for retention and querying. You can easily implement this process by using built-in capabilities.

- Native Visualization layer

    By using a single action, you can pin any query from the Gold or Silver layer into a new or existing Power BI Report or Real-Time Dashboard.

- OneLake Availability

    Take your data from the Silver Layer and expose it as Delta Parquet in OneLake via [OneLake availability](event-house-onelake-availability.md). Different stakeholders in the organization use different tools. For example, data scientists use historical data for machine-learning model training. By making the data available in OneLake, each stakeholder can effortlessly interact with the data without extra storage cost.

## Related content

- [Microsoft Fabric decision guide: choose a data store](../fundamentals/decision-guide-data-store.md)
- Questions? Try asking the [Fabric community](https://community.fabric.microsoft.com/).
- Suggestions? [Contribute ideas to improve Fabric](https://ideas.fabric.microsoft.com/).
