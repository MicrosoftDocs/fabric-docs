---
title: "Limitations in Microsoft Fabric catalog mirroring for Google Lakehouse runtime catalog"
description: Learn about limitations for Google Lakehouse runtime catalog mirroring in Microsoft Fabric.
author: kgremban
ms.author: kgremban
ms.reviewer: mahi
ms.date: 08/21/2026
ms.topic: limits-and-quotas
ai-usage: ai-assisted
---

# Limitations in Microsoft Fabric catalog mirroring for Google Lakehouse runtime catalog

This article lists current limitations and considerations with Google Lakehouse runtime catalog mirroring in Microsoft Fabric.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

## Limitations and considerations

- You can only mirror Apache Iceberg V2 tables. Google Lakehouse runtime catalog doesn't support Iceberg V1 tables.
- The Google Lakehouse Apache Iceberg REST catalog endpoint supports only Parquet data files.
- Fabric automatically converts tables you mirror from Google Lakehouse runtime catalog from Iceberg to Delta Lake. This conversion is subject to the [limitations of the Iceberg to Delta Lake conversion feature](../../onelake/onelake-iceberg-tables.md#limitations-and-considerations).
- Fabric accesses the Apache Iceberg REST catalog endpoint and the Google Cloud Storage location of every mirrored table through the public internet. Catalog mirroring doesn't currently support firewall rules or other network restrictions. Microsoft plans to address this limitation.
- You can mirror up to 500 tables at once. This limit applies to both individually selected tables and tables that are automatically mirrored.
- The Google Lakehouse Apache Iceberg REST catalog endpoint limits each Iceberg `metadata.json` file to 1 MB.
- Mirrored Google Lakehouse runtime catalog data is read-only in Fabric. You can't write back to the source tables through the mirrored item.
- Fine-grained access permissions that you define in Google Cloud, such as row-level and column-level security, aren't enforced on the mirrored item in Fabric. Grant access to the mirrored item through [OneLake security](../../onelake/security/get-started-onelake-security.md), and review the mirrored item as its own access surface.
- You must keep the Workload Identity Pool and OIDC provider enabled. Disabling either resource, deleting the provider, removing an IAM binding, or revoking the **BigLake Viewer** or **Service Usage Consumer** role prevents Fabric from accessing the catalog.
- The OIDC provider issuer and allowed audience must exactly match the Microsoft Entra token claims. The issuer must include the trailing slash in `https://sts.windows.net/{TENANT_ID}/`, and the allowed audience must be `https://analysis.windows.net/powerbi/connector/MirroredGoogleLakehouseRuntimeCatalog`.
- The required attribute mapping is `google.subject = assertion.oid`. If you delete and recreate an authorized Microsoft Entra identity, its object ID changes and you must add a new Google Cloud IAM principal binding.
- A pool-wide `principalSet` wildcard grants its roles to every identity that successfully federates through the Workload Identity Pool, potentially including identities from multiple providers. Use individual subject bindings or a narrower attribute-based principal set when possible.
- Google Lakehouse runtime catalog doesn't support database, metastore, and Apache Iceberg views. These views aren't available in the mirrored item.

For Google Cloud service limitations that also apply to the source catalog, see [Lakehouse runtime catalog limitations](https://docs.cloud.google.com/lakehouse/docs/about-lakehouse-catalogs#lakehouse_runtime_catalog_limitations) and [Apache Iceberg REST catalog endpoint limitations](https://docs.cloud.google.com/lakehouse/docs/set-up-lakehouse-iceberg-rest-catalog#limitations).

## Related content

- [Tutorial: Configure mirrored Google Lakehouse runtime catalog](google-lakehouse-runtime-tutorial.md)
- [Google Lakehouse runtime catalog mirroring](google-lakehouse-runtime.md)
