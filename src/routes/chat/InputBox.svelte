<script lang="ts">
    import { onMount } from "svelte";

    export let inputBoxValue: string | undefined;
    let inputBoxValueTmp: string;

    function onSubmit(event: SubmitEvent | any) {
        // reset does not exist on SubmitEvent.target
        inputBoxValue = inputBoxValueTmp;
        event.currentTarget?.reset();
    }

    onMount(() => {
        document.body.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                (
                    document.getElementById("inputForm") as HTMLFormElement
                ).requestSubmit();
            }
        });
    });
</script>

<form id="inputForm" name="inputForm" on:submit|preventDefault={onSubmit}>
    <div class="textarea-container">
        <textarea
            bind:value={inputBoxValueTmp}
            name="textarea"
            tabindex="0"
            rows="1"
            placeholder="Send a message"
        />
        <button type="submit" class="submit-button">Submit</button>
    </div>
</form>

<style>
    .textarea-container {
        display: flex;
        align-items: center;
    }

    textarea {
        flex: 1;
        width: 80%;
        height: 56px;
        max-height: 200px;
        border: 1px solid #ccc;
        padding: 10px;
    }

    .submit-button {
        background-color: #1d3557;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
    }

    #inputForm {
        margin-top: 3%;
    }
</style>
