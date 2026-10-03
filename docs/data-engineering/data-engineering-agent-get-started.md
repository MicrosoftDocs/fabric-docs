---
title: Get started with Fabric data engineering agent (Project Osmos) (preview)
description: Install the data engineering agent (Project Osmos) skill for GitHub Copilot CLI, Claude Code, or Codex, create your first Fabric task, and monitor it in Fabric or your client.
author: vsarad
ms.author: vijaykris
ms.date: 09/25/2026
ms.topic: get-started
ms.service: fabric
ms.subservice: data-engineering
ai-usage: ai-assisted
---

# Get started with Fabric data engineering agent (Project Osmos) (preview)

In this quickstart, you install the Fabric data engineering agent (Project Osmos) skill for GitHub Copilot CLI, Claude Code, or Codex, create a task for a Fabric lakehouse, and open the task in Fabric.

In this quickstart, you:

- Confirm the Fabric and local prerequisites
- Install the Skills for Fabric plug-in, which includes the data engineering agent (Project Osmos) skill
- Create a task that implements a retail medallion architecture
- Review the operating settings
- Monitor the task in your Fabric lakehouse

> [!IMPORTANT]
> The data engineering agent (Project Osmos) is in preview. Preview features are released with limited capabilities and are subject to separate [supplemental preview terms](https://go.microsoft.com/fwlink/?linkid=2240967). They're not intended for production use, aren't subject to service-level agreements, and might be available only in selected regions. For more information, see [Microsoft Fabric preview information](/fabric/fundamentals/preview).

## Prerequisites

Confirm these requirements before you start:

- A Fabric workspace assigned to an eligible Fabric capacity. Fabric trial SKUs aren't supported.
- A lakehouse in that workspace
- Contributor or higher permission on the workspace
- Enable the following **tenant settings** for your account and capacity:
  - Users can use Copilot and other features powered by Azure OpenAI
  - Users can use Copilot, AI Agents, and other AI experiences powered by OpenAI as a Microsoft Subprocessor (strongly recommended for best performance, but not required)
- The following tenant settings apply only if your capacity is in a region where OpenAI is unavailable:
  - Data sent to OpenAI as a Microsoft Subprocessor can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance
  - Data sent to Azure OpenAI can be stored outside your capacity's geographic region, compliance boundary, or national cloud instance
- From your **Capacity settings**, enabling **AI data transformation** is recommended but not required
- [Azure CLI](/cli/azure/install-azure-cli)
- A supported local agent:
  - [GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/set-up/install-copilot-cli) installed and authenticated
  - Claude Code
  - Codex and Git

For configuration guidance, see [Enable and configure Copilot in Microsoft Fabric](/fabric/fundamentals/copilot-enable-fabric).

## Install the data engineering agent (Project Osmos) skill

The data engineering agent (Project Osmos) skill is included in the Skills for Fabric collection.

1. Sign in to Azure with an identity that can access the target workspace and lakehouse:

   ```azurecli
   az login
   ```

   If you have access to multiple Microsoft Entra tenants, sign in to the tenant that contains your Fabric workspace.

1. Then, use the commands for your local agent to add the Skills for Fabric marketplace and install the Fabric collection.

   # [GitHub Copilot CLI](#tab/github-copilot-cli)
   
   Start GitHub Copilot CLI:
   
   ```console
   copilot
   ```
   
   Run these commands inside GitHub Copilot CLI:
   
   ```text
   /plugin marketplace add microsoft/skills-for-fabric
   /plugin install fabric-skills@fabric-collection
   ```
   
   # [Claude Code](#tab/claude-code)
   
   Run these commands in your terminal:
   
   ```console
   claude plugin marketplace add microsoft/skills-for-fabric
   claude plugin install fabric-skills@fabric-collection
   ```
   
   # [Codex](#tab/codex)
   
   Run these commands in your terminal:
   
   ```console
   codex plugin marketplace add microsoft/skills-for-fabric
   codex plugin add fabric-skills@fabric-collection
   ```
   
   ---

1. Restart GitHub Copilot CLI so the new skills load.

   ```console
   /quit
   ```

1. Verify the installation. Start GitHub Copilot CLI again and run:

   ```console
   /skills
   ```

Confirm that Project Osmos, shown as `project-osmos`, is available.

## Use the data engineering agent (Project Osmos)

Describe the complete data engineering outcome that you want the data engineering agent (Project Osmos) to deliver. Include the workspace, lakehouse, source data, transformations, expected outputs, and validation requirements:

> Describe the complete end-to-end data engineering task. The data engineering agent (Project Osmos) receives it
> as one project.

Include:

- **Sources:** Tables, folders, files, notebooks, or OneLake resources
- **Transformations:** Cleaning, joins, filters, calculations, or schema changes
- **Outputs:** Tables, notebooks, files, or summaries
- **Validation:** Row counts, null checks, uniqueness, reconciliation, or business rules

Sources and outputs aren't limited to the workspace where you created the task. If you have permission to access a resource, the task can access the resource on your behalf.

For example:

```text
Use Project Osmos in the Fabric workspace Sales Analytics and the lakehouse
SalesLakehouse.

Load the Orders and Customers tables, remove orders without a customer ID,
join the tables on customer ID, and calculate monthly revenue by customer
segment. Save the result as a Delta table named monthly_segment_revenue.
Validate row counts, null customer IDs, and negative revenue values.
```

Your local agent resolves the workspace and lakehouse, collects any required safety and output choices, and creates one remote Project Osmos task. It provides a Fabric task link for monitoring progress.

You don't need to find the workspace or lakehouse IDs or break down the work into simpler steps. Specify their names or provide a Fabric lakehouse URL, and submit the entire outcome as one task. Project Osmos handles the planning, sequencing, and validation.

## Review the task settings

Before the run starts, the data engineering agent (Project Osmos) classifies the task and recommends settings.

| Setting | Review question |
|---------|-----------------|
| Permission boundary | Which named resources should the task treat as read-only or writable? |
| Safety pattern | Should writes use staging, clone-and-promote, or direct iteration? |
| Promote step | How should verified staged output become the final output? |
| Rerun semantics | Should a rerun fail, append, deduplicate, or replace existing data? |
| Schema evolution | Can the output schema change, and under what constraints? |
| Artifact format | Should Project Osmos save a notebook or other artifact? |
| Artifact destination | Where should generated artifacts be stored? |
| Reasoning effort | How extensively should Project Osmos explore implementation options? |

You can change any of the recommended settings.

> [!IMPORTANT]
> The permission boundary guides the task, but Fabric and OneLake permissions remain the enforcement boundary. Protect sensitive resources with platform permissions.

## Monitor the task

After you accept the settings, Fabric data engineering agent (Project Osmos) runs the task with specialized agents in SparkCore, returns a task ID, and opens a Fabric lakehouse page that includes:

- Details from the intake questionnaire
- Spec
- Current status
- Agent activity

Because the task runs in Fabric on SparkCore instead of your local machine, it continues when your computer is off. To monitor progress, select your lakehouse in Fabric, and then select the task in the lakehouse explorer. You can also ask your local agent for the task status.

## Usage guidance

- Use Project Osmos through a local agent such as GitHub Copilot CLI, Claude Code, or Codex. Direct interaction with Project Osmos from Copilot in the Fabric portal isn't currently supported.
- Specify the intended workspace and lakehouse by name, or provide a Fabric lakehouse URL. You don't need to find the IDs yourself.
- Use Project Osmos for end-to-end data engineering that involves lakehouses, OneLake, Spark, notebooks, and tables.
- Ask your local agent to check a remote task's status, send follow-up instructions, cancel the task, or delete it.
- To continue working with an existing task, provide its task ID or Fabric task link.
- Review the proposed execution and safety choices before you permit changes to important or production data.

## Create your first task

This example requires only an empty lakehouse. Project Osmos creates the sample data and every required artifact, so you can use the product without preparing the lakehouse first.

Use Project Osmos to create a small retail medallion architecture. First ask your local agent to use Project Osmos:

```text
Create a Project Osmos task
```

After you identify your lakehouse by name or URL, you're asked to define an outcome for your project. Enter the following:

```text
Use Project Osmos to set up a simple retail medallion architecture in this
empty lakehouse. Create small sample CSV files for customers, products, and
sales under Files/landing. Build bronze tables that preserve the source data,
silver tables that clean and standardize it, and gold tables named
gold_daily_sales and gold_customer_sales.
Create three notebooks named 01_load_bronze, 02_transform_silver, and
03_build_gold that move the data through the layers. Run the notebooks in
order, and validate row counts, key uniqueness, referential integrity, and
revenue totals at each layer.
```

Submit the complete prompt as one task. Project Osmos plans and sequences the work, creates the sample data, tables, and notebooks, runs the notebooks in SparkCore, and checks the results.

When the task finishes, review these artifacts:

- Bronze customer, product, and sales tables that preserve the sample source data
- Silver tables with standardized data types, valid keys, and cleaned records
- Gold tables with daily sales and customer-level sales summaries
- Three notebooks that document and run the movement between layers
- Validation results for row counts, keys, relationships, and revenue totals

## Additional project outcome examples for complex use cases

Project Osmos is designed for complete data engineering outcomes, including work
that requires knowledge of enterprise applications, lakehouse discovery,
implementation experiments, and validation. A request sent to GitHub Copilot
without Project Osmos might produce a plausible notebook or code outline, but it
doesn't use the Project Osmos workflow to inspect the live lakehouse, compare
implementation options, run the code in Fabric SparkCore, and continue refining
the solution based on actual results.

### Create a Dynamics 365 customer lifecycle model

This concise project outcome asks Project Osmos to discover the available
application data:

```text
Use Project Osmos to create a trusted customer lifecycle model from the Microsoft Dynamics 365 data in this lakehouse.
```

**How Project Osmos might approach it:** Project Osmos explores the lakehouse to determine which Dynamics 365 applications and Dataverse tables are available. It identifies structures such as accounts, contacts, leads, opportunities, activities, cases, orders, and invoices; maps their relationships and status values; and evaluates how to represent the customer journey from acquisition through sales and service. It runs SparkCore code to validate relationship coverage, duplicate customers, orphaned activities, pipeline totals, order and invoice reconciliation, and lifecycle-stage calculations.

**Why Project Osmos is better suited:** Without Project Osmos, GitHub Copilot depends on you to identify the relevant Dynamics 365 and Dataverse tables, explain their relationships and option-set values, and execute each revision. Project Osmos can start from the outcome, investigate the lakehouse, and refine the implementation based on measured results.

### Model SAP order-to-cash data

This concise project outcome asks Project Osmos to determine how the SAP data is
represented in your lakehouse and build a useful order-to-cash model:

```text
Use Project Osmos to build an order-to-cash model from the SAP data in this lakehouse.
```

**How Project Osmos might approach it:** Project Osmos explores the lakehouse to identify the available SAP sales-order, delivery, billing, customer, and document-flow data. It looks for structures such as VBAK/VBAP, LIKP/LIPS, VBRK/VBRP, KNA1, and VBFA, or equivalent extracted views. It examines schemas and sample values, determines whether the extraction resembles SAP S/4HANA or SAP ECC structures, and tests alternative joins and document-flow logic. It then builds curated tables and notebooks and runs SparkCore checks for duplicate business keys, missing document links, quantity mismatches, and order-to-invoice reconciliation.

**Why Project Osmos is better suited:** GitHub Copilot used without Project Osmos would need you to locate the relevant tables, explain the SAP relationships, provide schemas, run the generated code, and return errors or results for each revision. Project Osmos performs that discovery and execution as part of one persistent Fabric task that executes autonomously on SparkCore.

### Reconcile NetSuite financials

This detailed project outcome supplies the business rules while leaving implementation details to Project Osmos:

```text
Use Project Osmos to create a financial reconciliation model from the NetSuite
data already loaded in this lakehouse. Preserve subsidiary, accounting period,
transaction, transaction line, account, accounting book, department, class,
location, transaction currency, and base currency. Build a monthly trial
balance with debit, credit, and net balances by subsidiary and account. Account
for intercompany transactions, elimination subsidiaries, and exchange rates.
Identify unbalanced entries, unmapped accounts, and periods that don't reconcile
to the source. Save the transformation and validation notebooks, and don't
modify the source tables.
```

**How Project Osmos might approach it:** Project Osmos inspects how NetSuite transactions, transaction lines, accounts, subsidiaries, accounting periods, currencies, and accounting books are represented in the lakehouse. It evaluates posting, consolidation, elimination, and currency-conversion options and uses staged outputs to compare results. It runs the notebooks in SparkCore and validates journal balance, document completeness, mapping coverage, and source-to-output totals before producing the final tables.

**Why Project Osmos is better suited:** Code generation alone can encode joins and calculations, but it can't reliably infer how a specific NetSuite extraction represents postings, accounting books, eliminations, and exchange rates or prove that the result reconciles without an iterative execution and validation loop.

### Build Salesforce pipeline and forecast metrics

```text
Use Project Osmos to build a trusted sales pipeline and forecast model from the
Salesforce data in this lakehouse. Preserve account, opportunity, owner,
product, stage, amount, probability, close date, forecast category, creation
date, and stage-history details. Produce current pipeline, stage conversion,
sales-cycle duration, pipeline coverage, forecast accuracy, and slipped-deal
metrics by region, segment, product, and owner. Handle deleted records, currency
conversion, changing opportunity ownership, and historical stage snapshots.
Save the notebooks, and validate the metrics against available Salesforce
totals and prior-period snapshots.
```

**How Project Osmos might approach it:** Project Osmos maps available Salesforce objects and extracts Account, Opportunity, OpportunityHistory, OpportunityLineItem, Product2, User, and forecast data. It compares current-state, history-based, and periodic-snapshot approaches and tests how the extraction represents currency, deletions, owner changes, and stage transitions. It runs candidate implementations in SparkCore and compares pipeline totals, conversion rates, forecast results, and historical snapshots.

**Why Project Osmos is better suited:** This outcome requires more than syntactically correct Spark. Project Osmos combines Salesforce domain reasoning with live data inspection, repeated execution, and reconciliation to find an implementation that works with the customer's actual extraction and history strategy.

### Modernize an existing lakehouse pipeline

```text
Use Project Osmos to assess the existing sales ingestion and transformation
notebooks in this lakehouse. Replace full reloads with an idempotent incremental
design, preserve late-arriving updates, prevent duplicate business keys, add
quarantine handling for invalid records, and create validation tables that
compare each run with the source. Keep existing downstream table names and
schemas unless a change is required. Test the new design against representative
data, compare it with the current implementation, and document the migration
and rollback steps.
```

**How Project Osmos might approach it:** Project Osmos inspects the current notebooks, tables, schemas, and data patterns; compares watermark, merge, and change-tracking options; and tests failure and rerun behavior. It runs both implementations in SparkCore against staged targets and compares row counts, duplicate keys, late-update handling, schema compatibility, and output totals.

**Why Project Osmos is better suited:** Coding agents used alone can suggest an incremental pattern, but you must supply the implementation context and execute each test. Project Osmos evaluates the existing lakehouse and validates competing designs before recommending and implementing the safer approach.

## Update Skills for Fabric

In GitHub Copilot CLI or Claude Code, update the installed Fabric collection:

```text
/plugin update fabric-skills@fabric-collection
```

For Codex, run `codex plugin marketplace upgrade fabric-collection`, and then run `codex plugin add fabric-skills@fabric-collection`.

## Current limitations

* Data engineering agent (Project Osmos) isn't currently available for workspaces that have outbound access protection enabled.

## Related content

- [Fabric data engineering agent (Project Osmos) overview](data-engineering-agent-overview.md)
- [Best practices for Fabric data engineering agent (Project Osmos)](data-engineering-agent-best-practices.md)
- [Fabric data engineering agent (Project Osmos) repository](https://github.com/microsoft/project-osmos)
- [Sign in with Azure CLI](/cli/azure/authenticate-azure-cli-interactively)
