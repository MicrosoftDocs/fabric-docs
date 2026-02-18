---
title: Library Management in Fabric Environments
description: Learn about library management in Microsoft Fabric, including how to add public and custom libraries to your Fabric environments.
ms.reviewer: shuaijunye
ms.topic: how-to
ms.date: 10/01/2025
ms.search.form: Manage libraries in Environment
---

# Library management in Fabric environments

Microsoft Fabric environments provide flexible configurations for running your Spark jobs. Libraries provide reusable code that developers want to include in their work. Except for the built-in libraries that come with each Spark runtime, you can install public and custom libraries in your Fabric environments. You can easily attach environments to your notebooks and Spark job definitions.

> [!NOTE]
> Navigate to the workspace where your environment is located, select your environment and library management options are located under the **Libraries** tab. If you don't have an environment created, see [Create, configure, and use an environment in Fabric](create-and-use-environment.md).

## Built-in libraries

In Fabric, each runtime version comes preloaded with a curated set of built-in libraries that are optimized for performance, compatibility, and security across Python, R, Java, and Scala. The Built-in Libraries section within the environment allows you to browse and search these preinstalled libraries based on the selected runtime.

To view the list of preinstalled packages and their versions for each runtime, see [Apache Spark runtimes in Fabric](runtime.md).

> [!IMPORTANT]
> Fabric supports different ways of managing packages. For more options and **best practices** for managing libraries in Fabric, see [Manage Apache Spark libraries in Fabric](library-management.md)
> When your workspace has networking features such as **Workspace outbound access protection** or **Managed VNets**, the access of public repositories like PyPI are blocked. Follow the instruction in [Manage libraries with limited network access in Fabric](environment-manage-library-with-outbound-access-protection.md) to seamlessly managing the libraries in Environment.

## External repositories

In the External repositories section, you can either add libraries from public libraries such as PyPI and Conda, and also from your private repositories, like Azure Artifact Feed.

> [!NOTE]
> Installing libraries from Azure Artifact Feed is currently supported in Spark 3.5, and NOT supported in Private link or outbound access protection enabled workspaces.

:::image type="content" source="media\environment-lm\environment-library-management-external-repositories-library.png" alt-text="Screenshot that shows the environment External repositories Libraries screen." lightbox="media\environment-lm\environment-library-management-external-repositories-library.png":::

### Add a new library from public repositories

To add a new library from public repository, i.e., PyPI or conda, select ***Add library from public repository***. Enter the library name in the search box. As you type, the search box suggests popular libraries, but the list is limited. If you don’t see your library, enter its full name.

- If the library name is valid, you see the available versions.
- If the library name isn't valid, you get a warning that the library doesn't exist.

### Add a new library from private repositories

#### Set up connection for your Azure Artifact Feed

In Fabric, directly storing the credential is forbidden. The connections need to be set up through in [Data Factory Connector](/fabric/data-factory/connector-overview). Following is a step-by-step guidance to set up the connection for Azure Artifact Feed. Learn more about [Azure Artifact Feed](/azure/devops/artifacts/quickstarts/python-packages).

1. Step 1: In your workspace ***Settings***, go to ***Manage connections and gateways***.

    :::image type="content" source="media\environment-lm\external-library-connector-in-setting.png" alt-text="Screenshot that shows the entrypoint of the environment External repositories connectors." lightbox="media\environment-lm\external-library-connector-in-setting.png":::

2. Step 2: Create a new ***connection***. Select ***Cloud*** as the type and choose ***Azure Artifact Feed (Preview)*** as the connection type. Enter the URL and user token in the respective fields, and make sure to check ***Allow Code-First Artifact ... to access this connection (Preview)***.

    :::image type="content" source="media\environment-lm\external-library-connector-example.png" alt-text="Screenshot that shows an example of creating a new connector screen." lightbox="media\environment-lm\external-library-connector-example.png":::

3. Step 3: Record the connection ID after creation, this is needed for using the connection in Fabric environments.

#### Add libraries from Azure Artifact Feed

To install libraries from your Azure Artifact Feed, prepare a YML file that includes the correct library details and private repository connection information. A typical YML file contains the Azure Artifact Feed URL and authentication details. However, for Fabric to recognize the connection properly, you must replace the URL and credentials with the **Connection ID** created in **Data Factory Connector**.

Below is an example:

```YAML
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

With the prepared YML file, you can either upload it directly or switch to **YML editor view** to paste the content into the editor in Fabric environments. When you publish the environment, the system reads the packages from your private repository and persists them in Fabric. If you update packages in your Azure Artifact Feed, make sure to **republish the environment** to apply the latest changes.

> [!NOTE]
>
> - In the **List view**, you can only add or remove, or edit libraries from existing private repositories. To add, remove, or edit a private repository connection, switch to the **YML editor view** and update the YML file directly.
> - Searching libraries in private repositories as you type is currently not supported. Please ensure you enter the **library name and version accurately** when adding libraries from private repositories. Incorrect package information will cause the environment publishing to fail.
> - You can specify **multiple repositories** in the YML file. When installing libraries, Fabric searches them in the order listed until the package is found. Public repositories such as PyPI and Conda are searched at the end automatically, even if they are not included in the YML file.

### Filter external libraries

You can use package name as the keyword to filter the external libraries list.

### Update external libraries

You can update the library **name**, **version**, and **source type** in List view. In YML editor view, you can also update these details along with the **Azure Artifact Feed connection ID**.

### Delete external libraries

The **Delete** option for each library appears when you hover over its row. To delete multiple external libraries, select them and click **Delete**. You can also remove libraries by using the **YML editor view**.

### View dependency

Each external library from public repositories may have dependencies. The **View Dependencies** option appears when you hover over the corresponding row. Clicking this button will fetch the dependency tree from public repositories. If the library cannot be found in public repositories, e.g., it's a private library in your Azure Artifact Feed, its dependency information will not be available.

### Export to .yml

Fabric provides the option to export the full external library list to an ```.yml``` file and download it to your local directory.

## Custom libraries

Custom libraries refer to code built by you or your organization. Fabric supports custom library files in ```.whl```, ```.py```, ```.jar```, and ```.tar.gz``` formats.

> [!NOTE]
> Fabric supports only ```.tar.gz``` files for R language. Use the ```.whl``` and ```.py``` file format for Python language.

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
