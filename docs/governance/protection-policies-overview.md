---
title: "Protection policies in Microsoft Fabric"
description: "This article describes Microsoft Purview protection policies in Microsoft Fabric."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: concept-article #Don't change
ms.date: 11/21/2024

#customer intent: As a security admin, Fabric admin, Fabric user, or business decision maker, I want to learn about how protection policies control access to items in Fabric. 

---

# Protection policies in Microsoft Fabric (preview)

Microsoft Purview protection access control policies (protection policies) enable organizations to control access to items in Fabric using sensitivity labels.

The target audience for this article is security and compliance admins, Fabric admins and users, and anyone else who wants to learn about how protection policies control access to items in Fabric. If you want to see how to create a protection policy for Fabric, see [Create and manage protection policies for Fabric (preview)](./protection-policies-create.md).

## How do protection policies for Fabric work?

Each protection policy for Fabric is associated with a sensitivity label. The policy controls access to an item that has the associated label by allowing users and groups specified in the policy to retain permissions they have on the item, while blocking access for everyone else. The policy can:

* Allow specified users and groups to retain *read* permission on labeled items if they have it. Any other permissions they have on the item will be removed.

    and/or

* Allow specified users and groups to retain *full control* on the labeled item if they have it, or to retain whatever permissions they do have.

As mentioned, the policy blocks access to the item for all users and groups that aren't specified in the policy.

> [!NOTE]
> A protection policy doesn't apply to a label issuer. That is, the user that last applied a label associated with a protection policy to an item won't be denied access to that item, even if they aren't specified in the policy. For example, if a protection policy is associated with label A, and a user applies label A to an item, that user will be able to access the item even if they're not specified in the policy.

## Use cases

The following are examples of where protection policies could be useful: 

* An organization wants only users within the organization to be able to access items labeled as "Confidential".
* An organization wants only users in the finance department to be able to edit data items labeled as "Financial data", while allowing other users in the organization to be able to read those items.

## Who creates protection policies for Fabric?

Protection policies for Fabric are generally configured by an organization's Purview security and compliance teams. The protection policy creator must have role of [Information Protection Admin](/defender-office-365/scc-permissions#role-groups-in-microsoft-defender-for-office-365-and-microsoft-purview) or higher. For more information, see [Create and manage protection policies for Fabric (preview)](./protection-policies-create.md).

## Requirements

*  A Microsoft 365 E3/E5 license as required for sensitivity labels from Microsoft Purview Information Protection. For more information, see [Microsoft Purview Information Protection: Sensitivity labeling](/office365/servicedescriptions/microsoft-365-service-descriptions/microsoft-365-tenantlevel-services-licensing-guidance/microsoft-365-security-compliance-licensing-guidance#microsoft-purview-information-protection-sensitivity-labeling).

* At least one "appropriately configured" sensitivity label from Microsoft Purview Information Protection must exist in the tenant. "Appropriately configured" in the context of protection policies for Fabric means that when the label was configured, it was scoped to **Files & other data assets**, and its protection settings were set to include **Control access** (for information about sensitivity label configuration, see [Create and configure sensitivity labels and their policies](/purview/create-sensitivity-labels)). Only such "appropriately configured" sensitivity labels can be used to create the protection policies for Fabric.

* For protection policies to be enforced in Fabric, the Fabric tenant setting **Allow users to apply sensitivity labels for content** must be enabled. This setting is required for all sensitivity label related policy enforcement in Fabric, so if sensitivity labels are already being used in Fabric, this setting will already be on. For more information about enabling sensitivity labels in Fabric, see [Enable sensitivity labels](/power-bi/enterprise/service-security-enable-data-sensitivity-labels#enable-sensitivity-labels).

## Supported item types

Protection policies are supported for all native Fabric items types, and for Power BI semantic models. All other Power BI item types aren't currently supported.

## Considerations and limitations

* Up to 50 protection policies can be created.

* Up to 100 users and groups can be added to a protection policy.

* Protection policies for Fabric don't support guest/external users.

* ALM pipelines won't work in scenarios where a user creates an ALM pipeline in a workspace that contains an item protected by a protection policy that doesn't include the user.

* After a policy has been created, it may take up to 30 minutes for it to start detecting and protecting items labeled with the sensitivity label that was associated with the policy.

## Related content

* [Create and manage protection policies for Fabric (preview)](./protection-policies-create.md)
* [Authoring and publishing protection policies (preview)](/purview/how-to-create-protection-policy)