---
title: Tutorial - Local deployment with fabric-cicd
description: This article provides a tutorial on deploying Fabric items locally using the fabric-cicd Python library or the Fabric CLI deploy command.
author: billmath
ms.author: billmath
ms.topic: tutorial
ms.custom:
ms.service: fabric
ms.date: 02/19/2026
ai-usage: ai-assisted
---


# Tutorial - Local deployment with fabric-cicd
In this tutorial, you set up a basic development environment and deploy a lakehouse and notebook to a Microsoft Fabric workspace from your local dev workstation. You can choose between two approaches:

- **Python SDK** — Use the `fabric-cicd` Python library to publish items programmatically.
- **Fabric CLI** — Use the `fab deploy` command with a YAML configuration file. No Python code required.

The Fabric CLI `fab deploy` command uses the `fabric-cicd` library under the hood. Choose the approach that fits your workflow.

## Prerequisites

### [Python SDK](#tab/python-sdk)

- A test workspace in Microsoft Fabric
- Admin permissions on the Fabric workspace.
- A GitHub account (required to access demo files)
- **VS Code** or similar editor: [Download VS Code](https://code.visualstudio.com/download)
- **Python** [Install python](https://www.python.org/downloads/)
- **Azure CLI** (used only for authentication): [Install Azure CLI](/cli/azure/install-azure-cli)

### [Fabric CLI](#tab/fabric-cli)

- A test workspace in Microsoft Fabric
- Admin permissions on the Fabric workspace.
- A GitHub account (required to access demo files)
- **Python** [Install python](https://www.python.org/downloads/)

---

## Step 1. Download the source files

1. Fork the [Fabric-cicd repository](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/cicd/fabric-cicd-local) to your GitHub account.
1. Clone your fork to your local machine:

```
git clone https://github.com/<your-account>/fabric-samples/tree/main/docs-samples/cicd/fabric-cicd-local.git
cd fabric-samples
```


## Step 2. Install the deployment tool

### [Python SDK](#tab/python-sdk)

Using the terminal from within VS Code, install the fabric-cicd python library.

```bash
pip install fabric-cicd
```

### [Fabric CLI](#tab/fabric-cli)

Using the terminal, install the Fabric CLI.

```bash
pip install ms-fabric-cli
```

>[!TIP]
> If you already have the Fabric CLI installed, upgrade to the latest version to ensure the `deploy` command is available:
>
> `pip install --upgrade ms-fabric-cli`
>

Verify the installation:

```bash
fab --version
```

---

## Step 3. Configure the deployment

### [Python SDK](#tab/python-sdk)

Navigate to the **fabric-cicd-local** files that you cloned down in step 1. They're located in the samples folder. Edit the deploy.py script, replacing &lt;YOUR_WORKSPACE_ID&gt; with your id. Save the changes.

```python
from pathlib import Path
from fabric_cicd import FabricWorkspace, publish_all_items # 👈 import the function

repo_dir = Path(__file__).resolve().parent # ...\fabric_items

workspace = FabricWorkspace(
 workspace_id="<YOUR_WORKSPACE_ID>",
 repository_directory=str(repo_dir),
 # environment="DEV", # optional, but required if you use parameter replacement via parameter.yml
 # item_type_in_scope=["Notebook", "DataPipeline", "Environment"], # optional scope
)

publish_all_items(workspace) # 👈 call the function

```

### [Fabric CLI](#tab/fabric-cli)

Navigate to the **fabric-cicd-local/fabric_items** folder that you cloned down in step 1. Create a `config.yml` file in the root of the folder with the following content, replacing `<YOUR_WORKSPACE_ID>` with your workspace ID.

```yaml
core:
  workspace_id: "<YOUR_WORKSPACE_ID>"
  repository_directory: "."
```

For more configuration options, including environment-specific settings, item type scoping, and parameterization, see the [fab deploy documentation](https://microsoft.github.io/fabric-cli/commands/fs/deploy/).

---

## Step 4. Sign in

### [Python SDK](#tab/python-sdk)

Using the terminal, sign in using az login.

```
az login
```
>[!NOTE]
> If you're using a trial or have no Azure subscriptions associated with your account you can use the --allow-no-subscriptions switch.
>
>`az login --allow-no-subscriptions`
>

 :::image type="content" source="media/tutorial-fabric-cicd-local/demo-1.png" alt-text="Screenshot of running az login in VS Code." lightbox="media/tutorial-fabric-cicd-local/demo-1.png":::

### [Fabric CLI](#tab/fabric-cli)

Using the terminal, sign in using the Fabric CLI.

```bash
fab auth login
```

Follow the prompts to authenticate with your Microsoft Entra ID credentials.

---


## Step 5. Run the deployment

### [Python SDK](#tab/python-sdk)

Run the deploy.py script. From within VS Code, go to **Run** -> **Start Debugging**. You should see the following output in the screenshot.

 :::image type="content" source="media/tutorial-fabric-cicd-local/demo-2.png" alt-text="Screenshot of running deploy.py in VS Code." lightbox="media/tutorial-fabric-cicd-local/demo-2.png":::

### [Fabric CLI](#tab/fabric-cli)

Run the `fab deploy` command from the terminal, pointing to your configuration file.

```bash
fab deploy --config config.yml
```

When prompted to confirm the deployment, type `y` to proceed.

The CLI publishes all items found in the repository directory to the target workspace and unpublishes any items that no longer exist in the source.

---

## Step 6. Verify the items were created
Once the deployment completes, check your Fabric workspace. You should see the new lakehouse and notebook. Congrats you're done!

 :::image type="content" source="media/tutorial-fabric-cicd-local/demo-3.png" alt-text="Screenshot of the Fabric workspace with new items." lightbox="media/tutorial-fabric-cicd-local/demo-3.png":::
