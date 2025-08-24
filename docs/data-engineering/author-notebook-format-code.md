---
title: Format code in Microsoft Fabric notebooks
description: Learn best practices for formatting code, including how to extend a Microsoft Fabric notebook to use a PEP 8-compliant code formatter.
#customer intent: As a Python developer, I want to format code in Microsoft Fabric notebooks so that my scripts are easier to read and maintain.
author: snehagunda
ms.author: sngun
ms.reviewer: arunsethia
ms.topic: how-to
ms.custom: fabric-cat
ms.date: 08/21/2025
---

# Format code in Microsoft Fabric notebooks

There are many benefits to adopting good style and conventions when you write a Python notebook or Apache Spark job definition. By consistently formatting your code, you can:

- Make it easier to read the code.

- Increases maintainability of the code.

- Conduct faster code reviews.

- Perform more accurate diffs, which detect changes between versions.

Specifically, this article describes how you can extend a Fabric notebook to use a [PEP 8-compliant](https://peps.python.org/pep-0008/) code formatter.

> [!NOTE]
> _PEP_ stands for Python Enhancement Proposals. PEP 8 is a style guide that describes coding conventions for Python.

## Extend Fabric notebooks

Extend a Fabric notebook by using a _notebook extension_. A notebook extension is a software component that adds functionality to the notebook interface. Install an extension as a library, and then set it up to meet your needs.

This article describes two extensions that format Python code in a Fabric notebook. Both extensions are freely available from GitHub:

- [black](https://github.com/psf/black), a Python code formatter extension.

- [jupyter-black](https://github.com/n8henrie/jupyter-black), which also formats code in Jupyter Notebook or Jupyter Lab.

### Set up a code formatter extension

Set up a code formatter extension in a Fabric notebook using one of two methods: workspace settings or in-line installation. Enable code formatting after installing the extension.

#### Workspace settings

Use workspace settings to set up the environment for a Fabric workspace. To make libraries available in notebooks and Spark job definitions, create the environment, install the libraries, and let the workspace admin attach the environment as the default. When a code formatter extension is installed in the default environment, all notebooks in the workspace use it.

For more information on environments, see [create, configure, and use an environment in Microsoft Fabric](https://aka.ms/fabric/create-environment).

#### In-line installation

Use in-line installation to install a library for a specific notebook instead of all notebooks in a workspace. This method is convenient for temporary or quick solutions that don't affect other notebooks.

To learn how to perform an in-line installation, see [In-line installation](library-management.md#in-line-installation).

In the following example, the %pip command is used to install the latest version of the _Jupyter-black_ extension on both the driver and executor nodes.

```python
# Install the latest version by using %pip command
# It will be available on both driver and executor nodes
%pip install jupyter-black
```

#### Enable code formatting

After installing the code formatting extension, enable code formatting for the notebook by loading the extension. Use one of two methods:

1. Use the ```%load_ext``` magic command:

   ```python
   # Load the jupyter-black extension
   %load_ext jupyter_black
   ```

1. Use the programming API:

   ```python
   import jupyter_black
   jupyter_black.load()
   ```

> [!TIP]
> To ensure that all notebooks enable code formatting, which can be helpful in enterprise development scenarios, enable formatting in a template notebook.

## Format code

To format code, select the lines of code you want to format, and press **Shift+Enter**.

The following 11 lines of code aren't formatted properly.

```python
def unique(list_input):
    list_set = set(list_input
    )
    unique_list = (list(
        list_set
        )
    )
    for x in unique_list:
        print(
            x
        )
```

After formatting, the extension reduces the script to five lines. The code adopts good style and conventions.

```python
def unique(list_input):
    list_set = set(list_input)
    unique_list = list(list_set)
    for x in unique_list:
        print(x)
```

## Related content

For more information about Fabric notebooks, see the following articles.

- [Manage Apache Spark libraries in Microsoft Fabric](library-management.md#in-line-installation)

- Questions? Try asking the [Fabric Community](https://community.fabric.microsoft.com/).

- Suggestions? [Contribute ideas to improve Fabric](https://ideas.fabric.microsoft.com/).
