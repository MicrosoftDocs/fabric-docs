---
title: Metadata scanning overview
description: Learn how metadata scanning can help you govern your organizations Fabric data.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 06/15/2023
---

# Metadata scanning overview

Metadata scanning facilitates governance of your organization's Microsoft Fabric data by making it possible to catalog and report on all the metadata of your organization's Fabric items. It accomplishes this using a set of Admin REST APIs that are collectively known as the *scanner APIs*.

With the scanner APIs, you can extract information such as item name, owner, sensitivity label, and endorsement status. For Power BI semantic models, you can also extract the metadata of some of the objects they contain, such as table and column names, measures, DAX expressions, mashup queries, and so forth. The metadata of these semantic model internal objects is referred to as subartifact metadata.

For a more extensive list of the artifact and subartifact metadata that metadata scanning returns, see the [documentation for the Admin - WorkspaceInfo GetScanResult API](/rest/api/power-bi/admin/workspace-info-get-scan-result).

The following are the scanner APIs. They support both public and sovereign clouds.

* [GetModifiedWorkspaces](/rest/api/power-bi/admin/workspace-info-get-modified-workspaces)
* [WorkspaceGetInfo](/rest/api/power-bi/admin/workspace-info-post-workspace-info)
* [WorkspaceScanStatus](/rest/api/power-bi/admin/workspace-info-get-scan-status)
* [WorkspaceScanResult](/rest/api/power-bi/admin/workspace-info-get-scan-result)

> [!IMPORTANT]
> The app you develop for scanning can authenticate by using either a standard delegated admin access token or a service principal. The two authentication paths are mutually exclusive. **When running under a service principal, there must be no Power BI admin-consent-required permissions set on your app**. For more information, see [Enable service principal authentication for read-only admin APIs](../admin/metadata-scanning-enable-read-only-apis.md).

## Basic flow

* **Set up metadata scanning in the organization**: Before metadata scanning can be run, a Fabric admin needs to set it up in your organization. Fabric admins should see [Set up metadata scanning](../admin/metadata-scanning-setup.md).

* **Enable service principal authentication for admin read-only APIs**. Service principal is an authentication method that can be used to let a Microsoft Entra application access Microsoft Fabric content and APIs. See [Enable service principal authentication for admin read-only APIs](../admin/metadata-scanning-enable-read-only-apis.md).

* **Run metadata scanning**: See [Run metadata scanning](./metadata-scanning-run.md) for a walkthrough that demonstrates a how to run a scan.

## Licensing

Metadata scanning requires no special license. It works for all of your tenant's metadata, including that of items located in non-Premium workspaces.

## Related content

* [Set up metadata scanning](../admin/metadata-scanning-setup.md).
* [Enable service principal authentication for read-only admin APIs](../admin/metadata-scanning-enable-read-only-apis.md).
* [Run metadata scanning](./metadata-scanning-run.md)
* Learn about [Power BI REST Admin APIs](/rest/api/power-bi/admin).
