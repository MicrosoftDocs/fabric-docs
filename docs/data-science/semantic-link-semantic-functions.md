---
title: Semantic functions in Microsoft Fabric (preview)
description: Learn about semantic functions that you can apply to FabricDataFrames and FabricSeries.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: marcozo
author: eisber
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 06/23/2023
ms.search.form: semantic link
---

# Semantic functions (preview)

This article covers semantic functions and how they can help data scientists and data engineers discover functions that are relevant to the FabricDataFrame or FabricSeries on which they're working.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

To use semantic functions, install the `SemPy` Python library in your notebook kernel by executing this code in a notebook cell:

```python
%pip install semantic-link
```

[FabricDataFrames](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe) dynamically expose semantic functions based on logic defined by each function.
For example, the `is_holiday` function shows up in the autocomplete suggestions when you're working on a FabricDataFrame containing both a datetime column and a country column.

Each semantic function uses information about the data types, metadata (such as Power BI data categories), and the data in a FabricDataFrame or FabricSeries to determine its relevance to the particular data on which you're working.

Semantic functions are automatically discovered when annotated with the `@semantic_function` decorator.
You can think of semantic functions as being similar to [C# extension methods](/dotnet/csharp/programming-guide/classes-and-structs/extension-methods) applied to the popular DataFrame concept.

## Semantic function usage: autocomplete suggestions

Semantic functions are available in the autocomplete suggestions when you work with a FabricDataFrame or FabricSeries. You can use ctrl+space to trigger autocomplete.

:::image type="content" source="media/semantic-link-semantic-functions/semantic-functions.png" alt-text="Screenshot of semantic functions in autocomplete suggestions." lightbox="media/semantic-link-semantic-functions/semantic-functions.png":::

In the following example, the metadata for the FabricDataFrame is manually specified.

```Python
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

Alternatively, you could read from a semantic model into a FabricDataFrame, and in that case, the metadata will be autopopulated.

```Python
from sempy.fabric import FabricDataFrame

# Alternative: reading from semantic model
import sempy.fabric as fabric
df = fabric.read_table("my_dataset_name", "my_countries")

# Convert to GeoPandas dataframe
df_geo = df.to_geopandas(lat_col="lat", long_col="long")

# Use the explore function to visualize the data
df_geo.explore()
```

## Built-in semantic functions

The SemPy Python library provides a set of built-in semantic functions that are available out of the box. A few examples are

- `is_holiday(...)`, which returns `true` if the date is a holiday in the given country, using the [holidays](https://pypi.org/project/holidays/) python package.
- `to_geopandas(...)`, which converts a FabricDataFrame to a [GeoPandas](https://geopandas.org/en/stable/) GeoDataFrame.
- `parse_phonenumber(...)`, which parses a phone number into its components, using the [phone numbers](https://pypi.org/project/phonenumbers/) Python package.
- `validators`, which performs data validation for common data types, such as email and credit card numbers. The semantic function uses the [validators](https://pypi.org/project/validators/) Python package.

## Custom semantic functions

Semantic functions are built for extensibility.
You can define your own semantic functions within your notebook or as a separate Python module.
To use a semantic function outside of a notebook, the semantic function needs to be declared within the `sempy.functions` module.

This code example shows the definition of a semantic function `_is_captial` that returns `true` if the city is a capital of the country.

```Python
from sempy.fabric import FabricDataFrame, FabricSeries
from sempy.fabric.matcher import CountryMatcher, CityMatcher
from sempy.functions import semantic_function, semantic_paramters

@semantic_function("is_capital")
@semantic_parameters(col_country=CountryMatcher, col_city=CityMatcher)
def _is_captial(df: FabricDataFrame, col_country: str, col_city: str) -> FabricSeries:
    """Returns true if the city is a capital of the country"""
    capitals = {
        "US": ["Washington"],
        "AT": ["Vienna"],
        # ...
    }

    return df[[col_country, col_city]] \
        .apply(lambda row: row[1] in capitals[row[0]], axis=1)
```

The following points provide a breakdown of the code snippet:

- The `col_country` and `col_city` parameters are annotated with `CountryMatcher` and `CityMatcher`, respectively. This annotation allows the semantic function to be automatically discovered when working with a FabricDataFrame that has the corresponding metadata.
- Calling the function also supplies standard data types such as `str`, `int`, `float`, and `datetime` to define required input columns.
- The type annotation of the first parameter (`df`) shows that the function is applicable to a FabricDataFrame, rather than a FabricSeries.

## Related content

- [See `sempy.functions` to learn about usage of semantic functions](/python/api/semantic-link-sempy/sempy.functions)
- [Tutorial: Clean data with functional dependencies (preview)](tutorial-data-cleaning-functional-dependencies.md)
- [Power BI connectivity with semantic link and Microsoft Fabric (preview)](semantic-link-power-bi.md)
- [Semantic data propagation from semantic models (preview)](semantic-link-semantic-propagation.md)
