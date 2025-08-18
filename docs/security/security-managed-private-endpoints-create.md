---
title: Create and use managed private endpoints in Microsoft Fabric
description: Learn how to create and use managed private endpoints in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.custom: sfi-image-nochange, sfi-ropc-nochange
ms.date: 06/20/2025
---

# Create and  use managed private endpoints

Users with admin permissions to a Microsoft Fabric workspace can create, view, and delete managed private endpoints from the Fabric portal through the workspace settings.

* The user can also monitor the status and the approval process of the managed private endpoints from the **Network security** section of the workspace settings.

* The user can access the data sources using the private endpoint name from the Fabric Spark workloads.

## Prerequisites

A Microsoft.Network resource provider needs to be registered in the Azure subscription 

## Create a managed private endpoint

1. In a Fabric workspace, navigate to the workspace settings, select the **Network security** tab, and then select the **Create** option in the Managed Private Endpoint section.

    :::image type="content" source="./media/security-managed-private-endpoints-create/network-security-tab.png" alt-text="Screenshot of the Networks security tab in workspace settings.":::

    The **Create Managed Private endpoint** dialog opens.

    :::image type="content" source="./media/security-managed-private-endpoints-create/create-managed-private-endpoint-dialog.png" alt-text="Screenshot of the Network security tab in the workspace settings.":::

1. Specify a name for the private endpoint and copy in the resource identifier for the Azure resource. The resource identifier can be found in the properties tab on the Azure portal page. For more information, see: [How to get your Azure Resource ID](/azure/communication-services/quickstarts/voice-video-calling/get-resource-id)

    > [!NOTE]
    > Creating a managed private endpoint with a fully qualified domain name (FQDN) isn't supported.

    When done, select **Create**.  

1. When the managed private endpoint is provisioned, the Activation status change to *Succeeded*.

    :::image type="content" source="./media/security-managed-private-endpoints-create/managed-private-endpoint-provisioning-success.png" alt-text="Screenshot of managed private endpoint provisioning success indication on the Networking tab.":::

    In addition the request for the private endpoint access is sent to the data source. The data source admins are notified on the Azure portal resource pages for their data sources. There they see a pending access request with the request message.

Taking SQL server as an example, users can navigate to the Azure portal and search for the "SQL Server" resource.

1. On the Resource page, select **Networking** from the navigation menu and then select the **Private Access** tab.

   :::image type="content" source="./media/security-managed-private-endpoints-create/networking-private-access-tab.png" alt-text="Screenshot showing the Private access tab on the Networking page of a resource in the Azure portal.":::

1. Data source administrators should be able to view the active private endpoint connections and new connection requests.

    :::image type="content" source="./media/security-managed-private-endpoints-create/new-connection-requests.png" alt-text="Screenshot showing pending requests on the Private access tab.":::

1. Admins can either *Approve* or *Reject* by providing a business justification.

    :::image type="content" source="./media/security-managed-private-endpoints-create/approve-reject-request.png" alt-text="Screenshot showing the approval form.":::

1. Once the request has been approved or rejected by the data source admin, the status is updated in the Fabric workspace settings page upon refresh.

    :::image type="content" source="./media/security-managed-private-endpoints-create/endpoint-request-approved-state.png" alt-text="Screenshot showing the managed private endpoint in the approved state.":::

1. When the status changes to *approved*, the endpoint can be used in notebooks or Spark job definitions to access the data stored in the data source from Fabric workspace.

## Use managed private endpoints in Fabric

Microsoft Fabric notebooks support seamless interaction with data sources behind secured networks using managed private endpoints for data exploration and processing. Within a notebook, users can quickly read data from their protected data sources (and write data back to) their lakehouses in various file formats.

This guide provides code samples to help you get started in your own notebooks to access data from data sources such as SQL DB through managed private endpoints.

### Prerequisites

1. Access to the data source. This example looks at Azure SQL Server and Azure SQL Database.

1. Sign into Microsoft Fabric and the Azure portal.

1. Navigate to the Azure SQL Server's resource page in the Azure portal and select the **Properties** menu. Copy the Resource ID for the SQL Server that you would like to connect to from Microsoft Fabric.

1. Using the steps listed in [Create a managed private-endpoint](#create-a-managed-private-endpoint), create the managed private endpoint from the Fabric Network security settings page.

1. Once the data source administrator of the SQL server approves the new private endpoint connection request, you should be able to use the newly created Managed Private Endpoint.

### Connect to the data source from notebooks

1. Sign into the [Microsoft Fabric portal](https://app.fabric.microsoft.com).

1. Use the experience switcher on the left-hand side of your home page to switch the **Develop** experience.

1. Navigate to your desired workspace or create a new one if needed.

1. To create a notebook, select **New item** from the workspace and choose **Notebook**.

1. Now, in the notebook, by specifying the name of the SQL database and its connection properties, you can connect through the managed private endpoint connection that's set up to read the tables in the database and write them to your lakehouse in Microsoft Fabric.

1. The following PySpark code shows how to connect to an SQL database.

```pyspark
serverName = "<server_name>.database.windows.net"
database = "<database_name>"
dbPort = 1433
dbUserName = "<username>"
dbPassword = “<db password> or reference based on Keyvault>”

from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("Example") \
    .config("spark.jars.packages", "com.microsoft.azure:azure-sqldb-spark:1.0.2") \
    .config("spark.sql.catalogImplementation", "com.microsoft.azure.synapse.spark") \
    .config("spark.sql.catalog.testDB", "com.microsoft.azure.synapse.spark") \
    .config("spark.sql.catalog.testDB.spark.synapse.linkedServiceName", "AzureSqlDatabase") \ .config("spark.sql.catalog.testDB.spark.synapse.linkedServiceName.connectionString", f"jdbc:sqlserver://{serverName}:{dbPort};database={database};user={dbUserName};password={dbPassword}") \ .getOrCreate()

    
jdbcURL = "jdbc:sqlserver://{0}:{1};database={2}".format(serverName,dbPort,database)
connection = {"user":dbUserName,"password":dbPassword,"driver": "com.microsoft.sqlserver.jdbc.SQLServerDriver"}

df = spark.read.jdbc(url=jdbcURL, table = "dbo.Employee", properties=connection)
df.show()
display(df)

# Write the dataframe as a delta table in your lakehouse
df.write.mode("overwrite").format("delta").saveAsTable("Employee")

# You can also specify a custom path for the table location
# df.write.mode("overwrite").format("delta").option("path", "abfss://yourlakehouse.dfs.core.windows.net/Employee").saveAsTable("Employee")
```

Now that the connection has been established, next step is to create a data frame to read the table in the SQL Database.

## Supported data sources

Microsoft Fabric supports over 26 data sources to connect to using managed private endpoints. Users need to specify the resource identifier, which can be found in the **Properties** settings page of their data source in the Azure portal.
Ensure resource ID format is followed as shown in the following table. 

| Service| Resource ID Format|
|:-----------|:--------------|
| Cognitive Services | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.CognitiveServices/accounts/{resource-name}|
| Azure Databricks | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Databricks/workspaces/{workspace-name}|
| Azure Database for MariaDB | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.DBforMariaDB/servers/{server-name}|
| Azure Database for MySQL | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.DBforMySQL/servers/{server-name}|
| Azure Database for PostgreSQL | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{server-name}|
| Azure Cosmos DB for MongoDB | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.DocumentDB/databaseAccounts/{account-name}|
| Azure Cosmos DB for NoSQL | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.DocumentDB/databaseAccounts/{account-name}
| Azure Monitor Private Link Scopes | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Insights/privateLinkScopes/{scope-name}|
| Azure Key Vault | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.KeyVault/vaults/{vault-name}|
| Azure Data Explorer (Kusto) | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Kusto/clusters/{cluster-name}|
| Azure Machine Learning | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.MachineLearningServices/workspaces/{workspace-name}|
| Microsoft Purview | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Purview/accounts/{account-name}|
| Azure Search | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Search/searchServices/{service-name}|
| Azure SQL Database | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Sql/servers/{server-name}|
| Azure SQL Database (Azure SQL Managed Instance) | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Sql/managedInstances/{instance-name}|
| Azure Blob Storage | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Storage/storageAccounts/{storage-account-name}|
| Azure Data Lake Storage Gen2 | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Storage/storageAccounts/{storage-account-name}|
| Azure File Storage | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Storage/storageAccounts/{storage-account-name}|
| Azure Queue Storage | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Storage/storageAccounts/{storage-account-name}|
| Azure Table Storage | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Storage/storageAccounts/{storage-account-name}|
| Azure Synapse Analytics | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Synapse/workspaces/{workspace-name}|
| Azure Synapse Analytics (Artifacts) | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Synapse/workspaces/{workspace-name}|
| Azure Functions | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Web/sites/{function-app-name}|
| Azure Event Hubs | /subscriptions/{subscription-id}/resourcegroups/{resource-group-name}/providers/Microsoft.EventHub/namespaces/{namespace-name}
| Azure IoT Hub | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Devices/IotHubs/{iothub-name}
| Azure Data Manager for Energy (ADME) | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.OpenEnergyPlatform/energyServices/{service-name} |
Please note creating managed private endpoint to a private link service for your Fabric tenant isn't supported. 

## Related content

* [About managed private endpoints in Fabric](./security-managed-private-endpoints-overview.md)
* [About private links in Fabric](./security-private-links-overview.md)
* [Overview of managed virtual networks in Fabric](./security-managed-vnets-fabric-overview.md)
