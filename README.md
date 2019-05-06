# EvalAI-Custom-LeaderBoard

This repository builds a leaderboard that complements [EvalAI](!https://github.com/Cloud-CV/EvalAI).

(This repository is for practice. If you use it, please check the code, modify the code accordingly, and use it at your own responsibility.)

## Motivation

EvalAI is a great product that can host customized competitions on their servers.
However, I was dissatisfied with the EvalAI leaderboard. For example, I can't check the score of my submission immediately.
This leaderboard is primarily a set of additional features designed to help you move forward with your team job.

- Browse the submission list posted by all other users
- Scores reference
- Visualize score transitions

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

## Demo

![demo](https://github.com/fufufukakaka/evalai-custom-leaderboard-/blob/master/images/demo.gif?raw=true)
