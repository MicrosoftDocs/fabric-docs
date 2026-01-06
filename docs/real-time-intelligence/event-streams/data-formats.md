---
title: "Fabric Eventstream: Supported Data Formats"
description: Learn how Fabric Eventstream supports JSON, CSV, Avro, and text-based formats for event ingestion, transformation, and routing to various destinations.
#customer intent: As a data engineer, I want to understand the data formats supported by Fabric Eventstream so that I can ensure compatibility with my event payloads.
author: spelluru
ms.author: spelluru
ms.reviewer: ali
ms.date: 01/05/2026
ms.topic: concept-article
---

# Data formats supported by Fabric Eventstream 
Fabric Eventstream supports multiple data formats for input event payloads. This document outlines the supported formats – JSON, CSV, Avro, and several text-based formats – and explains how each format is handled in Eventstream. It also details when the Eventstream operator can be used to process data and which destinations each format can be routed to. The formats are categorized as follows: 

- **Natively supported formats (JSON, CSV, Avro)**: Fully supported by Eventstream for ingestion, transformation, and routing. You can route events in these formats to all destinations.
- **Direct ingestion text formats**: Additional plain text formats (for example, `PSV`, `TSV`) that Eventstream can ingest directly into Eventhouse or forward to custom endpoints. Eventstream doesn't parse these formats, so no transformations are supported. These formats aren't supported for Lakehouse or Activator destinations.
- **Pass-through formats**: Any other format can be passed through unparsed from source to a custom endpoint destination. You can ingest these formats into Eventstream with connector, but can't route these formats to Eventhouse, Lakehouse, or Activator.

## Natively supported formats: JSON, CSV, Avro 
Eventstream natively supports JSON, CSV, and Avro event payloads. The Eventstream operator can parse these formats, enabling transformations and full processing. You can deliver events in these formats to **all destinations** – Eventhouse, Activator, Lakehouse, and custom endpoints – without restrictions. 

### JSON 
Eventstream supports JSON (JavaScript Object Notation) event payloads in the typical form of newline-delimited text files. Each event can be a JSON object, and you can separate multiple JSON objects with newline characters (`\n` or `\r\n`). This support includes the [JSON Lines (JSONL)](http://jsonlines.org/) format, where each line is a JSON object. 

Supported JSON structures include: 

#### Flat JSON

##### Simple key-value pairs.

```json
{ "id": 1, "temperature": 72 } 
```
#### Nested JSON 

##### Objects within objects.

```json
{ 
    "device": { "id": "sensor1", "location": "Seattle" }, 
    "reading": { "temp": 72, "humidity": 40 } 
} 
``` 

#### JSON Arrays 

##### Arrays of objects or values.

```json
[ 
    { "id": 1, "temperature": 72 }, 
    { "id": 2, "temperature": 68 } 
] 
``` 

#### JSON Lines (NDJSON) 

##### Each line is a valid JSON object.

```json
{"id":1,"temperature":72} 
{"id":2,"temperature":68} 
```

Eventstream can natively interpret all these JSON formats. You can transform these events and route them to any destination. 

### Avro 

Avro is a binary serialization format. Fabric Eventstream supports Avro event payloads in several forms: 

- Raw Binary Avro: An [AVRO](https://avro.apache.org/docs/current/) format that supports [logical types](https://avro.apache.org/docs/++version++/specification/_print/). The supported compression codecs are null and deflate. Snappy isn't supported. The reader implementation of the apacheavro format is based on the official [Apache Avro library](https://github.com/apache/avro).
- Avro with schemas stored in Confluent Schema Registry.
- Other Avro formats (pass-through only) to custom endpoint.

The following table summarizes the Avro format support across different destinations:

| Format | Support transformation | Direct ingestion for Eventhouse | Push Eventhouse, Lakehouse, and Activator | Custom endpoint |
|-------------------------------|------------------------|-------------------------------|---------------------------------------|-----------------|
| Raw Binary Avro | Yes | Yes | Yes | Yes |
| Avro with schema in Confluent schema registry | Yes | Yes | Yes | Yes |
| Other format of Avro | No | No | No | Yes |

### CSV 
A text file with comma-separated values (,). See [RFC 4180: Common Format and MIME Type for Comma-Separated Values (CSV) Files](https://www.ietf.org/rfc/rfc4180.txt).

#### With header: 

The first row contains column names. 

```
Id, name, temperature
  1,Alice,72 
  2,Bob,68
```

#### Without header: 

No column names; data starts immediately. 

```
1,Alice,72 
2,Bob,68 
```

### Direct ingestion text formats (Eventhouse only) 

In addition to JSON, Eventstream can read events payload in the following text file formats (except for Event Hubs and IOT hub source). Use direct ingestion to route these events to Eventhouse. You can also consume these events directly from a custom endpoint. The Eventstream operator can't parse these events, and Eventstream can't send these events to Lakehouse or Activator.

The supported text formats for direct ingestion are: 

| Format | File extension | Description |
|--------|----------------|-------------|
| PSV | `.psv` | A text file with pipe-separated values (\|). |
| RAW | `.raw` | A text file whose entire contents is a single string value. |
| SCsv | `.scsv` | A text file with semicolon-separated values (;). |
| SOHsv | `.sohsv` | A text file with SOH-separated values. (SOH is ASCII codepoint 1; this format is used by Hive on HDInsight.) |
| TSV | `.tsv` | A text file with tab-separated values (\t). |
| TSVE | `.tsv` | A text file with tab-separated values (\t). A backslash character (\) is used for escaping. |
| TXT | `.txt` | A text file with lines delimited by \n. Empty lines are skipped. |

### Pass-through to custom endpoint (any format) 

Eventstream provides a flexible pass-through capability for any event format that doesn't fall into the above categories. In scenarios where the event payload is in an arbitrary or custom format, Eventstream connectors can still relay the data unmodified to a custom endpoint. 

- Supported sources: Any Eventstream source except Event Hubs or IoT Hub can utilize pass-through for unsupported formats.

- Destination: The data can only be sent to a custom endpoint when using pass-through.

- No transformation or additional destinations: The Eventstream operator doesn't parse or transform this data. So, pass-through events can't be ingested into Eventhouse nor sent to Lakehouse or Activator destinations.