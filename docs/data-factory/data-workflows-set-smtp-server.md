---
title: Set up SMTP server in Data workflows.
description: This tutorial helps to set up smtp server in Data workflows.
ms.reviewer: xupxhou
ms.author: abnarain
author: abnarain
ms.topic: how-to
ms.date: 03/25/2024
---

# Set up SMTP Server in Data workflows.

## Introduction

> [!NOTE]
> ```Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.```

One of the features of Airflow is the ability to send email notifications and alerts when a task fails, succeeds, or retries. This feature can help you keep track of your workflows and troubleshoot any issues.

To use email notifications and alerts, you need to set up a (Simple Mail Transfer Protocol) SMTP server that can send emails on behalf of Airflow. SMTP stands for Simple Mail Transfer Protocol, and it's a standard for sending and receiving emails over the internet. You can use your own SMTP server, or a third-party service like Gmail, SendGrid, or Mailgun. This article shows you how to set up SMTP server with Data workflows using Gmail.

## Prerequisites

* **SMTP server** or service that your can use to send emails.  You need the SMTP host, port, username, and password for your server or service. If you're using Gmail, create an app password for your account.

* An email address that you want to use as the sender of the notifications and alerts. This email address can be the same as your SMTP username, or a different one if your SMTP service allows it.

* One or more email addresses that you want to receive the notifications and alerts. These can be your own email addresses, or the email addresses of your team members, stakeholders, or clients.

## Set up the environment variables

* Once you have the prerequisites, you can configure the Data workflows to use your SMTP server or service. Edit the `Airflow configurations` section, with the following fields:

    * **AIRFLOW__SMTP__SMTP_HOST**: The hostname or IP address of your SMTP server or service.
    * **AIRFLOW__SMTP__SMTP_STARTTLS**: Whether to use TLS (Transport Layer Security) encryption when connecting to your SMTP server or service. Set this config to True if your SMTP server or service supports TLS, or False otherwise.
    * **AIRFLOW__SMTP__SMTP_SSL**: Whether to use SSL (Secure Sockets Layer) encryption when connecting to your SMTP server or service. Set this config to True if your SMTP server or service requires SSL, or False otherwise.
    * **AIRFLOW__SMTP__SMTP_USER**: The username for your SMTP server or service. This username is usually your email address, or an API key if you're using SendGrid.
    * **AIRFLOW__SMTP__SMTP_PASSWORD**: The password for your SMTP server or service. This password is usually your email password, or an app password if you're using Gmail.
    * **AIRFLOW__SMTP__SMTP_PORT**: The port number for your SMTP server or service. This port is usually 25, 465, or 587, depending on the encryption method and the SMTP service.
    * **AIRFLOW__SMTP__SMTP_MAIL_FROM**: The email address that you want to use as the sender of the notifications and alerts. This mail can be the same as your SMTP username, or a different one if your SMTP service allows it.

    If you're using Gmail, refer to the following values.

    | Airflow Configuration           | Gmail                   |
    |---------------------------------|-------------------------|
    | AIRFLOW__SMTP__SMTP_HOST        | smtp.gmail.com          |
    | AIRFLOW__SMTP__SMTP_STARTTLS    | True                    |
    | AIRFLOW__SMTP__SMTP_SSL         | False                   |
    | AIRFLOW__SMTP__SMTP_USER        | your_email@gmail.com    |
    | AIRFLOW__SMTP__SMTP_PASSWORD    | your_app_password       |
    | AIRFLOW__SMTP__SMTP_PORT        | 587                     |
    | AIRFLOW__SMTP__SMTP_MAIL_FROM   | your_email@gmail.com    |

    :::image type="content" source="media/data-workflows/airflow-smtp-configs.png" alt-text="Screenshot presents airflow configs for smtp.":::


## Example: A DAG that sends an email on the DAG Failure.

    ```python
    from airflow import DAG
    rom airflow.operators.bash_operator import BashOperator
    from airflow.utils.email import send_emailfrom datetime import datetime


    default_args = {
    "owner": "airflow",
    "start_date": datetime(2024, 3, 1),
    "email": ["your_email@gmail.com"], # The email address that you want to receive the notifications and alerts
    "email_on_failure": True,
    "email_on_retry": False,
    "retries": 0
    }

    with DAG(
        "email_callback_test",
        default_args=default_args,
        schedule_interval=None
    ) as dag:

    fail_task = BashOperator(
            task_id="fail_task",
            bash_command="cd fail",
        )

    fail_task

    ```

### Sample Email received from SMTP server.

The email contains the following information:
* Number of Attempts
* Error
* Log: Link that redirects to the failed task logs.
* Host: Host Name of Data workflows
* Mark success: Link that redirects to the Failed DAG state.

    :::image type="content" source="media/data-workflows/airflow-email.png" alt-text="Screenshot showing private package added as requirement.":::

## Related Content

* Quickstart: [Create a Data workflows](../data-factory/create-data-workflows.md).
