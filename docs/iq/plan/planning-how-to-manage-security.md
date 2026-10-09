---
title: Configure and Manage Security in Fabric Planning
description: Learn how to control access to planning sheets and planning features by using security roles. Configure permissions, assign users to roles, and manage access to planning capabilities.
ms.date: 09/25/2026
ms.topic: how-to
#customer intent: As a user, I want to configure security roles and permissions to control access to planning sheets and planning features.
---

# Configure and manage security in planning

Use **Security** in the planning sheet to control access to planning sheets and planning features by assigning users to one or more security roles.

* You can create multiple roles with different permission levels and assign one or more roles to each user.
* Configure security settings at the sheet level and for the planning features such as **Measures**, **Scenario**, **Writeback**, and **Comments**.

In this article, you learn how to create and manage roles, set sheet-level and feature-level permissions for each role, and assign users to different roles.

To open the security window, select **Security** from the toolbar.

:::image type="content" source="media/planning-how-to-manage-security/security.jpg" alt-text="Screenshot of the planning sheet with the Security button highlighted in the top toolbar." lightbox="media/planning-how-to-manage-security/security.jpg":::

It consists of two sections:

* **Users** - Use this section to assign one or more roles to users.
* **Roles** - Select this section to create and configure security roles.

:::image type="content" source="media/planning-how-to-manage-security/security-window.jpg" alt-text="Screenshot of the Security window showing the Users and Roles sections for assigning and configuring security roles." lightbox="media/planning-how-to-manage-security/security-window.jpg":::

## Create and manage roles

Security roles define the permissions available to a group of users. Create multiple roles to provide different levels of access based on user responsibilities. After creating a role, assign it to one or more users.

> [!NOTE]
> The **Item Baseline** role is created by default and applies to all users. You can configure common permissions in this role or create additional roles to provide different access levels for different groups of users.

## Create a role

To create a role:

1. In the **Security** window, select **Roles**.
1. Select **Add Roles**.
1. Enter a role name, and then select **Add**.

   :::image type="content" source="media/planning-how-to-manage-security/add-role.jpg" alt-text="Screenshot of the Add role dialog with a role name text box and Add button." lightbox="media/planning-how-to-manage-security/add-role.jpg":::

1. Configure the required permissions for the role.
1. Select **Save Changes**.

After you create the role, assign it to users from the **Users** page.

## Edit a role

To rename a role:

1. In the **Roles** page, select the role that you want to edit.
1. Select the **Edit** icon.
1. Enter a new role name, and then select **Save**.

    :::image type="content" source="media/planning-how-to-manage-security/edit-delete-role.png" alt-text="Screenshot of the Roles page with the Member role selected and the edit and delete icons highlighted." lightbox="media/planning-how-to-manage-security/edit-delete-role.png":::

> [!NOTE]
> Renaming a role updates only its name. The configured permissions remain unchanged.

## Delete a role

To delete a role:

1. In **Roles**, select the role that you want to delete.
1. Select the **Delete** icon.
1. Confirm the deletion.

> [!NOTE]
> You can't rename or delete the **Item Baseline** role because it's the default system role.

## Configure general permissions

The **General** tab controls access to planning sheets for the selected role. The item lists all available sheets individually, so you can configure visibility and editing permissions for each sheet.

:::image type="content" source="media/planning-how-to-manage-security/general.png" alt-text="Screenshot of the Roles page with the General tab selected, showing Planning sheets with Visible and Read Only toggles." lightbox="media/planning-how-to-manage-security/general.png":::

Select the role on the left. Then, for every sheet, set the following permissions:

| Permission | Description |
| --- | --- |
| **Visible** | Determines whether the sheet is visible to users assigned to the selected role. Disable this option to hide the sheet from users. |
| **Read Only** | Allows users to view the sheet but prevents them from making changes. Disable this option to allow users to edit the sheet. |

By default, you can view and edit all sheets for the selected role. You can configure individual sheets to hide them or make them read-only as required.

> [!IMPORTANT]
> Enable the **Visible** toggle to make the sheet available to users. If you disable the **Visible** toggle, users can't access the sheet regardless of the **Read Only** setting.

## Configure planning permissions

Use the **Planning** tab to set permissions for planning-specific features. You can apply permissions to **All Sheets** or **Specific Sheets**.

* **All Sheets** - Applies the permissions to all planning sheets.
* **Specific Sheets** - Applies the permissions only to the selected sheets.

To set permissions for specific sheets:

1. Select **Specific Sheets**.
1. Select **Select Sheets**.
1. Select one or more sheets from the list.

> [!NOTE]
>
> * Only sheets that contain the corresponding Planning feature are available for selection.
> * Any sheet that you don't explicitly configure under **Specific Sheets** defaults to **Read + Write** access.

The **Planning** tab lets you configure permissions for the following features:

* **Measures**
* **Data Input & Forecast**
* **Scenario**
* **Writeback**
* **Comments**

:::image type="content" source="media/planning-how-to-manage-security/planning.png" alt-text="Screenshot of the Planning tab showing Measures, Scenario, Writeback, and Comments permission sections for the Member role." lightbox="media/planning-how-to-manage-security/planning.png":::

### Measures

Set permissions for accessing and modifying data input and forecast measures.

Available permissions:

| Permission | Description |
| --- | --- |
| **Hidden** | Hides the measures from users assigned to the selected role. |
| **Read** | Allows users to view measures but prevents them from making changes. |
| **Read + Write** | Allows users to view and modify measures. |

### Scenario

Set whether users can access and work on Planning scenarios.

| Permission | Description |
| --- | --- |
| **View** | Allows users to view and work with scenarios. Clear this option to prevent users from accessing scenarios. |

### Writeback

Set whether users can perform writeback operations.

| Permission | Description |
| --- | --- |
| **Writeback** | Allows users to write planning changes back to the data source. Clear this option to prevent writeback operations. |

### Comments

Set permissions for comments.

Available permissions:

| Permission | Description |
| --- | --- |
| **View** | Allows users to view comments. |
| **Add** | Allows users to add comments. |
| **Lock/Unlock** | Allows users to lock or unlock comments. |
| **Star** | Allows users to mark comments as starred. |

Turn each permission on or off.

## Assign users to roles

After you configure one or more roles, assign them to users to control their access to planning sheets and features.

To assign roles to users:

1. In the **Security** window, select **Users**.
1. Select **Assign Role**.
1. In the **Users** dropdown, select one or more users.
1. In the **Roles** dropdown, select one or more roles.
1. Select **Add**.

You can assign a user to multiple roles.

:::image type="content" source="media/planning-how-to-manage-security/assign-roles-to-users.png" alt-text="Screenshot of the Security window Users page showing the Add Users dialog with Users and Roles dropdowns." lightbox="media/planning-how-to-manage-security/assign-roles-to-users.png":::

## Permission precedence

When you assign multiple roles to a user, the union of permissions from all assigned roles determines the user's effective access. If different roles define different permission levels for the same feature, the user gets the highest level of access.

### Example

Consider the configured permissions for the **Member** and **Lead** roles in the planning security settings.

| Feature | Member | Lead |
| --- | --- | --- |
| **Measures** | Read + Write | Read |
| **Scenario** | View | View |
| **Writeback** | No | Yes |
| **Comments** | View, Add | View, Add, Lock/Unlock, Star Comments |

Suppose a user is assigned both the **Member** and **Lead** security roles.

The effective permissions for the user are as follows:

| Feature | Effective permission |
| --- | --- |
| **Measures** | Read + Write |
| **Scenario** | View |
| **Writeback** | Yes |
| **Comments** | View, Add, Lock/Unlock, Star Comments |

The user receives **Read + Write** access to **Measures** from the **Member** role and **Writeback** and advanced **Comments** permissions from the **Lead** role. Because permissions from all assigned roles are considered in union, the user receives the highest level of access available for each feature.

### Return to the Planning sheet

After configuring users and roles, select **Back to Sheet** to return to the Planning sheet.
