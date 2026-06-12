from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        posts = Post.objects.filter(featured=True)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category = request.query_params.get('category')
        if category:
            posts = Post.objects.filter(category=category)
            serializer = self.get_serializer(posts, many=True)
            return Response(serializer.data)
        return Response([])
