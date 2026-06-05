---
title: Airflow Job Workspace Identity
description: Configure workspace identity in Apache Airflow Jobs to authenticate to Microsoft Fabric lakehouses, pipelines, and warehouses without managing credentials.
ms.reviewer: noelleli
ms.topic: how-to
ms.custom: airflows, build-2026
ms.date: 05/27/2026
---

# Use workspace identity to authenticate Apache Airflow Jobs to Fabric services

Workspace identity for Apache Airflow Jobs enables your Airflow DAGs to authenticate to Fabric services, including lakehouses, pipelines, and warehouses. Workspace identity is a managed identity associated with the Fabric workspace that eliminates the need to configure credentials or connection strings manually.

When workspace identity is enabled, Airflow Jobs authenticate automatically using the workspace identity. No changes to your DAG code are required.

## Prerequisites

Before you begin, make sure you have the following prerequisites:

- A [Fabric workspace](/fabric/fundamentals/workspaces) with Contributor or higher role.
- The `ApacheAirflowJob_FabricConnectionSupport` feature switch enabled on your tenant.
- An existing [Apache Airflow Job](/fabric/data-factory/apache-airflow-jobs-concepts) artifact.
- [Workspace identity](workspace-identity.md) enabled on your workspace.

## Set up workspace identity permissions for an Airflow job

Before you can use workspace identity with Airflow Jobs, enable it on your workspace and grant the appropriate permissions.

1. Open your Fabric workspace and select **Settings** > **Workspace identity**.
1. Enable the workspace identity if it isn't already enabled.
1. Grant the workspace identity access to your workspace by selecting **Manage access** > **Add people or groups**.
1. Enter the workspace name, and then assign the **Member** or **Contributor** role.

The workspace identity now has the permissions needed to access Fabric resources within the workspace.

## Create a Fabric connection with workspace identity authentication

Create a Fabric connection to define how your Airflow DAGs authenticate to Fabric services.

1. Go to **Settings** > **Manage connections and gateways** > **New**.
1. Select the connection type that matches the Fabric resource you want to access (for example, **Notebook**).
1. Select **Workspace identity** as the authentication kind.
1. Select the **Allow Code-First Artifacts like Notebooks to access this connection (Preview)** checkbox.

    :::image type="content" source="media/apache-airflow-jobs-workspace-identity/create-fabric-connection-dialog.png" alt-text="Screenshot of the new connection dialog showing the Notebook connection type, Workspace identity authentication method, and the Allow Code-First Artifacts checkbox selected." lightbox="media/apache-airflow-jobs-workspace-identity/create-fabric-connection-dialog.png":::

1. Complete the remaining connection fields and select **Create**.

> [!IMPORTANT]
> You must select the **Allow Code-First Artifacts** checkbox during connection creation. Apache Airflow is a code-first artifact, and this setting can't be changed after the connection is created.

## Enable Fabric connections on an Airflow Job

To enable Fabric connections on your Airflow Job:

1. Navigate to your Airflow Job artifact in your Fabric workspace.
1. Open the artifact settings.
1. Enable the **Fabric Connections** toggle.

    :::image type="content" source="media/apache-airflow-jobs-workspace-identity/enable-fabric-connections-settings.png" alt-text="Screenshot of the Apache Airflow Job environment configuration settings page showing the Enable Fabric connections checkbox selected." lightbox="media/apache-airflow-jobs-workspace-identity/enable-fabric-connections-settings.png":::

1. Select **Apply**.

Once enabled, your Airflow DAGs can access Fabric resources using the workspace identity without any additional credential configuration.

## Add connections to your Airflow Job

After you create a Fabric connection and enable the **Fabric Connections** toggle, add connections to your Airflow Job.

1. Open your Airflow Job artifact.
1. Find the connection you created in the **All available connections** list.
1. Select **+** next to the connection to add it to your Airflow Job.

    :::image type="content" source="media/apache-airflow-jobs-workspace-identity/add-connections-to-airflow-job.png" alt-text="Screenshot of the Airflow Job Connections panel showing the All available connections list with the add button highlighted next to a connection." lightbox="media/apache-airflow-jobs-workspace-identity/add-connections-to-airflow-job.png":::

The connection is now available for use in your DAGs.

## Use Fabric connections in a DAG

To use a Fabric connection in a DAG:

1. Open or create a DAG in your Airflow Job.
1. In the DAG editor, right-click and select **Run Fabric Artifact**.

   :::image type="content" source="media/apache-airflow-jobs-workspace-identity/run-fabric-artifact-context-menu.png" alt-text="Screenshot of the DAG editor showing the right-click context menu with the Run Fabric Artifact option highlighted." lightbox="media/apache-airflow-jobs-workspace-identity/run-fabric-artifact-context-menu.png":::

1. Select the Fabric connection you added to the Airflow Job.
1. Complete the remaining fields in the form and select **Insert** to add the code block to your DAG.

   :::image type="content" source="media/apache-airflow-jobs-workspace-identity/run-fabric-artifact-dialog.png" alt-text="Screenshot of the Run Fabric Artifact dialog showing fields for Fabric connection, Workspace, Artifact Type, Artifact, Timeout, and the Insert button." lightbox="media/apache-airflow-jobs-workspace-identity/run-fabric-artifact-dialog.png":::

1. Select **Run DAG** to execute the DAG.

## Monitor Apache Airflow DAG runs in Fabric

After you run a DAG that uses a Fabric connection with workspace identity, you can monitor the run status and troubleshoot failures.

1. After running a DAG, select **Monitor DAG** to view the run status.
1. Use the **Open log** or **Open task** buttons on the tasks view to inspect task-level details.

## How workspace identity authentication works in Airflow Jobs

Workspace identity uses the managed identity associated with the Fabric workspace to authenticate Apache Airflow Jobs to Fabric services. When the **Fabric Connections** toggle is enabled on an Airflow Job, the runtime automatically acquires a Microsoft Entra token using the workspace identity. Access is governed by the workspace role assigned to the identity — the same permissions that apply to users apply equally to workspace identities, service principals, and B2B guest users operating within the workspace.

The following Fabric services are supported:

- Lakehouses
- Pipelines
- Warehouses

## Known limitations for workspace identity in Apache Airflow Jobs

Workspace identity for Apache Airflow Jobs has the following limitations during public preview:

- **Private link support** isn't available in public preview. Full private link support is planned for a future release.
- **Government and sovereign cloud support** will be available when Fabric supports it in those clouds.
- **Reserved environment variables** — When the **Fabric Connections** toggle is enabled, the following environment variables are reserved and can't be overridden: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_AUTHORITY_HOST`. Attempts to set these variables in the Airflow Job settings fail.

## Troubleshoot workspace identity in Apache Airflow Jobs

Use the following guidance to troubleshoot common issues with workspace identity in Apache Airflow Jobs.

### Workspace identity doesn't appear in artifact settings

Confirm the `ApacheAirflowJob_FabricConnectionSupport` feature switch is enabled on your tenant.

### Authentication failures when accessing Fabric resources

- Verify the workspace managed identity has the appropriate role on the target resource.
- Confirm the **Fabric Connections** toggle is enabled on the Airflow Job artifact.

### Access denied errors

- Check that the workspace role (Contributor or higher) is correctly assigned.
- Ensure the target Fabric resource is in a workspace the identity has access to.

## Related content

- [What is Apache Airflow Job?](apache-airflow-jobs-concepts.md)
- [Apache Airflow Job workspace settings](apache-airflow-jobs-workspace-settings.md)
