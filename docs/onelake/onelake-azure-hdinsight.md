---
title: Integrate OneLake with Azure HDInsight
description: Learn about Azure HDInsight integration and how to read and write data in OneLake using your Jupyter notebook in an HDInsight Spark cluster.
ms.reviewer: eloldag
ms.author: harmeetgill
author: gillharmeet
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/27/2023
---

# Integrate OneLake with Azure HDInsight

[Azure HDInsight](/azure/hdinsight/hdinsight-overview) is a managed cloud-based service for big data analytics that helps organizations process large amounts data. This tutorial shows how to connect to OneLake with a Jupyter notebook from an Azure HDInsight cluster.

## Using Azure HDInsight

To connect to OneLake with a Jupyter notebook from an HDInsight cluster:

1. Create an HDInsight (HDI) Spark cluster. Follow these instructions: [Set up clusters in HDInsight](/azure/hdinsight/hdinsight-hadoop-provision-linux-clusters).
   1. While providing cluster information, remember your Cluster login Username and Password, as you need them to access the cluster later.
   1. Create a user assigned managed identity (UAMI): [Create for Azure HDInsight - UAMI](/azure/hdinsight/hdinsight-hadoop-use-data-lake-storage-gen2-portal) and choose it as the identity in the **Storage** screen.

      :::image type="content" source="media\onelake-azure-hdinsight\create-hdinsight-cluster-storage.png" alt-text="Screenshot showing where to enter the user assigned managed identity in the Storage screen." lightbox="media\onelake-azure-hdinsight\create-hdinsight-cluster-storage.png":::

1. Give this UAMI access to the Fabric workspace that contains your items. For help deciding what role is best, see [Workspace roles](..\get-started\roles-workspaces.md).

   :::image type="content" source="media\onelake-azure-hdinsight\manage-access-panel.jpg" alt-text="Screenshot showing where to select an item in the Manage access panel." lightbox="media\onelake-azure-hdinsight\manage-access-panel.jpg":::

1. Navigate to your lakehouse and find the name for your workspace and lakehouse. You can find them in the URL of your lakehouse or the **Properties** pane for a file.

1. In the Azure portal, look for your cluster and select the notebook.

   :::image type="content" source="media\onelake-azure-hdinsight\azure-portal-select-notebook.jpg" alt-text="Screenshot showing where to find your cluster and notebook in the Azure portal." lightbox="media\onelake-azure-hdinsight\azure-portal-select-notebook.jpg":::

1. Enter the credential information you provided while creating the cluster.

   :::image type="content" source="media\onelake-azure-hdinsight\enter-credentials.jpg" alt-text="Screenshot showing where to enter your credential information." lightbox="media\onelake-azure-hdinsight\enter-credentials.jpg":::

1. Create a new Spark notebook.

1. Copy the workspace and lakehouse names into your notebook and build the OneLake URL for your lakehouse. Now you can read any file from this file path.

   ```python
   fp = 'abfss://' + 'Workspace Name' + '@onelake.dfs.fabric.microsoft.com/' + 'Lakehouse Name' + '/Files/' 
   df = spark.read.format("csv").option("header", "true").load(fp + "test1.csv") 
   df.show()
   ```

1. Try writing some data into the lakehouse.

   ```python
   writecsvdf = df.write.format("csv").save(fp + "out.csv") 
   ```

1. Test that your data was successfully written by checking your lakehouse or by reading your newly loaded file.

You can now read and write data in OneLake using your Jupyter notebook in an HDI Spark cluster.

## Related content

- [OneLake security](./security/fabric-onelake-security.md)
