export const sendTextToOpenAI = async (userText) => {
	const response = await fetch("/api/openai", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ userText }),
	});
	const responseJson = await response.json();
const message = responseJson.message;

	return message;
};