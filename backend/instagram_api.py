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
from datetime import datetime, timedelta
from urllib.parse import quote_plus

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000'], supports_credentials=True)

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

    def get_post_comments(self, post_id, session_id, limit=50):
        """Obtém comentários de um post específico com análise de sentimentos"""
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
                return {"comments": [], "error": "Rate limit atingido"}
            elif response.status_code == 403:
                return {"comments": [], "error": "Acesso negado"}
                
            response.raise_for_status()
            data = response.json()
            
            comments = data.get("comments", [])
            
            # Analisar sentimentos dos comentários
            analyzed_comments = []
            for comment in comments:
                sentiment = self.analyze_comment_sentiment(comment.get("text", ""))
                analyzed_comments.append({
                    **comment,
                    "sentiment": sentiment,
                    "is_offensive": sentiment == "negative" and self.is_offensive_comment(comment.get("text", ""))
                })
            
            return {"comments": analyzed_comments, "error": None}
            
        except requests.exceptions.RequestException as e:
            return {"comments": [], "error": f"Erro de rede: {str(e)}"}
        except json.JSONDecodeError:
            return {"comments": [], "error": "Resposta inválida"}

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
            
            # Passo 3: Obter posts recentes (últimos 10)
            posts_data = self.get_user_posts(user_id, session_id, 10)
            posts = posts_data.get("posts", [])
            time.sleep(1)
            
            # Passo 4: Obter comentários de todos os posts
            all_comments = []
            top_comments = []
            offensive_comments = []
            
            for post in posts[:5]:  # Analisar comentários dos 5 posts mais recentes
                post_id = post.get("id") or post.get("pk")
                if post_id:
                    comments_data = self.get_post_comments(post_id, session_id, 50)
                    post_comments = comments_data.get("comments", [])
                    
                    # Adicionar informações do post aos comentários
                    for comment in post_comments:
                        comment["post_id"] = post_id
                        comment["post_caption"] = post.get("caption", {}).get("text", "") if isinstance(post.get("caption"), dict) else post.get("caption", "")
                        comment["post_likes"] = post.get("like_count", 0) or post.get("likes", 0)
                        comment["post_timestamp"] = post.get("taken_at_timestamp") or post.get("timestamp")
                    
                    all_comments.extend(post_comments)
                    time.sleep(0.5)  # Evitar rate limit
            
            # Passo 5: Obter seguidores recentes
            followers_data = self.get_recent_followers(user_id, session_id, 10)
            recent_followers = followers_data.get("followers", [])
            time.sleep(1)
            
            # Passo 6: Processar comentários
            if all_comments:
                # Comentários com mais likes
                top_comments = self.get_top_comments(all_comments, 10)
                
                # Comentários ofensivos
                offensive_comments = self.get_offensive_comments(all_comments)
            
            # Processar dados reais
            processed_data = self.process_real_data(
                user_info, 
                username, 
                posts, 
                all_comments,
                top_comments,
                offensive_comments,
                recent_followers
            )
            
            return processed_data
            
        except Exception as e:
            raise Exception(f"Falha na análise: {str(e)}")

    def process_real_data(self, user_info, username, posts, comments, top_comments, offensive_comments, recent_followers):
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
            "posts": self.process_posts(posts),
            "last_post": self.process_last_post(posts),
            "recent_comments": self.process_comments(comments),
            "engagement_rate": self.calculate_real_engagement_rate(user_info.get("follower_count") or user_info.get("followers", 0), user_info.get("media_count") or user_info.get("posts", 0)),
            "average_likes": self.calculate_average_likes(posts),
            "average_comments": self.calculate_average_comments(posts),
            "hashtags_used": self.extract_hashtags_from_bio(user_info.get("biography") or user_info.get("bio", "")),
            "analysis_timestamp": datetime.now().isoformat(),
            "top_comments": self.process_top_comments(top_comments),
            "offensive_comments": self.process_offensive_comments(offensive_comments),
            "recent_followers": self.process_recent_followers(recent_followers),
            "comment_analysis": self.analyze_comments_summary(comments)
        }
        
        return processed

    def process_posts(self, posts):
        """Processa posts recentes"""
        if not posts:
            return []
        
        processed_posts = []
        for post in posts:
            processed_posts.append({
                "id": post.get("id") or post.get("pk"),
                "caption": post.get("caption", {}).get("text", "") if isinstance(post.get("caption"), dict) else post.get("caption", ""),
                "likes": post.get("like_count") or post.get("likes", 0),
                "comments": post.get("comment_count") or post.get("comments", 0),
                "timestamp": post.get("taken_at_timestamp") or post.get("timestamp"),
                "media_type": post.get("media_type", "IMAGE"),
                "media_url": post.get("image_versions2", {}).get("candidates", [{}])[0].get("url") if post.get("image_versions2") else None,
                "permalink": f"https://www.instagram.com/p/{post.get('code', '')}/"
            })
        
        return processed_posts

    def process_top_comments(self, top_comments):
        """Processa comentários com mais likes"""
        if not top_comments:
            return []
        
        processed_top_comments = []
        for comment in top_comments:
            processed_top_comments.append({
                "id": comment.get("id") or comment.get("pk"),
                "username": comment.get("user", {}).get("username") if isinstance(comment.get("user"), dict) else comment.get("username"),
                "user_id": comment.get("user", {}).get("id") if isinstance(comment.get("user"), dict) else comment.get("user_id"),
                "full_name": comment.get("user", {}).get("full_name") if isinstance(comment.get("user"), dict) else comment.get("full_name"),
                "comment": comment.get("text", ""),
                "likes": comment.get("like_count", 0),
                "timestamp": comment.get("created_at") or comment.get("timestamp"),
                "sentiment": comment.get("sentiment", "neutral"),
                "post_id": comment.get("post_id"),
                "post_caption": comment.get("post_caption", ""),
                "post_likes": comment.get("post_likes", 0)
            })
        
        return processed_top_comments

    def process_offensive_comments(self, offensive_comments):
        """Processa comentários ofensivos"""
        if not offensive_comments:
            return []
        
        processed_offensive = []
        for comment in offensive_comments:
            processed_offensive.append({
                "id": comment.get("id") or comment.get("pk"),
                "username": comment.get("user", {}).get("username") if isinstance(comment.get("user"), dict) else comment.get("username"),
                "user_id": comment.get("user", {}).get("id") if isinstance(comment.get("user"), dict) else comment.get("user_id"),
                "full_name": comment.get("user", {}).get("full_name") if isinstance(comment.get("user"), dict) else comment.get("full_name"),
                "comment": comment.get("text", ""),
                "likes": comment.get("like_count", 0),
                "timestamp": comment.get("created_at") or comment.get("timestamp"),
                "sentiment": comment.get("sentiment", "negative"),
                "post_id": comment.get("post_id"),
                "post_caption": comment.get("post_caption", ""),
                "post_likes": comment.get("post_likes", 0),
                "is_verified": comment.get("user", {}).get("is_verified", False) if isinstance(comment.get("user"), dict) else False
            })
        
        return processed_offensive

    def process_recent_followers(self, recent_followers):
        """Processa seguidores recentes"""
        if not recent_followers:
            return []
        
        processed_followers = []
        for follower in recent_followers:
            processed_followers.append({
                "id": follower.get("id") or follower.get("pk"),
                "username": follower.get("username"),
                "full_name": follower.get("full_name"),
                "is_verified": follower.get("is_verified", False),
                "is_private": follower.get("is_private", False),
                "profile_pic_url": follower.get("profile_pic_url"),
                "follower_count": follower.get("follower_count", 0),
                "following_count": follower.get("following_count", 0),
                "media_count": follower.get("media_count", 0),
                "biography": follower.get("biography", "")
            })
        
        return processed_followers

    def analyze_comments_summary(self, comments):
        """Analisa resumo dos comentários"""
        if not comments:
            return {
                "total_comments": 0,
                "positive_comments": 0,
                "negative_comments": 0,
                "neutral_comments": 0,
                "offensive_comments": 0,
                "avg_likes_per_comment": 0
            }
        
        total = len(comments)
        positive = sum(1 for c in comments if c.get("sentiment") == "positive")
        negative = sum(1 for c in comments if c.get("sentiment") == "negative")
        neutral = sum(1 for c in comments if c.get("sentiment") == "neutral")
        offensive = sum(1 for c in comments if c.get("is_offensive", False))
        
        total_likes = sum(c.get("like_count", 0) for c in comments)
        avg_likes = round(total_likes / total, 1) if total > 0 else 0
        
        return {
            "total_comments": total,
            "positive_comments": positive,
            "negative_comments": negative,
            "neutral_comments": neutral,
            "offensive_comments": offensive,
            "avg_likes_per_comment": avg_likes
        }

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

    def get_recent_followers(self, user_id, session_id, limit=10):
        """Obtém os seguidores mais recentes"""
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
        url = f'https://i.instagram.com/api/v1/friendships/{user_id}/followers/?count={limit}'
        
        try:
            response = self.session.get(
                url, 
                headers=headers, 
                cookies={'sessionid': session_id}, 
                timeout=30
            )
            
            if response.status_code == 429:
                return {"followers": [], "error": "Rate limit atingido"}
            elif response.status_code == 403:
                return {"followers": [], "error": "Acesso negado"}
                
            response.raise_for_status()
            data = response.json()
            
            return {"followers": data.get("users", []), "error": None}
            
        except requests.exceptions.RequestException as e:
            return {"followers": [], "error": f"Erro de rede: {str(e)}"}
        except json.JSONDecodeError:
            return {"followers": [], "error": "Resposta inválida"}

    def analyze_comment_sentiment(self, text):
        """Análise básica de sentimento do comentário"""
        if not text:
            return "neutral"
        
        text_lower = text.lower()
        
        # Palavras positivas
        positive_words = ['lindo', 'bonito', 'maravilhoso', 'incrível', 'ótimo', 'excelente', 'perfeito', 'adoro', 'amo', 'love', 'beautiful', 'amazing', 'perfect', 'great', 'awesome']
        
        # Palavras negativas
        negative_words = ['feio', 'horrível', 'péssimo', 'ruim', 'odio', 'detesto', 'nojo', 'ugly', 'horrible', 'terrible', 'hate', 'disgusting', 'awful']
        
        # Palavras ofensivas
        offensive_words = ['idiota', 'burro', 'estúpido', 'imbecil', 'retardado', 'idiot', 'stupid', 'dumb', 'moron', 'retard']
        
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        offensive_count = sum(1 for word in offensive_words if word in text_lower)
        
        if offensive_count > 0:
            return "offensive"
        elif positive_count > negative_count:
            return "positive"
        elif negative_count > positive_count:
            return "negative"
        else:
            return "neutral"

    def is_offensive_comment(self, text):
        """Verifica se o comentário é ofensivo"""
        if not text:
            return False
        
        text_lower = text.lower()
        
        # Lista de palavras ofensivas
        offensive_patterns = [
            'idiota', 'burro', 'estúpido', 'imbecil', 'retardado', 'cretino',
            'idiot', 'stupid', 'dumb', 'moron', 'retard', 'cretin',
            'vai se foder', 'foda-se', 'fuck you', 'fuck off',
            'merda', 'shit', 'porra', 'puta', 'whore', 'bitch'
        ]
        
        return any(pattern in text_lower for pattern in offensive_patterns)

    def get_top_comments(self, comments, limit=10):
        """Obtém os comentários com mais likes"""
        if not comments:
            return []
        
        # Ordenar por likes (se disponível) ou por data
        sorted_comments = sorted(
            comments, 
            key=lambda x: x.get("like_count", 0) or x.get("created_at", 0), 
            reverse=True
        )
        
        return sorted_comments[:limit]

    def get_offensive_comments(self, comments):
        """Filtra comentários ofensivos"""
        if not comments:
            return []
        
        return [comment for comment in comments if comment.get("is_offensive", False)]

# Instância global da API
instagram_api = InstagramAPI()

@app.route('/api/instagram/investigate', methods=['POST'])
def investigate_profile():
    """Endpoint para investigação de perfil do Instagram"""
    try:
        data = request.get_json()
        username = data.get('username')
        session_id = data.get('session_id')
        
        if not username:
            return jsonify({"error": "Username é obrigatório"}), 400
        
        # Remove @ se presente
        if username.startswith('@'):
            username = username[1:]
        
        # Se não tiver session_id, retorna dados simulados
        if not session_id:
            # Gerar dados simulados
            import random
            from datetime import datetime, timedelta
            
            # Gerar posts simulados
            mock_posts = []
            for i in range(10):
                mock_posts.append({
                    "id": f"post_{random.randint(100000000, 999999999)}",
                    "caption": f"Post #{i+1} do {username} 📸 #instagram #vida",
                    "likes": random.randint(100, 5000),
                    "comments": random.randint(10, 200),
                    "timestamp": int((datetime.now() - timedelta(days=i)).timestamp()),
                    "media_type": "IMAGE",
                    "media_url": f"https://via.placeholder.com/400x400/random?text=Post+{i+1}",
                    "permalink": f"https://www.instagram.com/p/post_{random.randint(100000000, 999999999)}/"
                })
            
            # Gerar comentários simulados
            mock_comments = []
            mock_top_comments = []
            mock_offensive_comments = []
            
            comment_texts = [
                "Muito lindo! 😍", "Adorei! ❤️", "Perfeito! 👏", "Maravilhoso! ✨",
                "Que foto incrível! 📸", "Amei! 🥰", "Fantástico! 🌟", "Demais! 🔥",
                "Que legal! 😊", "Incrível! 🤩", "Muito bom! 👍", "Excelente! 💯"
            ]
            
            offensive_texts = [
                "Que feio! 😒", "Não gostei! 👎", "Péssimo! 😤", "Horrível! 🤮",
                "Idiota! 🤬", "Burro! 😡", "Estúpido! 😠", "Nojo! 🤢"
            ]
            
            for i, post in enumerate(mock_posts[:5]):
                # Comentários normais
                for j in range(random.randint(5, 15)):
                    comment = {
                        "id": f"comment_{random.randint(100000000, 999999999)}",
                        "username": f"user_{random.randint(1000, 9999)}",
                        "user_id": random.randint(100000000, 999999999),
                        "full_name": f"User {random.randint(1000, 9999)}",
                        "comment": random.choice(comment_texts),
                        "likes": random.randint(0, 50),
                        "timestamp": int((datetime.now() - timedelta(hours=random.randint(1, 24))).timestamp()),
                        "sentiment": "positive",
                        "post_id": post["id"],
                        "post_caption": post["caption"],
                        "post_likes": post["likes"]
                    }
                    mock_comments.append(comment)
                
                # Comentários ofensivos (ocasionalmente)
                if random.random() < 0.3:  # 30% de chance
                    offensive_comment = {
                        "id": f"comment_{random.randint(100000000, 999999999)}",
                        "username": f"troll_{random.randint(1000, 9999)}",
                        "user_id": random.randint(100000000, 999999999),
                        "full_name": f"Troll {random.randint(1000, 9999)}",
                        "comment": random.choice(offensive_texts),
                        "likes": random.randint(0, 5),
                        "timestamp": int((datetime.now() - timedelta(hours=random.randint(1, 24))).timestamp()),
                        "sentiment": "offensive",
                        "post_id": post["id"],
                        "post_caption": post["caption"],
                        "post_likes": post["likes"],
                        "is_verified": False
                    }
                    mock_offensive_comments.append(offensive_comment)
                    mock_comments.append(offensive_comment)
            
            # Top comments (com mais likes)
            mock_top_comments = sorted(mock_comments, key=lambda x: x["likes"], reverse=True)[:10]
            
            # Seguidores recentes
            mock_recent_followers = []
            for i in range(10):
                mock_recent_followers.append({
                    "id": random.randint(100000000, 999999999),
                    "username": f"follower_{random.randint(1000, 9999)}",
                    "full_name": f"Follower {random.randint(1000, 9999)}",
                    "is_verified": random.random() > 0.9,
                    "is_private": random.random() > 0.7,
                    "profile_pic_url": f"https://via.placeholder.com/150/random?text=F{i+1}",
                    "follower_count": random.randint(10, 10000),
                    "following_count": random.randint(50, 1000),
                    "media_count": random.randint(0, 500),
                    "biography": f"Olá! Sou follower {i+1} 👋"
                })
            
            mock_data = {
                "username": username,
                "id": random.randint(100000000, 999999999),
                "full_name": username.title(),
                "is_verified": random.random() > 0.8,
                "is_business": random.random() > 0.7,
                "is_private": random.random() > 0.6,
                "follower_count": random.randint(10000, 1000000),
                "following_count": random.randint(50, 1000),
                "media_count": random.randint(50, 500),
                "total_igtv_videos": random.randint(0, 50),
                "biography": f"Olá! Sou {username.title()} 👋",
                "external_url": f"https://{username}.com" if random.random() > 0.5 else None,
                "hd_profile_pic_url_info": {"url": f"https://via.placeholder.com/150/random?text={username[0].upper()}"},
                "public_email": f"{username}@example.com" if random.random() > 0.7 else None,
                "public_phone_number": f"+55{random.randint(100000000, 999999999)}" if random.random() > 0.8 else None,
                "public_phone_country_code": "55",
                "obfuscated_email": f"{username[0]}***@example.com" if random.random() > 0.7 else None,
                "obfuscated_phone": f"+55 *** *** {random.randint(1000, 9999)}" if random.random() > 0.8 else None,
                "is_whatsapp_linked": random.random() > 0.6,
                "posts": mock_posts,
                "last_post": mock_posts[0] if mock_posts else None,
                "recent_comments": mock_comments[:20],
                "engagement_rate": round(random.uniform(2, 10), 1),
                "average_likes": random.randint(500, 5000),
                "average_comments": random.randint(50, 500),
                "hashtags_used": [{"tag": "#instagram", "count": 1}, {"tag": "#vida", "count": 1}],
                "analysis_timestamp": datetime.now().isoformat(),
                "is_simulated": True,
                "top_comments": mock_top_comments,
                "offensive_comments": mock_offensive_comments,
                "recent_followers": mock_recent_followers,
                "comment_analysis": {
                    "total_comments": len(mock_comments),
                    "positive_comments": len([c for c in mock_comments if c.get("sentiment") == "positive"]),
                    "negative_comments": 0,
                    "neutral_comments": 0,
                    "offensive_comments": len(mock_offensive_comments),
                    "avg_likes_per_comment": round(sum(c.get("likes", 0) for c in mock_comments) / len(mock_comments), 1) if mock_comments else 0
                }
            }
            
            return jsonify({
                "success": True,
                "data": mock_data,
                "message": "Dados simulados - forneça session_id para dados reais"
            })
        
        # Realiza a análise com dados reais
        result = instagram_api.analyze_profile(username, session_id)
        result["is_simulated"] = False
        
        return jsonify({
            "success": True,
            "data": result,
            "message": "Dados reais da API do Instagram"
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