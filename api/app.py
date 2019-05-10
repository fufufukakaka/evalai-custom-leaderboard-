from fastapi import FastAPI
import psycopg2
import uvicorn
import json

params = {
    'database': 'postgres',
    'user': 'postgres',
    'host': 'localhost',
    'port': '5432'
}

conn = psycopg2.connect(**params)
cur = conn.cursor()

app = FastAPI()


@app.get("/api/fetch_leaderboard")
def fetch_leader_board():
    sql = "select \
    s.id, \
        submitted_at, \
        submission_number, \
        p.name, \
        p.codename, \
        l.schema, \
        c.title,\
        t.team_name,\
        to_json(output) as output,\
        method_name,\
        method_description,\
        project_url,\
        publication_url\
        from submission as s\
        inner join challenge_phase as p\
        on s.challenge_phase_id = p.id\
        inner join participant_team as t\
        on s.participant_team_id = t.id\
        inner join challenge as c\
        on p.challenge_id = c.id\
        inner join challenge_phase_split as ps\
        on p.id = ps.challenge_phase_id\
        inner join leaderboard as l\
        on ps.leaderboard_id = l.id\
        where c.published = TRUE and s.status != 'failed'"
    cur.execute(sql)
    rows = cur.fetchall()
    colnames = [desc[0] for desc in cur.description]

    # dictにしてjsonで返す
    result = []
    for data in rows:
        tmp_result = {}
        for idx, d in enumerate(data):
            tmp_result[colnames[idx]] = d

        # outputについてはキーを使って値を取り出しておく
        keys = tmp_result["codename"]
        if tmp_result["output"] is not None:
            tmp_result["extract_output"] = json.loads(
                tmp_result["output"].replace(
                    "'", '"'))["result"][0][keys]

        # schemaからlabel情報を獲得する
        tmp_result["extract_schema"] = tmp_result["schema"]["labels"]
        tmp_result["default_metrics"] = tmp_result["schema"]["default_order_by"]
        tmp_result["main_score"] = tmp_result["extract_output"][tmp_result
                                                                ["default_metrics"]]
        if tmp_result["method_description"] is not None:
            tmp_result["method_description"] = tmp_result["method_description"].replace(
                "\n", "<br />")
        result.append(tmp_result)

    return result


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10201, reload=True)
