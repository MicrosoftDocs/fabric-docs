---
title: Use Azure OpenAI with REST API
description: How to use prebuilt Azure OpenAI in Fabric with REST API
ms.reviewer: ssalgado
ms.author: ruxu
author: ruixinxu
ms.topic: how-to
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form:
---

# Use Azure OpenAI in Fabric with REST API (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]
This document shows examples of how to use Azure OpenAI in Fabric using REST API.

## Chat

ChatGPT and GPT-4 are language models optimized for conversational interfaces. To access Azure OpenAI chat endpoints in Fabric, you can send an API request using the following format:

`POST <prebuilt_AI_base_url>/openai/deployments/<deployment_name>/chat/completions?api-version=2023-03-15-preview`

`deployment_name` could be one of:

-   `gpt-35-turbo`
-   `gpt-35-turbo-16k`

### Initialization

You can initialize the process by providing some necessary parameters. These parameters include the `Capacity ID`, `Workspace ID`, and User `AAD Token`, which can be obtained using the `mlflow-plugin` to create the base endpoint for Azure OpenAI models. 

Additionally, the `x-ms-upstream-artifact-id` is the ID of the artifact that is being used and consumed for billing purposes, and the `x-ms-llm-feature-name` is the feature name that is used to track usage and configure the request rate limit. 

``` python
from synapse.ml.mlflow import get_mlflow_env_config

mlflow_env_configs = get_mlflow_env_config()
access_token = mlflow_env_configs.driver_aad_token

prebuilt_AI_base_url = mlflow_env_configs.workload_endpoint + "cognitive/openai/"
print("workload endpoint for OpenAI: \n" + prebuilt_AI_base_url)

deployment_name = "gpt-35-turbo" # deployment name could be `gpt-35-turbo` or `gpt-35-turbo-16k`
openai_url = prebuilt_AI_base_url + f"openai/deployments/{deployment_name}/chat/completions?api-version=2023-03-15-preview"
print("The full uri of ChatGPT is: ", openai_url)

post_headers = {
    "Content-Type" : "application/json",
    "Authorization" : "Bearer {}".format(access_token)
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

```
    [System] You are an AI assistant that helps people find information.
    Q: Does Azure OpenAI support customer managed keys?
```
OpenAI output:

```    
    A: Yes, other Azure Cognitive Services also support customer-managed keys through Azure Key Vault. Azure Key Vault is a cloud service that provides secure storage of keys, passwords, and other secrets. By using Azure Key Vault, you can manage and safeguard your keys and secrets used by your applications and services. 
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

```
    [System] You are an IT Architect. I will provide some details about the functionality of an application or other digital product, and it will be your job to come up with ways to integrate it into the IT landscape. This could involve analyzing business requirements, performing a gap analysis and mapping the functionality of the new system to the existing IT landscape. Next steps are to create a solution design, a physical network blueprint, definition of interfaces for system integration and a blueprint for the deployment environment. 
    A: I need help to integrate a CMS system.
```

OpenAI output:

```
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

```
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

```
    A: Fairly well,
       Thy gracious invitation to dine hath filled my heart with gladness. Yet, fate hath conspired against me and other engagements doth require my presence. 
       Pray, accept my regrets and know that I am nigh as sad as thou must be. Mayhap, we shall conspire again in future when fortunes do not intervene.
       With deepest respect, 

```
``` python
system_message = "You are a Shakespearean writing assistant who speaks in a Shakespearean style. You help people come up with creative ideas and content like stories, poems, and songs that use Shakespearean style of writing style, including words like \"thou\" and \"hath".\nHere are some example of Shakespeare's style:\n - Romeo, Romeo! Wherefore art thou Romeo?\n - Love looks not with the eyes, but with the mind; and therefore is winged Cupid painted blind.\n - Shall I compare thee to a summer's day? Thou art more lovely and more temperate."
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
```
    [System] You are an Xbox customer support agent whose primary goal is to help users with issues they are experiencing with their Xbox devices. You are friendly and concise. You only provide factual answers to queries, and do not provide answers that are not related to Xbox.
    Q: How much is a PS5?
    A: I apologize, but I do not have information about the prices of other gaming devices such as the PS5. My primary focus is to assist with issues regarding Xbox devices. Is there a specific issue you are having with your Xbox device that I may be able to help with?
    Q: How can I get XGP tokens.
```
OpenAI output:
```
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
```
    [System] You are a marketing writing assistant. You help come up with creative content ideas and content like marketing emails, blog posts, tweets, ad copy and product descriptions. You write in a friendly yet professional tone but can tailor your writing style that best works for a user-specified audience. If you do not know the answer to a question, respond by saying "I do not know the answer to your question."
    Q: Help me promote the Windows system.
```
OpenAI output:
```
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

## Completions

The completions endpoint can be used for a wide variety of tasks. It provides a simple but powerful text-in, text-out interface to any of our models. You input some text as a prompt, and the model generates a text completion that attempts to match whatever context or pattern you gave it. For example, if you give the API the prompt, "As Descartes said, I think, therefore", it returns the completion " I am" with high probability.

To access Azure OpenAI completions endpoints in Fabric, you can send an API request using the following format:

`POST <url_prefix>/openai/deployments/<deployment_name>/completions?api-version=2022-12-01`

`deployment_name` could be one of:

-   `text-davinci-003`
-   `code-cushman-002`


### Initialization

``` python
from synapse.ml.mlflow import get_mlflow_env_config

mlflow_env_configs = get_mlflow_env_config()
access_token = mlflow_env_configs.driver_aad_token

prebuilt_AI_base_url = mlflow_env_configs.workload_endpoint + "cognitive/openai/"
print("workload endpoint for OpenAI: \n" + prebuilt_AI_base_url)

deployment_name = "text-davinci-003" # deployment name could be `text-davinci-003` or `code-cushman-002`
openai_url = prebuilt_AI_base_url + f"openai/deployments/{deployment_name}/completions?api-version=2022-12-01"
print("The full uri of Completions is: ", openai_url)

post_headers = {
    "Content-Type" : "application/json",
    "Authorization" : "Bearer {}".format(access_token)
}

post_body = {
    "prompt": "empty prompt, need to fill in the content before the request",
}
```


``` python
import json
import uuid
import requests
from pprint import pprint

def get_model_response_until_empty(prompt:str, openai_url:str):
    post_body["prompt"] = ""

    while True:
        post_body["prompt"] = post_body["prompt"] + prompt
        response = requests.post(openai_url, headers=post_headers, json=post_body)
        if response.status_code == 200:
            prompt = response.json()["choices"][0]["text"]
            if len(prompt) == 0:
                result = post_body["prompt"]
                break
        else:
            print(response.headers)
            result = response.content
            break
    
    return result, response.status_code


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


### Summarize text

OpenAI input:
```
    A neutron star is the collapsed core of a massive supergiant star, which had a total mass of between 10 and 25 solar masses, possibly more if the star was especially metal-rich.[1] Neutron stars are the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars.[2] Neutron stars have a radius on the order of 10 kilometres (6.2 mi) and a mass of about 1.4 solar masses.[3] They result from the supernova explosion of a massive star, combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei.


    Tl;dr
```
OpenAI output:
```
    A neutron star is the collapsed core of a star that has undergone a supernova. These ultra-dense objects are incredibly fascinating due to their strange properties and the potential for phenomena such as extreme gravitational forces and a strong magnetic field.

```
``` python
import requests
import uuid

prompt = "A neutron star is the collapsed core of a massive supergiant star, which had a total mass of between 10 and 25 solar masses, possibly more if the star was especially metal-rich.[1] Neutron stars are the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars.[2] Neutron stars have a radius on the order of 10 kilometres (6.2 mi) and a mass of about 1.4 solar masses.[3] They result from the supernova explosion of a massive star, combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei."
prompt = prompt + "\n\nTl;dr"
result, status = get_model_response_until_empty(prompt=prompt, openai_url=openai_url)
printresult(openai_url=openai_url, response_code=status, prompt=prompt, result=result)
```


### Classify text

OpenAI input:
```
    Classify the following news article into 1 of the following categories: categories: [Business, Tech, Politics, Sport, Entertainment].
    news article: Donna Steffensen Is Cooking Up a New Kind of Perfection. The Internet's most beloved cooking guru has a buzzy new book and a fresh new perspective:

    Classified category:
```
OpenAI output:
```
    Business
```
``` python
prompt = "Classify the following news article into 1 of the following categories: categories: [Business, Tech, Politics, Sport, Entertainment].\n news article: Donna Steffensen Is Cooking Up a New Kind of Perfection. The Internet's most beloved cooking guru has a buzzy new book and a fresh new perspective:"
prompt = prompt + "\n\nClassified category:"
result, status = get_model_response_until_empty(prompt=prompt, openai_url=openai_url)
printresult(openai_url=openai_url, response_code=status, prompt=prompt, result=result)
```


### Natural language to SQL

OpenAI input:
```
    ### Postgres SQL tables, with their properties:
    #
    # Employee(id, name, department_id)
    # Department(id, name, address)
    # Salary_Payments(id, employee_id, amount, date)
    #
    ### A query to list the names of the departments which employed more than 10 employees in the last 3 months
```
OpenAI output:
``` SQL
    SELECT DISTINCT Department.name FROM Employee INNER JOIN Department ON Employee.department_id = Department.id ORDER BY Department.name ASC;

```
``` python
# prompt =
### Postgres SQL tables, with their properties:
#
# Employee(id, name, department_id)
# Department(id, name, address)
# Salary_Payments(id, employee_id, amount, date)
#
### A query to list the names of the departments which employed more than 10 employees in the last 3 months
prompt = "### Postgres SQL tables, with their properties:\n#\n# Employee(id, name, department_id)\n# Department(id, name, address)\n# Salary_Payments(id, employee_id, amount, date)\n#\n### A query to list the names of the departments which employed more than 10 employees in the last 3 months"
prompt = prompt + "\n\nSELECT"
result, status = get_model_response_until_empty(prompt=prompt, openai_url=openai_url)
printresult(openai_url=openai_url, response_code=status, prompt=prompt, result=result)
```


### Natural language to code (Python/Java/Scala/C++/matlab)

OpenAI input:

```
    Write a quick sort function using Python.
```
OpenAI output:

``` python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    else:
        pivot = arr[-1]
        left = [i for i in arr[:-1] if i <= pivot]
        right = [j for j in arr[:-1] if j > pivot]
        return quick_sort(left) + [pivot] + quick_sort(right) 
```


``` python
prompt = "Write a quick sort function using Python."
result, status = get_model_response_until_empty(prompt=prompt, openai_url=openai_url)
printresult(openai_url=openai_url, response_code=status, prompt=prompt, result=result)
```


### Generate new product names

OpenAI input:
```
    Product description: A home milkshake maker
    Seed words: fast, healthy, compact.
    Product names: HomeShaker, Fit Shaker, QuickShake, Shake Maker

    Product description: A pair of shoes that can fit any foot size.
    Seed words: adaptable, fit, omni-fit.
```
OpenAI output:
```
    Product names: AllFits, OmniFits, PerfectFits, ShoeFits

```

``` python
# prompt =
# Product description: A home milkshake maker
# Seed words: fast, healthy, compact.
# Product names: HomeShaker, Fit Shaker, QuickShake, Shake Maker
#
# Product description: A pair of shoes that can fit any foot size.
# Seed words: adaptable, fit, omni-fit.
prompt = "Product description: A home milkshake maker\nSeed words: fast, healthy, compact.\nProduct names: HomeShaker, Fit Shaker, QuickShake, Shake Maker\n\nProduct description: A pair of shoes that can fit any foot size.\nSeed words: adaptable, fit, omni-fit."
result, status = get_model_response_until_empty(prompt=prompt, openai_url=openai_url)
printresult(openai_url=openai_url, response_code=status, prompt=prompt, result=result)
```


### English to French

OpenAI input:
```
    English: I do not speak French.
    French: Je ne parle pas français.

    English: See you later!
    French: À tout à l'heure!

    English: Where is a good restaurant?
    French: Où est un bon restaurant?

    English: What rooms do you have available?
    French: Quelles chambres avez-vous de disponible?

    English: I want to say nothing.
```
OpenAI output:
```
    French: Je ne veux rien dire.

```
``` python
prompt = "English: I do not speak French.\nFrench: Je ne parle pas français.\n\nEnglish: See you later!\nFrench: À tout à l'heure!\n\nEnglish: Where is a good restaurant?\nFrench: Où est un bon restaurant?\n\nEnglish: What rooms do you have available?\nFrench: Quelles chambres avez-vous de disponible?\n\nEnglish: I want to say nothing.\n"
result, status = get_model_response_until_empty(prompt=prompt, openai_url=openai_url)
printresult(openai_url=openai_url, response_code=status, prompt=prompt, result=result)
```


### Parse unstructured data

OpenAI input:
```
    There are many fruits that were found on the recently discovered planet Goocrux. There are neoskizzles that grow there, which are purple and taste like candy. There are also loheckles, which are a grayish blue fruit and are very tart, a little bit like a lemon. Pounits are a bright green color and are more savory than sweet. There are also plenty of loopnovas which are a neon pink flavor and taste like cotton candy. Finally, there are fruits called glowls, which have a very sour and bitter taste which is acidic and caustic, and a pale orange tinge to them.

    Please make a table summarizing the fruits from Goocrux
    | Fruit | Color | Flavor |
    | Neoskizzles | Purple | Sweet |
    | Loheckles | Grayish blue | Tart |
```
OpenAI output:
```
    | Glowls | Pale orange | Sour and bitter |
```
``` python
prompt = "There are many fruits that were found on the recently discovered planet Goocrux. There are neoskizzles that grow there, which are purple and taste like candy. There are also loheckles, which are a grayish blue fruit and are very tart, a little bit like a lemon. Pounits are a bright green color and are more savory than sweet. There are also plenty of loopnovas which are a neon pink flavor and taste like cotton candy. Finally, there are fruits called glowls, which have a very sour and bitter taste which is acidic and caustic, and a pale orange tinge to them.\n\nPlease make a table summarizing the fruits from Goocrux\n| Fruit | Color | Flavor |\n| Neoskizzles | Purple | Sweet |\n| Loheckles | Grayish blue | Tart |"
result, status = get_model_response_until_empty(prompt=prompt, openai_url=openai_url)
printresult(openai_url=openai_url, response_code=status, prompt=prompt, result=result)
```

### Classification

OpenAI input:
```
    The following is a list of companies and the categories they fall into

    Facebook: Social media, Technology
    LinkedIn: Social media, Technology, Enterprise, Careers
    Uber: Transportation, Technology, Marketplace
    Unilever: Conglomerate, Consumer Goods
    Mcdonalds: Food, Fast Food, Logistics, Restaurants
    FedEx:
```
OpenAI output:
```
    FedEx: Delivery, Courier, Logistics
```

``` python
prompt = "The following is a list of companies and the categories they fall into\n\nFacebook: Social media, Technology\nLinkedIn: Social media, Technology, Enterprise, Careers\nUber: Transportation, Technology, Marketplace\nUnilever: Conglomerate, Consumer Goods\nMcdonalds: Food, Fast Food, Logistics, Restaurants\nFedEx:"
result, status = get_model_response_until_empty(prompt=prompt, openai_url=openai_url)
printresult(openai_url=openai_url, response_code=status, prompt=prompt, result=result)
```


## Embeddings
An embedding is a special data representation format that machine learning models and algorithms can easily utilize. It contains information-rich semantic meaning of a text, represented by a vector of floating point numbers. The distance between two embeddings in the vector space is related to the semantic similarity between two original inputs. For example, if two texts are similar, their vector representations should also be similar.

To access Azure OpenAI embeddings endpoint in Fabric, you can send an API request using the following format:

```POST <url_prefix>/openai/deployments/<deployment_name>/embeddings?api-version=2022-12-01```

`deployment_name` could be `text-embedding-ada-002`.

### Initialization

``` python
from synapse.ml.mlflow import get_mlflow_env_config

mlflow_env_configs = get_mlflow_env_config()
access_token = mlflow_env_configs.driver_aad_token

prebuilt_AI_base_url = mlflow_env_configs.workload_endpoint + "cognitive/openai/"
print("workload endpoint for OpenAI: \n" + prebuilt_AI_base_url)

deployment_name = "text-embedding-ada-002"
openai_url = prebuilt_AI_base_url + f"openai/deployments/{deployment_name}/embeddings?api-version=2022-12-01"
print("The full uri of Embeddings is: ", openai_url)

post_headers = {
    "Content-Type" : "application/json",
    "Authorization" : "Bearer {}".format(access_token)
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
```
John is good boy.
```

OpenAI output:
```
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
