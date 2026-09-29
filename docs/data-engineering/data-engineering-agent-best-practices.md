---
title: Best practices for the data engineering agent (Project Osmos)(preview)
description: Learn best practices for defining a Fabric data engineering agent (Project Osmos) outcome, protecting
  lakehouse data, selecting write patterns, and validating results.
author: vsarad
ms.author: vijaykris
ms.date: 08/22/2026
ms.topic: best-practice
ms.service: fabric
ms.subservice: data-engineering
ai-usage: ai-assisted
---

# Best practices for the Fabric data engineering agent (Project Osmos) - preview

Use these best practices to define complete outcomes, protect lakehouse data, make reruns predictable, and require measurable evidence of success from the Fabric data engineering agent (Project Osmos) tasks.

> [!IMPORTANT]
> The data engineering agent (Project Osmos) is in preview. Preview features are released with limited capabilities and are subject to separate [supplemental preview terms](https://go.microsoft.com/fwlink/?linkid=2240967). They're not intended for production use, aren't subject to service-level agreements, and might be available only in selected regions. For more information, see [Microsoft Fabric preview information](/fabric/fundamentals/preview).

## Define a complete Project outcome

The skill defines **Project outcome** as follows:

> Describe the complete end-to-end data engineering task. The data engineering agent receives it as one project.

Define the complete outcome rather than only the first implementation step.
Include these five elements:

| Element | Question to answer | Example |
|---------|--------------------|---------|
| Goal | What outcome should exist when the task completes? | Create a monthly supplier spend table. |
| Sources | Which data should the task use? | Read invoice CSV files and the Suppliers Delta table. |
| Transformations | What rules should the task apply? | Standardize supplier IDs, reject invalid dates, join suppliers, and aggregate monthly spend. |
| Outputs | What should the task create or update? | Write `monthly_supplier_spend` and save the transformation notebook. |
| Validation | How should data engineering agent prove success? | Reconcile invoice totals, check duplicate keys, and report rejected rows. |

Use this template:

```text
<goal>. Read <sources>. Apply <transformations>.
Create or update <outputs>. Validate <success criteria>. Preserve
<important constraints>.
```

## Set explicit boundaries

State which sources the data engineering agent can read, which destinations it can write to, and which existing artifacts it must preserve. Identify any schema, retention, regional-processing, or business-rule constraints that affect the task.

Fabric and OneLake permissions remain the authorization boundary. Don't include
credentials, access tokens, authorization headers, or sensitive data in a
Project outcome.

## Write a specific Project outcome

The following Project outcome examples combine a goal, sources,
transformations, outputs, constraints, and validation criteria.

### Data exploration

```text
Profile the customer_events table without modifying it.
Summarize schema, row count, date range, null rates, duplicate event IDs,
category distributions, and outliers. Save the analysis in a notebook.
```

### File ingestion

```text
Ingest JSON files from Files/device-events. Flatten the
event payload, standardize timestamps to UTC, quarantine malformed records,
write valid rows to device_events_bronze, and report processed, accepted,
and rejected counts.
```

### Data transformation

```text
Join Orders, OrderLines, Customers, and Products. Create
a Delta table named sales_order_detail with calculated line revenue and margin.
Validate referential integrity, duplicate order-line keys, and source-to-output
revenue totals.
```

### Data quality remediation

```text
Assess customer_master for missing identifiers, invalid
email addresses, duplicate customers, and inconsistent country codes. Propose
a safe remediation plan, apply the approved changes to a staged table, and
produce before-and-after quality metrics.
```

### Schema modernization

```text
Migrate the legacy_sales table to a documented schema
with typed dates, decimal monetary values, and standardized region codes.
Preserve the source table, create a tested notebook, and reconcile record
counts and revenue totals.
```

### Incremental load

```text
Build an incremental load from Files/orders-daily into
the Orders Delta table. Deduplicate by order_id and modified_at, update changed
orders, preserve unchanged rows, save the notebook, and validate inserted,
updated, unchanged, and rejected counts.
```

### Medallion architecture

```text
Build bronze, silver, and gold layers for product,
inventory, and supplier files. Preserve raw inputs in bronze, standardize and
deduplicate entities in silver, create a gold inventory-risk table, save all
notebooks, and validate each layer.
```

## Choose a safe write pattern

When you create a task, select a write pattern that matches the impact and reversibility of the task:

- **Clone-and-promote:** Test changes against a copy before moving verified output into place.
- **Staging table:** Write results separately for review or a controlled promotion step.
- **Iterate in place:** Modify the target directly. Use only when you understand the risk and recovery plan.
- **Deduplicating rerun:** Use a stable business key to prevent duplicate records.
- **Locked schema:** Reject unexpected schema changes.
- **Type-widening schema:** Permit compatible widening while preventing arbitrary changes.

Fabric permissions remain the hard authorization boundary. Don't rely only on
the Project outcome to protect critical data.

## Make reruns predictable

Tell the data engineering agent how to handle data that it processed previously. Use stable business keys and specify whether a rerun should fail, append new data, deduplicate records, merge changes, or replace the target.

For incremental tasks, ask for counts of inserted, updated, unchanged, and rejected records. Preserve source data and verified outputs unless replacement is an explicit part of the requested outcome.

## Related content

- [Fabric data engineering agent (Project Osmos) overview](data-engineering-agent-overview.md)
- [Get started with data engineering agent (Project Osmos)](data-engineering-agent-get-started.md)
- [Fabric data engineering agent (Project Osmos) GitHub repository](https://github.com/microsoft/project-osmos)
- [What is a lakehouse in Microsoft Fabric?](/fabric/data-engineering/lakehouse-overview)
