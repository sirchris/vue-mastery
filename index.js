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

                <div class="cart">
                    <p>Cart ({{ cart }})</p>
                </div>
            </div>
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
                    quantity: 0
                }
            ],
            cart: 0
        };
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        removeFromCart() {
            this.cart && (this.cart -= 1);
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

var app = new Vue({
    el: '#app',
    data: {
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        premium: true
    }
});
