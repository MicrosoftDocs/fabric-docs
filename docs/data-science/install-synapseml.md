---
title: Install a different version of SynapseML on Microsoft Fabric
description: Install a different version of SynapseML in a Microsoft Fabric notebook by using the %%configure magic command.
ms.topic: how-to
ms.author: scottpolly
author: s-polly
ms.reviewer: ruxu
reviewer: ruixinxu
ms.date: 05/14/2026
ai-usage: ai-assisted
---

# Install a different version of SynapseML on Fabric

SynapseML (Synapse Machine Learning) is preinstalled on Microsoft Fabric. If you need a specific version, you can override it by using the `%%configure` magic command in a Fabric notebook.

## Quick start

| Step | Action | Time estimate |
|------|--------|---------------|
| 1 | Verify prerequisites (workspace, notebook) | 2 min |
| 2 | Add `%%configure` cell to install the SynapseML version you need | 1 min |
| 3 | Verify the installed version | 1 min |

## Prerequisites

Before you begin, make sure you have the following resources:

| Requirement | Details |
|---|---|
| **Microsoft Fabric workspace** | A workspace with a Fabric capacity (F2 or higher) or a Fabric trial. |
| **Fabric notebook** | Create a new notebook in the **Fabric Data Science** or **Data Engineering** experience. |
| **Fabric runtime version** | Know your workspace runtime version. The SynapseML and Spark Avro JAR versions must match the Spark version in your runtime. See [Fabric runtime versions](#synapseml-and-fabric-runtime-compatibility). |

> [!IMPORTANT]
> The `%%configure` command restarts the Spark session with new settings. Run it as the **first cell** in your notebook, before any other code. If you run it after a Spark session starts, the `-f` flag forces a session restart and all variables and state are lost.

> [!NOTE]
> The `%%configure` magic command in Fabric notebooks has limited official support. There's no guarantee of a service-level agreement (SLA) or future compatibility with official releases. For a supported approach, consider using [Fabric environment customization](/fabric/data-engineering/environment-manage-library) to manage libraries.

## SynapseML and Fabric runtime compatibility

Choose the SynapseML version and Spark Avro JAR that match your Fabric runtime Spark version:

| Fabric runtime | Spark version | SynapseML version | Spark Avro JAR |
|---|---|---|---|
| Runtime 1.1 | 3.3 | 0.11.1 through 0.11.4 | `spark-avro_2.12:3.3.1` |
| Runtime 1.2 | 3.4 | 1.0.4 through 1.0.8 | `spark-avro_2.12:3.4.1` |
| Runtime 1.3 | 3.5 | 1.0.4 through 1.0.8 | `spark-avro_2.12:3.5.1` |

You can find available SynapseML versions on [Maven Central](https://central.sonatype.com/artifact/com.microsoft.azure/synapseml_2.12/versions).

## Install SynapseML with %%configure

The `%%configure -f` command configures Spark session properties, including Maven package coordinates. The `-f` flag forces a restart of the existing session.

### Example for Fabric Runtime 1.2 (Spark 3.4)

Paste this code into the **first cell** of a new Fabric notebook and run the cell:

```python
%%configure -f
{
  "name": "synapseml",
  "conf": {
      "spark.jars.packages": "com.microsoft.azure:synapseml_2.12:1.0.8,org.apache.spark:spark-avro_2.12:3.4.1",
      "spark.jars.repositories": "https://mmlspark.azureedge.net/maven",
      "spark.jars.excludes": "org.scala-lang:scala-reflect,org.apache.spark:spark-tags_2.12,org.scalactic:scalactic_2.12,org.scalatest:scalatest_2.12,com.fasterxml.jackson.core:jackson-databind",
      "spark.yarn.user.classpath.first": "true",
      "spark.sql.parquet.enableVectorizedReader": "false",
      "spark.sql.legacy.replaceDatabricksSparkAvro.enabled": "true"
  }
}
```

To install a different version, replace the version numbers in `spark.jars.packages`:

- `synapseml_2.12:<version>`: the SynapseML version you want (for example, `1.0.4`).
- `spark-avro_2.12:<spark-version>`: must match your Fabric runtime Spark version (see [compatibility table](#synapseml-and-fabric-runtime-compatibility)).

### Example for Fabric Runtime 1.1 (Spark 3.3)

```python
%%configure -f
{
  "name": "synapseml",
  "conf": {
      "spark.jars.packages": "com.microsoft.azure:synapseml_2.12:0.11.4,org.apache.spark:spark-avro_2.12:3.3.1",
      "spark.jars.repositories": "https://mmlspark.azureedge.net/maven",
      "spark.jars.excludes": "org.scala-lang:scala-reflect,org.apache.spark:spark-tags_2.12,org.scalactic:scalactic_2.12,org.scalatest:scalatest_2.12,com.fasterxml.jackson.core:jackson-databind",
      "spark.yarn.user.classpath.first": "true",
      "spark.sql.parquet.enableVectorizedReader": "false",
      "spark.sql.legacy.replaceDatabricksSparkAvro.enabled": "true"
  }
}
```

### Verify the Spark configuration

After the cell runs, verify that the Spark session accepted the configuration. Run this code in a new cell:

```python
print(spark.conf.get("spark.jars.packages"))
```

Expected output (for the Runtime 1.2 example):

```output
com.microsoft.azure:synapseml_2.12:1.0.8,org.apache.spark:spark-avro_2.12:3.4.1
```

## Check SynapseML version

To verify the installation, run the following code in a new cell. The version number should match the version you installed.

```python
import synapse.ml.lightgbm
print(f"SynapseML version: {synapse.ml.lightgbm.__version__}")
```

Expected output (for the Runtime 1.2 example):

```output
SynapseML version: 1.0.8
```

> [!NOTE]
> In SynapseML 1.0 and later, the `synapse.ml.cognitive` module is deprecated. Use `synapse.ml.services` instead to access AI service integrations.

## Revert to the default version

To revert to the preinstalled SynapseML version, remove the `%%configure` cell and restart the notebook session:

1. Delete or comment out the `%%configure` cell.
1. Select **Session** > **Stop session** in the notebook toolbar.
1. Run any cell to start a new session with the default configuration.

## Configuration reference

The `%%configure` block includes these Spark properties:

| Property | Purpose |
|---|---|
| `spark.jars.packages` | Maven coordinates for the SynapseML JAR and Spark Avro JAR. |
| `spark.jars.repositories` | Additional Maven repository URL for SynapseML artifacts. |
| `spark.jars.excludes` | Excludes transitive dependencies that conflict with preinstalled Fabric libraries. |
| `spark.yarn.user.classpath.first` | Prioritizes user-supplied JARs over preinstalled ones. |
| `spark.sql.parquet.enableVectorizedReader` | Disables vectorized Parquet reader to avoid compatibility issues. |
| `spark.sql.legacy.replaceDatabricksSparkAvro.enabled` | Enables legacy Avro reader compatibility. |

## Troubleshooting

### %%configure cell doesn't take effect

**Cause**: The `%%configure` cell wasn't the first cell to run, or a Spark session was already active.

**Fix**: Select **Session** > **Stop session**, then run the `%%configure` cell first.

### JAR download fails or times out

**Cause**: The Maven repository is unreachable, or the version coordinates are incorrect.

**Fix**: Verify the SynapseML version exists on [Maven Central](https://central.sonatype.com/artifact/com.microsoft.azure/synapseml_2.12/versions). Check that the `spark-avro` version matches your Spark runtime version.

### ClassNotFoundException or NoSuchMethodError at runtime

**Cause**: The SynapseML version isn't compatible with the Fabric runtime Spark version.

**Fix**: Use the [compatibility table](#synapseml-and-fabric-runtime-compatibility) to select the correct version combination.

### ImportError: No module named 'synapse.ml'

**Cause**: The SynapseML Python wrapper package isn't installed in the notebook environment.

**Fix**: In a new cell, run:

```python
%pip install synapseml==1.0.8
```

Replace `1.0.8` with the version that matches the JAR you installed.

### Version number doesn't match the installed version

**Cause**: The Python `__version__` attribute comes from the `synapseml` pip package, which might differ from the JAR version installed by `%%configure`.

**Fix**: Verify both the Spark config and the pip package version:

```python
# Check the JAR version from Spark config
print("JAR packages:", spark.conf.get("spark.jars.packages"))

# Check the pip package version
import synapse.ml.lightgbm
print("Pip package version:", synapse.ml.lightgbm.__version__)
```

If the versions don't match, install the matching pip package:

```python
%pip install synapseml==1.0.8
```

## Related content

- [How to use LightGBM with SynapseML](./lightgbm-overview.md)
- [How to use AI services with SynapseML](./ai-services/ai-services-in-synapseml-bring-your-own-key.md)
- [How to perform the same classification task with and without SynapseML](./classification-before-and-after-synapseml.md)
- [Manage Apache Spark libraries in Fabric](/fabric/data-engineering/environment-manage-library)
