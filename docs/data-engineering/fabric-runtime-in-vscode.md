---
title: Fabric runtime support in VS Code
description: Explore How to leverage the Fabric remote runtime to run notebooks.
ms.reviewer: qixwang
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.date: 06/04/2025
ms.search.form: VSCodeExtension
---

# Fabric runtime support in Visual Studio Code extension

For Fabric runtime 1.1 and 1.2, two local conda environments are created by default. Activate the conda environment before running the notebook on the target runtime. To learn more, see [Choose Fabric Runtime 1.1 or 1.2](author-notebook-with-vs-code.md#run-or-debug-a-notebook-on-remote-spark-compute).

For Fabric runtime 1.3 and higher, the local conda environment is not created. You can run the notebook directly on the remote Spark compute by selecting the new entry in the Jupyter kernel list. You can select this kernel to run the notebook or Spark Job Definition on the remote Spark compute.

 :::image type="content" source="media\vscode\fabric-runtime-kernel.png" alt-text="Screenshot showing fabric runtime kernel." lightbox="media/vscode/fabric-runtime-kernel.png":::

### Considerations for choosing local conda environment or remote Spark compute

When you run the notebook or Spark Job Definition, you can choose the local conda environment or remote Spark Runtime. Here are some considerations to help you choose:

1. There are scenarios you may want to choose the local conda environment:
    - You need to work under some disconnected setup without the access to the remote compute.
    - You like evaluate some python library before uploading them to the remote workspace. you can install the library in the local conda environment and test it.

1. Choose the Fabric runtime kernel in the following scenarios:
    - You need to run the notebook on Runtime 1.3.
    - In your code, there is some hard dependency to the remote runtime
        - MSSparkUtils is a good example. It is a library that is only available in the remote runtime. If you want to use it, you need to run the code on the remote runtime.
        - NotebookUtils is another example. It is a library that is only available in the remote runtime. If you want to use it, you need to run the code on the remote runtime.
