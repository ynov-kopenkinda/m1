# Generated by Django 4.1.2 on 2022-10-21 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('furniture_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='furniture',
            name='state',
            field=models.CharField(choices=[('NEW', 'New'), ('USD', 'Used'), ('BRK', 'Broken'), ('UNS', 'Unsuitable')], default='NEW', max_length=3),
        ),
        migrations.AddField(
            model_name='furniture',
            name='status',
            field=models.CharField(choices=[('AVL', 'Available'), ('BGT', 'Bought')], default='AVL', max_length=3),
        ),
    ]