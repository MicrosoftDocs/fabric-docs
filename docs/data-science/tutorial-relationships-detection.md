<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/relationships_detection_tutorial.ipynb -->

> [!TIP]
> Contents of _relationships_detection_tutorial.ipynb_. **[Open in GitHub](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/relationships_detection_tutorial.ipynb)**.

# Tutorial: Discover relationships in the _Synthea_ dataset using Semantic Link

This tutorial illustrates how to detect relationships in the public _Synthea_ dataset, using Semantic Link. 

When you're working with new data or working without an existing data model, it can be helpful to discover relationships automatically. This relationship detection can help you to:

   * understand the model at a high level,
   * gain more insights during exploratory data analysis,
   * validate updated data or new, incoming data, and
   * clean data.

Even if relationships are known in advance, a search for relationships can help with better understanding of the data model or identification of data quality issues. 

In this tutorial, you begin with a simple baseline example where you experiment with only three tables so that connections between them are easy to follow. Then, you'll show a more complex example with a larger table set.

### In this tutorial, you learn how to: 
- Use components of Semantic Link's Python library (SemPy) that supports integration with Power BI and helps to automate data  analysis. These components include:
    - FabricDataFrame - a pandas-like structure enhanced with additional semantic information.
    - Functions for pulling Power BI datasets from a Fabric workspace into your notebook.
    - Functions that automate the discovery and visualization of relationships in your datasets.
- Troubleshoot the process of relationship discovery for datasets with multiple tables and interdependencies.

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


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, -1, Finished, Available)







    Collecting semantic-link
      Downloading semantic_link-0.3.4-py3-none-any.whl (8.2 kB)
    Collecting semantic-link-functions-holidays==0.3.4
      Downloading semantic_link_functions_holidays-0.3.4-py3-none-any.whl (4.2 kB)
    Collecting semantic-link-functions-validators==0.3.4
      Downloading semantic_link_functions_validators-0.3.4-py3-none-any.whl (4.8 kB)
    Collecting semantic-link-functions-geopandas==0.3.4
      Downloading semantic_link_functions_geopandas-0.3.4-py3-none-any.whl (4.0 kB)
    Collecting semantic-link-sempy==0.3.4
      Downloading semantic_link_sempy-0.3.4-py3-none-any.whl (2.9 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.9/2.9 MB[0m [31m111.5 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting semantic-link-functions-phonenumbers==0.3.4
      Downloading semantic_link_functions_phonenumbers-0.3.4-py3-none-any.whl (4.3 kB)
    Collecting semantic-link-functions-meteostat==0.3.4
      Downloading semantic_link_functions_meteostat-0.3.4-py3-none-any.whl (4.5 kB)
    Collecting geopandas
      Downloading geopandas-0.14.0-py3-none-any.whl (1.1 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m1.1/1.1 MB[0m [31m140.5 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting folium
      Downloading folium-0.14.0-py2.py3-none-any.whl (102 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m102.3/102.3 kB[0m [31m45.0 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting mapclassify
      Downloading mapclassify-2.6.0-py3-none-any.whl (40 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m40.8/40.8 kB[0m [31m19.5 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting holidays
      Downloading holidays-0.33-py3-none-any.whl (759 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m759.7/759.7 kB[0m [31m133.9 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting meteostat
      Downloading meteostat-1.6.6-py3-none-any.whl (31 kB)
    Collecting phonenumbers
      Downloading phonenumbers-8.13.21-py2.py3-none-any.whl (2.6 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.6/2.6 MB[0m [31m156.8 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting validators
      Downloading validators-0.22.0-py3-none-any.whl (26 kB)
    Collecting pythonnet==3.0.1
      Downloading pythonnet-3.0.1-py3-none-any.whl (284 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m284.5/284.5 kB[0m [31m93.2 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting clr-loader<0.3.0,>=0.2.2
      Downloading clr_loader-0.2.6-py3-none-any.whl (51 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m51.3/51.3 kB[0m [31m22.4 MB/s[0m eta [36m0:00:00[0m
    [?25hRequirement already satisfied: requests in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.28.2)
    Collecting branca>=0.6.0
      Downloading branca-0.6.0-py3-none-any.whl (24 kB)
    Requirement already satisfied: numpy in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.23.5)
    Requirement already satisfied: jinja2>=2.9 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.1.2)
    Requirement already satisfied: pandas>=1.4.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.5.3)
    Collecting fiona>=1.8.21
      Downloading Fiona-1.9.4.post1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (16.4 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m16.4/16.4 MB[0m [31m114.5 MB/s[0m eta [36m0:00:00[0m00:01[0m00:01[0m
    [?25hCollecting pyproj>=3.3.0
      Downloading pyproj-3.6.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (8.3 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m8.3/8.3 MB[0m [31m161.3 MB/s[0m eta [36m0:00:00[0m00:01[0m
    [?25hRequirement already satisfied: packaging in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (22.0)
    Collecting shapely>=1.8.0
      Downloading shapely-2.0.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (2.3 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.3/2.3 MB[0m [31m159.3 MB/s[0m eta [36m0:00:00[0m
    [?25hRequirement already satisfied: python-dateutil in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from holidays->semantic-link-functions-holidays==0.3.4->semantic-link) (2.8.2)
    Collecting networkx
      Downloading networkx-3.1-py3-none-any.whl (2.1 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.1/2.1 MB[0m [31m155.9 MB/s[0m eta [36m0:00:00[0m
    [?25hRequirement already satisfied: scipy>=1.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.10.1)
    Requirement already satisfied: scikit-learn in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.2.0)
    Requirement already satisfied: pytz in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from meteostat->semantic-link-functions-meteostat==0.3.4->semantic-link) (2022.7.1)
    Requirement already satisfied: cffi>=1.13 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from clr-loader<0.3.0,>=0.2.2->pythonnet==3.0.1->semantic-link-sempy==0.3.4->semantic-link) (1.15.1)
    Collecting click-plugins>=1.0
      Downloading click_plugins-1.1.1-py2.py3-none-any.whl (7.5 kB)
    Requirement already satisfied: attrs>=19.2.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (22.2.0)
    Requirement already satisfied: click~=8.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (8.1.3)
    Requirement already satisfied: certifi in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (2022.12.7)
    Requirement already satisfied: six in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.16.0)
    Collecting cligj>=0.5
      Downloading cligj-0.7.2-py3-none-any.whl (7.1 kB)
    Requirement already satisfied: MarkupSafe>=2.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from jinja2>=2.9->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.1.2)
    Requirement already satisfied: idna<4,>=2.5 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.4)
    Requirement already satisfied: urllib3<1.27,>=1.21.1 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.26.14)
    Requirement already satisfied: charset-normalizer<4,>=2 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.1.1)
    Requirement already satisfied: threadpoolctl>=2.0.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from scikit-learn->mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.1.0)
    Requirement already satisfied: joblib>=1.1.1 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from scikit-learn->mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.2.0)
    Requirement already satisfied: pycparser in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from cffi>=1.13->clr-loader<0.3.0,>=0.2.2->pythonnet==3.0.1->semantic-link-sempy==0.3.4->semantic-link) (2.21)
    Installing collected packages: phonenumbers, validators, shapely, pyproj, networkx, cligj, click-plugins, holidays, fiona, clr-loader, branca, pythonnet, meteostat, mapclassify, geopandas, folium, semantic-link-sempy, semantic-link-functions-validators, semantic-link-functions-phonenumbers, semantic-link-functions-meteostat, semantic-link-functions-holidays, semantic-link-functions-geopandas, semantic-link
    Successfully installed branca-0.6.0 click-plugins-1.1.1 cligj-0.7.2 clr-loader-0.2.6 fiona-1.9.4.post1 folium-0.14.0 geopandas-0.14.0 holidays-0.33 mapclassify-2.6.0 meteostat-1.6.6 networkx-3.1 phonenumbers-8.13.21 pyproj-3.6.1 pythonnet-3.0.1 semantic-link-0.3.4 semantic-link-functions-geopandas-0.3.4 semantic-link-functions-holidays-0.3.4 semantic-link-functions-meteostat-0.3.4 semantic-link-functions-phonenumbers-0.3.4 semantic-link-functions-validators-0.3.4 semantic-link-sempy-0.3.4 shapely-2.0.1 validators-0.22.0
    
    [1m[[0m[34;49mnotice[0m[1;39;49m][0m[39;49m A new release of pip is available: [0m[31;49m23.0[0m[39;49m -> [0m[32;49m23.2.1[0m
    [1m[[0m[34;49mnotice[0m[1;39;49m][0m[39;49m To update, run: [0m[32;49m/nfs4/pyenv-0d946339-7a8d-4169-8593-06488ee14388/bin/python -m pip install --upgrade pip[0m
    Note: you may need to restart the kernel to use updated packages.
    






    Warning: PySpark kernel has been restarted to use updated packages.
    
    

2. Perform necessary imports of SemPy modules that you'll need later:


```python
import pandas as pd

from sempy.samples import download_synthea
from sempy.relationships import (
    find_relationships,
    list_relationship_violations,
    plot_relationship_metadata
)
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 9, Finished, Available)


3. Import pandas for enforcing a configuration option that will help with output formatting:


```python
import pandas as pd
pd.set_option('display.max_colwidth', None)
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 10, Finished, Available)


4. Pull the sample data. For this tutorial, you'll use the _Synthea_ dataset of synthetic medical records (small version for simplicity):


```python
download_synthea(which='small')
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 11, Finished, Available)





    'abfss://7c92ac6c-2f4c-43a1-b223-f418d41af35a@msit-onelake.dfs.fabric.microsoft.com/76752ff7-dec7-4feb-9a55-b4fef04e169e/Files/synthea/csv'



## Detect relationships on a small subset of _Synthea_ tables

Select three tables from a larger set:
* `patients` specifies patient information.
* `encounters` specifies the patients that had medical encounters (e.g. a medical appointment, procedure) 
* `providers` specifies which medical providers attended to the patients. 

The `encounters` table resolves a many-to-many relationship between `patients` and `providers` and can be described as an [associative entity](https://wikipedia.org/wiki/Associative_entity):


```python
patients = pd.read_csv('synthea/csv/patients.csv')
providers = pd.read_csv('synthea/csv/providers.csv')
encounters = pd.read_csv('synthea/csv/encounters.csv')
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 12, Finished, Available)


Find relationships between the tables using  SemPy's ``find_relationships`` function:


```python
suggested_relationships = find_relationships([patients, providers, encounters])
suggested_relationships
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 13, Finished, Available)





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
      <td>encounters</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1171</td>
      <td>1171</td>
      <td>53346</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>1</th>
      <td>m:1</td>
      <td>encounters</td>
      <td>PROVIDER</td>
      <td>providers</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.188557</td>
      <td>0</td>
      <td>0</td>
      <td>1104</td>
      <td>5855</td>
      <td>53346</td>
      <td>5855</td>
    </tr>
  </tbody>
</table>
</div>



Visualize the relationships DataFrame as a graph, using SemPy's `plot_relationship_metadata` function.
The function lays out the hierarchy from left to right, which corresponds to "from" and "to" tables in the output. In other words, the independent "from" tables on the left use their foreign keys to point to their "to" dependency tables on the right. Each entity box shows columns that participate on either the "from" or "to" side of a relationship.


```python
plot_relationship_metadata(suggested_relationships)
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 14, Finished, Available)





    
![svg](temp_files/temp_18_1.svg)
    



By default, relationships are generated as "m:1" (not as "1:m") or "1:1". The "1:1" relationships can be generated one or both ways, depending on if the ratio of mapped values to all values exceed `coverage_threshold` in just one or both directions. Later in this tutorial, you'll cover the less frequent case of "m:m" relationships.

## Troubleshoot relationship detection issues

The baseline example shows a successful relationship detection on clean _Synthea_ data. In practice, the data is rarely clean, which will prevent successful detection. There are several techniques that can be useful when the data isn't clean.

This section of this tutorial will address relationship detection when the dataset is dirty. To begin, you'll manipulate the original DataFrames to obtain "dirty" data.


```python
# create a dirty 'patients' dataframe by dropping some rows using head() and duplicating some rows using concat()
patients_dirty = pd.concat([patients.head(1000), patients.head(50)], axis=0)

# create a dirty 'providers' dataframe by dropping some rows using head()
providers_dirty = providers.head(5000)

# the dirty dataframes have fewer records than the clean ones
print(len(patients_dirty))
print(len(providers_dirty)) 
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 15, Finished, Available)


    1050
    5000
    

For comparison, print sizes of the original tables:


```python
print(len(patients))
print(len(providers))
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 16, Finished, Available)


    1171
    5855
    

Find relationships between the tables using  SemPy's ``find_relationships`` function:


```python
find_relationships([patients_dirty, providers_dirty, encounters])
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 17, Finished, Available)


    No relationships found
    




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
  </tbody>
</table>
</div>



As shown in the previous output, no relationships have been detected due to the errors that you had introduced earlier to create the "dirty" dataset.

### Use validation

Validation is the best tool for troubleshooting relationship detection failures because:

   * It reports clearly why a particular relationship does not follow the Foreign Key rules and therefore cannot be detected.
   * It runs very fast with large datasets because it focuses only on the declared relationships and does not perform a search.

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


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 18, Finished, Available)





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
      <td>encounters</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>target not PK</td>
      <td>patients[Id] not unique</td>
    </tr>
    <tr>
      <th>1</th>
      <td>m:1</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>partial join</td>
      <td>171 out of 1171 values in encounters[PATIENT] not present in patients[Id]: 19d2cfb8-439b-454a-b47e-5274c219005b,278c5ad9-1e68-45f5-b274-0bdbb60569be,3727f482-9fc1-4d26-8778-01b1b745e037,80a7bc09-bbee-476b-9b3f-e44984c96ca1,13c98b78-98e9-41fb-a29a-686d005d98f7,1e52e4fe-13c7-41ad-8b3e-5933fdd553c4,c868a615-b3a7-44c6-ad66-d06b2909d689,0e297a18-1dcc-43a3-b78a-0ca8d07e59bc,92b4bd25-f752-49fe-b248-a3e4b0e89d2a,f290b494-c6de-40ee-98a3-ebb9d43cfd70,...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>m:1</td>
      <td>encounters</td>
      <td>PROVIDER</td>
      <td>providers</td>
      <td>Id</td>
      <td>partial join</td>
      <td>210 out of 1104 values in encounters[PROVIDER] not present in providers[Id]: e755f853-29a9-3772-b889-589c1c172021,08703819-4d5c-3998-9de3-6ef611285bbc,51850f28-6e0a-374f-a50a-948ebf407226,93f77048-5bfd-3a59-9ae4-4399fbd77398,18cc4159-3360-38cf-8ce2-839fb21bedbd,ef6360ac-7d6f-3204-bd31-e1e63fcb0f41,e4cac565-c0a3-3bd1-b0d3-741c3c47881a,c2448f94-4dfd-3330-b9f8-cb975ab790c3,40371261-c4fb-3fba-b3d1-60f47aa0e68f,b274d84c-d063-3cec-a8f1-f85c9bf03bb9,...</td>
    </tr>
  </tbody>
</table>
</div>



### Loosen search criteria

In more murky scenarios, you can try loosening your search criteria. This method increases the possibility of false positives. 
Set `include_many_to_many=True` and evaluate if it helps:


```python
find_relationships(dirty_tables, include_many_to_many=True, coverage_threshold=1)
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 19, Finished, Available)





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
      <td>m:m</td>
      <td>providers</td>
      <td>GENDER</td>
      <td>patients</td>
      <td>GENDER</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>2</td>
      <td>2</td>
      <td>5000</td>
      <td>1050</td>
    </tr>
    <tr>
      <th>1</th>
      <td>m:m</td>
      <td>patients</td>
      <td>GENDER</td>
      <td>providers</td>
      <td>GENDER</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>2</td>
      <td>2</td>
      <td>1050</td>
      <td>5000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>m:m</td>
      <td>patients</td>
      <td>Id</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.853971</td>
      <td>0</td>
      <td>0</td>
      <td>1000</td>
      <td>1171</td>
      <td>1050</td>
      <td>53346</td>
    </tr>
  </tbody>
</table>
</div>



The results show that the relationship from `encounters` to `patients` was detected, but there are two problems:

   * The relationship indicates a direction from `patients` to `encounters` which is an inverse of the expected. This is because all
     `patients` happened to be covered by `encounters` (`Coverage From` is 1.0) while `encounters` are only partially covered
     by `patients` (`Coverage To` = 0.85), since patients rows are missing.
   * There is an accidental match on a low cardinality `GENDER` column, which happens to match by name and value in both tables,
     but it is not an "m:1" relationship of interest. The low cardinality is indicated by `Unique Count From` and
     `Unique Count To` columns.

Rerun ``find_relationships`` to look only for "m:1" relationships, but with a lower ``coverage_threshold=0.5``:


```python
find_relationships(dirty_tables, include_many_to_many=False, coverage_threshold=0.5)
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 20, Finished, Available)





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
      <td>encounters</td>
      <td>PROVIDER</td>
      <td>providers</td>
      <td>Id</td>
      <td>0.809783</td>
      <td>0.1788</td>
      <td>0</td>
      <td>0</td>
      <td>1104</td>
      <td>5000</td>
      <td>53346</td>
      <td>5000</td>
    </tr>
  </tbody>
</table>
</div>



The result shows the correct direction of the relationships from `encounters` to `providers`. However, the relationship from `encounters` to `patients` is not detected, because `patients` is not unique, so it cannot be on the "One" side of "m:1" relationship.
     
Loosen both `include_many_to_many=True` and `coverage_threshold=0.5`:


```python
find_relationships(dirty_tables, include_many_to_many=True, coverage_threshold=0.5)
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 21, Finished, Available)





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
      <td>m:m</td>
      <td>providers</td>
      <td>GENDER</td>
      <td>patients</td>
      <td>GENDER</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>2</td>
      <td>2</td>
      <td>5000</td>
      <td>1050</td>
    </tr>
    <tr>
      <th>1</th>
      <td>m:m</td>
      <td>patients</td>
      <td>GENDER</td>
      <td>providers</td>
      <td>GENDER</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>2</td>
      <td>2</td>
      <td>1050</td>
      <td>5000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>m:m</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>0.853971</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1171</td>
      <td>1000</td>
      <td>53346</td>
      <td>1050</td>
    </tr>
    <tr>
      <th>3</th>
      <td>m:m</td>
      <td>patients</td>
      <td>Id</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.000000</td>
      <td>0.853971</td>
      <td>0</td>
      <td>0</td>
      <td>1000</td>
      <td>1171</td>
      <td>1050</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>4</th>
      <td>m:1</td>
      <td>encounters</td>
      <td>PROVIDER</td>
      <td>providers</td>
      <td>Id</td>
      <td>0.809783</td>
      <td>0.178800</td>
      <td>0</td>
      <td>0</td>
      <td>1104</td>
      <td>5000</td>
      <td>53346</td>
      <td>5000</td>
    </tr>
    <tr>
      <th>5</th>
      <td>m:m</td>
      <td>encounters</td>
      <td>ORGANIZATION</td>
      <td>providers</td>
      <td>ORGANIZATION</td>
      <td>0.811423</td>
      <td>0.986770</td>
      <td>0</td>
      <td>0</td>
      <td>1103</td>
      <td>907</td>
      <td>53346</td>
      <td>5000</td>
    </tr>
    <tr>
      <th>6</th>
      <td>m:m</td>
      <td>providers</td>
      <td>ORGANIZATION</td>
      <td>encounters</td>
      <td>ORGANIZATION</td>
      <td>0.986770</td>
      <td>0.811423</td>
      <td>0</td>
      <td>0</td>
      <td>907</td>
      <td>1103</td>
      <td>5000</td>
      <td>53346</td>
    </tr>
  </tbody>
</table>
</div>



Now both relationships of interest are visible, but there is a lot more noise:

   * The low cardinality match on `GENDER` is present.
   * A higher cardinality "m:m" match on `ORGANIZATION` appeared, making it apparent that `ORGANIZATION` is likely
     a column de-normalized to both tables.

### Match column names

By default, SemPy will consider as matches only attributes that show name similarity, taking advantage of the fact that
database designers usually name related columns the same way. This helps to avoid spurious relationships, which occur most frequently with low cardinality integer keys. For example, if there are `1,2,3,...,10` product categories and `1,2,3,...,10` order status code, they'll be confused with each other when only looking at value mappings without taking column names into account. Spurious relationships should not be a problem with GUID-like keys.

SemPy looks at a similarity between column names and table names. The matching is approximate and case insensitive. It ignores the most frequently encountered "decorator" substrings such as "id", "code", "name", "key", "pk", "fk". As a result, the most typical match cases are:

   * an attribute called 'column' in entity 'foo' will be matched with an attribute called 'column' (also 'COLUMN' or 'Column') in entity 'bar'.
   * an attribute called 'column' in entity 'foo' will be matched with an attribute called 'column_id' in 'bar'.
   * an attribute called 'bar' in entity 'foo' will be matched with an attribute called 'code' in 'bar'.

By matching column names first, the detection runs faster.

To understand which columns are selected for further evaluation, use the `verbose=2` option
(`verbose=1` lists only the entities being processed).

The `name_similarity_threshold` parameter determines how columns will be compared. The threshold of 1 indicates that you're interested in 100% match only:


```python
find_relationships(dirty_tables, verbose=2, name_similarity_threshold=1.0);
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 22, Finished, Available)


    Searching for relationships between tables patients and providers
      Columns GENDER and GENDER
      Columns ADDRESS and ADDRESS
      Columns CITY and CITY
      Columns STATE and STATE
      Columns ZIP and ZIP
      Columns LAT and LAT
      Columns LON and LON
    Searching for relationships between tables patients and encounters
    Searching for relationships between tables providers and encounters
      Columns ORGANIZATION and ORGANIZATION
    No relationships found
    

Running at 100% similarity fails to account for small differences between names. In your example, the tables have a plural form with "s" suffix, which results in no exact match. This is handled very well with the default `name_similarity_threshold=0.8`. Notice that the Id for plural form `patients` is now compared to singular `patient` without adding too many other spurious comparisons to the execution time:


```python
find_relationships(dirty_tables, verbose=2, name_similarity_threshold=0.8);
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 23, Finished, Available)


    Searching for relationships between tables patients and providers
      Columns LAST and LAT
      Columns GENDER and GENDER
      Columns ADDRESS and ADDRESS
      Columns CITY and CITY
      Columns STATE and STATE
      Columns ZIP and ZIP
      Columns LAT and LAT
      Columns LON and LON
    Searching for relationships between tables patients and encounters
      Columns Id and PATIENT
      Columns STATE and START
    Searching for relationships between tables providers and encounters
      Columns Id and PROVIDER
      Columns ORGANIZATION and ORGANIZATION
      Columns NAME and PROVIDER
      Columns STATE and START
    No relationships found
    

Changing `name_similarity_threshold` to 0 is the other extreme, and it indicates that you want to compare all columns. This is rarely necessary and will result in increased execution time and spurious matches that will need to be reviewed. Observe the amount of comparisons in the verbose output:


```python
find_relationships(dirty_tables, verbose=2, name_similarity_threshold=0);
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 24, Finished, Available)


    Searching for relationships between tables patients and providers
      Columns Id and Id
      Columns Id and ORGANIZATION
      Columns Id and NAME
      Columns Id and GENDER
      Columns Id and SPECIALITY
      Columns Id and ADDRESS
      Columns Id and CITY
      Columns Id and STATE
      Columns Id and ZIP
      Columns Id and LAT
      Columns Id and LON
      Columns Id and UTILIZATION
      Columns BIRTHDATE and Id
      Columns BIRTHDATE and ORGANIZATION
      Columns BIRTHDATE and NAME
      Columns BIRTHDATE and GENDER
      Columns BIRTHDATE and SPECIALITY
      Columns BIRTHDATE and ADDRESS
      Columns BIRTHDATE and CITY
      Columns BIRTHDATE and STATE
      Columns BIRTHDATE and ZIP
      Columns BIRTHDATE and LAT
      Columns BIRTHDATE and LON
      Columns BIRTHDATE and UTILIZATION
      Columns DEATHDATE and Id
      Columns DEATHDATE and ORGANIZATION
      Columns DEATHDATE and NAME
      Columns DEATHDATE and GENDER
      Columns DEATHDATE and SPECIALITY
      Columns DEATHDATE and ADDRESS
      Columns DEATHDATE and CITY
      Columns DEATHDATE and STATE
      Columns DEATHDATE and ZIP
      Columns DEATHDATE and LAT
      Columns DEATHDATE and LON
      Columns DEATHDATE and UTILIZATION
      Columns SSN and Id
      Columns SSN and ORGANIZATION
      Columns SSN and NAME
      Columns SSN and GENDER
      Columns SSN and SPECIALITY
      Columns SSN and ADDRESS
      Columns SSN and CITY
      Columns SSN and STATE
      Columns SSN and ZIP
      Columns SSN and LAT
      Columns SSN and LON
      Columns SSN and UTILIZATION
      Columns DRIVERS and Id
      Columns DRIVERS and ORGANIZATION
      Columns DRIVERS and NAME
      Columns DRIVERS and GENDER
      Columns DRIVERS and SPECIALITY
      Columns DRIVERS and ADDRESS
      Columns DRIVERS and CITY
      Columns DRIVERS and STATE
      Columns DRIVERS and ZIP
      Columns DRIVERS and LAT
      Columns DRIVERS and LON
      Columns DRIVERS and UTILIZATION
      Columns PASSPORT and Id
      Columns PASSPORT and ORGANIZATION
      Columns PASSPORT and NAME
      Columns PASSPORT and GENDER
      Columns PASSPORT and SPECIALITY
      Columns PASSPORT and ADDRESS
      Columns PASSPORT and CITY
      Columns PASSPORT and STATE
      Columns PASSPORT and ZIP
      Columns PASSPORT and LAT
      Columns PASSPORT and LON
      Columns PASSPORT and UTILIZATION
      Columns PREFIX and Id
      Columns PREFIX and ORGANIZATION
      Columns PREFIX and NAME
      Columns PREFIX and GENDER
      Columns PREFIX and SPECIALITY
      Columns PREFIX and ADDRESS
      Columns PREFIX and CITY
      Columns PREFIX and STATE
      Columns PREFIX and ZIP
      Columns PREFIX and LAT
      Columns PREFIX and LON
      Columns PREFIX and UTILIZATION
      Columns FIRST and Id
      Columns FIRST and ORGANIZATION
      Columns FIRST and NAME
      Columns FIRST and GENDER
      Columns FIRST and SPECIALITY
      Columns FIRST and ADDRESS
      Columns FIRST and CITY
      Columns FIRST and STATE
      Columns FIRST and ZIP
      Columns FIRST and LAT
      Columns FIRST and LON
      Columns FIRST and UTILIZATION
      Columns LAST and Id
      Columns LAST and ORGANIZATION
      Columns LAST and NAME
      Columns LAST and GENDER
      Columns LAST and SPECIALITY
      Columns LAST and ADDRESS
      Columns LAST and CITY
      Columns LAST and STATE
      Columns LAST and ZIP
      Columns LAST and LAT
      Columns LAST and LON
      Columns LAST and UTILIZATION
      Columns SUFFIX and Id
      Columns SUFFIX and ORGANIZATION
      Columns SUFFIX and NAME
      Columns SUFFIX and GENDER
      Columns SUFFIX and SPECIALITY
      Columns SUFFIX and ADDRESS
      Columns SUFFIX and CITY
      Columns SUFFIX and STATE
      Columns SUFFIX and ZIP
      Columns SUFFIX and LAT
      Columns SUFFIX and LON
      Columns SUFFIX and UTILIZATION
      Columns MAIDEN and Id
      Columns MAIDEN and ORGANIZATION
      Columns MAIDEN and NAME
      Columns MAIDEN and GENDER
      Columns MAIDEN and SPECIALITY
      Columns MAIDEN and ADDRESS
      Columns MAIDEN and CITY
      Columns MAIDEN and STATE
      Columns MAIDEN and ZIP
      Columns MAIDEN and LAT
      Columns MAIDEN and LON
      Columns MAIDEN and UTILIZATION
      Columns MARITAL and Id
      Columns MARITAL and ORGANIZATION
      Columns MARITAL and NAME
      Columns MARITAL and GENDER
      Columns MARITAL and SPECIALITY
      Columns MARITAL and ADDRESS
      Columns MARITAL and CITY
      Columns MARITAL and STATE
      Columns MARITAL and ZIP
      Columns MARITAL and LAT
      Columns MARITAL and LON
      Columns MARITAL and UTILIZATION
      Columns RACE and Id
      Columns RACE and ORGANIZATION
      Columns RACE and NAME
      Columns RACE and GENDER
      Columns RACE and SPECIALITY
      Columns RACE and ADDRESS
      Columns RACE and CITY
      Columns RACE and STATE
      Columns RACE and ZIP
      Columns RACE and LAT
      Columns RACE and LON
      Columns RACE and UTILIZATION
      Columns ETHNICITY and Id
      Columns ETHNICITY and ORGANIZATION
      Columns ETHNICITY and NAME
      Columns ETHNICITY and GENDER
      Columns ETHNICITY and SPECIALITY
      Columns ETHNICITY and ADDRESS
      Columns ETHNICITY and CITY
      Columns ETHNICITY and STATE
      Columns ETHNICITY and ZIP
      Columns ETHNICITY and LAT
      Columns ETHNICITY and LON
      Columns ETHNICITY and UTILIZATION
      Columns GENDER and Id
      Columns GENDER and ORGANIZATION
      Columns GENDER and NAME
      Columns GENDER and GENDER
      Columns GENDER and SPECIALITY
      Columns GENDER and ADDRESS
      Columns GENDER and CITY
      Columns GENDER and STATE
      Columns GENDER and ZIP
      Columns GENDER and LAT
      Columns GENDER and LON
      Columns GENDER and UTILIZATION
      Columns BIRTHPLACE and Id
      Columns BIRTHPLACE and ORGANIZATION
      Columns BIRTHPLACE and NAME
      Columns BIRTHPLACE and GENDER
      Columns BIRTHPLACE and SPECIALITY
      Columns BIRTHPLACE and ADDRESS
      Columns BIRTHPLACE and CITY
      Columns BIRTHPLACE and STATE
      Columns BIRTHPLACE and ZIP
      Columns BIRTHPLACE and LAT
      Columns BIRTHPLACE and LON
      Columns BIRTHPLACE and UTILIZATION
      Columns ADDRESS and Id
      Columns ADDRESS and ORGANIZATION
      Columns ADDRESS and NAME
      Columns ADDRESS and GENDER
      Columns ADDRESS and SPECIALITY
      Columns ADDRESS and ADDRESS
      Columns ADDRESS and CITY
      Columns ADDRESS and STATE
      Columns ADDRESS and ZIP
      Columns ADDRESS and LAT
      Columns ADDRESS and LON
      Columns ADDRESS and UTILIZATION
      Columns CITY and Id
      Columns CITY and ORGANIZATION
      Columns CITY and NAME
      Columns CITY and GENDER
      Columns CITY and SPECIALITY
      Columns CITY and ADDRESS
      Columns CITY and CITY
      Columns CITY and STATE
      Columns CITY and ZIP
      Columns CITY and LAT
      Columns CITY and LON
      Columns CITY and UTILIZATION
      Columns STATE and Id
      Columns STATE and ORGANIZATION
      Columns STATE and NAME
      Columns STATE and GENDER
      Columns STATE and SPECIALITY
      Columns STATE and ADDRESS
      Columns STATE and CITY
      Columns STATE and STATE
      Columns STATE and ZIP
      Columns STATE and LAT
      Columns STATE and LON
      Columns STATE and UTILIZATION
      Columns COUNTY and Id
      Columns COUNTY and ORGANIZATION
      Columns COUNTY and NAME
      Columns COUNTY and GENDER
      Columns COUNTY and SPECIALITY
      Columns COUNTY and ADDRESS
      Columns COUNTY and CITY
      Columns COUNTY and STATE
      Columns COUNTY and ZIP
      Columns COUNTY and LAT
      Columns COUNTY and LON
      Columns COUNTY and UTILIZATION
      Columns ZIP and Id
      Columns ZIP and ORGANIZATION
      Columns ZIP and NAME
      Columns ZIP and GENDER
      Columns ZIP and SPECIALITY
      Columns ZIP and ADDRESS
      Columns ZIP and CITY
      Columns ZIP and STATE
      Columns ZIP and ZIP
      Columns ZIP and LAT
      Columns ZIP and LON
      Columns ZIP and UTILIZATION
      Columns LAT and Id
      Columns LAT and ORGANIZATION
      Columns LAT and NAME
      Columns LAT and GENDER
      Columns LAT and SPECIALITY
      Columns LAT and ADDRESS
      Columns LAT and CITY
      Columns LAT and STATE
      Columns LAT and ZIP
      Columns LAT and LAT
      Columns LAT and LON
      Columns LAT and UTILIZATION
      Columns LON and Id
      Columns LON and ORGANIZATION
      Columns LON and NAME
      Columns LON and GENDER
      Columns LON and SPECIALITY
      Columns LON and ADDRESS
      Columns LON and CITY
      Columns LON and STATE
      Columns LON and ZIP
      Columns LON and LAT
      Columns LON and LON
      Columns LON and UTILIZATION
      Columns HEALTHCARE_EXPENSES and Id
      Columns HEALTHCARE_EXPENSES and ORGANIZATION
      Columns HEALTHCARE_EXPENSES and NAME
      Columns HEALTHCARE_EXPENSES and GENDER
      Columns HEALTHCARE_EXPENSES and SPECIALITY
      Columns HEALTHCARE_EXPENSES and ADDRESS
      Columns HEALTHCARE_EXPENSES and CITY
      Columns HEALTHCARE_EXPENSES and STATE
      Columns HEALTHCARE_EXPENSES and ZIP
      Columns HEALTHCARE_EXPENSES and LAT
      Columns HEALTHCARE_EXPENSES and LON
      Columns HEALTHCARE_EXPENSES and UTILIZATION
      Columns HEALTHCARE_COVERAGE and Id
      Columns HEALTHCARE_COVERAGE and ORGANIZATION
      Columns HEALTHCARE_COVERAGE and NAME
      Columns HEALTHCARE_COVERAGE and GENDER
      Columns HEALTHCARE_COVERAGE and SPECIALITY
      Columns HEALTHCARE_COVERAGE and ADDRESS
      Columns HEALTHCARE_COVERAGE and CITY
      Columns HEALTHCARE_COVERAGE and STATE
      Columns HEALTHCARE_COVERAGE and ZIP
      Columns HEALTHCARE_COVERAGE and LAT
      Columns HEALTHCARE_COVERAGE and LON
      Columns HEALTHCARE_COVERAGE and UTILIZATION
    Searching for relationships between tables patients and encounters
      Columns Id and Id
      Columns Id and START
      Columns Id and STOP
      Columns Id and PATIENT
      Columns Id and ORGANIZATION
      Columns Id and PROVIDER
      Columns Id and PAYER
      Columns Id and ENCOUNTERCLASS
      Columns Id and CODE
      Columns Id and DESCRIPTION
      Columns Id and BASE_ENCOUNTER_COST
      Columns Id and TOTAL_CLAIM_COST
      Columns Id and PAYER_COVERAGE
      Columns Id and REASONCODE
      Columns Id and REASONDESCRIPTION
      Columns BIRTHDATE and Id
      Columns BIRTHDATE and START
      Columns BIRTHDATE and STOP
      Columns BIRTHDATE and PATIENT
      Columns BIRTHDATE and ORGANIZATION
      Columns BIRTHDATE and PROVIDER
      Columns BIRTHDATE and PAYER
      Columns BIRTHDATE and ENCOUNTERCLASS
      Columns BIRTHDATE and CODE
      Columns BIRTHDATE and DESCRIPTION
      Columns BIRTHDATE and BASE_ENCOUNTER_COST
      Columns BIRTHDATE and TOTAL_CLAIM_COST
      Columns BIRTHDATE and PAYER_COVERAGE
      Columns BIRTHDATE and REASONCODE
      Columns BIRTHDATE and REASONDESCRIPTION
      Columns DEATHDATE and Id
      Columns DEATHDATE and START
      Columns DEATHDATE and STOP
      Columns DEATHDATE and PATIENT
      Columns DEATHDATE and ORGANIZATION
      Columns DEATHDATE and PROVIDER
      Columns DEATHDATE and PAYER
      Columns DEATHDATE and ENCOUNTERCLASS
      Columns DEATHDATE and CODE
      Columns DEATHDATE and DESCRIPTION
      Columns DEATHDATE and BASE_ENCOUNTER_COST
      Columns DEATHDATE and TOTAL_CLAIM_COST
      Columns DEATHDATE and PAYER_COVERAGE
      Columns DEATHDATE and REASONCODE
      Columns DEATHDATE and REASONDESCRIPTION
      Columns SSN and Id
      Columns SSN and START
      Columns SSN and STOP
      Columns SSN and PATIENT
      Columns SSN and ORGANIZATION
      Columns SSN and PROVIDER
      Columns SSN and PAYER
      Columns SSN and ENCOUNTERCLASS
      Columns SSN and CODE
      Columns SSN and DESCRIPTION
      Columns SSN and BASE_ENCOUNTER_COST
      Columns SSN and TOTAL_CLAIM_COST
      Columns SSN and PAYER_COVERAGE
      Columns SSN and REASONCODE
      Columns SSN and REASONDESCRIPTION
      Columns DRIVERS and Id
      Columns DRIVERS and START
      Columns DRIVERS and STOP
      Columns DRIVERS and PATIENT
      Columns DRIVERS and ORGANIZATION
      Columns DRIVERS and PROVIDER
      Columns DRIVERS and PAYER
      Columns DRIVERS and ENCOUNTERCLASS
      Columns DRIVERS and CODE
      Columns DRIVERS and DESCRIPTION
      Columns DRIVERS and BASE_ENCOUNTER_COST
      Columns DRIVERS and TOTAL_CLAIM_COST
      Columns DRIVERS and PAYER_COVERAGE
      Columns DRIVERS and REASONCODE
      Columns DRIVERS and REASONDESCRIPTION
      Columns PASSPORT and Id
      Columns PASSPORT and START
      Columns PASSPORT and STOP
      Columns PASSPORT and PATIENT
      Columns PASSPORT and ORGANIZATION
      Columns PASSPORT and PROVIDER
      Columns PASSPORT and PAYER
      Columns PASSPORT and ENCOUNTERCLASS
      Columns PASSPORT and CODE
      Columns PASSPORT and DESCRIPTION
      Columns PASSPORT and BASE_ENCOUNTER_COST
      Columns PASSPORT and TOTAL_CLAIM_COST
      Columns PASSPORT and PAYER_COVERAGE
      Columns PASSPORT and REASONCODE
      Columns PASSPORT and REASONDESCRIPTION
      Columns PREFIX and Id
      Columns PREFIX and START
      Columns PREFIX and STOP
      Columns PREFIX and PATIENT
      Columns PREFIX and ORGANIZATION
      Columns PREFIX and PROVIDER
      Columns PREFIX and PAYER
      Columns PREFIX and ENCOUNTERCLASS
      Columns PREFIX and CODE
      Columns PREFIX and DESCRIPTION
      Columns PREFIX and BASE_ENCOUNTER_COST
      Columns PREFIX and TOTAL_CLAIM_COST
      Columns PREFIX and PAYER_COVERAGE
      Columns PREFIX and REASONCODE
      Columns PREFIX and REASONDESCRIPTION
      Columns FIRST and Id
      Columns FIRST and START
      Columns FIRST and STOP
      Columns FIRST and PATIENT
      Columns FIRST and ORGANIZATION
      Columns FIRST and PROVIDER
      Columns FIRST and PAYER
      Columns FIRST and ENCOUNTERCLASS
      Columns FIRST and CODE
      Columns FIRST and DESCRIPTION
      Columns FIRST and BASE_ENCOUNTER_COST
      Columns FIRST and TOTAL_CLAIM_COST
      Columns FIRST and PAYER_COVERAGE
      Columns FIRST and REASONCODE
      Columns FIRST and REASONDESCRIPTION
      Columns LAST and Id
      Columns LAST and START
      Columns LAST and STOP
      Columns LAST and PATIENT
      Columns LAST and ORGANIZATION
      Columns LAST and PROVIDER
      Columns LAST and PAYER
      Columns LAST and ENCOUNTERCLASS
      Columns LAST and CODE
      Columns LAST and DESCRIPTION
      Columns LAST and BASE_ENCOUNTER_COST
      Columns LAST and TOTAL_CLAIM_COST
      Columns LAST and PAYER_COVERAGE
      Columns LAST and REASONCODE
      Columns LAST and REASONDESCRIPTION
      Columns SUFFIX and Id
      Columns SUFFIX and START
      Columns SUFFIX and STOP
      Columns SUFFIX and PATIENT
      Columns SUFFIX and ORGANIZATION
      Columns SUFFIX and PROVIDER
      Columns SUFFIX and PAYER
      Columns SUFFIX and ENCOUNTERCLASS
      Columns SUFFIX and CODE
      Columns SUFFIX and DESCRIPTION
      Columns SUFFIX and BASE_ENCOUNTER_COST
      Columns SUFFIX and TOTAL_CLAIM_COST
      Columns SUFFIX and PAYER_COVERAGE
      Columns SUFFIX and REASONCODE
      Columns SUFFIX and REASONDESCRIPTION
      Columns MAIDEN and Id
      Columns MAIDEN and START
      Columns MAIDEN and STOP
      Columns MAIDEN and PATIENT
      Columns MAIDEN and ORGANIZATION
      Columns MAIDEN and PROVIDER
      Columns MAIDEN and PAYER
      Columns MAIDEN and ENCOUNTERCLASS
      Columns MAIDEN and CODE
      Columns MAIDEN and DESCRIPTION
      Columns MAIDEN and BASE_ENCOUNTER_COST
      Columns MAIDEN and TOTAL_CLAIM_COST
      Columns MAIDEN and PAYER_COVERAGE
      Columns MAIDEN and REASONCODE
      Columns MAIDEN and REASONDESCRIPTION
      Columns MARITAL and Id
      Columns MARITAL and START
      Columns MARITAL and STOP
      Columns MARITAL and PATIENT
      Columns MARITAL and ORGANIZATION
      Columns MARITAL and PROVIDER
      Columns MARITAL and PAYER
      Columns MARITAL and ENCOUNTERCLASS
      Columns MARITAL and CODE
      Columns MARITAL and DESCRIPTION
      Columns MARITAL and BASE_ENCOUNTER_COST
      Columns MARITAL and TOTAL_CLAIM_COST
      Columns MARITAL and PAYER_COVERAGE
      Columns MARITAL and REASONCODE
      Columns MARITAL and REASONDESCRIPTION
      Columns RACE and Id
      Columns RACE and START
      Columns RACE and STOP
      Columns RACE and PATIENT
      Columns RACE and ORGANIZATION
      Columns RACE and PROVIDER
      Columns RACE and PAYER
      Columns RACE and ENCOUNTERCLASS
      Columns RACE and CODE
      Columns RACE and DESCRIPTION
      Columns RACE and BASE_ENCOUNTER_COST
      Columns RACE and TOTAL_CLAIM_COST
      Columns RACE and PAYER_COVERAGE
      Columns RACE and REASONCODE
      Columns RACE and REASONDESCRIPTION
      Columns ETHNICITY and Id
      Columns ETHNICITY and START
      Columns ETHNICITY and STOP
      Columns ETHNICITY and PATIENT
      Columns ETHNICITY and ORGANIZATION
      Columns ETHNICITY and PROVIDER
      Columns ETHNICITY and PAYER
      Columns ETHNICITY and ENCOUNTERCLASS
      Columns ETHNICITY and CODE
      Columns ETHNICITY and DESCRIPTION
      Columns ETHNICITY and BASE_ENCOUNTER_COST
      Columns ETHNICITY and TOTAL_CLAIM_COST
      Columns ETHNICITY and PAYER_COVERAGE
      Columns ETHNICITY and REASONCODE
      Columns ETHNICITY and REASONDESCRIPTION
      Columns GENDER and Id
      Columns GENDER and START
      Columns GENDER and STOP
      Columns GENDER and PATIENT
      Columns GENDER and ORGANIZATION
      Columns GENDER and PROVIDER
      Columns GENDER and PAYER
      Columns GENDER and ENCOUNTERCLASS
      Columns GENDER and CODE
      Columns GENDER and DESCRIPTION
      Columns GENDER and BASE_ENCOUNTER_COST
      Columns GENDER and TOTAL_CLAIM_COST
      Columns GENDER and PAYER_COVERAGE
      Columns GENDER and REASONCODE
      Columns GENDER and REASONDESCRIPTION
      Columns BIRTHPLACE and Id
      Columns BIRTHPLACE and START
      Columns BIRTHPLACE and STOP
      Columns BIRTHPLACE and PATIENT
      Columns BIRTHPLACE and ORGANIZATION
      Columns BIRTHPLACE and PROVIDER
      Columns BIRTHPLACE and PAYER
      Columns BIRTHPLACE and ENCOUNTERCLASS
      Columns BIRTHPLACE and CODE
      Columns BIRTHPLACE and DESCRIPTION
      Columns BIRTHPLACE and BASE_ENCOUNTER_COST
      Columns BIRTHPLACE and TOTAL_CLAIM_COST
      Columns BIRTHPLACE and PAYER_COVERAGE
      Columns BIRTHPLACE and REASONCODE
      Columns BIRTHPLACE and REASONDESCRIPTION
      Columns ADDRESS and Id
      Columns ADDRESS and START
      Columns ADDRESS and STOP
      Columns ADDRESS and PATIENT
      Columns ADDRESS and ORGANIZATION
      Columns ADDRESS and PROVIDER
      Columns ADDRESS and PAYER
      Columns ADDRESS and ENCOUNTERCLASS
      Columns ADDRESS and CODE
      Columns ADDRESS and DESCRIPTION
      Columns ADDRESS and BASE_ENCOUNTER_COST
      Columns ADDRESS and TOTAL_CLAIM_COST
      Columns ADDRESS and PAYER_COVERAGE
      Columns ADDRESS and REASONCODE
      Columns ADDRESS and REASONDESCRIPTION
      Columns CITY and Id
      Columns CITY and START
      Columns CITY and STOP
      Columns CITY and PATIENT
      Columns CITY and ORGANIZATION
      Columns CITY and PROVIDER
      Columns CITY and PAYER
      Columns CITY and ENCOUNTERCLASS
      Columns CITY and CODE
      Columns CITY and DESCRIPTION
      Columns CITY and BASE_ENCOUNTER_COST
      Columns CITY and TOTAL_CLAIM_COST
      Columns CITY and PAYER_COVERAGE
      Columns CITY and REASONCODE
      Columns CITY and REASONDESCRIPTION
      Columns STATE and Id
      Columns STATE and START
      Columns STATE and STOP
      Columns STATE and PATIENT
      Columns STATE and ORGANIZATION
      Columns STATE and PROVIDER
      Columns STATE and PAYER
      Columns STATE and ENCOUNTERCLASS
      Columns STATE and CODE
      Columns STATE and DESCRIPTION
      Columns STATE and BASE_ENCOUNTER_COST
      Columns STATE and TOTAL_CLAIM_COST
      Columns STATE and PAYER_COVERAGE
      Columns STATE and REASONCODE
      Columns STATE and REASONDESCRIPTION
      Columns COUNTY and Id
      Columns COUNTY and START
      Columns COUNTY and STOP
      Columns COUNTY and PATIENT
      Columns COUNTY and ORGANIZATION
      Columns COUNTY and PROVIDER
      Columns COUNTY and PAYER
      Columns COUNTY and ENCOUNTERCLASS
      Columns COUNTY and CODE
      Columns COUNTY and DESCRIPTION
      Columns COUNTY and BASE_ENCOUNTER_COST
      Columns COUNTY and TOTAL_CLAIM_COST
      Columns COUNTY and PAYER_COVERAGE
      Columns COUNTY and REASONCODE
      Columns COUNTY and REASONDESCRIPTION
      Columns ZIP and Id
      Columns ZIP and START
      Columns ZIP and STOP
      Columns ZIP and PATIENT
      Columns ZIP and ORGANIZATION
      Columns ZIP and PROVIDER
      Columns ZIP and PAYER
      Columns ZIP and ENCOUNTERCLASS
      Columns ZIP and CODE
      Columns ZIP and DESCRIPTION
      Columns ZIP and BASE_ENCOUNTER_COST
      Columns ZIP and TOTAL_CLAIM_COST
      Columns ZIP and PAYER_COVERAGE
      Columns ZIP and REASONCODE
      Columns ZIP and REASONDESCRIPTION
      Columns LAT and Id
      Columns LAT and START
      Columns LAT and STOP
      Columns LAT and PATIENT
      Columns LAT and ORGANIZATION
      Columns LAT and PROVIDER
      Columns LAT and PAYER
      Columns LAT and ENCOUNTERCLASS
      Columns LAT and CODE
      Columns LAT and DESCRIPTION
      Columns LAT and BASE_ENCOUNTER_COST
      Columns LAT and TOTAL_CLAIM_COST
      Columns LAT and PAYER_COVERAGE
      Columns LAT and REASONCODE
      Columns LAT and REASONDESCRIPTION
      Columns LON and Id
      Columns LON and START
      Columns LON and STOP
      Columns LON and PATIENT
      Columns LON and ORGANIZATION
      Columns LON and PROVIDER
      Columns LON and PAYER
      Columns LON and ENCOUNTERCLASS
      Columns LON and CODE
      Columns LON and DESCRIPTION
      Columns LON and BASE_ENCOUNTER_COST
      Columns LON and TOTAL_CLAIM_COST
      Columns LON and PAYER_COVERAGE
      Columns LON and REASONCODE
      Columns LON and REASONDESCRIPTION
      Columns HEALTHCARE_EXPENSES and Id
      Columns HEALTHCARE_EXPENSES and START
      Columns HEALTHCARE_EXPENSES and STOP
      Columns HEALTHCARE_EXPENSES and PATIENT
      Columns HEALTHCARE_EXPENSES and ORGANIZATION
      Columns HEALTHCARE_EXPENSES and PROVIDER
      Columns HEALTHCARE_EXPENSES and PAYER
      Columns HEALTHCARE_EXPENSES and ENCOUNTERCLASS
      Columns HEALTHCARE_EXPENSES and CODE
      Columns HEALTHCARE_EXPENSES and DESCRIPTION
      Columns HEALTHCARE_EXPENSES and BASE_ENCOUNTER_COST
      Columns HEALTHCARE_EXPENSES and TOTAL_CLAIM_COST
      Columns HEALTHCARE_EXPENSES and PAYER_COVERAGE
      Columns HEALTHCARE_EXPENSES and REASONCODE
      Columns HEALTHCARE_EXPENSES and REASONDESCRIPTION
      Columns HEALTHCARE_COVERAGE and Id
      Columns HEALTHCARE_COVERAGE and START
      Columns HEALTHCARE_COVERAGE and STOP
      Columns HEALTHCARE_COVERAGE and PATIENT
      Columns HEALTHCARE_COVERAGE and ORGANIZATION
      Columns HEALTHCARE_COVERAGE and PROVIDER
      Columns HEALTHCARE_COVERAGE and PAYER
      Columns HEALTHCARE_COVERAGE and ENCOUNTERCLASS
      Columns HEALTHCARE_COVERAGE and CODE
      Columns HEALTHCARE_COVERAGE and DESCRIPTION
      Columns HEALTHCARE_COVERAGE and BASE_ENCOUNTER_COST
      Columns HEALTHCARE_COVERAGE and TOTAL_CLAIM_COST
      Columns HEALTHCARE_COVERAGE and PAYER_COVERAGE
      Columns HEALTHCARE_COVERAGE and REASONCODE
      Columns HEALTHCARE_COVERAGE and REASONDESCRIPTION
    Searching for relationships between tables providers and encounters
      Columns Id and Id
      Columns Id and START
      Columns Id and STOP
      Columns Id and PATIENT
      Columns Id and ORGANIZATION
      Columns Id and PROVIDER
      Columns Id and PAYER
      Columns Id and ENCOUNTERCLASS
      Columns Id and CODE
      Columns Id and DESCRIPTION
      Columns Id and BASE_ENCOUNTER_COST
      Columns Id and TOTAL_CLAIM_COST
      Columns Id and PAYER_COVERAGE
      Columns Id and REASONCODE
      Columns Id and REASONDESCRIPTION
      Columns ORGANIZATION and Id
      Columns ORGANIZATION and START
      Columns ORGANIZATION and STOP
      Columns ORGANIZATION and PATIENT
      Columns ORGANIZATION and ORGANIZATION
      Columns ORGANIZATION and PROVIDER
      Columns ORGANIZATION and PAYER
      Columns ORGANIZATION and ENCOUNTERCLASS
      Columns ORGANIZATION and CODE
      Columns ORGANIZATION and DESCRIPTION
      Columns ORGANIZATION and BASE_ENCOUNTER_COST
      Columns ORGANIZATION and TOTAL_CLAIM_COST
      Columns ORGANIZATION and PAYER_COVERAGE
      Columns ORGANIZATION and REASONCODE
      Columns ORGANIZATION and REASONDESCRIPTION
      Columns NAME and Id
      Columns NAME and START
      Columns NAME and STOP
      Columns NAME and PATIENT
      Columns NAME and ORGANIZATION
      Columns NAME and PROVIDER
      Columns NAME and PAYER
      Columns NAME and ENCOUNTERCLASS
      Columns NAME and CODE
      Columns NAME and DESCRIPTION
      Columns NAME and BASE_ENCOUNTER_COST
      Columns NAME and TOTAL_CLAIM_COST
      Columns NAME and PAYER_COVERAGE
      Columns NAME and REASONCODE
      Columns NAME and REASONDESCRIPTION
      Columns GENDER and Id
      Columns GENDER and START
      Columns GENDER and STOP
      Columns GENDER and PATIENT
      Columns GENDER and ORGANIZATION
      Columns GENDER and PROVIDER
      Columns GENDER and PAYER
      Columns GENDER and ENCOUNTERCLASS
      Columns GENDER and CODE
      Columns GENDER and DESCRIPTION
      Columns GENDER and BASE_ENCOUNTER_COST
      Columns GENDER and TOTAL_CLAIM_COST
      Columns GENDER and PAYER_COVERAGE
      Columns GENDER and REASONCODE
      Columns GENDER and REASONDESCRIPTION
      Columns SPECIALITY and Id
      Columns SPECIALITY and START
      Columns SPECIALITY and STOP
      Columns SPECIALITY and PATIENT
      Columns SPECIALITY and ORGANIZATION
      Columns SPECIALITY and PROVIDER
      Columns SPECIALITY and PAYER
      Columns SPECIALITY and ENCOUNTERCLASS
      Columns SPECIALITY and CODE
      Columns SPECIALITY and DESCRIPTION
      Columns SPECIALITY and BASE_ENCOUNTER_COST
      Columns SPECIALITY and TOTAL_CLAIM_COST
      Columns SPECIALITY and PAYER_COVERAGE
      Columns SPECIALITY and REASONCODE
      Columns SPECIALITY and REASONDESCRIPTION
      Columns ADDRESS and Id
      Columns ADDRESS and START
      Columns ADDRESS and STOP
      Columns ADDRESS and PATIENT
      Columns ADDRESS and ORGANIZATION
      Columns ADDRESS and PROVIDER
      Columns ADDRESS and PAYER
      Columns ADDRESS and ENCOUNTERCLASS
      Columns ADDRESS and CODE
      Columns ADDRESS and DESCRIPTION
      Columns ADDRESS and BASE_ENCOUNTER_COST
      Columns ADDRESS and TOTAL_CLAIM_COST
      Columns ADDRESS and PAYER_COVERAGE
      Columns ADDRESS and REASONCODE
      Columns ADDRESS and REASONDESCRIPTION
      Columns CITY and Id
      Columns CITY and START
      Columns CITY and STOP
      Columns CITY and PATIENT
      Columns CITY and ORGANIZATION
      Columns CITY and PROVIDER
      Columns CITY and PAYER
      Columns CITY and ENCOUNTERCLASS
      Columns CITY and CODE
      Columns CITY and DESCRIPTION
      Columns CITY and BASE_ENCOUNTER_COST
      Columns CITY and TOTAL_CLAIM_COST
      Columns CITY and PAYER_COVERAGE
      Columns CITY and REASONCODE
      Columns CITY and REASONDESCRIPTION
      Columns STATE and Id
      Columns STATE and START
      Columns STATE and STOP
      Columns STATE and PATIENT
      Columns STATE and ORGANIZATION
      Columns STATE and PROVIDER
      Columns STATE and PAYER
      Columns STATE and ENCOUNTERCLASS
      Columns STATE and CODE
      Columns STATE and DESCRIPTION
      Columns STATE and BASE_ENCOUNTER_COST
      Columns STATE and TOTAL_CLAIM_COST
      Columns STATE and PAYER_COVERAGE
      Columns STATE and REASONCODE
      Columns STATE and REASONDESCRIPTION
      Columns ZIP and Id
      Columns ZIP and START
      Columns ZIP and STOP
      Columns ZIP and PATIENT
      Columns ZIP and ORGANIZATION
      Columns ZIP and PROVIDER
      Columns ZIP and PAYER
      Columns ZIP and ENCOUNTERCLASS
      Columns ZIP and CODE
      Columns ZIP and DESCRIPTION
      Columns ZIP and BASE_ENCOUNTER_COST
      Columns ZIP and TOTAL_CLAIM_COST
      Columns ZIP and PAYER_COVERAGE
      Columns ZIP and REASONCODE
      Columns ZIP and REASONDESCRIPTION
      Columns LAT and Id
      Columns LAT and START
      Columns LAT and STOP
      Columns LAT and PATIENT
      Columns LAT and ORGANIZATION
      Columns LAT and PROVIDER
      Columns LAT and PAYER
      Columns LAT and ENCOUNTERCLASS
      Columns LAT and CODE
      Columns LAT and DESCRIPTION
      Columns LAT and BASE_ENCOUNTER_COST
      Columns LAT and TOTAL_CLAIM_COST
      Columns LAT and PAYER_COVERAGE
      Columns LAT and REASONCODE
      Columns LAT and REASONDESCRIPTION
      Columns LON and Id
      Columns LON and START
      Columns LON and STOP
      Columns LON and PATIENT
      Columns LON and ORGANIZATION
      Columns LON and PROVIDER
      Columns LON and PAYER
      Columns LON and ENCOUNTERCLASS
      Columns LON and CODE
      Columns LON and DESCRIPTION
      Columns LON and BASE_ENCOUNTER_COST
      Columns LON and TOTAL_CLAIM_COST
      Columns LON and PAYER_COVERAGE
      Columns LON and REASONCODE
      Columns LON and REASONDESCRIPTION
      Columns UTILIZATION and Id
      Columns UTILIZATION and START
      Columns UTILIZATION and STOP
      Columns UTILIZATION and PATIENT
      Columns UTILIZATION and ORGANIZATION
      Columns UTILIZATION and PROVIDER
      Columns UTILIZATION and PAYER
      Columns UTILIZATION and ENCOUNTERCLASS
      Columns UTILIZATION and CODE
      Columns UTILIZATION and DESCRIPTION
      Columns UTILIZATION and BASE_ENCOUNTER_COST
      Columns UTILIZATION and TOTAL_CLAIM_COST
      Columns UTILIZATION and PAYER_COVERAGE
      Columns UTILIZATION and REASONCODE
      Columns UTILIZATION and REASONDESCRIPTION
    No relationships found
    

### Summary of troubleshooting tips

1. Start from exact match for "m:1" relationships (that is, the default `include_many_to_many=False` and `coverage_threshold=1.0`). This is usually what you want. 
2. Use a narrow focus on smaller subsets of tables.
3. Use validation to detect data quality issues.
4. Use `verbose=2` if you want to understand which columns are considered for relationship. This can result in a large amount of output.
5. Be aware of trade-offs of search arguments. `include_many_to_many=True` and `coverage_threshold<1.0` may produce spurious relationships that may be harder to analyze and will need to be filtered.

## Detect relationships on the full _Synthea_ dataset

The simple baseline example was a convenient learning and troubleshooting tool. In practice you may start from a dataset such as the full _Synthea_ dataset, which has a lot more tables. Explore the full _synthea_ dataset as follows. 

First, read all files from the _synthea/csv_ directory:


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


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 25, Finished, Available)


Find relationships between the tables, using  SemPy's ``find_relationships`` function:


```python
suggested_relationships = find_relationships(all_tables)
suggested_relationships
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 26, Finished, Available)





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
      <td>allergies</td>
      <td>ENCOUNTER</td>
      <td>encounters</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.002643</td>
      <td>0</td>
      <td>0</td>
      <td>141</td>
      <td>53346</td>
      <td>597</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>1</th>
      <td>m:1</td>
      <td>allergies</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.120410</td>
      <td>0</td>
      <td>0</td>
      <td>141</td>
      <td>1171</td>
      <td>597</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>2</th>
      <td>m:1</td>
      <td>careplans</td>
      <td>ENCOUNTER</td>
      <td>encounters</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.065085</td>
      <td>0</td>
      <td>0</td>
      <td>3472</td>
      <td>53346</td>
      <td>3483</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>3</th>
      <td>m:1</td>
      <td>careplans</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.900085</td>
      <td>0</td>
      <td>0</td>
      <td>1054</td>
      <td>1171</td>
      <td>3483</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>4</th>
      <td>m:1</td>
      <td>conditions</td>
      <td>ENCOUNTER</td>
      <td>encounters</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.143403</td>
      <td>0</td>
      <td>0</td>
      <td>7650</td>
      <td>53346</td>
      <td>8376</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>5</th>
      <td>m:1</td>
      <td>conditions</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.983775</td>
      <td>0</td>
      <td>0</td>
      <td>1152</td>
      <td>1171</td>
      <td>8376</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1:1</td>
      <td>devices</td>
      <td>ENCOUNTER</td>
      <td>encounters</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.001462</td>
      <td>0</td>
      <td>0</td>
      <td>78</td>
      <td>53346</td>
      <td>78</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>7</th>
      <td>m:1</td>
      <td>devices</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.063194</td>
      <td>0</td>
      <td>0</td>
      <td>74</td>
      <td>1171</td>
      <td>78</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>8</th>
      <td>m:1</td>
      <td>imaging_studies</td>
      <td>ENCOUNTER</td>
      <td>encounters</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.014884</td>
      <td>0</td>
      <td>0</td>
      <td>794</td>
      <td>53346</td>
      <td>855</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>9</th>
      <td>m:1</td>
      <td>immunizations</td>
      <td>ENCOUNTER</td>
      <td>encounters</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.194354</td>
      <td>0</td>
      <td>0</td>
      <td>10368</td>
      <td>53346</td>
      <td>15478</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>10</th>
      <td>m:1</td>
      <td>medications</td>
      <td>ENCOUNTER</td>
      <td>encounters</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.511172</td>
      <td>0</td>
      <td>0</td>
      <td>27269</td>
      <td>53346</td>
      <td>42989</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>11</th>
      <td>m:1</td>
      <td>observations</td>
      <td>ENCOUNTER</td>
      <td>encounters</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.375473</td>
      <td>30363</td>
      <td>0</td>
      <td>20030</td>
      <td>53346</td>
      <td>299697</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>12</th>
      <td>m:1</td>
      <td>encounters</td>
      <td>ORGANIZATION</td>
      <td>organizations</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.985702</td>
      <td>0</td>
      <td>0</td>
      <td>1103</td>
      <td>1119</td>
      <td>53346</td>
      <td>1119</td>
    </tr>
    <tr>
      <th>13</th>
      <td>m:1</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1171</td>
      <td>1171</td>
      <td>53346</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>14</th>
      <td>m:1</td>
      <td>encounters</td>
      <td>PAYER</td>
      <td>payers</td>
      <td>Id</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>10</td>
      <td>53346</td>
      <td>10</td>
    </tr>
    <tr>
      <th>15</th>
      <td>m:1</td>
      <td>procedures</td>
      <td>ENCOUNTER</td>
      <td>encounters</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.395006</td>
      <td>0</td>
      <td>0</td>
      <td>21072</td>
      <td>53346</td>
      <td>34981</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>16</th>
      <td>m:1</td>
      <td>encounters</td>
      <td>PROVIDER</td>
      <td>providers</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.188557</td>
      <td>0</td>
      <td>0</td>
      <td>1104</td>
      <td>5855</td>
      <td>53346</td>
      <td>5855</td>
    </tr>
    <tr>
      <th>17</th>
      <td>m:1</td>
      <td>imaging_studies</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.210931</td>
      <td>0</td>
      <td>0</td>
      <td>247</td>
      <td>1171</td>
      <td>855</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>18</th>
      <td>m:1</td>
      <td>immunizations</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.998292</td>
      <td>0</td>
      <td>0</td>
      <td>1169</td>
      <td>1171</td>
      <td>15478</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>19</th>
      <td>m:1</td>
      <td>medications</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.945346</td>
      <td>0</td>
      <td>0</td>
      <td>1107</td>
      <td>1171</td>
      <td>42989</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>20</th>
      <td>m:1</td>
      <td>medications</td>
      <td>PAYER</td>
      <td>payers</td>
      <td>Id</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>10</td>
      <td>42989</td>
      <td>10</td>
    </tr>
    <tr>
      <th>21</th>
      <td>m:1</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1171</td>
      <td>1171</td>
      <td>299697</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>22</th>
      <td>m:1</td>
      <td>providers</td>
      <td>ORGANIZATION</td>
      <td>organizations</td>
      <td>Id</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1119</td>
      <td>1119</td>
      <td>5855</td>
      <td>1119</td>
    </tr>
    <tr>
      <th>23</th>
      <td>m:1</td>
      <td>payer_transitions</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.839453</td>
      <td>0</td>
      <td>0</td>
      <td>983</td>
      <td>1171</td>
      <td>3801</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>24</th>
      <td>m:1</td>
      <td>procedures</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.994876</td>
      <td>0</td>
      <td>0</td>
      <td>1165</td>
      <td>1171</td>
      <td>34981</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>25</th>
      <td>m:1</td>
      <td>payer_transitions</td>
      <td>PAYER</td>
      <td>payers</td>
      <td>Id</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>10</td>
      <td>3801</td>
      <td>10</td>
    </tr>
  </tbody>
</table>
</div>



Visualize relationships:


```python
plot_relationship_metadata(suggested_relationships)
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 27, Finished, Available)





    
![svg](temp_files/temp_50_1.svg)
    



Count how many new "m:m" relationships will be discovered with `include_many_to_many=True`. These relationships will be in addition to the previously shown "m:1" relationships; therefore, you'll have to filter on `multiplicity`:


```python
suggested_relationships = find_relationships(all_tables, coverage_threshold=1.0, include_many_to_many=True) 
suggested_relationships[suggested_relationships['Multiplicity']=='m:m']
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 28, Finished, Available)





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
      <td>m:m</td>
      <td>allergies</td>
      <td>PATIENT</td>
      <td>careplans</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.133776</td>
      <td>0</td>
      <td>0</td>
      <td>141</td>
      <td>1054</td>
      <td>597</td>
      <td>3483</td>
    </tr>
    <tr>
      <th>1</th>
      <td>m:m</td>
      <td>allergies</td>
      <td>PATIENT</td>
      <td>conditions</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.122396</td>
      <td>0</td>
      <td>0</td>
      <td>141</td>
      <td>1152</td>
      <td>597</td>
      <td>8376</td>
    </tr>
    <tr>
      <th>2</th>
      <td>m:m</td>
      <td>allergies</td>
      <td>PATIENT</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.120410</td>
      <td>0</td>
      <td>0</td>
      <td>141</td>
      <td>1171</td>
      <td>597</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>4</th>
      <td>m:m</td>
      <td>allergies</td>
      <td>PATIENT</td>
      <td>immunizations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.120616</td>
      <td>0</td>
      <td>0</td>
      <td>141</td>
      <td>1169</td>
      <td>597</td>
      <td>15478</td>
    </tr>
    <tr>
      <th>5</th>
      <td>m:m</td>
      <td>allergies</td>
      <td>PATIENT</td>
      <td>medications</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.127371</td>
      <td>0</td>
      <td>0</td>
      <td>141</td>
      <td>1107</td>
      <td>597</td>
      <td>42989</td>
    </tr>
    <tr>
      <th>6</th>
      <td>m:m</td>
      <td>allergies</td>
      <td>PATIENT</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.120410</td>
      <td>0</td>
      <td>0</td>
      <td>141</td>
      <td>1171</td>
      <td>597</td>
      <td>299697</td>
    </tr>
    <tr>
      <th>8</th>
      <td>m:m</td>
      <td>careplans</td>
      <td>PATIENT</td>
      <td>conditions</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.914931</td>
      <td>0</td>
      <td>0</td>
      <td>1054</td>
      <td>1152</td>
      <td>3483</td>
      <td>8376</td>
    </tr>
    <tr>
      <th>9</th>
      <td>m:m</td>
      <td>careplans</td>
      <td>PATIENT</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.900085</td>
      <td>0</td>
      <td>0</td>
      <td>1054</td>
      <td>1171</td>
      <td>3483</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>11</th>
      <td>m:m</td>
      <td>imaging_studies</td>
      <td>PATIENT</td>
      <td>careplans</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.234345</td>
      <td>0</td>
      <td>0</td>
      <td>247</td>
      <td>1054</td>
      <td>855</td>
      <td>3483</td>
    </tr>
    <tr>
      <th>12</th>
      <td>m:m</td>
      <td>careplans</td>
      <td>PATIENT</td>
      <td>immunizations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.901625</td>
      <td>0</td>
      <td>0</td>
      <td>1054</td>
      <td>1169</td>
      <td>3483</td>
      <td>15478</td>
    </tr>
    <tr>
      <th>13</th>
      <td>m:m</td>
      <td>careplans</td>
      <td>PATIENT</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.900085</td>
      <td>0</td>
      <td>0</td>
      <td>1054</td>
      <td>1171</td>
      <td>3483</td>
      <td>299697</td>
    </tr>
    <tr>
      <th>15</th>
      <td>m:m</td>
      <td>devices</td>
      <td>PATIENT</td>
      <td>conditions</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.064236</td>
      <td>0</td>
      <td>0</td>
      <td>74</td>
      <td>1152</td>
      <td>78</td>
      <td>8376</td>
    </tr>
    <tr>
      <th>16</th>
      <td>m:m</td>
      <td>conditions</td>
      <td>PATIENT</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.983775</td>
      <td>0</td>
      <td>0</td>
      <td>1152</td>
      <td>1171</td>
      <td>8376</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>18</th>
      <td>m:m</td>
      <td>imaging_studies</td>
      <td>PATIENT</td>
      <td>conditions</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.214410</td>
      <td>0</td>
      <td>0</td>
      <td>247</td>
      <td>1152</td>
      <td>855</td>
      <td>8376</td>
    </tr>
    <tr>
      <th>19</th>
      <td>m:m</td>
      <td>conditions</td>
      <td>PATIENT</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.983775</td>
      <td>0</td>
      <td>0</td>
      <td>1152</td>
      <td>1171</td>
      <td>8376</td>
      <td>299697</td>
    </tr>
    <tr>
      <th>21</th>
      <td>m:m</td>
      <td>devices</td>
      <td>PATIENT</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.063194</td>
      <td>0</td>
      <td>0</td>
      <td>74</td>
      <td>1171</td>
      <td>78</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>23</th>
      <td>m:m</td>
      <td>devices</td>
      <td>PATIENT</td>
      <td>immunizations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.063302</td>
      <td>0</td>
      <td>0</td>
      <td>74</td>
      <td>1169</td>
      <td>78</td>
      <td>15478</td>
    </tr>
    <tr>
      <th>24</th>
      <td>m:m</td>
      <td>devices</td>
      <td>PATIENT</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.063194</td>
      <td>0</td>
      <td>0</td>
      <td>74</td>
      <td>1171</td>
      <td>78</td>
      <td>299697</td>
    </tr>
    <tr>
      <th>26</th>
      <td>m:m</td>
      <td>devices</td>
      <td>PATIENT</td>
      <td>procedures</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.063519</td>
      <td>0</td>
      <td>0</td>
      <td>74</td>
      <td>1165</td>
      <td>78</td>
      <td>34981</td>
    </tr>
    <tr>
      <th>28</th>
      <td>m:m</td>
      <td>imaging_studies</td>
      <td>PATIENT</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.210931</td>
      <td>0</td>
      <td>0</td>
      <td>247</td>
      <td>1171</td>
      <td>855</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>30</th>
      <td>m:m</td>
      <td>immunizations</td>
      <td>PATIENT</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.998292</td>
      <td>0</td>
      <td>0</td>
      <td>1169</td>
      <td>1171</td>
      <td>15478</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>32</th>
      <td>m:m</td>
      <td>medications</td>
      <td>PATIENT</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.945346</td>
      <td>0</td>
      <td>0</td>
      <td>1107</td>
      <td>1171</td>
      <td>42989</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>33</th>
      <td>m:m</td>
      <td>medications</td>
      <td>PAYER</td>
      <td>encounters</td>
      <td>PAYER</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>10</td>
      <td>42989</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>34</th>
      <td>m:m</td>
      <td>encounters</td>
      <td>PAYER</td>
      <td>medications</td>
      <td>PAYER</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>10</td>
      <td>53346</td>
      <td>42989</td>
    </tr>
    <tr>
      <th>36</th>
      <td>m:m</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1171</td>
      <td>1171</td>
      <td>299697</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>37</th>
      <td>m:m</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1171</td>
      <td>1171</td>
      <td>53346</td>
      <td>299697</td>
    </tr>
    <tr>
      <th>40</th>
      <td>m:m</td>
      <td>payer_transitions</td>
      <td>PATIENT</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.839453</td>
      <td>0</td>
      <td>0</td>
      <td>983</td>
      <td>1171</td>
      <td>3801</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>41</th>
      <td>m:m</td>
      <td>payer_transitions</td>
      <td>PAYER</td>
      <td>encounters</td>
      <td>PAYER</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>10</td>
      <td>3801</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>42</th>
      <td>m:m</td>
      <td>encounters</td>
      <td>PAYER</td>
      <td>payer_transitions</td>
      <td>PAYER</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>10</td>
      <td>53346</td>
      <td>3801</td>
    </tr>
    <tr>
      <th>45</th>
      <td>m:m</td>
      <td>procedures</td>
      <td>PATIENT</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.994876</td>
      <td>0</td>
      <td>0</td>
      <td>1165</td>
      <td>1171</td>
      <td>34981</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>46</th>
      <td>m:m</td>
      <td>encounters</td>
      <td>ORGANIZATION</td>
      <td>providers</td>
      <td>ORGANIZATION</td>
      <td>1.0</td>
      <td>0.985702</td>
      <td>0</td>
      <td>0</td>
      <td>1103</td>
      <td>1119</td>
      <td>53346</td>
      <td>5855</td>
    </tr>
    <tr>
      <th>48</th>
      <td>m:m</td>
      <td>imaging_studies</td>
      <td>PATIENT</td>
      <td>immunizations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.211292</td>
      <td>0</td>
      <td>0</td>
      <td>247</td>
      <td>1169</td>
      <td>855</td>
      <td>15478</td>
    </tr>
    <tr>
      <th>49</th>
      <td>m:m</td>
      <td>imaging_studies</td>
      <td>PATIENT</td>
      <td>medications</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.223126</td>
      <td>0</td>
      <td>0</td>
      <td>247</td>
      <td>1107</td>
      <td>855</td>
      <td>42989</td>
    </tr>
    <tr>
      <th>50</th>
      <td>m:m</td>
      <td>imaging_studies</td>
      <td>PATIENT</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.210931</td>
      <td>0</td>
      <td>0</td>
      <td>247</td>
      <td>1171</td>
      <td>855</td>
      <td>299697</td>
    </tr>
    <tr>
      <th>52</th>
      <td>m:m</td>
      <td>imaging_studies</td>
      <td>PATIENT</td>
      <td>procedures</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.212017</td>
      <td>0</td>
      <td>0</td>
      <td>247</td>
      <td>1165</td>
      <td>855</td>
      <td>34981</td>
    </tr>
    <tr>
      <th>53</th>
      <td>m:m</td>
      <td>immunizations</td>
      <td>PATIENT</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.998292</td>
      <td>0</td>
      <td>0</td>
      <td>1169</td>
      <td>1171</td>
      <td>15478</td>
      <td>299697</td>
    </tr>
    <tr>
      <th>55</th>
      <td>m:m</td>
      <td>medications</td>
      <td>PATIENT</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.945346</td>
      <td>0</td>
      <td>0</td>
      <td>1107</td>
      <td>1171</td>
      <td>42989</td>
      <td>299697</td>
    </tr>
    <tr>
      <th>57</th>
      <td>m:m</td>
      <td>payer_transitions</td>
      <td>PAYER</td>
      <td>medications</td>
      <td>PAYER</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>10</td>
      <td>3801</td>
      <td>42989</td>
    </tr>
    <tr>
      <th>58</th>
      <td>m:m</td>
      <td>medications</td>
      <td>PAYER</td>
      <td>payer_transitions</td>
      <td>PAYER</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>10</td>
      <td>42989</td>
      <td>3801</td>
    </tr>
    <tr>
      <th>61</th>
      <td>m:m</td>
      <td>payer_transitions</td>
      <td>PATIENT</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.839453</td>
      <td>0</td>
      <td>0</td>
      <td>983</td>
      <td>1171</td>
      <td>3801</td>
      <td>299697</td>
    </tr>
    <tr>
      <th>62</th>
      <td>m:m</td>
      <td>procedures</td>
      <td>PATIENT</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.994876</td>
      <td>0</td>
      <td>0</td>
      <td>1165</td>
      <td>1171</td>
      <td>34981</td>
      <td>299697</td>
    </tr>
    <tr>
      <th>64</th>
      <td>m:m</td>
      <td>providers</td>
      <td>ADDRESS</td>
      <td>organizations</td>
      <td>ADDRESS</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1006</td>
      <td>1006</td>
      <td>5855</td>
      <td>1119</td>
    </tr>
    <tr>
      <th>65</th>
      <td>m:m</td>
      <td>organizations</td>
      <td>ADDRESS</td>
      <td>providers</td>
      <td>ADDRESS</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1006</td>
      <td>1006</td>
      <td>1119</td>
      <td>5855</td>
    </tr>
    <tr>
      <th>66</th>
      <td>m:m</td>
      <td>providers</td>
      <td>CITY</td>
      <td>organizations</td>
      <td>CITY</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>317</td>
      <td>317</td>
      <td>5855</td>
      <td>1119</td>
    </tr>
    <tr>
      <th>67</th>
      <td>m:m</td>
      <td>organizations</td>
      <td>CITY</td>
      <td>providers</td>
      <td>CITY</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>317</td>
      <td>317</td>
      <td>1119</td>
      <td>5855</td>
    </tr>
    <tr>
      <th>68</th>
      <td>m:m</td>
      <td>providers</td>
      <td>STATE</td>
      <td>organizations</td>
      <td>STATE</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>5855</td>
      <td>1119</td>
    </tr>
    <tr>
      <th>69</th>
      <td>m:m</td>
      <td>organizations</td>
      <td>STATE</td>
      <td>providers</td>
      <td>STATE</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>1119</td>
      <td>5855</td>
    </tr>
    <tr>
      <th>70</th>
      <td>m:m</td>
      <td>providers</td>
      <td>ZIP</td>
      <td>organizations</td>
      <td>ZIP</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1003</td>
      <td>1003</td>
      <td>5855</td>
      <td>1119</td>
    </tr>
    <tr>
      <th>71</th>
      <td>m:m</td>
      <td>organizations</td>
      <td>ZIP</td>
      <td>providers</td>
      <td>ZIP</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1003</td>
      <td>1003</td>
      <td>1119</td>
      <td>5855</td>
    </tr>
    <tr>
      <th>72</th>
      <td>m:m</td>
      <td>providers</td>
      <td>LAT</td>
      <td>organizations</td>
      <td>LAT</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>343</td>
      <td>343</td>
      <td>5855</td>
      <td>1119</td>
    </tr>
    <tr>
      <th>73</th>
      <td>m:m</td>
      <td>organizations</td>
      <td>LAT</td>
      <td>providers</td>
      <td>LAT</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>343</td>
      <td>343</td>
      <td>1119</td>
      <td>5855</td>
    </tr>
    <tr>
      <th>74</th>
      <td>m:m</td>
      <td>providers</td>
      <td>LON</td>
      <td>organizations</td>
      <td>LON</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>344</td>
      <td>344</td>
      <td>5855</td>
      <td>1119</td>
    </tr>
    <tr>
      <th>75</th>
      <td>m:m</td>
      <td>organizations</td>
      <td>LON</td>
      <td>providers</td>
      <td>LON</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>344</td>
      <td>344</td>
      <td>1119</td>
      <td>5855</td>
    </tr>
    <tr>
      <th>76</th>
      <td>m:m</td>
      <td>organizations</td>
      <td>UTILIZATION</td>
      <td>providers</td>
      <td>UTILIZATION</td>
      <td>1.0</td>
      <td>0.995475</td>
      <td>0</td>
      <td>0</td>
      <td>220</td>
      <td>221</td>
      <td>1119</td>
      <td>5855</td>
    </tr>
    <tr>
      <th>79</th>
      <td>m:m</td>
      <td>providers</td>
      <td>GENDER</td>
      <td>patients</td>
      <td>GENDER</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>2</td>
      <td>2</td>
      <td>5855</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>80</th>
      <td>m:m</td>
      <td>patients</td>
      <td>GENDER</td>
      <td>providers</td>
      <td>GENDER</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>2</td>
      <td>2</td>
      <td>1171</td>
      <td>5855</td>
    </tr>
  </tbody>
</table>
</div>



You can sort the relationship data by various columns to gain a deeper understanding of their nature. For example, you could choose to order the output by `Row Count From` and `Row Count To`, which will help identify the largest tables. In a different dataset, maybe it would be important to focus on number of nulls `Null Count From` or `Coverage To`.

This analysis can help you to understand if any of the relationships could be invalid, and if you need to remove them from the list of candidates.


```python
suggested_relationships.sort_values(['Row Count From', 'Row Count To'], ascending=False)
```


    StatementMeta(, fcb3adc3-9e85-42d4-81c9-7fe10e5e00dd, 29, Finished, Available)





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
      <th>35</th>
      <td>m:1</td>
      <td>observations</td>
      <td>ENCOUNTER</td>
      <td>encounters</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.375473</td>
      <td>30363</td>
      <td>0</td>
      <td>20030</td>
      <td>53346</td>
      <td>299697</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>36</th>
      <td>m:m</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1171</td>
      <td>1171</td>
      <td>299697</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>60</th>
      <td>m:1</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1171</td>
      <td>1171</td>
      <td>299697</td>
      <td>1171</td>
    </tr>
    <tr>
      <th>37</th>
      <td>m:m</td>
      <td>encounters</td>
      <td>PATIENT</td>
      <td>observations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>1171</td>
      <td>1171</td>
      <td>53346</td>
      <td>299697</td>
    </tr>
    <tr>
      <th>34</th>
      <td>m:m</td>
      <td>encounters</td>
      <td>PAYER</td>
      <td>medications</td>
      <td>PAYER</td>
      <td>1.0</td>
      <td>1.000000</td>
      <td>0</td>
      <td>0</td>
      <td>10</td>
      <td>10</td>
      <td>53346</td>
      <td>42989</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>22</th>
      <td>1:1</td>
      <td>devices</td>
      <td>ENCOUNTER</td>
      <td>encounters</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.001462</td>
      <td>0</td>
      <td>0</td>
      <td>78</td>
      <td>53346</td>
      <td>78</td>
      <td>53346</td>
    </tr>
    <tr>
      <th>26</th>
      <td>m:m</td>
      <td>devices</td>
      <td>PATIENT</td>
      <td>procedures</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.063519</td>
      <td>0</td>
      <td>0</td>
      <td>74</td>
      <td>1165</td>
      <td>78</td>
      <td>34981</td>
    </tr>
    <tr>
      <th>23</th>
      <td>m:m</td>
      <td>devices</td>
      <td>PATIENT</td>
      <td>immunizations</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.063302</td>
      <td>0</td>
      <td>0</td>
      <td>74</td>
      <td>1169</td>
      <td>78</td>
      <td>15478</td>
    </tr>
    <tr>
      <th>15</th>
      <td>m:m</td>
      <td>devices</td>
      <td>PATIENT</td>
      <td>conditions</td>
      <td>PATIENT</td>
      <td>1.0</td>
      <td>0.064236</td>
      <td>0</td>
      <td>0</td>
      <td>74</td>
      <td>1152</td>
      <td>78</td>
      <td>8376</td>
    </tr>
    <tr>
      <th>25</th>
      <td>m:1</td>
      <td>devices</td>
      <td>PATIENT</td>
      <td>patients</td>
      <td>Id</td>
      <td>1.0</td>
      <td>0.063194</td>
      <td>0</td>
      <td>0</td>
      <td>74</td>
      <td>1171</td>
      <td>78</td>
      <td>1171</td>
    </tr>
  </tbody>
</table>
<p>82 rows × 13 columns</p>
</div>



## Related content

Check out other tutorials for Semantic Link / SemPy:
1. Clean data with functional dependencies
1. Discover relationships in a Power BI dataset using Semantic Link
1. Analyze functional dependencies in a Power BI sample dataset
1. Extract and calculate Power BI measures from a Jupyter notebook

<!-- nbend -->
