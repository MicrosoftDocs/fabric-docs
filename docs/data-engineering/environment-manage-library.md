---
title: Library Management in Fabric Environments
description: Learn about library management in Microsoft Fabric, including how to add public and custom libraries to your Fabric environments.
ms.reviewer: shuaijunye
ms.topic: how-to
ms.date: 02/27/2026
ms.search.form: Manage libraries in Environment
ai-usage: ai-assisted
---

# Library management in Fabric environments

Microsoft Fabric environments provide flexible configuration for running Spark jobs. Libraries provide reusable code for notebooks and Spark job definitions. In addition to built-in libraries that come with each Spark runtime, you can install public and custom libraries in Fabric environments.

> [!NOTE]
> Go to the workspace that contains your environment, select the environment, and then open the **Libraries** tab. If you don't have an environment, see [Create, configure, and use an environment in Fabric](create-and-use-environment.md).

## Built-in libraries

In Fabric, each runtime version includes a curated set of built-in libraries optimized for performance, compatibility, and security across Python, R, Java, and Scala. In your environment, use the **Built-in Libraries** section to browse and search preinstalled libraries for the selected runtime.

To view the list of preinstalled packages and their versions for each runtime, see [Apache Spark runtimes in Fabric](runtime.md).

> [!IMPORTANT]
> Fabric supports different ways to manage packages. For more options and **best practices**, see [Manage Apache Spark libraries in Fabric](library-management.md).
> If your workspace uses networking features such as **Workspace outbound access protection** or **Managed VNets**, access to public repositories such as PyPI is blocked. For guidance, see [Manage libraries with limited network access in Fabric](environment-manage-library-with-outbound-access-protection.md).
> If the built‑in library versions don’t meet your needs, you can override them by specifying the desired version in the external repository section or by uploading your own custom packages.

## Select publish mode for libraries
Before you add libraries from external repositories or upload custom packages, choose a publish mode. Fabric environments support two modes: **Full mode** and **Quick mode**.

:::image type="content" source="media\environment-lm\environment-library-management-different-mode.png" alt-text="Screenshot that shows the different modes in the library management screen." lightbox="media\environment-lm\environment-library-management-different-mode.png":::

### Full mode
Full mode uses the traditional publish workflow. During publish, Fabric resolves dependencies, validates compatibility, and creates a stable library snapshot. That snapshot is deployed when a new session starts.

Use Full mode for production workloads, pipelines, and environments with heavier dependency sets.

### Quick mode
Quick mode skips dependency processing during publish. Instead, packages are installed at notebook session startup.

Use Quick mode for lightweight dependencies, rapid iteration, and early-stage experimentation.

### Choosing the right mode for your needs
Use dependency complexity and release stage to choose a mode.

- **Full mode**: Best for larger dependency sets (for example, more than 10 packages), production runs, and pipeline reliability. Publish time is typically 2 to 10 minutes, with another 30 seconds to 2 minutes at session startup, depending on dependency size.
- **Quick mode**: Best for lighter dependency sets and rapid iteration. Publish usually completes in seconds, and install time occurs at session startup.

You can mix modes during development. A common pattern is to iterate in Quick mode, then move validated dependencies to Full mode for a stable production snapshot.

You can also keep an existing Full mode snapshot unchanged and add only new test packages in Quick mode. In that setup, publish remains fast, the existing snapshot is deployed first, and Quick mode packages are installed at session startup.

### Mode limitations and behavior

- Quick mode is supported only for notebooks.
- JAR files aren't supported in Quick mode.
- Only Full mode supports private repositories (Azure Artifact Feed).
- You can't move custom libraries directly between modes. To switch modes, download the file, remove it from the current mode, then upload it to the target mode.
- Installation logs aren't shown in the notebook. Use **Monitoring (Level 2)** to track progress and troubleshoot issues.
- Duplicate packages across modes are supported, including same and different versions. Full mode snapshot packages are applied first, then Quick mode packages. If names match, Quick mode versions override Full mode versions.
- Quick mode packages install when the first code cell for that language runs. For example, Python packages install when the first Python cell runs, and R packages install when the first R cell runs.


## External repositories

In the **External repositories** section, you can add libraries from public repositories, such as PyPI and Conda, and from private repositories, such as Azure Artifact Feed.

> [!NOTE]
> Installing libraries from Azure Artifact Feed is supported in Spark 3.5. It isn't supported in workspaces with Private Link or outbound access protection enabled.

:::image type="content" source="media\environment-lm\environment-library-management-external-repositories-library.png" alt-text="Screenshot that shows the environment External repositories Libraries screen." lightbox="media\environment-lm\environment-library-management-external-repositories-library.png":::

### Add a new library from public repositories

To add a new library from a public repository (PyPI or Conda), select **Add library from public repository**. Enter the library name in the search box. As you type, the search box suggests popular libraries, but the list is limited. If you don't see your library, enter the full name.

- If the library name is valid, you see the available versions.
- If the library name isn't valid, you get a warning that the library doesn't exist.

### Add a new library from private repositories

#### Set up connection for your Azure Artifact Feed

Fabric doesn't allow direct credential storage. Set up connections through [Data Factory Connector](/fabric/data-factory/connector-overview). Use these steps to create a connection for Azure Artifact Feed. Learn more about [Azure Artifact Feed](/azure/devops/artifacts/quickstarts/python-packages).

1. In workspace **Settings**, go to **Manage connections and gateways**.

    :::image type="content" source="media\environment-lm\external-library-connector-in-setting.png" alt-text="Screenshot that shows the entrypoint of the environment External repositories connectors." lightbox="media\environment-lm\external-library-connector-in-setting.png":::

1. Create a new **connection**. Select **Cloud** as the type, then select **Azure Artifact Feed (Preview)** as the connection type. Enter the URL and user token, and then select **Allow Code-First Artifact ... to access this connection (Preview)**.

    :::image type="content" source="media\environment-lm\external-library-connector-example.png" alt-text="Screenshot that shows an example of creating a new connector screen." lightbox="media\environment-lm\external-library-connector-example.png":::

1. Record the connection ID after creation. You need this ID to use the connection in Fabric environments.

#### Add libraries from Azure Artifact Feed

To install libraries from Azure Artifact Feed, prepare a YML file with the library details and private repository connection information. A typical YML file contains the Azure Artifact Feed URL and authentication details. For Fabric to recognize the connection, replace the URL and credentials with the **Connection ID** created in **Data Factory Connector**.

Below is an example:

```yaml
# Regular YAML
dependencies:
  - pip:
    - fuzzywuzzy==0.18.0
    - wordcloud==1.9.4
    - --index-url <URL_TO_THE_AZURE_ARTIFACT_FEED_WITH_AUTH>

# Replace the Azure Artifact Feed URL with connection ID
dependencies:
  - pip:
    - fuzzywuzzy==0.18.0
    - wordcloud==1.9.4
    - --index-url <YOUR_CONNECTION_ID>
```

After you prepare the YML file, upload it directly or switch to **YML editor view** and paste the content. When you publish the environment, Fabric reads packages from your private repository and persists them. If you update packages in Azure Artifact Feed, **republish the environment** to apply the latest changes.

> [!NOTE]
>
> - In **List view**, you can add, remove, or edit libraries only for existing private repositories. To add, remove, or edit a private repository connection, switch to **YML editor view** and update the YML file.
> - Search suggestions while typing aren't supported for private repositories. Enter the **library name and version** exactly. Incorrect package information causes environment publish to fail.
> - You can specify **multiple repositories** in the YML file. During install, Fabric searches repositories in listed order until it finds the package. Public repositories such as PyPI and Conda are searched last, even when they're not listed in the YML file.

### Filter external libraries

You can use package name as the keyword to filter the external libraries list.

### Update external libraries

You can update the library **name**, **version**, and **source type** in **List view**. In **YML editor view**, you can also update these details and the **Azure Artifact Feed connection ID**.

### Delete external libraries

The **Delete** option for each library appears when you hover over its row. To delete multiple external libraries, select them and click **Delete**. You can also remove libraries by using the **YML editor view**.

### View dependency

External libraries from public repositories might include dependencies. The **View Dependencies** option appears when you hover over a row. Select this option to fetch the dependency tree from public repositories. If Fabric can't find the library in public repositories (for example, it's private in Azure Artifact Feed), dependency information isn't available.

### Export to .yml

You can export the full external library list to a `.yml` file and download it to your local directory.

## Custom libraries

Custom libraries are code packages built by you or your organization. Fabric supports custom library files in `.whl`, `.py`, `.jar`, and `.tar.gz` formats.

> [!NOTE]
> Fabric supports only `.tar.gz` files for R. For Python, use `.whl` or `.py` files.

:::image type="content" source="media\environment-lm\env-library-management-custom-library.png" alt-text="Screenshot that shows the environment Custom Libraries screen." lightbox="media\environment-lm\env-library-management-custom-library.png":::

### Upload the custom library

You can upload custom libraries from your local directory to the Fabric environment.

### Delete the custom library

The trash option for each library appears when you hover over the corresponding row. To delete multiple custom libraries, select them and then select **Delete**.

### Download all custom libraries

Select custom libraries to download them one by one to your local default download directory.

## Related content

- [Create, configure, and use an environment in Fabric](create-and-use-environment.md)
- [Manage Apache Spark libraries in Fabric](library-management.md)
