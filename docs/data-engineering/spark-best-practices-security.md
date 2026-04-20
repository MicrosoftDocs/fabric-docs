---
title: Fabric Spark Security
description: Secure Spark workloads with managed virtual networks, outbound protection, private endpoints, and secret management.
ms.reviewer: anuve
ms.topic: concept-article
ms.custom:
  - best-spark-on-azure
ms.date: 10/23/2025
---

# Fabric Spark Security

Establish a controlled execution environment, govern data egress, and enforce least privilege while enabling secure secret access.

## Managed Private Endpoint (MPE)

##### Scenario: You're a data engineer working with sensitive data in Fabric Spark. Your security team has a requirement to run all the codes in a network isolated environment for enhanced security.

- Enable Managed Virtual Network (VNets). To enable managed VNets, see [public documentation](/fabric/security/security-managed-vnets-fabric-overview).  Microsoft Fabric creates and manages [managed virtual networks](/fabric/security/security-managed-vnets-fabric-overview) (VNets) for each Fabric workspace. They provide network isolation for Fabric Spark workloads, meaning that Microsoft Fabric deploys the compute clusters in a dedicated network per workspace, removing them from the shared virtual network.

- In production, use managed VNets for the secure execution of Spark Notebooks. 

- When you create a Managed Private Endpoint (MPE), it gets created at the workspace level by default.  

- When you enable Private Link (PL) at the tenant level, the system enables managed VNets for all workspaces in the tenant. After you enable the PL setting, the system creates a managed virtual network for the workspace when you run the first Spark job (Notebook or Spark Job Definitions). The system also creates the virtual network when you perform a Lakehouse operation, such as Load to Table or a table maintenance operation (Optimize or Vacuum).

> [!NOTE]
> When you enable managed VNets, starter pools become unavailable because they run in a shared network.

## Workspace Outbound Access Protection (WS OAP)

##### Scenario: You're concerned that someone might accidentally write production data out to unauthorized destinations using Spark notebooks, and you want to control that.

Enable Workspace Outbound Access Protection (WS OAP). This ensures that outbound internet connectivity from Spark only goes to approved destinations via managed private endpoints. 

- Blocking Public Libraries: This also blocks the installation of public libraries (from PyPi, Maven, etc.). Therefore, you need to package your libraries as JARs or Wheel files and upload custom libraries to environment or to resources and install with % pip install inside the Notebooks. One thing to note is if you add it to resources and install with inline %pip install, the environment publishing time is less. This is useful for quick development and testing. To reuse the packages across various Notebooks, publishing to environment is recommended. Another method is connecting to your private repository. For more details, please refer to the [Workspace outbound access protection for data engineering workloads documentation](/fabric/security/workspace-outbound-access-protection-data-engineering#option-2-host-a-private-pypi-mirror-on-azure-storage)

##### Scenario: Should you enable WS OAP in development environments?

Consider not turning on WS OAP in development or lower workspaces because it impacts the development process. Once the Notebook or Spark Job Definitions (SJDs) are tested with public libraries, test the same Notebook with custom libraries. After proper code reviews, deploy to higher environments and then turn on WS OAP. If you want to protect even the development environment, you can enable WS OAP, but it might hinder the development process. Starter pools aren't available when you enable WS OAP.

## Accessing Azure Key Vault (AKV) from Notebook

##### Scenario: You're a data engineer and you want to connect to multiple data sources using secured credentials from Spark Notebooks.

Store the credentials securely in Azure Key Vault (AKV). Don't keep a single key vault to store all secrets. Instead, use multiple key vaults based on projects/domains if possible.

**Accessing Azure Key Vault (AKV) from Notebook**

- **Network:** We recommend protecting your AKV with firewall rules to allow access only from known networks. However, you allow Fabric Spark's IP addresses in your firewall rules. To securely connect to protected AKVs from Fabric Spark Notebooks, we recommend creating a managed private endpoint to AKV. One AKV can support only up to 64 private endpoints ([Azure subscription and service limits, quotas, and constraints](/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-private-link-limits)). 

- **Authentication:** The system executes Fabric Spark Notebooks and SJDs in the context of the user who submits the jobs/Notebooks. To access the AKV, the submitting user should have sufficient access to retrieve the secret ("Key Vault Secrets Officer"). Refer to AKV best practices: [Grant permission to applications to access an Azure key vault using Azure RBAC](/azure/key-vault/general/rbac-guide?tabs=azure-cli).

    - You can use notebookutils (previously called mssparkutils) to access the AKV using the credentials of the user running the Notebook/SJD:

    `notebookutils.credentials.getSecret('<AKV URL>', 'Secret Name')`

- In production, we don't recommend providing user access to AKVs in prod environment. Instead use service accounts to access your Key Vault (KV). Submit the notebooks/jobs using service account. 

- In some cases, the service account that submits the job has access to read secrets from AKV. 

- In some cases, this service account is usually a DevOps account that might not have access to read secrets from AKV. In such cases, credential builder is helpful to access the AKV using a different Service Principal Name (SPN).

Here's the sample Scala code snippet: 

```scala
val clientSecretCredential: ClientSecretCredential = new ClientSecretCredentialBuilder()
  .clientId("<client id here>")
  .clientSecret("<client secret here>")
  .tenantId("<tenant id here>")
  .build()

val secretClient: SecretClient = new SecretClientBuilder()
  .vaultUrl("<vault url here>")
  .credential(clientSecretCredential)
  .buildClient()

val secretName = "<your value>"
val retrievedSecret = secretClient.getSecret(secretName)
println(s"Retrieved secret: ${retrievedSecret.getValue}")
```

> [!NOTE] 
> Don't hard-code any secrets or passwords in plain text in your code. Always use a secure vault (like Azure Key Vault) to store and retrieve your secrets.

## Related content

- [Fabric Spark Best Practices Overview](./spark-best-practices-overview.md)
- [Fabric Spark Capacity and Cluster Planning](spark-best-practices-capacity-planning.md)
- [Development and Monitoring](spark-best-practices-development-monitoring.md)
