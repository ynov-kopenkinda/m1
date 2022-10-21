# Generated by Django 4.1.2 on 2022-10-21 11:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('style', models.CharField(choices=[('POP', 'Pop'), ('RAP', 'Rap'), ('CLS', 'Classic'), ('RCK', 'Rock'), ('UND', 'Undefined')], default='UND', max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('duration', models.DurationField()),
                ('release_date', models.DateField()),
                ('artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp1.artist')),
            ],
        ),
    ]
