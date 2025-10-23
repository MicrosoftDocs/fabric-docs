---
title: Authenticate to Cosmos DB Database From Azure Services (Preview)
titleSuffix: Microsoft Fabric
description: Use Microsoft Entra authentication and the Azure SDK to connect to Cosmos DB in Microsoft Fabric during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: how-to
ms.date: 07/29/2025
ms.search.form: Get Started with Cosmos DB
zone_pivot_groups: dev-lang-core
appliesto:
- ✅ Cosmos DB in Fabric
---

# Authenticate to Cosmos DB in Microsoft Fabric from Azure host services (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Cosmos DB in Microsoft Fabric primarily relies on Microsoft Entra ID authentication and built-in data plane roles to manage authentication and authorization. In this guide, you use Microsoft Entra ID and your signed-in account to connect to a Cosmos DB in Fabric database.

> [!IMPORTANT]
> The steps are similar to the process used to authenticate if you're using a [service principal](/entra/identity-platform/app-objects-and-service-principals), [group](/entra/fundamentals/concept-learn-about-groups), or other type of Microsoft Entra ID identity. To grant a service principal the ability to connect to Microsoft Fabric and your Cosmos DB database, enable the **"Service principals can use Fabric APIs** setting in the Fabric tenant. For more information, see [Microsoft Fabric tenant settings](../../admin/service-admin-portal-developer.md#service-principals-can-call-fabric-public-apis).

## Prerequisites

[!INCLUDE[Prerequisites - Existing database](includes/prerequisite-existing-database.md)]

- An identity with the **Read** permission for the database in Fabric

  - For more information on Fabric permissions, see [access controls](authorization.md#access-controls).

- Azure CLI

  - If you don't already have it, [install Azure CLI](/cli/azure/install-azure-cli).

[!INCLUDE[Prerequisites - Development languages core](includes/prerequisite-dev-lang-core.md)]

## Retrieve Cosmos DB endpoint

First, get the endpoint for the Cosmos DB database in Fabric. This endpoint is required to connect using the Azure SDK.

1. Open the Fabric portal (<https://app.fabric.microsoft.com>).

1. Navigate to your existing Cosmos DB database.

1. Select the **Settings** option in the menu bar for the database.

    :::image type="content" source="media/how-to-authenticate/settings-option.png" lightbox="media/how-to-authenticate/settings-option-full.png" alt-text="Screenshot of the 'Settings' menu bar option for a database in the Fabric portal.":::

1. In the settings dialog, navigate to the **Connection** section. Then, copy the value of the **Endpoint for Cosmos DB NoSQL database** field. You use this value in later step\[s\].

    :::image type="content" source="media/how-to-authenticate/settings-connection-endpoint.png" lightbox="media/how-to-authenticate/settings-connection-endpoint-full.png" alt-text="Screenshot of the 'Connection' section of the 'Settings' dialog for a database in the Fabric portal.":::

## Authenticate to Azure CLI

Now, authenticate to the Azure CLI. The Azure SDK can use various different authentication mechanisms to verify your identity, but the Azure CLI is the most universal and frictionless option across various developer languages.

1. In your local development environment, open a terminal.

1. Authenticate to Azure CLI using [`az login`](/cli/azure/reference-index#az-login).

    ```azurecli
    az login
    ```

1. Follow the interactive steps to perform multifactor authentication (MFA) and select your subscription.

1. Verify that your account is logged in successfully by querying your identity.

    ```azurecli
    az ad signed-in-user show
    ```

1. Observe the output of the previous command. The `id` field contains the principal (object) ID of the currently signed-in identity.

    ```json
    {
      "@odata.context": "<https://graph.microsoft.com/v1.0/$metadata#users/$entity>",
      "businessPhones": [],
      "displayName": "Kai Carter",
      "givenName": "Kai",
      "id": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
      "jobTitle": "Senior Sales Representative",
      "mail": "<kai@adventure-works.com>",
      "mobilePhone": null,
      "officeLocation": "Redmond",
      "preferredLanguage": null,
      "surname": "Carter",
      "userPrincipalName": "<kai@adventure-works.com>"
    }
    ```

    > [!NOTE]
    > In Microsoft Entra ID terms, this identity is referred to as your **human identity**. It's a type of identity that can connect to databases among many different types including, but not limited to:
    >
    > - Managed identities (system or user-assigned)
    > - Workload identities
    > - Application identities
    > - Device identities
    >
    > While these steps focus on using your human identity to connect to the database in Fabric, the steps are similar if you're connecting using a different identity type. For more information about identities, see [identity fundamentals](/entra/fundamentals/identity-fundamental-concepts#identity).
    >

## Connect using Azure SDK

Finally, use the Azure SDK to connect to the Cosmos DB database in Fabric using the endpoint and your identity. The Azure SDK ships with a unified **identity** library that automatically handles authentication on your behalf. This step uses the `AzureCliCredential` type, which automatically finds the right identity type based on your environment.

> [!TIP]
> Alternatively, you can use the `DefaultAzureCredential` type. This type can automatically find the right system-assigned or user-assigned managed identity if you deploy your application code to Azure and the right human identity locally in development.

:::zone pivot="dev-lang-python"

```python
from azure.cosmos import CosmosClient
from azure.identity import DefaultAzureCredential

endpoint = "<cosmos-db-fabric-endpoint>"

credential = DefaultAzureCredential()

client = CosmosClient(endpoint, credential=credential)

container = client.get_database_client("<database-name>").get_container_client("<container-name>")

nosql = "SELECT TOP 10 VALUE item.id FROM items AS item"

results = container.query_items(
    query=nosql,
    enable_cross_partition_query=True,
)

items = [item for item in results]

for item in items:
    print(item)
```

> [!NOTE]
> This sample uses the [`azure-identity`](https://pypi.org/project/azure-identity/) and [`azure-cosmos`](https://pypi.org/project/azure-cosmos/) packages from PyPI.

:::zone-end

:::zone pivot="dev-lang-typescript"

```typescript
import { Container, CosmosClient, CosmosClientOptions } from '@azure/cosmos'
import { TokenCredential, AzureCliCredential } from '@azure/identity'

run();

async function run() {
    let endpoint: string = '<cosmos-db-fabric-endpoint>';

    let credential: TokenCredential = new AzureCliCredential();

    let options: CosmosClientOptions = {
        endpoint: endpoint,
        aadCredentials: credential
    };

    const client: CosmosClient = new CosmosClient(options);

    const container: Container = client.database('<database-name>').container('<container-name>');

    const nosql = 'SELECT TOP 10 VALUE item.id FROM items AS item';

    const querySpec = {
        query: nosql
    }

    let response = await container.items.query(querySpec).fetchAll();
    for (let item of response.resources) {
        console.log(item);
    }
}
```

> [!NOTE]
> This sample uses the [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) and [`@azure/cosmos`](https://www.npmjs.com/package/@azure/cosmos) packages from npm.

:::zone-end

:::zone pivot="dev-lang-csharp"

```csharp
using Azure.Identity;
using Microsoft.Azure.Cosmos;

string endpoint = "<cosmos-db-fabric-endpoint>";
AzureCliCredential credential = new();
CosmosClient client = new(endpoint, credential);

Container container = client
    .GetDatabase("<database-name>")
    .GetContainer("<container-name>");

string sql = "SELECT TOP 10 VALUE item.id FROM items AS item";

QueryDefinition query = new(sql);

FeedIterator<string> iterator = container.GetItemQueryIterator<string>(query);

while (iterator.HasMoreResults)
{
    FeedResponse<string> response = await iterator.ReadNextAsync();
    foreach (var item in response)
    {
        Console.WriteLine(item);
    }
}
```

> [!NOTE]
> This sample uses the [`Azure.Identity`](https://www.nuget.org/packages/Azure.Identity) and [`Microsoft.Azure.Cosmos`](https://www.nuget.org/packages/Microsoft.Azure.Cosmos) packages from NuGet.

:::zone-end

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Manage authorization in Cosmos DB in Microsoft Fabric](authorization.md)
