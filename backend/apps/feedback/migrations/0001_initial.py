# Generated migration

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('rating', models.IntegerField(choices=[(1, '⭐ Poor'), (2, '⭐⭐ Fair'), (3, '⭐⭐⭐ Good'), (4, '⭐⭐⭐⭐ Very Good'), (5, '⭐⭐⭐⭐⭐ Excellent')], default=5)),
                ('message', models.TextField()),
                ('is_featured', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'feedback',
                'ordering': ['-created_at'],
            },
        ),
    ]
