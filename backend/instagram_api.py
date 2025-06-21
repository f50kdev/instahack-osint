#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Backend API para integração com o Instagram OSINT
Baseado no script do Bruno Fraga
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import time
from datetime import datetime
from urllib.parse import quote_plus

app = Flask(__name__)
CORS(app)

class InstagramAPI:
    def __init__(self):
        self.session = requests.Session()
        
    def get_user_id(self, username, session_id):
        """Obtém ID do usuário a partir do username"""
        headers = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1",
            "x-ig-app-id": "936619743392459",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site"
        }
        url = f'https://i.instagram.com/api/v1/users/web_profile_info/?username={username}'
        
        try:
            response = self.session.get(
                url, 
                headers=headers, 
                cookies={'sessionid': session_id}, 
                timeout=30
            )
            
            if response.status_code == 404:
                return {"id": None, "error": "Usuário não encontrado"}
            elif response.status_code == 403:
                return {"id": None, "error": "Acesso negado - verifique o session ID"}
            elif response.status_code == 429:
                return {"id": None, "error": "Rate limit atingido - aguarde alguns minutos"}
                
            data = response.json()
            
            if "data" not in data or "user" not in data["data"]:
                return {"id": None, "error": "Formato de resposta inválido"}
                
            user_id = data["data"]["user"]["id"]
            return {"id": user_id, "error": None}
            
        except requests.exceptions.RequestException as e:
            return {"id": None, "error": f"Erro de rede: {str(e)}"}
        except json.JSONDecodeError:
            return {"id": None, "error": "Rate limit atingido ou resposta inválida"}
        except KeyError:
            return {"id": None, "error": "Formato de resposta inválido"}
            
    def get_user_info(self, user_id, session_id):
        """Obtém informações detalhadas do usuário"""
        headers = {
            'User-Agent': 'Instagram 64.0.0.14.96',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site'
        }
        url = f'https://i.instagram.com/api/v1/users/{user_id}/info/'
        
        try:
            response = self.session.get(
                url, 
                headers=headers, 
                cookies={'sessionid': session_id}, 
                timeout=30
            )
            
            if response.status_code == 429:
                return {"user": None, "error": "Rate limit atingido"}
            elif response.status_code == 403:
                return {"user": None, "error": "Acesso negado"}
                
            response.raise_for_status()
            data = response.json()
            
            user_info = data.get("user")
            if not user_info:
                return {"user": None, "error": "Usuário não encontrado"}
                
            user_info["userID"] = user_id
            return {"user": user_info, "error": None}
            
        except requests.exceptions.RequestException as e:
            return {"user": None, "error": f"Erro de rede: {str(e)}"}
        except json.JSONDecodeError:
            return {"user": None, "error": "Resposta inválida"}
            
    def advanced_lookup(self, username):
        """Realiza lookup avançado para informações ofuscadas"""
        data_payload = "signed_body=SIGNATURE." + quote_plus(json.dumps(
            {"q": username, "skip_recovery": "1"}, separators=(",", ":")
        ))
        
        headers = {
            "Accept-Language": "en-US",
            "User-Agent": "Instagram 101.0.0.15.120",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-IG-App-ID": "124024574287414",
            "Accept-Encoding": "gzip, deflate",
            "Host": "i.instagram.com",
            "Connection": "keep-alive",
            "Content-Length": str(len(data_payload))
        }
        
        try:
            response = self.session.post(
                'https://i.instagram.com/api/v1/users/lookup/',
                headers=headers, 
                data=data_payload, 
                timeout=30
            )
            
            data = response.json()
            return {"user": data, "error": None}
            
        except requests.exceptions.RequestException as e:
            return {"user": None, "error": f"Erro de rede: {str(e)}"}
        except json.JSONDecodeError:
            return {"user": None, "error": "Rate limit"}
            
    def get_user_posts(self, user_id, session_id, limit=10):
        """Obtém posts recentes do usuário"""
        headers = {
            'User-Agent': 'Instagram 64.0.0.14.96',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site'
        }
        url = f'https://i.instagram.com/api/v1/feed/user/{user_id}/username/?count={limit}'
        
        try:
            response = self.session.get(
                url, 
                headers=headers, 
                cookies={'sessionid': session_id}, 
                timeout=30
            )
            
            if response.status_code == 429:
                return {"posts": None, "error": "Rate limit atingido"}
            elif response.status_code == 403:
                return {"posts": None, "error": "Acesso negado"}
                
            response.raise_for_status()
            data = response.json()
            
            return {"posts": data.get("items", []), "error": None}
            
        except requests.exceptions.RequestException as e:
            return {"posts": None, "error": f"Erro de rede: {str(e)}"}
        except json.JSONDecodeError:
            return {"posts": None, "error": "Resposta inválida"}

    def get_post_comments(self, post_id, session_id, limit=20):
        """Obtém comentários de um post específico"""
        headers = {
            'User-Agent': 'Instagram 64.0.0.14.96',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site'
        }
        url = f'https://i.instagram.com/api/v1/media/{post_id}/comments/?count={limit}'
        
        try:
            response = self.session.get(
                url, 
                headers=headers, 
                cookies={'sessionid': session_id}, 
                timeout=30
            )
            
            if response.status_code == 429:
                return {"comments": None, "error": "Rate limit atingido"}
            elif response.status_code == 403:
                return {"comments": None, "error": "Acesso negado"}
                
            response.raise_for_status()
            data = response.json()
            
            return {"comments": data.get("comments", []), "error": None}
            
        except requests.exceptions.RequestException as e:
            return {"comments": None, "error": f"Erro de rede: {str(e)}"}
        except json.JSONDecodeError:
            return {"comments": None, "error": "Resposta inválida"}

    def get_user_stories(self, user_id, session_id):
        """Obtém stories do usuário"""
        headers = {
            'User-Agent': 'Instagram 64.0.0.14.96',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        }
        url = f'https://i.instagram.com/api/v1/feed/user/{user_id}/story/'
        
        try:
            response = self.session.get(
                url, 
                headers=headers, 
                cookies={'sessionid': session_id}, 
                timeout=30
            )
            
            if response.status_code in [429, 403]:
                return {"stories": [], "error": None}
                
            data = response.json()
            return {"stories": data.get("items", []), "error": None}
            
        except:
            return {"stories": [], "error": None}

    def analyze_profile(self, username, session_id):
        """Análise completa do perfil com dados reais"""
        try:
            # Passo 1: Obter ID do usuário
            user_id_data = self.get_user_id(username, session_id)
            if user_id_data.get("error"):
                raise Exception(user_id_data["error"])
                
            user_id = user_id_data["id"]
            time.sleep(1)
            
            # Passo 2: Obter informações detalhadas
            info_data = self.get_user_info(user_id, session_id)
            if info_data.get("error"):
                raise Exception(info_data["error"])
                
            user_info = info_data["user"]
            time.sleep(1)
            
            # Passo 3: Obter posts recentes
            posts_data = self.get_user_posts(user_id, session_id, 5)
            
            # Passo 4: Obter comentários do último post
            comments_data = {"comments": [], "error": None}
            if posts_data.get("posts") and len(posts_data["posts"]) > 0:
                last_post = posts_data["posts"][0]
                comments_data = self.get_post_comments(last_post["id"], session_id, 10)
            
            # Processar dados reais
            processed_data = self.process_real_data(user_info, username, posts_data.get("posts", []), comments_data.get("comments", []))
            
            return processed_data
            
        except Exception as e:
            raise Exception(f"Falha na análise: {str(e)}")

    def process_real_data(self, user_info, username, posts, comments):
        """Processa dados reais da API"""
        processed = {
            "username": username,
            "id": user_info.get("id") or user_info.get("pk"),
            "full_name": user_info.get("full_name") or username.title(),
            "is_verified": user_info.get("is_verified", False),
            "is_business": user_info.get("is_business", False),
            "is_private": user_info.get("is_private", False),
            "follower_count": user_info.get("follower_count") or user_info.get("followers", 0),
            "following_count": user_info.get("following_count") or user_info.get("follows", 0),
            "media_count": user_info.get("media_count") or user_info.get("posts", 0),
            "total_igtv_videos": user_info.get("total_igtv_videos", 0),
            "biography": user_info.get("biography") or user_info.get("bio", ""),
            "external_url": user_info.get("external_url") or user_info.get("website"),
            "hd_profile_pic_url_info": user_info.get("hd_profile_pic_url_info") or {"url": user_info.get("profile_pic_url")},
            "public_email": user_info.get("public_email"),
            "public_phone_number": user_info.get("public_phone_number"),
            "public_phone_country_code": user_info.get("public_phone_country_code"),
            "obfuscated_email": user_info.get("obfuscated_email"),
            "obfuscated_phone": user_info.get("obfuscated_phone"),
            "is_whatsapp_linked": user_info.get("is_whatsapp_linked"),
            "posts": posts,
            "last_post": self.process_last_post(posts),
            "recent_comments": self.process_comments(comments),
            "engagement_rate": self.calculate_real_engagement_rate(user_info.get("follower_count") or user_info.get("followers", 0), user_info.get("media_count") or user_info.get("posts", 0)),
            "average_likes": self.calculate_average_likes(posts),
            "average_comments": self.calculate_average_comments(posts),
            "hashtags_used": self.extract_hashtags_from_bio(user_info.get("biography") or user_info.get("bio", "")),
            "analysis_timestamp": datetime.now().isoformat()
        }
        
        return processed

    def process_last_post(self, posts):
        """Processa o último post real"""
        if not posts or len(posts) == 0:
            return None
        
        post = posts[0]
        return {
            "id": post.get("id") or post.get("pk"),
            "caption": post.get("caption", {}).get("text", "") if isinstance(post.get("caption"), dict) else post.get("caption", ""),
            "likes": post.get("like_count") or post.get("likes", 0),
            "comments": post.get("comment_count") or post.get("comments", 0),
            "timestamp": post.get("taken_at_timestamp") or post.get("timestamp"),
            "media_type": post.get("media_type", "IMAGE")
        }

    def process_comments(self, comments):
        """Processa comentários reais"""
        if not comments:
            return []
        
        processed_comments = []
        for comment in comments:
            processed_comments.append({
                "id": comment.get("id") or comment.get("pk"),
                "username": comment.get("user", {}).get("username") if isinstance(comment.get("user"), dict) else comment.get("username"),
                "user_id": comment.get("user", {}).get("id") if isinstance(comment.get("user"), dict) else comment.get("user_id"),
                "comment": comment.get("text", ""),
                "timestamp": comment.get("created_at") or comment.get("timestamp")
            })
        
        return processed_comments

    def calculate_real_engagement_rate(self, followers, posts):
        """Calcula taxa de engajamento real"""
        if followers == 0 or posts == 0:
            return 0.0
        return round((posts * 100) / followers, 1)

    def calculate_average_likes(self, posts):
        """Calcula média de curtidas dos posts reais"""
        if not posts:
            return 0
        total_likes = sum(post.get("like_count", 0) or post.get("likes", 0) for post in posts)
        return round(total_likes / len(posts))

    def calculate_average_comments(self, posts):
        """Calcula média de comentários dos posts reais"""
        if not posts:
            return 0
        total_comments = sum(post.get("comment_count", 0) or post.get("comments", 0) for post in posts)
        return round(total_comments / len(posts))

    def extract_hashtags_from_bio(self, bio):
        """Extrai hashtags da bio real"""
        if not bio:
            return []
        import re
        hashtags = re.findall(r'#\w+', bio)
        return [{"tag": tag, "count": 1} for tag in hashtags[:5]]

# Instância global da API
instagram_api = InstagramAPI()

@app.route('/api/instagram/investigate', methods=['POST'])
def investigate_profile():
    """Endpoint para investigação de perfil do Instagram"""
    try:
        data = request.get_json()
        username = data.get('username')
        session_id = data.get('session_id')
        
        if not username or not session_id:
            return jsonify({"error": "Username e session_id são obrigatórios"}), 400
        
        # Remove @ se presente
        if username.startswith('@'):
            username = username[1:]
        
        # Realiza a análise com dados reais
        result = instagram_api.analyze_profile(username, session_id)
        
        return jsonify({
            "success": True,
            "data": result
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/instagram/health', methods=['GET'])
def health_check():
    """Endpoint de verificação de saúde da API"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001) 