import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue'
import MovieFilter from './components/MovieFilter.vue'

import axios from 'axios';
window.axios = axios; //the defineProperty approach seems less hacky

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import { checkFilter } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

new Vue({
	el: '#app',
	data: {
		genre: [],
		time: [],
		movies: [],
		moment,
		day: moment(),
		bus
	},
	components: {
		MovieList,
		MovieFilter
	},
	created() {
		axios.get('/api').then(response => {
			this.movies = response.data;
		})
		this.$bus.$on('check-filter', checkFilter.bind(this));
	}
});