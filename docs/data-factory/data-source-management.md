---
title: Data source management
description: Learn how to add and remove data sources, and how to manage users.
ms.reviewer: DougKlopfenstein
ms.author: mideboer
author: miquelladeboer
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Data source management

[!INCLUDE [product-name](../includes/product-name.md)] supports many on-premises and cloud data sources, and each source has its own requirements. To learn how to add and manage an on-premises data source, go to [Add or remove a gateway data source](/power-bi/connect-data/service-gateway-data-sources). In this article, you'll learn how to add an Azure SQL Server as a cloud data source. The steps are similar for other data sources.

> [!NOTE]
> Currently, these cloud connections are only supported for data pipelines and Kusto. In the future, other items can also make use of the cloud connections. To create personal cloud connections in datasets, datamarts, and dataflows, use the Power Query Online experience in "get data".

## Add a data source

1. From the page header in the [!INCLUDE [product-name](../includes/product-name.md)] service, select the **Settings**  icon, and then select **Manage connections and gateways**.

   :::image type="content" source="media/data-source-management/manage-connections-gateways.png" alt-text="Screenshot showing where to select Manage connections and gateways.":::

2. Select the **Connections** tab, then select **New** at the top of the screen to add a new data source.

3. In the **New connection** screen, select **Cloud**, provide a **Connection name**, and select the **Connection Type**. For this example, choose **SQL server**.

4. Enter information about the data source. For SQL server, provide the **Server** and **Database**.

   :::image type="content" source="media/data-source-management/new-connection.png" alt-text="Screenshot showing examples of details in New connection screen.":::

5. Select an **Authentication method** to use when connecting to the data source, either **Basic**, **OAuth2**, or **Service Principal**. For example, choose **OAuth2** and sign in with your account.

   :::image type="content" source="media/data-source-management/authentication-method.png" alt-text="Screenshot showing where to select an authentication method.":::

   If you selected the **OAuth2** authentication method:

   - Any query that runs longer than the OAuth token expiration policy might fail.
   - Cross-tenant Microsoft Entra accounts aren't supported.

6. Under **General** > **Privacy level**, optionally configure a [privacy level](https://support.office.com/article/Privacy-levels-Power-Query-CC3EDE4D-359E-4B28-BC72-9BEE7900B540) for your data source. This setting doesn't apply to [DirectQuery](/power-bi/connect-data/desktop-directquery-about).

   :::image type="content" source="media/data-source-management/privacy-level.png" alt-text="Screenshot showing privacy level options.":::

7. Select **Create**. Under **Settings**, you see **Created new connection** if the process succeeds.

   :::image type="content" source="media/data-source-management/settings.png" alt-text="Screenshot of new connection success message.":::

You can now use this data source to include data from Azure SQL in the supported [!INCLUDE [product-name](../includes/product-name.md)] items.

## Remove a data source

You can remove a data source if you no longer use it. If you remove a data source, any items that rely on that data source no longer work.

To remove a data source, select the data source from the **Data** screen in **Manage connections and gateways**, and then select **Remove** from the top ribbon.

:::image type="content" source="media/data-source-management/remove-data-source.png" alt-text="Screenshot of where to select Remove.":::

## Manage users

After you add a cloud data source, you give users and security groups access to the specific data source. The access list for the data source controls only who is allowed to use the data source in items that include data from the data source.  

## Add users to a data source

1. From the page header in the Power BI service, select the **Settings** icon, and then select **Manage connections and gateways**.

2. Select the data source where you want to add users. To easily find all cloud connections, use the top ribbon to filter or search.

   :::image type="content" source="media/data-source-management/add-users-data-source.png" alt-text="Screenshot showing where to find all cloud connections." lightbox="media/data-source-management/add-users-data-source.png":::

3. Select **Manage users** from the top ribbon.

4. In the **Manage users** screen, enter the users and/or security groups from your organization who can access the selected data source.

5. Select the new user name, and select the role to assign, either **User**, **User with resharing**, or **Owner**.

6. Select **Share**. The added member's name is added to the list of people who can publish reports that use this data source.

   :::image type="content" source="media/data-source-management/manage-users.png" alt-text="Screenshot showing the Manage users screen." lightbox="media/data-source-management/manage-users.png":::

Remember that you need to add users to each data source that you want to grant access to. Each data source has a separate list of users. Add users to each data source separately.

## Remove users from a data source

On the **Manage Users** tab for the data source, you can remove users and security groups that use this data source.

## Manage sharing

Restrict users who can share cloud connections in Fabric
By default, any user in Fabric can share their connections if they have the following user role on the connection:
-	Connection owner or admin
-	Connection user with sharing

Sharing a connection in Fabric is sometimes needed for collaboration within the same workload or when sharing the workload with others. Connection sharing in Fabric makes this easy by providing a secure way to share connections with others for collaboration, but without exposing the secrets at any time. These connections can only be used within the Fabric environment.

If your organization does not allow for connection sharing or wants to limit the sharing of connections, a tenant admin can restrict sharing as a tenant policy. The policy allows you to block sharing within the entire tenant.

> [!NOTE]
> This restriction can result in limitations of multiple users being unable to collaborate within the same workloads.
> Disabling connection sharing does not impact connections that have already been shared.

How to enable the setting
1.	Make sure that you are either an Azure AD Global administrator (which includes Global admins) or a Power BI service administrator.
2.	In Power BI or Fabric go to settings and the manage connections and gateways page.
3.	In the top right, turn on the toggle for tenant administation.

:::image type="content" source="media/data-source-management/tenant-administration.png" alt-text="Screenshot showing the tenant administration toggle in the Manage connections and gateways page.":::

4.	Select Blocking shareable cloud connections and set the toggle to on. By default, the policy is off, meaning that every user in the tenant can share cloud connections.

:::image type="content" source="media/data-source-management/manage-cloud-connection-sharing.png" alt-text="Screenshot showing the manage cloud connection sharing feature.":::

5.	If you want, you can allowlist individual users by searching for them a selecting Add. All the users in the list below can share connections.

:::image type="content" source="media/data-source-management/manage-cloud-connection-sharing-on.png" alt-text="Screenshot showing the manage cloud connection sharing feature toggled on.":::

## Related content

- [Connectors overview](connector-overview.md)
