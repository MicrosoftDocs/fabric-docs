---
title: "Tutorial: Connect a Fabric dbt job to Azure HorizonDB (preview)"
description: In this tutorial, deploy an Azure HorizonDB resource and connect it to a Microsoft Fabric dbt job by using the PostgreSQL adapter.
ms.reviewer: akurnala
ms.topic: tutorial
ms.custom: build-2025
ms.date: 07/07/2026
ms.search.form: dbt-job-tutorials

#customer intent: As a data engineer, I want to connect a Microsoft Fabric dbt job to an Azure HorizonDB resource so that I can transform data in Azure HorizonDB directly from within Fabric.
---

# Tutorial: Connect a Fabric dbt job to Azure HorizonDB (preview)

Azure HorizonDB is a managed PostgreSQL-based database service. In this tutorial, you deploy an Azure HorizonDB resource in the Azure portal, and then connect it to a Microsoft Fabric dbt job by using the PostgreSQL adapter. Because Azure HorizonDB is PostgreSQL-compatible, the dbt PostgreSQL adapter can run your dbt models directly against it. After you complete this tutorial, you can use your dbt job to transform data in Azure HorizonDB directly from Fabric.

In this tutorial, you:

> [!div class="checklist"]
> - Create an Azure HorizonDB resource in the Azure portal.
> - Configure a Fabric dbt job to use the PostgreSQL adapter.
> - Connect the dbt job to your Azure HorizonDB resource.

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Prerequisites

- A [Fabric workspace](../get-started/create-workspaces.md) with a Fabric capacity (F2 or higher).
- An Azure subscription with permissions to create resources.
- A [dbt job](dbt-job-how-to.md) created in your Fabric workspace.

## Create an Azure HorizonDB resource

1. In the Azure portal, search for **HorizonDB**, and then select **Azure HorizonDB (Preview)**.

   :::image type="content" source="media/dbt-connect-azure-horizon-db/search-azure-horizondb.png" alt-text="Screenshot of the Azure portal search results showing the Azure HorizonDB (Preview) service.":::

1. Select **Create** to create a new Azure HorizonDB resource.

   :::image type="content" source="media/dbt-connect-azure-horizon-db/horizondb-create-button.png" alt-text="Screenshot of the Azure HorizonDB (Preview) resource list page with the Create button.":::

1. Enter the required resource details, including the subscription, resource group, cluster name, region, and the PostgreSQL administrator login and password. Use this authentication information later as the username and password when you connect from the dbt job.

   :::image type="content" source="media/dbt-connect-azure-horizon-db/create-horizondb-form.png" alt-text="Screenshot of the Create an Azure HorizonDB (Preview) form showing project details, cluster details, high availability, and authentication sections." lightbox="media/dbt-connect-azure-horizon-db/create-horizondb-form.png":::

1. Select **Review + create**, review the configuration, and then select **Create** to deploy.

1. Wait for the deployment to complete. The status changes from **Deployment is in progress** to a successful deployment state when the resource is ready.

## Connect the dbt job to Azure HorizonDB

1. In your Fabric workspace, open the dbt job you created in the [prerequisites](#prerequisites), or [create a new dbt job](dbt-job-how-to.md).

1. In the dbt profile configuration, select **PostgreSQL** as the database type.

   :::image type="content" source="media/dbt-connect-azure-horizon-db/dbt-postgresql-destination.png" alt-text="Screenshot of the dbt profile page showing the PostgreSQL database option in the New destinations section." lightbox="media/dbt-connect-azure-horizon-db/dbt-postgresql-destination.png":::

1. Enter the connection settings and credentials for the Azure HorizonDB resource you deployed in the Azure portal. Provide the server name, database name, username, and password.

   :::image type="content" source="media/dbt-connect-azure-horizon-db/postgresql-connection-settings.png" alt-text="Screenshot of the PostgreSQL connection settings form showing fields for server, database, connection name, authentication kind, username, and password." lightbox="media/dbt-connect-azure-horizon-db/postgresql-connection-settings.png":::

1. Select **Next** to connect to Azure HorizonDB and use the connection in your dbt job.

## Clean up resources

If you no longer need the Azure HorizonDB resource, delete it to avoid incurring charges:

1. In the Azure portal, go to the resource group that contains your Azure HorizonDB cluster.
1. Select the Azure HorizonDB cluster, and then select **Delete**.
1. Confirm the deletion by entering the cluster name, and then select **Delete**.

## Related content

- [What is a dbt job?](dbt-job-overview.md)
- [Create a dbt job](dbt-job-how-to.md)
- [Configure a dbt job](dbt-job-configure.md)
