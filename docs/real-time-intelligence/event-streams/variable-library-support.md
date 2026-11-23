---
title: Variable Library Integration with Eventstreams
description: Use variable library references to manage connections and destination items in Microsoft Fabric eventstreams.
author: skommajo
ms.topic: how-to
ms.date: 09/24/2026
---

# Variable library integration with eventstreams

Variable library is an item type in Microsoft Fabric that provides a centralized way to define and manage configuration values at the workspace level. In an eventstream, you can use variable library references instead of entering environment-specific connections and item identifiers directly.

By using variable library integration, you can:

- Manage source connections and destination items centrally.
- Reduce hardcoded configuration in an eventstream.
- Configure different values for development, test, and production environments.
- Preserve symbolic references through deployment pipelines and Git integration.
- Simplify application lifecycle management across Fabric workspaces.

## Prerequisites

Before you begin, make sure you have:

- A Microsoft Fabric workspace assigned to a Fabric-enabled capacity.
- Permission to create and edit Fabric items in the workspace.
- An eventstream.
- A supported source connection.
- A supported destination item.
- Access to the connection and destination item referenced by the variable library.

## Create a variable library

1. Go to your Fabric workspace.
1. Select **+ New item**.
1. Search for **Variable library**.
1. Select **Variable library**.
1. Enter a name for the library.
1. Select **Create**.

After the variable library is created, add the variables that the eventstream will reference.

## Create an item-reference variable

Use an item-reference variable when an eventstream setting needs to point to another Fabric item, such as a KQL database.

1. Open the variable library.
1. Select **+ New variable**.
1. Enter a name for the variable.
1. For **Type**, select **Item reference**.
1. In the value field, open the item picker.
1. Select the destination item.
1. Select **Confirm**.
1. Select **Save**.

> [!IMPORTANT]
> For an Eventhouse destination, select the KQL database that receives the data. Don't select the parent Eventhouse.

The item-reference variable identifies the selected Fabric item and its workspace. The eventstream resolves the reference when you use the configuration.

## Create a connection-reference variable

Use a connection-reference variable when an eventstream source supports selecting a Fabric connection through variable library.

Before creating the variable, create or confirm the source connection in the eventstream.

1. Open the variable library.
1. Select **+ New variable**.
1. Enter a name for the variable.
1. For **Type**, select **Connection reference**.
1. Select the connection to use.
1. Select **Save**.

A connection-reference variable points to an existing Fabric connection. It doesn't store the connection string or credentials as a text value.

## Variable library support

> Last updated: 2026-08-27 | Audit source: [PR 1062392: Support tableName/tableNames and resolved-only public APIs](https://dev.azure.com/powerbi/MWC/_git/workload-eventstream/pullrequest/1062392) at `b34eb3f10`

This audit records variable library properties authored in the Eventstream public ALM definition carried by
Git Integration, Deployment Pipelines, and Fabric Item APIs. Workload public APIs and Eventstream Swagger
expose resolved values only and don't include these reference properties.  

| Icon | Meaning |
|------|---------|
| ✅ | Public contract has one or more variable library-enabled properties |
| ➖ | Public contract has no variable library-enabled properties |

### Summary

| Direction | ✅ Supported | ➖ No VL Properties | Total |
|-----------|-------------:|-------------------:|------:|
| Sources | 27 | 12 | 39 |
| Destinations | 5 | 1 | 6 |
| **Total** | **32** | **13** | **45** |

### Sources

| Public Source Contract | Status | VL-Enabled Public Properties |
|------------------------|--------|------------------------------|
| AmazonKinesis | ✅ | `connectionReference` |
| AmazonMSKKafka | ✅ | `connectionReference` |
| ApacheKafka | ✅ | `connectionReference` |
| AzureBlobStorageEvents | ➖ | — |
| AzureCosmosDBCDC | ✅ | `connectionReference` |
| AzureDataExplorer | ✅ | `connectionReference`, `tableNamesReference` |
| AzureEventGridNamespace | ➖ | — |
| AzureEventHub | ✅ | `connectionReference` |
| AzureEventHubExtended | ✅ | `connectionReference` |
| AzureIoTHub | ✅ | `connectionReference` |
| AzureIoTHubExtended | ✅ | `connectionReference` |
| AzureSQLDBCDC | ✅ | `connectionReference`, `tableNameReference` |
| AzureSQLMIDBCDC | ✅ | `connectionReference`, `tableNameReference` |
| AzureServiceBus | ✅ | `connectionReference` |
| BusinessEvents | ✅ | `itemReference` |
| ConfluentCloud | ✅ | `connectionReference` |
| Cribl | ➖ | — |
| CustomEndpoint | ➖ | — |
| FabricAnomalyDetectionEvents | ✅ | `itemReference` |
| FabricCapacityOperationEvents | ➖ | — |
| FabricCapacityOverviewEvents | ➖ | — |
| FabricJobEvents | ➖ | — |
| FabricOneLakeEvents | ➖ | — |
| FabricWorkspaceItemEvents | ➖ | — |
| GooglePubSub | ✅ | `connectionReference` |
| Http | ✅ | `connectionReference` |
| LakehouseChangeFeed | ✅ | `itemReference`, `tableNamesReference` |
| MirroredDatabaseChangeFeed | ✅ | `itemReference`, `tableNamesReference` |
| MongoDBCDC | ✅ | `connectionReference` |
| Mqtt | ✅ | `connectionReference` |
| MySQLCDC | ✅ | `connectionReference`, `tableNameReference` |
| OracleDBCDC | ✅ | `connectionReference`, `tableNamesReference` |
| PostgreSQLCDC | ✅ | `connectionReference`, `tableNameReference` |
| RealTimeWeather | ➖ | — |
| ReferenceLakehouse | ✅ | `itemReference` |
| SAPDatasphere | ➖ | — |
| SQLServerOnVMDBCDC | ✅ | `connectionReference`, `tableNameReference` |
| SampleData | ➖ | — |
| SolacePubSub | ✅ | `connectionReference` |

### Destinations

| Public Destination Contract | Status | VL-Enabled Public Properties |
|-----------------------------|--------|------------------------------|
| Activator | ✅ | `itemReference` |
| BusinessEvents | ✅ | `itemReference` |
| CustomEndpoint | ➖ | — |
| Eventhouse | ✅ | `itemReference`, `tableNameReference` |
| Lakehouse | ✅ | `itemReference` |
| Notebook | ✅ | `itemReference` |

## Use a connection-reference variable in an eventstream source

The following procedure uses Azure Event Hubs as an example.

1. Create a new eventstream or open an existing eventstream.
1. Select **Add source**.
1. Select **Azure Event Hubs**.
1. Configure the Event Hubs namespace, Event Hub, consumer group, data format, and other required source settings.
1. In the connection field, select **Use a variable**.
1. Select **Choose from variable library**.
1. Select the variable library.
1. Select the connection-reference variable.
1. Complete the remaining source configuration.
1. Select **Save**.
1. Select **Publish**.

After publishing, reopen the source configuration and confirm that the connection field displays the selected variable library variable. The eventstream resolves the reference to the connection in the active value set.

## Use an item-reference variable in an Eventhouse destination

Use an item-reference variable to select the KQL database for an Eventhouse destination.

1. Open the eventstream.
1. Select **Add destination**.
1. Select **Eventhouse**.
1. Keep **Event processing before ingestion** selected.
1. Turn on **Use variable** for the destination item selection.
1. Select **Choose from variable library**.
1. Select the variable library.
1. Select the item-reference variable that points to the KQL database.
1. Configure the destination table and input data format.
1. Select **Save**.
1. Select **Publish**.

> [!IMPORTANT]
> The item-reference variable must point to the destination KQL database. Don't select the parent Eventhouse.

After publishing, the eventstream resolves the item reference to the workspace and KQL database identified by the active value.

## Verify that the variables resolve correctly

After configuring the source and destination:

1. Confirm that the eventstream publishes successfully.
1. Confirm that the source and destination show an active status.
1. Send test events to the configured source.
1. Open the destination KQL database.
1. Query the destination table.
1. Confirm that the expected events appear.

If the source or destination doesn't become active, verify that:

- You selected the correct variable library.
- The expected value set is active.
- The connection-reference variable points to an accessible connection.
- The item-reference variable points to the correct destination item.
- You populated all required source and destination settings.
- You have permission to access the referenced resources.

## Create value sets for different environments

A variable library can contain alternative value sets for different environments. For example, you can configure separate values for development, test, and production.

1. Open the variable library.
1. Select **Add value set**.
1. Enter a name for the environment, such as `Test`.
1. Configure the connection-reference and item-reference values for the environment.
1. Select **Set as active** if the eventstream should use this value set.
1. Select **Create**.
1. Select **Save**.

Only one value set is active at a time. The eventstream resolves references by using the values in the active value set.

After changing the active value set:

1. Confirm that the eventstream source and destination remain active.
1. Send new test events.
1. Confirm that the events arrive in the expected destination.

## Use variable library references with deployment pipelines

Variable libraries help separate an eventstream definition from the resources used in each deployment stage.

A typical deployment sequence is:

1. Deploy the variable library to the target workspace.
1. Deploy or create the destination items in the target workspace.
1. Open the deployed variable library in the target workspace.
1. Update the item-reference variable so that it points to the destination item in the target workspace.
1. Update the connection-reference variable if the target environment uses a different connection.
1. Set the target environment's value set as active.
1. Save the variable library.
1. Deploy the eventstream.
1. Open the deployed eventstream and verify that the source and destination resolve correctly.
1. Send test events and confirm that they arrive in the target destination.

> [!IMPORTANT]
> Configure the target workspace's variable library values before validating the deployed eventstream. This prevents the eventstream from resolving to resources in the source workspace.

Repeat this process for each additional deployment stage.

## Use variable library references with Git integration

When you commit an eventstream and its variable library to Git, the eventstream definition keeps symbolic references to the library variables.  

A connection reference uses a symbolic value like the following example:  

```json
{
  "connectionReference": "$(/**/MyVariableLibrary/MyConnectionVariable)"
}
```

An item reference uses a symbolic value like the following example:  

```json
{
  "itemReference": "$(/**/MyVariableLibrary/MyDestinationVariable)"
}
```

These references identify the variable library variables by name. The system resolves environment-specific connection IDs, workspace IDs, and item IDs when the eventstream runs in the Fabric workspace.  

After committing the eventstream, review the exported definition and confirm that:  

- The source contains `connectionReference`.
- The destination contains `itemReference`.
- The references identify the expected variable library variables.
- The symbolic references aren't replaced with environment-specific identifiers.  

Commit the variable library with the items that reference it so that the required variable definitions are available in source control.

## Use variable library references with public APIs

Microsoft Fabric REST APIs support variable library references. Eventstream APIs expose the authored definition and the resolved runtime topology differently.

### List variable libraries in a workspace

Use the variable library API to retrieve the variable libraries available in a workspace:

```http
GET /v1/workspaces/{workspaceId}/variableLibraries
```

A successful response returns the variable libraries that the caller can access in the specified workspace, including each library's identifier and display name.

### Retrieve the authored Eventstream definition

Use the Eventstream **Get Definition** API to retrieve the authored definition:

```http
POST /v1/workspaces/{workspaceId}/eventstreams/{eventstreamId}/getDefinition
```

When the Eventstream is configured to use variable library references, the authored definition preserves the symbolic references:

- A source definition can contain `connectionReference`.
- A destination definition can contain `itemReference`.
- The referenced connection, workspace, and item identifiers aren't substituted for the symbolic references in the authored definition.

Preserving symbolic references keeps the authored Eventstream definition portable across workspaces, deployment pipelines, and Git repositories.

### Retrieve the resolved Eventstream topology

Use the Eventstream topology API to retrieve the resolved runtime configuration:

```http
GET /v1/workspaces/{workspaceId}/eventstreams/{eventstreamId}/topology
```

In the runtime topology:

- A connection reference resolves to a connection identifier, such as `dataConnectionId`.
- An item reference resolves to identifiers such as `workspaceId` and `itemId`.
- The corresponding runtime objects don't contain the symbolic `connectionReference` or `itemReference` properties.

For an Eventhouse destination, the resolved `itemId` identifies the destination KQL database rather than the parent Eventhouse.

### API behavior summary

| API surface | Expected representation |
|---|---|
| Variable library list | Variable library identifiers and display names available in the workspace |
| Eventstream Get Definition | Symbolic variable library references, such as `connectionReference` and `itemReference` |
| Eventstream runtime topology | Resolved connection, workspace, and item identifiers |

This separation allows the authored Eventstream definition to remain environment-independent while the runtime topology uses the concrete resources selected by the active variable library value set.

## Security considerations

Follow these practices when using variable library references:

- Don't store access tokens, connection strings, passwords, or access keys in text variables.
- Use connection-reference variables for supported Fabric connections.
- Don't include tokens or credentials in Git commits.
- Don't include secrets in exported definitions, diagnostic files, screenshots, or API output.
- Confirm that users who deploy or run the eventstream have access to the referenced resources.
- Review environment-specific values before activating a value set.

## Troubleshooting

### The source can't connect

Verify that:

- The connection-reference variable points to the intended connection.
- The connection is valid and accessible.
- Required source properties, such as the consumer group and data format, are populated.
- The correct value set is active.

### The destination can't be configured

Verify that:

- The item-reference variable points to the KQL database.
- You didn't select the parent Eventhouse.
- The destination item exists in the expected workspace.
- You have permission to access the destination.
- The destination uses a supported ingestion configuration.

### The deployed eventstream points to the wrong environment

In the target workspace:

1. Open the variable library.
1. Confirm that the target environment's value set is active.
1. Confirm that the item reference points to an item in the target workspace.
1. Confirm that the connection reference points to the intended target connection.
1. Save the variable library.
1. Reopen the eventstream and verify the resolved configuration.

### Git contains resolved identifiers

Review the eventstream definition and confirm that:

- The source uses `connectionReference`.
- The destination uses `itemReference`.
- The eventstream was configured by using **Use variable**.
- The variable library is included in the Git workflow.

## Known limitations

Consider the following limitations when planning your solution:

- Variable support depends on the Fabric item, connector, setting, and authoring experience.
- You can't configure every eventstream property through the variable library.
- Connection references are available only for supported connection types.
- Item references target supported Fabric items.
- For an Eventhouse destination, the item reference must target the KQL database rather than the parent Eventhouse.
- Destination table parameterization is separate from KQL database item selection.
- Available configuration options can differ between processed ingestion and direct ingestion.
- You must have permission to access the variable library and the resources selected by the active value set.

## Related content

- Variable library REST APIs
- [Variable library integration with pipelines](../../data-factory/variable-library-integration-with-data-pipelines.md)
- Create and manage variable libraries
- CI/CD in Microsoft Fabric
- Deployment pipelines in Microsoft Fabric
- Git integration in Microsoft Fabric
- Eventstream REST APIs
- Add an Azure Event Hubs source to an eventstream
- Add an Eventhouse destination to an eventstream
