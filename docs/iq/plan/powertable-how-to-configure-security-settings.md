---
title: Configure Data Security in PowerTable
description: Learn how to configure data security settings in PowerTable by using roles, policies, and user attributes. Control access to data, manage permissions, and secure database tables with access rules.
#customer intent: As a user, I want to configure roles, policies, and user attributes to control access to data and database operations, so that users can access only the data and perform the actions permitted to them.
ms.date: 09/22/2026
ms.topic: how-to
---

# Configure data security in PowerTable

This article explains how to configure data security in PowerTable by using roles, policies, and user attributes.

Use security roles to configure sheet-level permissions and row-level security (RLS) for each database configured with PowerTable. You can control whether users can access a sheet and whether they can view or edit its data.

For each role, learn how to control user access, manage permissions, apply row-level security (RLS), and secure database tables with configurable access rules.

## Security models

PowerTable provides two security models. Choose one of the following models to configure data security:

- **Manage Access (Legacy)**: This model is the default security model. Use this model to control which users can add, update, or delete rows and columns in the PowerTable app and its database. You can configure row-level and column-level permissions for **Add**, **Update**, and **Delete** operations for individual tables.

This model is available on the **Setup** tab. For more information, see [manage access](./powertable-how-to-set-up-access-control.md).

:::image type="content" source="media/powertable-how-to-configure-security-settings/manage-access.png" alt-text="Screenshot of Manage Access with Row Access and Column Access tabs and row permission options selected." lightbox="media/powertable-how-to-configure-security-settings/manage-access.png":::

- **Roles & Policies Security**: Select this model to configure advanced **database-level security** and **row-level security (RLS)**, including static and dynamic RLS, by using roles and policies.

  :::image type="content" source="media/powertable-how-to-configure-security-settings/roles-policies-window.png" alt-text="Screenshot of the PowerTable Security pane with Users and Roles menu and the Roles & Policies Security toggle highlighted." lightbox="media/powertable-how-to-configure-security-settings/roles-policies-window.png":::

> [!IMPORTANT]
> Use the **Roles & Policies Security** model if you want to enable row-level security (RLS) in your PowerTable databases.
> When **Roles & Policies Security** is enabled, it overrides the settings configured through **Manage Access (Legacy)**.

## Select a security model

To choose a security model:

1. Select **Security** from the toolbar.

   :::image type="content" source="media/powertable-how-to-configure-security-settings/security.png" alt-text="Screenshot of the PowerTable toolbar with the Security button highlighted." lightbox="media/powertable-how-to-configure-security-settings/security.png":::

1. The **Security** window appears. Under the **PowerTable** dropdown, you see all the configured SQL databases for PowerTable in the current Plan item.

    :::image type="content" source="media/powertable-how-to-configure-security-settings/security-window.jpg" alt-text="Screenshot of the PowerTable Security window showing the PowerTable dropdown listing configured SQL databases." lightbox="media/powertable-how-to-configure-security-settings/security-window.jpg":::

1. Select a SQL database to configure the security model for it.

    :::image type="content" source="media/powertable-how-to-configure-security-settings/select-database.png" alt-text="Screenshot of the PowerTable Security window with database selection and security model options." lightbox="media/powertable-how-to-configure-security-settings/select-database.png":::

   > [!NOTE]
   > The destination database you select when creating a PowerTable sheet appears in the security window. A Plan item can contain multiple PowerTable sheets, each with one or more configured destination databases.

## Manage Access (Legacy)

Use this model, which is enabled by default, to configure row-level and column-level permissions for individual tables. To learn more, see [manage access](./powertable-how-to-set-up-access-control.md).

When you enable **Roles & Policies Security**, the **Manage Access** settings become inactive. PowerTable displays a notification indicating that access is controlled through the configured security policies.

:::image type="content" source="media/powertable-how-to-configure-security-settings/manage-access-legacy.png" alt-text="Screenshot of Manage Access (Legacy) with Row Access and Column Access tabs." lightbox="media/powertable-how-to-configure-security-settings/manage-access-legacy.png":::

## Roles and policies security

By default, PowerTable databases grant users full access to all tables. To restrict access, create policies and roles, and then assign the roles to users.

1. Enable **Roles & Policies Security** to secure all tables in the selected database by using reusable policies and roles.

    :::image type="content" source="media/powertable-how-to-configure-security-settings/enable-roles-security.png" alt-text="Screenshot of the Security window showing Policies & Rules tab with No Policies Available and the Roles & Policies Security option highlighted." lightbox="media/powertable-how-to-configure-security-settings/enable-roles-security.png":::

1. Create one or more policies.
1. Define rules for each policy.
1. Attach the required policies to roles.
1. Assign the roles to users.

> [!NOTE]
> Configure security policies separately for each database. Policies you create for a database apply only to the database where you created them and don't apply to other databases in the same Plan item.

## Create a policy

A policy groups one or more rules that define how users can access database tables.

To create a policy:

1. Select the required database, and then select **Add Policy**.
1. Enter a policy name, and then select **Add Policy**.

   :::image type="content" source="media/powertable-how-to-configure-security-settings/add-policy.png" alt-text="Screenshot of the Add Policy dialog with a policy name entered and the Add Policy button highlighted." lightbox="media/powertable-how-to-configure-security-settings/add-policy.png":::

## Configure policy rules

Configure one or more rules for each policy.

To restrict access to a table, add a rule for that table. If you don't add a rule for a table, users have full access to that table. Rules define which rows users can access in each table and which CRUD operations they can perform on the selected table.

To create a rule:

1. Select **Add Rule** within a policy.

   :::image type="content" source="media/powertable-how-to-configure-security-settings/add-rule.jpg" alt-text="Screenshot of a policy panel with the Add Rule button highlighted." lightbox="media/powertable-how-to-configure-security-settings/add-rule.jpg":::

1. Enter a name for the rule.
1. Choose the schema and select the table.
1. Select the required [permissions](#how-permissions-work) from the available options: **Read**, **Insert**, **Update**, and **Delete**.
1. Configure the filter conditions under [**Rules**](#rule-configuration) for the selected table.

    :::image type="content" source="media/powertable-how-to-configure-security-settings/configure-rule-update-delete.png" alt-text="Screenshot of a new rule configuration showing permissions and filter conditions, with the Save Changes button highlighted." lightbox="media/powertable-how-to-configure-security-settings/configure-rule-update-delete.png":::

1. Optionally, enter a rule description.
1. Select **Save Changes** to add the rule.

In this example, the rule defines **Update** and **Delete** access for products whose product key is from *250* to *300*.

### How permissions work

The permissions and rules work as follows:

- If you select **Update** or **Delete**, you automatically get the **Read** permission.
- You can't combine the **Insert** permission with **Read**, **Update**, **Delete**, or filter conditions in the same rule. When you select **Insert**, the remaining permissions and rule configuration options are disabled.

  :::image type="content" source="media/powertable-how-to-configure-security-settings/configure-rule-insert.png" alt-text="Screenshot of Configure Rule pane with Insert permission selected and a warning that Insert can't be combined with other permissions." lightbox="media/powertable-how-to-configure-security-settings/configure-rule-insert.png":::

- To add **Insert** permission in a rule, create separate rules within the policy - one for the **Insert** and another for the **Read**, **Update**, and **Delete** operations on the selected table.
- PowerTable prevents duplicate permission combinations for the same table within a policy. If a rule with the same permission set already exists for the selected table, an error message is displayed.

  :::image type="content" source="media/powertable-how-to-configure-security-settings/configure-rule-duplicate.jpg" alt-text="Screenshot of the Configure Rule pane with an error that a rule with the same permissions already exists for the selected table." lightbox="media/powertable-how-to-configure-security-settings/configure-rule-duplicate.jpg":::

- When multiple rules are configured for the same table within a policy, the rules are evaluated with an **OR** condition. A user receives access if any applicable rule grants the required permission.

## Rule configuration

Configure one or more filter conditions to define the records to which the selected rule applies.

The rule configuration provides the following options:

- **Column** - Select the column to evaluate. The available operators depend on the selected column's data type.
- **Operator** - Select the comparison operator to evaluate the selected column. Common operators include **Equals**, **Not Equal**, **Empty**, **Not Empty**, **Is One Of**, and **Is Not One Of**.
  - For **text** columns, additional operators such as **Contains**, **Does Not Contain**, **Begins With**, and **Ends With** are available.
  - For **numeric** columns, additional operators such as **Greater Than**, **Greater Than or Equals**, **Less Than**, and **Less Than or Equals** are available.
  - Use **Is One Of** and **Is Not One Of** to evaluate the column value against a set of values. This operator is primarily used along with [user attributes](#configure-user-attributes) that return multiple values.
- **Value** - Specify the value to compare against the selected column values.
- **Add Filter** - Add more filter conditions to create complex and tailored filtering logic.
- **AND/OR** - Combine multiple conditions by using logical operators.
  - **AND** requires all configured conditions to evaluate to true.
  - **OR** requires any one of the configured conditions to evaluate to true.
- **Delete icon** - Use it to remove an individual filter condition from the rule.

> [!NOTE]
> To apply **dynamic Row-Level Security (RLS)** based on the signed-in user's identity, configure [**User Attributes**](#configure-user-attributes) to link the user's identity to the data model. You can then use attributes such as *Employee* or *Manager* in rules to dynamically retrieve the relevant values from related tables, without manually configuring row values for each user.

## Enable bypass mode

Each policy includes an option to enable **Bypass Mode**. When enabled, Bypass Mode disables the rules configured in that policy and grants users assigned to the policy unrestricted access to all tables in the selected database.

### Before bypass mode

The following image shows a policy with active rules before the bypass mode.

:::image type="content" source="media/powertable-how-to-configure-security-settings/before-bypass.png" alt-text="Screenshot of Policies & Rules page with P2 Category policy selected, two rules listed, and Bypass Mode toggle set to Off." lightbox="media/powertable-how-to-configure-security-settings/before-bypass.png":::

### After enabling bypass mode

The following image shows a policy with the bypass mode enabled.

:::image type="content" source="media/powertable-how-to-configure-security-settings/after-bypass.png" alt-text="Screenshot of Policies & Rules page with P2 Category selected, Bypass Mode toggled On, and Rules showing Bypass Mode Enabled message." lightbox="media/powertable-how-to-configure-security-settings/after-bypass.png":::

When you enable Bypass Mode:

- All rules configured in the policy are disabled.
- The rule configuration page is disabled because access is unrestricted.
- Users assigned to the policy receive full access to all tables in the selected database.
- The bypass policy takes precedence over all other policies assigned to the user.
- Users can perform **Read**, **Insert**, **Update**, and **Delete** operations on all tables.

## Configuring admin or superuser

Create a separate policy with **Bypass Mode** enabled and assign it to roles, such as administrator or superuser. Assign these roles to users who need unrestricted access to all tables in the database.

:::image type="content" source="media/powertable-how-to-configure-security-settings/bypass-mode.png" alt-text="Screenshot of the Policies & Rules page with Manager Bypass Policy selected and the Bypass Mode toggle set to On." lightbox="media/powertable-how-to-configure-security-settings/bypass-mode.png":::

> [!IMPORTANT]
>
> - Assign a bypass policy only to trusted users who need unrestricted access to the database.
> - Use **Bypass Mode** when you need to temporarily provide unrestricted access without deleting the configured rules. You can disable Bypass Mode later to restore the configured rules.
> - Because Bypass Mode bypasses row-level security rules, don't forget to disable it when unrestricted access is no longer required.

## Configure user attributes

**User attributes** connect a user's authentication identity to the data model, so you can use attributes such as **User ID**, **Employee ID**, or **Department** in filter rules.

For example, create a source table that maps products or records to the users or departments allowed to access them. Then, create a user attribute that retrieves the records allowed for the users or a department based on this mapping. Use the attribute in a policy rule, and assign the policy to users in the same department.

This approach dynamically retrieves attribute values from related tables and uses them to evaluate policy rules. It eliminates the need to manually specify attribute values for each user in every policy rule.

### Create a user attribute

To create a user attribute:

1. Select **User Attributes** for the required database.
1. Select **Add Attribute**. The **Configure User Attribute** pane opens.

   :::image type="content" source="media/powertable-how-to-configure-security-settings/user-attribute.png" alt-text="Screenshot of the User Attributes tab for powertable_sql_db showing no attributes and the Add Attribute button highlighted." lightbox="media/powertable-how-to-configure-security-settings/user-attribute.png":::

1. Enter the attribute name.
1. Select one of the following return types:
   - **Single**: Returns the first matching value.
   - **Multiple**: Returns all matching values.
   - **Static**: Returns a manually entered, static value for the user attribute.
1. Select the **Schema**, **Source Table**, and **Output Value**.

    :::image type="content" source="media/powertable-how-to-configure-security-settings/configure-user-attribute-table-output-value.png" alt-text="Screenshot of Configure User Attribute pane with Multiple return type selected and the Output Value dropdown open showing ProductSubcategoryKey checked." lightbox="media/powertable-how-to-configure-security-settings/configure-user-attribute-table-output-value.png":::

    > [!NOTE]
    >
    > - The source table you select contains the mappings between user attributes and the corresponding records that users are allowed to access.
    > - The output value refers to one or more records that you want to retrieve from the table for the configured user.
    > - For **Static** type, the output value is a static value that you manually configured.

1. Define one or more rules to determine how the attribute value is retrieved.
1. Optionally enter a description for the user attribute.
1. Select **Save Changes**.

   :::image type="content" source="media/powertable-how-to-configure-security-settings/configure-user-attribute.png" alt-text="Screenshot of the Configure User Attribute page with Multiple return type, dbo schema, UserProductAccess table, and a UserID equals 1012 rule." lightbox="media/powertable-how-to-configure-security-settings/configure-user-attribute.png":::

### Attach user attributes in rules

Instead of entering values manually for each user, you can attach user attributes to a policy rule and assign it to a group of users.

To attach a user attribute in a rule:

1. Configure a rule in **Policies & Rules**.
1. Select the column whose values match the output values returned by the configured user attribute.
1. Select an operator that works with the return type of the user attribute.
1. In the **Value** box, select the **+** icon and choose the required user attribute you want.

   :::image type="content" source="media/powertable-how-to-configure-security-settings/configure-rule-user-attribute.png" alt-text="Screenshot of the Configure Rule pane with the plus icon in the Value box selected, showing User_1012_Attribute in the dropdown list." lightbox="media/powertable-how-to-configure-security-settings/configure-rule-user-attribute.png":::

1. Select **Save Changes**.

The configured **User Attribute** returns the list of *ProductSubcategoryKey* values assigned to *UserID 1012* from the *UserProductAccess* table.  Use this user attribute as the value in the policy rule to filter *Products Table* and return only the products whose *ProductSubcategoryKey* values match the user attribute.

In this example, **ProductSubcategoryKey** values **33** and **37** are assigned to **UserID 1012**. When you [attach this policy to a role](#create-roles-and-attach-policies-to-roles) and [assign the role to users](#assign-roles-to-users), they can access only the products with **ProductSubcategoryKey** values **33** and **37**.

:::image type="content" source="media/powertable-how-to-configure-security-settings/configured-user-attribute-products-table.png" alt-text="Screenshot of the Products table in PowerTable displaying only records with ProductSubcategoryKey 33 and 37 after the policy is applied." lightbox="media/powertable-how-to-configure-security-settings/configured-user-attribute-products-table.png":::

> [!NOTE]
> When you configure the user attribute with the **Multiple** return type, only the **Is one of** and **Is not one of** operators are supported.

## Provide dynamic user access

The example in the previous section assigns access based on a specific *UserID*. As a result, every user who is assigned a role with the attached policy receives access to the same set of product records.

To provide dynamic access based on each user, configure the user attribute with the **Logged in User** condition.

To provide dynamic access:

1. Create a user attribute by selecting **User Attributes** > **Add attribute**.

    :::image type="content" source="media/powertable-how-to-configure-security-settings/add-attribute.png" alt-text="Screenshot of the Security page with the User Attributes tab and Add Attribute button highlighted." lightbox="media/powertable-how-to-configure-security-settings/add-attribute.png":::

1. Enter a name, select the schema, table, and the output values to return.
1. Select the **Email** column.
1. Select the **Equals** operator.
1. In the **Value** box, select the **+** icon, and then select **Logged in User**.

    :::image type="content" source="media/powertable-how-to-configure-security-settings/loggedin-user.png" alt-text="Screenshot of User Attributes tab showing a UserEmail Equals rule with the Logged in User option and Save Changes button highlighted." lightbox="media/powertable-how-to-configure-security-settings/loggedin-user.png":::

1. Select **Save Changes**. The user attribute for dynamic access is created.

   :::image type="content" source="media/powertable-how-to-configure-security-settings/dynamic-access-attribute-created-success.png" alt-text="Screenshot of Security page showing Dynamic Access Attribute configuration saved with success message." lightbox="media/powertable-how-to-configure-security-settings/dynamic-access-attribute-created-success.png":::

1. Go to **Policies & Rules**.
1. Attach this user attribute to a policy rule.

   :::image type="content" source="media/powertable-how-to-configure-security-settings/dynamic-access-attribute.png" alt-text="Screenshot of PowerTable security settings with Policies & Rules tab and Dynamic Access Attribute value highlighted." lightbox="media/powertable-how-to-configure-security-settings/dynamic-access-attribute.png":::

When you [attach this policy to a role](#create-roles-and-attach-policies-to-roles) and [assign the role to users](#assign-roles-to-users), PowerTable retrieves the *ProductSubcategoryKey* values associated with the signed-in user's email address from the *UserProductAccess* table. The policy rule uses these returned values to filter the *Products Table*, allowing each user to access only the products assigned to them.

The following example shows the *UserProductAccess* table configured with the user to subcategory mappings. In this example, the signed-in user is *Andzelika Juskaite*.

:::image type="content" source="media/powertable-how-to-configure-security-settings/user-product-access-table.png" alt-text="Screenshot of user to subcategory mappings in the UserProductAccess table, with Andzelika Juskaite's three rows outlined in red." lightbox="media/powertable-how-to-configure-security-settings/user-product-access-table.png":::

When *Andzelika Juskaite* signs in, PowerTable retrieves the assigned **ProductSubcategoryKey** values (**25**, **28**, and **32**) and uses the attached policy to filter the *Product* table. As a result, only the products belonging to these subcategories are accessible.

:::image type="content" source="media/powertable-how-to-configure-security-settings/dynamic-access-products-table.png" alt-text="Screenshot of PowerTable Products table filtered to seven rows with ProductSubcategoryKey values 25, 28, and 32." lightbox="media/powertable-how-to-configure-security-settings/dynamic-access-products-table.png":::

## Configure roles and assign users

Security roles define the permissions available to a group of users. Create multiple roles to provide different levels of access based on user responsibilities and then attach the policies required for each role.

After creating a role, assign it to one or more users. Users receive the permissions defined by the policies attached to their assigned roles.

### Create roles and attach policies to roles

After creating one or more policies, attach them to a role to control user access. You can attach multiple policies to a single role.

To create a role and attach policies:

1. Select **Roles** from the left pane.
1. Select **Add Roles**.
1. Enter a **Role Name**, and then select **Add**.

   :::image type="content" source="media/powertable-how-to-configure-security-settings/add-role.png" alt-text="Screenshot of the Security page with the Add Role dialog open, showing a Role Name field and the Add button highlighted." lightbox="media/powertable-how-to-configure-security-settings/add-role.png":::

1. Select the **PowerTable** tab. The window lists all the available databases configured in the current item.
1. For the required database, select **Attach Policy**, and then select one or more policies.
1. Select **Save Changes**. The **Team Member** role is configured.

   :::image type="content" source="media/powertable-how-to-configure-security-settings/attach-policy.png" alt-text="Screenshot of the PowerTable tab with the Attach Policy dropdown open, showing policy checkboxes and Save Changes highlighted." lightbox="media/powertable-how-to-configure-security-settings/attach-policy.png":::

### Default Item Baseline role

Users who aren't assigned any role inherit the permissions configured for the **Item Baseline** role.

The **Item Baseline** role is the default role and grants full access to all users. If a user is assigned additional roles, the permissions configured for those roles determine the user's effective access.

To restrict the default access, [configure the required sheet-level permissions](#configure-sheet-level-general-permissions) in the **General** tab, and then enable **Restrict with Policy** and attach one or more policies in the **PowerTable** tab.

:::image type="content" source="media/powertable-how-to-configure-security-settings/powertable.png" alt-text="Screenshot of the Roles panel with Item Baseline selected and the PowerTable tab showing Restrict with Policy enabled." lightbox="media/powertable-how-to-configure-security-settings/powertable.png":::

### Edit a role

To rename a role:

1. In the **Roles** page, select the role that you want to edit.
1. Select the **Edit** icon.
1. Enter a new role name, and then select **Save**.

:::image type="content" source="media/powertable-how-to-configure-security-settings/edit-delete-role.png" alt-text="Screenshot of the Roles page with the Team Member role selected and its edit and delete icons highlighted." lightbox="media/powertable-how-to-configure-security-settings/edit-delete-role.png":::

> [!NOTE]
> Renaming a role updates only its name. The configured permissions remain unchanged.

### Delete a role

To delete a role:

1. In **Roles**, select the role that you want to delete.
1. Select the **Delete** icon.
1. Confirm the deletion.

> [!NOTE]
> The [**Item Baseline**](#default-item-baseline-role) role is the default system role and you can't rename or delete it.

## Configure sheet-level general permissions

The **General** tab controls sheet-level access permissions to all sheets in the item for the selected role. Each sheet is listed individually, so you can configure its visibility and editing permissions.

:::image type="content" source="media/powertable-how-to-configure-security-settings/general.png" alt-text="Screenshot of the General tab with the Team Member role selected, showing Visible and Read Only toggles for each sheet." lightbox="media/powertable-how-to-configure-security-settings/general.png":::

Select the role on the left. Then, for every sheet, set the following permissions:

| Permission | Description |
| --- | --- |
| **Visible** | Determines whether the sheet is visible to users assigned to the selected role. Disable this option to hide the sheet from users. |
| **Read Only** | Allows users to view the sheet but prevents them from making changes. Disable this option to allow users to edit the sheet. |

By default, you can view and edit all sheets for the selected role. You can configure individual sheets to hide them or make them read-only as required.

> [!IMPORTANT]
> Enable the **Visible** toggle to make the sheet available to users. If you disable the **Visible** toggle, users can't access the sheet regardless of the **Read Only** setting.

## Assign roles to users

The final step is to assign the configured roles to users. Users inherit the policies attached to their assigned roles.

To assign roles to users:

1. Select **Users** from the left pane.
1. Select **Assign Role**.
1. Select one or more users from the **Users** dropdown.
1. Select one or more roles from the **Roles** dropdown.
1. Select **Add**.

   :::image type="content" source="media/powertable-how-to-configure-security-settings/assign-roles-users.png" alt-text="Screenshot of the Add Users dialog with two users selected and the Team Member role, with the Add button highlighted." lightbox="media/powertable-how-to-configure-security-settings/assign-roles-users.png":::

### How multiple roles work

When a user is assigned multiple roles for the same table or database, the policies attached to those roles are combined, and the permissions that provide the highest level of access determine the user's effective access.

For example, if one role grants **Insert** access to the **Products** table and another role grants **Update** access with a filter condition, the user can **Insert**, **Read**, and **Update** records in the **Products** table.
