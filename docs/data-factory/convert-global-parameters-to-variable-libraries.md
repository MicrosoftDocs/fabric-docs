---
title: Convert Azure Data Factory Global Parameters to Fabric Variable Libraries
description: Learn how to migrate Azure Data Factory Global Parameters to Microsoft Fabric Variable Libraries. Follow this step-by-step guide to ensure a smooth transition.
author: whhender
ms.author: whhender
ms.reviewer: makromer
ms.date: 01/07/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Convert Azure Data Factory global parameters to Fabric Data Factory variable libraries

Microsoft Fabric uses variable libraries in workspaces to define constants across pipelines and other data factory and Fabric items. You can migrate ADF global parameters to Fabric variable libraries with a few manual steps.

This guide walks you through the process:

- Export your ADF global parameters
- Create workspace variables in Fabric
- Update pipeline expressions
- Validate behavior

## Understand the Fabric variable library

The Fabric variable library stores workspace-level values that you can reference across pipelines and activities. It supports types like string, number, and boolean, plus secure values for secrets. You can version variable libraries and deploy them across environments with deployment pipelines. 

Unlike ADF global parameters, Fabric variables offer tighter security, easier reuse, and better governance controls. You can apply them across all Fabric items. For more information, see [Get started with variable libraries](/fabric/cicd/variable-library/get-started-variable-libraries).

## Migrate ADF global parameters to Fabric variable library

Follow these steps to migrate your parameters:

1. **Export your ADF global parameters.**
    1. In [Azure Data Factory Studio](https://adf.azure.com/), go to **Manage** > **Global Parameters**. Record each parameter's name, type, and value. 
    1. For large migrations, go to **Manage** > **ARM template** and export ARM templates to extract parameters programmatically. You can find them in the template folder under the **factory** folder, in the file that ends in `ParametersForFactory`

1. **Create a variable library in Fabric.**
    1. In your Fabric workspace, select **+ New Item** and then search for and select **Variable library**.
    1. Create a library (for example, GlobalParams).
    1. Open your new variable library, select **+New variable** and each ADF global parameter as a variable.

    For more information about creating variable libraries, see [Get started with variable libraries](/fabric/cicd/variable-library/get-started-variable-libraries).

1. **Update migrated pipeline expressions.**

    Update global parameter references like `@globalParameters('ParamName')` to variable library references like `@pipeline.libraryVariables.ParamName`.

    Update all your activity expressions, connection strings, script arguments, filter logic, and dataset properties. For more information, see [Variable library integration with data pipelines](/fabric/data-factory/variable-library-integration-with-data-pipelines).

1. **Validate pipeline behavior.**

    Run validation and test executions to confirm variables resolve correctly in your pipelines. Check that connections, parameter bindings, and secure variable usage work as expected.

## Common migration patterns

Here are some migration patterns you might use when converting global parameters to variable libraries:

- **Direct mapping** — Simple ADF parameters like region or tenant name map one-to-one to variable library entries.

- **Environment-specific libraries** — Instead of one library, create multiple libraries (Global-Dev, Global-Test, Global-Prod). Deployment pipelines can bind the correct library based on environment.

- **Hybrid model** — Keep shared constants in the variable library, but pass run-specific information through pipeline parameters.

## Current limitations

Currently, there are a few limitations to be aware of:

- The [Azure Data Factory-to-Microsoft Fabric PowerShell migration tool](migrate-pipelines-powershell-upgrade-module-for-azure-data-factory-to-fabric.md) doesn't automatically migrate global parameters.
- Expressions inside linked services or pipelines that reference `@globalParameters()` aren't automatically rewritten.
- Fabric connections (the replacement for Azure Data Factory linked services) don't support parameter expressions in the same way. You need to manually re-author any dynamic parameters used in connection definitions.

## Best practices

Keep these tips in mind:

- Align naming conventions before migration.
- Avoid overloading workspace-level variables. Use pipeline parameters for run-time values instead.
- Use deployment pipelines to manage environment-specific variable libraries.
- Document your variable library so team members know which pipelines depend on which variables.

## Related content

- [Get started with variable libraries](/fabric/cicd/variable-library/get-started-variable-libraries)
- [Variable library integration with pipelines](variable-library-integration-with-data-pipelines.md)
- [Use Fabric variable libraries in Dataflow Gen2](dataflow-gen2-variable-library-integration.md)
- [Connection parameterization with Variable library for Copy job](cicd-copy-job.md#connection-parameterization-with-variable-library-for-copy-job)
