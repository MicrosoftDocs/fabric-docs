---
title: Install the Microsoft Fabric capacity metrics app
description: Learn how to install the Microsoft Fabric capacity metrics app.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.custom:
ms.date: 09/01/2025
---

# Install the Microsoft Fabric capacity metrics app

The *Microsoft Fabric Capacity Metrics* app, also known as the *metrics app*, is designed to provide monitoring capabilities for Fabric and Power BI Premium capacities. Use this guide to install the app.

## Prerequisites

To install the metrics app, you need:

- To be a capacity admin
- A Power BI license (Pro, Premium Per User, or a Power BI individual trial) to access and use the app

## Install the app

Follow the steps according to the type of installation you need. If you're installing the app in a government cloud environment, use the links in [government clouds](#government-clouds).

To avoid throttling due to capacity overutilization, install the app in a workspace with a [Pro license](/power-bi/fundamentals/service-features-license-type#pro-license).

# [First time installation](#tab/1st)

To install the *Microsoft Fabric Capacity Metrics* app for the first time, follow these steps:

1. Select one of these options to get the app from AppSource:
    * Go to [AppSource > Microsoft Fabric Capacity Metrics](https://go.microsoft.com/fwlink/?linkid=2219875) and select **Get it now**.
    * In Power BI service:
        1. Select **Apps**.
        1. Select **Get apps**.
        1. Search for **Microsoft Fabric**.
        1. Select the **Microsoft Fabric Capacity Metrics** app.
        1. Select **Get it now**.
1. When prompted, sign in to AppSource using your Microsoft account and complete the registration screen. The app takes you to Microsoft Fabric to complete the process. Select **Install** to continue.
1. In the *Install this Power BI app* window, select **Install**.
1. Wait a few seconds for the app to install.

# [Upgrade the app](#tab/upgrade)

To upgrade a previous installation of the *Microsoft Fabric Capacity Metrics* app, follow these steps:

1. Select one of these options to get the app from AppSource:
    * Go to [AppSource > Microsoft Fabric Capacity Metrics](https://go.microsoft.com/fwlink/?linkid=2219875) and select **Get it now**.
    * In Power BI service:
        1. Select **Apps**.
        1. Select **Get apps**.
        1. Search for **Microsoft Fabric**.
        1. Select the **Microsoft Fabric Capacity Metrics** app.
        1. Select **Get it now**.
1. In the **Update app** window, select one of the following:
    * **Update the workspace and the app**: This option updates your current app and the workspace it resides in. This is the default option for upgrading the app. It removes the current version and its workspace and replaces them with the new version of the app and a corresponding workspace.
    * **Update only workspace content without updating the app**: This option updates the workspace but doesn't update the app. Select this option to update the app's workspace without upgrading the app.
    * **Install another copy of the app into a new workspace**: This option creates a new workspace and installs the new version of the app in this workspace. Select this option if you want to keep the old version of the app with the new one. This option creates another workspace for the new app version and installs the app in the newly created workspace. If you select this option, you need to provide a name for the new workspace.
1. Select **Install**.

---

## Run the app for the first time

To complete the installation, configure the Microsoft Fabric Capacity Metrics app by running it for the first time.

1. In Microsoft Fabric, in the Power BI experience, select **Apps**. If you're running the app just after installing it, you'll be redirected to the **Apps** pane, and you can skip to step 2. Otherwise, to see the **Apps** pane, change the experience selector from the bottom left to Power BI instead of Fabric.
1. Select the **Microsoft Fabric Capacity Metrics** app.
1. When you see the message *You have to connect to your own data to view this report*, select **Connect**.
1. In the **Connect to Microsoft Fabric Capacity Metrics** first window, fill in the fields according to the table:

    |Field          |Required |Value    |Notes    |
    |---------------|---------|---------|---------|
    |**UTC_offset** |Yes |Numerical values ranging from `14` to `-12`.</br> To signify a Half hour timezone, use `.5`. For example, for India's standard time enter `5.5`.   |Enter your organization's standard time in Coordinated Universal Time (UTC). |
    | **RegionName** | Applicable for version 2.0 and below | **Capacity Administrator**: Set the region parameter as "**Default**".<br><br>**Tenant Administrator**:<br>&nbsp;&nbsp;• If you're a tenant admin and have admin permissions on a capacity in the home region, **or** there are no capacities in home region for the whole tenant then set the parameter as "**Default**".<br>&nbsp;&nbsp;• Otherwise, set it as one of the regions where you have admin permission on a capacity (for example, **"West Europe"**). | 1. Both **paused** and **trial capacities** are also considered when determining your available regions.<br><br>2. After configuration, if you **create or delete a capacity**, it might affect the report, reevaluate the value of **RegionName** parameter. If the value needs to be different than currently configured value, update the value from **semantic model settings** and refresh the model.<br><br>3. You can find the **RegionName** of a capacity in capacity settings section from the admin portal. In Microsoft Fabric, go to **Settings** > **Governance and insights** > **Admin portal** > **Capacity settings**, then look for the region value displayed next to the capacity name. |
    |**DefaultCapacityID** | Applicable for versions 1.9.2 to 2.0 |An ID of a capacity you're an admin of |You can find the capacity ID in the URL of the capacity management page. In Microsoft Fabric, go to **Settings** > **Governance and insights** > **Admin portal** > **Capacity settings**, then select a capacity. The capacity ID is shown in the URL after */capacities/*. For example, `00001111-aaaa-2222-bbbb-3333cccc4444` is the capacity ID in this URL: `https://app.powerbi.com/admin-portal/capacities/00001111-aaaa-2222-bbbb-3333cccc4444`.</br> After installation, the app lets you see all the capacities you can access. |
    |**CapacityID** | Applicable for version 1.8 and below |An ID of a capacity you're an admin of |You can find the capacity ID in the URL of the capacity management page. In Microsoft Fabric, go to **Settings** > **Governance and insights** > **Admin portal** > **Capacity settings**, then select a capacity. The capacity ID is shown in the URL after */capacities/*. For example, `00001111-aaaa-2222-bbbb-3333cccc4444` is the capacity ID in this URL: `https://app.powerbi.com/admin-portal/capacities/00001111-aaaa-2222-bbbb-3333cccc4444`.</br> After installation, the app lets you see all the capacities you can access. |
    |**Advanced**   |Optional |**On** or **Off** |The app automatically refreshed your data at midnight. This option can be disabled by expanding the *advanced* option and selecting **Off**. |

    >[!NOTE]
    > If you're a tenant admin with no capacities in your home region and you upgrade from versions between 1.9 and 2.0 to version 2.0.1 or later, you might see no capacities on the Health page when the first region in the slicer is selected. To resolve this, select the **Region** slicer and choose any available region to display data.
    >
    > The Fabric Capacity Metrics app uses several other parameters. These parameters aren't meant to be user-configurable and shouldn't be modified. Changing them can break the semantic model and/or the report.

1. Select **Next**.
1. In the **Connect to Microsoft Fabric Capacity Metrics** second window, complete the following fields:

    * **Authentication method** - Select your authentication method. The only supported authentication method is *OAuth2*.
    * **Privacy level setting for this data source** - Select *Organizational* to enable app access to all the data sources in your organization.

    >[!NOTE]
    >*ExtensionDataSourceKind* and *ExtensionDataSourcePath* are internal fields related to the app's connector. Don't change the values of these fields.

1. Select **Sign in and continue**.
1. Select a capacity from the **Capacity Name** drop down.
1. After you configure the app, it can take a few minutes for the app to get your data. If you run the app and it's not displaying any data, refresh the app. This behavior happens only when you open the app for the first time.

### Government clouds

To install the app in a government cloud environment, use one of these links. You can also use these links to upgrade the app. When upgrading, you don't need to delete the old app.

* [Microsoft 365 Government Community Cloud (GCC)](https://aka.ms/FabricUSGovCapacityUsageReport)
* [Microsoft 365 Government Community Cloud High (GCC High)](https://aka.ms/FabricUSGovHighCapacityUsageReport)
* [Microsoft 365 Department of Defense (DoD)](https://aka.ms/FabricUSGovDodCapacityUsageReport)
* [Power BI for China cloud](https://aka.ms/FabricMCCCapacityUsageReport)

### Considerations and limitations

OneLake isn't supported in Government Community Cloud (GCC).

### Troubleshooting

After installing the app, if it's not showing data or can't refresh, follow these steps:

1. Delete the old app.
1. Reinstall the latest version of the app.
1. Update the semantic model credentials.

## Related content

* [Understand the metrics app compute page](metrics-app-compute-page.md)
