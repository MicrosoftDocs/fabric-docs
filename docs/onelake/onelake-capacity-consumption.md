# Fabric Capacity and OneLake consumption

You only need one capacity to drive all your Microsoft Fabric experiences, including Microsoft OneLake.  Keep reading if you want a detailed example of how OneLake consumes storage and compute.

## Overview 

[OneLake](https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview) comes automatically with every Fabric tenant and is designed to be the single place for all your analytics data. All the Fabric data items are prewired to store data in OneLake.  For example, when you store data in a lakehouse or warehouse, your data is natively stored in OneLake.  
With OneLake, you pay for the data stored, similar to services like Azure Data Lake Storage Gen2 or Amazon S3.  However, unlike other services, OneLake does not include a separate charge for transactions (e.g. reads, writes) to your data.  Instead, transactions consume the same [Fabric capacity](https://learn.microsoft.com/en-us/fabric/enterprise/licenses) you’ve already purchased to run your other Fabric experiences.  For information about pricing, which is comparable to ADLS Gen2, see [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).
To illustrate, let’s walk through an example.  Let’s say you purchase an F2 SKU with 2 Capacity Units (CU) every second. Let’s name this Capacity1. You then create Workspace1 and upload a 450 MB file to a lakehouse using the Fabric web portal.  This action consumes both OneLake storage and OneLake transactions.  Now, let’s dive into each of these dimensions.

## OneLake Storage
Since OneLake storage operates on a pay-as-you-go model, you will see a separate charge for “OneLake Storage” in your bill corresponding to the 450MB of data stored.
If you are a capacity admin, you can view your storage consumption in the [Fabric Capacity Metrics app](https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-storage-page). Open the Storage tab and choose Experience as “lake” to see the cost of OneLake storage. If you have multiple workspaces in the capacity, you can see the storage per workspace.
 
 :::image type="content" source="media\onelake-capacity-consumption\onelakestorage.png" alt-text="Diagram showing how OneLake storage is viewed in Fabric Metrics app" lightbox="media\onelake-capacity-consumption\onelakestorage.png":::

 ## OneLake Compute
Requests to OneLake, such as reading, writing, or listing, will consume your Fabric capacity. OneLake follows similar [mapping](https://learn.microsoft.com/en-us/azure/storage/blobs/map-rest-apis-transaction-categories) of APIs to operations like ADLS. The CU consumption per each type of operation can be viewed in the Fabric Capacity Metrics app.  In our example, the file upload resulted in a write transaction that consumed 127.46 CU Seconds of Fabric Capacity. This is reported as “OneLake Write via Proxy” in the operation name in Capacity Metrics App.
Now let’s read this data using a Fabric notebook.  You will then consume 1.39 CU Seconds of read transactions. This is reported as “OneLake Read via Redirect” in the Metrics app.
Refer to the [OneLake consumption page](https://learn.microsoft.com/en-us/fabric/onelake/onelake-consumption) to learn more about how each type of operation consumes capacity units.
 
 :::image type="content" source="media\onelake-capacity-consumption\onelakecompute.png" alt-text="Diagram showing how OneLake compute is viewed in Fabric Metrics app" lightbox="media\onelake-capacity-consumption\onelakecompute.png":::

Notice in the screenshot that the "Billing Type" for OneLake transactions is marked as "non-billable." This is because OneLake transactions are currently not consuming Fabric CU seconds (see “[Known issues](https://learn.microsoft.com/en-us/fabric/get-started/known-issues/known-issue-553-onelake-compute-transactions-not-reported-metrics-app?wt.mc_id=fabric_inproduct_knownissues)"). This is a temporary situation.  Check [OneLake consumption](https://learn.microsoft.com/en-us/fabric/onelake/onelake-consumption) for updates on when OneLake transactions will change to “billable” and count against your capacity limits.

To understand more about the various terminology on the metrics app, refer to [Understand the metrics app compute page - Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/enterprise/metrics-app-compute-page).

You may be wondering, how do shortcuts impact my OneLake usage? In the above scenario, both storage and compute are billed to Capacity1. Now, let’s say you have a second capacity Capacity2, that contains Workspace2. You create a lakehouse and create a shortcut to the parquet file you uploaded in workspace1. You create a notebook to query the parquet file. As the data is being accessed by Capacity2, the compute or transaction cost for this read operation will consume CU from Capacity2. The storage will continue to be billed to Capacity1. 
 
:::image type="content" source="media\onelake-capacity-consumption\shortcutbilling.png" alt-text="Diagram showing how OneLake storage is viewed in Fabric Metrics app" lightbox="media\onelake-capacity-consumption\shortcutbilling.png":::

What if you pause the capacity? Let’s say Capacity2 is paused and Capacity1 is not paused. When Capacity2 is paused, you can’t read the data using the shortcut from Workspace2 in Capacity2, however, you can access the data directly in Workspace1. Now, if Capacity1 is paused and Capacity2 is resumed, you will not be able to read the data using Capacity1/Workspace1, however, you will be able to read data using the shortcut that was already created in Capacity2/Workspace2. In both these cases, as the data is still stored in Capacity1, the data stored is billed to Capacity1.

At any point, if your CU consumption exceeds your capacity limit, your capacity is throttled. Transactions won’t be served or may be delayed for a given window of time when capacity is throttled. Here is more about [throttling](https://learn.microsoft.com/en-us/fabric/enterprise/throttling).

We encourage you to start Fabric’s 60-day free trial to explore OneLake and other Fabric features. You may also refer to our [Fabric forum](https://community.fabric.microsoft.com/t5/Forums/ct-p/ac_forums) if you have more questions.
