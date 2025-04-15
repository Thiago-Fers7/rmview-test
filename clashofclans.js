const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.clashofclans.com/v1/clans/%232QCLPG9YP/currentwar/leaguegroup',
  headers: { 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjZhMWRkYWNhLTk3YzktNDhhZS1iZTkyLTQ5ZTUxZmYyZjg2NiIsImlhdCI6MTc0Mzg4MzExMiwic3ViIjoiZGV2ZWxvcGVyLzcwNjdhNDNmLTJkNTItMjg5Mi0xYzJmLTY2YmVjZWRmYTk1NyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE3MC44NC4xNjcuMTAxIl0sInR5cGUiOiJjbGllbnQifV19.iQBwsuqFfaE7MEVyWqcB1sgSwhR4U8o_kvVnts0lHw8V5OkluZELzfRIH8o1g1XAyFRXXvtQhj5J6DywKVpoQg'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});