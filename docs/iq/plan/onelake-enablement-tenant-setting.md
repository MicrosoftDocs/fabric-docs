---
title: Enable OneLake Storage for Fabric Plan Items in Tenant and Workspace Settings
description: Fabric planning as native planning engine supports OneLake for storing plan metadata. Learn how to configure the required tenant and workspace settings and also migrate existing items to OneLake.
ms.date: 11/24/2026
ms.topic: upgrade-and-migration-article
---

# Migration to OneLake - Native planning engine in Fabric plan

Fabric planning evolves into a **Native Planning Engine** by supporting OneLake as the application database (AppDB) for storing plan item metadata. This in-memory planning engine eliminates the need for a separate system database and delivers significant improvements in performance and scalability.

This article describes the new capabilities and benefits of OneLake storage in the native planning engine. It also explains how to enable OneLake storage for new plan items and migrate existing items to OneLake.

> [!NOTE]
>
> Native planning engine (OneLake as the application database) is currently in preview. During preview, you must manually enable this feature in tenant and workspace settings, and also manually migrate existing plan items to OneLake.
>
> At general availability (GA), OneLake will be enabled by default, and existing plan items will be migrated automatically.
>
> Note that, automatic OneLake migration is only for the application database. Fabric SQL remains a fully supported writeback destination.

## What is changing

By default, planning uses a Fabric SQL database (`__fabric_plan_sys`) to store plan item metadata and support viewer collaboration and sharing.

:::image type="content" source="media/onelake-enablement-tenant-setting/fabric-sql-app-database.png" alt-text="Screenshot of the Fabric workspace view listing the __fabric_plan_sys SQL database, the default plan application database.":::

When you enable OneLake storage, new plan items can use **OneLake** instead of this Fabric SQL database for the following storage purposes:

* Store application metadata associated with the plan item (AppDB).
* Store planning sheet writeback data.

You can also migrate existing plan item metadata from the current application database (a Fabric SQL database) to OneLake.

As a native planning engine with OneLake support, you no longer need to configure a separate database connection for viewer collaboration or sharing of plan items. Access to shared plan items is governed by workspace rules and user roles in Fabric Planning.

:::image type="content" source="media/onelake-enablement-tenant-setting/set-up-connection-banner.png" alt-text="Screenshot of the Extra configuration recommended banner and Set up connection button, crossed out as not required with OneLake enabled." lightbox="media/onelake-enablement-tenant-setting/set-up-connection-banner.png":::

> [!NOTE]
>
> This change applies only to the storage used for plan artifact metadata (AppDB). It doesn't automatically change where planning sheet's writeback data is stored.
>
> If you use a Fabric SQL database as the writeback destination for planning sheet data, you still need a Fabric SQL database connection to support writeback.
>
> Similarly, for PowerTable, you need to configure a Fabric SQL database connection to connect to the database used for storing table data.

| Data or scenario | Storage |
| --- | --- |
| Fabric plan application metadata (AppDB) | **OneLake**, for new items when the tenant and workspace settings are enabled and for [migrated items](#migrate-existing-plan-items-to-onelake). |
| Planning sheet writeback data | **Fabric SQL database** or **OneLake**, depending on the selected writeback destination. |
| PowerTable sheet data | **Fabric SQL database**, as configured during PowerTable sheet creation. |

## Why OneLake

The native planning engine is the default recommendation going forward.

With the native planning engine, you can:

**Scale planning up to 10 times more**: Increase the planning sheet limit from 1.2 million to 12 million cells by enabling OneLake storage. With the native planning engine, a planning sheet supports up to 12 million cells for planning and OneLake writeback. Writeback to a SQL database in Fabric remains limited to 2.4 million cells.

> [!NOTE]
> A cell is one value at the intersection of a row, a column, and a measure. The 12-million-cell limit applies to each planning sheet, not to the plan item as a whole, and counts everything loaded into it: Actuals fetched from the semantic model plus forecast and formula measures. It's not a per-user limit; filters and row-level security reduce what each user loads.

**Improve performance by up to tenfold**: Accelerate writeback and calculation engine operations. **Apache Arrow** supports efficient planning data access, while **Delta Parquet** makes business writeback outputs available across Fabric.

**Simplify the architecture**: Use OneLake to store plan item metadata without requiring a separate Fabric SQL system database. OneLake offers lower capacity consumption and cost compared to Fabric SQL databases, along with faster plan item creation and cell allocation.

**Use new capabilities**: Advanced modeling features such as **Audit cell history**, **driver-based modeling**, and **Snapshots** (frozen versions) are supported only by the native planning engine. They require its file-based architecture and aren't supported by the previous planning engine. Enable OneLake for AppDB so you're ready to adopt these capabilities.

### Performance benchmarks

The native planning engine delivers significant performance improvements in writeback and calculation operations. Compared to the previous planning engine, as shipped in the March preview, performance improvements vary by workload and data volume:

At 2.4 million cells, performance improved by five to six times.

At 12 million cells, writeback performance improved by up to 10 times.

These benchmarks demonstrate workload-specific improvements rather than a uniform performance gain. Actual performance depends on semantic model design and capacity size.

Other enhancements include:

* Faster plan artifact creation and opening.
* API optimizations for faster catalog navigation, data retrieval, and more responsive filtering.
* Improved application loading, data caching, and calculation processing for a smoother planning experience.
* More efficient processing and caching of multiple Intelligence Sheet visuals to improve their loading and rendering performance.

## Enable OneLake storage for new plan items

To start using OneLake as storage, enable the following tenant and workspace settings.

### Tenant setting

To set OneLake as the default storage source for new plan items, an administrator must first enable the corresponding OneLake setting in **Fabric tenant settings**.

In **Admin portal** > **Tenant settings**, under **Plan settings**, enable **Store new Plan items in OneLake**.

This setting applies to the entire organization.

:::image type="content" source="media/onelake-enablement-tenant-setting/tenant-setting.png" alt-text="Screenshot of Admin portal Tenant settings with Store new Plan items in OneLake toggle set to Enabled and the Apply button highlighted." lightbox="media/onelake-enablement-tenant-setting/tenant-setting.png":::

### Workspace setting

A workspace admin must also enable the **Store new Plan items in OneLake** setting. When enabled, OneLake is used as the default application database (AppDB) storage destination for metadata associated with all new plan items created in that workspace.

> [!NOTE]
> Before a workspace admin can configure this setting, it must be [delegated to the workspace](../../admin/delegate-settings.md), either directly by a tenant admin or through the relevant capacity or domain.

This setting is available at **Workspace settings** > **Delegated Settings** > **Plan settings**.

:::image type="content" source="media/onelake-enablement-tenant-setting/workspace-setting.png" alt-text="Screenshot of the Delegated Settings > Plan settings page with a red arrow pointing to the Store new plan items in OneLake toggle set to On." lightbox="media/onelake-enablement-tenant-setting/workspace-setting.png":::

### What happens after you turn on the setting

* All new plan items start in native planning engine mode. They use OneLake as the default storage for plan artifact metadata.
* Plan doesn't prompt you to set up a Fabric SQL connection for collaboration.
* Plan prompts you to configure a Fabric SQL connection and destination only when you select a Fabric SQL database as the writeback destination. You also need a Fabric SQL connection to create a PowerTable sheet.

### What next

1. **Start with new items**: Create new plan items and experience the better performance and scale.
1. **Migrate existing items**: Move existing items to OneLake when you’re ready.

## Migrate existing plan items to OneLake

Use the following steps to migrate an existing plan item's storage to OneLake.

### Before you migrate

* Identify the items that need to be migrated.
* Ensure that the required OneLake tenant setting is enabled.
* Ensure the item's corresponding workspace setting is enabled.

> [!IMPORTANT]
>
> After you migrate an existing plan item to OneLake, you can't migrate it back to Fabric SQL database storage. Back-migration to Fabric SQL isn't supported.

### Steps to migrate

1. Open the plan item that you want to migrate and then select **Manage Connections**.

    :::image type="content" source="media/onelake-enablement-tenant-setting/manage-connections.png" alt-text="Screenshot of the Home ribbon in a plan item, with Manage Connections highlighted next to Home Layout, Themes, and Settings." lightbox="media/onelake-enablement-tenant-setting/manage-connections.png":::

1. It has two tabs:

    * **App Database Connection** to select a different database connection or create a new connection.

        :::image type="content" source="media/onelake-enablement-tenant-setting/connections-dialog.png" alt-text="Screenshot of the Manage Connections dialog with the App Database Connection tab highlighted and Fabric SQL connection selected in the Select a Connection list.":::

    * **Storage**, where you choose OneLake migration.

        :::image type="content" source="media/onelake-enablement-tenant-setting/migrate-to-onelake-option.png" alt-text="Screenshot of the Manage Connections dialog with the Storage tab selected and the Migrate to OneLake button highlighted." lightbox="media/onelake-enablement-tenant-setting/migrate-to-onelake-option.png":::

1. Select **Migrate to OneLake**.

> [!IMPORTANT]
>
> After migration, you can't change the storage to Fabric SQL for this plan item.

The migration takes a few minutes. The plan artifact metadata is migrated to OneLake successfully.

:::image type="content" source="media/onelake-enablement-tenant-setting/migration-successful.png" alt-text="Screenshot of a planning sheet showing a notification that the plan artifact metadata was migrated to OneLake successfully." lightbox="media/onelake-enablement-tenant-setting/migration-successful.png":::

The **Manage Connection** option is disabled after the migration. All metadata and other artifact details are stored in OneLake going forward. The **Set up connection** banner also disappears.

:::image type="content" source="media/onelake-enablement-tenant-setting/connection-banner-disappears.png" alt-text="Screenshot of a planning sheet after OneLake migration, with Manage Connections disabled on the Home ribbon and no Set up connection banner shown." lightbox="media/onelake-enablement-tenant-setting/connection-banner-disappears.png":::

> [!IMPORTANT]
> Do not delete the Fabric SQL database until all plan items in the workspace have been migrated to OneLake. Items that aren't migrated continue to depend on the Fabric SQL database for metadata storage. Deleting the database before completing the migration breaks these items.

## Storage after migration

After you migrate an existing plan item to OneLake, the system stores its app metadata in OneLake. You can then use capabilities such as snapshots and audit cell history, along with the performance improvements offered by OneLake storage.

Migrating plan item metadata doesn't change how Fabric SQL databases are used for other purposes, such as storing writeback data. For example, if a plan item uses a Fabric SQL database as its writeback destination, that configuration remains unchanged, and writeback data continues to be stored in that database. Similarly, PowerTable continues to use its Fabric SQL database to store sheet data.

To use OneLake as your writeback destination, select it while configuring the writeback destination. To learn more, see [Configure writeback destinations](./planning-writeback/planning-how-to-persist-data.md#create-a-writeback-destination).

## FAQs

### Who can turn on the native planning engine?

A Fabric administrator turns on **Store new Plan items in OneLake** in **Tenant settings**. The setting can be delegated so that capacity and workspace admins can enable or disable it, and it's then turned on for each workspace in **Workspace settings** → **Plan settings**. See [Enable OneLake storage for new plan items](#enable-onelake-storage-for-new-plan-items).

### Do existing plan items change when I turn it on?

No. The setting applies to new plan items. Existing items keep running on the previous planning engine until you migrate them, or until the automatic migration at general availability.

### Is Fabric SQL still needed?

Yes, but not as the system database. Planning inputs are now stored in OneLake, which removes the need for a second database. PowerTable continues to use Fabric SQL as its writeback database, and Planning sheets continue to support Fabric SQL as a writeback destination, alongside OneLake writeback.

### Does my data come with the item when I migrate?

Migrating an item through **Manage Connections** > **Storage** > **Migrate to OneLake** moves that item to the new engine. Copying an item with deployment pipelines creates a new item without its data, which is useful for testing.

The recommended path is to smoke test first: copy the item with deployment pipelines, check it on the native planning engine, then migrate the original using **Manage Connections** > **Storage** > **Migrate to OneLake**. The following FAQ explains the steps to test before you migrate.

### How do I try the native planning engine before migrating my actual plan items that contain data?

Smoke test a copy first before migrating the original, as follows:

1. **Test with deployment pipelines**: To try the native planning engine before migrating, use deployment pipelines (CI/CD) to deploy an existing plan item that uses the previous planning engine *in a new workspace*. Use native planning engine mode for the new item. Before testing writeback, verify that the copied item's writeback destinations and connections point to isolated test databases or storage, not the original destinations. For SQL destinations, see [Use variables for writeback destinations and connections](resources/cicd-planning.md#use-variables-for-writeback-destinations-and-connections). Then test its performance capabilities before migrating the original.

1. **During preview**: After one or two weeks of getting comfortable with the native engine, migrate your existing plan items gradually rather than all at once. Migration is one-way, so smoke test a copy first. Open **Manage Connections** and migrate each item to native planning engine mode, or use deployment pipelines to copy an item into a brand-new one if you don’t need its data. The [Migration to OneLake guide](#migrate-existing-plan-items-to-onelake) walks through each step.

1. **After migrating**: Open your key sheets and Intelligence Sheets and check that results and reports look as expected.

1. **At general availability**: At GA, all customers and existing plan items that have not yet moved will be automatically migrated to the native planning engine.

### After migration, can I move an item back to the previous planning engine?

No. Migration is one-way, so a migrated item can’t be moved back to the previous planning engine.

### What happens to the Fabric SQL system database?

Once every plan item in the workspace has been migrated to OneLake, the Fabric SQL system database (the application database) can be safely deleted. If any plan items in the workspace haven’t been migrated yet, leave the database in place so their metadata isn’t lost. Keeping it does no harm.

### Does the new engine change what I pay?

The pricing model doesn’t change: Fabric plan is still billed by session type on your Fabric capacity. What changes is the other resources part of the bill. Requests to OneLake such as reading and writing data consume Fabric Capacity units. OneLake storage is billed at a pay-as-you-go rate per GB of data used and doesn't consume Fabric Capacity units. See how [Fabric plan pricing](https://community.fabricplan.com/blogs/fabric-planning/fabric-plan-pricing-guide/) and [OneLake consumption](../../onelake/onelake-consumption.md) work.

### Are there limitations during the preview?

There are no known functional gaps compared with the previous planning engine. Plan for the following limitations:

* **Cell limit**: A Planning sheet supports up to 12 million cells with OneLake enabled, but only up to 1.2 million cells with Fabric SQL as App DB.
* **Semantic model queries**: Your capacity's query and concurrency limits apply to data fetched through XMLA, so very large fetches can be throttled.
* **Writeback**: With Fabric SQL destination, keep each writeback under 2.4 million cells to avoid timeout errors, while OneLake writebacks can support up to 12 million cells.
* **One-way migration**: You can't move a migrated plan item back. Test a copy first.
