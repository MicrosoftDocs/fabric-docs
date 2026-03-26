---
title: Activator ingestion overview
description: Learn how Activator ingests data from query and streaming sources across Microsoft Fabric and Azure.
ms.topic: concept-article
ms.date: 02/27/2026
---

# Ingestion Overview

Activator can monitor data from a variety of sources across Microsoft Fabric and Azure. The articles in this section explain how each data source delivers data to Activator. Understanding this is useful for understanding how Activator rules behave.

Activator data sources fall into two broad categories:

- **Query data sources**: Activator periodically runs a query against a data store and evaluates your rules against the results.
- **Streaming data sources**: data is pushed into Activator continuously as events occur.

## Query data sources

- **[Power BI](ingestion-powerbi.md)**: Create rules directly from Power BI visuals. Activator connects to the underlying semantic model and queries it on a schedule.
- **[KQL Querysets](ingestion-kql-querysets.md)**: Write a KQL query against an Eventhouse KQL database. Activator runs your query on a schedule and evaluates rules against the results.
- **[Real-Time Dashboards](ingestion-realtime-dashboards.md)**: Create rules from Real-Time Dashboard tiles. Activator runs the tile's KQL query against the underlying Eventhouse on a schedule.

## Streaming data sources

- **[Eventstreams](ingestion-event-streams.md)**: Connect an Eventstream to Activator to evaluate rules against a continuous flow of events as they arrive.
- **[Fabric events](ingestion-fabric-events.md)**: Subscribe to activity within your Fabric environment (such as pipeline completions or OneLake file changes) and trigger rules when specific things happen.
- **[Azure events](ingestion-azure-events.md)**: Subscribe to Azure Blob Storage events and trigger rules based on activity in your Azure environment.
