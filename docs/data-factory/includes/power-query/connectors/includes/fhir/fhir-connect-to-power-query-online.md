---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/fhir/fhir-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To make a connection to a FHIR server, take the following steps:

1. In **Choose data source**, search for **FHIR**, and then select the **FHIR** connector. More information: [Where to get data](/power-query/where-to-get-data)

2. In the **FHIR** dialog, enter the URL for your FHIR server.  

   :::image type="content" source="../../fhir/fhir-access-online.png" alt-text="Screenshot of the FHIR dialog with the FHIR URL filled in.":::

   You can optionally enter an initial query for the FHIR server, if you know exactly what data you're looking for.

3. If necessary, include the name of your on-premises data gateway.

4. Select the **Organizational account** authentication kind, and select **Sign in**. Enter your credentials when asked. You must have a [FHIR Data Reader role](/power-query/connectors/fhir/fhir#prerequisites) on the FHIR server to read data from the server.

5. Select **Next** to proceed.

6. Select the resources you're interested in.

   :::image type="content" source="../../fhir/fhir-navigator-online.png" alt-text="Screenshot of the Navigator with the FHIR Patient box filled in, and the patient records shown on the right hand side." lightbox="../../fhir/fhir-navigator-online.png":::

   Select **Transform data** to shape the data.

7. Shape the data as needed, for example, expand the postal code.

   :::image type="content" source="../../fhir/fhir-shape-data-online.png" alt-text="Screenshot of the Power Query editor with the address column selected, and the postal code selected for expansion." lightbox="../../fhir/fhir-shape-data-online.png":::

8. Save the query when shaping is complete.

   :::image type="content" source="../../fhir/fhir-save-query-online.png" alt-text="Screenshot of the Power Query editor with the Save & Close button emphasized." lightbox="../../fhir/fhir-save-query-online.png":::

   > [!NOTE]
   > In some cases, query folding can't be obtained purely through data shaping with the graphical user interface (GUI), as shown in the previous image. To learn more about query folding when using the FHIR connector, see [FHIR query folding](/power-query/connectors/fhir/fhir-query-folding).

