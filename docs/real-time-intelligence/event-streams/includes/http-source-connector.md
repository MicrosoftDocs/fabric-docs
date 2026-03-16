---
title: HTTP connector for Fabric event streams
description: This include file has the common content for configuring an HTTP connector for Fabric event streams and Real-Time hub. 
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 12/03/2025
---

You can select one of the **Example public APIs** to get started quickly with predefined headers and parameters, or select **Exit** to configure your own custom HTTP connector.

### Use example public APIs

1. Select an example public API to quickly set up the HTTP connector:
   :::image type="content" source="media/http-connector/select-example-api.png" alt-text="Screenshot that shows example API page." lightbox="media/http-connector/select-example-api.png":::

   * **Binance**. Get the latest Bitcoin price
   * **CoinGecko**. Get the current Bitcoin price in USD
   * **Transport for London**. Get live arrival predictions for a London station
   * **Alpha Vantage**. Get the real-time MSFT stock price
   * **OpenWeather**. Get the weather forecast for a location
   * **NewsAPI**. Get the latest business headlines in the US

1. For APIs that require an API key, use the provided link to apply for the API key and enter it in the input box. The connector then automatically creates the Fabric cloud connection and prefills the required HTTP headers and parameters.

   > [!IMPORTANT]
   > The **Binance example API** does not require an API key, but you're responsible for complying with its Terms of Use.

1. If you choose **Use existing connection**, select **Apply example** to prefill the required headers and parameters for the example API without entering an API key.

1. Alternatively, select **Exit** to close the window and configure your own HTTP source from scratch.

### Configure your own HTTP source

Follow the steps to configure your own HTTP source without an example API.

1. **Create a new connection**. Select **New connection** and enter the required properties for your HTTP source:

   :::image type="content" source="media/http-connector/new-connection.png" alt-text="Screenshot that shows where to select the new connection page." lightbox="media/http-connector/new-connection.png":::

   - **Base Url**: The base URL of the HTTP endpoint.
   - **Token Audience Uri (optional)**: The resource that the token is intended for.
   - **Connection name**: Enter a name for the connection.
   - **Authentication kind**: Currently, the HTTP connector only supports  `Anonymous`, `Basic`, and `API Key` authentication.
  
   :::image type="content" source="media/http-connector/connection-page.png" alt-text="Screenshot that shows the new connection page." lightbox="media/http-connector/connection-page.png":::

1. **Request method**: Select `GET` or `POST`.

1. **Headers and parameters**: If you selected **API Key** authentication when you created the cloud connection, use the dynamic parameter **${apiKey}** in your headers or parameters to reference the API Key.

   For example, to connect to CoinGecko, use the header: `x_cg_demo_api_key` = `${apiKey}`.

   > [!IMPORTANT]
   > Do NOT enter your API key or other credentials in the headers or parameters.

1. **Request interval (s)**: Specifies the time in seconds to wait between consecutive requests; valid range is [1, 3600].

1. **Maximum retries**： The maximum number of times the connector retries a request when an error occurs; valid range is [10, 100].

1. **Retry backoff (s)**: The time in seconds to wait following an error before the connector retries; valid range is [1, 3600].

1. **Retry status code**: The HTTP error codes returned that prompt the connector to retry the request. Enter a comma-separated list of codes or range of codes. Ranges are specified with a start and optional end code. For example:
   - `400-` includes all codes greater than or equal to 400.
   - `400-500` includes codes from 400 to 500, including 500.
   - `404,408,500-` prompts the connector to retry on 404 NOT FOUND, 408 REQUEST TIMEOUT, and all 5xx error codes.

   Some status codes are always retried, such as unauthorized, timeouts, and too many requests.

   :::image type="content" source="media/http-connector/configure-connection-settings.png" alt-text="Screenshot that shows the configured settings." lightbox="media/http-connector/configure-connection-settings.png":::

1. Review the configuration summary for the HTTP source and select **Add**.

   :::image type="content" source="media/http-connector/review.png" alt-text="Screenshot that shows the review configuration page." lightbox="media/http-connector/review.png":::
