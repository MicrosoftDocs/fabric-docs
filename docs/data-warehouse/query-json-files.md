---
title: Query JSON Files By Using Fabric Data Warehouse or SQL analytics endpoint
description: Learn how to query JSON files in data lake storage using the Fabric Data Warehouse or SQL analytics endpoint.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: jovanpop
ms.date: 02/11/2026
ms.topic: how-to
ms.search.form: Query JSON files
---

# Query JSON files

**Applies to:** [!INCLUDE [fabric-se-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this article, you'll learn how to query JSON files using Fabric SQL, including Fabric Data Warehouse and the SQL analytics endpoint. 

JSON (JavaScript Object Notation) is a lightweight format for semi-structured data, widely used in big data for sensor streams,
IoT configurations, logs, and geospatial data (for example, GeoJSON).

## Use OPENROWSET to query JSON files directly

In Fabric Data Warehouse and the SQL analytics endpoint for a Lakehouse, you can query JSON files directly in the lake using the `OPENROWSET` function.

```syntaxsql
OPENROWSET( BULK '{{filepath}}', [ , <options> ... ])
[ WITH ( <column schema and mappings> ) ];
```

When you query JSON files with OPENROWSET, you start by specifying the file path, which can be a direct URL or a wildcard pattern that targets one or more files. By default, Fabric projects each top-level property in the JSON document as a separate column in the result set.
For JSON Lines files, each line is treated as an individual row, making it ideal for streaming scenarios.

If you need more control:

- Use the optional `WITH` clause to define the schema explicitly and map columns to specific JSON properties, including nested paths.
- Use `DATA_SOURCE` to reference a root location for relative paths.
- Configure error handling parameters like `MAXERRORS` to manage parsing issues gracefully.

### Common JSON file use cases

Common JSON file types and use cases you can handle in Microsoft Fabric:

- Line-delimited JSON ("JSON Lines") files where each line is a standalone, valid JSON document (for example, an event, a reading, or a log entry).
   - The entire file isn't necessarily a single valid JSON document-rather, it's a sequence of JSON objects separated by newline characters.
   - The files with this format typically have extensions `.jsonl`, `.ldjson`, or `.ndjson`. Ideal for streaming and append-only scenarios-writers can append a new event as a new line without rewriting the file or breaking structure.
- Single-document JSON ("classic JSON") files with the `.json` extension where the entire file is one valid JSON document-either a single object or an array of objects (potentially nested).
   - It's commonly used for configuration, snapshots, and datasets exported in one piece.
   - For example, GeoJSON files commonly store a single JSON object describing features and their geometries.

## Query JSONL files with OPENROWSET

Fabric Data Warehouse and the SQL analytics endpoint for Lakehouse enable SQL developers to query JSON Lines (.jsonl, .ldjson, .ndjson) files directly from the data lake by using the `OPENROWSET` function.

These files contain one valid JSON object per line, making them ideal for streaming and append-only scenarios.
To read a JSON Lines file, provide its URL in the `BULK` argument:

```sql
SELECT TOP 10 *
FROM OPENROWSET(
    BULK 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.jsonl'
);
```

By default, `OPENROWSET` uses schema inference, automatically discovering all top-level properties in each JSON object and returning them as columns. 

However, you can explicitly define the schema to control which properties are returned and override inferred data types:

```sql
SELECT TOP 10 *
FROM OPENROWSET(
    BULK 'https://pandemicdatalake.blob.core.windows.net/public/curated/covid-19/bing_covid-19_data/latest/bing_covid-19_data.jsonl'
) WITH (
    country_region VARCHAR(100),
    confirmed INT,
    date_reported DATE '$.updated'
);
```

Explicit schema definition is useful when:

- You want to override default inferred types (for example, to force the **date** data type instead of **varchar**).
- You need stable column names and selective projection.
- You want to map columns to specific JSON properties, including nested paths.

## Read complex (nested) JSON structures with OPENROWSET

Fabric Data Warehouse and the SQL analytics endpoint for Lakehouse let SQL developers read JSON with nested objects or subarrays directly from the lake by using `OPENROWSET`. 

```json
{
  "type": "Feature",
  "properties": {
    "shapeName": "Serbia",
    "shapeISO": "SRB",
    "shapeID": "94879208B25563984444888",
    "shapeGroup": "SRB",
    "shapeType": "ADM0"
  }
}
```

In the following example, query a file that contains sample data and use the `WITH` clause to explicitly project its leaf-level properties:

```sql
SELECT
    *
FROM
  OPENROWSET(
    BULK '/Files/parquet/nested/geojson.jsonl'
  )
  WITH (
    -- Top-level field
    [type]     VARCHAR(50),
    -- Leaf properties from the nested "properties" object
    shapeName  VARCHAR(200) '$.properties.shapeName',
    shapeISO   VARCHAR(50)  '$.properties.shapeISO',
    shapeID    VARCHAR(200) '$.properties.shapeID',
    shapeGroup VARCHAR(50)  '$.properties.shapeGroup',
    shapeType  VARCHAR(50)  '$.properties.shapeType'
  );
```

> [!NOTE]
> This example uses a **relative path without a data source**, which works when querying files in your **Lakehouse** via its SQL analytics endpoint. In **Fabric Data Warehouse**, you must either:
> - Use an **absolute path** to the file, or  
> - Specify a **root URL** in an external data source and reference it in the `OPENROWSET` statement by using the `DATA_SOURCE` option. 

## Expand nested arrays (JSON to rows) with OPENROWSET

Fabric Data Warehouse and the SQL analytics endpoint for Lakehouse let you read JSON files with nested arrays by using `OPENROWSET`. Then, you can expand (unnest) those arrays by using `CROSS APPLY OPENJSON`. This method is useful when a top-level document contains a sub-array you want as one row per element.

In the following, simplified example input, a GeoJSON-like document has a features array:

```json
{
  "type": "FeatureCollection",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "shapeName": "Serbia",
        "shapeISO": "SRB",
        "shapeID": "94879208B25563984444888",
        "shapeGroup": "SRB",
        "shapeType": "ADM0"
      },
      "geometry": {
        "type": "Line",
        "coordinates": [[[19.6679328, 46.1848744], [19.6649294, 46.1870428], [19.6638492, 46.1890231]]]
      }
    }
  ]
}
```

The following query: 

1. Reads the JSON document from the lake by using `OPENROWSET`, projecting the top-level type property along with the raw features array.
1. Applies `CROSS APPLY OPENJSON` to expand the features array so that each element becomes its own row in the result set. Within this expansion, the query extracts nested values by using JSON path expressions. Values such as `shapeName`, `shapeISO`, and `geometry` details like `geometry.type` and `coordinates`, are now flat columns for easier analysis.

```sql
SELECT
  r.crs_name,
  f.[type] AS feature_type,
  f.shapeName,
  f.shapeISO,
  f.shapeID,
  f.shapeGroup,
  f.shapeType,
  f.geometry_type,
  f.coordinates
FROM
  OPENROWSET(
      BULK '/Files/parquet/nested/geojson.jsonl'
  )
  WITH (
      crs_name    VARCHAR(100)  '$.crs.properties.name', -- top-level nested property
      features    VARCHAR(MAX)  '$.features'             -- raw JSON array
  ) AS r
CROSS APPLY OPENJSON(r.features)
WITH (
  [type]           VARCHAR(50),
  shapeName        VARCHAR(200)  '$.properties.shapeName',
  shapeISO         VARCHAR(50)   '$.properties.shapeISO',
  shapeID          VARCHAR(200)  '$.properties.shapeID',
  shapeGroup       VARCHAR(50)   '$.properties.shapeGroup',
  shapeType        VARCHAR(50)   '$.properties.shapeType',
  geometry_type    VARCHAR(50)   '$.geometry.type',
  coordinates      VARCHAR(MAX)  '$.geometry.coordinates'
) AS f;
```

## Related content

- [Query external data lake files](query-external-data-lake-files.md)
- [Query delimited files](query-delimited-files.md)
- [Query Parquet files](query-parquet-files.md)