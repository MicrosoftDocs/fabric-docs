---
title: How to monitor pipeline runs
description:
ms.reviewer: jonburchel
ms.author: noelleli
author: n0elleli
ms.topic: how-to 
ms.date: 01/27/2023
---

# How to monitor pipeline runs in Trident (Preview)

## Monitor pipeline runs

To monitor your pipeline runs, hover over your pipeline in your workspace. Doing so will bring up 3 dots to the right of your pipeline name.

![Graphical user interface, application  Description automatically generated](media/image1.png)

Click to find a list of options and select **View run history**. This will open a fly out on the right side of your screen with all your recent runs and run statuses.

![Graphical user interface, application  Description automatically generated](media/image2.png)

![Graphical user interface, application, email  Description automatically generated](media/image3.png)

Use the Filter to find specific pipeline runs. You can filter on Status or on End time.

![Table  Description automatically generated](media/image4.png)

Select one of your pipeline runs to see detailed information. You’ll be able to see what your pipeline looks like and see additional properties like Run ID or errors if your pipeline run failed.

![Graphical user interface, application, email  Description automatically generated](media/image5.png)

![Graphical user interface, application  Description automatically generated](media/image6.png)

To find additional information on your pipeline run’s **Input** and **Output**, hover over an Activity row and click either the **Input** or **Output** icon. Details will be shown in a pop-up.

![Graphical user interface  Description automatically generated with medium confidence](media/image7.png)

![Graphical user interface, table  Description automatically generated](media/image8.png)

To view performance details, hover over an Activity row and click on the glasses icon. Performance details will pop up.

![Graphical user interface  Description automatically generated](media/image9.png)

![Graphical user interface, application  Description automatically generated](media/image10.png)

Additional details can be found under **Duration breakdown** and **Advanced.**  

![Graphical user interface, application, Teams  Description automatically generated](media/image11.png)

If your pipeline failed, view the error message by hovering over the Activity row and click the message icon under Status. This will bring up error details like the error code and message.

![Graphical user interface, table  Description automatically generated](media/image12.png)

![Graphical user interface, text, application  Description automatically generated with medium confidence](media/image13.png)

Click **Update pipeline** to make changes to our pipeline. This will land you back in the pipeline canvas.

![Graphical user interface, application  Description automatically generated](media/image14.png)

You can also **Rerun** your pipeline. You can choose to rerun the entire pipeline or only rerun the pipeline from the failed activity.  

![Graphical user interface, application, chat or text message  Description automatically generated](media/image15.png)

![Graphical user interface, application  Description automatically generated](media/image16.png)

## Gantt view

A Gantt chart is a view that allows you to see the run history over a time range. By switching to a Gantt view, you will see all pipeline runs grouped by name displayed as bars relative to how long the run took.

![Graphical user interface, application, Teams  Description automatically generated](media/image17.png)

The length of the bar relates to the duration of the pipeline. You can select the bar to see more details.

![Graphical user interface, application  Description automatically generated](media/image18.png)

![Graphical user interface, application  Description automatically generated](media/image19.png)

## Next steps

Quickstart: Create your first pipeline to copy data (Preview)

Quickstart: Create your first Dataflows Gen2 to get and transform data (Preview)
