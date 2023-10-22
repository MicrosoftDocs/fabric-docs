---
title: Apache Spark runtime in Fabric
description: Gain a deep understanding of the Apache Spark-based runtimes available in Fabric. By learning about unique features, capabilities, and best practices, you can confidently choose Fabric and implement your data-related solutions.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.custom: build-2023
ms.date: 05/23/2023
---

# Apache Spark Runtime in Fabric

The Microsoft Fabric Runtime is an Azure-integrated platform based on Apache Spark that enables the execution and management of data engineering and data science experiences. It combines key components from both internal and open-source sources, providing customers with a comprehensive solution. For simplicity, we refer to the Microsoft Fabric Runtime powered by Apache Spark as Fabric Runtime.

[!INCLUDE [preview-note](../includes/preview-note.md)]

Major components of the Fabric Runtime:

- **Apache Spark** - a powerful open-source distributed computing library, to enable large-scale data processing and analytics tasks. Apache Spark provides a versatile and high-performance platform for data engineering and data science experiences.

- **Delta Lake** - an open-source storage layer that brings ACID transactions and other data reliability features to Apache Spark. Integrated within the Microsoft Fabric Runtime, Delta Lake enhances the data processing capabilities and ensures data consistency across multiple concurrent operations.

- **Default-level Packages for Java/Scala, Python, and R** to support diverse programming languages and environments. These packages are automatically installed and configured, allowing developers to apply their preferred programming languages for data processing tasks.

- The Microsoft Fabric Runtime is built upon **a robust open-source operating system (Ubuntu)**, ensuring compatibility with various hardware configurations and system requirements.

## Runtime 1.1

Microsoft Fabric Runtime 1.1 is the default and currently the only runtime offered within the Microsoft Fabric platform. The Runtime 1.1 major components are:
- Apache Spark 3.3
- Operating System: Ubuntu 18.04
- Java: 1.8.0_282
- Scala: 2.12.15
- Python: 3.10
- Delta Lake: 2.2
- R: 4.2.2

Please visit [Runtime 1.1](./runtime11.md) to explore all the details, new features, improvements, and migration scenarios for Runtime 1.1.