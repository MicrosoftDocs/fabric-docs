---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/data-lake-storage/data-lake-storage-prerequisites.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

* An Azure subscription. Go to [Get Azure free trial](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* A storage account that has a hierarchical namespace. To create one, follow the instructions at [Create a storage account](/azure/storage/common/storage-account-create). This article assumes that you created a storage account named `myadlsg2`.

* Ensure you're granted one of the following roles for the storage account: **Blob Data Reader**, **Blob Data Contributor**, or **Blob Data Owner**.

* A sample data file named `Drivers.txt` located in your storage account. You can download this sample from [Azure Data Lake Git Repository](https://github.com/Azure/usql/tree/master/Examples/Samples/Data/AmbulanceData/Drivers.txt), and then upload that file to your storage account.

