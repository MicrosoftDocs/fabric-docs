---
title: Publish your workload
description: Learn the different ways how to publish your workload and make it available in Fabric
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 12/15/2025
---

# Publish your workload

This article explains how to publish an Extensibility Toolkit workload in Fabric. It mirrors the original Workload Development Kit flow and covers both organizational publishing and optional cross-tenant publishing via the Workload Hub.

## Before you begin

- Define your publishing tenant (the tenant that manages your workload lifecycle).
- Choose a unique Workload ID in the form `[Publisher].[Workload]` (for example, `Contoso.SalesInsights`). This value is fixed once registered.
- Complete workload registration: https://aka.ms/fabric_workload_registration

Once registration is approved, set the Workload ID in your [workload manifest](manifest-workload.md) and upload the package in the Fabric Admin Portal to begin publishing.

## Publishing stages

### 1. Organizational publishing (your tenant)

Use this path to deploy and validate the workload inside your organization.

1. Prepare your manifest package. See [Manifest overview](manifest-overview.md).
2. Upload the package in the Fabric Admin Portal to enable the workload for your tenant.
3. Optionally enable a preview audience (specific test tenants or users) for early feedback.
4. Ensure tenant settings and capacity are configured so users can create and use your items.

Outcome: Your workload is available in your tenant’s Workload Hub and behaves like a native experience.

### 2. Cross-tenant publishing (optional)

Make your workload discoverable to all Fabric customers via the Workload Hub.

1. Review the [Publishing guidelines and requirements](../workload-development-kit/publish-workload-requirements.md).
2. Submit the [Publishing Request Form](https://aka.ms/fabric_workload_publishing) to move to Preview.
3. Address validation feedback and requirements; once accepted, your workload is listed as Preview to all tenants.
4. When ready for GA, submit the publishing request again for GA. The preview badge is removed once approved.

> [!IMPORTANT]
> Cross-tenant listing requires meeting all [Workload publishing requirements](../workload-development-kit/publish-workload-requirements.md). These include customer experience, security, support, and operational criteria.

Outcome: Your workload appears in all tenants’ Workload Hub with stage indicators (Preview or GA).

## Troubleshooting

- Registration issues: confirm publishing tenant and unique Workload ID approval.
- Upload failures: verify manifest schema and required fields.
- iFrame load issues: verify front-end endpoint, HTTPS/CSP, and host integration.
- Auth issues: confirm Microsoft Entra registration and scopes.

## Related content

- Reference flow: [Publish a workload to the Workload Hub](../workload-development-kit/publish-workload-flow.md)
- [Publishing guidelines and requirements](../workload-development-kit/publish-workload-requirements.md)
- [Manifest overview](manifest-overview.md)
