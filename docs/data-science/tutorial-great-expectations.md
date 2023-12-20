---
title: "Tutorial: Validate data using SemPy and Great Expectations (GX) (preview)"
description: Illustrates how to use SemPy together with Great Expectations to perform data validation on Power BI semantic models.
ms.reviewer: sgilley
ms.author: taniaarya
author: taniaarya
ms.topic: tutorial
ms.custom: build-2023
ms.date: 11/14/2023
#Customer intent: As a data scientist, I want to validate my data to ensure it meets my expectations.
---

# Tutorial: Validate data using SemPy and Great Expectations (GX)

In this tutorial, you learn how to use SemPy together with [Great Expectations](https://greatexpectations.io/) (GX) to perform data validation on Power BI semantic models.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

This tutorial shows you how to:

> [!div class="checklist"]
>
> - Validate constraints on a dataset in your Fabric workspace with Great Expectation's Fabric Data Source (built on semantic link).
>     - Configure a GX Data Context, Data Assets, and Expectations.
>     - View validation results with a GX Checkpoint.
> - Use semantic link to analyze raw data.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

* Select **Workspaces** from the left navigation pane to find and select your workspace. This workspace becomes your current workspace.
* Download the [_Retail Analysis Sample PBIX.pbix_](https://download.microsoft.com/download/9/6/D/96DDC2FF-2568-491D-AAFA-AFDD6F763AE3/Retail%20Analysis%20Sample%20PBIX.pbix) file. 
* In your workspace, use the **Upload** button to upload the _Retail Analysis Sample PBIX.pbix_ file to the workspace.

## Follow along in notebook

[great_expectations_tutorial.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/great_expectations_tutorial.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/great_expectations_tutorial.ipynb -->

## Set up the notebook

In this section, you set up a notebook environment with the necessary modules and data.

1. Install `SemPy` and the relevant `Great Expectations` libraries from PyPI using the `%pip` in-line installation capability within the notebook.


```python
# install libraries
%pip install semantic-link great-expectations great_expectations_experimental great_expectations_zipcode_expectations

# load %%dax cell magic
%load_ext sempy
```

2. Perform necessary imports of modules that you'll need later: 


```python
import great_expectations as gx
from great_expectations.expectations.expectation import ExpectationConfiguration
from great_expectations_zipcode_expectations.expectations import expect_column_values_to_be_valid_zip5
```

## Set up GX Data Context and Data Source

In order to get started with Great Expectations, you first have to set up a GX [Data Context](https://docs.greatexpectations.io/docs/reference/learn/terms/data_context). The context serves as an entry point for GX operations and holds all relevant configurations.


```python
context = gx.get_context()
```

You can now add your Fabric dataset to this context as a [Data Source](https://docs.greatexpectations.io/docs/reference/learn/terms/datasource) to start interacting with the data. This tutorial uses a standard Power BI sample semantic model [Retail Analysis Sample .pbix file](/power-bi/create-reports/sample-retail-analysis).


```python
ds = context.sources.add_fabric_powerbi("Retail Analysis Data Source", dataset="Retail Analysis Sample PBIX")
```

## Specify Data Assets

Define [Data Assets](https://docs.greatexpectations.io/docs/reference/learn/terms/data_asset) to specify the subset of data you'd like to work with. The asset can be as simple as full tables, or be as complex as a custom Data Analysis Expressions (DAX) query.

Here, you'll add multiple assets:
* Power BI table
* Power BI measure
* Custom DAX query
* [Dynamic Management View](/analysis-services/instances/use-dynamic-management-views-dmvs-to-monitor-analysis-services) (DMV) query


### Power BI table

Add a Power BI table as a data asset.


```python
ds.add_powerbi_table_asset("Store Asset", table="Store")
```

### Power BI measure

If your dataset contains preconfigured measures, you add the measures as assets following a similar API to SemPy's `evaluate_measure`. 


```python
ds.add_powerbi_measure_asset(
    "Total Units Asset",
    measure="TotalUnits",
    groupby_columns=["Time[FiscalYear]", "Time[FiscalMonth]"]
)
```

### DAX
If you'd like to define your own measures or have more control over specific rows, you can add a DAX asset with a custom DAX query. Here, we define a `Total Units Ratio` measure by dividing two existing measures.


```python
ds.add_powerbi_dax_asset(
    "Total Units YoY Asset",
    dax_string=
    """
    EVALUATE SUMMARIZECOLUMNS(
        'Time'[FiscalYear],
        'Time'[FiscalMonth],
        "Total Units Ratio", DIVIDE([Total Units This Year], [Total Units Last Year])
    )    
    """
)
```

### DMV query

In some cases, it might be helpful to use [Dynamic Management View](/analysis-services/instances/use-dynamic-management-views-dmvs-to-monitor-analysis-services) (DMV) calculations as part of the data validation process. For example, you can keep track of the number of referential integrity violations within your dataset. For more information, see [Clean data = faster reports](https://dax.tips/2019/11/28/clean-data-faster-reports/).


```python
ds.add_powerbi_dax_asset(
    "Referential Integrity Violation",
    dax_string=
    """
    SELECT
        [Database_name],
        [Dimension_Name],
        [RIVIOLATION_COUNT]
    FROM $SYSTEM.DISCOVER_STORAGE_TABLES
    """
)
```

## Expectations

To add specific constraints to the assets, you first have to configure [Expectation Suites](https://docs.greatexpectations.io/docs/reference/learn/terms/expectation_suite). After adding individual [Expectations](https://docs.greatexpectations.io/docs/reference/learn/terms/expectation) to each suite, you can then update the Data Context set up in the beginning with the new suite. For a full list of available expectations, see the [GX Expectation Gallery](https://greatexpectations.io/expectations/).

Start by adding a "Retail Store Suite" with two expectations:
* a valid zip code
* a table with row count between 80 and 200


```python
suite_store = context.add_expectation_suite("Retail Store Suite")

suite_store.add_expectation(ExpectationConfiguration("expect_column_values_to_be_valid_zip5", { "column": "PostalCode" }))
suite_store.add_expectation(ExpectationConfiguration("expect_table_row_count_to_be_between", { "min_value": 80, "max_value": 200 }))

context.add_or_update_expectation_suite(expectation_suite=suite_store)
```

### `TotalUnits` Measure

Add a "Retail Measure Suite" with one expectation:

* Column values should be greater than 50,000


```python
suite_measure = context.add_expectation_suite("Retail Measure Suite")
suite_measure.add_expectation(ExpectationConfiguration(
    "expect_column_values_to_be_between", 
    {
        "column": "TotalUnits",
        "min_value": 50000
    }
))

context.add_or_update_expectation_suite(expectation_suite=suite_measure)
```

### `Total Units Ratio` DAX

Add a "Retail DAX Suite" with one expectation:

* Column values for Total Units Ratio should be between 0.8 and 1.5


```python
suite_dax = context.add_expectation_suite("Retail DAX Suite")
suite_dax.add_expectation(ExpectationConfiguration(
    "expect_column_values_to_be_between", 
    {
        "column": "[Total Units Ratio]",
        "min_value": 0.8,
        "max_value": 1.5
    }
))

context.add_or_update_expectation_suite(expectation_suite=suite_dax)
```

### Referential Integrity Violations (DMV)

Add a "Retail DMV Suite" with one expectation:

* the RIVIOLATION_COUNT should be 0


```python
suite_dmv = context.add_expectation_suite("Retail DMV Suite")
# There should be no RI violations
suite_dmv.add_expectation(ExpectationConfiguration(
    "expect_column_values_to_be_in_set", 
    {
        "column": "RIVIOLATION_COUNT",
        "value_set": [0]
    }
))
context.add_or_update_expectation_suite(expectation_suite=suite_dmv)
```

## Validation

To actually run the specified expectations against the data, first create a [Checkpoint](https://docs.greatexpectations.io/docs/reference/learn/terms/checkpoint) and add it to the context. For more information on Checkpoint configuration, see [Data Validation workflow](https://docs.greatexpectations.io/docs/oss/guides/validation/validate_data_overview).


```python
checkpoint_config = {
    "name": f"Retail Analysis Checkpoint",
    "validations": [
        {
            "expectation_suite_name": "Retail Store Suite",
            "batch_request": {
                "datasource_name": "Retail Analysis Data Source",
                "data_asset_name": "Store Asset",
            },
        },
        {
            "expectation_suite_name": "Retail Measure Suite",
            "batch_request": {
                "datasource_name": "Retail Analysis Data Source",
                "data_asset_name": "Total Units Asset",
            },
        },
        {
            "expectation_suite_name": "Retail DAX Suite",
            "batch_request": {
                "datasource_name": "Retail Analysis Data Source",
                "data_asset_name": "Total Units YoY Asset",
            },
        },
        {
            "expectation_suite_name": "Retail DMV Suite",
            "batch_request": {
                "datasource_name": "Retail Analysis Data Source",
                "data_asset_name": "Referential Integrity Violation",
            },
        },
    ],
}
checkpoint = context.add_checkpoint(
    **checkpoint_config
)
```

Now run the checkpoint and extract the results as a pandas DataFrame for simple formatting.


```python
result = checkpoint.run()
```

Process and print your results.


```python
import pandas as pd

data = []

for run_result in result.run_results:
    for validation_result in result.run_results[run_result]["validation_result"]["results"]:
        row = {
            "Batch ID": run_result.batch_identifier,
            "type": validation_result.expectation_config.expectation_type,
            "success": validation_result.success
        }

        row.update(dict(validation_result.result))
        
        data.append(row)

result_df = pd.DataFrame.from_records(data)    

result_df[["Batch ID", "type", "success", "element_count", "unexpected_count", "partial_unexpected_list"]]
```

:::image type="content" source="media/tutorial-great-expectations/validation.png" alt-text="Table shows the validation results." lightbox="media/tutorial-great-expectations/validation.png":::

From these results you can see that all your expectations passed the validation, except for the "Total Units YoY Asset" that you defined through a custom DAX query. 

## Diagnostics

Using semantic link, you can fetch the source data to understand which exact years are out of range. Semantic link provides an inline magic for executing DAX queries. Use semantic link to execute the same query you passed into the GX Data Asset and visualize the resulting values.


```python
%%dax "Retail Analysis Sample PBIX"

EVALUATE SUMMARIZECOLUMNS(
    'Time'[FiscalYear],
    'Time'[FiscalMonth],
    "Total Units Ratio", DIVIDE([Total Units This Year], [Total Units Last Year])
)
```

:::image type="content" source="media/tutorial-great-expectations/table.png" alt-text="Table shows the results from the DAX query summarization.":::

Save these results in a DataFrame.


```python
df = _
```

Plot the results.


```python
import matplotlib.pyplot as plt

df["Total Units % Change YoY"] = (df["[Total Units Ratio]"] - 1)

df.set_index(["Time[FiscalYear]", "Time[FiscalMonth]"]).plot.bar(y="Total Units % Change YoY")

plt.axhline(0)

plt.axhline(-0.2, color="red", linestyle="dotted")
plt.axhline( 0.5, color="red", linestyle="dotted")

None
```

:::image type="content" source="media/tutorial-great-expectations/plot.jpg" alt-text="Plot shows the results of the DAX query summarization.":::

From the plot, you can see that April and July were slightly out of range and can then take further steps to investigate.

## Storing GX configuration

As the data in your dataset changes over time, you might want to rerun the GX validations you just performed. Currently, the Data Context (containing the connected Data Assets, Expectation Suites, and Checkpoint) lives ephemerally, but it can be converted to a File Context for future use. Alternatively, you can instantiate a File Context (see [Instantiate a Data Context](https://docs.greatexpectations.io/docs/oss/guides/setup/configuring_data_contexts/instantiating_data_contexts/instantiate_data_context)).


```python
context = context.convert_to_file_context()
```

Now that you saved the context, copy the `gx` directory to your lakehouse.

> [!IMPORTANT]
> **This cell assumes you  [added a lakehouse](https://aka.ms/fabric/addlakehouse) to the notebook.** If there is no lakehouse attached, you won't see an error, but you also won't later be able to get the context. If you add a lakehouse now, the kernel will restart, so you'll have to re-run the entire notebook to get back to this point.


```python
# copy GX directory to attached lakehouse
!cp -r gx/ /lakehouse/default/Files/gx
```

Now, future contexts can be created with `context = gx.get_context(project_root_dir="<your path here>")` to use all the configurations from this tutorial.

For example, in a new notebook, attach the same lakehouse and use `context = gx.get_context(project_root_dir="/lakehouse/default/Files/gx")` to retrieve the context. 

<!-- nbend -->


## Related content

Check out other tutorials for semantic link / SemPy:

- [Tutorial: Clean data with functional dependencies (preview)](tutorial-data-cleaning-functional-dependencies.md)
- [Tutorial: Analyze functional dependencies in a sample semantic model (preview)](tutorial-power-bi-dependencies.md)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook (preview)](tutorial-power-bi-measures.md)
- [Tutorial: Discover relationships in a semantic model, using semantic link (preview)](tutorial-power-bi-relationships.md)
- [Tutorial: Discover relationships in the _Synthea_ dataset, using semantic link (preview)](tutorial-relationships-detection.md)
