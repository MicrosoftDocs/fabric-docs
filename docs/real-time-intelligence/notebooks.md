---
title: Use Fabric notebooks with data from a KQL database
description: Learn how to query data in a KQL Database from Microsoft Fabric Notebooks using KQL (Kusto Query Language)
ms.reviewer: orhasban
ms.topic: how-to
ms.subservice: rti-eventhouse
ms.custom: sfi-image-nochange
ms.date: 02/23/2026
ms.search.form: Notebooks
--- 
# Use Fabric notebooks with data from a KQL database

Notebooks are both readable documents containing data analysis descriptions and results and executable documents that can be run to perform data analysis. In this article, you learn how to use a Fabric notebook to connect to data in a [KQL Database](create-database.md) and run queries using native [KQL (Kusto Query Language)](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rti&pivots=fabric). For more information on notebooks, see [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md).

There are a few ways to use Fabric notebooks with data from your KQL database:

* [Load KQL database data from OneLake catalog](#load-kql-database-data-from-onelake-catalog)
* [Use Kusto snippets in a notebook](#use-kusto-snippets-in-a-notebook)
* [Create a notebook from a KQL database](#create-a-notebook-from-a-kql-database)
* [Analyze data in a KQL Database](eventhouse-analyze-data-with.md) with a new or existing notebook.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with at least viewing permissions

## Load KQL database data from OneLake catalog 

The KQL databases in the OneLake catalog are available as data sources in the notebook environment. You can add a KQL database as a data source to your notebook, and then reference it in your code cells to run KQL queries against it.

1. In your Workspace, navigate to an existing notebook or create a new one.

1. In the Notebook's Explorer pane, select **Add data items** and then select **From OneLake catalog**.

    :::image type="content" source="media/notebooks/notebook-onelake-catalog.png" alt-text="Screenshot of a notebook with the Explorer pane open to the Data items tab. The Add data items button is expanded and the option to select From OneLake catatlog is highlighted." lightbox="media/notebooks/notebook-onelake-catalog.png":::

1. In the OneLake catalog, navigate to your KQL database. You can find it under the Eventhouse that it belongs to, you can filter the list by type and select KQL Database type, or you can search for it by name.

    :::image type="content" source="media/notebooks/notebook-onelake-catalog-filter.png" alt-text="Screenshot of the OneLake catalog filter, with a KQL database filter highlighted." lightbox="media/notebooks/notebook-onelake-catalog.png":::

1. The KQL database is added under OneLake in the notebook's explorer pane.
    1. Expand the database to see the tables within it.
    1. Hover over a table, select the **more ...** menu, and then select **Load data**.

        :::image type="content" source="media/notebooks/notebook-load-data.png" alt-text="Screenshot of a KQL database expanded to show its tables. The more menu for a table is expanded to show the Load data option." lightbox="media/notebooks/notebook-load-data.png":::

1. The data from the table is loaded into a new code cell in the notebook, and a connection to the KQL database is automatically established. You can then run the code cell to query the data and return results within your notebook. 

    :::image type="content" source="media/notebooks/notebook-load-data-snippet.png" alt-text="Screenshot of the Notebook after data from the KQL database was loaded. The code snippet is highlighted.":::

For more information on the notebook experience with KQL data and the data analysis options, see **xxxxxxx**.

## Use Kusto snippets in a notebook

Fabric notebooks provide [code snippets](../data-engineering/author-execute-notebook.md#code-snippets) that help you easily write commonly used code patterns. You can use snippets to write or read data in a KQL database using KQL.

1. Navigate to an existing notebook or create a new one.
1. In a code cell, begin typing *kusto*.

    :::image type="content" source="media/notebooks/kusto-snippet.gif" alt-text="Screen capture of using a kusto snippet to use KQL in a Fabric notebook.":::

1. Select the snippet that corresponds to the operation you want to perform: **Write data to a KQL database** or **Read data from a KQL database**.

    The following code snippet shows the example data read operation:

    ```Python
    # Example of query for reading data from Kusto. Replace T with your <tablename>.
    kustoQuery = "['T'] | take 10"
    # The query URI for reading the data e.g. https://<>.kusto.data.microsoft.com.
    kustoUri = "https://<yourKQLdatabaseURI>.z0.kusto.data.microsoft.com"
    # The database with data to be read.
    database = "DocsDatabase"
    # The access credentials.
    accessToken = mssparkutils.credentials.getToken('kusto')
    kustoDf  = spark.read\
        .format("com.microsoft.kusto.spark.synapse.datasource")\
        .option("accessToken", accessToken)\
        .option("kustoCluster", kustoUri)\
        .option("kustoDatabase", database)\
        .option("kustoQuery", kustoQuery).load()
    
    # Example that uses the result data frame.
    kustoDf.show()
    ```

    The following code snippet shows the example write data operation:

    ```Python
    # The Kusto cluster uri to write the data. The query Uri is of the form https://<>.kusto.data.microsoft.com 
    kustoUri = ""
    # The database to write the data
    database = ""
    # The table to write the data 
    table    = ""
    # The access credentials for the write
    accessToken = mssparkutils.credentials.getToken('kusto')
    
    # Generate a range of 5 rows with Id's 5 to 9
    data = spark.range(5,10) 
    
    # Write data to a Kusto table
    data.write.\
    format("com.microsoft.kusto.spark.synapse.datasource").\
    option("kustoCluster",kustoUri).\
    option("kustoDatabase",database).\
    option("kustoTable", table).\
    option("accessToken", accessToken ).\
    option("tableCreateOptions", "CreateIfNotExist").mode("Append").save()
    ```

1. Enter the required information within the quotation marks of each field in the data cell:

    | Field | Description | Related links |
    |---|---|---|
    | kustoQuery | The KQL query to be evaluated. | [KQL overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rti&pivots=fabric)
    | KustoUri | The query URI of your KQL database. | [Copy a KQL database URI](access-database-copy-uri.md#copy-uri)
    | database | The name of your KQL database. | [Access an existing KQL database](access-database-copy-uri.md)
    | data | The data to be written to the table. |

1. Run the code cell.

## Create a notebook from a KQL database

When you create a notebook as a related item in a KQL database, the notebook is given the same name as the KQL database and is prepopulated with connection information.

1. Browse to your KQL database.
1. Select **New related item** > **Notebook**.

    :::image type="content" source="media/notebooks/related-item-notebook.png" alt-text="Screenshot of creating a notebook as a related item in a KQL database.":::

    A notebook is created with the KustoUri and database details prepopulated.

1. Enter the KQL query to be evaluated in the *kustoQuery* field.

    :::image type="content" source="media/notebooks/notebook-created.png" alt-text="Screenshot of notebook that is created from a KQL database." lightbox="media/notebooks/notebook-created.png":::

1. Run the code cell.

## Related content

* [KQL overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rti&pivots=fabric)
* [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md)
* [Analyze data in a KQL Database](eventhouse-analyze-data-with.md)
