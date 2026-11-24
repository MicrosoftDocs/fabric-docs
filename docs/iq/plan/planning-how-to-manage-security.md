---
title: Configure and Manage Security in Fabric Planning
description: Learn how to control access to planning sheets and planning features by using security roles. Configure permissions, assign users to roles, and manage access to planning capabilities.
ms.date: 11/20/2026
ms.topic: how-to
#customer intent: As a user, I want to configure security roles and permissions to control access to planning sheets and planning features.
---

# Manage security in planning

Security provides centralized role-based access control across your entire plan item, so you can govern who can view, edit, and manage sheets, data, and features.

* Role-based access: Create custom roles with granular permission levels and assign one or more roles to users or groups.
* End-to-end coverage: Manage visibility and edit access across Planning, PowerTable, and Intelligence sheets. Configure PowerTable database security, and control feature permissions for Measures, Scenario, Writeback, Bookmarks, and Comments.
* Workspace governance: Control whether workspace contributors can modify security settings and sheet configurations.

In this article, you learn how to configure contributor security controls, create and manage roles, set permissions for each role, and assign roles to users.

## Configure security settings

To open the Security window, select **Security** from the toolbar. The **Security** page has two tabs: **General** and **Roles**.

* **General**: This tab includes options to [control workspace contributors' access](#manage-workspace-security-controls) to the overall security and governance settings of the current plan item. Use these options to specify whether all workspace contributors, selected contributors, or no contributors can manage security settings and sheet-related access configurations.
* **Roles**: This tab includes two sections for configuring security roles and assigning them to users:
  * **Users**: Use this section to [assign one or more configured security roles](#assign-roles-to-users) to users.
  * **Roles**: Use this section to [create and configure security roles](#create-a-role) by defining the permissions and access levels associated with each role.

## Manage workspace security controls

For a plan item, **the item owner**, **workspace admins**, and **members** can always edit its security and governance settings available in the **Security** tab. These settings include configuring security roles, assigning roles to users, managing access to planning features such as writeback and scenarios, configuring PowerTable database security, and more. Go to **Security** > **Security access** under the **General** tab to control whether workspace contributors can change security and governance settings and sheets-related access settings in the plan item.

:::image type="content" source="media/planning-how-to-manage-security/workspace-contributors-access.png" alt-text="Screenshot of security options for contributors." lightbox="media/planning-how-to-manage-security/workspace-contributors-access.png":::

You can choose one of the following options:

* **Yes**: Allow all workspace contributors to manage security and governance settings and sheets in the plan item.
* **No**: Prevent workspace contributors from managing these settings and sheets.
* **Specific Contributors only**: Allow only selected workspace contributors to manage these settings and sheets. If you select this option, enter the email addresses of the contributors you want to authorize.

Select **Save** to apply the changes.

This setting controls access to all security settings on the **Security** window, including PowerTable configurations such as *Approvals*, *Row Access*, and *Column Access*, and planning features' access configurations such as *Approvals*, *Scenarios*, *Writeback*, and more.

## Create a role

Security roles define the permissions available to a group of users. Create multiple roles to provide different levels of access based on user responsibilities. After creating a role, assign it to one or more users.

> [!NOTE]
> The **Item Baseline** role is created by default and applies to all users. You can configure common permissions in this role or create additional roles to provide different access levels for different groups of users.

1. In the **Security** window, select **Roles**.
1. Select **Add Roles**.
1. Enter a role name, and then select **Add**.

    :::image type="content" source="media/planning-how-to-manage-security/create-new-role.png" alt-text="Screenshot of creating a new role titled budget contributor." lightbox="media/planning-how-to-manage-security/create-new-role.png":::

1. Configure the required permissions for the role from the **General** tab. For example, for a contributor role, you can grant Read + Write access to active planning sheets, set Intelligence dashboards to Read access, and hide restricted planning, PowerTable, and intelligence sheets so they remain invisible to users assigned to that role.

    The following table describes each permission:

    | Permission | Description |
    |------------|-------------|
    | Read | Allows users assigned to the selected role to view the sheet but prevents them from making edits. |
    | Read + Write | Allows users assigned to the selected role to view and edit the sheet. |
    | Hidden | Hides the sheet from users assigned to the selected role, preventing them from accessing it. |

    :::image type="content" source="media/planning-how-to-manage-security/assign-permissions-planning-powertable-intelligence-sheet.png" alt-text="Screenshot of assigning permissions for planning, intelligence, and powertable sheets." lightbox="media/planning-how-to-manage-security/assign-permissions-planning-powertable-intelligence-sheet.png":::

1. Configure bookmark security in your planning sheet to restrict access by role. Assign the specific bookmarks a role can access. Users assigned to that role will only see their permitted bookmarks. To learn more about bookmarks, see [Save Analysis with Bookmarks](./planning-how-to-add-bookmark.md).

    :::image type="content" source="media/planning-how-to-manage-security/bookmark-security-selection.png" alt-text="Screenshot of selecting the bookmarks which can be accessed by the role." lightbox="media/planning-how-to-manage-security/bookmark-security-selection.png":::

1. Select **Save Changes**.
1. After the role is created, assign it to users from the **Users** tab.
1. To rename a role, select the edit (pencil) icon and enter the new name.
1. To delete a role, select the delete (trash can) icon.

    > [!NOTE]
    > The **Item Baseline** role is the default system role and can't be renamed or deleted.

1. After configuring users and roles, select **Back to Sheet** to return to the planning sheet.

## Configure planning sheet permissions

In the **Planning** tab, configure permissions for planning-specific features. The default permissions apply to all the planning sheets in the current plan item.

* **Measure (Data input and forecast) and scenario permissions**

| Permission | Description |
|---|---|
| **Hidden** | Hide measures and scenarios from users assigned to the selected role. |
| **Read** | Allows users to view values but prevents them from making changes. |
| **Read + Write** | Allows users to view and modify values. |

* **Comment permissions**

| Permission | Description |
|---|---|
| **View** | Users assigned to the selected role can view all comments in the planning sheet. |
| **Add** | Allows users to enter a new comment. |
| **Lock/Unlock** | Allows users to lock or unlock comment threads for editing. |
| **Star** | Users can emphasize important comments. |

* **Writeback permissions**

Allow users to write back planning data to OneLake or a Fabric SQL database.

:::image type="content" source="media/planning-how-to-manage-security/default-access-permission-list.png" alt-text="Screenshot of access permission list for writeback, scenarios, measures, and comments." lightbox="media/planning-how-to-manage-security/default-access-permission-list.png":::

You can also set permissions specific to a particular planning sheet.

1. Select the **Select Sheet** button and choose the planning sheets to configure permissions.

    :::image type="content" source="media/planning-how-to-manage-security/select-specific-planning-sheet-assign-access.png" alt-text="Screenshot of selecting the consolidated profitability planning sheet to configure feature-wise access." lightbox="media/planning-how-to-manage-security/select-specific-planning-sheet-assign-access.png":::

1. Use **Comment Access** permissions to determine whether users can perform actions such as creating or locking comment threads.
1. Disable the **Writeback Access** toggle to prevent users from writing back planning data.
1. To configure measure-level access, select the measures from the **Select Measure** list.

    :::image type="content" source="media/planning-how-to-manage-security/select-measure-configure-access.png" alt-text="Screenshot of selecting Sales Plan and Revenue Simulation measures." lightbox="media/planning-how-to-manage-security/select-measure-configure-access.png":::

1. Configure access for each selected measure.

    :::image type="content" source="media/planning-how-to-manage-security/measure-permission-list.png" alt-text="Screenshot of assigning read, write, and hidden access to selected measures." lightbox="media/planning-how-to-manage-security/measure-permission-list.png":::

1. Similarly, if you created scenarios, select a scenario to configure permissions.

    :::image type="content" source="media/planning-how-to-manage-security/scenario-permissions.png" alt-text="Screenshot of assigning read and write permissions to the price increase and market expansion scenarios." lightbox="media/planning-how-to-manage-security/scenario-permissions.png":::

## Assign roles to users

After you configure one or more roles, assign them to users or groups to control their access to planning sheets and features.

To assign roles to users:

1. In the **Security** window, select **Users**.
1. Select **Assign Role**.
1. In the **Users or Groups** dropdown, select one or more users or Microsoft Entra ID groups.
1. In the **Roles** dropdown, select one or more roles. You can assign multiple roles to a user or group.
1. Select **Add**.

    :::image type="content" source="media/planning-how-to-manage-security/assign-roles-users.png" alt-text="Screenshot of assigning user groups to the executive viewer and budget contributor roles." lightbox="media/planning-how-to-manage-security/assign-roles-users.png":::

## Permission precedence

When you assign multiple roles to a user, the union of permissions from all assigned roles determines the user's effective access. If different roles define different permission levels for the same feature, the user gets the highest level of access.

Consider the configured permissions for the *Member* and *Lead* roles in the planning security settings.

| Feature | Member | Lead |
| --- | --- | --- |
| **Measures** | Read + Write | Read |
| **Scenario** | Read + Write | Hidden |
| **Writeback** | No | Yes |
| **Comments** | View, Add | View, Add, Lock/Unlock, Star Comments |

Suppose a user is assigned both the **Member** and **Lead** security roles. The effective permissions for the user are as follows:

| Feature | Effective permission |
| --- | --- |
| **Measures** | Read + Write |
| **Scenario** | Read + Write |
| **Writeback** | Yes |
| **Comments** | View, Add, Lock/Unlock, Star Comments |

The user receives **Read + Write** access to **Measures** from the **Member** role and **Writeback** and advanced **Comments** permissions from the **Lead** role. The user receives the highest level of access available for each feature because planning considers permissions from all assigned roles.
