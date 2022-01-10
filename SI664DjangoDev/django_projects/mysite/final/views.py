from django.shortcuts import render

# Create your views here.
import os
import hashlib
import codecs
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from final.utils import AllowView
from final.utils import markscore, failscore, transform_code
from final.utils import getsecrets, getviews, getscores, getpoints, getsecret


# Copyright (c) Charles R. Severance 2019 - All Rights Reserved

class CodeView(AllowView) :
    def get(self, request):
        retval = '\n# urls.py:\n\n'
        base_path = os.path.dirname(os.path.abspath(__file__))
        fname = os.path.join(base_path, 'urls.py')
        txt = open(fname).read()
        retval = retval + transform_code(request, txt, secrets)
        retval = retval + '\n\n# views.py:\n\n'
        txt = open(__file__).read()
        retval = retval + transform_code(request, txt, secrets)
        return HttpResponse(retval, content_type='text/plain; charset=UTF-8')

class ScoreView(AllowView) :
    def get(self, request):
        scores = getscores(request)
        views = getviews(request)
        points = getpoints(scores, views)
        return render(request, 'final/scores.html',
            {'scores' : scores, 'views': views, 'points': points}
        )

class SecretsView(AllowView):
    def get(self, request):
        secrets = getsecrets(request)
        secrets = { k:v for k,v in secrets.items() if not k.startswith('hide') }
        return JsonResponse(secrets)

# This one is trivial
class P00View(AllowView) :
    def get(self, request):
        return markscore(request, '00')


# This one is very easy
class P10View(AllowView) :
    def get(self, request, value):
        if value == int('43') :
            return markscore(request, '10')
        return failscore(request, '10')

class P20View(AllowView) :
    def get(self, request):
        return render(request, 'final/puzzle20.html')

    def post(self, request) :
        inpval = request.POST.get('inpval', False)
        if inpval and inpval.isnumeric() and inpval == '43' :
            return markscore(request, '20')
        return failscore(request, '20')

class P31View(AllowView) :
    def get(self, request):
        value = str(getsecret(request,'hide_p31'))
        response = HttpResponse("""<h1>Puzzle 31 🍪</h1><form method="post">
<input type="text" name="data">
<input type="submit">
</form>""")
        response.set_cookie('puzzle31', value, path='/')
        return response

    def post(self, request) :
        value = str(getsecret(request,'hide_p31'))
        if value == request.POST['data'] :
            return markscore(request, '31')
        return failscore(request, '31')

class P40View(AllowView) :
    def get(self, request):
        step = 1
        request.session['p4step'] = step
        return render(request, 'final/puzzle40.html', {'step': step})

    def post(self, request) :
        step = request.session.get('p4step', 1)

        if step == 1 and request.POST.get('guess') == 'B':
            step = step + 1
            request.session['p4step'] = step
            return render(request, 'final/puzzle40.html', {'step': step})

        if step == 2 and request.POST.get('guess') == 'A':
            step = step + 1
            request.session['p4step'] = step
            return render(request, 'final/puzzle40.html', {'step': step})

        if step == 3 and request.POST.get('guess') == 'T':
            return markscore(request, '40')

        return redirect(request.path)

class P50View(AllowView) :
    def get(self, request):
        prehash = 'django'
        return render(request, 'final/puzzle50.html', {'prehash': prehash})

    def post(self, request) :
        prehash = 'django'
        hashed = hashlib.sha1(bytes(prehash, "utf-8")).hexdigest()
        print(hashed)

        if hashed == request.POST['hashval'] :
            return markscore(request, '50')
        return failscore(request, '50')

class P61View(AllowView) :
    def get(self, request):
        return render(request, 'final/puzzle30.html')

    def post(self, request) :
        if ( request.POST.get('tweaked') == '43' ):
            return markscore(request, '61')
        return failscore(request, '61')

class P70View(AllowView) :
    def get(self, request, parm):
        secrets = getsecrets(request)
        if parm == secrets["p70word"] :
            return markscore(request, '70')
        return failscore(request, '70')

class P82View(AllowView) :
    def get(self, request):
        hv = hex(secrets['hide_p80']);
        return render(request, 'final/puzzle82.html', {'hex': hv})

    def post(self, request) :
        value = secrets['hide_p80'];
        guess = request.POST.get('guess')
        if int(guess) == value :
            return markscore(request, '82')
        return failscore(request, '82')

class P91View(AllowView) :
    def get(self, request):
        return render(request, 'final/puzzle91.html')

    def post(self, request) :
        first = request.POST.get('first')
        second = request.POST.get('second')
        third = request.POST.get('third')
        if len(first) < 2 : return failscore(request, '91')
        if len(second) != 2 : return failscore(request, '91')
        try:
            ifv = int(first)
            return failscore(request, '91')
        except:
            pass

        try:
            sfv = int(second)
        except:
            return failscore(request, '91')

        if third == 'moocs' :
            return markscore(request, '91')
        return failscore(request, '91')

# A hashing function that uses addition and multiplication to cause the hash
# to differ for strings with identical characters but in different orders
# https://en.wikipedia.org/wiki/Collision_resistance
def compute_hash(txt, mod_val) :
    if len(txt) < 3 or len(txt) > 10 : return (False, 'input length error')
    hv = 0
    pos = 0
    detail = list()
    for let in txt:
        pos = (pos + 1) % mod_val
        hv = (hv + (pos * ord(let))) % 1000000
        detail.append( (let, pos, ord(let), hv) )
    return (hv, detail)

# The boss at the end of a level...
class BossView(AllowView) :
    def get(self, request):
        plain1 = request.GET.get('plain1', '')
        plain2 = request.GET.get('plain2', '')
        (hv1, detail1) = compute_hash(plain1, int('4') )
        (hv2, detail2) = compute_hash(plain2, int('4') )
        message = ''
        if hv1 is False or hv2 is False:
            message = 'Please enter strings between 3 and 10 characters in length'
        elif plain1 == plain2 :
            message = 'Please two different strings'
        elif hv1 == hv2 :
            return markscore(request, 'boss')
        else:
            message = 'Your hash values do not match'

        ctx = {'message': message, 'plain1': plain1, 'plain2': plain2, 
                'hv1': hv1, 'hv2': hv2, 'detail1': detail1, 'detail2': detail2}
        return render(request, 'final/puzzlehash.html', ctx)