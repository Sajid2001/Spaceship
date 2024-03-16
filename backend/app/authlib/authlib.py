from app import oauth
import os

github = oauth.register(
    name='github',
    client_id=os.getenv('GITHUB_CLIENT_ID'),
    client_secret=os.getenv('GITHUB_CLIENT_SECRET'),
    authorize_url='https://github.com/login/oauth/authorize',
    authorize_params=None,  # Optional parameters for the authorization URL
    access_token_url='https://github.com/login/oauth/access_token',
    access_token_params=None,
    redirect_uri=os.getenv('GITHUB_REDIRECT_URI'),
    client_kwargs={
        'scope': 'user:email'
    }
)