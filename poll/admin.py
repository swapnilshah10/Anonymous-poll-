from django.contrib import admin
from .models import *
from rest_framework.authtoken.admin import TokenAdmin

TokenAdmin.raw_id_fields = ['user']

admin.site.register(Vote)
admin.site.register(Choices)
admin.site.register(Option)

@admin.register(Polls)
class PollAdmin(admin.ModelAdmin):
    date_hierarchy = "pub_date"

