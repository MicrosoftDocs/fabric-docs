<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/semantic-link-samples/powerbi_measures_tutorial.ipynb -->

> [!TIP]
> Contents of _powerbi_measures_tutorial.ipynb_. **[Open in GitHub](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/semantic-link-samples/powerbi_measures_tutorial.ipynb)**.

# Tutorial: Extract and calculate Power BI measures from a Jupyter notebook
This tutorial illustrates how to use SemPy to calculate measures in Power BI datasets.

### In this tutorial, you learn how to:
- Apply domain knowledge to formulate hypotheses about functional dependencies in a dataset.
- Get familiarized with components of Semantic Link's Python library ([SemPy](https://learn.microsoft.com/en-us/python/api/semantic-link-sempy)) that helps to bridge the gap between AI and BI. These components include:
    - FabricDataFrame - a pandas-like structure enhanced with additional semantic information.
    - Useful functions that allow you to fetch Power BI datasets, including raw data, configurations, and measures.

### Prerequisites

* A [Microsoft Fabric subscription](https://learn.microsoft.com/fabric/enterprise/licenses). Or sign up for a free [Microsoft Fabric (Preview) trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
* Sign in to [Microsoft Fabric](https://fabric.microsoft.com/).
* Go to the Data Science experience in Microsoft Fabric.
* Select **Workspaces** from the left navigation pane to find and select your workspace. This workspace becomes your current workspace.
* Download the [_Retail Analysis Sample PBIX.pbix_](https://download.microsoft.com/download/9/6/D/96DDC2FF-2568-491D-AAFA-AFDD6F763AE3/Retail%20Analysis%20Sample%20PBIX.pbix) dataset and upload it to your workspace.
* Open your notebook. You have two options:
    * [Import this notebook into your workspace](https://learn.microsoft.com/en-us/fabric/data-engineering/how-to-use-notebook#import-existing-notebooks). You can import from the Data Science homepage.
    * Alternatively, you can create [a new notebook](https://learn.microsoft.com/fabric/data-engineering/how-to-use-notebook#create-notebooks) to copy/paste code into cells.
* In the Lakehouse explorer section of your notebook, add a new or existing lakehouse to your notebook. For more information on how to add a lakehouse, see [Attach a lakehouse to your notebook](https://learn.microsoft.com/en-us/fabric/data-science/tutorial-data-science-prepare-system#attach-a-lakehouse-to-the-notebooks).

## Set up the notebook

In this section, you set up a notebook environment with the necessary modules and data.

1. install `SemPy` from PyPI using the `%pip` in-line installation capability within the notebook:


```python
%pip install semantic-link
```


    StatementMeta(, 203c1ef6-c809-42a7-8bd7-577b3bec7114, -1, Finished, Available)







    Collecting semantic-link
      Downloading semantic_link-0.3.4-py3-none-any.whl (8.2 kB)
    Collecting semantic-link-functions-geopandas==0.3.4
      Downloading semantic_link_functions_geopandas-0.3.4-py3-none-any.whl (4.0 kB)
    Collecting semantic-link-functions-holidays==0.3.4
      Downloading semantic_link_functions_holidays-0.3.4-py3-none-any.whl (4.2 kB)
    Collecting semantic-link-sempy==0.3.4
      Downloading semantic_link_sempy-0.3.4-py3-none-any.whl (2.9 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.9/2.9 MB[0m [31m116.2 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting semantic-link-functions-phonenumbers==0.3.4
      Downloading semantic_link_functions_phonenumbers-0.3.4-py3-none-any.whl (4.3 kB)
    Collecting semantic-link-functions-meteostat==0.3.4
      Downloading semantic_link_functions_meteostat-0.3.4-py3-none-any.whl (4.5 kB)
    Collecting semantic-link-functions-validators==0.3.4
      Downloading semantic_link_functions_validators-0.3.4-py3-none-any.whl (4.8 kB)
    Collecting mapclassify
      Downloading mapclassify-2.6.0-py3-none-any.whl (40 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m40.8/40.8 kB[0m [31m18.4 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting geopandas
      Downloading geopandas-0.14.0-py3-none-any.whl (1.1 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m1.1/1.1 MB[0m [31m125.7 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting folium
      Downloading folium-0.14.0-py2.py3-none-any.whl (102 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m102.3/102.3 kB[0m [31m46.8 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting holidays
      Downloading holidays-0.33-py3-none-any.whl (759 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m759.7/759.7 kB[0m [31m144.6 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting meteostat
      Downloading meteostat-1.6.5-py3-none-any.whl (31 kB)
    Collecting phonenumbers
      Downloading phonenumbers-8.13.21-py2.py3-none-any.whl (2.6 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.6/2.6 MB[0m [31m140.3 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting validators
      Downloading validators-0.22.0-py3-none-any.whl (26 kB)
    Collecting pythonnet==3.0.1
      Downloading pythonnet-3.0.1-py3-none-any.whl (284 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m284.5/284.5 kB[0m [31m98.0 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting clr-loader<0.3.0,>=0.2.2
      Downloading clr_loader-0.2.6-py3-none-any.whl (51 kB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m51.3/51.3 kB[0m [31m28.5 MB/s[0m eta [36m0:00:00[0m
    [?25hCollecting branca>=0.6.0
      Downloading branca-0.6.0-py3-none-any.whl (24 kB)
    Requirement already satisfied: numpy in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.23.5)
    Requirement already satisfied: jinja2>=2.9 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.1.2)
    Requirement already satisfied: requests in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.28.2)
    Collecting pyproj>=3.3.0
      Downloading pyproj-3.6.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (8.3 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m8.3/8.3 MB[0m [31m162.4 MB/s[0m eta [36m0:00:00[0m00:01[0m
    [?25hRequirement already satisfied: packaging in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (22.0)
    Collecting fiona>=1.8.21
      Downloading Fiona-1.9.4.post1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (16.4 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m16.4/16.4 MB[0m [31m115.7 MB/s[0m eta [36m0:00:00[0m00:01[0m00:01[0m
    [?25hCollecting shapely>=1.8.0
      Downloading shapely-2.0.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (2.3 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.3/2.3 MB[0m [31m101.0 MB/s[0m eta [36m0:00:00[0m
    [?25hRequirement already satisfied: pandas>=1.4.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.5.3)
    Requirement already satisfied: python-dateutil in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from holidays->semantic-link-functions-holidays==0.3.4->semantic-link) (2.8.2)
    Requirement already satisfied: scipy>=1.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.10.1)
    Collecting networkx
      Downloading networkx-3.1-py3-none-any.whl (2.1 MB)
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m2.1/2.1 MB[0m [31m177.8 MB/s[0m eta [36m0:00:00[0m
    [?25hRequirement already satisfied: scikit-learn in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.2.0)
    Requirement already satisfied: pytz in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from meteostat->semantic-link-functions-meteostat==0.3.4->semantic-link) (2022.7.1)
    Requirement already satisfied: cffi>=1.13 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from clr-loader<0.3.0,>=0.2.2->pythonnet==3.0.1->semantic-link-sempy==0.3.4->semantic-link) (1.15.1)
    Requirement already satisfied: attrs>=19.2.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (22.2.0)
    Requirement already satisfied: certifi in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (2022.12.7)
    Requirement already satisfied: six in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.16.0)
    Requirement already satisfied: click~=8.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from fiona>=1.8.21->geopandas->semantic-link-functions-geopandas==0.3.4->semantic-link) (8.1.3)
    Collecting cligj>=0.5
      Downloading cligj-0.7.2-py3-none-any.whl (7.1 kB)
    Collecting click-plugins>=1.0
      Downloading click_plugins-1.1.1-py2.py3-none-any.whl (7.5 kB)
    Requirement already satisfied: MarkupSafe>=2.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from jinja2>=2.9->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.1.2)
    Requirement already satisfied: idna<4,>=2.5 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.4)
    Requirement already satisfied: urllib3<1.27,>=1.21.1 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.26.14)
    Requirement already satisfied: charset-normalizer<4,>=2 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from requests->folium->semantic-link-functions-geopandas==0.3.4->semantic-link) (2.1.1)
    Requirement already satisfied: threadpoolctl>=2.0.0 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from scikit-learn->mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (3.1.0)
    Requirement already satisfied: joblib>=1.1.1 in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from scikit-learn->mapclassify->semantic-link-functions-geopandas==0.3.4->semantic-link) (1.2.0)
    Requirement already satisfied: pycparser in /home/trusted-service-user/cluster-env/trident_env/lib/python3.10/site-packages (from cffi>=1.13->clr-loader<0.3.0,>=0.2.2->pythonnet==3.0.1->semantic-link-sempy==0.3.4->semantic-link) (2.21)
    Installing collected packages: phonenumbers, validators, shapely, pyproj, networkx, cligj, click-plugins, holidays, fiona, clr-loader, branca, pythonnet, meteostat, mapclassify, geopandas, folium, semantic-link-sempy, semantic-link-functions-validators, semantic-link-functions-phonenumbers, semantic-link-functions-meteostat, semantic-link-functions-holidays, semantic-link-functions-geopandas, semantic-link
    Successfully installed branca-0.6.0 click-plugins-1.1.1 cligj-0.7.2 clr-loader-0.2.6 fiona-1.9.4.post1 folium-0.14.0 geopandas-0.14.0 holidays-0.33 mapclassify-2.6.0 meteostat-1.6.5 networkx-3.1 phonenumbers-8.13.21 pyproj-3.6.1 pythonnet-3.0.1 semantic-link-0.3.4 semantic-link-functions-geopandas-0.3.4 semantic-link-functions-holidays-0.3.4 semantic-link-functions-meteostat-0.3.4 semantic-link-functions-phonenumbers-0.3.4 semantic-link-functions-validators-0.3.4 semantic-link-sempy-0.3.4 shapely-2.0.1 validators-0.22.0
    
    [1m[[0m[34;49mnotice[0m[1;39;49m][0m[39;49m A new release of pip is available: [0m[31;49m23.0[0m[39;49m -> [0m[32;49m23.2.1[0m
    [1m[[0m[34;49mnotice[0m[1;39;49m][0m[39;49m To update, run: [0m[32;49m/nfs4/pyenv-615719c6-e8ce-482c-b57d-1b957177bf22/bin/python -m pip install --upgrade pip[0m
    Note: you may need to restart the kernel to use updated packages.
    






    Warning: PySpark kernel has been restarted to use updated packages.
    
    

2. Perform necessary imports of modules that you'll need later: 


```python
import sempy.fabric as fabric
```


    StatementMeta(, 203c1ef6-c809-42a7-8bd7-577b3bec7114, 9, Finished, Available)


3. You can connect to the Power BI workspace. List the datasets in the workspace:


```python
fabric.list_datasets()
```


    StatementMeta(, 203c1ef6-c809-42a7-8bd7-577b3bec7114, 10, Finished, Available)





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
  </tbody>
</table>
</div>



In this tutorial, you use the _Retail Analysis Sample PBIX_ dataset:


```python
dataset = "Retail Analysis Sample PBIX"
```


    StatementMeta(, 203c1ef6-c809-42a7-8bd7-577b3bec7114, 11, Finished, Available)


## List workspace measures

Start by listing measures in the dataset, using SemPy's `list_measures` function as follows:


```python
fabric.list_measures(dataset)
```


    StatementMeta(, 203c1ef6-c809-42a7-8bd7-577b3bec7114, 12, Finished, Available)





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
      <th>Table Name</th>
      <th>Measure Name</th>
      <th>Measure Expression</th>
      <th>Measure Data Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Store</td>
      <td>Average Selling Area Size</td>
      <td>AVERAGE([SellingAreaSize])</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Store</td>
      <td>New Stores</td>
      <td>CALCULATE(COUNTA([Store Type]), FILTER(ALL(Sto...</td>
      <td>Int64</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Store</td>
      <td>New Stores Target</td>
      <td>14</td>
      <td>Int64</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Store</td>
      <td>Total Stores</td>
      <td>COUNTA([StoreNumberName])</td>
      <td>Int64</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Store</td>
      <td>Open Store Count</td>
      <td>COUNTA([OpenDate])</td>
      <td>Int64</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Store</td>
      <td>Count of OpenDate</td>
      <td>COUNTA('Store'[OpenDate])</td>
      <td>Int64</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Sales</td>
      <td>Regular_Sales_Dollars</td>
      <td>SUM([Sum_Regular_Sales_Dollars])</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Sales</td>
      <td>Markdown_Sales_Dollars</td>
      <td>SUM([Sum_Markdown_Sales_Dollars])</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Sales</td>
      <td>TotalSales</td>
      <td>[Regular_Sales_Dollars]+[Markdown_Sales_Dollars]</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Sales</td>
      <td>TotalSalesLY</td>
      <td>CALCULATE([TotalSales], Sales[ScenarioID]=2)</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Sales</td>
      <td>Gross Margin This Year</td>
      <td>CALCULATE(SUM([Sum_GrossMarginAmount]), Sales[...</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>11</th>
      <td>Sales</td>
      <td>Gross Margin This Year %</td>
      <td>[Gross Margin This Year]/[TotalSalesTY]</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>12</th>
      <td>Sales</td>
      <td>Gross Margin Last Year</td>
      <td>CALCULATE(SUM([Sum_GrossMarginAmount]), Sales[...</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>13</th>
      <td>Sales</td>
      <td>Gross Margin Last Year %</td>
      <td>[Gross Margin Last Year]/[TotalSalesLY]</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>14</th>
      <td>Sales</td>
      <td>Regular_Sales_Units</td>
      <td>SUM([Sum_Regular_Sales_Units])</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>15</th>
      <td>Sales</td>
      <td>Markdown_Sales_Units</td>
      <td>SUM([Sum_Markdown_Sales_Units])</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>16</th>
      <td>Sales</td>
      <td>TotalUnits</td>
      <td>[Regular_Sales_Units]+[Markdown_Sales_Units]</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>17</th>
      <td>Sales</td>
      <td>Total Units Last Year</td>
      <td>CALCULATE([TotalUnits], Sales[ScenarioID]=2)</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>18</th>
      <td>Sales</td>
      <td>Total Units This Year</td>
      <td>CALCULATE([TotalUnits], Sales[ScenarioID]=1)</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>19</th>
      <td>Sales</td>
      <td>Avg $/Unit TY</td>
      <td>IF([Total Units This Year]&lt;&gt;0, [TotalSalesTY]/...</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>20</th>
      <td>Sales</td>
      <td>Avg $/Unit LY</td>
      <td>IF([Total Units Last Year]&lt;&gt;0, [TotalSalesLY]/...</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>21</th>
      <td>Sales</td>
      <td>Total Sales Var</td>
      <td>[TotalSalesTY]-[TotalSalesLY]</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>22</th>
      <td>Sales</td>
      <td>Total Sales Var %</td>
      <td>IF([TotalSalesLY]&lt;&gt;0, [Total Sales Var]/[Total...</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>23</th>
      <td>Sales</td>
      <td>Sales Per Sq Ft</td>
      <td>([TotalSalesTY]/(DISTINCTCOUNT([MonthID])*SUM(...</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>24</th>
      <td>Sales</td>
      <td>Last Year Sales</td>
      <td>[TotalSalesLY]</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>25</th>
      <td>Sales</td>
      <td>Total Sales Variance</td>
      <td>[Total Sales Var]</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>26</th>
      <td>Sales</td>
      <td>Total Sales Variance %</td>
      <td>[Total Sales Var %]</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>27</th>
      <td>Sales</td>
      <td>Store Count</td>
      <td>DISTINCTCOUNT([LocationID])</td>
      <td>Int64</td>
    </tr>
    <tr>
      <th>28</th>
      <td>Sales</td>
      <td>Average Unit Price</td>
      <td>[Avg $/Unit TY]</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>29</th>
      <td>Sales</td>
      <td>Average Unit Price Last Year</td>
      <td>[Avg $/Unit LY]</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>30</th>
      <td>Sales</td>
      <td>TotalSalesTY</td>
      <td>CALCULATE([TotalSales], Sales[ScenarioID]=1)</td>
      <td>Double</td>
    </tr>
    <tr>
      <th>31</th>
      <td>Sales</td>
      <td>This Year Sales</td>
      <td>[TotalSalesTY]</td>
      <td>Double</td>
    </tr>
  </tbody>
</table>
</div>



## Evaluate measures

### Evaluate a raw measure

In the following code, use SemPy's `evaluate_measure` function to calculate a preconfigured measure that is called "Average Selling Area Size". You can see the underlying formula for this measure in the output of the previous cell. 


```python
fabric.evaluate_measure(dataset, measure="Average Selling Area Size")
```


    StatementMeta(, 203c1ef6-c809-42a7-8bd7-577b3bec7114, 13, Finished, Available)





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
      <th>Average Selling Area Size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>24326.923077</td>
    </tr>
  </tbody>
</table>
</div>



### Evaluate a measure with `groupby_columns`

You can group the measure output by certain columns by supplying the additional parameter `groupby_columns`:


```python
fabric.evaluate_measure(dataset, measure="Average Selling Area Size", groupby_columns=["Store[Chain]", "Store[DistrictName]"])
```


    StatementMeta(, 203c1ef6-c809-42a7-8bd7-577b3bec7114, 14, Finished, Available)





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
      <th>Chain</th>
      <th>DistrictName</th>
      <th>Average Selling Area Size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Fashions Direct</td>
      <td>FD - District #1</td>
      <td>43888.888889</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Fashions Direct</td>
      <td>FD - District #2</td>
      <td>47777.777778</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Fashions Direct</td>
      <td>FD - District #3</td>
      <td>50000.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Fashions Direct</td>
      <td>FD - District #4</td>
      <td>50500.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Lindseys</td>
      <td>LI - District #1</td>
      <td>10384.615385</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Lindseys</td>
      <td>LI - District #2</td>
      <td>10909.090909</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Lindseys</td>
      <td>LI - District #3</td>
      <td>10333.333333</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Lindseys</td>
      <td>LI - District #4</td>
      <td>12500.0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Lindseys</td>
      <td>LI - District #5</td>
      <td>11785.714286</td>
    </tr>
  </tbody>
</table>
</div>



In the previous code, you grouped by the columns `Chain` and `DistrictName` of the `Store` table in the dataset.

### Evaluate a measure with filters

You can also use the `filters` parameter to specify specific values that the result can contain for particular columns:


```python
fabric.evaluate_measure(dataset, \
                        measure="Total Units Last Year", \
                        groupby_columns=["Store[Territory]"], \
                        filters={"Store[Territory]": ["PA", "TN", "VA"], "Store[Chain]": ["Lindseys"]})
```


    StatementMeta(, 203c1ef6-c809-42a7-8bd7-577b3bec7114, 15, Finished, Available)





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
      <th>Territory</th>
      <th>Total Units Last Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>PA</td>
      <td>11309</td>
    </tr>
    <tr>
      <th>1</th>
      <td>TN</td>
      <td>81663</td>
    </tr>
    <tr>
      <th>2</th>
      <td>VA</td>
      <td>160863</td>
    </tr>
  </tbody>
</table>
</div>



Note that `Store` is the name of the table, `Territory` is the name of the column, and `PA` is one of the values that are allowed by the filter.

### Evaluate a measure across multiple tables

These groups can span multiple tables in the dataset.


```python
fabric.evaluate_measure(dataset, measure="Total Units Last Year", groupby_columns=["Store[Territory]", "Sales[ItemID]"])
```


    StatementMeta(, 203c1ef6-c809-42a7-8bd7-577b3bec7114, 16, Finished, Available)





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
      <th>Territory</th>
      <th>ItemID</th>
      <th>Total Units Last Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>DE</td>
      <td>18049</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>DE</td>
      <td>18069</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>DE</td>
      <td>18079</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>DE</td>
      <td>18085</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>DE</td>
      <td>18087</td>
      <td>3</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>178636</th>
      <td>WV</td>
      <td>244167</td>
      <td>13</td>
    </tr>
    <tr>
      <th>178637</th>
      <td>WV</td>
      <td>244223</td>
      <td>4</td>
    </tr>
    <tr>
      <th>178638</th>
      <td>WV</td>
      <td>244242</td>
      <td>2</td>
    </tr>
    <tr>
      <th>178639</th>
      <td>WV</td>
      <td>244246</td>
      <td>2</td>
    </tr>
    <tr>
      <th>178640</th>
      <td>WV</td>
      <td>244277</td>
      <td>14</td>
    </tr>
  </tbody>
</table>
<p>178641 rows × 3 columns</p>
</div>



### Evaluate multiple measures

The function `evaluate_measure` allows you to supply identifiers of multiple measures and output the calculated values in the same DataFrame:


```python
fabric.evaluate_measure(dataset, measure=["Average Selling Area Size", "Total Stores"], groupby_columns=["Store[Chain]", "Store[DistrictName]"])
```


    StatementMeta(, 203c1ef6-c809-42a7-8bd7-577b3bec7114, 17, Finished, Available)





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
      <th>Chain</th>
      <th>DistrictName</th>
      <th>Average Selling Area Size</th>
      <th>Total Stores</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Fashions Direct</td>
      <td>FD - District #1</td>
      <td>43888.888889</td>
      <td>9</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Fashions Direct</td>
      <td>FD - District #2</td>
      <td>47777.777778</td>
      <td>9</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Fashions Direct</td>
      <td>FD - District #3</td>
      <td>50000.0</td>
      <td>9</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Fashions Direct</td>
      <td>FD - District #4</td>
      <td>50500.0</td>
      <td>10</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Lindseys</td>
      <td>LI - District #1</td>
      <td>10384.615385</td>
      <td>13</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Lindseys</td>
      <td>LI - District #2</td>
      <td>10909.090909</td>
      <td>11</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Lindseys</td>
      <td>LI - District #3</td>
      <td>10333.333333</td>
      <td>15</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Lindseys</td>
      <td>LI - District #4</td>
      <td>12500.0</td>
      <td>14</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Lindseys</td>
      <td>LI - District #5</td>
      <td>11785.714286</td>
      <td>14</td>
    </tr>
  </tbody>
</table>
</div>



## Use Power BI XMLA connector

The default dataset client is backed by Power BI's REST APIs. If there are any issues running queries with this client, it's possible to switch the back end to Power BI's XMLA interface using `use_xmla=True`. The SemPy parameters remain the same for measure calculation with XMLA.


```python
fabric.evaluate_measure(dataset, \
                        measure=["Average Selling Area Size", "Total Stores"], \
                        groupby_columns=["Store[Chain]", "Store[DistrictName]"], \
                        filters={"Store[Territory]": ["PA", "TN", "VA"], "Store[Chain]": ["Lindseys"]}, \
                        use_xmla=True)
```


    StatementMeta(, 203c1ef6-c809-42a7-8bd7-577b3bec7114, 18, Finished, Available)





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
      <th>Chain</th>
      <th>DistrictName</th>
      <th>Average Selling Area Size</th>
      <th>Total Stores</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Lindseys</td>
      <td>LI - District #2</td>
      <td>11000</td>
      <td>10</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Lindseys</td>
      <td>LI - District #5</td>
      <td>12000</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Lindseys</td>
      <td>LI - District #1</td>
      <td>10000</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



## Related content

Check out other tutorials for Semantic Link / SemPy:
1. Clean data with functional dependencies
1. Analyze functional dependencies in a Power BI sample dataset
1. Discover relationships in the _Synthea_ dataset using Semantic Link
1. Discover relationships in a Power BI dataset using Semantic Link




<!-- nbend -->
