<script lang="ts">
    import InputBox from "./InputBox.svelte";
    import Messages from "./Messages.svelte";
    import { MessageSource, type IMessage } from "./type";

    let messages: IMessage[] = [];

    let inputBoxValue: string;

    async function updateMessages(prompt: string | undefined) {
        if (prompt === undefined) {
            return;
        }

        const userMessage: IMessage = {
            text: prompt,
            source: MessageSource.user,
        };
        messages = [...messages, userMessage];
        const newMessage = await getServerResponse(prompt);
        const serverMessage: IMessage = {
            text: newMessage,
            source: MessageSource.server,
        };
        messages = [...messages, serverMessage];
    }

    async function getServerResponse(prompt: string) {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "mistral",
                prompt: prompt,
                stream: false,
            }),
        });

        const data = await response.json();

        return data["response"];
    }

    $: _ = updateMessages(inputBoxValue);
</script>

<svelte:head>
    <title>Chat</title>
    <meta name="Chat" content="Chat with local model" />
</svelte:head>

<section>
    <Messages {messages} />
    <InputBox bind:inputBoxValue />
</section>
