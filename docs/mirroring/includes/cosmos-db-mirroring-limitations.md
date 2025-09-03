---
author: seesharprun
ms.author: sidandrews
ms.topic: include
ms.date: 09/03/2025
---

## Schema and data changes limitations

- Deleting and adding a similar container replaces the data in the warehouse tables with only the new container's data.

- Changing the type of data in a property across multiple items cause the replicator to upcast the data where applicable. This behavior is in parity with the native delta experience. Any data that doesn't fit into the supported criteria become a null type. For example, changing an array property to a string upcasts to a null type.

- Adding new properties to items cause mirroring to seamlessly detect the new properties and add corresponding columns to the warehouse table. If item properties are removed or missing, they have a null value for the corresponding record.

- Replicating data using mirroring doesn't have a full-fidelity or well-defined schema. Mirroring automatically and continuously tracks property changes and data type (when allowed).

## Nested data limitations

- Nested JSON objects in Azure Cosmos DB items are represented as JSON strings in warehouse tables.

- Commands such as `OPENJSON`, `CROSS APPLY`, and `OUTER APPLY` are available to expand JSON string data selectively.

  - Auto schema inference through `OPENJSON` allows you to flatten and explore nested data with unknown or unpredictable nested schemas. For more information, see [how to query nested data](../../mirroring/azure-cosmos-db-how-to-query-nested.md).

- PowerQuery includes `ToJson` to expand JSON string data selectively.

- Mirroring doesn't have schema constraints on the level of nesting. For more information, see [Azure Cosmos DB analytical store schema constraints](/azure/cosmos-db/analytical-store-introduction#schema-constraints).

## Data warehouse limitations

- Warehouse can't handle JSON string columns greater than 8 KB in size. The error message for this scenario is **"JSON text is not properly formatted. Unexpected character '"' is found at position"**.

  - A current workaround is to create a shortcut of your mirrored database in Fabric Lakehouse and utilize a Spark Notebook to query your data to avoid this limitation.

- Nested data represented as a JSON string in SQL analytics endpoint and warehouse tables can commonly cause the column to increase to more than 8 KB in size. Monitoring levels of nesting and the amount of data if you receive this error message.

## Mirrored item limitations

- Enabling mirroring for an Azure Cosmos DB account in a workspace requires either the **admin** or **member** role in your workspace.

- Stopping replication disables mirroring completely.

- Starting replication again reseeds all of the target warehouse tables. This operation effectively starts mirroring from scratch.
