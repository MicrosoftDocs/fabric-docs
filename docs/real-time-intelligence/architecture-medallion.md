---
title: Implement medallion architecture in Real-Time Intelligence
description: Understand the medallion architecture and learn how to implement it in Real-Time Intelligence for optimal data structuring and storage.
author: spelluru
ms.author: spelluru
ms.reviewer: bwatts
ms.topic: concept-article
ms.date: 12/12/2024
#customer intent: As a data engineer, I want to understand medallion architecture in Real-Time Intelligence and learn how to implement a KQL database so that I can optimally structure and store my organization's data.
---

# Implement medallion architecture in Real-Time Intelligence

This article explains how to implement the medallion architecture using Real-Time Intelligence in Microsoft Fabric. The medallion architecture ensures the Atomicity, Consistency, Isolation, and Durability (ACID) properties as data moves through its stages. Starting with raw data, it undergoes a series of validations and transformations to become optimized for efficient analytics. The architecture consists of three stages: Bronze layer (raw data), Silver layer (validated data), and Gold layer (enriched data).

For more information, see [What is the medallion architecture?](/azure/databricks/lakehouse/medallion).

## How does it work?

Real-Time Intelligence has features that facilitate creating the medallion architecture in a KQL database that doesn't require additional infrastructure. The features include:

- **Update policies**

    As data enters the Bronze layer, you can use update policies to transform and enrich it, adding business value such as improved data quality, consistency, and relevance for downstream analytics. Update policies facilitate the processing of continuous data streams by simplifying streaming concepts like incremental processing, checkpointing, and watermarks. This abstraction allows you to build streaming applications and pipelines without the need for extra tools. Real-Time Intelligence's capability to ingest and transform live streaming data enables data engineers and data scientists to handle real-time data from various sources.

    For more information, see [Update policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true).

- **Materialized views**

    Materialized views remove duplicate values as they arrive, making deduplicated records immediately available for querying. They compute aggregate views in real-time, ensuring performance enhancement, data freshness, and cost reduction. This eliminates the need for extra tools to perform data aggregation. By exposing an aggregation query over a source table or another materialized view, they always provide up-to-date results. Querying a materialized view is more efficient than running the aggregation directly over the source table, leading to performance improvements. Additionally, materialized views consume fewer resources, which can lead to cost savings.

    For more information, see [Materialized views](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true).

## Implement the medallion architecture

Real-Time Intelligence allows you to build a medallion architecture by processing the data as it arrives. This enables you to build your Bronze, Silver, and Gold layers while maintaining the real-time aspect of your data.

:::image type="content" source="media/architecture-medallion/architecture-medallion.png"  alt-text="Diagram showing the medallion architecture in Real-Time Intelligence." lightbox="media/architecture-medallion/architecture-medallion.png":::

- Bronze layer

    The Bronze layer serves as the initial landing zone for all incoming raw data. In Real-Time Intelligence, the Bronze layer can ingest data using Eventstream or a table in Eventhouse, providing a foundation for subsequent enrichment and analysis in the Silver and Gold layers.

    > [!TIP]
    > You may want to keep this data for change capture purposes and the ability to replay the data. If your Bronze layer uses Eventstream, you can output the data to OneLake before any transformations or enhancements are performed by the event processing. If your Bronze layer uses an table, you can [mirror](event-house-onelake-availability.md) the data to OneLake.

- Silver layer

    The Silver layer contains data that is transformed and enriched to add business value, including deduplication of records. This layer processes data from the Bronze layer using methods such as event processing and update policies, as follows:

    - **Event processing**: Data in Eventstream is enriched using [event processing](/fabric/real-time-intelligence/event-streams/process-events-using-event-processor-editor?pivots=enhanced-capabilities) to add the business value and then insert the results into a *Silver layer* table in Eventhouse.
    - **Update policy**: Data in a *Bronze layer* table is processed immediately using an [update policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true). The results are inserted into a *Silver layer* table in Eventhouse. Deduplication occurs using a [materialized view](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true), ensuring that the data remains up-to-date and maintaining the real-time aspect of the solution.

    > [!TIP]
    > Typically, at this layer, you will have two tables: one for transformations and enhancements, and a materialized view for deduplication. For the first table, you can set the [retention policy](/kusto/management/retention-policy?view=microsoft-fabric&preserve-view=true) to zero days, meaning the data never appears in the table but is still deduplicated by the materialized view. The deduplicated materialized view is used for high-granularity analytics. By setting both the [retention policy](/kusto/management/retention-policy?view=microsoft-fabric&preserve-view=true) for how long you want to keep the data and the [caching policy](/kusto/management/cache-policy?view=microsoft-fabric&preserve-view=true) based on your query patterns, you can optimize your costs. Often, the Silver layer is not needed for as long as the Gold layer.

- Gold layer

    The Gold layer contains data that is optimized for visualization needs while maintaining the real-time aspect of the data. This layer aggregates and computes data as it arrives using a [materialized view](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true), allowing quick access to the latest received value based on your dataset. The Gold layer ensures that the data is ready for advanced analytics and visualization tools, providing up-to-date and high-quality insights for decision-making.

    This layer is optimized for visualization using aggregate and latest-value materialized views. In most scenarios, this down-sampled data is retained and queried for a longer period of time than the Silver layer. By utilizing the [retention policy](/kusto/management/retention-policy?view=microsoft-fabric&preserve-view=true) to determine how long to keep the data and the [caching policy](/kusto/management/cache-policy?view=microsoft-fabric&preserve-view=true) based on your query patterns, this process is handled natively.

**Visualize and act**

The performance capabilities of Real-Time Intelligence allow you to visualize the data using components such as Power BI, Real-Time Dashboards, or KQL querysets. You can pull data from both the Gold Layer for aggregated views, and the Silver layer to unlock high granularity analytics. Additionally, you can act on the data at any layer using [Activator](data-activator/activator-introduction.md), which unlocks the ability to act on data as it arrives in Eventstream, high-granular data in the Silver layer, and aggregated data from the Gold layer.

## Key benefits

The medallion architecture in Real-Time Intelligence provides several benefits, including:

- Purposely built for real-time data processing

    Real-Time Intelligence in Microsoft Fabric is built to handle continuously flowing data along with high granularity data. The entire flow from Bronze to Gold layers is built into the product. With no scheduling, it's able to process the data from Bronze to Silver to Gold immediately as it arrives. This is made possible by:

    - [Event processing](/fabric/real-time-intelligence/event-streams/process-events-using-event-processor-editor?pivots=enhanced-capabilities)
    - [Update policy](/kusto/management/update-policy?view=microsoft-fabric&preserve-view=true)
    - [Materialized views](/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric&preserve-view=true)

- Flexibility

    In a typical medallion architecture, data is consumed only from the Gold Layer, losing the individual records and preventing high-granular analytics. With Eventhouse, you're able to consume data from both the Gold and Silver layers, unlocking high-granularity analytics. Eventhouse is built to handle queries against billions of records in seconds.

- Built-in data management

    Data at each layer has different requirements for retention and querying. This process is easily implemented via built-in capabilities.

- Native Visualization layer

    With a single action, you can pin any query from the Gold or Silver layer into a new or existing Power BI Report or Real-Time Dashboard.

- OneLake Availability

    Take your data from the Silver Layer and expose it as Delta Parquet in OneLake via [OneLake availability](event-house-onelake-availability.md). Different stakeholders in the organization use different tools, for example Data Scientist use historical data for machine-learning model training. By making the data available in OneLake, each stakeholder can effortlessly interact with the data without additional storage cost.

## Related content

- [Microsoft Fabric decision guide: choose a data store](../fundamentals/decision-guide-data-store.md)
- Questions? Try asking the [Fabric community](https://community.fabric.microsoft.com/).
- Suggestions? [Contribute ideas to improve Fabric](https://ideas.fabric.microsoft.com/).
