const { exec } = require("child_process")
// const express = require('express')
// const cors = require('cors')
// const app = express()

// app.use(cors())
// app.use(express.json())
// app.use(function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });


// app.get('/applicationIn', (req, res) => {
	ls = exec(`sh ./applicationIn.sh`);
	let arr = []
	ls.stdout.on('data', function (data) {
		// console.log(data)
		arr.push(data)
	})
	ls.on('close', (code) => {

		const digestHeader = arr[4].replace("\n", "").replace("'", "").replace("='", "=").substring(4)
		const XClientTransactionId = arr[5].replace("\n", "").replace("'", "").replace("'", "").substring(4)

		const x = arr[6].split("\n")
		const keyId = x[0].substring(4)
		const created = x[1].substring(4)
		const digest = x[2].substring(4)
		const signature = x[3].substring(4)
		const generatedSignature = keyId + created + digest + signature

		const data = {
			"digestHeader": digestHeader,
			"XClientTransactionId": XClientTransactionId,
			"generatedSignature": generatedSignature.replace("'", "").replace("'", "")
		}

		console.log(data)
		// res.json(data)

	});
// })

// app.listen(3000, () => {
// 	console.log(`Server started at port : 3000`)
// })
