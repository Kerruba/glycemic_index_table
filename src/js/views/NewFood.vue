<template>
	<form method="POST" action="/aliments" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
		<div class="field">
			<label class="label" for="name">Name</label>
			<p class="control">
				<input class="input" type="text" name="name" id="name" v-model="form.name" placeholder="Food name">
			</p>
			<span class="help is-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
		</div>
		<div class="field">
			<label class="label" for="details">Details</label>
			<p class="control">
				<input class="input" type="text" id="details" name="details" v-model="form.details" placeholder="Details about the food"/> 
			</p>
			<span class="help is-danger" v-if="form.errors.has('details')" v-text="form.errors.get('details')"></span>
		</div>
		<div class="field">
			<label class="label" for="glycemic_index">Glycemic index</label>
			<p class="control">
				<input class="input" type="text" id="glycemic_index" name="glycemic_index" v-model="form.glycemic_index" placeholder="Glycemic index of the food"/> 
			</p>
			<span class="help is-danger" v-if="form.errors.has('glycemic_index')" v-text="form.errors.get('glycemic_index')"></span>
		</div>
		<div class="field">
			<label class="label" for="carbs">Carbs (%)</label>
			<p class="control">
				<input class="input" type="text" id="carbs" name="carbs" v-model="form.carbs" placeholder="Percentage of carbs for serving"/> 
			</p>
			<span class="help is-danger" v-if="form.errors.has('carbs')" v-text="form.errors.get('carbs')"></span>
		</div>
		<div class="field">
			<label class="label" for="glycemic_load">Glycemic load</label>
			<p class="control">
				<input class="input" type="text" id="glycemic_load" name="glycemic_load" v-model="form.glycemic_load" placeholder="Glycemic load of the food"/> 
			</p>
			<span class="help is-danger" v-if="form.errors.has('glycemic_load')" v-text="form.errors.get('glycemic_load')"></span>
		</div>
		<div class="field">
			<label class="label" for="serving">Serving</label>
			<p class="control">
				<input class="input" type="text" id="serving" name="serving" v-model="form.serving" placeholder="Serving size"/>
			</p>
			<span class="help is-danger" v-if="form.errors.has('serving')" v-text="form.errors.get('serving')"></span>
		</div>
		<div class="field">
            <button class="button is-primary" :disabled="form.errors.any()">Create</button>
            <span class="control">
                <label class="checkbox">
                    <input type="checkbox" v-model="multi_create"> Create another
                </label>
            </span>
		</div>
		
	</form>
</template>

<script>
	import {Errors, Form} from '../components/Form'
	let default_form = {
		name: '',
		details: '',
		glycemic_index: 0,
		carbs: 0,
		glycemic_load: 0, 
		serving: '100g'
	}

	export default {
		data() {
			return {
                form: new Form(default_form),
                multi_create: false
			}
		},
		methods: {
			onSubmit() {
				this.form.post('/aliments')
                    .then(() => {
                        if (!this.multi_create) {
                            this.$router.push('/')
                        } else {
                            this.form = new Form(default_form)
                        }
                    });
			}
		}
	}
</script>