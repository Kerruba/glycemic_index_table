<template>
    <div id="foods">
        <div v-for="food in aliments">
            <h3>{{food.name}}</h3>
            <ul>
            <li>{{food.details}}</li>
            <li>{{food.serving}}</li>
            <li>{{food.gl}}</li>
            </ul>
        </div>
    </div>
</template>