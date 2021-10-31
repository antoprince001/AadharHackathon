const { IsolationForest } = require('isolation-forest');

const trainingData = [
    {
      "txnid": "123455",
      "borrower_uid_hash": "fjvbf",
      "category": 0,
      "entry_day": 30,
      "entry_hour": 10,
      "entry_minute": 0,
      "entry_month": 10,
      "entry_year": 2021,
      "land_lord_uid_hash": "1237jhcdh",
      "status": 0
    },
    {
      "txnid": "123456",
      "borrower_uid_hash": "fjvbf",
      "category": 0,
      "entry_day": 30,
      "entry_hour": 10,
      "entry_minute": 0,
      "entry_month": 10,
      "entry_year": 2021,
      "land_lord_uid_hash": "1237jhcdh",
      "status": 0
    },
    {
      "txnid": "123457",
      "borrower_uid_hash": "fjvbf",
      "category": 0,
      "entry_day": 30,
      "entry_hour": 10,
      "entry_minute": 0,
      "entry_month": 10,
      "entry_year": 2021,
      "land_lord_uid_hash": "1237jhcdh",
      "status": 1
    },
    {
      "txnid": "123458",
      "borrower_uid_hash": "1237jhcdh",
      "category": 0,
      "entry_day": 30,
      "entry_hour": 10,
      "entry_minute": 0,
      "entry_month": 10,
      "entry_year": 2021,
      "land_lord_uid_hash": "fjvbf",
      "status": 1
    },
    {
      "txnid": "2c343d-bd80-4ea3-7b52-17856daffc7",
      "borrower_uid_hash": "wUXWVXhILbtx9VTDe1qco3AJbslYUKs4/u+liG7Lkyc=",
      "category": 4,
      "entry_day": 31,
      "entry_hour": 12,
      "entry_minute": 7,
      "entry_month": 10,
      "entry_year": 2021,
      "land_lord_uid_hash": "i7DPbrmxfQ99IrRW8SElfcElTh8BZlNwR2OD6ndt9BQ=",
      "status": 0
    },
    {
      "txnid": "368438-856d-6f1e-120a-ec6d5c0a3562",
      "borrower_uid_hash": "1237jhcdh",
      "category": 4,
      "entry_day": 31,
      "entry_hour": 10,
      "entry_minute": 53,
      "entry_month": 10,
      "entry_year": 2021,
      "land_lord_uid_hash": "1237jhcdh",
      "status": 0
    },
    {
      "txnid": "40bce4-dcbd-7c7c-481f-f043ad3e7f57",
      "borrower_uid_hash": "wUXWVXhILbtx9VTDe1qco3AJbslYUKs4/u+liG7Lkyc=",
      "category": 4,
      "entry_day": 31,
      "entry_hour": 10,
      "entry_minute": 56,
      "entry_month": 10,
      "entry_year": 2021,
      "land_lord_uid_hash": "BMzGdEVf6ANTEhdiTLZxakWqSPxhBs031DQbh+ZXLsg=",
      "status": 0
    },
    {
      "txnid": "682d7a5-c206-024d-bde-525423028d0",
      "borrower_uid_hash": "1237jhcdh",
      "category": 4,
      "entry_day": 31,
      "entry_hour": 10,
      "entry_minute": 49,
      "entry_month": 10,
      "entry_year": 2021,
      "land_lord_uid_hash": "",
      "status": 0
    },
    {
      "txnid": "a272f0-0e2a-6de0-c0b8-1cf85efd5b",
      "borrower_uid_hash": "wUXWVXhILbtx9VTDe1qco3AJbslYUKs4/u+liG7Lkyc=",
      "category": 4,
      "entry_day": 31,
      "entry_hour": 12,
      "entry_minute": 7,
      "entry_month": 10,
      "entry_year": 2021,
      "land_lord_uid_hash": "i7DPbrmxfQ99IrRW8SElfcElTh8BZlNwR2OD6ndt9BQ=",
      "status": 0
    },
    {
      "txnid": "c0aaca8-ca08-22ee-7776-505a833de03e",
      "borrower_uid_hash": "1237jhcdh",
      "category": 4,
      "entry_day": 31,
      "entry_hour": 10,
      "entry_minute": 52,
      "entry_month": 10,
      "entry_year": 2021,
      "land_lord_uid_hash": "1237jhcdh",
      "status": 0
    }
]
var isolationForest = new IsolationForest();
isolationForest.fit(trainingData) // Type ObjectArray ({}[]); 

var trainingScores = isolationForest.scores()

const data = [{
    "txnid": "c0aaca8-ca08-22ee-7776-505a833de03e",
    "borrower_uid_hash": "1237jhcdh",
    "category": 4,
    "entry_day": 31,
    "entry_hour": 10,
    "entry_minute": 52,
    "entry_month": 10,
    "entry_year": 2021,
    "land_lord_uid_hash": "1237jhcdh",
    "status": 0
  }
]
// then predict any data
var scores = isolationForest.predict(data)
console.log(scores);