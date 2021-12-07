#!/bin/bash

echo 84288664 | sudo docker build . -t frontend-bestcombo

#sudo docker tag frontend-bestcombo gcr.io/melodic-splicer-331419/frontend-bestcombo
sudo docker tag frontend-bestcombo:latest 692705717345.dkr.ecr.us-east-2.amazonaws.com/frontend:latest

#/home/welson/devtools/google-cloud-sdk/bin/gcloud auth print-access-token | sudo docker login -u oauth2accesstoken --password-stdin https://gcr.io
aws ecr get-login-password --region us-east-2 | sudo docker login --username AWS --password-stdin 692705717345.dkr.ecr.us-east-2.amazonaws.com

sudo docker push 692705717345.dkr.ecr.us-east-2.amazonaws.com/frontend:latest
