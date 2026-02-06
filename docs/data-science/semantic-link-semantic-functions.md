---
title: Semantic functions
description: Learn about semantic functions that you can apply to FabricDataFrames and FabricSeries.
ms.author: jburchel
author: jonburchel
ms.reviewer: marcozo
reviewer: eisber
ms.topic: concept-article
ms.date: 08/15/2025
ms.search.form: semantic link
---

# Semantic functions

This article describes semantic functions and how they can help data scientists and data engineers discover functions that are relevant to the FabricDataFrame or FabricSeries they're working on. Semantic functions are part of the Microsoft Fabric semantic link feature.

For Spark 3.4 and above, the semantic link core package is available in the default Fabric runtime, but the semantic-link-functions package that includes the semantic function logic (such as `is_holiday`) needs to be installed manually. To update to the most recent version of the Python semantic link (SemPy) library, run the following command:

```python
%pip install -U semantic-link
```

A [FabricDataFrame](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe) dynamically exposes semantic functions based on the logic each function defines.
For example, the `is_holiday` function appears in the autocomplete suggestions when you work on a FabricDataFrame that contains both a datetime column and a country column.

Each semantic function uses information about the data, data types, and metadata (like Power BI data categories) in the FabricDataFrame or FabricSeries to determine its relevance to the particular data you're working on.

Semantic functions are automatically discovered when annotated with the `@semantic_function` decorator.
You can think of semantic functions as being like [C# extension methods](/dotnet/csharp/programming-guide/classes-and-structs/extension-methods) applied to the DataFrame concept.

## Semantic functions autocomplete suggestions

Semantic functions are available in the autocomplete suggestions when you work with a FabricDataFrame or FabricSeries. Use Ctrl+Space to trigger autocomplete.

:::image type="content" source="media/semantic-link-semantic-functions/semantic-functions.png" alt-text="Screenshot of semantic functions in autocomplete suggestions." lightbox="media/semantic-link-semantic-functions/semantic-functions.png":::

The following code example manually specifies the metadata for a FabricDataFrame:

```python
from sempy.fabric import FabricDataFrame

df = FabricDataFrame(
    {"country": ["US", "AT"],
        "lat": [40.7128, 47.8095],
        "long": [-74.0060, 13.0550]},
    column_metadata={"lat": {"data_category": "Latitude"}, "long": {"data_category": "Longitude"}},
)

# Convert to GeoPandas dataframe
df_geo = df.to_geopandas(lat_col="lat", long_col="long")

# Use the explore function to visualize the data
df_geo.explore()
```

Alternatively, if you read from a semantic model into a FabricDataFrame, the metadata is autopopulated.

```Python
from sempy.fabric import FabricDataFrame

# Read from semantic model
import sempy.fabric as fabric
df = fabric.read_table("my_dataset_name", "my_countries")

# Convert to GeoPandas dataframe
df_geo = df.to_geopandas(lat_col="lat", long_col="long")

# Use the explore function to visualize the data
df_geo.explore()
```

## Built-in semantic functions

The SemPy Python library provides a set of built-in semantic functions that are available out of the box. These built-in functions include:

- `is_holiday(...)` uses the [holidays](https://pypi.org/project/holidays/) Python package to return `true` if the date is a holiday in the given country/region.
- `to_geopandas(...)` converts a FabricDataFrame to a [GeoPandas](https://geopandas.org/en/stable/) GeoDataFrame.
- `parse_phonenumber(...)` uses the [phone numbers](https://pypi.org/project/phonenumbers/) Python package to parse a phone number into its components.
- `validators` uses the [validators](https://pypi.org/project/validators/) Python package to validate common data types like email and credit card numbers.

## Custom semantic functions

Semantic functions are designed for extensibility. You can define your own semantic functions within your notebook or as separate Python modules.

To use a semantic function outside of a notebook, declare the semantic function within the `sempy.functions` module. The following code example shows the definition of a semantic function `_is_capital` that returns `true` if a city is the capital/major city of a country/region.

```python
from sempy.fabric import FabricDataFrame, FabricSeries
from sempy.fabric.matcher import CountryMatcher, CityMatcher
from sempy.functions import semantic_function, semantic_parameters

@semantic_function("is_capital")
@semantic_parameters(col_country=CountryMatcher, col_city=CityMatcher)
def _is_capital(df: FabricDataFrame, col_country: str, col_city: str) -> FabricSeries:
    """Returns true if the city is the capital of the country"""
    capitals = {
        "US": ["Washington"],
        "AT": ["Vienna"],
        # ...
    }

    return df[[col_country, col_city]] \
        .apply(lambda row: row[1] in capitals[row[0]], axis=1)
```

In the preceding code example:

- The `col_country` and `col_city` parameters are annotated with `CountryMatcher` and `CityMatcher`, respectively. This annotation allows the semantic function to be automatically discovered when working with a FabricDataFrame that has the corresponding metadata.
- Calling the function also supplies standard data types such as `str`, `int`, `float`, and `datetime` to define required input columns.
- The type annotation of the first parameter `df` shows that the function is applicable to a FabricDataFrame rather than a [FabricSeries](/python/api/semantic-link-sempy/sempy.fabric.fabricseries).

## Related content

- [SemPy functions package](/python/api/semantic-link-sempy/sempy.functions)
- [Tutorial: Clean data with functional dependencies](tutorial-data-cleaning-functional-dependencies.md)
- [Power BI connectivity with semantic link](semantic-link-power-bi.md)
- [Semantic data propagation from semantic models](semantic-link-semantic-propagation.md)
