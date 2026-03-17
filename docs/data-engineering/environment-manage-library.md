---
title: Library management in Fabric environments
description: Learn about library management in Microsoft Fabric, including how to add public and custom libraries to your Fabric environments.
ms.reviewer: shuaijunye
ms.topic: how-to
ms.date: 03/20/2026
ms.search.form: Manage libraries in Environment
---

# Library management in Fabric environments

Microsoft Fabric environments provide flexible configurations for running your Spark jobs. Libraries provide reusable code that developers want to include in their work. Except for the built-in libraries that come with each Spark runtime, you can install public and custom libraries in your Fabric environments. You can easily attach environments to your notebooks and Spark job definitions.

> [!NOTE]
> Navigate to the workspace where your environment is located, select your environment and library management options are located in the left navigation pane. If you don't have an environment created, see [Create, configure, and use an environment in Fabric](create-and-use-environment.md).

## Built-in libraries

In Fabric, each runtime version comes preloaded with a curated set of built-in libraries that are optimized for performance, compatibility, and security across Python, R, Java, and Scala. The **Built-in** libraries page in the environment lets you browse and search these preinstalled libraries based on the selected runtime.

These libraries are installed by default in every environment and can't be changed. They'll be available if you run your notebook or Spark job definition in this environment.

To view the list of preinstalled packages and their versions for each runtime, see [Apache Spark runtimes in Fabric](runtime.md).

> [!IMPORTANT]
> Fabric supports different ways of managing packages. For more options and **best practices** for managing libraries in Fabric, see [Manage Apache Spark libraries in Fabric](library-management.md)
> When your workspace has networking features such as **Workspace outbound access protection** or **Managed VNets**, the access of public repositories like PyPI are blocked. Follow the instruction in [Manage libraries with limited network access in Fabric](environment-manage-library-with-outbound-access-protection.md) to seamlessly managing the libraries in Environment.

## External repositories

You can add libraries from public repositories like PyPI and Conda, or from private repositories. The source and publish mode options differ depending on the repository type.

:::image type="content" source="media\environment-library-management\environment-library-management-external-repositories-library.png" alt-text="Screenshot that shows the environment External repositories Libraries screen." lightbox="media\environment-library-management\environment-library-management-external-repositories-library.png":::

### Add a library from a public repository

Public repositories let you install packages from PyPI or Conda. 

1. In the **External repositories** tab, select **Add library**.

1. Select **Add library from public repository**.

1. Select the source (PyPI or Conda).

1. Enter the library name in the search box. As you type, the search box suggests popular libraries, but the list is limited. If you don't see your library, enter its full name.

    :::image type="content" source="media\environment-library-management\environment-library-management-external-repositories-public.png" alt-text="Screenshot that shows the process of adding a library from a public repository." lightbox="media\environment-library-management\environment-library-management-external-repositories-public.png":::

   If the library name is found, you see the available versions. 

1. Select the version and then save and publish your environment.

### Add a library from a private repository

Private repositories let you install packages using pip or conda. 

1. In the **External repositories** tab, select **Add library**.

1. Select **Add library from private repository**.

1. Select the source (pip or conda).

1. Enter the library name and version. Make sure you enter the **library name and version accurately**, because searching libraries in private repositories as you type isn't supported. Incorrect package information causes publishing to fail.

### Add libraries from an Azure Artifact Feed

Azure Artifact Feeds can be scoped to either a project (private) or an organization (public). Fabric supports both scopes. Regardless of the feed's visibility in Azure DevOps, Fabric always connects through an authenticated Data Factory connection, so you need to set up a connection even for public feeds.

> [!NOTE]
> Installing libraries from Azure Artifact Feed is currently supported in Spark 3.5, and NOT supported in Private link or outbound access protection enabled workspaces.

#### Set up a connection for your Azure Artifact Feed

Fabric doesn't store credentials directly. Instead, you create a connection through [Data Factory Connector](/fabric/data-factory/connector-overview) and reference it by connection ID in a YML file. Learn more about [Azure Artifact Feed](/azure/devops/artifacts/quickstarts/python-packages).

1. Select the **Settings** gear icon in the top-right corner of the Fabric portal, and then select **Manage connections and gateways**.

    :::image type="content" source="media\environment-library-management\external-library-connector-in-setting.png" alt-text="Screenshot that shows the entrypoint of the environment External repositories connectors." lightbox="media\environment-library-management\external-library-connector-in-setting.png":::

1. Create a new connection. Select **+ New** and then select **Cloud** as the type and choose **Azure Artifact Feed (Preview)** as the connection type.

    :::image type="content" source="media\environment-library-management\external-library-connector-new-cloud.png" alt-text="Screenshot that shows an example of creating a new cloud connection with Azure Artifact Feed (Preview) selected." lightbox="media\environment-library-management\external-library-connector-new-cloud.png":::

1. Enter the feed URL and a personal access token (PAT) with **Packaging > Read** scope. 
1. Select **Allow Code-First Artifacts like Notebooks to access this connection (Preview)**.

    :::image type="content" source="media\environment-library-management\external-library-connector-example.png" alt-text="Screenshot that shows an example of creating a new connector screen." lightbox="media\environment-library-management\external-library-connector-example.png":::

1. Select **Create** to save the connection. You should see it in the connection list.
1. Record the connection ID after creation. You need it in the next step.

#### Prepare and upload a YML file

Create a YML file that lists the packages you want to install and references the connection ID instead of the feed URL and credentials. Fabric uses the connection ID to authenticate and pull packages from your feed at publish time.

A standard pip configuration references the feed URL and credentials directly:

```YAML
dependencies:
  - pip:
    - fuzzywuzzy==0.18.0
    - wordcloud==1.9.4
    - --index-url <URL_TO_THE_AZURE_ARTIFACT_FEED_WITH_AUTH>
```

For Fabric, replace the URL with the connection ID you recorded earlier:

```YAML
dependencies:
  - pip:
    - fuzzywuzzy==0.18.0
    - wordcloud==1.9.4
    - --index-url <YOUR_CONNECTION_ID> 
```

Upload the YML file directly to the environment, or switch to **YML editor view** and paste the content. When you publish the environment, Fabric reads the packages from your feed and persists them. If you update packages in your Azure Artifact Feed, **republish the environment** to pick up the latest versions.

> [!NOTE]
>
> - In the **List view**, you can add, remove, or edit libraries from existing feed connections. To add, remove, or edit a feed connection itself, switch to the **YML editor view** and update the YML file directly.
> - You can specify **multiple feeds** in the YML file. Fabric searches them in the order listed until the package is found. Public repositories such as PyPI and Conda are searched last automatically, even if they aren't included in the YML file.
> - If a package in the YML file can't be found in any of the listed feeds, publishing fails. Double-check the package name and version before publishing.

### Manage external libraries

After you add external libraries, you can manage them from the **External repositories** section.

- **Filter** – Use a package name as a keyword to filter the external libraries list.
- **Update** – Select a library to update its **name**, **version**, or **source type** in List view. In YML editor view, you can also update the **Azure Artifact Feed connection ID**.
- **Delete** – Hover over a library row to see the **Delete** option, or select multiple libraries and then select **Delete**. You can also remove libraries by using the **YML editor view**.
- **View dependencies** – Hover over a public repository library and select **View Dependencies** to fetch its dependency tree. Dependency information isn't available for private libraries or libraries from an Azure Artifact Feed.
- **Export to .yml** – Export the full external library list to a `.yml` file and download it to your local directory.

## Custom libraries

Custom libraries refer to code built by you or your organization. Fabric supports custom library files in `.whl`, `.py`, `.jar`, and `.tar.gz` formats. 

> [!NOTE]
> Fabric supports only `.tar.gz` files for R language. Use the `.whl` and `.py` file format for Python language.

Use the **Upload** and **Download** buttons in the **Custom** libraries page to add libraries from your local directory or download them locally. 

:::image type="content" source="media\environment-library-management\env-library-management-custom-library.png" alt-text="Screenshot that shows the environment Custom Libraries screen." lightbox="media\environment-library-management\env-library-management-custom-library.png":::

To delete a library, hover over its row and select the trash icon, or select multiple libraries and then select **Delete**.

## Related content

- [Create, configure, and use an environment in Fabric](create-and-use-environment.md)
- [Manage Apache Spark libraries in Fabric](library-management.md)
