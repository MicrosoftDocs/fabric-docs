---
title: Synchronize your code from an existing Git repo
description: This tutorial helps you Synchronize your code from an existing Git repo.
ms.reviewer: abnarain
ms.author: abnarain
author: nabhishek
ms.topic: quickstart
ms.custom: airflows
ms.date: 03/25/2024
---

# Synchronize your code from an existing GitHub repository

> [!NOTE]
> Apache Airflow job is powered by [Apache Airflow](https://airflow.apache.org/).

Data Workflows, a transformative capability within Microsoft Fabric, redefines your approach to constructing and managing pipelines. Powered by the Apache Airflow runtime, Data Workflows provides an integrated, cloud-based platform for developing, scheduling, and monitoring Python-based data workflows, articulated as Directed Acyclic Graphs (DAGs). It delivers a Software-as-a-Service (SaaS) experience for pipeline development and management using Apache Airflow, making the runtime easily accessible and enabling the creation and operation of your data workflows.<br>
With data workflows, you have two options for storing your workflow files: Fabric-managed storage and GitHub-managed storage. In this article, you'll learn how to synchronize your code from an existing GitHub repository.

## Create an Apache Airflow Job

1. You can use an existing workspace or [Create a new workspace](../fundamentals/create-workspaces.md).
2. Expand `+ New` dropdown -> Click on More Options -> Under `Data Factory` section -> Select Apache Airflow Job (preview)

   :::image type="content" source="media/apache-airflow-jobs/more-options.png" lightbox="media/apache-airflow-jobs/more-options.png" alt-text="Screenshot shows click on more options.":::

   :::image type="content" source="media/apache-airflow-jobs/apache-airflow-project.png" lightbox="media/apache-airflow-jobs/apache-airflow-project.png" alt-text="Screenshot to select Apache Airflow Job.":::

3. Give a suitable name to your project and Click on "Create" Button.

## Synchronize Your GitHub repository

Specify the git repository you want to sync your Apache Airflow Job with.

1. Go to the "Settings" button and click on 'File Storage' tab. Choose "Git-sync" as the type of storage.
   :::image type="content" source="media/apache-airflow-jobs/git-sync.png" lightbox="media/apache-airflow-jobs/git-sync.png" alt-text="Screenshot to synchronize GitHub repository.":::

2. Fill out the following fields:

   - <strong>Git service type</strong>: Supported service types:

     - GitHub
     - ADO: Azure DevOps
     - GitLab
     - BitBucket

   - <strong>Git Credential type</strong>: Supported credential types:
     - None: Choose this credential type, if the repository is public.
     - Personal Access token: A personal access token from the Git service used to authenticate with repository.
       - Fill out the fields:
         - Username: Username of GitHub.
         - Personal Access token
     - Service Principal: Select this credential when you choose Git Service as Azure Devops:
       - Fill out the fields:
         - Service principal app ID: Client ID of your Service Principal that has access to Azure Devops Repository.
         - Service principal secret: Client secret with access to Azure DevOps repository.
         - Service principal tenant ID: Tenant ID of your Service Principal.
     - <strong>Repo</strong>: The clone URL to the repository you want to sync.
     - <strong>Branch</strong>: Name of the repository’s branch you want to sync.

3. Click on 'Apply'.

### Monitor your DAGs

- To verify if your repository is synchronized, navigate to the Apache Airflow's UI by clicking on "Monitor in Apache Airflow". In the UI, you'll see all the DAGs from your repository loaded directly.
  :::image type="content" source="media/apache-airflow-jobs/monitor-dag-apache-airflow.png" lightbox="media/apache-airflow-jobs/monitor-dag-apache-airflow.png" alt-text="Screenshot to monitor DAGs in apache airflow.":::

- Code editor isn't supported while using git-sync storage. You need to edit your code locally and push the changes to your remote Git repository. Your latest commit will be automatically synchronized with Data Workflows, and you can see your updated code in the Apache Airflow's UI.

### Supported Git repository structure

```
|── dags/
|   |-- *.py
|-- plugins
|    |-- executors/
|    |   ├-- __init__.py
|    |   └-- *.py
|    |-- hooks/
|    |   ├-- __init__.py
|    |   └-- *.py
|    |-- operators/
|    |   ├-- __init__.py
|    |   └-- *.py
|    |-- transfers/
|    |   ├-- __init__.py
|    |   └-- *.py
|    |-- triggers/
|    |    ├-- __init__.py
|    |    └-- *.py
```

> [!Note]
> We only synchronize the `dags` and `plugins` folders from the repository. Make sure any files or subfolders are inside one of these folders.

## Related content

- [Install Private Package in Apache Airflow Job](apache-airflow-jobs-install-private-package.md)
- [Quickstart: Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md)
- [Apache Airflow Job workspace settings](../data-factory/apache-airflow-jobs-workspace-settings.md)
