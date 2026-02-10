---
title: What Is Real-Time Intelligence in Microsoft Fabric?
description: Discover how Real-Time Intelligence in Microsoft Fabric empowers organizations to analyze, visualize, and act on streaming data for event-driven solutions.
#customer intent: As a data analyst, I want to understand how to use Real-Time Intelligence so that I can extract insights from streaming data.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: overview
ms.custom:
ms.date: 02/03/2026
ms.subservice: rti-core
ms.search.form: Overview
---

# What is Real-Time Intelligence?

Real-Time Intelligence is a powerful service that empowers everyone in
your organization to extract insights and visualize their data in
motion. It offers an end-to-end solution for scenarios where you need to respond to events as they happen, process continuously flowing data, or analyze logs. Whether dealing with gigabytes or
petabytes, all organizational data in motion converges in the Real-Time
Hub. It seamlessly connects time-based data from various sources using
no-code connectors, enabling immediate visual insights, geospatial
analysis, and trigger-based reactions that are all part of an
organization-wide data catalog.

Once you seamlessly connect any stream of data, the entire cloud-based solution
becomes accessible. Real-Time Intelligence handles data ingestion,
transformation, storage, modeling, analytics, visualization, tracking, AI, and
real-time actions. Your data remains protected, governed, and integrated
across your organization, seamlessly aligning with all Fabric offerings.
Real-Time Intelligence transforms your data into a dynamic, actionable
resource that drives value across the entire organization.

## Can Real-Time Intelligence help me?

Real-Time Intelligence can be used for data analysis, immediate visual
insights, centralization of data in motion for an organization, actions
on data, efficient querying, transformation, modeling, and storage of large
volumes of structured or unstructured data. Whether you need to evaluate
data from IoT systems, system logs, free text, semi structured data, or
contribute data for consumption by others in your organization,
Real-Time Intelligence provides a versatile solution.

Even though it's called "real-time," your data doesn't have to be
flowing at high rates and volumes. Real-Time Intelligence gives you
event-driven, rather than schedule-driven solutions. The Real-Time
Intelligence components are built on trusted, core Microsoft services,
and together they extend the overall Fabric capabilities to provide
event-driven solutions.

Real-Time Intelligence applications span a wide variety of business
scenarios, such as automotive, manufacturing, IoT, fraud detection,
business operations management, and anomaly detection.

## How do I use Real-Time Intelligence?

Real-Time Intelligence in Microsoft Fabric offers capabilities that, in
combination, enable the creation of Real-Time Intelligence solutions in
support of business and engineering processes.

:::image type="content" source="media/overview/overview-schematic.png" alt-text="Diagram of the architecture of Real-Time Intelligence in Microsoft Fabric." lightbox="media/overview/overview-schematic.png" border="none":::

-   The Real-Time hub serves as a centralized catalog within your organization. It makes it easy to find, add, explore, and share streaming data. By connecting to many different data sources, you can get insights across your entire organization. Importantly, this hub ensures that data isn't only available but also accessible to all, promoting quick decision-making, and informed action. The sharing of streaming data from diverse sources unlocks the potential to build comprehensive business intelligence across your organization.

- Once you select a stream from your organization or connected to
outside or internal sources, you can use the data consumption tools
in Real-Time Intelligence to explore your data. These tools let you explore your data visually and dig deeper into specific details. You can access data that's new to you and easily
understand the data structure, patterns, anomalies, forecasting
quantities, and data rates. Accordingly, you can act or make smart decision based on the data. Real-Time dashboards come equipped with out-of-the-box
interactions that simplify the process of understanding data, making
it accessible to anyone who wants to make decision based on data in
motion using visual tools, Natural Language, and Copilot.

-   These insights can be turned into actions with Fabric [!INCLUDE [fabric-activator](includes/fabric-activator.md)], as
    you set up alerts from various parts of Fabric to react to
    data patterns or conditions in real-time.

##  How do I interact with the components of Real-Time Intelligence?

### Discover streaming data

The Real-Time hub is used to discover and manage your streaming data.
Real-Time hub events is a catalog of data in motion, and contains:

-   **Data streams:** All data streams that are actively running in
    Fabric, which you have access to.

-   **Microsoft sources:** Easily discover streaming sources that you
    have and quickly configure ingestion of those sources into Fabric.
    Change Data Capture (CDC) sources track and stream changes made to your databases in real time,
    for example: Azure Event Hubs, Azure IoT Hub, Azure SQL DB CDC, Azure Cosmos DB CDC, PostgreSQL DB CDC.

-   **Fabric events**: Event-driven capabilities support real-time notifications and data processing. You can monitor and react to events including Fabric Workspace Item events and Azure Blob Storage events. These events can be used to trigger other actions or workflows, such as invoking a pipeline or sending a notification via email. You can also send these events to other destinations via eventstreams. 

This data is all presented in a readily consumable format and is
available to all Fabric workloads.

### Connect to streaming data

Eventstreams let you collect, transform, and send large amounts of real-time data to different destinations—all without writing code. Eventstreams support multiple data sources and data
destinations, including a wide range of connectors to external sources,
for example: Apache Kafka clusters, database change data capture feeds,
AWS streaming sources (Kinesis), and Google (GCP Pub/Sub).

### Process data streams

By using the event processing capabilities in Eventstreams, you can do
filtering, data cleansing, transformation, windowed aggregations, and
dupe detection, to land the data in the shape you want. You can also use
the content-based routing capabilities to send data to different
destinations based on filters. Another feature, derived eventstreams,
lets you construct new streams as a result of transformations and/or
aggregations that can be shared to consumers in Real-Time hub.

### Store and analyze data

Eventhouses are the ideal analytics engine to process data in motion. They're tailored to time-based, streaming events with structured, semi structured, and unstructured data. Your data is automatically organized based on when it arrived, so you can run fast, detailed queries even on large amounts of data. Data stored in eventhouses can be made available in OneLake for consumption by other Fabric experiences.

The indexed, partitioned data stored in eventhouses is ready for
lightning-fast query using various code, low-code, or no-code
options in Fabric. Data can be queried in native KQL (Kusto Query
Language) or using T-SQL in the KQL queryset. The Kusto copilot, along
with the no-code query exploration experience, streamlines the process
of analyzing data for both experienced KQL users and citizen data
scientists. KQL is a simple, yet powerful language to query structured,
semi-structured, and unstructured data. The language is expressive, easy
to read and understand the query intent, and optimized for authoring
experiences.

### Model data

Digital twin builder (preview) is a low-code/no-code experience for modeling your data as an ontology that digitally represents your physical environment. Modeling your assets and processes can help optimize physical operations using data, in a way that's accessible to operational decision-makers.

With digital twin builder, you can map data into your ontology from a variety of source systems, including Fabric OneLake, and define system-wide or site-wide semantic relationships to contextualize your data. Digital twin builder includes out-of-the-box visualization and query experiences to explore your modeled data, and uses the power of Microsoft Fabric to analyze large data sets like time series data and maintenance records that might stretch back over days, weeks, or months.  

Digital twin builder data can also be connected to Power BI or Real-Time dashboards for additional visualization and customized reporting of your modeled data.

### Visualize data insights

Data insights can be visualized in KQL querysets, Real-Time dashboards, Power BI reports, and maps, with seconds from data ingestion to insights. Visualization options range from no-code to fully specialized experiences, giving value to both the novice and expert insights explorer to visualize their data as charts and tables. You can use
visual cues to perform filtering and aggregation operations on query results and using a rich list of built-in visualizations. These insights can be viewed in Power BI Reports and Real-Time Dashboards, both of which can have alerts built upon the data insights.

Map in Microsoft Fabric is a dynamic geospatial visualization tool that empowers you to analyze both static and real-time spatial data for deeper intelligence. It supports multiple customizable data layers—such as bubbles, heatmaps, polygons, and 3D extrusions, allowing you to uncover spatial patterns and trends that traditional charts often miss. By integrating with Lakehouses and Eventhouses and enabling KQL queries with refresh intervals, Map facilitates real-time data analytics, helping teams monitor live changes, detect anomalies, and make timely decisions. With built-in map styles and support for formats like [GeoJSON](https://geojson.org/) and [PMTiles](https://docs.protomaps.com/pmtiles/), it’s a powerful asset for operational awareness and spatial intelligence. For more information, see [Create a map](./map/create-map.md). 

### Trigger actions

Alerts monitor changing data and automatically take actions when
patterns or conditions are detected. The data can be flowing in
Real-Time hub, or observed from a Kusto query or Power BI report. When
certain conditions or logic is met, an action is then taken, such as
alerting users, executing Fabric job items like a pipeline, or kicking
off Power Automate workflows. The logic can be either a simply defined
threshold, a pattern such as events happening repeatedly over a time
period, or the results of complex logic defined by a KQL query.
[!INCLUDE [fabric-activator](includes/fabric-activator.md)] turns your event-driven insights into actionable business
advantages.

## Integrate with other Fabric experiences

- [Route events from eventstreams to Fabric item destinations](event-streams/route-events-based-on-content.md)
- [Emit events from Fabric items into Real-Time hub](../real-time-hub/explore-fabric-workspace-item-events.md)
- Access data in OneLake from Real-Time Intelligence in several ways:
    - [Data from OneLake can be queried from Real-Time Intelligence as a shortcut](database-shortcut.md)
    - [Data from OneLake can be loaded into Real-Time Intelligence](get-data-onelake.md)
    - [Data loaded into Real-Time Intelligence is reflected in OneLake as one logical copy](one-logical-copy.md)
- [Use the data loaded into Real-Time Intelligence as the underlying data for visualization in a Power BI report](create-powerbi-report.md)
- [Use the data loaded into Real-Time Intelligence for analysis in Fabric Notebooks in Data Engineering](notebooks.md)


## Related content

- [End-to-end tutorial](tutorial-introduction.md)
- [What is Real-Time hub](../real-time-hub/real-time-hub-overview.md)
- [What is Fabric eventstreams](event-streams/overview.md)
- [What is [!INCLUDE [fabric-activator](includes/fabric-activator.md)]?](data-activator/activator-introduction.md)
- [User flows](user-flow-1.md)
