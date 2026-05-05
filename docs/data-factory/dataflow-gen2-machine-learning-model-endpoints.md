---
title: Call machine learning model endpoints from Dataflow Gen2 (Preview)
description: Learn how to invoke machine learning model endpoints from Dataflow Gen2 using service principal authentication and M query functions.
ms.reviewer: 
ms.topic: how-to
ms.date: 02/12/2026
ms.custom: dataflows
ai-usage: ai-assisted
ms.collection: 
---

# Call machine learning model endpoints from Dataflow Gen2 (Preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

Microsoft Fabric Dataflow Gen2 can call machine learning model endpoints to get real-time predictions during data transformation. This integration allows you to enrich your data by applying trained machine learning models as part of your dataflow pipeline. You can invoke model endpoints using service principal authentication through M query functions.

## Prerequisites

Before you can call ML model endpoints from Dataflow Gen2, ensure you have the following:

- An active [machine learning model endpoint](../data-science/model-endpoints.md) in your Microsoft Fabric workspace
- A service principal [created in Microsoft Entra ID](/entra/identity-platform/howto-create-service-principal-portal)
- The service principal must have appropriate permissions to access the machine learning model endpoint in Fabric
- Basic familiarity with [M query language](/powerquery-m/) and [Dataflow Gen2](dataflows-gen2-overview.md)

## Set up service principal permissions

To allow your service principal to call machine learning model endpoints, you need to grant it the appropriate permissions:

1. Navigate to the workspace containing your machine learning model in [Fabric](https://app.fabric.microsoft.com).

1. Select **Manage access** from the workspace menu.

1. Select **Add people or groups**.

1. Search for your service principal by its application name or client ID.

1. Assign the service principal at least **Contributor** role to access and invoke model endpoints.


## Get the endpoint URL and authentication details

Before creating your M query function, gather the following information:

1. **Endpoint URL**: Navigate to your machine learning model in Fabric and copy the endpoint URL from the **Endpoint details** section.

   :::image type="content" source="media/dataflow-gen2-machine-learning-model-endpoints/endpoint-url.png" alt-text="Screenshot showing where to find the machine learning model endpoint URL." lightbox="media/dataflow-gen2-machine-learning-model-endpoints/endpoint-url.png":::

1. **Tenant ID**: Find your tenant ID in the Azure portal under Microsoft Entra ID.

1. **Client ID**: Locate your service principal's application (client) ID in the Azure portal.

1. **Client Secret**: Create or retrieve a client secret for your service principal from the Azure portal.

## Create an M query function to call the endpoint

In Dataflow Gen2, you can create a custom M query function that authenticates using the service principal and calls the ML model endpoint.

1. In your Dataflow Gen2, select **Get data** > **Blank query**.

1. Or get the data you want to enrich and then open the **Advanced Editor** from the **Home** tab.

1. Replace the query with the following M function code:

   ```powerquery-m
   let
       CallMLEndpoint = (endpointUrl as text, tenantId as text, clientId as text, clientSecret as text, inputData as any) =>
       let
           // Get access token using service principal
           tokenUrl = "https://login.microsoftonline.com/" & tenantId & "/oauth2/v2.0/token",
           tokenBody = "client_id=" & clientId &
                       "&scope=https://api.fabric.microsoft.com/.default" &
                       "&client_secret=" & clientSecret &
                       "&grant_type=client_credentials",
           tokenResponse = Web.Contents(
               tokenUrl,
               [
                   Headers = [#"Content-Type" = "application/x-www-form-urlencoded"],
                   Content = Text.ToBinary(tokenBody)
               ]
           ),
           tokenJson = Json.Document(tokenResponse),
           accessToken = tokenJson[access_token],

           // Call ML endpoint with bearer token
           requestBody = Json.FromValue(inputData),
           response = Web.Contents(
               endpointUrl,
               [
                   Headers = [
                       #"Content-Type" = "application/json",
                       #"Authorization" = "Bearer " & accessToken
                   ],
                   Content = requestBody
               ]
           ),
           result = Json.Document(response)
       in
           result
   in
       CallMLEndpoint
   ```

1. Rename the query to **CallMLEndpoint** by right-clicking on the query in the **Queries** pane.

## Use the function in your dataflow

Once you've created the function, you can use it to call the ML endpoint for each row in your data:

1. Load or connect to your source data in the dataflow.

1. Add a custom column that invokes the ML endpoint function. Select **Add column** > **Custom column**.

1. Use the following formula to call your endpoint (replace the parameters with your actual values):

   ```powerquery-m
   CallMLEndpoint(
       "<your-machine-learning-endpoint-url>",
       "<your-tenant-id>",
       "<your-client-id>",
       "<your-client-secret>",
       [input1 = [Column1], input2 = [Column2]]
   )
   ```

1. The function returns the prediction result from the machine learning model, which you can expand and use in subsequent transformation steps.

## Best practices

- **Secure credentials**: Consider using [Dataflow Gen2 parameters](dataflow-gen2-parameterized-dataflow.md) or [variable library integration](dataflow-gen2-variable-library-integration.md) to store sensitive values like client secrets instead of hardcoding them.

- **Error handling**: Add error handling logic to your M query to gracefully handle endpoint failures or timeout scenarios.

- **Endpoint availability**: Ensure your machine learning model endpoint is active before running the dataflow. Inactive endpoints will cause the dataflow refresh to fail. Disable the auto-sleep capability if you want to consistently call the endpoint.

- **Performance**: Calling machine learning endpoints for each row can be slow for large datasets. Consider filtering or sampling data before applying predictions.

## Considerations and limitations

- Service principal authentication is required for calling machine learning endpoints from Dataflow Gen2. 
- Calling machine learning endpoints incurs costs for both the dataflow compute and the machine learning endpoint consumption. Monitor your [Fabric capacity usage](../enterprise/metrics-app.md) accordingly.


## Related content

- Learn more about [machine learning model endpoints](../data-science/model-endpoints.md)
- Explore [Dataflow Gen2 overview](dataflows-gen2-overview.md)
- Read about [service principal support in Data Factory](service-principals.md)
- Learn about [Dataflow Gen2 parameters](dataflow-gen2-parameterized-dataflow.md)
