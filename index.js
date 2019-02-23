var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'A pair of warm, fuzzy socks',
        image: './img/vmSocks-blue-onWhite.jpg',
        link:
            'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inventory: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'blue',
                variantImage: '/img/vmSocks-blue-onWhite.jpg'
            },
            {
                variantId: 2235,
                variantColor: 'green',
                variantImage: '/img/vmSocks-green-onWhite.jpg'
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
        updateProduct(image) {
            this.image = image;
        }
    }
});
