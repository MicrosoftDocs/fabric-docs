---
title: OneLake integration with Azure HDInsight
description: Follow steps to connect to OneLake with a Jupyter notebook from an Azure HDInsight cluster.
ms.reviewer: eloldag
ms.author: harmeetgill
author: gillharmeet
ms.topic: how-to
ms.date: 03/24/2023
---

# OneLake integration: Azure HDInsight

[!INCLUDE [preview-note](../includes/preview-note.md)]

This tutorial shows how to connect to OneLake with a Jupyter notebook from an Azure HDInsight cluster.

## Using Azure HDInsight

To connect to OneLake with a Jupyter notebook from an HDInsight cluster:

1. Create an HDI Spark cluster. Follow these instructions: [Set up clusters in HDInsight](/azure/hdinsight/hdinsight-hadoop-provision-linux-clusters).
   1. Enter cluster information. Remember your cluster username and password, as you'll need them later to access the cluster.

      ![Graphical user interface, application  Description automatically generated](media/image1.png)

   1. Create a user assigned managed identity (UAMI): [Create for Azure HDInsight - UAMI](/azure/hdinsight/hdinsight-hadoop-use-data-lake-storage-gen2-portal) and choose it as the identity in the **Storage** screen.

      ![Graphical user interface, text, application, email  Description automatically generated](media/image2.jpeg)

1. Give this UAMI access to the workspace that contains your artifacts.

   ![Graphical user interface, application  Description automatically generated](media/image3.jpg)

1. Navigate to your Lakehouse and find the GUID for your workspace and Lakehouse. You can find them in the URL of your Lakehouse or the **Properties** pane for a file.

1. In the Azure portal, look for your cluster and select the notebook.

   ![Graphical user interface, text, application  Description automatically generated](media/image4.jpg)

1. Enter the credential information you provided while creating the cluster.

   ![Graphical user interface, application  Description automatically generated](media/image5.jpg)

1. Create a new Spark Notebook.

1. Copy the workspace and Lakehouse GUIDs into your notebook and build your OneLake URL for your Lakehouse. Now you can read any file from this file path.

   ![Graphical user interface, text, application, email  Description automatically generated](media/image6.jpg)

1. Try writing some data into the Lakehouse.

   ![Graphical user interface, application  Description automatically generated](media/image7.jpg)

1. Test that your data was successfully written by checking in your Lakehouse or by reading your newly loaded file. Try different formats like Parquet, Delta, etc.

You can now read and write data in OneLake using your Jupyter notebook in an HDI Spark cluster.

## Next steps

- [OneLake security](onelake-security.md)
