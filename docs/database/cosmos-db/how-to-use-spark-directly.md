---
title: Use Spark to work with Cosmos DB in Fabric directly
description: Learn how to use Spark to work with Cosmos DB databases in Microsoft Fabric, directly using the Cosmos DB Spark Connector.
author: garyhope
ms.author: garyhope
ms.topic: how-to
ms.date: 10/31/2025
---



# Query Cosmos DB in Microsoft Fabric using the Cosmos DB Spark Connector

You can use Microsoft Fabric Runtime and the Cosmos DB Spark connector to read or write data from a Cosmos DB in Fabric database. The Cosmos DB Spark connector as connector connects directly to the Cosmos DB endpoint to perform operations. This is different from using Spark to read data from the Cosmos DB in Fabric mirrored data stored in OneLake

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

[!INCLUDE[Prerequisites - Existing container](includes/prerequisite-existing-container.md)]

> [!NOTE]  
> In this article, we have used a Cosmos DB in Fabric database name of *SampleDatabase* and a container name of **SampleData**. You should substitute these for the database and container names you are using.

## Configure your Spark environment in a Fabric notebook

To connect to Cosmos DB using the Spark connector, you need to configure a custom Spark environment. This section walks you through creating a custom Spark environment and uploading the Cosmos DB Spark Connector libraries.

1. Download the latest Cosmos DB Spark Connector library files from the Maven repository (group ID: com.azure.cosmos.spark) for Spark 3.5.

   - https://repo1.maven.org/maven2/com/azure/cosmos/spark/azure-cosmos-spark_3-5_2-12/4.41.0/azure-cosmos-spark_3-5_2-12-4.41.0.jar  
   - https://repo1.maven.org/maven2/com/azure/cosmos/spark/fabric-cosmos-spark-auth_3/1.1.0/fabric-cosmos-spark-auth_3-1.1.0.jar

1. Create a new notebook.
1. Select Spark (Scala) as the language you want to use.

   :::image type="content" source="media/how-to-use-spark-directly/spark-scala-notebook.png" lightbox="media/how-to-use-spark-directly/spark-scala-notebook.png" alt-text="Screenshot of the notebook showing the selection of Spark (Scala) as the preferred language.":::

1. Click the environment dropdown.
1. Check your workspace settings to ensure that you are using Runtime 1.3 (Spark 3.5).

   :::image type="content" source="media/how-to-use-spark-directly/spark-scala-notebook-settings.png" lightbox="media/how-to-use-spark-directly/spark-scala-notebook-settings.png" alt-text="Screenshot of the notebook showing dropdown menu of workspace settings.":::

1. Select **New environment**.
1. Provide a new environment name.
1. Ensure that the runtime is configured for Runtime 1.3 (Spark 3.5).
1. Choose **Custom Library** from the **Libraries** folder in the left panel.

   :::image type="content" source="media/how-to-use-spark-directly/spark-scala-notebook-custom.png" lightbox="media/how-to-use-spark-directly/spark-scala-notebook-custom.png" alt-text="Screenshot of the environment showing custom library option.":::

1. Upload the two library `.jar` files you previously downloaded.
1. Click **Save**.
1. Click **Publish**, then **Publish all**, and finally **Publish**.
1. Once published, the custom libraries should have a status of success.

   :::image type="content" source="media/how-to-use-spark-directly/spark-scala-notebook-library.png" lightbox="media/how-to-use-spark-directly/spark-scala-notebook-library.png" alt-text="Screenshot of the environment with custom library files commited.":::

1. Return to the notebook and select the newly configured environment by clicking the environment dropdown, selecting **Change environment**, and choosing the name of the newly created environment.

## Connect using Spark

To connect to your Cosmos DB in Fabric database and container, specify a connection configuration to use when reading from and writing to the container.

1. Within the notebook, set online transaction processing (OLTP) configuration settings for the NoSQL account endpoint, database name, and container name.

   ```scala
   // Set configuration settings
   val config = Map(
         "spark.cosmos.accountendpoint" -> "https://YourAccountEndpoint....cosmos.fabric.microsoft.com:443/",
         "spark.cosmos.database" -> "SampleDatabase",
         "spark.cosmos.container" -> "SamplesData",
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

1. Show the schema of the data loaded into the DataFrame by using `printSchema` and ensure the schema matches the sample document structure.

   ```scala
   // Render schema    
   df.printSchema()
   ```

   ```text
   The result should look something like this.
       root
        |-- stock: integer (nullable = true)
        |-- name: string (nullable = true)
        |-- priceHistory: array (nullable = true)
        |    |-- element: struct (containsNull = true)
        |    |    |-- priceDate: string (nullable = true)
        |    |    |-- newPrice: double (nullable = true)
        |-- stars: integer (nullable = true)
        |-- description: string (nullable = true)
        |-- price: double (nullable = true)
        |-- verifiedUser: boolean (nullable = true)
        |-- reviewDate: string (nullable = true)
        |-- countryOfOrigin: string (nullable = true)
        |-- id: string (nullable = false)
        |-- category: string (nullable = true)
        |-- productId: string (nullable = true)
        |-- rareItem: boolean (nullable = true)
        |-- firstAvailable: string (nullable = true)
        |-- userName: string (nullable = true)
        |-- docType: string (nullable = true)
   ```

1. Filter the DataFrame using the `where` function.

   ```scala
   // Render filtered rows by specific document type
   df.where("docType = 'product'")
   df.show(10)
   ```

1. Filter the DataFrame using the `filter` function.

   ```scala
   // Render filtered rows by specific document type
   df.where("docType = 'product'")
   df.filter($"rareItem" === true)
   df.show(10)
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
   val queryString = "SELECT * FROM cosmosCatalog.SampleDatabase.SampleData"
   val queryDF = spark.sql(queryString)
   queryDF.show(1)
   ```

1. Query the sample dataset to retrieve a DataFrame containing a list of all products along with their lowest recorded price.

   ```scala
   // Retrieve the product data from the SampleData container
   val productPriceMinDF = spark.sql("SELECT productId,category,name, price,priceHistory FROM cosmosCatalog.SampleDatabase.SampleData WHERE SampleData.docType = 'product'")

   // Prepare an exploded result set containing one row for every member of the priceHistory array
   val explodedDF = productPriceMinDF
     .withColumn("priceHistory", explode(col("priceHistory")))
     .withColumn("priceDate", col("priceHistory.priceDate"))
     .withColumn("newPrice", col("priceHistory.newPrice"))

   // Aggregate just the lowest price ever recorded in the priceHistory
   val lowestPriceDF = explodedDF
     .filter(col("docType") === "product")
     .groupBy("productId", "name", "price", "category")
     .agg(
       min("newPrice").as("lowestPrice")
     )

   // Show 10 rows of the result data
   lowestPriceDF.show(10)
   ```

## Create a new Cosmos DB in Fabric container using Spark

1. Create a new container named `Products` by using `CREATE TABLE IF NOT EXISTS` statement. Ensure that you setthe partition key path to `/id` and enable autoscale throughput with a maximum throughput of `1000` request units per second (RU/s).

   ```scala
   // Create a products container by using the Catalog API
   spark.sql(("CREATE TABLE IF NOT EXISTS cosmosCatalog.cosmicworks.products USING cosmos.oltp TBLPROPERTIES(partitionKeyPath = '/id', autoScaleMaxThroughput = '1000')"))
   ```

1. After running the cell validate that your container is created within your Cosmos DB database.

## Write data into a Cosmos DB in Fabric container using Spark

In order to write data directly to a Cosmos DB in Fabric container, you require:

- a correctly formated DataFrame containing the container partition key and id columns
- a correctly specifid configuration for the container you wish to write to

1. All documents in Cosmos DB require an **id** property, which is also the partition key chosen for the `Producs` container. Create an `id` column on the `ProducsDF` DataFrame with the value of `productId` column.

   ```scala
   val ProductsDF = lowestPriceDF.withColumn("id", col("productId"))
   ProductsDF.show(10)
   ```

1. Create a new configuration for the `Products` container you want to write to. Remember to set the endpoint, database and container values to those of your environment. 

   ```scala
   // Configure the Cosmos DB connection information for the database and container.
   val configWrite = Map(
             "spark.cosmos.accountendpoint" -> "https://YourCosmosDBEndpoint...fabric.microsoft.com:443/",
             "spark.cosmos.database" -> "SampleDatabase",
             "spark.cosmos.container" -> "Products",
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
   val queryString = "SELECT * FROM cosmosCatalog.TestDB.Products"
   val queryDF = spark.sql(queryString)
   queryDF.show(10)
   ```

   The result should look similar to this:

   ```text
       +--------------------+-------+-----------+--------------------+-----------+--------------------+
       |                name|  price|lowestPrice|                  id|   category|           productId|
       +--------------------+-------+-----------+--------------------+-----------+--------------------+
       |Basic Speaker Min...| 384.93|     370.26|0205710a-d0f4-46f...|      Media|0205710a-d0f4-46f...|
       |Premium Mouse Min...| 278.88|     269.07|f9b8a696-90ba-41f...|Peripheral |f9b8a696-90ba-41f...|
       |Awesome Speaker 3...| 442.73|     442.73|6c6c7d08-dbe6-40a...|      Media|6c6c7d08-dbe6-40a...|
       |Luxe Computer Ult...| 283.69|     264.67|f47c260a-48b1-4b8...|Electronics|f47c260a-48b1-4b8...|
       |Premium Stand Mic...|1090.23|    1090.23|8717225c-5869-4f0...|  Accessory|8717225c-5869-4f0...|
       |Awesome Phone Sup...| 497.67|     464.41|089e86c1-c3f7-4c9...|Electronics|089e86c1-c3f7-4c9...|
       |Amazing Computer ...| 493.62|     493.62|28f95f5c-7aee-435...|Electronics|28f95f5c-7aee-435...|
       |Awesome Filter 30...| 823.36|     756.72|0dc86d42-4674-4cf...|      Other|0dc86d42-4674-4cf...|
       |Premium Speaker U...| 449.66|     429.75|bf0b673d-54e5-434...|      Media|bf0b673d-54e5-434...|
       |Amazing Mouse Pro...| 418.59|     415.69|8c8a1a10-506f-412...|Peripheral |8c8a1a10-506f-412...|
       +--------------------+-------+-----------+--------------------+-----------+--------------------+
   ```

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Frequently Asked Questions about Cosmos DB in Microsoft Fabric](faq.yml)

