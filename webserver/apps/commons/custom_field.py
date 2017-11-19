from rest_framework import serializers
from rest_framework.fields import empty
from rest_framework.utils import html


class MyDictField(serializers.DictField):
    def get_value(self, dictionary):
        if html.is_html_input(dictionary):
            data = html.parse_html_dict(dictionary, prefix=self.field_name)
        data = dictionary.get(self.field_name, empty)
        print('my dict field %s' % data)
        return data

        # def to_representation(self, value):
        #     return value.tag


class MyListField(serializers.ListField):
    def get_value(self, dictionary):
        if self.field_name not in dictionary:
            if getattr(self.root, 'partial', False):
                return empty
        # We override the default field access in order to support
        # lists in HTML forms.
        if html.is_html_input(dictionary):
            val = dictionary.getlist(self.field_name, [])
            if len(val) > 0:
                # Support QueryDict lists in HTML input.
                # Select val[0] to temporarily deal with parsing problem
                return val[0]
            html_val = html.parse_html_list(dictionary, prefix=self.field_name)
            return html_val
        return_value = dictionary.get(self.field_name, empty)
        return return_value

    def to_representation(self, data):
        return super(MyListField, self).to_representation(data)