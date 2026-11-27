---
title: Configure Microsoft Entra PIM for Fabric Workspace Roles
description: Learn how to configure Microsoft Entra Privileged Identity Management (PIM) for Fabric workspace roles to grant just-in-time access. Get started today.
author: amasingh
ms.author: amasingh
ms.topic: how-to
ms.date: 10/31/2026
ai-usage: ai-assisted

---

# Configure Microsoft Entra PIM for Fabric workspace roles

Privileged Identity Management (PIM) is a service in Microsoft Entra ID that you use to manage, control, and monitor access to important resources in your organization. You can configure it for privileged Fabric workspace roles such as Admin, Member, or Contributor.

1. Sign in to the Azure portal with an account that has the necessary permissions to configure PIM for Fabric workspace roles. You need at least Entra ID Privileged Role Administrator to create a new PIM assignment.

1. Create a new security group in Entra ID for the PIM assignment. This group contains the users who need the privileged role in the Fabric workspace. :::image type="content" source="./media/security-privileged-identity-management/create-entra-security-group.png" alt-text="Screenshot of the Azure portal showing the creation of a new security group in Microsoft Entra ID.":::

1. Under **Azure Privileged Identity Management** experience in **Azure Portal**, go to **Manage** and then select **Groups**.

1. Select **Discover groups**, select the security group you created, and then select **Manage groups** and **OK** to enable it for PIM.

1. Return to **Groups** and select the group.
   :::image type="content" source="./media/security-privileged-identity-management/search-for-sg-in-entra-pim.png" alt-text="Screenshot of the Azure portal showing the selected security group for a PIM assignment.":::
   
1. For your security group, select **Settings** and then select **Member**.
   :::image type="content" source="./media/security-privileged-identity-management/entra-pim-settings-for-group.png" alt-text="Screenshot of Microsoft Entra PIM settings for the selected security group.":::

1. Configure **Activation** settings. These settings control how and when members of the security group can activate their privileged role in PIM.
   :::image type="content" source="./media/security-privileged-identity-management/configure-pim-activation-settings.png" alt-text="Screenshot of PIM activation settings configured for the security group.":::

1. Switch to **Assignment** tab to configure expiration period for eligible assignments and active assignments. Assign a value for the expiration period according to your organization's policy.
   :::image type="content" source="./media/security-privileged-identity-management/assign-pim-expiry-periods.png" alt-text="Screenshot of PIM assignment settings with expiration periods for the security group.":::

1. Configure **Notification** and then save the settings. Notifications help keep members informed about their PIM assignments and any required actions.
   :::image type="content" source="./media/security-privileged-identity-management/configure-notifications-for-pim.png" alt-text="Screenshot of PIM notification settings for the security group.":::

1. After you configure the settings for the PIM role, add the security group to the role assignment or add an individual user to the role assignment.
   :::image type="content" source="./media/security-privileged-identity-management/add-user-to-pim-role-assignment.png" alt-text="Screenshot of a user being added to a PIM role assignment.":::
   
1. Select the **Settings** tab, select **Eligible** as the **Assignment Type**, and configure the assignment time period to align with your organization's policy.
   :::image type="content" source="./media/security-privileged-identity-management/configure-assignment-type-period.png" alt-text="Screenshot of the Eligible assignment type and configured assignment time period in PIM.":::

1. You see a new entry for this newly created assignment under **Eligible Assignments**. It means that members of this security group can use this assignment to perform privileged actions.
   :::image type="content" source="./media/security-privileged-identity-management/new-pim-role-assignment.png" alt-text="Screenshot of the newly created PIM assignment under Eligible assignments.":::

1. To verify, go to the security group in Entra ID and check its members. You don't see any user principal assigned to this group yet. Only when you activate this role assignment does the user gain the privileges associated with the role.
   :::image type="content" source="./media/security-privileged-identity-management/entra-verify-no-user-in-sg.png" alt-text="Screenshot of the security group in Microsoft Entra ID with no assigned members.":::

1. Switch to **Microsoft Fabric** workspace and add this security group to a workspace role. When a user activates their PIM assignment, they are promoted to this security group. Since this security group is assigned a Fabric workspace role, members of the security group automatically assume the privileges associated with that role.
   :::image type="content" source="./media/security-privileged-identity-management/assign-fabric-role-to-sg.png" alt-text="Screenshot of the security group added to a Microsoft Fabric workspace role.":::

1. To test the assignment, sign in to the **Azure portal** as a user who received the eligible membership assignment, and open **Microsoft Entra Privileged Identity Management**.

1. Under **My roles**, select **Groups**. In **Eligible assignments**, find the assignment and select **Activate**.
   :::image type="content" source="./media/security-privileged-identity-management/activate-pim-role.png" alt-text="Screenshot of activating the eligible PIM assignment under My roles.":::


1. Add **Justification** and then select **Activate.**
   :::image type="content" source="./media/security-privileged-identity-management/add-justification-for-pim-role.png" alt-text="Screenshot of adding a justification to activate the PIM role assignment.":::

1. Verify that assignment is **Active.**
   :::image type="content" source="./media/security-privileged-identity-management/check-pim-is-active.png" alt-text="Screenshot of the PIM assignment showing an Active status.":::

This completes the setup for Entra Privileged Identity Management (PIM) for Fabric workspace roles.
