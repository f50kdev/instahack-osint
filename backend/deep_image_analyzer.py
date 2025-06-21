import sys
import json
import hashlib
from pathlib import Path
from datetime import datetime

import exifread
import piexif
from PIL import Image
import easyocr
import torch
from transformers import CLIPProcessor, CLIPModel
import requests
from geopy.geocoders import Nominatim
import cv2
import numpy as np

# --- Funções auxiliares ---
def extract_exif(image_path):
    exif_data = {}
    gps = {}
    camera_info = {}
    dt = None
    try:
        with open(image_path, 'rb') as f:
            tags = exifread.process_file(f, details=False)
            for tag in tags:
                if tag.startswith('GPS'):
                    gps[tag] = str(tags[tag])
                elif tag in ['Image Model', 'Image Make', 'Image Software']:
                    camera_info[tag] = str(tags[tag])
                elif tag == 'EXIF DateTimeOriginal':
                    dt = str(tags[tag])
    except Exception as e:
        pass
    return camera_info, gps, dt

def get_gps_decimal(gps):
    # Converte EXIF GPS para decimal
    def _convert(coord, ref):
        d, m, s = [float(x.split('/')[0]) / float(x.split('/')[1]) if '/' in x else float(x) for x in coord.replace('[','').replace(']','').split(',')]
        result = d + m/60 + s/3600
        if ref in ['S', 'W']:
            result = -result
        return result
    try:
        lat = _convert(gps['GPS GPSLatitude'], gps['GPS GPSLatitudeRef'])
        lon = _convert(gps['GPS GPSLongitude'], gps['GPS GPSLongitudeRef'])
        return lat, lon
    except Exception:
        return None, None

def geocode_coords(lat, lon):
    try:
        geolocator = Nominatim(user_agent="deep_image_analyzer")
        location = geolocator.reverse((lat, lon), language='en')
        return location.address if location else None
    except Exception:
        return None

def ocr_image(image_path):
    try:
        reader = easyocr.Reader(['en', 'pt', 'es', 'fr', 'de', 'it'])
        result = reader.readtext(image_path, detail=0)
        return ' '.join(result)
    except Exception:
        return None

def detect_language(text):
    try:
        from langdetect import detect
        return detect(text)
    except Exception:
        return None

def describe_image_clip(image_path):
    try:
        model = CLIPModel.from_pretrained("openai/clip-vit-base-patch16")
        processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch16")
        image = Image.open(image_path).convert("RGB")
        prompts = [
            "a photo of a city",
            "a photo of a beach",
            "a photo of a famous monument",
            "a photo of a mountain",
            "a photo of a street sign",
            "a photo of a person",
            "a photo of a building",
            "a photo of a forest",
            "a photo of a desert",
            "a photo of a river",
            "a photo of a stadium",
            "a photo of a car",
            "a photo of a train station",
            "a photo of a bus stop",
            "a photo of a restaurant",
            "a photo of a hotel",
            "a photo of a church",
            "a photo of a mosque",
            "a photo of a temple",
            "a photo of a bridge",
            "a photo of a tower",
            "a photo of a castle",
            "a photo of a school",
            "a photo of a university",
            "a photo of a hospital",
            "a photo of a police station",
            "a photo of a fire station",
            "a photo of a shopping mall",
            "a photo of a park",
            "a photo of a zoo",
            "a photo of a museum",
        ]
        inputs = processor(text=prompts, images=image, return_tensors="pt", padding=True)
        outputs = model(**inputs)
        logits_per_image = outputs.logits_per_image.detach().numpy()[0]
        best_idx = int(np.argmax(logits_per_image))
        return prompts[best_idx]
    except Exception:
        return None

def image_hash(image_path):
    try:
        with open(image_path, 'rb') as f:
            return hashlib.sha256(f.read()).hexdigest()
    except Exception:
        return None

def reverse_image_search_google(image_path):
    # Não há API oficial gratuita, mas pode-se sugerir upload manual ou usar serviços pagos
    return "https://images.google.com/searchbyimage?image_content=UPLOAD_YOUR_IMAGE"

def analyze_shadows(image_path):
    # Experimental: apenas retorna se há sombras na imagem
    try:
        img = cv2.imread(image_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 60, 255, cv2.THRESH_BINARY_INV)
        shadow_ratio = np.sum(thresh == 255) / (img.shape[0] * img.shape[1])
        if shadow_ratio > 0.15:
            return "Sombras detectadas (pode ajudar na estimativa de horário e posição do sol)"
        else:
            return "Pouca sombra detectada"
    except Exception:
        return None

def main(image_path):
    camera_info, gps, dt = extract_exif(image_path)
    lat, lon = get_gps_decimal(gps) if gps else (None, None)
    detected_location = geocode_coords(lat, lon) if lat and lon else None
    ocr_text = ocr_image(image_path)
    ocr_lang = detect_language(ocr_text) if ocr_text else None
    image_description = describe_image_clip(image_path)
    hash_value = image_hash(image_path)
    shadow_info = analyze_shadows(image_path)
    search_matches = {
        "google_reverse_image": reverse_image_search_google(image_path)
    }
    result = {
        "camera_info": camera_info,
        "gps": {"lat": lat, "lon": lon, "raw": gps},
        "datetime": dt,
        "ocr_text": ocr_text,
        "ocr_language": ocr_lang,
        "detected_location": detected_location,
        "image_description": image_description,
        "shadow_info": shadow_info,
        "hash": hash_value,
        "search_matches": search_matches,
        "analyzed_at": datetime.utcnow().isoformat() + 'Z'
    }
    print(json.dumps(result, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python deep_image_analyzer.py <imagem.jpg>")
        sys.exit(1)
    main(sys.argv[1]) 