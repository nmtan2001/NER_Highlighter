from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
import json
from django.contrib.auth.models import User #####
from django.http import JsonResponse , HttpResponse ####

import spacy 
model = spacy.load('model-best')

def index(request):
    return HttpResponse("Hello, world. You're at the NER index.")

def get_ents(request):
    par = request.GET.get('par', '')
    # par = request.POST.get('par', '')
    print('par:', par)
    doc = model(str(par))
    data = {}

    for ent in doc.ents:
        label = ent.label_
        text = ent.text
        
        if label not in data:
            data[label] = []
        
        data[label].append(text)

    # Convert single-item lists to a single string if needed
    for label, values in data.items():
        if len(values) == 1:
            data[label] = values[0]
    
    print('json-data to be sent: ', data)

    return JsonResponse(data)
