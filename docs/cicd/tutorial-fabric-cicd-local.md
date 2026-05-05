---
title: Tutorial - Local deployment with fabric-cicd 
description: This article provides a tutorial on using the Microsoft Fabric ci-cd python library.
author: billmath
ms.author: billmath
ms.topic: tutorial
ms.custom:
ms.service: fabric
ms.date: 02/19/2026
---


# Tutorial - Local deployment with fabric-cicd 
In this tutorial, you set up a basic development environment and use the fabric-cicd python library to publish a lakehouse and notebook to a Microsoft Fabric workspace that you developed locally on your dev workstation. This tutorial is an example for developers who are working locally.

## Prerequisites

- A test workspace in Microsoft Fabric
- Admin permissions on the Fabric workspace. 
- A GitHub account (required to access demo files)
- **VS Code** or similar editor: [Download VS Code](https://code.visualstudio.com/download)
- **Python** [Install python](https://www.python.org/downloads/)
- **Azure CLI** (used only for authentication): [Install Azure CLI](/cli/azure/install-azure-cli)


## Step 1. Download the source files

1. Fork the [Fabric-cicd repository](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/cicd/fabric-cicd-local) to your GitHub account.
2. Clone your fork to your local machine:

```pwsh
git clone https://github.com/<your-account>/fabric-samples/tree/main/docs-samples/cicd/fabric-cicd-local.git
cd fabric-samples
```


## Step 2. Install fabric-cicd
Using the terminal from within VS Code, install the fabric-cicd python library.


```bash
pip install fabric-cicd
```

>[!NOTE]
> Fabric-cicd requires python versions 3.9 to 3.12. If you're using python 3.13 or greater, you can bypass the python requirement check with the following:
>
> `pip install fabric-cicd --ignore-requires-python`
>


## Step 3. Edit the workspace id in the deploy.py script
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
## Step 4. Login with az login
Using the terminal from within VS Code, sign-in using az login.

```
az login
```
>[!NOTE]
> If you're using a trial or have no Azure subscriptions associated with your account you can use the --allow-no-subscriptions switch.
>
>`az login --allow-no-subscriptions`
>

 :::image type="content" source="media/tutorial-fabric-cicd-local/demo-1.png" alt-text="Screenshot of running az login in VS Code." lightbox="media/tutorial-fabric-cicd-local/demo-1.png":::


## Step 5. Run the script
Now run the deploy.py script. From within VS Code, go to Run -> Start Debugging. You should see the following output in the screenshot.

 :::image type="content" source="media/tutorial-fabric-cicd-local/demo-2.png" alt-text="Screenshot of running deploy.py in VS Code." lightbox="media/tutorial-fabric-cicd-local/demo-2.png":::

## Step 6. Verify the items were created
Once the script completes, check your Fabric workspace. You should see the new lakehouse and notebook. Congrats you're done!

 :::image type="content" source="media/tutorial-fabric-cicd-local/demo-3.png" alt-text="Screenshot of the Fabric workspace with new items." lightbox="media/tutorial-fabric-cicd-local/demo-3.png":::

## Debugging

If an error arises, or you want to have full transparency to all calls being made outside the library, enable debugging. Enabling debugging writes all API calls to the terminal. The logs can also be found in the `fabric_cicd.error.log` file.

```python
from fabric_cicd import change_log_level
change_log_level("DEBUG")
```

For comprehensive debugging information, including how to use the error log file and debug scripts, see the [Troubleshooting Guide](https://microsoft.github.io/fabric-cicd/0.1.34/how_to/troubleshooting/).