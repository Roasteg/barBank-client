<script>
    import {goto, stores} from "@sapper/app";
    import {post} from "utils.js";


    export let segment;
    const {page, session} = stores();

    async function logout() {
        await post('auth/logout');
        $session.token = null;
        goto('/');
    }

</script>

<style>
    nav {
        border-bottom: 1px solid rgba(255, 62, 0, 0.1);
        font-weight: 300;
        padding: 0 1em;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    /* clearfix */
    ul::after {
        content: '';
        display: block;
        clear: both;
    }

    li {
        display: block;
        float: left;
    }

    [aria-current] {
        position: relative;
        display: inline-block;
    }

    [aria-current]::after {
        position: absolute;
        content: '';
        width: calc(100% - 1em);
        height: 2px;
        background-color: rgb(255, 62, 0);
        display: block;
        bottom: -1px;
    }

    a {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
    }
</style>
<!--{JSON.stringify($session)}-->
<nav>
    <ul>
        {#if !$session.token}
            <li><a href="signup">Sign Up</a></li>
            <li><a href="signin">Sign In</a></li>
        {:else}
            <li><a aria-current="{segment === undefined ? 'page' : undefined}" href="{logout}" on:click|preventDefault={logout}>Logout</a></li>
            <li><a aria-current="{segment === undefined ? 'page' : undefined}" href="overview" >Overview</a></li>
        {/if}

    </ul>
</nav>
