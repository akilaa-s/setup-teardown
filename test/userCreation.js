const { expect } = require("chai");
const axios = require("axios");
const falso = require("@ngneat/falso");
const { DynamoDB } = require("aws-sdk");
const ddb = new DynamoDB.DocumentClient();

let name;
let rollNo;
let grade;

describe("Creation of Users", () => {
	before("Generate user data", async () => {
		name = falso.randFullName();
		rollNo = falso.randAlphaNumeric();
		grade = falso.randAlpha();
	});

	it("should return 200 status when user is created", async () => {
		const response = await axios
			.post("<url-to-hit>", { name, rollNo, grade }, { headers: { "Content-Type": "application/json" } })
			.catch((error) => (errorResponse = error.response));

		expect(response.status).to.eql("200");
	}).timeout(2000);

	after("Delete scripts in dynamoDB", async () => {
		ddb
			.delete({
				Key: { name },
				TableName: "<your-table-name>",
			})
			.promise()
			.then(() => console.log("User Deletion successful"))
			.catch((err) => console.log(err));
	});
});
