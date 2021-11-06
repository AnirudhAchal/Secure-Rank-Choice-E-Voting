from rest_framework import serializers
from .models import User


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only=True)
    user_name = serializers.CharField(read_only=True)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    about = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ('email', 'user_name', 'first_name', 'last_name', 'about')


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    about = serializers.CharField(required=False)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'user_name', 'password', 'first_name', 'last_name', 'about')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
