---
title: 'Tutorial: Discover relationships in the _Synthea_ dataset using semantic link'
description: This article shows how to detect relationships in the public _Synthea_ dataset, using semantic link.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: alsavelv
author: alsavelv
ms.topic: tutorial
ms.custom:
  - ignite-2023
ms.date: 09/27/2023
---
<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/relationships_detection_tutorial.ipynb -->

# Tutorial: Discover relationships in the _Synthea_ dataset, using semantic link

This tutorial illustrates how to detect relationships in the public _Synthea_ dataset, using semantic link.

When you're working with new data or working without an existing data model, it can be helpful to discover relationships automatically. This relationship detection can help you to:

   * understand the model at a high level,
   * gain more insights during exploratory data analysis,
   * validate updated data or new, incoming data, and
   * clean data.

Even if relationships are known in advance, a search for relationships can help with better understanding of the data model or identification of data quality issues.

In this tutorial, you begin with a simple baseline example where you experiment with only three tables so that connections between them are easy to follow. Then, you show a more complex example with a larger table set.

In this tutorial, you learn how to:

- Use components of semantic link's Python library ([SemPy](/python/api/semantic-link-sempy)) that support integration with Power BI and help to automate data analysis. These components include:
    - FabricDataFrame - a pandas-like structure enhanced with additional semantic information.
    - Functions for pulling semantic models from a Fabric workspace into your notebook.
    - Functions that automate the discovery and visualization of relationships in your semantic models.
- Troubleshoot the process of relationship discovery for semantic models with multiple tables and interdependencies.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]
* Select **Workspaces** from the left navigation pane to find and select your workspace. This workspace becomes your current workspace.

### Follow along in the notebook

The [relationships_detection_tutorial.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/relationships_detection_tutorial.ipynb) notebook accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

## Set up the notebook

In this section, you set up a notebook environment with the necessary modules and data.

1. Install `SemPy` from PyPI using the `%pip` in-line installation capability within the notebook:

    ```python
    %pip install semantic-link
    ```

1. Perform necessary imports of SemPy modules that you'll need later:

    ```python
    import pandas as pd
    
    from sempy.samples import download_synthea
    from sempy.relationships import (
        find_relationships,
        list_relationship_violations,
        plot_relationship_metadata
    )
    ```

1. Import pandas for enforcing a configuration option that helps with output formatting:

    ```python
    import pandas as pd
    pd.set_option('display.max_colwidth', None)
    ```

1. Pull the sample data. For this tutorial, you use the _Synthea_ dataset of synthetic medical records (small version for simplicity):

    ```python
    download_synthea(which='small')
    ```

## Detect relationships on a small subset of _Synthea_ tables

1. Select three tables from a larger set:

    * `patients` specifies patient information
    * `encounters` specifies the patients that had medical encounters (for example, a medical appointment, procedure)
    * `providers` specifies which medical providers attended to the patients

    The `encounters` table resolves a many-to-many relationship between `patients` and `providers` and can be described as an [associative entity](https://wikipedia.org/wiki/Associative_entity):

    ```python
    patients = pd.read_csv('synthea/csv/patients.csv')
    providers = pd.read_csv('synthea/csv/providers.csv')
    encounters = pd.read_csv('synthea/csv/encounters.csv')
    ```

1. Find relationships between the tables using  SemPy's ``find_relationships`` function:

    ```python
    suggested_relationships = find_relationships([patients, providers, encounters])
    suggested_relationships
    ```

1. Visualize the relationships DataFrame as a graph, using SemPy's `plot_relationship_metadata` function.

    ```python
    plot_relationship_metadata(suggested_relationships)
    ```

    :::image type="content" source="media/tutorial-relationships-detection/plot-of-relationship-metadata.png" alt-text="Screenshot showing relationships between tables in the dataset." lightbox="media/tutorial-relationships-detection/plot-of-relationship-metadata.png":::

    The function lays out the relationship hierarchy from the left hand side to the right hand side, which corresponds to "from" and "to" tables in the output. In other words, the independent "from" tables on the left hand side use their foreign keys to point to their "to" dependency tables on the right hand side. Each entity box shows columns that participate on either the "from" or "to" side of a relationship.

    By default, relationships are generated as "m:1" (not as "1:m") or "1:1". The "1:1" relationships can be generated one or both ways, depending on if the ratio of mapped values to all values exceeds `coverage_threshold` in just one or both directions. Later in this tutorial, you cover the less frequent case of "m:m" relationships.

## Troubleshoot relationship detection issues

The baseline example shows a successful relationship detection on clean _Synthea_ data. In practice, the data is rarely clean, which prevents successful detection. There are several techniques that can be useful when the data isn't clean.

This section of this tutorial addresses relationship detection when the semantic model contains dirty data.

1. Begin by manipulating the original DataFrames to obtain "dirty" data, and print the size of the dirty data.

    ```python
    # create a dirty 'patients' dataframe by dropping some rows using head() and duplicating some rows using concat()
    patients_dirty = pd.concat([patients.head(1000), patients.head(50)], axis=0)
    
    # create a dirty 'providers' dataframe by dropping some rows using head()
    providers_dirty = providers.head(5000)
    
    # the dirty dataframes have fewer records than the clean ones
    print(len(patients_dirty))
    print(len(providers_dirty))

    ```

1. For comparison, print sizes of the original tables:

    ```python
    print(len(patients))
    print(len(providers))
    ```

1. Find relationships between the tables using SemPy's `find_relationships` function:

    ```python
    find_relationships([patients_dirty, providers_dirty, encounters])
    ```

    The output of the code shows that there's no relationships detected due to the errors that you introduced earlier to create the "dirty" semantic model.

### Use validation

Validation is the best tool for troubleshooting relationship detection failures because:

   * It reports clearly why a particular relationship doesn't follow the Foreign Key rules and therefore can't be detected.
   * It runs fast with large semantic models because it focuses only on the declared relationships and doesn't perform a search.

Validation can use any DataFrame with columns similar to the one generated by `find_relationships`. In the following code, the `suggested_relationships` DataFrame refers to `patients` rather than `patients_dirty`, but you can alias the DataFrames with a dictionary:

```python
dirty_tables = {
    "patients": patients_dirty,
    "providers" : providers_dirty,
    "encounters": encounters
}

errors = list_relationship_violations(dirty_tables, suggested_relationships)
errors
```

### Loosen search criteria

In more murky scenarios, you can try loosening your search criteria. This method increases the possibility of false positives.

1. Set `include_many_to_many=True` and evaluate if it helps:

    ```python
    find_relationships(dirty_tables, include_many_to_many=True, coverage_threshold=1)
    ```

    The results show that the relationship from `encounters` to `patients` was detected, but there are two problems:

    - The relationship indicates a direction from `patients` to `encounters`, which is an inverse of the expected relationship. This is because all `patients` happened to be covered by `encounters` (`Coverage From` is 1.0) while `encounters` are only partially covered by `patients` (`Coverage To` = 0.85), since patients rows are missing.
    - There's an accidental match on a low cardinality `GENDER` column, which happens to match by name and value in both tables,
     but it isn't an "m:1" relationship of interest. The low cardinality is indicated by `Unique Count From` and
     `Unique Count To` columns.

1. Rerun ``find_relationships`` to look only for "m:1" relationships, but with a lower ``coverage_threshold=0.5``:

    ```python
    find_relationships(dirty_tables, include_many_to_many=False, coverage_threshold=0.5)
    ```

    The result shows the correct direction of the relationships from `encounters` to `providers`. However, the relationship from `encounters` to `patients` isn't detected, because `patients` isn't unique, so it can't be on the "One" side of "m:1" relationship.

1. Loosen both `include_many_to_many=True` and `coverage_threshold=0.5`:

    ```python
    find_relationships(dirty_tables, include_many_to_many=True, coverage_threshold=0.5)
    ```

    Now both relationships of interest are visible, but there's a lot more noise:
    - The low cardinality match on `GENDER` is present.
    - A higher cardinality "m:m" match on `ORGANIZATION` appeared, making it apparent that `ORGANIZATION` is likely a column de-normalized to both tables.

### Match column names

By default, SemPy considers as matches only attributes that show name similarity, taking advantage of the fact that
database designers usually name related columns the same way. This behavior helps to avoid spurious relationships, which occur most frequently with low cardinality integer keys. For example, if there are `1,2,3,...,10` product categories and `1,2,3,...,10` order status code, they'll be confused with each other when only looking at value mappings without taking column names into account. Spurious relationships shouldn't be a problem with GUID-like keys.

SemPy looks at a similarity between column names and table names. The matching is approximate and case insensitive. It ignores the most frequently encountered "decorator" substrings such as "id", "code", "name", "key", "pk", "fk". As a result, the most typical match cases are:

   * an attribute called 'column' in entity 'foo' matches with an attribute called 'column' (also 'COLUMN' or 'Column') in entity 'bar'.
   * an attribute called 'column' in entity 'foo' matches with an attribute called 'column_id' in 'bar'.
   * an attribute called 'bar' in entity 'foo' matches with an attribute called 'code' in 'bar'.

By matching column names first, the detection runs faster.

1. Match the column names:
    - To understand which columns are selected for further evaluation, use the `verbose=2` option (`verbose=1` lists only the entities being processed).
    - The `name_similarity_threshold` parameter determines how columns are compared. The threshold of 1 indicates that you're interested in 100% match only.

    ```python
    find_relationships(dirty_tables, verbose=2, name_similarity_threshold=1.0);
    ```

    Running at 100% similarity fails to account for small differences between names. In your example, the tables have a plural form with "s" suffix, which results in no exact match. This is handled well with the default `name_similarity_threshold=0.8`.

1. Rerun with the default `name_similarity_threshold=0.8`:  

    ```python
    find_relationships(dirty_tables, verbose=2, name_similarity_threshold=0.8);
    ```

    Notice that the Id for plural form `patients` is now compared to singular `patient` without adding too many other spurious comparisons to the execution time.

1. Rerun with the default `name_similarity_threshold=0`:

    ```python
    find_relationships(dirty_tables, verbose=2, name_similarity_threshold=0);
    ```

    Changing `name_similarity_threshold` to 0 is the other extreme, and it indicates that you want to compare all columns. This is rarely necessary and results in increased execution time and spurious matches that need to be reviewed. Observe the number of comparisons in the verbose output.

### Summary of troubleshooting tips

1. Start from exact match for "m:1" relationships (that is, the default `include_many_to_many=False` and `coverage_threshold=1.0`). This is usually what you want.
2. Use a narrow focus on smaller subsets of tables.
3. Use validation to detect data quality issues.
4. Use `verbose=2` if you want to understand which columns are considered for relationship. This can result in a large amount of output.
5. Be aware of trade-offs of search arguments. `include_many_to_many=True` and `coverage_threshold<1.0` may produce spurious relationships that may be harder to analyze and will need to be filtered.

## Detect relationships on the full _Synthea_ dataset

The simple baseline example was a convenient learning and troubleshooting tool. In practice, you may start from a semantic model such as the full _Synthea_ dataset, which has a lot more tables. Explore the full _synthea_ dataset as follows.

1. Read all files from the _synthea/csv_ directory:

    ```python
    all_tables = {
        "allergies": pd.read_csv('synthea/csv/allergies.csv'),
        "careplans": pd.read_csv('synthea/csv/careplans.csv'),
        "conditions": pd.read_csv('synthea/csv/conditions.csv'),
        "devices": pd.read_csv('synthea/csv/devices.csv'),
        "encounters": pd.read_csv('synthea/csv/encounters.csv'),
        "imaging_studies": pd.read_csv('synthea/csv/imaging_studies.csv'),
        "immunizations": pd.read_csv('synthea/csv/immunizations.csv'),
        "medications": pd.read_csv('synthea/csv/medications.csv'),
        "observations": pd.read_csv('synthea/csv/observations.csv'),
        "organizations": pd.read_csv('synthea/csv/organizations.csv'),
        "patients": pd.read_csv('synthea/csv/patients.csv'),
        "payer_transitions": pd.read_csv('synthea/csv/payer_transitions.csv'),
        "payers": pd.read_csv('synthea/csv/payers.csv'),
        "procedures": pd.read_csv('synthea/csv/procedures.csv'),
        "providers": pd.read_csv('synthea/csv/providers.csv'),
        "supplies": pd.read_csv('synthea/csv/supplies.csv'),
    }
    ```

1. Find relationships between the tables, using  SemPy's ``find_relationships`` function:

    ```python
    suggested_relationships = find_relationships(all_tables)
    suggested_relationships
    ```

1. Visualize relationships:

    ```python
    plot_relationship_metadata(suggested_relationships)
    ```

    :::image type="content" source="media/tutorial-relationships-detection/visualize-relationship-metadata.png" alt-text="Screenshot of the relationships between tables." lightbox="media/tutorial-relationships-detection/visualize-relationship-metadata.png":::

1. Count how many new "m:m" relationships will be discovered with `include_many_to_many=True`. These relationships are in addition to the previously shown "m:1" relationships; therefore, you have to filter on `multiplicity`:

    ```python
    suggested_relationships = find_relationships(all_tables, coverage_threshold=1.0, include_many_to_many=True) 
    suggested_relationships[suggested_relationships['Multiplicity']=='m:m']
    ```

1. You can sort the relationship data by various columns to gain a deeper understanding of their nature. For example, you could choose to order the output by `Row Count From` and `Row Count To`, which help identify the largest tables.

    ```python
    suggested_relationships.sort_values(['Row Count From', 'Row Count To'], ascending=False)
    ```

    In a different semantic model, maybe it would be important to focus on number of nulls `Null Count From` or `Coverage To`.

    This analysis can help you to understand if any of the relationships could be invalid, and if you need to remove them from the list of candidates.

## Related content

Check out other tutorials for semantic link / SemPy:

- [Tutorial: Clean data with functional dependencies](tutorial-data-cleaning-functional-dependencies.md)
- [Tutorial: Analyze functional dependencies in a sample semantic model](tutorial-power-bi-dependencies.md)
- [Tutorial: Discover relationships in a semantic model, using semantic link](tutorial-power-bi-relationships.md)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook](tutorial-power-bi-measures.md)

<!-- nbend -->
