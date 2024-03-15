---
title: Install a different version of SynapseML on Microsoft Fabric
description: Instruction of how to install SynapseML on Fabric
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.reviewer: larryfr
author: JessicaXYWang
ms.author: jessiwang
ms.date: 06/12/2023
---
# Install a different version of SynapseML on Fabric

SynapseML is preinstalled on Fabric. If you want to use another version, you can install it with %%configure.

> [!NOTE]
> Fabric notebook does not officially support %%configure for now, and there's no guarantee of service-level agreement or future compatibility with official releases.

## Install SynapseML with %%configure

The following example installs SynapseML on Fabric. Please fill in `[YOUR_SYNAPSEML_VERSION]` with the desired version which can be found on the [SynapseML github page](https://github.com/microsoft/SynapseML). To use the example, paste it into a code cell in a notebook and run the cell.


```python
%%configure -f
{
  "name": "synapseml",
  "conf": {
      "spark.jars.packages": "com.microsoft.azure:synapseml_2.12:[YOUR_SYNAPSEML_VERSION],org.apache.spark:spark-avro_2.12:3.3.1",
      "spark.jars.repositories": "https://mmlspark.azureedge.net/maven",
      "spark.jars.excludes": "org.scala-lang:scala-reflect,org.apache.spark:spark-tags_2.12,org.scalactic:scalactic_2.12,org.scalatest:scalatest_2.12,com.fasterxml.jackson.core:jackson-databind",
      "spark.yarn.user.classpath.first": "true",
      "spark.sql.parquet.enableVectorizedReader": "false",
      "spark.sql.legacy.replaceDatabricksSparkAvro.enabled": "true"
  }
}
```

## Check SynapseML version

To verify that the installation was successful, run the following code in a cell. The version number returned should match the version number you installed.


```python
import synapse.ml.core
print(f"SynapseML version: {synapse.ml.core.__version__}")
```

## Related content

- [How to use LightGBM with SynapseML](lightgbm-overview.md)
- [How to use Azure AI services with SynapseML](./ai-services/ai-services-in-synapseml-bring-your-own-key.md)
- [How to perform the same classification task with and without SynapseML](classification-before-and-after-synapseml.md)
