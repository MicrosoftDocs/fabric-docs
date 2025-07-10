---
title: Integrate Microsoft Entra with AWS S3 using Service Principal Authentication (SPN)
description: Learn how to integrate Microsoft Entra with AWS S3 using Service Principal authentication for secure access to S3 buckets with unified identity management and OIDC-based authentication.
author: SnehaGunda
ms.topic: how-to
ms.date: 07/10/2025
ms.author: sngun
ms.reviewer: sngun
---

# Integrate Microsoft Entra with AWS S3 shortcuts using service principal authentication

You can integrate Microsoft Entra with AWS S3 using the Service Principal Name (SPN) approach. This integration enables seamless, secure access to S3 buckets using Microsoft Entra credentials, simplifying identity
management and enhancing security.

## Key benefits

* **Unified identity management**: Use Microsoft Entra credentials to access Amazon S3. No need to manage AWS IAM users.

* **OIDC-based authentication**: Uses OpenID Connect for secure authentication with AWS IAM roles.

* **Auditing support**: Full traceability through AWS CloudTrail to monitor role assumptions.

* **Seamless integration**: Designed to integrate with existing AWS deployments with minimal configuration changes.

## Architecture

The Entra-AWS integration is built on a federated identity model that uses OpenID Connect (OIDC) to enable secure, temporary access to AWS resources. The architecture consists of the following three main
components that work together to establish trust, authenticate users, and authorize access to Amazon S3 from Microsoft Fabric:

1. A **Service Principal (SPN)** registered in Microsoft Entra.
2. An **OIDC trust relationship** between AWS and Microsoft Entra.
3. A **Fabric connection** that uses temporary credentials from AWS Security Token Service (STS).

In the following sections you'll configure Microsoft Entra ID, AWS IAM, and Microsoft Fabric for secure access to Amazon S3 using the service principal-based integration. This setup establishes the necessary trust relationships and connection details required for the integration to work.

> [!NOTE]
> Only key or secret authentication is supported for S3-compatible sources; Entra-based OAuth, Service Principal, and RoleArn are not supported.

## Configure Microsoft Entra ID

### Step1: Register a Microsoft Entra application

* Sign in to [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID**.

* From the left-hand menu, expand **Manage > App registrations > New registration.** Fill out the following details:

  * **Name**: Enter a name for your application such as *S3AccessServicePrincipal.*

  * **Redirect URL**: Leave it blank or set to `https://localhost` if necessary.

  * Select **Register** to register your application.

> [!NOTE]
> It's recommended to use a unique Service Principal per AWS role for enhanced security

### Step2: Create a client secret

* Open the Microsoft Entra application you created above.

* From the left-hand menu, expand **Manage > Certificates and secrets > New client secret** to add a new secret

* Note down the generated secret and its expiration date

### Step3: Get the application details

* **Client Secret**: Get this value from the previous step

* ***Tenant ID**: From the Azure portal, navigate to **Microsoft Entra ID** and open the Overview tab and get the Tenant ID value.

* From the Azure portal, navigate to **Microsoft Entra ID.** From the left-hand navigation, expand the **Manage** tab and open **Enterprise applications**. Search for the application you created in the previous step. Copy the following values

  * Application ID (also known as **Client ID**)

  * Object ID

> [!NOTE]
> These values are from **Microsoft Entra ID > Enterprise applications** tab and NOT from **Microsoft Entra ID > App registrations** tab.

The following screenshot shows you how to get the application/client ID and object ID.

:::image type="content" source="media\amazon-storage-shortcut-entra-integration\get-entra-app-object-id.png" alt-text="Screenshot showing how to get Microsoft Entra application and object ID." lightbox="media\amazon-storage-shortcut-entra-integration\get-entra-app-object-id.png":::

## AWS IAM configuration

### Step 1: Create OIDC identity provider

* Sign into the [AWS IAM portal](https://console.aws.amazon.com/iam/).

* Navigate to **AWS IAM → Identity providers → Add provider**

* Select *Provider type* as **Open ID Connect**

* Provider URL: `https://sts.windows.net/<your-tenant-id>`

* Audience: `https://analysis.windows.net/powerbi/connector/AmazonS3`

  :::image type="content" source="media\amazon-storage-shortcut-entra-integration\add-identity-provider.png" alt-text="Screenshot showing how to add an identity provider in AWS IAM." lightbox="media\amazon-storage-shortcut-entra-integration\add-identity-provider.png":::

### Step 2: Create IAM roles

* Navigate to **AWS IAM → Roles → Create Role**

* Trusted entity type: **Web identity**

* Identity provider: Select the Open ID Connect provider created in Step 1

* Audience: `https://analysis.windows.net/powerbi/connector/AmazonS3`

* Assign appropriate S3 access policies to the role

* Ensure that the Trust policy has the service principal as one of the conditions

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Federated": "arn:aws:iam::<aws-account>:oidc-provider/sts.windows.net/<tenant-id>/" // (1)
        },
        "Action": "sts:AssumeRoleWithWebIdentity",// (2)
        "Condition": {
          "StringEquals": {
            "sts.windows.net/<tenant-id>/:sub": "<Object ID of the SPN that will assume this role>", // (3)
            "sts.windows.net/<tenant-id>/:aud": "https://analysis.windows.net/powerbi/connector/AmazonS3" // (4)
          }
        }
      }
    ]
  }
  ```

**Description of key fields:**

1. **Principal.Federated** – Specifies the external identity provider(OIDC from Microsoft Entra ID).

2. **Action** – Grants permission to assume the role using a web identity token.

3. **Condition > :sub** – Limits which Microsoft Entra ID service can assume the role. This is the Object ID that you noted in [Step3: Get the application details](#step3-get-the-application-details)

4. **Condition > :aud** – Ensures the request is from Power BI's S3 connector.

   :::image type="content" source="media\amazon-storage-shortcut-entra-integration\create-role.png" alt-text="Screenshot showing how to create a role in AWS IAM." lightbox="media\amazon-storage-shortcut-entra-integration\create-role.png" :::

## Create an S3 connection in Fabric

Use Microsoft Fabric OneLake's shortcut creation interface to create the shortcut as described in the [create an S3 shortcut](create-s3-shortcut.md) article. Follow the same steps, but set **RoleARN** to the Amazon Resource Name (ARN) for the IAM role, and set the *Authentication Kind* to **Service Principal** and fill in the following details:

* **Tenant ID:** Tenant ID of the Microsoft Entra application

* **Service principal client ID:** The Application ID you got in the
  previous step.

* **Service principal key:** The client secret of the Microsoft Entra application

## Security recommendations

* Use a separate service principal per AWS role for better isolation and auditability

* Rotate secrets periodically and store them securely

* Monitor AWS CloudTrail for STS-related activity

## Current limitations

* This feature currently supports only the service principal-based approach; OAuth and Workspace Identity aren't yet supported.

* Access to S3 buckets behind a firewall via on-premises data gateway isn't currently supported with service principal or OAuth.

## Related content

* [Create an S3 shortcut](create-s3-shortcut.md)
* [Create an Amazon S3 compatible shortcut](create-s3-compatible-shortcut.md)