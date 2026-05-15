---
title: Extract event metadata in Eventstream
description: Learn how to access and use system properties and custom properties from streaming sources in Microsoft Fabric Eventstream using the SQL operator.
ms.reviewer: xujiang1
ms.author: xujiang1
ms.topic: how-to
ms.custom: references_regions
ms.date: 05/15/2026
---

# Extract event metadata in Eventstream

This article describes how to access event metadata—including system properties and custom properties—from streaming sources in Microsoft Fabric Eventstream, and how to extract them using the SQL operator for downstream analytics.

## Why event metadata matters

When devices and applications send messages to cloud messaging services like Azure IoT Hub or Azure Event Hubs, each message is composed of three parts:

- **Event payload**: The actual data content (telemetry readings, business events, etc.).
- **System properties**: Platform-generated metadata stamped on each message by the messaging service, providing context about the message origin, timing, and routing.
- **Custom properties**: User-defined key-value pairs attached by the sender, carrying application-specific context such as device location, firmware version, batch ID, or priority level.

### Examples of system properties

Different messaging services provide different system properties. The following are examples from commonly used sources:

- **Azure IoT Hub** — `iothub-connection-device-id` (device identity), `iothub-enqueuedtime` (ingestion timestamp), `iothub-connection-auth-method` (authentication method), `iothub-message-source` (message type)
- **Azure Event Hubs** — `x-opt-enqueued-time` (ingestion timestamp), `x-opt-sequence-number` (sequence number), `x-opt-offset` (partition offset), `correlation-id` (correlation identifier), `content-type` (content type), `message-id` (message identifier)

### Why retaining metadata is essential

Retaining system properties and custom properties through the ingestion pipeline is critical for production workloads:

| Scenario | Required metadata |
|----------|-------------------|
| End-to-end latency monitoring | Ingestion timestamp (`iothub-enqueuedtime`, `x-opt-enqueued-time`) |
| Per-device analytics and dashboards | Device identity (`iothub-connection-device-id`) |
| Security auditing and zero-trust validation | Authentication method (`iothub-connection-auth-method`) |
| Event ordering and deduplication | Sequence number and offset (`x-opt-sequence-number`, `x-opt-offset`) |
| Conditional routing and filtering | Message source, custom properties |
| Business context enrichment | Custom properties (device location, firmware version, batch ID) |

Without access to these properties downstream, analytics pipelines lose the ability to correlate events with their origin, measure data freshness, or perform identity-based processing.

## Supported sources with metadata retention

Eventstream connectors preserve event metadata—both system properties and custom properties—when ingesting data from the following sources:

| Source | Metadata support |
|--------|-----------------|
| **Azure Event Hubs** (Extended features) | System properties and custom properties |
| **Azure IoT Hub** (Extended features) | IoT Hub system properties and custom properties |

> [!NOTE]
> For Azure IoT Hub and Azure Event Hubs, select **Extended features** when configuring the source in Eventstream to enable full metadata preservation.

## How metadata is retained in Eventstream

When Eventstream ingests events from a supported source, the connector copies both system properties and custom properties into the **user metadata section** of the event within Eventstream (the embedded Event Hubs).

### System properties

To distinguish system properties from custom properties, all source system property keys are prefixed with `___src__`. For example:

| Source | Original system property | Key in Eventstream metadata |
|--------|--------------------------|----------------------------|
| IoT Hub | `iothub-connection-device-id` | `___src__iothub-connection-device-id` |
| IoT Hub | `iothub-enqueuedtime` | `___src__iothub-enqueuedtime` |
| IoT Hub | `iothub-connection-auth-method` | `___src__iothub-connection-auth-method` |
| IoT Hub | `iothub-connection-auth-generation-id` | `___src__iothub-connection-auth-generation-id` |
| Event Hubs | `x-opt-enqueued-time` | `___src__x-opt-enqueued-time` |
| Event Hubs | `x-opt-sequence-number` | `___src__x-opt-sequence-number` |
| Event Hubs | `x-opt-offset` | `___src__x-opt-offset` |
| Event Hubs | `correlation-id` | `___src__correlation-id` |
| Event Hubs | `content-type` | `___src__content-type` |
| Event Hubs | `message-id` | `___src__message-id` |

### Custom properties

Custom properties are preserved with their **original key names** in the event metadata. No prefix is added, ensuring zero disruption to existing downstream logic that references these properties.

## Extract metadata using the SQL operator

Once events are flowing into Eventstream with metadata preserved, you can use the **SQL operator** (Transform events) to extract these properties using the built-in `GETMETADATAPROPERTYVALUE` function.

### Extract all properties

The following query extracts all properties—including the copied system properties and custom properties—into a single JSON object:

```sql
SELECT
    *,
    GETMETADATAPROPERTYVALUE(
        [your-source-stream], '[User]'
    ) AS AllProperties
INTO [your-destination]
FROM [your-source-stream]
```

### Extract specific metadata fields

You can also extract individual metadata fields for more targeted analysis:

```sql
SELECT
    *,
    GETMETADATAPROPERTYVALUE(
        [your-source-stream], '[User].[___src__iothub-connection-device-id]'
    ) AS DeviceId,
    GETMETADATAPROPERTYVALUE(
        [your-source-stream], '[User].[___src__iothub-enqueuedtime]'
    ) AS IoTHubEnqueuedTime
INTO [your-destination]
FROM [your-source-stream]
```

> [!NOTE]
> **Known limitation**: When using the `GETMETADATAPROPERTYVALUE` function in a SQL operator, query test in edit mode will run successfully but will not return results for the metadata properties extracted by this function


## End-to-end scenario: Measure IoT ingestion latency

This section walks through a complete scenario using the IoT Hub source connector to calculate end-to-end ingestion latency from IoT devices to Fabric Eventhouse.

### Prerequisites

- Access to a workspace in the Fabric capacity license mode or the trial license mode with Contributor or higher permissions.
- An Azure IoT Hub instance with devices sending telemetry.
- An Eventstream item created in your Fabric workspace.
- An Eventhouse item created in your workspace.

### Step 1: Configure the IoT Hub source with metadata preservation

1. Open your Eventstream or the Real-Time hub in Fabric.
1. Select **Add source** (in Eventstream) or **Add data** (in Real-Time hub) > **Azure IoT Hub**.
1. In the source configuration, select **Extended features** to enable the enhanced connector.
1. Complete the connection configuration details.
1. Select **Add** to start ingesting events with full metadata. See more detailed step in [Add Azure IoT Hub source to Eventstream](./add-source-azure-iot-hub.md)

With Extended features enabled, the connector preserves all IoT Hub system properties and custom properties when events land in Eventstream.

:::image type="content" source="media/extract-event-metadata-with-eventstream/azure-iothub-source-configuration.png" alt-text="Screenshot that shows the Azure iothub source configuration." lightbox="media/extract-event-metadata-with-eventstream/azure-iothub-source-configuration.png":::  

### Step 2: Add a SQL operator to extract metadata

1. In your Eventstream canvas, select **Transform events** > **SQL operator** (or drag a SQL operator from the toolbox).
1. Connect the IoT Hub source stream to the SQL operator input.
1. Enter the following query to extract the device ID and ingestion timestamp:

```sql
SELECT
    *,
    GETMETADATAPROPERTYVALUE(
        [your-iothub-stream], '[User].[___src__iothub-connection-device-id]'
    ) AS IoTDeviceId,
    GETMETADATAPROPERTYVALUE(
        [your-iothub-stream], '[User].[___src__iothub-enqueuedtime]'
    ) AS IoTHubEnqueuedTime
INTO [your-eventhouse-destination]
FROM [your-iothub-stream]
```

4. Connect the SQL operator output to your **Eventhouse** destination.

:::image type="content" source="media/extract-event-metadata-with-eventstream/sql-editor-query-in-eventstream.png" alt-text="Screenshot that shows the sql query inside eventstream's edit mode." lightbox="media/extract-event-metadata-with-eventstream/sql-editor-query-in-eventstream.png":::  

### Step 3: Query metadata in Eventhouse with KQL

Once data is flowing into Eventhouse, use Kusto Query Language (KQL) to perform real-time analytics on the metadata. The following query calculates the end-to-end ingestion latency:

```kusto
YourTable
| extend IoTHubEnqueuedTime = todatetime(IoTHubEnqueuedTime)
| extend IngestionLatency = ingestion_time() - IoTHubEnqueuedTime
| project IoTDeviceId, IoTHubEnqueuedTime, IngestionTime = ingestion_time(), IngestionLatency
| order by IngestionLatency desc
| take 100
```

To aggregate latency metrics per device:

```kusto
YourTable
| extend IoTHubEnqueuedTime = todatetime(IoTHubEnqueuedTime)
| extend IngestionLatency = ingestion_time() - IoTHubEnqueuedTime
| summarize
    AvgLatency = avg(IngestionLatency),
    MaxLatency = max(IngestionLatency),
    P95Latency = percentile(IngestionLatency, 95),
    MessageCount = count()
    by IoTDeviceId
| order by AvgLatency desc
```

:::image type="content" source="media/extract-event-metadata-with-eventstream/kql-query-in-kql-database.png" alt-text="Screenshot that shows the kql sql query inside eventhouse." lightbox="media/extract-event-metadata-with-eventstream/kql-query-in-kql-database.png":::  

## More scenarios enabled by metadata

Beyond latency monitoring, metadata preservation unlocks several production scenarios:

- **Per-device or per-publisher dashboards—Use device identity or publisher information from system properties to build real-time dashboards showing metrics per device, per application, or per location. For example, use the IoT Hub `iothub-connection-device-id` property to group telemetry by device.
- **End-to-end pipeline latency monitoring—Compare ingestion timestamps from system properties against downstream processing time to measure data freshness and detect pipeline bottlenecks. For example, use `x-opt-enqueued-time` from Event Hubs or `iothub-enqueuedtime` from IoT Hub.
- **Event ordering and deduplication—Use sequence numbers or offsets from system properties to detect duplicate events, ensure correct ordering, or implement exactly once processing logic in downstream consumers.
- **Security auditing—Monitor authentication patterns using authentication-related system properties to detect anomalies or unauthorized access across your device or application fleet.
- **Conditional routing—Route events to different destinations based on metadata values, such as separating telemetry from lifecycle events, or routing high-priority messages to a dedicated processing path.
- **Business context enrichment—Use custom properties (device location, firmware version, batch ID, priority level) for richer analytics without modifying the event payload schema.
- **Multi-destination fan-out with filtering—Combine the SQL operator's metadata extraction with multiple `INTO` clauses to route events to different destinations based on metadata values.

## Related content

- [Add Azure IoT Hub source to Eventstream](./add-source-azure-iot-hub.md)
- [Add Azure Event Hubs source to Eventstream](./add-source-azure-event-hubs.md)
- [Process events using the SQL operator](./process-events-using-sql-code-editor.md)
- [Add Eventhouse destination](./add-destination-kql-database.md)
