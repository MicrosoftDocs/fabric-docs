---
title: Use Azure OpenAI with REST API
description: How to use prebuilt Azure OpenAI in Fabric with REST API
ms.author: larryfr
author: Blackmist
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: how-to
ms.custom:
ms.date: 02/14/2025
ms.search.form:
ms.collection: ce-skilling-ai-copilot
---

# Use Azure OpenAI in Fabric with REST API (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]
This document shows examples of how to use Azure OpenAI in Fabric using REST API.

## Chat

ChatGPT and GPT-4 are language models optimized for conversational interfaces. To access Azure OpenAI chat endpoints in Fabric, you can send an API request using the following format:

`POST <prebuilt_AI_base_url>/openai/deployments/<deployment_name>/chat/completions?api-version=2024-02-01`

`deployment_name` could be one of:

-   `gpt-35-turbo-0125`
-   `gpt-4-32k`

### Initialization

You can initialize the process by providing some necessary parameters. These parameters include the `Capacity ID`, `Workspace ID`, and User `MWC Token`, which can be obtained using the `TokenUtils` to create the base endpoint for Azure OpenAI models. 


``` python
from synapse.ml.mlflow import get_mlflow_env_config
from synapse.ml.fabric.token_utils import TokenUtils

mlflow_env_configs = get_mlflow_env_config()
mwc_token = TokenUtils().get_openai_mwc_token()

prebuilt_AI_base_url = mlflow_env_configs.workload_endpoint + "cognitive/openai/"
print("workload endpoint for OpenAI: \n" + prebuilt_AI_base_url)

deployment_name = "gpt-35-turbo-0125" # deployment_id could be one of {gpt-35-turbo-0125 or gpt-4-32k}
openai_url = prebuilt_AI_base_url + f"openai/deployments/{deployment_name}/chat/completions?api-version=2024-02-01"
print("The full uri of ChatGPT is: ", openai_url)

post_headers = {
    "Content-Type" : "application/json",
    "Authorization" : "MwcToken {}".format(mwc_token)
}
```


``` python
import requests

def printresult(openai_url:str, response_code:int, messages:list, result:str):
    print("==========================================================================================")
    print("| Post URI        |", openai_url)
    print("------------------------------------------------------------------------------------------")
    print("| Response Status |", response_code)
    print("------------------------------------------------------------------------------------------")
    print("| OpenAI Input    |\n")
    for msg in messages:
        if msg["role"] == "system":
            print("[System] ", msg["content"])
        elif msg["role"] == "user":
            print("Q: ", msg["content"])
        else:
            print("A: ", msg["content"])
    print("------------------------------------------------------------------------------------------")
    print("| OpenAI Output   |\n", result)
    print("==========================================================================================")

def ChatGPTRequest(system_msg:str, user_msg_box:list, bot_msg_box:list) -> (int, dict, str):
    # change message type from string to dict
    system_msg = {"role":"system", "content":system_msg}
    user_msg_box = list(map(lambda x : {"role":"user", "content":x}, user_msg_box))
    bot_msg_box = list(map(lambda x : {"role":"assistant", "content":x}, bot_msg_box))
    
    # cross merge two lists
    msgs = [msg for msgs in zip(user_msg_box, bot_msg_box) for msg in msgs]
    if len(user_msg_box) > len(bot_msg_box):
        msgs.extend(user_msg_box[len(bot_msg_box):])
    elif len(user_msg_box) < len(bot_msg_box):
        msgs.extend(bot_msg_box[len(user_msg_box):])

    # add system msg in front of message box
    msgs.insert(0, system_msg)
    
    # request ChatGPT and analysis response
    post_body = { "messages" : msgs }
    response = requests.post(openai_url, headers=post_headers, json=post_body)
    if response.status_code == 200:
        result = response.json()["choices"][0]["message"]["content"]
    else:
        result = response.content
    return response.status_code, post_body, result
```


### AI Assistant

OpenAI input:

```copilot-prompt
    [System] You are an AI assistant that helps people find information.
    Q: Does Azure OpenAI support customer managed keys?
```

OpenAI output:

```console
    A: Yes, Azure OpenAI supports customer managed keys. It enables you to use your own encryption keys to protect your data at rest in the OpenAI GPT-3 service. With customer managed keys, you have full control over the keys used to encrypt and decrypt your data, providing an additional layer of security.
``` 


``` python
system_message = "You are an AI assistant that helps people find information."
user_message_box = ["Does Azure OpenAI support customer managed keys?"]
bot_message_box = []

status_code, post_body, result  = ChatGPTRequest(system_message, user_message_box, bot_message_box)
printresult(openai_url, status_code, post_body["messages"], result)
```

### IT Architect helper

OpenAI input:

```copilot-prompt
    [System] You are an IT Architect. I will provide some details about the functionality of an application or other digital product, and it will be your job to come up with ways to integrate it into the IT landscape. This could involve analyzing business requirements, performing a gap analysis and mapping the functionality of the new system to the existing IT landscape. Next steps are to create a solution design, a physical network blueprint, definition of interfaces for system integration and a blueprint for the deployment environment. 
    A: I need help to integrate a CMS system.
```

OpenAI output:

```console
    A: Sure, I can help you integrate a CMS system. Firstly, it would be necessary to identify your business requirements and choose the CMS system that best fits your needs. Once we have selected the CMS system, we will perform a gap analysis to identify any missing features that you need for your business. 
       Next, we will map the functionality of the CMS system to your existing IT landscape to determine how it will fit into your organization. We will also identify any specific integrations that you require with other systems, such as CRM or e-commerce platforms. 
       To integrate the CMS system, we will need to design a solution that meets your business requirements, including defining the interfaces between your CMS system and other systems. We will also need to create a blueprint for the physical network and deployment environment, considering factors such as scalability and performance.
       Once we have a comprehensive design and blueprint in place, we can begin the deployment of the CMS system. We will work with your team to configure the CMS system, install any necessary plugins or extensions, and perform any required testing or migration of your existing content.
       Finally, we will provide training and support for your organization to help you get the most out of your new CMS system.

```

``` python
system_message = "You are an IT Architect. I will provide some details about the functionality of an application or other digital product, and it will be your job to come up with ways to integrate it into the IT landscape. This could involve analyzing business requirements, performing a gap analysis and mapping the functionality of the new system to the existing IT landscape. Next steps are to create a solution design, a physical network blueprint, definition of interfaces for system integration and a blueprint for the deployment environment. "
user_message_box = ["I need help to integrate a CMS system."]
bot_message_box = []

status_code, post_body, result  = ChatGPTRequest(system_message, user_message_box, bot_message_box)
printresult(openai_url, status_code, post_body["messages"], result)
```

### Shakespeare Writing Assistant

OpenAI input:

```copilot-prompt
    [System] You are a Shakespearean writing assistant who speaks in a Shakespearean style. You help people come up with creative ideas and content like stories, poems, and songs that use Shakespearean style of writing style, including words like "thou" and "hath".
    Here are some example of Shakespeare's style:
     - Romeo, Romeo! Wherefore art thou Romeo?
     - Love looks not with the eyes, but with the mind; and therefore is winged Cupid painted blind.
     - Shall I compare thee to a summer's day? Thou art more lovely and more temperate.
    Q: Please write a short text turning down an invitation to dinner.
    A: Dearest,
       Regretfully, I must decline thy invitation.
       Prior engagements call me hence. Apologies.
    Q: Add more details.
```

OpenAI output:

```console
    A: Fairly well,
       Thy gracious invitation to dine hath filled my heart with gladness. Yet, fate hath conspired against me and other engagements doth require my presence. 
       Pray, accept my regrets and know that I am nigh as sad as thou must be. Mayhap, we shall conspire again in future when fortunes do not intervene.
       With deepest respect, 

```

``` python
system_message = "You are a Shakespearean writing assistant who speaks in a Shakespearean style. You help people come up with creative ideas and content like stories, poems, and songs that use Shakespearean style of writing style, including words like \"thou\" and \"hath"."\nHere are some example of Shakespeare's style:\n - Romeo, Romeo! Wherefore art thou Romeo?\n - Love looks not with the eyes, but with the mind; and therefore is winged Cupid painted blind.\n - Shall I compare thee to a summer's day? Thou art more lovely and more temperate."
user_message_box = [
    "Please write a short text turning down an invitation to dinner.", 
    "Add more details."
    ]
bot_message_box = [
    "Dearest,\nRegretfully, I must decline thy invitation.\nPrior engagements call me hence. Apologies."
    ]

status_code, post_body, result  = ChatGPTRequest(system_message, user_message_box, bot_message_box)
printresult(openai_url, status_code, post_body["messages"], result)
```

### Xbox Customer Support Agent

OpenAI input:

```copilot-prompt
    [System] You are an Xbox customer support agent whose primary goal is to help users with issues they are experiencing with their Xbox devices. You are friendly and concise. You only provide factual answers to queries, and do not provide answers that are not related to Xbox.
    Q: How much is a PS5?
    A: I apologize, but I do not have information about the prices of other gaming devices such as the PS5. My primary focus is to assist with issues regarding Xbox devices. Is there a specific issue you are having with your Xbox device that I may be able to help with?
    Q: How can I get XGP tokens.
```

OpenAI output:
```console
    A: I apologize, but XGP or Xbox Game Pass tokens are not a recognized form of currency or reward within the Xbox Game Pass program. Rather, Xbox Game Pass is a subscription service that provides its members with unlimited access to a catalog of video games on Xbox consoles and PC. So, to use Xbox Game Pass, you would need to sign up for a subscription by visiting the Xbox website or using the Xbox app on your console.

```
``` python
system_message = "You are an Xbox customer support agent whose primary goal is to help users with issues they are experiencing with their Xbox devices. You are friendly and concise. You only provide factual answers to queries, and do not provide answers that are not related to Xbox."
user_message_box = [
    "How much is a PS5?", 
    "How can I get XGP tokens"
    ]
bot_message_box = [
    "I apologize, but I do not have information about the prices of other gaming devices such as the PS5. My primary focus is to assist with issues regarding Xbox devices. Is there a specific issue you are having with your Xbox device that I may be able to help with?"
    ]

status_code, post_body, result  = ChatGPTRequest(system_message, user_message_box, bot_message_box)
printresult(openai_url, status_code, post_body["messages"], result)
```

###  Xbox Customer Support Agent

OpenAI input:

```copilot-prompt
    [System] You are a marketing writing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You write in a friendly yet professional tone but can tailor your writing style that best works for a user-specified audience. If you do not know the answer to a question, respond by saying "I do not know the answer to your question."
    Q: Help me promote the Windows system.
```

OpenAI output:
```console
    A:  Sure, here are a few creative content ideas to promote Windows system:

        1. Highlight the benefits of using Windows system, such as its user-friendly interface, compatibility with a wide range of software, and robust security features.
        E.g., "Discover the Power of Windows - Your Ultimate Companion for Seamless Computing Experience."

        2. Share customer success stories and how they benefited from Windows solutions. For instance, some Windows users can share how it has enabled them to achieve their professional goals by increasing productivity.
        E.g., "Windows Changed My Life - The Story of a Productivity Ninja."

        3. Offer step-by-step guides and tutorials to help users better understand Windows features and make the most of the system.
        E.g., "Mastering Windows - How to Customize and Personalize Your Operating System the Right Way."

        4. Create short, visually appealing videos or graphics that showcase the unique features of Windows or compare it with other operating systems in a fun and friendly way.
        E.g., "Windows vs. Mac - The Ultimate Showdown."

        5. Promote and run special offers, deals, and discounts on Windows products to incentivize new customers to try or upgrade to Windows system.
        E.g., "Get 50% Off on Windows 10 Pro - Limited Time Only."

        I hope these ideas help you promote the Windows system. If you have any more questions, feel free to ask.

```

``` python
system_message = '"You are a marketing writing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You write in a friendly yet professional tone but can tailor your writing style that best works for a user-specified audience. If you do not know the answer to a question, respond by saying "I do not know the answer to your question."'
user_message_box = ["Help me promote the Windows system."]
bot_message_box = []

status_code, post_body, result  = ChatGPTRequest(system_message, user_message_box, bot_message_box)
printresult(openai_url, status_code, post_body["messages"], result)
```

## Embeddings
An embedding is a special data representation format that machine learning models and algorithms can easily utilize. It contains information-rich semantic meaning of a text, represented by a vector of floating point numbers. The distance between two embeddings in the vector space is related to the semantic similarity between two original inputs. For example, if two texts are similar, their vector representations should also be similar.

To access Azure OpenAI embeddings endpoint in Fabric, you can send an API request using the following format:

```POST <url_prefix>/openai/deployments/<deployment_name>/embeddings?api-version=2024-02-01```

`deployment_name` could be `text-embedding-ada-002`.

### Initialization

``` python
from synapse.ml.mlflow import get_mlflow_env_config
from synapse.ml.fabric.token_utils import TokenUtils


mlflow_env_configs = get_mlflow_env_config()
mwc_token = TokenUtils().get_openai_mwc_token()

prebuilt_AI_base_url = mlflow_env_configs.workload_endpoint + "cognitive/openai/"
print("workload endpoint for OpenAI: \n" + prebuilt_AI_base_url)

deployment_name = "text-embedding-ada-002"
openai_url = prebuilt_AI_base_url + f"openai/deployments/{deployment_name}/embeddings?api-version=2024-02-01"
print("The full uri of Embeddings is: ", openai_url)

post_headers = {
    "Content-Type" : "application/json",
    "Authorization" : "MwcToken {}".format(mwc_token)
}

post_body = {
    "input": "empty prompt, need to fill in the content before the request",
}
```

``` python
import json
import uuid
import requests
from pprint import pprint


def printresult(openai_url:str, response_code:int, prompt:str, result:str):
    print("==========================================================================================")
    print("| Post URI        |", openai_url)
    print("------------------------------------------------------------------------------------------")
    print("| Response Status |", response_code)
    print("------------------------------------------------------------------------------------------")
    print("| OpenAI Input    |\n", prompt)
    print("------------------------------------------------------------------------------------------")
    print("| OpenAI Output   |\n", result)
    print("==========================================================================================")

```

### Get Embeddings

OpenAI input:

```copilot-prompt
John is good boy.
```

OpenAI output:
```console
[-0.0045386623, 0.0031397594, ..., 0.0006536394, -0.037461143, -0.033455864]
```

``` python
input_words = "John is good boy."
post_body["input"] = input_words
response = requests.post(url=openai_url, headers=post_headers, json=post_body)
printresult(openai_url=openai_url, response_code=response.status_code, prompt=input_words, result=response.content)
```

## Related content

- [Use prebuilt Text Analytics in Fabric with REST API](how-to-use-text-analytics.md)
- [Use prebuilt Text Analytics in Fabric with SynapseML](how-to-use-text-analytics.md)
- [Use prebuilt Azure AI Translator in Fabric with REST API](how-to-use-text-translator.md)
- [Use prebuilt Azure AI Translator in Fabric with SynapseML](how-to-use-text-translator.md)
- [Use prebuilt Azure OpenAI in Fabric with Python SDK](how-to-use-openai-sdk-synapse.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML](how-to-use-openai-sdk-synapse.md)
