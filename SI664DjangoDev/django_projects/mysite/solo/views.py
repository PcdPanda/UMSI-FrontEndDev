from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import View
# Create your views here.
class SoloView(LoginRequiredMixin, View):
    template_name = "solo/solo.html"

    def get(self, request):        
        ctx = {"result": ""}
        return render(request, self.template_name, ctx)

    def post(self, request):
        field1 = request.POST["field1"].lower()
        field2 = request.POST["field2"].lower()
        fields = (field1 + " " + field2)[::-1]
        ctx = {"result": fields}
        return render(request, self.template_name, ctx)