---
title: "Modern medallion architecture in Fabric Real-Time Intelligence"
description: Understand medallion architecture in Microsoft Fabric and learn how to implement within Real-Time Intellegence.
author: Brad Watts
ms.author: bwatts
ms.reviewer: 
ms.topic: concept-article
ms.date: 11/19/2024
ms.custom:
---

# Implement medallion lakehouse architecture in Microsoft Fabric Real-Time Intelligence

This article introduces medallion architecture and describes how you can implement this pattern using Microsoft Fabric Real-Time Intelligence. It's targeted at multiple audiences:

- **Data engineers:** Technical staff who design, build, and maintain infrastructures and systems that enable their organization to collect, store, process, and analyze large volumes of data.
- **Center of Excellence, IT, and BI team:** The teams that are responsible for overseeing analytics throughout the organization.
- **Fabric administrators:** The administrators who are responsible for overseeing Fabric in the organization.

The [medallion lakehouse architecture](/azure/databricks/lakehouse/medallion), commonly known as _medallion architecture_, is a design pattern that's used by organizations to logically organize data in a lakehouse. It's the recommended design approach for Fabric.

Medallion architecture comprises three distinct layers—or zones. Each layer indicates the quality of data stored in the lakehouse, with higher levels representing higher quality. This multi-layered approach helps you to build a single source of truth for enterprise data products.

Importantly, medallion architecture guarantees the Atomicity, Consistency, Isolation, and Durability (ACID) set of properties as data progresses through the layers. Starting with raw data, a series of validations and transformations prepares data that's optimized for efficient analytics. There are three medallion stages: bronze (raw), silver (validated), and gold (enriched).

For more information, see [What is the medallion lakehouse architecture?](/azure/databricks/lakehouse/medallion).

## Real-Time Intelligence Medallion Architecture

Real-Time Intelligence allows you to build a meallion lakehouse architecture by processing the data as it arrives. This enables you to build your Bronze, Silver, and Gold layer while mainting the real-time aspect of your data.

![Real-Time Intelligence Medallion Architecture](/media/medallian-architecture/Archetecture.png)

**Bronze Layer** 
- Contains the raw records that can land in either Eventstream or a table in Eventhouse.
- Mirrors the structure of the source system and can be utilized for Change Data Captu
 
**Silver Layer** 
- As data lands in the Bronze Layer it is transformed and enriched to add business value, including deduplication of records
- Data in Eventstream uses the [Event Processing](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/event-streams/process-events-using-event-processor-editor?pivots=enhanced-capabilities) capabilities, inserting the results into a table in Eventhouse
- Data in an Eventhouse table is processed immediately using an [Update Policy](https://learn.microsoft.com/en-us/kusto/management/update-policy?view=microsoft-fabric), inserting the results into a table in Eventhouse
- Deduplication occures via a [Materialized View](https://learn.microsoft.com/en-us/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric) in Eventhouse, maintining the real-time aspect of the solution by processing duplicate records as they arrive.

**Gold Layer** 
- Data in the gold layer is optimized for visualization needs while still maintaining the real-time aspect of your data
- Aggregate views are computed as data arrives via a [Materialized View](https://learn.microsoft.com/en-us/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric)
- Latest value views are also common via a [Materialized View](https://learn.microsoft.com/en-us/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric) allow quick acces to the latest received value based on your dataset

**Visualize and Act**
- Data can be visualized using many components such as Power BI, RTI Dashboards, or KQL Querysets
- The performnce capabilities of RTI allow these visuals to pull from both the Gold Layer for aggregated views and unlock high granularity analytics by pulling from the Silver Layer
- DataActivator unlocks the ability to act on data at any layer
  - As data arrives in Eventstream
  - High-Granular data in the Silver Layer
  - Aggregated Data from the Gold Layer

## Key Benefits of Medallion Lakehouse Architecture in Real-Time Intelligence

**Purposely Build**
Real-Time Intelligence in Microsoft Fabric was built to handle continuously flowing data along with high granularity data. The entire flow from Bronze to Gold is built into the product and with no scheduling is able to process the data from Bronze to Silver to Gold immediately as it arrives.

This is made possible by:
- [Event Processing](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/event-streams/process-events-using-event-processor-editor?pivots=enhanced-capabilities)
- [Update Policy](https://learn.microsoft.com/en-us/kusto/management/update-policy?view=microsoft-fabric)
- [Materialized View](https://learn.microsoft.com/en-us/kusto/management/materialized-views/materialized-view-overview?view=microsoft-fabric)

**Flexibility**
In a typical medallion lakehouse architecture, data is consumed only from the Gold Layer, loosing the individual records and preventing high-granular analytics. With Eventhouse you are able to consume data from both the Gold Layer or the Silver Layer, unlocking high-granularity analytics.

**Built-In Data Management**
Data at each layer has different requirements for retention and querying. This process is easily implemented via built-in capabilities.
- **Bronze Layer**
You may want to keep this data for Change Capture purposes and the ability to replay the data. If your Bronze Layer is utilizing Eventstream then you can output the data to OneLake before any transformations or enhancements are performed by the event processing. If your Bronze Layer is utilizing an Eventhouse table you can [mirror](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/event-house-onelake-availability) the data to OneLake.

- **Silver Layer**
Typically, at this layer you will have two tables. One for the transfromation and enhancements along wih a materialized-view for deduplications. On the first table you can set the [retention policy](https://learn.microsoft.com/en-us/kusto/management/retention-policy?view=microsoft-fabric) to 0 days meaning the data never shows up in the table but is stilled deduped by the materialized-view. The dedup materialized-view is used for high granular analytics, so setting both the [retention policy](https://learn.microsoft.com/en-us/kusto/management/retention-policy?view=microsoft-fabric) for how long you want to keep the data and the [caching policy](https://learn.microsoft.com/en-us/kusto/management/cache-policy?view=microsoft-fabric) based on your query patterns allows you to optimize your cost. Many time the silver layer is not needed for the length of time the Gold Layer is.

- **Gold Layer**
This layer is optimized for visualization with your aggregate materialized-view and latest value materialized-view. In most scenarios this down-sampled data is kept and queried for a longer period of time than your Silver Layer. By utilizing [retention policy](https://learn.microsoft.com/en-us/kusto/management/retention-policy?view=microsoft-fabric) for how long you want to keep the data and the [caching policy](https://learn.microsoft.com/en-us/kusto/management/cache-policy?view=microsoft-fabric) based on your query patterns, this process is handle nativly.

**Native Visualization Layer**
With a single click I can pin any query from the Gold or Silver layer into a new or existing Power BI Report or RTI Dashboard.

**OneLake Availability**
Taking your data from the Silver Layer and expose it as delta parquet in OneLake via [Eventhouse OneLake Availability](https://learn.microsoft.com/en-us/fabric/real-time-intelligence/event-house-onelake-availability). RTI wil maintain the data based on your retention policy and you are only charged for a single copy of the data.

## Related content

For more information about implementing a Fabric lakehouse, see the following resources.

- [Microsoft Fabric decision guide: choose a data store](../get-started/decision-guide-data-store.md)
- Questions? Try asking the [Fabric community](https://community.fabric.microsoft.com/).
- Suggestions? [Contribute ideas to improve Fabric](https://ideas.fabric.microsoft.com/).
