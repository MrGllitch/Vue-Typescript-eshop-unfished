<script lang="ts" setup></script>

<template>
	<NuxtLayout name="default">
		<div class="flex flex-row w-full py-6 px-12 gap-12">
			<aside class="basis-1/5 h-full">
				<nav>
					<StorefrontAccNav />
				</nav>
			</aside>
			<section class="basis-4/5">
				<slot />
			</section>
		</div>
	</NuxtLayout>
</template>
