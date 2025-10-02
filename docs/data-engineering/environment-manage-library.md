---
title: Library Management in Fabric Environments
description: Learn about library management in Microsoft Fabric, including how to add public and custom libraries to your Fabric environments.
ms.author: eur
ms.reviewer: shuaijunye
author: eric-urban
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

## Public libraries

Public libraries are sourced from repositories such as PyPI and Conda, which Fabric currently supports.

:::image type="content" source="media\environment-lm\env-library-management-public-library.png" alt-text="Screenshot that shows the environment Public Libraries screen." lightbox="media\environment-lm\env-library-management-public-library.png":::

### Add a new public library

To add a new public library, select a source and specify the name and version of the library. You can also upload a Conda environment specification ```.yml``` file to specify the public libraries. The content of the uploaded ```.yml``` file is extracted and appended to the list.

The autocomplete feature for library names when you add them is limited to the most popular libraries. If the library you want to install isn't on the list, you don't receive an autocomplete prompt.

Instead, search for the library directly in PyPI or Conda by entering its full name. If the library name is valid, you see the available versions. If the library name isn't valid, you get a warning that the library doesn't exist.

### Add public libraries in a batch

Environments support uploading an ```.yml``` file to manage multiple public libraries in a batch. The contents of the ```.yml``` file are extracted and appended in the public library list.

> [!NOTE]
> The custom Conda channels in ```.yml``` files currently aren't supported. Only the libraries from PyPI and Conda are recognized.

### Filter public libraries

Enter keywords in the search box on the **Public Libraries** page to filter the list of public libraries and find the one you need.

### Update public libraries

To update the version of an existing public library, go to your environment and open **Public Libraries** or **Custom Libraries**. Choose the required library, select the version dropdown, and update its version.

### Delete public libraries

The trash option for each library appears when you hover over the corresponding row. To delete multiple public libraries, select them and then select **Delete**.

### View dependency

Each public library has various dependencies. The view dependency option appears when you hover over the corresponding row.

### Export to .yml

Fabric provides the option to export the full public library list to an ```.yml``` file and download it to your local directory.

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
