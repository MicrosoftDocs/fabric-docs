---
title: Manage MLflow models across workspaces and platforms
description: Learn how to build machine learning operations workflows across Fabric workspaces and bring existing machine learning models into Fabric by using cross-workspace logging.
author: ruixinxu
ms.author: ruxu
ms.reviewer: mopeez
ms.topic: how-to
ms.date: 04/08/2026
ms.search.form: ML Experiment, ML Model, MLflow, cross workspace
ai-usage: ai-assisted
---

# Manage MLflow models across workspaces and platforms

Production machine learning requires more than training a good model. You need reliable workflows to move models from development through validation into production. Cross-workspace logging in Microsoft Fabric enables two key scenarios:

- **Build end-to-end machine learning operations workflows**: Train and experiment in a development workspace, validate in a test workspace, and deploy to a production-serving workspace by using standard MLflow APIs. This separation of environments helps teams enforce quality gates and maintain clear audit trails from experimentation to production.

- **Bring existing machine learning assets into Fabric**: If you already trained models in Azure Databricks, Azure Machine Learning, a local environment, or any other platform that supports MLflow, you can log those experiments and models directly into a Fabric workspace. You can easily consolidate your machine learning artifacts in one place without rebuilding your training pipelines.

Cross-workspace logging works through the `synapseml-mlflow` package, which provides a Fabric-compatible MLflow tracking plugin. You authenticate with your target workspace, set the tracking URI, and use standard MLflow commands.

> [!NOTE]
> Cross-workspace logging focuses on the *code-first experience*. UI integration for cross-workspace scenarios will be addressed in a future release.

## Prerequisites

- A [Microsoft Fabric subscription](/fabric/enterprise/licenses) or a free [Microsoft Fabric trial](/fabric/get-started/fabric-trial).
- Write permission on the target Fabric workspace.
- [A machine learning tracking system](mlflow-upgrade.md) that's upgraded for both source and target workspaces.

For Fabric notebook scenarios, create a new notebook and attach a lakehouse before you run any code.

> [!TIP]
> Cross-workspace logging is supported in workspaces with [outbound access protection](../security/workspace-outbound-access-protection-data-science.md#cross-workspace-logging-with-outbound-access-protection) enabled. Cross-workspace logging to a different workspace requires a managed private endpoint. Logging within the same workspace and from outside Fabric works without additional configuration.

## Install the MLflow plugin

The `synapseml-mlflow` package enables cross-workspace logging by providing the Fabric MLflow tracking plugin. Choose the install command based on your environment.

> [!IMPORTANT]
> MLflow 3 isn't yet supported. You must pin `mlflow-skinny` to version 2.22.2 or earlier.

### [Fabric notebook](#tab/fabric-notebook)

For a Fabric notebook, use this command to install the package with online notebook dependencies:

```python
%pip install -U "synapseml-mlflow[online-notebook]" "mlflow-skinny<=2.22.2"
```

### [Outside Fabric workspace](#tab/local)

In any environment outside Fabric, such as a local machine (Visual Studio Code, Jupyter), Azure Databricks, Azure Machine Learning, or any other platform that supports Python and MLflow, use this command:

```bash
pip install -U "synapseml-mlflow" "mlflow-skinny<=2.22.2"
```

After installation, restart the kernel before running the remaining code.

## Log MLflow objects to another Fabric workspace

In this scenario, you run a notebook in one Fabric workspace (source) and log experiments and models to a different Fabric workspace (target).

### Set the target workspace

Point to your target workspace by setting the `MLFLOW_TRACKING_URI` environment variable:

```python
import os

target_workspace_id = "<your-target-workspace-id>"
target_uri = f"sds://api.fabric.microsoft.com/v1/workspaces/{target_workspace_id}/mlflow"
os.environ["MLFLOW_TRACKING_URI"] = target_uri
```

### Log experiments and models

Create an experiment and log a run with parameters, metrics, and a model:

```python
import mlflow
import mlflow.sklearn
import numpy as np
from sklearn.linear_model import LogisticRegression
from mlflow.models.signature import infer_signature

# Create or set the experiment in the target workspace
EXP_NAME = "my-cross-workspace-experiment"
MODEL_NAME = "my-cross-workspace-model"
mlflow.set_experiment(EXP_NAME)

with mlflow.start_run() as run:
    lr = LogisticRegression()
    X = np.array([-2, -1, 0, 1, 2, 1]).reshape(-1, 1)
    y = np.array([0, 0, 1, 1, 1, 0])
    lr.fit(X, y)

    score = lr.score(X, y)
    signature = infer_signature(X, y)

    mlflow.log_params({
        "objective": "classification",
        "learning_rate": 0.05,
    })
    mlflow.log_metric("score", score)

    mlflow.sklearn.log_model(lr, "model", signature=signature)

    mlflow.register_model(
        f"runs:/{run.info.run_id}/model",
        MODEL_NAME
    )
```

After the run finishes, the experiment and registered model appear in the target workspace.

## Move MLflow objects between Fabric workspaces

In this scenario, you first log objects in the source workspace, then download the artifacts and re-log them to the target workspace. This method is useful when you need to promote a trained model from a development workspace to a production workspace.

### Step 1: Log objects in the source workspace

```python
import mlflow
import mlflow.sklearn
import numpy as np
from sklearn.linear_model import LogisticRegression
from mlflow.models.signature import infer_signature

# Log to the current (source) workspace
EXP_NAME = "source-experiment"
mlflow.set_experiment(EXP_NAME)

with mlflow.start_run() as run:
    lr = LogisticRegression()
    X = np.array([-2, -1, 0, 1, 2, 1]).reshape(-1, 1)
    y = np.array([0, 0, 1, 1, 1, 0])
    lr.fit(X, y)

    signature = infer_signature(X, y)
    mlflow.sklearn.log_model(lr, "model", signature=signature)

    source_run_id = run.info.run_id
```

### Step 2: Download artifacts from the source run

```python
import mlflow.artifacts

# Download the model artifacts locally
local_artifact_path = mlflow.artifacts.download_artifacts(
    run_id=source_run_id,
    artifact_path="model"
)
```

### Step 3: Re-log artifacts to the target workspace

```python
import os

target_workspace_id = "<your-target-workspace-id>"
target_uri = f"sds://api.fabric.microsoft.com/v1/workspaces/{target_workspace_id}/mlflow"
os.environ["MLFLOW_TRACKING_URI"] = target_uri

TARGET_EXP_NAME = "promoted-experiment"
TARGET_MODEL_NAME = "promoted-model"
mlflow.set_experiment(TARGET_EXP_NAME)

with mlflow.start_run() as run:
    mlflow.log_artifacts(local_artifact_path, "model")
    mlflow.register_model(
        f"runs:/{run.info.run_id}/model",
        TARGET_MODEL_NAME
    )
```

## Log MLflow objects from outside Fabric

You can log MLflow experiments and models to a Fabric workspace from any environment where you build your models, including:

- **Local machines**: VS Code, Jupyter notebooks, or any local Python environment.
- **Azure Databricks**: Azure Databricks notebooks and jobs.
- **Azure Machine Learning**: Azure Machine Learning compute instances and pipelines.
- **Any other platform**: Any environment that supports Python and MLflow.

### Step 1: Install the package

Install the `synapseml-mlflow` package in your environment:

```bash
pip install -U "synapseml-mlflow" "mlflow-skinny<=2.22.2"
```

### Step 2: Authenticate with Fabric

Choose an authentication method based on your environment:

#### [Interactive (`DefaultAzureCredential`)](#tab/auth-interactive)

Use this method for local development environments with browser access, such as VS Code or Jupyter.

```python
from fabric.analytics.environment.credentials import SetFabricAnalyticsDefaultTokenCredentialsGlobally
from azure.identity import DefaultAzureCredential

SetFabricAnalyticsDefaultTokenCredentialsGlobally(
    credential=DefaultAzureCredential(exclude_interactive_browser_credential=False)
)
```

#### [Device code](#tab/auth-device-code)

Use this method for environments without a browser, such as Azure Databricks notebooks or remote servers. Follow the onscreen instructions to complete authentication.

```python
from fabric.analytics.environment.credentials import SetFabricAnalyticsDefaultTokenCredentialsGlobally
from azure.identity import DeviceCodeCredential

device_code_credential = DeviceCodeCredential()
SetFabricAnalyticsDefaultTokenCredentialsGlobally(
    credential=device_code_credential
)
```

#### [Service principal](#tab/auth-spn)

Use this method for non-interactive scenarios such as automated pipelines, continuous integration and continuous delivery (CI/CD), or production workloads.

1. In Microsoft Entra ID, [create an app registration](/entra/identity-platform/quickstart-register-app).
1. Note the **Tenant ID**, **Client ID**, and create a **Client Secret**.
1. Grant write permission to the service principal on the target Fabric workspace.

```python
from fabric.analytics.environment.credentials import SetFabricAnalyticsDefaultTokenCredentialsGlobally
from azure.identity import ClientSecretCredential

spn_credential = ClientSecretCredential(
    tenant_id="<your-tenant-id>",
    client_id="<your-client-id>",
    client_secret="<your-client-secret>"
)

SetFabricAnalyticsDefaultTokenCredentialsGlobally(
    credential=spn_credential
)
```

---

### Step 3: Set the target workspace and log MLflow objects

After authentication, set the tracking URI to point to your target Fabric workspace and log experiments and models by using standard MLflow APIs:

```python
import os
import mlflow
import mlflow.sklearn
import numpy as np
from sklearn.linear_model import LogisticRegression
from mlflow.models.signature import infer_signature

target_workspace_id = "<your-target-workspace-id>"
target_uri = f"sds://api.fabric.microsoft.com/v1/workspaces/{target_workspace_id}/mlflow"
os.environ["MLFLOW_TRACKING_URI"] = target_uri

EXP_NAME = "external-experiment"
MODEL_NAME = "external-model"
mlflow.set_experiment(EXP_NAME)

with mlflow.start_run() as run:
    lr = LogisticRegression()
    X = np.array([-2, -1, 0, 1, 2, 1]).reshape(-1, 1)
    y = np.array([0, 0, 1, 1, 1, 0])
    lr.fit(X, y)

    signature = infer_signature(X, y)
    mlflow.log_metric("score", lr.score(X, y))
    mlflow.sklearn.log_model(lr, "model", signature=signature)

    mlflow.register_model(
        f"runs:/{run.info.run_id}/model",
        MODEL_NAME
    )
```

## Use cross-workspace logging with outbound access protection

If your workspace has [outbound access protection](../security/workspace-outbound-access-protection-overview.md) enabled, cross-workspace logging requires a [cross-workspace managed private endpoint](../security/workspace-outbound-access-protection-allow-list-endpoint.md#allow-outbound-access-to-another-workspace-in-the-tenant) from the source workspace to the target workspace.

Logging within the same workspace and logging from outside Fabric (local machines, Azure Databricks, Azure Machine Learning) work without additional configuration.

For details on supported scenarios and required configuration, see [Workspace outbound access protection for Fabric Data Science](../security/workspace-outbound-access-protection-data-science.md#cross-workspace-logging-with-outbound-access-protection).

### Install the package in an OAP-enabled workspace

The standard `%pip install` command requires outbound internet access, which is blocked in workspaces with outbound access protection (OAP) enabled. To install the `synapseml-mlflow` package, first download it from a non-OAP environment, then upload it to the lakehouse.

1. Download the `synapseml-mlflow` package from a machine that has internet access.

   ```bash
   pip download synapseml-mlflow[online-notebook]
   ```

1. Upload the downloaded files to the lakehouse in your OAP-enabled workspace. Upload all `.whl` files to the **Files** section of the lakehouse (for example, `/lakehouse/default/Files`).

1. Install from the lakehouse path in your Fabric notebook:

   ```python
   %pip install --no-index --find-links=/lakehouse/default/Files "synapseml-mlflow[online-notebook]>2.0.0" "mlflow-skinny<=2.22.2" --pre
   ```

1. Set the tracking URI to use the managed private endpoint. If your current workspace has OAP enabled, you must configure a [cross-workspace managed private endpoint](../security/workspace-outbound-access-protection-allow-list-endpoint.md#allow-outbound-access-to-another-workspace-in-the-tenant) from the source workspace to the target workspace. Then, route the tracking URI through the private endpoint.

   ```python
   import os
   from fabric.analytics.environment.context import FabricContext, InternalContext

   context = FabricContext(workspace_id=target_workspace_id, internal_context=InternalContext(is_wspl_enabled=True))
   print(context.pbi_shared_host)
   # You need to set up and use this private endpoint if your current workspace has OAP enabled

   os.environ["MLFLOW_TRACKING_URI"] = f"sds://{context.pbi_shared_host}/v1/workspaces/{target_workspace_id}/mlflow"
   ```

## Known limitations

- **Write permission is required**: You must have write permission on the target workspace.
- **Cross-workspace lineage isn't supported**: You can't view relationships between notebooks, experiments, and models when these objects are logged from different workspaces.
- **The source notebook isn't visible in the target workspace**: The source notebook doesn't appear in the target workspace. On artifact details and list pages, the link to the source notebook is empty.
- **Item snapshots aren't supported**: machine learning experiments or models that are logged to another workspace don't appear in the snapshot of the source-run notebook item.
- **Large language models aren't supported**: Cross-workspace logging doesn't support large language models (LLMs).

## Related content

- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)
- [Track and manage machine learning models](machine-learning-model.md)
- [Upgrade your machine learning tracking system](mlflow-upgrade.md)
- [Autolog in Microsoft Fabric](mlflow-autologging.md)
- [Git integration and deployment pipelines for machine learning experiments and models](machine-learning-artifacts-git-deployment-pipelines.md)
- [Workspace outbound access protection for Data Science](../security/workspace-outbound-access-protection-data-science.md)
