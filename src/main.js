import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue'
import MovieFilter from './components/MovieFilter.vue'

import axios from 'axios';
window.axios = axios; //the defineProperty approach seems less hacky

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

new Vue({
	el: '#app',
	data: {
		genre: [],
		time: [],
		movies: [],
		moment,
		day: moment()
	},
	methods: {
		checkFilter(category, title, checked) {
			if(checked) {
				this[category].push(title);
			} else {
				let index = this[category].indexOf(title);
				if(index > -1) {
					this[category].splice(index, 1);
				}
			}
		}
	},
	components: {
		MovieList,
		MovieFilter
	},
	created() {
		axios.get('/api').then(response => {
			this.movies = response.data;
		})
	}
});