# EvalAI-Custom-LeaderBoard

This repository builds a leaderboard that complements EvalAI(https://github.com/Cloud-CV/EvalAI).

(This repository is for practice. If you use it, please check the code, modify the code accordingly, and use it at your own responsibility.)

## Usage

Before performing these process, make sure that EvalAI is set up by docker-compose in any server.
The following steps should be done on the server hosting EvalAI.

### frontend

```
cd frontend
yarn
yarn run start
```

### api

Please install python3.7 and pipenv.

```
cd api
pipenv install
pipenv shell
python app.py
```
