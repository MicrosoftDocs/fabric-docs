---
title: Integrate OneLake with Azure Machine Learning
description: Learn how to connect to OneLake from various Azure Machine Learning experiences.
ms.reviewer: amasingh # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: how-to
ai-usage: ai-assisted
ms.date: 06/22/2026
#customer intent: As a data engineer, I want to learn how to integrate OneLake with Azure Machine Learning so that I can access and process data stored in OneLake from my Azure Machine Learning compute environments.
---

# Integrate OneLake with Azure Machine Learning

OneLake is Fabric’s open lake storage layer with Azure Storage-compatible access. It exposes Fabric data through `onelake.dfs.fabric.microsoft.com` for ADLS Gen2/DFS access and `onelake.blob.fabric.microsoft.com` for Blob API access. This article describes how Azure Machine Learning can use these surfaces through AML datastores, batch endpoint inputs and outputs, and direct `abfss://` access from notebooks or scripts.


Azure Machine Learning provides three primary integration points with OneLake:

1. **Datastores** - register a Fabric Lakehouse `Files` location as an Azure Machine Learning datastore and reference it from jobs and data assets. Azure Machine Learning also supports direct link to Fabric Lakehouse tables, but that [pattern](/azure/machine-learning/create-datastore-with-user-interface) involves a copy to ADLS Gen2 and isn't covered in this document.
1. **Batch endpoints** - invoke batch deployments with inputs and outputs that live in OneLake (today via a registered datastore or via a shortcut‑backed Blob/ADLS datastore).
1. **OneLake APIs / direct ABFSS access** - read and write OneLake directly from notebooks and scripts running on Azure Machine Learning runtime environments. 

| Integration point in Azure Machine Learning| OneLake surface | Azure Machine Learning surface | Is data copied to ADLS Gen2? | Primary URI to use in Azure Machine Learning|
|---|---|---|---|---|
| [OneLake datastore](/azure/machine-learning/how-to-datastore) | Lakehouse `/Files` section. | CLI / SDK (YAML) | No | `azureml://datastores/<name>/paths/<path>` |
| [OneLake lakehouse table (UI-linked)](/azure/machine-learning/create-datastore-with-user-interface) | Lakehouse `/Tables` section. | Azure Machine Learning studio (UI) | Yes - copied via Fabric pipeline to ADLS Gen2, then registered | `azureml://datastores/<adls_ds>/paths/<path>` |
| [Batch endpoint input/output](/azure/machine-learning/how-to-use-batch-fabric) | Lakehouse `/Files` (via ADLS shortcut). | CLI / SDK / REST | Optional | `azureml://datastores/<name>/paths/<path>` or `abfss://...` |
| [Direct OneLake API / ABFSS](/azure/machine-learning/how-to-read-write-data-v2) | `/Files` and `/Tables` | Notebooks / scripts on Azure Machine Learning compute | No | `abfss://<workspace>@onelake.dfs.fabric.microsoft.com/<lakehouse>.Lakehouse/Files/...` |

>[!NOTE] 
>`azureml://` is an Azure Machine Learning–specific URI scheme, not a storage protocol. Azure Machine Learning control plane and data runtime use it to resolve underlying storage location (Blob, ADLS Gen2, OneLake, and more) by using the connection metadata and credentials registered on the named datastore.

## OneLake as an Azure Machine Learning Datastore

A [datastore](/azure/machine-learning/how-to-datastore) is an Azure Machine Learning workspace-scoped abstraction over an external storage location (OneLake, Azure Blob, ADLS Gen2, Azure Files). It stores the connection metadata for an existing storage resource, the endpoint, container/filesystem/item, and credentials or identity configuration, without provisioning or copying the data itself. Various experiences within Azure Machine Learning can reference datastores by using a stable URI (`azureml://datastores/<name>/paths/<path>`).

>[!NOTE] 
>Azure Machine Learning studio doesn't currently list OneLake as a datastore type in the UI, but the CLI and SDK support creating and managing OneLake datastores via YAML definition.

### Connection metadata required from Microsoft Fabric

From the lakehouse item's **Properties** page in Fabric, capture:

- **Endpoint** - For OneLake, use `onelake.dfs.fabric.microsoft.com` or `onelake.blob.fabric.microsoft.com` depending on the protocol you want to use.
- **Workspace GUID**
- **Item GUID** (the lakehouse GUID)

### Create the datastore in Azure Machine Learning

`onelake-datastore.yml`:

```yaml
$schema: https://azuremlschemas.azureedge.net/latest/oneLakeDatastore.schema.json
name: <name_of_datastore>
type: onelake
description: Datastore pointing to a Microsoft Fabric lakehouse.
onelake_workspace_name: <workspace_guid>
endpoint: onelake.dfs.fabric.microsoft.com
artifact:
  type: lakehouse
  name: <item_guid>/Files   # Include /Files in the name to point at the lakehouse Files layer; omit it to point at the root of the item.
```

Using Azure CLI, create the datastore in the target Azure Machine Learning workspace. Replace the `<name_of_AML_workspace>` and `<name_of_datastore>` placeholders with the appropriate values.

```bash
az ml datastore create --file ./onelake-datastore.yml \
    --resource-group rg-amlonelake \
    --workspace-name <name_of_AML_workspace>
```
### Use a datastore in Azure Machine Learning jobs

Once an Azure Machine Learning datastore is registered, its `azureml://` URI is available for use through various experiences. The sample here demonstrates how to reference a OneLake datastore in an [Azure Machine Learning job](/azure/machine-learning/how-to-read-write-data-v2). The following URI is valid as a job `Input`/`Output`, in data asset definitions, and anywhere Azure Machine Learning accepts a datastore path except for batch endpoints, which currently don't support OneLake as a datastore type for input or output.

The following job sample copies a file from one location to another within the same OneLake datastore. You can use a mix of various supported storage targets (Blob, ADLS Gen2, OneLake) as inputs and outputs in the same job.

```yaml
type: command
command: cp ${{inputs.input_data}} ${{outputs.output_data}}
compute: azureml:<replace_with_aml_compute_target>
environment: azureml://registries/azureml/environments/sklearn-1.1/versions/4
inputs:
  input_data:
    mode: ro_mount
    path: azureml://datastores/<name_of_datastore>/paths/<folder-path>/<file-name> # Do not include /Files in the <file-name> portion of the path. Reason being that the datastore is already pointed at the /Files layer of the lakehouse via the artifact name in the datastore definition.
    type: uri_file
outputs:
  output_data:
    mode: rw_mount
    path: azureml://datastores/<name_of_datastore>/paths/<folder-path>/<file-name> # Do not include /Files in the <file-name> portion of the path. Reason being that the datastore is already pointed at the /Files layer of the lakehouse via the artifact name in the datastore definition.
    type: uri_file
    # optional: if you want to create a data asset from the output, 
    # then uncomment `name` (`name` can be set without setting `version`, and in this way, we will set `version` automatically for you)
    # name: <name_of_data_asset> # use `name` and `version` to create a data asset from the output
    # version: <version_of_data_asset>
```

### Azure Machine Learning experiences that can reference a OneLake datastore directly

| # | Azure Machine Learning surface / interface | Direction | OneLake addressing | Source |
|---|---|---|---|---|
| 1 | **Azure Machine Learning jobs - `Input` / `Output`** (CLI v2, SDK v2 `command`, `pipeline`, `sweep`) | R / W | `azureml://datastores/<onelake_ds>/paths/...` | [Access data in a job](/azure/machine-learning/how-to-read-write-data-v2) |
| 2 | **Data assets** (`uri_file`, `uri_folder`) registered against a OneLake datastore path | R (assets are read-only references) | `azureml://datastores/<onelake_ds>/paths/...` wrapped with versioning | [Create data assets](/azure/machine-learning/how-to-create-data-assets) |
| 3 | **Azure Machine Learning data runtime via `azureml-fsspec`** in notebooks/scripts on Azure Machine Learning compute | R / W | `azureml://datastores/<onelake_ds>/paths/...` opened with `fsspec.open(...)` or `AzureMachineLearningFileSystem` | [Access data from OneLake during interactive development](/azure/machine-learning/how-to-access-data-interactive) |

## OneLake with batch endpoints

Azure Machine Learning enables you to [use Fabric to access model deployment batch endpoints](/azure/machine-learning/how-to-use-batch-fabric) for long-running, asynchronous inferencing with machine learning models and pipelines.

In this pattern, the architectural goal is to keep a *single physical copy* of both the input feature data and the output predictions accessible to both platforms - Fabric and Azure Machine Learning. A file in ADLS carries two valid addresses - an `azureml://datastores/...` URI that Azure Machine Learning batch endpoints accept as input/output, and a lakehouse path (enabled through ADLS shortcut) that Fabric notebooks, pipelines, and SQL endpoints can query. This pattern involves no copy, no scheduled sync, no second source of truth. The lakehouse view and the Azure Machine Learning view are projections of the same storage account.

Batch endpoints sit between two OneLake-visible folders:

- **Inputs** - a curated `/Files` location (raw landing, scored requests, daily partitions) prepared by Fabric data engineering. Azure Machine Learning reads it via an ADLS Gen2 datastore that points at the same storage as the shortcut.
- **Outputs** - a predictions `/Files` location written by the batch job to the same ADLS Gen2 account, which appears in the lakehouse through a shortcut and is immediately available to Fabric notebooks, dataflows, or a Delta table load step.

More broadly, this pattern is well-suited to scenarios where you already have data landed in ADLS Gen2. For example, an existing data lake feeding analytics or ML workloads. Rather than migrating or duplicating that data into OneLake, a OneLake shortcut surfaces the existing ADLS location inside a Fabric lakehouse, while the same account remains registered as a datastore.

## OneLake SDK or API access from Azure Machine Learning notebooks and scripts

When code runs on an Azure Machine Learning compute (compute instance, compute cluster, or serverless compute), it can read and write to OneLake directly via `abfss://` path or its OneLake datastore path. OneLake SDK and APIs offer a flexible integration point and can be used for notebook‑driven exploration, custom training scripts, and components that need both `/Files` and `/Tables` access via Azure Machine Learning compute.

OneLake uses an `abfss://` URI for files on OneLake and it can be used as valid job input path for identity or service principal-based authentication:

```
abfss://<workspace_guid>@<endpoint>/<item_guid>/Files/<path>
```

### Performance and scalability - choosing the right reader in Azure Machine Learning

`fsspec` (and the OneLake `adlfs` backend it wraps) is a Python‑level filesystem abstraction. It's convenient for notebooks but is *not itself a parallel data engine* - its concurrency is bounded by a single Python process. Performance therefore depends on the reader and engine sitting on top of it. The Azure Machine Learning [data runtime documentation](/azure/machine-learning/how-to-read-write-data-v2) explicitly recommends using the Azure Machine Learning data runtime over client‑side Python downloads for training data, noting observed storage throughput constraints "when the client code uses Python to download data from storage, because of Global Interpreter Lock (GIL) issues."

#### Use Azure Machine Learning Spark for large‑scale data processing on OneLake

OneLake is designed as an analytics lake, and the `abfss://` endpoint is built for the parallel, partitioned read patterns Spark uses. For TB‑scale ETL, feature engineering, or distributed training data preparation, **use Azure Machine Learning Spark over `fsspec`**, ideally on a multi‑node cluster:

- **Serverless Spark in Azure Machine Learning** or an **attached Synapse Spark pool** - run Spark jobs/notebooks inside Azure Machine Learning and read OneLake directly via `abfss://`. See [Apache Spark in Azure Machine Learning](/azure/machine-learning/apache-spark-azure-ml-concepts).

- **Fabric Spark** - Spark notebooks/jobs running inside Fabric have first‑class access to the same lakehouse and can hand off curated outputs to Azure Machine Learning via OneLake datastore.

The following example demonstrates reading a lakehouse Delta table from a Spark session in Azure Machine Learning compute:

```python
df = (
    spark.read.format("delta")
        .load(
            "abfss://<workspace_guid>@onelake.dfs.fabric.microsoft.com/"
            "<item_guid>/Tables/<table-name>"
        )
)
```

####  OneLake and Azure Machine Learning `mltable`

Currently, reading OneLake-backed data through [`mltable`](/azure/machine-learning/how-to-mltable) fails when streaming the file. Observed errors include `ScriptExecution.StreamAccess.NotFound` and `Invalid argument (os error 22)`. Azure Machine Learning compute can resolve and read OneLake via `azureml-fsspec`, `pyarrow`, or the Azure Storage Data Lake SDK against the same datastore and identity. 

In place of ML Table, consider one of the following alternatives:

- For OneLake reads, prefer **`uri_file` / `uri_folder`** data assets and load them with `azureml-fsspec` + pyarrow / pandas / polars / DuckDB (single node), or with Spark on `abfss://` (distributed). The Microsoft Learn `mltable` documentation itself notes that for a simple Parquet folder or CSV file, `uri_file` / `uri_folder` are the recommended choice.
- If `mltable` semantics are genuinely required - most commonly as an **input to AutoML**, which mandates `type: mltable` - stage the data to an ADLS Gen2 account first and build the `mltable` against that location. `mltable` is reliable on ADLS Gen2 today.
- The OneLake shortcut pattern (discussed as part of batch endpoints) is a natural fit for ML Table - the same physical file lives in ADLS Gen2 (where `mltable` works) and surfaces in the Fabric lakehouse via a shortcut (where Fabric tooling sees it), with no copy.

`mltable` bundles several capabilities that `uri_file` / `uri_folder` don't provide out of the box. The following table lists the closest equivalent when you read OneLake directly.

| `mltable` capability | Alternative |
|---|---|
| **Declarative, portable read blueprint** (delimiter, encoding, header, partition size, column types) persisted as an `MLTable` file alongside the data | Pin the read settings in Python (`pyarrow.parquet.ParquetDataset`, `pandas.read_csv(...)`, `polars.scan_parquet(...)`, `duckdb.read_parquet(...)`) and keep that loader module under source control |
| **Built-in transformations** at read time (`filter`, `drop_columns`, `convert_column_types`, `take_random_sample`) | Apply the equivalents in the engine you choose - `polars` / `duckdb` lazy frames push down filters and projections similarly; Spark on `abfss://` does the same at scale |
| **Multi-source path composition** - one table spanning multiple files, folders, glob patterns, and even storage accounts | Use `fs.glob(...)` from `azureml-fsspec`, `pyarrow.dataset.dataset(paths)`, or Spark's `spark.read.parquet(*paths)` to read a list of paths as one logical dataset |
| **`eval_mount` / `eval_download` modes** in Azure Machine Learning jobs (resolve paths from the `MLTable` file at job submission, mount only what is referenced) | Materialize a curated subset upstream (Fabric notebook or Azure Machine Learning preprocessing job writes to a dedicated `/Files/curated/...` folder) and point it to `uri_folder` |
| **Versioning of the read recipe** (not just the data) via a data asset of type `mltable` | Version the loader script with the model code in Git, or pair a `uri_folder` data asset with a small loader module checked in next to the training script |
| **AutoML input—AutoML mandates `type: mltable` ([Set up AutoML training](/azure/machine-learning/how-to-configure-auto-train)) | Stage data to ADLS Gen2 (shortcut from the lakehouse keeps a single physical copy) and build the `mltable` there |

For **custom training and scoring** on OneLake, use `uri_file` / `uri_folder` plus an engine of your choice (`pyarrow` / `polars` / `duckdb` single‑node, or Spark distributed in Azure Machine Learning). These options offer same functional capabilities as `mltable` with comparable or better throughput. For **AutoML**, route through ADLS Gen2 until `mltable` over OneLake is supported. You can use a shortcut to OneLake to avoid data duplication and still have the data available in Fabric for other use cases.

## Considerations

- **Identity model.** OneLake uses the SaaS identity model, so it doesn't expose a Subscription ID. Instead of Azure role-based access control (Azure RBAC) on the storage account, access is governed by **Fabric workspace roles** (Admin, Member, Contributor, Viewer) on the target lakehouse. The OneLake datastore supports two credential modes, which are documented in [Create datastores](/azure/machine-learning/how-to-datastore). To set up the datastore and access the Fabric lakehouse, you need a user with the Fabric workspace Contributor role and the Azure Machine Learning workspace admin role.
- **Single copy of data.** The OneLake datastore and direct ABFSS access preserve OneLake's "single copy" principle. The shortcut pattern for batch endpoints preserves this principle logically but requires an ADLS Gen2 account as the underlying physical store.

- **Region co‑location.** Place the Azure Machine Learning workspace, compute, and the Fabric capacity or OneLake region in the same region to avoid cross‑region egress.
