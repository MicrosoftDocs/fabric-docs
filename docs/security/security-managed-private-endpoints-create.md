---
title: Create and use managed private endpoints in Microsoft Fabric
description: Learn how to create and use managed private endpoints in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 02/27/2024
---

# Create and  use managed private endpoints

Users with admin permissions to a Microsoft Fabric workspace can create, view, and delete managed private endpoints from the Fabric portal through the workspace settings.

* The user can also monitor the status and the approval process of the managed private endpoints from the **Network security** section of the workspace settings.

* The user can access the data sources using the private endpoint name from the Fabric Spark workloads.

## Create a managed private endpoint

1. In a Fabric workspace, navigate to the workspace settings, select the **Network security** tab, and then select the **Create** option in the Managed Private Endpoint section.

    The **Create Managed Private endpoint** dialog opens.

    :::image type="content" source="./media/security-managed-private-endpoints-create/create-managed-private-endpoint-dialog.png" alt-text="Screenshot of the Network security tab in the workspace settings.":::

1. Specify a name for the private endpoint and copy in the resource identifier for the Azure resource. The resource identifier can be found in the properties tab on the Azure Portal Page.

    When done, select **Create**.  

1. When the managed private endpoint has been provisioned, the Activation status change to *Succeeded*.

    :::image type="content" source="./media/security-managed-private-endpoints-create/managed-private-endpoint-provisioning-success.png" alt-text="Screenshot of managed private endpoint provisioning success indication on the Networking tab.":::

    In addition the request for the private endpoint access is sent to the data source. The data source admins are notified on the Azure portal resource pages for their data sources. There they will see a pending access request with the request message.

Taking SQL server as an example, users can navigate to the Azure Portal and search for the "SQL Server" resource.

1. On the Resource page, select **Networking** from the navigation menu and then select the **Private Access** tab.

   :::image type="content" source="./media/security-managed-private-endpoints-create/networking-private-access-tab.png" alt-text="Screenshot showing the Private access tab on the Networking page of a resource in the Azure portal.":::

1. Data source administrators should be able to view the active private endpoint connections and new connection requests.

    :::image type="content" source="./media/security-managed-private-endpoints-create/new-connection-requests.png" alt-text="Screenshot showing pending requests on the Private access tab.":::

1. Admins can either *Approve* or *Reject* by providing a business justification.

    :::image type="content" source="./media/security-managed-private-endpoints-create/approve-reject-request.png" alt-text="Screenshot showing the approval form.":::

1. Once the request has been approved or rejected by the data source admin, the status is updated in the Fabric workspace settings page upon refresh.

    :::image type="content" source="./media/security-managed-private-endpoints-create/endpoint-request-approved-state.png" alt-text="Screenshot showing the manage private endpoint in the approved state.":::

1. When the status has changed to approved, the endpoint can be used in notebooks or Spark job definitions to access the data stored in the data source from Fabric workspace.

## Use managed private endpoints in Fabric

Microsoft Fabric notebooks support seamless interaction with data sources behind secured networks using managed private endpoints for data exploration and processing. Within a notebook, users can quickly read data from their protected data sources (and write data back to) their lakehouses in a variety of file formats.

This guide provides code samples to help you get started in your own notebooks to access data from data sources such as SQL DB through managed private endpoints.

### Prerequisites

1. Access to the data source. This example looks at Azure SQL Server and Azure SQL Database.

1. Sign into Microsoft Fabric and the Azure portal.

1. Navigate to the Azure SQL Server's resource page in the Azure Portal and select the **Properties** menu. Copy the Resource ID for the SQL Server that you would like to connect to from Microsoft Fabric.

1. Using the steps listed in [Create a managed private-endpoint](#create-a-managed-private-endpoint), create the managed private endpoint from the Fabric Network security settings page.

1. Once the data source administrator of the SQL server has approved the new private endpoint connection request, you should be able to use the newly created Managed Private Endpoint.

### Connect to the Data Source from Notebooks

1. In the Microsoft Fabric workspace, use the experience switcher on the left-hand side of your home page to switch to the Synapse Data Engineering experience.

    :::image type="content" source="./media/security-managed-private-endpoints-create/enter-data-engineering-experience.png" alt-text="Screenshot showing how to get into the data engineering experience in Fabric.":::

1. Select **Create** and create a new notebook.

1. Now, in the notebook, by specifying the name of the SQL database and its connection properties, you can connect through the managed private endpoint connection that's been setup to read the tables in the database and write them to your lakehouse in Microsoft Fabric.

1. The following PySpark code shows how to connect to an SQL database.

```
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

Microsoft Fabric supports over 25 data sources to connect to using managed private endpoints. Users need to specify the resource identifier, which can be found in the **Properties** settings page of their data source in the Azure portal.

| Service| Resource ID Format|
|:-----------|:--------------|
| Cognitive Services | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.CognitiveServices/accounts/{resource-name}|
| Azure Databricks | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Databricks/workspaces/{workspace-name}|
| Azure Database for MariaDB | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.DBforMariaDB/servers/{server-name}|
| Azure Database for MySQL | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.DBforMySQL/servers/{server-name}|
| Azure Database for PostgreSQL | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.DBforPostgreSQL/servers/{server-name}|
| Azure Cosmos DB for MongoDB | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.DocumentDB/databaseAccounts/{account-name}|
| Azure Cosmos DB for NoSQL | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.DocumentDB/databaseAccounts/{account-name}
| Azure Monitor Private Link Scopes | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Insights/privateLinkScopes/{scope-name}|
| Azure Key Vault | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.KeyVault/vaults/{vault-name}|
| Azure Data Explorer (Kusto) | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Kusto/clusters/{cluster-name}|
| Azure Machine Learning | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.MachineLearningServices/workspaces/{workspace-name}|
| Application Gateway | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Network/applicationGateways/{gateway-name}|
| Private Link Service | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Network/privateLinkServices/{service-name}|
| Microsoft Purview | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Purview/accounts/{account-name}|
| Azure Search | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Search/searchServices/{service-name}|
| Azure SQL Database | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Sql/servers/{server-name}|
| Azure SQL Database (Managed Instance) | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Sql/managedInstances/{instance-name}|
| Azure Blob Storage | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Storage/storageAccounts/{storage-account-name}|
| Azure Data Lake Storage Gen2 | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Storage/storageAccounts/{storage-account-name}|
| Azure File Storage | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Storage/storageAccounts/{storage-account-name}|
| Azure Queue Storage | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Storage/storageAccounts/{storage-account-name}|
| Azure Table Storage | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Storage/storageAccounts/{storage-account-name}|
| Azure Synapse Analytics | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Synapse/workspaces/{workspace-name}|
| Azure Synapse Analytics (Artifacts) | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Synapse/workspaces/{workspace-name}|
| Azure Functions | /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Web/sites/{function-app-name}|

## Related content

* [About managed private endpoints in Fabric](./security-managed-private-endpoints-overview.md)
* [About private links in Fabric](./security-private-links-overview.md)
* [Overview of managed virtual networks in Fabric](./security-managed-vnets-fabric-overview.md)