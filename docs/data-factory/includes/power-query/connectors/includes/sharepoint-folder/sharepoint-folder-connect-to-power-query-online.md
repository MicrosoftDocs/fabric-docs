---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/sharepoint-folder/sharepoint-folder-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To connect to a SharePoint folder:

1. From the **Data sources** page, select **SharePoint folder**.

1. If you have access to the [SharePoint site picker](/power-query/connectors/sharepoint-folder#sharepoint-site-picker), use it to locate and select the sites directly on the connection settings page. If not, [copy the SharePoint site URL](/power-query/connectors/sharepoint-folder#determine-the-site-url) and paste it into the **Site URL** text box in the **SharePoint Folder** dialog box. In this example, the site URL is `https://contoso.sharepoint.com/marketing/data`.

   :::image type="content" source="../../media/sharepoint-folder/online-signin.png" alt-text="Screenshot of the online folder selection and sign in.":::

1. If the SharePoint folder is on-premises, enter the name of an on-premises data gateway.

1. Select the authentication kind, and enter any credentials that are required.

1. Select **Next**.

1. When you select the SharePoint folder you want to use, the file information about all of the files in that SharePoint folder are displayed. In addition, file information about any files in any subfolders is also displayed.

   :::image type="content" source="../../media/sharepoint-folder/folder-info-online.png" alt-text="Screenshot of the online Navigator showing the folder information." lightbox="../../media/sharepoint-folder/folder-info-online.png":::

1. Select **Combine** to combine the data in the files of the selected SharePoint folder and load the data into the Power Query editor for editing.

   > [!NOTE]
   >The **Combine** button is the easiest way to combine data found in the files of the SharePoint folder you specify. You could also use the **Transform Data** buttons to combine the files as well, but that requires more manual steps.

