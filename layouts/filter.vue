<script lang="ts" setup></script>

<template>
	<div class="flex flex-row w-full py-6 px-12 gap-12">
		<aside class="basis-1/5 h-full">
			<nav class="flex flex-col">
				<StorefrontCategoryNav></StorefrontCategoryNav>
				<NuxtLink to="/admin">dashboard</NuxtLink>
			</nav>
		</aside>
		<section class="basis-4/5">
			<slot />
		</section>
	</div>
</template>
