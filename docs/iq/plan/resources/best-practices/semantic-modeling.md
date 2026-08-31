---
title: Semantic Model Best Practices for Planning
description: Semantic modeling best practices for planning in Fabric show how dimension-driven design overcomes fact table limits. Explore ten planning cases you can apply today.
ms.date: 08/03/2026
ms.topic: best-practice
---

# Semantic modeling best practices for planning in Fabric

Planning solutions built on semantic models often rely on the fact table to determine which rows appear in the planning grid. While this approach works for reporting, it does not support planning future periods or business scenarios that are not represented in historical data.

This document describes the limitations of fact-driven planning models and explains how dimension-driven modeling addresses these challenges. It uses ten real-world planning scenarios to demonstrate modeling patterns for building scalable, flexible planning solutions.

## Planning requirements that conventional models don't address

Conventional semantic models are designed primarily for reporting. While these modeling practices work well for analyzing historical data, they introduce limitations in planning scenarios.

Common modeling practices include:

* Using the fact table to define the planning grid.
* Modeling each planning scenario independently, with each scenario requiring its own set of measures rather than being managed through a dedicated scenario dimension.

As planning requirements evolve, organizations must support shorter planning cycles, changing product catalogs and organizational structures, and multiple forecast versions. Conventional modeling approaches become increasingly difficult to maintain and scale under these requirements.

### Limitations of fact table-driven planning

Many planning models use the fact table to determine which rows appear in the planning grid. For example, a **Region > Category > Subcategory > Product** combination appears only if it exists in historical transaction data.

Although this approach is suitable for reporting, it limits planning because planning models must represent future business scenarios in addition to historical data.

This approach introduces the following challenges:

* Historical dimensional combinations remain available for planning even if they are no longer valid. For example, a discontinued product continues to appear because it existed in past transactions.
* New business scenarios, such as product launches, market expansion, organizational changes, or new territories, do not appear in the planning grid until transaction data exists.
* Planning assumptions and business rules cannot be maintained within the semantic model and are often managed externally through spreadsheets or other manual processes.
* Including every possible dimension combination to overcome these limitations produces an excessively large planning grid, making it difficult to identify the combinations that are valid for planning.

### Limitations of scenario-specific measures

Many planning models implement each scenario, actual, budget, and individual forecast versions as a separate set of measures and configurations. While you can manage this approach with a small number of scenarios, it becomes increasingly difficult to maintain as you introduce more scenarios.

This approach introduces the following challenges:

* Each new scenario requires a separate set of measures and configuration. You duplicate historical values, forecast periods, and horizon logic instead of reusing them, which increases the number of measures as scenarios grow. For example, a model with 10 business measures and 4 scenarios requires 40 measures. Adding a fifth scenario increases the total to 50 measures.
* You embed forecast periods and scenario-specific logic in DAX instead of maintaining them as business data. Changes to planning windows require model updates rather than configuration changes.
* Scenario configuration is distributed across the semantic model, DAX, and measures instead of being maintained in a single governed location, making it difficult to determine which scenarios are open for planning and the periods they cover.
* You must configure input and forecasting behavior separately for each scenario instead of adapting automatically based on the selected scenario.

As the number of planning scenarios increases, maintaining the model becomes more complex. Business users remain dependent on model authors to implement changes that you could otherwise manage through business configuration.

## Designing dimensions

The limitations of fact table-driven planning stem from using the fact table to determine planning behavior instead of modeling planning structures explicitly. A scalable planning model defines the structures that govern row visibility, scenario behavior, and editability as business data.

### Design dimensions for planning

The following structures form the foundation of this approach:

* Dimension tables define hierarchical relationships. For example, a Subcategory table stores the key of its parent Category, so you can derive valid hierarchy combinations directly from the dimension model.
* Validity tables define planning combinations that you can't represent through dimension relationships alone. For example, while a Subcategory belongs to a Category, a validity table determines which Region–Subcategory combinations are valid for planning.
* Scenario tables model scenarios as data instead of separate sets of measures. Each scenario stores metadata such as the scenario type and the planning window.
* Date tables span the entire planning horizon instead of being limited by transaction history. They also support fiscal and retail calendars when required.

Maintain these tables in PowerTable sheets in planning in Fabric. Business users can update planning combinations, scenario metadata, and planning windows without modifying the semantic model.

After you add these tables to the semantic model, DAX enforces the planning rules by determining:

* Which rows appear in the planning grid.
* Which planning combinations are valid for each period.
* Which scenarios accept input for each period.
* Whether a cell is editable.

The following diagram shows a simplified schema of a sample dataset, with dimension tables feeding a central fact table.

:::image type="content" source="../../media/resources/best-practices/semantic-modeling/semantic-model-diagram.png" alt-text="Diagram showing the relationships between a fact and dimension table in a semantic model." lightbox="../../media/resources/best-practices/semantic-modeling/semantic-model-diagram.png":::

### Key tables in this approach

**Scenario**

* Maintained through PowerTable.
* Every planning scenario is a row of data.
* ScenarioKey and ScenarioName identify each scenario.
* IsForecast marks which ones are genuinely forecast types.
* OpenFrom and OpenUntil define each scenario's planning window.

**Date**

* Carries both standard calendar fields and fiscal fields such as FiscalYear, FiscalQuarter, FiscalMonth, FiscalWeek, resolved against one DateKey.
* Supports businesses that plan on a fiscal or retail pattern such as 4-4-5, 4-5-4, or 5-4-4, alongside those on a standard Gregorian calendar.

**Validity Table**

* Records which combinations of planning dimensions are currently valid to plan against, using an IsValid flag against the relevant dimension keys.
* Maintained directly through PowerTable. Business users control which combinations are open for planning without any change to the semantic model.

**Weight Matrix**

* Maintained directly through PowerTable, so business users can define and adjust allocation weights without any change to the semantic model.
* Structured the same way as the Validity Table, using the relevant dimension keys.
* Records custom weights for each planning dimension combination.
* Brought into a planning sheet as a measure through Blend, making the weight available alongside the sheet's own measures rather than requiring a separate table relationship.
* Used as the distribution basis for data input measures in that planning sheet.
* Weights can be revised at any time in PowerTable, and any measure built against them picks up the change immediately.

**Measures**

* Holds the DAX that enforces planning rules, scenario behaviour, and combination validity.

## Planning cases at a glance

The following table summarizes all ten planning cases covered in this document. The cases are grouped by the requirement each one addresses. [The planning cases in brief](#the-planning-cases-in-brief) walks through each case.

This approach is built and validated on Direct Lake over OneLake, and it's the primary recommendation for any semantic model adopting it. PowerTable itself depends on the underlying planning data existing as OneLake tables in the first place. Direct Lake is what lets that same data serve both reporting and planning directly, without a separate import step or a scheduled refresh sitting between the two.

### **Planning cases and how each requirement is met**

| Group | Planning case | Premise and planning goal | Output |
|-------|---------------|---------------------------|--------|
| Managed combinations | Two-level coverage | Rows come from a combination of two related dimensions, so every valid pair appears in every period. No fact data is required to populate the grid. | An empty, fully enterable grid whose rows come from business data rather than transaction history. |
| Managed combinations | Coverage with actuals overlay | Uses the same rows as Case 1, with actuals displayed alongside. Row existence is still not governed by the fact table. | The same rows as Case 1 with actual values displayed. Actuals never add or remove rows. |
| Managed combinations | Full hierarchy planning view | Multiple dimensions are joined into a single multilevel hierarchy. A row exists only when every hierarchy level forms a valid combination. | A complete hierarchy view. Adding a member anywhere in the hierarchy immediately surfaces it. |
| Managed combinations | Governed validity table | When dimension relationships alone can't determine validity, valid combinations are maintained explicitly using a validity flag. | An auditable set of valid rows that is independent of inferred dimension relationships. |
| Editability | Planning with scenario as a dimension | Scenario is modeled as a dimension with its own planning window. A reusable measure determines whether each cell accepts input. | Each cell is marked as editable or read-only. Locked cells remain visible but can't be edited. |
| Editability | Rolling forecast | Closed periods automatically display actuals, while newly opened periods become empty and editable without manual intervention. | A data input column that automatically opens and closes each planning cycle. |
| History-derived rows | History-driven planning combinations (extended horizon) | For models without managed combination tables, rows are derived from historical transactions while planning continues beyond available history. | Historically transacted combinations extended across the full planning calendar. |
| History-derived rows | Controlled planning horizon | Uses the same history-derived rows as Case 7, with the visible planning horizon controlled by the user. | The same row structure as Case 7, with a configurable planning horizon. |
| Time-varying validity | Seasonal validity table | Validity is time-dependent. Combination tables define valid tuples for each period to support seasonal or phased assortments. | Rows are determined by both combination validity and period validity. |
| Time-varying validity | Retail planning | Planning uses a 4-4-5 fiscal calendar where periods are week-based. Open and closed logic is driven by fiscal period keys instead of dates. | Scenario-aware values and editability aligned with fiscal periods, including 53-week years. |

## The planning cases in brief

Each case in the following list is explained at a high level. The explanation covers what the case addresses, why it comes up in practice, and how the dimension strategy from [Designing dimensions](#designing-dimensions)
 resolves it.

### Managed combinations

The four cases in this group all address the gap described in [Limitations of fact table-driven planning](#limitations-of-fact-table-driven-planning). A planning grid inherited from the fact table can't represent combinations that aren't yet transacted, and it can't exclude combinations that no longer reflect how the business runs. Each case sources planning rows from dimension or bridge data instead, so you state row existence directly rather than guessing it from history.

**Two-level coverage:**

Use this case when a single dimension table already captures its relationship to a higher-level dimension. A Subcategory table with a CategoryID column is a typical example. The Subcategory table itself already knows which Category each Subcategory belongs to. A single DAX measure with `COUNTROWS` of the Subcategory table, assigned to the visual, enforces every valid combination on the grid, including combinations with no fact data at all. This measure is a check only, it governs which rows exist.

**Coverage with actuals overlay:**

This case is exactly case one, with one difference: actuals are shown for combinations that have historical data, while every other valid combination remains visible with a Boolean value, rather than being suppressed.

**Full hierarchy planning view:**

Planning goals such as territory realignment, quota setting, and expanding into a new market span three or more levels of a hierarchy at once, not just two. This case extends the same dimension driven approach across every level involved, so a row only appears when all of them agree the combination is valid. This approach keeps the grid exactly as wide as the business's current structure.

**Governed validity table:**

Some combinations can't be settled by dimension relationships alone. A pairing might be technically possible but not something the business actually wants to plan for. This case addresses that directlty through a dedicated validity table where valid combinations are recorded and maintained as business data by using PowerTable, independent of any dimension relationship. This way, planning assumptions live in the model rather than in a spreadsheet kept on the side.

### Editability

The two cases in this group address [Limitations of scenario-specific measures](#limitations-of-scenario-specific-measures), where you model scenario behavior as configurable business data by using PowerTable.

**Planning with scenario as a dimension:**

Modeling every planning scenario with its own set of measures works fine at first, but the effort piles up with every new version you add. This case treats Scenario as a dimension which carries its own metadata, whether it's a forecastable scenario, what its open periods are, and other properties. By using this approach, a single reusable measure decides editability across every scenario. Adding a new forecast version becomes a configuration change, not a modeling one.

**Rolling forecast cycle:**

This case uses a different measure that returns the actual value for closed periods and a 0 for open ones. You then configure a data input column so that user input is only allowed where this measure equals 0, meaning only open periods become editable. The effect then propagates on its own. Once a period is closed in the Scenario PowerTable sheet, every planning sheet where that scenario and its measures are present, brought in through blending, has its data input column for that period turned read only automatically. No further change is needed on any individual planning sheet.

### History derived rows

If you need to preserve historical combinations while enabling forecasting across future periods, the following two cases apply. For teams that don't yet have managed dimension or bridge tables in place, this group offers a transitional pattern.

**History-driven planning combinations, extended horizon:**

Only combinations with a transaction history appear on the planning sheet, while the planning horizon itself extends well beyond that history, all the way to the outer edge of the date table.

**Controlled planning horizon**

This case lets users control how much history, how far back in time, is shown on the grid at once. Rows are still derived solely from fact data, exactly as in the previous case, the only change is the visible time range.

### Time varying validity

These two cases build on the managed patterns from [Managed combinations](#managed-combinations) so that validity itself, not just the combination, can shift over time.

**Seasonal validity table:**

Some businesses plan around assortments that are only valid for part of the year, a seasonal line, a rollout happening in phases. This case extends the managed validity approach so validity can vary by period, letting a combination be off limits one period and valid for the next, without deleting or rebuilding anything underneath it.

### Fiscal Calendar Planning

**Retail planning:**

Organisations plan on a fiscal calendar that doesn't follow the standard calendar year. For example, 4-4-5 and 4-5-4 retail patterns, where periods are weeks rather than calendar months. This case extends the approaches described earlier, so open and closed logic anchors to the business's own fiscal calendar rather than the Gregorian calendar, keeping planning aligned to the calendar the business actually runs on.

## Summary

Planning breaks down when the fact table decides what the model should state explicitly, in the shape of the grid, in scenario behaviour, and in editability. The ten cases in this document show how a deliberate dimension strategy resolves each of these, one planning requirement at a time.

A companion [Power BI file](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/iq/plan/semantic-modeling-sample.pbix), included alongside this document, allows you to try out each of the ten cases directly.
