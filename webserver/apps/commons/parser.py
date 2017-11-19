#  References from
#  https://stackoverflow.com/questions/25291466/django-rest-framework-file-upload-with-nested-writable-serializers
from django.http import QueryDict
from formencode.variabledecode import variable_decode
from rest_framework import parsers


class MultipartFormencodeParser(parsers.MultiPartParser):
    def parse(self, stream, media_type=None, parser_context=None):
        result = super().parse(
            stream,
            media_type=media_type,
            parser_context=parser_context
        )
        data = variable_decode(result.data)

        qdict = QueryDict('', mutable=True)
        qdict.update(data)
        data_and_files = parsers.DataAndFiles(qdict, result.files)
        
        return data_and_files