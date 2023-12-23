from django.shortcuts import render
import random
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

@api_view(['GET'])
def generateGrid(request):
    # Generating a random grid with exactly 20 occurrences of '1'
    random_grid = [[0] * 10 for _ in range(10)]  # Initialize with zeros

    # Set exactly 20 occurrences of '1' randomly
    for _ in range(20):
        while True:
            row = random.randint(0, 9)
            col = random.randint(0, 9)
            
            if random_grid[row][col] == 0:
                random_grid[row][col] = 1
                break

    # Serializing the grid data
    serialized_data = {
        'grid': random_grid
    }

    # Create a Response object and set the renderer to JSONRenderer
    response = Response(serialized_data)
    response.accepted_renderer = JSONRenderer()
    response.accepted_media_type = "application/json"
    response.renderer_context = {}

    return response
