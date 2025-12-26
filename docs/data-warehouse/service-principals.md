---
title: Service Principals in Fabric Data Warehouse
description: Learn about service principals (SPN) as security identities for applications and tools in Fabric warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sosivara, fresantos # Microsoft alias
ms.date: 09/08/2025
ms.topic: how-to
---

# Service principals in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

An Azure service principal (SPN) is a security identity used by applications or automation tools to access specific Azure resources. 

SPNs represent application objects within a tenant and act as the identity for instances of applications, taking on the role of authenticating and authorizing those applications. Unlike user identities, service principals are non-interactive, application-based identities that can be assigned precise permissions, making them perfect for automated processes or background services. By using service principals, you can connect to your data sources securely while minimizing the risks of human error and identity-based vulnerabilities. To learn more about service principals, see [Application and service principal objects in Microsoft Entra ID](/entra/identity-platform/app-objects-and-service-principals).

## Prerequisites

1. [Create a service principal, assign roles, and secret using Azure](/entra/identity-platform/howto-create-service-principal-portal).

   > [!Note]
   > Service Principal (SPN) management is part of Entra ID administration duties. Your Entra ID administrator should provide you with the required SPN credentials (App ID, Secret, and Tenant ID). 

1. Ensure the tenant admin can enable **Service principals can use Fabric APIs** in Fabric Admin portal.
1. Ensure a user with Administrator [workspace role](workspace-roles.md) can grant access for an SPN through **Manage access** in the Workspace.

   :::image type="content" source="media/service-principals/manage-access.png" alt-text="Screenshot from the Fabric portal of the manage access popup window.":::

## Create and access warehouses through REST APIs using SPN

Users with administrator, member, or contributor [workspace role](workspace-roles.md) can use service principals for authentication to create, update, read, and delete Warehouse items via Fabric [REST APIs](/rest/api/fabric/warehouse/items). This allows you to automate repetitive tasks such as provisioning or managing warehouses without relying on user credentials.

If you use a delegated account or fixed identity (owner's identity) to create the warehouse, the warehouse uses that credential while accessing OneLake. This creates a problem when the owner leaves the organization, because the warehouse will stop working. **To avoid this, create warehouses using an SPN.**

Fabric also requires the user to sign in every 30 days to ensure a valid token is provided for security reasons. For a data warehouse, the owner needs to sign in to Fabric every 30 days. This can be automated using an SPN with the [List](/rest/api/fabric/warehouse/items/list-warehouses?tabs=HTTP) API.

:::image type="content" source="media/service-principals/create-api.png" alt-text="Screenshot of a Fabric API POST call using an SPN." lightbox="media/service-principals/create-api.png"::: 

Warehouses created by an SPN using REST APIs will be displayed in the Workspace list view in the Fabric portal, with the **Owner** name as the SPN. In the following image, a screenshot from the workspace in the Fabric portal, "Fabric Public API test app" is the SPN that created the Contoso Marketing Warehouse.

:::image type="content" source="media/service-principals/workspace-owner-list-view.png" alt-text="Screenshot from the Fabric portal of the workspace item list. A warehouse is shown. Its owner isn't a personal account but an SPN." lightbox="media/service-principals/workspace-owner-list-view.png":::

### Connect to client applications using SPN

You can connect to Fabric warehouses by using service principals with tools like SQL Server Management Studio (SSMS) 19 or higher versions.

- **Authentication**: **Microsoft Entra Service Principal**
- **User name**: Application (client) ID of the service principal (created through Azure)
- **Password**: Secret (created through Azure)

:::image type="content" source="media/service-principals/microsoft-entra-service-principal-sign-in.png" alt-text="Screenshot of signing into Fabric with an SPN in SQL Server Management Studio (SSMS)." lightbox="media/service-principals/microsoft-entra-service-principal-sign-in.png":::

### Control plane permissions

SPNs can be granted access to warehouses using [workspace roles](workspace-roles.md) through **Manage access** in the workspace. In addition, warehouses can be shared with an SPN through the Fabric portal via [Item Permissions](share-warehouse-manage-permissions.md). 

### Data plane permissions

Once warehouses are provided control plane permissions to an SPN through workspace roles or Item permissions, administrators can use T-SQL commands like `GRANT` to assign specific [data plane permissions](../security/permission-model.md#compute-permissions) to service principals, to control precisely which metadata/data and operations an SPN has access to. This is recommended to follow the principle of least privilege.

For example:

```sql
GRANT SELECT ON <table name> TO <service principal name>;
```

Once permissions are granted, SPNs can connect to client application tools like SSMS, thereby providing secure access for developers to run `COPY INTO` (with and without firewall enabled storage), and also to run any T-SQL query programmatically on a schedule with [Data Factory pipelines](../data-factory/pipeline-landing-page.md).

:::image type="content" source="media/service-principals/copy-into-example.png" alt-text="Screenshot of a query and result in SQL Server Management Studio (SSMS), where the user has accessed an Azure Storage object using the SPN." lightbox="media/service-principals/copy-into-example.png":::

### Monitor

When an SPN runs queries in the warehouse, there are various monitoring tools that provide visibility into the user or SPN that ran the query. You can find the user for query activity the following ways:

- [Dynamic management views (DMVs)](monitor-using-dmv.md): `login_name` column in `sys.dm_exec_sessions`.
- [Query Insights](query-insights.md): `login_name` column in `queryinsights.exec_requests_history` view.
- [Query activity](query-activity.md): `submitter` column in Fabric query activity.
- [Capacity metrics app](../enterprise/metrics-app.md): Compute usage for warehouse operations performed by SPN appears as the Client ID under the **User** column in Background operations drill through table.

For more information, see [Monitor Fabric Data warehouse](monitoring-overview.md).

### Takeover API

Ownership of warehouses can be changed from an SPN to user, and from a user to an SPN.

- Takeover from SPN or user to user: See [Change ownership of Fabric Warehouse with PowerShell](change-ownership.md?tabs=powershell).
    - It is not possible to set a Service Principal Name (SPN) as the owner via the Fabric portal, use PowerShell.
- Takeover from SPN or user to SPN: Use a POST call on REST API.

  ```HTTP
  POST <PowerBI Global Service FQDN>/v1.0/myorg/groups/{workspaceid}/datawarehouses/{warehouseid}/takeover
  ```

## Token renewal and initialization requirements

Service principals require token renewal every **30 days** for security purposes. Fabric doesn't support interactive authentication for SPNs, so it's a best practice to automate renewal using the OAuth 2.0 client-credentials flow. 

For quick testing, you can also manually obtain a bearer token through browser developer tools, Azure CLI, or PowerShell, and validate it with the Fabric REST API.

### Why initialization is required

Microsoft Fabric has two distinct layers:

- **Control Plane** – Handles authentication, authorization, and resource management (such as workspaces, items, and roles). All identities must first establish tokens here.
- **Data Plane** – Executes queries and data movement (such as `COPY INTO` or `OPENROWSET`). Relies on validated tokens already issued by the Control Plane.

For interactive users, the Fabric portal automatically initializes the Control Plane token. However, service principals cannot log in through the Fabric portal, so they lack the ability to bootstrap Fabric tokens implicitly. **Instead, SPNs must generate or refresh their Fabric tokens explicitly through API calls.**

#### Initial token requirement for new SPNs

For newly created service principals, you must generate the initial Fabric security token by signing in through the Fabric REST API. Until the security token is generated, you will receive error messages related to files not existing or permissions are not granted, even though the service principal does have permissions to the file.

Connecting to Warehouse through the SQL analytics endpoint connection string doesn't generate Fabric tokens for the SPN. The first successful API call with the SPN establishes the token in Fabric.

This initialization step is particularly important in scenarios where the SPN must access **external storage** using commands such as `COPY INTO` or `OPENROWSET`. Without this token bootstrap, Fabric Warehouse queries from the SPN will fail to authenticate against external storage.

You can manually test token generation and API connectivity the Azure CLI.

1. Install the Azure CLI (if you don't have it installed, [download and install Azure CLI](/cli/azure/install-azure-cli).
1. Using the Azure CLI, change the authenticated session to the SPN context.

   ```azurecli    
   az login --service-principal `
      -u <APP_ID> `
      -p <SECRET> `
      --tenant <TENANT_ID>
   ```

   Provide the following for placeholders in the script:

   - `<APP_ID>` - The application (client) ID of your service principal.
   - `<SECRET>` - the client secret of your service principal.
   - `<TENANT_ID>` - Specify your Microsoft Fabric tenant ID.

1. Retrieve your Power BI bearer token into the `$accessToken` variable.

   ```azurecli
   $accessToken = az account get-access-token `
   --resource https://api.fabric.microsoft.com `
   --query accessToken -o tsv
   ```

1. A call to any public Fabric API will establish a token for the service principal in the Fabric control plane. For example, this simple API call to list items in a workspace:

   ```azurecli
   $workspaceId = "<WORKSPACE_GUID>"
   $url = "https://api.fabric.microsoft.com/v1/workspaces/$workspaceId/items"
   $headers = @{ Authorization = "Bearer $accessToken" }
   Invoke-RestMethod -Method GET -Uri $url -Headers $headers
   ```

   Provide the following for placeholders in the script:

   - `<WORKSPACE_GUID>` The easiest way to find your workspace ID is in the URL of the Fabric site for an item in a workspace. As in Power BI, the Fabric URL contains the workspace ID, which is the unique identifier after `/groups/` in the URL, for example: `https://powerbi.com/groups/11aa111-a11a-1111-1abc-aa1111aaaa/...`. Alternatively, you can find the workspace ID in the Power BI Admin portal settings by selecting **Details** next to the workspace name.

1. The SPN is now initiated with a Fabric security token for 30 days.

1. For automation, store the secrets in [Azure Key Vault](/azure/key-vault/general/overview), and collect the secret from Azure Key Vault. 
   You'll need to `az login` with an identity that can read Key Vault secrets (RBAC or access policy). By parameterizing App ID, Secret, Tenant ID, Workspace ID, and Bearer Token, you can reuse these values across scripts or automation pipelines without rewriting each command. 
   
   For example, assign the secret to a variable and avoid storing the password as plain text:

   ```azurecli
   $spnSecret = az keyvault secret show ` 
   --vault-name <KEYVAULT_NAME> ` 
   --name <SECRET_NAME> ` 
   --query value -o tsv 
   
   az login --service-principal ` 
   -u <APP_ID> ` 
   -p $spnSecret ` 
   --tenant <TENANT_ID> 
   ```

   By storing the secrets in Azure Key Vault and parameterizing the application ID, secret, tenant ID, workspace ID, and bearer token, you can reuse these values across scripts or automation pipelines without rewriting each command. 

1. Then, repeat the step above to establish a token for the service principal with a Fabric REST API call.

### Limitations

Limitations of service principals with Microsoft Fabric Data Warehouse:

- Service principal or Entra ID credentials are currently not supported for COPY INTO error files.
- Service principals are not supported for [GIT APIs](/rest/api/fabric/core/git). SPN support exists only for [Deployment pipeline APIs](/rest/api/fabric/core/deployment-pipelines).
- Service principals are currently not allowed to perform DCL operations within the warehouse. This includes `GRANT`, `REVOKE`, and `DENY` commands, regardless of the target principal's existence.
- Service principals cannot trigger operations that result in the automatic creation of user identities within the data warehouse. This includes scenarios where the system would normally attempt to create a user as part of an operation. Examples of operations that may trigger implicit user creation include:
  - `ALTER USER ... WITH DEFAULT_SCHEMA`
  - `ALTER ROLE ... ADD MEMBER`

### Related content

- [Items - Create Warehouse - REST API (Warehouse)](/rest/api/fabric/warehouse/items/create-warehouse?tabs=HTTP)
- [Service principal support in Data Factory](../data-factory/service-principals.md)
