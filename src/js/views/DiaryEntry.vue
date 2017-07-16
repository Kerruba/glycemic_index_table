<template>
    <div class="columns">
        <div class="column panel">
            <p class="panel-heading">Food list</p>
            <div class="panel-block">
                <p class="control has-icons-left">
                <input class="input is-small" type="text" placeholder="Search">
                <span class="icon is-small is-left">
                    <i class="fa fa-search"></i>
                </span>
                </p>
            </div>
            <a v-for="food in shared.aliments" class="panel-block" v-text="food.name">
            </a>
            <!-- <div class="field">
                <label class="label" for="search">Search</label>
                <p class="control">
                    <input class="input" type="text" id="search" name="search" />
                </p>
            </div> -->
            
            <!-- Food list -->
        </div>
        <div class="column">
            <!-- Food details -->
        </div>
        <div class="column">
            <!-- Serving -->
            <!-- Add button -->
        </div>
        <div class="column">
            <!-- Food diary -->
            <!-- Submit -->
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            shared: store.state
        }
    }
}
</script>
