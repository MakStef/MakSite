from django.shortcuts import render
from django.views.generic import View, TemplateView
from django.http import JsonResponse

from .models import Portfolio


# Create your views here.
class ExtraContextMixin(object):
    extra_context: dict
    site_description: str
    site_keywords: str

    def get_context_data(self, **kwargs):
        context = super(ExtraContextMixin, self).get_context_data(**kwargs)
        context.update(self.extra_context)
        context.update(self.description)
        context.update(self.keywords)
        return context


class PortfolioJsonListView(View):
    def get(self, *args, **kwargs):
        until = kwargs.get("num_portfolios")
        portfolios = list(Portfolio.objects.values().order_by("-pk"))[:until]
        return JsonResponse({'portfolios': portfolios}, safe=False)


class IndexView(TemplateView, ExtraContextMixin):
    template_name = 'main/index.html'
    site_description = "Maksym Stefaniv is freelance python django web developer, can create responsive layouts, optimize SEO, do some design."
    site_keywords = """
                maksite,
                makstef,
                maksym,
                stefaniv,
                web design,
                web development,
                free lance web dev,
                python web dev,
                fullstack web dev,
                web dev in python,
                freelancer web dev,
                web dev for beginners,
    """
    extra_context = {
        'portfolios': Portfolio.objects.all(),
        "site_description": site_description,
        "site_keywords": site_keywords,
    }


class HelpView(TemplateView, ExtraContextMixin):
    template_name = 'main/help.html'
    site_description = "Maksym Stefaniv's help page that provides some more information."
    site_keywords = """
        maksite help,
        maksym stefaniv help,
        help page,
        maksite help,
        makstef help,
    """

    extra_context = {
        'portfolios': Portfolio.objects.all(),
        "site_description": site_description,
        "site_keywords": site_keywords,
    }


def handler400(request, exception, template_name='400.html'):
    return render(request, template_name)


def handler403(request, exception, template_name='403.html'):
    return render(request, template_name)


def handler404(request, exception, template_name='404.html'):
    return render(request, template_name)


def handler500(request, exception, template_name='500.html'):
    return render(request, template_name)
