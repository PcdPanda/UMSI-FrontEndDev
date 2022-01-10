from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy

from pets.models import Type, Pet
from pets.forms import TypeForm

# Create your views here.


class MainView(LoginRequiredMixin, View):
    def get(self, request):
        bc = Type.objects.all().count()
        cl = Pet.objects.all()

        ctx = {'type_count': bc, 'pet_list': cl}
        return render(request, 'pets/pet_list.html', ctx)


class TypeView(LoginRequiredMixin, View):
    def get(self, request):
        bl = Type.objects.all()
        ctx = {'type_list': bl}
        return render(request, 'pets/type_list.html', ctx)


# We use reverse_lazy() because we are in "constructor attribute" code
# that is run before urls.py is completely loaded
class TypeCreate(LoginRequiredMixin, View):
    template = 'pets/type_form.html'
    success_url = reverse_lazy('pets:all')

    def get(self, request):
        form = TypeForm()
        ctx = {'form': form}
        return render(request, self.template, ctx)

    def post(self, request):
        form = TypeForm(request.POST)
        if not form.is_valid():
            ctx = {'form': form}
            return render(request, self.template, ctx)

        obj = form.save()
        return redirect(self.success_url)


# TypeUpdate has code to implement the get/post/validate/store flow
# PetUpdate (below) is doing the same thing with no code
# and no form by extending UpdateView
class TypeUpdate(LoginRequiredMixin, View):
    model = Type
    success_url = reverse_lazy('pets:all')
    template = 'pets/type_form.html'

    def get(self, request, pk):
        obj = get_object_or_404(self.model, pk=pk)
        form = TypeForm(instance=obj)
        ctx = {'form': form}
        return render(request, self.template, ctx)

    def post(self, request, pk):
        obj = get_object_or_404(self.model, pk=pk)
        form = TypeForm(request.POST, instance=obj)
        if not form.is_valid():
            ctx = {'form': form}
            return render(request, self.template, ctx)

        form.save()
        return redirect(self.success_url)


class TypeDelete(LoginRequiredMixin, View):
    model = Type
    success_url = reverse_lazy('pets:all')
    template = 'pets/type_confirm_delete.html'

    def get(self, request, pk):
        obj = get_object_or_404(self.model, pk=pk)
        form = TypeForm(instance=obj)
        ctx = {'type': obj}
        return render(request, self.template, ctx)

    def post(self, request, pk):
        obj = get_object_or_404(self.model, pk=pk)
        obj.delete()
        return redirect(self.success_url)


# Take the easy way out on the main table
# These views do not need a form because CreateView, etc.
# Build a form object dynamically based on the fields
# value in the constructor attributes
class PetCreate(LoginRequiredMixin, CreateView):
    model = Pet 
    fields = '__all__'
    success_url = reverse_lazy('pets:all')


class PetUpdate(LoginRequiredMixin, UpdateView):
    model = Pet
    fields = '__all__'
    success_url = reverse_lazy('pets:all')


class PetDelete(LoginRequiredMixin, DeleteView):
    model = Pet
    fields = '__all__'
    success_url = reverse_lazy('pets:all')

# We use reverse_lazy rather than reverse in the class attributes
# because views.py is loaded by urls.py and in urls.py as_view() causes
# the constructor for the view class to run before urls.py has been
# completely loaded and urlpatterns has been processed.

# References

# https://docs.djangoproject.com/en/3.0/ref/class-based-views/generic-editing/#createview
