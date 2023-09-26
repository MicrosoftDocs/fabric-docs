<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/powerbi_relationships_tutorial.ipynb -->

> [!TIP]
> Contents of _powerbi_relationships_tutorial.ipynb_. **[Open in GitHub](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/powerbi_relationships_tutorial.ipynb)**.

# Tutorial: Discover relationships in a Power BI dataset using Semantic Link
This tutorial illustrates how to interact with Power BI from a Jupyter notebook with the help of the SemPy library. 

### In this tutorial, you learn how to:
- Apply domain knowledge to formulate hypotheses about functional dependencies in a dataset.
- Use components of Semantic Link's Python library (SemPy) that supports integration with Power BI and helps to automate data quality analysis. These components include:
    - FabricDataFrame - a pandas-like structure enhanced with additional semantic information.
    - Functions for pulling Power BI datasets from a Fabric workspace into your notebook.
    - Functions that automate the evaluation of hypotheses about functional dependencies and that identify violations of relationships in your datasets.

### Prerequisites

* A [Microsoft Fabric subscription](https://learn.microsoft.com/fabric/enterprise/licenses). Or sign up for a free [Microsoft Fabric (Preview) trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
* Sign in to [Microsoft Fabric](https://fabric.microsoft.com/).
* Go to the Data Science experience in Microsoft Fabric.
* Select **Workspaces** from the left navigation pane to find and select your workspace. This workspace becomes your current workspace.
* Download the _Customer Profitability Sample.pbix_ and _Customer Profitability Sample (auto).pbix_ datasets from the [fabric-samples GitHub repository](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/datasets) and upload them to your workspace.
* Open your notebook. You have two options:
    * [Import this notebook into your workspace](https://learn.microsoft.com/en-us/fabric/data-engineering/how-to-use-notebook#import-existing-notebooks). You can import from the Data Science homepage.
    * Alternatively, you can create [a new notebook](https://learn.microsoft.com/fabric/data-engineering/how-to-use-notebook#create-notebooks) to copy/paste code into cells.
* In the Lakehouse explorer section of your notebook, add a new or existing lakehouse to your notebook. For more information on how to add a lakehouse, see [Attach a lakehouse to your notebook](https://learn.microsoft.com/en-us/fabric/data-science/tutorial-data-science-prepare-system#attach-a-lakehouse-to-the-notebooks).

## Set up the notebook

In this section, you set up a notebook environment with the necessary modules and data.

1. Install `SemPy` from PyPI using the `%pip` in-line installation capability within the notebook:


```python
%pip install semantic-link
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, -1, Finished, Available)







    Collecting semantic-link
      Downloading semantic_link-0.3.4-py3-none-any.whl (8.2 kB)
    Collecting semantic-link-functions-holidays==0.3.4
      Downloading semantic_link_functions_holidays-0.3.4-py3-none-any.whl (4.2 kB)
    Collecting semantic-link-sempy==0.3.4
      Downloading semantic_link_sempy-0.3.4-py3-none-any.whl (2.9 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.9/2.9 MB[0m [31m106.4 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting semantic-link-functions-meteostat==0.3.4
      Downloading semantic_link_functions_meteostat-0.3.4-py3-none-any.whl (4.5 kB)
    Collecting semantic-link-functions-geopandas==0.3.4
      Downloading semantic_link_functions_geopandas-0.3.4-py3-none-any.whl (4.0 kB)
    Collecting semantic-link-functions-phonenumbers==0.3.4
      Downloading semantic_link_functions_phonenumbers-0.3.4-py3-none-any.whl (4.3 kB)
    Collecting semantic-link-functions-validators==0.3.4
      Downloading semantic_link_functions_validators-0.3.4-py3-none-any.whl (4.8 kB)
    Collecting folium
      Downloading folium-0.14.0-py2.py3-none-any.whl (102 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m102.3/102.3 kB[0m [31m49.2 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting mapclassify
      Downloading mapclassify-2.6.0-py3-none-any.whl (40 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m40.8/40.8 kB[0m [31m22.8 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting geopandas
      Downloading geopandas-0.14.0-py3-none-any.whl (1.1 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m1.1/1.1 MB[0m [31m140.6 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting holidays
      Downloading holidays-0.33-py3-none-any.whl (759 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m759.7/759.7 kB[0m [31m139.9 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting meteostat
      Downloading meteostat-1.6.6-py3-none-any.whl (31 kB)
    Collecting phonenumbers
      Downloading phonenumbers-8.13.21-py2.py3-none-any.whl (2.6 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.6/2.6 MB[0m [31m159.8 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting validators
      Downloading validators-0.22.0-py3-none-any.whl (26 kB)
    Collecting pythonnet==3.0.1
      Downloading pythonnet-3.0.1-py3-none-any.whl (284 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m284.5/284.5 kB[0m [31m95.3 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting clr-loader<0.3.0,>=0.2.2
      Downloading clr_loader-0.2.6-py3-none-any.whl (51 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m51.3/51.3 kB[0m [31m22.1 MB/s[0m eta [36m0:00:00[0m
    [?25hRequirement already satisfied: numpy in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.23.5)
    Requirement already satisfied: jinja2>=2.9 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.1.2)
    Requirement already satisfied: requests in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.28.2)
    Collecting branca>=0.6.0
      Downloading branca-0.6.0-py3-none-any.whl (24 kB)
    Collecting pyproj>=3.3.0
      Downloading pyproj-3.6.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (8.3 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m8.3/8.3 MB[0m [31m170.0 MB/s[0m eta [36m0:00:00[0m00:01[0m
    [?25hCollecting shapely>=1.8.0
      Downloading shapely-2.0.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (2.3 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.3/2.3 MB[0m [31m165.4 MB/s[0m eta [36m0:00:00[0m
    [?25hRequirement already satisfied: packaging in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (22.0)
    Collecting fiona>=1.8.21
      Downloading Fiona-1.9.4.post1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (16.4 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m16.4/16.4 MB[0m [31m131.2 MB/s[0m eta [36m0:00:00[0m00:01[0m00:01[0m
    [?25hRequirement already satisfied: pandas>=1.4.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.5.3)
    Requirement already satisfied: python-dateutil in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from holidays->semantic-link-functions-holidays==0.3.4->semantic-link) (2.8.2)
    Requirement already satisfied: scikit-learn in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.2.0)
    Requirement already satisfied: scipy>=1.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.10.1)
    Collecting networkx
      Downloading networkx-3.1-py3-none-any.whl (2.1 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.1/2.1 MB[0m [31m174.2 MB/s[0m eta [36m0:00:00[0m
    [?25hRequirement already satisfied: pytz in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from meteostat->semantic-link-functions-meteostat==0.3.4->semantic-link) (2022.7.1)
    Requirement already satisfied: cffi>=1.13 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from clr-loader<0.3.0,>=0.2.2->pythonnet==3.0.1->semantic-link-sempy==0.3.4->semantic-link) (1.15.1)
    Requirement already satisfied: six in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.16.0)
    Requirement already satisfied: attrs>=19.2.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (22.2.0)
    Requirement already satisfied: certifi in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (2022.12.7)
    Requirement already satisfied: click~=8.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (8.1.3)
    Collecting cligj>=0.5
      Downloading cligj-0.7.2-py3-none-any.whl (7.1 kB)
    Collecting click-plugins>=1.0
      Downloading click_plugins-1.1.1-py2.py3-none-any.whl (7.5 kB)
    Requirement already satisfied: MarkupSafe>=2.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from jinja2>=2.9->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.1.2)
    Requirement already satisfied: charset-normalizer<4,>=2 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.1.1)
    Requirement already satisfied: idna<4,>=2.5 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.4)
    Requirement already satisfied: urllib3<1.27,>=1.21.1 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.26.14)
    Requirement already satisfied: joblib>=1.1.1 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from scikit-learn->mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.2.0)
    Requirement already satisfied: threadpoolctl>=2.0.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from scikit-learn->mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.1.0)
    Requirement already satisfied: pycparser in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from cffi>=1.13->clr-loader<0.3.0,>=0.2.2->pythonnet==3.0.1->semantic-link-sempy==0.3.4->semantic-link) (2.21)
    Installing collected packages: phonenumbers, validators, shapely, pyproj, networkx, cligj, click-plugins, holidays, fiona, clr-loader, branca, pythonnet, meteostat, mapclassify, geopandas, folium, semantic-link-sempy, semantic-link-functions-validators, semantic-link-functions-phonenumbers, semantic-link-functions-meteostat, semantic-link-functions-holidays, semantic-link-functions-geopandas, semantic-link
    Successfully installed branca-0.6.0 click-plugins-1.1.1 cligj-0.7.2 clr-loader-0.2.6 fiona-1.9.4.post1 folium-0.14.0 geopandas-0.14.0 holidays-0.33 mapclassify-2.6.0 meteostat-1.6.6 networkx-3.1 phonenumbers-8.13.21 pyproj-3.6.1 pythonnet-3.0.1 semantic-link-0.3.4 semantic-link-functions-geopandas-0.3.4 semantic-link-functions-holidays-0.3.4 semantic-link-functions-meteostat-0.3.4 semantic-link-functions-phonenumbers-0.3.4 semantic-link-functions-validators-0.3.4 semantic-link-sempy-0.3.4 shapely-2.0.1 validators-0.22.0
    
    [1m[[0m[34;49mnotice[0m[1;39;49m][0m[39;49m A new release of pip is available: [0m[31;49m23.0[0m[39;49m -> [0m[32;49m23.2.1[0m
    [1m[[0m[34;49mnotice[0m[1;39;49m][0m[39;49m To update, run: [0m[32;49m/nfs4/pyenv-d6d85d4d-bdc6-4a39-aaf3-b5639922505c/bin/python -m pip install --upgrade pip[0m
    Note: you may need to restart the kernel to use updated packages.
    






    Warning: PySpark kernel has been restarted to use updated packages.
    
    

2. Perform necessary imports of SemPy modules that you'll need later:


```python
import sempy.fabric as fabric

from sempy.relationships import plot_relationship_metadata
from sempy.relationships import find_relationships
from sempy.fabric import list_relationship_violations
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 10, Finished, Available)


3. Import pandas for enforcing a configuration option that will help with output formatting:


```python
import pandas as pd
pd.set_option('display.max_colwidth', None)
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 11, Finished, Available)


## Explore Power BI datasets

This tutorial uses a standard Power BI sample dataset [_Customer Profitability Sample.pbix_](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/datasets/Customer%20Profitability%20Sample.pbix). For a description of the dataset, see [Customer Profitability sample for Power BI](https://learn.microsoft.com/en-us/power-bi/create-reports/sample-customer-profitability).

Use SemPy's `list_datasets` function to explore datasets in your current workspace:


```python
fabric.list_datasets()
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 12, Finished, Available)





<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Dataset Name</th>
      <th>Dataset ID</th>
      <th>Created Timestamp</th>
      <th>Last Update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>semantic_link_data</td>
      <td>7e659c31-a025-4f17-85f3-f259c7cdef19</td>
      <td>2021-02-12 23:00:58</td>
      <td>0001-01-01 00:00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Customer Profitability Sample</td>
      <td>3bb45e13-8773-445c-8356-ada632997731</td>
      <td>2014-07-22 03:50:22</td>
      <td>0001-01-01 00:00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Retail Analysis Sample PBIX</td>
      <td>0a4b5b1f-76c9-4dda-9e8c-7739790a9c98</td>
      <td>2014-05-30 20:16:22</td>
      <td>0001-01-01 00:00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Customer Profitability Sample (auto)</td>
      <td>b19dfc8b-2b2f-44ed-baa8-61892389e35e</td>
      <td>2014-07-22 03:50:22</td>
      <td>0001-01-01 00:00:00</td>
    </tr>
  </tbody>
</table>
</div>



For the rest of this notebook you'll use two versions of the Customer Profitability Sample dataset:
-  *Customer Profitability Sample*: the dataset as it comes from Power BI samples with predefined table relationships
-  *Customer Profitability Sample (auto)*: the same data, but relationships are limited to those that would be auto-detected by Power BI
 

## Extract a sample dataset with its predefined semantic model

Load relationships that are predefined and stored within the _Customer Profitability Sample_ Power BI dataset, using SemPy's `list_relationships` function. This function lists from the Tabular Object Model:


```python
dataset = "Customer Profitability Sample"
relationships = fabric.list_relationships(dataset)
relationships
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 13, Finished, Available)





<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Multiplicity</th>
      <th>From Table</th>
      <th>From Column</th>
      <th>To Table</th>
      <th>To Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>BU Key</td>
      <td>BU</td>
      <td>BU Key</td>
    </tr>
    <tr>
      <th>1</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>YearPeriod</td>
      <td>Calendar</td>
      <td>YearPeriod</td>
    </tr>
    <tr>
      <th>2</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>Customer Key</td>
      <td>Customer</td>
      <td>Customer</td>
    </tr>
    <tr>
      <th>3</th>
      <td>m:1</td>
      <td>BU</td>
      <td>Executive_id</td>
      <td>Executive</td>
      <td>ID</td>
    </tr>
    <tr>
      <th>4</th>
      <td>m:1</td>
      <td>Customer</td>
      <td>Industry ID</td>
      <td>Industry</td>
      <td>ID</td>
    </tr>
    <tr>
      <th>5</th>
      <td>m:1</td>
      <td>Customer</td>
      <td>State</td>
      <td>State</td>
      <td>StateCode</td>
    </tr>
    <tr>
      <th>6</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>Scenario Key</td>
      <td>Scenario</td>
      <td>Scenario Key</td>
    </tr>
    <tr>
      <th>7</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>Product Key</td>
      <td>Product</td>
      <td>Product Key</td>
    </tr>
  </tbody>
</table>
</div>



Visualize the `relationships` DataFrame as a graph, using SemPy's `plot_relationship_metadata` function:


```python
plot_relationship_metadata(relationships)
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 14, Finished, Available)





    
![svg](temp_files/temp_17_1.svg)
    



This graph shows the "ground truth" for relationships between tables in this dataset, as it reflects how they were defined in Power BI by a subject matter expert.

## Complement relationships discovery

If you started with relationships that were auto-detected by Power BI, you'd have a smaller set:


```python
dataset = "Customer Profitability Sample (auto)"
autodetected = fabric.list_relationships(dataset)
plot_relationship_metadata(autodetected)
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 15, Finished, Available)





    
![svg](temp_files/temp_20_1.svg)
    




```python

```

Notice that Power BI's auto-detection missed many relationships. Moreover, two of the auto-detected relationships are semantically incorrect:

* `Executive[ID]` -> `Industry[ID]`
* `BU[Executive_id]` -> `Industry[ID]`

Discard the incorrectly identified relationships. But first, print out the relationships as a table:


```python
autodetected
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 16, Finished, Available)





<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Multiplicity</th>
      <th>From Table</th>
      <th>From Column</th>
      <th>To Table</th>
      <th>To Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>BU Key</td>
      <td>BU</td>
      <td>BU Key</td>
    </tr>
    <tr>
      <th>1</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>Scenario Key</td>
      <td>Scenario</td>
      <td>Scenario Key</td>
    </tr>
    <tr>
      <th>2</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>YearPeriod</td>
      <td>Date</td>
      <td>YearPeriod</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1:1</td>
      <td>Executive</td>
      <td>ID</td>
      <td>Industry</td>
      <td>ID</td>
    </tr>
    <tr>
      <th>4</th>
      <td>m:1</td>
      <td>BU</td>
      <td>Executive_id</td>
      <td>Industry</td>
      <td>ID</td>
    </tr>
  </tbody>
</table>
</div>



Incorrect relationships to the `Industry` table appear in rows with index 3 and 4. Use this information to remove these rows.


```python
autodetected.drop(index=[3,4], inplace=True)
autodetected
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 17, Finished, Available)





<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Multiplicity</th>
      <th>From Table</th>
      <th>From Column</th>
      <th>To Table</th>
      <th>To Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>BU Key</td>
      <td>BU</td>
      <td>BU Key</td>
    </tr>
    <tr>
      <th>1</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>Scenario Key</td>
      <td>Scenario</td>
      <td>Scenario Key</td>
    </tr>
    <tr>
      <th>2</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>YearPeriod</td>
      <td>Date</td>
      <td>YearPeriod</td>
    </tr>
  </tbody>
</table>
</div>



Now you have correct, but incomplete relationships, as shown in the following visualization using `plot_relationship_metadata`:


```python
plot_relationship_metadata(autodetected)
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 18, Finished, Available)





    
![svg](temp_files/temp_28_1.svg)
    



Load all the tables from the dataset, using SemPy's `list_tables` and `read_table` functions:


```python
tables = {table: fabric.read_table(dataset, table) for table in fabric.list_tables(dataset)['Name']}

tables.keys()
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 19, Finished, Available)





    dict_keys(['Fact', 'BU', 'Date', 'Scenario', 'Product', 'Customer', 'Industry', 'Executive', 'State'])



Find relationships between tables, using `find_relationships`, and review the log output to get some insights into how this function works:


```python
suggested_relationships_all = find_relationships(
    tables,
    name_similarity_threshold=0.7,
    coverage_threshold=0.7,
    verbose=2
)
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 20, Finished, Available)


    Searching for relationships between tables Fact and BU
      Columns BU Key and BU Key
      Columns BU Key and BU
        Detected BU Key->BU Key coverage: (1.0, 0.15853658536585366)
    Searching for relationships between tables Fact and Date
      Columns YearPeriod and YearPeriod
      Columns YearPeriod and Period
        Detected YearPeriod->YearPeriod coverage: (1.0, 0.19047619047619047)
    Searching for relationships between tables Fact and Scenario
      Columns Scenario Key and Scenario Key
      Columns Scenario Key and Scenario
        Detected Scenario Key->Scenario Key coverage: (1.0, 1.0)
    Searching for relationships between tables Fact and Product
      Columns Product Key and Product Key
      Columns Product Key and Product
        Detected Product Key->Product Key coverage: (0.8571428571428571, 1.0)
    Searching for relationships between tables Fact and Customer
      Columns Customer Key and Customer
      Columns Customer Key and Name
        Detected Customer Key->Customer coverage: (0.7666666666666667, 0.21100917431192662)
    Searching for relationships between tables Fact and Industry
    Searching for relationships between tables Fact and Executive
    Searching for relationships between tables Fact and State
    Searching for relationships between tables BU and Date
    Searching for relationships between tables BU and Scenario
    Searching for relationships between tables BU and Product
    Searching for relationships between tables BU and Customer
    Searching for relationships between tables BU and Industry
    Searching for relationships between tables BU and Executive
      Columns Executive_id and ID
      Columns Executive_id and Name
        Detected Executive_id->ID coverage: (1.0, 0.8888888888888888)
    Searching for relationships between tables BU and State
    Searching for relationships between tables Date and Scenario
    Searching for relationships between tables Date and Product
    Searching for relationships between tables Date and Customer
    Searching for relationships between tables Date and Industry
    Searching for relationships between tables Date and Executive
    Searching for relationships between tables Date and State
    Searching for relationships between tables Scenario and Product
    Searching for relationships between tables Scenario and Customer
    Searching for relationships between tables Scenario and Industry
    Searching for relationships between tables Scenario and Executive
    Searching for relationships between tables Scenario and State
    Searching for relationships between tables Product and Customer
    Searching for relationships between tables Product and Industry
    Searching for relationships between tables Product and Executive
    Searching for relationships between tables Product and State
    Searching for relationships between tables Customer and Industry
      Columns Industry ID and ID
      Columns Industry ID and Industry
        Detected Industry ID->ID coverage: (0.96875, 0.9117647058823529)
    Searching for relationships between tables Customer and Executive
    Searching for relationships between tables Customer and State
      Columns State and StateCode
      Columns State and State
        Detected State->StateCode coverage: (0.8918918918918919, 0.6470588235294118)
    Searching for relationships between tables Industry and Executive
      Columns Image and Img
    Searching for relationships between tables Industry and State
    Searching for relationships between tables Executive and State
    

Visualize newly discovered relationships:


```python
plot_relationship_metadata(suggested_relationships_all)
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 21, Finished, Available)





    
![svg](temp_files/temp_34_1.svg)
    



SemPy was able to detect all relationships! To limit the search to additional relationships that weren't identified previously, use the `exclude` parameter:


```python
additional_relationships = find_relationships(
    tables,
    exclude=autodetected,
    name_similarity_threshold=0.7,
    coverage_threshold=0.7
)

additional_relationships
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 22, Finished, Available)





<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Multiplicity</th>
      <th>From Table</th>
      <th>From Column</th>
      <th>To Table</th>
      <th>To Column</th>
      <th>Coverage From</th>
      <th>Coverage To</th>
      <th>Null Count From</th>
      <th>Null Count To</th>
      <th>Unique Count From</th>
      <th>Unique Count To</th>
      <th>Row Count From</th>
      <th>Row Count To</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>Product Key</td>
      <td>Product</td>
      <td>Product Key</td>
      <td>0.857143</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>7</td>
      <td>6</td>
      <td>47646</td>
      <td>6</td>
    </tr>
    <tr>
      <th>1</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>Customer Key</td>
      <td>Customer</td>
      <td>Customer</td>
      <td>0.766667</td>
      <td>0.211009</td>
      <td>0</td>
      <td>0</td>
      <td>90</td>
      <td>327</td>
      <td>47646</td>
      <td>327</td>
    </tr>
    <tr>
      <th>2</th>
      <td>m:1</td>
      <td>BU</td>
      <td>Executive_id</td>
      <td>Executive</td>
      <td>ID</td>
      <td>1.000000</td>
      <td>0.888889</td>
      <td>0</td>
      <td>0</td>
      <td>8</td>
      <td>9</td>
      <td>164</td>
      <td>9</td>
    </tr>
    <tr>
      <th>3</th>
      <td>m:1</td>
      <td>Customer</td>
      <td>Industry ID</td>
      <td>Industry</td>
      <td>ID</td>
      <td>0.968750</td>
      <td>0.911765</td>
      <td>0</td>
      <td>0</td>
      <td>32</td>
      <td>34</td>
      <td>327</td>
      <td>34</td>
    </tr>
    <tr>
      <th>4</th>
      <td>m:1</td>
      <td>Customer</td>
      <td>State</td>
      <td>State</td>
      <td>StateCode</td>
      <td>0.891892</td>
      <td>0.647059</td>
      <td>0</td>
      <td>0</td>
      <td>37</td>
      <td>51</td>
      <td>327</td>
      <td>51</td>
    </tr>
  </tbody>
</table>
</div>



## Validate the relationships

To validate the relationships, you need to load the data from the _Customer Profitability Sample_ dataset first:


```python
dataset = "Customer Profitability Sample"
tables = {table: fabric.read_table(dataset, table) for table in fabric.list_tables(dataset)['Name']}

tables.keys()
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 23, Finished, Available)





    dict_keys(['Fact', 'BU', 'Calendar', 'Scenario', 'Product', 'Customer', 'Industry', 'Executive', 'State'])



Once you have the data, you can check for overlap of primary and foreign key values by using the `list_relationship_violations` function. Supply the output of the `list_relationships` function as input to `list_relationship_violations`:


```python
list_relationship_violations(tables, fabric.list_relationships(dataset))
```


    StatementMeta(, add07076-dc47-4e48-9a33-4fbb21f1bcea, 24, Finished, Available)





<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Multiplicity</th>
      <th>From Table</th>
      <th>From Column</th>
      <th>To Table</th>
      <th>To Column</th>
      <th>Type</th>
      <th>Message</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>Customer Key</td>
      <td>Customer</td>
      <td>Customer</td>
      <td>partial join</td>
      <td>21 out of 90 values in Fact[Customer Key] not present in Customer[Customer]: 1042,1044,1045,1024,1002,1000,1010,1032,1017,1025,...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>m:1</td>
      <td>Fact</td>
      <td>Product Key</td>
      <td>Product</td>
      <td>Product Key</td>
      <td>partial join</td>
      <td>1 out of 7 values in Fact[Product Key] not present in Product[Product Key]: 50</td>
    </tr>
    <tr>
      <th>2</th>
      <td>m:1</td>
      <td>Customer</td>
      <td>State</td>
      <td>State</td>
      <td>StateCode</td>
      <td>partial join</td>
      <td>4 out of 37 values in Customer[State] not present in State[StateCode]: ON,MX,MB,NSW</td>
    </tr>
    <tr>
      <th>3</th>
      <td>m:1</td>
      <td>Customer</td>
      <td>Industry ID</td>
      <td>Industry</td>
      <td>ID</td>
      <td>partial join</td>
      <td>1 out of 32 values in Customer[Industry ID] not present in Industry[ID]: 31</td>
    </tr>
  </tbody>
</table>
</div>



The relationship violations provide some interesting insights. For example, you see that one out of seven values in `Fact[Product Key]` is not present in `Product[Product Key]`, and this missing key is `50`.

Exploratory data analysis is an exciting process, and so is data cleaning. There's always something that the data is hiding, depending on how you look at it, what you want to ask, and so on. Semantic Link provides you with new tools that you can use to achieve more with your data. 

## Related content

Check out other tutorials for Semantic Link / SemPy:
1. Clean data with functional dependencies
1. Analyze functional dependencies in a Power BI sample dataset
1. Discover relationships in the _Synthea_ dataset using Semantic Link
1. Extract and calculate Power BI measures from a Jupyter Notebook



<!-- nbend -->
