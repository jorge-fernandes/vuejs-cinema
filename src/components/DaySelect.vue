<template>
	<div id="day-select">
		<ul class="days">
			<li v-bind:class="{ day: true, active: isActive(day) }" v-for="day in days" v-on:click="selectDay(day)">
				{{ formatDay(day) }}
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: [
			'selected'
		],
		data() {
			return {
				days: [0, 1, 2, 3, 4, 5, 6].map(num => this.$moment().add(num, 'days'))
			}
		},
		methods: {
			formatDay(raw) {
				let formattedDay = 'Today';
				if(!raw.isSame(this.$moment(), 'day')) {
					formattedDay = raw.format('ddd DD/MM');
				}
				return formattedDay;
			},
			isActive(day) {
				return day.isSame(this.selected, 'day');
			},
			selectDay(day) {
				this.$bus.$emit('set-day', day);
			}
		}
	}
</script>