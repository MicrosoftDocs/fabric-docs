---
title: Automate Fabric Maps with the REST API 
description: Learn about using Microsoft Fabric Maps REST API to programmatically create and manage map items in Microsoft Fabric.
ms.reviewer: smunk, sipa
ms.topic: article
ms.date: 04/22/2026
ms.search.form: Automate Fabric Maps
---

# Automate Fabric Maps with the REST API

Fabric Maps provides REST APIs that enables you to programmatically create and manage map items in Microsoft Fabric. This API allows you to automate map provisioning, apply consistent map definitions across environments, and integrate mapping workflows into applications and deployment pipelines.

This article introduces the Fabric Maps REST APIs, explains authentication and authorization, and describes how map definitions are represented and applied.

## What the Fabric Maps REST API enables

The Fabric Maps REST API allows you to:

* Create map items in a Fabric workspace.
* Apply a map definition that describes basemaps, data sources, layers, and rendering behavior.
* Update or replace existing map definitions.
* Integrate map creation into automated workflows such as CI/CD pipelines or data processing jobs.

The API follows standard REST patterns and uses the same security model as other Fabric REST APIs.

## Authentication and authorization

All Fabric Maps REST API requests must be authenticated using Microsoft Entra ID.

### Access tokens

Clients obtain an OAuth 2.0 access token from Microsoft Entra ID and include it in each request:

> `Authorization: Bearer <access-token>`

The access token represents the calling identity and its permissions in Fabric.

### Permissions model

The API enforces Fabric workspace and item permissions. To automate map operations, the calling identity must have appropriate access to:

* The target workspace
* Any map items being created or modified

> [!Important]
> The Fabric Maps REST API honors the same authorization rules as the Fabric UI. Automation does not bypass security boundaries.

## Fabric Maps item model

Fabric Maps uses the standard Fabric item model.

* A map is a first-class item stored in a workspace.
* Each map item has an item ID and metadata.
* Map items can be referenced by other Fabric workloads.

Automation typically involves:

1. Creating a map item.
1. Assigning or updating the map's definition.

## The map definition (map.json)

Fabric Maps are defined by a **public map definition**, commonly represented as a **map.json** payload. This definition is declarative and describes what the map should contain rather than how to render it procedurally.

A map definition can include:

* **Basemap configuration**
    Specifies the underlying basemap (for example, a standard vector basemap or a custom source).
* **Data sources**
    References to spatial data, such as GeoJSON files stored in OneLake or a Lakehouse.
* **Layer sources**
    Mappings that associate data sources with map layers.
* **Layer rendering settings**
    Styling and visualization rules that control how layers are drawn.

Because the definition is declarative, the same **map.json** can be reused across environments and updated incrementally.

## Referencing GeoJSON and Lakehouse data

Map definitions can reference spatial data stored in Fabric, such as GeoJSON files in a Lakehouse. This enables maps to be driven directly from curated data assets.

Common patterns include:

* Referencing GeoJSON files stored in OneLake paths.
* Updating GeoJSON content independently of the map definition.
* Reusing the same data source across multiple maps.

This separation allows data pipelines and map configuration to evolve independently.

## Order of operations

When automating Fabric Maps, there are two supported patterns:

### Option 1: Create the map, then assign the map definition

1. Create an empty map item.
1. Apply a map.json definition using a subsequent API call.

This approach is useful when:

* The map definition is generated dynamically.
* The map item must exist before configuration is finalized.

### Option 2: Create the map with the definition included

1. Create the map item.
1. Supply the map.json payload as part of the creation request.

This approach is useful for:

* Fully declarative deployments
* Infrastructure-as-code scenarios

Both patterns result in the same map state. The choice depends on how your automation workflow is structured.

## Error handling and validation

The Fabric Maps REST API uses standard HTTP status codes:

* **2xx** – Request succeeded
* **4xx** – Client error (invalid payload, insufficient permissions)
* **5xx** – Service-side failure

Automation scripts should:

* Validate request inputs before submission.
* Inspect response bodies for error details.
* Handle transient failures with retries where appropriate.

For more information, see [Handle errors when automating with the Fabric Maps REST API](rest-api-error-handling-best-practices.md).

## When to use the REST API

Use the Fabric Maps REST API when you need to create, configure, or manage maps programmatically, rather than through the Fabric user interface. The REST API is designed for automation, integration, and repeatability, and is most appropriate when maps are part of a broader solution lifecycle.

The REST API is a good fit in the following scenarios:

* **Automated map provisioning**

    Create maps as part of scripts, applications, or deployment pipelines instead of manually creating them in the UI. This is common when onboarding new workspaces or tenants.
* **CI/CD and infrastructure‑as‑code workflows**

    Store **map.json** definitions in source control and deploy them consistently across environments (development, test, and production) using automation.
* **Real‑time and event‑driven solutions**

    Programmatically create or update maps that visualize streaming data from Eventstreams and Eventhouse as part of real‑time operational systems.
* **Bulk or repeatable updates**

    Apply the same configuration or definition changes to multiple maps efficiently, such as styling updates, layer changes, or data source migrations.
* **Integration with external systems**

    Create or update Fabric maps in response to actions in other systems, such as provisioning workflows, configuration services, or custom applications.

### When not to use the REST API

The REST API isn't intended to replace the Fabric UI for all use cases. In particular, consider using the UI instead when:

* Designing or experimenting with maps interactively
* Exploring data, styling, and layer configuration visually
* Making one‑off or unplanned changes that don't need to be automated

In these cases, the Fabric UI provides faster feedback and a more intuitive authoring experience.

### REST API and UI work together

In practice, many solutions use both approaches:

* Use the UI to design and validate a map visually
* Extract or maintain the map definition
* Use the REST API to deploy, update, or manage that definition at scale

This hybrid approach combines the strengths of interactive authoring with the reliability of automation.

## Next steps

Review the Fabric Maps REST API reference.

> [!div class="nextstepaction"]
> [Map item definition](/rest/api/fabric/articles/item-management/definitions/map-definition)

Learn how to create and configure a Fabric Map using Python.

> [!div class="nextstepaction"]
> [Create and configure a Fabric Map using Python](create-configure-map-using-rest-api.md)

Tutorial that creates a map using GeoJSON as a data layer using REST API.

> [!div class="nextstepaction"]
> [Create a map using GeoJSON as a data layer using REST API](tutorial-create-fabric-map-python.md)
