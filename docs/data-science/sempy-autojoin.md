---
title: SemPy autojoin
description: Follow an example of how to use SemPy to infer how to flatten or join a set of entities.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: how-to 
ms.date: 2/10/2023
---

# Autojoin

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this article, you'll learn about SemPy's functionality for inferring how to flatten or join a set of entities.

## Inferring merge paths

A common task in data science is to denormalize or flatten relational schemas. Databases are often stored in third normal form to avoid redundancies, but this isn't a convenient format for analysis or machine learning. SemPy has some functionality to infer how to flatten or join a set of entities.

A common form of schema is a star schema, such as the following.

```python
from sempy.utils.datasets import ModelGenerator
```

```python
# We're using the ModelGenerator which creates STypes and relationships for a given schema for experimentation.
# ID columns with primary keys are added automatically to all tables.
# Grounding functions are added using synthetic data.
# To create a new model from your own data, see https://enyaprod.azurewebsites.net/getting_started.html#annotating-data-from-scratch
mg = ModelGenerator(add_component_suffix=False)
kb = mg.kb
mg.add_frame("CustomerAddress", columns=["StreetAddress", "ZipCode"])
mg.add_frame("Product", columns=["Price"])
mg.add_frame("Store", columns=["StoreAddress"])
# Column names ending with _id are interpreted as foreign keys and relationships are automatically added.
mg.add_frame("Customer", columns=["CustomerName", "CustomerAddress_id"])
mg.add_frame("Sale", columns=["Customer_id", "Product_id", "Store_id"])
```

```python
kb.plot_relationships()
```

Given a Pandas dataframe `sale_df` containing the sales data and `customer_df` containing the customer data, both of which have a `customer_id` column, one can join the two dataframes by invoking:

```python
sale_df = kb.get_data("Sale")
customer_df = kb.get_data("Customer")

# standard pandas merge
merged_df = sale_df.merge(customer_df, left_on="Customer_id", right_on="id")
```

With semantic dataframes in SemPy, you can omit the `on` keyword(s) if there's a relationship connecting the two in the knowledge base, so you can write:

```python
# inferred merge key with sempy
merged_df = sale_df.merge(customer_df)
```

Instead of the semantic dataframe, you can also just pass the name of the entity you want to merge:

```python
merged_df = sale_df.merge("Customer")
```

If there's no direct relationship, `merge` without the `on` keyword computes a path connecting the two using relationships in the knowledge base. You can display the merge path by passing `show_path=True`:

```python
merged_df_path = sale_df.merge("CustomerAddress", show_path=True)
```

## Merge paths between multiple entities

Often you want to merge more than two entities `SemanticDataFrame.merge` supports lists of entities:

```python
complex_merge = sale_df.merge(["Customer", "Store", "Product"], show_path=True)
```

## Selecting the right merge path

In many cases, there are multiple possible ways to merge two or more entities. Consider the following more complex model:

```python
mg = ModelGenerator(add_component_suffix=False)
kb = mg.kb
mg.add_frame("Address", columns=["StreetAddress", "ZipCode"])
mg.add_frame("Product", columns=["Price"])
mg.add_frame("Region", columns=[])
mg.add_frame("Customer", columns=["CustomerName", "Address_id"])
mg.add_frame("Store", columns=["StoreAddress", "Region_id", "Address_id"])
mg.add_frame("Sale", columns=["Customer_id", "Product_id", "Store_id"])
mg.add_frame("ClickedAd", columns=["Customer_id", "Product_id"])
mg.add_frame("ProductAvailableInRegion", columns=["Product_id", "Region_id"])

kb.plot_relationships()
```

There are two ways to merge `Store` and `Product` here, either via `Sale` or via `Region` and `ProductAvailableInRegion`. Both are semantically meaningful queries; merging via `Sale` would augment the `Sale` table with the information from `Store` and `Product` and basically give details about all the products sold in each store. Going via `Region` and `ProductAvailableInRegion` would result in a table of all the products available in the region the store is in.

By default, `merge` only considers the path via `Sale`, as it doesn't involve N:M joins, which can lead to very large tables (in this case it would be roughly number of stores times number of products):

```python
merged_frame = kb.get_data("Store").merge("Product", show_path=True)
# The merged sdf has rows corresponding to the rows of the Sale sdf
merged_frame.shape[0] == kb.get_data("Sale").shape[0]
```

The join path selection also favors shorter joins, so when asked to join `Product` and `Region`, the path via `ProductAvailableInRegion` would be selected, a path involving two merged, instead of the path via `Sale` and `Store`:

```python
merged_frame = kb.get_data("Region").merge("Product", show_path=True)
```

Sometimes there's more than one shortest path, though, in which case `merge` throws an error. For example, `Product` and `Customer` could be merged in two ways with a path of length 2, either via `Sale` or via `ClickedAd`. Both of these are natural queries, one telling you which products a customer bought, the other which products they clicked an ad for. There's no way to disambiguate the user intent here:

```python
try:
    merged_frame = kb.get_data("Customer").merge("Product", show_path=True)
except ValueError as e:
    print(e)
```

We can specify which one we want by adding the SDF of interest to the merge. Given the SDFs `Customer`, `Product` and `Sale` the shortest path connecting the three is by using the relationships with `Sale`:

```python
merged_frame = kb.get_data("Customer").merge(["Product", "Sale"], show_path=True)
```

## Displaying and debugging paths

We can find the possible merge paths between two or more SDFs without executing the join using `kb.find_merge_paths`:

```python
paths = kb.find_merge_paths(["Customer", "Store"], show_paths=True)
```

As mentioned previously, `merge` (and `find_merge_paths`) have two built-in heuristics that prefer certain merge paths, one is to avoid product-type or N:M merges, the other is to prefer shortest paths.

Both of these are used by default. We can disable one or both of these restrictions:

```python
paths = kb.find_merge_paths(["Customer", "Store"], allow_cartesian_products=True, show_paths=True)
len(paths)
```

```python
paths = kb.find_merge_paths(["Customer", "Store"], allow_cartesian_products=True, shortest_path=False, show_paths=True)
len(paths)
```

## Technical details

We've talked about merge paths previously without really defining what they are. Technically, we consider as a merge any undirected tree for which all leaves are in the set of requested entities. The order of entities in the requested list doesn't matter for which paths are returned (though their order might change).

Some of the requested entities can be internal nodes, so requested entities can be internal or leaves, but all leaves must be requested nodes, i.e. there are no extra merges that aren't required to connect the requested entities.

The option `allow_cartesian_products=False` finds only those paths that are directed rooted trees; the path finding algorithm uses the direction of relationships (which are assumed to go from foreign keys to primary keys), to determine likely merge paths. For example, the attribute `Store_id` is a foreign key in the entity `Sale`, and the primary key in the entity `Store` is `id` and the relationship goes "from" `Sale` to `Store`.

Using only directed trees has the benefit that it limits the size of the dataframe resulting from the merge, and that the result usually has a natural explanation, as it shares a primary key with the root of the tree.

As was pointed out in merging `Product` and `Store` via `Sale`, the root of the tree doesn't need to be one of the requested entities.

Another way to describe what `allow_cartesian_products=False` (the default) does, is to find a subset of the schema that is a star schema and contains all of the requested entities, i.e. the resulting dataframe is an augmented version of the dataframe corresponding to the root of the directed rooted tree.

## Current limitations

### No support for multiple inclusions of an SDF

Consider the following schema:

```python
mg = ModelGenerator(add_component_suffix=False)
kb = mg.kb

mg.add_frame("Gender", columns=["GenderDescription"])
mg.add_frame("Patient", columns=["PatientName", "Gender_id"])
mg.add_frame("Provider", columns=["ProviderName", "Gender_id"])
mg.add_frame("Encounter", columns=["Patient_id", "Provider_id"])

kb.plot_relationships()
```

It's currently not possible to automatically flatten the whole schema, even though there's an intuitive interpretation, which would be to merge the `Gender` into both `Patient` and `Provider`. Currently, the user could express the intent to merge `Gender`, `Patient` and `Provider` using `kb.get_data("Gender").merge(["Patient", "Provider"])` but the intention of this is ambiguous. The tables could be connected by merging `Gender` into `Patient` or by `Gender` into `Provider` or by merging `Gender` into both.

If the intent is to flatten the full schema, the last one is likely the most intuitive, but it's not currently possible to achieve with SemPy:

```python
try:
    kb.get_data("Gender").merge(["Patient", "Provider"], show_path=True)
except ValueError as e:
    print(e)
```

Unfortunately, even explicitly first merging gender into the patient and provider frames doesn't work:

```python
patient_gender = kb.get_data("Gender").merge("Patient")
provider_gender = kb.get_data("Gender").merge("Provider")
```

```python
try:
    patient_gender.merge(provider_gender)
except ValueError as e:
    print(e)
```

However, we can always explicitly merge into only one of the two frames:

```python
result = kb.get_data("Gender").merge("Patient", show_path=True).merge("Provider", show_path=True)
```
