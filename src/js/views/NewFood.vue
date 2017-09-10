<template>
	<form id="new_food_page" method="POST" action="/aliments" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
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
				<input class="input" type="text" id="carbs" name="carbs" v-model="form.carbs_percentual" placeholder="Percentage of carbs for serving"/> 
			</p>
			<span class="help is-danger" v-if="form.errors.has('carbs_percentual')" v-text="form.errors.get('carbs_percentual')"></span>
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
	import { Errors, Form } from '../components/Form';
	import Qty from 'js-quantities';
	import { mapMutations } from 'vuex';

	let default_form = {
		name: '',
		details: '',
		glycemic_index: 0,
		carbs_percentual: 0,
		glycemic_load: 0, 
		serving: new Qty('100 g')
	}

	export default {
		data() {
			return {
                form: new Form(this.aliment),
				multi_create: false,
				// isUpdate: false,
                // shared: store.state
			}
		},
		props: {
			aliment: {
				type: Object,
				default() {
					return default_form;
				}
			},
			isUpdate: {
				type: Boolean,
				default: false
			}
		},
		// created() {
		// 	this.$nextTick(() => {
		// 		if (this.$route.params.id) {
		// 			let updateAliment = this.$store.getters.getAlimentById(this.$route.params.id);
		// 			if (updateAliment) {
		// 				this.isUpdate = true;
		// 				this.form = new Form(updateAliment[0]);
		// 			}
		// 		}
		// 	});
		// },
		methods: {
			onSubmit() {
				function updateStore(data) {
					this.$store.commit('setAlimentsDatabase', data);
					if (!this.multi_create) {
						this.$router.push('/')
					} else {
						this.form = new Form(default_form)
					}
				} 
				if (this.isUpdate) {
					this.form.put('/aliments/' + this.$route.params.id)
						.then(data => updateStore.call(this,data));
				} else {
					this.form.post('/aliments')
						.then(data => updateStore.call(this,data));
				}
			},
			// ...mapMutations([
			// 	'setAlimentsDatabase'
			// ])
		}
	}
</script>