---
title: Customer-managed keys for Fabric workspaces
description: Learn how to use workspace customer managed keys to encrypt data-at-rest in your Microsoft Fabric workspace.
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.custom:
ms.date: 10/15/2025

# Customer intent: As a Microsoft Fabric workspace administrator, I want to use customer-managed keys to encrypt my workspace data at rest.
---

# Customer-managed keys for Fabric workspaces

Microsoft Fabric encrypts all data-at-rest using Microsoft managed keys. With customer-managed keys for Fabric workspaces, you can use your [Azure Key Vault](/azure/key-vault/general/overview) keys to add another layer of protection to the data in your Microsoft Fabric workspaces - including all data in OneLake. A customer-managed key provides greater flexibility, allowing you to manage its rotation, control access, and usage auditing. It also helps organizations meet data governance needs and comply with data protection and encryption standards.

## How customer-managed keys work

All Fabric data stores are encrypted at rest with Microsoft-managed keys. Customer-managed keys use envelope encryption, where a Key Encryption Key (KEK) encrypts a Data Encryption Key (DEK). When using customer-managed keys, the Microsoft managed DEK encrypts your data, and then the DEK is encrypted using your customer-managed KEK. Use of a KEK that never leaves Key Vault allows the data encryption keys themselves to be encrypted and controlled. This ensures that all customer content in a CMK enabled workspace is encrypted using your customer-managed keys.

## Enable encryption with customer-managed keys for your workspace

Workspace admins can set up encryption using CMK at the workspace level. Once the workspace admin enables the setting in the portal, all customer content stored in that workspace is encrypted using the specified CMK. CMK integrates with AKV's access policies and role-based access control (RBAC), allowing you flexibility to define granular permissions based on your organization's security model. If you choose to disable CMK encryption later, the workspace will revert to using Microsoft-managed keys. You can also revoke the key at any time and access to the encrypted data will be blocked within an hour of revocation. With workspace level granularity and control, you elevate the security of your data in Fabric. 

## Supported items

Customer-managed keys are currently supported for the following Fabric items:
  * Lakehouse
  * Warehouse
  * Notebook
  * Environment
  * Spark Job Definition
  * API for GraphQL
  * ML model
  * Experiment
  * Pipeline
  * Dataflow
  * Industry solutions
  * Mirrored Database
  * SQL Database (preview)

This feature can't be enabled for a workspace that contains unsupported items. When customer-managed key encryption for a Fabric workspace is enabled, only supported items can be created in that workspace. To use unsupported items, create them in a different workspace that does not have this feature enabled. 

## Configure encryption with customer-managed keys for your workspace

Customer-managed key for Fabric workspaces requires an initial setup. This setup includes enabling the Fabric encryption tenant setting, configuring Azure Key Vault, and granting the Fabric Platform CMK app access to Azure Key Vault. Once the setup is complete, a user with an *admin* [workspace role](../fundamentals/roles-workspaces.md#roles-in-workspaces-in-microsoft-fabric) can enable the feature on the workspace.

### Step 1: Enable the Fabric tenant setting

A [Fabric administrator](../admin/microsoft-fabric-admin.md#power-platform-and-fabric-admin-roles) needs to make sure that the [Apply customer-managed keys](../admin/service-admin-portal-encryption.md) setting is enabled. For more information, see [Encryption tenant setting](../admin/service-admin-portal-encryption.md) article.

### Step 2: Create a Service Principal for the Fabric Platform CMK app

Fabric uses the *Fabric Platform CMK* app to access your Azure Key Vault. For the app to work, a [service principal](/entra/identity-platform/app-objects-and-service-principals?tabs=browser#service-principal-object) must be created for the tenant. This process is performed by a user that has Microsoft Entra ID privileges, such as a [Cloud Application Administrator](/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator).

Follow the instructions in [Create an enterprise application from a multitenant application in Microsoft Entra ID](/entra/identity/enterprise-apps/create-service-principal-cross-tenant) to create a service principal for an application called *Fabric Platform CMK* with app ID *61d6811f-7544-4e75-a1e6-1c59c0383311* in your Microsoft Entra ID tenant.

### Step 3: Configure Azure Key Vault

You need to configure your Key Vault so that Fabric can access it. This step is performed by a user that has Key Vault privileges, such as a [Key Vault Administrator](/azure/role-based-access-control/built-in-roles/security#key-vault-administrator). For more information, see Azure [Security](/azure/role-based-access-control/built-in-roles#security) roles.

1. Open the Azure portal and navigate to your Key Vault. If you don't have Key Vault, follow the instructions in [Create a key vault using the Azure portal](/azure/key-vault/general/quick-create-portal).

2. In your Key Vault, configure the following settings:
    * [Soft delete](/azure/key-vault/general/soft-delete-overview) -  Enabled
    * [Purge protection](/azure/key-vault/general/soft-delete-overview#purge-protection) - Enabled

3. In your Key Vault, open **Access control (IAM)**.

4. From the *Add* dropdown, select **Add Role assignment**.

5. Select the **Members** tab and then click on **Select members**.

6. In the *Select members pane*, search for **Fabric Platform CMK**

7. Select the *Fabric Platform CMK* app and then **Select**.

8. Select the **Role** tab and search for [Key Vault Crypto Service Encryption User](/azure/role-based-access-control/built-in-roles/security#key-vault-crypto-service-encryption-user) or a role that enables *get, wrapkey, and unwrap key* permissions.

9. Select **Key Vault Crypto Service Encryption User**.

10. Select **Review + assign** and then select **Review + assign** to confirm your choice.

### Step 4: Create an Azure Key Vault key

To create an Azure Key Vault key, follow the instructions in [Create a key vault using the Azure portal](/azure/key-vault/general/quick-create-portal).

### Key Vault requirements

Fabric only supports [versionless customer-managed keys](/azure/key-vault/keys/how-to-configure-key-rotation#key-rotation-policy), which are keys in the format `https://{vault-name}.vault.azure.net/{key-type}/{key-name}` for Vaults and `https://{hsm-name}.managedhsm.azure.net/{key-type}/{key-name}` for Managed HSM. Fabric checks the key vault daily for a new version, and uses the latest version available. To avoid having a period where you can't access data in the workspace after a new key is created, wait 24 hours before disabling the older version.

Key Vault and Managed HSM must have both soft-delete and purge protection enabled and the key must be of RSA or RSA-HSM type. The supported key sizes are:

* 2,048 bit
* 3,072 bit
* 4,096 bit

For more information, see [About keys](/azure/key-vault/keys/about-keys).

> [!NOTE]
> 4,096 bit keys are not supported for SQL database in Microsoft Fabric.

You can also use Azure Key Vaults for which the [firewall setting is enabled](/azure/key-vault/general/network-security#key-vault-firewall-enabled-trusted-services-only). When you disable public access to the Key Vault, you can choose the option to 'Allow Trusted Microsoft Services to bypass this firewall.'

### Step 5: Enable encryption using customer-managed keys

After completing the prerequisites, follow the steps in this section to enable customer-managed keys in your Fabric workspace.

1. From your Fabric workspace, select **Workspace settings**.

1. From the *Workspace settings* pane, select **Encryption**.

1. Enable **Apply customer-managed keys**.

1. In the **Key identifier** field, enter your customer-managed key identifier.

1. Select **Apply**.

Once you complete these steps, your workspace is encrypted with a customer-managed key. This means that all data in Onelake is encrypted and that existing and future items in the workspace will be encrypted by the customer-managed key you used for the setup. You can review the encryption status *Active, In progress or Failed* in the **Encryption** tab in workspace settings. Items for which encryption is in progress or failed are listed categorically too. The key needs to remain active in the Key Vault while encryption is in progress *(Status: In progress)*. Refresh the page to view the latest encryption status. If encryption has failed for some items in the workspace, you can retry using a different key.

## Revoke access

To revoke access to data in a workspace that's encrypted using a customer-managed key, revoke the key in the Azure Key Vault. Within 60 minutes from the time the key is revoked, read and write calls to the workspace fail.

You can revoke a customer-managed encryption key by changing the access policy, by changing the permissions on the key vault, or by deleting the key.

To reinstate access, restore access to the customer-managed key in the Key Vault.

> [!NOTE]
> The workspace does not automatically revalidate the key for SQL Database in Microsoft Fabric. Instead, the user must [manually revalidate](../database/sql/encryption.md#inaccessible-customer-managed-key) the CMK to restore access.

## Disable the encryption

To disable encrypting the workspace using a customer-managed key, go to *Workspace settings* disable **Apply customer-managed keys**. The workspace remains encrypted using Microsoft Managed keys.

> [!NOTE]
> You can't disable customer-managed keys while encryption for any of the Fabric items in your workspace is in progress.

## Monitoring

You can track encryption configuration requests for your Fabric workspaces by audit log entries. The following operation names are used in audit logs:

* ApplyWorkspaceEncryption
* DisableWorkspaceEncryption
* GetWorkspaceEncryption

## Considerations and limitations

Before you configure your Fabric workspace with a customer-managed key, consider the following limitations:

* The data listed below isn't protected with customer-managed keys:
 
  * Lakehouse column names, table format, table compression.
  * All data stored in the Spark Clusters (data stored in temp discs as part of  shuffle or data spills or RDD caches in a spark application) are not protected. This includes all the Spark Jobs from Notebooks, Lakehouses, Spark Job Definitions, Lakehouse Table Load and Maintenance jobs, Shortcut Transforms, Fabric Materialized View Refresh.
  * The job logs stored in the history server
  * Libraries attached as part of environments or added as part of the Spark session customization using magic commands are not protected
  * Metadata generated when creating a Pipeline and Copy job, such as DB name, table, schema
  * Metadata of ML model and experiment, like the model name, version, metrics
  * Warehouse queries on Object Explored and backend cache, which is evicted after each use

* CMK is supported on all [F SKUs](../enterprise/licenses.md). Trial capacities cannot be used for encryption using CMK. CMK cannot be enabled for workspaces that have BYOK enabled and CMK workspaces cannot be moved to capacities for which BYOK is enabled either.

* CMK can be enabled using the Fabric portal and does not have API support.

* CMK can be enabled and disabled for the workspace while the tenant level encryption setting is on. Once the tenant setting is turned off, you can no longer enable CMK for workspaces in that tenant or disable CMK for workspaces that already have CMK turned on in that tenant. Data in workspaces that enabled CMK before the tenant setting was turned off will remain encrypted with the customer managed key. Keep the associated key active to be able to unwrap data in that workspace. 

## Related content

* [Security fundamentals](../security/security-fundamentals.md)

* [Microsoft Fabric licenses](../enterprise/licenses.md)
