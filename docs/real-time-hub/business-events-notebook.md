---
title: Using Notebook as a Business Events Publisher
description: This article describes how to use a notebook to publish business events in Fabric Real-Time hub.
ms.topic: how-to
ms.date: 02/25/2026
---

# Using a notebook as a business events publisher

Notebooks provide one of the most flexible and programmable ways to publish business events in Microsoft Fabric. Notebooks can execute arbitrary Python logic, access datasets, call APIs, perform complex calculations, and integrate with machine learning workflows. They're uniquely suited for generating business events from analytical or operational computations.

By acting as publishers, notebooks allow teams to convert **analytical insights, failure detections,** and **custom business rules** directly into actionable business events that downstream systems can consume in real time.

## Why use a notebook to publish business events?

Eventstream is ideal for routing and transformation, but many real world scenarios require more advanced logic before an event is published:

* Data needs to be enriched or aggregated.
* A model must evaluate a prediction.
* A threshold must be computed dynamically.
* A decision is based on multiple datasets.
* Business rules depend on conditional logic.
* You want to embed a business event in a reproducible analysis pipeline.

Notebooks bring **full Python programmability**, enabling powerful, domain specific event generation without building external services.

## The built-in notebook publisher API

Fabric provides native support for business events inside notebooks through the `notebookutils.businessEvents` API. This API allows notebooks to publish events aligned with a business event schema defined in the Schema Registry in Fabric Real-Time hub.

This approach creates a strongly typed, contract-driven event publishing pattern right from the notebook. Developers can explore the sample methods in the API by using the `notebookutils.businessEvents.help()` method.

## Example: Publishing a business event from a notebook

A notebook publishes a business event by providing:

1. **eventSchemaSetWorkspace**: The Workspace where the Event Schema Set is stored. 

1. **eventSchemaSetName**: The Event Schema Set name.

1. **eventTypeName**: The business event name.

1. **eventData**: A data payload that matches the business event schema.

1. **dataVersion**: The version of the business event schema.

> [!NOTE]
> The properties `eventSchemaSetWorkspace` and `eventSchemaSetName` support both Fabric item names and Fabric item IDs.

For example, a simple event for delayed orders might look like: 

```python
    notebookutils.businessEvents.publish( 
    
    eventSchemaSetWorkspace="my-workspace-id", 
    
    eventSchemaSetName="OrderEvents", 
    
    eventTypeName="OrderDelayed", 
    
    eventData={"orderId": "12345", "status": "delayed", "reason": "weather"}, 
    
    dataVersion="v1" 
) 
```

This approach lets a notebook turn a business rule into a discrete business event that downstream users can subscribe to.

## Example: Applying custom logic before publishing

One of the strengths of notebooks is the ability to incorporate advanced business logic or custom computations before publishing an event. Consider a manufacturing scenario, where a notebook analyzes vibration changes from telemetry.

A business event such as `VibrationCriticalDetected` triggers when a machine’s vibration exceeds an acceptable threshold:

```python
notebookutils.businessEvents.publish( 

    eventSchemaSetWorkspace="ContosoWorkspace", 

    eventSchemaSetName="ManufacturingEquipmentHealth", 

    eventTypeName="VibrationCriticalDetected", 

    eventData={ 

        "MachineID": "12345", 

        "ProductionLineID": "WestLine01", 

        "MeasuredVibration": "1.52", 

        "ImpactAssessment": "Production slowdown risk", 

        "RecommendedAction": "Schedule maintenance" 

    }, 

dataVersion="v1"
) 
```

In this example, the notebook becomes the analytical engine evaluating whether the condition was met. Its computations are transformed into an actionable business event that is fully aligned with the organization’s schema definitions.

## Event publishing as part of a data or ML pipeline 

Because notebooks can operate interactively or through scheduled execution, they support multiple operational models:

* **Real-time/streaming analysis**: The notebook continuously processes sensor data and publishes events when conditions are triggered.

* **Batch-based insights**: A notebook aggregates daily or hourly data and publishes an event only when significant anomalies or thresholds are detected.
