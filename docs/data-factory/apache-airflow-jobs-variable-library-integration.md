---
title: Variable library integration with Apache airflow jobs
description: Learn about how to use Variable library with Apache airflow jobs. 
ms.reviewer: noelleli
ms.topic: concept-article
ms.custom: airflows
ms.date: 07/29/2026
---

# Variable library integration with Apache Airflow jobs

The [Variable library](../cicd/variable-library/variable-library-overview.md) is a new item type in Microsoft Fabric. By using the variable library, you can define and manage variables at the workspace level. Use these variables across various workspace items, such as pipelines, notebooks, shortcut for lakehouse, and more. It provides a unified and centralized way to manage configurations, reducing the need for hardcoded values and simplifying your CI/CD processes. It's easier to manage configurations across different environments.

## How to use Variable library with Apache Airflow jobs

### How to create a Variable library

To create a variable library, see [Create and use a variable library](../cicd/variable-library/get-started-variable-libraries.md).

### Use Variable library variables in your Apache airflow job

After you create a Variable library with one or more variables, you can reference those variables from your Apache airflow job’s environment configuration settings. Your DAGs access the selected variables as Airflow Variables.

1. To use a Variable library variable in your Apache airflow job, create an Apache airflow job or open an existing one.

    :::image type="content" source="media/apache-airflow-jobs-variable-library-integration/create-new-apache-airflow-job.png" lightbox="media/apache-airflow-jobs-variable-library-integration/create-new-apache-airflow-job.png" alt-text="Screenshot highlighting the create new Apache airflow job item.":::

1. In your Apache airflow job, go to the **Home** ribbon and select **Settings**. In the flyout that opens, select the **Environment configuration** tab.

    :::image type="content" source="media/apache-airflow-jobs-variable-library-integration/apache-airflow-job-settings.png" lightbox="media/apache-airflow-jobs-variable-library-integration/apache-airflow-job-settings.png" alt-text="Screenshot highlighting the Settings icon on the Home tab of the Apache airflow job canvas.":::

    :::image type="content" source="media/apache-airflow-jobs-variable-library-integration/apache-airflow-job-environment-configurations.png" lightbox="media/apache-airflow-jobs-variable-library-integration/apache-airflow-job-environment-configurations.png" alt-text="Screenshot highlighting the Environment configurations tab in the Apache airflow job settings.":::

1. Under **Library variables**, select **+ New** to open the variable picker. Browse the Variable libraries in the left pane or use the search box to select a variable. Select **Select variable**.

    :::image type="content" source="media/apache-airflow-jobs-variable-library-integration/library-variables-in-airflow-settings.png" lightbox="media/apache-airflow-jobs-variable-library-integration/library-variables-in-airflow-settings.png" alt-text="Screenshot showing the +New button highlighted in the Library variable section of the Environment configurations.":::

    :::image type="content" source="media/apache-airflow-jobs-variable-library-integration/variable-picker-in-apache-airflow-job.png" lightbox="media/apache-airflow-jobs-variable-library-integration/variable-picker-in-apache-airflow-job.png" alt-text="Screenshot showing a Library variable selected in the variable picker.":::

1. Select **Apply** to save the environment configuration. Your DAGs can now access the selected variables through the standard Airflow Variable API, such as `Variable.get("<variable_name>")`.  

    :::image type="content" source="media/apache-airflow-jobs-variable-library-integration/apply-library-variable-changes.png" lightbox="media/apache-airflow-jobs-variable-library-integration/apply-library-variable-changes.png" alt-text="Screenshot showing the Apply button highlighted in the Apache airflow job environment configuration settings.":::

1. To change the value of a variable in your Variable library, use **Sync Library variables** from the ribbon if values change in the source library or in the **Environment configuration** tab in the **Settings**.

    :::image type="content" source="media/apache-airflow-jobs-variable-library-integration/sync-changes-in-home-tab.png" lightbox="media/apache-airflow-jobs-variable-library-integration/sync-changes-in-home-tab.png" alt-text="Screenshot showing the Sync Library variables button on the Home tab.":::

    :::image type="content" source="media/apache-airflow-jobs-variable-library-integration/sync-changes-in-settings.png" lightbox="media/apache-airflow-jobs-variable-library-integration/sync-changes-in-settings.png" alt-text="Screenshot showing Sync button for library variables in the Environment configuration settings.":::


## Known limitations

The following known limitations apply to the integration of the Variable library in Apache Airflow jobs in Data Factory in Microsoft Fabric:

- If you change the value of your library variables, your Apache Airflow job doesn't automatically reflect these changes. Use the *Sync Library variables* button to update the variable values. 

## Related content
- [Variable library](../cicd/variable-library/variable-library-overview.md)
