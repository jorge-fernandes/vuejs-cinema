import { addClass, removeClass } from './helpers.js';

let mouseOverHandler = function(event) {
	let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
	addClass(span, 'tooltip-show');
}

let mouseOutHandler = function(event) {
	let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
	removeClass(span, 'tooltip-show');
}
export default {
	install(Vue) {
		Vue.directive('tooltip', {
			bind(el, bindings) {
				let span = document.createElement('SPAN');
				let text = document.createTextNode(`Seats available: ${ bindings.value.seats }`);

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
	}
}