---
title: Request Units in Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Learn how request units function as a currency and how to estimate request unit requirements in your Cosmos DB database within Microsoft Fabric during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/14/2025
appliesto:
- ✅ Cosmos DB in Fabric
---

# Request units in Cosmos DB in Microsoft Fabric (preview)

Cosmos DB in Microsoft Fabric normalizes the cost of all database operations using Request Units (or RUs, for short) and measures cost based on throughput (Request Units per second, RU/s).

Request unit is a performance currency abstracting the system resources such as processing (CPU), input/output operations (IOPS), and memory that are required to perform the database operations supported by Cosmos DB in Fabric. Whether the database operation is a write, point read, or query, operations are always measured in RUs.

For example, a point read is the name use to refer to fetching a single item by its ID and partition key value. A point read for a 1-KB item is equivalent to one Request Unit (RU).

You can categorize common database operations into specific types and make reasonable assumptions about the number of request units consumed by each operation type:

| Operation | Description |
| --- | --- |
| Read operation | Consumes one RU |
| Insert operation | Consumes a variable number of RUs |
| Upsert operation | Consumes a variable number of RUs |
| Delete operation | Consumes a variable number of RUs |
| Query operation | Consumes a variable number of RUs, potentially more than point operations |

:::image type="complex" source="media/request-units/conceptual-diagram.png" alt-text="Diagram illustrating various database operations and how they consume request units.":::
  The diagram is divided into two main sections:
  
  1. The left section explains that usage is expressed in Request Units (RUs), which are calculated based on percentages of memory, CPU, and IOPS. Icons above a box labeled "Request Unit (RUs)" visually represents these resources.
  
  1. The right section shows that database operations consume a variable number of RUs. It lists five operations: Read, Insert, Upsert, Delete, and Query.
  
      1. "Read" is shown as consuming one RU.
  
      1. "Insert," "Upsert," and "Delete" each show a variable number of RUs, indicated by multiple icons and dashed lines.
  
      1. "Query" is shown as consuming a variable number of RUs, with a longer dashed line and multiple icons.
  
  The diagram visually connects the resource usage box to the database operations, illustrating that each operation consumes RUs based on its resource requirements.
:::image-end:::

To manage and plan capacity, Cosmos DB in Fabric ensures that the number of RUs for a given database operation over a given dataset is deterministic. You can examine the response header to track the number of RUs consumed by any database operation. When you understand the factors that affect RU charges and your application's throughput requirements, you can run your application cost effectively. The next section details the previously mentioned factors that affect RU consumption.

## Considerations

While you estimate the number of RUs consumed by your workload, consider the following factors:

- **Item size**: As the size of an item increases, the number of RUs consumed to read or write the item also increases.

- **Item indexing**: By default, each item is automatically indexed. Fewer RUs are consumed if you choose not to index some of your items in a container.

- **Item property count**: Assuming the default indexing is on all properties, the number of RUs consumed to write an item increases as the item property count increases.

- **Indexed properties**: An index policy on each container determines which properties are indexed by default. To reduce the RU consumption for write operations, limit the number of indexed properties.

- **Data consistency**: The strong and bounded staleness consistency levels consume approximately two times more RUs while performing read operations when compared to that of other relaxed consistency levels.

- **Type of reads**: Point reads cost fewer RUs than queries.

- **Query patterns**: The complexity of a query affects how many RUs are consumed for an operation. Factors that affect the cost of query operations include:

  * The number of query results
  * The number of predicates
  * The nature of the predicates
  * The number of user-defined functions
  * The size of the source data
  * The size of the result set
  * Projections

  The same query on the same data always costs the same number of RUs on repeated executions.

- **Script usage**: As with queries, stored procedures and triggers consume RUs based on the complexity of the operations that are performed. As you develop your application, inspect the request charge header to better understand how much RU capacity each operation consumes.

## Multiple regions

If you assign *'R'* RUs on a Cosmos DB in Fabric container (or database), Cosmos DB in Fabric ensures that *'R'* RUs are available in *each* region associated with your Cosmos DB in Fabric account. You can't selectively assign RUs to a specific region. The RUs provisioned on a Cosmos DB in Fabric container (or database) are provisioned in all the regions associated with your Cosmos DB in Fabric account.

Assuming that a Cosmos DB in Fabric container is configured with *'R'* RUs and there are *'N'* regions associated with the Cosmos DB in Fabric account, the total RUs available globally on the container = *R* x *N*.

Your choice of consistency model also affects the throughput. You can get approximately 2x read throughput for the more relaxed consistency levels (*session*, *consistent prefix, and *eventual* consistency) compared to stronger consistency levels (*bounded staleness* or *strong* consistency).

## Related content

- [Configure a container in Cosmos DB in Microsoft Fabric](how-to-configure-container.md)
- [Explore autoscale throughput in Cosmos DB in Microsoft Fabric](autoscale-throughput.md)
