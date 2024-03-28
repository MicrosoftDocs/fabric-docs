---
title: Sync a GitHub repository in Workflow Orchestration Manager
description: This article provides step-by-step instructions on how to sync a GitHub repository in Data Factory's Workflow Orchestration Manager.
author: nabhishek
ms.author: abnarain
ms.reviewer: jburchel
ms.topic: how-to
ms.date: 03/28/2024
---

# Sync a GitHub repository in Workflow Orchestration Manager

In this article, you learn how to synchronize your GitHub repository in Azure Data Factory Workflow Orchestration Manager in two different ways:

- By using **Enable git sync** in the Workflow Orchestration Manager UI.
- By using the Rest API.

## Prerequisites

- **Azure subscription**: If you don't have an Azure subscription, create a [free Azure account](https://azure.microsoft.com/free/) before you begin. Create or select an existing [Data Factory](https://azure.microsoft.com/products/data-factory#get-started) instance in a [region where the Workflow Orchestration Manager preview is supported](concepts-workflow-orchestration-manager.md#region-availability-public-preview).
- **GitHub repository**: You need access to a GitHub repository.

## Use the Workflow Orchestration Manager UI

To sync your GitHub repository by using the Workflow Orchestration Manager UI:

1. Ensure that your repository contains the necessary folders and files:
   - **Dags/**: For Apache Airflow directed acyclic graphs (DAGs) (required).
   - **Plugins/**: For integrating external features to Airflow.

     :::image type="content" source="media/airflow-git-sync-repository/airflow-folders.png" alt-text="Screenshot that shows the Airflow folders structure in GitHub.":::

1. When you create a Workflow Orchestration Manager integration runtime, select **Enable git sync** in the **Airflow environment setup** dialog.

   :::image type="content" source="media/airflow-git-sync-repository/enable-git-sync.png" alt-text="Screenshot that shows the Enable git sync checkbox in the Airflow environment setup dialog that appears during creation of an Airflow integration runtime.":::

1. Select one of the following supported Git service types:
   - **GitHub**
   - **ADO**
   - **GitLab**
   - **BitBucket**

   :::image type="content" source="media/airflow-git-sync-repository/git-service-type.png" alt-text="Screenshot that shows the Git service type selection dropdown in the  environment setup dialog that appears during creation of an Workflow Orchestration Manager integration runtime.":::

1. Select a credential type:

   - **None** (for a public repo): When you select this option, make sure that your repository's visibility is public. Then fill out the details:
     - **Git repo url** (required): The clone URL for the GitHub repository you want.
     - **Git branch** (required): The current branch, where the Git repository you want is located.
   - **Git personal access token**:
     After you select this option for a personal access token (PAT), fill out the remaining fields based on the selected **Git service type**:
     - GitHub personal access token
     - ADO personal access token
     - GitLab personal access token
     - BitBucket personal access token

     :::image type="content" source="media/airflow-git-sync-repository/git-pat-credentials.png" alt-text="Screenshot that shows the Git PAT credential options in the Airflow environment setup dialog that appears during creation of an AWorkflow Orchestration Manager integration runtime.":::
   - **SPN** ([service principal name](https://devblogs.microsoft.com/devops/introducing-service-principal-and-managed-identity-support-on-azure-devops/)): Only ADO supports this credential type.
     After you select this option, fill out the remaining fields based on the selected **Git service type**:
     - **Git repo url** (required): The clone URL to the Git repository to sync.
     - **Git branch** (required): The branch in the repository to sync.
     - **Service principal app id** (required): The service principal app ID with access to the ADO repo to sync.
     - **Service principal secret** (required): A manually generated secret in the service principal whose value is used to authenticate and access the ADO repo.
     - **Service principal tenant id** (required): The service principal tenant ID.

     :::image type="content" source="media/airflow-git-sync-repository/git-spn-credentials.png" alt-text="Screenshot that shows the Git SPN credential options in the Airflow environment setup dialog that appears during creation of an Workflow Orchestration Manager integration runtime.":::

1. Fill in the rest of the fields with the required information.
1. Select **Create**.

## Import a private package with Git sync

This optional process only applies when you use private packages.

This process assumes that your private package was autosynced via Git sync. You add the package as a requirement in the Workflow Orchestration Manager UI along with the path prefix `/opt/airflow/git/\<repoName\>/`, if you're connecting to an ADO repo. Use `/opt/airflow/git/\<repoName\>.git/` for all other Git services.

For example, if your private package is in `/dags/test/private.whl` in a GitHub repo, you should add the requirement `/opt/airflow/git/\<repoName\>.git/dags/test/private.whl` in the Workflow Orchestration Manager environment.

:::image type="content" source="media/airflow-git-sync-repository/airflow-private-package.png" alt-text="Screenshot that shows the Airflow requirements section in the Airflow environment setup dialog that appears during creation of an Workflow Orchestration Manager integration runtime.":::

## Related content

- [Run an existing pipeline with Workflow Orchestration Manager](tutorial-run-existing-pipeline-with-airflow.md)
- [Workflow Orchestration Manager pricing](airflow-pricing.md)
- [Change the password for Workflow Orchestration Manager environment](password-change-airflow.md)
