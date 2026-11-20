---
title: Semantic view YAML syntax reference
description: Define semantic views with YAML. Review supported properties, DAX expression rules, examples, and Fabric limitations.
ms.reviewer: vvereen
ms.topic: reference
ms.date: 10/20/2026
ms.search.form: Semantic views
ai-usage: ai-assisted
---

# Semantic view YAML syntax reference

This reference documents the YAML properties and publishing behavior supported by semantic views in Fabric. In this preview, supported constructs, file composition, and expression requirements differ from the [Apache Ossie core specification](https://github.com/apache/ossie/blob/main/core-spec/spec.md). Use this reference to author definitions for Fabric. To create and edit files, see [Create a semantic view](semantic-views-create.md).

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

**Currently supported version:** `0.2.0.dev0` (draft).

Set `version` to `0.2.0.dev0` in every YAML file.

## YAML structure

A definition can contain datasets, relationships, and metrics. This example defines two tables, a relationship, and a DAX metric:

```yaml
version: 0.2.0.dev0
name: sales_reference
description: Sales definitions for reports and agents.
datasets:
  - name: sales
    source: dbo.sales
    description: One row per sales transaction line.
  - name: customers
    source: dbo.customers
    description: One row per customer.
relationships:
  - name: sales_to_customers
    from: sales
    to: customers
    from_columns:
      - customer_id
    to_columns:
      - customer_id
metrics:
  - name: Total Net Sales
    description: Sales value after discounts.
    expression:
      dialects:
        - dialect: DAX
          expression: "SUM('sales'[net_amount])"
```

Keep the definition in one file or split it across files. For layouts and shortcut options, see [Organize the view folder](semantic-views-create.md#organize-the-view-folder).

## Publishing outcomes

The reference tables distinguish supported constructs, warnings, and validation failures:

| Outcome | Meaning |
|---|---|
| **Supported** | The construct is mapped to the generated semantic model. |
| **Warning** | Publishing succeeds. The construct is omitted from the generated model and named in the warning. |
| **Fail** | A validation error prevents publishing. |

Unsupported constructs and metric data-type declarations are omitted from the generated model with warnings rather than causing publishing to fail. The source YAML files aren't changed. A warning doesn't mean the omitted functionality is available in the generated model. Review warnings and verify downstream results.

This behavior doesn't bypass YAML or format validation. Malformed input, invalid supported definitions, and exceeded limits can still prevent publishing.


## Required properties

Each YAML file requires `version` and `name`. Other definitions can be split across files: a metrics file doesn't need its own `datasets` array when another file supplies those datasets. When you declare `datasets`, use a nonempty array. Publishing merges the files into one view. Relationships and metrics are optional; a view containing only datasets is valid.

The following table lists required properties for each file and for the constructs you declare:

| Level | Required properties |
|---|---|
| Each YAML file | `version`, `name` |
| Dataset | `name`, `source` |
| Relationship | `name`, `from`, `to`, `from_columns`, `to_columns` |
| Metric | `name`, `expression` |
| Expression object | `dialects` (at least one entry) |
| Each dialect entry | `dialect`, `expression` |

For a metric to appear in the generated semantic model, include an entry with `dialect: DAX` and a nonempty DAX expression. DAX is a Fabric publishing requirement, not a requirement of the standalone format.

> [!NOTE]
> You can publish metrics or relationships alone without declaring datasets. Datasets are inferred; relationships aren't. Metrics-only definitions aren't recommended when relationships are needed. Without explicit datasets, relationship table references resolve only in `dbo`; for other schemas, declare schema-qualified dataset sources. Each file still requires `version` and `name`.

## Document and model

Use `description` on the document, datasets, and metrics to help report authors and agents interpret the generated model. Descriptions are optional and carry into the model. Relationships don't support descriptions.

The top-level document `description` maps to one model description for the entire view. Define it in only one YAML file, or repeat exactly the same text in every file that defines it. Different top-level descriptions across files cause publishing to fail. Dataset and metric descriptions don't need to match the model description.

| Construct | Outcome | Notes |
|---|---|---|
| `version` | Supported | Must match the supported format version. A missing or unsupported version fails. |
| `name` | Supported | Required, but the value isn't used. The view folder name is used as the view and semantic model name. |
| `description` | Supported | Maps to the semantic model description. If defined in multiple files, the text must match exactly. Conflicting values fail publishing. |
| `datasets` | Supported | Maps dataset names to lakehouse tables. |
| `relationships` | Supported | Define explicitly when needed by measures. Single-column relationships only. |
| `metrics` | Supported | Metrics with valid DAX map to measures. |

For metadata that isn't applied to the model, see [AI context](#ai-context) and [Custom extensions](#custom-extensions).

## Datasets

Each dataset maps a name used in the view to a lakehouse table. For example, `name: sales` with `source: dbo.sales` lets expressions use `'sales'[net_amount]`. Columns come from the source table; don't declare them individually.

| Construct | Outcome | Notes |
|---|---|---|
| `name` | Supported | Must be unique within the view. Becomes the table name in the generated model. Differing from the source name renames the table in that model. |
| `source` | Supported | Specify the schema-qualified lakehouse table name, such as `dbo.sales`. Queries aren't supported as a source. |
| `description` | Supported | Maps to the table description. |
| `primary_key` | Warning | Primary keys are omitted with a warning. |
| `unique_keys` | Warning | Alternate keys are omitted. |
| `fields` | Warning | Explicit column definitions are omitted. Columns come from the lakehouse table. |

Schema qualification belongs only in the dataset's `source` property. Use the dataset's `name`, without a schema qualifier, in relationships and DAX expressions.

If tables have the same name in different schemas, define a dataset with a unique `name` for each table. For example:

```yaml
datasets:
  - name: retail_sales
    source: retail.sales
  - name: wholesale_sales
    source: wholesale.sales
```

Use `retail_sales` and `wholesale_sales` in relationship endpoints and DAX table references, not `retail.sales` or `wholesale.sales`. This example is a fragment to include in a definition with the required root properties.

## Relationships

Use `from` for the many side and `to` for the one side. The `from_columns` and `to_columns` arrays each contain exactly one column, as shown in the [YAML example](#yaml-structure). Every relationship is active, so define only one filter path between any two tables.

Set `from` and `to` to dataset names, not schema-qualified table names. If a referenced dataset isn't explicitly declared, the table is resolved in the `dbo` schema. Resolution succeeds if that table exists in `dbo`; it fails if the table exists only in a different schema. For a non-`dbo` table, declare its schema-qualified `source` under `datasets` and use the dataset's unique `name` in the relationship.

| Construct | Outcome | Notes |
|---|---|---|
| `name` | Supported | Must be unique within the view. |
| `from` | Supported | Must resolve to the many side. |
| `to` | Supported | Must resolve to the one side. |
| `from_columns` | Supported | Exactly one column for a supported relationship. |
| `to_columns` | Supported | Exactly one column. Must match the column count and order of `from_columns`. |

Referenced tables and columns must exist, and the column on the `to` side must contain unique values. Avoid duplicate, circular, or ambiguous filter paths. Relationships don't support a `description` property.

## Metrics

Each published DAX metric becomes a measure in a table named `Metrics` in the generated semantic model. A view without metrics doesn't get a `Metrics` table. Use the spaces and capitalization you want report authors and agents to see in metric names.

| Construct | Outcome | Notes |
|---|---|---|
| `name` | Supported | Becomes the measure name. Can't match a table name. Names differing only by case collide and fail. |
| `expression` | Supported | Must contain at least one dialect entry with a non-empty expression. |
| `description` | Supported | Maps to the measure description. |
| `datatype` | Warning | Ignored. Doesn't set the generated measure's data type. See [Data types](#data-types). |
| Metric with no DAX dialect | Warning | The metric is omitted from the model and named in the warning. |

Use valid DAX and ensure all table, column, and measure references resolve. A measure that depends on an omitted metric can't be evaluated correctly.

## Expressions and dialects

Nest each expression under `expression.dialects`, and set `dialect` to `DAX` for metrics you want to publish. Quote the expression so YAML doesn't misread characters such as `[` and `'`.

Reference columns as `'Table Name'[Column Name]`, using the dataset's YAML `name`, not its underlying `source`. Reference other metrics as `[Metric Name]`. Metrics can depend on other metrics as long as the dependencies resolve without a loop.

For example, these entries define an order count and a metric that uses it with `Total Net Sales` from the [YAML example](#yaml-structure):

```yaml
metrics:
  - name: Order Count
    expression:
      dialects:
        - dialect: DAX
          expression: "DISTINCTCOUNT('sales'[sale_id])"
  - name: Average Order Value
    expression:
      dialects:
        - dialect: DAX
          expression: "DIVIDE([Total Net Sales], [Order Count])"
```

The `dialects` list lets one definition carry expressions for multiple engines.

| Construct | Outcome | Notes |
|---|---|---|
| `dialects` | Supported | DAX is published. An empty array fails. |
| `DAX` | Supported | Required for a metric to appear in the generated semantic model. |
| `ANSI_SQL`, `SNOWFLAKE`, `MDX`, `TABLEAU`, `DATABRICKS`, `MAQL`, `BIGQUERY` | Warning | Recognized but not published. If DAX is absent, the metric is omitted. |

When multiple dialects are present, DAX is used and others are omitted with warnings.

## Unsupported properties

The following properties aren't applied to the generated model.

### Fields and dimensions

Explicit column and dimension definitions in `fields` are omitted from the generated model with warnings. Columns and their data types come from the lakehouse tables.

Each dataset's `fields` entries can contain the following properties. These properties aren't applied to the generated model because the containing field definition is omitted.

| Property within a field | Description |
|---|---|
| `name` | Identifies the field within the dataset. |
| `expression` | Defines the field expression through `dialects` entries. |
| `dimension` | Contains dimension metadata. |
| `dimension.is_time` | Marks the field's role as a time dimension, independently of its data type. |
| `label` | Provides a categorization label. |
| `description` | Describes the field. |
| `datatype` | Declares the field's logical data type. |
| `ai_context` | Provides [AI context](#ai-context) for the field. |
| `custom_extensions` | Contains [vendor-specific metadata](#custom-extensions) for the field. |

### Data types

The metric `datatype` property is omitted with a warning. The declared value doesn't set or convert the generated measure's data type. The DAX expression determines the result's type. Column data types come from the lakehouse tables.

### AI context

The `ai_context` property can contain a string or an object with instructions, synonyms, and examples. This metadata isn't mapped to the generated semantic model and produces warnings. Don't rely on it to configure the model. This YAML property is distinct from the lakehouse's `Context` folder.

The `ai_context` property can appear on the document, datasets, relationships, fields, and metrics. Its object form includes the following fields:

| Property | Type | Description |
|---|---|---|
| `ai_context.instructions` | String | Guidance for AI tools on how to use the definition. |
| `ai_context.synonyms` | Array | Alternative names and terms for the definition. |
| `ai_context.examples` | Array | Sample questions or use cases. |

These fields are omitted along with their containing `ai_context` property.

### Custom extensions

The `custom_extensions` property is omitted with warnings, including Microsoft extensions. Adding an extension doesn't enable additional modeling capabilities or override the supported behavior described in this article.

The `custom_extensions` property is an array on the document, datasets, relationships, fields, and metrics. Each entry contains the following properties:

| Property within an extension | Type | Description |
|---|---|---|
| `vendor_name` | String | Identifies the vendor or organization. |
| `data` | String | Contains vendor-specific data encoded as a JSON string. |

These fields are omitted along with their containing `custom_extensions` property.

## Size and file limits

These limits apply to each semantic view:

| Resource | Maximum | Scope |
|---|---|---|
| YAML file count | 20 files | All `.yaml` files read for the view, including subfolders and shortcut content. |
| Combined YAML size | 16 MB | Total size of those `.yaml` files, not a per-file allowance. |
| Generated TMDL size | 30 MB | The compiled output for the view. |

Publishing fails if a limit is exceeded. Moving files into subfolders or accessing them through shortcuts doesn't increase the limits. Files without the `.yaml` extension are ignored without warnings and don't count toward the YAML file-count or input-size limits.

## Validation across files

Publishing validates the merged definition. The following rules apply across the view:

- Include the required properties and use spaces for indentation. Fill in each key's value or comment out the line; an empty value parses as null and fails validation. Empty or comment-only files aren't valid definitions.
- Use only properties, value types, and dialect names allowed by the supported format.
- Resolve duplicate names and conflicting definitions across files.
- Apply the [model description rule](#document-and-model) across all files, including files reached through shortcuts.
- Use valid DAX with resolvable table, column, and measure references.
- Keep the view within the [size and file limits](#size-and-file-limits). A view with no eligible YAML files fails.

For errors, warnings, and retry steps, see [Check the result](semantic-views-publish.md#check-the-result).

## Related content

- [Create a semantic view](semantic-views-create.md)
- [Tutorial: Build a semantic view](semantic-views-tutorial.md)
- [Publish a semantic view](semantic-views-publish.md)
- [Semantic view considerations and limitations](semantic-views-overview.md#considerations-and-limitations)
