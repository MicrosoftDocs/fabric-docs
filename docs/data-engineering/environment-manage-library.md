---
title: Library Management in Fabric Environments
description: Learn about library management in Microsoft Fabric, including how to add public and custom libraries to your Fabric environments.
ms.author: shuaijunye
author: ShuaijunYe
ms.topic: how-to
ms.date: 06/12/2024
ms.search.form: Manage libraries in Environment
---

# Library management in Fabric environments

Microsoft Fabric environments provide flexible configurations for running your Spark jobs. Libraries provide reusable code that developers want to include in their work. Except for the built-in libraries that come with each Spark runtime, you can install public and custom libraries in your Fabric environments. You can easily attach environments to your notebooks and Spark job definitions.

Modifying the version of a specific package might break other packages that depend on it. For instance, downgrading `azure-storage-blob` might cause problems with `pandas` and other libraries that rely on `pandas`, such as `mssparkutils`, `fsspec_wrapper`, and `notebookutils`.

To view the list of preinstalled packages and their versions for each runtime, see [Apache Spark runtimes in Fabric](runtime.md). For more options and best practices for using libraries in Fabric, see [Manage Apache Spark libraries in Fabric](library-management.md).

## Public libraries

Public libraries are sourced from repositories such as PyPI and Conda, which Fabric currently supports.

:::image type="content" source="media\environment-lm\env-library-management-public-library.png" alt-text="Screenshot that shows the environment Public Libraries screen." lightbox="media\environment-lm\env-library-management-public-library.png":::

### Add a new public library

To add a new public library, select a source and specify the name and version of the library. You can also upload a Conda environment specification .yml file to specify the public libraries. The content of the uploaded .yml file is extracted and appended to the list.

The autocomplete feature for library names when you add them is limited to the most popular libraries. If the library you want to install isn't on the list, you don't receive an autocomplete prompt.

Instead, search for the library directly in PyPI or Conda by entering its full name. If the library name is valid, you see the available versions. If the library name isn't valid, you get a warning that the library doesn't exist.

### Add public libraries in a batch

Environments support uploading a .yml file to manage multiple public libraries in a batch. The contents of the .yml file are extracted and appended in the public library list.

> [!NOTE]
> The custom Conda channels in .yml files currently aren't supported. Only the libraries from PyPI and Conda are recognized.

### Filter public libraries

Enter keywords in the search box on the **Public Libraries** page to filter the list of public libraries and find the one you need.

### Update public libraries

To update the version of an existing public library, go to your environment and open **Public Libraries** or **Custom Libraries**. Choose the required library, select the version dropdown, and update its version.

### Delete public libraries

The trash option for each library appears when you hover over the corresponding row. To delete multiple public libraries, select them and then select **Delete**.

### View dependency

Each public library has various dependencies. The view dependency option appears when you hover over the corresponding row.

### Export to .yml

Fabric provides the option to export the full public library list to a .yml file and download it to your local directory.

## Custom libraries

Custom libraries refer to code built by you or your organization. Fabric supports custom library files in .whl, .py, .jar, and .tar.gz formats.

> [!NOTE]
> Fabric supports only .tar.gz files for R language. Use the .whl and .py file format for Python language.

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
