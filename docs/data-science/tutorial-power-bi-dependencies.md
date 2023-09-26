<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/powerbi_dependencies_tutorial.ipynb -->

> [!TIP]
> Contents of _powerbi_dependencies_tutorial.ipynb_. **[Open in GitHub](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/powerbi_dependencies_tutorial.ipynb)**.

# Tutorial: Analyze functional dependencies in a Power BI sample dataset

In this tutorial, you build upon prior work done by a Power BI analyst and stored in the form of datasets. By using SemPy in the Synapse Data Science experience within Microsoft Fabric, you analyze functional dependencies that exist in columns of a DataFrame. This analysis helps to discover non-trivial data quality issues in order to gain more accurate insights.


### In this tutorial, you learn how to:
- Apply domain knowledge to formulate hypotheses about functional dependencies in a dataset.
- Get familiarized with components of Semantic Link's Python library ([SemPy](https://learn.microsoft.com/en-us/python/api/semantic-link-sempy)) that supports integration with Power BI and helps to automate data quality analysis. These components include:
    - FabricDataFrame - a pandas-like structure enhanced with additional semantic information.
    - Useful functions for pulling Power BI datasets from a Fabric workspace into your notebook.
    - Useful functions that automate the evaluation of hypotheses about functional dependencies and that identify violations of relationships in your datasets.

### Prerequisites

* A [Microsoft Fabric subscription](https://learn.microsoft.com/fabric/enterprise/licenses). Or sign up for a free [Microsoft Fabric (Preview) trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
* Sign in to [Microsoft Fabric](https://fabric.microsoft.com/).
* Go to the Data Science experience in Microsoft Fabric.
* Select **Workspaces** from the left navigation pane to find and select your workspace. This workspace becomes your current workspace.
* Download the _Customer Profitability Sample.pbix_ dataset from the [fabric-samples GitHub repository](https://github.com/microsoft/fabric-samples/blob/09cb40f1ffe0a7cfec67ec0ba2fcfdc95ba750a8/docs-samples/data-science/datasets/Customer%20Profitability%20Sample.pbix) and upload it to your workspace.
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


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, -1, Finished, Available)







    Requirement already satisfied: semantic-link in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (0.3.4)
    Requirement already satisfied: semantic-link-functions-validators==0.3.4 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link) (0.3.4)
    Requirement already satisfied: semantic-link-functions-phonenumbers==0.3.4 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link) (0.3.4)
    Requirement already satisfied: semantic-link-functions-holidays==0.3.4 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link) (0.3.4)
    Requirement already satisfied: semantic-link-sempy==0.3.4 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link) (0.3.4)
    Requirement already satisfied: semantic-link-functions-meteostat==0.3.4 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link) (0.3.4)
    Requirement already satisfied: semantic-link-functions-geopandas==0.3.4 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link) (0.3.4)
    Requirement already satisfied: mapclassify in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link-functions-geopandas==0.3.4->semantic-link) (2.6.0)
    Requirement already satisfied: folium in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link-functions-geopandas==0.3.4->semantic-link) (0.14.0)
    Requirement already satisfied: geopandas in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link-functions-geopandas==0.3.4->semantic-link) (0.14.0)
    Requirement already satisfied: holidays in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link-functions-holidays==0.3.4->semantic-link) (0.33)
    Requirement already satisfied: meteostat in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link-functions-meteostat==0.3.4->semantic-link) (1.6.5)
    Requirement already satisfied: phonenumbers in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link-functions-phonenumbers==0.3.4->semantic-link) (8.13.21)
    Requirement already satisfied: validators in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link-functions-validators==0.3.4->semantic-link) (0.22.0)
    Requirement already satisfied: pythonnet==3.0.1 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from semantic-link-sempy==0.3.4->semantic-link) (3.0.1)
    Requirement already satisfied: clr-loader<0.3.0,>=0.2.2 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from pythonnet==3.0.1->semantic-link-sempy==0.3.4->semantic-link) (0.2.6)
    Requirement already satisfied: jinja2>=2.9 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.1.2)
    Requirement already satisfied: requests in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.28.2)
    Requirement already satisfied: branca>=0.6.0 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (0.6.0)
    Requirement already satisfied: numpy in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.23.5)
    Requirement already satisfied: fiona>=1.8.21 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.9.4.post1)
    Requirement already satisfied: packaging in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (22.0)
    Requirement already satisfied: pyproj>=3.3.0 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.6.1)
    Requirement already satisfied: shapely>=1.8.0 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.0.1)
    Requirement already satisfied: pandas>=1.4.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.5.3)
    Requirement already satisfied: python-dateutil in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from holidays->semantic-link-functions-holidays==0.3.4->semantic-link) (2.8.2)
    Requirement already satisfied: networkx in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.1)
    Requirement already satisfied: scipy>=1.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.10.1)
    Requirement already satisfied: scikit-learn in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.2.0)
    Requirement already satisfied: pytz in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from meteostat->semantic-link-functions-meteostat==0.3.4->semantic-link) (2022.7.1)
    Requirement already satisfied: cffi>=1.13 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from clr-loader<0.3.0,>=0.2.2->pythonnet==3.0.1->semantic-link-sempy==0.3.4->semantic-link) (1.15.1)
    Requirement already satisfied: certifi in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (2022.12.7)
    Requirement already satisfied: cligj>=0.5 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (0.7.2)
    Requirement already satisfied: click~=8.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (8.1.3)
    Requirement already satisfied: click-plugins>=1.0 in /nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.1.1)
    Requirement already satisfied: six in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.16.0)
    Requirement already satisfied: attrs>=19.2.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (22.2.0)
    Requirement already satisfied: MarkupSafe>=2.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from jinja2>=2.9->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.1.2)
    Requirement already satisfied: idna<4,>=2.5 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.4)
    Requirement already satisfied: urllib3<1.27,>=1.21.1 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.26.14)
    Requirement already satisfied: charset-normalizer<4,>=2 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.1.1)
    Requirement already satisfied: threadpoolctl>=2.0.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from scikit-learn->mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.1.0)
    Requirement already satisfied: joblib>=1.1.1 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from scikit-learn->mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.2.0)
    Requirement already satisfied: pycparser in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from cffi>=1.13->clr-loader<0.3.0,>=0.2.2->pythonnet==3.0.1->semantic-link-sempy==0.3.4->semantic-link) (2.21)
    
    [1m[[0m[34;49mnotice[0m[1;39;49m][0m[39;49m A new release of pip is available: [0m[31;49m23.0[0m[39;49m -> [0m[32;49m23.2.1[0m
    [1m[[0m[34;49mnotice[0m[1;39;49m][0m[39;49m To update, run: [0m[32;49m/nfs4/pyenv-438609e1-eb5b-46ac-a065-9eb6a8b9c7b8/bin/python -m pip install --upgrade pip[0m
    Note: you may need to restart the kernel to use updated packages.
    






    Warning: PySpark kernel has been restarted to use updated packages.
    
    

2. Perform necessary imports of modules that you'll need later:


```python
import sempy.fabric as fabric
from sempy.dependencies import plot_dependency_metadata
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 17, Finished, Available)


## Load and preprocess the data

This tutorial uses a standard Power BI sample dataset [Customer Profitability Sample.pbix](https://github.com/microsoft/fabric-samples/tree/09cb40f1ffe0a7cfec67ec0ba2fcfdc95ba750a8/docs-samples/data-science/datasets). For a description of the dataset, see [Customer Profitability sample for Power BI](https://learn.microsoft.com/en-us/power-bi/create-reports/sample-customer-profitability).

Load the Power BI data into FabricDataFrames, using SemPy's `read_table` function:


```python
dataset = "Customer Profitability Sample"
customer = fabric.read_table(dataset, "Customer")
customer.head()
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 18, Finished, Available)





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
      <th>Customer</th>
      <th>Name</th>
      <th>City</th>
      <th>Postal Code</th>
      <th>State</th>
      <th>Industry ID</th>
      <th>Country/Region</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1023</td>
      <td>Spade and Archer</td>
      <td>Irving</td>
      <td>75038</td>
      <td>TX</td>
      <td>31</td>
      <td>US</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10000</td>
      <td>Globo-Chem</td>
      <td>Chicago</td>
      <td>60601</td>
      <td>IL</td>
      <td>30</td>
      <td>US</td>
    </tr>
    <tr>
      <th>2</th>
      <td>10001</td>
      <td>SNC Directly to America</td>
      <td>Westchester</td>
      <td>60154</td>
      <td>IL</td>
      <td>30</td>
      <td>US</td>
    </tr>
    <tr>
      <th>3</th>
      <td>10002</td>
      <td>GHG</td>
      <td>Plano</td>
      <td>75024</td>
      <td>TX</td>
      <td>13</td>
      <td>US</td>
    </tr>
    <tr>
      <th>4</th>
      <td>10003</td>
      <td>ABC Helicopter</td>
      <td>Fort Worth</td>
      <td>76177</td>
      <td>TX</td>
      <td>34</td>
      <td>US</td>
    </tr>
  </tbody>
</table>
</div>



Load the `State` table into a FabricDataFrame:


```python
state = fabric.read_table(dataset, "State")
state.head()
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 19, Finished, Available)





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
      <th>StateCode</th>
      <th>State</th>
      <th>Region</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>AK</td>
      <td>ALASKA</td>
      <td>WEST</td>
    </tr>
    <tr>
      <th>1</th>
      <td>FL</td>
      <td>FLORIDA</td>
      <td>EAST</td>
    </tr>
    <tr>
      <th>2</th>
      <td>GA</td>
      <td>GEORGIA</td>
      <td>EAST</td>
    </tr>
    <tr>
      <th>3</th>
      <td>HI</td>
      <td>HAWAII</td>
      <td>WEST</td>
    </tr>
    <tr>
      <th>4</th>
      <td>IA</td>
      <td>IOWA</td>
      <td>NORTH</td>
    </tr>
  </tbody>
</table>
</div>



While the output looks like a pandas DataFrame, we actually initialized a data structure called a ``FabricDataFrame`` that supports some useful operations on top of pandas.


```python
type(customer)
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 20, Finished, Available)





    sempy.fabric._dataframe._fabric_dataframe.FabricDataFrame



Join the `Customer` and `State` tables:


```python
customer_state_df = customer.merge(state, left_on="State", right_on="StateCode",  how='left')
customer_state_df.head()
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 21, Finished, Available)





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
      <th>Customer</th>
      <th>Name</th>
      <th>City</th>
      <th>Postal Code</th>
      <th>State_x</th>
      <th>Industry ID</th>
      <th>Country/Region</th>
      <th>StateCode</th>
      <th>State_y</th>
      <th>Region</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1023</td>
      <td>Spade and Archer</td>
      <td>Irving</td>
      <td>75038</td>
      <td>TX</td>
      <td>31</td>
      <td>US</td>
      <td>TX</td>
      <td>TEXAS</td>
      <td>SOUTH</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10000</td>
      <td>Globo-Chem</td>
      <td>Chicago</td>
      <td>60601</td>
      <td>IL</td>
      <td>30</td>
      <td>US</td>
      <td>IL</td>
      <td>ILLINOIS</td>
      <td>NORTH</td>
    </tr>
    <tr>
      <th>2</th>
      <td>10001</td>
      <td>SNC Directly to America</td>
      <td>Westchester</td>
      <td>60154</td>
      <td>IL</td>
      <td>30</td>
      <td>US</td>
      <td>IL</td>
      <td>ILLINOIS</td>
      <td>NORTH</td>
    </tr>
    <tr>
      <th>3</th>
      <td>10002</td>
      <td>GHG</td>
      <td>Plano</td>
      <td>75024</td>
      <td>TX</td>
      <td>13</td>
      <td>US</td>
      <td>TX</td>
      <td>TEXAS</td>
      <td>SOUTH</td>
    </tr>
    <tr>
      <th>4</th>
      <td>10003</td>
      <td>ABC Helicopter</td>
      <td>Fort Worth</td>
      <td>76177</td>
      <td>TX</td>
      <td>34</td>
      <td>US</td>
      <td>TX</td>
      <td>TEXAS</td>
      <td>SOUTH</td>
    </tr>
  </tbody>
</table>
</div>



## Identify functional dependencies

A functional dependency manifests itself as a one-to-many relationship between the values in two (or more) columns within a DataFrame. These relationships can be used to automatically detect data quality problems. 

Run SemPy's `find_dependencies` function on the merged DataFrame to identify any existing functional dependencies between values in the columns:


```python
dependencies = customer_state_df.find_dependencies()
dependencies
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 22, Finished, Available)





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
      <th>Determinant</th>
      <th>Dependent</th>
      <th>Conditional Entropy</th>
      <th>Determinant Unique Count</th>
      <th>Dependent Unique Count</th>
      <th>Determinant Null Count</th>
      <th>Dependent Null Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Customer</td>
      <td>Name</td>
      <td>0.000000</td>
      <td>327</td>
      <td>303</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Customer</td>
      <td>Postal Code</td>
      <td>0.000000</td>
      <td>327</td>
      <td>208</td>
      <td>0</td>
      <td>50</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Customer</td>
      <td>City</td>
      <td>0.000000</td>
      <td>327</td>
      <td>188</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Customer</td>
      <td>State_x</td>
      <td>0.000000</td>
      <td>327</td>
      <td>37</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Customer</td>
      <td>Industry ID</td>
      <td>0.000000</td>
      <td>327</td>
      <td>32</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Name</td>
      <td>Country/Region</td>
      <td>0.004239</td>
      <td>303</td>
      <td>4</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>6</th>
      <td>State_x</td>
      <td>[StateCode, State_y]</td>
      <td>0.000000</td>
      <td>37</td>
      <td>34</td>
      <td>0</td>
      <td>13</td>
    </tr>
    <tr>
      <th>7</th>
      <td>State_x</td>
      <td>Country/Region</td>
      <td>0.000000</td>
      <td>37</td>
      <td>4</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>[StateCode, State_y]</td>
      <td>Region</td>
      <td>0.000000</td>
      <td>34</td>
      <td>6</td>
      <td>13</td>
      <td>13</td>
    </tr>
  </tbody>
</table>
</div>



Visualize the identified dependencies by using SemPy's ``plot_dependency_metadata`` function:


```python
plot_dependency_metadata(dependencies)
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 23, Finished, Available)





    
![svg](temp_files/temp_20_1.svg)
    



As expected, the functional dependencies graph shows that *Customer* determines some columns like *City*, *Postal Code*, and *Name*. 

Surprisingly, the graph doesn't show a functional dependency between _City_ and _Postal Code_, probably because there are many violations in the relationships between the columns. You can use SemPy's ``plot_dependency_violations`` function to visualize violations of dependencies between specific columns.

## Explore the data for quality issues


```python
customer_state_df.plot_dependency_violations('Postal Code', 'City')
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 24, Finished, Available)





    
![svg](temp_files/temp_23_1.svg)
    



The plot of dependency violations shows values for `Postal Code` on the left hand side, and values for `City` on the right hand side. An edge connects a `Postal Code` on the left with a `City` on the right if there is a row that contains these two values. The edges are annotated with the count of such rows. For example, there are two rows with postal code 20004, one with city "North Tower" and the other with city "Washington".

Moreover, the plot shows a few violations and many empty values.


```python
customer_state_df['Postal Code'].isna().sum()
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 25, Finished, Available)





    50



50 rows have NA for postal code. 

Next, drop rows with empty values. Then, find dependencies using the `find_dependencies` function. Notice the additional parameter `verbose=1` that offers a glimpse into the internal workings of SemPy:


```python
customer_state_df2=customer_state_df.dropna()
customer_state_df2.find_dependencies(verbose=1)
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 26, Finished, Available)


    State_x, StateCode: nunique 33, 33
    Mapping size 33, dependency: True
    State_x, State_y: nunique 33, 33
    Mapping size 33, dependency: True
    
    Dependencies for 10 columns 8 groups 275 rows, dropna=False, threshold=0.01
    Region, Country/Region: cardinality shortcut: 0.0, 1.0
    Region, Country/Region: conditional entropy 0.0, 1.0
    Industry ID, Region: cached calculation 2.9751958829576504, 1.4548338980405395, 0.35134562333349867
    Industry ID, Region: conditional entropy 1.103488274707041, 2.6238502596241515
    Industry ID, Country/Region: cardinality shortcut: 0.0, 1.0
    Industry ID, Country/Region: conditional entropy 0.0, 1.0
    State_x, Industry ID: cached calculation 2.9883008304144907, 2.9751958829576504, 1.1575667522391768
    State_x, Industry ID: conditional entropy 1.8176291307184735, 1.8307340781753139
    State_x, Region: cached calculation 2.9883008304144907, 1.4548338980405395, 1.4548338980405395
    State_x, Region: conditional entropy 0.0, 1.5334669323739512
    State_x, Country/Region: indirectly dependent
    City, State_x: cached calculation 4.806051456908877, 2.9883008304144907, 2.9782186896063463
    City, State_x: conditional entropy 0.010082140808144402, 1.8278327673025307
    City, Industry ID: cached calculation 4.806051456908877, 2.9751958829576504, 2.423823820733329
    City, Industry ID: conditional entropy 0.5513720622243214, 2.382227636175548
    City, Region: cached calculation 4.806051456908877, 1.4548338980405395, 1.4447517572323947
    City, Region: conditional entropy 0.010082140808144846, 3.3612996996764823
    City, Country/Region: cardinality shortcut: 0.0, 1.0
    City, Country/Region: conditional entropy 0.0, 1.0
    Postal Code, City: cached calculation 5.156618788775424, 4.806051456908877, 4.756624667793785
    Postal Code, City: conditional entropy 0.04942678911509191, 0.39999412098163845
    Postal Code, State_x: cached calculation 5.156618788775424, 2.9883008304144907, 2.965982113842542
    Postal Code, State_x: conditional entropy 0.022318716571948727, 2.1906366749328816
    Postal Code, Industry ID: cached calculation 5.156618788775424, 2.9751958829576504, 2.7100928667054482
    Postal Code, Industry ID: conditional entropy 0.2651030162522021, 2.4465259220699753
    Postal Code, Region: cached calculation 5.156618788775424, 1.4548338980405395, 1.4325151814685904
    Postal Code, Region: conditional entropy 0.02231871657194917, 3.724103607306833
    Postal Code, Country/Region: cardinality shortcut: 0.0, 1.0
    Postal Code, Country/Region: conditional entropy 0.0, 1.0
    Name, Postal Code: cached calculation 5.5017049240740405, 5.156618788775424, 5.136454507159136
    Name, Postal Code: conditional entropy 0.020164281616287916, 0.3652504169149049
    Name, City: cached calculation 5.5017049240740405, 4.806051456908877, 4.79092824569666
    Name, City: conditional entropy 0.015123211212216603, 0.7107766783773801
    Name, State_x: cached calculation 5.5017049240740405, 2.9883008304144907, 2.973177619202274
    Name, State_x: conditional entropy 0.015123211212216603, 2.5285273048717665
    Name, Industry ID: cached calculation 5.5017049240740405, 2.9751958829576504, 2.9498850617127905
    Name, Industry ID: conditional entropy 0.025310821244859838, 2.55181986236125
    Name, Region: cached calculation 5.5017049240740405, 1.4548338980405395, 1.439710686828323
    Name, Region: conditional entropy 0.015123211212216603, 4.061994237245718
    Name, Country/Region: cardinality shortcut: 0.0, 1.0
    Name, Country/Region: conditional entropy 0.0, 1.0
    Customer, Name: cardinality shortcut: 0.0, 1.0
    Customer, Name: conditional entropy 0.0, 1.0
    Customer, Postal Code: cardinality shortcut: 0.0, 1.0
    Customer, Postal Code: conditional entropy 0.0, 1.0
    Customer, City: cardinality shortcut: 0.0, 1.0
    Customer, City: conditional entropy 0.0, 1.0
    Customer, State_x: cardinality shortcut: 0.0, 1.0
    Customer, State_x: conditional entropy 0.0, 1.0
    Customer, Industry ID: cardinality shortcut: 0.0, 1.0
    Customer, Industry ID: conditional entropy 0.0, 1.0
    Customer, Region: indirectly dependent
    Customer, Country/Region: indirectly dependent
    




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
      <th>Determinant</th>
      <th>Dependent</th>
      <th>Conditional Entropy</th>
      <th>Determinant Unique Count</th>
      <th>Dependent Unique Count</th>
      <th>Determinant Null Count</th>
      <th>Dependent Null Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Customer</td>
      <td>Name</td>
      <td>0.0</td>
      <td>275</td>
      <td>256</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Customer</td>
      <td>Postal Code</td>
      <td>0.0</td>
      <td>275</td>
      <td>205</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Customer</td>
      <td>City</td>
      <td>0.0</td>
      <td>275</td>
      <td>165</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Customer</td>
      <td>[State_x, StateCode, State_y]</td>
      <td>0.0</td>
      <td>275</td>
      <td>33</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Customer</td>
      <td>Industry ID</td>
      <td>0.0</td>
      <td>275</td>
      <td>32</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Name</td>
      <td>Country/Region</td>
      <td>0.0</td>
      <td>256</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Postal Code</td>
      <td>Country/Region</td>
      <td>0.0</td>
      <td>205</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>7</th>
      <td>City</td>
      <td>Country/Region</td>
      <td>0.0</td>
      <td>165</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>[State_x, StateCode, State_y]</td>
      <td>Region</td>
      <td>0.0</td>
      <td>33</td>
      <td>5</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Industry ID</td>
      <td>Country/Region</td>
      <td>0.0</td>
      <td>32</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Region</td>
      <td>Country/Region</td>
      <td>0.0</td>
      <td>5</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>



The conditional entropy for `Postal Code` and `City` is 0.049. This value can be explained by the fact there are functional dependency violations. Before you fix the violations, raise the threshold on conditional entropy from the default value of `0.01` to `0.05`, just to see the dependencies. Lower thresholds result in fewer dependencies (or higher selectivity).


```python
plot_dependency_metadata(customer_state_df2.find_dependencies(threshold=0.05))
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 27, Finished, Available)





    
![svg](temp_files/temp_29_1.svg)
    



If you apply domain knowledge of which entity determines values of other entities, this dependencies graph seems accurate. 

Now, explore more data quality issues that were detected. For example, `City` and `Region` are joined by a dashed arrow, which indicates that the dependency is only approximate. This could imply that there is a partial functional dependency.


```python
customer_state_df.list_dependency_violations('City', 'Region')
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 28, Finished, Available)





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
      <th>City</th>
      <th>Region</th>
      <th>count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>AAAAAAA</td>
      <td>SOUTH</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>AAAAAAA</td>
      <td>NaN</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Downers Grove</td>
      <td>CENTRAL</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Downers Grove</td>
      <td>NORTH</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Fremont</td>
      <td>SOUTH</td>
      <td>1</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Fremont</td>
      <td>WEST</td>
      <td>1</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Uxbridge</td>
      <td>EAST</td>
      <td>1</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Uxbridge</td>
      <td>NaN</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



Take a closer look at each of the cases where a non-empty `Region` value causes a violation:


```python
customer_state_df[customer_state_df.City=='Downers Grove']
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 29, Finished, Available)





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
      <th>Customer</th>
      <th>Name</th>
      <th>City</th>
      <th>Postal Code</th>
      <th>State_x</th>
      <th>Industry ID</th>
      <th>Country/Region</th>
      <th>StateCode</th>
      <th>State_y</th>
      <th>Region</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>66</th>
      <td>10114</td>
      <td>SNC Downers Grove</td>
      <td>Downers Grove</td>
      <td>60515</td>
      <td>NE</td>
      <td>30</td>
      <td>US</td>
      <td>NE</td>
      <td>NEBRASKA</td>
      <td>CENTRAL</td>
    </tr>
    <tr>
      <th>249</th>
      <td>50128</td>
      <td>SNC Downers Grove</td>
      <td>Downers Grove</td>
      <td>60515</td>
      <td>IL</td>
      <td>30</td>
      <td>US</td>
      <td>IL</td>
      <td>ILLINOIS</td>
      <td>NORTH</td>
    </tr>
  </tbody>
</table>
</div>



Downers Grove is a [city in Illinois](https://en.wikipedia.org/wiki/Downers_Grove,_Illinois), not Nebraska.


```python
customer_state_df[customer_state_df.City=='Fremont']
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 30, Finished, Available)





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
      <th>Customer</th>
      <th>Name</th>
      <th>City</th>
      <th>Postal Code</th>
      <th>State_x</th>
      <th>Industry ID</th>
      <th>Country/Region</th>
      <th>StateCode</th>
      <th>State_y</th>
      <th>Region</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>37</th>
      <td>10036</td>
      <td>Horn BPO</td>
      <td>Fremont</td>
      <td>94555</td>
      <td>TX</td>
      <td>30</td>
      <td>US</td>
      <td>TX</td>
      <td>TEXAS</td>
      <td>SOUTH</td>
    </tr>
    <tr>
      <th>46</th>
      <td>10060</td>
      <td>Soneli Graphics</td>
      <td>Fremont</td>
      <td>94538</td>
      <td>CA</td>
      <td>13</td>
      <td>US</td>
      <td>CA</td>
      <td>CALIFORNIA</td>
      <td>WEST</td>
    </tr>
  </tbody>
</table>
</div>



There is a city called [Fremont in California](https://en.wikipedia.org/wiki/Fremont,_California). However, for Texas, the search engine returns [Premont](https://en.wikipedia.org/wiki/Premont,_Texas), not Fremont!

It's also suspicious to see violations of the dependency between `Name` and `Country/Region`, as signified by the dotted line in the original graph of dependency violations (before dropping the rows with empty values).


```python
customer_state_df.list_dependency_violations('Name', 'Country/Region')
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 31, Finished, Available)





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
      <th>Name</th>
      <th>Country/Region</th>
      <th>count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>SDI Design</td>
      <td>CA</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>SDI Design</td>
      <td>US</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



It appears that one customer, 'SDI Design' is present in two regions - United States and Canada. This may not be a semantic violation, but may just be an uncommon case. Still, it's worth taking a close look:


```python
customer_state_df[customer_state_df.Name=='SDI Design']
```


    StatementMeta(, e5370855-62aa-42f8-bdac-08820d8f9c7a, 32, Finished, Available)





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
      <th>Customer</th>
      <th>Name</th>
      <th>City</th>
      <th>Postal Code</th>
      <th>State_x</th>
      <th>Industry ID</th>
      <th>Country/Region</th>
      <th>StateCode</th>
      <th>State_y</th>
      <th>Region</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>128</th>
      <td>10203</td>
      <td>SDI Design</td>
      <td>Denver</td>
      <td>80222</td>
      <td>CO</td>
      <td>15</td>
      <td>US</td>
      <td>CO</td>
      <td>COLORADO</td>
      <td>CENTRAL</td>
    </tr>
    <tr>
      <th>323</th>
      <td>50233</td>
      <td>SDI Design</td>
      <td>Winnipeg</td>
      <td>&lt;NA&gt;</td>
      <td>MB</td>
      <td>30</td>
      <td>CA</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



Further inspection shows that it's actually two different customers (from different industries) with the same name.

Exploratory data analysis is an exciting process, and so is data cleaning. There's always something that the data is hiding, depending on how you look at it, what you want to ask, and so on. Semantic Link provides you with new tools that you can use to achieve more with your data. 

## Related content

Check out other tutorials for Semantic Link / SemPy:
1. Clean data with functional dependencies
1. Discover relationships in the _Synthea_ dataset using Semantic Link
1. Discover relationships in a Power BI dataset using Semantic Link
1. Extract and calculate Power BI measures from a Jupyter notebook



<!-- nbend -->
