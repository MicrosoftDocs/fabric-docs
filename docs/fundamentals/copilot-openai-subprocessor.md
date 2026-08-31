---
title: OpenAI as a subprocessor in Microsoft Fabric
description: Learn how Microsoft Fabric uses OpenAI as a subprocessor to deliver AI-powered Copilot experiences, and how administrators can manage this capability.
author: mayurjain
ms.author: mayurjain
ms.topic: how-to
ms.date: 07/10/2026
ai-usage: ai-assisted
---

# OpenAI as a subprocessor in Microsoft Fabric

> [!IMPORTANT]
> The information in this article only applies to OpenAI models operated by OpenAI (provided by OpenAI as a subprocessor). The information doesn't apply to OpenAI models operated by Microsoft (Azure OpenAI).

Microsoft Fabric is expanding options for how OpenAI models can be delivered within Copilot, AI Agents and other AI experiences. In addition to OpenAI models that Microsoft operates (Azure OpenAI), Fabric now provides OpenAI-operated models through OpenAI as a subprocessor. This option gives your organization the foundation for more model flexibility, including quicker access to newest AI model innovations, while maintaining enterprise-grade commitments and safeguards.

OpenAI is included in the Microsoft Online Services Subprocessors List and is available for use within Fabric.
As a subprocessor, OpenAI operates with Microsoft oversight through contractual safeguards and appropriate technical and organizational measures. The [Microsoft Product Terms](https://www.microsoft.com/licensing/terms) and [Microsoft Data Protection Addendum (DPA)](https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA) apply to use of OpenAI models through Microsoft Fabric, except as otherwise disclosed in [Current limitations](#current-limitations).

For more information about subprocessor data access, see [Microsoft Data Access](https://www.microsoft.com/trust-center/privacy/data-access). To see a list of Microsoft subprocessors, see the [Service Trust Portal](https://servicetrust.microsoft.com/DocumentPage/86b17afa-bc9e-439a-8987-e82929d2c7ab).

## Considerations for using OpenAI as a subprocessor

- OpenAI models delivered through OpenAI as a subprocessor in Copilot experiences are currently excluded from country/region-specific processing commitments when applicable.
- Access to OpenAI-operated models isn't currently available for use in government clouds (GCC, GCC High, DoD) or sovereign clouds.
- OpenAI-operated models are included in the EU Data Boundary, except as otherwise noted in the [EU Data Boundary documentation](https://aka.ms/AA138pkr).
- Enabling this feature will allow data to egress outside of Fabric's compliance boundary to a third-party system or infrastructure that may have lower compliance controls (for example, may not comply with FedRAMP or Supply Chain Risk Management). The tenant administrator is responsible for ensuring features meet their organization's security requirements and compliance obligations.
- When enabled, Fabric users may configure Fabric data agents to be consumed from other services such as Microsoft Foundry, Microsoft Copilot Studio, Microsoft 365 Copilot, or as an MCP server ("non-Fabric services"). When users connect to these non-Fabric services, responses returned by Fabric data agents may be sent outside of Fabric's compliance boundary or geographic region, and processed or stored according to the applicable terms and data handling policies of the non-Fabric services.

## Manage OpenAI as a subprocessor in the Fabric Admin Portal

## Enable the use of OpenAI-operated models

You can choose to enable OpenAI-operated models so that they're available for your organization. You must be a member of the [Fabric Administrator](../admin/roles.md) or [Global Administrator](/entra/identity/role-based-access-control/permissions-reference#global-administrator) role to perform this task. For more information, see [Understand Microsoft Fabric admin roles](../admin/roles.md).

To enable the use of OpenAI-operated models:

1. Go to the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal) and select **Tenant settings**.
1. Under the **Copilot and AI** section, locate **Users can use Copilot, AI Agents, and other AI experiences powered by OpenAI as a Microsoft Subprocessor**.
1. Toggle the setting to **Enabled**.
1. Under **Apply to**, select **The entire organization**, or specify security groups to include. Optionally, specify security groups to exclude.
1. Select **Apply**.

The following screenshot shows how to configure this setting:

:::image type="content" source="./media/copilot-enable-fabric/openai-model-provider-setting.png" alt-text="Screenshot of the tenant setting to enable the use of OpenAI as a subprocessor." lightbox="./media/copilot-enable-fabric/openai-model-provider-setting.png":::

You can restrict user access to AI provider subprocessors by assigning permissions to specific security groups in the Fabric admin portal. These assignments are applied at the tenant level and enforced across all Fabric Copilot and AI Agent experiences. When access is limited by security group membership, only members of the specified groups can use Copilot features that rely on that AI provider. For more information on tenant settings, see [About tenant settings](../admin/about-tenant-settings.md).

## Disable the use of OpenAI-operated models

Some features or models may only be available when the use of OpenAI is enabled. If you disable OpenAI as a subprocessor, such features or models may no longer be accessible.

You can disable the use of OpenAI-operated models in the Fabric admin portal. You must be a member of the [Fabric Administrator](../admin/roles.md) or [Global Administrator](/entra/identity/role-based-access-control/permissions-reference#global-administrator) role to perform this task. For more information, see [Understand Microsoft Fabric admin roles](../admin/roles.md).

To disable the use of OpenAI-operated models:

1. Go to the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal) and select **Tenant settings**.
1. Under the **Copilot and AI** section, locate **Users can use Copilot, AI Agents, and other AI experiences powered by OpenAI as a Microsoft Subprocessor**.
1. Toggle the setting to **Disabled**.
1. Select **Apply**.

After you disable OpenAI as a subprocessor, users won't have the option to use OpenAI-operated AI models in Fabric Copilot experiences. You can choose to enable OpenAI-operated models at a later date if desired.

## Data residency considerations for OpenAI

Data residency can be controlled by the setting **Data sent to OpenAI as a Microsoft subprocessor can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance**. This setting is only applicable for customers who want to use Copilot and AI features in Fabric powered by OpenAI, and whose capacity's geographic region is outside of the EU data boundary and the US. When this setting is enabled, service background jobs may execute across geographic boundaries at no additional charge to the tenant capacity to support end user experiences.

To configure this setting:

1. Go to the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal) and select **Tenant settings**.
1. Under the **Copilot and AI** section, locate **Data sent to OpenAI as a Microsoft Subprocessor can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance**.
1. Toggle the setting to **Enabled** or **Disabled** based on your organization's data residency requirements.
1. Under **Apply to**, select **The entire organization** or specify security groups. Select **Apply**.

The following screenshot shows how to configure this setting:

:::image type="content" source="./media/copilot-enable-fabric/openai-cross-region-processing-setting.png" alt-text="Screenshot of the tenant setting to enable data processing outside the capacity's region with OpenAI as a subprocessor." lightbox="./media/copilot-enable-fabric/openai-cross-region-processing-setting.png":::

**Default**: Disabled

## Configure delegated capacity settings

In addition to tenant-level settings, Fabric administrators can delegate AI settings management to capacity administrators. When delegation is enabled, capacity admins can control whether Copilot and AI features — including OpenAI as a subprocessor — are available for workspaces assigned to their capacity.

Capacity-level settings work in conjunction with tenant-level settings:

- If OpenAI as a subprocessor is **disabled** at the tenant level, capacity administrators can't enable it for their capacity regardless of delegation settings.
- If OpenAI as a subprocessor is **enabled** at the tenant level and delegation is active, capacity administrators can choose to enable or disable OpenAI for their specific capacity.

To delegate the OpenAI subprocessor setting to capacity administrators:

1. Go to the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal) and select **Tenant settings**.
1. Under the **Copilot and AI** section, locate **Users can use Copilot, AI Agents, and other AI experiences powered by OpenAI as a Microsoft Subprocessor**.
1. Enable **Allow capacity admins to override this setting**.
1. Select **Apply**.

For more information, see [Copilot tenant settings](../admin/service-admin-portal-copilot.md).

## Current limitations

The following exclusions apply:

- OpenAI-operated models available through Microsoft aren't FedRAMP High authorized. If your organization requires FedRAMP High prior to use, consult with your authorization official to determine whether use of OpenAI-operated models is permitted within your environment.
- A Payment Card Industry (PCI) Data Security Standard (DSS) Attestation of Compliance (AOC) isn't available for OpenAI-operated models.
- A Health Information Trust Alliance (HITRUST) Common Security Framework (CSF) Certification Letter isn't available for OpenAI-operated models.
- A System and Organization Controls (SOC) 1 Type 2 report isn't available for OpenAI-operated models.

## Related content

- [Privacy, security, and responsible use of Copilot in Fabric](../get-started/copilot-privacy-security.md)
- [Copilot tenant settings](../admin/service-admin-portal-copilot.md)
- [Enable Copilot in Microsoft Fabric](../get-started/copilot-fabric-overview.md)
- [Microsoft Fabric data processing](../security/security-fundamentals.md)
