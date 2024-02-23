---
title: Install the Microsoft Fabric capacity metrics app
description: Learn how to install the Microsoft Fabric capacity metrics app.
author: KesemSharabi
ms.author: kesharab
ms.topic: how to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 12/31/2023
---

# Install the Microsoft Fabric capacity metrics app

The *Microsoft Fabric Capacity Metrics* app, also known as the *metrics app*, is designed to provide monitoring capabilities for Fabric and Power BI Premium capacities. Use this guide to install the app.

## Prerequisites

To install the metrics app, you need to be a capacity admin.

## Install the app

Follow the steps according to the type of installation you need. If you're installing the app in a government cloud environment, use the links in [government clouds](#government-clouds).

To avoid throttling due to capacity overutilization, install the app in a workspace with a [Pro license](/power-bi/fundamentals/service-features-license-type#pro-license).

# [First time installation](#tab/1st)

To install the *Microsoft Fabric Capacity Metrics* app for the first time, follow these steps:

1. Select one of these options to get the app from AppSource:

    * Go to [AppSource > Microsoft Fabric Capacity Metrics](https://go.microsoft.com/fwlink/?linkid=2219875) and select **Get it now**.

    * In Power BI service:

        1. Select **Apps**.

        2. Select **Get apps**.

        3. Search for **Microsoft Fabric**.

        4. Select the **Microsoft Fabric Capacity Metrics** app.

        5. Select **Get it now**.

2. When prompted, sign in to AppSource using your Microsoft account and complete the registration screen. The app takes you to Microsoft Fabric to complete the process. Select **Install** to continue.

3. In the *Install this Power BI app* window, select **Install**.

4. Wait a few seconds for the app to install.

# [Upgrade the app](#tab/upgrade)

To upgrade a previous installation of the *Microsoft Fabric Capacity Metrics* app, follow these steps:

1. Select one of these options to get the app from AppSource:

    * Go to [AppSource > Microsoft Fabric Capacity Metrics](https://go.microsoft.com/fwlink/?linkid=2219875) and select **Get it now**.

    * In Power BI service:

        1. Select **Apps**.

        2. Select **Get apps**.

        3. Search for **Microsoft Fabric**.

        4. Select the **Microsoft Fabric Capacity Metrics** app.

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

To complete the installation, configure the Microsoft Fabric Capacity Metrics app by running it for the first time.

1. In Microsoft Fabric, select **Apps**.

2. Select the **Microsoft Fabric Capacity Metrics** app.

3. When you see the message *You have to connect to your own data to view this report*, select **Connect**.

4. In the **Connect to Microsoft Fabric Capacity Metrics** first window, fill in the fields according to the table:

    |Field          |Required |Value    |Notes    |
    |---------------|---------|---------|---------|
    |**CapacityID** |Yes |An ID of a capacity you're an admin of |You can find the capacity ID in the URL of the capacity management page. In Microsoft Fabric, go to **Settings** > **Admin center** > **Capacity settings**, then select a capacity. The capacity ID is shown in the URL after */capacities/*. For example, `9B77CC50-E537-40E4-99B9-2B356347E584` is the capacity ID in this URL: `https://app.powerbi.com/admin-portal/capacities/9B77CC50-E537-40E4-99B9-2B356347E584`.</br> After installation, the app will let you see all the capacities you can access. |
    |**UTC_offset** |Yes |Numerical values ranging from `14` to `-12`.</br> To signify a Half hour timezone, use `.5`. For example, for Iran's standard time enter `3.5`.   |Enter your organization's standard time in Coordinated Universal Time (UTC). |
    |**Timepoint**  |Automatically populated  |         |This field is automatically populated and is used for internal purposes. The value in this field will be overwritten when you use the app. |
    |**Timepoint2** |Automatically populated  |         |This field is automatically populated and is used for internal purposes. The value in this field will be overwritten when you use the app. |
    |**Advanced**   |Optional |**On** or **Off** |The app automatically refreshed your data at midnight. This option can be disabled by expanding the *advanced* option and selecting **Off**. |

5. Select **Next**.

6. In the **Connect to Microsoft Fabric Capacity Metrics** second window, complete the following fields:

    * **Authentication method** - Select your authentication method. The default authentication method is *OAuth2*.

    * **Privacy level setting for this data source** - Select *Organizational* to enable app access to all the data sources in your organization.

    >[!NOTE]
    >*ExtensionDataSourceKind* and *ExtensionDataSourcePath* are internal fields related to the app's connector. Do not change the values of these fields.

7. Select **Sign in and continue**.

8. Select a capacity from the **Capacity Name** drop down.

9. After you configure the app, it can take a few minutes for the app to get your data. If you run the app and it's not displaying any data, refresh the app. This behavior happens only when you open the app for the first time.

### Government clouds

To install the app in a government cloud environment, use one of these links. You can also use these links to upgrade the app. When upgrading, you don't need to delete the old app.

* [Microsoft 365 Government Community Cloud (GCC)](https://aka.ms/FabricUSGovCapacityUsageReport)

* [Microsoft 365 Government Community Cloud High (GCC High)](https://aka.ms/FabricUSGovHighCapacityUsageReport)

* [Microsoft 365 Department of Defense (DoD)](https://aka.ms/FabricUSGovDodCapacityUsageReport)

* [Power BI for China cloud](https://aka.ms/FabricMCCCapacityUsageReport)

### Considerations and limitations

OneLake isn't supported in Government Community Cloud (GCC).

## Related content

* [Understand the metrics app compute page](metrics-app-compute-page.md)
