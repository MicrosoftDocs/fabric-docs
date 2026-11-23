---
title: Device Telemetry Avro Schema Example
description: Use a three-version device telemetry Avro example to create, import, and compare schemas in a Fabric event schema set.
ms.topic: sample
ms.date: 09/08/2026
ms.search.form: Schema Registry
ai-usage: ai-assisted
#customer intent: As a data engineer, I want realistic sample schemas so that I can try schema import and version comparison.
---

# Device telemetry Avro schema example

Use these three Avro definitions to try schema creation, bulk import, and version comparison. The example describes a device that reports environmental readings, firmware, location, and diagnostic information.

Each version keeps the record name `DeviceTelemetryEventData` and namespace `Fabrikam.IoT`. The file name identifies the sample version; it doesn't replace the version number assigned by the registry.

| Version | Changes | File name |
| --- | --- | --- |
| 1 | Defines device and tenant identifiers, capture time, temperature, humidity, and battery readings. | `Fabrikam.DeviceTelemetryEventData.v1.avsc` |
| 2 | Adds firmware information and an optional nested location record. | `Fabrikam.DeviceTelemetryEventData.v2.avsc` |
| 3 | Adds a status enum, an array of diagnostic codes, and a map of tags. | `Fabrikam.DeviceTelemetryEventData.v3.avsc` |

## Save the sample files

Copy each complete JSON definition into a separate UTF-8 text file with the file name shown. These files are schema definitions, not event payloads.

### Version 1

The first version defines the original device readings.

```json
{
  "type": "record",
  "name": "DeviceTelemetryEventData",
  "namespace": "Fabrikam.IoT",
  "doc": "Device environmental readings.",
  "fields": [
    { "name": "deviceid", "type": "string", "doc": "Unique device identifier." },
    { "name": "tenantid", "type": "string", "doc": "Tenant identifier." },
    { "name": "capturedAt", "type": { "type": "long", "logicalType": "timestamp-millis" }, "doc": "Capture time in UTC." },
    { "name": "temperatureC", "type": "double", "doc": "Temperature in degrees Celsius." },
    { "name": "humidityPct", "type": "double", "doc": "Relative humidity percentage." },
    { "name": "batteryPct", "type": "int", "doc": "Battery level percentage." }
  ]
}
```

### Version 2

The second version adds firmware information and a nullable location record. The nested record inherits the outer record's namespace.

```json
{
  "type": "record",
  "name": "DeviceTelemetryEventData",
  "namespace": "Fabrikam.IoT",
  "doc": "Device environmental readings with firmware and location.",
  "fields": [
    { "name": "deviceid", "type": "string", "doc": "Unique device identifier." },
    { "name": "tenantid", "type": "string", "doc": "Tenant identifier." },
    { "name": "capturedAt", "type": { "type": "long", "logicalType": "timestamp-millis" }, "doc": "Capture time in UTC." },
    { "name": "temperatureC", "type": "double", "doc": "Temperature in degrees Celsius." },
    { "name": "humidityPct", "type": "double", "doc": "Relative humidity percentage." },
    { "name": "batteryPct", "type": "int", "doc": "Battery level percentage." },
    { "name": "firmwareVersion", "type": "string", "default": "1.0.0", "doc": "Firmware version reported by the device." },
    {
      "name": "location",
      "type": [
        "null",
        {
          "type": "record",
          "name": "DeviceLocation",
          "fields": [
            { "name": "latitude", "type": "double", "doc": "Latitude in decimal degrees." },
            { "name": "longitude", "type": "double", "doc": "Longitude in decimal degrees." }
          ]
        }
      ],
      "default": null,
      "doc": "Optional location data."
    }
  ]
}
```

### Version 3

The third version adds device health and diagnostics. The array and map have empty defaults.

```json
{
  "type": "record",
  "name": "DeviceTelemetryEventData",
  "namespace": "Fabrikam.IoT",
  "doc": "Device environmental readings with health and diagnostics.",
  "fields": [
    { "name": "deviceid", "type": "string", "doc": "Unique device identifier." },
    { "name": "tenantid", "type": "string", "doc": "Tenant identifier." },
    { "name": "capturedAt", "type": { "type": "long", "logicalType": "timestamp-millis" }, "doc": "Capture time in UTC." },
    { "name": "temperatureC", "type": "double", "doc": "Temperature in degrees Celsius." },
    { "name": "humidityPct", "type": "double", "doc": "Relative humidity percentage." },
    { "name": "batteryPct", "type": "int", "doc": "Battery level percentage." },
    { "name": "firmwareVersion", "type": "string", "default": "1.0.0", "doc": "Firmware version reported by the device." },
    {
      "name": "location",
      "type": [
        "null",
        {
          "type": "record",
          "name": "DeviceLocation",
          "fields": [
            { "name": "latitude", "type": "double", "doc": "Latitude in decimal degrees." },
            { "name": "longitude", "type": "double", "doc": "Longitude in decimal degrees." }
          ]
        }
      ],
      "default": null,
      "doc": "Optional location data."
    },
    {
      "name": "status",
      "type": { "type": "enum", "name": "DeviceStatus", "symbols": ["ONLINE", "DEGRADED", "OFFLINE"] },
      "default": "ONLINE",
      "doc": "Current health status of the device."
    },
    { "name": "diagnosticCodes", "type": { "type": "array", "items": "string" }, "default": [], "doc": "Active diagnostic codes." },
    { "name": "tags", "type": { "type": "map", "values": "string" }, "default": {}, "doc": "Additional key-value metadata." }
  ]
}
```

## Try the versioning workflow

1. [Create a schema set](create-manage-event-schema-sets.md) named `Fabrikam device telemetry`.
1. [Import](import-event-schemas.md) the three files together. Review the detected order before confirming the import.
1. Open the imported schema and verify that version 3 is the latest definition.
1. [Switch to version 1](manage-event-schema-versions.md#view-a-schema-version) and confirm that the firmware, location, and diagnostic fields aren't present.
1. [Compare version 1 with version 3](manage-event-schema-versions.md#compare-schema-versions), and then compare version 2 with version 3.

Alternatively, create a schema from version 1 and update it with versions 2 and 3 in order. Use a separate schema set for this exercise so that you don't mix manual updates with the bulk-import result.

> [!NOTE]
> The examples use additive changes and defaults to make the differences easy to inspect. Defaults in an Avro definition don't guarantee that every producer, payload encoding, or destination accepts the change. Test your end-to-end pipeline before adopting a new version.

## Related content

- [Create and manage event schemas](create-manage-event-schemas.md).
- [Import event schemas](import-event-schemas.md).
- [View and compare event schema versions](manage-event-schema-versions.md).
