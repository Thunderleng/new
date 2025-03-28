<template>
    <svg width="200" height="5">
        <polyline stroke-width="2" fill="transparent" points="300, 0 270, 25" stroke="#3f96a5">
            <animate attributeName="points" values="
          0,15 50,5 100,25 150,10 200,20;
          0,20 50,10 100,15 150,5 200,25" dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1"
                keySplines="0.42 0 0.58 1" />
        </polyline>
        <polyline stroke-width="2" fill="transparent" points="300, 0 270, 25" stroke="#fff">
            <animate attributeName="points" values="
          0,15 50,5 100,25 150,10 200,20;
          0,20 50,10 100,15 150,5 200,25" dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1"
                keySplines="0.42 0 0.58 1" />
        </polyline>

    </svg>
</template>
<script setup>
</script>
<style scoped></style>