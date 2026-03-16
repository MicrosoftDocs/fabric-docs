---
title: Autoscale Throughput in Cosmos DB Database
description: Learn about the benefits and use cases for autoscale throughput in your Cosmos DB database within Microsoft Fabric.
ms.reviewer: mjbrown
ms.topic: concept-article
ms.date: 10/29/2025
show_latex: true
zone_pivot_groups: dev-lang-core
---

# Autoscale throughput in Cosmos DB in Microsoft Fabric

Cosmos DB in Microsoft Fabric supports autoscale provisioned throughput. Autoscale provisioned throughput is well suited for mission-critical workloads that have variable or unpredictable traffic patterns. Autoscale in Cosmos DB in Microsoft Fabric scales workloads based on the most active partition. For nonuniform workloads that have different workload patterns, this scaling can cause unnecessary scale-ups. Dynamic autoscale is an enhancement to autoscale provisioned throughout that helps scaling of such nonuniform workloads independently based on usage, at a per partition level. Dynamic scaling allows you to save cost if you often experience hot partitions.

## Benefits

Cosmos DB containers in Microsoft Fabric configured with autoscale provisioned throughput have the following benefits:

- **Simple:** Autoscale removes the complexity of managing throughput or manually scaling capacity.

- **Scalable:** Containers automatically scale the provisioned throughput as needed. There is no disruption to client applications.

- **Instantaneous:** Containers scale up *instantly* when needed. There is no warm-up period when additional throughput is required for sudden increases.

- **Cost-effective:** Autoscale helps optimize your RU/s usage and cost usage by scaling down when not in use. You only pay for the resources that your workloads need on a per-hour basis.

- **Highly available:** Containers using autoscale use the same fault-tolerant, highly available Azure Cosmos DB backend to ensure data durability and high availability.

## Use cases

Autoscale in Cosmos DB can be beneficial across various workloads, especially variable or unpredictable workloads. When your workloads have variable or unpredictable spikes in usage, autoscale helps by automatically scaling up and down based on usage. Examples include:

- Power BI reports or notebooks executed by users with unpredictable usage patterns.
- Development and test workloads used primarily during working hours.
- Scheduled Spark jobs with operations, or queries that you want to run during idle periods.
- Line of business applications that see peak usage a few times a month or year, and more.

Building a custom solution to these problems not only requires an enormous amount of time, but also introduces complexity in your application's configuration or code. Autoscale enables the above scenarios out of the box and removes the need for custom or manual scaling of capacity.

## Configure autoscale throughput in Cosmos DB in Microsoft Fabric

Containers created in Cosmos DB in Fabric are automatically provisioned with 5000 RU/s autoscale throughput when created in the Fabric portal. Autoscale throughput can be read and updated using the Cosmos DB SDK. Minimum autoscale throughput can be set to 1000 RU/s with a maximum of 50000 RU/s. This maximum can be increased via support ticket.

### Configure autoscale using the Azure SDK

Use the Cosmos DB SDK to set read and update autoscale throughput on a container in Cosmos DB in Microsoft Fabric.

For a complete sample for setting Cosmos DB throughput within a Fabric notebook see, [Management Operations for Cosmos DB in Fabric](https://github.com/AzureCosmosDB/cosmos-fabric-samples/tree/main/management)

:::zone pivot="dev-lang-python"

```python
database = client.get_database_client("<database-name>")
container = database.get_container_client("<container-name>")

# Get the current throughput on the container and increase it by 1000 RU/s
throughput_properties = await container.get_throughput()
autoscale_throughput = throughput_properties.auto_scale_max_throughput

print(print(f"Autoscale throughput: {autoscale_throughput}"))

new_throughput = autoscale_throughput + 1000

await container.replace_throughput(ThroughputProperties(auto_scale_max_throughput=new_throughput))

# Verify the updated throughput
updated_throughput_properties = await container.get_throughput()
print(f"Verified updated autoscale throughput: {updated_throughput_properties.auto_scale_max_throughput}")
```

:::zone-end

:::zone pivot="dev-lang-typescript"

```typescript
const database = client.database('<database-name>');
const container = database.container('<container-name>');

// Get the current throughput on the container and increase it by 1000 RU/s
const { resource: throughputProperties } = await container.offer.read();
const autoscaleThroughput = throughputProperties?.autoscaleSettings?.maxThroughput;

console.log(`Autoscale throughput: ${autoscaleThroughput}`);

const newThroughput = autoscaleThroughput + 1000;

await container.offer.replace({
    offerThroughput: undefined,
    autoscaleSettings: {
        maxThroughput: newThroughput
    }
});

// Verify the updated throughput
const { resource: updatedThroughputProperties } = await container.offer.read();
console.log(`Verified updated autoscale throughput: ${updatedThroughputProperties?.autoscaleSettings?.maxThroughput}`);
```

:::zone-end

:::zone pivot="dev-lang-csharp"

```csharp
Container container = client
    .GetDatabase("<database-name>")
    .GetContainer("<container-name>");

// Get the current throughput on the container and increase it by 1000 RU/s
ThroughputResponse throughputResponse = await container.ReadThroughputAsync();
int? autoscaleThroughput = throughputResponse.Resource.AutoscaleMaxThroughput;

Console.WriteLine($"Autoscale throughput: {autoscaleThroughput}");

int newThroughput = autoscaleThroughput.Value + 1000;

await container.ReplaceThroughputAsync(ThroughputProperties.CreateAutoscaleThroughput(newThroughput));

// Verify the updated throughput
ThroughputResponse updatedThroughputResponse = await container.ReadThroughputAsync();
Console.WriteLine($"Verified updated autoscale throughput: {updatedThroughputResponse.Resource.AutoscaleMaxThroughput}");
```

:::zone-end

## Related content

- [Configure a container in Cosmos DB in Microsoft Fabric](how-to-configure-container.md)
- [Explore request units in Cosmos DB in Microsoft Fabric](request-units.md)

