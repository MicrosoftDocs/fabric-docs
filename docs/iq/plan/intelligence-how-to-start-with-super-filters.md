---
title: Use Super Filter
description: Learn how to use Super Filter in planning intelligence sheets to create interactive, cross-filtered dashboards with multiple filter types in a single visual.
ms.topic: how-to
ms.date: 08/26/2026
---

# Use Super Filter

Super Filter is an all-in-one filtering visual in planning intelligence sheets that helps report developers and report builders create interactive, cross-filtered dashboards without adding multiple slicer visuals.

Super Filter combines eight filter types in a single visual:

- Calendar
- Facet
- Hierarchy
- Measure
- TreeMap
- Numeric
- Alphanumeric
- Play Axis

Unlike traditional slicers, which typically require a separate visual for each filter dimension, Super Filter provides multiple filtering capabilities in one visual. It also supports advanced capabilities such as cascading filters, KPI variance indicators, saved filter presets, conditional formatting, and animated playback.

## Get started with Super Filter

The following video provides a short introduction to getting started with Super Filter.

> [!VIDEO 7989baae-ce96-4b39-bcda-9c269c352225]

## Add Super Filter

To add Super Filter to an intelligence sheet:

1. Add the **Super Filter** visual to the intelligence sheet canvas.
2. Assign a field to the visual.
3. Review the filter type suggested by Super Filter.
4. If needed, open the **Format** pane and select a different filter type.

When you assign a field, Super Filter automatically detects whether the field is a date, text, hierarchy, or numeric field and suggests the most appropriate filter type.

You can override the suggested filter type and manually select any available filter type from the **Format** pane.

## Choose a filter type

Super Filter provides the following filter types:

| Filter type | Description |
| --- | --- |
| Calendar | Filters date fields. |
| Facet | Filters values from a field using a faceted filtering experience. |
| Hierarchy | Filters data organized into hierarchical levels. |
| Measure | Filters data based on measures. |
| TreeMap | Filters data using a treemap-based visualization. |
| Numeric | Filters numeric values. |
| Alphanumeric | Filters text or alphanumeric values. |
| Play Axis | Filters data using animated playback. |

## Use advanced filtering capabilities

Super Filter includes capabilities that help you build interactive dashboards:

- Cascading filters let filter selections work together across related fields.
- KPI variance indicators help display variance information with KPI values.
- Saved filter presets let users save and reuse filter selections.
- Conditional formatting lets you apply formatting based on data conditions.
- Animated playback lets users step through data by using the Play Axis filter type.
