---
title: JSON functions in Microsoft Fabric
description: Learn how to validate, extract, modify, and construct JSON with T-SQL functions in Fabric Data Warehouse and the SQL analytics endpoint.
ms.reviewer: jovanpop
ms.date: 11/18/2026
ms.topic: concept-article
ai-usage: ai-generated
---
# JSON functions in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Use T-SQL JSON functions to validate incoming documents, extract values, expand arrays
into rows, and construct JSON for client applications. These functions work in both
Fabric Data Warehouse and the SQL analytics endpoint.

JSON text can represent the following types:

- An *object* contains named properties, such as `{"name":"Central Park"}`.
- An *array* contains an ordered list of values, such as `["park","outdoor"]`.
- A *scalar* is a single value, such as a string, number, Boolean, or `null`.

Most functions return one value per input row. `OPENJSON` returns a table, while
`JSON_ARRAYAGG` and `JSON_OBJECTAGG` combine rows. `FOR JSON` formats query results;
it's a clause, not a function.

Examples use illustrative places, decimal-degree coordinates, and string tags.
They use constants or `VALUES`, require no tables, and don't change stored data.
JSON whitespace and object property order can vary without changing the result.

> [!IMPORTANT]
> The native `json` data type and `RETURNING json` aren't supported in Fabric Data
> Warehouse or the SQL analytics endpoint. JSON constructors and aggregates return
> `nvarchar(max)` text. The syntax blocks omit unsupported options.

Syntax blocks describe the grammar, not runnable queries. Square brackets mark
optional parts, `{ ... | ... }` marks a choice, `...n` indicates repetition, and
`::=` defines a syntax element.

## Use JSON paths

Functions such as `JSON_VALUE`, `JSON_QUERY`, and `OPENJSON` use a JSON path to locate
a value in JSON text. `$` represents the root, `.` selects a property, and brackets
select an array element. Array positions start at `0`.

| Path | Meaning |
|---|---|
| `$` | The whole document. |
| `$.name` | The `name` property at the root. |
| `$.location.lat`, `$.location.lon` | The latitude and longitude properties inside `location`. |
| `$.tags` | The whole `tags` array. |
| `$.tags[0]` | The first element of the `tags` array. |
| `$."opening hours"` | The `opening hours` property, such as `"06:00-01:00"`; quote names that contain spaces. |

Store a JSON object in `@Place`, then use `JSON_VALUE` for scalar text and `JSON_QUERY`
for the tags array. The `SELECT` returns one row:

```sql
DECLARE @Place varchar(max) = '{
    "name":"Central Park",
    "location":{"lat":40.7829,"lon":-73.9654},
    "tags":["park","outdoor"],
    "opening hours":"06:00-01:00"
}';

SELECT JSON_VALUE(@Place, '$.name') AS PlaceName,
       JSON_VALUE(@Place, '$.location.lat') AS Latitude,
       JSON_VALUE(@Place, '$.location.lon') AS Longitude,
       JSON_VALUE(@Place, '$.tags[0]') AS FirstTag,
       JSON_QUERY(@Place, '$.tags') AS Tags,
       JSON_VALUE(@Place, '$."opening hours"') AS OpeningHours;
```

| PlaceName | Latitude | Longitude | FirstTag | Tags | OpeningHours |
|---|---|---|---|---|---|
| Central Park | 40.7829 | -73.9654 | park | `["park","outdoor"]` | 06:00-01:00 |

Match property names exactly: JSON path matching is case-sensitive, even when SQL
string comparisons use a case-insensitive collation.

For `JSON_VALUE`, `JSON_QUERY`, and `OPENJSON`, paths accept an optional mode:

```syntaxsql
[ lax | strict ] json_path
```

`lax` is the default. An unmatched path returns `NULL` in `JSON_VALUE` or `JSON_QUERY`.
In `OPENJSON`, it returns no rows for the input path, or `NULL` for a `WITH` column
path. Prefix a path with `strict`, such as `'strict $.name'`, to raise an error
instead. Malformed JSON can cause errors in either mode.

## Validate JSON and check paths

Use `ISJSON` to check a document and `JSON_PATH_EXISTS` to check for a property.

- [`ISJSON`](/sql/t-sql/functions/isjson-transact-sql?view=fabric&preserve-view=true):
  Returns `1` when text matches the requested JSON type, `0` otherwise, or SQL `NULL`
  for a SQL `NULL` input.
  Without a type constraint, it accepts only an object or array.

  ```syntaxsql
  ISJSON ( expression [ , json_type_constraint ] )

  json_type_constraint ::= VALUE | ARRAY | OBJECT | SCALAR
  ```

  `VALUE` accepts any JSON value. Here, `SCALAR` means only a number or string, not
  a Boolean or JSON `null`. `ARRAY` and `OBJECT` require that top-level structure.
  `ISJSON` doesn't check for duplicate property names.

- [`JSON_PATH_EXISTS`](/sql/t-sql/functions/json-path-exists-transact-sql?view=fabric&preserve-view=true):
  Returns `1` when a path exists and `0` when it doesn't; returns SQL `NULL` for a
  SQL `NULL` input.

  ```syntaxsql
  JSON_PATH_EXISTS ( expression , path )
  ```

The `location` property exists even though its JSON value is `null`; `tags` is absent:

```sql
SELECT ISJSON('{"name":"Central Park"}') AS ValidObject,
       ISJSON('Central Park') AS InvalidText,
       JSON_PATH_EXISTS('{"location":null}', '$.location') AS HasLocation,
       JSON_PATH_EXISTS('{"location":null}', '$.tags') AS HasTags;
```

| ValidObject | InvalidText | HasLocation | HasTags |
|---|---|---|---|
| 1 | 0 | 1 | 0 |

`JSON_VALUE` returns SQL `NULL` for both JSON `null` and a missing property in lax
mode. `JSON_PATH_EXISTS` distinguishes them: the property exists only in the first
case.

Compare the `ISJSON` type constraints:

```sql
SELECT InputKind,
       ISJSON(JsonText) AS IsJson,
       ISJSON(JsonText, VALUE) AS IsValue,
       ISJSON(JsonText, SCALAR) AS IsScalar,
       ISJSON(JsonText, OBJECT) AS IsObject,
       ISJSON(JsonText, ARRAY) AS IsArray
FROM (VALUES
    (1, 'Object', '{"name":"Central Park"}'),
    (2, 'Array', '["park","outdoor"]'),
    (3, 'String', '"Central Park"'),
    (4, 'Number', '40.7829'),
    (5, 'Boolean', 'true'),
    (6, 'JSON null', 'null'),
    (7, 'SQL NULL', NULL)
) AS s(SortOrder, InputKind, JsonText)
ORDER BY SortOrder;
```

| InputKind | IsJson | IsValue | IsScalar | IsObject | IsArray |
|---|---|---|---|---|---|
| Object | 1 | 1 | 0 | 1 | 0 |
| Array | 1 | 1 | 0 | 0 | 1 |
| String | 0 | 1 | 1 | 0 | 0 |
| Number | 0 | 1 | 1 | 0 | 0 |
| Boolean | 0 | 1 | 0 | 0 | 0 |
| JSON null | 0 | 1 | 0 | 0 | 0 |
| SQL NULL | `NULL` | `NULL` | `NULL` | `NULL` | `NULL` |

## Extract values, objects, and arrays

Choose `JSON_VALUE` for a scalar and `JSON_QUERY` for an object or array.

- [`JSON_VALUE`](/sql/t-sql/functions/json-value-transact-sql?view=fabric&preserve-view=true):
  Extracts a scalar as `nvarchar(4000)` text, without JSON string quotes. The `path`
  argument is required.

  ```syntaxsql
  JSON_VALUE ( expression , path )
  ```

- [`JSON_QUERY`](/sql/t-sql/functions/json-query-transact-sql?view=fabric&preserve-view=true):
  Extracts an object or array as `nvarchar(max)` JSON text. The `path` argument is
  optional and defaults to `$`.

  ```syntaxsql
  JSON_QUERY ( expression [ , path ] )
  ```

This query reads a place, converts its coordinates to numbers, and extracts its tags:

```sql
SELECT JSON_VALUE(Document, '$.name') AS PlaceName,
       CAST(JSON_VALUE(Document, '$.location.lat') AS decimal(9,4)) AS Latitude,
       CAST(JSON_VALUE(Document, '$.location.lon') AS decimal(9,4)) AS Longitude,
       JSON_VALUE(Document, '$.tags[0]') AS FirstTag,
       JSON_QUERY(Document, '$.tags') AS Tags
FROM (VALUES ('{
    "name":"Central Park",
    "location":{"lat":40.7829,"lon":-73.9654},
    "tags":["park","outdoor"]
}')) AS s(Document);
```

| PlaceName | Latitude | Longitude | FirstTag | Tags |
|---|---|---|---|---|
| Central Park | 40.7829 | -73.9654 | park | `["park","outdoor"]` |

`JSON_VALUE` extracts even JSON numbers as text. Use `CAST` or `TRY_CAST` for numeric
or date values. `TRY_CAST` returns `NULL` for a failed supported conversion, but doesn't
prevent errors from malformed JSON.

In lax mode, `JSON_VALUE` returns `NULL` for an object or array, and `JSON_QUERY`
returns `NULL` for a scalar. In strict mode, these type mismatches raise errors.

For scalars longer than 4,000 characters, `JSON_VALUE` returns `NULL` in lax mode or
an error in strict mode. Use `OPENJSON` with a `varchar(max)` or `nvarchar(max)`
output column in `WITH` for longer values.

## Expand JSON into rows

Call `OPENJSON` in `FROM` to expand an array into rows. Use `WITH` to define the output
columns, data types, and property paths.

- [`OPENJSON`](/sql/t-sql/functions/openjson-transact-sql?view=fabric&preserve-view=true):
  Parses an array or object into rows and columns. Both `path` and `WITH` are optional.
  Omit `path` to start at `$`, the document root.

  ```syntaxsql
  OPENJSON ( json_expression [ , path ] )
      [ WITH ( <column_definition> [ , ...n ] ) ]

  <column_definition> ::=
      column_name data_type [ column_path ] [ AS JSON ]
  ```

This example extracts typed coordinates and preserves each place's tags array:

```sql
SELECT PlaceName, Latitude, Longitude, Tags
FROM OPENJSON('[
    {"name":"Central Park","location":{"lat":40.7829,"lon":-73.9654},
     "tags":["park","outdoor"]},
    {"name":"Bryant Park","location":{"lat":40.7536,"lon":-73.9832},
     "tags":["park"]}
]')
WITH (PlaceName varchar(40) '$.name',
      Latitude decimal(9,4) '$.location.lat',
      Longitude decimal(9,4) '$.location.lon',
      Tags nvarchar(max) '$.tags' AS JSON)
ORDER BY PlaceName;
```

| PlaceName | Latitude | Longitude | Tags |
|---|---|---|---|
| Bryant Park | 40.7536 | -73.9832 | `["park"]` |
| Central Park | 40.7829 | -73.9654 | `["park","outdoor"]` |

Each array element becomes one row. In `WITH`, a column that targets an object or
array needs `AS JSON` and the type `nvarchar(max)`; without `AS JSON`, it returns
`NULL` in lax mode. If you omit `column_path`, `OPENJSON` looks for a property with
the same name as the output column. Matching is case-sensitive.

Without `WITH`, `OPENJSON` returns `key`, `value`, and `type` for each immediate
property or array element at the selected path. This example reads the tags array:
indexes appear in `key`, and tag strings appear in `value`:

```sql
SELECT [key] AS TagIndex, value AS Tag
FROM OPENJSON('{"name":"Central Park","tags":["park","outdoor"]}', '$.tags')
ORDER BY CAST([key] AS int);
```

| TagIndex | Tag |
|---|---|
| 0 | park |
| 1 | outdoor |

Indexes in `key` are text; cast them to `int` to sort numerically.
To expand an array in each row of an existing table, use `CROSS APPLY OPENJSON(...)`.

## Modify JSON text

Use `JSON_MODIFY` to change JSON text. It doesn't update stored rows by itself.

- [`JSON_MODIFY`](/sql/t-sql/functions/json-modify-transact-sql?view=fabric&preserve-view=true):
  Returns JSON text with a property updated, inserted, or deleted.

  ```syntaxsql
  JSON_MODIFY ( expression , path , new_value )

  path ::= [ append ] [ lax | strict ] json_path
  ```

This example corrects a latitude and, separately, removes the `tags` property:

```sql
SELECT JSON_MODIFY('{"location":{"lat":40.78,"lon":-73.9654}}',
                   '$.location.lat', 40.7829) AS UpdatedLocation,
       JSON_MODIFY('{"name":"Central Park","tags":["park","outdoor"]}',
                   '$.tags', NULL) AS RemovedTags;
```

| UpdatedLocation | RemovedTags |
|---|---|
| `{"location":{"lat":40.7829,"lon":-73.9654}}` | `{"name":"Central Park"}` |

In default `lax` mode, SQL `NULL` deletes an existing property. In `strict` mode,
it sets that property's value to JSON `null`; a missing property causes an error.
To add a nested property, its parent object must already exist.

Use `append` to add an array element. The second call uses `strict` to keep the
property and replace its value with JSON `null`:

```sql
SELECT JSON_MODIFY('{"tags":["park"]}', 'append $.tags', 'outdoor') AS AppendedTag,
       JSON_MODIFY('{"tags":["park","outdoor"]}', 'strict $.tags', NULL) AS NullTags;
```

| AppendedTag | NullTags |
|---|---|
| `{"tags":["park","outdoor"]}` | `{"tags":null}` |

Wrap a new object or array in `JSON_QUERY` so `JSON_MODIFY` inserts it as JSON,
not as an escaped string:

```sql
SELECT JSON_MODIFY('{"name":"Central Park"}', '$.tags',
                   JSON_QUERY('["park","outdoor"]')) AS UpdatedDocument;
```

| UpdatedDocument |
|---|
| `{"name":"Central Park","tags":["park","outdoor"]}` |

## Construct JSON within a row

Use `JSON_OBJECT` for named properties and `JSON_ARRAY` for a list of values.
These functions convert SQL values to JSON and escape string content automatically.

- [`JSON_OBJECT`](/sql/t-sql/functions/json-object-transact-sql?view=fabric&preserve-view=true):
  Builds a JSON object from key-value pairs. By default, SQL `NULL` becomes JSON `null`.

  ```syntaxsql
  JSON_OBJECT ( [ key_expression : value_expression [ , ...n ] ]
                [ json_null_clause ] )

  json_null_clause ::= NULL ON NULL | ABSENT ON NULL
  ```

- [`JSON_ARRAY`](/sql/t-sql/functions/json-array-transact-sql?view=fabric&preserve-view=true):
  Builds a JSON array from values. By default, SQL `NULL` elements are omitted.

  ```syntaxsql
  JSON_ARRAY ( [ value_expression [ , ...n ] ] [ json_null_clause ] )

  json_null_clause ::= NULL ON NULL | ABSENT ON NULL
  ```

Both constructors return `nvarchar(max)` text.

In `JSON_OBJECT`, a colon separates each property name from its value. Nest constructors
to create the location object and tags array:

```sql
SELECT JSON_OBJECT(
    'name':'Central Park',
    'location':JSON_OBJECT('lat':40.7829, 'lon':-73.9654),
    'tags':JSON_ARRAY('park', 'outdoor')
) AS Place;
```

| Place |
|---|
| `{"name":"Central Park","location":{"lat":40.7829,"lon":-73.9654},"tags":["park","outdoor"]}` |

The coordinate `40.7829` becomes a JSON number, not the string `"40.7829"`.
Nested constructors preserve JSON structure. For object or array text from a column or
variable, wrap the value in `JSON_QUERY` to avoid quoting it as a string.

Use `NULL ON NULL` to keep SQL `NULL` as JSON `null`, or `ABSENT ON NULL` to omit
the property or array element:

```sql
SELECT JSON_OBJECT('location':NULL NULL ON NULL) AS KeepProperty,
       JSON_OBJECT('location':NULL ABSENT ON NULL) AS OmitProperty,
       JSON_ARRAY('park', NULL NULL ON NULL) AS KeepElement,
       JSON_ARRAY('park', NULL ABSENT ON NULL) AS OmitElement;
```

| KeepProperty | OmitProperty | KeepElement | OmitElement |
|---|---|---|---|
| `{"location":null}` | `{}` | `["park",null]` | `["park"]` |

### Escape string content

- [`STRING_ESCAPE`](/sql/t-sql/functions/string-escape-transact-sql?view=fabric&preserve-view=true):
  Escapes string content for JSON, rather than constructing an object or array.
  Returns SQL `NULL` for a SQL `NULL` input. The only supported escape type is `'json'`.

  ```syntaxsql
  STRING_ESCAPE ( text , 'json' )
  ```

```sql
SELECT STRING_ESCAPE('Near "Central Park"', 'json') AS EscapedText;
```

| EscapedText |
|---|
| `Near \"Central Park\"` |

The function doesn't add surrounding double quotes or create a complete JSON
document. Don't pre-escape values passed to `JSON_OBJECT` or `JSON_ARRAY`; those
functions already handle escaping.

## Aggregate rows into JSON

Use JSON aggregates to combine values from multiple rows. Add `GROUP BY` when
you need a separate JSON result for each group. These functions don't accept `OVER`.

- [`JSON_ARRAYAGG`](/sql/t-sql/functions/json-arrayagg-transact-sql?view=fabric&preserve-view=true):
  Combines values into a JSON array. By default, SQL `NULL` elements are omitted
  (`ABSENT ON NULL`).

  ```syntaxsql
  JSON_ARRAYAGG ( value_expression [ ORDER BY column_list ] [ json_null_clause ] )

  json_null_clause ::= NULL ON NULL | ABSENT ON NULL
  ```

- [`JSON_OBJECTAGG`](/sql/t-sql/functions/json-objectagg-transact-sql?view=fabric&preserve-view=true):
  Combines key-value pairs into a JSON object. By default, SQL `NULL` values become
  JSON `null` (`NULL ON NULL`).

  ```syntaxsql
  JSON_OBJECTAGG ( key_expression : value_expression [ json_null_clause ] )

  json_null_clause ::= NULL ON NULL | ABSENT ON NULL
  ```

Both aggregates return `nvarchar(max)` text.

This query creates a list of places and a name-to-latitude lookup:

```sql
SELECT JSON_ARRAYAGG(PlaceName ORDER BY PlaceName) AS PlaceNames,
       JSON_OBJECTAGG(PlaceName:Latitude) AS Latitudes
FROM (VALUES ('Central Park', 40.7829), ('Bryant Park', 40.7536)) AS p(PlaceName, Latitude);
```

| PlaceNames | Latitudes |
|---|---|
| `["Bryant Park","Central Park"]` | `{"Central Park":40.7829,"Bryant Park":40.7536}` |

The internal `ORDER BY` controls the order of array elements. An outer `ORDER BY`
doesn't control aggregation order. Use unique property names that aren't SQL `NULL`
for an unambiguous mapping.

The same null options keep or omit an unknown `access` value in an array and an object:

```sql
SELECT JSON_ARRAYAGG(AttributeValue ORDER BY SortOrder NULL ON NULL) AS KeepElement,
       JSON_ARRAYAGG(AttributeValue ORDER BY SortOrder ABSENT ON NULL) AS OmitElement,
       JSON_OBJECTAGG(AttributeName:AttributeValue NULL ON NULL) AS KeepProperty,
       JSON_OBJECTAGG(AttributeName:AttributeValue ABSENT ON NULL) AS OmitProperty
FROM (VALUES (1, 'category', 'park'), (2, 'access', NULL))
     AS p(SortOrder, AttributeName, AttributeValue);
```

| KeepElement | OmitElement | KeepProperty | OmitProperty |
|---|---|---|---|
| `["park",null]` | `["park"]` | `{"category":"park","access":null}` | `{"category":"park"}` |

## Format query results with FOR JSON

Use the [FOR JSON](/sql/relational-databases/json/format-query-results-as-json-with-for-json-sql-server?view=fabric&preserve-view=true)
clause to format an entire result set, rather than calling a constructor for each
row. `PATH` mode lets you choose property names and nesting through column aliases.
`AUTO` mode derives the structure from the query.

The complete supported `FOR JSON` clause is:

```syntaxsql
FOR JSON { AUTO | PATH }
    [ , ROOT [ ( 'root_name' ) ] ]
    [ , INCLUDE_NULL_VALUES ]
    [ , WITHOUT_ARRAY_WRAPPER ]
```

```sql
SELECT PlaceName AS name,
       Latitude AS [location.lat], Longitude AS [location.lon]
FROM (VALUES ('Central Park', 40.7829, -73.9654),
             ('Bryant Park', 40.7536, -73.9832)) AS p(PlaceName, Latitude, Longitude)
ORDER BY PlaceName
FOR JSON PATH;
```

The dotted aliases create a nested `location` object for each place:

```json
[
  {"name":"Bryant Park","location":{"lat":40.7536,"lon":-73.9832}},
  {"name":"Central Park","location":{"lat":40.7829,"lon":-73.9654}}
]
```

Properties with SQL `NULL` values are omitted unless you add `INCLUDE_NULL_VALUES`.
`ROOT` adds a wrapper object with a `root` property; `ROOT('places')` names that
property `places`. Use `WITHOUT_ARRAY_WRAPPER` for a single-row object; multiple
rows produce invalid JSON.

Wrap a column containing object or array JSON text in `JSON_QUERY(column_name)` to
embed it as JSON instead of an escaped string.

In Fabric, `FOR JSON` must be the last query operator and can't appear in a subquery.
Use constructors or aggregates for JSON expressions inside other queries.

### Store JSON text in a variable

To assign JSON text to a variable, use a constructor or aggregate instead of the
unsupported SQL Server pattern `SET @Content = (SELECT ... FOR JSON PATH)`:

```sql
DECLARE @Content nvarchar(max);

SELECT @Content = JSON_ARRAYAGG(PlaceName ORDER BY PlaceName)
FROM (VALUES ('Central Park'), ('Bryant Park')) AS p(PlaceName);

SELECT @Content AS Content;
```

| Content |
|---|
| `["Bryant Park","Central Park"]` |

## Fabric support and data types

Store JSON text in `varchar` columns in a warehouse; native `json` columns aren't
supported. You can use `nvarchar` in variables and query results, but not warehouse
table columns. See [Data types](data-types.md).

Use the text-based forms shown here rather than options that require the native
`json` type, such as `JSON_QUERY ... WITH ARRAY WRAPPER` or `JSON_VALUE ... RETURNING`.
The [JSON_CONTAINS](/sql/t-sql/functions/json-contains-transact-sql?view=fabric&preserve-view=true)
function isn't supported in Fabric Data Warehouse or the SQL analytics endpoint.

To read JSON files from a data lake with `OPENROWSET` before parsing their content,
see [Query JSON files](query-json-files.md).

## Related content

- [JSON functions (Transact-SQL)](/sql/t-sql/functions/json-functions-transact-sql?view=fabric&preserve-view=true).
- [Query JSON files](query-json-files.md).
- [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md).
- [Data types in Fabric Data Warehouse](data-types.md).
