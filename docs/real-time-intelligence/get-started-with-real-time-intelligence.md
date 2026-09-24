---
title: Get started with Real-Time Intelligence
description: Get oriented to Real-Time Intelligence in Microsoft Fabric. Find your entry point and learn which components you'll actually use in most streaming data solutions.
ms.reviewer: tzgitlin
ms.topic: overview
ms.date: 07/14/2026
ms.subservice: rti-core
ms.search.form: Get started
ai-usage: ai-assisted
#customer intent: As a new Real-Time Intelligence user, I want to find a starting point that matches my scenario, so that I can begin building without having to learn every component first.
---

# Get started with Real-Time Intelligence

Real-Time Intelligence (RTI) in Microsoft Fabric helps you ingest, store, query, visualize, and act on streaming data. The workload has many components, but you don't need to learn all of them to get started. This article helps you pick an entry point and identifies the components you'll actually use in most solutions.

For a broader description of the workload and its scenarios, see [What is Real-Time Intelligence?](overview.md)

## Start with a Real-Time Intelligence walkthrough

The fastest way to get comfortable with Real-Time Intelligence is to try a working solution before you build your own. Pick the walkthrough that matches how you learn best:

- **[Quickly provision a sample solution](sample-end-to-end.md)** - Fabric spins up a complete working solution (eventhouse, eventstream, KQL database, and Real-Time Dashboard) using sample bike-share data. Choose this path when you want to explore a finished product and see all the pieces working together, without configuring anything yourself. Takes a few minutes.
- **[Follow the nine-part end-to-end tutorial](tutorial-introduction.md)** - Build a similar solution yourself, one component at a time. You set up an eventhouse, ingest streaming data, transform it in Kusto Query Language (KQL), build a Real-Time Dashboard, add anomaly detection, and plot events on a map. Choose this path when you want to learn how each component works and fits together. Plan for an hour or more.

Both walkthroughs teach the core Real-Time Intelligence loop (ingest, store, query, visualize, and act) using the components most solutions actually use.

## Core Real-Time Intelligence components you'll use in most solutions

Nearly every Real-Time Intelligence solution combines the same handful of components. If you're new to the workload, learn these components first. Everything else is optional until a specific need drives you to it.

| To do this | Use this |
| --- | --- |
| Bring streaming data into Fabric | **[Eventstream](event-streams/overview.md)** - a no-code pipeline that connects to your streaming source, optionally transforms events, and lands them in a destination like an eventhouse. |
| Store and query that data | **[Eventhouse](eventhouse.md)** - an analytics database purpose-built for streaming data. Each eventhouse comes with a default [KQL database](create-database.md) that you query using KQL. |
| Explore and share queries | **[KQL queryset](create-query-set.md)** - a query workspace where you write, run, and share KQL queries against eventhouses and other Azure data sources. |
| Watch what's happening live | **[Real-Time Dashboard](real-time-dashboards-overview.md)** - tiles backed by KQL queries that refresh as new data arrives. |
| Take action when something interesting happens | **[Activator](data-activator/activator-introduction.md)** - a no-code rules engine that sends notifications or triggers Fabric jobs when a condition you define is met. |

**[Real-Time hub](../real-time-hub/real-time-hub-overview.md)** isn't something you build. Every Fabric tenant is provisioned with one automatically. Use it to discover streaming sources, browse the streams you have access to, and connect to data from Azure services and other clouds.

## Additional Real-Time Intelligence components you add when you need them

Don't try to learn these components upfront. Come back when a specific need drives you to them.

| If you need to | Reach for |
| --- | --- |
| Enforce a schema contract on events flowing through your streams | **[Event schema set (preview)](schema-sets/schema-registry-overview.md)** |
| Plot streaming or historical data on a map | **[Map](map/about-fabric-maps.md)** |
| Automatically surface unusual patterns in an eventhouse table | **[Anomaly Detector (preview)](anomaly-detection.md)** |
| Model your physical operations (assets, sites, equipment) as an ontology | **[Digital twin builder (preview)](digital-twin-builder/overview.md)** |

## Related content

- [What is Real-Time Intelligence?](overview.md)
- [End-to-end sample](sample-end-to-end.md)
- [Real-Time Intelligence tutorial](tutorial-introduction.md)