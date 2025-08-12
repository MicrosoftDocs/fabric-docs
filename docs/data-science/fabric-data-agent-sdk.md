---
title: Fabric data agent Python SDK (preview)
description: Learn how to use the Fabric data agent SDK.
ms.author: scottpolly
author: s-polly
ms.reviewer: midesa
reviewer: midesa
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 03/25/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot

#customer intent: As a code first user, I want to consume Fabric Data Agent using its Python SDK.

---

# Fabric Data Agent Python SDK

The Fabric Data Agent Python SDK library facilitates programmatic access to Fabric Data Agent artifacts. The SDK is designed for code-first users, and it simplifies the creation, management, and utilization of Fabric data agents within Microsoft Fabric notebooks. It provides a set of straightforward APIs to integrate and manage data sources, automate workflow operations, and interact with the Fabric Data Agent, based on the OpenAI Assistants API within Microsoft Fabric notebook.

## Prerequisites
- Python Version: A compatible version of Python (typically Python >= 3.10).
- Dependencies: The SDK might require other packages. Pip automatically installs these packages.
- Environment: This SDK is designed to work exclusively within Microsoft Fabric notebooks. It isn't supported for local execution.

## Features

- **Programmatic Management:** Create, update, and delete Data Agent artifacts seamlessly.
- **Data Source Integration:** Easily connect to and integrate multiple data sources, for enhanced data analysis and insight generation.
- **OpenAI Assistants API Support:** Use the OpenAI Assistants API for rapid prototyping and experimentation.
- **Workflow Automation:** Automate routine tasks to reduce manual efforts and improve operational efficiency.
- **Resource Optimization:** Optimize configuration and management of Data Agent resources to better align with specific customer needs.

## Installation

Use pip to install the Fabric Data Agent Python SDK:

```
%pip install fabric-data-agent-sdk
```

## Quick Start Example

For more information about the sample notebooks that show how to use the Fabric Data Agent Python SDK, visit [this GitHub repo](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/data-agent-sdk) resource.

## Related content

- [Fabric data agent creation](concept-data-agent.md)
- [Fabric data agent end-to-end tutorial](data-agent-end-to-end-tutorial.md)
- [Fabric data agent sharing](data-agent-sharing.md)
