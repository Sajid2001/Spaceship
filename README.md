# Spaceship
## An AI-Powered way to do project-based learning

Have trouble coming up with projects? Spaceship is there for you. Spaceship provides an easier way for you to learn through projects

- Recommends project ideas to you based on your skill level and area of interest
- Recommends concepts for you to learn on your current project
- Gathers tutorial videos and series relevant to your current project

## Demo 

https://github.com/Sajid2001/Spaceship/assets/60523377/535d6214-fdc5-408c-9f3c-50c2f840ad99

## Stack
- React (Vite)
- TypeScript
- TailwindCSS
- Redux
- Flask
- SQLAlchemy (SQLite)
- LangChain
- AuthLib (OAuth2.0: Github login method)
- OpenAI
- Chroma

## Setup

### Install dependencies

#### Frontend
1. Run `npm install` in the `frontend` directory
#### Backend
1. Run `python -m venv .venv` in the `backend` directory
    - You should get a newly generated `.venv` folder in the `backend`directory
2. Run `.venv/Scripts/activate` in the `backend` directory to activate the virtual environment
    - This download your dependencies in the newly generated `.venv` folder instead of locally
3. Run `pip install -r requirements.txt` in the `backend` directory to install dependencies inside the virtual environment

**Note: Make sure your compiler path in your editor points to `venv/Scripts/python.exe` inside your `backend` directory or else your virtual dependencies will not be recognized**

### Environment Vars

#### Backend
```
PORT=<Backend Port Number>
DB_NAME=<Name of SQLite Database>
SECRET_KEY=<Flask Secret Key>
OPENAI_API_KEY=<OpenAI Key>


GITHUB_CLIENT_ID=<Github OAuth Client Id>
GITHUB_CLIENT_SECRET=<Github OAuth Client Secret>
GITHUB_REDIRECT_URI=<Github OAuth Redirect Uri>
```

## Future Features to consider
- Connecting to a github repo and conversing with it
- Clicking on a recommendation and going to the create page with that recommendation
- Background processing of tutorials and tasks to improve UX
- Mobile responsiveness
- Integrating other OAuth2.0 login methods (Google, Facebook, Twitter, etc) 

## The Many Possible Roads
- Teaching
- Onboarding
- Project Management?
- Feature Planning

## Current Limitations
- Currently using GPT-3.5 > can act erratic at times
- Only 15 tutorials in the database right now
