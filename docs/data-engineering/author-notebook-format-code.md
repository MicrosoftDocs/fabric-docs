---
title: "Format code in Microsoft Fabric notebooks"
description: "Learn how to extend a Microsoft Fabric notebook to use a PEP 8-compliant code formatter."
author: peter-myers
ms.author: v-myerspeter
ms.reviewer: snehagunda
ms.topic: how-to
ms.custom: fabric-cat
ms.date: 10/30/2023
---

# Format code in Microsoft Fabric notebooks

There are many benefits to adopting good style and conventions when you write a Python notebook or Spark job definition. By consistently formatting your code, you can:

- Make it easier to read the code.
- Increases maintainability of the code.
- Conduct faster code reviews.
- Perform more accurate diffs, which detect changes between versions.

Specifically, this article describes how you can extend a Fabric notebook to use a [PEP 8-compliant](https://peps.python.org/pep-0008/) code formatter.

> [!NOTE]
> _PEP_ is the acronym for Python Enhancement Proposals. PEP 8 is a style guide that describes coding conventions for Python code.

## Extend Fabric notebooks

You can extend a Fabric notebook by using a _notebook extension_. A notebook extension is a software component that adds new functionality to the notebook interface. You install an extension as a library, and then you set it up to meet your specific needs.

This article considers two extensions that you can use to format Python code in a Fabric notebook. Both extensions are freely available from GitHub.

- The [black](https://github.com/psf/black) Python code formatter extension.
- The [jupyter-black](https://github.com/n8henrie/jupyter-black) formatter extension, which you can also use to automatically format code in a Jupyter Notebook or Jupyter Lab.

### Set up a code formatter extension

There are two methods to set up a code formatter extension in a Fabric notebook. The first method involves workspace settings, while the second method involves in-line installation. You enable code formatting after you install the extension.

#### Workspace settings

Use the workspace settings to set up the working environment for a Fabric workspace. To make your libraries available for use in any notebooks and Spark job definitions in the workspace, you can create the environment, install the libraries in it, and then your workspace admin can attach the environment as the default for the workspace. Therefore, when a code formatter extension is installed in the workspace's default environment, all notebooks within the workspace can benefit from it.

For more information on environments, see [create, configure, and use an environment in Microsoft Fabric](https://aka.ms/fabric/create-environment).

#### In-line installation

Use the in-line installation method when you want to install a library for a specific notebook, rather than all notebooks in a workspace. This approach is convenient when you want a temporary or quick solution that shouldn't affect other notebooks in the workspace.

To learn how to perform an in-line installation, see [In-line installation](library-management.md#in-line-installation).

In the following example, the %pip command is used to install the latest version of the _Jupyter-black_ extension on both the driver and executor nodes.

```python
# Install the latest version by using %pip command
# It will be available on both driver and executor nodes
%pip install jupyter-black
```

#### Enable code formatting

After you install the code formatting extension, you must enable code formatting for the notebook. You do that by loading the extension, which can be done in one of two ways.

Either use the ```%load_ext``` magic command.

```python
# Load the jupyter-black extension
%load_ext jupyter-black
```

Or, use the load extension by using the programming API.

```python
import jupyter-black
jupyter-black.load()
```

> [!TIP]
> To ensure that all notebooks enable code formatting, which can be helpful in enterprise development scenarios, enable formatting in a template notebook.

## Format code

To format code, select the lines of code you want to format, and then press **Shift+Enter**.

The following 11 lines of code aren't yet properly formatted.

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

After formatting has been applied, the extension reduced the script to only five lines. The code now adopts good style and conventions.

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
