---
title: Install the Microsoft Fabric Chargeback app
description: Learn how to install the Microsoft Fabric Chargeback app.
author: kishanpujara-ms
ms.author: kishanpujara
ms.reviewer: juliacawthra
ms.topic: how-to
ms.custom:
ms.date: 07/02/2025
---

# Install the Microsoft Fabric Chargeback app

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The Microsoft Fabric Chargeback app, also known as the chargeback app. It provides turnkey insights that help organizations implement effective chargeback policies - enabling a fair distribution of costs based on actual usage patterns across your Fabric environment. Use this guide to install the app.

## Prerequisites

- You must be an admin of at least one capacity in your organization. Please visit the [Capacity settings](../admin/capacity-settings.md) documentation to learn how to check your admin status.

## Install the app

Follow these steps to install the app from Microsoft AppSource.

To avoid throttling due to capacity overutilization, install the app in a workspace with a [Pro license](/power-bi/fundamentals/service-features-license-type).


# [First time installation](#tab/1st)

To install the *Microsoft Fabric Chargeback* app for the first time, follow these steps:

1. Select one of these options to get the app from AppSource:
    - Go to [AppSource > Microsoft Fabric Chargeback](https://go.microsoft.com/fwlink/?linkid=2320990) and select **Get it now**.
    - In Power BI service:
        1. Select **Apps**.
        1. Select **Get apps**.
        1. Search for **Microsoft Fabric**.
        1. Select the **Microsoft Fabric Chargeback** app.
        1. Select **Get it now**.
1. When prompted, sign in to AppSource using your Microsoft account and complete the registration screen. The app takes you to Microsoft Fabric to complete the process. Select **Install** to continue.
1. In the *Install this Power BI app* window, select **Install**.
1. Wait a few seconds for the app to install.

# [Upgrade the app](#tab/upgrade)

To upgrade a previous installation of the *Microsoft Fabric Chargeback* app, follow these steps:

1. Select one of these options to get the app from AppSource:
    - Go to [AppSource > Microsoft Fabric Chargeback](https://go.microsoft.com/fwlink/?linkid=2320990) and select **Get it now**.
    - In Power BI service:
        1. Select **Apps**.
        1. Select **Get apps**.
        1. Search for **Microsoft Fabric**.
        1. Select the **Microsoft Fabric Chargeback** app.
        . Select **Get it now**.
1. In the **Update app** window, select one of the following:
    - **Update the workspace and the app**: This option updates your current app and the workspace it resides in. This is the default option for upgrading the app. It removes the current version and its workspace and replaces them with the new version of the app and a corresponding workspace.
    - **Update only workspace content without updating the app**: This option updates the workspace but doesn't update the app. Select this option to update the app's workspace without upgrading the app.
    - **Install another copy of the app into a new workspace**: This option creates a new workspace and installs the new version of the app in this workspace. Select this option if you want to keep the old version of the app with the new one. This option creates another workspace for the new app version and installs the app in the newly created workspace. If you select this option, you need to provide a name for the new workspace.
1. Select **Install**.

---

## Run the app for the first time

To complete the installation, configure the Microsoft Fabric Chargeback app by running it for the first time.

1. In Microsoft Fabric, select **Apps**.
1. Select the **Microsoft Fabric Chargeback** app.
1. When you see the message **You're viewing the app with sample data**, select **Connect your data**.
1. In the **Connect to Microsoft Fabric Chargeback** first window, fill in the fields according to the following table:

   | Field                 | Required | Value                                                                    | Notes                                            |
   | --------------------- | -------- | ------------------------------------------------------------------------ | ------------------------------------------------ |
   | **UTC Offset**        | Yes      |Numerical values ranging from `14` to `-12`.</br> To signify a Half hour timezone, use `.5`. For example, for Australian Eastern standard time enter `10`.   |Enter your organization's standard time in Coordinated Universal Time (UTC). |
   | **Days Ago to Start** | Yes      | Choose between `14` or `30` days | Number of days’ worth of historical data to load |
   |**Advanced**   |Optional |**On** or **Off** |The app automatically refreshed your data at midnight. This option can be disabled by expanding the *advanced* option and selecting **Off**. |

1. Select **Next**.
1. In the **Connect to Microsoft Fabric Chargeback** second window, complete the following fields:
    - **Authentication method** - Select your authentication method. The default authentication method is *OAuth2*.
    - **Privacy level setting for this data source** - Select **Organizational** to enable app access to all the data sources in your organization.

    >[!NOTE]
    >*ExtensionDataSourceKind* and *ExtensionDataSourcePath* are internal fields related to the app's connector. Don't change the values of these fields.

1. Select **Sign in and continue**.
1.  After you configure the app, it can take a few minutes for the app to get your data. If you run the app and it's not displaying any data, refresh the app. This behavior happens only when you open the app for the first time.

### Considerations and limitations

- The Microsoft Fabric Chargeback app isn't currently supported in government clouds.
- The Microsoft Fabric Chargeback app doesn't support environments that use [private links](../security/security-private-links-overview.md).

### Troubleshooting

After installing the app, if it's not showing data or can't refresh, follow these steps:

1. Delete the old app.
1. Reinstall the latest version of the app.
1. Update the semantic model credentials.

## Related content

- [What is Fabric Chargeback app (preview)?](chargeback-app.md) 
- [Chargeback Azure Reservation costs](/azure/cost-management-billing/reservations/charge-back-usage)
- [View amortized benefit costs](/azure/cost-management-billing/reservations/view-amortized-costs)
