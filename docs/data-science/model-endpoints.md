---
title: Serve real-time predictions with ML model endpoints (Preview)
description: Learn how to serve real-time predictions seamlessly from ML models with secure, scalable, and fully managed online endpoints.
ms.author: lagayhar
author: lgayhardt
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 07/16/2025
ms.search.form: ML model endpoints
---

# Serve real-time predictions with ML model endpoints (Preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

Microsoft Fabric lets you serve real-time predictions from ML models with secure, scalable, and easy-to-use online endpoints. These endpoints are available as built-in properties of most Fabric models—and they require no setup to kick off fully managed real-time deployments.

You can activate, configure, and query model endpoints with a [public-facing REST API](https://aka.ms/fabric/model-endpoint-api). You can also get started directly from the Fabric interface, using a low-code experience to activate model endpoints and preview predictions instantly.

:::image type="content" source="media/model-endpoints/overview.jpg" alt-text="Screenshot showing an ML model in Fabric with a built-in endpoint property for serving real-time predictions." lightbox="media/model-endpoints/overview.jpg":::

## Prerequisites

- To serve real-time predictions, your administrator needs to enable [the tenant switch for ML model endpoints](../admin/service-admin-portal-microsoft-fabric-tenant-settings.md) in the Fabric admin portal.

## Limitations

- Endpoints are currently available for a limited set of ML model flavors, including Keras, LightGBM, Sklearn, and XGBoost.
- Endpoints currently **aren't** available for models with tensor-based schemas or no schemas.

## Get started with model endpoints

ML models in Fabric come prebuilt with online endpoints that can be used to serve real-time predictions. Each registered model version has a dedicated endpoint URL, which can be found under the "Endpoint details" heading in the Fabric interface. This URL ends with a subpath designating that specific version (for instance, `/versions/1/score`).

:::image type="content" source="media/model-endpoints/inactive.jpg" alt-text="Screenshot showing the properties of an ML model endpoint, which can be used to serve real-time predictions." lightbox="media/model-endpoints/inactive.jpg":::

Model endpoints have the following properties:

| **Property** | **Description** | **Default** |
|---|---|---|
| **Default version** | This property (`Yes` or `No`) indicates whether the version is set as the model's default for serving real-predictions. You can [customize the default version](#manage-model-endpoints) in the model's settings. | `No` |
| **Status** | This property indicates whether the endpoint is ready to serve predictions. The status can be `Inactive`, `Activating`, `Active`, `Deactivating`, or `Failed`. Only active endpoints can serve predictions. | `Inactive` |
| **Auto sleep** | This property (`On` or `Off`) indicates whether the endpoint, once active, should scale down capacity usage to zero in the absence of traffic. If auto sleep is on, then the endpoint enters an idle state after five minutes without incoming requests. The first call to wake up an idle endpoint involves a short delay. | `On` |

## Activate model endpoints

You can activate model endpoints directly from the Fabric interface. Navigate to the version that you’d like to serve real-time predictions and select "Activate version endpoint" from the ribbon.

:::image type="content" source="media/model-endpoints/activate.jpg" alt-text="Screenshot showing how to activate an ML model endpoint from the Fabric interface." lightbox="media/model-endpoints/activate.jpg":::

A toast message shows that Fabric is getting your endpoint ready to serve predictions, and the status of the endpoint changes to "Activating." Behind the scenes, Fabric spins up the underlying container infrastructure to host your model. Within a few minutes, your endpoint is ready to serve predictions.

:::image type="content" source="media/model-endpoints/activating.jpg" alt-text="Screenshot showing an ML model endpoint that is now activating." lightbox="media/model-endpoints/activating.jpg":::

Every endpoint has a status indicating whether it’s ready to serve real-time predictions:

| **Status** | **Description** |
|---|---|
| `Inactive` | The endpoint isn't activated to serve real-time predictions, and it’s not consuming Fabric capacity. |
| `Activating` | The endpoint is being configured to serve real-time predictions. Behind the scenes, Fabric sets up the underlying container infrastructure to host the model. Within a few minutes, the endpoint is active. |
| `Active` | The endpoint is ready to serve real-time predictions. Behind the scenes, Fabric manages the underlying infrastructure, scaling up resource usage based on incoming traffic. Higher traffic results in higher Fabric capacity usage. |
| `Deactivating` | The endpoint is being deactivated, so that it no longer serves real-time predictions or consumes Fabric capacity. Behind the scenes, Fabric dismantles the underlying container infrastructure. |

> [!NOTE]
>
> ML models can support active endpoints for up to five versions at once. To serve predictions from a sixth version, you must first [deactivate an active endpoint](#deactivate-model-endpoints).

## Manage model endpoints

For an overview of your model's active endpoints, select "Manage endpoints" from the ribbon in the interface. Every model has a customizable default endpoint, which serves predictions from a version that you choose. You can update the default version using the dropdown selector in the settings pane.

:::image type="content" source="media/model-endpoints/set-default.jpg" alt-text="Screenshot showing the default ML model endpoint URL, which you can configure to serve predictions from a specific version." lightbox="media/model-endpoints/set-default.jpg":::

> [!IMPORTANT]
>
> Be sure to set the default property to an active version if you plan to use it. If the default property isn't set, or is set to an inactive version, then calls to the default endpoint fail. 

All versions with active endpoints are listed under the model’s endpoint settings. You can modify the auto sleep property of each endpoint by toggling the switcher to be "On" or "Off."

:::image type="content" source="media/model-endpoints/auto-sleep.jpg" alt-text="Screenshot showing how to change the auto sleep property on ML model endpoints." lightbox="media/model-endpoints/auto-sleep.jpg":::

> [!TIP]
>
> Active endpoints with auto sleep turned on enter an idle state after five minutes without traffic, and the first call to wake them up involves a short delay. You may want to turn off this property for endpoints in production.

## Query model endpoints for real-time predictions

Model endpoints are available for instant testing with a low-code experience in Fabric. Navigate to a version with an active endpoint and select "Preview predictions" from the ribbon in the interface. You can send sample requests to the endpoint—and get sample predictions in real-time—using form fields that match the model’s input signature.

:::image type="content" source="media/model-endpoints/preview.jpg" alt-text="Screenshot showing the built-in preview experience for getting sample predictions from an active ML model endpoint." lightbox="media/model-endpoints/preview.jpg":::

To populate the form fields with random sample values, select "Autofill." You can add more sets of form values to test the endpoint with multiple inputs. Select "Get predictions" to send the endpoint your sample request.

:::image type="content" source="media/model-endpoints/form-preview.jpg" alt-text="Screenshot showing the form-based view for sending sample requests to an active ML model endpoint." lightbox="media/model-endpoints/form-preview.jpg":::

If you prefer to format sample requests as JSON payloads, use the dropdown selector to change the view.

:::image type="content" source="media/model-endpoints/json-preview.jpg" alt-text="Screenshot showing the JSON-based view for sending sample requests to an active ML model endpoint." lightbox="media/model-endpoints/json-preview.jpg":::

## Deactivate model endpoints

You can deactivate model endpoints directly from the Fabric interface. Navigate to a version that you no longer need to serve real-time predictions and select "Deactivate version endpoint" from the ribbon in the interface.

:::image type="content" source="media/model-endpoints/deactivate.jpg" alt-text="Screenshot showing how to deactivate an ML model endpoint from the Fabric interface." lightbox="media/model-endpoints/deactivate.jpg":::

A toast message shows that Fabric is dismantling your active deployment, and the status of the endpoint changes to "Deactivating." The endpoint is no longer able to serve real-time predictions unless you reactivate it.

:::image type="content" source="media/model-endpoints/deactivating.jpg" alt-text="Screenshot showing an ML model endpoint that is now deactivating." lightbox="media/model-endpoints/deactivating.jpg":::

You can deactivate endpoints for multiple versions at once from the model’s settings pane. Select "Manage endpoints" from the ribbon in the interface and choose one or more active endpoints to deactivate.

:::image type="content" source="media/model-endpoints/deactivate-multiple.jpg" alt-text="Screenshot showing how to deactivate multiple ML model endpoints at once from the Fabric interface." lightbox="media/model-endpoints/deactivate-multiple.jpg":::

## Consumption rate

Hosting active model endpoints consumes Fabric Capacity Units (CUs). Endpoints run on compute nodes and can automatically scale up to three nodes based on incoming traffic. Billing is calculated per node while an endpoint is active. The table below shows the CU consumption for an active Machine Learning model endpoint.

| **Operation** | **Operation Unit of Measure** | **Consumption rate** |
|---|---|---|
|model endpoint | 1 model endpoint (version) per second per node| 5 CU seconds|

The table below shows example scenarios and their corresponding consumption rates and hourly costs.

|**Scenario**|**Description**|**Consumption rate**|**Hourly Cost**|
|---|---|---|---|
|Models with Inactive Endpoints|These models have no active version endpoints and no associated resource utilization. They involve no additional cost.| 0 CU seconds| 0 CU Hour|
|Models with Active but Idle Endpoints|These models have one or more active version endpoints, but, without regular traffic, all have scaled to zero, reducing costs automatically.|5 CU seconds|0.42 CU Hours|
|Models with 1 Active Endpoint and Constant Low Traffic|These models have only 1 active version endpoint serving predictions, but without enough traffic to trigger a full scale-out. One node can serve all the traffic. Other version endpoints may be inactive or idle.| 5 CU seconds|5 CU Hours|
|Models with 1 Active Endpoint and Constant High Traffic|These models have only 1 active version endpoint serving predictions, with enough traffic to trigger a full scale-out. Other version endpoints may be inactive or idle.|15 CU seconds|15 CU Hours|
|Models with 5 Active Endpoints and Constant High Traffic|These models have 5 active version endpoints (the current limit) serving predictions, each with enough traffic to trigger a full scale-out.|75 CU seconds |75 CU Hours|

[The Fabric Capacity Metrics app](../enterprise/metrics-app-compute-page.md) displays the total capacity usage for model endpoint operations under the name "Model Endpoint". Additionally, users are able to view a summary of their billing charges for Model Endpoint usage under the invoicing item "ML Model Endpoint Capacity Usage CU".

Model endpoint operation is classified as [background operations](../enterprise/fabric-operations.md#background-operations).

Consumption rates are subject to change at any time. Microsoft uses reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in the Microsoft Release Notes or the Microsoft Fabric Blog. If any change to the model endpoint in Fabric Consumption Rate materially increases the Capacity Units (CU) required to use, customers can use the cancellation options available for the chosen payment method.


## Related content

- Manage and query endpoints programmatically with the [ML model endpoint REST API](https://aka.ms/fabric/model-endpoint-api).
- Generate batch predictions with the [`PREDICT` function](./model-scoring-predict.md) in Fabric notebooks.
- Learn more about [model training and experimentation](./model-training-overview.md) in Fabric.
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
