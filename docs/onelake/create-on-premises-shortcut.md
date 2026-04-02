---
title: Create shortcuts to on-premises data
description: Learn how to install and use a Fabric on-premises data gateway to create OneLake shortcuts to on-premises or network-restricted data sources.
ms.reviewer: mahi
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 05/21/2024
#customer intent: As a data analyst, I want to learn how to create shortcuts to on-premises data using a Fabric on-premises data gateway so that I can easily access and analyze data from various sources without the need for data movement or duplication.
---

# Create shortcuts to on-premises data

By using OneLake shortcuts, you can create virtual references that bring together data from a variety of sources across clouds, regions, systems, and domains with no data movement or duplication. By using a Fabric on-premises data gateway (OPDG), you can also create shortcuts to on-premises data sources, such as S3-compatible storage hosted on-premises. You can also create shortcuts to network-restricted data sources, such as Amazon S3 or Google Cloud Storage buckets configured behind a firewall or Virtual Private Cloud (VPC).

On-premises data gateways are software agents that you install on a Windows machine and configure to connect to your data endpoints. By selecting an OPDG when creating a shortcut, you can establish network connectivity between OneLake and your data source.

This feature is available for the following shortcut types:

* [Amazon S3](create-s3-shortcut.md)
* [S3 compatible](create-s3-compatible-shortcut.md)
* [Google Cloud Storage](create-gcs-shortcut.md)

You can use this feature in any Fabric-enabled workspace.

On-premises data gateway shortcuts can take advantage of file caching to reduce egress costs associated with cross-cloud data access. For more information, see [OneLake shortcuts > Caching](onelake-shortcuts.md#caching).

For Amazon S3 shortcuts to VPC-protected buckets, you can combine the on-premises data gateway with Microsoft Entra service principal authentication. This approach eliminates the need to manage AWS access keys while still providing private network access to your S3 data. For more information, see [Integrate Microsoft Entra with AWS S3 shortcuts using service principal authentication](amazon-storage-shortcut-entra-integration.md).

## Prerequisites

* A Fabric lakehouse where you want to create the shortcut. If you don't have one, see [Create a lakehouse with OneLake](create-lakehouse-onelake.md).
* A [standard on-premises data gateway](/data-integration/gateway/service-gateway-install#download-and-install-a-standard-gateway) installed on a machine that has network connectivity to your storage endpoint. Be sure to install the latest version.
* If your storage endpoint uses a self-signed certificate for HTTPS connections, trust this certificate on the machine hosting your gateway.

## Verify gateway connectivity

Before creating your shortcut, verify that your gateway can connect to your storage endpoint.

1. Sign in to the machine hosting the gateway.
1. Install a client application that can query S3-compatible data sources, such as the AWS CLI, WinSCP, or another tool.
1. Connect to your endpoint URL using the credentials for your data source. Your credentials generally need to be able to list buckets, list objects, and read data.
   * For Amazon S3, the endpoint is the URL for a specific bucket. For example: `https://BucketName.s3.us-east.amazonaws.com`
   * For S3 compatible, the endpoint is the URL for the service, not a specific bucket. For example: `https://mys3api.contoso.com` or `http://10.0.1.4:9000`.
   * For Google Cloud Storage, the endpoint is the URL for either the bucket or the service. For example: `https://storage.googleapis.com` or `https://bucketname.storage.googleapis.com`.
1. Verify that you can explore and read data from your storage location.

## Create a shortcut

Follow the instructions to create an [Amazon S3](create-s3-shortcut.md), [Google Cloud Storage](create-gcs-shortcut.md), or [S3 compatible](create-s3-compatible-shortcut.md) shortcut.

During shortcut creation, select your on-premises data gateway (OPDG) in the **Data gateway** dropdown field.

:::image type="content" source="media\create-on-premises-shortcut\data-gateway-dropdown.png" alt-text="Screenshot showing where to select an on-premises data gateway during OneLake shortcut creation.":::

> [!NOTE]
> If you don't see your OPDG in the **Data gateway** dropdown field and someone else created the gateway, ask them to share the gateway with you from the **Manage connections and gateways** interface.

## Troubleshooting

If you encounter any connectivity issues during shortcut creation, try the following troubleshooting steps.

* Ensure that the machine hosting your gateway can connect to your storage endpoint. Follow the steps to [check connectivity](#verify-gateway-connectivity).
* If you're using HTTPS and need to use a self-signed certificate, ensure that the machine hosting your gateway trusts the certificate. You might need to install the self-signed certificate on the machine.

## Related content

* [Create an Amazon S3 shortcut](create-s3-shortcut.md)
* [Create a Google Cloud Storage shortcut](create-gcs-shortcut.md)
* [Create an S3 compatible shortcut](create-s3-compatible-shortcut.md)

