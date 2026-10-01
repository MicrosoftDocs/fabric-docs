---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/dataverse/dataverse-find-environment-url.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

If you need to use port 5558 to connect to Dataverse, you have to find your Dataverse environment URL. Open [Power Apps](https://make.powerapps.com/?utm_source=padocs&utm_medium=linkinadoc&utm_campaign=referralsfromdoc). In the upper right of the Power Apps page, select the environment you're going to connect to. Select the :::image type="icon" source="../../media/common-data-service/settings-icon.png" alt-text="Settings."::: settings icon, and then select **Advanced settings**.

In the new browser tab that opens, copy the root of the URL. This root URL is the unique URL for your environment. The URL is in the format of https://<*yourenvironmentid*>.crm.dynamics.com/. **Make sure you remove https:// and the trailing / from the URL before pasting it to connect to your environment.** Append port 5558 to the end of the environment URL, for example *yourenvironmentid.crm.dynamics.com,5558*.

:::image type="content" source="../../media/dataverse/environment-url.png" alt-text="Screenshot showing the Dataverse environment URL highlighted in the browser address bar.":::
