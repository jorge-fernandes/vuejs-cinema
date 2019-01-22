<template>
    <div id="detail">

    </div>
</template>
<script>
	export default {
		created() {
			console.log(this.$route.params.id);
		}
	}
</script>