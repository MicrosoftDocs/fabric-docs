---
title: Overview of advanced networking settings
description: Learn how to configure advanced networking admin settings in Fabric.
author: msmimart
ms.author: mimart
ms.custom:
  - tenant-setting
ms.topic: concept-article
ms.date: 04/08/2026
LocalizationGroup: Administration
---

# Overview of advanced networking settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Tenant-level Private Link

Increase security by allowing people to use a [Private Link](/azure/private-link) to access your Fabric tenant. Someone must finish the setup process in Azure. If that's not you, grant permission to the right person or group by entering their email address.

Review the considerations and limitations before enabling private endpoints.

To learn more, see [Private endpoints for secure access to Power BI](/power-bi/enterprise/service-security-private-links).

## Block Public Internet Access

For extra security, block access to your Fabric tenant via the public internet. This means people who don't have access to the Private Link won't be able to connect. Turning this on can take 10 to 20 minutes to take effect.

To learn more, see [Private endpoints for secure access to Power BI](/power-bi/enterprise/service-security-private-links).

## Configure workspace-level inbound network rules

When this setting is on, workspace admins can configure inbound private link access protection in workspace settings. When a workspace is configured to restrict inbound network access, existing tenant-level private links can no longer connect to that workspace.

If you turn this setting off, all workspaces revert to their previous inbound network configuration.

For more information, see [Workspace-level inbound network rules](https://go.microsoft.com/fwlink/?linkid=2272575).

## Configure workspace-level outbound network rules

When this setting is on, workspace admins can configure outbound access protection in workspace settings.

If you turn this setting off, outbound access protection is also turned off in all workspaces in the tenant.

For more information, see [Workspace-level outbound network rules](https://go.microsoft.com/fwlink/?linkid=2310620).

## Configure workspace IP firewall rules (preview)

When this setting is enabled, workspace admins can configure IP firewall rules in workspace settings.

If tenant-level public access is blocked, turning on this setting still allows workspace admins to permit access from specific IP rules.

For more information, see [Workspace IP firewall rules](https://go.microsoft.com/fwlink/?linkid=2223103).

## Related content

* [About tenant settings](tenant-settings-index.md)
* [Private endpoints for secure access to Power BI](/power-bi/enterprise/service-security-private-links)
