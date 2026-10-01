---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/data-lake-storage/data-lake-storage-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

1. Select the **Azure Data Lake Storage Gen2** option in the get data experience. Different apps have different ways of getting to the Power Query Online get data experience. For more information about how to get to the Power Query Online get data experience from your app, go to [Where to get data](/power-query/where-to-get-data).

   :::image type="content" source="../../media/azure-data-lake-storage-generation-2/get-data-online.png" alt-text="Screenshot of the get data window with Azure Data Lake Storage Gen2 emphasized.":::

2. In **Connect to data source**, enter the URL to your Azure Data Lake Storage Gen2 account. Refer to limitations and considersations to determine the URL to use.

   :::image type="content" source="../../media/azure-data-lake-storage-generation-2/data-lake-storage-url-online.png" alt-text="Screenshot of the Connect to data source page for Azure Data Lake Storage Gen2, with the URL entered.":::

3. Select whether you want to use the file system view or the Common Data Model folder view.

4. If needed, select the on-premises data gateway in **Data gateway**.

5. Select **Sign in** to sign into the Azure Data Lake Storage Gen2 account. You're redirected to your organization's sign-in page. Follow the prompts to sign in to the account.

6. After you successfully sign in, select **Next**.

7. The **Choose data** page shows all files under the URL you provided. Verify the information and then select **Transform Data** to transform the data in Power Query.

   :::image type="content" source="../../media/azure-data-lake-storage-generation-2/file-systems-online.png" alt-text="Screenshot of the Choose data page, containing the data from the Drivers.txt file." lightbox="../../media/azure-data-lake-storage-generation-2/file-systems-online.png":::

