import Vue from 'vue';
import './style.scss';

import axios from 'axios';
window.axios = axios; //the defineProperty approach seems less hacky

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import { checkFilter, setDay } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes';

const router = new VueRouter({
	routes
});

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
	created() {
		axios.get('/api').then(response => {
			this.movies = response.data;
		})
		this.$bus.$on('check-filter', checkFilter.bind(this));
		this.$bus.$on('set-day', setDay.bind(this));
	},
	router
});

import { addClass, removeClass } from './util/helpers.js';

let mouseOverHandler = function(event) {
	let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
	addClass(span, 'tooltip-show');
}

let mouseOutHandler = function(event) {
	let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
	removeClass(span, 'tooltip-show');
}


Vue.directive('tooltip', {
	bind(el, bindings) {
		let span = document.createElement('SPAN');
		let text = document.createTextNode('Seats available: 200');

		span.appendChild(text);
		addClass(span, 'tooltip');
		el.appendChild(span);

		let div = el.getElementsByTagName('DIV')[0];
		div.addEventListener('mouseover', mouseOverHandler);
		div.addEventListener('mouseout', mouseOutHandler);
		div.addEventListener('touchStart', mouseOverHandler);
		div.addEventListener('touchEnd', mouseOutHandler);
	},
	unbind(el) {
		let div = el.getElementsByTagName('DIV')[0];
		div.removeEventListener('mouseover', mouseOverHandler);
		div.removeEventListener('mouseout', mouseOutHandler);
		div.removeEventListener('touchStart', mouseOverHandler);
		div.removeEventListener('touchEnd', mouseOutHandler);
	}
});