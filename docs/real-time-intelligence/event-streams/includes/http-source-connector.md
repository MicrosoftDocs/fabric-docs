---
title: HTTP connector for Fabric event streams
description: This include file has the common content for configuring an HTTP connector for Fabric event streams and Real-Time hub. 
ms.author: zhenxilin
author: WenyangShi
ms.topic: include
ms.custom:
ms.date: 11/03/2025
---

1. In the wizard, you can select one of the **Example public APIs** to get started quickly with predefined headers and parameters, or select **Exit** to configure your own HTTP connector.

1. Here are the example public APIs you can use to quickly get started with the HTTP connector:
   * **Binance** — Get the latest Bitcoin price
   * **CoinGecko** — Get the current Bitcoin price in USD
   * **Transport for London** — Get live arrival predictions for a London station
   * **Alpha Vantage** — Get the real-time MSFT stock price
   * **OpenWeather** — Get the weather forecast for a location
   * **NewsAPI** — Get the latest business headlines in the US

   :::image type="content" source="media/http-connector/select-example-api.png" alt-text="Screenshot that shows example API page." lightbox="media/http-connector/select-example-api.png":::

1. Alternatively, select **Exit** to skip the example and configure your own HTTP connection without an example.

   :::image type="content" source="media/http-connector/exit.png" alt-text="Screenshot that shows go without example API." lightbox="media/http-connector/exit.png":::

1. If you select an example API, choose whether eventstream automatically creates the connection before **Apply example**:
   - **Create a new connection for me**: Automatically creates the connection and prefills the required HTTP headers and parameters.
   - If this option is selected, you need to enter your API key to create connection, except when using **Binance**, which doesn’t require an API key.
   - If you select **Use existing connection**, only the headers and parameters are prefilled, and you need to create the connection manually.
  
    :::image type="content" source="media/http-connector/create-connection-for-me.png" alt-text="Screenshot that shows creating a new connection for me option." lightbox="media/http-connector/create-connection-for-me.png":::

1. If you’re creating the connection manually or configuring your own HTTP source without an example, select **New connection** and provide the following details:
   - **Base Url**: Base Url of Http Endpoint. Information will be sent to the URL specified. Ensure you trust the URL entered.
   - **Token Audience Uri**: The resource that the token is intended for, e.g, `https://vault.azure.net`, for connecting to Azure keyvault endpoint.
   - **Connection name**: Enter a name for the connection.
   - **Authentication kind**: Choose from `Anonymous`, `Basic`, `API Key`, `Organizational account`, or `Service principal`.
  
    :::image type="content" source="media/http-connector/connection-page.png" alt-text="Screenshot that shows the new connection page." lightbox="media/http-connector/connection-page.png":::

1. **Request method**: Select `GET` or `POST`.
1. **Headers and Parameters**: Configure as needed.
1. **Request interval (s)**: Specifies the time in seconds to wait between consecutive requests; valid range is [1, 3600].
1. You may expand **Advanced settings** to access more configuration options for the HTTP source:
   - **Maximum retries**： The maximum number of times the connector retries a request when an error occurs; valid range is [10, 100].
   - **Retry backoff (s)**： The time in seconds to wait following an error before the connector retries; valid range [1, 3600].
   - **Retry status code**： The HTTP error codes returned that prompt the connector to retry the request. Enter a comma- separated list of codes or range of codes. Ranges are specified with a start and optional end code. For example: 
     - 400- includes all codes greater than or equal to 400 and 
     - 400-500 includes codes from 400 to 500, including 500. 
     - 404,408,500- prompts the connector to retry on 404 NOT FOUND, 408 REQUEST TIMEOUT, and all 5xx error codes. 
   Some status codes are always retried, such as unauthorized, timeouts, and too many requests.
1. You can edit the HTTP source name by selecting the **Pencil icon** for **Source name** in the **Stream details** section. Then select **Next**.

   :::image type="content" source="media/http-connector/configure-connection-settings.png" alt-text="Screenshot that shows the configured settings." lightbox="media/http-connector/configure-connection-settings.png":::

1. On the **Review + connect** page, review the configuration summary for the HTTP source, and select **Add** to complete the setup.

   :::image type="content" source="media/http-connector/review.png" alt-text="Screenshot that shows the review configuration page." lightbox="media/http-connector/review.png":::

