---
title: Organizational visuals
description: Learn about admin organizational visual capabilities and how to customize Power BI visuals based on the needs of your organization.
author: billmath
ms.author: billmath
ms.topic: how-to
ms.date: 10/23/2025
ms.custom: sfi-image-nochange
#customer intent: As a Fabric administrator for your organization, I want to control the type of Power BI visuals that users can access across the organization and limit the actions users can perform so that I can ensure compliance with company policies and security standards.
---

# Manage Power BI visuals admin settings

As a Fabric administrator for your organization, you can control the type of Power BI visuals that users can access across the organization and limit the actions users can perform.

To manage Power BI visuals, you must be a Fabric administrator. For more information about the Fabric administrator role, see [Understand Microsoft Fabric admin roles](roles.md).

## Power BI visuals tenant settings

To manage the tenant settings for Power BI visuals from the admin portal, go to **Tenant settings** and scroll down to **Power BI visuals**.

:::image type="content" source="media/organizational-visuals/power-bi-visuals-tenant-settings.png" alt-text="Screenshot of the Power BI visuals tenant settings location.":::

The UI tenant settings only affect the Power BI service. If you want these settings to take effect in Power BI Desktop, use group policies. A table at the end of each section provides details for enabling the setting in Power BI Desktop.

These settings allow you to control the following actions for Power BI visuals in your organization:

* [Allow visuals created using the Power BI SDK](#visuals-from-appsource-or-a-file)
* [Add and use certified Power BI visuals only](#certified-power-bi-visuals)
* [Allow downloads from custom visuals](#export-data-to-file)
* [AppSource Custom Visuals SSO](#appsource-custom-visuals-sso)
* [Allow access to the browser's local storage](#local-storage)

### Visuals from AppSource or a file

Manage organizational access for the following types of Power BI visuals:

* Custom visuals that developers create by using the Power BI SDK and save as a *.pbiviz* file.

* Visuals that you download from AppSource.

This setting is disabled by default and doesn't affect visuals in the [organizational store](/power-bi/developer/visuals/power-bi-custom-visuals#organizational-store).

Use the following instructions to enable users in your organization to upload *.pbiviz* files, and add visuals from AppSource to their reports and dashboards:

1. Expand the **Allow visuals created using the Power BI SDK** settings.

1. Select **Enabled**.

1. Choose who can upload *.pbiviz* and AppSource visuals:

    * Select **The entire organization** option to allow everyone in your organization to upload *.pbiviz* files, and add visuals from AppSource.

    * Select the **Specific security groups** option to manage uploading *.pbiviz* files, and adding visuals from AppSource by using security groups. Add the security groups you want to manage to the *Enter security groups* text bar. The security groups you specify are excluded by default. If you want to include these security groups and exclude everyone else in the organization, select the **Except specific security groups** option.

1. Select **Apply**.

UI changes to tenant settings apply only to the Power BI service. To enable users in your organization to upload *.pbiviz* files, and add visuals from AppSource to their visualization pane in  Power BI Desktop, use AD Group Policy.

|Key  |Value name  |Value  |
|---------|---------|---------|
|Software\Policies\Microsoft\Power BI Desktop\    |EnableCustomVisuals    |0 - Disable </br>1 - Enable (default)         |

### Certified Power BI visuals

[Certified Power BI visuals](/power-bi/developer/visuals/power-bi-custom-visuals-certified) are visuals that meet the Microsoft Power BI team [code requirements](/power-bi/developer/visuals/power-bi-custom-visuals-certified#certification-requirements) and testing. The tests check that the visual doesn't access external services or resources. However, Microsoft isn't the author of non-Microsoft visuals, so contact the author directly to verify the functionality of these visuals.

When you enable this setting, only certified Power BI visuals render in your organization's reports and dashboards. Power BI visuals from AppSource or files that aren't certified return an error message. This setting is disabled by default and doesn't apply to visuals in your [organizational store](/power-bi/developer/visuals/power-bi-custom-visuals#organizational-store).

1. From the admin portal, select **Add and use certified visuals only**.

1. Select **Enabled**.

1. Select **Apply**.

UI changes to tenant settings apply only to the Power BI service. To manage the certified visuals tenant setting in Power BI Desktop, use AD Group Policy.

|Key  |Value name  |Value  |
|---------|---------|---------|
|Software\Policies\Microsoft\Power BI Desktop\    |EnableUncertifiedVisuals    |0 - Disable </br>1 - Enable (default)         |

### Export data to file

When you enable this setting, users can download data from a custom visual into a file on their storage device. This setting is separate from and not affected by download restrictions applied in your organization's [export and sharing](service-admin-portal-export-sharing.md) tenant settings. This setting is disabled by default and applies to all visuals including those visuals managed by your organizational store, Desktop, and web.

> [!NOTE]
>When you enable this setting, a custom visual can export to files of the following types:
>
>* .txt
>* .csv
>* .json
>* .tmplt
>* .xml
>* .pdf
>* .xlsx

1. Expand the **Allow downloads from custom visuals** settings.

1. Select **Enabled**.

1. Choose who can download files:

   * Select **The entire organization** option to allow everyone in your organization to download data from a visual into a file.
   * Select the **Specific security groups** option to limit downloading files to specific security groups. Enter the security groups you want in the *Enter security groups* text bar. The security groups you specify are included by default. If you want to exclude these security groups and include everyone else in the organization, select the **Except specific security groups** option.

1. Select **Apply**.

UI changes to tenant settings apply only to the Power BI service. To enable users in your organization to download data from custom visuals in Power BI Desktop, use AD Group Policy.

|Key  |Value name  |Value  |
|---------|---------|---------|
|Software\Policies\Microsoft\Power BI Desktop\    |AllowCVToExportDataToFile    |0 - Disable </br>1 - Enable (default)         |

When `AllowCVToExportDataToFile` is set to *1*, the custom visual can export data to a file only if:

* The feature switch in the admin portal is enabled.
* The user is signed in.

### Local storage

This setting enables visuals to [store data on the browser's local storage](/power-bi/developer/visuals/local-storage) which helps improve performance. This setting is separate from and not affected by download restrictions applied in your organization's [export and sharing](service-admin-portal-export-sharing.md) tenant settings. The setting is enabled by default and applies to all visuals, including those visuals managed by your organizational store, Desktop, and web.

:::image type="content" source="./media/organizational-visuals/local-storage-setting.png" alt-text="Screenshot of the local storage settings admin switch." lightbox="./media/organizational-visuals/local-storage-setting.png" :::

To enable the local storage setting, follow these steps:

1. Expand the **Local storage** settings.

1. Select **Enabled**.

1. Choose who can render this API:

   * Select **The entire organization** option to allow visuals to store data on the local machine for every user in your organization.
   * Select the **Specific security groups** option to limit this privilege to specific security groups. Enter the security groups you want in the *Enter security groups* text bar. The security groups you specify are included by default. If you want to exclude these security groups and include everyone else in the organization, select the **Except specific security groups** option. Only a user listed in the permitted security group can render the API.

1. Select **Apply**.

### AppSource Custom Visuals SSO

When you enable this setting, AppSource Custom Visuals can get [Microsoft Entra ID (formerly known as Azure Active Directory) access tokens](/entra/identity/authentication/concept-authentication-oath-tokens) with restricted audiences for signed-in users by using the [Authentication API](/graph/api/resources/authenticationmethods-overview). These tokens include personal information such as the user's name and email address. Custom Visuals can send these tokens across different regions and compliance boundaries, and they're fully responsible for handling the tokens they possess. The setting is disabled by default and applies to all AppSource Custom Visuals, including those visuals managed by your organizational store.

:::image type="content" source="./media/organizational-visuals/authentication-setting.png" alt-text="Screenshot of authentication switch found in tenant settings.":::

1. Expand the **Allow custom visuals to get user Microsoft Entra access tokens** settings.

1. Select **Enabled**.

1. Choose who can render this API:

   * Select **The entire organization** option to allow visuals to get Microsoft Entra access tokens for every user in your organization.
   * Select the **Specific security groups** option to limit getting access tokens to specific security groups. Enter the security groups you want in the *Enter security groups* text bar. The security groups you specify are included by default. If you want to exclude these security groups and include everyone else in the organization, select the **Except specific security groups** option. Only a user listed in the permitted security group can render the API.

1. Select **Apply**.

## Organizational visuals

As a Fabric admin, you can manage the list of Power BI visuals available in your organization's [organizational store](/power-bi/developer/visuals/power-bi-custom-visuals#organizational-store). The **Organizational visuals** tab, in the *Admin portal*, allows you to add and remove visuals and decide which visuals automatically display in the visualization pane of your organization's users. You can add to the list any type of visual including uncertified visuals and *.pbiviz* visuals, even if they contradict the [tenant settings](#power-bi-visuals-tenant-settings) of your organization.

Organizational visuals settings automatically deploy to Power BI Desktop.

> [!NOTE]
>Power BI Report Server doesn't support organizational visuals.

### Add a visual from a file

Use this method to add a new Power BI visual from a *.pbiviz* file.

> [!WARNING]
> A Power BI visual uploaded from a file could contain code with security or privacy risks. Make sure you trust the author and the source of the visual before deploying to the organization's repository.

1. Select **Add visual** > **From a file**.

    :::image type="content" border="true" source="media/organizational-visuals/add-from-file.png" alt-text="Screenshot showing the organizational visuals menu in the Power BI admin settings. The add visual option is expanded, and the 'from a file' option is selected.":::

1. Fill in the following fields:

    * **Choose a .pbiviz file** - Select a visual file to upload.

    * **Name your visual** - Give a short title to the visual, so that report authors can easily understand what it does.

    * **Icon** - Upload an icon file to display in the visualization pane.

    * **Description** - Provide a short description of the visual to give more context for the user.

    * **Access** - Select whether users in your organization can access this visual. This setting is enabled by default.

    :::image type="content" source="media/organizational-visuals/add-visual.png" alt-text="Screenshot of the add visual pop-up menu with the options described in step 2.":::

1. Select **Add** to start the upload request. After it uploads, the visual appears in the organizational visuals list.

### Add a visual from AppSource

Use this method to add a new Power BI visual from AppSource.

AppSource Power BI visuals automatically update. Users in your organization always have the latest version of the visual.

1. Select **Add visual** > **From AppSource**.

    :::image type="content" source="media/organizational-visuals/add-visual-from-appsource.png" alt-text="Screenshot showing the organizational visuals menu in the Power BI admin settings. The add visual option is expanded, and the from app source option is selected.":::

1. In the **Power BI visuals** window, find the AppSource visual you want to add, and select **Add**. After it uploads, the visual displays in the organizational visuals list.

### Add a visual to the visualization pane

You can pick visuals from the organizational visuals page to automatically show on the visualization pane of all the users in your organization.

1. Select the visual you want to add.

1. Select **Enable for Visualization Pane**.

    :::image type="content" source="media/organizational-visuals/update-organizational-pane.png" alt-text="Screenshot showing the Enable for Visualization Pane button.":::

### Delete a visual uploaded from a file

To permanently delete a visual, select the visual then select **Delete**.

> [!IMPORTANT]
> Deletion is irreversible. After the visual is deleted, it immediately stops rendering in existing reports. Even if you upload the same visual again, it doesn't replace the one that was deleted. However, users can import the new visual again and replace the instance they have in their reports.

### Disable a *.pbiviz* visual

You can disable a *.pbiviz* visual from being available through the [organizational store](/power-bi/developer/visuals/power-bi-custom-visuals#organizational-store), while keeping it on the organizational visuals list.

1. Select the *.pbiviz* visual you want to disable, then select **Settings**.

1. In the **Access** section, disable the setting: **Users in the organization can access, view, share, and interact with this visual**.

After you disable the *.pbiviz* visual, the visual doesn't render in existing reports, and it displays the following error message:

`This custom visual is no longer available. Contact your administrator for details.`

> [!NOTE]
>*.pbiviz* visuals that are bookmarked continue working even after they're disabled.

### Update a visual

AppSource visuals update automatically. After a new version is available from AppSource, it replaces an older version deployed via the organizational visuals list.

To update a *.pbiviz* visual, follow these steps to replace the visual.

1. Select the visual you want to add, then select **Settings**.

1. Select **Browse**, then select the *.pbiviz* file you want to use to replace the current visual.

1. Select **Update**.

### Replace a visual from a file with a visual from AppSource

Sometimes an organization develops its own Power BI visual and distributes it internally. After some time, the organization might decide to make this visual public by uploading it to AppSource. To replace the visual uploaded from a file with the one from AppSource, use the following steps:

1. Add the visual from AppSource into the organizational store.

1. Open the report that contains this visual. Both the visual uploaded from a file and the AppSource visual are visible in the visualization pane.

1. In the report, highlight the visual uploaded from a file and in the visualization pane, select the AppSource visual to replace it. The visuals are swapped automatically. To verify that you're using the AppSource visual, in the visualization pane right-click the visual and select *about*.

1. Complete **step 3** for all the reports that contain the visual in your organization.

1. Delete the visual that you uploaded from a file.  

## Related content

* [What is the admin portal?](admin-center.md)
* [Visuals in Power BI](/power-bi/developer/visuals/power-bi-custom-visuals)
* [Organizational visuals in Power BI](/power-bi/developer/visuals/power-bi-custom-visuals-organization)
