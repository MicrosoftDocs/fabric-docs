---
title: Publishing Overview
description: Overview on how to publish a workload in Fabric.
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# Publishing overview

This article provides a comprehensive overview of how to publish a workload in Microsoft Fabric. There are two distinct publishing scenarios based on your organization type and distribution goals:

## Publishing Scenarios

- **Internal publishing**: Deploy to your own tenant for organizational use
- **Cross-tenant publishing**: Distribute through Workload Hub to other tenants

> [!NOTE]  
> **For Organizations**: Follow the overview and general requirements for internal publishing
> **For Cross-tenant distribution**: Complete all sections including cross-tenant specific requirements

### Scenario Details

1. **Organizational scenario**: Publish to your own tenant for internal use
2. **ISV/Software Development Company scenario**: Publish to the Workload Hub for external distribution

## General requirements

All workloads must meet fundamental requirements regardless of publishing scenario. These include Microsoft Entra custom domain verification, workload development completion, manifest configuration, and authentication setup.

> [!NOTE]
> These general requirements apply to both internal and cross-tenant publishing scenarios

📋 **[General Publishing Requirements](./publishing-requirements-general.md)** - Complete guide to infrastructure, hosting, authentication, and configuration requirements that apply to all workloads.

## Organizational scenario: Internal tenant publishing

This scenario is designed for organizations that want to deploy workloads for internal use within their own Fabric tenant.

### Steps for organizational publishing

1. **Prepare your manifest package** - See [Manifest overview](manifest-overview.md) for detailed instructions
2. **Upload the package** - Use the Fabric Admin Portal to enable the workload for your tenant
3. **Configure preview audience** (optional) - Enable specific test tenants or users for early feedback
4. **Set up tenant configuration** - Ensure tenant settings and capacity are configured so users can create and use your items

**Outcome**: Your workload is available to users in your tenant through the Workload Hub and behaves like a native experience.

## Cross-tenant publishing: Workload Hub distribution

This scenario is for Independent Software Vendors (ISVs) and Software Development Companies that want to make their workloads available to all Fabric customers through the Workload Hub.

### Prerequisites for Workload Hub distribution

Before you begin publishing to the Workload Hub, ensure you have:

- **Publishing tenant**: Define the tenant that manages your workload lifecycle
- **Unique Workload ID**: Choose a unique identifier in the form `[Publisher].[Workload]` (for example, `Contoso.SalesInsights`)
- **Workload registration**: Complete registration at <https://aka.ms/fabric_workload_registration>

> [!IMPORTANT]
> Your Workload ID is fixed once registered and approved. Set this ID in your [workload manifest](manifest-workload.md) before publishing.

### Steps for Workload Hub distribution

1. **Meet publishing requirements** - Review comprehensive requirements that cover workload functionality, compliance, and user experience standards
2. **Submit publishing request** - Use the [Publishing Request Form](https://aka.ms/fabric_workload_publishing) to move to Preview
3. **Address validation feedback** - Work with Microsoft to address any requirements and validation feedback
4. **Preview listing** - Once accepted, your workload is listed as Preview to all tenants
5. **General Availability** - When ready for GA, submit the publishing request again to remove the preview badge

📋 **[Publishing Requirements](./publishing-requirements-overview.md)** - Complete guide to all requirements, validation tools, and processes

> [!IMPORTANT]
> Publishing requirements are only required for ISV/Software Development Company scenarios that distribute workloads through the Workload Hub. Organizations publishing workloads for internal tenant use do not need to meet these requirements.

**Outcome**: Your workload is available to all Fabric tenants, with controls for preview audiences and general availability.

## Troubleshooting

Common issues and solutions during the publishing process:

- **Registration issues**: Confirm publishing tenant and unique Workload ID approval
- **Upload failures**: Verify manifest schema and required fields
- **iFrame load issues**: Verify front-end endpoint, HTTPS/CSP, and host integration  
- **Authentication issues**: Confirm Microsoft Entra registration and scopes

## Related content

- [Publishing Requirements](./publishing-requirements-overview.md)
- [Manifest overview](manifest-overview.md)
