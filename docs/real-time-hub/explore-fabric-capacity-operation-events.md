---
title: Explore Fabric capacity operation events in Fabric Real-Time hub
description: This article shows how to explore Fabric capacity operation events in Fabric Real-Time hub.
ms.reviewer: geguirgu
ms.topic: how-to
ms.date: 11/24/2026
ms.search.form: Explore Fabric capacity operation events
ms.custom: references_regions
---

# Explore Fabric capacity operation events in Fabric Real-Time hub

Fabric capacity operation events provide granular, per-operation information about workload activity. During the public preview of on-demand billing, these events include operations that consume provisioned capacity units (CUs) and operations that use on-demand billing. Use these events to create alerts on specific operations through Activator, or store them in an eventhouse for detailed drill-down and historical analysis at the workspace, item, and operation level.

[!INCLUDE [consume-fabric-events-regions](../real-time-intelligence/event-streams/includes/connectors/consume-fabric-events-regions.md)]

## View Fabric capacity operation events detail page

[!INCLUDE [event-consumer-region-note](./includes/event-consumer-region-note.md)]

1. In **Real-Time hub**, select **Fabric events**.
1. Select **Fabric capacity operation events** from the list.

    :::image type="content" source="./media/explore-fabric-capacity-operation-events/select-capacity-operation-events.png" alt-text="Screenshot that shows the selection of Fabric capacity operation events." lightbox="./media/explore-fabric-capacity-operation-events/select-capacity-operation-events.png":::
1. You see the detailed view for Fabric capacity operation events.

    :::image type="content" source="./media/explore-fabric-capacity-operation-events/capacity-operation-detail-page.png" alt-text="Screenshot that shows the detailed view for Fabric capacity operation events." lightbox="./media/explore-fabric-capacity-operation-events/capacity-operation-detail-page.png":::

## Actions

At the top of the detail page, you see the following two actions.

- **Create eventstream** - creates an event stream based on capacity operation events from the selected Fabric capacity.
- **Set alert** - sets an alert when a capacity operation matches specified conditions, such as high CU consumption, throttling delay, or failure status.

## See what's using this category

This section shows the items using Fabric capacity operation events. The following table describes the columns in the list.

| Column | Description |
| ------ | ------------ |
| Name | Name of the item that's using Fabric capacity operation events. |
| Type | Item type – Activator or Eventstream |
| Workspace | Workspace where the item lives. |
| Source | Name of the capacity that is the source of the events. |

## Event types

Fabric supports the following capacity operation events:

| Event type name | Description |
| --------------- | ----------- |
| Microsoft.Fabric.CapacityOperationEvents.Operation | Fabric emits this event for every operation that consumes provisioned capacity or uses on-demand billing. |

### Schemas

An event has the following top-level data:

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ----- |
| `source` | string | Identifies the context in which an event happened. For capacity operation events, this value is the tenant ID. | `00000000-0000-0000-0000-000000000000` |
| `subject` | string | Identifies the subject of the event in the context of the event producer. | `/capacities/<capacity-id>/workspaces/<workspace-id>/items/<item-id>` |
| `type` | string | Contains a value describing the type of event related to the originating occurrence. | `Microsoft.Fabric.CapacityOperationEvents.Operation` |
| `time` | timestamp | Timestamp of when the occurrence happened. | `2026-08-21T05:19:40.3996099Z` |
| `id` | string | Unique identifier for the event. | `00000000-0000-0000-0000-000000000000` |
| `specversion` | string | The version of the Cloud Event spec. | `1.0` |
| `dataschemaversion` | string | The version of the operation event data schema. Version 1.2 adds billing attribution properties. Consumers must continue to handle version 1.1 events, which don't include these properties. | `1.2` |

The `data` object has the following properties for Operation events:

#### Operation events schema

> [!NOTE]
> The operation table contains one row per operation that consumes capacity. Unlike the summary events, operation events aren't aggregated by time window - each row represents a distinct operation with its own duration, CU consumption, and status.

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `subscriptionId` | string | Azure subscription ID tied to the capacity. | `00000000-0000-0000-0000-000000000000` |
| `tenantId` | string | The tenant where the operation took place. The tenant ID always remains the same for your organization (although some organizations might have more than one tenant). Currently Real-Time hub returns data for your current tenant. | `00000000-0000-0000-0000-000000000000` |
| `capacityId` | string | The ID of the capacity on which the operation ran. A capacity always retains the same capacity ID, even if it's paused, restarted, scaled up, or scaled down. | `00000000-0000-0000-0000-000000000000` |
| `capacityName` | string | The name of the capacity on which the operation ran. You can change the capacity name without impacting the capacity ID. | `foocapacity` |
| `capacityFriendlyName` | string | The user-friendly display name of the capacity. | `foocapacity` |
| `capacitySku` | string | The SKU size of the capacity on which the operation ran at that time. SKUs can be scaled up or down at any time by admins, so the SKU may change for the same capacity ID. | `F128` |
| `billingMode` | string | Billing path used by the operation. `Capacity` identifies the provisioned capacity billing path, and `OnDemand` identifies on-demand billing. `Capacity` doesn't indicate whether the capacity was purchased as pay-as-you-go or reserved. | `OnDemand` |
| `billingCategory` | string | Billing category attributed to the operation. Use this property with `capacityId` to correlate an on-demand operation with an on-demand overview event. The value can be empty if the producer doesn't supply a category. A billing category is a billing grouping, not a meter, invoice line, or charge. | `DataScience` |
| `activationId` | string | Internal ID for the capacity activation instance. When a capacity is paused and restarted, it keeps the same capacity ID but gets a new `activationId`. | `00000000-0000-0000-0000-000000000000` |
| `workspaceId` | string | The ID of the workspace where the item that produced the operation lives. | `00000000-0000-0000-0000-000000000000` |
| `workspaceName` | string | The name of the workspace where the item that produced the operation lives. | `fooworkspace` |
| `itemId` | string | The ID of the Fabric item that produced the operation. | `00000000-0000-0000-0000-000000000000` |
| `itemName` | string | The name of the Fabric item that produced the operation. | `fooitem` |
| `itemKind` | string | The kind (type) of the Fabric item that produced the operation. | `Lakehouse, SynapseNotebook, KustoEventHouse` |
| `capacityUnitMs` | double | Total CU consumption in the window, in milliseconds. Use this value to attribute CU consumption to a specific operation, item, or workspace. | `1980000` |
| `durationMs` | long | Clock time duration of the operation, in milliseconds. | `30000` |
| `throttlingDelayMs` | long | Delay applied due to throttling, in milliseconds. A value of `0` indicates the operation wasn't throttled. | `0` |
| `operationId` | string | Unique run ID for the operation. Use this ID to correlate the event with other logs or telemetry. | `00000000-0000-0000-0000-000000000000` |
| `status` | string | Status of the operation (for example, `Success` or `Stopped`). | `Success, Stopped` |
| `operationStartTime` | UTC string | Timestamp when the operation began. | `2026-08-21T05:19:10.0246081Z` |
| `releaseType` | string | Indicates whether the operation is billed or unbilled. Emitted values are `Public` or `Preview`. | `Public / Preview` |
| `operationName` | string | Name/type of the operation (for example, Dataflow Refresh). | `Lakehouse Operations, Notebook HC Pipeline Run, Notebook Scheduled Run, EventHouse UpTime` |
| `utilizationType` | string | Whether the operation was interactive or background. | `Background` |
| `windowStartTime` | UTC string | Start of the smoothed window. | `2026-08-21T05:30:00.0000000Z` |
| `windowEndTime` | UTC string | End of the smoothed window. Can be 30 seconds to 24 hours after the start. | `2026-08-22T05:30:00.0000000Z` |
| `isVirtualWorkspaceName` | boolean | True if `workspaceName` is a placeholder. | `false` |
| `isVirtualItemName` | boolean | True if `itemName` is a placeholder. | `false` |
| `workloadAutoscaleCapacityUnitsLimit` | integer | Max CU limit for autoscale workloads. A value of `0` indicates no autoscale limit is applied. | `0` |
| `workspaceDomain` | string | Domain grouping of the workspace. | `Human Resources, Sales` |
| `workspaceDomainId` | string | GUID of the workspace domain. | `00000000-0000-0000-0000-000000000000` |
| `workspaceParentDomain` | string | Parent domain name (if nested). | `Sales, Finance` |
| `workspaceParentDomainId` | string | GUID of the parent domain. | `00000000-0000-0000-0000-000000000000` |
| `consumptionStartTime` | UTC string | Timestamp when consumption began for the operation. | `2026-08-21T05:19:40.3996099Z` |
| `identityType` | string | Type of identity that ran the operation (for example, UPN or Service Principal). | `FabricService` |
| `identityValue` | string | Actual identity value (for example, user email or service principal ID). | `Fabric Service` |

### Handle operation event schema versions

> [!NOTE]
> Operation events that use data schema version 1.1 don't distinguish between operations that use provisioned capacity and operations that use on-demand billing because they don't include `billingMode` or `billingCategory`.

When processing operation events:

- Check `dataschemaversion` before relying on billing attribution properties.
- Treat a missing or unrecognized `billingMode` as unknown. Don't classify the operation as `Capacity`.
- Allow `billingCategory` to be empty. If the value is empty, you can't attribute the operation to an on-demand overview event by using this property.
- Don't maintain a fixed allow list of billing category values. Fabric can add, split, or combine categories.
- Don't use `capacitySku` to determine the billing mode. Both F0 and paid capacities can produce on-demand billing usage.

## Subscribe permission
For more information, see [subscribe permission for Fabric events](fabric-events-subscribe-permission.md).

## Related content

- [Explore Fabric capacity overview events](explore-fabric-capacity-overview-events.md)
- [Explore Fabric capacity on-demand overview events](explore-fabric-capacity-on-demand-overview-events.md)
- [Azure, Fabric, and Business events capacity consumption](fabric-events-capacity-consumption.md)
