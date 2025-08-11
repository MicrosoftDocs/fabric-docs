---
title: Install a different version of SynapseML on Microsoft Fabric
description: Instruction of how to install SynapseML on Fabric
ms.topic: how-to
ms.custom:
ms.author: scottpolly
author: s-polly
ms.reviewer: fsolomon
reviewer: JessicaXYWang
ms.date: 04/05/2025
---

# Install a different version of SynapseML on Fabric

SynapseML is preinstalled on Fabric. You can install other versions with %%configure.

> [!NOTE]
> Fabric notebook doesn't officially support %%configure for now, and there's no guarantee of service-level agreement or future compatibility with official releases.

## Install SynapseML with %%configure

The following example installs SynapseML v0.11.1 on Fabric. To use the example, paste it into a code cell in a notebook and run the cell:

```python
%%configure -f
{
  "name": "synapseml",
  "conf": {
      "spark.jars.packages": "com.microsoft.azure:synapseml_2.12:0.11.1,org.apache.spark:spark-avro_2.12:3.3.1",
      "spark.jars.repositories": "https://mmlspark.azureedge.net/maven",
      "spark.jars.excludes": "org.scala-lang:scala-reflect,org.apache.spark:spark-tags_2.12,org.scalactic:scalactic_2.12,org.scalatest:scalatest_2.12,com.fasterxml.jackson.core:jackson-databind",
      "spark.yarn.user.classpath.first": "true",
      "spark.sql.parquet.enableVectorizedReader": "false",
      "spark.sql.legacy.replaceDatabricksSparkAvro.enabled": "true"
  }
}
```

## Check SynapseML version

To verify a successful installation, run the following code in a cell. The version number returned should match the version number you installed (0.11.1).

```python
import synapse.ml.cognitive
print(f"SynapseML cognitive version: {synapse.ml.cognitive.__version__}")
```

```python
import synapse.ml.lightgbm
print(f"SynapseML lightgbm version: {synapse.ml.lightgbm.__version__}")
```

## Related content

- [How to use LightGBM with SynapseML](./lightgbm-overview.md)
- [How to use Azure AI services with SynapseML](./ai-services/ai-services-in-synapseml-bring-your-own-key.md)
- [How to perform the same classification task with and without SynapseML](./classification-before-and-after-synapseml.md)
