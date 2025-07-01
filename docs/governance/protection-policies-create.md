---
title: "Create and manage protection policies for Fabric (preview)"
description: "This article describes how to create, edit, or delete a Microsoft Purview protection policy for Microsoft Fabric."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to #Don't change
ms.date: 11/21/2024

#customer intent: As a security admin or Fabric admin, I want to learn how to create protection policies for Microsoft Fabric. 

---

# Create and manage protection policies for Fabric (preview)

This article describes how to create, edit, and delete Microsoft Purview protection policies for Microsoft Fabric. Its target audience is security and compliance admins who need to create protection policies for Fabric.

For an overview of how protection policies for Fabric work, see [Protection policies in Fabric (preview)](./protection-policies-overview.md).

## Prerequisites

To create a protection policy, the following requirements must be met:

* You must have a Microsoft 365 E3/E5 license as required for sensitivity labels from Microsoft Purview Information Protection. For more information, see [Microsoft Purview Information Protection: Sensitivity labeling](/office365/servicedescriptions/microsoft-365-service-descriptions/microsoft-365-tenantlevel-services-licensing-guidance/microsoft-365-security-compliance-licensing-guidance#microsoft-purview-information-protection-sensitivity-labeling).

* You must have at least the [Information Protection Admin](/defender-office-365/scc-permissions#role-groups-in-microsoft-defender-for-office-365-and-microsoft-purview) role to create protection policies in the Microsoft Purview portal. The Information Protection Admin role is assigned by default under the Compliance Administrator role group.

* <a name="label-prerequisites"></a>At least one "appropriately configured" sensitivity label from Microsoft Purview Information Protection must exist in the tenant. "Appropriately configured" in the context of protection policies for Fabric means that when the label was configured, it was scoped to **Files & other data assets**, and its protection settings were set to include **Control access** (for information about sensitivity label configuration, see [Create and configure sensitivity labels and their policies](/purview/create-sensitivity-labels)). Only such "appropriately configured" sensitivity labels can be used to create the protection policies for Fabric.

* If service principals need to access items protected by the protection policy you're configuring, add them to an Azure security group that you'll include in the policy. Service principals can't be added to the policy directly in the Microsoft Purview portal.

   If you don't add service principals to the allowed list of users, service principals that currently have access to data will be denied access, potentially causing your application to break. For example, service principals might be used for application authentication to access semantic models.
 
## Create a protection policy for Fabric

1. Open the **Protection policies (preview)** page in the Microsoft Purview portal.

    https://purview.microsoft.com/informationprotection/protectionpolicy.

1. On the **Protection policies (preview)** page, select **New protection policy**.

    :::image type="content" source="./media/protection-policies-create/select-new-protection-policy.png" alt-text="Screenshot of the Protection policies page, with the + New protection policy button highlighted.":::

     <a name="define-name"></a>
1. On the **Name and describe your protection policy** page, provide a name and description for the policy. When done, select **Next**.

    :::image type="content" source="./media/protection-policies-create/provide-name-description.png" alt-text="Screenshot of name and description page in protection policy configuration.":::

1. On the **Choose the sensitivity label used to detect sensitive items** page, select **+ Add sensitivity label** and choose the sensitivity label you want to associate with the policy. The label must be a label that applies encryption and is correctly configured. See [the prerequisites for details](#label-prerequisites). You can select only one label per policy.

    :::image type="content" source="./media/protection-policies-create/choose-sensitivity-label.png" alt-text="Screenshot of choose sensitivity label page in protection policy configuration.":::

    After you've chosen the label, select **Add** and then **Next**.

1. On the **Choose data sources to apply the policy** page, select **Microsoft Fabric**. If you see multiple data sources listed, be sure to select only Fabric. The policy will apply to [supported item types](./protection-policies-overview.md#supported-item-types) in all workspaces. When done, select **Next**.

    :::image type="content" source="./media/protection-policies-create/choose-data-sources.png" alt-text="Screenshot of choose data source page in protection policy configuration.":::

1. On the **Define access control settings** page, select the access controls you'd like to apply to items labeled with the sensitivity label you selected in step 4.

    You have two options:

    * **Allow users to retain read access** - Any users or groups added under this control setting will retain read permissions to resources with the selected sensitivity label if they already have it. Any other permissions they have on the item will be removed.
    * **Allow users to retain full control** - Any users or groups added under this control setting will retain full control of the labeled item if they already have it, or any other permissions they might have.

    You can select either one option or both options. For each control, select **Add users and groups** to specify which users and/or groups the control should apply to.

    > [!NOTE]
    > Service principals can't be added to protection policies directly via the Microsoft Purview portal. To enable service principals to access items protected by a protection policy, first add them to an Azure security group, and then add this group to the protection policy.

    :::image type="content" source="./media/protection-policies-create/define-access-control.png" alt-text="Screenshot of define access controls page in protection policy configuration.":::

    The policy will block access to items labeled with the associated sensitivity label for all users not specified in one of the above controls.

    When done, select **Next**.

1. On the **Decide whether to turn on the policy on right away or keep it off** page, choose whether turn on the policy right away or not. When done, select **Next**.
     
    :::image type="content" source="./media/protection-policies-create/turn-on-policy.png" alt-text="Screenshot of mode page in protection policy configuration.":::

1. On the **Review your policy settings** page, review the policy settings. When you're satisfied, select **Submit**, and then **Done**.
  
    :::image type="content" source="./media/protection-policies-create/review-policy-settings.png" alt-text="Screenshot of review and finish page in protection policy configuration.":::

1. You'll be informed that your new protection policy has been created and that it can take up to 30 minutes for the new policy to start detecting and protecting items labeled with the sensitivity label you chose.

    :::image type="content" source="./media/protection-policies-create/policy-created-notice.png" alt-text="Screenshot showing the policy created notice.":::

Your new policy now appears in the list of protection policies. Select it to confirm that all the details are correct.

:::image type="content" source="./media/protection-policies-create/confirm-policy-details.png" alt-text="Screenshot of protection policy details pane.":::

## Manage protection policies

To edit or delete a protection policy:

1. Open the **Protection policies (preview)** page in the Microsoft Purview portal.

    https://purview.microsoft.com/informationprotection/protectionpolicy.

1. Select the policy you wish to edit or delete, and then select Edit policy or Delete policy either on the ribbon or in the details pane.

    :::image type="content" source="./media/protection-policies-create/manage-policy.png" alt-text="Screenshot of protection policy management edit and delete options.":::

    If you're editing the policy, continue cycling through the configuration pages as in [Step 3 of the policy creation flow](#define-name).

## Related content

* [Protection policies in Fabric (preview)](./protection-policies-overview.md)
* [Authoring and publishing protection policies (preview)](/purview/how-to-create-protection-policy)