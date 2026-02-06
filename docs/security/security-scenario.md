---
title: "Microsoft Fabric end-to-end security scenario"
description: "Learn about Microsoft Fabric security concepts and features that can help you confidently build your own analytical solution with Fabric."
author: msmimart
ms.author: mimart
ms.reviewer: vparasuraman, amasingh
ms.date: 12/12/2024
ms.topic: concept-article
ms.custom: fabric-cat, security-guidance
---

# Microsoft Fabric end-to-end security scenario

Security is a key aspect of any data analytics solution, especially when it involves sensitive or confidential data. For this reason, Microsoft Fabric provides a comprehensive set of security features that enables you to protect your data at rest and in transit, as well as control access and permissions for your users and applications.

In this article, you'll learn about Fabric security concepts and features that can help you confidently build your own analytical solution with Fabric.

## Background

This article presents a scenario where you're a data engineer who works for a healthcare organization in the United States. The organization collects and analyzes patient data that's sourced from various systems, including electronic health records, lab results, insurance claims, and wearable devices.

You plan to build a lakehouse by using the [medallion architecture](../onelake/onelake-medallion-lakehouse-architecture.md) in Fabric, which consists of three layers: bronze, silver, and gold.

- The _bronze layer_ stores the raw data as it arrives from the data sources.
- The _silver layer_ applies data quality checks and transformations to prepare the data for analysis.
- The _gold layer_ provides aggregated and enriched data for reporting and visualization.

While some data sources are located on your on-premises network, others are behind firewalls and require secure, authenticated access. There are also some data sources that are managed in Azure, such as Azure SQL Database and Azure Storage. You need to connect to these Azure data sources in a way that doesn't expose data to the public internet.

You've decided to use Fabric because it can securely ingest, store, process, and analyze your data in the cloud. Importantly, it does so while [complying](../governance/governance-compliance-overview.md) with the regulations of your industry and policies of your organization.

Because Fabric is software as a service (SaaS), you don't need to provision individual resources, such as storage or compute resources. All you need is a [Fabric capacity](../enterprise/licenses.md#capacity).

You need to set up data access requirements. Specifically, you need to ensure that only you and your fellow data engineers have access to the data in the bronze and silver layers of the lakehouse. These layers are where you plan to perform data cleansing, validation, transformation, and enrichment. You also need to restrict access to the data in the gold layer. Only authorized users, including data analysts and business users, should have access to the gold layer. They require this access to use the data for various analytical purposes, such as reporting, machine learning, and predictive analytics. Data access needs to be further restricted by the role and department of the user.

## Connect to Fabric (inbound protection)

You first set up _inbound protection_, which is concerned with how you and other users sign in and have access to Fabric.

Because Fabric is deployed to a [Microsoft Entra tenant](/microsoft-365/education/deploy/intro-azure-active-directory#what-is-an-azure-ad-tenant), authentication and authorization are handled by Microsoft Entra. You sign in with a Microsoft Entra organization account (work or school account). Next, you consider how other users will connect to Fabric.

The Microsoft Entra tenant is an _identity security boundary_ that's under the control of your IT department. Within this security boundary, the administration of Microsoft Entra objects (such as user accounts) and the configuration of tenant-wide settings are done by your IT administrators. Like any SaaS service, Fabric logically isolates tenants. Data and resources in your tenant can't ever be accessed by other tenants unless you explicitly authorize them to do so.

Here's what happens when a user signs in to Fabric.

:::image type="content" source="media/security-scenario/fabric-security-architectural-diagram.svg" alt-text="Diagram shows a high-level representation of the Fabric security architecture. Items in the diagram are described in the following table.":::

| **Item** | **Description** |
| --- | --- |
| :::image type="icon" source="../media/legend-number/legend-number-01-fabric.svg"::: | The user opens a browser (or a client application) and signs in to the [Fabric portal](https://app.fabric.microsoft.com/?pbi_source=learn-security-security-scenario). |
| :::image type="icon" source="../media/legend-number/legend-number-02-fabric.svg"::: | The user is immediately redirected to Microsoft Entra ID, and they're required to authenticate. Authentication verifies that it's the correct person signing in. |
| :::image type="icon" source="../media/legend-number/legend-number-03-fabric.svg"::: | After authentication succeeds, the web front end receives the user's request and delivers the front-end (HTML and CSS) content from the nearest location. It also routes the request to the metadata platform and backend capacity platform. |
| :::image type="icon" source="../media/legend-number/legend-number-04-fabric.svg"::: | The metadata platform, which resides in your tenant's [home region](../admin/find-fabric-home-region.md), stores your tenant's metadata, such as workspaces and access controls. This platform ensures that the user is authorized to access the relevant workspaces and Fabric items. |
| :::image type="icon" source="../media/legend-number/legend-number-05-fabric.svg"::: | The back-end capacity platform performs compute operations and stores your data. It's located in the [capacity region](../admin/service-admin-premium-multi-geo.md). When a workspace is assigned to Fabric capacity, all data that resides in the workspace, including the data lake [OneLake](../onelake/onelake-overview.md), is stored and processed in the capacity region. |

The metadata platform and the back-end capacity platform each run in secured virtual networks. These networks expose a series of secure endpoints to the internet so that they can receive requests from users and other services. Apart from these endpoints, services are protected by network security rules that block access from the public internet.

When users sign in to Fabric, you can enforce other layers of protection. That way, your tenant will only be accessible to certain users _and_ when other conditions, like network location and device compliance, are met. This layer of protection is called [inbound protection](protect-inbound-traffic.md).

In this scenario, you're responsible for sensitive patient information in Fabric. So, your organization has mandated that all users who access Fabric must perform multifactor authentication (MFA), and that they must be on the corporate network—just securing user identity isn't enough.

Your organization also provides flexibility for users by allowing them to work from anywhere and to use their personal devices. Because [Microsoft Intune](/mem/intune/fundamentals/what-is-intune) supports bring-your-own-device (BYOD), you enroll approved user devices in Intune.

Further, you need to ensure that these devices comply with the organization policies. Specifically, these policies require that devices can only connect when they have the latest operating system installed and the latest security patches. You set up these security requirements by using [Microsoft Entra Conditional Access](security-conditional-access.md).

Conditional Access offers several ways to secure your tenant. You can:

- [Grant or block access by network location.](/entra/identity/conditional-access/location-condition)
- [Block access to devices that run on unsupported operating systems](/entra/identity/conditional-access/concept-condition-filters-for-devices).
- [Require a compliant device, Intune-joined device, or MFA for all users](/entra/identity/conditional-access/howto-conditional-access-policy-compliant-device).
- [And more](/entra/identity/conditional-access/concept-conditional-access-policy-common?tabs=secure-foundation&preserve-view=true).

In the case that you need to lock down your entire Fabric tenant, you can use a virtual network and block public internet access. Access to Fabric is then only allowed from within that secure virtual network. This requirement is set up by enabling [private links at the tenant level](security-private-links-overview.md) for Fabric. It ensures that all Fabric endpoints resolve to a private IP address in your virtual network, including access to all your Power BI reports. (Enabling private endpoints impacts on many Fabric items, so you should thoroughly read [this article](security-private-links-overview.md) before enabling them.)

## Secure access to data outside of Fabric (outbound protection)

Next, you set up _outbound protection_, which is concerned with securely accessing data behind firewalls or private endpoints.

Your organization has some data sources that are located on your on-premises network. Because these data sources are behind firewalls, Fabric requires secure access. To allow Fabric to securely connect to your on-premises data source, you install an [on-premises data gateway](/data-integration/gateway/service-gateway-onprem).

The gateway can be used by [Data Factory dataflows](../data-factory/dataflows-gen2-overview.md) and [pipelines](../data-factory/pipeline-overview.md) to ingest, prepare, and transform the on-premises data, and then load it to OneLake with a [copy activity](../data-factory/copy-data-activity.md). Data Factory supports a comprehensive set of [connectors](../data-factory/connector-overview.md) that enable you to connect to more than 100 different data stores.

You then build dataflows with [Power Query](/power-query/power-query-what-is-power-query), which provides an intuitive experience with a low-code interface. You use it to ingest data from your data sources, and transform it by using any of 300+ data transformations. You then build and orchestrate a complex extract, transform, and load (ETL) process with pipelines. You ETL processes can refresh dataflows and perform many different tasks at scale, processing petabytes of data.

In this scenario, you already have multiple ETL processes. First, you have some pipelines in [Azure Data Factory (ADF)](/azure/data-factory/). Currently, these pipelines ingest your on-premises data and load it into a data lake in Azure Storage by using the [self-hosted integration runtime](/azure/data-factory/concepts-integration-runtime#self-hosted-integration-runtime). Second, you have a data ingestion framework in [Azure Databricks](/azure/databricks/) that's written in Spark.

Now that you're using Fabric, you simply redirect the output destination of the ADF pipelines to use the [lakehouse connector](../data-factory/how-to-ingest-data-into-fabric-from-azure-data-factory.md#azure-data-factory-lakehouse-connector). And, for the ingestion framework in Azure Databricks, you use the [OneLake APIs](../onelake/onelake-access-api.md) that supports the Azure Blog Filesystem (ABFS) driver to integrate [OneLake with Azure Databricks](../onelake/onelake-azure-databricks.md). (You could also use the same method to integrate [OneLake with Azure Synapse Analytics](../onelake/onelake-azure-synapse-analytics.md) by using Apache Spark.)

You also have some data sources that are in Azure SQL Database. You need to connect to these data sources by using private endpoints. In this case, you decide to set up a [virtual network (VNet) data gateway](/data-integration/vnet/overview) and use dataflows to securely connect to your Azure data and load it into Fabric. With VNet data gateways, you don't have to provision and manage the infrastructure (as you need to do for on-premises data gateway). That's because Fabric securely and dynamically creates the containers in your [Azure Virtual Network](/azure/virtual-network/virtual-networks-overview).

If you're developing or migrating your data ingestion framework in Spark, then you can connect to data sources in Azure securely and privately from Fabric [notebooks](../data-engineering/how-to-use-notebook.md) and jobs with the help of [managed private endpoints](security-managed-private-endpoints-overview.md). Managed private endpoints can be created in your Fabric workspaces to connect to data sources in Azure that have blocked public internet access. They support private endpoints, such as Azure SQL Database and Azure Storage. Managed private endpoints are provisioned and managed in a [managed VNet](security-managed-vnets-fabric-overview.md) that's dedicated to a Fabric workspace. Unlike your typical [Azure Virtual Networks](/azure/virtual-network/virtual-networks-overview), managed VNets and managed private endpoints won't be found in the Azure portal. That's because they're fully managed by Fabric, and you find them in your workspace settings.

Because you already have a lot of data stored in [Azure Data Lake Storage (ADLS) Gen2](/azure/storage/blobs/data-lake-storage-introduction) accounts, you now only need to connect Fabric workloads, such as Spark and Power BI, to it. Also, thanks to OneLake [ADLS shortcuts](../onelake/create-adls-shortcut.md), you can easily connect to your existing data from any Fabric experience, such as data integration pipelines, data engineering notebooks, and Power BI reports.

Fabric workspaces that have a [workspace identity](workspace-identity.md) can securely access ADLS Gen2 storage accounts, even when you've disabled the public network. That's made possible by [trusted workspace access](security-trusted-workspace-access.md). It allows Fabric to securely connect to the storage accounts by using a Microsoft backbone network. That means communication doesn't use the public internet, which allows you to disable public network access to the storage account but still allow certain Fabric workspaces to connect to them.

## Compliance

You want to use Fabric to securely ingest, store, process, and analyze your data in the cloud, while maintaining compliance with the regulations of your industry and the policies of your organization.

Fabric is part of Microsoft Azure Core Services, and it's governed by the [Microsoft Online Services Terms](https://www.microsoft.com/licensing/terms/product/PrivacyandSecurityTerms/MPSA) and the [Microsoft Enterprise Privacy Statement](https://privacy.microsoft.com/privacystatement). While certifications typically occur after a product launch (Generally Available, or GA), Microsoft integrates compliance best practices from the outset and throughout the development lifecycle. This proactive approach ensures a strong foundation for future certifications, even though they follow established audit cycles. In simpler terms, we prioritize building compliance in from the start, even when formal certification comes later.

Fabric is compliant with many industry standards such as ISO 27001, 27017, 27018 and 27701. Fabric is also [HIPAA](/azure/compliance/offerings/offering-hipaa-us) compliant, which is critical to healthcare data privacy and security. You can check the Appendix A and B in the [Microsoft Azure Compliance Offerings](https://aka.ms/azurecompliance) for detailed insight into which cloud services are in scope for the certifications. You can also access the audit documentation from the [Service Trust Portal (STP)](https://servicetrust.microsoft.com/).

Compliance is a shared responsibility. To comply with laws and regulations, cloud service providers and their customers enter a shared responsibility to ensure that each does their part. As you consider and evaluate public cloud services, it's critical to understand the [shared responsibility model](/azure/security/fundamentals/shared-responsibility) and which security tasks the cloud provider handles and which tasks you handle.

## Data handling

Because you're dealing with sensitive patient information, you need to ensure that all your data is sufficiently protected both at rest and in transit.

Encryption at rest provides data protection for stored data (at rest). Attacks against data at rest include attempts to obtain physical access to the hardware on which the data is stored, and then compromise the data on that hardware. Encryption at rest is designed to prevent an attacker from accessing the unencrypted data by ensuring the data is encrypted when on disk. Encryption at rest is a mandatory measure required for compliance with some of the industry standards and regulations, such as the International Organization for Standardization (ISO) and Health Insurance Portability and Accountability Act (HIPAA).

All Fabric data stores are [encrypted at rest](security-fundamentals.md#data-handling) by using Microsoft-managed keys, which provides protection for customer data and also system data and metadata. Data is never persisted to permanent storage while in an unencrypted state. With Microsoft-managed keys, you benefit from the encryption of your data at rest without the risk or cost of a custom key management solution.

Data is also encrypted [in transit](security-fundamentals.md#data-in-transit). All inbound traffic to Fabric endpoints from the client systems enforces a minimum of [Transport Layer Security (TLS)](https://en.wikipedia.org/wiki/Transport_Layer_Security) 1.2. It also negotiates TLS 1.3, whenever possible. TLS provides strong authentication, message privacy, and integrity (enabling detection of message tampering, interception, and forgery), interoperability, algorithm flexibility, and ease of deployment and use.

In addition to encryption, network traffic between Microsoft services always routes over the [Microsoft global network](/azure/networking/microsoft-global-network), which is one of the largest backbone networks in the world.

### Customer-managed key (CMK) encryption and Microsoft Fabric

[Customer-managed keys (CMK)](/azure/security/fundamentals/encryption-overview#azure-encryption-models) allows you to encrypt data at-rest using your own keys. By default, Microsoft Fabric encrypts data-at-rest using platform managed keys. In this model, Microsoft is responsible for all aspects of key management and data-at-rest on OneLake is encrypted using its keys. From a compliance perspective, customers may have a requirement to use CMK to encrypt data-at-rest. In the CMK model, customer assumes full control of the key and uses their key(s) to encrypt data-at-rest.

:::image type="content" source="media/security-scenario/fabric-shortcuts-cmk-scenario.svg" alt-text="Diagram shows a high-level representation of using CMK by using Fabric OneLake shortcuts.":::

If you have a requirement to use CMK to encrypt data-at-rest, you have two options. You can use [Workspace customer managed keys](../security/workspace-customer-managed-keys.md) to configure a CMK stored in an Azure Key Vault to encrypt data at rest in your Fabric workspace. Or, you can use other cloud storage services (ADLS Gen2, AWS S3, GCS) with CMK encryption enabled and access data from Microsoft Fabric using [OneLake shortcuts](../onelake/onelake-shortcuts.md). In this pattern, your data continues to reside on a cloud storage service or an external storage solution where encryption at rest using CMK is enabled, and you can perform in-place read operations from Fabric whilst staying compliant. Once a shortcut has been created, within Fabric, the data can be accessed by other Fabric experiences.

There are some considerations for using this pattern:

- Use the pattern discussed here for data which has encryption at-rest requirement using CMK. Data which does not have this requirement can be encrypted at-rest using platform-managed keys, and that data can be stored natively on Microsoft Fabric OneLake.
- [Fabric Lakehouse](../onelake/create-onelake-shortcut.md) and [KQL database](../real-time-intelligence/onelake-shortcuts.md) are the two workloads within Microsoft Fabric which support creation of shortcuts. In this pattern where data continues to reside on an external storage service where CMK is enabled, you can use shortcuts within Lakehouses and KQL databases to bring your data into Microsoft Fabric for analysis, but data is physically stored outside of OneLake where CMK encryption is enabled.
- ADLS Gen2 shortcut supports write and using this shortcut type, you can also write data back out to storage service, and it'll be encrypted at-rest using CMK. While using CMK with ADLS Gen2, the following considerations for [Azure Key Vault (AKV)](/azure/key-vault/keys/byok-specification) and [Azure Storage](/azure/storage/common/customer-managed-keys-overview) apply.
- If you are using a third-party storage solution which is AWS S3 compatible (Cloudflare, Qumolo Core with public endpoint, Public MinIO and Dell ECS with public endpoint) and it has CMK enabled, the pattern discussed here in this document can be extended to these third-party storage solutions. Using [Amazon S3 compatible shortcut](../onelake/create-s3-compatible-shortcut.md), you can bring data into Fabric using a shortcut from these solutions. As with cloud-based storage services, you can store the data on external storage with CMK encryption, and perform in-place read operations.
- AWS S3 supports encryption at-rest using [customer-managed keys](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html). Fabric can perform in-place reads on S3 buckets using [S3 shortcut](../onelake/create-s3-shortcut.md); however, write operations using a shortcut to AWS S3 are not supported.
- Google cloud storage supports data encryption using [customer-managed keys](https://cloud.google.com/storage/docs/encryption). Fabric can perform in-place reads on GCS; however, write operations using a shortcut to GCS are not supported.
- Enable [audit](/power-bi/transform-model/log-analytics/desktop-log-analytics-overview) for Microsoft Fabric to keep track of activities.
- In Microsoft Fabric, Power BI supports customer-managed key with [Bring your own encryption keys for Power BI](/power-bi/enterprise/service-encryption-byok).
- Disable the [shortcut caching](../onelake/onelake-shortcuts.md#caching) feature for S3, GCS, and S3-compatible shortcuts, as the cached data is persisted on OneLake.

## Data residency

As you're dealing with patient data, for compliance reasons your organization has mandated that data should never leave the United States geographical boundary. Your organization's main operations take place in New York and your head office in Seattle. While setting up Power BI, your organization has chosen the East US region as the tenant home region. For your operations, you have created a Fabric capacity in the West US region, which is closer to your data sources. Because OneLake is available around the globe, you're concerned whether you can meet your organization's data residency policies while using Fabric.

In Fabric, you learn that you can create [Multi-Geo capacities](../admin/service-admin-premium-multi-geo.md), which are capacities located in geographies (geos) other than your tenant home region. You assign your Fabric workspaces to those capacities. In this case, compute and storage (including OneLake and experience-specific storage) for all items in the workspace reside in the multi-geo region, while your tenant metadata remains in the home region. Your data will only be stored and processed in these two geographies, thus ensuring your organization's data residency requirements are met.

## Access control

You need to ensure that only you and your fellow data engineers have full access to the data in the bronze and silver layers of the lakehouse. These layers allow you to perform data cleansing, validation, transformation, and enrichment. You need to restrict access to the data in the gold layer to only authorized users, such as data analysts and business users, who can use the data for various analytical purposes, such as reporting and analytics.

Fabric provides a flexible [permission model](permission-model.md) that allows you to control access to items and data in your workspaces. A workspace is a securable logical entity for grouping items in Fabric. You use [workspace roles](permission-model.md#workspace-roles) to control access to items in the workspaces. The four basic roles of a workspace are:

- **Admin:** Can view, modify, share, and manage all content in the workspace, including managing permissions.
- **Member:** Can view, modify, and share all content in the workspace.
- **Contributor:** Can view and modify all content in the workspace.
- **Viewer:** Can view all content in the workspace, but can't modify it.

In this scenario, you create three workspaces, one for each of the medallion layers (bronze, silver, and gold). Because you created the workspace, you're automatically assigned to the _Admin_ role.

You then add a security group to the _Contributor_ role of those three workspaces. Because the security group includes your fellow engineers as members, they're able to create and modify Fabric items in those workspaces—however they can't share any items with anyone else. Nor can they grant access to other users.

In the bronze and silver workspaces, you and your fellow engineers create Fabric items to ingest data, store the data, and process the data. Fabric items comprise a lakehouse, pipelines, and notebooks. In the gold workspace, you create two lakehouses, multiple pipelines and notebooks, and a [Direct Lake semantic model](../fundamentals/direct-lake-overview.md), which delivers fast query performance of data stored in one of the lakehouses.

You then give careful consideration to how the data analysts and business users can access the data they're allowed to access. Specifically, they can only access data that's relevant to their role and department.

The first lakehouse contains the actual data and doesn't enforce any data permissions in its [SQL analytics endpoint](../data-engineering/lakehouse-sql-analytics-endpoint.md). The second lakehouse contains shortcuts to the first lakehouse, and it enforces granular data permissions in its SQL analytics endpoint. The semantic model connects to the first lakehouse. To enforce appropriate data permissions for the users (so they can only access data that's relevant to their role and department), you don't share the first lakehouse with the users. Instead, you share only the Direct Lake semantic model and the second lakehouse that enforces data permissions in its SQL analytics endpoint.

You set up the semantic model to use a [fixed identity](../fundamentals/direct-lake-fixed-identity.md), and then implement row-level security (RLS) in the semantic model to enforce model rules to govern what data the users can access. You then [share](../fundamentals/share-items.md) only the semantic model with the data analysts and business users because they shouldn't access the other items in the workspace, such as the pipelines and notebooks. Lastly, you grant [Build permission](/power-bi/connect-data/service-datasets-build-permissions) on the semantic model so that the users can create Power BI reports. That way, the semantic model becomes a _shared_ semantic model and a source for their Power BI reports.

Your data analysts need access to the second lakehouse in the gold workspace. They'll connect to the SQL analytics endpoint of that lakehouse to write SQL queries and perform analysis. So, you share that lakehouse with them and provide access [only to objects they need](/entra/identity-platform/secure-least-privileged-access) (such as tables, rows, and columns with masking rules) in the lakehouse SQL analytics endpoint by using the [SQL security model](../data-warehouse/security.md). Data analysts can now only access data that's relevant to their role and department and they can't access the other items in the workspace, such as the pipelines and notebooks.

## Common security scenarios

The following table lists common security scenarios and the tools you can use to accomplish them.

| **Scenario** | **Tools** | **Direction** |
| --- | --- | --- |
| I'm an **ETL developer** and I want to load large volumes of data to Fabric at-scale from multiple source systems and tables. The source data is on-premises (or other cloud) and is behind firewalls and/or Azure data sources with private endpoints. | Use [on-premises data gateway](/data-integration/gateway/service-gateway-onprem) with the [copy activity](../data-factory/copy-data-activity.md) in a [pipeline](../data-factory/pipeline-overview.md). | Outbound |
| I'm a **power user** and I want to load data to Fabric from source systems that I have access to. Because I'm not a developer, I need to transform the data by using a low-code interface. The source data is on-premises (or other cloud) and is behind firewalls. | Use [on-premises data gateway](/data-integration/gateway/service-gateway-onprem) with [Dataflow Gen 2](../data-factory/dataflows-gen2-overview.md). | Outbound |
| I'm a **power user** and I want to load data in Fabric from source systems that I have access to. The source data is in Azure behind private endpoints, and I don't want to install and maintain on-premises data gateway infrastructure. | Use a [VNet data gateway](/data-integration/vnet/overview) with [Dataflow Gen 2](../data-factory/dataflows-gen2-overview.md). | Outbound |
| I'm a **developer** who can write data ingestion code by using Spark notebooks. I want to load data in Fabric from source systems that I have access to. The source data is in Azure behind private endpoints, and I don't want to install and maintain on-premises data gateway infrastructure. | Use [Fabric notebooks](../data-engineering/how-to-use-notebook.md) with [Azure private endpoints](/azure/private-link/manage-private-endpoint?tabs=manage-private-link-powershell). | Outbound |
| I have many existing pipelines in Azure Data Factory (ADF) and Synapse pipelines that connect to my data sources and load data into Azure. I now want to modify those pipelines to load data into Fabric. | Use the [Lakehouse connector](../data-factory/connector-lakehouse-overview.md) in existing pipelines. | Outbound |
| I have a data ingestion framework developed in Spark that connects to my data sources securely and loads them into Azure. I'm running it on Azure Databricks and/or Synapse Spark. I want to continue using Azure Databricks and/or Synapse Spark to load data into Fabric. | Use the [OneLake and the Azure Data Lake Storage (ADLS) Gen2 API](../onelake/onelake-api-parity.md) (Azure Blob Filesystem driver) | Outbound |
| I want to ensure that my Fabric endpoints are protected from the public internet. | As a SaaS service, the Fabric backend is already protected from the public internet. For more protection, use [Microsoft Entra conditional access policies for Fabric](security-conditional-access.md) and/or enable [private links at tenant level](security-private-links-overview.md) for Fabric and block public internet access. | Inbound |
| I want to ensure that Fabric can be accessed from only within my corporate network and/or from compliant devices. | Use [Microsoft Entra conditional access policies for Fabric](security-conditional-access.md). | Inbound |
| I want to ensure that anyone accessing Fabric must perform multifactor authentication. | Use [Microsoft Entra conditional access policies for Fabric](security-conditional-access.md). | Inbound |
| I want to lock down my entire Fabric tenant from the public internet and allow access only from within my virtual networks. | Enable [private links at tenant level](security-private-links-overview.md) for Fabric and block public internet access. | Inbound |

## Related content

For more information about Fabric security, see the following resources.

- [Security in Microsoft Fabric](security-overview.md)
- [OneLake security overview](../onelake/security/fabric-onelake-security.md)
- [Microsoft Fabric concepts and licenses](../enterprise/licenses.md)
- Questions? Try asking the [Microsoft Fabric community](https://community.fabric.microsoft.com/).
- Suggestions? [Contribute ideas to improve Microsoft Fabric](https://ideas.fabric.microsoft.com/).
