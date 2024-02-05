---
title: Use Fabric notebooks with data from a KQL database
description: Learn how to query data in a KQL Database from Microsoft Fabric Notebooks using KQL (Kusto Query Language)
ms.reviewer: orhasban
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 11/21/2023
ms.search.form: Notebooks
--- 
# Use Fabric notebooks with data from a KQL database

Notebooks are both readable documents containing data analysis descriptions and results and executable documents that can be run to perform data analysis. In this article, you learn how to use a Fabric notebook to connect to data in a [KQL Database](create-database.md) and run queries using native [KQL (Kusto Query Language)](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rta&pivots=fabric). For more information on notebooks, see [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md).

There are two ways to use Fabric notebooks with data from your KQL database:

* [Use Kusto snippets in a notebook](#use-kusto-snippets-in-a-notebook)
* [Create a notebook from a KQL database](#create-a-notebook-from-a-kql-database)

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with at least viewing permissions

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
    accessToken = mssparkutils.credentials.getToken(kustoUri)
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
    accessToken = mssparkutils.credentials.getToken(kustoUri)
    
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
    | kustoQuery | The KQL query to be evaluated. | [KQL overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rta&pivots=fabric)
    | KustoUri | The query URI of your KQL database. | [Copy a KQL database URI](access-database-copy-uri.md#copy-uri)
    | database | The name of your KQL database. | [Access an existing KQL database](access-database-copy-uri.md)
    | data | The data to be written to the table.

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

* [KQL overview](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rta&pivots=fabric)
* [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md)
