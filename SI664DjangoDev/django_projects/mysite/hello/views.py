from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def myview(request):
    if "count" not in request.COOKIES.keys():
        count = 1        
    else:
        count = int(request.COOKIES["count"])
    resp = HttpResponse("view count={}".format(count))
    resp.set_cookie('count', str(count + 1))
    resp.set_cookie('dj4e_cookie', '534345ff', max_age=1000)
    return resp

