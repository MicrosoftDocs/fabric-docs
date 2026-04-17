---
title: Publishing Overview
description: Overview on how to publish a workload in Fabric.
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 04/08/2026
ai-usage: ai-assisted
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

1. **Prepare your manifest package** - See [Manifest overview](manifest-overview.md) for detailed instructions.

1. **Upload the package** - Upload your `.nupkg` file through the Fabric Admin Portal. For detailed upload steps, see [Upload a workload](tutorial-publish-workload.md#upload-a-workload). Before uploading, make sure the `WorkloadName` field in your [workload manifest](manifest-workload.md) is set to the intended Workload Name in the format `Org.[WorkloadName]` (for example, `Org.SalesInsights`). No separate registration is required for organizational publishing.

1. **Set up tenant configuration** - Ensure tenant settings and capacity are configured so users can create and use your items.

**Outcome**: Your workload is available to users in your tenant through the Workload Hub and behaves like a native experience.

## Cross-tenant publishing: Workload Hub distribution

This scenario is for Independent Software Vendors (ISVs) and Software Development Companies that want to make their workloads available to all Fabric customers through the Workload Hub.

### Prerequisites for Workload Hub distribution

Before you begin publishing to the Workload Hub, ensure you have:

- **Publishing tenant**: Define the tenant that manages your workload lifecycle.
- **Unique Workload Name**: Choose a unique identifier in the form `[Publisher].[Workload]` (for example, `Contoso.SalesInsights`). The Workload portion cannot exceed 32 characters. Set this value in your [workload manifest](manifest-workload.md) before uploading.

### Steps for Workload Hub distribution

1. **Prepare your manifest package** - See [Manifest overview](manifest-overview.md) for detailed instructions. Make sure the `WorkloadName` field uses the `[Publisher].[Workload]` format.
1. **Upload the package** - Upload your `.nupkg` file through the Fabric Admin Portal. For detailed upload steps, see [Upload a workload](tutorial-publish-workload.md#upload-a-workload). On the first upload, a **Confirm workload Name** dialog appears. The Workload Name is taken from your manifest and can't be changed in this dialog. Confirm the Workload Name to begin registration and select **Confirm**.

   > [!IMPORTANT]
   > The Workload Name is permanently reserved in your tenant after confirmation and can't be changed.

1. **Test with other tenants** - After the Workload Name is registered, select your workload in the Admin Portal and go to the **Publish** tab. Under **Publish to**, select **Selected tenants** and add up to 20 tenant IDs to test your workload with before broader distribution. Select a version and then select **Publish**.

   > [!NOTE]
   > It might take up to 10 minutes after publishing before the workload is visible in target tenants while the Workload Name propagates across Fabric clusters. Target tenants can only see and use your workload if their admin has enabled the **Users can see and work with additional workloads not validated by Microsoft** [tenant setting](../admin/tenant-settings-index.md#additional-workloads).
1. **Meet publishing requirements** - Review comprehensive requirements that cover workload functionality, compliance, and user experience standards.
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

- **Registration issues**: Confirm publishing tenant and unique Workload Name
- **Upload failures**: Verify manifest schema and required fields
- **iFrame load issues**: Verify front-end endpoint, HTTPS/CSP, and host integration  
- **Authentication issues**: Confirm Microsoft Entra registration and scopes

## Related content

- [Publishing Requirements](./publishing-requirements-overview.md)
- [Manifest overview](manifest-overview.md)
