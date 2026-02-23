---
title: Use partitioned compute in Dataflow Gen2 (Preview)
description: Overview on how to use partitioned compute for parallel processing in Dataflow Gen2 with CI/CD.
ms.reviewer: miescobar
ms.topic: how-to
ms.date: 01/28/2026
ms.custom: dataflows
---

# Use partitioned compute in Dataflow Gen2 (Preview)

> [!NOTE]
> Partitioned compute is currently in preview and only available in Dataflow Gen2 with CI/CD.

Partitioned compute is a capability of the Dataflow Gen2 engine that allows parts of your dataflow logic to run in parallel, reducing the time to complete its evaluations.

Partitioned compute targets scenarios where the Dataflow engine can efficiently fold operations that can partition the data source and process each partition in parallel. For example, in a scenario where you're connecting to multiple files stored in an Azure Data Lake Storage Gen2, you can partition the list of files from your source, efficiently retrieve the partitioned list of files using [query folding](/power-query/query-folding-basics), use the [combine files experience](/power-query/combine-files-overview), and process all files in parallel.

> [!NOTE]
> Only connectors for Azure Data Lake Storage Gen2, Fabric Lakehouse, Folder, and Azure Blob Storage emit the correct script to use partitioned compute. The connector for SharePoint doesn't support it today.

## How to set partitioned compute

In order to use this capability, you need to:

- [Enable Dataflow settings](#enable-dataflow-settings)

- [Query with partition keys](#query-with-partition-key)

### Enable Dataflow settings

Inside the Home tab of the ribbon, select the **Options** button to display its dialog. Navigate to the Scale section and enable the setting that reads **Allow use of partitioned compute**.

:::image type="content" source="media/dataflow-gen2-partitioned-compute/partitioned-compute-setting.png" alt-text="Screenshot of the partitioned compute setting inside the scale section of the options dialog.":::

Enabling this option has two purposes:

- Allows your Dataflow to use partitioned compute if discovered through your query scripts

- Experiences like the combine files will now automatically create partition keys that can be used for partitioned computed

You also need to enable the setting in the **Privacy** section to **Allow combining data from multiple sources**.

### Query with partition key

> [!NOTE]
> To use partitioned compute, make sure that your query is set to be staged.

After enabling the setting, you can use the combine files experience for a data source that uses the file system view such as Azure Data Lake Storage Gen2. When the combine files experience finalizes, you notice that your query has an **Added custom** step, which has a script similar to this:

```M code
let
    rootPath = Text.TrimEnd(Value.Metadata(Value.Type(#"Filtered hidden files"))[FileSystemTable.RootPath]?, "\"),
    combinePaths = (path1, path2) => Text.Combine({Text.TrimEnd(path1, "\"), path2}, "\"),
    getRelativePath = (path, relativeTo) => Text.Middle(path, Text.Length(relativeTo) + 1),
    withRelativePath = Table.AddColumn(#"Filtered hidden files", "Relative Path", each getRelativePath(combinePaths([Folder Path], [Name]), rootPath), type text),
    withPartitionKey = Table.ReplacePartitionKey(withRelativePath, {"Relative Path"})
in
    withPartitionKey
```

This script, and specifically the `withPartitionKey` component, drives the logic on how your Dataflow tries to partition your data and how it tries to evaluate things in parallel.

You can use the [Table.PartitionKey](/powerquery-m/table-partitionkey) function against the **Added custom** step. This function returns the partition key of the specified table. For the case above, it's the column *RelativePath*. You can get a distinct list of the values in that column to understand all the partitions that will be used during the dataflow run.

> [!IMPORTANT]
> It's important that the partition key column remains in the query in order for partitioned compute to be applied.

## Considerations and recommendations

- For scenarios where your data source doesn't support folding the transformations for your files, it's recommended that you choose partitioned compute over fast copy.

- For best performance, use this method to load data directly to staging as your destination or to a Fabric Warehouse.

- Only the latest partition run is stored in the Dataflow Staging Lakehouse and retuned by the Dataflow Connector.  Consider using  a data destination to retain data for each separate partitioned.

- Use the *Sample transform file* from the **Combine files** experience to introduce transformations that should happen in every file.

- Partitioned compute only supports a subset of transformations. The performance might vary depending on your source and set of transformations used.

- Billing for the dataflow run is based on capacity unit (CU) consumption.
