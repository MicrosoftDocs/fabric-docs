---
title: Library management in Fabric environments
description: Learn about library management in Fabric, including how to add public and custom libraries to your Fabric environments.
ms.author: shuaijunye
author: ShuaijunYe
ms.topic: how-to
ms.date: 06/12/2024
ms.search.for: Manage libraries in Environment
---

# Library management in Fabric environments

Microsoft Fabric environments provide flexible configurations for running your Spark jobs. Libraries provide reusable code that developers want to include in their work. Except for the built-in libraries that come with each Spark runtime, you can install public and custom libraries in your Fabric environments. And you can easily attach environments to your notebooks and Spark job definitions.

> [!NOTE]
> Modifying the version of a specific package could potentially break other packages that depend on it. For instance, downgrading `azure-storage-blob` might cause problems with `Pandas` and various other libraries that rely on `Pandas`, including `mssparkutils`, `fsspec_wrapper`, and `notebookutils`.
> You can view the list of preinstalled packages and their versions for each runtime [here](runtime.md).
> Check more options and best practices of using libraries in Microsoft Fabric: [Manage Apache Spark libraries in Microsoft Fabric](library-management.md)
>

## Public libraries

Public libraries are sourced from repositories such as PyPI and Conda, which Fabric currently supports.

:::image type="content" source="media\environment-lm\env-library-management-public-library.png" alt-text="Screenshot of the environment Public Libraries screen." lightbox="media\environment-lm\env-library-management-public-library.png":::

### Add a new public library

To add a new public library, select a source and specify the name and version of the library. Alternatively, you can upload a Conda environment specification .yml file to specify the public libraries. The content of the uploaded .yml file is extracted and appended to the list.

> [!NOTE]
> The auto-completion feature for library names during adding is limited to the most popular libraries. If the library you want to install is not on that list, you don't receive an auto-completion prompt. Instead, search for the library directly in PyPI or Conda by entering its full name. If the library name is valid, you see the available versions. If the library name is not valid, you get a warning that the library doesn't exist.

### Add public libraries in a batch

Environments support uploading the YAML file to manage multiple public libraries in a batch. The contents of the YAML are extracted and appended in the public library list.

> [!NOTE]
> The custom conda channels in YAML file are currently not supported. Only the libraries from PyPI and conda are recognized.

### Filter public libraries

Enter keywords in the search box on the **Public Libraries** page, to filter the list of public libraries and find the one you need.

### Update public libraries

To update the version of an existing public library, navigate to your envronment and open the **Public libraries** or **Custom libraries**. Choose the required library, select the version drop-down, and update its version.

### Delete public libraries

The trash option for each library appears when you hover over the corresponding row. Alternatively, you can delete multiple public libraries by selecting them and then selecting **Delete** on the ribbon.

### View dependency

Each public library has various dependencies. The view dependency option appears when you hover over the corresponding row.

### Export to yaml

Fabric provides the option to export the full public library list to a YAML file and download it to your local directory.

## Custom libraries

Custom libraries refer to code built by you or your organization. Fabric supports custom library files in .whl, .jar, and .tar.gz formats.

> [!NOTE]
> Fabric only supports *.tar.gz* files for R language.
> Use the *.whl* file format for Python language.

:::image type="content" source="media\environment-lm\env-library-management-custom-library.png" alt-text="Screenshot of the environment Custom Libraries screen." lightbox="media\environment-lm\env-library-management-custom-library.png":::

### Upload the custom library

You can upload custom libraries from your local directory to the Fabric environment.

### Delete the custom library

The trash option for each library appears when you hover the corresponding row. Alternatively, you can delete multiple custom libraries by selecting them and then selecting **Delete** on the ribbon.

### Download all custom libraries

If clicked, custom libraries download one by one to your local default download directory.

## Related content

- [Create, configure, and use an environment in Microsoft Fabric](create-and-use-environment.md)
- [Manage Apache Spark libraries in Microsoft Fabric](library-management.md)
