<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/data_cleaning_functional_dependencies_tutorial.ipynb -->

> [!TIP]
> Contents of _data_cleaning_functional_dependencies_tutorial.ipynb_. **[Open in GitHub](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/data_cleaning_functional_dependencies_tutorial.ipynb)**.

# Tutorial: Clean data with functional dependencies

In this tutorial, you use functional dependencies for data cleaning. A functional dependency exists when one column in a dataset is a function of another column. For example, a _zip code_ column might determine the values in a _city_ column. A functional dependency manifests itself as a one-to-many relationship between the values in two or more columns within a DataFrame. This tutorial uses the _Synthea_ dataset to show how functional relationships can help to detect data quality problems.


### In this tutorial, you learn how to:
- Apply domain knowledge to formulate hypotheses about functional dependencies in a dataset.
- Get familiarized with components of Semantic Link's Python library ([SemPy](https://learn.microsoft.com/en-us/python/api/semantic-link-sempy)) that helps to automate data quality analysis. These components include:
    - FabricDataFrame - a pandas-like structure enhanced with additional semantic information.
    - Useful functions that automate the evaluation of hypotheses about functional dependencies and that identify violations of relationships in your datasets.

### Prerequisites

* A [Microsoft Fabric subscription](https://learn.microsoft.com/fabric/enterprise/licenses). Or sign up for a free [Microsoft Fabric (Preview) trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
* Sign in to [Microsoft Fabric](https://fabric.microsoft.com/).
* Go to the Data Science experience in Microsoft Fabric.
* Select **Workspaces** from the left navigation pane to find and select your workspace. This workspace becomes your current workspace.
* Open your notebook. You have two options:
    * [Import this notebook into your workspace](https://learn.microsoft.com/en-us/fabric/data-engineering/how-to-use-notebook#import-existing-notebooks). You can import from the Data Science homepage.
    * Alternatively, you can create [a new notebook](https://learn.microsoft.com/fabric/data-engineering/how-to-use-notebook#create-notebooks) to copy/paste code into cells.
* In the Lakehouse explorer section of your notebook, add a new or existing lakehouse to your notebook. For more information on how to add a lakehouse, see [Attach a lakehouse to your notebook](https://learn.microsoft.com/en-us/fabric/data-science/tutorial-data-science-prepare-system#attach-a-lakehouse-to-the-notebooks).

## Set up the notebook

In this section, you set up a notebook environment with the necessary modules and data.

1. Install `SemPy` from PyPI, using the `%pip` in-line installation capability within the notebook:


```python
%pip install semantic-link
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, -1, Finished, Available)







    Collecting semantic-link
      Downloading semantic_link-0.3.4-py3-none-any.whl (8.2 kB)
    Collecting semantic-link-functions-holidays==0.3.4
      Downloading semantic_link_functions_holidays-0.3.4-py3-none-any.whl (4.2 kB)
    Collecting semantic-link-sempy==0.3.4
      Downloading semantic_link_sempy-0.3.4-py3-none-any.whl (2.9 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.9/2.9 MB[0m [31m73.9 MB/s[0m eta [36m0:00:00[0m00:01[0m
    [?25hCollecting semantic-link-functions-meteostat==0.3.4
      Downloading semantic_link_functions_meteostat-0.3.4-py3-none-any.whl (4.5 kB)
    Collecting semantic-link-functions-geopandas==0.3.4
      Downloading semantic_link_functions_geopandas-0.3.4-py3-none-any.whl (4.0 kB)
    Collecting semantic-link-functions-phonenumbers==0.3.4
      Downloading semantic_link_functions_phonenumbers-0.3.4-py3-none-any.whl (4.3 kB)
    Collecting semantic-link-functions-validators==0.3.4
      Downloading semantic_link_functions_validators-0.3.4-py3-none-any.whl (4.8 kB)
    Collecting geopandas
      Downloading geopandas-0.14.0-py3-none-any.whl (1.1 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m1.1/1.1 MB[0m [31m113.8 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting folium
      Downloading folium-0.14.0-py2.py3-none-any.whl (102 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m102.3/102.3 kB[0m [31m53.7 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting mapclassify
      Downloading mapclassify-2.6.0-py3-none-any.whl (40 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m40.8/40.8 kB[0m [31m18.7 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting holidays
      Downloading holidays-0.33-py3-none-any.whl (759 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m759.7/759.7 kB[0m [31m135.1 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting meteostat
      Downloading meteostat-1.6.5-py3-none-any.whl (31 kB)
    Collecting phonenumbers
      Downloading phonenumbers-8.13.21-py2.py3-none-any.whl (2.6 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.6/2.6 MB[0m [31m164.1 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting validators
      Downloading validators-0.22.0-py3-none-any.whl (26 kB)
    Collecting pythonnet==3.0.1
      Downloading pythonnet-3.0.1-py3-none-any.whl (284 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m284.5/284.5 kB[0m [31m95.2 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting clr-loader<0.3.0,>=0.2.2
      Downloading clr_loader-0.2.6-py3-none-any.whl (51 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m51.3/51.3 kB[0m [31m29.2 MB/s[0m eta [36m0:00:00[0m
    [?25hRequirement already satisfied: requests in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.28.2)
    Requirement already satisfied: jinja2>=2.9 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.1.2)
    Requirement already satisfied: numpy in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.23.5)
    Collecting branca>=0.6.0
      Downloading branca-0.6.0-py3-none-any.whl (24 kB)
    Collecting fiona>=1.8.21
      Downloading Fiona-1.9.4.post1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (16.4 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m16.4/16.4 MB[0m [31m123.0 MB/s[0m eta [36m0:00:00[0m00:01[0m00:01[0m
    [?25hRequirement already satisfied: pandas>=1.4.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.5.3)
    Requirement already satisfied: packaging in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (22.0)
    Collecting shapely>=1.8.0
      Downloading shapely-2.0.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (2.3 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.3/2.3 MB[0m [31m164.4 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting pyproj>=3.3.0
      Downloading pyproj-3.6.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (8.3 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m8.3/8.3 MB[0m [31m166.0 MB/s[0m eta [36m0:00:00[0m00:01[0m
    [?25hRequirement already satisfied: python-dateutil in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from holidays->semantic-link-functions-holidays==0.3.4->semantic-link) (2.8.2)
    Requirement already satisfied: scipy>=1.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.10.1)
    Requirement already satisfied: scikit-learn in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.2.0)
    Collecting networkx
      Downloading networkx-3.1-py3-none-any.whl (2.1 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.1/2.1 MB[0m [31m183.2 MB/s[0m eta [36m0:00:00[0m
    [?25hRequirement already satisfied: pytz in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from meteostat->semantic-link-functions-meteostat==0.3.4->semantic-link) (2022.7.1)
    Requirement already satisfied: cffi>=1.13 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from clr-loader<0.3.0,>=0.2.2->pythonnet==3.0.1->semantic-link-sempy==0.3.4->semantic-link) (1.15.1)
    Requirement already satisfied: certifi in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (2022.12.7)
    Collecting click-plugins>=1.0
      Downloading click_plugins-1.1.1-py2.py3-none-any.whl (7.5 kB)
    Requirement already satisfied: click~=8.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (8.1.3)
    Requirement already satisfied: six in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.16.0)
    Collecting cligj>=0.5
      Downloading cligj-0.7.2-py3-none-any.whl (7.1 kB)
    Requirement already satisfied: attrs>=19.2.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (22.2.0)
    Requirement already satisfied: MarkupSafe>=2.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from jinja2>=2.9->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.1.2)
    Requirement already satisfied: urllib3<1.27,>=1.21.1 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.26.14)
    Requirement already satisfied: charset-normalizer<4,>=2 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.1.1)
    Requirement already satisfied: idna<4,>=2.5 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.4)
    Requirement already satisfied: threadpoolctl>=2.0.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from scikit-learn->mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.1.0)
    Requirement already satisfied: joblib>=1.1.1 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from scikit-learn->mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.2.0)
    Requirement already satisfied: pycparser in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from cffi>=1.13->clr-loader<0.3.0,>=0.2.2->pythonnet==3.0.1->semantic-link-sempy==0.3.4->semantic-link) (2.21)
    Installing collected packages: phonenumbers, validators, shapely, pyproj, networkx, cligj, click-plugins, holidays, fiona, clr-loader, branca, pythonnet, meteostat, mapclassify, geopandas, folium, semantic-link-sempy, semantic-link-functions-validators, semantic-link-functions-phonenumbers, semantic-link-functions-meteostat, semantic-link-functions-holidays, semantic-link-functions-geopandas, semantic-link
    Successfully installed branca-0.6.0 click-plugins-1.1.1 cligj-0.7.2 clr-loader-0.2.6 fiona-1.9.4.post1 folium-0.14.0 geopandas-0.14.0 holidays-0.33 mapclassify-2.6.0 meteostat-1.6.5 networkx-3.1 phonenumbers-8.13.21 pyproj-3.6.1 pythonnet-3.0.1 semantic-link-0.3.4 semantic-link-functions-geopandas-0.3.4 semantic-link-functions-holidays-0.3.4 semantic-link-functions-meteostat-0.3.4 semantic-link-functions-phonenumbers-0.3.4 semantic-link-functions-validators-0.3.4 semantic-link-sempy-0.3.4 shapely-2.0.1 validators-0.22.0
    
    [1m[[0m[34;49mnotice[0m[1;39;49m][0m[39;49m A new release of pip is available: [0m[31;49m23.0[0m[39;49m -> [0m[32;49m23.2.1[0m
    [1m[[0m[34;49mnotice[0m[1;39;49m][0m[39;49m To update, run: [0m[32;49m/nfs4/pyenv-7d781a50-bf0b-4f7b-98cf-5b911683d4e3/bin/python -m pip install --upgrade pip[0m
    Note: you may need to restart the kernel to use updated packages.
    






    Warning: PySpark kernel has been restarted to use updated packages.
    
    

2. Perform necessary imports of modules that you'll need later:


```python
import pandas as pd
import sempy.fabric as fabric
from sempy.fabric import FabricDataFrame
from sempy.dependencies import plot_dependency_metadata
from sempy.samples import download_synthea
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 9, Finished, Available)


3. Pull the sample data. For this tutorial, you use the _Synthea_ dataset of synthetic medical records (small version for simplicity):


```python
download_synthea(which='small')
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 10, Finished, Available)





    'abfss://7c92ac6c-2f4c-43a1-b223-f418d41af35a@msit-onelake.dfs.fabric.microsoft.com/76752ff7-dec7-4feb-9a55-b4fef04e169e/Files/synthea/csv'



## Explore the data

Initialize a ``FabricDataFrame`` with the content of the _providers.csv_ file:


```python
providers = FabricDataFrame(pd.read_csv("synthea/csv/providers.csv"))
providers.head()
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 11, Finished, Available)





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
      <th>Id</th>
      <th>ORGANIZATION</th>
      <th>NAME</th>
      <th>GENDER</th>
      <th>SPECIALITY</th>
      <th>ADDRESS</th>
      <th>CITY</th>
      <th>STATE</th>
      <th>ZIP</th>
      <th>LAT</th>
      <th>LON</th>
      <th>UTILIZATION</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>3421aa75-dec7-378d-a9e0-0bc764e4cb0d</td>
      <td>ef58ea08-d883-3957-8300-150554edc8fb</td>
      <td>Tomas436 Sauer652</td>
      <td>M</td>
      <td>GENERAL PRACTICE</td>
      <td>60 HOSPITAL ROAD</td>
      <td>LEOMINSTER</td>
      <td>MA</td>
      <td>01453</td>
      <td>42.520838</td>
      <td>-71.770876</td>
      <td>1557</td>
    </tr>
    <tr>
      <th>1</th>
      <td>c9b3c857-2e24-320c-a79a-87b8a60de63c</td>
      <td>69176529-fd1f-3b3f-abce-a0a3626769eb</td>
      <td>Suzette512 Monahan736</td>
      <td>F</td>
      <td>GENERAL PRACTICE</td>
      <td>330 MOUNT AUBURN STREET</td>
      <td>CAMBRIDGE</td>
      <td>MA</td>
      <td>02138</td>
      <td>42.375967</td>
      <td>-71.118275</td>
      <td>2296</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0359f968-d1a6-30eb-b1cc-e6cc0b4d3513</td>
      <td>5e765f2b-e908-3888-9fc7-df2cb87beb58</td>
      <td>Gaynell126 Streich926</td>
      <td>F</td>
      <td>GENERAL PRACTICE</td>
      <td>211 PARK STREET</td>
      <td>ATTLEBORO</td>
      <td>MA</td>
      <td>02703</td>
      <td>41.931653</td>
      <td>-71.294503</td>
      <td>2287</td>
    </tr>
    <tr>
      <th>3</th>
      <td>446d1609-858f-3a54-8a52-0c4eacedd00e</td>
      <td>f1fbcbfb-fcfa-3bd2-b7f4-df20f1b3c3a4</td>
      <td>Patricia625 Salgado989</td>
      <td>F</td>
      <td>GENERAL PRACTICE</td>
      <td>ONE GENERAL STREET</td>
      <td>LAWRENCE</td>
      <td>MA</td>
      <td>01842</td>
      <td>42.700273</td>
      <td>-71.161357</td>
      <td>1327</td>
    </tr>
    <tr>
      <th>4</th>
      <td>e6283e46-fd81-3611-9459-0edb1c3da357</td>
      <td>e002090d-4e92-300e-b41e-7d1f21dee4c6</td>
      <td>Jeanmarie510 Beatty507</td>
      <td>F</td>
      <td>GENERAL PRACTICE</td>
      <td>1493 CAMBRIDGE STREET</td>
      <td>CAMBRIDGE</td>
      <td>MA</td>
      <td>02138</td>
      <td>42.375967</td>
      <td>-71.118275</td>
      <td>3199</td>
    </tr>
  </tbody>
</table>
</div>



Check for data quality issues with SemPy's `find_dependencies` function by plotting a graph of auto-detected functional dependencies:


```python
deps = providers.find_dependencies()
plot_dependency_metadata(deps)
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 12, Finished, Available)





    
![svg](temp_files/temp_14_1.svg)
    



The graph of functional dependencies shows that `Id` determines `NAME` and  `ORGANIZATION` (indicated by the solid arrows), which is expected, since `Id` is unique:


```python
providers.Id.is_unique
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 13, Finished, Available)





    True



## Analyze functional dependencies in depth

The functional dependencies graph also shows that `ORGANIZATION` determines `ADDRESS` and `ZIP`, as expected. However, you might expect `ZIP` to also determine `CITY`, but the dashed arrow indicates that the dependency is only approximate, pointing towards a data quality issue.

There are other peculiarities in the graph. For example, `NAME` does not determine `GENDER`, `Id`, `SPECIALITY` or `ORGANIZATION`. Each of these might be worth investigating.

Take a deeper look at the approximate relationship between `ZIP` and `CITY`, by using SemPy's `list_dependency_violations` function to see a tabular list of violations:


```python
providers.list_dependency_violations('ZIP', 'CITY')
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 14, Finished, Available)





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
      <th>ZIP</th>
      <th>CITY</th>
      <th>count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>02135-3514</td>
      <td>BOSTON</td>
      <td>53</td>
    </tr>
    <tr>
      <th>1</th>
      <td>02135-3514</td>
      <td>BRIGHTON</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>02747-1262</td>
      <td>DARTMOUTH</td>
      <td>9</td>
    </tr>
    <tr>
      <th>3</th>
      <td>02747-1262</td>
      <td>NORTH DARTMOUTH</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>01950</td>
      <td>NEWBURGPORT</td>
      <td>3</td>
    </tr>
    <tr>
      <th>5</th>
      <td>01950</td>
      <td>NEWBURYPORT</td>
      <td>1</td>
    </tr>
    <tr>
      <th>6</th>
      <td>02114</td>
      <td>BOSTON</td>
      <td>3</td>
    </tr>
    <tr>
      <th>7</th>
      <td>02114</td>
      <td>Boston</td>
      <td>1</td>
    </tr>
    <tr>
      <th>8</th>
      <td>02190-2314</td>
      <td>SOUTH WEYMOUTH</td>
      <td>3</td>
    </tr>
    <tr>
      <th>9</th>
      <td>02190-2314</td>
      <td>WEYMOUTH</td>
      <td>1</td>
    </tr>
    <tr>
      <th>10</th>
      <td>02668-1142</td>
      <td>W BARNSTABLE</td>
      <td>3</td>
    </tr>
    <tr>
      <th>11</th>
      <td>02668-1142</td>
      <td>WEST BARNSTABLE</td>
      <td>2</td>
    </tr>
    <tr>
      <th>12</th>
      <td>02747-2537</td>
      <td>DARTMOUTH</td>
      <td>3</td>
    </tr>
    <tr>
      <th>13</th>
      <td>02747-2537</td>
      <td>NORTH DARTMOUTH</td>
      <td>1</td>
    </tr>
    <tr>
      <th>14</th>
      <td>01104</td>
      <td>SPRINGFIELD</td>
      <td>2</td>
    </tr>
    <tr>
      <th>15</th>
      <td>01104</td>
      <td>Springfield</td>
      <td>1</td>
    </tr>
    <tr>
      <th>16</th>
      <td>01930</td>
      <td>GLOUCESTER</td>
      <td>2</td>
    </tr>
    <tr>
      <th>17</th>
      <td>01930</td>
      <td>Gloucester</td>
      <td>1</td>
    </tr>
    <tr>
      <th>18</th>
      <td>02169</td>
      <td>QUINCY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>19</th>
      <td>02169</td>
      <td>Quincy</td>
      <td>1</td>
    </tr>
    <tr>
      <th>20</th>
      <td>02301</td>
      <td>Brockton</td>
      <td>2</td>
    </tr>
    <tr>
      <th>21</th>
      <td>02301</td>
      <td>BROCKTON</td>
      <td>1</td>
    </tr>
    <tr>
      <th>22</th>
      <td>02576-1208</td>
      <td>W WAREHAM</td>
      <td>2</td>
    </tr>
    <tr>
      <th>23</th>
      <td>02576-1208</td>
      <td>WEST WAREHAM</td>
      <td>1</td>
    </tr>
    <tr>
      <th>24</th>
      <td>01201</td>
      <td>PITTSFIELD</td>
      <td>1</td>
    </tr>
    <tr>
      <th>25</th>
      <td>01201</td>
      <td>PITTSFILED</td>
      <td>1</td>
    </tr>
    <tr>
      <th>26</th>
      <td>01605</td>
      <td>WORCESTER</td>
      <td>1</td>
    </tr>
    <tr>
      <th>27</th>
      <td>01605</td>
      <td>Worcester</td>
      <td>1</td>
    </tr>
    <tr>
      <th>28</th>
      <td>02130</td>
      <td>BOSTON</td>
      <td>1</td>
    </tr>
    <tr>
      <th>29</th>
      <td>02130</td>
      <td>Jamaica Plain</td>
      <td>1</td>
    </tr>
    <tr>
      <th>30</th>
      <td>02360</td>
      <td>PLYMOUTH</td>
      <td>1</td>
    </tr>
    <tr>
      <th>31</th>
      <td>02360</td>
      <td>Plymouth</td>
      <td>1</td>
    </tr>
    <tr>
      <th>32</th>
      <td>02601</td>
      <td>HYANNIS</td>
      <td>1</td>
    </tr>
    <tr>
      <th>33</th>
      <td>02601</td>
      <td>Hyannis</td>
      <td>1</td>
    </tr>
    <tr>
      <th>34</th>
      <td>02747-1242</td>
      <td>DARTMOUTH</td>
      <td>1</td>
    </tr>
    <tr>
      <th>35</th>
      <td>02747-1242</td>
      <td>NORTH DARTMOUTH</td>
      <td>1</td>
    </tr>
    <tr>
      <th>36</th>
      <td>2128</td>
      <td>BOSTON</td>
      <td>1</td>
    </tr>
    <tr>
      <th>37</th>
      <td>2128</td>
      <td>EAST BOSTON</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



If the number of violations is small, it can be helpful to draw a graph with SemPy's `plot_dependency_violations` visualization function:


```python
providers.plot_dependency_violations('ZIP', 'CITY')
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 15, Finished, Available)





    
![svg](temp_files/temp_21_1.svg)
    



The plot of dependency violations shows values for `ZIP` on the left hand side, and values for `CITY` on the right hand side. An edge connects a zip code on the left with a city on the right if there is a row that contains these two values. The edges are annotated with the count of such rows. For example, there are two rows with zip code 02747-1242, one row with city "NORTH DARTHMOUTH" and the other with city "DARTHMOUTH", as shown in the previous plot and the following code:


```python
providers[providers.ZIP == '02747-1242'].CITY.value_counts()
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 16, Finished, Available)





    NORTH DARTMOUTH    1
    DARTMOUTH          1
    Name: CITY, dtype: int64



The plot also shows that among the rows that have `CITY` as "DARTHMOUTH", nine rows have a `ZIP` of 02747-1262; one row has a `ZIP` of 02747-1242; and one row has a `ZIP` of 02747-2537:


```python
providers[providers.CITY == 'DARTMOUTH'].ZIP.value_counts()
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 17, Finished, Available)





    02747-4302    13
    02747-1262     9
    02747-3717     4
    02747-2537     3
    02747-1242     1
    Name: ZIP, dtype: int64



There are other zip codes associated with "DARTMOUTH", but these aren't shown in the graph of dependency violations, as they don't hint at data quality issues. For example, the zip code "02747-4302" is uniquely associated to "DARTMOUTH" and doesn't show up in the graph of dependency violations:


```python
providers[providers.ZIP == '02747-4302'].CITY.value_counts()
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 18, Finished, Available)





    DARTMOUTH    13
    Name: CITY, dtype: int64



## Summarize data quality issues detected with SemPy

Going back to the graph of dependency violations, you can see that there are actually several interesting data quality issues present in this dataset:

- Some city names are all uppercase. This issue is easy to fix using string methods.
- Some city names have qualifiers (or prefixes), such as "North" and "East". For example, the zip code "2128" maps to "EAST BOSTON" once and to "BOSTON" once. A similar issue occurs between "NORTH DARTHMOUTH" and "DARTHMOUTH". You could try to drop these qualifiers or map the zip codes to the city with the most common occurrence.
- There are typos in some cities, such as "PITTSFIELD" vs. "PITTSFILED" and "NEWBURGPORT vs. "NEWBURYPORT". In the case of "NEWBURGPORT" this typo could be fixed by using the most common occurrence. In the case of "PITTSFIELD", having only one occurrence each makes it much harder for automatic disambiguation without external knowledge or the use of a language model.
- Sometimes, prefixes like "West" are abbreviated to a single letter "W". This could potentially be fixed with a simple replace, if all occurrences of "W" stand for "West".
- The zip code "02130" maps to "BOSTON" once and "Jamaica Plain" once. This issue is not easy to fix, but if there was more data, mapping to the most common occurrence could be a potential solution.

## Clean data

Fix the capitalization issues by changing all capitalization to title case:


```python
providers['CITY'] = providers.CITY.str.title()
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 19, Finished, Available)


Run the violation detection again to see that some of the ambiguities are gone (the number of violations is smaller):


```python
providers.list_dependency_violations('ZIP', 'CITY')
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 20, Finished, Available)





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
      <th>ZIP</th>
      <th>CITY</th>
      <th>count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>02135-3514</td>
      <td>Boston</td>
      <td>53</td>
    </tr>
    <tr>
      <th>1</th>
      <td>02135-3514</td>
      <td>Brighton</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>02747-1262</td>
      <td>Dartmouth</td>
      <td>9</td>
    </tr>
    <tr>
      <th>3</th>
      <td>02747-1262</td>
      <td>North Dartmouth</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>01950</td>
      <td>Newburgport</td>
      <td>3</td>
    </tr>
    <tr>
      <th>5</th>
      <td>01950</td>
      <td>Newburyport</td>
      <td>1</td>
    </tr>
    <tr>
      <th>6</th>
      <td>02190-2314</td>
      <td>South Weymouth</td>
      <td>3</td>
    </tr>
    <tr>
      <th>7</th>
      <td>02190-2314</td>
      <td>Weymouth</td>
      <td>1</td>
    </tr>
    <tr>
      <th>8</th>
      <td>02668-1142</td>
      <td>W Barnstable</td>
      <td>3</td>
    </tr>
    <tr>
      <th>9</th>
      <td>02668-1142</td>
      <td>West Barnstable</td>
      <td>2</td>
    </tr>
    <tr>
      <th>10</th>
      <td>02747-2537</td>
      <td>Dartmouth</td>
      <td>3</td>
    </tr>
    <tr>
      <th>11</th>
      <td>02747-2537</td>
      <td>North Dartmouth</td>
      <td>1</td>
    </tr>
    <tr>
      <th>12</th>
      <td>02576-1208</td>
      <td>W Wareham</td>
      <td>2</td>
    </tr>
    <tr>
      <th>13</th>
      <td>02576-1208</td>
      <td>West Wareham</td>
      <td>1</td>
    </tr>
    <tr>
      <th>14</th>
      <td>01201</td>
      <td>Pittsfield</td>
      <td>1</td>
    </tr>
    <tr>
      <th>15</th>
      <td>01201</td>
      <td>Pittsfiled</td>
      <td>1</td>
    </tr>
    <tr>
      <th>16</th>
      <td>02130</td>
      <td>Boston</td>
      <td>1</td>
    </tr>
    <tr>
      <th>17</th>
      <td>02130</td>
      <td>Jamaica Plain</td>
      <td>1</td>
    </tr>
    <tr>
      <th>18</th>
      <td>02747-1242</td>
      <td>Dartmouth</td>
      <td>1</td>
    </tr>
    <tr>
      <th>19</th>
      <td>02747-1242</td>
      <td>North Dartmouth</td>
      <td>1</td>
    </tr>
    <tr>
      <th>20</th>
      <td>2128</td>
      <td>Boston</td>
      <td>1</td>
    </tr>
    <tr>
      <th>21</th>
      <td>2128</td>
      <td>East Boston</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



At this point, you could refine your data more manually, but one potential data cleanup task is to drop rows that violate functional constraints between columns in the data, by using SemPy's `drop_dependency_violations` function. 

For each value of the determinant variable, `drop_dependency_violations` works by picking the most common value of the dependent variable and dropping all rows with other values. You should apply this operation only if you're confident that this statistical heuristic would lead to the correct results for your data. Otherwise you should write your own code to handle the detected violations as needed.

Run the `drop_dependency_violations` function on the `ZIP` and `CITY` columns:


```python
providers_clean = providers.drop_dependency_violations('ZIP', 'CITY')
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 21, Finished, Available)


List any dependency violations between `ZIP` and `CITY`:


```python
providers_clean.list_dependency_violations('ZIP', 'CITY')
```


    StatementMeta(, 8ef3af18-3c23-4723-a434-d3843d80bb9b, 22, Finished, Available)


    No violations
    




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
      <th>ZIP</th>
      <th>CITY</th>
      <th>count</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
</div>



The empty list shows that there are no more violations of the functional constraint **CITY -> ZIP**.

## Related content

Check out other tutorials for Semantic Link / SemPy:
1. Analyze functional dependencies in a Power BI sample dataset
1. Discover relationships in the _Synthea_ dataset using Semantic Link
1. Discover relationships in a Power BI dataset using Semantic Link
1. Extract and calculate Power BI measures from a Jupyter notebook



<!-- nbend -->
