---
title: Service Principal support for Semantic Link
description: How to use Service Principal for Semantic Link.
ms.author: jburchel
author: jonburchel
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: how-to
ms.custom: 
ms.date: 09/01/2025
ms.search.form: Semantic Link, service principal, SPN
---

# Service principal support for semantic link

An Azure service principal (SPN) is a security identity used by applications or automation tools to access specific Azure resources. Unlike user identities, service principals are non-interactive, application-based identities that can be assigned precise permissions, making them perfect for automated processes or background services. To learn more about service principals in general, see [Application and service principal objects in Microsoft Entra ID](/entra/identity-platform/app-objects-and-service-principals).

Microsoft Fabric supports two common scenarios for using semantic link with service principal authentication:

- **Service principal triggered notebook runs**: Use a service principal to authenticate automated or scheduled notebook jobs that call semantic link, enabling non-interactive execution without a user sign-in.
- **Manually authenticate semantic link with a service principal**: Provide the service principal credentials when invoking semantic link during interactive or ad-hoc workflows.

Choose the scenario that matches your workflow and continue with the configuration steps.

> [!NOTE]
> Service principal support requires semantic link version 0.12.0 or later. The default runtime image might include an earlier version. Update the package in your notebook environment with:
> ```python
> %pip install -U semantic-link
> ```
> After installation, restart the kernel (or rerun the job) to pick up the updated package. Verify the installed version:
> ```python
> import sempy
> print(sempy.__version__)
> ```
> If you run notebooks in pipelines or via the Job Scheduler API, ensure the execution environment installs the updated package as part of the job setup.


## Using semantic link in service principal triggered notebook runs

Service-principal-triggered notebook runs refer to non-interactive notebook executions that are authenticated with a service principal. There are two scenarios:

- **Fabric Pipelines**: notebooks invoked as part of a pipeline using service principal authentication.
- **Job Scheduler API**: notebooks triggered via the [Fabric public API](/rest/api/fabric/core/job-scheduler/run-on-demand-item-job?tabs=HTTP) using service principal authentication.

By default, service-principal-triggered notebook runs require no extra configuration or code changes. The default token service automatically handles underlying authentication for Semantic Link. However, this default flow has **functional limitations** and supports only a subset of semantic link features, see the [supported semantic link functions](#supported-semantic-link-functions). To use other capabilities, you're recommended to [manually authenticate semantic link with a service principal](#manually-authenticate-semantic-link-with-a-service-principal).

### Supported semantic link functions

The following semantic link functions are supported for service principal triggered notebook runs using the default token service:

> [!NOTE]
> Service principal authentication blocks access to the personal "My workspace". Any calls that target "My workspace" fails, including functions on this supported list.

- `sempy.fabric.FabricRestClient`
- `sempy.fabric.create_folder`
- `sempy.fabric.create_lakehouse`
- `sempy.fabric.create_notebook`
- `sempy.fabric.delete_folder`
- `sempy.fabric.delete_item`
- `sempy.fabric.list_items`
- `sempy.fabric.list_folders`
- `sempy.fabric.list_datsets(..., mode='rest', endpoint='fabric')`
- `sempy.fabric.list_dataflows(..., endpoint='fabric')`
- `sempy.fabric.list_reports(..., endpoint='fabric')`
- `sempy.fabric.list_workspaces(..., endpoint='fabric')`
- `sempy.fabric.move_folder`
- `sempy.fabric.rename_folder`
- `sempy.fabric.resolve_workspace_id`
- `sempy.fabric.resolve_workspace_name`
- `sempy.fabric.resolve_workspace_name_and_id`
- `sempy.fabric.resolve_dataset_id`
- `sempy.fabric.resolve_dataset_name`
- `sempy.fabric.resolve_dataset_name_and_id`
- `sempy.fabric.resolve_folder_id`
- `sempy.fabric.resolve_folder_path`
- `sempy.fabric.resolve_item_id`
- `sempy.fabric.resolve_item_name`
- `sempy.fabric.run_notebook_job`
- `sempy.fabric.get_lakehouse_id`
- `sempy.fabric.get_workspace_id`
- `sempy.fabric.get_artifact_id`
- `sempy.fabric.get_notebook_workspace_id`

## Manually authenticate semantic link with a Service Principal

You can authenticate a service principal for interactive notebook runs in two ways:

- Use the sempy `set_service_principal` as a context manager. This is the simpler option with less code and built-in support for plain values or Key Vault references—see the [Use semantic link set service principal](#use-semantic-link-set_service_principal) section.
- Use an [Azure SDK](/azure/developer/python/sdk/azure-sdk-overview) `TokenCredential` for more control and interoperability with other Azure libraries—see the [Use Azure SDK token credential](#use-azure-sdk-token-credential) section.


### Prerequisites

1. [Create a service principal, assign roles, and create secret using Azure](/entra/identity-platform/howto-create-service-principal-portal).

2. Ensure a user with Administrator workspace role can grant access for an SPN through **Manage Access** in the Workspace.

      :::image type="content" source="media/semantic-link-service-principal-support/manage-access.png" alt-text="Screenshot from the Fabric portal of the manage access popup window.":::

### Use semantic link set_service_principal

You can set service principal authentication with plain values:

```python

import sempy.fabric as fabric
from sempy.fabric import set_service_principal

dataset = "<replace-with-your-dataset-name>"
workspace = "<replace-with-your-workspace-id>"

tenant_id = "<replace-with-your-tenant-id>"
client_id = "<replace-with-your-client-id>"
client_secret = "<replace-with-your-client-secret>"

with set_service_principal(tenant_id, client_id, client_secret=client_secret):
    fabric.run_model_bpa(dataset, workspace=workspace)
```

If you prefer not to embed secrets in the notebook, provide Key Vault references to `set_service_principal`. `set_service_principal` accepts tuples of the form (vault_url, secret_name) for secrets or certificates and resolves them at runtime, keeping credentials out of code and stored artifacts. Ensure the service principal that runs the notebook has Key Vault "get" permission for secrets and certificates.

Example:

```python

tenant_kv = ("<replace-with-your-tenant-vault-url>", "<replace-with-your-tenant-secret-name>")
client_kv = ("<replace-with-your-client-vault-url>", "<replace-with-your-client-secret-name>")
client_cert_kv = ("<replace-with-your-client-certification-vault-url>", "<replace-with-your-client-certification-secret-name>")

with set_service_principal(tenant_kv, client_kv, client_certificate=client_cert_kv):
    fabric.run_model_bpa(dataset, workspace=workspace)
```
### Use Azure SDK token credential

You can use an Azure SDK TokenCredential for more control and interoperability with other Azure libraries. Create a credential object and pass it to sempy functions or set it as the default in the Fabric Analytics SDK.

Examples:

Create a TokenCredential and pass it to sempy functions:

```python
from azure.identity import ClientSecretCredential

tenant_id = "your-tenant-id"
client_id = "your-client-id"
client_secret = "your-client-secret" 

credential = ClientSecretCredential(tenant_id, client_id, client_secret)

fabric.run_model_bpa(dataset, workspace=workspace, credential=credential)

```

Or set your TokenCredential as the default authentication from the Fabric Analytics SDK:
```python
from fabric.analytics.environment.credentials import SetFabricAnalyticsDefaultTokenCredentials

with SetFabricAnalyticsDefaultTokenCredentials(credential):
    fabric.run_model_bpa(dataset, workspace=workspace)
```

> [!NOTE]
> - Don't commit secrets to source control. Use environment variables or Key Vault references.
>- Ensure the service principal has the required roles and workspace access.
>- Service principal authentication still can't access "My workspace".

### Limitations
When you manually authenticate semantic link with a service principal, be aware of these limitations:

- Access to the personal "My workspace" is denied. Any calls that target it fails.
- The following functions aren't supported with service principal authentication:
    - `sempy.fabric.list_apps`
    - `sempy.fabric.list_dataflow_storage_accounts`
    - `sempy.fabric.evaluate_measure`
    - `sempy.fabric.read_table(..., mode='rest')`
    - `sempy.fabric.execute_tmsl`