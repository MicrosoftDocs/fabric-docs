---
title: "Tutorial: Configure mirrored AWS Glue catalog"
description: Learn how to create a mirrored AWS Glue catalog in Microsoft Fabric.
author: kgremban
ms.author: kgremban
ms.reviewer: mahi
ms.date: 07/28/2026
ms.topic: tutorial
ai-usage: ai-assisted
---

# Tutorial: Configure mirrored AWS Glue catalog

[Catalog mirroring for AWS Glue](aws-glue.md) enables Microsoft Fabric customers to read Iceberg data cataloged in the AWS Glue Data Catalog from Fabric workloads.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

- You must have an AWS account with an AWS Glue Data Catalog that contains the Apache Iceberg tables you want to mirror.
- The AWS Glue Iceberg REST catalog endpoint and the Amazon S3 locations that store the Iceberg data must be reachable through the public internet. Firewall rules or other network restrictions aren't currently supported. See [limitations and considerations of this feature](aws-glue-limitations.md).
- You need an AWS Identity and Access Management (IAM) user with an access key and the permissions described in [Configure AWS authentication](#configure-aws-authentication).
- You need a Fabric workspace associated with a Fabric capacity (F SKU or Trial).
- Your Fabric tenant administrator must enable the [tenant admin setting](../../admin/about-tenant-settings.md) titled **Enable new mirrored catalog items (Preview)**.

## Configure AWS authentication

AWS Glue catalog mirroring uses a delegated authorization model. You provide the access key ID and secret access key of an IAM user, and Fabric uses that credential for the initial catalog scan and for ongoing metadata sync. Give the IAM user read access to both the AWS Glue Data Catalog and the Amazon S3 data before you create the connection.

1. In the AWS IAM console, select or create the IAM user that Fabric uses to connect.

1. Attach a policy that grants read access to the AWS Glue Data Catalog and to the Amazon S3 buckets that store your Iceberg data. The following least-privilege policy grants the required permissions. Replace `your-bucket` with the name of each bucket that holds the Iceberg table data.

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "GlueCatalogRead",
          "Effect": "Allow",
          "Action": [
            "glue:GetCatalog",
            "glue:GetDatabases",
            "glue:GetDatabase",
            "glue:GetTables",
            "glue:GetTable"
          ],
          "Resource": "*"
        },
        {
          "Sid": "S3DataRead",
          "Effect": "Allow",
          "Action": [
            "s3:GetObject",
            "s3:GetBucketLocation",
            "s3:ListBucket"
          ],
          "Resource": [
            "arn:aws:s3:::your-bucket",
            "arn:aws:s3:::your-bucket/*"
          ]
        }
      ]
    }
    ```

1. If your AWS Glue Data Catalog is governed by AWS Lake Formation, grant the same IAM user the corresponding Lake Formation permissions on the databases and tables that you want to mirror. Databases and tables that the IAM user can't read in Lake Formation don't appear when you select data to mirror.

1. Create an access key for the IAM user, and then copy the **access key ID** and **secret access key**. You enter these values when you create the connection.

## Create a mirrored AWS Glue catalog

Follow these steps to create a new mirrored AWS Glue catalog in Fabric.

1. Go to https://fabric.microsoft.com.

1. Select **+ New** and then **Mirrored AWS Glue catalog (preview)**.

1. Select an existing connection if you have one configured.

   If you don't have an existing connection, create a new connection and enter all the required details:

   - For **URL**, enter the AWS Glue Iceberg REST catalog endpoint for your account's Region, in the form `https://glue.`*Region*`.amazonaws.com/iceberg`.
   - For **Warehouse**, enter your AWS Glue catalog ID, which is your 12-digit AWS account ID.
   - For **Authentication kind**, select **Access Key**.
   - For **Access Key ID** and **Secret Access Key**, enter the access key that you created in [Configure AWS authentication](#configure-aws-authentication).

1. After you connect to AWS Glue, on the **Choose data** page, select the **Catalog scope**, which is the part of the AWS Glue catalog you want to mirror. Then, using the table list, select the tables that you want to access in Fabric.
   - You can only see the databases and tables that the IAM identity has access to, based on the permissions granted in AWS Glue and AWS Lake Formation.
   - By default, the **Automatically sync future tables** option is enabled. For more information, see [AWS Glue catalog mirroring](aws-glue.md#metadata-sync).

   When you make your selections, select **Next**.

1. On the **Review and create** page, review the details and set the mirrored catalog item name, which must be unique in your workspace. Select **Create**.

1. A mirrored AWS Glue catalog item is created. For each table, a corresponding shortcut is also automatically created.
   - Databases that don't have any tables aren't shown.

1. You can preview data by selecting a table, or by opening the SQL analytics endpoint. Open the SQL analytics endpoint item to launch the Explorer and Query editor page. You can query your mirrored AWS Glue tables by using T-SQL in the SQL Editor.

## Create Lakehouse shortcuts to the mirrored AWS Glue catalog item

You can also create shortcuts from your lakehouse to your mirrored AWS Glue catalog item to use your lakehouse data and Spark notebooks.

1. First, create a lakehouse. If you already have a lakehouse in this workspace, you can use an existing one.
   1. Select your workspace in the navigation menu.
   1. Select **+ New** > **Lakehouse**.
   1. Provide a name for your lakehouse in the **Name** field, and select **Create**.
1. In the **Explorer** view of your lakehouse, in the **Get data in your lakehouse** menu, under **Load data in your lakehouse**, select the **New shortcut** button.
1. Select **Microsoft OneLake**. Select the mirrored AWS Glue catalog item that you created in the previous steps. Then select **Next**.
1. Select tables within the database, and select **Next**.
1. Select **Create**.
1. Shortcuts are now available in your lakehouse to use with your other lakehouse data. You can also use notebooks and Spark to perform data processing on the data for these catalog tables that you added from AWS Glue.

## Related content

- [AWS Glue catalog mirroring](aws-glue.md)
- [Limitations in Microsoft Fabric catalog mirroring for AWS Glue](aws-glue-limitations.md)
