import PAYMENT_METHODS from "../constants/paymentMethods.js";
const route = "/checkout/confirmation";
export const METHOD_CONFIG = {
    [PAYMENT_METHODS.MERCADO_PAGO]: {
        route: route,
    },
    [PAYMENT_METHODS.BANK_TRANSFER]: {
        route: route,
    }
}

export function getMethodConfig(method) {
    return METHOD_CONFIG[method] || null;
}
