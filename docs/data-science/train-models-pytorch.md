---
title: How to train models with PyTorch
description: Learn how to train models with PyTorch, a framework that’s frequently used for applications such as computer vision and natural language processing.
ms.reviewer: ssalgado
ms.author: negust
author: nelgson
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: Train models with PyTorch
---

# How to train models with PyTorch in Microsoft Fabric

[PyTorch](https://pytorch.org/) is a machine learning framework based on the Torch library. It's frequently used for applications such as computer vision and natural language processing. In this article, we go through an example of how you train and track the iterations of your PyTorch model.



## Install PyTorch

To get started with PyTorch, you must ensure that it's installed within your notebook. You can install or upgrade the version of PyTorch on your environment using the following command:

```shell
%pip install torch
```

## Set up the machine learning experiment

Next, you create a machine learning experiment using the MLFLow API. The MLflow set_experiment() API creates a new machine learning experiment if it doesn't already exist.

```python
import mlflow

mlflow.set_experiment("sample-pytorch")
```

## Train and evaluate a Pytorch model

After the experiment has been created, the code below loads the MNSIT dataset, generates our test and training datasets, and creates a training function.

```python
import os
import torch
import torch.nn as nn
from torch.autograd import Variable
import torchvision.datasets as dset
import torchvision.transforms as transforms
import torch.nn.functional as F
import torch.optim as optim


## load mnist dataset
root = "/tmp/mnist"
if not os.path.exists(root):
    os.mkdir(root)

trans = transforms.Compose(
    [transforms.ToTensor(), transforms.Normalize((0.5,), (1.0,))]
)
# if not exist, download mnist dataset
train_set = dset.MNIST(root=root, train=True, transform=trans, download=True)
test_set = dset.MNIST(root=root, train=False, transform=trans, download=True)

batch_size = 100

train_loader = torch.utils.data.DataLoader(
    dataset=train_set, batch_size=batch_size, shuffle=True
)
test_loader = torch.utils.data.DataLoader(
    dataset=test_set, batch_size=batch_size, shuffle=False
) 

print("==>>> total trainning batch number: {}".format(len(train_loader)))
print("==>>> total testing batch number: {}".format(len(test_loader)))

## network

class LeNet(nn.Module):
    def __init__(self):
        super(LeNet, self).__init__()
        self.conv1 = nn.Conv2d(1, 20, 5, 1)
        self.conv2 = nn.Conv2d(20, 50, 5, 1)
        self.fc1 = nn.Linear(4 * 4 * 50, 500)
        self.fc2 = nn.Linear(500, 10)

    def forward(self, x): 
        x = F.relu(self.conv1(x))
        x = F.max_pool2d(x, 2, 2)
        x = F.relu(self.conv2(x))
        x = F.max_pool2d(x, 2, 2)
        x = x.view(-1, 4 * 4 * 50)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

    def name(self):
        return "LeNet"

## training
model = LeNet()

optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

criterion = nn.CrossEntropyLoss()

for epoch in range(1):
    # trainning
    ave_loss = 0
    for batch_idx, (x, target) in enumerate(train_loader):
        optimizer.zero_grad()
        x, target = Variable(x), Variable(target)
        out = model(x)
        loss = criterion(out, target)
        ave_loss = (ave_loss * batch_idx + loss.item()) / (batch_idx + 1)
        loss.backward()
        optimizer.step()
        if (batch_idx + 1) % 100 == 0 or (batch_idx + 1) == len(train_loader):
            print(
                "==>>> epoch: {}, batch index: {}, train loss: {:.6f}".format(
                    epoch, batch_idx + 1, ave_loss
                )
            )
    # testing
    correct_cnt, total_cnt, ave_loss = 0, 0, 0
    for batch_idx, (x, target) in enumerate(test_loader):
        x, target = Variable(x, volatile=True), Variable(target, volatile=True)
        out = model(x)
        loss = criterion(out, target)
        _, pred_label = torch.max(out.data, 1)
        total_cnt += x.data.size()[0]
        correct_cnt += (pred_label == target.data).sum()
        ave_loss = (ave_loss * batch_idx + loss.item()) / (batch_idx + 1)

        if (batch_idx + 1) % 100 == 0 or (batch_idx + 1) == len(test_loader):
            print(
                "==>>> epoch: {}, batch index: {}, test loss: {:.6f}, acc: {:.3f}".format(
                    epoch, batch_idx + 1, ave_loss, correct_cnt * 1.0 / total_cnt
                )
            )

torch.save(model.state_dict(), model.name())
```

## Log model with MLflow

Now, you start an MLflow run and track the results within our machine learning experiment.

```python
with mlflow.start_run() as run:
    print("log pytorch model:")
    mlflow.pytorch.log_model(
        model, "pytorch-model", registered_model_name="sample-pytorch"
    )

    model_uri = "runs:/{}/pytorch-model".format(run.info.run_id)
    print("Model saved in run %s" % run.info.run_id)
    print(f"Model URI: {model_uri}")
```

The code above creates a run with the specified parameters and logs the run within the sample-pytorch experiment. This snippet creates a new model called sample-pytorch.  

## Load and evaluate the model

Once the model is saved, it can also be loaded for inferencing.  

```python
# Inference with loading the logged model
loaded_model = mlflow.pytorch.load_model(model_uri)
print(type(loaded_model))

correct_cnt, total_cnt, ave_loss = 0, 0, 0
for batch_idx, (x, target) in enumerate(test_loader):
    x, target = Variable(x, volatile=True), Variable(target, volatile=True)
    out = loaded_model(x)
    loss = criterion(out, target)
    _, pred_label = torch.max(out.data, 1)
    total_cnt += x.data.size()[0]
    correct_cnt += (pred_label == target.data).sum()
    ave_loss = (ave_loss * batch_idx + loss.item()) / (batch_idx + 1)

    if (batch_idx + 1) % 100 == 0 or (batch_idx + 1) == len(test_loader):
        print(
            "==>>> epoch: {}, batch index: {}, test loss: {:.6f}, acc: {:.3f}".format(
                epoch, batch_idx + 1, ave_loss, correct_cnt * 1.0 / total_cnt
            )
        )
```

## Related content

- Learn about [machine learning models](machine-learning-model.md).
- Learn about [machine learning experiments](machine-learning-experiment.md).
