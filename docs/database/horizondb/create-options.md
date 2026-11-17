---
title: "Options to create a HorizonDB database"
description: Compare supported ways to create and automate HorizonDB databases.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ms.search.form: product-databases, Fabric HorizonDB deployment, PostgreSQL databases
ai-usage: ai-assisted
---
# Options to create a HorizonDB database

Create a Fabric HorizonDB database through the Fabric portal. The current preview onboarding procedure uses **HorizonDB database (preview)** in **+ New item**.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

Every creation method requires:

- An eligible Fabric workspace assigned to active capacity.
- Contributor or Admin access and permission to create the PostgreSQL database item.
- Fabric HorizonDB availability in the workspace region.
- A Microsoft Entra user enabled for the preview. Only this database creator can connect to PostgreSQL afterward.

## Compare creation methods

| Method | Best for | Important behavior |
|---|---|---|
| Fabric portal | Interactive creation, learning, and validating workspace readiness | The portal validates the name, workspace, capacity, region, permission, and supported configuration. |
| Fabric REST API | Automation only when an applicable HorizonDB operation is explicitly documented for your preview | General Fabric item APIs don't establish support for this database type. |

The service manages compute. Use only configuration choices exposed by your preview database item.

## Use the Fabric portal

Use the portal for the shortest supported path:

1. Open the target workspace.
1. Select **+ New item**.
1. Search for **HorizonDB database**, and select **HorizonDB database (preview)**.
1. Enter a unique name and any released optional configuration.
1. Submit creation and wait for the item operation to finish.
1. Validate the PostgreSQL endpoint with an authorized query.

For the complete procedure, see [Create a HorizonDB database](create.md).

## Use the REST API

The onboarding procedure doesn't establish a HorizonDB REST management contract. Before automating, confirm that a current API reference explicitly supports the operation for your preview. Don't construct an endpoint or request body by inference. Check:

- Resource path and API version.
- Microsoft Entra permissions.
- Writable and read-only fields.
- Request and response schemas.
- Error and retry guidance.

For customer-safe automation guidance, see [Manage Fabric HorizonDB with the REST API](deploy-rest-api.md).

## Validate every created database

Regardless of the creation surface:

1. Follow the completion behavior documented by the selected creation surface.
1. Read the effective item state instead of assuming the submitted configuration is already active.
1. Open an authorized PostgreSQL connection.
1. Run the validation query in [Create a HorizonDB database](create.md#validate-the-database).
1. Check integration status separately.

## Related content

- [Fabric HorizonDB limitations](limitations.md).
- [Control compute usage](control-compute-usage.md).
- [Troubleshoot Fabric HorizonDB](troubleshoot.md).
