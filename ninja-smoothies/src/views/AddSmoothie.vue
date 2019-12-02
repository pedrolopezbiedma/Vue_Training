<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add a new Smoothie recipe</h2>
        <form>
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="title">
            </div>
            
            <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient {{ index+1 }}</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteSmoothie(ingredient)">delete</i>
            </div>

            <div class="field ingredients">
                <label for="ingredients">Add Ingredients</label>
                <input type="text" name="ingredients" @keydown.tab.prevent="addIngredient" v-model="ingredient">
            </div>
            <div class="field center-align">
                <p class="red-text" v-if='feedback'> {{ feedback }}</p>
                <button class="btn pink" @click.prevent="addSmoothie">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddSmoothie',
    data(){
        return {
            title: null,
            ingredients: [],
            ingredient: null,
            feedback: null
        }
    },
    methods: {
        addSmoothie(){
            if(this.title){
                this.feedback = null;
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: slugify(this.title, { 
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true
                    })
                })
                .then(() => {
                    // Navigate to Index
                    this.$router.push({ name: 'Index'})
                    })
                .catch( err => {
                    console.log(err);
                })
            
            }
            else{
                this.feedback = "You need to enter a title to submit a Smoothie."
            }
        },
        deleteSmoothie(clickedIngredient){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != clickedIngredient;
            })
        },
        addIngredient(){
            if(this.ingredient){
                this.ingredients.push(this.ingredient);
                this.ingredient = null;
                this.feedback = null;
            }
            else{
                this.feedback = "You need to enter an ingredient and then hit 'Tab'"
            }
        }
    }
}
</script>

<style>
.add-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;    
}

.add-smoothie h2{
    font-size: 2em;
    margin: 20px auto
}

.add-smoothie .field{
    margin: 20px auto;
    position: relative
}

.add-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
