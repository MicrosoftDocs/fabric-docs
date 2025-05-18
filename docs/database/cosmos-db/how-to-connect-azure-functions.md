---
title: Connect From Azure Functions Preview
titleSuffix: Microsoft Fabric
description: Use Microsoft Entra authentication and the Azure SDK to connect to Cosmos DB in Microsoft Fabric from an Azure Functions host.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 05/19/2025
---

# How to connect to Cosmos DB in Microsoft Fabric from Azure Functions (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

TODO

## Prerequisites

[!INCLUDE[Prerequisites - Fabric capacity](prereq-fabric-capacity.md)]

[!INCLUDE[Prerequisites - Azure subscription](prereq-azure-subscription.md)]

- An existing Azure Functions resource.

  - If you don't have one already, [deploy Azure Functions](/azure/azure-functions/functions-create-function-app-portal).

## Create and assign a user-assigned managed identity

TODO

1. TODO

1. TODO

## Configure and retrieve Cosmos DB credentials

TODO

1. TODO

1. TODO

## Connect using Azure SDK

Finally, use the Azure SDK to connect to the Cosmos DB database in Fabric using the endpoint and managed identity.

> [!IMPORTANT]
> The Azure SDK ships with a unified **identity** library that automatically handles authentication on your behalf. This step uses the `DefaultAzureCredential` type which automatically finds the right identity type based on your environment. The library also maps the `AZURE_CLIENT_ID` environment variable if you're using a user-assigned managed identity.

::: zone pivot="dev-lang-python"

```bash

```

```python

```

::: zone-end

::: zone pivot="dev-lang-typescript"

```bash

```

```typescript

```

::: zone-end

::: zone pivot="dev-lang-csharp"

```bash

```

```csharp

```

::: zone-end

## Related content

- [Overview of Cosmos DB in Microsoft Fabric](overview.md)
- [Quickstart: Create a Cosmos DB database workload in Microsoft Fabric](quickstart-portal.md)
- [Connect Azure Container Apps to Cosmos DB in Microsoft Fabric](how-to-connect-azure-container-apps.md)

