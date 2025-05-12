---
title: Get real-time predictions with ML model endpoints in Fabric
description: Learn how to serve real-time predictions seamlessly from ML models with secure, scalable, and fully managed online endpoints.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 05/12/2025

ms.search.form: ML model endpoints
---

# Serve real-time predictions with ML model endpoints in Fabric

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

Microsoft Fabric lets you serve real-time predictions from ML models with secure, scalable, and easy-to-use online endpoints. These endpoints are available as built-in properties of most Fabric models—and they require little to no configuration to kick off fully managed real-time deployments.

You can manage and query model endpoints with a public-facing REST API (LINK). You can also get started directly from the Fabric interface, using a low-code experience to activate model endpoints and preview predictions instantly.

:::image type="content" source="media/model-endpoints/overview.jpg" alt-text="Screenshot showing an ML model in Fabric with a built-in endpoint property for serving real-time predictions." lightbox="media/model-endpoints/overview.jpg":::

## Getting started with ML model endpoints

ML models in Fabric come pre-built with online endpoints that can be used to serve real-time predictions. Each registered model version has a dedicated endpoint, and the overall model has a customizable default endpoint, which serves predictions from a version that you choose.

:::image type="content" source="media/model-endpoints/inactive.jpg" alt-text="Screenshot showing the properties of an ML model endpoint, which can be used to serve real-time predictions." lightbox="media/model-endpoints/inactive.jpg":::

You can view the details of a specific model version's endpoint from the Fabric interface:

| **Endpoint property** | **Description** |
|---|---|
| **Version endpoint URL** | This URL serves predictions from a particular model version. It ends with a subpath specifying that version (for instance, `/versions/1`) |
| **Default version** | This property (`Yes` or `No`) shows whether a specific model version is set as the model’s default version. The default version is used to return predictions from the overall model’s endpoint, which can be customized. |
| **Status** | This property indicates whether the endpoint for a specific model version is ready to serve predictions. The status can be `Inactive`, `Activating`, `Active`, `Deactivating`, or `Failed`. Endpoints are inactive by default, and they return predictions only when they’re active. |
| **Auto-sleep** | This property (`On` or `Off`) indicates whether an active model version endpoint is set to scale down capacity usage in the absence of traffic. If auto-sleep is on—the default property—then the endpoint enters an idle state after five minutes without incoming requests. The first call to wake up an idle endpoint involves a short delay.  |

> [!NOTE]
>
> - Note here.

## Activating endpoints to serve real-time predictions

You can activate model endpoints directly from the Fabric interface. Navigate to the version that you’d like to serve real-time predictions, and then select “Activate version endpoint” from the ribbon.

:::image type="content" source="media/model-endpoints/activate.jpg" alt-text="Screenshot showing how to activate an ML model endpoint from the Fabric interface." lightbox="media/model-endpoints/activate.jpg":::

A toast message shows that Fabric is getting your endpoint ready to serve predictions, and the status of the endpoint changes to “Activating.” Behind the scenes, Fabric spins up the underlying container infrastructure. Within a few minutes, your endpoint will be ready to serve predictions.

:::image type="content" source="media/model-endpoints/activating.jpg" alt-text="Screenshot showing an ML model endpoint that is now activating." lightbox="media/model-endpoints/activating.jpg":::

Every endpoint has a status value showing whether it’s ready to serve real-time predictions:

| **Endpoint status** | **Description** |
|---|---|
| `Inactive` | The endpoint hasn’t been activated to serve real-time predictions, and it’s not using any capacity resources. |
| `Activating` | The endpoint is being set up to serve real-time predictions. Behind the scenes, Fabric spins up the underlying container infrastructure. Within a few minutes, your endpoint will be ready. |
| `Active` | The endpoint is ready to serve real-time predictions. If the endpoint’s auto-sleep property is on, it will enter an idle state after five minutes without traffic. The first call to wake it up will involve a short delay. |
| `Deactivating` | The endpoint is being deactivated, so that it no longer serves real-time predictions or consumes any capacity resources. Behind the scenes, Fabric dismantles the underlying container infrastructure. |

> [!TIP]
>
> - Tip here.

## Managing active model endpoints

For an overview of your active endpoints, select “Manage endpoints” from the ribbon in the model interface. The settings pane shows an overall model endpoint URL that serves predictions from a default version, which you choose. You can change the default version using a dropdown selector.

:::image type="content" source="media/model-endpoints/set-default.jpg" alt-text="Screenshot showing the default ML model endpoint URL, which you can configure to serve predictions from a specific version." lightbox="media/model-endpoints/set-default.jpg":::

All active version endpoints are listed under the model’s endpoint settings. You can modify whether each endpoint is set to reduce resource usage in the absence of traffic by toggling the auto-sleep switcher to be “On” or “Off.”

:::image type="content" source="media/model-endpoints/auto-sleep.jpg" alt-text="Screenshot showing how to change the auto-sleep property on ML model endpoints." lightbox="media/model-endpoints/auto-sleep.jpg":::

## Querying endpoints for real-time predictions

Model endpoints are available for instant testing with a low-code experience in Fabric. Navigate to a version with an active endpoint and select “Preview predictions” from the ribbon in the interface. You can send sample requests to the endpoint—and get sample predictions in real-time—using form fields that match the model’s input signature.

:::image type="content" source="media/model-endpoints/preview.jpg" alt-text="Screenshot showing the built-in preview experience for getting sample predictions from an active ML model endpoint." lightbox="media/model-endpoints/preview.jpg":::

To populate the form fields with random sample values, select “Autofill.” You can add additional sets of form values to test the endpoint with larger requests. Select “Get predictions” to query the endpoint.

:::image type="content" source="media/model-endpoints/form-preview.jpg" alt-text="Screenshot showing the form-based view for sending sample requests to an active ML model endpoint." lightbox="media/model-endpoints/form-preview.jpg":::

If you prefer to format sample requests using JSON, use the dropdown selector to change the view.

:::image type="content" source="media/model-endpoints/json-preview.jpg" alt-text="Screenshot showing the JSON-based view for sending sample requests to an active ML model endpoint" lightbox="media/model-endpoints/json-preview.jpg":::

## Deactivating model endpoints

You can deactivate model endpoints directly from the Fabric interface. Navigate to a version that you no longer need to serve real-time predictions, and then select “Deactivate version endpoint” from the ribbon.

:::image type="content" source="media/model-endpoints/deactivate.jpg" alt-text="Screenshot showing how to deactivate an ML model endpoint from the Fabric interface." lightbox="media/model-endpoints/deactivate.jpg":::

A toast message shows that Fabric is shutting down your active deployment and the status of the endpoint changes to “Deactivating.” The endpoint will not be able to serve real-time predictions unless you reactivate it.

:::image type="content" source="media/model-endpoints/deactivating.jpg" alt-text="Screenshot showing an ML model endpoint that is now deactivating." lightbox="media/model-endpoints/deactivating.jpg":::

You can also deactivate multiple version endpoints at once from the model’s settings pane. Select “Manage endpoints” from the ribbon in the model interface, and select one or more active version endpoints to deactivate.

:::image type="content" source="media/model-endpoints/deactivate-multiple.jpg" alt-text="Screenshot showing how to deactivate multiple ML model endpoints at once from the Fabric interface." lightbox="media/model-endpoints/deactivate-multiple.jpg":::

> [!IMPORTANT]
>
> Important here.

## Related content

- To manage and query model endpoints programmatically, use the [ML model endpoint REST API]().
- To generate batch predictions, use the `PREDICT` function in a Fabric notebook.
- To learn more about training models in Fabric, [TBD]().
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
