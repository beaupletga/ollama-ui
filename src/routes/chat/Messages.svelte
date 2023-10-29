<script lang="ts">
    import Message from "./Message.svelte";
    import type { IMessage } from "./type";

    export let messages: IMessage[];
</script>

<div class="chat">
    {#each messages as message}
        <Message {message} />
    {/each}
</div>
