---
title: Create shortcuts to on-premises data
description: Learn how to install and use a Fabric on-premises data gateway to create OneLake shortcuts to on-premises or network-restricted data sources.
ms.reviewer: mahi
ms.author: mahi
author: matt1883
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
#customer intent: As a data analyst, I want to learn how to create shortcuts to on-premises data using a Fabric on-premises data gateway so that I can easily access and analyze data from various sources without the need for data movement or duplication.
---

# Create shortcuts to on-premises data

With OneLake Shortcuts, you can create virtual references to bring together data from a variety sources across clouds, regions, systems, and domains – all with no data movement or duplication. By using a Fabric on-premises data gateway (OPDG), you can also create shortcuts to on-premises data sources, such as S3 compatible storage hosted on-premises. With this feature, you can also create shortcuts to other network-restricted data sources, such as Amazon S3 or Google Cloud Storage buckets configured behind a firewall or Virtual Private Cloud (VPC).

On-premises data gateways are software agents that you install on a Windows machine and configure to connect to your data endpoints. By selecting an OPDG when creating a shortcut, you can establish network connectivity between OneLake and your data source.

This feature is available for the following shortcut types:

* Amazon S3
* S3 compatible
* Google Cloud Storage

You can use this feature in any Fabric-enabled workspace.

On-premises data gateway shortcuts can take advantage of file caching to reduce egress costs associated with cross-cloud data access. For more information, see [OneLake shortcuts > Caching](onelake-shortcuts.md#caching).

In this document, we show you how to install and use these on-premises data gateways to create shortcuts to on-premises or network-restricted data.

## Prerequisites

* Create or identify a Fabric lakehouse that will contain your shortcut(s).
* Identify the endpoint URL associated with your Amazon S3, Google Cloud Storage, or S3 compatible location.
  * For S3 compatible, the endpoint is the URL for the service, not a specific bucket. For example:
    * `https://mys3api.contoso.com`
    * `http://10.0.1.4:9000`
  * For Amazon S3, the endpoint is the URL for a specific bucket. For example:
    * `https://BucketName.s3.us-east.amazonaws.com`
  * For Google Cloud Storage, the endpoint is either the URL for the bucket or the service. For example:
    * `https://storage.googleapis.com`
    * `https://bucketname.storage.googleapis.com`
* Identify the user or identity credentials that meet the [necessary access and authorization requirements](onelake-shortcuts.md#s3-shortcuts) for your data source. Your credentials generally need to be able to list buckets, list objects, and read data.
* Identify a physical or virtual machine that:
  * Has network connectivity to your storage endpoint. This article explains how you can confirm this connectivity before creating your shortcut.
  * Allows you to install software.
* Follow [the instructions to install a **standard** on-premises data gateway](/data-integration/gateway/service-gateway-install#download-and-install-a-standard-gateway) on the machine you identified. Be sure to install the latest version.
  * If your storage endpoint uses a self-signed certificate for HTTPS connections, be sure to trust this certificate on the machine hosting your gateway.

## Check connectivity from gateway host

Before setting up your shortcut, follow these steps to confirm that your gateway can connect to your storage endpoint.

1. Log in to the machine hosting the gateway.
1. Install a client application that can query S3 compatible data sources, such as the Amazon Web Services Command Line Interface, WinSCP, or another tool of choice.
1. Connect to your endpoint URL and provide the credentials you identified in the prerequisite steps.
1. Ensure you can explore and read data from your storage location.

## Create a shortcut

Review the instructions for creating an Amazon S3, Google Cloud Storage, or S3 compatible shortcut.

During shortcut creation, select your on-premises data gateway (OPDG) in the **Data gateway** dropdown field.

  :::image type="content" source="media\create-on-premises-shortcut\data-gateway-dropdown.png" alt-text="Screenshot showing where to select an on-premises data gateway during OneLake shortcut creation.":::

> [!NOTE]
> If you do not see your OPDG in the **Data gateway** dropdown field and someone else created the gateway, ask them to share the gateway with you from the **Manage connections and gateways** interface.

## Troubleshooting

If you encounter any connectivity issues during shortcut creation, try the following troubleshooting steps.

* As needed, ensure the machine hosting your gateway can connect to your storage endpoint. [Follow the steps to check connectivity.](#check-connectivity-from-gateway-host)
* If you're using HTTPS and need to use a self-signed certificate, ensure the machine hosting your gateway trusts the certificate. You may need to install the self-signed certificate on the machine.

## Related content

* [Create an Amazon S3 shortcut](create-s3-shortcut.md)
* [Create a Google Cloud Storage shortcut](create-gcs-shortcut.md)
* [Create an S3 compatible shortcut](create-s3-compatible-shortcut.md)
