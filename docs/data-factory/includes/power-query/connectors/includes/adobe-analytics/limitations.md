---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/adobe-analytics/adobe-analytics-limitations-and-considerations-include.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

You should be aware of the following limitations and issues associated with accessing Adobe Analytics data.

* Adobe Analytics has a built-in limit of 50,000 rows returned per API call.

* If the number of API calls exceeds four per second, a warning is issued. If the number exceeds five per second, an error message is returned. For more information about these limits and the associated messages, see [Web Services Error Codes](https://github.com/AdobeDocs/analytics-1.4-apis/blob/master/docs/getting-started/c_Web_Services_Error_Codes.md#web-services-error-codes).

* The API request timeout through adobe.io is currently 60 seconds.

* The default rate limit for an Adobe Analytics Company is 120 requests per minute per user (the limit is enforced as 12 requests every 6 seconds).

* This connector isn't supported with an on-premises data gateway. However the [virtual network data gateway](/data-integration/vnet/use-data-gateways-sources-power-bi#supported-azure-data-services) is supported.

Import from Adobe Analytics stops and displays an error message whenever the Adobe Analytics connector hits any of the API limits.

When accessing your data using the Adobe Analytics connector, follow the guidelines provided under the [Best Practices](https://developer.adobe.com/analytics-apis/docs/2.0/guides/faq/#what-are-some-best-practices-and-guidelines-when-using-the-apis) heading.

For more guidelines on accessing Adobe Analytics data, see [Recommended usage guidelines](https://experienceleague.adobe.com/en/docs/analytics/analyze/admin-overview/use-cases).
