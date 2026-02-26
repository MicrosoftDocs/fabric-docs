---
title: Using Eventstream as a Business Events Publisher
description: This article describes how to use eventstreams to publish business events in Fabric Real-Time hub.
ms.topic: how-to
ms.date: 02/25/2026
---

# Using Eventstream as a business events Publisher

Eventstream is one of the most flexible and intuitive ways to publish business events in Microsoft Fabric. By using Eventstream, organizations can ingest real-time data from operational systems, apply lightweight transformations, and emit meaningful business events that carry full business context. This capability makes Eventstream ideal for scenarios where raw telemetry or device signals need to be elevated into actionable events for downstream analytics, automation, or business workflows.

When you configure Eventstream as a publisher, it becomes the bridge between **continuous data streams and well-defined business events** in the Real-Time hub.

> [!TIP]
> For a step-by-step walkthrough, see [Tutorial: Publish business events using Eventstream](tutorial-business-events-event-stream-user-data-function-activator.md).

## Transforming raw ingestion into business events

Eventstream provides a set of built-in transformation operations, such as filtering, managing fields, routing, grouping, or basic enrichment that can convert incoming operational data into discrete business events.

For example, consider a mobility dataset that continuously reports station-level availability for a bike-sharing network. Attributes include:

* BikepointID
* Street
* Neighborhood
* Latitude, Longitude
* No_Bikes
* No_Empty_Docks

Analysts and operations teams often need real-time signals about availability imbalances, such as stations that are full or empty. Eventstream can evaluate each incoming record and, through a simple transformation, identify when a station has **no empty docks left** — a meaningful business condition.

By applying a filter such as: `No_Empty_Docks == 0`

Eventstream converts high-volume telemetry into a **meaningful and actionable business event**, focusing only on the business-relevant occurrences, rather than the raw data stream. For example, `StationFullDetected` becomes the business event that downstream systems can react to, rather than processing every single update about station availability.

This selective transformation allows downstream systems, such as Activator workflows and pipelines, to react to actual business conditions instead of noisy and high-frequency data.

## Connecting Eventstream to a business event

Once a transformation produces a meaningful signal, Eventstream routes this output to a business events destination. This destination links the transformed data to a specific business event defined in the Real-Time hub.

Eventstream integrates natively with business events by:

* Discovering existing business events.

* Allowing creation of a new business event directly from the Eventstream canvas.
* Letting users name and register a publisher associated with that business event.

* Mapping source fields to the business event schema defined in the Event Schema Set.

This design ensures that publishers adhere to the organization’s **shared event models**, ensuring consistency across all producers and consumers.

## Schema mapping and event contracts

To produce a valid business event, Eventstream must map the transformed fields to the schema defined for the target event. This schema comes from the **Event Schema Set**, ensuring that each business event follows a predictable, governed structure.

For the **StationFullDetected** example, mapping typically involves aligning fields such as:

* BikepointID
* Neighborhood
* Timestamp
* Current availability
* Location details

These mappings ensure that every business event published follows the same structure, enabling consistent consumption across consumers.  

Schema mapping also enforces CloudEvents metadata, ensuring protocol consistency and event interoperability across Fabric consumers.

## Publishing and operationalizing the Eventstream

After defining transformations and schema mapping, publish the Eventstream to start producing business events. When you publish, you activate the pipeline, which enables:

* Continuous ingestion of the operational dataset.

* Real-time evaluation of the conditions defined in the transformation.

* Automatic publishing of business events whenever conditions are met.

* End-to-end routing of events into Real-Time hub.

After you publish, Eventstream becomes a **live operational publisher** for the selected business event (such as **StationFullDetected**).

## Related articles

- [Business Events in Microsoft Fabric](business-events-overview.md)
- [Tutorial: Publish business events using Eventstream](tutorial-business-events-event-stream-user-data-function-activator.md).