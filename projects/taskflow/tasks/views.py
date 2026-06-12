from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    @action(detail=False, methods=['get'])
    def by_status(self, request):
        status = request.query_params.get('status')
        if status:
            tasks = Task.objects.filter(status=status)
            serializer = self.get_serializer(tasks, many=True)
            return Response(serializer.data)
        return Response([])
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        return Response({
            'total': Task.objects.count(),
            'completed': Task.objects.filter(status='completed').count(),
            'pending': Task.objects.filter(status='pending').count(),
            'in_progress': Task.objects.filter(status='in_progress').count(),
        })
