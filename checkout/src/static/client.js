async function onLoaded() {

const clientSession = await fetch('/client-session', { method: 'post', headers: { 'Content-Type': 'application/json', }, }).then(data => data.json())
const { clientToken } = clientSession

const universalCheckout = await Primer.showUniversalCheckout(clientToken, {

    container: '#checkout-container',

    onCheckoutComplete({ payment }) {
        console.log('Checkout Complete!', payment)
    },

    onCheckoutFail(error, { payment }, handler) {
        console.log('Checkout Fail!', error, payment)
    },
})
}

window.addEventListener("load", onLoaded);