const eventBus = new Vue();

Vue.component('product', {
    props: {
        details: {
            type: Array,
            required: true
        },
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image" />
            </div>

            <div class="product-info">
                <h1 :style="[!inventory && {'text-decoration':'line-through'}]">{{ title }}</h1>

                <h4>Shipping: {{ shipping }}</h4>

                <p v-if="inventory>10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">
                    Almost sold out!
                </p>
                <p v-else>Out of Stock</p>

                <a :href="link" target="_blank">More products like this</a>

                <p>{{ description }}</p>

                <productDetails :details="details"></productDetails>

                Variants:
                <div
                    v-for="(variant, index) in variants"
                    :key="variant.id"
                    @mouseover="updateProduct(index)"
                    class="color-box"
                    :style="{backgroundColor:variant.color}"
                ></div>

                <button
                    @click="addToCart"
                    :disabled="!inventory"
                    :class="[!inventory && 'disabledButton']"
                >
                    Add to cart
                </button>
                <button @click="removeFromCart">Remove from cart</button>
            </div>

            <productTabs :reviews="reviews"></productTabs>
        </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            description: 'A pair of warm, fuzzy socks',
            selectedVariant: 0,
            link:
                'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            variants: [
                {
                    id: 2234,
                    color: 'blue',
                    image: '/img/vmSocks-blue-onWhite.jpg',
                    quantity: 10
                },
                {
                    id: 2235,
                    color: 'green',
                    image: '/img/vmSocks-green-onWhite.jpg',
                    quantity: 2
                }
            ],
            reviews: []
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        removeFromCart() {
            this.$emit(
                'remove-from-cart',
                this.variants[this.selectedVariant].id
            );
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inventory() {
            return this.variants[this.selectedVariant].quantity;
        },
        shipping() {
            return this.premium ? 'free' : '2.99';
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview);
        })
    }
});

Vue.component('productDetails', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in this.details">{{ detail }}</li>
        </ul>
    `
});

Vue.component('productReview', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>

                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name" />
            </p>

            <p>
                <label for="recommended">Will you recommend this product?</label>
                <div>yes: <input id="recommended" v-model="recommended" type="radio" value="yes" /></div>
                <div>no: <input id="recommended" v-model="recommended" type="radio" value="no" /></div>
            </p>

            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <input type="submit" value="Submit" />
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            rating: null,
            review: null,
            recommended: null,
            errors: []
        };
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommended: this.recommended
                };

                eventBus.$emit('review-submitted', productReview);

                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommended = null;
                this.errors = [];
            } else {
                this.errors = [];

                if (!this.name) this.errors.push('Name required.');
                if (!this.review) this.errors.push('Review required.');
                if (!this.rating) this.errors.push('Rating required.');
                if (!this.recommended)
                    this.errors.push('Recomendation required.');
            }
        }
    }
});

Vue.component('productTabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <ul>
                <span class="tab" v-for="(tab, index) in tabs" @click="selectedTab = tab" :class="{ activeTab: selectedTab === tab }">{{ tab }}</span>
            </ul>

            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>

                <p v-if="!reviews.length">There are no reviews yet.</p>

                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>

                        <p>Rating: {{ review.rating }}</p>

                        <p>Recommended: {{ review.recommended }}</p>

                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>

            <productReview v-show="selectedTab !== 'Reviews'"></productReview>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        };
    }
});

var app = new Vue({
    el: '#app',
    data: {
        cart: [],
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        premium: true
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            const index = this.cart.indexOf(id);

            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        }
    }
});
