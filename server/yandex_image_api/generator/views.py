import base64
import time
import json
import requests
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response

# Конфигурация Яндекс.Cloud
FOLDER_ID = 'b1gm6n4o41rjlou67901'
MODEL_URI = f'art://{FOLDER_ID}/yandex-art/latest'
API_URL = "https://llm.api.cloud.yandex.net/foundationModels/v1/imageGenerationAsync"

# OAuth-токен сервисного аккаунта (его ты получаешь 1 раз в Яндекс.Cloud)
# ⚠️ Храни в настройках Django или в .env
OAUTH_TOKEN = "y0__xDTy76jBxjB3RMghKWW_xN10hH0V6gwdaJEcwRluWfCNnIitA"  

def get_iam_token():
    """
    Запрашивает IAM-токен у Яндекс.Cloud по OAuth-токену
    """
    url = "https://iam.api.cloud.yandex.net/iam/v1/tokens"
    headers = {"Content-Type": "application/json"}
    data = json.dumps({"yandexPassportOauthToken": OAUTH_TOKEN})

    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        return response.json()["iamToken"]
    else:
        raise Exception(f"Ошибка получения IAM токена: {response.text}")

def send_image_generation_request(prompt_data, iam_token):
    headers = {
        "Authorization": f"Bearer {iam_token}",
        "Content-Type": "application/json"
    }
    response = requests.post(API_URL, headers=headers, data=json.dumps(prompt_data))
    if response.status_code == 200:
        return response.json()['id']
    return {"error": response.text}

def get_result_url(request_id):
    return f"https://llm.api.cloud.yandex.net:443/operations/{request_id}"

def check_status(request_id, iam_token):
    headers = {
        "Authorization": f"Bearer {iam_token}",
        "Content-Type": "application/json"
    }
    response = requests.get(get_result_url(request_id), headers=headers)
    if response.status_code == 200:
        response_data = response.json()
        if 'response' in response_data and 'image' in response_data['response']:
            return {"image_data": response_data['response']['image']}
    return None

def generate_image(title):
    iam_token = get_iam_token()  # Получаем свежий токен

    prompt_data = {
        "modelUri": MODEL_URI,
        "generationOptions": {
            "seed": "500",
            "aspectRatio": {"widthRatio": "3", "heightRatio": "3"}
        },
        "messages": [
            {"weight": "1", "text": f"{title}, HD, фотореализм, кинематографичная сцена"}
        ]
    }
    request_id = send_image_generation_request(prompt_data, iam_token)
    if isinstance(request_id, dict) and "error" in request_id:
        return request_id

    for _ in range(15):
        image_result = check_status(request_id, iam_token)
        if image_result:
            return image_result
        time.sleep(10)

    return {"error": "Не удалось получить изображение"}

class YandexImageGenerateView(APIView):
    def post(self, request):
        prompt = request.data.get('prompt')
        if not prompt:
            return Response({"error": "Prompt is required"}, status=400)

        result = generate_image(prompt)

        if "image_data" in result:
            image_bytes = base64.b64decode(result['image_data'])
            filename = "media/generated.png"
            with open(filename, "wb") as f:
                f.write(image_bytes)
            timeStamp = int(timezone.now().timestamp())
            return Response({"image_url": f"http://127.0.0.1:8000/{filename}?t={timeStamp}"})
        return Response(result, status=500)
