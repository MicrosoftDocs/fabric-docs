---
title: Use partitioned compute in Dataflow Gen2 (Preview)
description: Overview on how to use partitioned compute for parallel processing in Dataflow Gen2 with CI/CD.
author: ptyx507x
ms.author: miescobar
ms.reviewer: whhender
ms.topic: conceptual
ms.date: 09/15/2025
ms.custom: dataflows
---
# Use partitioned compute in Dataflow Gen2 (Preview)

>[!NOTE]
>Preview only step is currently in preview and only available in Dataflow Gen2 with CI/CD.
>Before proceeding with this article, it is recommended that you become acquainted with the 

Partitioned compute is a capability of the Dataflow Gen2 engine that allows parts of your dataflow logic to run in parallel that can in turn reduce the time that it completes its evaluations.

Partitioned compute targets scenarios where the Dataflow engine can efficiently fold operations that can partition the data source and process each partition in parallel. For example, in a scenario where you're connecting to multiple files stored in an Azure Data Lake Storage Gen2, you can partition the list of files from your source, efficiently retrieve the partitioned list of files using [query folding](/power-query/query-folding-basics), use the [combine files experience](/power-query/combine-files-overview) and process all files in parallel.

## How to set partitioned compute

In order to use this capability, you'll need to:

* Enable the partitioned compute setting in the *Options* dialog 
* Have a query that defines a partition key

### Enable the partitioned compute setting in the *Options* dialog 

Inside the Home tab of the ribbon, select the Options button to display its dialog. Navigate to the Scale section and enable the setting that reads *Allow use of partitioned compute*.

![Screenshot of the partitioned compute setting inside the scale section of the options dialog](media/dataflow-gen2-partitioned-compute/partitioned-compute-setting.png)

Enabling this option has two purposes:
* Allows your Dataflow to leverage partitioned compute if discovered through your query scripts
* Experiences like the combine files will now automatically create partition keys that can be used for partitioned computed 

### Have a query that defines a partition key




