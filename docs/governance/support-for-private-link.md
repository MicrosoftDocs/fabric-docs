---
# Required metadata
# For more information, see https://learn.microsoft.com/en-us/help/platform/learn-editor-add-metadata
# For valid values of ms.service, ms.prod, and ms.topic, see https://learn.microsoft.com/en-us/help/platform/metadata-taxonomies

title: External data share support for Private Links
description: Workspace private links block all public inbound access — including external data shares — by default. Turning on the "Allow external data shares to access this workspace" setting lets external data share traffic through while all other inbound access stays blocked. It applies only to the providing workspace and doesn't change how shares are created/accepted.
author: kgremban
ms.author: kgremban
ms.reviewer: shinarayanan
ms.topic:  how-to
ms.date:     07/08/2026
---

# Support for private link enabled workspaces

By default, External Data Share doesn't work on workspaces that have inbound network restrictions (workspace-level private links) turned on. A workspace administrator can enable the **Allow external data shares to access this workspace** setting for data consumers to access data protected workspaces.

## Prerequisites

- External data sharing is enabled in both the data producer and data consumer tenants.

- You have the **Admin** role on the workspace you want to configure.

- Inbound network restrictions (workspace private links) is enabled on the workspace.

## Enable the setting in the workspace

You must have the workspace **Admin** role to perform these steps.

1. Go to the providing workspace and open **Workspace settings**.

1. Select **Network security** > **Inbound networking**.

1. Under the workspace connection settings, turn on **Allow external data shares to access this workspace**.

1. Save your changes.

After you enable the setting, it can take up to 30 minutes for the setting to take effect.

## Verify access

1. Ask the consumer to refresh or retry reading the shared data.

1. Confirm the consumer can access the shared data.

## What happens when the setting is off

If **Allow external data shares to access this workspace** is off and inbound network restrictions are enabled, consumers see a message that access is blocked by network restrictions. They must ask the workspace administrator to enable the setting.

## Related content

- [External data sharing overview](/fabric/governance/external-data-sharing-overview)

- [Create an external data share](/fabric/governance/external-data-sharing-create)

- [Accept an external data share](/fabric/governance/external-data-sharing-accept)

- [Manage external data shares](/fabric/governance/external-data-sharing-manage)

