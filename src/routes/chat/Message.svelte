<script lang="ts">
    import { MessageSource, type IMessage } from "./type";
    // @ts-ignore
    import showdown from "showdown";

    export let message: IMessage;
    var converter = new showdown.Converter();
</script>

<div
    class="markdown-content flex-item {message.source === MessageSource.user
        ? 'bg-user'
        : 'bg-server'}"
>
    <div class="inner-text">
        <!-- WARNING: can be source of xss attack
        Messages are not being stored so no worries.
        -->
        {@html converter.makeHtml(message.text)} 
    </div>
</div>

<style>
    .flex-item {
        width: 100%;
        margin-top: 1%;
    }

    .inner-text {
        width: 90%;
        height: 90%;
        padding-bottom: 1.2rem;
        padding-left: 1.2rem;
        padding-right: 1.2rem;
        padding-top: 1.2rem;
    }

    .bg-user {
        background-color: #a8dadc;
    }

    .bg-server {
        background-color: #f1faee;
    }
</style>
