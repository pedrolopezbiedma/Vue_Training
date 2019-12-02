<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h2> Edit Smoothie {{ smoothie.title }}</h2>
        <form>
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            
            <div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient {{ index+1 }}</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteSmoothie(ingredient)">delete</i>
            </div>

            <div class="field ingredients">
                <label for="ingredients">Add Ingredients</label>
                <input type="text" name="ingredients" @keydown.tab.prevent="addIngredient" v-model="ingredient">
            </div>
            <div class="field center-align">
                <p class="red-text" v-if='feedback'> {{ feedback }}</p>
                <button class="btn pink" @click.prevent="editSmoothie">Edit Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data(){
        return {
            smoothie: null,
            ingredient: null,
            feedback: null
        }
    },
    created(){
        var ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug )
        ref.get()
            .then(snapshot => {
                snapshot.forEach( doc => {
                    this.smoothie = doc.data();
                    this.smoothie.id = doc.id;
                })
            })
            .catch(err => {
                console.log(err);
            })
    },
    methods: {
        editSmoothie(){
            if(this.smoothie.title){
                this.feedback = null;
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: slugify(this.smoothie.title, { 
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
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient != clickedIngredient;
            })
        },
        addIngredient(){
            if(this.ingredient){
                this.smoothie.ingredients.push(this.ingredient);
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
.edit-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;    
}

.edit-smoothie h2{
    font-size: 2em;
    margin: 20px auto
}

.edit-smoothie .field{
    margin: 20px auto;
    position: relative
}

.edit-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
