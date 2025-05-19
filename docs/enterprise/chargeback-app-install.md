---
title: Install the Microsoft Fabric Chargeback app
description: Learn how to install the Microsoft Fabric Chargeback app.
author: BalajiShewale
ms.author: BalajiShewale
ms.topic: how-to
ms.custom:
ms.date: 05/15/2025
---

# Install the Microsoft Fabric Chargeback app

The *Microsoft Fabric Chargeback* app, also known as the *chargeback app*, is designed to monitor capacity utilization across your Fabric environment. Use this guide to install the app.

## Prerequisites

- You must be an admin of at least one capacity in your organization. Please visit the [Capacity settings](/docs/admin/capacity-settings.md) documentation to learn how to check your admin status.

- Installation of preview applications may be restricted by your organization's tenant policy. If you're unable to install the app, contact your tenant admin and request that they enable the [Install template apps not listed in AppSource](/docs/admin/tenant-settings-index.md) setting in the Power BI Admin portal.

## Install the app

Follow these steps to install the app from Microsoft AppSource.

To avoid throttling due to capacity overutilization, install the app in a workspace with a [Pro license](../power-bi/fundamentals/service-features-license-type#pro-license).


# [First time installation](#tab/1st)

To install the *Microsoft Fabric Chargeback* app for the first time, follow these steps:

1. Select one of these options to get the app from AppSource:

    * Go to [AppSource > Microsoft Fabric Chargeback](-) and select **Get it now**.

    * In Power BI service:

        1. Select **Apps**.

        2. Select **Get apps**.

        3. Search for **Microsoft Fabric**.

        4. Select the **Microsoft Fabric Chargeback** app.

        5. Select **Get it now**.

2. When prompted, sign in to AppSource using your Microsoft account and complete the registration screen. The app takes you to Microsoft Fabric to complete the process. Select **Install** to continue.

3. In the *Install this Power BI app* window, select **Install**.

4. Wait a few seconds for the app to install.

# [Upgrade the app](#tab/upgrade)

To upgrade a previous installation of the *Microsoft Fabric Chargeback* app, follow these steps:

1. Select one of these options to get the app from AppSource:

    * Go to [AppSource > Microsoft Fabric Chargeback](-) and select **Get it now**.

    * In Power BI service:

        1. Select **Apps**.

        2. Select **Get apps**.

        3. Search for **Microsoft Fabric**.

        4. Select the **Microsoft Fabric Chargeback** app.

        5. Select **Get it now**.

2. In the **Update app** window, select one of the following:

    * **Update the workspace and the app**

    Updates your current app and the workspace it resides in. This is the default option for upgrading the app. It will remove the current version and its workspace and replace them with the new version of the app and a corresponding workspace.

    * **Update only workspace content without updating the app**

    Updates the workspace but doesn't update the app. Select this option to update the app's workspace without upgrading the app.

    * **Install another copy of the app into a new workspace**

    Creates a new workspace and installs the new version of the app in this workspace. Select this option if you want to keep the old version of the app with the new one. This option creates another workspace for the new app version and installs the app in the newly created workspace. If you select this option, you'll need to provide a name for the new workspace.

3. Select **Install**.

---

## Run the app for the first time

To complete the installation, configure the Microsoft Fabric Chargeback app by running it for the first time.

1. In Microsoft Fabric, select **Apps**.

2. Select the **Microsoft Fabric Chargeback** app.

3. When you see the message **You're viewing the app with sample data**, click on **Connect your data**.

4. In the **Connect to Microsoft Fabric Chargeback** first window, fill in the fields according to the table:

| Field                 | Required | Value                                                                    | Notes                                            |
| --------------------- | -------- | ------------------------------------------------------------------------ | ------------------------------------------------ |
| **UTC Offset**        | Yes      |Numerical values ranging from `14` to `-12`.</br> To signify a Half hour timezone, use `.5`. For example, for Iran's standard time enter `3.5`.   |Enter your organization's standard time in Coordinated Universal Time (UTC). |
| **Days Ago to Start** | Yes      | Choose between `14` or `30` days | Number of days’ worth of historical data to load |
|**Advanced**   |Optional |**On** or **Off** |The app automatically refreshed your data at midnight. This option can be disabled by expanding the *advanced* option and selecting **Off**. |

5. Select **Next**.

6. In the **Connect to Microsoft Fabric Chargeback** second window, complete the following fields:

    * **Authentication method** - Select your authentication method. The default authentication method is *OAuth2*.

    * **Privacy level setting for this data source** - Select *Organizational* to enable app access to all the data sources in your organization.

    >[!NOTE]
    >*ExtensionDataSourceKind* and *ExtensionDataSourcePath* are internal fields related to the app's connector. Do not change the values of these fields.

7. Select **Sign in and continue**.

8.  After you configure the app, it can take a few minutes for the app to get your data. If you run the app and it's not displaying any data, refresh the app. This behavior happens only when you open the app for the first time.

### Considerations and limitations

* The Chargeback app is not supported in government clouds.

* The Microsoft Fabric Chargeback app doesn't support environments that use [private links](../security/security-private-links-overview.md).

### Troubleshooting

After installing the app, if it's not showing data or can't refresh, follow these steps:

1. Delete the old app.

2. Reinstall the latest version of the app.

3. Update the semantic model credentials.

## Related content

* [What is Fabric Chargeback app (preview)?](/docs/enterprise/chargeback-app.md)
  
* [Chargeback Azure Reservation costs](../azure-docs/articles/cost-management-billing/reservations/charge-back-usage.md)
  
* [View amortized benefit costs](../azure-docs/articles/cost-management-billing/reservations/view-amortized-costs.md)