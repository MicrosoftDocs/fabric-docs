---
title: Serve real-time predictions with ML model endpoints (Preview)
description: Learn how to serve real-time predictions seamlessly from ML models with secure, scalable, and fully managed online endpoints.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 05/14/2025

ms.search.form: ML model endpoints
---

# Serve real-time predictions with ML model endpoints (Preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

Microsoft Fabric lets you serve real-time predictions from ML models with secure, scalable, and easy-to-use online endpoints. These endpoints are available as built-in properties of most Fabric models—and they require no configuration to kick off fully managed real-time deployments.

You can activate, customize, and query model endpoints with a public-facing REST API. You can also get started directly from the Fabric interface, using a low-code experience to turn on model endpoints and preview predictions instantly.

:::image type="content" source="media/model-endpoints/overview.jpg" alt-text="Screenshot showing an ML model in Fabric with a built-in endpoint property for serving real-time predictions." lightbox="media/model-endpoints/overview.jpg":::

## Prerequisites

- To serve real-time predictions, your administrator needs to enable [the tenant switch for ML model endpoints](../admin/service-admin-portal-microsoft-fabric-tenant-settings.md) in the Fabric admin portal.

## Limitations

- Endpoints are currently available for a limited set of ML model flavors:
  - Keras
  - LightGBM
  - Sklearn
  - XGBoost
- Endpoints are currently **not** available for ML models with tensor-based schemas or no schemas.
- Endpoints are currently **not** available for ML models with dependencies on private or internal packages.

## Getting started with ML model endpoints

ML models in Fabric come prebuilt with online endpoints that can be used to serve real-time predictions. Each registered model version has a dedicated endpoint, and the overall model has a customizable default endpoint, which serves predictions from a version that you choose.

:::image type="content" source="media/model-endpoints/inactive.jpg" alt-text="Screenshot showing the properties of an ML model endpoint, which can be used to serve real-time predictions." lightbox="media/model-endpoints/inactive.jpg":::

The endpoint URL for a particular model version can be found under the "Endpoint details" heading in the Fabric interface. This URL ends with a subpath designating that specific version (for instance, `/versions/1/score`).

The Fabric interface shows the following properties for each endpoint:

| **Property** | **Description** | **Default** |
|---|---|---|
| **Default version** | This property (`Yes` or `No`) shows whether a specific model version is set as the model’s default version. The default version is used to return predictions from the overall model’s endpoint. | `No` |
| **Status** | This property indicates whether the endpoint for a specific model version is ready to serve predictions. The status can be `Inactive`, `Activating`, `Active`, `Deactivating`, or `Failed`. Endpoints are inactive by default, and they return predictions only when they’re active. | `Inactive` |
| **Auto sleep** | This property (`On` or `Off`) indicates whether a model version endpoint should scale down capacity usage in the absence of traffic once it's active. If auto sleep is on—the default property—then the endpoint enters an idle state after five minutes without incoming requests. The first call to wake up an idle endpoint involves a short delay. | `On` |

## Activating endpoints to serve real-time predictions

You can activate model endpoints directly from the Fabric interface. Navigate to the version that you’d like to serve real-time predictions, and then select "Activate version endpoint" from the ribbon.

:::image type="content" source="media/model-endpoints/activate.jpg" alt-text="Screenshot showing how to activate an ML model endpoint from the Fabric interface." lightbox="media/model-endpoints/activate.jpg":::

A toast message shows that Fabric is getting your endpoint ready to serve predictions, and the status of the endpoint changes to "Activating." Behind the scenes, Fabric spins up the underlying container infrastructure to host your model. Within a few minutes, your endpoint is ready to serve predictions.

:::image type="content" source="media/model-endpoints/activating.jpg" alt-text="Screenshot showing an ML model endpoint that is now activating." lightbox="media/model-endpoints/activating.jpg":::

Every endpoint has a status, set to one of the following values, that indicates whether it’s ready to serve real-time predictions:

| **Status** | **Description** |
|---|---|
| `Inactive` | The endpoint isn't activated to serve real-time predictions, and it’s not using any capacity resources. |
| `Activating` | The endpoint is being set up to serve real-time predictions. Behind the scenes, Fabric sets up the underlying container infrastructure to support the endpoint. Within a few minutes, the endpoint is ready. |
| `Active` | The endpoint is ready to serve real-time predictions. Behind the scenes, Fabric scales up the underlying container infrastructure based on incoming traffic to the endpoint. Higher traffic results in higher capacity usage. |
| `Deactivating` | The endpoint is being deactivated, so that it no longer serves real-time predictions or consumes any capacity. Behind the scenes, Fabric dismantles the underlying container infrastructure. |

> [!NOTE]
>
> ML models can have up to five version endpoints actively serving predictions at once. To serve predictions from a sixth version, deactivate one of the five action versions first.

## Managing active model endpoints

For an overview of your active endpoints, select "Manage endpoints" from the ribbon in the model interface. The settings pane shows an overall model endpoint URL that serves predictions from a default version. You can set and update the default version using a dropdown selector.

:::image type="content" source="media/model-endpoints/set-default.jpg" alt-text="Screenshot showing the default ML model endpoint URL, which you can configure to serve predictions from a specific version." lightbox="media/model-endpoints/set-default.jpg":::

> [!IMPORTANT]
>
> Be sure to set the default endpoint to an active version if you plan to use it. If the default version for your model endpoint isn't set, or is set to an inactive version, then calls to the endpoint fail. 

All active version endpoints are listed under the model’s endpoint settings. You can modify the auto sleep property of each endpoint by toggling the switcher to be "On" or "Off."

:::image type="content" source="media/model-endpoints/auto-sleep.jpg" alt-text="Screenshot showing how to change the auto sleep property on ML model endpoints." lightbox="media/model-endpoints/auto-sleep.jpg":::

> [!TIP]
>
> Active endpoints with auto sleep turned on will enter an idle state after five minutes without traffic, and the first call to wake them up will involve a short delay. You may want to turn off this property for endpoints in production.

## Querying endpoints for real-time predictions

Model endpoints are available for instant testing with a low-code experience in Fabric. Navigate to a version with an active endpoint and select "Preview predictions" from the ribbon in the interface. You can send sample requests to the endpoint—and get sample predictions in real-time—using form fields that match the model’s input signature.

:::image type="content" source="media/model-endpoints/preview.jpg" alt-text="Screenshot showing the built-in preview experience for getting sample predictions from an active ML model endpoint." lightbox="media/model-endpoints/preview.jpg":::

To populate the form fields with random sample values, select "Autofill." You can add more sets of form values to test the endpoint with larger payloads containing multiple inputs. Select "Get predictions." to send the endpoint your sample request.

:::image type="content" source="media/model-endpoints/form-preview.jpg" alt-text="Screenshot showing the form-based view for sending sample requests to an active ML model endpoint." lightbox="media/model-endpoints/form-preview.jpg":::

If you prefer to format sample requests using JSON, use the dropdown selector to change the view.

:::image type="content" source="media/model-endpoints/json-preview.jpg" alt-text="Screenshot showing the JSON-based view for sending sample requests to an active ML model endpoint" lightbox="media/model-endpoints/json-preview.jpg":::

## Deactivating model endpoints

You can deactivate model endpoints directly from the Fabric interface. Navigate to a version that you no longer need to serve real-time predictions, and then select "Deactivate version endpoint" from the ribbon.

:::image type="content" source="media/model-endpoints/deactivate.jpg" alt-text="Screenshot showing how to deactivate an ML model endpoint from the Fabric interface." lightbox="media/model-endpoints/deactivate.jpg":::

A toast message shows that Fabric is shutting down your active deployment and the status of the endpoint changes to "Deactivating." The endpoint is no longer able to serve real-time predictions until you reactivate it.

:::image type="content" source="media/model-endpoints/deactivating.jpg" alt-text="Screenshot showing an ML model endpoint that is now deactivating." lightbox="media/model-endpoints/deactivating.jpg":::

You can also deactivate multiple version endpoints at once from the model’s settings pane. Select "Manage endpoints" from the ribbon in the model interface, and select one or more active version endpoints to deactivate.

:::image type="content" source="media/model-endpoints/deactivate-multiple.jpg" alt-text="Screenshot showing how to deactivate multiple ML model endpoints at once from the Fabric interface." lightbox="media/model-endpoints/deactivate-multiple.jpg":::

## Related content

- Manage and query endpoints programmatically with the ML model endpoint REST API.
- Generate batch predictions with the [`PREDICT` function](./model-scoring-predict.md) in Fabric notebooks.
- Learn more about [model training and experimentation](./model) in Fabric.
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
