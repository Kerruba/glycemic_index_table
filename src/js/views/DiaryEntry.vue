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
            <a v-for="food in shared.aliments" class="panel-block" v-text="food.name" @click="selected = food">
            </a>
            <!-- <div class="field">
                    <label class="label" for="search">Search</label>
                    <p class="control">
                        <input class="input" type="text" id="search" name="search" />
                    </p>
                </div> -->
    
            <!-- Food list -->
        </div>
        <div class="column" v-if="foodDetails">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Food details
                    </p>
                    <a class="card-header-icon">
                        <span class="icon">
                            <i class="fa fa-angle-down"></i>
                        </span>
                    </a>
                </header>
                <div class="card-content">
                    <p class="content" v-text="selected.details">

                    </p>
                </div>
            </div>
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
            shared: store.state,
            selected: {}
        }
    },
    computed: {
        foodDetails() {
            return this.selected.details && this.selected.details != "";
        }
    }
}
</script>
