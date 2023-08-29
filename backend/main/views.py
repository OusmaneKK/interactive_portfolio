from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse

# Create your views here.

def register_view(request):
    if request.method == 'POST':
        return redirect('login')
    return render(request, 'registration/register.html')

def login_view(request):
    if request.method =='POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            pass
    return render(request, 'registration/login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

def check_authentication(request):
    is_logged = request.user.is_authenticated
    return JsonResponse({'isLogged': is_logged})
