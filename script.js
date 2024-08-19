document.getElementById('submit').addEventListener('click', async function() {
    const question = document.getElementById('question').value;
    const responseContainer = document.getElementById('response');
    responseContainer.innerHTML = '<p>Loading...</p>';

    const data = {
        messages: [
            {
                role: 'user',
                content: question,
            },
        ],
        max_tokens: 820,
    };

    try {
        const response = await fetch('https://wormgpt.com.co/gpt/', {
            method: 'POST',
            headers: {
                'x-wormgpt-provider': 'worm_gpt',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const content = result.choices[0].message.content;
        responseContainer.innerHTML = `<p>${content}</p>`;
    } catch (error) {
        responseContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
