var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        description: 'A pair of warm, fuzzy socks',
        selectedVariant: 0,
        link:
            'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
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
        }
    }
});
