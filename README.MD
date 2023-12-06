### Step to build docker containers

```bash
docker compose up --build -d
docker compose exec -it mongodb bash
mongod --version
mongosh admin -u gnoluv -p 123456
```
