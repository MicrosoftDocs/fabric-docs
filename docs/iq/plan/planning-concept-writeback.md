---
title: Writeback Planning Data to Fabric SQL
description: Writeback persists plans, forecasts, budgets, and user inputs to Fabric SQL or OneLake, making planning data available across Fabric workloads. 
ms.date: 08/20/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Writeback

Writeback brings planning data into the broader Microsoft Fabric ecosystem. By persisting plans, forecasts, budgets, targets, assumptions, and user-entered updates in Fabric SQL or OneLake, writeback makes forward-looking data available to Power BI, semantic models, data agents, ontologies, pipelines, and other Fabric workloads. This capability enables organizations to move beyond reporting only on what happened in the past or monitoring what is happening now. When planning data is incorporated into analytics and AI experiences, the system can also reason against future objectives. Users can ask questions such as, “At our current rate, will we meet this year’s forecast?” or “Are we on track to remain within budget?” In this way, writeback serves as the bridge between planning and execution, giving Fabric’s reporting, data, and AI capabilities the forward-looking context needed to compare actual performance with intended outcomes.

## Integrate and consolidate planning data across Fabric

Plan across any data platform. OneLake mirroring brings data from external platforms into Fabric without extraction, duplication, or new data pipelines. Access planning data directly from platforms such as Snowflake, Databricks, BigQuery, SAP, and Oracle through OneLake.

:::image type="content" source="media/planning-concept-writeback/mirroring-onelake-writeback.png" alt-text="Diagram showing data mirrored from Snowflake, Databricks, BigQuery, SAP, and Oracle into OneLake, with writeback to a Fabric SQL database." lightbox="media/planning-concept-writeback/mirroring-onelake-writeback.png":::
Write planning changes back to a Fabric SQL database to consolidate planning data from across the organization in a single Fabric environment.

## Enable downstream reporting

Make consolidated planning data immediately available for downstream reporting, analysis, and validation in Microsoft Fabric. Once planning data is captured and consolidated, Power BI reports, semantic models, dashboards, and other Fabric workloads can consume it without maintaining separate copies of the data.

This capability creates a continuous flow from planning to reporting, allowing organizations to compare plans with actuals, validate inputs, monitor variances, and build executive dashboards using the same trusted planning data.

## Capture all planning inputs in a centralized writeback table

Store numeric values, text, dropdown selections, statuses, and user assignments alongside the relevant planning dimensions. Preserve context at specific points in time by keeping values, comments, statuses, categories, and assigned users together with the planning dimensions, making each record easier to interpret and trace.

:::image type="content" source="media/planning-concept-writeback/writeback-inserted-columns.png" alt-text="Diagram showing a planning sheet with numeric, text, dropdown, status, and person inputs written back to a Fabric SQL database." lightbox="media/planning-concept-writeback/writeback-inserted-columns.png":::

## Control how data is structured in the destination

Choose how to structure writeback data in the destination to support different storage and analysis requirements. Writeback supports long and wide formats, with optional change capture to store only modified records.

* **Long** — Stores each cell as a separate row.

    :::image type="content" source="media/planning-concept-writeback/writeback-long-format.png" alt-text="Diagram of writing back data in the long format where each cell is stored as a separate record in the database." lightbox="media/planning-concept-writeback/writeback-long-format.png":::

* **Wide** — Stores each measure from the planning sheet as a separate column in the database.

    :::image type="content" source="media/planning-concept-writeback/writeback-wide-format.png" alt-text="Diagram of the wide format where each measure in the planning sheet is mapped to a separate column in the database." lightbox="media/planning-concept-writeback/writeback-wide-format.png":::

* **Long with changes** — Stores change history for each cell, with each change stored as a separate row. Writes back only changed cells.
* **Wide with changes** — Stores change history, with each measure from the planning sheet stored as a separate column in the database. Writes back only changed records.

## Enable automatic writeback

Automatically write back changes as soon as existing planning data is updated or new data is entered. Auto-writeback eliminates the need for users to manually trigger writeback, ensuring that the destination stays synchronized with the latest planning data. This feature keeps data current and minimizes the risk of unsaved changes.

## Capture comments with writeback data

Capture row- or cell-level comments along with writeback data to provide context for planning inputs and changes. Users can add comments to explain assumptions, document decisions, or provide more information. The comments are written back with the corresponding data.

## Select measures to write back

Choose the measures to write back at runtime to control which data is saved. This selection allows a single writeback configuration to support different reporting or planning scenarios without requiring separate configurations for each set of measures.

## Filter writeback data

Write back a filtered subset of data dynamically at runtime. Control which data is included in writeback by applying custom filters or using built-in filtering options. Filter writeback data based on specific requirements, such as including only calculated rows or records with comments. This flexibility helps you decide which data to save to the writeback destination.

## Writeback column validation

Enforce data quality constraints before data is written back to your target destination.

* Can't be empty: Exclude null or empty cells so only valid data points are written back.
* Formula validation: Apply specific rules (for example, `Value > 500M` or cross-filtering conditions) to automatically exclude noncompliant cells.
* Prevent writeback: Stop the entire writeback process if any cell fails validation or contains empty fields, generating an exception log instead.

## Scenarios in writeback

Scenarios allow you to create and compare alternative versions of plans (such as base, optimistic, and pessimistic) without overwriting original baseline data.

When configuring data writeback settings, you can control which specific scenarios get committed to your database or destination. You can select or clear specific scenarios to write back. This granular control helps you decide whether draft or experimental scenarios remain local in the planning sheet or get persisted back to the Fabric SQL database.

:::image type="content" source="media/planning-concept-writeback/writeback-scenarios.png" alt-text="Diagram of capturing what-if scenarios such as optimistic and base and writing back selected scenarios to the database." lightbox="media/planning-concept-writeback/writeback-scenarios.png":::