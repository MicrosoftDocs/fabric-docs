---
title: Use Cosmos DB in Spark notebook in Microsoft Fabric
description: Learn how to use the Cosmos DB Spark Connector to work with a Spark notebook in Microsoft Fabric.
author: garyhope
ms.author: garyhope
ms.topic: how-to
ms.date: 11/01/2025
---

# Work with Cosmos DB in Microsoft Fabric using the Cosmos DB Spark Connector

You can use Spark and the Azure Cosmos DB Spark connector to read write and query data from an Azure Cosmos DB for NoSQL account. You can also create and manage Cosmos DB containers with it as well.

Using Spark connector is different from using Spark to read data from the Cosmos DB in Fabric mirrored data stored in OneLake, as it connects directly to the Cosmos DB endpoint to perform operations.

The Cosmos DB Spark connector can be used to support reverse-ETL scenarios where you need to serve data with low latency or high concurrency.

> [!TIP]
> Download the complete sample from [Work with Cosmos DB in Microsoft Fabric using the Cosmos DB Spark Connector on GitHub](https://github.com/AzureCosmosDB/cosmos-fabric-samples/blob/main/spark-scala/README.md).

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

> [!NOTE]  
> This article uses the built-in Cosmos DB sample created with a database name of **CosmosSampleDatabase** and a container name of **SampleData**.

## Retrieve Cosmos DB endpoint

First, get the endpoint for the Cosmos DB database in Fabric. This endpoint is required to connect using the Cosmos DB Spark Connector.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

1. Select the **Settings** option in the menu bar for the database.

    :::image type="content" source="media/how-to-authenticate/settings-option.png" lightbox="media/how-to-authenticate/settings-option-full.png" alt-text="Screenshot of the 'Settings' menu bar option for a database in the Fabric portal.":::

1. In the settings dialog, navigate to the **Connection** section. Then, copy the value of the **Endpoint for Cosmos DB NoSQL database** field. You use this value in later step\[s\].

    :::image type="content" source="media/how-to-authenticate/settings-connection-endpoint.png" lightbox="media/how-to-authenticate/settings-connection-endpoint-full.png" alt-text="Screenshot of the 'Connection' section of the 'Settings' dialog for a database in the Fabric portal.":::

## Configure your Spark environment in a Fabric notebook

To connect to Cosmos DB using the Spark connector, you need to configure a custom Spark environment. This section walks you through creating a custom Spark environment and uploading the Cosmos DB Spark Connector libraries.

1. Download the latest Cosmos DB Spark Connector library files from the Maven repository (group ID: com.azure.cosmos.spark) for Spark 3.5.

   - https://repo1.maven.org/maven2/com/azure/cosmos/spark/azure-cosmos-spark_3-5_2-12/4.41.0/azure-cosmos-spark_3-5_2-12-4.41.0.jar  

   - https://repo1.maven.org/maven2/com/azure/cosmos/spark/fabric-cosmos-spark-auth_3/1.1.0/fabric-cosmos-spark-auth_3-1.1.0.jar

1. Create a new notebook.
1. Select Spark (Scala) as the language you want to use.

   :::image type="content" source="media/how-to-use-spark-directly/spark-scala-notebook.png" lightbox="media/how-to-use-spark-directly/spark-scala-notebook.png" alt-text="Screenshot of the notebook showing the selection of Spark (Scala) as the preferred language.":::

1. Select the environment dropdown.
1. Check your workspace settings to ensure that you're using Runtime 1.3 (Spark 3.5).

   :::image type="content" source="media/how-to-use-spark-directly/spark-scala-notebook-settings.png" lightbox="media/how-to-use-spark-directly/spark-scala-notebook-settings.png" alt-text="Screenshot of the notebook showing dropdown menu of workspace settings.":::

1. Select **New environment**.
1. Provide a new environment name.
1. Ensure that the runtime is configured for Runtime 1.3 (Spark 3.5).
1. Choose **Custom Library** from the **Libraries** folder in the left panel.

   :::image type="content" source="media/how-to-use-spark-directly/spark-scala-notebook-custom.png" lightbox="media/how-to-use-spark-directly/spark-scala-notebook-custom.png" alt-text="Screenshot of the environment showing custom library option.":::

1. Upload the two library `.jar` files you previously downloaded.
1. Select **Save**.
1. Select **Publish**, then **Publish all**, and finally **Publish**.
1. Once published, the custom libraries should have a status of success.

   :::image type="content" source="media/how-to-use-spark-directly/spark-scala-notebook-library.png" lightbox="media/how-to-use-spark-directly/spark-scala-notebook-library.png" alt-text="Screenshot of the environment with custom library files committed.":::

1. Return to the notebook and select the newly configured environment by clicking the environment dropdown, selecting **Change environment**, and choosing the name of the newly created environment.

## Connect using Spark

To connect to your Cosmos DB in Fabric database and container, specify a connection configuration to use when reading from and writing to the container.

1. Within the notebook, paste the Cosmos DB endpoint, database and container names you preserved earlier, then set online transaction processing (OLTP) configuration settings for the NoSQL account endpoint, database name, and container name.

   ```scala
   // User values for Cosmos DB
   val ENDPOINT = "https://YourAccountEndpoint....cosmos.fabric.microsoft.com:443/"
   val DATABASE = "{your-cosmos-artifact-name}"
   val CONTAINER = "{your-container-name}"

   // Set configuration settings
   val config = Map(
         "spark.cosmos.accountendpoint" -> ENDPOINT,
         "spark.cosmos.database" -> DATABASE,
         "spark.cosmos.container" -> CONTAINER,
         // auth config options
         "spark.cosmos.accountDataResolverServiceName" -> "com.azure.cosmos.spark.fabric.FabricAccountDataResolver",
         "spark.cosmos.auth.type" -> "AccessToken",
         "spark.cosmos.useGatewayMode" -> "true",
         "spark.cosmos.auth.aad.audience" -> "https://cosmos.azure.com/"
   )
   ```

## Query data from a container

Load OLTP data into a DataFrame to perform some basic Spark operations.

1. Use `spark.read` to load the OLTP data into a DataFrame object. Use the configuration created in the previous step. Also, set `spark.cosmos.read.inferSchema.enabled` to `true` to allow the Spark connector to infer the schema by sampling existing items.

   ```scala
   // Read Cosmos DB container into a dataframe
   val df = spark.read.format("cosmos.oltp")
     .options(config)
     .option("spark.cosmos.read.inferSchema.enabled", "true")
     .load()
   ```

1. Show the first five rows of the data within the DataFrame.

   ```scala
   // Show the first 5 rows of the dataframe
   df.show(5)
   ```

   > [!NOTE]
   > The *SampleData* container you created earlier contains two different entities with two separate schemas, *product* and *review*. The inferSchema option will detect the two different schemas within this Cosmos DB container.

1. Show the schema of the data loaded into the DataFrame by using `printSchema` and ensure the schema matches the sample document structure.

   ```scala
   // Render schema    
   df.printSchema()
   ```

   ```text
   The result should look something like this.
       root
        |-- inventory: integer (nullable = true)
        |-- name: string (nullable = true)
        |-- priceHistory: array (nullable = true)
        |    |-- element: struct (containsNull = true)
        |    |    |-- date: string (nullable = true)
        |    |    |-- price: double (nullable = true)
        |-- stars: integer (nullable = true)
        |-- description: string (nullable = true)
        |-- currentPrice: double (nullable = true)
        |-- reviewDate: string (nullable = true)
        |-- countryOfOrigin: string (nullable = true)
        |-- id: string (nullable = false)
        |-- categoryName: string (nullable = true)
        |-- productId: string (nullable = true)
        |-- firstAvailable: string (nullable = true)
        |-- userName: string (nullable = true)
        |-- docType: string (nullable = true)
   ```

1. The two schemas and their data can be filtered using the *docType* property in the container.  Filter the DataFrame for just products using the `where` function.

   ```scala
   // Render filtered rows by specific document type
   val productsDF = df.where("docType = 'product'")
   productsDF.show(10)
   ```

1. Filter the DataFrame using the `filter` function to show only products within a specific category

   ```scala
   // Render filtered rows by specific document type and categoryName
   val filteredDF = df
   .where("docType = 'product'")
   .filter($"categoryName" === "Computers, Laptops")

   filteredDF.show(10)
   ```

## Query Cosmos DB in Microsoft Fabric using SparkSQL

1. Configure the Catalog API to allow you to reference and manage Cosmos DB in Fabric resources by using Spark queries, with the endpoint set in the configuration created earlier.

   ```scala
   spark.conf.set("spark.sql.catalog.cosmosCatalog", "com.azure.cosmos.spark.CosmosCatalog")
   spark.conf.set("spark.sql.catalog.cosmosCatalog.spark.cosmos.accountEndpoint", config("spark.cosmos.accountendpoint"))
   spark.conf.set("spark.sql.catalog.cosmosCatalog.spark.cosmos.auth.type", "AccessToken")
   spark.conf.set("spark.sql.catalog.cosmosCatalog.spark.cosmos.useGatewayMode", "true")
   spark.conf.set("spark.sql.catalog.cosmosCatalog.spark.cosmos.accountDataResolverServiceName", "com.azure.cosmos.spark.fabric.FabricAccountDataResolver")
   ```

1. Query your data by using the catalog information and a SQL query string with the Spark SQL function.

   ```scala  
    // Show results of query   
    val queryString = "SELECT categoryName,productId, docType, name, currentPrice,stars FROM cosmosCatalog.SampleDatabase.SampleData"
    val queryDF = spark.sql(queryString)
    queryDF.show(10)
   ```

   The result should look similar to the following example:

    ```text
    +------------------+--------------------+-------+--------------------+------------+-----+
    |      categoryName|           productId|docType|                name|currentPrice|stars|
    +------------------+--------------------+-------+--------------------+------------+-----+
    |Computers, Laptops|77be013f-4036-431...|product|TechCorp SwiftEdg...|     2655.33| NULL|
    |Computers, Laptops|77be013f-4036-431...| review|                NULL|        NULL|    4|
    |Computers, Laptops|77be013f-4036-431...| review|                NULL|        NULL|    1|
    |Computers, Laptops|d4df3f4e-5a90-41e...|product|AeroTech VortexBo...|     2497.71| NULL|
    |Computers, Laptops|d4df3f4e-5a90-41e...| review|                NULL|        NULL|    1|
    |Computers, Laptops|d4df3f4e-5a90-41e...| review|                NULL|        NULL|    2|
    |Computers, Laptops|d4df3f4e-5a90-41e...| review|                NULL|        NULL|    1|
    |Computers, Laptops|d4df3f4e-5a90-41e...| review|                NULL|        NULL|    2|
    |Computers, Laptops|d4df3f4e-5a90-41e...| review|                NULL|        NULL|    5|
    |Computers, Laptops|e8b100f0-166d-43d...|product|NovaTech EdgeBook...|     1387.45| NULL|
    +------------------+--------------------+-------+--------------------+------------+-----+
   ```

1. This example shows how to work with an embedded array in a JSON document. First, query the container, then use the explode operator, then calculate the lowest price for a product in its product history.

   ```scala
   // Retrieve the product data from the SampleData container
   val productPriceMinDF = spark.sql(
   "SELECT " +
   "  productId, " +
   "  categoryName, " +
   "  name, " +
   "  currentPrice, " +
   "  priceHistory " +
   "FROM cosmosCatalog." + DATABASE + "." + CONTAINER + " " +
   "WHERE " + CONTAINER + ".docType = 'product'"
   )

   // Prepare an exploded result set containing one row for every member of the priceHistory array
   val explodedDF = productPriceMinDF
      .withColumn("priceHistory", explode(col("priceHistory")))
      .withColumn("priceDate", col("priceHistory").getField("date"))
      .withColumn("newPrice", col("priceHistory").getField("price"))

   // Aggregate just the lowest price ever recorded in the priceHistory
   val lowestPriceDF = explodedDF
      .filter(col("docType") === "product")
      .groupBy("productId", "categoryName", "name")
      .agg(min("newPrice").as("lowestPrice"))

   // Show 10 rows of the result data
   lowestPriceDF.show(10)
   ```

1. The results should look like this.

```text
   +--------------------+--------------------+--------------------+-----------+
   |           productId|        categoryName|                name|lowestPrice|
   +--------------------+--------------------+--------------------+-----------+
   |5d81221f-79ad-4ae...|Accessories, High...|PulseCharge Pro X120|      79.99|
   |9173595c-2b5c-488...|Accessories, Desi...| Elevate ProStand X2|     117.16|
   |a5d1be8f-ef18-484...|Computers, Gaming...|VoltStream Enigma...|     1799.0|
   |c9e3a6ce-432f-496...|Peripherals, Keyb...|HyperKey Pro X77 ...|     117.12|
   |f786eb9e-de01-45f...|    Devices, Tablets|TechVerse TabPro X12|     469.93|
   |59f21059-e9d4-492...|Peripherals, Moni...|GenericGenericPix...|     309.77|
   |074d2d7a-933e-464...|Devices, Smartwat...|  PulseSync Orion X7|     170.43|
   |dba39ca4-f94a-4b6...|Accessories, Desi...|Elevate ProStand ...|      129.0|
   |4775c430-1470-401...|Peripherals, Micr...|EchoStream Pro X7...|     119.65|
   |459a191a-21d1-42f...|Computers, Workst...|VertexPro Ultima ...|     3750.4|
   +--------------------+--------------------+--------------------+-----------+
```

## Use Cosmos DB to implement reverse ETL using Spark

Cosmos DB is an exceptional serving layer for analytical workloads due to its architecture. Below is an example of how to perform a reverse ETL on analytical data and serve it using Cosmos DB.

### Create a new Cosmos DB in Fabric container using Spark

- Create a new container named `MinPricePerProduct` by using `CREATE TABLE IF NOT EXISTS` with the Spark Catalog API. This container will always be small and not need to scale. Set the partition key path to `/id` and set the smallest allowable throughput with an autoscale throughput of `1000` request units per second (RU/s).

   ```scala
   // Create a MinPricePerProduct container by using the Catalog API
   val NEW_CONTAINER = "MinPricePerProduct"

   val sqlDef = s"""
      |CREATE TABLE IF NOT EXISTS cosmosCatalog.$DATABASE.$NEW_CONTAINER 
      |USING cosmos.oltp 
      |TBLPROPERTIES(partitionKeyPath = '/id', autoScaleMaxThroughput = '1000')
   """.stripMargin

   spark.sql(sqlDef)
   ```

### Write data into a Cosmos DB in Fabric container using Spark

In order to write data directly to a Cosmos DB in Fabric container, you require:

- a correctly formatted DataFrame containing the container partition key and `id` columns
- a correctly specified configuration for the container you wish to write to

1. All documents in Cosmos DB require an **id** property, which is also the partition key chosen for the `Producs` container. Create an `id` column on the `ProducsDF` DataFrame with the value of `productId` column.

   ```scala
   //create an id column and copy productId into it
   val ProductsDF = lowestPriceDF.withColumn("id", col("productId"))
   ProductsDF.show(10)
   ```

1. Create a new configuration for the `MinPricePerProduct` container you want to write to.

   ```scala.
   // Configure the Cosmos DB connection information for the database and the new container.
   val configWrite = Map(
      "spark.cosmos.accountendpoint" -> ENDPOINT,
      "spark.cosmos.database" -> DATABASE,
      "spark.cosmos.container" -> NEW_CONTAINER,
      "spark.cosmos.write.strategy" -> "ItemOverwrite",
      // auth config options
      "spark.cosmos.accountDataResolverServiceName" -> "com.azure.cosmos.spark.fabric.FabricAccountDataResolver",
      "spark.cosmos.auth.type" -> "AccessToken",
      "spark.cosmos.useGatewayMode" -> "true",
      "spark.cosmos.auth.aad.audience" -> "https://cosmos.azure.com/"
   )
   ```

1. Write the DataFrame to the container.

   ```scala
   ProductsDF.write
     .format("cosmos.oltp")
     .options(configWrite)
     .mode("APPEND")
     .save()
   ```

1. Query the container to validate that it now contains the correct data.

   ```scala
   // Test our write operation worked
   val queryString = s"SELECT * FROM cosmosCatalog.$DATABASE.$NEW_CONTAINER"
   val queryDF = spark.sql(queryString)
   queryDF.show(10)
   ```

   The result should look similar to the following example:

   ```text
      +--------------------+--------------------+-----------+--------------------+--------------------+
      |                name|        categoryName|lowestPrice|                  id|           productId|
      +--------------------+--------------------+-----------+--------------------+--------------------+
      |PulseCharge Pro X120|Accessories, High...|      79.99|5d81221f-79ad-4ae...|5d81221f-79ad-4ae...|
      | Elevate ProStand X2|Accessories, Desi...|     117.16|9173595c-2b5c-488...|9173595c-2b5c-488...|
      |VoltStream Enigma...|Computers, Gaming...|     1799.0|a5d1be8f-ef18-484...|a5d1be8f-ef18-484...|
      |HyperKey Pro X77 ...|Peripherals, Keyb...|     117.12|c9e3a6ce-432f-496...|c9e3a6ce-432f-496...|
      |TechVerse TabPro X12|    Devices, Tablets|     469.93|f786eb9e-de01-45f...|f786eb9e-de01-45f...|
      |GenericGenericPix...|Peripherals, Moni...|     309.77|59f21059-e9d4-492...|59f21059-e9d4-492...|
      |  PulseSync Orion X7|Devices, Smartwat...|     170.43|074d2d7a-933e-464...|074d2d7a-933e-464...|
      |Elevate ProStand ...|Accessories, Desi...|      129.0|dba39ca4-f94a-4b6...|dba39ca4-f94a-4b6...|
      |EchoStream Pro X7...|Peripherals, Micr...|     119.65|4775c430-1470-401...|4775c430-1470-401...|
      |VertexPro Ultima ...|Computers, Workst...|     3750.4|459a191a-21d1-42f...|459a191a-21d1-42f...|
      +--------------------+--------------------+-----------+--------------------+--------------------+
   ```

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently Asked Questions about Cosmos DB in Microsoft Fabric](faq.yml)
