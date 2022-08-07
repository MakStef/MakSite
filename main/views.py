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
    }
