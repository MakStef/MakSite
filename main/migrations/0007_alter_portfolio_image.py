# Generated by Django 4.0.3 on 2022-08-18 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_portfolio_is_first'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfolio',
            name='image',
            field=models.ImageField(blank=True, upload_to='portfolios', verbose_name='Image (16x10)'),
        ),
    ]
