---
title: "Tutorial: Configure mirrored Google Lakehouse runtime catalog"
description: Learn how to create a mirrored Google Lakehouse runtime catalog in Microsoft Fabric.
author: kgremban
ms.author: kgremban
ms.reviewer: mahi
ms.date: 08/21/2026
ms.topic: tutorial
ai-usage: ai-assisted
---

# Tutorial: Configure mirrored Google Lakehouse runtime catalog

By using [catalog mirroring for Google Lakehouse runtime catalog](google-lakehouse-runtime.md), you can read Apache Iceberg data managed in Google Cloud Lakehouse from Microsoft Fabric workloads.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

## Prerequisites

- A Google Cloud project with billing enabled and the BigLake API enabled.
- A Google Lakehouse runtime catalog that contains the Apache Iceberg V2 tables you want to mirror. Iceberg V1 tables aren't supported.
- The Apache Iceberg REST catalog endpoint and the Google Cloud Storage locations that store the Iceberg data are reachable through the public internet. Firewall rules and other network restrictions aren't currently supported. See [limitations and considerations of this feature](google-lakehouse-runtime-limitations.md).
- Permission to create and manage a Google Cloud Workload Identity Pool and provider and to grant Google Cloud IAM roles.
- Your Microsoft Entra tenant ID. If you use individual identity bindings, also obtain the object ID of each Microsoft Entra identity that you want to authorize.
- A Fabric workspace associated with a Fabric capacity (F SKU or Trial).
- Your Fabric tenant administrator must enable the [tenant admin setting](../../admin/about-tenant-settings.md) titled **Enable new mirrored catalog items (Preview)**.

## Configure Google Cloud Workload Identity Federation

Google Lakehouse runtime catalog mirroring uses Google Cloud Workload Identity Federation to trust Microsoft Entra tokens. Complete the following Google Cloud configuration before you create the Fabric connection.

### Select the Google Cloud project

1. In the Google Cloud console, select the project that owns the Workload Identity Pool.
1. Record both the project ID and the numeric project number. You can't use the project ID and project number interchangeably.
1. [Enable the BigLake API](https://console.cloud.google.com/apis/enableflow?apiid=biglake.googleapis.com) for the project.

### Create a Workload Identity Pool

1. In the Google Cloud console, go to **IAM & Admin** > **Workload Identity Federation**.
1. Select **Create Pool**.
1. Enter a pool name and Pool ID.
1. Make sure that the pool is enabled. The pool location is `global`.
1. Record the Pool ID.

### Add an OIDC provider

1. Open the Workload Identity Pool, and then select **Add Provider**. You can also add the provider while creating the pool.
1. For the provider type, select **OpenID Connect (OIDC)**.
1. Configure the provider with the following values. Replace `{TENANT_ID}` with your Microsoft Entra tenant ID.

   | Provider setting | Value to enter | Notes |
   |---|---|---|
   | Provider ID | A provider ID that you choose | Record this value for the Fabric connection. |
   | Issuer URL | `https://sts.windows.net/{TENANT_ID}/` | The value, including the trailing slash, must exactly match the token `iss` claim. |
   | Allowed audience | `https://analysis.windows.net/powerbi/connector/MirroredGoogleLakehouseRuntimeCatalog` | The value must exactly match the token `aud` claim. |
   | Attribute mapping | `google.subject = assertion.oid` | The Microsoft Entra object ID becomes the Google federated subject. |

1. Save and enable the provider.
1. Confirm that you recorded the numeric project number, Pool ID, and Provider ID. You need all three values for the Fabric connection.

### Add Microsoft Entra identities as IAM principals

Bind the Google Cloud roles to the Microsoft Entra identity or identities that Fabric uses. For least-privilege access, add each identity separately with this principal identifier:

```text
principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/ENTRA_OID
```

Replace `PROJECT_NUMBER`, `POOL_ID`, and `ENTRA_OID` with your numeric Google Cloud project number, Workload Identity Pool ID, and Microsoft Entra object ID.

To grant access to every identity accepted by the Workload Identity Pool, you can instead use this principal set:

```text
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/*
```

> [!CAUTION]
> The wildcard principal set grants the role to every identity that successfully federates through the pool. The provider issuer, allowed audience, attribute mapping, and any attribute condition still control which tokens are accepted. If the pool contains multiple providers, the wildcard can include identities from all of them. Use individual subject bindings or a narrower attribute-based principal set when least-privilege access is required.

Grant the selected principal or principal set these roles at the narrowest appropriate resource scope:

| Role | Role ID |
|---|---|
| BigLake Viewer | `roles/biglake.viewer` |
| Service Usage Consumer | `roles/serviceusage.serviceUsageConsumer` |

### Configure access to the table data

The Google Lakehouse runtime catalog must be able to authorize access to the Cloud Storage buckets that contain the table data:

- If the catalog uses credential vending, grant the catalog's auto-provisioned service account the **Storage Object User** role (`roles/storage.objectUser`) on every associated bucket. The federated Microsoft Entra identity doesn't need direct access to those buckets.
- If the catalog uses end-user credentials, grant the federated principal the required read access to every associated bucket.

For more information about catalog credential modes and required roles, see [Set up the Apache Iceberg REST catalog endpoint](https://docs.cloud.google.com/lakehouse/docs/set-up-lakehouse-iceberg-rest-catalog).

## Gather the catalog connection values

Before you create the Fabric connection, gather these values from Google Cloud:

- **URL** - Use the stable Google Lakehouse Apache Iceberg REST catalog endpoint: `https://biglake.googleapis.com/iceberg/v1/restcatalog`.
- **Warehouse** - For a multiple-bucket catalog, use `bl://projects/PROJECT_ID/catalogs/CATALOG_ID`. For a single-bucket catalog, use `gs://CLOUD_STORAGE_BUCKET_NAME`.
- **Project ID** - Use the Google Cloud project that is billed for requests to the Apache Iceberg REST catalog endpoint.
- **Project number** - Use the numeric project number for the project that owns the Workload Identity Pool.
- **Pool ID** - Use the ID of the Workload Identity Pool that trusts Microsoft Entra tokens.
- **Provider ID** - Use the ID of the OIDC provider that you configured in the pool.

For more information about warehouse paths and catalog types, see [About the Apache Iceberg REST catalog endpoint](https://docs.cloud.google.com/lakehouse/docs/about-iceberg-rest-catalog-endpoint).

## Create a mirrored Google Lakehouse runtime catalog

Follow these steps to create a mirrored Google Lakehouse runtime catalog in Fabric.

1. Go to https://powerbi.com.

1. Select **+ New**, and then select **Mirrored Google Lakehouse runtime catalog (preview)**.

1. Select an existing connection if you have one configured.

   If you don't have an existing connection, create a connection and enter the required details:

   - For **URL**, enter `https://biglake.googleapis.com/iceberg/v1/restcatalog`.
   - For **Warehouse**, enter the `bl://` or `gs://` warehouse path for your catalog.
   - For **Project ID**, enter the Google Cloud project that is billed for catalog requests.
   - For the Workload Identity Federation settings, enter the numeric **Project number**, **Pool ID**, and **Provider ID** that you recorded in [Configure Google Cloud Workload Identity Federation](#configure-google-cloud-workload-identity-federation).
   - Authenticate with a Microsoft Entra identity that you added as an IAM principal.

1. After you connect to the Google Lakehouse runtime catalog, on the **Choose data** page, select the **Catalog scope** that you want to mirror. Then, through the inclusion and exclusion lists, select the namespaces and tables that you want to add to Fabric.

   - You can only see the namespaces and tables that the federated Microsoft Entra identity has permission to access.
   - By default, the **Automatically sync future tables** option is enabled. For more information, see [Google Lakehouse runtime catalog mirroring](google-lakehouse-runtime.md#metadata-sync).

   When you finish making selections, select **Next**.

1. On the **Review and create** page, review the details and set the mirrored catalog item name. The name must be unique in your workspace. Select **Create**.

1. A mirrored Google Lakehouse runtime catalog item is created. For each table, a corresponding shortcut is also automatically created.

   - Namespaces that don't contain tables aren't shown.

1. Preview data by selecting a table or opening the SQL analytics endpoint. Open the SQL analytics endpoint item to launch the Explorer and Query editor page. You can query your mirrored tables with T-SQL in the SQL Editor.

## Create lakehouse shortcuts to the mirrored catalog item

You can also create shortcuts from a lakehouse to your mirrored Google Lakehouse runtime catalog item so you can use the catalog data with lakehouse data and Spark notebooks.

1. Create a lakehouse. If you already have a lakehouse in this workspace, you can use the existing one.
   1. Select your workspace in the navigation menu.
   1. Select **+ New** > **Lakehouse**.
   1. Enter a name for your lakehouse, and then select **Create**.
1. In the **Explorer** view of your lakehouse, in the **Get data in your lakehouse** menu, under **Load data in your lakehouse**, select **New shortcut**.
1. Select **Microsoft OneLake**. Select the mirrored Google Lakehouse runtime catalog item that you created in the previous steps, and then select **Next**.
1. Select tables within the namespace, and then select **Next**.
1. Select **Create**.
1. The shortcuts are now available in your lakehouse. You can use notebooks and Spark to process the Google Lakehouse runtime catalog data together with your other lakehouse data.

## Related content

- [Google Lakehouse runtime catalog mirroring](google-lakehouse-runtime.md)
- [Limitations in Microsoft Fabric catalog mirroring for Google Lakehouse runtime catalog](google-lakehouse-runtime-limitations.md)
