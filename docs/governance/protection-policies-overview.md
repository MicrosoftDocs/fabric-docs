---
title: "Protection policies in Microsoft Fabric"
description: "This article describes Microsoft Purview protection policies in Microsoft Fabric."
author: msmimart
ms.author: mimart
ms.topic: concept-article
ms.date: 12/03/2025

#customer intent: As a security admin, Fabric admin, Fabric user, or business decision maker, I want to learn about how protection policies control access to items in Fabric. 

---

# Protection policies in Microsoft Fabric 

Microsoft Purview protection access control policies (protection policies) enable organizations to control access to items in Fabric using sensitivity labels.

The target audience for this article is security and compliance admins, Fabric admins and users, and anyone else who wants to learn about how protection policies control access to items in Fabric. If you want to see how to create a protection policy for Fabric, see [Create and manage protection policies for Fabric](./protection-policies-create.md).

## How do protection policies for Fabric work?

Each protection policy for Fabric is associated with a sensitivity label. The policy controls access to an item that has the associated label by allowing users and groups specified in the policy to retain permissions they have on the item, while blocking access for everyone else. 

The policy can allow specified users and groups to retain full control on the labeled item if they currently have it. All other users and groups are blocked from accessing the item.

> [!NOTE]
> A protection policy doesn't apply to a label issuer. That is, the user that last applied a label associated with a protection policy to an item won't be denied access to that item, even if they aren't specified in the policy. For example, if a protection policy is associated with label A, and a user applies label A to an item, that user will be able to access the item even if they're not specified in the policy.

## View an item's restricted users 

In the Fabric admin portal, you can use the OneLake catalog to view an item's permissions and determine which users are restricted from accessing it. The Permissions tab in the item's details is visible to you if you have a role of Admin or Member in the workspace containing the item.

To view an item's permissions in the Fabric admin portal, open the **OneLake catalog**, locate the item (optionally filter by workspace), and select its name to open the item details. Then, select the **Permissions** tab to see the list of users and groups that have access to the item, including those restricted by a protection policy.

## Use cases

Protection policies are useful in scenarios where organizations need to restrict access to sensitive items. For example, an organization might want to ensure that only specific internal users can access items labeled as "Confidential," while blocking access for everyone else.

## Who creates protection policies for Fabric?

Protection policies for Fabric are generally configured by an organization's Purview security and compliance teams. The protection policy creator must have role of [Information Protection Admin](/defender-office-365/scc-permissions#role-groups-in-microsoft-defender-for-office-365-and-microsoft-purview) or higher. For more information, see [Create and manage protection policies for Fabric](./protection-policies-create.md).

## Requirements

*  A Microsoft 365 E3/E5 license is required for sensitivity labels from Microsoft Purview Information Protection. For more information, see [Microsoft Purview Information Protection: Sensitivity labeling](/office365/servicedescriptions/microsoft-365-service-descriptions/microsoft-365-tenantlevel-services-licensing-guidance/microsoft-365-security-compliance-licensing-guidance#microsoft-purview-information-protection-sensitivity-labeling).

* At least one "appropriately configured" sensitivity label from Microsoft Purview Information Protection must exist in the tenant. "Appropriately configured" in the context of protection policies for Fabric means that when the label was configured, it was scoped to **Files & other data assets**, and its protection settings were set to include **Control access** (for information about sensitivity label configuration, see [Create and configure sensitivity labels and their policies](/purview/create-sensitivity-labels)). Only such "appropriately configured" sensitivity labels can be used to create the protection policies for Fabric.

* For protection policies to be enforced in Fabric, the Fabric tenant setting **Allow users to apply sensitivity labels for content** must be enabled. This setting is required for all sensitivity label related policy enforcement in Fabric, so if sensitivity labels are already being used in Fabric, this setting will already be on. For more information about enabling sensitivity labels in Fabric, see [Enable sensitivity labels](/power-bi/enterprise/service-security-enable-data-sensitivity-labels#enable-sensitivity-labels).

## Supported item types

Protection policies are supported for all native Fabric item types, including lakehouses, notebooks, pipelines, and other core Fabric assets. 

Additionally, protection policies are supported for Power BI semantic models. Other Power BI item types, such as reports and dashboards, aren't currently supported.

## Considerations and limitations

* Up to 50 protection policies can be created.

* Up to 100 users and groups can be added to a protection policy.

* Protection policies for Fabric don't support guest/external users.

* Protection policies don't integrate with Fabric CI/CD solutions. Deployment pipelines and Git integration use only workspace permissions, not item-level permissions from protection policy labels.

* After a policy has been created, it can take up to 24 hours for it to start detecting and protecting items labeled with the sensitivity label that was associated with the policy.

* For native Fabric item types, if the label is applied automatically by the system—such as in the case of [downstream inheritance](/power-bi/enterprise/service-security-sensitivity-label-downstream-inheritance)—and there is no designated label issuer, the user who created the artifact will not be restricted by protection policies.

## Related content

* [Create and manage protection policies for Fabric](./protection-policies-create.md)
* [Authoring and publishing protection policies](/purview/how-to-create-protection-policy)
