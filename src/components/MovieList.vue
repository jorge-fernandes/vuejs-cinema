<template>
	<div id="movie-list">
		<div class="movie" v-for="movie in filteredMovies">{{ movie.movie.Title }}</div>
	</div>
</template>
<script>
	import genres from '../util/genres';

	export default {
		props: [
			'genre',
			'time',
			'movies'
		],
		methods: {
			moviesPassGenreFilter(movie) {
				if(!this.genre.length) {
					return true;
				} else {
					return this.genre.find(genre => movie.genre === genre);
				}
			}
		},
		computed: {
			filteredMovies() {
				return this.movies.filter(this.moviesPassGenreFilter);
			}
		}
	}
</script>